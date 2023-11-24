/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import AppRouter from './Router'

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <div className="flex h-screen w-full bg-neutral-900 text-neutral-50">
        <AppRouter />
      </div>
    </BrowserRouter>
  )
}

export default App
