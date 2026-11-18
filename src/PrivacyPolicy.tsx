import { legalLastModified } from './legal-config'
import { PageFooter } from './WhatWeDo'
import './legal.css'

const sections = [
  ['1. Information we collect', 'When you send an enquiry, we collect the details you enter: your name, email address, enquiry type and message, and your company, phone number and country if you provide them.'],
  ['2. Why we use it', 'We use your information only to reply to your enquiry and to discuss a possible business relationship with you. We do this with the consent you give when you submit the form.'],
  ['3. Who receives it', 'Your enquiry is seen only by the NJR team. We do not share it with anyone else unless you agree, for example after we have contacted you and signed a confidentiality agreement. Our website and email hosting provider processes it on our behalf, and we may disclose it if the law requires us to.'],
  ['4. Where it is stored', "Your information may be stored on our hosting provider's servers outside the United Arab Emirates. We use providers that apply appropriate security measures to protect it."],
  ['5. How long we keep it', 'We keep enquiries for two years from our last contact with you, then delete them.'],
]
const rights = ['tell you what information we hold about you', 'correct or delete it', 'restrict or stop our use of it', 'transfer it to you or another organisation', 'withdraw your consent at any time']

export default function PrivacyPolicy() {
  return <div className="legal-page">
    <main>
      <header className="legal-hero wwd-container"><h1>Privacy policy</h1><p>Last modified: <time dateTime={legalLastModified.date}>{legalLastModified.label}</time></p></header>
      <div className="legal-body wwd-container"><article className="legal-content" aria-label="Privacy policy">
        <p>This policy explains how NJR Investments LLC uses the personal information you give us through this website, in line with the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021).</p>
        {sections.map(([heading, text]) => <section key={heading}><h2>{heading}</h2><p>{text}</p></section>)}
        <section><h2>6. Your rights</h2><p>You can ask us to:</p><ul>{rights.map(right => <li key={right}>{right}</li>)}</ul><p>To make a request, email <a href="mailto:info@njrinvestments.net">info@njrinvestments.net</a>.</p></section>
        <section><h2>7. Contact</h2><p>NJR Investments LLC, Dubai, United Arab Emirates. Email: <a href="mailto:info@njrinvestments.net">info@njrinvestments.net</a></p><p>We may update this policy from time to time. The date at the top shows when it last changed.</p></section>
      </article></div>
    </main>
    <PageFooter active="privacy" />
  </div>
}
