import React from 'react'
import { type Loadable } from '@interfaces/common'
import {
  type IYoutubePlaylistEntry,
  type IYoutubePlaylistVideoEntry,
  type IYoutubeVideosStorageEntry
} from '@interfaces/youtube_video_storage_interfaces'
import PlaylistInfo from './PlaylistInfo'
import PlaylistVideoEntry from './PlaylistVideoEntry'

function PlaylistDetails({
  playlistInfo,
  downloadVideo,
  downloadingVideos,
  downloadedVideos,
  videos,
  processes
}: {
  playlistInfo: IYoutubePlaylistEntry
  downloadVideo: (metadata: IYoutubePlaylistVideoEntry) => void
  downloadingVideos: React.RefObject<Set<string>>
  downloadedVideos: Set<string>
  videos: Loadable<IYoutubeVideosStorageEntry[]>
  processes: Record<
    string,
    {
      status: 'completed' | 'failed' | 'in_progress'
      progress: number
    }
  >
}): React.ReactElement {
  return (
    <div className="flex flex-col space-y-2">
      <PlaylistInfo playlistInfo={playlistInfo} />
      <div className="mt-4 grid grid-cols-1 gap-4">
        {playlistInfo.entries.map(video => (
          <PlaylistVideoEntry
            key={video.id}
            video={video}
            downloadVideo={downloadVideo}
            status={(() => {
              if (
                (typeof videos !== 'string' &&
                  videos.find(v => v.youtube_id === video.id) !== undefined) ||
                downloadedVideos.has(video.id)
              ) {
                return 'completed'
              }

              if (downloadingVideos.current.has(video.id)) {
                return 'in_progress'
              }

              return processes[video.id]?.status ?? null
            })()}
            progress={processes[video.id]?.progress ?? 0}
          />
        ))}
      </div>
    </div>
  )
}

export default PlaylistDetails
