// Local preview of the generated site: serves .output/public and maps /videos/* to ./media (with Range support).
import { createReadStream, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'

const root = resolve(import.meta.dir ?? import.meta.dirname, '..')
const port = Number(process.env.PORT ?? 4173)
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.webm': 'video/webm' }

function resolvePath(url) {
  const path = normalize(decodeURIComponent(new URL(url, 'http://x').pathname))
  if (path.startsWith('/videos/')) return join(root, 'media', path.slice(8))
  const file = join(root, '.output/public', path)
  return path.endsWith('/') ? join(file, 'index.html') : file
}

createServer((req, res) => {
  let file = resolvePath(req.url)
  let stat
  try {
    stat = statSync(file)
  } catch {
    file = join(root, '.output/public/404.html')
    stat = statSync(file)
    res.statusCode = 404
  }
  const headers = { 'Content-Type': types[extname(file)] ?? 'application/octet-stream', 'Accept-Ranges': 'bytes' }
  const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range ?? '')
  if (range && res.statusCode !== 404) {
    const start = range[1] ? Number(range[1]) : stat.size - Number(range[2])
    const end = range[1] && range[2] ? Math.min(Number(range[2]), stat.size - 1) : stat.size - 1
    res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${stat.size}`, 'Content-Length': end - start + 1 })
    return createReadStream(file, { start, end }).pipe(res)
  }
  res.writeHead(res.statusCode, { ...headers, 'Content-Length': stat.size })
  createReadStream(file).pipe(res)
}).listen(port, () => console.log(`http://localhost:${port}`))
