/* eslint-disable @typescript-eslint/indent */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState, useCallback } from 'react'
import Modal from '../../../components/Modal'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useDebounce } from '@uidotdev/usehooks'
import { Menu, Transition } from '@headlessui/react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

function CreateIdeaModal({
  openType,
  setOpenType,
  typeOfModifyIdea,
  containerId,
  setData
}: {
  openType: 'create' | 'update' | null
  setOpenType: React.Dispatch<React.SetStateAction<'create' | 'update' | null>>
  typeOfModifyIdea: 'text' | 'image' | 'link'
  containerId: string
  setData: React.Dispatch<React.SetStateAction<any>>
}): React.ReactElement {
  const innerOpenType = useDebounce(openType, openType === null ? 300 : 0)
  const [innerTypeOfModifyIdea, setInnerTypeOfModifyIdea] = useState<
    'text' | 'image' | 'link'
  >('text')
  const [ideaTitle, setIdeaTitle] = useState('')
  const [ideaContent, setIdeaContent] = useState('')
  const [ideaLink, setIdeaLink] = useState('')
  const [ideaImage, setIdeaImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = new FileReader()

    file.onload = function () {
      setPreview(file.result)
    }

    file.readAsDataURL(acceptedFiles[0])
    setIdeaImage(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  })

  function updateIdeaTitle(event: React.ChangeEvent<HTMLInputElement>): void {
    setIdeaTitle(event.target.value)
  }

  function updateIdeaContent(
    event: React.FormEvent<HTMLTextAreaElement>
  ): void {
    setIdeaContent(event.currentTarget.value)
  }

  function updateIdeaLink(event: React.ChangeEvent<HTMLInputElement>): void {
    setIdeaLink(event.target.value)
  }

  useEffect(() => {
    setInnerTypeOfModifyIdea(typeOfModifyIdea)
  }, [typeOfModifyIdea])

  useEffect(() => {
    if (openType === 'create') {
      setIdeaTitle('')
      setIdeaContent('')
      setIdeaLink('')
      setIdeaImage(null)
      setPreview(null)
    }
  }, [openType])

  function onSubmitButtonClick(): void {
    switch (innerTypeOfModifyIdea) {
      case 'text':
        if (ideaContent.length === 0) {
          toast.error('Idea content cannot be empty.')
          return
        }
        break
      case 'image':
        if (ideaImage === null) {
          toast.error('Idea image cannot be empty.')
          return
        }
        break
      case 'link':
        if (ideaTitle.length === 0 || ideaLink.length === 0) {
          toast.error('Idea title and link cannot be empty.')
          return
        }
        break
    }

    setLoading(true)

    const formData = new FormData()
    formData.append('title', ideaTitle)
    formData.append('content', ideaContent)
    formData.append('link', ideaLink)
    formData.append('image', ideaImage!)
    formData.append('type', innerTypeOfModifyIdea)

    fetch(
      `http://localhost:3636/idea-box/idea/${
        innerOpenType === 'create' ? 'create' : 'update'
      }/${containerId}`,
      {
        method: innerOpenType === 'create' ? 'PUT' : 'PATCH',
        body: formData
      }
    )
      .then(async res => {
        const data = await res.json()
        if (res.ok) {
          toast.success(
            `Yay! Idea ${
              innerOpenType === 'create' ? 'created' : 'updated'
            } successfully.`
          )
          setData((prev: any) => [data.data, ...prev])
          setOpenType(null)
          return data
        } else {
          throw new Error(data.message)
        }
      })
      .catch(err => {
        toast.error(
          `Oops! Couldn't ${
            innerOpenType === 'create' ? 'create' : 'update'
          } the idea. Please try again.`
        )
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Modal isOpen={openType !== null}>
      <div className="mb-8 flex w-[50vw] items-center justify-between">
        <h1 className="flex items-center gap-3 text-2xl font-semibold">
          <Icon
            icon={
              {
                create: 'tabler:plus',
                update: 'tabler:pencil'
              }[innerOpenType!]
            }
            className="h-7 w-7"
          />
          {
            {
              create: 'New ',
              update: 'Update '
            }[innerOpenType!]
          }{' '}
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex w-full items-center justify-center rounded-md border-2 border-neutral-800 p-2 px-4 text-lg font-semibold tracking-wide text-neutral-200 shadow-sm outline-none hover:bg-neutral-800/50 focus:outline-none">
              <Icon
                icon={
                  {
                    text: 'tabler:article',
                    image: 'tabler:photo',
                    link: 'tabler:link'
                  }[innerTypeOfModifyIdea]
                }
                className="mr-2 h-5 w-5"
              />
              {innerTypeOfModifyIdea === 'text'
                ? 'Text'
                : innerTypeOfModifyIdea === 'image'
                ? 'Image'
                : 'Link'}
              <Icon
                icon="tabler:chevron-down"
                className="-mr-1 ml-2 h-4 w-4 stroke-[2px]"
                aria-hidden="true"
              />
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              className="absolute left-0 z-[999] mt-2"
            >
              <Menu.Items className="w-56 overflow-hidden rounded-lg bg-neutral-800 shadow-lg outline-none focus:outline-none">
                {[
                  ['text', 'tabler:article', 'Text'],
                  ['image', 'tabler:photo', 'Image'],
                  ['link', 'tabler:link', 'Link']
                ].map(([type, icon, name]) => (
                  <Menu.Item key={type}>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          setInnerTypeOfModifyIdea(
                            type as 'text' | 'image' | 'link'
                          )
                        }}
                        className={`${
                          active ? 'bg-neutral-700' : 'text-neutral-500'
                        } group flex w-full items-center rounded-md p-4 text-base`}
                      >
                        <Icon
                          icon={icon}
                          className="mr-3 h-5 w-5 text-neutral-400 group-hover:text-neutral-300"
                          aria-hidden="true"
                        />
                        {name}
                        {innerTypeOfModifyIdea === type && (
                          <Icon
                            icon="tabler:check"
                            className="ml-auto h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
          Idea
        </h1>
        <button
          onClick={() => {
            setOpenType(null)
          }}
          className="rounded-md p-2 text-neutral-500 transition-all hover:bg-neutral-800"
        >
          <Icon icon="tabler:x" className="h-6 w-6" />
        </button>
      </div>
      {innerTypeOfModifyIdea === 'link' && (
        <div className="group relative mb-6 flex items-center gap-1 rounded-t-lg border-b-2 border-neutral-500 bg-neutral-800/50 focus-within:border-teal-500">
          <Icon
            icon="tabler:bulb"
            className="ml-6 h-6 w-6 shrink-0 text-neutral-500 group-focus-within:text-teal-500"
          />
          <div className="flex w-full items-center gap-2">
            <span
              className={`pointer-events-none absolute left-[4.2rem] font-medium tracking-wide text-neutral-500 group-focus-within:text-teal-500 ${
                ideaTitle.length === 0
                  ? 'top-1/2 -translate-y-1/2 group-focus-within:top-6 group-focus-within:text-[14px]'
                  : 'top-6 -translate-y-1/2 text-[14px]'
              }`}
            >
              Idea title
            </span>
            <input
              value={ideaTitle}
              onChange={updateIdeaTitle}
              placeholder="Mind blowing idea"
              className="mt-6 h-8 w-full rounded-lg bg-transparent p-6 pl-4 tracking-wide placeholder:text-transparent focus:outline-none focus:placeholder:text-neutral-500"
            />
          </div>
        </div>
      )}
      {innerTypeOfModifyIdea !== 'image' ? (
        <div
          onFocus={e => {
            e.currentTarget.querySelector('textarea input')?.focus()
          }}
          className="group relative flex items-center gap-1 rounded-t-lg border-b-2 border-neutral-500 bg-neutral-800/50 focus-within:border-teal-500"
        >
          <Icon
            icon={
              innerTypeOfModifyIdea === 'text'
                ? 'tabler:file-text'
                : 'tabler:link'
            }
            className="ml-6 h-6 w-6 shrink-0 text-neutral-500 group-focus-within:text-teal-500"
          />
          <div className="flex w-full items-center gap-2">
            <span
              className={`pointer-events-none absolute left-[4.2rem] font-medium tracking-wide text-neutral-500 group-focus-within:text-teal-500 ${
                {
                  text: ideaContent,
                  link: ideaLink
                }[innerTypeOfModifyIdea].length === 0
                  ? 'top-1/2 -translate-y-1/2 group-focus-within:top-6 group-focus-within:text-[14px]'
                  : 'top-6 -translate-y-1/2 text-[14px]'
              }`}
            >
              {innerTypeOfModifyIdea === 'text'
                ? 'Idea content'
                : 'Link to idea'}
            </span>
            {innerTypeOfModifyIdea === 'text' ? (
              <textarea
                value={ideaContent}
                onInput={e => {
                  e.currentTarget.style.height = 'auto'
                  e.currentTarget.style.height =
                    e.currentTarget.scrollHeight + 'px'
                  updateIdeaContent(e)
                }}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, lorem euismod."
                className="mt-6 min-h-[2rem] w-full resize-none rounded-lg bg-transparent p-6 pl-4 tracking-wide outline-none placeholder:text-transparent focus:outline-none focus:placeholder:text-neutral-500"
              />
            ) : (
              <input
                value={ideaLink}
                onChange={updateIdeaLink}
                placeholder="https://example.com"
                className="mt-6 h-8 w-full rounded-lg bg-transparent p-6 pl-4 tracking-wide placeholder:text-transparent focus:outline-none focus:placeholder:text-neutral-500"
              />
            )}
          </div>
        </div>
      ) : preview ? (
        <div className="flex items-center justify-center">
          <div className="relative flex h-[30rem] min-h-[8rem] w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-800">
            <img
              src={preview as string}
              alt="preview"
              className="h-full w-full object-scale-down"
            />
            <button
              onClick={() => {
                setPreview(null)
              }}
              className="absolute right-4 top-4 rounded-lg bg-neutral-800 p-2 text-neutral-100 transition-all hover:bg-neutral-900"
            >
              <Icon icon="tabler:x" className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="flex w-full flex-col items-center justify-center rounded-lg border-[3px] border-dashed border-neutral-500 py-12"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Icon
            icon="tabler:drag-drop"
            className="h-20 w-20 text-neutral-500"
          />
          <div className="mt-4 text-center text-2xl font-medium text-neutral-500">
            {isDragActive ? "Drop it like it's hot" : 'Drag and drop to upload'}
          </div>
          <div className="mt-4 text-center text-lg font-semibold uppercase tracking-widest text-neutral-400">
            or
          </div>
          <label
            htmlFor="idea-image"
            className="mt-4 flex items-center gap-2 rounded-lg bg-neutral-100 p-4 pr-5 font-semibold uppercase tracking-wider text-neutral-800 transition-all hover:bg-neutral-200"
          >
            <Icon icon="tabler:upload" className="h-5 w-5" />
            Upload image
          </label>
        </div>
      )}
      <button
        disabled={loading}
        onClick={onSubmitButtonClick}
        className="mt-8 flex h-16 items-center justify-center gap-2 rounded-lg bg-teal-500 p-4 pr-5 font-semibold uppercase tracking-wider text-neutral-800 transition-all hover:bg-teal-600"
      >
        {!loading ? (
          <>
            <Icon
              icon={
                {
                  create: 'tabler:plus',
                  update: 'tabler:pencil'
                }[innerOpenType!]
              }
              className="h-5 w-5"
            />
            {
              {
                create: 'CREATE',
                update: 'UPDATE'
              }[innerOpenType!]
            }
          </>
        ) : (
          <span className="small-loader-dark"></span>
        )}
      </button>
    </Modal>
  )
}

export default CreateIdeaModal
