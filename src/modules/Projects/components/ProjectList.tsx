import React from 'react'
import ModuleHeader from '../../../components/ModuleHeader'
import SidebarTitle from '../../../components/Sidebar/components/SidebarTitle'
import { Icon } from '@iconify/react/dist/iconify.js'
import SidebarDivider from '../../../components/Sidebar/components/SidebarDivider'

export default function ProjectList(): React.JSX.Element {
  return (
    <>
      <ModuleHeader title="Projects" />
      <div className="mb-12 mt-8 flex min-h-0 w-full flex-1">
        <aside className="h-full w-1/4 overflow-y-scroll rounded-lg bg-neutral-800/50 py-4">
          <ul className="flex flex-col overflow-y-hidden hover:overflow-y-scroll">
            <SidebarTitle name="category" />
            {[
              ['tabler:planet', 'Website'],
              ['tabler:device-mobile', 'Mobile App'],
              ['tabler:devices-pc', 'Desktop App']
            ].map(([icon, name], index) => (
              <li
                key={index}
                className="relative flex items-center gap-6 px-4 font-medium text-neutral-400 transition-all"
              >
                <div className="flex w-full items-center gap-6 whitespace-nowrap rounded-lg p-4 hover:bg-neutral-800">
                  <Icon icon={icon} className="h-6 w-6 shrink-0" />
                  <div className="flex w-full items-center justify-between">
                    {name}
                  </div>
                  <span className="text-sm">
                    {Math.floor(Math.random() * 10)}
                  </span>
                </div>
              </li>
            ))}
            <SidebarDivider />
            <SidebarTitle name="status" />
            {[
              ['tabler:zzz', 'Pending', 'bg-red-500'],
              ['tabler:circle-check', 'In Progress', 'bg-yellow-500'],
              ['tabler:circle-check', 'Completed', 'bg-green-500']
            ].map(([icon, name, color], index) => (
              <li
                key={index}
                className="relative flex items-center gap-6 px-4 font-medium text-neutral-400 transition-all"
              >
                <div className="flex w-full items-center gap-6 whitespace-nowrap rounded-lg p-4 hover:bg-neutral-800">
                  <span className={`block h-8 w-1.5 rounded-full ${color}`} />
                  <Icon icon={icon} className="h-6 w-6 shrink-0" />
                  <div className="flex w-full items-center justify-between">
                    {name}
                  </div>
                  <span className="text-sm">
                    {Math.floor(Math.random() * 10)}
                  </span>
                </div>
              </li>
            ))}
            <SidebarDivider />
            <SidebarTitle name="visibility" />
            {[
              ['tabler:brand-open-source', 'Open Source'],
              ['tabler:briefcase', 'Private & Commercial']
            ].map(([icon, name], index) => (
              <li
                key={index}
                className="relative flex items-center gap-6 px-4 font-medium text-neutral-400 transition-all"
              >
                <div className="flex w-full items-center gap-6 whitespace-nowrap rounded-lg p-4 hover:bg-neutral-800">
                  <Icon icon={icon} className="h-6 w-6 shrink-0" />
                  <div className="flex w-full items-center justify-between">
                    {name}
                  </div>
                  <span className="text-sm">
                    {Math.floor(Math.random() * 10)}
                  </span>
                </div>
              </li>
            ))}
            <SidebarDivider />
            <SidebarTitle name="Technologies" />
            {[
              ['simple-icons:react', 'React'],
              ['simple-icons:angular', 'Angular'],
              ['simple-icons:electron', 'Electron'],
              ['simple-icons:python', 'Python'],
              ['simple-icons:swift', 'Swift'],
              ['simple-icons:android', 'Android'],
              ['simple-icons:apple', 'iOS'],
              ['simple-icons:windows', 'Windows'],
              ['simple-icons:linux', 'Linux']
            ].map(([icon, name], index) => (
              <li
                key={index}
                className="relative flex items-center gap-6 px-4 font-medium text-neutral-400 transition-all"
              >
                <div className="flex w-full items-center gap-6 whitespace-nowrap rounded-lg p-4 hover:bg-neutral-800">
                  <Icon icon={icon} className="h-6 w-6 shrink-0" />
                  <div className="flex w-full items-center justify-between">
                    {name}
                  </div>
                  <span className="text-sm">
                    {Math.floor(Math.random() * 10)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
        <div className="ml-12 flex h-full flex-1 flex-col">
          <div className="flex items-center gap-4">
            <div className="flex w-full items-center gap-4 rounded-lg bg-neutral-800/50 p-4">
              <Icon icon="tabler:search" className="h-5 w-5 text-neutral-500" />
              <input
                type="text"
                placeholder="Search projects ..."
                className="w-full bg-transparent text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
              />
            </div>
            <button className="flex h-full shrink-0 items-center gap-2 rounded-lg bg-teal-500 px-4 font-semibold uppercase tracking-wider text-neutral-100">
              <Icon icon="tabler:plus" className="h-5 w-5 shrink-0" />
              <span className="shrink-0">create</span>
            </button>
          </div>
          <div className="mt-8 flex flex-1 flex-col overflow-y-auto">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4 rounded-lg bg-neutral-800/50 p-6">
                <div className="flex w-full items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-1 shrink-0 rounded-full bg-yellow-500" />
                    <div className="h-12 w-12 overflow-hidden rounded-lg bg-neutral-800 p-2">
                      <Icon icon="tabler:hammer" className="h-full w-full" />
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="font-semibold text-neutral-50">
                        LifeForge.
                      </div>
                      <div className="text-sm text-neutral-500">Webapp</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Icon
                      icon="simple-icons:react"
                      className="h-6 w-6 text-sky-500"
                    />
                    <Icon
                      icon="simple-icons:tailwindcss"
                      className="h-6 w-6 text-cyan-500"
                    />
                    <Icon icon="simple-icons:pocketbase" className="h-6 w-6" />
                    <Icon
                      icon="simple-icons:typescript"
                      className="h-6 w-6 text-blue-500"
                    />
                    <Icon
                      icon="simple-icons:raspberrypi"
                      className="h-6 w-6 text-red-500"
                    />
                  </div>
                  <div className="flex items-center gap-4 ">
                    <Icon icon="tabler:chevron-right" className="h-5 w-5" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
