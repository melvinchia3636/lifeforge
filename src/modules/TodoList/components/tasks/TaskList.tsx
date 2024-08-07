import React from 'react'
import Scrollbar from '@components/Scrollbar'
import { useTodoListContext } from '@providers/TodoListProvider'
import TaskItem from './TaskItem'

function TaskList(): React.ReactElement {
  const { entries } = useTodoListContext()

  return (
    <div className="mb-8 mt-6 flex flex-1 flex-col px-4">
      <Scrollbar>
        {typeof entries !== 'string' && entries.length > 0 && (
          <ul className="mt-4 flex flex-1 flex-col gap-4 pb-24 sm:pb-8">
            {entries.map(entry => (
              <TaskItem entry={entry} key={entry.id} />
            ))}
          </ul>
        )}
      </Scrollbar>
    </div>
  )
}

export default TaskList
