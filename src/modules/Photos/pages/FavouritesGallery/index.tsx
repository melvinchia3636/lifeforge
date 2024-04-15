/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable multiline-ternary */
import { Icon } from '@iconify/react'
import React, { useContext, useEffect } from 'react'
import Gallery from 'react-photo-gallery'
import { useNavigate } from 'react-router'
import APIComponentWithFallback from '@components/APIComponentWithFallback.tsx'
import GoBackButton from '@components/GoBackButton.tsx'
import HamburgerMenu from '@components/HamburgerMenu/index.tsx'
import MenuItem from '@components/HamburgerMenu/MenuItem.tsx'
import ModuleWrapper from '@components/ModuleWrapper.tsx'
import useFetch from '@hooks/useFetch.ts'
import { type IPhotoAlbumEntryItem } from '@typedec/Photos.ts'
import { PhotosContext } from '../../../../providers/PhotosProvider.tsx'
import BottomBar from '../../components/BottomBar.tsx'
import ImageObject from '../../components/ImageObject.tsx'

function PhotosFavouritesGallery(): React.ReactElement {
  const { selectedPhotos, setSelectedPhotos, setModifyAlbumModalOpenType } =
    useContext(PhotosContext)
  const navigate = useNavigate()
  const [photos] = useFetch<IPhotoAlbumEntryItem[]>('photos/favourites/list')

  useEffect(() => {
    return () => {
      setSelectedPhotos([])
    }
  }, [])

  return (
    <>
      <div className="relative min-h-0 w-full flex-1 overflow-y-hidden">
        <ModuleWrapper>
          <div className="flex flex-col gap-1">
            <GoBackButton
              onClick={() => {
                navigate('/photos')
              }}
            />
            <div className="flex items-center justify-between">
              <h1 className="flex items-center gap-4 text-2xl font-semibold">
                <>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-bg-200 shadow-md dark:bg-bg-700/50">
                    <Icon icon="tabler:star-filled" className="h-7 w-7" />
                  </div>
                  <span className="flex flex-col gap-1">
                    Favourites
                    {(() => {
                      switch (photos) {
                        case 'loading':
                          return (
                            <span className="text-sm text-bg-500">
                              <Icon
                                icon="svg-spinners:180-ring"
                                className="h-5 w-5"
                              />
                            </span>
                          )
                        case 'error':
                          return (
                            <span className="text-sm text-bg-500">Error</span>
                          )
                        default:
                          return (
                            <span className="flex items-center gap-2 text-sm font-medium text-bg-500">
                              {photos.length.toLocaleString()} photos
                            </span>
                          )
                      }
                    })()}
                  </span>
                </>
              </h1>
              <div className="flex items-center justify-center gap-2">
                <button className="rounded-lg p-4 text-bg-500 transition-all hover:bg-bg-200/50 hover:text-bg-800 dark:hover:bg-bg-800 dark:hover:text-bg-100">
                  <Icon icon="tabler:share" className="text-2xl" />
                </button>
                <HamburgerMenu largerPadding position="relative">
                  <MenuItem
                    icon="tabler:pencil"
                    text="Rename"
                    onClick={() => {
                      setModifyAlbumModalOpenType('rename')
                    }}
                  />
                </HamburgerMenu>
              </div>
            </div>
          </div>
          <div className="relative my-6 w-full flex-1">
            <APIComponentWithFallback data={photos}>
              {typeof photos !== 'string' && (
                <Gallery
                  targetRowHeight={200}
                  photos={photos.map(image => ({
                    src: `${
                      import.meta.env.VITE_POCKETBASE_ENDPOINT
                    }/api/files/${image.collectionId}/${image.photoId}/${
                      image.image
                    }?thumb=0x300`,
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
                    />
                  )}
                />
              )}
            </APIComponentWithFallback>
          </div>
        </ModuleWrapper>
        <BottomBar photos={photos as IPhotoAlbumEntryItem[]} inAlbumGallery />
      </div>
    </>
  )
}

export default PhotosFavouritesGallery