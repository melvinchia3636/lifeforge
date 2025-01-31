import { Icon } from '@iconify/react'

import React, { useEffect, useReducer, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateOrModifyButton } from '@components/buttons'
import {
  TextInput,
  ListboxOrComboboxInput,
  ListboxNullOption,
  ListboxOrComboboxOption
} from '@components/inputs'
import ModalHeader from '@components/modals/ModalHeader'
import ModalWrapper from '@components/modals/ModalWrapper'
import { type IGuitarTabsEntry } from '@interfaces/guitar_tabs_interfaces'
import APIRequest from '@utils/fetchData'

interface IState {
  name: string
  author: string
  type: 'singalong' | 'fingerstyle' | ''
}

const TYPES = [
  { id: 'fingerstyle', icon: 'mingcute:guitar-line' },
  { id: 'singalong', icon: 'mdi:guitar-pick-outline' }
]

function ModifyEntryModal({
  isOpen,
  onClose,
  existingItem,
  refreshEntries
}: {
  isOpen: boolean
  onClose: () => void
  existingItem: IGuitarTabsEntry | null
  refreshEntries: () => void
}): React.ReactElement {
  const { t } = useTranslation('modules.guitarTabs')

  function reducer(state: IState, action: Partial<IState>): IState {
    return { ...state, ...action }
  }

  const [data, setData] = useReducer(reducer, {
    name: '',
    author: '',
    type: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (existingItem !== null) {
      setData({
        name: existingItem.name,
        author: existingItem.author,
        type: existingItem.type
      })
    } else {
      setData({
        name: '',
        author: '',
        type: ''
      })
    }
  }, [existingItem])

  async function onSubmit(): Promise<void> {
    setLoading(true)

    await APIRequest({
      endpoint: `guitar-tabs/entries/${existingItem?.id}`,
      method: 'PUT',
      body: data,
      successInfo: 'update',
      failureInfo: 'update',
      callback: () => {
        refreshEntries()
        onClose()
      },
      finalCallback: () => {
        setLoading(false)
      }
    })
  }

  return (
    <ModalWrapper isOpen={isOpen} className="md:min-w-[30vw]!">
      <ModalHeader
        icon="tabler:pencil"
        onClose={onClose}
        title="guitarTabs.update"
        namespace="modules.guitarTabs"
      />
      <TextInput
        namespace="modules.guitarTabs"
        darker
        icon="tabler:music"
        name="Music Name"
        placeholder="A cool tab"
        value={data.name}
        updateValue={value => {
          setData({ name: value })
        }}
      />
      <TextInput
        namespace="modules.guitarTabs"
        darker
        icon="tabler:user"
        name="Author"
        placeholder="John Doe"
        value={data.author}
        updateValue={value => {
          setData({ author: value })
        }}
        className="mt-4"
      />
      <ListboxOrComboboxInput
        namespace="modules.guitarTabs"
        type="listbox"
        name="Score Type"
        icon="tabler:category"
        value={data.type}
        setValue={value => {
          setData({ type: value })
        }}
        buttonContent={
          <>
            <Icon
              icon={
                data.type !== ''
                  ? {
                      fingerstyle: 'mingcute:guitar-line',
                      singalong: 'mdi:guitar-pick-outline'
                    }[data.type]
                  : 'tabler:music-off'
              }
              className="size-5"
            />
            <span className="-mt-px block truncate">
              {data.type !== ''
                ? t(`scoreTypes.${data.type}`)
                : t('scoreTypes.uncategorized')}
            </span>
          </>
        }
      >
        <ListboxNullOption
          text={t('scoreTypes.uncategorized')}
          icon="tabler:music-off"
        />
        {TYPES.map(({ id, icon }) => (
          <ListboxOrComboboxOption
            key={id}
            text={t(`scoreTypes.${id}`)}
            icon={icon}
            value={id}
          />
        ))}
      </ListboxOrComboboxInput>
      <CreateOrModifyButton
        type="update"
        loading={loading}
        onClick={() => {
          onSubmit().catch(console.error)
        }}
      />
    </ModalWrapper>
  )
}

export default ModifyEntryModal
