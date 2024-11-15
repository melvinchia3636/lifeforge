import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'
import Button from '@components/ButtonsAndInputs/Button'
import HamburgerMenu from '@components/ButtonsAndInputs/HamburgerMenu'
import { type IBooksLibraryEntry } from '@interfaces/books_library_interfaces'
import { useBooksLibraryContext } from '@providers/BooksLibraryProvider'
import APIRequest from '@utils/fetchData'
import BookMeta from '../../components/BookMeta'
import EntryContextMenu from '../../components/EntryContextMenu'

export default function EntryItem({
  item
}: {
  item: IBooksLibraryEntry
}): React.ReactElement {
  const {
    categories: { data: categories },
    entries: { refreshData: refreshEntries }
  } = useBooksLibraryContext()

  const [addToFavouritesLoading, setAddToFavouritesLoading] = useState(false)

  async function addToFavourites(): Promise<void> {
    setAddToFavouritesLoading(true)
    await APIRequest({
      endpoint: `books-library/entries/favourite/${item.id}`,
      method: 'POST',
      successInfo: item.is_favourite
        ? 'Removed from favourites'
        : 'Added to favourites',
      failureInfo: item.is_favourite
        ? 'Removed from favourites'
        : 'Added to favourites',
      callback: () => {
        refreshEntries()
      },
      finalCallback: () => {
        setAddToFavouritesLoading(false)
      }
    })
  }

  return (
    <li
      key={item.id}
      className="relative flex items-center gap-4 rounded-lg bg-bg-50 p-4 shadow-custom transition-all hover:bg-bg-200/70 dark:bg-bg-900 dark:hover:bg-bg-800/50"
    >
      <div className="absolute right-3 top-4 z-20 flex">
        <Button
          onClick={() => {
            addToFavourites().catch(console.error)
          }}
          variant="no-bg"
          icon={
            addToFavouritesLoading
              ? 'svg-spinners:180-ring'
              : item.is_favourite
              ? 'tabler:heart-filled'
              : 'tabler:heart'
          }
          className={`!p-2 ${item.is_favourite ? '!text-red-500' : ''}`}
        />
        <HamburgerMenu>
          <EntryContextMenu item={item} />
        </HamburgerMenu>
      </div>
      <a
        target="_blank"
        rel="noreferrer"
        href={`${import.meta.env.VITE_API_HOST}/media/${item.collectionId}/${
          item.id
        }/${item.file}`}
        className="absolute inset-0 z-10 size-full rounded-lg"
      />
      <div className="flex-center flex aspect-[9/12] w-20 rounded-lg bg-bg-200 p-2 dark:bg-bg-800">
        <img
          src={`${import.meta.env.VITE_API_HOST}/media/${item.collectionId}/${
            item.id
          }/${item.thumbnail}`}
          className="h-full"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {typeof categories !== 'string' && (
          <div className="flex items-center gap-1 text-sm font-medium text-bg-500">
            {(() => {
              const category = categories.find(
                category => category.id === item.category
              )

              return category !== undefined ? (
                <>
                  <Icon icon={category.icon} className="size-4 text-bg-500" />{' '}
                  {category.name}
                </>
              ) : (
                ''
              )
            })()}
          </div>
        )}
        <div className="mr-20 text-lg font-semibold">
          {item.title}{' '}
          {item.edition !== '' && (
            <span className="text-sm text-bg-500">({item.edition} ed)</span>
          )}
        </div>
        <div className="mr-20 text-sm font-medium text-custom-500">
          {item.authors}
        </div>
        <BookMeta item={item} />
      </div>
    </li>
  )
}
