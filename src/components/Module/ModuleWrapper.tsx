import React from 'react'
import Scrollbar from '@components/Scrollbar'
import { useGlobalStateContext } from '@providers/GlobalStateProvider'

function ModuleWrapper({
  children,
  className = ''
}: {
  children: any
  className?: string
}): React.ReactElement {
  const { subSidebarExpanded } = useGlobalStateContext()

  return (
    <Scrollbar
      className={`absolute ${
        subSidebarExpanded
          ? 'top-0'
          : 'no-overflow-x top-20 !h-[calc(100%-4rem)] sm:top-28 sm:!h-[calc(100%-7rem)]'
      } flex min-h-0 flex-col transition-all ${className}`}
    >
      <div className="flex w-full flex-1 flex-col px-4 sm:px-12">
        {children}
      </div>
    </Scrollbar>
  )
}

export default ModuleWrapper
