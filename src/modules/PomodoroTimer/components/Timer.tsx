/* eslint-disable multiline-ternary */
import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'

export default function Timer(): React.ReactElement {
  const [started, setStarted] = useState(false)

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-12">
      <div className="relative flex flex-col items-center justify-center">
        <div
          className="radial-progress absolute text-neutral-200 dark:text-neutral-800/50"
          style={{
            '--value': '100',
            '--size': '28rem',
            '--thickness': '20px'
          }}
          role="progressbar"
        ></div>
        <div
          className="radial-progress flex items-center justify-center text-amber-500"
          style={{
            '--value': '70',
            '--size': '28rem',
            '--thickness': '20px'
          }}
          role="progressbar"
        >
          <div className="z-[9999] mt-12 flex flex-col items-center gap-4 text-neutral-800 dark:text-neutral-100">
            <span className="text-7xl font-medium tracking-widest">02:33</span>
            <span className="text-lg font-medium uppercase tracking-widest text-amber-500">
              short break
            </span>
            {started ? (
              <span className="text-lg font-medium tracking-widest text-neutral-100">
                #8
              </span>
            ) : (
              <button
                onClick={() => {
                  setStarted(true)
                }}
                className="rounded-lg p-4 text-neutral-800 hover:bg-neutral-50 dark:bg-neutral-800/50 dark:text-neutral-100"
              >
                <Icon icon="tabler:play" className="h-8 w-8 shrink-0" />
              </button>
            )}
          </div>
        </div>
      </div>
      {started && (
        <div className="flex items-center gap-6">
          <button className="flex shrink-0 items-center gap-2 rounded-lg bg-amber-500 p-4 px-6 pr-7 font-semibold uppercase tracking-wider text-neutral-100 dark:text-neutral-800">
            <Icon icon="tabler:pause" className="h-5 w-5 shrink-0" />
            <span className="shrink-0">pause session</span>
          </button>
          <button
            onClick={() => {
              setStarted(false)
            }}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-neutral-200 p-4 px-6 pr-7 font-semibold uppercase tracking-wider text-neutral-500 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700/50"
          >
            <Icon icon="tabler:square" className="h-5 w-5 shrink-0" />
            <span className="shrink-0">end session</span>
          </button>
        </div>
      )}
    </div>
  )
}
