import React from 'react'
// @ts-expect-error no types available
import Column from 'react-columns'
import { type IIdeaBoxEntry } from '@interfaces/ideabox_interfaces'
import { useIdeaBoxContext } from '@providers/IdeaBoxProvider'
import EntryImage from './IdeaEntry/EntryImage'
import EntryLink from './IdeaEntry/EntryLink'
import EntryText from './IdeaEntry/EntryText'

function IdeaList({ data }: { data: IIdeaBoxEntry[] }): React.ReactElement {
  const { selectedTags } = useIdeaBoxContext()

  return (
    <Column
      queries={[
        {
          columns: 1,
          query: 'min-width: 0px'
        },
        {
          columns: 2,
          query: 'min-width: 768px'
        },
        {
          columns: 3,
          query: 'min-width: 1024px'
        },
        {
          columns: 4,
          query: 'min-width: 1280px'
        },
        {
          columns: 5,
          query: 'min-width: 1536px'
        }
      ]}
      gap="0.5rem"
      className="mb-8 shrink-0 overflow-x-visible!"
    >
      {data
        .filter(item => {
          if (selectedTags.length === 0) {
            return true
          }

          return selectedTags.every(tag => item.tags?.includes(tag))
        })
        .map(entry => {
          const Component = {
            image: EntryImage,
            text: EntryText,
            link: EntryLink
          }[entry.type]

          return <Component key={entry.id} entry={entry} />
        })}
    </Column>
  )
}

export default IdeaList
