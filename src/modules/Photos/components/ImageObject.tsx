/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Icon } from '@iconify/react'
import { cookieParse } from 'pocketbase'
import React, { memo, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Zoom from 'react-medium-image-zoom'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import HamburgerMenu from '@components/ButtonsAndInputs/HamburgerMenu'
import MenuItem from '@components/ButtonsAndInputs/HamburgerMenu/MenuItem'
import useFetch from '@hooks/useFetch'
import {
  type IPhotosEntryDimensionsAll,
  type IPhotosEntry,
  type IPhotoAlbumEntryItem
} from '@interfaces/photos_interfaces'
import forceDown from '@utils/forceDown'
import DeletePhotosConfirmationModal from './modals/DeletePhotosConfirmationModal'
import { usePhotosContext } from '../../../providers/PhotosProvider'

const LLI = LazyLoadImage as any

function CustomZoomContent({
  img,
  data,
  beingDisplayedInAlbum,
  refreshAlbumData,
  refreshPhotos,
  setPhotos,
  modalState
}: {
  buttonUnzoom: React.ReactElement
  modalState: 'LOADING' | 'LOADED' | 'UNLOADING' | 'UNLOADED'
  img: any
  data: IPhotosEntry
  beingDisplayedInAlbum: boolean
  refreshAlbumData?: () => void
  setPhotos:
    | React.Dispatch<React.SetStateAction<IPhotosEntryDimensionsAll>>
    | React.Dispatch<React.SetStateAction<IPhotoAlbumEntryItem[]>>
  refreshPhotos: () => void
}): React.ReactElement {
  const { refreshAlbumList } = usePhotosContext()
  const { id: albumId } = useParams<{ id: string }>()
  const [name] = useFetch<string>(
    `photos/entries/name/${data.id}?isInAlbum=${beingDisplayedInAlbum}`,
    modalState === 'LOADED'
  )
  const [deleteConfirmationModalOpen, setDeletePhotosConfirmationModalOpen] =
    useState(false)

  async function requestDownload(isRaw: boolean): Promise<void> {
    try {
      const { url, fileName } = await fetch(
        `${import.meta.env.VITE_API_HOST}/photos/entries/download/${
          data.id
        }?raw=${isRaw}&isInAlbum=${beingDisplayedInAlbum}`,
        {
          headers: {
            Authorization: `Bearer ${cookieParse(document.cookie).token}`
          }
        }
      )
        .then(async response => {
          if (response.status !== 200) {
            throw new Error('Failed to get download link.')
          }
          return await response.json()
        })
        .then(data => {
          return data.data
        })
        .catch(error => {
          throw new Error(error as string)
        })

      forceDown(url, fileName)
    } catch (error: any) {
      toast.error(`Failed to get download link. Error: ${error}`)
    }
  }

  function setAsCover(): void {
    fetch(
      `${import.meta.env.VITE_API_HOST}/photos/album/set-cover/${albumId}/${
        data.id
      }?isInAlbum=${beingDisplayedInAlbum}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookieParse(document.cookie).token}`
        }
      }
    )
      .then(async response => {
        try {
          const data = await response.json()

          if (response.status !== 200 || data.state !== 'success') {
            throw data.message
          }
          toast.info('Thumbnail has been set.')
          refreshAlbumList()
          if (refreshAlbumData !== undefined) {
            refreshAlbumData()
          }
          refreshPhotos()
        } catch (error) {
          throw new Error(error as string)
        }
      })
      .catch(error => {
        toast.error('Failed to set thumbnail. Error: ' + error)
      })
  }

  return (
    <>
      <div className="flex-center flex h-dvh w-full">
        {img}
        <header className="flex-between absolute left-0 top-0 flex w-full gap-2 p-8">
          {(() => {
            switch (name) {
              case 'loading':
                return (
                  <div className="animate-pulse text-lg text-bg-100">
                    Loading...
                  </div>
                )
              case 'error':
                return (
                  <div className="flex items-center gap-2 text-lg text-red-500">
                    <Icon icon="tabler:alert-triangle" className="size-5" />
                    Failed to load image name
                  </div>
                )
              default:
                return <div className="text-lg text-bg-100">{name}</div>
            }
          })()}
          <div className="flex items-center gap-4">
            <HamburgerMenu
              lighter
              className="relative"
              customWidth="w-56"
              customIcon="tabler:download"
            >
              {data.has_raw && (
                <MenuItem
                  icon="tabler:download"
                  onClick={() => {
                    requestDownload(true).catch(console.error)
                  }}
                  text="Download RAW"
                />
              )}
              <MenuItem
                icon="tabler:download"
                onClick={() => {
                  requestDownload(false).catch(console.error)
                }}
                text="Download JPEG"
              />
            </HamburgerMenu>
            <button
              onClick={() => {
                setDeletePhotosConfirmationModalOpen(true)
              }}
              className="rounded-md p-2 text-bg-100 hover:bg-bg-700/50"
            >
              <Icon icon="tabler:trash" className="size-5" />
            </button>
            <HamburgerMenu lighter className="relative" customWidth="w-56">
              {beingDisplayedInAlbum && (
                <MenuItem
                  icon="tabler:album"
                  onClick={setAsCover}
                  text="Set as album cover"
                />
              )}
            </HamburgerMenu>
          </div>
        </header>
      </div>
      <DeletePhotosConfirmationModal
        setPhotos={setPhotos}
        isInAlbumGallery={beingDisplayedInAlbum}
        customIsOpen={deleteConfirmationModalOpen}
        customSetIsOpen={setDeletePhotosConfirmationModalOpen}
        customPhotoToBeDeleted={data}
      />
    </>
  )
}

