import React from 'react'
import SidebarTitle from '@components/Sidebar/components/SidebarTitle'
import { useTodoListContext } from '@providers/TodoListProvider'
import TaskTagListItem from './TaskTagListItem'
import APIComponentWithFallback from '@components/Screens/APIComponentWithFallback'

function TaskTagList({
  setSidebarOpen
}: {
  setSidebarOpen: (value: boolean) => void
}): React.ReactElement {
  const {
    tags,
    setModifyListModalOpenType: setModifyModalOpenType,
    setSelectedList: setSelectedData
  } = useTodoListContext()

  return (
    <>
      <SidebarTitle
        name="Tags"
        actionButtonIcon="tabler:plus"
        actionButtonOnClick={() => {
          setModifyModalOpenType('create')
          setSelectedData(null)
        }}
      />
      <APIComponentWithFallback data={tags}>
        {tags => (
          <>
            {tags.map(item => (
              <TaskTagListItem
                key={item.id}
                item={item}
                setSidebarOpen={setSidebarOpen}
              />
            ))}
          </>
        )}
      </APIComponentWithFallback>
    </>
  )
}

export default TaskTagList
