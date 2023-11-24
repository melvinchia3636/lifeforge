/* eslint-disable multiline-ternary */
import React, { useContext } from 'react'
import { Icon } from '@iconify/react'
import { GlobalStateContext } from '../providers/GlobalStateProvider'

export default function Sidebar(): React.ReactElement {
  const { sidebarExpanded, toggleSidebar } = useContext(GlobalStateContext)

  return (
    <aside
      className={`${
        sidebarExpanded ? 'w-1/5' : 'w-[5.4rem]'
      } flex h-full shrink-0 flex-col rounded-r-2xl bg-neutral-800/50`}
    >
      <div className="flex h-36 w-full items-center justify-between pl-6">
        <h1 className="flex items-center gap-2 whitespace-nowrap text-xl font-semibold text-neutral-50">
          <Icon icon="tabler:hammer" className="text-3xl text-teal-500" />
          {sidebarExpanded && (
            <div>
              LifeForge<span className="text-3xl text-teal-500"> .</span>
            </div>
          )}
        </h1>
        {sidebarExpanded && (
          <button
            onClick={toggleSidebar}
            className="p-6 text-neutral-500 transition-all hover:text-neutral-100"
          >
            <Icon icon="tabler:menu" className="text-2xl" />
          </button>
        )}
      </div>
      <ul className="mt-6 flex flex-col overflow-y-hidden pb-6 hover:overflow-y-scroll">
        {(
          [
            ['Dashboard', 'tabler:layout-dashboard'],
            ['divider'],
            ['title', 'Productivity'],
            ['Todo', 'tabler:list-check'],
            ['Calendar', 'tabler:calendar'],
            ['divider'],
            ['title', 'Development'],
            [
              'Projects',
              'tabler:clipboard',
              [
                ['Kanban', 'tabler:layout-columns'],
                ['List', 'tabler:layout-list'],
                ['Gantt', 'tabler:arrow-autofit-content']
              ]
            ],
            ['Code Time', 'tabler:code'],
            ['Github Stats', 'tabler:brand-github'],
            ['divider'],
            ['title', 'Study'],
            ['Pomodoro Timer', 'tabler:clock-bolt'],
            ['Flashcards', 'tabler:cards'],
            [
              'Notes',
              'tabler:notebook',
              [
                ['High School', 'tabler:bell-school'],
                ['University', 'tabler:school']
              ]
            ],
            [
              'Reference Books',
              'tabler:books',
              [
                ['Mathematics', 'tabler:calculator'],
                ['Physics', 'tabler:atom']
              ]
            ],
            ['divider'],
            ['title', 'Lifestyle'],
            ['Blog', 'tabler:file-text'],
            [
              'Travel',
              'tabler:plane',
              [
                ['Places', 'tabler:map-2'],
                ['Trips', 'tabler:map-pin'],
                ['Photos', 'tabler:photo']
              ]
            ],
            ['Achievements', 'tabler:award'],
            ['divider'],
            ['title', 'Finance'],
            [
              'Wallet',
              'tabler:currency-dollar',
              [
                ['Balance', 'tabler:wallet'],
                ['Transactions', 'tabler:arrows-exchange'],
                ['Budgets', 'tabler:coin'],
                ['Reports', 'tabler:chart-bar']
              ]
            ],
            ['Wish List', 'tabler:heart'],
            ['divider'],
            ['title', 'Confidential'],
            ['Contacts', 'tabler:users'],
            ['Passwords', 'tabler:key'],
            ['divider'],
            ['title', 'storage'],
            ['Documents', 'tabler:file'],
            ['Images', 'tabler:photo'],
            ['Videos', 'tabler:video'],
            ['Musics', 'tabler:music'],
            ['divider'],
            ['title', 'Settings'],
            ['Settings', 'tabler:settings'],
            ['Plugins', 'tabler:plug'],
            ['Personalization', 'tabler:palette'],
            ['Server Status', 'tabler:server'],
            ['divider'],
            ['about', 'tabler:info-circle']
          ] as Array<[string, string, string[][] | undefined]>
        ).map(([name, icon, subsection], index) =>
          name !== 'divider' ? (
            name !== 'title' ? (
              <>
                <li
                  className={`relative flex items-center gap-6 px-4 font-medium text-neutral-100 transition-all ${
                    index === 0
                      ? "after:absolute after:right-0 after:top-1/2 after:h-8 after:w-1 after:-translate-y-1/2 after:rounded-full after:bg-teal-500 after:content-['']"
                      : 'text-neutral-400'
                  }`}
                >
                  <div
                    className={`flex w-full items-center gap-6 whitespace-nowrap rounded-lg p-4 hover:bg-neutral-800 ${
                      index === 0 ? 'bg-neutral-800' : ''
                    }`}
                  >
                    <Icon icon={icon} className="h-6 w-6 shrink-0" />
                    {sidebarExpanded && (
                      <div className="flex w-full items-center justify-between">
                        {name}
                        {subsection !== undefined && (
                          <Icon
                            icon="tabler:chevron-right"
                            className="stroke-[2px] text-neutral-400"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </li>
                {subsection !== undefined && (
                  <ul className="flex hidden flex-col gap-2">
                    {subsection.map(([name, icon]) => (
                      <li
                        key={name}
                        className="flex items-center gap-4 py-4 pl-[4.6rem] font-medium text-neutral-400 transition-all hover:bg-neutral-800"
                      >
                        <Icon icon={icon} className="h-6 w-6" />
                        {name}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              sidebarExpanded && (
                <li className="flex items-center gap-4 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-neutral-600 transition-all">
                  {icon}
                </li>
              )
            )
          ) : (
            <li
              key={name + index}
              className="my-4 h-px shrink-0 bg-neutral-700"
            />
          )
        )}
      </ul>
    </aside>
  )
}
