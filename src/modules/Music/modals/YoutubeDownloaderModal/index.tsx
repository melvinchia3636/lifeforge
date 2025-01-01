/* eslint-disable @typescript-eslint/no-misused-promises */
import { useDebounce } from '@uidotdev/usehooks'
import { cookieParse } from 'pocketbase'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '@components/ButtonsAndInputs/Button'
import Input from '@components/ButtonsAndInputs/Input'
import ModalWrapper from '@components/Modals/ModalWrapper'
import ModalHeader from '@components/Modals/ModalHeader'
import APIFallbackComponent from '@components/Screens/APIComponentWithFallback'
import useFetch from '@hooks/useFetch'
import { type IYoutubeVideoInfo } from '@interfaces/youtube_video_storage_interfaces'
import { useMusicContext } from '@providers/MusicProvider'
import IntervalManager from '@utils/intervalManager'
import VideoInfo from './components/VideoInfo'

const intervalManager = IntervalManager.getInstance()

const URL_REGEX =
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/(watch\?v=|embed\/|v\/|.+\?v=)?(?<id>[A-Za-z0-9_-]{11})(\S*)?$/

function YoutubeDownloaderModal(): React.ReactElement {
  const {
    isYoutubeDownloaderOpen: isOpen,
    setIsYoutubeDownloaderOpen,
    refreshMusics
  } = useMusicContext()
  const [loading, setLoading] = useState(false)
  const [videoURLinput, setVideoURLInput] = useState('')
  const videoURL = useDebounce(videoURLinput, 500)
  const [videoInfo] = useFetch<IYoutubeVideoInfo>(
    `/music/youtube/get-info/${videoURL.match(URL_REGEX)?.groups?.id}`,
    URL_REGEX.test(videoURL)
  )

  async function checkDownloadStatus(): Promise<
    'completed' | 'failed' | 'in_progress'
  > {
    const res = await fetch(
      `${import.meta.env.VITE_API_HOST}/music/youtube/download-status`,
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
      return data.data.status
    }
    return 'failed'
  }

  function downloadVideo(): void {
    setLoading(true)
    fetch(
      `${import.meta.env.VITE_API_HOST}/music/youtube/async-download/${
        videoURL.match(URL_REGEX)?.groups?.id
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookieParse(document.cookie).token}`
        },
        body: JSON.stringify({
          metadata: videoInfo
        })
      }
    )
      .then(async res => {
        if (res.status === 202) {
          const data = await res.json()
          if (data.state === 'accepted') {
            intervalManager.setInterval(async () => {
              const success = await checkDownloadStatus()
              switch (success) {
                case 'completed':
                  toast.success('Music downloaded successfully!')
                  intervalManager.clearAllIntervals()
                  setLoading(false)
                  setIsYoutubeDownloaderOpen(false)
                  refreshMusics()
                  break
                case 'failed':
                  toast.error('Failed to download music!')
                  intervalManager.clearAllIntervals()
                  setLoading(false)
                  break
              }
            }, 3000)
          }
        } else {
          const data = await res.json()
          setLoading(false)
          throw new Error(`Failed to download music. Error: ${data.message}`)
        }
      })
      .catch(err => {
        toast.error(`Oops! Couldn't download music! Error: ${err}`)
        setLoading(false)
      })
  }

  useEffect(() => {
    if (isOpen) {
      setVideoURLInput('')
    }
  }, [])

  return (
    <ModalWrapper isOpen={isOpen} minWidth="40vw">
      <ModalHeader
        title="Download from YouTube"
        icon="tabler:brand-youtube"
        onClose={() => {
          setIsYoutubeDownloaderOpen(false)
          refreshMusics()
        }}
      />
      <Input
        name="Video URL"
        icon="tabler:link"
        value={videoURLinput}
        updateValue={setVideoURLInput}
        placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        className="mb-8"
      />
      {URL_REGEX.test(videoURL) && (
        <APIFallbackComponent data={videoInfo}>
          {videoInfo => (
            <>
              <div className="mt-6 flex w-full gap-6">
                <VideoInfo videoInfo={videoInfo} />
              </div>
              <Button
                loading={loading}
                onClick={downloadVideo}
                icon={loading ? 'svg-spinners:180-ring' : 'tabler:download'}
                className="mt-6"
              >
                {loading ? 'Downloading' : 'Download'}
              </Button>
            </>
          )}
        </APIFallbackComponent>
      )}
    </ModalWrapper>
  )
}
export default YoutubeDownloaderModal
