import React from 'react'
import { useNavigate } from 'react-router'
import SidebarDivider from '@components/Sidebar/components/SidebarDivider'
import SidebarItem from '@components/Sidebar/components/SidebarItem'
import SidebarWrapper from '@components/Sidebar/components/SidebarWrapper'
import AssetsSection from './components/AssetsSection'
import CategoriesSection from './components/CategoriesSection'
import DateRangeSelector from './components/DateRangeSelector'
import LedgerSection from './components/LedgerSection'
import TypeSection from './components/TypeSection'

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  setManageCategoriesModalOpen
}: {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  setManageCategoriesModalOpen: React.Dispatch<
    React.SetStateAction<boolean | 'new'>
  >
}): React.ReactElement {
  const navigate = useNavigate()
  return (
    <SidebarWrapper isOpen={sidebarOpen} setOpen={setSidebarOpen}>
      <SidebarItem
        icon="tabler:list"
        name="All Transactions"
        active={location.search === ''}
        onClick={() => {
          navigate('/wallet/transactions')
          setSidebarOpen(false)
        }}
      />
      <SidebarDivider />
      <DateRangeSelector />
      <SidebarDivider />
      <TypeSection setSidebarOpen={setSidebarOpen} />
      <SidebarDivider />
      <CategoriesSection
        setManageCategoriesModalOpen={setManageCategoriesModalOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <SidebarDivider />
      <AssetsSection setSidebarOpen={setSidebarOpen} />
      <SidebarDivider />
      <LedgerSection setSidebarOpen={setSidebarOpen} />
    </SidebarWrapper>
  )
}

export default Sidebar
