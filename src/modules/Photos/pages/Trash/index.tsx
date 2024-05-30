import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'
import Gallery from 'react-photo-gallery'
import Button from '@components/ButtonsAndInputs/Button'
import ModuleHeader from '@components/Module/ModuleHeader'
import ModuleWrapper from '@components/Module/ModuleWrapper'
import APIComponentWithFallback from '@components/Screens/APIComponentWithFallback'
import useFetch from '@hooks/useFetch'
import { usePhotosContext } from '@providers/PhotosProvider'
import { type IPhotoAlbumEntryItem } from '@typedec/Photos'
import ImageObject from '../../components/ImageObject'
import EmptyTrashConfirmationModal from '../../components/modals/EmptyTrashConfirmationModal'
import PhotosSidebar from '../../components/PhotosSidebar'

function PhotosTrash(): React.ReactElement {
  const { selectedPhotos, setSelectedPhotos } = usePhotosContext()
  const [photos, refreshPhotos, setPhotos] =
    useFetch<IPhotoAlbumEntryItem[]>('photos/trash/list')
  const [
    isEmptyTrashConfirmationModalOpen,
    setIsEmptyTrashConfirmationModalOpen
  ] = useState(false)

  return (
    <ModuleWrapper>
      <ModuleHeader
        title="Photos"
        desc="View and manage all your precious memories."
      />
      <div className="relative mt-6 flex h-full min-h-0 w-full gap-8">
        <PhotosSidebar />
        <div className="flex h-full flex-1 flex-col">
          <div className="flex items-center justify-between">
            <h1 className="flex items-center gap-4 text-3xl font-semibold">
              <Icon icon="tabler:trash" className="h-8 w-8 shrink-0" />
              Recycle Bin
            </h1>
            <Button
              icon={'tabler:trash'}
              onClick={() => {
                setIsEmptyTrashConfirmationModalOpen(true)
              }}
              className="shrink-0"
              isRed
            >
              Empty trash
            </Button>
          </div>
          <div className="relative my-6 w-full flex-1 overflow-y-auto">
            <APIComponentWithFallback data={photos}>
              {typeof photos !== 'string' && (
                <Gallery
                  targetRowHeight={200}
                  photos={photos.map(image => ({
                    src: `${import.meta.env.VITE_API_HOST}/media/${
                      image.collectionId
                    }/${image.photoId}/${image.image}?thumb=0x300`,
                    width: image.width / 20,
                    height: image.height / 20,
                    key: image.id
                  }))}
                  margin={3}
                  renderImage={({ photo, margin }) => (
                    <ImageObject
                      beingDisplayedInAlbum
                      photo={photo}
                      details={photos.find(image => image.id === photo.key)!}
                      margin={margin ?? ''}
                      refreshPhotos={refreshPhotos}
                      selected={
                        selectedPhotos.find(image => image === photo.key) !==
                        undefined
                      }
                      toggleSelected={(
                        e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
                      ) => {
                        if (photo.key !== undefined) {
                          if (
                            selectedPhotos.find(
                              image => image === photo.key
                            ) !== undefined
                          ) {
                            setSelectedPhotos(
                              selectedPhotos.filter(
                                image => image !== photo.key
                              )
                            )
                          } else {
                            if (e.shiftKey && typeof photos !== 'string') {
                              const lastSelectedIndex = photos.findIndex(
                                image =>
                                  image.id ===
                                  selectedPhotos[selectedPhotos.length - 1]
                              )
                              const currentIndex = photos.findIndex(
                                image => image.id === photo.key
                              )
                              const range = photos.slice(
                                Math.min(lastSelectedIndex, currentIndex),
                                Math.max(lastSelectedIndex, currentIndex) + 1
                              )
                              setSelectedPhotos(
                                Array.from(
                                  new Set([
                                    ...selectedPhotos,
                                    ...range.map(image => image.id)
                                  ])
                                )
                              )
                            } else {
                              setSelectedPhotos([...selectedPhotos, photo.key])
                            }
                          }
                        }
                      }}
                      selectedPhotosLength={selectedPhotos.length}
                      setPhotos={
                        setPhotos as React.Dispatch<
                          React.SetStateAction<IPhotoAlbumEntryItem[]>
                        >
                      }
                    />
                  )}
                />
              )}
            </APIComponentWithFallback>
          </div>
        </div>
      </div>
      <EmptyTrashConfirmationModal
        isOpen={isEmptyTrashConfirmationModalOpen}
        setOpen={setIsEmptyTrashConfirmationModalOpen}
        refreshPhotos={refreshPhotos}
      />
    </ModuleWrapper>
  )
}

export default PhotosTrash