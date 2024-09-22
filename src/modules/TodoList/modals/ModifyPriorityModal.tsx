/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useDebounce } from '@uidotdev/usehooks'
import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ColorInput from '@components/ButtonsAndInputs/ColorPicker/ColorInput'
import ColorPickerModal from '@components/ButtonsAndInputs/ColorPicker/ColorPickerModal'
import CreateOrModifyButton from '@components/ButtonsAndInputs/CreateOrModifyButton'
import Input from '@components/ButtonsAndInputs/Input'
import Modal from '@components/Modals/Modal'
import ModalHeader from '@components/Modals/ModalHeader'
import { useTodoListContext } from '@providers/TodoListProvider'
import APIRequest from '@utils/fetchData'

function ModifyPriorityModal(): React.ReactElement {
  const {
    modifyPriorityModalOpenType: openType,
    setModifyPriorityModalOpenType: setOpenType,
    refreshPriorities,
    selectedPriority
  } = useTodoListContext()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [color, setColor] = useState('#FFFFFF')
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const innerOpenType = useDebounce(openType, openType === null ? 300 : 0)

  function updateListName(e: React.ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value)
  }

  function updateListColor(e: React.ChangeEvent<HTMLInputElement>): void {
    setColor(e.target.value)
  }

  async function onSubmitButtonClick(): Promise<void> {
    if (name.trim().length === 0 || color.trim().length === 0) {
      toast.error(t('input.error.fieldEmpty'))
      return
    }

    setLoading(true)

    const priority = {
      name: name.trim(),
      color: color.trim()
    }

    await APIRequest({
      endpoint:
        'todo-list/priorities' +
        (innerOpenType === 'update' ? `/${selectedPriority?.id}` : ''),
      method: innerOpenType === 'create' ? 'POST' : 'PATCH',
      body: priority,
      successInfo: innerOpenType,
      failureInfo: innerOpenType,
      finalCallback: () => {
        setLoading(false)
      },
      callback: () => {
        setOpenType(null)
        refreshPriorities()
      }
    })
  }

  useEffect(() => {
    if (innerOpenType === 'update' && selectedPriority !== null) {
      setName(selectedPriority.name)
      setColor(selectedPriority.color)
    } else {
      setName('')
      setColor('#FFFFFF')
    }
  }, [innerOpenType, selectedPriority])

  return (
    <>
      <Modal isOpen={openType !== null}>
        <ModalHeader
          title={`${
            {
              create: 'Create ',
              update: 'Update '
            }[innerOpenType!]
          }priority`}
          icon={
            {
              create: 'tabler:plus',
              update: 'tabler:pencil'
            }[innerOpenType!]
          }
          onClose={() => {
            setOpenType(null)
          }}
        />
        <Input
          name="Priority name"
          value={name}
          updateValue={updateListName}
          placeholder="Priority name"
          icon="tabler:sort-ascending-numbers"
          darker
        />
        <ColorInput
          name="Priority color"
          color={color}
          updateColor={updateListColor}
          setColorPickerOpen={setColorPickerOpen}
        />

        <CreateOrModifyButton
          loading={loading}
          onClick={() => {
            onSubmitButtonClick().catch(console.error)
          }}
          type={innerOpenType}
        />
      </Modal>
      <ColorPickerModal
        isOpen={colorPickerOpen}
        setOpen={setColorPickerOpen}
        color={color}
        setColor={setColor}
      />
    </>
  )
}

export default ModifyPriorityModal
