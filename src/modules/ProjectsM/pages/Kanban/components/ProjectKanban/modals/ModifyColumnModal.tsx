import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { CreateOrModifyButton } from '@components/buttons'
import {
  ColorInput,
  IconPickerModal,
  ColorPickerModal,
  IconInput,
  TextInput
} from '@components/inputs'
import ModalHeader from '@components/modals/ModalHeader'
import ModalWrapper from '@components/modals/ModalWrapper'
import { type IProjectsMKanbanColumn } from '@interfaces/projects_m_interfaces'
import APIRequest from '@utils/fetchData'

function ModifyColumnModal({
  openType,
  setOpenType,
  existedData,
  setExistedData,
  refreshColumns
}: {
  openType: 'create' | 'update' | null
  setOpenType: React.Dispatch<React.SetStateAction<'create' | 'update' | null>>
  existedData: IProjectsMKanbanColumn | null
  setExistedData: React.Dispatch<
    React.SetStateAction<IProjectsMKanbanColumn | null>
  >
  refreshColumns: () => void
}): React.ReactElement {
  const { t } = useTranslation('modules.projectsM')
  const { id } = useParams()
  const [columnName, setColumnName] = useState('')
  const [columnIcon, setColumnIcon] = useState('')
  const [columnColor, setColumnColor] = useState<string>('#FFFFFF')
  const [iconSelectorOpen, setIconSelectorOpen] = useState(false)
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (openType) {
      if (openType === 'update') {
        if (existedData) {
          setColumnName(existedData.name)
          setColumnIcon(existedData.icon)
          setColumnColor(existedData.color)
        }
      } else {
        setColumnName('')
        setColumnIcon('')
        setColumnColor('#FFFFFF')
      }
    }
  }, [openType, existedData])

  async function onSubmitButtonClick(): Promise<void> {
    if (
      columnName.trim().length === 0 ||
      !columnColor ||
      columnIcon.trim().length === 0
    ) {
      toast.error(t('input.error.fieldEmpty'))
      return
    }

    setIsLoading(true)
    await APIRequest({
      endpoint: `projects-m/kanban/column${
        openType === 'update' ? `/${existedData?.id}` : `/${id}`
      }`,
      method: openType === 'create' ? 'POST' : 'PATCH',
      body: {
        name: columnName,
        icon: columnIcon,
        color: columnColor
      },
      successInfo: openType,
      failureInfo: openType,
      callback: () => {
        refreshColumns()
        setExistedData(null)
        setOpenType(null)
      },
      finalCallback: () => {
        setIsLoading(false)
      }
    })
  }

  return (
    <>
      <ModalWrapper isOpen={openType !== null} className="sm:min-w-[30rem]">
        <ModalHeader
          icon={openType === 'update' ? 'tabler:pencil' : 'tabler:plus'}
          title={`column.${openType}`}
          namespace="modules.projectsM"
          onClose={() => {
            setOpenType(null)
          }}
        />
        <TextInput
          namespace="modules.projectsM"
          icon="tabler:book"
          placeholder="My Columns"
          value={columnName}
          darker
          name="Column name"
          updateValue={setColumnName}
        />
        <IconInput
          namespace="modules.projectsM"
          icon={columnIcon}
          setIcon={setColumnIcon}
          name="Column icon"
          setIconSelectorOpen={setIconSelectorOpen}
        />
        <ColorInput
          namespace="modules.projectsM"
          color={columnColor}
          name="Column color"
          setColorPickerOpen={setColorPickerOpen}
          updateColor={setColumnColor}
        />
        <CreateOrModifyButton
          loading={isLoading}
          onClick={() => {
            onSubmitButtonClick().catch(console.error)
          }}
          type={openType}
        />
      </ModalWrapper>
      <IconPickerModal
        isOpen={iconSelectorOpen}
        setOpen={setIconSelectorOpen}
        setSelectedIcon={setColumnIcon}
      />
      <ColorPickerModal
        color={columnColor}
        isOpen={colorPickerOpen}
        setColor={setColumnColor}
        setOpen={setColorPickerOpen}
      />
    </>
  )
}

export default ModifyColumnModal
