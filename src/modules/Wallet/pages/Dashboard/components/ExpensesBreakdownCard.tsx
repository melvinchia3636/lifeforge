import { Icon } from '@iconify/react'
import React, { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import APIComponentWithFallback from '@components/Screens/APIComponentWithFallback'
import Scrollbar from '@components/Scrollbar'
import { useWalletContext } from '@providers/WalletProvider'
import { numberToMoney } from '@utils/strings'

const options2 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  cutout: '80%'
}

function ExpensesBreakdownCard(): React.ReactElement {
  const { categories, transactions, incomeExpenses } = useWalletContext()
  const spentOnEachCategory = useMemo(() => {
    if (typeof categories === 'string' || typeof transactions === 'string') {
      return []
    }

    return categories
      .filter(category => category.type === 'expenses')
      .map(category =>
        transactions
          .filter(transaction => transaction.category === category.id)
          .reduce((acc, curr) => acc + curr.amount, 0)
      )
  }, [categories, transactions])
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="col-span-1 row-span-4 flex w-full min-w-0 flex-col rounded-lg bg-bg-50 p-6 shadow-custom dark:bg-bg-900">
      <div className="flex-between flex w-full min-w-0 gap-4">
        <h1 className="flex w-full min-w-0 items-center gap-2 text-xl font-semibold">
          <Icon icon="tabler:chart-donut-3" className="shrink-0 text-2xl" />
          <span className="ml-2 w-full min-w-0 truncate">
            {t('dashboard.widgets.expensesBreakdown.title')}
          </span>
        </h1>
        <button
          onClick={() => {
            navigate('/wallet/transactions?type=expenses')
          }}
          className="flex items-center gap-2 rounded-lg p-2 font-medium text-bg-500 transition-all hover:bg-bg-200/50 hover:text-bg-800 dark:hover:bg-bg-700/30 dark:hover:text-bg-100"
        >
          <Icon icon="tabler:chevron-right" className="text-xl" />
        </button>
      </div>
      <APIComponentWithFallback data={transactions}>
        {transactions => (
          <APIComponentWithFallback data={categories}>
            {categories => (
              <>
                <div className="relative mx-auto mt-6 flex aspect-square w-4/5 min-w-0 flex-col gap-4">
                  <div className="absolute left-1/2 top-1/2 mt-2 flex size-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
                    <div className="text-4xl font-medium">
                      <span className="mr-1 text-xl text-bg-500">RM</span>
                      {typeof incomeExpenses !== 'string' &&
                        numberToMoney(incomeExpenses.monthlyExpenses)}
                    </div>
                    <div className="mt-2 w-1/2 text-center text-base text-bg-500">
                      Total spending for this month
                    </div>
                  </div>
                  <Doughnut
                    data={{
                      labels: categories
                        .filter(category => category.type === 'expenses')
                        .map(category => category.name),
                      datasets: [
                        {
                          label: 'Monies spent',
                          data: spentOnEachCategory,
                          backgroundColor: categories
                            .filter(category => category.type === 'expenses')
                            .map(category => category.color + '20'),
                          borderColor: categories
                            .filter(category => category.type === 'expenses')
                            .map(category => category.color),
                          borderWidth: 1
                        }
                      ]
                    }}
                    options={options2}
                    className="relative aspect-square w-full min-w-0"
                  />
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                  {categories
                    .filter(category => category.type === 'expenses')
                    .map(category => (
                      <div
                        key={category.id}
                        className="flex items-center gap-2"
                      >
                        <span
                          className="-mb-0.5 size-3 rounded-full"
                          style={{
                            backgroundColor: category.color
                          }}
                        ></span>
                        <span className="text-sm">{category.name}</span>
                      </div>
                    ))}
                </div>
                <Scrollbar autoHeight autoHeightMax={384} className="mt-6">
                  <ul className="flex flex-col divide-y divide-bg-200 dark:divide-bg-800">
                    {categories
                      .filter(category => category.type === 'expenses')
                      .map(category => (
                        <Link
                          key={category.id}
                          to={`/wallet/transactions?type=expenses&category=${category.id}`}
                          className="flex-between flex gap-4 p-4 transition-all hover:bg-bg-100 dark:hover:bg-bg-800/50"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className="rounded-md bg-blue-500/20 p-2"
                              style={{
                                backgroundColor: category.color + '20',
                                color: category.color
                              }}
                            >
                              <Icon icon={category.icon} className="size-6" />
                            </div>
                            <div className="flex flex-col">
                              <div className="font-semibold ">
                                {category.name}
                              </div>
                              <div className="text-sm text-bg-500">
                                {
                                  transactions.filter(
                                    transaction =>
                                      transaction.category === category.id
                                  ).length
                                }{' '}
                                transactions
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="text-right font-medium">
                              - RM{' '}
                              {transactions
                                .filter(
                                  transaction =>
                                    transaction.category === category.id
                                )
                                .reduce((acc, curr) => acc + curr.amount, 0)
                                .toFixed(2)}
                            </div>
                            <div className="text-right text-sm text-bg-500">
                              {(
                                (transactions
                                  .filter(
                                    transaction =>
                                      transaction.category === category.id
                                  )
                                  .reduce((acc, curr) => acc + curr.amount, 0) /
                                  transactions
                                    .filter(
                                      transaction =>
                                        transaction.type === 'expenses'
                                    )
                                    .reduce(
                                      (acc, curr) => acc + curr.amount,
                                      0
                                    )) *
                                100
                              ).toFixed(2)}
                              %
                            </div>
                          </div>
                        </Link>
                      ))}
                  </ul>
                </Scrollbar>
              </>
            )}
          </APIComponentWithFallback>
        )}
      </APIComponentWithFallback>
    </div>
  )
}

export default ExpensesBreakdownCard
