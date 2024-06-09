import { faker } from '@faker-js/faker'
import { Icon } from '@iconify/react/dist/iconify.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import moment from 'moment'
import React from 'react'
import { Doughnut, Line } from 'react-chartjs-2'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Button from '@components/ButtonsAndInputs/Button'
import ModuleHeader from '@components/Module/ModuleHeader'
import ModuleWrapper from '@components/Module/ModuleWrapper'
import APIComponentWithFallback from '@components/Screens/APIComponentWithFallback'
import EmptyStateScreen from '@components/Screens/EmptyStateScreen'
import useFetch from '@hooks/useFetch'
import { type IWalletAssetEntry } from '@typedec/Wallet'
import { numberToMoney } from '@utils/strings'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  hover: {
    intersect: false
  }
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const data = {
  labels,
  datasets: [
    {
      label: 'Income',
      data: labels.map(_ => faker.number.int({ min: 100, max: 700 })),
      borderColor: 'rgb(34 197 94)',
      backgroundColor: 'rgb(34 197 94)',
      tension: 0.6,
      pointBorderColor: 'rgba(0, 0, 0, 0)',
      pointBackgroundColor: 'rgba(0, 0, 0, 0)'
    },
    {
      label: 'Expenses',
      data: labels.map(_ => faker.number.int({ min: 100, max: 700 })),
      borderColor: 'rgb(239 68 68)',
      backgroundColor: 'rgb(239 68 68)',
      tension: 0.6,
      pointBorderColor: 'rgba(0, 0, 0, 0)',
      pointBackgroundColor: 'rgba(0, 0, 0, 0)'
    }
  ]
}

const data2 = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
  ]
}

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

