import { Switch } from '@headlessui/react'
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { usePersonalizationContext } from '@providers/PersonalizationProvider'

function ComponentListItem({
  id,
  icon,
  setReady
}: {
  id: string
  icon: string
  setReady: React.Dispatch<React.SetStateAction<boolean>>
}): React.ReactElement {
  const { t } = useTranslation()
  const {
    dashboardLayout: enabledWidgets,
    setDashboardLayoutWithoutPost: setEnabledWidgets
  } = usePersonalizationContext()

  const isEnabled = useMemo(() => {
    return Object.values(
      JSON.stringify(enabledWidgets) !== '{}' ? enabledWidgets : { a: [] }
    ).some(e => e.find(i => i.i === id) !== undefined)
  }, [enabledWidgets, id])

  function addComponent(): void {
    const newEnabledWidgets = { ...enabledWidgets }

    if (Object.keys(newEnabledWidgets).length === 0) {
      for (const breakpoint of ['lg', 'md', 'sm', 'xs', 'xxs']) {
        newEnabledWidgets[breakpoint] = [
          {
            x: 0,
            y: 0,
            w: 4,
            h: 4,
            i: id
          }
        ]
      }
      setEnabledWidgets(newEnabledWidgets)
      return
    }

    for (const breakpoint of ['lg', 'md', 'sm', 'xs', 'xxs']) {
      newEnabledWidgets[breakpoint] = newEnabledWidgets[breakpoint] ?? []
      newEnabledWidgets[breakpoint].push({
        x: 0,
        y: Infinity,
        w: 4,
        h: 4,
        i: id
      })
    }

    setEnabledWidgets(newEnabledWidgets)

    setTimeout(() => {
      setReady(true)
    }, 100)
  }

  function removeComponent(): void {
    const newEnabledWidgets = Object.fromEntries(
      Object.entries({ ...enabledWidgets }).map(([k, value]) => [
        k,
        value.filter(i => i.i !== id)
      ])
    )
    setEnabledWidgets(newEnabledWidgets)

    setTimeout(() => {
      setReady(true)
    }, 100)
  }

  function toggleComponent(): void {
    setReady(false)

    if (isEnabled) {
      removeComponent()
      return
    }

    addComponent()
  }

  return (
    <li className="flex items-center justify-between gap-8 rounded-lg bg-bg-50 p-4 shadow-custom dark:bg-bg-800/50">
      <div className="flex items-center gap-4">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition-all ${
            Object.keys(enabledWidgets).includes(id)
              ? 'bg-custom-500/20 text-custom-500'
              : 'bg-bg-200 text-bg-400 dark:bg-bg-700/50 dark:text-bg-500'
          }`}
        >
          <Icon icon={icon} className="size-6" />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold">
            {t(`dashboard.widgets.${id}.title`)}
          </div>
          <div className="text-sm text-bg-500">
            {t(`dashboard.widgets.${id}.description`)}
          </div>
        </div>
      </div>
      <Switch
        checked={isEnabled}
        onClick={() => {
          toggleComponent()
        }}
        className={`${
          isEnabled ? 'bg-custom-500' : 'bg-bg-200 dark:bg-bg-700/50'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span
          className={`${
            isEnabled ? 'translate-x-6' : 'translate-x-1 dark:bg-bg-500'
          } inline-block size-4 rounded-full bg-bg-50 transition`}
        />
      </Switch>
    </li>
  )
}

export default ComponentListItem
