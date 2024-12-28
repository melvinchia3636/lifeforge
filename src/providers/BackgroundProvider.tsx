import React from 'react'
import { BG_BLURS } from '@constants/bg_blurs'
import { usePersonalizationContext } from './PersonalizationProvider'

function BackgroundProvider({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  const {
    bgImage,
    theme,
    backdropFilters: { brightness, blur, contrast, saturation, overlayOpacity }
  } = usePersonalizationContext()

  return (
    <div
      className={`relative isolate flex h-dvh w-full ${
        bgImage !== '' && 'bg-cover bg-center bg-no-repeat'
      }`}
      style={
        bgImage !== ''
          ? {
              backgroundImage: `url(${bgImage})`
            }
          : {}
      }
    >
      {bgImage !== '' && (
        <div
          className="absolute left-0 top-0 z-[-1] size-full"
          style={{
            backgroundColor: `rgb(var(--color-bg-${
              (theme === 'system' &&
                window.matchMedia('(prefers-color-scheme: dark)').matches) ||
              theme === 'dark'
                ? '950'
                : '50'
            }) / ${overlayOpacity}%)`,
            backdropFilter:
              bgImage !== ''
                ? `brightness(${brightness}%) blur(${BG_BLURS[blur]}) contrast(${contrast}%) saturate(${saturation}%)`
                : ''
          }}
        />
      )}

      {children}
    </div>
  )
}

export default BackgroundProvider
