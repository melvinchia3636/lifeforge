/* eslint-disable @typescript-eslint/member-delimiter-style */
import React from 'react'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'
import APIComponentWithFallback from '@components/Screens/APIComponentWithFallback'
import { useMusicContext } from '@providers/MusicProvider'
import MusicListItem from './components/MusicListItem'

const AS = AutoSizer as any
const L = List as any

function MusicList({
  debouncedSearchQuery
}: {
  debouncedSearchQuery: string
}): React.ReactElement {
  const { musics } = useMusicContext()

  return (
    <APIComponentWithFallback data={musics}>
      {musics => (
        <AS>
          {({ height, width }: { height: number; width: number }) => (
            <L
              width={width}
              height={height}
              rowCount={
                musics.filter(music =>
                  music.name
                    .toLowerCase()
                    .includes(debouncedSearchQuery.toLowerCase())
                ).length
              }
              rowHeight={60}
              rowRenderer={({
                index,
                key,
                style
              }: {
                index: number
                key: string
                style: React.CSSProperties
              }) => {
                const music = musics.filter(music =>
                  music.name
                    .toLowerCase()
                    .includes(debouncedSearchQuery.toLowerCase())
                )[index]

                return (
                  <div key={key} style={style}>
                    <MusicListItem music={music} />
                  </div>
                )
              }}
            />
          )}
        </AS>
      )}
    </APIComponentWithFallback>
  )
}

export default MusicList
