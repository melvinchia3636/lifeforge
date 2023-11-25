import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'

function NotFound(): React.JSX.Element {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <h1 className="text-9xl text-teal-500">;-;</h1>
      <h1 className="text-4xl">Page not found</h1>
      <h2 className="-mt-2 text-xl text-neutral-500">
        The page you are looking for does not exist.
      </h2>
      <div className="mt-6 flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center rounded-lg bg-teal-500 px-6 py-4 font-medium uppercase tracking-widest text-white"
        >
          <Icon icon="tabler:arrow-left" className="mr-2 h-5 w-5" />
          Return home
        </Link>
        <Link
          to="bug-report"
          className="flex items-center rounded-lg bg-neutral-800 px-6 py-4 font-medium uppercase tracking-widest"
        >
          <Icon icon="tabler:bug" className="mr-2 h-5 w-5" />
          Report a bug
        </Link>
      </div>
    </div>
  )
}

export default NotFound
