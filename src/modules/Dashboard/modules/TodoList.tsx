import React from 'react'
import { Icon } from '@iconify/react'

export default function TodoList(): React.ReactElement {
  return (
    <section className="col-span-2 row-span-2 flex w-full flex-col gap-4 rounded-lg bg-neutral-800/50 p-8">
      <h1 className="mb-2 flex items-center gap-2 text-xl font-semibold">
        <Icon icon="tabler:clipboard-list" className="text-2xl" />
        <span className="ml-2">Todo List</span>
      </h1>
      <ul className="flex flex-col gap-4">
        <li className="flex items-center justify-between gap-4 rounded-lg border-l-4 border-indigo-500 bg-neutral-800 p-4 px-6">
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-neutral-50">Buy groceries</div>
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
    </section>
  )
}
