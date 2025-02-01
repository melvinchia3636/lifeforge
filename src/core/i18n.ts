import i18n from 'i18next'
import I18NextHttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

function initLocale(): void {
  i18n
    .use(I18NextHttpBackend)
    .use(initReactI18next)
    .init({
      lng: 'en',
      fallbackLng: 'en',
      cache: {
        enabled: true
      },
      fallbackNS: 'common',
      initImmediate: true,
      maxRetries: 2,
      preload: ['en'],
      react: {
        useSuspense: false
      },
      interpolation: {
        escapeValue: false
      },
      backend: {
        loadPath: `${import.meta.env.VITE_API_HOST}/locales/{{lng}}/{{ns}}`
      }
    })
    .catch(() => {
      console.error('Failed to initialize i18n')
    })
}

export default i18n
export { initLocale }
