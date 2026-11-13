import { PageFooter } from './WhatWeDo'
import './legal.css'

const sections = [
  {
    "title": "1. Information only, not advice or an offer",
    "paragraphs": [
      "The website gives general information about NJR and how we work with companies. It is not investment, financial, legal or tax advice.",
      "Nothing on the website is an offer or invitation to buy or sell any investment, to invest in any company, or to enter into any transaction. Any investor introduction, joint venture or other arrangement with NJR is subject to separate written agreements. We do not guarantee any outcome, investment or return.",
      "You should take your own professional advice before making any business or investment decision."
    ]
  },
  {
    "title": "2. Enquiries",
    "paragraphs": [
      "Sending us an enquiry does not create a client, advisory or business relationship, and does not oblige either of us to work together.",
      "Please do not send confidential or commercially sensitive information through the website. If a discussion progresses, we can put a confidentiality agreement in place before you share such details. How we handle the personal information in your enquiry is explained in our Privacy Policy."
    ]
  },
  {
    "title": "3. Accuracy of information",
    "paragraphs": [
      "We take reasonable care to keep the website accurate and up to date, but we do not guarantee that all information is complete, current or free from errors. We may change or remove content at any time without notice."
    ]
  },
  {
    "title": "4. Intellectual property",
    "paragraphs": [
      "The NJR name and logo, and the website's text, photographs, graphics and design, belong to NJR Investments LLC or are used with permission. You may view and print pages for your own reference. You may not copy, reproduce or use any of this content for commercial purposes without our written permission."
    ]
  },
  {
    "title": "5. Acceptable use",
    "paragraphs": [
      "You agree not to use the website in any way that is unlawful, that could damage or interfere with the website or its security, or that involves sending spam or misleading information through our enquiry form."
    ]
  },
  {
    "title": "6. Links to other websites",
    "paragraphs": [
      "The website may link to websites run by others. We are not responsible for their content, availability or privacy practices."
    ]
  },
  {
    "title": "7. Limitation of liability",
    "paragraphs": [
      "To the extent permitted by law, NJR is not liable for any loss or damage arising from your use of the website, or from relying on any information on it. Nothing in these terms limits any liability that cannot be limited under the laws of the United Arab Emirates."
    ]
  },
  {
    "title": "8. Governing law",
    "paragraphs": [
      "These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Dubai. The courts of Dubai have exclusive jurisdiction over any dispute arising from them."
    ]
  },
  {
    "title": "9. Changes to these terms",
    "paragraphs": [
      "We may update these terms from time to time. The \"Last updated\" date at the top shows when they last changed. Continuing to use the website after a change means you accept the updated terms."
    ]
  },
  {
    "title": "10. Contact",
    "paragraphs": [
      "NJR Investments LLC, Business Central Towers, Tower B, Office 1308, Dubai Media City, Dubai, United Arab Emirates. Email: info@njrinvestments.net."
    ]
  }
]

function TermsParagraph({ text }: { text: string }) {
  if (text.endsWith('Privacy Policy.')) {
    return <p>{text.slice(0, -'Privacy Policy.'.length)}<a href="/privacy-policy/">Privacy Policy</a>.</p>
  }
  if (text.endsWith('info@njrinvestments.net.')) {
    return <p>{text.slice(0, -'info@njrinvestments.net.'.length)}<a href="mailto:info@njrinvestments.net">info@njrinvestments.net</a>.</p>
  }
  return <p>{text}</p>
}

export default function TermsOfUse() {
  return <div className="legal-page">
    <main>
      <header className="legal-hero wwd-container"><nav aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true"> / </span><span>Terms of use</span></nav><h1>Terms of use</h1><p>Last updated: [date]</p></header>
      <div className="legal-body wwd-container"><article className="legal-content" aria-label="Terms of use">
        <p>{"These terms apply to your use of njrinvestments.net (the \"website\"), operated by NJR Investments LLC (\"NJR\", \"we\", \"us\"). By using the website, you agree to these terms."}</p>
        {sections.map(section => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map(text => <TermsParagraph key={text} text={text} />)}</section>)}
      </article></div>
    </main>
    <PageFooter active="terms" />
  </div>
}

