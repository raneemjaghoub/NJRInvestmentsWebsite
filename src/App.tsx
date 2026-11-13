import { useLayoutEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import Home from './Home'
import WhatWeDo, { PageHeader } from './WhatWeDo'
import About from './About'
import Contact from './Contact'
import PrivacyPolicy from './PrivacyPolicy'
import TermsOfUse from './TermsOfUse'
import NotFound from './NotFound'
import { applyPageMetadata, siteUrl } from './seo'

const routes = new Set(['/', '/about', '/what-we-do', '/contact', '/privacy-policy', '/terms-of-use'])
const currentLocation = () => window.location.pathname + window.location.search + window.location.hash

export default function App({ initialLocation }: { initialLocation?: string } = {}) {
  const [location, setLocation] = useState(() => initialLocation ?? currentLocation())
  const [menuOpen, setMenuOpen] = useState(false)
  const url = new URL(location, typeof window === 'undefined' ? siteUrl : window.location.origin)
  const pathname = url.pathname.replace(/\/$/, '') || '/'
  const active = pathname === '/' ? 'home' : pathname === '/privacy-policy' ? 'privacy' : pathname === '/terms-of-use' ? 'terms' : pathname === '/what-we-do' ? 'what-we-do' : pathname === '/about' ? 'about' : 'contact'

  useLayoutEffect(() => {
    const onPopState = () => { setMenuOpen(false); setLocation(currentLocation()) }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useLayoutEffect(() => {
    applyPageMetadata(pathname)
    const id = url.hash ? decodeURIComponent(url.hash.slice(1)) : ''
    const target = id ? document.getElementById(id) : null
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' })
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location, url.hash, pathname])

  function navigate(event: MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]')
    if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return
    const next = new URL(anchor.href, window.location.href)
    const nextPath = next.pathname.replace(/\/$/, '') || '/'
    if (next.origin !== window.location.origin || !routes.has(nextPath)) return
    event.preventDefault()
    setMenuOpen(false)
    if (next.href === window.location.href) return
    window.history.pushState(null, '', next.pathname + next.search + next.hash)
    setLocation(currentLocation())
  }

  return <div onClick={navigate}>
    <PageHeader active={active} />
    <div className="route-content" key={url.pathname + url.search}>
      {pathname === '/terms-of-use' ? <TermsOfUse /> : pathname === '/privacy-policy' ? <PrivacyPolicy /> : pathname === '/contact' ? <Contact /> : pathname === '/about' ? <About /> : pathname === '/what-we-do' ? <WhatWeDo /> : pathname === '/' ? <Home /> : <NotFound />}
    </div>
    <button className="mobile-menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '×' : <img src="/assets/menu.svg" alt="" />}</button>
    {menuOpen && <nav className="mobile-menu" aria-label="Mobile navigation">
      {['Home', 'About', 'What we do', 'Contact'].map((label, index) => <a key={label} href={['/', '/about/', '/what-we-do/', '/contact/'][index]}>{label}<span>→</span></a>)}
      <a className="menu-cta" href="/contact/">Start a conversation</a>
    </nav>}
  </div>
}
