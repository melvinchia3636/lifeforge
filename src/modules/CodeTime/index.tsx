import React from 'react'

import ModuleHeader from '@components/Module/ModuleHeader'
import ModuleWrapper from '@components/Module/ModuleWrapper'
import CodeTimeActivityCalendar from './components/CodeTimeActivityCalendar'
import CodeTimeStatistics from './components/CodeTimeStatistics'
import CodeTimeTopEntries from './components/CodeTimeTopEntries'

export default function CodeTime(): React.ReactElement {
  return (
    <ModuleWrapper>
      <ModuleHeader
        icon="tabler:code"
        title="Code Time"
        desc="See how much time you spend grinding code."
      />
      <div className="mt-8 min-h-0 w-full space-y-12">
        <CodeTimeStatistics />
        <CodeTimeActivityCalendar />
        {['projects', 'languages'].map(type => (
          <CodeTimeTopEntries
            key={type}
            type={type as 'projects' | 'languages'}
          />
        ))}
      </div>
    </ModuleWrapper>
  )
}
