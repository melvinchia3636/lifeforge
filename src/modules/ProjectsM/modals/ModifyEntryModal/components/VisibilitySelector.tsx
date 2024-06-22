import { Listbox } from '@headlessui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ListboxInputWrapper from '@components/Listbox/ListboxInputWrapper'
import ListboxTransition from '@components/Listbox/ListboxTransition'
import { type IProjectsMVisibility } from '@interfaces/projects_m_interfaces'

function VisibilitySelector({
  visibility,
  setVisibility,
  visibilities
}: {
  visibility: string | null
  setVisibility: React.Dispatch<React.SetStateAction<string | null>>
  visibilities: IProjectsMVisibility[] | 'loading' | 'error'
}): React.ReactElement {
  const { t } = useTranslation()

  if (visibilities === 'loading') {
    return <div>Loading...</div>
  }

  if (visibilities === 'error') {
    return <div>Error</div>
  }

  return (
    <ListboxInputWrapper value={visibility} onChange={setVisibility}>
      <Listbox.Button className="flex w-full items-center">
        <Icon
          icon="tabler:eye"
          className={`ml-6 size-6 shrink-0 ${
            visibility !== null ? '' : 'text-bg-500'
          } group-focus-within:!text-custom-500`}
        />
        <span
          className={`pointer-events-none absolute left-[4.2rem] font-medium tracking-wide text-bg-500 group-focus-within:!text-custom-500 ${'top-6 -translate-y-1/2 text-[14px]'}`}
        >
          {t('input.projectVisibility')}
        </span>
        <div className="relative mb-3 mt-10 flex w-full items-center gap-2 rounded-lg pl-5 pr-10 text-left focus:outline-none">
          <Icon
            icon={
              visibilities.find(l => l.id === visibility)?.icon ??
              'tabler:eye-off'
            }
            className="size-5"
          />
          <span className="-mt-px block truncate">
            {visibilities.find(l => l.id === visibility)?.name ?? 'None'}
          </span>
        </div>
        <span className="pointer-events-none absolute inset-y-0 right-0 mt-1 flex items-center pr-4">
          <Icon icon="tabler:chevron-down" className="size-5 text-bg-500" />
        </span>
      </Listbox.Button>
      <ListboxTransition>
        <Listbox.Options className="absolute bottom-[120%] z-[100] mt-1 max-h-56 w-full divide-y divide-bg-200 overflow-auto rounded-md bg-bg-100 py-1 text-base shadow-lg focus:outline-none dark:divide-bg-700 dark:bg-bg-800">
          <Listbox.Option
            key={'none'}
            className={({ active }) =>
              `relative cursor-pointer select-none transition-all p-4 flex items-center justify-between ${
                active ? 'bg-bg-200/50 dark:bg-bg-700/50' : '!bg-transparent'
              }`
            }
            value={null}
          >
            {({ selected }) => (
              <>
                <div>
                  <span className="flex items-center gap-2 font-medium">
                    <span className="rounded-md p-2">
                      <Icon
                        icon="tabler:eye-off"
                        className="size-5"
                        style={{ color: 'white' }}
                      />
                    </span>
                    <span>None</span>
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
          {visibilities.map(({ name, id, icon }, i) => (
            <Listbox.Option
              key={i}
              className={({ active }) =>
                `relative cursor-pointer select-none transition-all p-4 flex items-center justify-between ${
                  active ? 'bg-bg-200/50 dark:bg-bg-700/50' : '!bg-transparent'
                }`
              }
              value={id}
            >
              {({ selected }) => (
                <>
                  <div>
                    <span className="flex items-center gap-2 font-medium">
                      <span className="rounded-md p-2">
                        <Icon icon={icon} className="size-5" />
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

export default VisibilitySelector