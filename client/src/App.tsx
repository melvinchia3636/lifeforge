// @ts-ignore - Lazy to fix
import { MusicProvider } from '@modules/music/client/src/providers/MusicProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorScreen, useModalStore } from 'lifeforge-ui'
import { APIOnlineStatusWrapper } from 'lifeforge-ui'
import { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ErrorBoundary } from 'react-error-boundary'
import {
  APIEndpointProvider,
  APIOnlineStatusProvider,
  AuthProvider,
  BackgroundProvider,
  type InferOutput,
  NuqsProvider,
  PersonalizationProvider,
  SidebarStateProvider,
  SocketProvider,
  ToastProvider
} from 'shared'

import TwoFAModal from './auth/modals/TwoFAModal'
import './i18n'
import './index.css'
import UserPersonalizationProvider from './providers/UserPersonalizationProvider'
import AppRoutesProvider from './routes/providers/AppRoutesProvider'
import './utils/extendDayJs'
import forgeAPI from './utils/forgeAPI'

const queryClient = new QueryClient()

export type UserData = InferOutput<
  typeof forgeAPI.user.auth.verifySessionToken
>['userData']

function App() {
  const open = useModalStore(state => state.open)

  useEffect(() => {
    const preloader = document.querySelector('.preloader')

    if (preloader) {
      preloader.remove()
    }
  }, [])

  return (
    <ErrorBoundary
      fallback={<ErrorScreen message="An unexpected error occurred." />}
    >
      <main
        className="bg-bg-200/50 dark:bg-bg-900/50 text-bg-800 dark:text-bg-50 flex h-dvh w-full overflow-hidden"
        id="app"
      >
        <NuqsProvider>
          <APIEndpointProvider endpoint={import.meta.env.VITE_API_HOST}>
            <QueryClientProvider client={queryClient}>
              <DndProvider backend={HTML5Backend}>
                <PersonalizationProvider>
                  <APIOnlineStatusProvider>
                    <APIOnlineStatusWrapper>
                      <AuthProvider
                        forgeAPI={forgeAPI}
                        onTwoFAModalOpen={() => open(TwoFAModal, {})}
                      >
                        <SidebarStateProvider>
                          <UserPersonalizationProvider>
                            <ToastProvider>
                              <BackgroundProvider>
                                <SocketProvider
                                  apiHost={import.meta.env.VITE_API_HOST}
                                >
                                  <MusicProvider>
                                    <AppRoutesProvider />
                                  </MusicProvider>
                                </SocketProvider>
                              </BackgroundProvider>
                            </ToastProvider>
                          </UserPersonalizationProvider>
                        </SidebarStateProvider>
                      </AuthProvider>
                    </APIOnlineStatusWrapper>
                  </APIOnlineStatusProvider>
                </PersonalizationProvider>
              </DndProvider>
            </QueryClientProvider>
          </APIEndpointProvider>
        </NuqsProvider>
      </main>
    </ErrorBoundary>
  )
}

export default App
