import { Icon } from '@iconify/react'
import moment from 'moment'
import React from 'react'
import HamburgerMenu from '@components/buttons/HamburgerMenu'
import MenuItem from '@components/buttons/HamburgerMenu/components/MenuItem'
import useThemeColors from '@hooks/useThemeColor'
import { type IJournalEntry } from '@interfaces/journal_interfaces'

function JournalListItem({
  entry,
  setCurrentViewingJournal,
  setJournalViewModalOpen,
  setDeleteJournalConfirmationModalOpen,
  setExistedData,
  updateEntry,
  editLoading
}: {
  entry: IJournalEntry
  setCurrentViewingJournal: React.Dispatch<React.SetStateAction<string | null>>
  setJournalViewModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setDeleteJournalConfirmationModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >
  setExistedData: React.Dispatch<React.SetStateAction<IJournalEntry | null>>
  updateEntry: (id: string) => Promise<void>
  editLoading: boolean
}): React.ReactElement {
  const { componentBgWithHover, componentBgLighter } = useThemeColors()

  return (
    <button
      onClick={() => {
        setCurrentViewingJournal(entry.id)
        setJournalViewModalOpen(true)
      }}
      className={`w-full rounded-lg p-6 text-left shadow-custom ${componentBgWithHover}`}
    >
      <div className="flex-between flex">
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2 text-sm font-medium text-bg-500">
            {moment(entry.date).format('MMMM Do, YYYY')}
            <Icon icon="tabler:circle-filled" className="size-1.5" />
            {entry.wordCount?.toLocaleString()} words
          </span>
          <h2 className="text-2xl font-semibold">
            {entry.title === '' ? 'Untitled' : entry.title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {entry.photos.length > 0 && (
            <span
              className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1 text-base font-medium text-bg-400 shadow-custom ${componentBgLighter}`}
            >
              <Icon icon="tabler:photo" className="size-5" />
              {entry.photos.length} photos
            </span>
          )}
          <span
            className={`block whitespace-nowrap rounded-full px-3 py-1 text-base font-medium shadow-custom ${componentBgLighter}`}
          >
            {entry.mood.emoji} {entry.mood.text}
          </span>
          <HamburgerMenu className="relative">
            <MenuItem
              onClick={() => {
                updateEntry(entry.id).catch(console.error)
              }}
              icon={editLoading ? 'svg-spinners:180-ring' : 'tabler:pencil'}
              text="Edit"
              disabled={editLoading}
            />
            <MenuItem
              onClick={() => {
                setDeleteJournalConfirmationModalOpen(true)
                setExistedData(entry)
              }}
              isRed
              text="Delete"
              icon="tabler:trash"
            />
          </HamburgerMenu>
        </div>
      </div>
      <div className="mt-4 text-bg-500">{entry.content}</div>
    </button>
  )
}

export default JournalListItem
