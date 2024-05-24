/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import React, { useState } from 'react'
import Button from '@components/ButtonsAndInputs/Button'
import Modal from '@components/Modals/Modal'
import { type IPhotoAlbumEntryItem } from '@typedec/Photos'
import APIRequest from '@utils/fetchData'

function EmptyTrashConfirmationModal({
  isOpen,
  setOpen,
  refreshPhotos
}: {
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  refreshPhotos: () => void
}): React.ReactElement {
  const [loading, setLoading] = useState(false)

  async function deleteData(): Promise<void> {
    setLoading(true)

    await APIRequest({
      endpoint: 'photos/trash/empty',
      method: 'DELETE',
      successInfo: "Uhh, hopefully you truly didn't need those photos anymore.",
      failureInfo: "Oops! Couldn't delete the photos. Please try again.",
      callback: () => {
        refreshPhotos()
      },
      onFailure: () => {
        setOpen(false)
      },
      finalCallback: () => {
        setLoading(false)
        setOpen(false)
      }
    })
  }

  return (
    <Modal isOpen={isOpen}>
      <h1 className="text-2xl font-semibold text-bg-100">
        Are you sure you want empty the trash?
      </h1>
      <p className="mt-2 text-bg-500">
        This will permanently delete all the photos in the trash. You can&apos;t
        undo this action.
      </p>
      <div className="mt-6 flex w-full justify-around gap-2">
        <Button
          onClick={() => {
            setOpen(false)
          }}
          type="secondary"
          icon=""
          className="w-full"
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={() => {
            deleteData().catch(console.error)
          }}
          icon={loading ? 'svg-spinners:180-ring' : 'tabler:trash'}
          className="w-full"
          isRed
        >
          Empty
        </Button>
      </div>
    </Modal>
  )
}

export default EmptyTrashConfirmationModal
