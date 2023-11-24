import React, { useContext } from 'react'
import { Icon } from '@iconify/react'
import { GlobalStateContext } from '../providers/GlobalStateProvider'

export default function Header(): React.ReactElement {
  const { sidebarExpanded, toggleSidebar } = useContext(GlobalStateContext)

  return (
    <header className="flex w-full items-center justify-between gap-8 p-12">
      <div className="flex w-full items-center gap-4">
        {!sidebarExpanded && (
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-4 text-neutral-500 transition-all hover:bg-neutral-800 hover:text-neutral-100"
          >
            <Icon icon="tabler:menu" className="text-2xl" />
          </button>
        )}
        <div className="flex w-full items-center gap-4 rounded-lg bg-neutral-800/50 p-4">
          <Icon icon="tabler:search" className="h-5 w-5 text-neutral-500" />
          <input
            type="text"
            placeholder="Quick navigate & search ... (Press / to focus)"
            className="w-full bg-transparent text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative rounded-lg p-4 text-neutral-500 transition-all hover:bg-neutral-800 hover:text-neutral-100">
          <Icon icon="tabler:bell" className="text-2xl" />
          <div className="absolute bottom-4 right-4 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-neutral-800" />
          <div className="flex flex-col">
            <div className="font-semibold text-neutral-50">John Doe</div>
            <div className="text-sm text-neutral-500">Administrator</div>
          </div>
          <Icon
            icon="tabler:chevron-down"
            className="stroke-[2px] text-neutral-400"
          />
        </div>
      </div>
    </header>
  )
}
