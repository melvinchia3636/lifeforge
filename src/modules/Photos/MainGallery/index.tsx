/* eslint-disable multiline-ternary */
import React from 'react'
import ModuleHeader from '../../../components/general/ModuleHeader'
import GalleryHeader from './Gallery/GalleryHeader'
import PhotosSidebar from '../PhotosSidebar'
import GalleryContainer from './Gallery/GalleryContainer'
import CreateAlbumModal from './CreateAlbumModal'
import AddPhotosToAlbumModal from './AddPhotosToAlbumModal'

function Photos(): React.ReactElement {
  return (
    <section className="relative flex h-full min-h-0 w-full flex-1 flex-col pl-4 sm:pl-12">
      <ModuleHeader
        title="Photos"
        desc="View and manage all your precious memories."
      />
      <GalleryHeader />
      <div className="relative flex h-full min-h-0 w-full gap-8">
        <PhotosSidebar />
        <GalleryContainer />
      </div>
      <CreateAlbumModal />
      <AddPhotosToAlbumModal />
    </section>
  )
}

export default Photos
