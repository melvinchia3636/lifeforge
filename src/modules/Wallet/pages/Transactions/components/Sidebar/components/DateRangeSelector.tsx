import moment from 'moment'
import React, { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import DateInput from '@components/ButtonsAndInputs/DateInput'
import SidebarTitle from '@components/Sidebar/components/SidebarTitle'

function DateRangeSelector(): React.ReactElement {
  const [searchParams, setSearchParams] = useSearchParams()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    ref.current = document.querySelector('#root')
  }, [])

  const handleDateChange = (
    date: string,
    type: 'start_date' | 'end_date'
  ): void => {
    setSearchParams(searchParams => {
      if (date === '') {
        searchParams.delete(type)
        return searchParams
      }

      const otherType = type === 'start_date' ? 'end_date' : 'start_date'
      const otherDate =
        searchParams.get(otherType) !== null &&
        moment(searchParams.get(otherType)).isValid()
          ? moment(searchParams.get(otherType))
          : moment()

      if (
        (type === 'start_date' && moment(date).isAfter(otherDate)) ||
        (type === 'end_date' && moment(date).isBefore(otherDate))
      ) {
        searchParams.set(otherType, moment(date).format('YYYY-MM-DD'))
      }

      searchParams.set(type, moment(date).format('YYYY-MM-DD'))
      return searchParams
    })
  }

  const dateInputsConfig = [
    { type: 'start_date', icon: 'tabler:calendar-up', name: 'Start Date' },
    { type: 'end_date', icon: 'tabler:calendar-down', name: 'End Date' }
  ] as const

  return (
    <>
      <SidebarTitle name="Date Range" />
      <div className="relative px-4">
        {dateInputsConfig.map(({ type, icon, name }, idx) => (
          <DateInput
            index={idx}
            modalRef={ref}
            key={type}
            darker
            icon={icon}
            date={
              searchParams.get(type) !== null &&
              moment(searchParams.get(type)).isValid()
                ? moment(searchParams.get(type)).format('YYYY-MM-DD')
                : ''
            }
            setDate={date => {
              handleDateChange(date, type)
            }}
            name={name}
            className={`w-full ${idx === 1 && 'mt-4'}`}
            hasMargin={false}
          />
        ))}
      </div>
    </>
  )
}

export default DateRangeSelector
