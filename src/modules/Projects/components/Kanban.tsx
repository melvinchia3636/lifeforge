import React from 'react'
import ModuleHeader from '../../../components/ModuleHeader'
import { Icon } from '@iconify/react/dist/iconify.js'

function Kanban(): JSX.Element {
  return (
    <>
      <div className="flex flex-col gap-1 pr-12">
        <span className="mb-4 text-lg font-medium text-neutral-500">
          Projects / <span className="text-neutral-200">LifeForge.</span>
        </span>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-4 text-3xl font-semibold text-neutral-50">
            <div className="rounded-lg bg-neutral-800 p-3">
              <Icon icon="tabler:hammer" className="text-3xl" />
            </div>
            LifeForge.
          </h1>
          <div className="flex gap-2 rounded-lg p-2">
            {[
              'tabler:layout-columns',
              'tabler:layout-list',
              'tabler:arrow-autofit-content'
            ].map((icon, index) => (
              <button
                key={index}
                className={`rounded-md p-4 hover:bg-neutral-700/50 ${
                  index === 0
                    ? 'bg-neutral-700/50 text-neutral-100'
                    : 'text-neutral-500'
                }`}
              >
                <Icon icon={icon} className="text-2xl" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-12 mt-8 flex min-h-0 min-w-0 flex-1 gap-4 overflow-x-auto overflow-y-hidden">
        {[
          ['tabler:brain', 'Brainstorm', 'border-fuchsia-500'],
          ['tabler:settings', 'In Progress', 'border-yellow-500'],
          ['tabler:check', 'Done', 'border-green-500'],
          ['tabler:bug', 'Bugs', 'border-red-500']
        ].map(([icon, name, color], i) => (
          <div
            key={i}
            className={`flex h-min max-h-full w-72 shrink-0 flex-col rounded-lg border-t-4 bg-neutral-800/50 p-6 pb-0 pr-4 ${color}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-4">
                <Icon icon={icon} className="text-2xl" />
                <span className="text-xl font-semibold text-neutral-50">
                  {name}
                </span>
              </h3>
              <button className="rounded-lg p-2 hover:bg-neutral-700/50">
                <Icon icon="tabler:dots-vertical" className="text-xl" />
              </button>
            </div>
            <ul className="mt-6 flex flex-col gap-2 overflow-y-auto">
              {Array(Math.floor(Math.random() * 10))
                .fill(0)
                .map((_, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 rounded-lg bg-neutral-700/30 p-4 hover:bg-neutral-700/50"
                  >
                    <span className="text-neutral-50">
                      {
                        [
                          'Lorem ipsum dolor sit amet',
                          'consectetur adipiscing elit',
                          'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                          'Ut enim ad minim veniam'
                        ][Math.floor(Math.random() * 4)]
                      }
                    </span>
                  </li>
                ))}
              <li className="flex items-center justify-center">
                <button className="mb-4 flex w-full items-center gap-2 rounded-lg border-neutral-500 p-4 pl-3 font-medium text-neutral-500 hover:bg-neutral-700/30">
                  <Icon icon="tabler:plus" className="text-xl" />
                  <span>Add a card</span>
                </button>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

export default Kanban
