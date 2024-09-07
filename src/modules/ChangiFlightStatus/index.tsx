import { Listbox } from '@headlessui/react'
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ListboxTransition from '@components/ButtonsAndInputs/ListboxInput/components/ListboxTransition'
import SearchInput from '@components/ButtonsAndInputs/SearchInput'
import ModuleHeader from '@components/Module/ModuleHeader'
import ModuleWrapper from '@components/Module/ModuleWrapper'
import APIComponentWithFallback from '@components/Screens/APIComponentWithFallback'
import Scrollbar from '@components/Scrollbar'
import useFetch from '@hooks/useFetch'

export interface IFlightStatus {
  getFlights: GetFlights
}

export interface GetFlights {
  next_token: string
  flights: Flight[]
}

export interface Flight {
  actual_timestamp: null
  aircraft_type: AircraftType
  airline: string
  airline_details: AirlineDetails
  airport: string
  airport_details: AirportDetails
  check_in_row: null | string
  current_gate: null | string
  direction: Direction
  display_belt: null
  display_checkinrowctr: null | string
  display_gate: null | string
  display_timestamp: string
  drop_off_door: null | string
  estimated_timestamp: null | string
  flight_number: string
  firstbag_timestamp: null
  flight_status: FlightStatus
  flight_type: FlightType
  last_updated_timestamp: Date
  lastbag_timestamp: null
  master_flight_number: null | string
  nature: Nature
  nearest_carpark: NearestCarpark | null
  offblock_timestamp: null | string
  origin_dep_country: null
  origin_dep_date: null
  origin_dep_terminal: null
  origin_dep_time: null
  origin_via_country: null
  pick_up_door: null
  previous_gate: null | string
  scheduled_date: Date
  scheduled_time: string
  slave_flights: string[]
  technical_flight_status1: TechnicalFlightStatus1
  technical_flight_status2: Direction
  terminal: string
  via: null | string
  via_airport_details: AirportDetails | null
  status_mapping: StatusMapping
}

export enum AircraftType {
  A20N = 'A20N',
  A21N = 'A21N',
  A319 = 'A319',
  A320 = 'A320',
  A321 = 'A321',
  A332 = 'A332',
  A333 = 'A333',
  A339 = 'A339',
  A359 = 'A359',
  A35K = 'A35K',
  A388 = 'A388',
  B38M = 'B38M',
  B738 = 'B738',
  B739 = 'B739',
  B748 = 'B748',
  B763 = 'B763',
  B773 = 'B773',
  B77W = 'B77W',
  B788 = 'B788',
  B789 = 'B789',
  B78X = 'B78X',
  E290 = 'E290'
}

export interface AirlineDetails {
  logo_url: string
  code: string
  name: string
  name_zh: string
  name_zh_hant: null | string
  transfer_counters: TransferCounters | null
  transit: string
}

export enum TransferCounters {
  A = 'A',
  AB = 'A,B',
  ABEF = 'A,B,E,F',
  B = 'B',
  C = 'C',
  CD = 'C,D',
  D = 'D',
  E = 'E',
  F = 'F',
  Z = 'Z'
}

export interface AirportDetails {
  code: string
  country_code: string
  lat: string
  lng: string
  name: string
  name_zh: string
  name_zh_hant: string
}

export enum Direction {
  Dep = 'DEP',
  Empty = '',
  Fcl = 'FCL',
  Gch = 'GCH',
  Gcl = 'GCL',
  Gop = 'GOP',
  Pro = 'PRO'
}

export enum FlightStatus {
  Departed = 'Departed',
  Boarding = 'Boarding',
  GateClosed = 'Gate Closed',
  GateClosing = 'Gate Closing',
  GateOpen = 'Gate Open',
  NewGate = 'New Gate',
  ReTimed = 'Re-timed',
  Scheduled = 'Scheduled',
  LastCall = 'Last Call',
  Cancelled = 'Cancelled',
  Landed = 'Landed',
  Confirmed = 'Confirmed',
  Delayed = 'Delayed'
}

export enum FlightType {
  M = 'M'
}

export enum Nature {
  J = 'J'
}

