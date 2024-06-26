import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePersonalizationContext } from '@providers/PersonalizationProvider'

const COLORS = ['bg-slate', 'bg-gray', 'bg-zinc', 'bg-neutral', 'bg-stone']

function BgTempSelector(): React.ReactElement {
  const { bgTemp, setBgTemp } = usePersonalizationContext()
  const { t } = useTranslation()

  return (
    <div className="mb-12 flex w-full flex-col flex-between gap-6 px-4 md:flex-row">
      <div>
        <h3 className="block w-full text-xl font-medium leading-normal md:w-auto">
          {t('personalization.bgTempSelector.title')}
        </h3>
        <p className="text-bg-500">
          {t('personalization.bgTempSelector.desc')}
        </p>
      </div>
      <div className="flex w-full flex-col items-center gap-2 md:w-auto">
        <div className="flex items-center gap-4">
          {COLORS.map((color, index) => (
            <button
              key={index}
              className={`size-8 rounded-full ${color} bg-bg-500 ${
                bgTemp === color
                  ? 'ring-2 ring-bg-100 ring-offset-2 ring-offset-bg-950'
                  : ''
              }`}
              onClick={() => {
                setBgTemp(color)
              }}
            ></button>
          ))}
        </div>
        <div className="flex w-full flex-between gap-2">
          <span className="shrink-0 text-sm font-medium text-bg-500">
            {t('personalization.bgTempSelector.cool')}
          </span>
          <span className="mt-px h-0.5 w-full bg-gradient-to-r from-blue-500 to-red-500"></span>
          <span className="shrink-0 text-sm font-medium text-bg-500">
            {t('personalization.bgTempSelector.warm')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default BgTempSelector
