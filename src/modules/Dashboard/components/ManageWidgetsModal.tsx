/* eslint-disable @typescript-eslint/no-dynamic-delete */
import React from 'react'
import Modal from '@components/Modals/Modal'
import ModalHeader from '@components/Modals/ModalHeader'
import DASHBOARD_WIDGETS from '@constants/dashboard_widgets'
import ComponentListItem from './ComponentItem'

function ManageWidgetsModal({
  isOpen,
  onClose,
  setReady
}: {
  isOpen: boolean
  onClose: () => void
  setReady: React.Dispatch<React.SetStateAction<boolean>>
}): React.ReactElement {
  return (
    <Modal isOpen={isOpen} minWidth="40vw">
      <ModalHeader
        title="Manage Widgets"
        onClose={onClose}
        icon="tabler:apps"
      />
      <ul className="space-y-2 overflow-y-auto">
        {Object.entries(DASHBOARD_WIDGETS).map(
          ([key, { icon, minW, minH }]) => (
            <ComponentListItem
              key={key}
              id={key}
              icon={icon}
              minW={minW}
              minH={minH}
              setReady={setReady}
            />
          )
        )}
      </ul>
    </Modal>
  )
}
export default ManageWidgetsModal
