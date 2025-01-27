import { Switch as HeadlessSwitch } from '@headlessui/react'
import React from 'react'
import useThemeColors from '@hooks/useThemeColor'
import { isLightColor } from '@utils/colors'

function Switch({
  checked,
  onChange
}: {
  checked: boolean
  onChange: () => void
}): React.ReactElement {
  const { darkerComponentBgWithHover, theme } = useThemeColors()

  const getStateClassName = () => {
    if (checked) {
      return `translate-x-6 ${isLightColor(theme) ? 'bg-bg-800' : 'bg-bg-100'}`
    }

    return 'translate-x-1 bg-bg-50 dark:bg-bg-500'
  }

  return (
    <HeadlessSwitch
      checked={checked}
      onChange={onChange}
      className={`${
        checked ? 'bg-custom-500' : darkerComponentBgWithHover
      } relative inline-flex h-6 w-11 shrink-0 items-center rounded-full`}
    >
      <span
        className={`${getStateClassName()} inline-block size-4 shrink-0 rounded-full transition`}
      />
    </HeadlessSwitch>
  )
}

export default Switch
