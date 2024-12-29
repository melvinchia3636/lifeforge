/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Icon } from '@iconify/react'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import DashboardItem from '@components/Miscellaneous/DashboardItem'
import Scrollbar from '@components/Miscellaneous/Scrollbar'
import APIComponentWithFallback from '@components/Screens/APIComponentWithFallback'
import useThemeColors from '@hooks/useThemeColor'
import { useWalletContext } from '@providers/WalletProvider'
import { numberToMoney } from '@utils/strings'

function TransactionsCountCard(): React.ReactElement {
  const { componentBgLighterWithHover } = useThemeColors()
  const { transactions, isAmountHidden } = useWalletContext()
  const { t } = useTranslation()

  const amounts = useMemo<{
    income: {
      amount: number
      count: number
    }
    expenses: {
      amount: number
      count: number
    }
    transfer: {
      amount: number
      count: number
    }
  }>(() => {
    if (typeof transactions === 'string') {
      return {
        income: {
          amount: 0,
          count: 0
        },
        expenses: {
          amount: 0,
          count: 0
        },
        transfer: {
          amount: 0,
          count: 0
        }
      }
    }

    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income.amount += transaction.amount
          acc.income.count++
        } else if (transaction.type === 'expenses') {
          acc.expenses.amount += transaction.amount
          acc.expenses.count++
        }
        if (transaction.type === 'transfer') {
          acc.transfer.amount += transaction.amount / 2
          acc.transfer.count += 0.5
        }

        return acc
      },
      {
        income: {
          amount: 0,
          count: 0
        },
        expenses: {
          amount: 0,
          count: 0
        },
        transfer: {
          amount: 0,
          count: 0
        }
      }
    )
  }, [transactions])

  return (
    <DashboardItem
      icon="tabler:arrows-exchange"
      title={t('dashboard.widgets.transactionsCount')}
      className="col-span-1 row-span-1 min-h-96 xl:min-h-0"
      componentBesideTitle={
        <Link
          to="./transactions"
          className="flex items-center gap-2 rounded-lg p-2 text-bg-500 transition-all hover:bg-bg-100 hover:text-bg-800 dark:hover:bg-bg-700/30 dark:hover:text-bg-50"
        >
          <Icon icon="tabler:chevron-right" className="text-xl" />
        </Link>
      }
    >
      <APIComponentWithFallback data={transactions}>
        {transactions => (
          <Scrollbar className="mt-4">
            <ul className="space-y-2">
              {(
                [
                  ['income', 'bg-green-500'],
                  ['expenses', 'bg-red-500'],
                  ['transfer', 'bg-blue-500']
                ] as const
              ).map(([type, color]) => (
                <Link
                  key={type}
                  to={`/wallet/transactions#type=${type}`}
                  className={`flex-between flex flex-col gap-4 rounded-md p-4 transition-all sm:flex-row ${componentBgLighterWithHover}`}
                >
                  <div className="flex w-full items-center gap-4">
                    <div
                      className={`rounded-md ${color} size-4 shrink-0`}
                    ></div>
                    <div className="flex flex-col">
                      <div className="font-semibold ">
                        {t(`sidebar.wallet.${type}`)}
                      </div>
                      <div className="text-sm text-bg-500">
                        {amounts[type].count} {t('wallet.transactionCount')}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between sm:w-auto sm:flex-col sm:items-end">
                    <div
                      className={`flex gap-2 whitespace-nowrap text-right font-medium ${
                        isAmountHidden ? 'items-center' : 'items-end'
                      }`}
                    >
                      {{
                        income: '+',
                        expenses: '-',
                        transfer: ' '
                      }[type] || ''}{' '}
                      RM{' '}
                      {isAmountHidden ? (
                        <span className="flex items-center">
                          {Array(4)
                            .fill(0)
                            .map((_, i) => (
                              <Icon
                                key={i}
                                icon="uil:asterisk"
                                className="-mx-0.5 size-4"
                              />
                            ))}
                        </span>
                      ) : (
                        numberToMoney(amounts[type].amount)
                      )}
                    </div>
                    <div className="text-right text-sm text-bg-500">
                      {(
                        (amounts[type].amount /
                          transactions
                            .filter(transaction => transaction.amount)
                            .reduce(
                              (acc, curr) =>
                                acc +
                                curr.amount /
                                  (curr.type === 'transfer' ? 2 : 1),
                              0
                            )) *
                          100 || 0
                      ).toFixed(2)}
                      %
                    </div>
                  </div>
                </Link>
              ))}
            </ul>
          </Scrollbar>
        )}
      </APIComponentWithFallback>
    </DashboardItem>
  )
}

export default TransactionsCountCard
