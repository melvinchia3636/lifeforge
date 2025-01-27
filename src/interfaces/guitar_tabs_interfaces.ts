import type BasePBCollection from './pocketbase_interfaces.js'

interface IGuitarTabsEntry extends BasePBCollection {
  name: string
  author: string
  thumbnail: string
  pageCount: number
  pdf: string
  audio: string
  musescore: string
  type: 'fingerstyle' | 'singalong' | ''
  isFavourite: boolean
}

interface IGuitarTabsSidebarData {
  total: number
  favourites: number
  categories: {
    fingerstyle: number
    singalong: number
    uncategorized: number
  }
  authors: Record<string, number>
}

interface IGuitarTabsGuitarWorldScoreEntry {
  id: number
  name: string
  subtitle: string
  category: string
  mainArtist: string
  uploader: string
  audioUrl: string
}

interface IGuitarTabsGuitarWorldScores {
  data: IGuitarTabsGuitarWorldScoreEntry[]
  perPage: number
  totalItems: number
}

export type {
  IGuitarTabsEntry,
  IGuitarTabsSidebarData,
  IGuitarTabsGuitarWorldScores,
  IGuitarTabsGuitarWorldScoreEntry
}
