import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import seo from '../config/seo.json'

/**
 * Keeps <title> and the canonical/social tags in sync during client-side
 * navigation.
 *
 * Crawlers load each URL fresh and get the correct tags from the static HTML
 * that scripts/generate-seo-pages.mjs emits, so this is not what fixes SEO -
 * it stops the tab title and canonical from going stale when a visitor
 * navigates between routes without a full page load.
 */
const setMeta = (selector: string, attribute: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${selector}]`)
  if (!tag) {
    tag = document.createElement('meta')
    const [name, value] = selector.split('=')
    tag.setAttribute(name, value.replace(/["']/g, ''))
    document.head.appendChild(tag)
  }
  tag.setAttribute(attribute, content)
}

const setCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  )
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = href
}

export const useSeo = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const route = seo.routes.find((r) => r.path === pathname)
    if (!route) return

    const url = new URL(route.path, seo.siteUrl).href
    const ogDescription = route.ogDescription ?? route.description

    document.title = route.title
    setCanonical(url)

    setMeta('name="description"', 'content', route.description)
    setMeta('property="og:url"', 'content', url)
    setMeta('property="og:title"', 'content', route.title)
    setMeta('property="og:description"', 'content', ogDescription)
    setMeta('name="twitter:url"', 'content', url)
    setMeta('name="twitter:title"', 'content', route.title)
    setMeta('name="twitter:description"', 'content', ogDescription)
  }, [pathname])
}
