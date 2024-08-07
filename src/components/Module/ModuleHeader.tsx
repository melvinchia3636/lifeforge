import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { toCamelCase } from '@utils/strings'

interface ModuleHeaderPropsWithHamburgerMenu {
  title: string | React.ReactNode
  desc?: string | React.ReactNode
  totalItems?: number
  hasHamburgerMenu?: false
  hamburgerMenuItems?: never
  actionButton?: React.ReactNode
}

interface ModuleHeaderPropsWithHamburgerMenuItems {
  title: string | React.ReactNode
  desc?: string | React.ReactNode
  totalItems?: number
  hasHamburgerMenu: true
  hamburgerMenuItems: React.ReactNode
  actionButton?: React.ReactNode
}

type ModuleHeaderProps =
  | ModuleHeaderPropsWithHamburgerMenu
  | ModuleHeaderPropsWithHamburgerMenuItems

function ModuleHeader({
  title,
  desc,
  totalItems,
  hasHamburgerMenu = false,
  hamburgerMenuItems,
  actionButton
}: ModuleHeaderProps): React.ReactElement {
  const { t } = useTranslation()

  return (
    <div className="flex-between flex gap-8">
      <div className="flex items-center gap-4">
        <div className="space-y-1">
          <h1 className="flex items-end gap-3 text-3xl font-semibold  md:text-4xl">
            {t(`modules.${toCamelCase(title?.toString() ?? '')}`)}
            <span className="text-base font-medium text-bg-500">
              {totalItems !== undefined ? `(${totalItems})` : ''}
            </span>
          </h1>
          {desc !== undefined && (
            <div className="text-bg-500">
              {t(
                `modules.descriptions.${toCamelCase(title?.toString() ?? '')}`
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {actionButton}
        {hasHamburgerMenu && (
          <Menu as="div" className="relative z-50 overscroll-contain">
            <MenuButton className="rounded-lg p-4 text-bg-500 transition-all hover:bg-bg-200/50 hover:text-bg-800 dark:hover:bg-bg-900 dark:hover:text-bg-100">
              <Icon icon="tabler:dots-vertical" className="size-5" />
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom end"
              className="mt-2 min-w-48 overflow-hidden overscroll-contain rounded-md bg-bg-100 shadow-lg outline-none transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 dark:bg-bg-800"
            >
              {hamburgerMenuItems}
            </MenuItems>
          </Menu>
        )}
      </div>
    </div>
  )
}

export default ModuleHeader
