import React from 'react'
import {
  ListboxOrComboboxInput,
  ListboxOrComboboxOption
} from '@components/inputs'
import { useTodoListContext } from '@providers/TodoListProvider'

function ListSelector({
  list,
  setList
}: {
  list: string | null
  setList: (list: string) => void
}): React.ReactElement {
  const { lists } = useTodoListContext()

  if (typeof lists === 'string') return <></>

  return (
    <ListboxOrComboboxInput
      namespace="modules.todoList"
      type="listbox"
      name="list"
      icon="tabler:list"
      value={list}
      setValue={setList}
      buttonContent={
        <>
          <span
            className="block h-6 w-1 rounded-full"
            style={{
              backgroundColor:
                lists.find(l => l.id === list)?.color ?? 'lightgray'
            }}
          />
          <span className="-mt-px block truncate">
            {lists.find(l => l.id === list)?.name ?? 'None'}
          </span>
        </>
      }
    >
      <ListboxOrComboboxOption text="None" value="" color="lightgray" />
      {lists.map(({ name, color, id }) => (
        <ListboxOrComboboxOption
          key={id}
          text={name}
          value={id}
          color={color}
        />
      ))}
    </ListboxOrComboboxInput>
  )
}

export default ListSelector