function Wallet(): React.ReactElement {
  const navigate = useNavigate()
  const [assets] = useFetch<IWalletAssetEntry[]>('wallet/assets/list')
  const [incomeExpenses] = useFetch<{
    totalIncome: number
    totalExpenses: number
    monthlyIncome: number
    monthlyExpenses: number
  }>(
    `wallet/transactions/income-expenses/${new Date().getFullYear()}/${
      new Date().getMonth() + 1
    }`
  )

  return (
    <ModuleWrapper>
      <ModuleHeader
        title="Wallet"
        desc="..."
        actionButton={
          <Button
            className="hidden md:flex"
            onClick={() => {
              navigate('/wallet/transactions#new')
            }}
            icon="tabler:plus"
          >
            Add Transaction
          </Button>
        }
      />
      <div className="mt-6 flex size-full grid-cols-3 grid-rows-[repeat(6,minmax(200px,1fr))] flex-col gap-4 overflow-y-auto pb-8 xl:grid">
        <div className="col-span-1 row-span-1 flex flex-col justify-between gap-4 rounded-lg bg-bg-50 p-6 shadow-custom dark:bg-bg-900">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <Icon icon="tabler:login-2" className="text-2xl" />
            <span className="ml-2">Income</span>
          </h1>
          {typeof incomeExpenses !== 'string' && (
            <>
              <p className="flex w-full items-end justify-start gap-2 text-5xl font-medium">
                <span className="-mb-0.5 text-2xl text-bg-500 xl:text-3xl">
                  RM
                </span>
                {numberToMoney(+incomeExpenses.totalIncome)}
              </p>
              <p>
                <span className="text-green-500">
                  +RM{numberToMoney(+incomeExpenses.monthlyIncome)}
                </span>{' '}
                from this month
              </p>
            </>
          )}
        </div>
        <div className="col-span-1 row-span-1 flex flex-col justify-between gap-4 rounded-lg bg-bg-50 p-6 shadow-custom dark:bg-bg-900">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <Icon icon="tabler:logout-2" className="text-2xl" />
            <span className="ml-2">Expenses</span>
          </h1>
          {typeof incomeExpenses !== 'string' && (
            <>
              <p className="flex w-full items-end justify-start gap-2 text-5xl font-medium">
                <span className="-mb-0.5 text-2xl text-bg-500 xl:text-3xl">
                  RM
                </span>
                {numberToMoney(+incomeExpenses.totalExpenses)}
              </p>
              <p>
                <span className="text-red-500">
                  -RM{numberToMoney(+incomeExpenses.monthlyExpenses)}
                </span>{' '}
                from this month
              </p>
            </>
          )}
        </div>
        <div className="col-span-1 row-span-2 flex h-full flex-col rounded-lg bg-bg-50 p-6 shadow-custom dark:bg-bg-900">
          <div className="flex items-center justify-between">
            <h1 className="flex items-center gap-2 text-xl font-semibold">
              <Icon icon="tabler:wallet" className="text-2xl" />
              <span className="ml-2">Balances</span>
            </h1>
            <Link
              to="./assets"
              className="flex items-center gap-2 rounded-lg p-2 text-bg-500 transition-all"
            >
              <span>Show more</span>
              <Icon icon="tabler:chevron-right" className="text-xl" />
            </Link>
          </div>
          <APIComponentWithFallback data={assets}>
            {typeof assets !== 'string' && assets.length > 0 ? (
              <ul className="mt-6 flex h-full flex-col gap-4 overflow-y-auto">
                {assets.map(asset => (
                  <li
                    key={asset.id}
                    className="flex w-full min-w-0 flex-1 flex-col items-center justify-between gap-4 rounded-lg bg-bg-100 p-6 shadow-[4px_4px_10px_rgba(0,0,0,0.1)] transition-all hover:bg-bg-200 dark:bg-bg-800 [@media(min-width:400px)]:flex-row"
                  >
                    <div className="flex w-full min-w-0 items-center gap-4">
                      <Icon icon={asset.icon} className="size-6 shrink-0" />
                      <div className="w-full min-w-0 truncate font-semibold">
                        {asset.name}
                      </div>
                    </div>
                    <div className="whitespace-nowrap text-right text-3xl font-medium">
                      <span className="text-xl text-bg-500">RM</span>{' '}
                      {(+asset.balance).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyStateScreen
                title="Oops! No assets found."
                description="You don't have any assets yet. Add some to get started."
                ctaContent="Add Asset"
                setModifyModalOpenType={() => {
                  navigate('/wallet/assets')
                }}
                icon="tabler:wallet-off"
              />
            )}
          </APIComponentWithFallback>
        </div>
        <div className="col-span-2 row-span-2 flex size-full flex-col rounded-lg bg-bg-50 p-6 shadow-custom dark:bg-bg-900">
          <div className="flex w-full items-center justify-between">
            <h1 className="flex items-center gap-2 text-xl font-semibold">
              <Icon icon="tabler:chart-dots" className="text-2xl" />
              <span className="ml-2">Statistics</span>
            </h1>
            <div className="hidden items-center gap-8 sm:flex">
              <div className="flex items-center gap-2">
                <span className="-mb-0.5 size-3 rounded-full bg-green-500"></span>
                <span className="text-sm">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="-mb-0.5 size-3 rounded-full bg-red-500"></span>
                <span className="text-sm">Expenses</span>
              </div>
            </div>
          </div>
          <div className="flex-center mt-6 flex size-full min-h-0 flex-1">
            <Line data={data} options={options} className="w-full" />
          </div>
          <div className="mt-4 flex items-center justify-center gap-8 sm:hidden">
            <div className="flex items-center gap-2">
              <span className="-mb-0.5 size-3 rounded-full bg-green-500"></span>
              <span className="text-sm">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="-mb-0.5 size-3 rounded-full bg-red-500"></span>
              <span className="text-sm">Expenses</span>
            </div>
          </div>
        </div>
        <div className="col-span-1 row-span-4 flex w-full min-w-0 flex-col rounded-lg bg-bg-50 p-6 shadow-custom dark:bg-bg-900">
          <div className="flex w-full min-w-0 items-center justify-between gap-4">
            <h1 className="flex w-full min-w-0 items-center gap-2 text-xl font-semibold">
              <Icon icon="tabler:chart-donut-3" className="shrink-0 text-2xl" />
              <span className="ml-2 w-full min-w-0 truncate">
                Expenses Breakdown
              </span>
            </h1>
            <button className="flex items-center gap-2 rounded-lg p-2 text-bg-500 transition-all">
              <span className="whitespace-nowrap">Show more</span>
              <Icon icon="tabler:chevron-right" className="text-xl" />
            </button>
          </div>
          <div className="relative mx-auto mt-6 flex aspect-square w-4/5 min-w-0 flex-col gap-4">
            <Doughnut
              data={data2}
              options={options2}
              className="aspect-square w-full min-w-0"
            />
            <div className="absolute left-1/2 top-1/2 mt-2 flex size-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
              <div className="text-4xl font-medium">
                <span className="mr-1 text-xl text-bg-500">RM</span>
                108.56
              </div>
              <div className="mt-2 w-1/2 text-center text-base text-bg-500">
                Total spending for this month
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="-mb-0.5 size-3 rounded-full bg-red-500"></span>
              <span className="text-sm">Food & Drinks</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="-mb-0.5 size-3 rounded-full bg-blue-500"></span>
              <span className="text-sm">Transport</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="-mb-0.5 size-3 rounded-full bg-yellow-500"></span>
              <span className="text-sm">Shops</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="-mb-0.5 size-3 rounded-full bg-fuchsia-500"></span>
              <span className="text-sm">Transfer</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="-mb-0.5 size-3 rounded-full bg-green-500"></span>
              <span className="text-sm">Entertainment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="-mb-0.5 size-3 rounded-full bg-purple-500"></span>
              <span className="text-sm">Others</span>
            </div>
          </div>
          <ul className="mt-6 flex flex-col divide-y divide-bg-200 overflow-y-auto dark:divide-bg-800">
            <li className="flex items-center justify-between gap-4  p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-red-500/20 p-2">
                  <Icon
                    icon="material-symbols:fastfood-outline-rounded"
                    className="size-6 text-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold ">Food & Drinks</div>
                  <div className="text-sm text-bg-500">5 transactions</div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-right">- RM 250.00</div>
                <div className="text-right text-sm text-bg-500">23%</div>
              </div>
            </li>
            <li className="flex items-center justify-between gap-4  p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-blue-500/20 p-2">
                  <Icon icon="tabler:car" className="size-6 text-blue-500" />
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold ">Transport</div>
                  <div className="text-sm text-bg-500">6 transactions</div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-right">- RM 101.38</div>
                <div className="text-right text-sm text-bg-500">18%</div>
              </div>
            </li>
            <li className="flex items-center justify-between gap-4  p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-yellow-500/20 p-2">
                  <Icon
                    icon="tabler:building-store"
                    className="size-6 text-yellow-500"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold">Shops</div>
                  <div className="text-sm text-bg-500">4 transactions</div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-right">- RM 64.41</div>
                <div className="text-right text-sm text-bg-500">16%</div>
              </div>
            </li>
            <li className="flex items-center justify-between gap-4  p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-fuchsia-500/20 p-2">
                  <Icon
                    icon="tabler:arrow-left-circle"
                    className="size-6 text-fuchsia-500"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold ">Transfer</div>
                  <div className="text-sm text-bg-500">3 transaction</div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-right">- RM 42.77</div>
                <div className="text-right text-sm text-bg-500">12%</div>
              </div>
            </li>
            <li className="flex items-center justify-between gap-4  p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-green-500/20 p-2">
                  <Icon icon="tabler:movie" className="size-6 text-green-500" />
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold ">Entertainment</div>
                  <div className="text-sm text-bg-500">0 transaction</div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-right">- RM 0.00</div>
                <div className="text-right text-sm text-bg-500">0%</div>
              </div>
            </li>
            <li className="flex items-center justify-between gap-4  p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-purple-500/20 p-2">
                  <Icon
                    icon="tabler:circle-plus"
                    className="size-6 text-purple-500"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="font-semibold ">Others</div>
                  <div className="text-sm text-bg-500">5 transactions</div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-right">- RM 162.00</div>
                <div className="text-right text-sm text-bg-500">20%</div>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-span-2 row-span-3 flex h-full flex-col rounded-lg bg-bg-50 p-6 shadow-custom dark:bg-bg-900">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <h1 className="flex w-full items-center gap-2 text-xl font-semibold sm:w-auto">
              <Icon icon="tabler:list" className="text-2xl" />
              <span className="ml-2">Recent Transactions</span>
            </h1>
            <div className="flex w-full items-center justify-between gap-2 rounded-md border-2 border-bg-200 p-4 dark:border-bg-800 sm:w-auto">
              <div className="flex items-center gap-2">
                <Icon icon="tabler:books" className="size-5" />
                <span>All ledgers</span>
              </div>
              <Icon
                icon="tabler:chevron-down"
                className="ml-4 size-4 text-bg-500"
              />
            </div>
          </div>
          <div className="mt-6 size-full overflow-y-auto">
            <table className="hidden w-full lg:table">
              <thead>
                <tr className="border-b-2 border-bg-200 text-bg-500 dark:border-bg-800">
                  <th className="py-2">Date</th>
                  <th className="py-2">Type</th>
                  <th className="py-2 text-left">Particular</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 30 }).map((_, i) => {
                  const randomType = faker.helpers.arrayElement([
                    'income',
                    'expenses',
                    'expenses'
                  ])
                  const randomName = faker.company.name()
                  const randomCategory = faker.helpers.arrayElement([
                    [
                      'Food & Drinks',
                      'bg-red-500/20 text-red-500',
                      'material-symbols:fastfood-outline-rounded'
                    ],
                    ['Transport', 'bg-blue-500/20 text-blue-500', 'tabler:car'],
                    [
                      'Shops',
                      'bg-yellow-500/20 text-yellow-500',
                      'tabler:building-store'
                    ],
                    [
                      'Transfer',
                      'bg-fuchsia-500/20 text-fuchsia-500',
                      'tabler:arrow-left-circle'
                    ],
                    [
                      'Entertainment',
                      'bg-green-500/20 text-green-500',
                      'tabler:movie'
                    ],
                    [
                      'Others',
                      'bg-purple-500/20 text-purple-500',
                      'tabler:circle-plus'
                    ]
                  ])
                  const randomAmount = faker.finance.amount()
                  const randomDate = moment(faker.date.anytime()).format(
                    'MMM DD, YYYY'
                  )

                  return (
                    <tr
                      key={i}
                      className="border-b border-bg-200 dark:border-bg-800"
                    >
                      <td className="py-2 text-center">{randomDate}</td>
                      <td className="py-4 text-center">
                        <span
                          className={`rounded-full px-3 py-1 text-sm ${
                            randomType === 'income'
                              ? 'bg-green-500/20 text-green-500'
                              : 'bg-red-500/20 text-red-500'
                          }`}
                        >
                          {randomType === 'income' ? 'Income' : 'Expenses'}
                        </span>
                      </td>
                      <td className="py-2">{randomName}</td>
                      <td className="py-2 text-center">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm ${randomCategory[1]}`}
                        >
                          <Icon icon={randomCategory[2]} className="size-4" />
                          {randomCategory[0]}
                        </span>
                      </td>
                      <td className="py-2 text-center">
                        <span
                          className={`${
                            randomType === 'income'
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`}
                        >
                          {randomType === 'income' ? '+' : '-'}
                          {randomAmount}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <ul className="flex flex-col gap-4 lg:hidden">
              {Array.from({ length: 30 }).map((_, i) => {
                const randomType = faker.helpers.arrayElement([
                  'income',
                  'expenses',
                  'expenses'
                ])
                const randomName = faker.company.name()
                const randomCategory = faker.helpers.arrayElement([
                  [
                    'Food & Drinks',
                    'bg-red-500/20 text-red-500',
                    'material-symbols:fastfood-outline-rounded'
                  ],
                  ['Transport', 'bg-blue-500/20 text-blue-500', 'tabler:car'],
                  [
                    'Shops',
                    'bg-yellow-500/20 text-yellow-500',
                    'tabler:building-store'
                  ],
                  [
                    'Transfer',
                    'bg-fuchsia-500/20 text-fuchsia-500',
                    'tabler:arrow-left-circle'
                  ],
                  [
                    'Entertainment',
                    'bg-green-500/20 text-green-500',
                    'tabler:movie'
                  ],
                  [
                    'Others',
                    'bg-purple-500/20 text-purple-500',
                    'tabler:circle-plus'
                  ]
                ])
                const randomAmount = faker.finance.amount()
                const randomDate = moment(faker.date.anytime()).format(
                  'MMM DD, YYYY'
                )

                return (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-4  p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`rounded-md ${randomCategory[1]} p-2`}>
                        <Icon icon={randomCategory[2]} className={'size-6'} />
                      </div>
                      <div className="flex flex-col">
                        <div className="font-semibold ">{randomName}</div>
                        <div className="text-sm text-bg-500">
                          {randomType === 'income' ? 'Income' : 'Expenses'}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-right">
                        <span
                          className={`${
                            randomType === 'income'
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`}
                        >
                          {randomType === 'income' ? '+' : '-'}
                          {randomAmount}
                        </span>
                      </div>
                      <div className="text-right text-sm text-bg-500">
                        {randomDate}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          navigate('/wallet/transactions#new')
        }}
        className="absolute bottom-6 right-6 z-10 flex items-center gap-2 rounded-lg bg-custom-500 p-4 font-semibold uppercase tracking-wider text-bg-100 shadow-lg hover:bg-custom-600 dark:text-bg-800 md:hidden"
      >
        <Icon icon="tabler:plus" className="size-6 shrink-0 transition-all" />
      </button>
    </ModuleWrapper>
  )
}

export default Wallet
