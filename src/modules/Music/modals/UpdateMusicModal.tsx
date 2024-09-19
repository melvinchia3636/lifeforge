import { t } from 'i18next'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import CreateOrModifyButton from '@components/ButtonsAndInputs/CreateOrModifyButton'
import Input from '@components/ButtonsAndInputs/Input'
import Modal from '@components/Modals/Modal'
import ModalHeader from '@components/Modals/ModalHeader'
import { useMusicContext } from '@providers/MusicProvider'
import APIRequest from '@utils/fetchData'

function ModifyMusicModal(): React.ReactElement {
  const {
    isModifyMusicModalOpen: isOpen,
    setIsModifyMusicModalOpen: setOpen,
    existedData: targetMusic,
    setMusics
  } = useMusicContext()
  const [musicName, setMusicName] = useState('')
  const [musicAuthor, setMusicAuthor] = useState('')
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  const updateMusicName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMusicName(e.target.value)
  }

  const updateMusicAuthor = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMusicAuthor(e.target.value)
  }

  async function onSubmitButtonClick(): Promise<void> {
    if (musicName.trim().length === 0 || musicAuthor.trim().length === 0) {
      toast.error(t('input.error.fieldEmpty'))
      return
    }

    setLoading(true)

    const music = {
      name: musicName.trim(),
      author: musicAuthor.trim()
    }

    await APIRequest({
      endpoint: `music/entries/${targetMusic?.id}`,
      method: 'PATCH',
      body: music,
      successInfo: 'update',
      failureInfo: 'update',
      finalCallback: () => {
        setLoading(false)
      },
      callback: () => {
        setOpen(false)
        setMusics(prev => {
          if (typeof prev === 'string') {
            return prev
          }

          return prev.map(music => {
            if (music.id === targetMusic?.id) {
              return {
                ...music,
                name: musicName,
                author: musicAuthor
              }
            }
            return music
          })
        })
      }
    })
  }

  useEffect(() => {
    if (isOpen && ref.current !== null) {
      ref.current.focus()
    }

    if (targetMusic !== null && isOpen) {
      setMusicName(targetMusic.name)
      setMusicAuthor(targetMusic.author)
    }
  }, [isOpen, targetMusic])

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader
        title={t('music.updateMusic')}
        icon="tabler:pencil"
        onClose={() => {
          setOpen(false)
        }}
      />
      <Input
        icon="tabler:music"
        reference={ref}
        name="Music name"
        value={musicName}
        updateValue={updateMusicName}
        darker
        placeholder="My lovely music"
        className="w-[40rem]"
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSubmitButtonClick().catch(console.error)
          }
        }}
        autoFocus
      />
      <Input
        icon="tabler:user"
        name="Author"
        value={musicAuthor}
        updateValue={updateMusicAuthor}
        darker
        placeholder="John Doe"
        className="w-[40rem] mt-6"
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSubmitButtonClick().catch(console.error)
          }
        }}
      />
      <CreateOrModifyButton
        type="rename"
        loading={loading}
        onClick={() => {
          onSubmitButtonClick().catch(console.error)
        }}
      />
    </Modal>
  )
}

export default ModifyMusicModal
