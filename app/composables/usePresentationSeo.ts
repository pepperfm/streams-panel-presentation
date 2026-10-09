import type { PresentationVideo } from '~/data/videos'
import { chapters, hero, oneQuestion } from '~/data/videos'

/** 1080p masters and 1280px posters. Confirmed with ffprobe on the published files (1920×1080, posters 1280×720). */
const VIDEO_WIDTH = 1920
const VIDEO_HEIGHT = 1080
const POSTER_WIDTH = 1280
const POSTER_HEIGHT = 720

const title = 'StreamsPanel — видео-презентация: всё для стримера в одной панели'
const description = 'Донаты и топ донатеров, расписание и постер недели, вишлист и магазин, виджеты для OBS и ИИ-ассистент. Вход через DonationAlerts, а DonateX и DonatePay можно подключить позже.'

/**
 * Page SEO for the static presentation.
 * Duration comes from videos.ts (ffprobe format duration, rounded to 2 decimals).
 * uploadDate is omitted: the mp4s have no creation_time tag and are not in git.
 */
export function usePresentationSeo() {
  const config = useRuntimeConfig()
  const media = useVideoMedia()
  const canonical = `${config.public.presentationUrl.replace(/\/+$/, '')}/`
  const origin = canonical.slice(0, -1)

  function absolute(url: string) {
    if (/^https?:\/\//i.test(url)) return url
    return `${origin}${url.startsWith('/') ? url : `/${url}`}`
  }

  const poster = absolute(media.poster(hero.id))
  const video = absolute(media.hd(hero.id))

  useSeoMeta({
    title,
    description,
    ogType: 'video.other',
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonical,
    ogSiteName: 'StreamsPanel',
    ogLocale: 'ru_RU',
    ogImage: poster,
    ogImageAlt: hero.title,
    ogImageType: 'image/webp',
    ogImageWidth: POSTER_WIDTH,
    ogImageHeight: POSTER_HEIGHT,
    ogVideo: video,
    ogVideoType: 'video/mp4',
    ogVideoWidth: VIDEO_WIDTH,
    ogVideoHeight: VIDEO_HEIGHT,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: poster,
    twitterImageAlt: hero.title
  })

  const yandexVerification = config.public.yandexVerification.trim()
  const videos: PresentationVideo[] = [hero, oneQuestion, ...chapters]

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
    meta: yandexVerification
      ? [{ name: 'yandex-verification', content: yandexVerification }]
      : [],
    script: [{
      type: 'application/ld+json',
      textContent: {
        '@context': 'https://schema.org',
        '@graph': videos.map(item => ({
          '@type': 'VideoObject',
          'name': item.title,
          'description': item.description,
          'thumbnailUrl': absolute(media.poster(item.id)),
          'contentUrl': absolute(media.hd(item.id)),
          'duration': `PT${item.duration}S`,
          'width': VIDEO_WIDTH,
          'height': VIDEO_HEIGHT,
          'url': canonical
        }))
      }
    }]
  })
}
