import axios from 'axios'
import ora from 'ora'
import prompts from 'prompts'

import { CLILoggingService } from '../../../utils/logging'

/**
 * Prompts the user to select an icon from Iconify's icon sets.
 * Fetches available icon sets and icons, allowing the user to navigate and select.
 *
 * @returns A promise that resolves to the selected icon in the format "collection:icon".
 * @throws An error if the operation is cancelled or if fetching icons fails.
 */
export default async function selectIcon(): Promise<string> {
  const iconCollections = (
    await axios.get<
      Record<
        string,
        {
          name: string
          total: number
          categories?: Record<string, string[]>
          uncategorized?: string[]
        }
      >
    >('https://api.iconify.design/collections')
  ).data

  if (!iconCollections) {
    CLILoggingService.error('Failed to fetch icon collections from Iconify.')
    process.exit(1)
  }

  const iconCollectionsList = Object.keys(iconCollections)

  while (true) {
    let cancelled = false

    const moduleIconCollection = await prompts(
      {
        type: 'autocomplete',
        name: 'iconCollection',
        message: 'Select an icon set:',
        choices: iconCollectionsList.map(iconCollection => ({
          title: `${iconCollection}: ${
            iconCollections[iconCollection]?.name
          } (${iconCollections[iconCollection]?.total.toLocaleString()} icons)`,
          value: iconCollection
        })),
        initial: false
      },
      {
        onCancel: () => {
          cancelled = true
        }
      }
    )

    if (cancelled) {
      CLILoggingService.error('Icon selection cancelled by user.')
      process.exit(1)
    }

    const spinner2 = ora('Fetching icons from Iconify...').start()

    const icons = (
      await axios(
        `https://api.iconify.design/collection?prefix=${moduleIconCollection.iconCollection}`
      )
    ).data

    spinner2.stop()

    if (!icons) {
      CLILoggingService.error('Failed to fetch icons from Iconify.')
      process.exit(1)
    }

    const iconsList = [
      ...(icons.uncategorized ?? []),
      ...Object.values(icons.categories ?? {}).flat()
    ]

    let cancelled2 = false

    const moduleIcon = await prompts(
      {
        type: 'autocomplete',
        name: 'icon',
        message: 'Select an icon:',
        choices: [
          {
            title: `../ (Back to icon sets)`,
            value: 'GO_BACK'
          },
          ...iconsList.map((icon: string) => ({
            title: icon,
            value: `${moduleIconCollection.iconCollection}:${icon}`
          }))
        ],
        initial: false,
        suggest: async (input, choices) => {
          if (!input) {
            return choices
          }

          const filteredChoices = choices
            .filter(choice =>
              choice.title.toLowerCase().includes(input.toLowerCase())
            )
            .sort((a, b) => {
              const inputLower = input.toLowerCase()

              const aTitleLower = a.title.toLowerCase()

              const bTitleLower = b.title.toLowerCase()

              // Exact match comes first
              if (aTitleLower === inputLower && bTitleLower !== inputLower)
                return -1
              if (bTitleLower === inputLower && aTitleLower !== inputLower)
                return 1

              // Starts with input comes next
              const aStartsWith = aTitleLower.startsWith(inputLower)

              const bStartsWith = bTitleLower.startsWith(inputLower)

              if (aStartsWith && !bStartsWith) return -1
              if (bStartsWith && !aStartsWith) return 1

              // Earlier position of input comes next
              const aIndex = aTitleLower.indexOf(inputLower)

              const bIndex = bTitleLower.indexOf(inputLower)

              if (aIndex !== bIndex) return aIndex - bIndex

              // Shorter strings come first (more specific)
              if (a.title.length !== b.title.length)
                return a.title.length - b.title.length

              // Alphabetical order as final tiebreaker
              return a.title.localeCompare(b.title)
            })

          return filteredChoices
        }
      },
      {
        onCancel: () => {
          cancelled2 = true
        }
      }
    )

    if (cancelled2) {
      CLILoggingService.error('Icon selection cancelled by user.')
      process.exit(1)
    }

    if (moduleIcon.icon === 'GO_BACK') {
      continue
    }

    return moduleIcon.icon
  }
}
