import React, { useEffect, useState } from 'react'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'
import { Button } from '@components/buttons'
import { SearchInput } from '@components/inputs'
import EmptyStateScreen from '@components/screens/EmptyStateScreen'
import ChipSelector from '../components/ChipSelector'
import IconEntry from '../components/IconEntry'

const AS = AutoSizer as any
const L = List as any

export interface IIconSearchResult {
  iconList: string[]
  iconSets: Record<string, IIconSetEntry>
}

export interface IIconSetEntry {
  name: string
  total: number
  author: {
    name: string
    url: string
  }
  license: {
    title: string
    spdx: string
    url: string
  }
  samples: string[]
  height?: number
  displayHeight?: number
  category: string
  palette: boolean
  version?: string
}

export interface Author {
  name: string
  url: string
}

async function getIconSet(searchTerm: string): Promise<any> {
  try {
    const res = await fetch(
      `https://api.iconify.design/search?query=${searchTerm}&limit=9999`
    )
    const data = await res.json()
    let iconList = []
    if (data.icons.length > 0) {
      iconList = data.icons
    } else {
      iconList = []
    }
    const iconSets = data.collections

    return {
      iconList,
      iconSets
    }
  } catch (err) {
    console.error(err)
    return null
  }
}

function Search({
  setOpen,
  searchTerm,
  setSelectedIcon,
  setCurrentIconSetProp
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  searchTerm: string
  setSelectedIcon: (icon: string) => void
  setCurrentIconSetProp: React.Dispatch<
    React.SetStateAction<{
      iconSet?: string
      search?: string
    } | null>
  >
}): React.ReactElement {
  const [currentIconSet, setCurrentIconSet] = useState<string | null>(null)
  const [iconData, setIconData] = useState<IIconSearchResult | null>(null)
  const [filteredIconList, setFilteredIconList] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState(searchTerm ?? '')

  useEffect(() => {
    setIconData(null)
    getIconSet(searchTerm)
      .then(data => {
        setIconData(data)
        setFilteredIconList(data.iconList)
        setCurrentIconSet(null)
      })
      .catch(err => {
        console.error(err)
      })
  }, [searchTerm])

  useEffect(() => {
    if (iconData !== null) {
      setFilteredIconList(
        currentIconSet !== null
          ? iconData.iconList.filter(
              e => e.split(':').shift() === currentIconSet
            )
          : iconData.iconList
      )
    }
  }, [currentIconSet, iconData])

  return iconData !== null ? (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <div className="flex w-full gap-2">
        <SearchInput
          hasTopMargin={false}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          stuffToSearch="icon"
          tKey="iconPicker"
          namespace="common.misc"
          onKeyUp={e => {
            if (e.key === 'Enter' && searchQuery !== '') {
              setCurrentIconSetProp({ search: searchQuery })
            }
          }}
        />
        <Button
          onClick={() => {
            if (searchQuery !== '') {
              setCurrentIconSetProp({ search: searchQuery })
            }
          }}
          icon="tabler:arrow-right"
          iconAtEnd
        >
          Search
        </Button>
      </div>
      <ChipSelector
        options={Object.keys(iconData.iconSets)}
        value={currentIconSet}
        setValue={setCurrentIconSet}
      />
      <div className="min-h-0 flex-1 flex flex-col">
        {filteredIconList.length > 0 ? (
          <AS className="mt-6">
            {({ width, height }: { width: number; height: number }) => {
              const itemsPerRow = Math.floor(width / 160) || 1

              return (
                <L
                  width={width}
                  height={height - 12}
                  rowHeight={120}
                  rowCount={Math.ceil(filteredIconList.length / itemsPerRow)}
                  itemsPerRow={Math.floor(width / filteredIconList.length) || 1}
                  rowRenderer={({
                    index,
                    key,
                    style
                  }: {
                    index: number
                    key: string
                    style: React.CSSProperties
                  }) => {
                    const fromIndex = index * itemsPerRow
                    const toIndex = fromIndex + itemsPerRow

                    return (
                      <div
                        key={key}
                        style={style}
                        className="flex w-full gap-4"
                      >
                        {filteredIconList
                          .slice(fromIndex, toIndex)
                          .map(icon => (
                            <IconEntry
                              key={icon}
                              icon={icon.split(':').pop() ?? ''}
                              iconSet={icon.split(':').shift() ?? ''}
                              setSelectedIcon={setSelectedIcon}
                              setOpen={setOpen}
                            />
                          ))}
                      </div>
                    )
                  }}
                />
              )
            }}
          </AS>
        ) : (
          <div className="flex-1 flex-center h-full">
            <EmptyStateScreen
              name="icon"
              namespace="common.misc"
              tKey="iconPicker"
              icon="tabler:icons-off"
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="flex w-full justify-center pb-8">
      <span className="loader"></span>
    </div>
  )
}

export default Search
