export const siteUrl = 'https://www.njrinvestments.net'
export const pages = {
  '/': { name: 'Home', title: 'NJR Investments – Family Investment Company, Dubai', description: 'Dubai-based family investment company, in business since 1997. Advisory, strategic connections and joint ventures across the Gulf.' },
  '/what-we-do': { name: 'What we do', title: 'Market Entry Advisory & Joint Ventures in the Gulf – NJR', description: 'Advice for companies entering the UAE and GCC, introductions to investors, clients and partners, and joint ventures. Based in Dubai.' },
  '/about': { name: 'About', title: 'About NJR Investments – Family-Owned Since 1997', description: 'A family-owned company led by two generations, with partners across the GCC, Europe, Asia, Africa and South America.' },
  '/contact': { name: 'Contact', title: 'Contact NJR Investments – Dubai Media City, UAE', description: 'Start a conversation with NJR Investments about advisory, strategic connections or a joint venture. Office in Dubai Media City.' },
  '/privacy-policy': { name: 'Privacy policy', title: 'Privacy Policy – NJR Investments', description: 'How NJR Investments handles personal information under the UAE Personal Data Protection Law.' },
  '/terms-of-use': { name: 'Terms of use', title: 'Terms of Use – NJR Investments', description: 'The terms that apply to your use of the NJR Investments website.' },
} as const
export type PagePath = keyof typeof pages
export function normalizePath(path: string) { return path.replace(/\/+$/, '') || '/' }
export function canonicalPath(path: string) { const clean = normalizePath(path); return clean === '/' ? '/' : `${clean}/` }
export function pageMetadata(path: string) {
  return pages[normalizePath(path) as PagePath] ?? { name: 'Page not found', title: 'Page Not Found – NJR Investments', description: 'This page could not be found. Explore NJR Investments, our services, or contact our Dubai team.' }
}
export function structuredData(path: string) {
  const clean = normalizePath(path)
  const graph: object[] = [
    { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'NJR Investments', legalName: 'NJR Investments LLC', url: `${siteUrl}/`, logo: `${siteUrl}/assets/imgLogo.png`, email: 'info@njrinvestments.net', description: 'Dubai-based family investment company offering advisory services, strategic connections and joint ventures across the Gulf.', address: { '@type': 'PostalAddress', streetAddress: 'Business Central Towers, Tower B, Office 1308, Dubai Media City', addressLocality: 'Dubai', addressCountry: 'AE' }, areaServed: ['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'] },
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: `${siteUrl}/`, name: 'NJR Investments', publisher: { '@id': `${siteUrl}/#organization` } },
  ]
  if (clean !== '/' && clean in pages) graph.push({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: pageMetadata(clean).name, item: siteUrl + canonicalPath(clean) }] })
  return { '@context': 'https://schema.org', '@graph': graph }
}
export function applyPageMetadata(path: string) {
  const meta = pageMetadata(path)
  document.title = meta.title
  const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
    let node = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
    if (!node) { node = document.createElement('meta'); node.setAttribute(attribute, key); document.head.append(node) }
    node.content = content
  }
  setMeta('name', 'description', meta.description)
  const known = normalizePath(path) in pages
  setMeta('name', 'robots', import.meta.env.VITE_SITE_ENV === 'staging' || !known ? 'noindex, nofollow' : 'index, follow')
  for (const [key, value] of Object.entries({ 'og:type': 'website', 'og:site_name': 'NJR Investments', 'og:locale': 'en_AE', 'og:title': meta.title, 'og:description': meta.description, 'og:url': siteUrl + canonicalPath(path), 'og:image': `${siteUrl}/assets/njr-social.png`, 'og:image:width': '1200', 'og:image:height': '630', 'og:image:alt': 'NJR Investments — partners for business across the Gulf, Dubai, UAE' })) setMeta('property', key, value)
  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', meta.title)
  setMeta('name', 'twitter:description', meta.description)
  setMeta('name', 'twitter:image', `${siteUrl}/assets/njr-social.png`)
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical) }
  canonical.href = siteUrl + canonicalPath(path)
  let schema = document.getElementById('njr-structured-data')
  if (!schema) { schema = document.createElement('script'); schema.id = 'njr-structured-data'; schema.setAttribute('type', 'application/ld+json'); document.head.append(schema) }
  schema.textContent = JSON.stringify(structuredData(path))
}
