import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useNavigate } from 'shared'

function APIExplorer() {
  const { t } = useTranslation('apps.localizationManager')

  const navigate = useNavigate()

  useEffect(() => {
    const session = localStorage.getItem('session')

    if (!session) {
      window.location.href = '/'
    } else {
      const a = document.createElement('a')

      a.href = `${import.meta.env.VITE_API_EXPLORER_URL}?session=${session}`
      a.target = '_blank'
      a.click()

      navigate(-1)
      toast.success(t('fetch.redirected'))
    }
  }, [])

  return (
    <>
      <div className="flex size-full items-center justify-center">
        <p className="text-bg-500 text-2xl font-medium">
          {t('fetch.redirecting')}
        </p>
      </div>
    </>
  )
}

export default APIExplorer
