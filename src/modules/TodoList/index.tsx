import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import SidebarTitle from '../../components/Sidebar/components/SidebarTitle'
import SidebarItem from '../../components/Sidebar/components/SidebarItem'
import SidebarDivider from '../../components/Sidebar/components/SidebarDivider'

function TodoList(): React.JSX.Element {
  return (
    <section className="flex h-full min-h-0 w-full flex-1 flex-col px-12">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold text-neutral-50">Todo List</h1>
        <button className="rounded-lg p-4 text-neutral-500 transition-all hover:bg-neutral-800 hover:text-neutral-100">
          <Icon icon="tabler:dots-vertical" className="text-2xl" />
        </button>
      </div>
      <div className="mb-12 mt-8 flex min-h-0 w-full flex-1">
        <aside className="h-full w-1/4 overflow-y-scroll rounded-lg bg-neutral-800/50 py-4">
          <ul className="flex flex-col overflow-y-hidden  hover:overflow-y-scroll">
            <SidebarTitle name="tasks" />
            {[
              ['tabler:article', 'All'],
              ['tabler:calendar-exclamation', 'Today'],
              ['tabler:calendar-up', 'Upcoming'],
              ['tabler:calendar-x', 'Overdue'],
              ['tabler:calendar-check', 'Completed']
            ].map(([icon, name], index) => (
              <li
                key={index}
                className="relative flex items-center gap-6 px-4 font-medium text-neutral-400 transition-all"
              >
                <div className="flex w-full items-center gap-6 whitespace-nowrap rounded-lg p-4 hover:bg-neutral-800">
                  <Icon icon={icon} className="h-6 w-6 shrink-0" />
                  <div className="flex w-full items-center justify-between">
                    {name}
                  </div>
                  <span className="text-sm">
                    {Math.floor(Math.random() * 10)}
                  </span>
                </div>
              </li>
            ))}
            <SidebarDivider />
            <SidebarTitle name="categories" />
            {[
              ['tabler:code', 'Code', 'bg-green-500'],
              ['tabler:book', 'Study', 'bg-blue-500'],
              ['tabler:clipboard-list', 'Work', 'bg-yellow-500'],
              ['tabler:heart', 'Health', 'bg-red-500'],
              ['tabler:shopping-cart', 'Shopping', 'bg-purple-500'],
              ['tabler:coffee', 'Leisure', 'bg-pink-500']
            ].map(([icon, name, color], index) => (
              <li
                key={index}
                className="relative flex items-center gap-6 px-4 font-medium text-neutral-400 transition-all"
              >
                <div className="flex w-full items-center gap-6 whitespace-nowrap rounded-lg p-4 hover:bg-neutral-800">
                  <span className={`block h-8 w-1.5 rounded-full ${color}`} />
                  <Icon icon={icon} className="h-6 w-6 shrink-0" />
                  <div className="flex w-full items-center justify-between">
                    {name}
                  </div>
                  <span className="text-sm">
                    {Math.floor(Math.random() * 10)}
                  </span>
                </div>
              </li>
            ))}
            <SidebarDivider />
            <SidebarTitle name="Tags" />
            {[
              ['Design', 'bg-green-500'],
              ['Frontend', 'bg-blue-500'],
              ['Backend', 'bg-yellow-500'],
              ['Marketing', 'bg-red-500'],
              ['Sales', 'bg-purple-500'],
              ['Support', 'bg-pink-500']
            ].map(([name, color], index) => (
              <li
                key={index}
                className="relative flex items-center gap-6 px-4 font-medium text-neutral-400 transition-all"
              >
                <div className="flex w-full items-center gap-6 whitespace-nowrap rounded-lg p-4 hover:bg-neutral-800">
                  <span className={`block h-1.5 w-1.5 rounded-full ${color}`} />
                  <div className="flex w-full items-center justify-between">
                    {name}
                  </div>
                  <span className="text-sm">
                    {Math.floor(Math.random() * 10)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
        <div className="ml-12 h-full flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold text-neutral-50">
              All Tasks <span className="text-base text-neutral-400">(10)</span>
            </h1>
          </div>
          <div className="my-8 flex w-full items-center gap-4 rounded-lg bg-neutral-800/50 p-6">
            <Icon icon="tabler:search" className="h-5 w-5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search tasks ..."
              className="w-full bg-transparent text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
            />
          </div>
          <ul className="mt-6 flex flex-col gap-4">
            <li className="flex items-center justify-center">
              <button className="flex w-full items-center gap-2 rounded-lg border-2 border-dashed border-neutral-700 p-6 font-semibold uppercase tracking-widest text-neutral-700 hover:bg-neutral-800/30">
                <Icon icon="tabler:plus" className="text-2xl" />
                <span className="ml-1">Add New Task</span>
              </button>
            </li>
            <li className="flex items-center justify-between gap-4 rounded-lg border-l-4 border-indigo-500 bg-neutral-800 p-4 px-6">
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-neutral-50">
                  Buy groceries
                </div>
                <div className="text-sm text-rose-500">
                  10:00 AM, 23 Nov 2023 (overdue 8 hours)
                </div>
              </div>
              <button className="h-6 w-6 rounded-full border-2 border-neutral-500 transition-all hover:border-orange-500" />
            </li>
            <li className="flex items-center justify-between gap-4 rounded-lg border-l-4 border-orange-500 bg-neutral-800 p-4 px-6">
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-neutral-50">Do homework</div>
                <div className="text-sm text-neutral-500">
                  00:00 AM, 31 Jan 2024
                </div>
              </div>
              <button className="h-6 w-6 rounded-full border-2 border-neutral-500 transition-all hover:border-orange-500" />
            </li>
            <li className="flex items-center justify-between gap-4 rounded-lg border-l-4 border-orange-500 bg-neutral-800 p-4 px-6">
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-neutral-50">
                  Start doing revision for SPM Sejarah
                </div>
                <div className="text-sm text-neutral-500">
                  00:00 AM, 31 Jan 2024
                </div>
              </div>
              <button className="h-6 w-6 rounded-full border-2 border-neutral-500 transition-all hover:border-orange-500" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default TodoList
