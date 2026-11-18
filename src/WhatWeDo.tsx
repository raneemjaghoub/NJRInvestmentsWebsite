import { Button } from './Home'
import './what-we-do.css'

const audiences = [
  ['Companies entering the GCC', 'International businesses planning a first office, entity or market launch in the region.'],
  ['Businesses expanding in the region', 'Companies already operating here that need support to scale, restructure or open new lines of business.'],
  ['Companies seeking investors, clients or partners', 'Businesses looking for investment, new clients or a joint-venture partner with a presence in the UAE.'],
]

const services = [
  {
    id: 'market-entry', label: '01', title: 'Market entry and expansion',
    description: 'Tailored market strategies, localisation support and regulatory guidance for companies establishing a presence in new regions.',
    includes: ['Market strategy for the UAE and wider region', 'Localisation of your offer, brand and operations', 'Guidance on regulatory and licensing requirements'],
    action: 'Ask about market entry',
  },
  {
    id: 'growth', label: '02', title: 'Growth enablement and execution',
    description: 'Hands-on support to scale operations, improve performance and adapt business models for success in the region.',
    includes: ['Scaling operations and teams', 'Performance and process improvement', 'Adapting business models for the regional market'],
    action: 'Ask about growth enablement and execution',
  },
  {
    id: 'connections', label: 'For companies seeking investors, clients or partners', title: 'Strategic connections',
    description: 'We identify promising companies with strong potential and introduce them to the right investors, clients and partners in our global network, supporting both sides as the relationship develops.',
    includes: ['Identifying companies with strong growth potential', 'Introductions to investors, clients and partners in our global network', 'Support in structuring partnerships as conversations progress'],
    action: 'Talk to us about connections',
  },
  {
    id: 'joint-ventures', label: 'For partners building a venture', title: 'Joint ventures',
    description: 'For the right opportunities, we go further and enter into a joint venture with a company, combining its expertise with our presence, network and hands-on support, including setting up and running the business in the region.',
    includes: ['Partnering in a shared UAE venture', 'Company setup, licensing and operations for the venture', 'Active involvement alongside the founders'],
    action: 'Discuss a joint venture',
  },
]

const steps = [
  ['Initial conversation', 'We learn about your business, your plans for the region and what support you need.'],
  ['Scope and plan', 'We agree the scope, timeline and who on our side will work with you.'],
  ['Get started', 'We make the right introductions and support the practical steps to get started.'],
  ['Ongoing support', 'We stay involved as you grow, with advisory and hands-on help where it is useful.'],
]

function SectionHeading({ label, title }: { label: string; title: string }) {
  return <div className="wwd-heading"><p className="wwd-eyebrow">{label}</p><h2>{title}</h2></div>
}

function ServiceDetail({ service }: { service: typeof services[number] }) {
  return <article id={service.id} className="wwd-service">
    <div className="wwd-summary">
      <p className="wwd-service-label">{service.label}</p>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </div>
    <aside className="wwd-includes" aria-label={`${service.title}: what this includes`}>
      <h4>What this includes</h4>
      <ul>{service.includes.map(item => <li key={item}>{item}</li>)}</ul>
      <a href={`/contact/?type=${service.id === 'connections' ? 'connections' : service.id === 'joint-ventures' ? 'joint-venture' : 'advisory'}`}>{service.action}<span aria-hidden="true">&nbsp; →</span></a>
    </aside>
  </article>
}

export function PageHeader({ active = 'what-we-do' }: { active?: 'home' | 'about' | 'what-we-do' | 'contact' | 'privacy' | 'terms' }) {
  return <header className="wwd-header wwd-container">
    <a href="/" aria-label="NJR Investments home"><img src="/assets/imgLogo-360.webp" srcSet="/assets/imgLogo-180.webp 180w, /assets/imgLogo-360.webp 360w, /assets/imgLogo-540.webp 540w" sizes="(max-width: 599px) 130px, 216px" alt="NJR Investments" width="180" height="67" /></a>
    <nav aria-label="Main navigation"><a href="/" aria-current={active === 'home' ? 'page' : undefined}>Home</a><a href="/about/" aria-current={active === 'about' ? 'page' : undefined}>About</a><a href="/what-we-do/" aria-current={active === 'what-we-do' ? 'page' : undefined}>What we do</a><Button className="njr-button" label="Start a conversation" /></nav>
  </header>
}