function ImageObject({
  photo,
  details,
  selected,
  toggleSelected,
  selectedPhotosLength,
  beingDisplayedInAlbum,
  refreshAlbumData,
  refreshPhotos,
  setPhotos,
  style
}: {
  photo: any
  details: IPhotosEntry
  selected: boolean
  toggleSelected: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => void
  selectedPhotosLength: number
  beingDisplayedInAlbum: boolean
  refreshAlbumData?: () => void
  refreshPhotos: () => void
  setPhotos:
    | React.Dispatch<React.SetStateAction<IPhotosEntryDimensionsAll>>
    | React.Dispatch<React.SetStateAction<IPhotoAlbumEntryItem[]>>
  style?: React.CSSProperties
  [key: string]: any
}): React.ReactElement {
  const { ready } = usePhotosContext()

  return (
    <div
      onClick={e => {
        if (selectedPhotosLength > 0) {
          toggleSelected(e)
        }
      }}
      style={style}
      className={`group/image relative size-full min-w-20 overflow-hidden ${
        selected ? 'bg-custom-500/20' : 'bg-bg-200 dark:bg-bg-800'
      } transition-all ${selectedPhotosLength > 0 ? 'cursor-pointer' : ''}`}
    >
      {(ready || beingDisplayedInAlbum) &&
        photo.src.endsWith('/undefined?thumb=0x300') === false && (
          <>
            <div
              className={`size-full transition-all duration-300 ${
                selected ? 'p-4' : ''
              } ${selectedPhotosLength > 0 ? 'pointer-events-none' : ''}`}
            >
              <Zoom
                zoomMargin={100}
                ZoomContent={props => (
                  <CustomZoomContent
                    {...props}
                    data={details}
                    setPhotos={setPhotos}
                    beingDisplayedInAlbum={beingDisplayedInAlbum}
                    refreshAlbumData={refreshAlbumData}
                    refreshPhotos={refreshPhotos}
                  />
                )}
                zoomImg={{
                  src: photo.src.split('?')[0]
                }}
              >
                <LLI
                  alt=""
                  src={photo.src}
                  className={`relative size-full object-cover ${
                    selected ? 'rounded-md' : ''
                  }`}
                  delayTime={300}
                  delayMethod="debounce"
                  threshold={50}
                  useIntersectionObserver={false}
                />
              </Zoom>
            </div>
            {!selected && (
              <div className="pointer-events-none absolute top-0 h-12 w-full bg-gradient-to-t from-transparent to-black/50 opacity-0 transition-all group-hover/image:opacity-100" />
            )}
            <button
              onClick={toggleSelected}
              className={`group/select-button flex-center absolute left-2.5 top-2.5 size-6 rounded-full transition-all  ${
                selected
                  ? 'flex bg-custom-500 opacity-100'
                  : 'hidden bg-bg-200 opacity-50 hover:!bg-bg-100 hover:!opacity-100 group-hover/image:flex'
              }`}
            >
              <Icon
                icon="tabler:check"
                className={`stroke-bg-900 stroke-[2px] text-bg-800 transition-all ${
                  !selected &&
                  'group-hover/select-button:stroke-bg-900 group-hover/select-button:text-bg-800'
                }`}
              />
            </button>
            <div className="absolute right-2 top-2 flex items-center gap-2 text-bg-200 opacity-50">
              {details.has_raw && (
                <Icon icon="tabler:letter-r" className="size-5" />
              )}
              {!beingDisplayedInAlbum && details.is_in_album && (
                <Icon icon="tabler:library-photo" className="size-5" />
              )}
              {details.is_favourite && (
                <Icon icon="tabler:star" className="size-5" />
              )}
            </div>
          </>
        )}
    </div>
  )
}

export default memo(ImageObject)
