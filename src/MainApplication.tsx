import React from 'react'
import GlobalStateProvider from './providers/GlobalStateProvider'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler
} from 'chart.js'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler
)

function MainApplication(): JSX.Element {
  return (
    <GlobalStateProvider>
      <Sidebar />
      <main className="flex h-full w-full flex-col pb-0">
        <Header />
        <slot />
      </main>
    </GlobalStateProvider>
  )
}

export default MainApplication
