# StreamsPanel — video presentations

Static landing page for `presentations.streams-panel.ru`, built on the [Nuxt UI starter](https://github.com/nuxt-ui-templates/starter) (Nuxt 4 + Nuxt UI v4, bun).
Videos are not in git: they live in `public/videos/` (gitignored) on the server and Nuxt serves them from `/videos`.
`NUXT_PUBLIC_VIDEO_BASE_URL` can point to a CDN later without code changes.

## Env

| Variable | Default | Meaning |
|---|---|---|
| `NUXT_PUBLIC_VIDEO_BASE_URL` | `/videos` | Base URL of the media files, no trailing slash |
| `NUXT_PUBLIC_SITE_URL` | `https://streams-panel.ru` | Target of every CTA |

## Commands

```bash
bun install
bun run media                 # build public/videos/ from the final videos; SRC=, CONCEPTS=, OUT= override paths
bun run lint                  # on Node < 21 run as: bun --bun run lint
bun run typecheck
bun run build                 # SSR server in .output/ (Nitro serves public/videos with Range support)
bun run dev
```

## Deploy

1. `bun install && bun run build`, then run `node .output/server/index.mjs` (or `bun`) behind your proxy.
2. Copy the media into `public/videos/` before the build (it is copied into `.output/public/videos/`), or put files straight into `.output/public/videos/`:
   - hero «Было → Стало»: `bylo-stalo-1080.mp4`, `bylo-stalo-720.mp4`, `bylo-stalo-poster.webp`, `bylo-stalo-poster.jpg`
   - «Один вопрос»: `odin-vopros-*` (same four files)
   - chapters `01-vhod-i-profil`, `02-panel`, `03-assistant`, `04-widget`, `05-style`: the four files plus `<id>-preview.webm`, `<id>-preview.mp4`
   - `manifest.json` — inventory, not used by the page
3. Optional: if nginx proxies the app, `location /videos/ { alias /path/.output/public/videos/; expires 1y; }` serves them from disk.

## Media

- `*-1080.mp4` — final masters (H.264 High, yuv420p, avc1, AAC-LC 48 kHz, faststart), wider than 768px.
- `*-720.mp4` — mobile variants (CRF 23, AAC 128k, faststart) via `<source media="(max-width: 768px)">`.
- `*-poster.webp|jpg` — 1280px posters; `*-preview.webm|mp4` — muted 4 s 480p hover loops for chapter cards.

All players use `preload="metadata"`: only headers load before play.

## Code

- `app/data/videos.ts` — titles, one-liners, durations.
- `app/composables/useVideoMedia.ts` — media URLs from `videoBaseUrl`.
- `app/components/VideoPlayer.vue`, `ChapterCard.vue`, `AppLogo.vue`; `app/pages/index.vue`.
- Theme: `app/app.config.ts` (orange / neutral) and `app/assets/css/main.css` (Inter, `--ui-radius: 0.375rem`), as in `pepperfm/streams-panel`.
