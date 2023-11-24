import React from 'react'

interface SidebarItemProps {
  name: string
}

function SidebarTitle({ name }: SidebarItemProps): React.JSX.Element {
  return (
    <li className="flex items-center gap-4 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-neutral-600 transition-all">
      {name}
    </li>
  )
}

export default SidebarTitle
