import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'
import HamburgerMenu from '@components/ButtonsAndInputs/HamburgerMenu'
import MenuItem from '@components/ButtonsAndInputs/HamburgerMenu/MenuItem'
import { type IIdeaBoxContainer } from '@interfaces/ideabox_interfaces'

function ContainerItem({
  container,
  setCreateContainerModalOpen,
  setExistedData,
  setDeleteContainerConfirmationModalOpen
}: {
  container: IIdeaBoxContainer
  setCreateContainerModalOpen: React.Dispatch<
    React.SetStateAction<'create' | 'update' | null>
  >
  setExistedData: React.Dispatch<React.SetStateAction<IIdeaBoxContainer | null>>
  setDeleteContainerConfirmationModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >
}): React.ReactElement {
  return (
    <div className="relative flex flex-col items-center justify-start gap-6 rounded-lg bg-bg-50 p-8 shadow-custom hover:bg-bg-100 dark:bg-bg-900 dark:hover:bg-bg-800/70">
      <div
        className="rounded-lg p-4"
        style={{
          backgroundColor: container.color + '30'
        }}
      >
        <Icon
          icon={container.icon}
          className="size-8"
          style={{
            color: container.color
          }}
        />
      </div>
      <div className="text-center text-2xl font-medium ">{container.name}</div>
      <div className="mt-auto flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Icon icon="tabler:article" className="size-5 text-bg-500" />
          <span className="text-bg-500">{container.text_count}</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon icon="tabler:link" className="size-5 text-bg-500" />
          <span className="text-bg-500">{container.link_count}</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon icon="tabler:photo" className="size-5 text-bg-500" />
          <span className="text-bg-500">{container.image_count}</span>
        </div>
      </div>
      <Link
        to={`/idea-box/${container.id}`}
        className="absolute left-0 top-0 h-full w-full"
      />
      <HamburgerMenu className="absolute right-4 top-4 overscroll-contain">
        <MenuItem
          onClick={() => {
            setExistedData(container)
            setCreateContainerModalOpen('update')
          }}
          icon="tabler:edit"
          text="Edit"
        />
        <MenuItem
          onClick={() => {
            setExistedData(container)
            setDeleteContainerConfirmationModalOpen(true)
          }}
          icon="tabler:trash"
          text="Delete"
          isRed
        />
      </HamburgerMenu>
    </div>
  )
}

export default ContainerItem
