import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { SidebarItem, SidebarTitle } from '@components/layouts/sidebar'
import APIFallbackComponent from '@components/screens/APIComponentWithFallback'
import { useWalletContext } from '@providers/WalletProvider'

function LedgerSection({
  setSidebarOpen
}: {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}): React.ReactElement {
  const { t } = useTranslation('modules.wallet')
  const [searchParams, setSearchParams] = useSearchParams()
  const { ledgers, filteredTransactions } = useWalletContext()
  const navigate = useNavigate()

  return (
    <>
      <SidebarTitle
        name={t('sidebar.ledgers')}
        actionButtonIcon="tabler:plus"
        actionButtonOnClick={() => {
          navigate('/wallet/ledgers#new')
        }}
      />
      <APIFallbackComponent data={ledgers}>
        {ledgers => (
          <>
            {[
              {
                icon: 'tabler:book',
                name: t('sidebar.allLedgers'),
                color: 'white',
                id: null
              }
            ]
              .concat(ledgers as any)
              .map(({ icon, name, color, id }, index) => (
                <SidebarItem
                  key={id}
                  name={name}
                  icon={icon}
                  sideStripColor={color}
                  active={
                    searchParams.get('ledger') === id ||
                    (searchParams.get('ledger') === null && index === 0)
                  }
                  number={
                    typeof filteredTransactions !== 'string'
                      ? filteredTransactions.filter(
                          transaction =>
                            transaction.ledger === id || id === null
                        ).length
                      : 0
                  }
                  onClick={() => {
                    if (name === 'All') {
                      searchParams.delete('ledger')
                      setSearchParams(searchParams)
                      return
                    }
                    setSearchParams({
                      ...Object.fromEntries(searchParams.entries()),
                      ledger: id!
                    })
                    setSidebarOpen(false)
                  }}
                  onCancelButtonClick={
                    name !== 'All'
                      ? () => {
                          searchParams.delete('ledger')
                          setSearchParams(searchParams)
                          setSidebarOpen(false)
                        }
                      : undefined
                  }
                />
              ))}
          </>
        )}
      </APIFallbackComponent>
    </>
  )
}

export default LedgerSection
