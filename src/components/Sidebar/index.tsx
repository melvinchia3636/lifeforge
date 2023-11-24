/* eslint-disable multiline-ternary */
import React, { useContext } from 'react'
import { GlobalStateContext } from '../../providers/GlobalStateProvider'
import SidebarItems from './components/SidebarItems'
import SidebarHeader from './components/SidebarHeader'

export default function Sidebar(): React.JSX.Element {
  const { sidebarExpanded } = useContext(GlobalStateContext)

  return (
    <aside
      className={`${
        sidebarExpanded ? 'w-1/5' : 'w-[5.4rem]'
      } flex h-full shrink-0 flex-col rounded-r-2xl bg-neutral-800/50`}
    >
      <SidebarHeader />
      <SidebarItems />
    </aside>
  )
}
