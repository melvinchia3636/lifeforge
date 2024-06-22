import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import HamburgerMenu from '@components/ButtonsAndInputs/HamburgerMenu'
import MenuItem from '@components/ButtonsAndInputs/HamburgerMenu/MenuItem'
import { type IProjectsMCategory } from '@interfaces/projects_m_interfaces'

function CategoryItem({
  item,
  setSidebarOpen,
  setExistedData,
  setModifyModalOpenType,
  setDeleteConfirmationModalOpen
}: {
  item: IProjectsMCategory
  setSidebarOpen: (value: boolean) => void
  setExistedData: (value: IProjectsMCategory) => void
  setModifyModalOpenType: (value: 'create' | 'update' | null) => void
  setDeleteConfirmationModalOpen: (value: boolean) => void
}): React.ReactElement {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <li
      className={`relative flex h-16 items-center gap-6 px-4 font-medium transition-all ${
        searchParams.get('category') === item.id
          ? "text-bg-800 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-1 after:-translate-y-1/2 after:rounded-full after:bg-custom-500 after:content-[''] dark:text-bg-100"
          : 'text-bg-500 dark:text-bg-500'
      }`}
    >
      <div
        tabIndex={0}
        role="button"
        onClick={() => {
          setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            category: item.id
          })
          setSidebarOpen(false)
        }}
        className="group flex w-full items-center gap-6 whitespace-nowrap rounded-lg p-4 text-left hover:bg-bg-200/50 dark:hover:bg-bg-800"
      >
        <Icon icon={item.icon} className="size-6 shrink-0" />
        <div className="w-full truncate">{item.name}</div>
        <span className={!isMenuOpen ? 'text-sm group-hover:hidden' : 'hidden'}>
          {Math.floor(Math.random() * 100)}
        </span>
        {searchParams.get('category') === item.id ? (
          <button
            onClick={e => {
              e.stopPropagation()
              setSearchParams(searchParams => {
                searchParams.delete('category')
                return searchParams
              })
              setSidebarOpen(false)
            }}
            className="hidden overscroll-contain group-hover:block"
          >
            <Icon icon="tabler:x" className="size-5" />
          </button>
        ) : (
          <HamburgerMenu
            smallerPadding
            onButtonClick={e => {
              e.stopPropagation()
              setIsMenuOpen(true)
            }}
            className={`relative overscroll-contain ${
              !isMenuOpen ? 'hidden group-hover:block' : ''
            }`}
            onClose={() => {
              setIsMenuOpen(false)
            }}
          >
            <MenuItem
              icon="tabler:edit"
              onClick={e => {
                e.stopPropagation()
                setExistedData(item)
                setModifyModalOpenType('update')
              }}
              text="Edit"
            />
            <MenuItem
              isRed
              icon="tabler:trash"
              onClick={e => {
                e.stopPropagation()
                setExistedData(item)
                setDeleteConfirmationModalOpen(true)
              }}
              text="Delete"
            />
          </HamburgerMenu>
        )}
      </div>
    </li>
  )
}

export default CategoryItem
