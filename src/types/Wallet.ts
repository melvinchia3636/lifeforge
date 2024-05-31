interface IWalletAssetEntry {
  collectionId: string
  collectionName: string
  created: string
  id: string
  updated: string
  name: string
  icon: string
  balance: string
}

interface IWalletLedgerEntry {
  collectionId: string
  collectionName: string
  created: string
  id: string
  updated: string
  name: string
  icon: string
  color: string
}

interface IWalletCategoryEntry extends IWalletLedgerEntry {}

interface IWalletTransactionEntry {
  collectionId: string
  collectionName: string
  created: string
  id: string
  updated: string
  type: 'income' | 'expenses' | 'transfer'
  particulars: string
  amount: number
  date: string
  category: string
  asset: string
  ledger: string
}

export type {
  IWalletAssetEntry,
  IWalletLedgerEntry,
  IWalletTransactionEntry,
  IWalletCategoryEntry
}
