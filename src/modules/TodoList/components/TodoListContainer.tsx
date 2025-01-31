import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { FAB } from '@components/buttons'
import { SearchInput } from '@components/inputs'
import DeleteConfirmationModal from '@components/modals/DeleteConfirmationModal'
import APIFallbackComponent from '@components/screens/APIComponentWithFallback'
import EmptyStateScreen from '@components/screens/EmptyStateScreen'
import { useTodoListContext } from '@providers/TodoListProvider'
import Header from './Header'
import ModifyTaskWindow from './ModifyTaskWindow'
import Sidebar from './Sidebar'
import TaskList from './tasks/TaskList'
import ModifyListModal from '../modals/ModifyListModal'
import ModifyPriorityModal from '../modals/ModifyPriorityModal'
import ModifyTagModal from '../modals/ModifyTagModal'

function TodoListContainer(): React.ReactElement {
  const { t } = useTranslation('modules.todoList')
  const [searchParams, setSearchParams] = useSearchParams()
  const {
    entries,
    refreshPriorities,
    refreshLists,
    refreshTagsList,
    refreshEntries,
    refreshStatusCounter,
    setModifyTaskWindowOpenType,
    deleteTaskConfirmationModalOpen,
    setDeleteTaskConfirmationModalOpen,
    selectedTask,
    selectedPriority,
    selectedList,
    selectedTag,
    setSelectedTask,
    deletePriorityConfirmationModalOpen,
    setDeletePriorityConfirmationModalOpen,
    deleteListConfirmationModalOpen,
    setDeleteListConfirmationModalOpen,
    deleteTagConfirmationModalOpen,
    setDeleteTagConfirmationModalOpen
  } = useTodoListContext()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const { hash } = useLocation()

  useEffect(() => {
    if (hash === '#new') {
      setSelectedTask(null)
      setModifyTaskWindowOpenType('create')
    }
  }, [hash])

  useEffect(() => {
    const status = searchParams.get('status')
    if (status === null || status === '') return
    if (
      !['all', 'today', 'scheduled', 'overdue', 'completed'].includes(status)
    ) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        status: 'all'
      })
    }
  }, [searchParams])

  return (
    <>
      <div className="mt-6 flex size-full min-h-0 flex-1">
        <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="relative z-10 flex h-full flex-1 flex-col xl:ml-8">
          <Header setSidebarOpen={setSidebarOpen} />
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            stuffToSearch="task"
            namespace="modules.todoList"
          />
          <APIFallbackComponent data={entries}>
            {entries =>
              entries.length > 0 ? (
                <TaskList />
              ) : (
                <EmptyStateScreen
                  name="tasks"
                  namespace="modules.todoList"
                  icon="tabler:article-off"
                  ctaContent="new"
                  ctaTProps={{
                    item: t('items.task')
                  }}
                  onCTAClick={setModifyTaskWindowOpenType}
                />
              )
            }
          </APIFallbackComponent>
        </div>
      </div>
      <ModifyTaskWindow />
      <DeleteConfirmationModal
        apiEndpoint="todo-list/entries"
        isOpen={deleteTaskConfirmationModalOpen}
        onClose={() => {
          setDeleteTaskConfirmationModalOpen(false)
          refreshPriorities()
          refreshLists()
          refreshTagsList()
          refreshStatusCounter()
        }}
        data={selectedTask}
        itemName="task"
        updateDataLists={refreshEntries}
        nameKey="summary"
      />
      {entries.length > 0 && (
        <FAB
          onClick={() => {
            setSelectedTask(null)
            setModifyTaskWindowOpenType('create')
          }}
        />
      )}
      <ModifyPriorityModal />
      <DeleteConfirmationModal
        apiEndpoint="todo-list/priorities"
        data={selectedPriority}
        isOpen={deletePriorityConfirmationModalOpen}
        itemName="priority"
        onClose={() => {
          setDeletePriorityConfirmationModalOpen(false)
        }}
        updateDataLists={refreshPriorities}
        customText="Are you sure you want to delete this priority? The tasks with this priority will not be deleted."
      />
      <ModifyListModal />
      <DeleteConfirmationModal
        apiEndpoint="todo-list/lists"
        data={selectedList}
        isOpen={deleteListConfirmationModalOpen}
        itemName="list"
        onClose={() => {
          setDeleteListConfirmationModalOpen(false)
        }}
        updateDataLists={refreshLists}
        customText="Are you sure you want to delete this list? The tasks inside this list will not be deleted."
      />
      <ModifyTagModal />
      <DeleteConfirmationModal
        apiEndpoint="todo-list/tags"
        data={selectedTag}
        isOpen={deleteTagConfirmationModalOpen}
        itemName="tag"
        onClose={() => {
          setDeleteTagConfirmationModalOpen(false)
        }}
        updateDataLists={refreshTagsList}
        customText="Are you sure you want to delete this tag? The tasks with this tag will not be deleted."
      />
    </>
  )
}

export default TodoListContainer
