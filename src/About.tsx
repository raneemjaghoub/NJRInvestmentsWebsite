import OfficeMap from './OfficeMap'
import { Button } from './Home'
import { PageFooter } from './WhatWeDo'
import './about.css'

const facts = [
  ['In business since', '1997'],
  ['Headquarters', 'Dubai, UAE'],
  ['Industries', 'Many, including technology, aviation, energy and entertainment'],
  ['Partners in', 'GCC, Europe, Asia, Africa, South America'],
]
const values = [
  ['Integrity', 'We are honest about what we can do, and we keep our word.'],
  ['Discretion', 'Every conversation is confidential, and we put an NDA in place before sensitive details are shared.'],
  ['Partnership', 'We work alongside the companies we support, and succeed only when they do.'],
  ['A long-term view', 'As a family company, we build relationships meant to last for decades.'],
]
const directionsUrl = 'https://www.google.com/maps/search/?api=1&query=Business+Central+Towers+Tower+B+Dubai+Media+City'

export default function About() {
  return <div className="about-page">
    <main>
      <section className="wwd-hero wwd-container about-hero">
        
        <p className="wwd-eyebrow">About NJR</p>
        <h1>A family investment company, built across two generations</h1>
        <p className="wwd-hero-description">Founded and based in Dubai, with partners on four continents, NJR Investments brings together the experience of its founding generation and the perspective of the next.</p>
      </section>
      <section className="about-story wwd-container">
        <div className="about-story-row">
          <div className="about-story-copy">
            <p className="wwd-eyebrow">Our story</p>
            <h2>Two generations, one long-term view</h2>
            <p>NJR Investments is a multi-generational, family-owned company with a steadily expanding portfolio. Guided by two generations of leadership, we work across many industries, including technology, construction, aviation, fintech and payments, power and energy, and entertainment, supported by partners across the GCC, Europe, Asia, Africa and South America.</p>
            <p>Our strategy centres on opportunities that create lasting value. Today we work with companies in three ways: advising them as they enter and grow in the UAE and the wider GCC, connecting promising businesses with investors, clients and partners, and partnering with selected companies through joint ventures.</p>
          </div>
          <aside className="about-since" aria-label="In business since 1997">
            <p className="wwd-eyebrow">In business since</p><p className="about-year">1997</p><span className="about-gold-rule" aria-hidden="true" />
            <p>Two generations<br />Partners on four continents</p>
          </aside>
        </div>
      </section>
      <section className="about-chairman wwd-container">
        <p className="wwd-eyebrow">Chairman’s message</p>
        <div className="about-message">
          <p className="about-quote">When our business began in 1997, it was built on a simple belief: the strongest results come from partnerships built on trust, patience and hard work.</p>
          <p>Nearly three decades later, that belief still guides us. As a family company led by two generations, we combine the experience and relationships of our founding years with the energy and perspective of the next generation.</p>
          <p>From our home in Dubai, we work with companies across many industries, and with partners across the GCC, Europe, Asia, Africa and South America. Whether we are advising a company entering the Gulf, connecting a business with the right partners or building a joint venture together, our commitment is the same: to be as invested in your success as you are.</p>
          <p>We look forward to the conversations, and the partnerships, still ahead of us.</p>
          <div className="about-signature"><span aria-hidden="true" /><strong>Chairman</strong><p>NJR Investments</p></div>
        </div>
      </section>
      <section className="about-facts wwd-container">
        <p className="wwd-eyebrow">At a glance</p>
        <dl>{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </section>
      <section className="about-purpose wwd-container">
        <p className="wwd-eyebrow">Purpose</p>
        <div className="about-purpose-grid">
          <article><h3>Our mission</h3><p>To build lasting value for the companies we work with, through local knowledge, the right connections and hands-on support.</p></article>
          <article><h3>Our vision</h3><p>To be the partner international businesses and founders trust when they grow in the UAE and across the Gulf.</p></article>
        </div>
      </section>
      <section className="about-values wwd-container">
        <div className="wwd-heading"><p className="wwd-eyebrow">Our values</p><h2>What guides how we work</h2></div>
        <ol>{values.map(([title, description], index) => <li key={title}><span className="about-value-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
      </section>
      <section className="about-office wwd-container">
        <div className="about-office-heading"><div className="wwd-heading"><p className="wwd-eyebrow">Our office</p><h2>Visit us in Dubai Media City</h2></div><address>Business Central Towers, Tower B, Office 1308<br />Dubai Media City, Dubai, United Arab Emirates</address></div>
        <OfficeMap className="about-map" />
        <a className="about-directions" href={directionsUrl} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true"> →</span></a>
      </section>
      <section className="wwd-cta wwd-container"><div><h2>Let's talk about working together</h2><p>Whether you are entering the Gulf or looking for a long-term partner, we would be glad to hear from you.</p></div><Button className="njr-button" label="Start a conversation" /></section>
    </main>
    <PageFooter active="about" />
  </div>
}
