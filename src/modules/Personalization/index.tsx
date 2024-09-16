import React from 'react'
import ModuleHeader from '@components/Module/ModuleHeader'
import ModuleWrapper from '@components/Module/ModuleWrapper'
import BgTempSelector from './components/BgTempSelector'
import FontFamilySelector from './components/FontFamilySelector'
import LanguageSelector from './components/LanguageSelector'
import ThemeColorSelector from './components/ThemeColorSelector'
import ThemeSelector from './components/ThemeSelector'

function Personalization(): React.ReactElement {
  return (
    <ModuleWrapper>
      <ModuleHeader
        icon="tabler:palette"
        title="Personalization"
        desc="Customise your experience with the app."
      />
      <div className="my-8">
        <LanguageSelector />
        <ThemeSelector />
        <ThemeColorSelector />
        <BgTempSelector />
        <FontFamilySelector />
      </div>
    </ModuleWrapper>
  )
}

export default Personalization
