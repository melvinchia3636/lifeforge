import { Menu, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react'
import React from 'react'

interface MenuProps {
  children: React.ReactNode
  className?: string
  customTailwindColor?: string
  customHoverColor?: string
  style?: React.CSSProperties
  lighter?: boolean
  largerPadding?: boolean
  largerIcon?: boolean
  smallerPadding?: boolean
  customWidth?: string
  customIcon?: string
  onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClose?: () => void
}

function getPaddingClass(
  largerPadding?: boolean,
  smallerPadding?: boolean
): string {
  if (largerPadding === true) {
    return 'p-4'
  } else if (smallerPadding === true) {
    return 'p-1'
  } else {
    return 'p-2'
  }
}

function getColorClass(lighter?: boolean): string {
  if (lighter === true) {
    return 'text-bg-100 hover:bg-bg-700/50'
  } else {
    return 'text-bg-500 hover:bg-bg-200/50 hover:text-bg-800 dark:hover:text-bg-100 dark:hover:bg-bg-700/30'
  }
}

function HamburgerMenu(props: MenuProps): React.ReactElement {
  const {
    children,
    className,
    customTailwindColor,
    style = {},
    customHoverColor,
    lighter,
    largerPadding,
    largerIcon,
    smallerPadding,
    customWidth,
    customIcon,
    onButtonClick,
    onClose
  } = props

  return (
    <Menu as="div" className={className}>
      <Menu.Button
        style={style}
        onMouseEnter={e => {
          if (customHoverColor !== undefined) {
            e.currentTarget.style.backgroundColor = customHoverColor
          }
        }}
        onMouseLeave={e => {
          if (customHoverColor !== undefined) {
            e.currentTarget.style.backgroundColor = ''
          }
        }}
        onClick={e => {
          e.stopPropagation()
          if (onButtonClick !== undefined) {
            onButtonClick(e)
          }
        }}
        className={`rounded-md transition-all ${getPaddingClass(
          largerPadding,
          smallerPadding
        )} ${
          (style.color === undefined && customTailwindColor) ??
          getColorClass(lighter)
        }`}
      >
        <Icon
          icon={customIcon ?? 'tabler:dots-vertical'}
          className={largerIcon === true ? 'size-6' : 'size-5'}
        />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className={`absolute right-0 z-50 ${
          largerPadding === true ? 'top-9' : 'top-4'
        }`}
        afterLeave={() => {
          if (onClose !== undefined) {
            onClose()
          }
        }}
      >
        <Menu.Items
          className={`mt-6 ${
            customWidth ?? 'w-48'
          } overflow-hidden overscroll-contain rounded-md border border-bg-200 bg-bg-100 shadow-lg outline-none focus:outline-none dark:border-bg-700 dark:bg-bg-800`}
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default HamburgerMenu
