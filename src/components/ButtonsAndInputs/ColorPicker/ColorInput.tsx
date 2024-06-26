import { Icon } from '@iconify/react'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { toCamelCase } from '@utils/strings'

function ColorInput({
  name,
  color,
  updateColor,
  setColorPickerOpen
}: {
  name: string
  color: string
  updateColor: (e: React.ChangeEvent<HTMLInputElement>) => void
  setColorPickerOpen: React.Dispatch<React.SetStateAction<boolean>>
}): React.ReactElement {
  const { t } = useTranslation()

  const handleColorPickerOpen = useCallback(() => {
    setColorPickerOpen(true)
  }, [setColorPickerOpen])

  return (
    <div className="group relative mt-4 flex items-center gap-1 rounded-t-lg border-b-2 border-bg-500 bg-bg-200/50 focus-within:!border-custom-500 dark:bg-bg-800/50">
      <Icon
        icon="tabler:palette"
        className={`ml-6 size-6 shrink-0 ${
          color !== '' ? '' : 'text-bg-500'
        } group-focus-within:!text-custom-500`}
      />

      <div className="flex w-full items-center gap-2">
        <span
          className={`pointer-events-none absolute left-[4.2rem] font-medium tracking-wide text-bg-500 group-focus-within:!text-custom-500 ${
            color.length === 0
              ? 'top-1/2 -translate-y-1/2 group-focus-within:top-6 group-focus-within:text-[14px]'
              : 'top-6 -translate-y-1/2 text-[14px]'
          }`}
        >
          {t(`input.${toCamelCase(name)}`)}
        </span>
        <div className="mr-12 mt-6 flex w-full items-center gap-2 pl-4">
          <div
            className="mt-0.5 size-3 shrink-0 rounded-full"
            style={{
              backgroundColor: color
            }}
          ></div>
          <input
            value={color}
            onChange={updateColor}
            placeholder="#FFFFFF"
            className="h-8 w-full rounded-lg bg-transparent p-6 pl-0 tracking-wide placeholder:text-transparent focus:outline-none focus:placeholder:text-bg-500"
          />
        </div>
        <button
          onClick={() => {
            handleColorPickerOpen()
          }}
          className="mr-4 shrink-0 rounded-lg p-2 text-bg-500 hover:bg-bg-500/30 hover:text-bg-200 focus:outline-none"
        >
          <Icon icon="tabler:color-picker" className="size-6" />
        </button>
      </div>
    </div>
  )
}

export default ColorInput
