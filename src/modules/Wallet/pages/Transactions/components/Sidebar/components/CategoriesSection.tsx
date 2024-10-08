/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import APIComponentWithFallback from '@components/Screens/APIComponentWithFallback'
import SidebarItem from '@components/Sidebar/components/SidebarItem'
import SidebarTitle from '@components/Sidebar/components/SidebarTitle'
import { useWalletContext } from '@providers/WalletProvider'

function CategoriesSection({
  setManageCategoriesModalOpen,
  setSidebarOpen
}: {
  setManageCategoriesModalOpen: React.Dispatch<
    React.SetStateAction<boolean | 'new'>
  >
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}): React.ReactElement {
  const { categories, transactions } = useWalletContext()
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <>
      <SidebarTitle
        name="categories"
        actionButtonIcon="tabler:plus"
        actionButtonOnClick={() => {
          setManageCategoriesModalOpen('new')
        }}
      />
      <APIComponentWithFallback data={categories}>
        {categories => (
          <>
            {[
              {
                icon: 'tabler:tag',
                name: 'All',
                color: 'white',
                id: null,
                type: 'all'
              }
            ]
              .concat(
                categories.sort(
                  (a, b) =>
                    ['income', 'expenses'].indexOf(a.type) -
                    ['income', 'expenses'].indexOf(b.type)
                ) as any
              )
              .map(({ icon, name, color, id, type }) => (
                <SidebarItem
                  key={id}
                  name={name}
                  icon={icon}
                  smallIcon={
                    <Icon
                      icon={
                        {
                          income: 'tabler:login-2',
                          expenses: 'tabler:logout',
                          all: 'tabler:arrow-bar-both'
                        }[type] ?? ''
                      }
                      className={`absolute -bottom-2 -right-2 size-4 shrink-0 ${
                        {
                          income: 'text-green-500',
                          expenses: 'text-red-500',
                          all: 'text-yellow-500'
                        }[type]
                      }`}
                    />
                  }
                  color={color}
                  active={searchParams.get('category') === id}
                  onClick={() => {
                    if (name === 'All') {
                      setSearchParams(searchParams => {
                        searchParams.delete('category')
                        searchParams.delete('type')
                        return searchParams
                      })
                      setSidebarOpen(false)
                      return
                    }
                    setSearchParams({
                      ...Object.fromEntries(searchParams.entries()),
                      category: id!,
                      type
                    })
                    setSidebarOpen(false)
                  }}
                  needTranslate={false}
                  number={
                    typeof transactions !== 'string'
                      ? transactions.filter(
                          transaction =>
                            transaction.category === id || name === 'All'
                        ).length
                      : 0
                  }
                  onCancelButtonClick={
                    name !== 'All'
                      ? () => {
                          setSearchParams(searchParams => {
                            searchParams.delete('category')
                            searchParams.delete('type')
                            return searchParams
                          })
                          setSidebarOpen(false)
                        }
                      : undefined
                  }
                />
              ))}
          </>
        )}
      </APIComponentWithFallback>
    </>
  )
}

export default CategoriesSection
