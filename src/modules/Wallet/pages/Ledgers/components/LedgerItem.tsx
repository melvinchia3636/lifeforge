import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { useNavigate } from 'react-router'
import HamburgerMenu from '@components/ButtonsAndInputs/HamburgerMenu'
import MenuItem from '@components/ButtonsAndInputs/HamburgerMenu/MenuItem'
import { type IWalletLedger } from '@interfaces/wallet_interfaces'
import { useWalletContext } from '@providers/WalletProvider'

function LedgerItem({
  ledger,
  setSelectedData,
  setModifyModalOpenType,
  setDeleteLedgersConfirmationOpen
}: {
  ledger: IWalletLedger
  setSelectedData: React.Dispatch<React.SetStateAction<IWalletLedger | null>>
  setModifyModalOpenType: React.Dispatch<
    React.SetStateAction<'create' | 'update' | null>
  >
  setDeleteLedgersConfirmationOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >
}): React.ReactElement {
  const navigate = useNavigate()
  const { transactions } = useWalletContext()

  return (
    <button
      type="button"
      onClick={() => {
        navigate(`/wallet/transactions?ledger=${ledger.id}`)
      }}
      className="flex-between relative flex w-full gap-4 rounded-lg bg-bg-100 p-4 shadow-custom transition-all hover:bg-bg-200/50 dark:bg-bg-900 dark:hover:bg-bg-800/70"
    >
      <div className="flex items-center gap-3">
        <span
          className="w-min rounded-md p-2"
          style={{
            backgroundColor: ledger.color + '20'
          }}
        >
          <Icon
            icon={ledger.icon}
            style={{
              color: ledger.color
            }}
            className="size-8"
          />
        </span>
        <div>
          <h2 className="text-xl font-medium">{ledger.name}</h2>
          <p className="text-left text-sm text-bg-500">
            {typeof transactions !== 'string' &&
              transactions.filter(
                transaction => transaction.ledger === ledger.id
              ).length}{' '}
            transactions
          </p>
        </div>
      </div>
      <HamburgerMenu>
        <MenuItem
          icon="tabler:pencil"
          text="Edit"
          onClick={() => {
            setSelectedData(ledger)
            setModifyModalOpenType('update')
          }}
        />
        <MenuItem
          icon="tabler:trash"
          text="Delete"
          isRed
          onClick={() => {
            setSelectedData(ledger)
            setDeleteLedgersConfirmationOpen(true)
          }}
        />
      </HamburgerMenu>
    </button>
  )
}

export default LedgerItem
