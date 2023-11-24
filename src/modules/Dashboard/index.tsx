import React from 'react'
import { Icon } from '@iconify/react'

import StorageStatus from './modules/StorageStatus'
import CodeTime from './modules/CodeTime'
import WalletBalance from './modules/WalletBalance'
import TodaysEvent from './modules/TodaysEvent'
import Calendar from './modules/Calendar'
import TodoList from './modules/TodoList'

function Dashboard(): React.ReactElement {
  return (
    <section className="flex w-full flex-col overflow-y-auto px-12">
      <div className="mb-8 flex w-full flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold text-neutral-50">Dashboard</h1>
          <button className="rounded-lg p-4 text-neutral-500 transition-all hover:bg-neutral-800 hover:text-neutral-100">
            <Icon icon="tabler:dots-vertical" className="text-2xl" />
          </button>
        </div>
        <div className="mt-6 grid w-full grid-cols-4 grid-rows-3 gap-6">
          <StorageStatus />
          <CodeTime />
          <TodaysEvent />
          <WalletBalance />
          <TodoList />
          <Calendar />
        </div>
      </div>
    </section>
  )
}

export default Dashboard
