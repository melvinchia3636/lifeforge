/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { cookieParse } from 'pocketbase'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@components/ButtonsAndInputs/Button'
import FAB from '@components/ButtonsAndInputs/FAB'
import DeleteConfirmationModal from '@components/Modals/DeleteConfirmationModal'
import ModuleHeader from '@components/Module/ModuleHeader'
import ModuleWrapper from '@components/Module/ModuleWrapper'
import APIComponentWithFallback from '@components/Screens/APIComponentWithFallback'
import CreatePasswordScreen from '@components/Screens/CreatePasswordScreen'
import EmptyStateScreen from '@components/Screens/EmptyStateScreen'
import useFetch from '@hooks/useFetch'
import { type IPasswordEntry } from '@interfaces/password_interfaces'
import { useAuthContext } from '@providers/AuthProvider'
import CreatePasswordModal from './components/CreatePasswordModal'
import PasswordEntryITem from './components/PasswordEntryItem'
import LockedScreen from '../../components/Screens/LockedScreen'

function Passwords(): React.ReactElement {
  const { t } = useTranslation()
  const { userData } = useAuthContext()
  const [masterPassword, setMasterPassword] = useState<string>('')
  const [createPasswordModalOpenType, setCreatePasswordModalOpenType] =
    useState<'create' | 'update' | null>(null)
  const [passwordList, refreshPasswordList, setPasswordList] = useFetch<
    IPasswordEntry[]
  >('passwords/password', masterPassword !== '')
  const [selectedPassword, setSelectedPassword] =
    useState<IPasswordEntry | null>(null)
  const [
    isDeletePasswordConfirmationModalOpen,
    setIsDeletePasswordConfirmationModalOpen
  ] = useState<boolean>(false)
  const [existedData, setExistedData] = useState<IPasswordEntry | null>(null)

  async function fetchChallenge(): Promise<string> {
    return await fetch(
      `${import.meta.env.VITE_API_HOST}/passwords/master/challenge`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cookieParse(document.cookie).token}`
        }
      }
    ).then(async res => {
      const data = await res.json()
      if (res.ok && data.state === 'success') {
        return data.data
      } else {
        throw new Error(t('vault.failedToUnlock'))
      }
    })
  }

  return (
    <ModuleWrapper>
      <div className="flex-between flex">
        <ModuleHeader
          title="Passwords"
          desc="A vault to store your passwords securely."
        />
        {masterPassword !== '' && (
          <Button
            onClick={() => {
              setCreatePasswordModalOpenType('create')
            }}
            icon="tabler:plus"
            className="hidden lg:flex "
          >
            new password
          </Button>
        )}
      </div>
      {userData?.hasMasterPassword === false ? (
        <CreatePasswordScreen
          endpoint="passwords/master"
          keyInUserData="hasMasterPassword"
        />
      ) : masterPassword === '' ? (
        <LockedScreen
          module="vault"
          endpoint="passwords/master/verify"
          setMasterPassword={setMasterPassword}
          fetchChallenge={fetchChallenge}
        />
      ) : (
        <APIComponentWithFallback data={passwordList}>
          {passwordList =>
            passwordList.length > 0 ? (
              <div className="mb-12 mt-8 flex w-full flex-col gap-4">
                {passwordList.map(password => (
                  <PasswordEntryITem
                    key={password.id}
                    password={password}
                    masterPassword={masterPassword}
                    setSelectedPassword={setSelectedPassword}
                    setIsDeletePasswordConfirmationModalOpen={
                      setIsDeletePasswordConfirmationModalOpen
                    }
                    setCreatePasswordModalOpenType={
                      setCreatePasswordModalOpenType
                    }
                    setExistedData={setExistedData}
                    setPasswordList={setPasswordList}
                  />
                ))}
              </div>
            ) : (
              <EmptyStateScreen
                description="No passwords are found in your vault yet."
                title="Hmm... Seems a bit empty here."
                icon="tabler:key-off"
                ctaContent="new password"
                onCTAClick={() => {
                  setSelectedPassword(null)
                  setCreatePasswordModalOpenType('create')
                }}
              />
            )
          }
        </APIComponentWithFallback>
      )}
      {masterPassword !== '' && passwordList.length > 0 && (
        <FAB
          onClick={() => {
            setSelectedPassword(null)
            setCreatePasswordModalOpenType('create')
          }}
          hideWhen="lg"
        />
      )}
      <CreatePasswordModal
        openType={createPasswordModalOpenType}
        onClose={() => {
          setCreatePasswordModalOpenType(null)
        }}
        refreshPasswordList={refreshPasswordList}
        masterPassword={masterPassword}
        existedData={existedData}
      />
      <DeleteConfirmationModal
        apiEndpoint="passwords/password"
        data={selectedPassword}
        isOpen={isDeletePasswordConfirmationModalOpen}
        itemName="password"
        onClose={() => {
          setIsDeletePasswordConfirmationModalOpen(false)
        }}
        updateDataList={refreshPasswordList}
        customText={`Are you sure you want to delete the password for ${selectedPassword?.name}? This action is irreversible.`}
      />
    </ModuleWrapper>
  )
}

export default Passwords
