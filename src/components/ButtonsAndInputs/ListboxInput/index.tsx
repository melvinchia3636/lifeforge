import { ListboxButton } from '@headlessui/react'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import ListboxInputWrapper from './components/ListboxInputWrapper'
import ListboxOptions from './components/ListboxOptions'

function ListboxInput({
  name,
  icon,
  value,
  setValue,
  buttonContent,
  multiple = false,
  children
}: {
  name: string
  icon: string
  value: string | string[] | null
  setValue: (value: any) => void
  buttonContent: React.ReactElement
  multiple?: boolean
  children: React.ReactNode
}): React.ReactElement {
  return (
    <ListboxInputWrapper value={value} onChange={setValue} multiple={multiple}>
      <ListboxButton className="group flex w-full items-center">
        <Icon
          icon={icon}
          className={`ml-6 size-6 shrink-0 ${
            value !== null ? '' : 'text-bg-500'
          } group-data-[open]:!text-custom-500`}
        />
        <span
          className={`pointer-events-none absolute left-[4.2rem] font-medium tracking-wide text-bg-500 group-data-[open]:!text-custom-500 ${'top-6 -translate-y-1/2 text-[14px]'}`}
        >
          {name}
        </span>
        <div className="relative mb-3 mt-10 flex w-full items-center gap-2 rounded-lg pl-5 pr-10 text-left focus:outline-none">
          {buttonContent}
        </div>
        <span className="pointer-events-none absolute inset-y-0 right-0 mr-2 mt-1 flex items-center pr-4">
          <Icon icon="tabler:chevron-down" className="size-5 text-bg-500" />
        </span>
      </ListboxButton>
      <ListboxOptions>{children}</ListboxOptions>
    </ListboxInputWrapper>
  )
}

export default ListboxInput
