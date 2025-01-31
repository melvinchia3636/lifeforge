import moment from 'moment'
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '@components/buttons'
import { DateInput, TextInput } from '@components/inputs'
import ModalHeader from '@components/modals/ModalHeader'
import ModalWrapper from '@components/modals/ModalWrapper'
import { useAuthContext } from '@providers/AuthProvider'
import APIRequest from '@utils/fetchData'
import { toCamelCase } from '@utils/strings'

function ModifyModal({
  type,
  title,
  id,
  icon,
  isOpen,
  onClose
}: {
  type?: string
  title: string
  id: string
  icon: string
  isOpen: boolean
  onClose: () => void
}): React.ReactElement {
  const { userData, setUserData } = useAuthContext()
  const [value, setValue] = useState(userData[id])
  const [loading, setLoading] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  async function onSubmit(): Promise<void> {
    setLoading(true)
    await APIRequest({
      method: 'PATCH',
      endpoint: '/user/settings',
      body: {
        data: {
          [id]:
            type === 'date'
              ? moment(value).subtract(1, 'second').format('YYYY-MM-DD')
              : value
        }
      },
      successInfo: id !== 'email' && 'update',
      failureInfo: id !== 'email' && 'update',
      callback: () => {
        if (id === 'email') {
          toast.info('A verification email has been sent to your new email.')
        } else {
          setUserData({ ...userData, [id]: value })
        }
      },
      onFailure: () => {
        if (id === 'email') {
          toast.error('Failed to send verification email.')
        }
      },
      finalCallback: () => {
        setLoading(false)
        onClose()
      }
    })
  }

  return (
    <ModalWrapper modalRef={modalRef} isOpen={isOpen} minWidth="30rem">
      <ModalHeader
        title={`${toCamelCase(title)}.update`}
        namespace="modules.accountSettings"
        onClose={onClose}
        icon="tabler:pencil"
      />
      {type !== 'date' ? (
        <TextInput
          namespace="modules.accountSettings"
          icon={icon}
          name={title}
          placeholder={`Enter new ${title}`}
          updateValue={setValue}
          value={value}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onSubmit().catch(console.error)
            }
          }}
        />
      ) : (
        <DateInput
          namespace="modules.accountSettings"
          modalRef={modalRef}
          icon={icon}
          name={title}
          date={value}
          setDate={setValue}
          darker
        />
      )}
      <Button
        onClick={() => {
          onSubmit().catch(console.error)
        }}
        loading={loading}
        icon="tabler:pencil"
        className="mt-6"
      >
        Update
      </Button>
    </ModalWrapper>
  )
}

export default ModifyModal
