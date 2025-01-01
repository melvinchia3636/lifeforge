import React from 'react'
import { useParams } from 'react-router'
import APIFallbackComponent from '@components/Screens/APIComponentWithFallback'
import EmptyStateScreen from '@components/Screens/EmptyStateScreen'
import useFetch from '@hooks/useFetch'

interface RadioData {
  name: string
  frequency: string
}

function Radio(): React.ReactElement {
  const { airportID } = useParams()
  const [radiosData] = useFetch<RadioData[]>(
    `airports/airport/${airportID}/radios`
  )

  return (
    <APIFallbackComponent data={radiosData}>
      {data => (
        <ul className="mb-8 flex flex-col divide-y-2 divide-bg-800">
          {data.length > 0 ? (
            data.map(({ name, frequency }) => (
              <li
                key={name}
                className="flex items-center justify-between gap-2 p-4"
              >
                <span>{name}</span>
                <span>{frequency}</span>
              </li>
            ))
          ) : (
            <div className="my-8">
              <EmptyStateScreen
                icon="tabler:radio-off"
                title="No radios found"
                description="There are no radios found for this airport."
              />
            </div>
          )}
        </ul>
      )}
    </APIFallbackComponent>
  )
}

export default Radio
