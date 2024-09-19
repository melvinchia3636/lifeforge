/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useDebounce } from '@uidotdev/usehooks'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SearchInput from '@components/ButtonsAndInputs/SearchInput'
import ModuleHeader from '@components/Module/ModuleHeader'
import ModuleWrapper from '@components/Module/ModuleWrapper'
import APIComponentWithFallback from '@components/Screens/APIComponentWithFallback'
import EmptyStateScreen from '@components/Screens/EmptyStateScreen'
import Scrollbar from '@components/Scrollbar'
import useFetch from '@hooks/useFetch'
import EntryItem from './components/EntryItem'
import ContinentSelector from '../../../components/ContinentSelector'
import MasterSearchBar from '../../../components/MasterSearchBar'
import Breadcrumbs from '../Breadcrumb'

const AIRPORT_TYPES = {
  large_airport: ['text-yellow-500', 'uil:plane'],
  medium_airport: ['text-sky-500', 'uil:plane'],
  small_airport: ['text-pink-500', 'uil:plane'],
  heliport: ['text-blue-500', 'tabler:helicopter-landing'],
  seaplane_base: ['text-orange-500', 'tabler:anchor'],
  balloonport: ['text-green-500', 'tabler:air-balloon'],
  closed: ['text-red-500', 'tabler:ban']
}

function AirportsList(): React.ReactElement {
  const { regionID } = useParams()
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  const [airportsData] = useFetch<{
    data: Array<{
      id: string
      location: string
      type: string
      name: string
    }>
    breadcrumbs: string[]
  }>(`airports/airports/${regionID}`)
  const [filteredData, setFilteredData] = useState<
    | Array<{
        id: string
        location: string
        type: string
        name: string
      }>
    | 'loading'
    | 'error'
  >('loading')

  useEffect(() => {
    if (typeof airportsData !== 'string') {
      setFilteredData(
        airportsData.data.filter(({ name }) =>
          name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        )
      )
    } else {
      setFilteredData(airportsData)
    }
  }, [debouncedSearchQuery, airportsData])

  return (
    <ModuleWrapper>
      <ModuleHeader title="Airports" />
      <MasterSearchBar />
      <APIComponentWithFallback data={airportsData} showLoading={false}>
        {continentsData => (
          <Breadcrumbs breadcrumbs={continentsData.breadcrumbs} />
        )}
      </APIComponentWithFallback>
      <div className="flex items-center gap-2">
        <ContinentSelector />
        <SearchInput
          stuffToSearch="airports"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <APIComponentWithFallback data={filteredData}>
        {data => (
          <Scrollbar className="mt-6">
            <div className="mb-8 flex-1 space-y-4 px-4">
              {data.length > 0 ? (
                data
                  .sort((a, b) => {
                    const order = Object.keys(AIRPORT_TYPES)
                    const firstComparison =
                      order.indexOf(a.type) - order.indexOf(b.type)

                    return (
                      firstComparison ||
                      a.name.localeCompare(b.name, undefined, {
                        sensitivity: 'base'
                      })
                    )
                  })
                  .map(({ name, location, type, id }) => (
                    <EntryItem
                      key={id}
                      name={name}
                      location={location}
                      type={type}
                      id={id}
                    />
                  ))
              ) : (
                <EmptyStateScreen
                  title="Oops! No airports found"
                  description="Try searching for something else"
                  icon="tabler:plane-off"
                />
              )}
            </div>
          </Scrollbar>
        )}
      </APIComponentWithFallback>
    </ModuleWrapper>
  )
}

export default AirportsList
