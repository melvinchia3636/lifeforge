import React from 'react'
import {
  ListboxOrComboboxInput,
  ListboxOrComboboxOption
} from '@components/inputs'
import { useTodoListContext } from '@providers/TodoListProvider'

function TagsSelector({
  tags,
  setTags
}: {
  tags: string[]
  setTags: (tags: string[]) => void
}): React.ReactElement {
  const { tags: tagsList } = useTodoListContext()

  if (typeof tagsList === 'string') return <></>

  return (
    <ListboxOrComboboxInput
      namespace="modules.todoList"
      type="listbox"
      name="tags"
      icon="tabler:tags"
      value={tags}
      setValue={setTags}
      multiple
      buttonContent={
        <span className="-mt-px block truncate">
          {tags.length > 0
            ? tags
                .map(tag => `# ${tagsList.find(t => t.id === tag)?.name}`)
                .join(', ')
            : 'None'}
        </span>
      }
    >
      {tagsList.map(({ name, id }, i) => (
        <ListboxOrComboboxOption
          key={i}
          icon="tabler:hash"
          text={name}
          value={id}
        />
      ))}
    </ListboxOrComboboxInput>
  )
}

export default TagsSelector
