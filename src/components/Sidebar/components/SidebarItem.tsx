import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useContext } from 'react'
import { GlobalStateContext } from '../../../providers/GlobalStateProvider'

interface SidebarItemProps {
  icon: string
  name: string
  subsection?: string[][]
}

function SidebarItem({
  icon,
  name,
  subsection
}: SidebarItemProps): React.JSX.Element {
  const { sidebarExpanded } = useContext(GlobalStateContext)
  return (
    <>
      <li
        className={`relative flex items-center gap-6 px-4 font-medium text-neutral-100 transition-all ${
          false
            ? "after:absolute after:right-0 after:top-1/2 after:h-8 after:w-1 after:-translate-y-1/2 after:rounded-full after:bg-teal-500 after:content-['']"
            : 'text-neutral-400'
        }`}
      >
        <div
          className={`flex w-full items-center gap-6 whitespace-nowrap rounded-lg p-4 hover:bg-neutral-800 ${
            false ? 'bg-neutral-800' : ''
          }`}
        >
          <Icon icon={icon} className="h-6 w-6 shrink-0" />
          {sidebarExpanded && (
            <div className="flex w-full items-center justify-between">
              {name}
              {subsection !== undefined && (
                <Icon
                  icon="tabler:chevron-right"
                  className="stroke-[2px] text-neutral-400"
                />
              )}
            </div>
          )}
        </div>
      </li>
      {subsection !== undefined && (
        <ul className="flex hidden flex-col gap-2">
          {subsection.map(([name, icon]) => (
            <li
              key={name}
              className="flex items-center gap-4 py-4 pl-[4.6rem] font-medium text-neutral-400 transition-all hover:bg-neutral-800"
            >
              <Icon icon={icon} className="h-6 w-6" />
              {name}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default SidebarItem
