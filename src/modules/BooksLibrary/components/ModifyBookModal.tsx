import React, { useEffect, useReducer } from 'react'
import { toast } from 'react-toastify'
import Modal from '@components/modals/Modal'
import { type IFieldProps } from '@interfaces/modal_interfaces'
import { useBooksLibraryContext } from '@providers/BooksLibraryProvider'
import APIRequest from '@utils/fetchData'

function ModifyBookModal(): React.ReactElement {
  const {
    entries: {
      modifyDataModalOpenType,
      setModifyDataModalOpenType,
      existedData,
      setExistedData,
      refreshData
    },
    languages: { data: languages },
    categories: { data: categories }
  } = useBooksLibraryContext()

  const [data, setData] = useReducer(
    (state, newState) => ({
      ...state,
      ...Object.fromEntries(
        Object.entries(newState).filter(([key]) => key in state)
      )
    }),
    {
      authors: '',
      category: '',
      edition: '',
      extension: '',
      isbn: '',
      languages: [],
      md5: '',
      publisher: '',
      size: '',
      thumbnail: '',
      title: '',
      year_published: ''
    }
  )

  const FIELDS: IFieldProps[] = [
    {
      id: 'md5',
      label: 'MD5',
      icon: 'tabler:id',
      placeholder: 'MD5 Hash of the file',
      type: 'text',
      disabled: true
    },
    {
      id: 'isbn',
      label: 'ISBN',
      icon: 'tabler:barcode',
      placeholder: 'ISBN',
      type: 'text'
    },
    {
      id: 'category',
      label: 'Category',
      icon: 'tabler:category',
      type: 'listbox',
      nullOption: 'None',
      options:
        typeof categories !== 'string'
          ? categories.map(({ id, name, icon }) => ({
              text: name[0].toUpperCase() + name.slice(1),
              value: id,
              icon
            }))
          : []
    },
    {
      id: 'title',
      label: 'Book Title',
      icon: 'tabler:book',
      placeholder: 'Title of the Book',
      type: 'text'
    },
    {
      id: 'edition',
      label: 'Edition',
      icon: 'tabler:number',
      placeholder: 'Edition',
      type: 'text'
    },
    {
      id: 'authors',
      label: 'Authors',
      icon: 'tabler:users',
      placeholder: 'Authors',
      type: 'text'
    },
    {
      id: 'publisher',
      label: 'Publisher',
      icon: 'tabler:building',
      placeholder: 'Publisher',
      type: 'text'
    },
    {
      id: 'year_published',
      label: 'Publication Year',
      icon: 'tabler:calendar',
      placeholder: '20xx',
      type: 'text'
    },
    {
      id: 'languages',
      label: 'Languages',
      icon: 'tabler:language',
      type: 'listbox',
      multiple: true,
      options:
        typeof languages !== 'string'
          ? languages.map(({ id, name, icon }) => ({
              text: name[0].toUpperCase() + name.slice(1),
              value: id,
              icon
            }))
          : []
    },
    {
      id: 'extension',
      label: 'Extension',
      icon: 'tabler:file-text',
      placeholder: 'Extension',
      type: 'text',
      disabled: true
    },
    {
      id: 'size',
      label: 'File Size',
      icon: 'tabler:dimensions',
      placeholder: 'Size',
      type: 'text',
      disabled: true
    }
  ]

  async function onSubmit(): Promise<void> {
    if (data.title.trim() === '') {
      toast.error('Title cannot be empty')
    }

    if (data.year_published === '') {
      data.year_published = '0'
    }

    await APIRequest({
      endpoint: `books-library/entries/${existedData?.id}`,
      method: 'PATCH',
      body: data,
      callback: () => {
        setModifyDataModalOpenType(null)
        setExistedData(null)
        refreshData()
      },
      successInfo: 'update',
      failureInfo: 'update'
    })
  }

  useEffect(() => {
    if (existedData !== null) {
      setData(existedData)
      if (existedData.year_published === 0) {
        setData({ year_published: '' })
      }
    }
  }, [existedData])

  return (
    <Modal
      isOpen={modifyDataModalOpenType !== null}
      onClose={() => {
        setModifyDataModalOpenType(null)
      }}
      title="Modify Book Data"
      icon="tabler:pencil"
      loading={typeof languages === 'string' || typeof categories === 'string'}
      fields={FIELDS}
      data={data}
      setData={setData}
      openType="update"
      onSubmit={onSubmit}
    />
  )
}

export default ModifyBookModal
