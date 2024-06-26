/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { type INotesEntry } from '@interfaces/notes_interfaces'

function EntryButton({ entry }: { entry: INotesEntry }): React.ReactElement {
  const { workspace, subject } = useParams<{
    workspace: string
    subject: string
    '*': string
  }>()

  return entry.type === 'folder' ? (
    <Link
      to={`./${entry.id}`}
      className="absolute left-0 top-0 h-full w-full rounded-lg hover:bg-bg-100 dark:hover:bg-bg-900"
    />
  ) : (
    <Link
      to={
        ['pdf', 'md', 'tex'].includes(entry.name.split('.').pop()!)
          ? `/notes/${workspace}/${subject}/file/${entry.id}`
          : `${import.meta.env.VITE_API_HOST}/media/${entry.collectionId}/${
              entry.id
            }/${entry.file}`
      }
      className="absolute left-0 top-0 h-full w-full rounded-lg hover:bg-bg-100 dark:hover:bg-bg-900"
    />
  )
}

export default EntryButton
