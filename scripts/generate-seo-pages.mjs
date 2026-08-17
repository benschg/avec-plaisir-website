/**
 * Generates a real static HTML file per public route after `vite build`.
 *
 * Why: the app is an SPA behind a `**` -> /index.html rewrite, so every route
 * used to serve the homepage's <head> verbatim. That pointed the canonical of
 * /impressum, /agbs and /datenschutz at "/", telling Google those pages are
 * duplicates of the homepage.
 *
 * Firebase Hosting matches exact static files before it applies rewrites, and
 * `cleanUrls: true` maps /impressum -> impressum.html, so emitting these files
 * is enough - no firebase.json change needed.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')

const seo = JSON.parse(readFileSync(join(root, 'src/config/seo.json'), 'utf8'))
const template = readFileSync(join(distDir, 'index.html'), 'utf8')

const START = '<!-- SEO:START -->'
const END = '<!-- SEO:END -->'

const startIdx = template.indexOf(START)
const endIdx = template.indexOf(END)
if (startIdx === -1 || endIdx === -1) {
  throw new Error(
    `Could not find ${START} / ${END} markers in dist/index.html. ` +
      'Did the markers get removed from index.html?'
  )
}

/** Escape a value for use inside a double-quoted HTML attribute. */
const attr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const absolute = (path) => new URL(path, seo.siteUrl).href

/**
 * Build the <head> SEO block for a route. Structured data is deliberately
 * omitted: it describes the business entity and belongs on the homepage only,
 * which ships it via index.html and never passes through here.
 */
const buildBlock = (route) => {
  const url = absolute(route.path)
  const image = absolute(seo.image)
  const ogDescription = route.ogDescription ?? route.description

  return `${START}
    <title>${attr(route.title)}</title>
    <meta name="description" content="${attr(route.description)}" />
    <link rel="canonical" href="${attr(url)}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${attr(url)}" />
    <meta property="og:title" content="${attr(route.title)}" />
    <meta property="og:description" content="${attr(ogDescription)}" />
    <meta property="og:image" content="${attr(image)}" />
    <meta property="og:image:width" content="${attr(seo.imageWidth)}" />
    <meta property="og:image:height" content="${attr(seo.imageHeight)}" />
    <meta property="og:locale" content="${attr(seo.locale)}" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:url" content="${attr(url)}" />
    <meta name="twitter:title" content="${attr(route.title)}" />
    <meta name="twitter:description" content="${attr(ogDescription)}" />
    <meta name="twitter:image" content="${attr(image)}" />
    ${END}`
}

const generated = []
for (const route of seo.routes) {
  // The homepage is index.html itself - Vite already emitted it correctly.
  if (route.file === 'index.html') continue

  const html =
    template.slice(0, startIdx) +
    buildBlock(route) +
    template.slice(endIdx + END.length)

  writeFileSync(join(distDir, route.file), html)
  generated.push(`${route.path} -> dist/${route.file}`)
}

console.log(`Generated ${generated.length} SEO page(s):`)
for (const line of generated) console.log(`  ${line}`)
