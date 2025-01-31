import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { Button, FAB } from '@components/buttons'
import MenuItem from '@components/buttons/HamburgerMenu/components/MenuItem'
import ModuleHeader from '@components/layouts/module/ModuleHeader'
import ModuleWrapper from '@components/layouts/module/ModuleWrapper'
import DeleteConfirmationModal from '@components/modals/DeleteConfirmationModal'
import APIFallbackComponent from '@components/screens/APIComponentWithFallback'
import EmptyStateScreen from '@components/screens/EmptyStateScreen'
import { type IWalletAsset } from '@interfaces/wallet_interfaces'
import { useWalletContext } from '@providers/WalletProvider'
import AssetItem from './components/AssetItem'
import ModifyAssetsModal from './components/ModifyAssetsModal'

function Assets(): React.ReactElement {
  const { t } = useTranslation('modules.wallet')
  const { assets, refreshAssets, isAmountHidden, toggleAmountVisibility } =
    useWalletContext()
  const [modifyAssetsModalOpenType, setModifyModalOpenType] = useState<
    'create' | 'update' | null
  >(null)
  const [deleteAssetsConfirmationOpen, setDeleteAssetsConfirmationOpen] =
    useState(false)
  const [selectedData, setSelectedData] = useState<IWalletAsset | null>(null)
  const { hash } = useLocation()

  useEffect(() => {
    if (hash === '#new') {
      setSelectedData(null)
      setModifyModalOpenType('create')
    }
  }, [hash])

  return (
    <ModuleWrapper>
      <ModuleHeader
        icon="tabler:wallet"
        title="Assets"
        actionButton={
          typeof assets !== 'string' &&
          assets.length > 0 && (
            <Button
              className="hidden sm:flex"
              onClick={() => {
                setModifyModalOpenType('create')
              }}
              icon="tabler:plus"
              tProps={{
                item: t('items.asset')
              }}
            >
              new
            </Button>
          )
        }
        hamburgerMenuItems={
          <>
            <MenuItem
              text="Hide Amount"
              icon="tabler:eye-off"
              onClick={() => {
                toggleAmountVisibility(!isAmountHidden)
              }}
              isToggled={isAmountHidden}
            />
          </>
        }
      />
      <APIFallbackComponent data={assets}>
        {assets =>
          assets.length > 0 ? (
            <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {assets.map(asset => (
                <AssetItem
                  key={asset.id}
                  asset={asset}
                  setSelectedData={setSelectedData}
                  setModifyModalOpenType={setModifyModalOpenType}
                  setDeleteAssetsConfirmationOpen={
                    setDeleteAssetsConfirmationOpen
                  }
                />
              ))}
            </div>
          ) : (
            <EmptyStateScreen
              name="assets"
              namespace="modules.wallet"
              ctaContent="new"
              ctaTProps={{
                item: t('items.asset')
              }}
              onCTAClick={setModifyModalOpenType}
              icon="tabler:wallet-off"
            />
          )
        }
      </APIFallbackComponent>
      {assets.length > 0 && (
        <FAB
          onClick={() => {
            setSelectedData(null)
            setModifyModalOpenType('create')
          }}
          icon="tabler:plus"
        />
      )}
      <ModifyAssetsModal
        existedData={selectedData}
        setExistedData={setSelectedData}
        openType={modifyAssetsModalOpenType}
        setOpenType={setModifyModalOpenType}
        refreshAssets={refreshAssets}
      />
      <DeleteConfirmationModal
        apiEndpoint="wallet/assets"
        isOpen={deleteAssetsConfirmationOpen}
        data={selectedData}
        itemName="asset account"
        onClose={() => {
          setDeleteAssetsConfirmationOpen(false)
          setSelectedData(null)
        }}
        updateDataLists={refreshAssets}
        nameKey="name"
      />
    </ModuleWrapper>
  )
}

export default Assets
