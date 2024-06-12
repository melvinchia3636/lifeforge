import { Icon } from '@iconify/react'
import React from 'react'
import HamburgerMenu from '@components/ButtonsAndInputs/HamburgerMenu'
import MenuItem from '@components/ButtonsAndInputs/HamburgerMenu/MenuItem'
import { type IWalletCategoryEntry } from '@interfaces/wallet_interfaces'

interface CategorySectionProps {
  categories: IWalletCategoryEntry[]
  type: 'income' | 'expenses'
  iconName: string
  setModifyCategoriesModalOpenType: React.Dispatch<
    React.SetStateAction<'income' | 'expenses' | 'update' | null>
  >
  setExistedData: (category: IWalletCategoryEntry) => void
  setDeleteCategoriesConfirmationOpen: (isOpen: boolean) => void
}

function CategorySection({
  categories,
  type,
  iconName,
  setModifyCategoriesModalOpenType,
  setExistedData,
  setDeleteCategoriesConfirmationOpen
}: CategorySectionProps): React.ReactElement {
  const filteredCategories = categories.filter(
    category => category.type === type
  )

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-lg font-medium text-bg-500">
          <Icon icon={iconName} className="size-6" />
          {type === 'income' ? 'Income' : 'Expenses'}
        </h2>
        <button
          onClick={() => {
            setModifyCategoriesModalOpenType(type)
          }}
          className="rounded-lg p-2 text-bg-500 transition-all hover:bg-bg-200/50 hover:text-bg-800 dark:hover:bg-bg-800 dark:hover:text-bg-100"
        >
          <Icon icon="tabler:plus" className="size-5" />
        </button>
      </div>
      <ul className="mb-4 flex flex-col divide-y divide-bg-200 dark:divide-bg-800">
        {filteredCategories.length > 0 ? (
          filteredCategories.map(category => (
            <li
              key={category.id}
              className="flex items-center justify-between gap-4 px-2 py-4"
            >
              <div className="flex items-center gap-4">
                <div
                  style={{
                    backgroundColor: category.color + '20'
                  }}
                  className="rounded-md p-2"
                >
                  <Icon
                    icon={category.icon}
                    className="size-6"
                    style={{
                      color: category.color
                    }}
                  />
                </div>
                <div className="font-semibold ">{category.name}</div>
              </div>
              <HamburgerMenu className="relative">
                <MenuItem
                  icon="tabler:pencil"
                  text="Edit"
                  onClick={() => {
                    setExistedData(category)
                    setModifyCategoriesModalOpenType('update')
                  }}
                />
                <MenuItem
                  icon="tabler:trash"
                  text="Delete"
                  onClick={() => {
                    setExistedData(category)
                    setDeleteCategoriesConfirmationOpen(true)
                  }}
                  isRed
                />
              </HamburgerMenu>
            </li>
          ))
        ) : (
          <p className="text-center text-bg-500">
            No {type === 'income' ? 'income' : 'expenses'} categories found
          </p>
        )}
      </ul>
    </>
  )
}

export default CategorySection