export enum NearestCarpark {
  CarPark2A = 'Car Park 2A',
  CarPark2B = 'Car Park 2B',
  CarPark3A = 'Car Park 3A',
  CarPark3B = 'Car Park 3B',
  CarPark4A = 'Car Park 4A',
  CarPark4B = 'Car Park 4B',
  T1CarPark = 'T1 Car Park'
}

export interface StatusMapping {
  belt_status_en: null
  belt_status_zh: null
  details_status_en: string
  details_status_zh: string
  listing_status_en: string
  listing_status_zh: string
  show_gate: boolean
  status_text_color: StatusTextColor
}

export enum StatusTextColor {
  Black = 'Black',
  Green = 'Green',
  Grey = 'Grey',
  Red = 'Red'
}

export enum TechnicalFlightStatus1 {
  Fc = 'FC',
  Go = 'GO',
  Ob = 'OB',
  Ot = 'OT',
  Sh = 'SH'
}

const STATUSES = {
  Departed: ['text-green-500', 'tabler:plane-departure', 'bg-green-500/20'],
  Boarding: ['text-blue-500', 'tabler:users', 'bg-blue-500/20'],
  'Gate Closed': ['text-red-500', 'tabler:door-off', 'bg-red-500/20'],
  'Gate Closing': ['text-orange-500', 'tabler:door', 'bg-orange-500/20'],
  'Gate Open': ['text-yellow-500', 'tabler:door-enter', 'bg-yellow-500/20'],
  'New Gate': ['text-lime-500', 'tabler:transfer', 'bg-lime-500/20'],
  'Re-timed': ['text-fuchsia-500', 'tabler:clock', 'bg-fuchsia-500/20'],
  Scheduled: ['text-indigo-500', 'tabler:calendar-event', 'bg-indigo-500/20'],
  'Last Call': ['text-pink-500', 'tabler:bell', 'bg-pink-500/20'],
  Cancelled: ['text-red-500', 'tabler:ban', 'bg-red-500/20'],
  Landed: ['text-blue-500', 'tabler:plane-arrival', 'bg-blue-500/20'],
  Confirmed: ['text-green-500', 'tabler:check', 'bg-green-500/20'],
  Delayed: ['text-red-500', 'tabler:clock-stop', 'bg-red-500/20']
}

const SEARCH_TYPE = [
  ['Departures', 'tabler:plane-departure', 'dep'],
  ['Arrivals', 'tabler:plane-arrival', 'arr']
]

