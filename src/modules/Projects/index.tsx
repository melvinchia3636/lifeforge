/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/indent */
import React from 'react'
import { useLocation } from 'react-router'
import ProjectList from './components/ProjectList'
import Kanban from './components/Kanban'

function Projects(): React.JSX.Element {
  const location = useLocation()

  return (
    <section className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-y-auto pl-12">
      {(() => {
        switch (location.hash) {
          case '#kanban':
            return <Kanban />
          case '#list':
            return <div>list</div>
          case '#gantt':
            return <div>ghantt</div>
          default:
            return <ProjectList />
        }
      })()}
    </section>
  )
}

export default Projects
