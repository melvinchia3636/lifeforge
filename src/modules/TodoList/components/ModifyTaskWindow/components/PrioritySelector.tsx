// PriorityListbox.tsx
import React from 'react'
import {
  ListboxOrComboboxInput,
  ListboxOrComboboxOption
} from '@components/inputs'
import { useTodoListContext } from '@providers/TodoListProvider'

function PrioritySelector({
  priority,
  setPriority
}: {
  priority: string | null
  setPriority: React.Dispatch<React.SetStateAction<string | null>>
}): React.ReactElement {
  const { priorities } = useTodoListContext()

  if (typeof priorities === 'string') return <></>

  return (
    <ListboxOrComboboxInput
      namespace="modules.todoList"
      type="listbox"
      name="priority"
      icon="tabler:alert-triangle"
      value={priority}
      setValue={setPriority}
      buttonContent={
        <>
          <span
            className="block h-6 w-1 rounded-full"
            style={{
              backgroundColor:
                priorities.find(p => p.id === priority)?.color ?? 'lightgray'
            }}
          />
          <span className="-mt-px block truncate">
            {priorities.find(p => p.id === priority)?.name ?? 'None'}
          </span>
        </>
      }
    >
      <ListboxOrComboboxOption
        key={'none'}
        value=""
        text="None"
        color="lightgray"
      />
      {priorities.map(({ name, color, id }, i) => (
        <ListboxOrComboboxOption key={i} value={id} text={name} color={color} />
      ))}
    </ListboxOrComboboxInput>
  )
}

export default PrioritySelector