function ChangiFlightStatus(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const [flights] = useFetch<IFlightStatus>(
    `changi/flights?type=${searchParams.get('type') ?? 'dep'}`
  )

  return (
    <ModuleWrapper>
      <ModuleHeader
        icon="tabler:plane"
        title="Changi Flight Status"
        desc="..."
      />
      <div className="flex items-center gap-2">
        <Listbox
          as="div"
          className="relative mt-2 sm:mt-6"
          value={searchParams.get('type') ?? 'dep'}
          onChange={value => {
            setSearchParams({ type: value })
          }}
        >
          <Listbox.Button className="flex-between flex w-48 gap-2 rounded-md bg-bg-50 p-4 shadow-custom dark:bg-bg-800/50">
            <div className="flex items-center gap-2">
              <Icon
                icon={
                  SEARCH_TYPE.find(
                    ([_, __, value]) => value === searchParams.get('type')
                  )?.[1] ?? 'tabler:plane-departure'
                }
                className="size-6"
              />
              <span className="whitespace-nowrap font-medium">
                {SEARCH_TYPE.find(
                  ([_, __, value]) => value === searchParams.get('type')
                )?.[0] ?? 'Departure'}
              </span>
            </div>
            <Icon icon="tabler:chevron-down" className="size-5 text-bg-500" />
          </Listbox.Button>
          <ListboxTransition>
            <Listbox.Options className="absolute top-[120%] z-50 mt-1 max-h-56 w-48 divide-y divide-bg-200 overflow-auto rounded-md bg-bg-100 py-1 text-base shadow-lg focus:outline-none dark:divide-bg-700 dark:bg-bg-800">
              {SEARCH_TYPE.map(([name, icon, value]) => (
                <Listbox.Option
                  key={value}
                  className={({ active }) =>
                    `relative cursor-pointer select-none transition-all p-4 flex flex-between ${
                      active
                        ? 'bg-bg-500/30 dark:bg-bg-700/50'
                        : '!bg-transparent'
                    }`
                  }
                  value={value}
                >
                  {({ selected }) => (
                    <>
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Icon icon={icon} className="size-5" />
                        {name}
                      </div>
                      {selected && (
                        <Icon
                          icon="tabler:check"
                          className="block text-lg text-custom-500"
                        />
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </ListboxTransition>
        </Listbox>
        <SearchInput
          stuffToSearch="flights"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <Scrollbar className="mt-6 w-full flex-1">
        <APIComponentWithFallback data={flights}>
          {flights => (
            <table className="mb-8 mr-8 w-max">
              <thead>
                <tr className="border-b-2 border-bg-200 text-bg-500 dark:border-bg-800">
                  {[
                    'Status',
                    'Scheduled Time',
                    'Flight Number',
                    'Aircraft Type',
                    'Airline',
                    `${
                      (searchParams.get('type') ?? 'dep') === 'dep'
                        ? 'Destination'
                        : 'Origin'
                    } Airport`,
                    'Terminal',
                    'Gate',
                    (searchParams.get('type') ?? 'dep') === 'dep'
                      ? 'Check-In Row'
                      : 'Baggage Belt',
                    'Estimated Time',
                    'Code Share'
                  ].map(column => (
                    <th key={column} className={'p-2 font-medium'}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {flights.getFlights.flights.map(flight => (
                  <tr
                    key={
                      flight.flight_number +
                      flight.scheduled_time +
                      Math.random()
                    }
                    className="border-b border-bg-200 dark:border-bg-800"
                  >
                    <td className="whitespace-nowrap p-2 text-center">
                      <div
                        className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-sm ${
                          STATUSES[flight.flight_status]?.[0]
                        } ${STATUSES[flight.flight_status]?.[2]}`}
                      >
                        <Icon
                          icon={STATUSES[flight.flight_status]?.[1]}
                          className="size-4"
                        />
                        {flight.flight_status}
                      </div>
                    </td>
                    <td className="whitespace-nowrap p-2 text-center">
                      {flight.scheduled_time}
                    </td>
                    <td className="whitespace-nowrap p-2 text-center">
                      {flight.flight_number}
                    </td>
                    <td className="whitespace-nowrap p-2 text-center">
                      <div className="flex items-center gap-2">
                        {'AB'.includes(flight.aircraft_type[0]) ? (
                          <Icon
                            icon={
                              flight.aircraft_type[0] === 'B'
                                ? 'simple-icons:boeing'
                                : 'simple-icons:airbus'
                            }
                          />
                        ) : (
                          ''
                        )}
                        {flight.aircraft_type}
                      </div>
                    </td>
                    <td className="whitespace-nowrap p-2 text-left">
                      <div className="flex items-center gap-2">
                        <img
                          src={flight.airline_details.logo_url}
                          alt={flight.airline_details.name}
                          className="size-6"
                        />
                        {flight.airline_details.name} ({flight.airline})
                      </div>
                    </td>
                    <td className="whitespace-nowrap p-2 text-center">
                      {flight.airport_details.name} ({flight.airport})
                    </td>
                    <td className="whitespace-nowrap p-2 text-center">
                      T{flight.terminal}
                    </td>
                    <td className="whitespace-nowrap p-2 text-center">
                      {(searchParams.get('type') ?? 'dep') === 'dep'
                        ? flight.current_gate
                        : flight.display_gate}
                    </td>
                    <td className="whitespace-nowrap p-2 text-center">
                      {(searchParams.get('type') ?? 'dep') === 'dep'
                        ? flight.check_in_row
                        : flight.display_belt}
                    </td>
                    <td className="whitespace-nowrap p-2 text-center">
                      {flight.estimated_timestamp}
                    </td>
                    <td className="whitespace-nowrap p-2 text-left">
                      {flight.slave_flights.join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </APIComponentWithFallback>
      </Scrollbar>
    </ModuleWrapper>
  )
}

export default ChangiFlightStatus
