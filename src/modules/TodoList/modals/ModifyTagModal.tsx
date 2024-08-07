/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useDebounce } from '@uidotdev/usehooks'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CreateOrModifyButton from '@components/ButtonsAndInputs/CreateOrModifyButton'
import Input from '@components/ButtonsAndInputs/Input'
import Modal from '@components/Modals/Modal'
import ModalHeader from '@components/Modals/ModalHeader'
import { useTodoListContext } from '@providers/TodoListProvider'
import APIRequest from '@utils/fetchData'

function ModifyTagModal(): React.ReactElement {
  const {
    modifyTagModalOpenType: openType,
    setModifyTagModalOpenType: setOpenType,
    refreshTagsList,
    selectedTag
  } = useTodoListContext()
  const [loading, setLoading] = useState(false)
  const [tagName, setTagName] = useState('')
  const innerOpenType = useDebounce(openType, openType === null ? 300 : 0)

  function updateTagName(e: React.ChangeEvent<HTMLInputElement>): void {
    setTagName(e.target.value)
  }

  async function onSubmitButtonClick(): Promise<void> {
    if (tagName.trim().length === 0) {
      toast.error('Please fill in all the fields.')
      return
    }

    setLoading(true)

    const tag = {
      name: tagName.trim()
    }

    await APIRequest({
      endpoint:
        'todo-list/tag' +
        (innerOpenType === 'update' ? `/${selectedTag?.id}` : ''),
      method: innerOpenType === 'create' ? 'POST' : 'PATCH',
      body: tag,
      successInfo: innerOpenType,
      failureInfo: innerOpenType,
      finalCallback: () => {
        setLoading(false)
      },
      callback: () => {
        setOpenType(null)
        refreshTagsList()
      }
    })
  }

  useEffect(() => {
    if (innerOpenType === 'update' && selectedTag !== null) {
      setTagName(selectedTag.name)
    } else {
      setTagName('')
    }
  }, [innerOpenType, selectedTag])

  return (
    <>
      <Modal isOpen={openType !== null}>
        <ModalHeader
          title={`${
            {
              create: 'Create ',
              update: 'Update '
            }[innerOpenType!]
          } tag`}
          icon={`${
            {
              create: 'tabler:plus',
              update: 'tabler:pencil'
            }[innerOpenType!]
          }`}
          onClose={() => {
            setOpenType(null)
          }}
        />
        <Input
          name="Tag name"
          value={tagName}
          updateValue={updateTagName}
          placeholder="Tag name"
          icon="tabler:tag"
          darker
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onSubmitButtonClick().catch(console.error)
            }
          }}
        />

        <CreateOrModifyButton
          loading={loading}
          onClick={() => {
            onSubmitButtonClick().catch(console.error)
          }}
          type={innerOpenType}
        />
      </Modal>
    </>
  )
}

export default ModifyTagModal
