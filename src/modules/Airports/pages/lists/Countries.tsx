import { Icon } from '@iconify/react'
import { useDebounce } from '@uidotdev/usehooks'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SearchInput } from '@components/inputs'
import ModuleHeader from '@components/layouts/module/ModuleHeader'
import ModuleWrapper from '@components/layouts/module/ModuleWrapper'
import APIFallbackComponent from '@components/screens/APIComponentWithFallback'
import EmptyStateScreen from '@components/screens/EmptyStateScreen'
import Scrollbar from '@components/utilities/Scrollbar'
import useFetch from '@hooks/useFetch'
import useThemeColors from '@hooks/useThemeColor'
import Breadcrumbs from './Breadcrumb'
import ContinentSelector from '../../components/ContinentSelector'
import MasterSearchBar from '../../components/MasterSearchBar'

const CONTINENTS = {
  AF: 'Africa',
  AN: 'Antarctica',
  AS: 'Asia',
  EU: 'Europe',
  NA: 'North America',
  OC: 'Oceania',
  SA: 'South America'
}

function Countries(): React.ReactElement {
  const { componentBgWithHover } = useThemeColors()
  const { continentID } = useParams()
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery.trim(), 500)
  const [countriesData] = useFetch<Record<string, [string, number]>>(
    `airports/countries/${continentID}`
  )
  const [filteredData, setFilteredData] = useState<
    Record<string, [string, number]> | 'loading' | 'error'
  >('loading')

  useEffect(() => {
    if (typeof countriesData !== 'string') {
      setFilteredData(
        Object.fromEntries(
          Object.entries(countriesData).filter(([, [name]]) =>
            name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
          )
        )
      )
    } else {
      setFilteredData(countriesData)
    }
  }, [debouncedSearchQuery, countriesData])

  return (
    <ModuleWrapper>
      <ModuleHeader title="Airports" />
      <MasterSearchBar />
      <Breadcrumbs
        breadcrumbs={[CONTINENTS[continentID as keyof typeof CONTINENTS]]}
      />
      <div className="mt-4 flex items-center gap-2">
        <ContinentSelector />
        <SearchInput
          stuffToSearch="country"
          namespace="modules.airports"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          hasTopMargin={false}
        />
      </div>
      <APIFallbackComponent data={filteredData}>
        {filteredData => (
          <Scrollbar className="mt-6">
            <div className="mb-8 flex-1 space-y-4 px-4">
              {Object.keys(filteredData).length > 0 ? (
                Object.entries(filteredData)
                  .sort(([, [a]], [, [b]]) => {
                    return a.localeCompare(b)
                  })
                  .map(([key, [name, amount]]) => (
                    <Link
                      to={`/airports/${continentID}/${key}`}
                      key={name}
                      className={`flex-between flex w-full rounded-lg p-4 px-6 shadow-custom transition-all ${componentBgWithHover}`}
                    >
                      <div className="flex items-center gap-4">
                        <Icon
                          icon={`circle-flags:${key.toLowerCase()}`}
                          className="size-8"
                        />
                        <div>
                          <p className="text-left text-xl font-medium">
                            {name}
                          </p>
                          <p className="text-left text-bg-500">
                            {amount.toLocaleString()} airports
                          </p>
                        </div>
                      </div>
                      <Icon
                        icon="tabler:chevron-right"
                        className="size-5 text-bg-500"
                      />
                    </Link>
                  ))
              ) : (
                <EmptyStateScreen
                  title="Oops! No countries found"
                  description="Try searching for something else"
                  icon="tabler:globe-off"
                />
              )}
            </div>
          </Scrollbar>
        )}
      </APIFallbackComponent>
    </ModuleWrapper>
  )
}

export default Countries
