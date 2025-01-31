import { useDebounce } from '@uidotdev/usehooks'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@components/buttons'
import { SearchInput } from '@components/inputs'
import ContentWrapperWithSidebar from '@components/layouts/module/ContentWrapperWithSidebar'
import ModuleHeader from '@components/layouts/module/ModuleHeader'
import ModuleWrapper from '@components/layouts/module/ModuleWrapper'
import DeleteConfirmationModal from '@components/modals/DeleteConfirmationModal'
import APIFallbackComponent from '@components/screens/APIComponentWithFallback'
import EmptyStateScreen from '@components/screens/EmptyStateScreen'
import Scrollbar from '@components/utilities/Scrollbar'
import useFetch from '@hooks/useFetch'
import {
  type IVirtualWardrobeSidebarData,
  type IVirtualWardrobeEntry
} from '@interfaces/virtual_wardrobe_interfaces'
import APIRequest from '@utils/fetchData'
import EntryItem from './components/EntryItem'
import Header from './components/Header'
import ModifyItemModal from './components/ModifyItemModal'
import Sidebar from './components/Sidebar'
import SessionCartModal from '../../components/SessionCartModal'

function VirtualWardrobeClothes(): React.ReactElement {
  const { t } = useTranslation('modules.virtualWardrobe')
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedSearchQuery = useDebounce(searchQuery.trim(), 500)

  const [modifyItemModalOpenType, setModifyItemModalOpenType] = useState<
    'create' | 'update' | null
  >(null)
  const [deleteItemConfirmModalOpen, setDeleteItemConfirmModalOpen] =
    useState<boolean>(false)
  const [sessionCartModalOpen, setSessionCartModalOpen] =
    useState<boolean>(false)

  const [existedData, setExistedData] = useState<IVirtualWardrobeEntry | null>(
    null
  )
  const [sidebarData, refreshSidebarData] =
    useFetch<IVirtualWardrobeSidebarData>(
      'virtual-wardrobe/entries/sidebar-data'
    )
  const [entries, refreshEntries, setEntries] = useFetch<
    IVirtualWardrobeEntry[]
  >(
    'virtual-wardrobe/entries?' +
      searchParams.toString() +
      '&q=' +
      debouncedSearchQuery
  )
  const [sessionCartItems, , setSessionCartItems] = useFetch<
    IVirtualWardrobeEntry[]
  >('virtual-wardrobe/session')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  async function handleAddToCart(entry: IVirtualWardrobeEntry): Promise<void> {
    await APIRequest({
      endpoint: `virtual-wardrobe/session/${entry.id}`,
      method: 'POST',
      successInfo: 'add',
      failureInfo: 'add',
      callback: () => {
        setSessionCartItems(prev => {
          if (typeof prev === 'string') return prev
          return [...prev, entry]
        })
      }
    })
  }

  return (
    <ModuleWrapper>
      <ModuleHeader
        title="Virtual Wardrobe"
        icon="tabler:shirt"
        actionButton={
          <>
            {typeof sessionCartItems !== 'string' && (
              <Button
                icon="tabler:shopping-bag"
                variant="no-bg"
                onClick={() => {
                  setSessionCartModalOpen(true)
                }}
              >
                {sessionCartItems.length !== 0 && (
                  <>({sessionCartItems.length})</>
                )}
              </Button>
            )}
            <Button
              icon="tabler:plus"
              onClick={() => {
                setModifyItemModalOpenType('create')
              }}
              tProps={{
                item: t('items.clothes')
              }}
            >
              new
            </Button>
          </>
        }
      />
      <div className="mt-6 flex min-h-0 w-full flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          setOpen={setSidebarOpen}
          sidebarData={sidebarData}
        />
        <ContentWrapperWithSidebar>
          <Header
            entries={entries}
            sidebarData={sidebarData}
            setSidebarOpen={setSidebarOpen}
          />
          <div className="flex gap-2">
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              stuffToSearch="clothes"
              namespace="modules.virtualWardrobe"
            />
          </div>
          <APIFallbackComponent data={entries}>
            {entries => {
              if (entries.length === 0) {
                if (
                  debouncedSearchQuery.trim() === '' &&
                  searchParams.toString() === ''
                ) {
                  return (
                    <EmptyStateScreen
                      icon="tabler:shirt-off"
                      namespace="modules.virtualWardrobe"
                      name="clothes"
                    />
                  )
                }

                return (
                  <EmptyStateScreen
                    icon="tabler:search-off"
                    namespace="modules.virtualWardrobe"
                    name="results"
                  />
                )
              }

              return (
                <Scrollbar className="mt-6 pb-16">
                  <ul className="mb-8 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
                    {entries.map(entry => (
                      <EntryItem
                        key={entry.id}
                        entry={entry}
                        onUpdate={() => {
                          setExistedData(entry)
                          setModifyItemModalOpenType('update')
                        }}
                        onDelete={() => {
                          setExistedData(entry)
                          setDeleteItemConfirmModalOpen(true)
                        }}
                        onAddToCart={async () => {
                          await handleAddToCart(entry)
                        }}
                      />
                    ))}
                  </ul>
                </Scrollbar>
              )
            }}
          </APIFallbackComponent>
        </ContentWrapperWithSidebar>
      </div>
      <ModifyItemModal
        openType={modifyItemModalOpenType}
        onClose={() => {
          setModifyItemModalOpenType(null)
          setExistedData(null)
        }}
        refreshEntries={() => {
          refreshEntries()
          refreshSidebarData()
        }}
        existedData={existedData}
      />
      <SessionCartModal
        isOpen={sessionCartModalOpen}
        onClose={() => {
          setSessionCartModalOpen(false)
        }}
        cartItems={sessionCartItems}
        setCartItems={setSessionCartItems}
        refreshEntries={refreshEntries}
      />

      <DeleteConfirmationModal
        apiEndpoint="virtual-wardrobe/entries"
        data={existedData}
        isOpen={deleteItemConfirmModalOpen}
        onClose={() => {
          setDeleteItemConfirmModalOpen(false)
        }}
        updateDataLists={() => {
          setEntries(prev => {
            if (typeof prev === 'string') return prev
            return prev.filter(e => e.id !== existedData?.id)
          })
          refreshSidebarData()
        }}
        itemName="item"
        nameKey="name"
      />
    </ModuleWrapper>
  )
}

export default VirtualWardrobeClothes
