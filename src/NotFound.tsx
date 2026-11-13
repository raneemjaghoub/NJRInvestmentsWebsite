import { PageFooter } from './WhatWeDo'
export default function NotFound() {
  return <><main className="wwd-container not-found"><p className="wwd-eyebrow">404 · Page not found</p><h1>We couldn’t find that page</h1><p>The address may have changed. Explore NJR Investments or get in touch with our Dubai team.</p><nav aria-label="Explore the website"><a className="njr-button" href="/">Home</a><a className="njr-button" href="/what-we-do/">What we do</a><a className="njr-button" href="/about/">About</a><a className="njr-button" href="/contact/">Contact</a></nav></main><PageFooter /></>
}
