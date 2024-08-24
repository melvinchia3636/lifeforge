import React from 'react'
import HamburgerMenu from '@components/ButtonsAndInputs/HamburgerMenu'
import MenuItem from '@components/ButtonsAndInputs/HamburgerMenu/MenuItem'
import type IGuitarTabsEntry from '@interfaces/guitar_tabs_interfaces'
import forceDown from '@utils/forceDown'

function DownloadMenu({
  entry
}: {
  entry: IGuitarTabsEntry
}): React.ReactElement {
  return (
    <HamburgerMenu className="relative shrink-0" customIcon="tabler:download">
      <MenuItem
        needTranslate={false}
        onClick={() => {
          forceDown(
            `${import.meta.env.VITE_API_HOST}/media/${entry.collectionId}/${
              entry.id
            }/${entry.pdf}`,
            entry.pdf
          )
        }}
        text="PDF"
        icon="tabler:file-text"
      />
      {entry.audio !== '' && (
        <MenuItem
          needTranslate={false}
          onClick={() => {
            forceDown(
              `${import.meta.env.VITE_API_HOST}/media/${entry.collectionId}/${
                entry.id
              }/${entry.audio}`,
              entry.audio
            )
          }}
          text="Audio"
          icon="tabler:music"
        />
      )}
      {entry.musescore !== '' && (
        <MenuItem
          needTranslate={false}
          onClick={() => {
            forceDown(
              `${import.meta.env.VITE_API_HOST}/media/${entry.collectionId}/${
                entry.id
              }/${entry.musescore}`,
              entry.musescore
            )
          }}
          text="Musescore"
          icon="simple-icons:musescore"
        />
      )}
    </HamburgerMenu>
  )
}

export default DownloadMenu
