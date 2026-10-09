#!/usr/bin/env bash
# Builds public/videos/ (gitignored, served by Nuxt from /videos or uploaded to a CDN) from the final StreamsPanel videos: 1080p (copied), 720p (H.264), posters (jpg+webp),
# muted 4 s hover previews (480p mp4+webm) and manifest.json.
set -euo pipefail
SRC=${SRC:-/workspace/sp-video/final}
CONCEPTS=${CONCEPTS:-/workspace/sp-video/concepts}
OUT=${OUT:-$(dirname "$0")/../public/videos}
mkdir -p "$OUT"
# id | source | poster_t | preview_start
ITEMS=(
  "bylo-stalo|$CONCEPTS/final-2-bylo-stalo-wipe.mp4|10.8|"
  "odin-vopros|$CONCEPTS/final-1-odin-vopros.mp4|5.6|"
  "01-vhod-i-profil|01_vhod_i_profil.mp4|9.0|7.0"
  "02-panel|02_panel.mp4|16.0|34.0"
  "03-assistant|03_assistant.mp4|18.0|5.0"
  "04-widget|04_widget.mp4|14.0|12.5"
  "05-style|05_style.mp4|42.5|4.0"
)
H264=(-c:v libx264 -profile:v high -pix_fmt yuv420p -tag:v avc1 -movflags +faststart)
for it in "${ITEMS[@]}"; do
  IFS='|' read -r id src pt ps <<<"$it"
  case "$src" in /*) in="$src" ;; *) in="$SRC/$src" ;; esac
  # 1080p: already H.264 High / AAC-LC / faststart -> copy as is
  cp "$in" "$OUT/$id-1080.mp4"
  ffmpeg -y -loglevel error -i "$in" -vf scale=-2:720 "${H264[@]}" -preset slow -crf 23 -c:a aac -b:a 128k -ar 48000 -ac 2 "$OUT/$id-720.mp4"
  ffmpeg -y -loglevel error -ss "$pt" -i "$in" -frames:v 1 -vf scale=1280:-2 -q:v 3 "$OUT/$id-poster.jpg"
  ffmpeg -y -loglevel error -ss "$pt" -i "$in" -frames:v 1 -vf scale=1280:-2 -c:v libwebp -quality 80 "$OUT/$id-poster.webp"
  if [ -n "$ps" ]; then
    ffmpeg -y -loglevel error -ss "$ps" -t 4 -i "$in" -an -vf "scale=-2:480,fps=30" "${H264[@]}" -preset slow -crf 28 "$OUT/$id-preview.mp4"
    ffmpeg -y -loglevel error -ss "$ps" -t 4 -i "$in" -an -vf "scale=-2:480,fps=30" -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 "$OUT/$id-preview.webm"
  fi
  echo "$id done"
done
python3 - "$OUT" <<'PY'
import json, os, subprocess, sys
out = sys.argv[1]
items = {}
for f in sorted(os.listdir(out)):
    if f == 'manifest.json': continue
    id_, kind = f.rsplit('-', 1)
    e = items.setdefault(id_, {'id': id_, 'files': {}})
    e['files'][kind] = {'file': f, 'bytes': os.path.getsize(os.path.join(out, f))}
    if kind == '1080.mp4':
        d = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', os.path.join(out, f)], capture_output=True, text=True).stdout
        e['duration'] = round(float(d), 2)
json.dump({'items': list(items.values()), 'totalBytes': sum(x['bytes'] for e in items.values() for x in e['files'].values())},
          open(os.path.join(out, 'manifest.json'), 'w'), ensure_ascii=False, indent=1)
PY
echo manifest written
