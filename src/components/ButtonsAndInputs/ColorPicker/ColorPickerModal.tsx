import { Icon } from '@iconify/react'
import { type ColorResult, Colorful, EditableInput } from '@uiw/react-color'
import React, { useCallback, useEffect, useState } from 'react'
import Modal from '../../Modals/Modal'
import Button from '../Button'

function checkContrast(hexColor: string): string {
  const r = parseInt(hexColor.substr(1, 2), 16)
  const g = parseInt(hexColor.substr(3, 2), 16)
  const b = parseInt(hexColor.substr(5, 2), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#000000' : '#ffffff'
}

function ColorPickerModal({
  isOpen,
  setOpen,
  color,
  setColor
}: {
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  color: string
  setColor: React.Dispatch<React.SetStateAction<string>>
}): React.ReactElement {
  const [innerColor, setInnerColor] = useState(color.toLowerCase())

  const confirmColor = useCallback(() => {
    setColor(innerColor)
    setOpen(false)
  }, [innerColor, setColor, setOpen])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const handleColorChange = useCallback((color: ColorResult) => {
    setInnerColor(color.hex)
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInnerColor(`#${e.target.value}`)
    },
    []
  )

  useEffect(() => {
    setInnerColor(color.toLowerCase())
  }, [color])

  return (
    <Modal isOpen={isOpen}>
      <div className="mb-8 flex flex-between ">
        <h1 className="flex items-center gap-3 text-2xl font-semibold">
          <Icon icon="tabler:palette" className="h-7 w-7" />
          Color picker
        </h1>
        <button
          onClick={handleClose}
          className="rounded-md p-2 text-bg-100 transition-all hover:bg-bg-800"
        >
          <Icon icon="tabler:x" className="size-6" />
        </button>
      </div>
      <Colorful
        color={innerColor}
        onChange={handleColorChange}
        disableAlpha
        className="!w-full"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `.w-color-editable-input input {
            background-color: ${innerColor} !important;
            color: ${checkContrast(innerColor)} !important;
          }`
        }}
      />
      <EditableInput
        label="Hex"
        value={innerColor}
        onChange={handleInputChange}
        className="mt-4 border-0 p-4 text-2xl font-semibold"
      />
      <Button onClick={confirmColor} icon="tabler:check">
        Select
      </Button>
    </Modal>
  )
}

export default ColorPickerModal
