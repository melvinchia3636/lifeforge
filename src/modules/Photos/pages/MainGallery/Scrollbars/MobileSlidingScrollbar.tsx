/* eslint-disable @typescript-eslint/indent */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useContext } from 'react'
import { PhotosContext } from '../../../../../providers/PhotosProvider'

function MobileSlidingScrollbar(): React.ReactElement {
  const { galleryWrapperRef, sideSliderRef, mobileDateDisplayRef, photos } =
    useContext(PhotosContext)

  return typeof photos !== 'string' && photos.totalItems !== 0 ? (
    <div
      ref={sideSliderRef}
      onTouchMove={e => {
        if (galleryWrapperRef.current !== null) {
          const br = galleryWrapperRef.current.getBoundingClientRect()

          const finalPosition =
            e.touches[0].clientY - br.top > 0
              ? e.touches[0].clientY - br.top
              : 0

          if (sideSliderRef.current !== null) {
            sideSliderRef.current.style.top = `${finalPosition}px`
          }

          const galleryContainerHeight = galleryWrapperRef.current.scrollHeight
          const mousePositionInGalleryContainer =
            (finalPosition / galleryWrapperRef.current.clientHeight) *
            galleryContainerHeight

          galleryWrapperRef.current.scrollTop = Math.round(
            mousePositionInGalleryContainer
          )
        }
      }}
      onTouchEnd={() => {
        sideSliderRef.current?.blur()
      }}
      onTouchCancel={() => {
        sideSliderRef.current?.blur()
      }}
      className="group absolute right-0 flex gap-2 sm:hidden"
    >
      <div
        ref={mobileDateDisplayRef}
        className="pointer-events-none absolute right-14 mt-1 hidden whitespace-nowrap rounded-t-sm border-b-2 border-custom-500 bg-bg-200 p-2 text-sm shadow-md group-hover:block dark:bg-bg-800 sm:right-3"
      ></div>
      <div className="rounded-l-full bg-bg-200 p-4 shadow-sm dark:bg-bg-900">
        <Icon icon="tabler:caret-up-down-filled" className="text-bg-500" />
      </div>
    </div>
  ) : (
    <></>
  )
}

export default MobileSlidingScrollbar
