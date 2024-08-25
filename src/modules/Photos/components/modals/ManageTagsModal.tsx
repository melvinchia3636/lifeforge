import React, { useState } from 'react'
import HamburgerMenu from '@components/ButtonsAndInputs/HamburgerMenu'
import MenuItem from '@components/ButtonsAndInputs/HamburgerMenu/MenuItem'
import DeleteConfirmationModal from '@components/Modals/DeleteConfirmationModal'
import Modal from '@components/Modals/Modal'
import ModalHeader from '@components/Modals/ModalHeader'
import APIComponentWithFallback from '@components/Screens/APIComponentWithFallback'
import EmptyStateScreen from '@components/Screens/EmptyStateScreen'
import { type IPhotoAlbumTag } from '@interfaces/photos_interfaces'
import { usePhotosContext } from '@providers/PhotosProvider'

function ManageTagsModal({
  isOpen,
  setOpen,
  setModifyAlbumModalOpenType,
  existedData,
  setExistedData
}: {
  isOpen: boolean
  setOpen: (value: boolean) => void
  setModifyAlbumModalOpenType: React.Dispatch<
    React.SetStateAction<'create' | 'rename' | false>
  >
  existedData: IPhotoAlbumTag | null
  setExistedData: React.Dispatch<React.SetStateAction<IPhotoAlbumTag | null>>
}): React.ReactElement {
  const { albumTagList, refreshAlbumTagList } = usePhotosContext()
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false)

  return (
    <>
      <Modal isOpen={isOpen} minWidth="40rem">
        <ModalHeader
          icon="tabler:tags"
          title="Manage Tags"
          onClose={() => {
            setOpen(false)
          }}
          actionButtonIcon="tabler:plus"
          onActionButtonClick={() => {
            setModifyAlbumModalOpenType('create')
          }}
        />
        <APIComponentWithFallback data={albumTagList}>
          {albumTagList =>
            albumTagList.length === 0 ? (
              <EmptyStateScreen
                icon="tabler:tag-off"
                title="No tags found"
                description="Create a tag to organize your albums."
                ctaContent="new tag"
                onCTAClick={() => {
                  setModifyAlbumModalOpenType('create')
                }}
              />
            ) : (
              <ul className="mb-4 flex flex-col divide-y divide-bg-200 dark:divide-bg-800">
                {albumTagList.map(tag => (
                  <li
                    key={tag.id}
                    className="flex-between flex gap-4 px-2 py-4"
                  >
                    <div className="flex items-center gap-4">
                      {tag.name} ({tag.count})
                    </div>
                    <HamburgerMenu className="relative">
                      <MenuItem
                        icon="tabler:pencil"
                        text="Edit"
                        onClick={() => {
                          setExistedData(tag)
                          setModifyAlbumModalOpenType('rename')
                        }}
                      />
                      <MenuItem
                        icon="tabler:trash"
                        text="Delete"
                        onClick={() => {
                          setExistedData(tag)
                          setIsDeleteConfirmationModalOpen(true)
                        }}
                        isRed
                      />
                    </HamburgerMenu>
                  </li>
                ))}
              </ul>
            )
          }
        </APIComponentWithFallback>
      </Modal>
      <DeleteConfirmationModal
        apiEndpoint="photos/album/tag"
        isOpen={isDeleteConfirmationModalOpen}
        data={existedData}
        itemName="tag"
        onClose={() => {
          setIsDeleteConfirmationModalOpen(false)
        }}
        updateDataList={() => {
          refreshAlbumTagList()
        }}
        nameKey="name"
      />
    </>
  )
}

export default ManageTagsModal
