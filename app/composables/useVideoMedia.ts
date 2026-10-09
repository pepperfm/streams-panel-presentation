/** URLs of the media files for a video id; base comes from runtimeConfig.public.videoBaseUrl. */
export function useVideoMedia() {
  const base = useRuntimeConfig().public.videoBaseUrl.replace(/\/+$/, '')
  const url = (id: string, kind: string) => `${base}/${id}-${kind}`

  return {
    poster: (id: string) => url(id, 'poster.webp'),
    posterJpg: (id: string) => url(id, 'poster.jpg'),
    hd: (id: string) => url(id, '1080.mp4'),
    sd: (id: string) => url(id, '720.mp4'),
    preview: (id: string) => ({ webm: url(id, 'preview.webm'), mp4: url(id, 'preview.mp4') })
  }
}

export function formatDuration(seconds: number): string {
  const s = Math.round(seconds)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}
