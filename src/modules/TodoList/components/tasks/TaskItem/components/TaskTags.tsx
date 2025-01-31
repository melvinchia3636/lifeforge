import React from 'react'
import { type ITodoListEntry } from '@interfaces/todo_list_interfaces'
import { useTodoListContext } from '@providers/TodoListProvider'

function TaskTags({ entry }: { entry: ITodoListEntry }): React.ReactElement {
  const { tags } = useTodoListContext()

  return (
    <div className="flex items-center gap-1">
      {typeof tags !== 'string' &&
        entry.tags?.length > 0 &&
        entry.tags.map(tag => (
          <span
            key={tag}
            className="relative isolate px-2 py-0.5 text-xs text-custom-500"
          >
            <div className="absolute left-0 top-0 z-[-1] size-full rounded-full bg-custom-500 opacity-20" />
            #{tags.find(t => t.id === tag)?.name}
          </span>
        ))}
    </div>
  )
}

export default TaskTags
