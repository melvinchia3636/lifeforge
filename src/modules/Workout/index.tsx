import React from 'react'
import ModuleHeader from '@components/layouts/module/ModuleHeader'
import ModuleWrapper from '@components/layouts/module/ModuleWrapper'

function Workout(): React.ReactElement {
  return (
    <ModuleWrapper>
      <ModuleHeader title="Workout" icon="tabler:barbell" />
    </ModuleWrapper>
  )
}

export default Workout
