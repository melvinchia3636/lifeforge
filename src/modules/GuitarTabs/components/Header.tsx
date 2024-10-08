/* eslint-disable @typescript-eslint/no-misused-promises */
import { cookieParse } from 'pocketbase'
import React, { useRef } from 'react'
import { type Id, toast } from 'react-toastify'
import Button from '@components/ButtonsAndInputs/Button'
import FAB from '@components/ButtonsAndInputs/FAB'
import MenuItem from '@components/ButtonsAndInputs/HamburgerMenu/MenuItem'
import ModuleHeader from '@components/Module/ModuleHeader'
import useThemeColorHex from '@hooks/useThemeColorHex'
import APIRequest from '@utils/fetchData'
import IntervalManager from '@utils/intervalManager'

const intervalManager = IntervalManager.getInstance()

function Header({
  refreshEntries,
  totalItems
}: {
  refreshEntries: () => void
  totalItems: number
}): React.ReactElement {
  const toastId = useRef<Id>(null)
  const { theme } = useThemeColorHex()

  async function uploadFiles(): Promise<void> {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.accept = '.pdf,.mp3,.mscz'
    input.onchange = async e => {
      const files = (e.target as HTMLInputElement).files

      const formData = new FormData()
      if (files !== null) {
        if (files.length > 100) {
          toast.error('You can only upload 100 files at a time!')
          return
        }

        for (let i = 0; i < files.length; i++) {
          formData.append('files', files[i], encodeURIComponent(files[i].name))
        }

        fetch(`${import.meta.env.VITE_API_HOST}/guitar-tabs/upload`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${cookieParse(document.cookie).token}`
          },
          body: formData
        })
          .then(async res => {
            if (res.status === 202) {
              const data = await res.json()
              if (data.state === 'accepted') {
                intervalManager.setInterval(async () => {
                  const { status, left, total } = await checkUploadStatus()

                  switch (status) {
                    case 'completed':
                      if (toastId.current !== null) {
                        toast.done(toastId.current)
                        toastId.current = null
                      }
                      toast.success('Guitar tabs uploaded successfully!')
                      intervalManager.clearAllIntervals()
                      refreshEntries()
                      break
                    case 'in_progress':
                      updateProgressBar((total - left) / total)
                      break
                    case 'failed':
                      toast.error('Failed to upload guitar tabs!')
                      intervalManager.clearAllIntervals()
                      break
                  }
                }, 1000)
              }
            } else {
              const data = await res.json()
              throw new Error(
                `Failed to upload guitar tabs. Error: ${data.message}`
              )
            }
          })
          .catch(err => {
            toast.error(`Oops! Couldn't upload the guitar tabs! Error: ${err}`)
          })
      }
    }
    input.click()
  }

  async function checkUploadStatus(): Promise<{
    status: 'completed' | 'failed' | 'in_progress'
    left: number
    total: number
  }> {
    const res = await fetch(
      `${import.meta.env.VITE_API_HOST}/guitar-tabs/process-status`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookieParse(document.cookie).token}`
        }
      }
    )
    if (res.status === 200) {
      const data = await res.json()
      return data.data
    }
    return {
      status: 'failed',
      left: 0,
      total: 0
    }
  }

  function updateProgressBar(progress: number): void {
    if (toastId.current === null) {
      toastId.current = toast('Upload in Progress', {
        progress,
        autoClose: false
      })
    } else {
      setTimeout(() => {
        if (toastId.current !== null) {
          toast.update(toastId.current, {
            progress,
            progressStyle: {
              background: theme
            }
          })
        }
      }, 0)
    }
  }

  async function downloadAll(): Promise<void> {
    await APIRequest({
      endpoint: '/guitar-tabs/download-all',
      method: 'GET',
      successInfo: 'NASFilesReady',
      failureInfo: 'download'
    })
  }

  return (
    <>
      <ModuleHeader
        title="Guitar Tabs"
        icon="mingcute:guitar-line"
        totalItems={totalItems}
        actionButton={
          <Button
            onClick={() => {
              uploadFiles().catch(console.error)
            }}
            icon="tabler:upload"
            className="hidden md:flex"
          >
            Upload
          </Button>
        }
        hamburgerMenuItems={
          <>
            <MenuItem
              text="Download All"
              icon="tabler:download"
              onClick={downloadAll}
            />
          </>
        }
        tips="If you want to append audio and Musescore files to your guitar tabs, make sure to name them the same as the PDF file and upload them together."
      />
      <FAB onClick={uploadFiles} icon="tabler:plus" />
    </>
  )
}

export default Header