export function PageFooter({ active = 'what-we-do' }: { active?: 'home' | 'about' | 'what-we-do' | 'contact' | 'privacy' | 'terms' }) {
  return <footer className="wwd-footer wwd-container">
    <div className="wwd-footer-columns">
      <div className="wwd-brand"><a href="/" aria-label="NJR Investments home"><img src="/assets/imgLogo-360.webp" srcSet="/assets/imgLogo-180.webp 180w, /assets/imgLogo-360.webp 360w, /assets/imgLogo-540.webp 540w" sizes="(max-width: 599px) 130px, 216px" alt="NJR Investments" width="216" height="80" /></a><p className="wwd-desktop">Family investment company<br />Dubai, United Arab Emirates</p><p className="wwd-mobile">Family investment company · Dubai, UAE</p></div>
      <div className="wwd-footer-links">
        <div><h3>Company</h3><a href="/about/" aria-current={active === 'about' ? 'page' : undefined}>About</a><a href="/what-we-do/" aria-current={active === 'what-we-do' ? 'page' : undefined}>What we do</a><a href="/contact/" aria-current={active === 'contact' ? 'page' : undefined}>Contact</a></div>
        <div><h3>Services</h3><a href="/what-we-do/#advisory">Advisory services</a><a href="/what-we-do/#connections">Strategic connections</a><a href="/what-we-do/#joint-ventures">Joint ventures</a></div>
        <div className="wwd-footer-contact"><h3>Contact</h3><a href="mailto:info@njrinvestments.net">info@njrinvestments.net</a><p>Office 1308, Tower B<br />Business Central Towers<br />Dubai Media City</p></div>
      </div>
    </div>
    <div className="wwd-footer-legal"><p><span className="wwd-desktop">© 2026 NJR Investments LLC. All rights reserved.</span><span className="wwd-mobile">© 2026 NJR Investments LLC</span></p><div><a href="/privacy-policy/" aria-current={active === 'privacy' ? 'page' : undefined}>Privacy policy</a><a href="/terms-of-use/" aria-current={active === 'terms' ? 'page' : undefined}>Terms of use</a></div></div>
  </footer>
}

export default function WhatWeDo() {
  return <div className="wwd-page">
    <main>
      <section className="wwd-hero wwd-container">
        
        <p className="wwd-eyebrow">What we do</p>
        <h1>Helping companies enter the Gulf, make the right connections and build partnerships</h1>
        <p className="wwd-hero-description">NJR works with companies in three ways: advisory services for entering and growing in the UAE and the wider GCC, introductions to investors, clients and partners, and joint ventures with selected companies.</p>
        <Button className="njr-button" label="Discuss your plans" />
      </section>
      <section className="wwd-audiences wwd-container">
        <SectionHeading label="Who we work with" title="Support shaped around where you are" />
        <div className="wwd-audience-grid">{audiences.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>
      <section id="advisory" className="wwd-service-section wwd-container">
        <SectionHeading label="Advisory services" title="How we help you enter and grow" />
        {services.slice(0, 2).map(service => <ServiceDetail key={service.id} service={service} />)}
      </section>
      <section className="wwd-service-section wwd-partnerships wwd-container">
        <SectionHeading label="Connections and joint ventures" title="Going further with the right companies" />
        {services.slice(2).map(service => <ServiceDetail key={service.id} service={service} />)}
      </section>
      <section className="wwd-process wwd-container">
        <SectionHeading label="How we work" title="From first conversation to running business" />
        <ol>{steps.map(([title, description], index) => <li key={title}><span className="wwd-step-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
      </section>
      <section className="wwd-cta wwd-container"><div><h2>Planning a move into the Gulf?</h2><p>Tell us about your plans and the right person on our team will be in touch.</p></div><Button className="njr-button" label="Start a conversation" /></section>
    </main>
    <PageFooter />
  </div>
}
