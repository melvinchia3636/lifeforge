// App.tsx
import React from 'react'
import Providers from './Providers.tsx'
import AppRouter from './Router.tsx'

function App(): React.ReactElement {
  return (
    <main
      id="app"
      className="relative flex h-dvh w-full overflow-hidden bg-bg-200/50 text-bg-800 dark:bg-bg-900/50 dark:text-bg-50"
    >
      <Providers>
        <AppRouter />
      </Providers>
    </main>
  )
}

export default App
