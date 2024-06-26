// PriorityListbox.tsx
import { Listbox } from '@headlessui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ListboxInputWrapper from '@components/Listbox/ListboxInputWrapper'
import ListboxTransition from '@components/Listbox/ListboxTransition'

const PRIORITIES = [
  {
    name: 'Low',
    color: 'text-green-500'
  },
  {
    name: 'Medium',
    color: 'text-yellow-500'
  },
  {
    name: 'High',
    color: 'text-red-500'
  }
]

function PrioritySelector({
  priority,
  setPriority
}: {
  priority: string | null
  setPriority: React.Dispatch<React.SetStateAction<string>>
}): React.ReactElement {
  const { t } = useTranslation()

  return (
    <ListboxInputWrapper value={priority} onChange={setPriority}>
      <Listbox.Button className="flex w-full items-center">
        <Icon
          icon="tabler:alert-triangle"
          className={`ml-6 size-6 shrink-0 ${''} group-focus-within:!text-custom-500`}
        />
        <span
          className={`pointer-events-none absolute left-[4.2rem] font-medium tracking-wide text-bg-500 group-focus-within:!text-custom-500 ${'top-6 -translate-y-1/2 text-[14px]'}`}
        >
          {t('input.priority')}
        </span>
        <div className="relative mb-2 mt-9 flex w-full items-center gap-2 rounded-lg pl-5 pr-10 text-left focus:outline-none sm:text-sm">
          <span
            className={`text-center font-semibold ${
              PRIORITIES.find(e => e.name.toLowerCase() === priority)?.color
            }`}
          >
            {'!'.repeat(
              PRIORITIES.findIndex(e => e.name.toLowerCase() === priority) + 1
            )}
          </span>
          <span className="-mt-px block truncate">
            {(priority?.[0].toUpperCase() ?? '') + (priority?.slice(1) ?? '')}
          </span>
        </div>
        <span className="pointer-events-none absolute inset-y-0 right-0 mt-1 flex items-center pr-4">
          <Icon icon="tabler:chevron-down" className="size-5 text-bg-500" />
        </span>
      </Listbox.Button>
      <ListboxTransition>
        <Listbox.Options className="absolute top-[4.5rem] z-50 mt-1 max-h-56 w-full divide-y divide-bg-200 overflow-auto rounded-md bg-bg-100 py-1 text-base shadow-lg focus:outline-none dark:divide-bg-700 dark:bg-bg-800 sm:text-sm">
          {PRIORITIES.map(({ name, color }, i) => (
            <Listbox.Option
              key={i}
              className={({ active }) =>
                `relative cursor-pointer select-none transition-all p-4 flex flex-between ${
                  active ? 'bg-bg-200/50 dark:bg-bg-700/50' : '!bg-transparent'
                }`
              }
              value={name.toLowerCase()}
            >
              {({ selected }) => (
                <>
                  <div>
                    <span className="flex items-center gap-2">
                      <span
                        className={`mr-2 text-center font-semibold ${color}`}
                      >
                        {'!'.repeat(i + 1)}
                      </span>
                      {name}
                    </span>
                  </div>
                  {selected && (
                    <Icon
                      icon="tabler:check"
                      className="block text-lg text-custom-500"
                    />
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </ListboxTransition>
    </ListboxInputWrapper>
  )
}

export default PrioritySelector
