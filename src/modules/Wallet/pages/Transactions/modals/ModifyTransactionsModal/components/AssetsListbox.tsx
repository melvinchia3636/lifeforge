import { Icon } from '@iconify/react'
import React from 'react'
import {
  ListboxOrComboboxInput,
  ListboxOrComboboxOption
} from '@components/inputs'

interface Asset {
  id: string
  name: string
  icon: string
}

interface AssetListboxProps {
  assets: Asset[]
  selectedAsset: string | null
  onAssetChange: (asset: string | null) => void
  label: string
  iconName: string
}

function AssetListbox({
  assets,
  selectedAsset,
  onAssetChange,
  label,
  iconName
}: AssetListboxProps): React.ReactElement {
  return (
    <ListboxOrComboboxInput
      type="listbox"
      name={label}
      icon={iconName}
      value={selectedAsset}
      setValue={onAssetChange}
      namespace="modules.wallet"
      buttonContent={
        <>
          <Icon
            icon={
              assets.find(l => l.id === selectedAsset)?.icon ??
              'tabler:wallet-off'
            }
            className="size-5"
          />
          <span className="-mt-px block truncate">
            {assets.find(l => l.id === selectedAsset)?.name ?? 'None'}
          </span>
        </>
      }
    >
      {assets.map(({ name, id, icon }, i) => (
        <ListboxOrComboboxOption key={i} text={name} icon={icon} value={id} />
      ))}
    </ListboxOrComboboxInput>
  )
}

export default AssetListbox
