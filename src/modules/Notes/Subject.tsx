/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Icon } from '@iconify/react/dist/iconify.js'
import { type INotesSubject } from './Workspace'
import { toast } from 'react-toastify'
import Error from '../../components/Error'
import Loading from '../../components/Loading'

// Generated by https://quicktype.io

export interface INotesEntry {
  collectionId: string
  collectionName: string
  created: string
  id: string
  name: string
  path: string
  subject: string
  type: 'file' | 'folder'
  updated: string
}

function NotesSubject(): React.ReactElement {
  const [subjectDetails, setSubjectDetails] = useState<
    INotesSubject | 'loading' | 'error'
  >('loading')
  const { subject, '*': path } = useParams<{ subject: string; '*': string }>()

  const [notesEntries, setNotesEntries] = useState<
    INotesEntry[] | 'loading' | 'error'
  >('loading')

  function fetchContainerDetails(): void {
    setSubjectDetails('loading')
    fetch(`${import.meta.env.VITE_API_HOST}/notes/subject/get/${subject}`)
      .then(async response => {
        const data = await response.json()
        setSubjectDetails(data.data)

        if (response.status !== 200) {
          throw data.message
        }
      })
      .catch(() => {
        setSubjectDetails('error')
        toast.error('Failed to fetch data from server.')
      })
  }

  function updateNotesEntries(): void {
    setNotesEntries('loading')
    fetch(
      `${import.meta.env.VITE_API_HOST}/notes/entry/list/${subject}/${path}`
    )
      .then(async response => {
        const data = await response.json()
        setNotesEntries(data.data)

        if (response.status !== 200) {
          throw data.message
        }
      })
      .catch(() => {
        setNotesEntries('error')
        toast.error('Failed to fetch data from server.')
      })
  }

  useEffect(() => {
    fetchContainerDetails()
    updateNotesEntries()
  }, [])

  return (
    <section className="flex h-full min-h-0 w-full flex-1 flex-col overflow-y-scroll px-12">
      <Link
        to="/notes"
        className="mb-2 flex w-min items-center gap-2 rounded-lg p-2 pl-0 pr-4 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-100"
      >
        <Icon icon="tabler:chevron-left" className="text-xl" />
        <span className="whitespace-nowrap text-lg font-medium">Go back</span>
      </Link>
      <div className="flex items-center justify-between">
        <h1
          className={`flex items-center gap-4 ${
            typeof subjectDetails !== 'string' ? 'text-3xl' : 'text-2xl'
          } font-semibold `}
        >
          {(() => {
            switch (subjectDetails) {
              case 'loading':
                return (
                  <>
                    <span className="small-loader-light"></span>
                    Loading...
                  </>
                )
              case 'error':
                return (
                  <>
                    <Icon
                      icon="tabler:alert-triangle"
                      className="mt-0.5 h-7 w-7 text-red-500"
                    />
                    Failed to fetch data from server.
                  </>
                )
              default:
                return (
                  <>
                    <div className="relative rounded-lg p-3">
                      <Icon
                        icon={subjectDetails.icon}
                        className="text-3xl text-custom-500"
                      />
                      <div className="absolute left-0 top-0 h-full w-full rounded-lg bg-custom-500 opacity-20" />
                    </div>
                    {subjectDetails.title}
                  </>
                )
            }
          })()}
        </h1>
        <button className="rounded-lg p-4 text-neutral-500 transition-all hover:bg-neutral-200/50 hover:text-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-100">
          <Icon icon="tabler:dots-vertical" className="text-2xl" />
        </button>
      </div>
      {(() => {
        switch (notesEntries) {
          case 'loading':
            return <Loading />
          case 'error':
            return <Error message="Failed to fetch data from server." />
          default:
            return (
              <ul className="mt-6 flex min-h-0 flex-col gap-4 overflow-y-auto">
                {notesEntries.map(entry => (
                  <li
                    key={entry.id}
                    className="relative mt-0 flex items-center justify-between gap-4 rounded-lg bg-neutral-50 p-6 shadow-[4px_4px_10px_0px_rgba(0,0,0,0.05)] dark:bg-neutral-800/50"
                  >
                    <Icon
                      icon={
                        {
                          file: 'tabler:file',
                          folder: 'tabler:folder'
                        }[entry.type]
                      }
                      className="h-7 w-7 text-neutral-500"
                    />
                    <div className="flex w-full items-center justify-between gap-1">
                      <div className="text-lg font-medium  text-neutral-800 dark:text-neutral-100">
                        {entry.name}
                      </div>
                      <Icon
                        icon="tabler:chevron-right"
                        className="text-lg text-neutral-500"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )
        }
      })()}
    </section>
  )
}

export default NotesSubject