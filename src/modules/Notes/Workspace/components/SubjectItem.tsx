import HamburgerMenu from '@components/ButtonsAndInputs/HamburgerMenu'
import MenuItem from '@components/ButtonsAndInputs/HamburgerMenu/MenuItem'
import { Icon } from '@iconify/react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { type INotesSubject } from '@interfaces/notes_interfaces'

function SubjectItem({
  subject,
  setModifySubjectModalOpenType,
  setExistedData,
  setDeleteSubjectConfirmationModalOpen
}: {
  subject: INotesSubject
  setModifySubjectModalOpenType: React.Dispatch<
    React.SetStateAction<'create' | 'update' | null>
  >
  setExistedData: (data: any) => void
  setDeleteSubjectConfirmationModalOpen: (state: boolean) => void
}): React.ReactElement {
  const { workspace } = useParams<{ workspace: string }>()

  return (
    <div className="group relative flex h-full w-full flex-col items-center rounded-lg bg-bg-50 p-8 shadow-custom hover:bg-bg-100 dark:bg-bg-900 dark:hover:bg-bg-700/50">
      <Icon
        icon={subject.icon}
        className="pointer-events-none z-10 h-20 w-20 shrink-0 group-hover:text-custom-500"
      />
      <h2 className="mt-6 text-center text-2xl font-medium uppercase tracking-widest">
        {subject.title}
      </h2>
      <p className="mt-2 text-center text-sm text-bg-500">
        {subject.description}
      </p>
      <Link
        to={`/notes/${workspace}/${subject.id}`}
        className="absolute left-0 top-0 h-full w-full hover:bg-white/[0.05]"
      />
      <HamburgerMenu className="absolute right-4 top-4 z-20">
        <MenuItem
          onClick={() => {
            setExistedData(subject)
            setModifySubjectModalOpenType('update')
          }}
          icon="tabler:edit"
          text="Edit"
        />
        <MenuItem
          onClick={() => {
            setExistedData(subject)
            setDeleteSubjectConfirmationModalOpen(true)
          }}
          icon="tabler:trash"
          text="Delete"
          isRed
        />
      </HamburgerMenu>
    </div>
  )
}

export default SubjectItem
