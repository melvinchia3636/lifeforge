import { Icon } from '@iconify/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@components/buttons'
import HeaderFilter from '@components/utilities/HeaderFilter'
import { useTodoListContext } from '@providers/TodoListProvider'

function Header({
  setSidebarOpen
}: {
  setSidebarOpen: (value: boolean) => void
}): React.ReactElement {
  const { t } = useTranslation('modules.todoList')
  const {
    entries,
    priorities,
    lists,
    tags,
    setSelectedTask,
    setModifyTaskWindowOpenType
  } = useTodoListContext()
  const [searchParams, setSearchParams] = useSearchParams()

  if (
    typeof entries === 'string' ||
    typeof lists === 'string' ||
    typeof tags === 'string' ||
    typeof priorities === 'string'
  ) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex-between flex">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold md:text-4xl">
          {`${t(
            `headers.${(() => {
              const status = searchParams.get('status')
              const hasFilter =
                searchParams.has('list') ||
                searchParams.has('tag') ||
                searchParams.has('priority')
              if (status === null || status === '') {
                return hasFilter ? 'filtered' : 'all'
              }
              return status === 'today' ? 'todays' : status
            })().toLowerCase()}Tasks`
          )}`.trim()}{' '}
          <span className="text-base text-bg-500">({entries.length})</span>
        </h1>
        <HeaderFilter
          items={{
            list: {
              data: lists,
              isColored: true
            },
            tag: {
              data: tags.map(e => ({ ...e, icon: 'tabler:tag' }))
            },
            priority: {
              data: priorities.map(e => ({ ...e, icon: 'tabler:adjustments' })),
              isColored: true
            }
          }}
        />
      </div>
      <div className="flex items-center gap-6">
        <Button
          onClick={() => {
            setSelectedTask(null)
            setModifyTaskWindowOpenType('create')
          }}
          className="hidden sm:flex"
          icon="tabler:plus"
          tProps={{ item: t('items.task') }}
        >
          new
        </Button>
        <Button
          onClick={() => {
            setSidebarOpen(true)
          }}
          icon="tabler:menu"
          variant="no-bg"
          className="xl:hidden"
        />
      </div>
    </div>
  )
}

export default Header
