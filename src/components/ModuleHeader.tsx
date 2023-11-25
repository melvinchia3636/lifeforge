import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

interface ModuleHeaderProps {
  title: string
  desc?: string | React.ReactNode
}

function ModuleHeader({ title, desc }: ModuleHeaderProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="flex items-center gap-3 text-4xl font-semibold text-neutral-50">
          {title}
        </h1>
        {desc !== undefined && <div className="text-neutral-400">{desc}</div>}
      </div>
      <button className="rounded-lg p-4 text-neutral-500 transition-all hover:bg-neutral-800 hover:text-neutral-100">
        <Icon icon="tabler:dots-vertical" className="text-2xl" />
      </button>
    </div>
  )
}

export default ModuleHeader
