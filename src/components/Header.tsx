import React, { Fragment, useContext } from 'react'
import { Icon } from '@iconify/react'
import { GlobalStateContext } from '../providers/GlobalStateProvider'
import { AuthContext } from '../providers/AuthProvider'
import { Menu, Transition } from '@headlessui/react'
import { toast } from 'react-toastify'
import MenuItem from './general/HamburgerMenu/MenuItem'

export default function Header(): React.JSX.Element {
  const { sidebarExpanded, toggleSidebar } = useContext(GlobalStateContext)
  const { userData, getAvatarURL, logout } = useContext(AuthContext)

  return (
    <header className="relative z-[9990] flex w-full items-center justify-between gap-8 p-8 sm:p-12">
      <div className="flex w-full items-center gap-4">
        {!sidebarExpanded && (
          <button
            onClick={toggleSidebar}
            className="-ml-4 rounded-lg p-4 text-neutral-500 transition-all hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
          >
            <Icon icon="tabler:menu" className="text-2xl" />
          </button>
        )}
        <search className="hidden w-full items-center gap-4 rounded-lg bg-neutral-50 p-4 shadow-[4px_4px_10px_0px_rgba(0,0,0,0.05)] dark:bg-neutral-800/50 lg:flex">
          <Icon icon="tabler:search" className="h-5 w-5 text-neutral-500" />
          <input
            type="text"
            placeholder="Quick navigate & search ... (Press / to focus)"
            className="w-full bg-transparent text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
          />
        </search>
      </div>
      <div className="flex items-center">
        <button className="relative flex rounded-lg p-4 text-neutral-500 transition-all hover:bg-neutral-200/50 hover:text-neutral-800 dark:hover:bg-neutral-800 lg:hidden">
          <Icon icon="tabler:search" className="text-2xl" />
        </button>
        <button className="relative rounded-lg p-4 text-neutral-500 transition-all hover:bg-neutral-200/50 hover:text-neutral-800 dark:hover:bg-neutral-800">
          <Icon icon="tabler:bell" className="text-2xl" />
          <div className="absolute bottom-4 right-4 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <Menu as="div" className="relative ml-4 text-left">
          <Menu.Button className="flex items-center gap-3">
            <div className="h-9 w-9 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
              <img
                src={getAvatarURL()}
                alt="avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden flex-col items-start md:flex">
              <div className="font-semibold text-neutral-800 dark:text-neutral-100">
                {userData?.name}
              </div>
              <div className="text-sm text-neutral-400">{userData?.email}</div>
            </div>
            <Icon
              icon="tabler:chevron-down"
              className="stroke-[2px] text-neutral-500"
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-4 w-56 overflow-hidden rounded-lg bg-neutral-100 shadow-lg focus:outline-none dark:bg-neutral-800">
              <div className="py-1">
                <MenuItem
                  onClick={() => {}}
                  icon="tabler:user-cog"
                  text="Account settings"
                />
                <MenuItem
                  onClick={() => {
                    logout()
                    toast.warning('Logged out successfully!')
                  }}
                  icon="tabler:logout"
                  text="Sign out"
                />
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  )
}
