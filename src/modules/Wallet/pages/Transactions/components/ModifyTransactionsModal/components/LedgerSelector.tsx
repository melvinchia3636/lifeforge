import { Listbox } from '@headlessui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ListboxInputWrapper from '@components/Listbox/ListboxInputWrapper'
import ListboxTransition from '@components/Listbox/ListboxTransition'
import { useWalletContext } from '@providers/WalletProvider'

function LedgerSelector({
  ledger,
  setLedger
}: {
  ledger: string | null
  setLedger: React.Dispatch<React.SetStateAction<string | null>>
}): React.ReactElement {
  const { t } = useTranslation()
  const { ledgers } = useWalletContext()

  if (ledgers === 'loading') {
    return <div>Loading...</div>
  }

  if (ledgers === 'error') {
    return <div>Error</div>
  }

  return (
    <ListboxInputWrapper value={ledger} onChange={setLedger}>
      <Listbox.Button className="flex w-full items-center">
        <Icon
          icon="tabler:book"
          className={`ml-6 size-6 shrink-0 ${
            ledger !== '' && ledger !== null ? '' : 'text-bg-500'
          } group-focus-within:!text-custom-500`}
        />
        <span
          className={`pointer-events-none absolute left-[4.2rem] font-medium tracking-wide text-bg-500 group-focus-within:!text-custom-500 ${'top-6 -translate-y-1/2 text-[14px]'}`}
        >
          {t('input.ledger')}
        </span>
        <div className="relative mb-3 mt-10 flex w-full items-center gap-2 rounded-lg pl-5 pr-10 text-left focus:outline-none">
          <Icon
            icon={ledgers.find(l => l.id === ledger)?.icon ?? 'tabler:book'}
            style={{
              color: ledgers.find(l => l.id === ledger)?.color
            }}
            className="size-5"
          />
          <span className="-mt-px block truncate">
            {ledgers.find(l => l.id === ledger)?.name ?? 'None'}
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
              `relative cursor-pointer select-none transition-all p-4 flex flex-between ${
                active ? 'bg-bg-200/50 dark:bg-bg-700/50' : '!bg-transparent'
              }`
            }
            value={null}
          >
            {({ selected }) => (
              <>
                <div>
                  <span className="flex items-center gap-2 font-medium">
                    <span
                      className="rounded-md p-2"
                      style={{ backgroundColor: '#FFFFFF20' }}
                    >
                      <Icon
                        icon="tabler:book"
                        className="size-5"
                        style={{ color: 'white' }}
                      />
                    </span>
                    {t('input.none')}
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
          {ledgers.map(({ name, color, id, icon }, i) => (
            <Listbox.Option
              key={i}
              className={({ active }) =>
                `relative cursor-pointer select-none transition-all p-4 flex flex-between ${
                  active ? 'bg-bg-200/50 dark:bg-bg-700/50' : '!bg-transparent'
                }`
              }
              value={id}
            >
              {({ selected }) => (
                <>
                  <div>
                    <span className="flex items-center gap-2 font-medium">
                      <span
                        className="rounded-md p-2"
                        style={{ backgroundColor: color + '20' }}
                      >
                        <Icon
                          icon={icon}
                          className="size-5"
                          style={{ color }}
                        />
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

export default LedgerSelector
