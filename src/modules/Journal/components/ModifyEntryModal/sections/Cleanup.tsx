import { Icon } from '@iconify/react'
import React, { useEffect, useRef, useState } from 'react'
import Button from '@components/ButtonsAndInputs/Button'
import { encrypt } from '@utils/encryption'
import APIRequest from '@utils/fetchData'
import { fetchChallenge } from '../../../utils/fetchChallenge'

function Cleanup({
  setStep,
  rawText,
  setCleanedUpText,
  cleanedUpText,
  masterPassword
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>
  rawText: string
  setCleanedUpText: React.Dispatch<React.SetStateAction<string>>
  cleanedUpText: string
  masterPassword: string
}): React.ReactElement {
  const [loading, setLoading] = useState(false)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  function updateTextAreaHeight(): void {
    if (textAreaRef.current !== null) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
    }
  }

  async function fetchSummarizedText(): Promise<void> {
    setCleanedUpText('')

    if (rawText === '') {
      return
    }

    setLoading(true)

    const challenge = await fetchChallenge(setLoading)

    await APIRequest({
      endpoint: '/journal/entries/ai/cleanup',
      method: 'POST',
      body: {
        text: encrypt(rawText, masterPassword),
        master: encrypt(masterPassword, challenge)
      },
      successInfo: 'cleanedup',
      failureInfo: 'cleanedup',
      callback: data => {
        setCleanedUpText(data.data)
        setTimeout(() => {
          updateTextAreaHeight()
        }, 100)
      },
      finalCallback: () => {
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    if (cleanedUpText !== '') {
      setLoading(false)
      updateTextAreaHeight()
      return
    }

    fetchSummarizedText().catch(console.error)
  }, [])

  return (
    <>
      <div className="mt-4 size-full rounded-lg bg-bg-200/70 p-6 shadow-custom transition-all focus-within:ring-1 focus-within:ring-bg-300 dark:bg-bg-800/50 dark:focus-within:ring-bg-500">
        {loading ? (
          <div className="flex size-full flex-col items-center justify-center gap-2">
            <Icon
              icon="svg-spinners:3-dots-scale"
              className="size-8 text-bg-500"
            />
            <p className="text-bg-500">Cleaning up...</p>
          </div>
        ) : (
          <>
            <div className="w-full flex-1">
              <textarea
                ref={textAreaRef}
                className="size-full flex-1 resize-none bg-transparent caret-custom-500 placeholder:text-bg-500"
                value={cleanedUpText}
                onChange={e => {
                  setCleanedUpText(e.target.value)
                  updateTextAreaHeight()
                }}
                placeholder="A well punctuated and spell-checked version of your text..."
              />
            </div>
            <Button
              onClick={() => {
                fetchSummarizedText().catch(console.error)
              }}
              icon="tabler:refresh"
              className="mt-4 w-full shrink-0"
              variant="secondary"
            >
              Regenerate
            </Button>
          </>
        )}
      </div>
      <div className="flex-between mt-6 flex">
        <Button
          onClick={() => {
            setStep(1)
          }}
          icon="tabler:arrow-left"
          variant="no-bg"
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            setStep(3)
          }}
          icon="tabler:arrow-right"
          iconAtEnd
          disabled={cleanedUpText.trim() === ''}
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default Cleanup
