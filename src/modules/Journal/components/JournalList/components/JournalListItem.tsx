import moment from 'moment'
import React from 'react'
import HamburgerMenu from '@components/ButtonsAndInputs/HamburgerMenu'
import MenuItem from '@components/ButtonsAndInputs/HamburgerMenu/MenuItem'
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
  return (
    <button
      onClick={() => {
        setCurrentViewingJournal(entry.id)
        setJournalViewModalOpen(true)
      }}
      className="w-full rounded-lg bg-bg-100 p-6 text-left shadow-custom hover:bg-bg-100 dark:bg-bg-900 dark:hover:bg-bg-800/70"
    >
      <div className="flex-between flex">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-bg-500">
            {moment(entry.date).format('MMMM Do, YYYY')}
          </span>
          <h2 className="text-2xl font-semibold">
            {entry.title === '' ? 'Untitled' : entry.title}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="block whitespace-nowrap rounded-full bg-bg-200 px-3 py-1 text-base font-medium shadow-custom dark:bg-bg-700/50">
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
