import React, { createContext, useState } from 'react'

const GLOBAL_STATE = {
  sidebarExpanded: true,
  toggleSidebar: () => {}
}

export const GlobalStateContext = createContext(GLOBAL_STATE)

export default function GlobalStateProvider({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  const [navbarExpanded, setNavbarExpanded] = useState(true)

  function toggleNavbarExpanded(): void {
    setNavbarExpanded(!navbarExpanded)
  }

  return (
    <GlobalStateContext.Provider
      value={{
        sidebarExpanded: navbarExpanded,
        toggleSidebar: toggleNavbarExpanded
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}
