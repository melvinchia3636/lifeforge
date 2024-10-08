import { Listbox, ListboxButton } from '@headlessui/react'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { useNavigate, useParams } from 'react-router'
import ListboxOption from '@components/ButtonsAndInputs/ListboxInput/components/ListboxOption'
import ListboxOptions from '@components/ButtonsAndInputs/ListboxInput/components/ListboxOptions'

const CONTINENTS = {
  AF: 'Africa',
  AN: 'Antarctica',
  AS: 'Asia',
  EU: 'Europe',
  NA: 'North America',
  OC: 'Oceania',
  SA: 'South America'
}

function ContinentSelector(): React.ReactElement {
  const continentID = useParams().continentID ?? 'all'
  const navigate = useNavigate()

  return (
    <Listbox
      as="div"
      className="relative"
      value={continentID}
      onChange={value => {
        if (value !== 'all') {
          navigate(`/airports/${value}`)
        } else {
          navigate('/airports')
        }
      }}
    >
      <ListboxButton className="flex-between flex w-48 gap-2 rounded-lg bg-bg-50 p-4 shadow-custom dark:bg-bg-800/50">
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap font-medium">
            {continentID === 'all'
              ? 'All Continents'
              : CONTINENTS[continentID as keyof typeof CONTINENTS]}
          </span>
        </div>
        <Icon icon="tabler:chevron-down" className="size-5 text-bg-500" />
      </ListboxButton>
      <ListboxOptions lighter>
        <ListboxOption value="all" text="All Continents" />
        {Object.keys(CONTINENTS).map(continent => (
          <ListboxOption
            key={continent}
            value={continent}
            text={CONTINENTS[continent as keyof typeof CONTINENTS]}
          />
        ))}
      </ListboxOptions>
    </Listbox>
  )
}

export default ContinentSelector
