# StreamsPanel — video presentations

Static landing page for `presentations.streams-panel.ru`, built on the [Nuxt UI starter](https://github.com/nuxt-ui-templates/starter) (Nuxt 4 + Nuxt UI v4, bun).
Videos are not in git and not in the build: they live on the Beget CDN, and the page reads them from one base URL.

## Env

| Variable | Default | Meaning |
|---|---|---|
| `NUXT_PUBLIC_VIDEO_BASE_URL` | `/videos` | Base URL of the media files, no trailing slash, e.g. `https://<cdn-domain>/presentations` |
| `NUXT_PUBLIC_SITE_URL` | `https://streams-panel.ru` | Target of every CTA |

Values are baked in at `bun run generate` time.

## Commands

```bash
bun install
bun run media                 # build media/ (gitignored) from the final videos; SRC=, CONCEPTS=, OUT= override paths
bun run lint                  # on Node < 21 run as: bun --bun run lint
bun run typecheck
NUXT_PUBLIC_VIDEO_BASE_URL=https://<cdn-domain>/presentations bun run generate
bun run preview:static        # http://localhost:4173 — serves .output/public, maps /videos/* to media/
bun run dev                   # dev server (videos need NUXT_PUBLIC_VIDEO_BASE_URL or a public/videos link)
```

## Deploy

1. **CDN bucket** — upload everything from `media/` flat into the folder `NUXT_PUBLIC_VIDEO_BASE_URL` points to:
   - hero «Было → Стало»: `bylo-stalo-1080.mp4`, `bylo-stalo-720.mp4`, `bylo-stalo-poster.webp`, `bylo-stalo-poster.jpg`
   - teaser «Один вопрос»: `odin-vopros-*` (same four files)
   - long trailer: `trailer-*` (same four files)
   - chapters `01-vhod-i-profil`, `02-panel`, `03-assistant`, `04-widget`, `05-style`: the four files above plus `<id>-preview.webm`, `<id>-preview.mp4`
   - `manifest.json` — inventory (durations, sizes), not used by the page

   Public-read, correct `Content-Type` (`video/mp4`, `video/webm`, `image/webp`, `image/jpeg`), Range requests allowed.
   Cache long (`max-age=31536000`); when replacing a video, upload under a new name or purge the CDN. No CORS needed.
2. **Static hosting** — upload the contents of `.output/public/` to the site root.

## Media

- `*-1080.mp4` — final masters (H.264 High, yuv420p, avc1, AAC-LC 48 kHz, faststart), wider than 768px.
- `*-720.mp4` — mobile variants (CRF 23, AAC 128k, faststart) via `<source media="(max-width: 768px)">`.
- `*-poster.webp|jpg` — 1280px posters; `*-preview.webm|mp4` — muted 4 s 480p hover loops for chapter cards.

All players use `preload="none"`, nothing heavy loads before play.

## Code

- `app/data/videos.ts` — titles, one-liners, durations.
- `app/composables/useVideoMedia.ts` — media URLs from `videoBaseUrl`.
- `app/components/VideoPlayer.vue`, `ChapterCard.vue`, `AppLogo.vue`; `app/pages/index.vue`.
- Theme: `app/app.config.ts` (orange / neutral) and `app/assets/css/main.css` (Inter, `--ui-radius: 0.375rem`), as in `pepperfm/streams-panel`.
