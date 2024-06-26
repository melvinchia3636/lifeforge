import type BasePBCollection from '@interfaces/pocketbase_interfaces'

interface IWalletAssetEntry extends BasePBCollection {
  name: string
  icon: string
  balance: number
  starting_balance: number
}

interface IWalletLedgerEntry extends BasePBCollection {
  name: string
  icon: string
  color: string
}

interface IWalletCategoryEntry extends IWalletLedgerEntry {
  type: 'income' | 'expenses'
}

interface IWalletTransactionEntry extends BasePBCollection {
  type: 'income' | 'expenses' | 'transfer'
  side: 'debit' | 'credit'
  particulars: string
  amount: number
  date: string
  category: string
  asset: string
  ledger: string
  receipt: string
}

interface IWalletIncomeExpenses {
  totalIncome: number
  totalExpenses: number
  monthlyIncome: number
  monthlyExpenses: number
}

export type {
  IWalletAssetEntry,
  IWalletLedgerEntry,
  IWalletTransactionEntry,
  IWalletCategoryEntry,
  IWalletIncomeExpenses
}
