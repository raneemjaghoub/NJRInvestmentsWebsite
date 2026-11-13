import { countries } from './countries'
import OfficeMap from './OfficeMap'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { FormEvent } from 'react'
import { PageFooter } from './WhatWeDo'
import './contact.css'

const enquiryTypes = ['Advisory services', 'Strategic connections', 'Joint ventures', 'Other']
const countryCodes = countries.map(country => country.code)
const nextSteps = [
  ['We review your enquiry', 'Your message goes to the team member who handles your type of enquiry.'],
  ['We reply', 'The right person on our team gets back to you by email or phone.'],
  ['We meet', 'If it is a fit, we arrange a call or a meeting at our Dubai Media City office.'],
]
// Temporary test recipient. Change this address when switching to NJR.
const enquiryRecipient = 'savitamerwade@bearlotsfriends.com'

const directionsUrl = 'https://www.google.com/maps/search/?api=1&query=Business+Central+Towers+Tower+B+Dubai+Media+City'

type EnquiryFields = { fullName: string; company: string; email: string; phone: string; country: string; message: string; consent: boolean }
const emptyFields: EnquiryFields = { fullName: '', company: '', email: '', phone: '', country: '', message: '', consent: false }
type FieldErrors = Partial<Record<keyof EnquiryFields, string>>

function validateEnquiry(fields: EnquiryFields): FieldErrors {
  const errors: FieldErrors = {}
  if (!fields.fullName.trim()) errors.fullName = 'Please enter your full name.'
  if (!fields.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!countryCodes.includes(fields.country)) errors.country = 'Please select your country.'
  if (!fields.message.trim()) errors.message = 'Please tell us about your enquiry.'
  if (!fields.consent) errors.consent = 'Please agree to the use of your details to send your enquiry.'
  return errors
}

const subscribeToLocation = () => () => {}

function EnquiryForm() {
  const type = useSyncExternalStore(subscribeToLocation, () => new URLSearchParams(window.location.search).get('type') ?? '', () => '')
  const aliases: Record<string, string> = { advisory: 'Advisory services', connections: 'Strategic connections', 'joint-venture': 'Joint ventures', other: 'Other' }
  const [enquiryOverride, setEnquiryType] = useState<string | null>(null)
  const enquiryType = enquiryOverride ?? aliases[type] ?? (enquiryTypes.includes(type) ? type : enquiryTypes[0])
  const [fields, setFields] = useState<EnquiryFields>({ ...emptyFields })
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryFields, boolean>>>({})
  const [status, setStatus] = useState<{ kind: 'success' | 'error'; message: string; reference?: string } | null>(null)
  const [sending, setSending] = useState(false)
  const submitting = useRef(false)
  useEffect(() => {
    const restore = () => { submitting.current = false; setSending(false) }
    window.addEventListener('pageshow', restore)
    return () => window.removeEventListener('pageshow', restore)
  }, [])
  const errors = validateEnquiry(fields)
  const complete = Object.keys(errors).length === 0

  function updateField<K extends keyof EnquiryFields>(name: K, value: EnquiryFields[K]) {
    setFields(previous => ({ ...previous, [name]: value }))
    setStatus(null)
  }
  function fieldError(name: keyof EnquiryFields) {
    return touched[name] && errors[name] ? <span className="contact-field-error" id={`${name}-error`}>{errors[name]}</span> : null
  }
  function fieldProps(name: keyof EnquiryFields) {
    return {
      'aria-labelledby': `${name}-label`,
      'aria-invalid': touched[name] && !!errors[name],
      'aria-describedby': touched[name] && errors[name] ? `${name}-error` : undefined,
      onBlur: () => setTouched(previous => ({ ...previous, [name]: true })),
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    if (!complete) {
      setTouched({ fullName: true, email: true, country: true, message: true, consent: true })
      const firstField = Object.keys(errors)[0]
      const element = event.currentTarget.elements.namedItem(firstField)
      if (element instanceof HTMLElement) element.focus()
      return
    }
    const data = new FormData(event.currentTarget)
    if (data.get('_honey')) return
    submitting.current = true
    setSending(true)
    setStatus(null)
    const reference = `NJR-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
    try {
      // Standard POST lets FormSubmit enforce its hosted reCAPTCHA before delivery.
      const submission = document.createElement('form')
      submission.method = 'POST'
      submission.action = `https://formsubmit.co/${enquiryRecipient}`
      submission.hidden = true
      const payload = {
        _subject: `NJR Investments | New enquiry — ${enquiryType}`,
        _template: 'table', _captcha: 'true', _honey: String(data.get('_honey') ?? ''),
        _replyto: fields.email.trim(), _url: window.location.origin + '/contact',
        'Submission reference': reference, 'Enquiry type': enquiryType,
        Name: fields.fullName.trim(), email: fields.email.trim(),
        Company: fields.company.trim() || 'Not provided', Phone: fields.phone.trim() || 'Not provided',
        Country: countries.find(country => country.code === fields.country)?.name ?? fields.country, Message: fields.message.trim(),
        Consent: 'Agreed to using these details to respond to this enquiry',
      }
      for (const [name, value] of Object.entries(payload)) {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        input.value = value
        submission.append(input)
      }
      document.body.append(submission)
      try {
        HTMLFormElement.prototype.submit.call(submission)
      } finally {
        submission.remove()
      }
    } catch {
      submitting.current = false
      setSending(false)
      setStatus({ kind: 'error', message: 'We could not open verification. Please try again. Your details have been kept in the form.', reference: `${reference}-VERIFICATION` })
    }
  }

  return <form className="contact-form" onSubmit={handleSubmit} aria-labelledby="enquiry-heading" aria-busy={sending} noValidate>
    <input name="_honey" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
    <h2 id="enquiry-heading">Send us an enquiry</h2>
    <fieldset className="contact-type" disabled={sending}><legend>I'm interested in</legend><div className="contact-chips">{enquiryTypes.map(type => <label className="contact-chip" key={type}><input type="radio" name="enquiryType" value={type} checked={enquiryType === type} onChange={() => { setEnquiryType(type); setStatus(null) }} /><span>{type}</span></label>)}</div></fieldset>
    <div className="contact-field-row">
      <label className="contact-field" htmlFor="full-name"><span id="fullName-label">Full name</span><input id="full-name" name="fullName" autoComplete="name" placeholder="Your name" required maxLength={120} value={fields.fullName} onChange={event => updateField('fullName', event.target.value)} readOnly={sending} {...fieldProps('fullName')} />{fieldError('fullName')}</label>
      <label className="contact-field" htmlFor="company"><span>Company (optional)</span><input id="company" name="company" autoComplete="organization" placeholder="Company name" maxLength={160} value={fields.company} onChange={event => updateField('company', event.target.value)} readOnly={sending} /></label>
    </div>
    <div className="contact-field-row">
      <label className="contact-field" htmlFor="email"><span id="email-label">Email</span><input id="email" name="email" type="email" autoComplete="email" placeholder="name@company.com" required maxLength={254} value={fields.email} onChange={event => updateField('email', event.target.value)} readOnly={sending} {...fieldProps('email')} />{fieldError('email')}</label>
      <label className="contact-field" htmlFor="phone"><span>Phone (optional)</span><input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+971 …" maxLength={40} value={fields.phone} onChange={event => updateField('phone', event.target.value)} readOnly={sending} /></label>
    </div>
    <label className="contact-field" htmlFor="country"><span id="country-label">Country</span><div className="contact-select"><select id="country" aria-labelledby="country-label" name="country" autoComplete="country" value={fields.country} onChange={event => updateField('country', event.target.value)} required disabled={sending} {...fieldProps('country')}><option value="" disabled>Select your country</option>{countries.map(({ code, name }) => <option value={code} key={code}>{name}</option>)}</select><span aria-hidden="true">▾</span></div>{fieldError('country')}</label>
    <label className="contact-field" htmlFor="message"><span id="message-label">Message</span><textarea id="message" name="message" placeholder="Tell us about your plans and timeline" required maxLength={4000} value={fields.message} onChange={event => updateField('message', event.target.value)} readOnly={sending} {...fieldProps('message')} />{fieldError('message')}</label>
    <div><label className="contact-consent"><input type="checkbox" name="consent" required checked={fields.consent} onChange={event => updateField('consent', event.target.checked)} disabled={sending} {...fieldProps('consent')} /><span id="consent-label">I agree to NJR Investments using these details to respond to my enquiry, as described in the <a href="/privacy-policy/" target="_blank" rel="noreferrer">privacy policy</a>.</span></label>{fieldError('consent')}</div>
    <button className="njr-button contact-submit" type="submit" disabled={!complete || sending} aria-describedby={!complete ? 'contact-required-hint' : undefined}>{sending ? 'Opening verification…' : 'Send enquiry'}</button>
    {!complete && <p className="contact-required-hint" id="contact-required-hint">Complete the required fields and agree to the privacy policy to send your enquiry.</p>}
    <p className="contact-required-hint">You’ll complete a CAPTCHA security check before your enquiry is sent.</p>
    {status && <div className={`contact-feedback contact-feedback-${status.kind}`} role={status.kind === 'error' ? 'alert' : 'status'}><p>{status.message}</p>{status.reference && <p className="contact-error-reference">Error ID: {status.reference}</p>}</div>}
  </form>
}

export default function Contact() {
  return <div className="contact-page">
    <main>
      <section className="wwd-hero wwd-container contact-hero"><nav aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true"> / </span><span>Contact</span></nav><p className="wwd-eyebrow">Contact</p><h1>Contact NJR Investments</h1><p className="wwd-hero-description">Tell us what you are working on. Choosing an enquiry type helps us route your message to the right person.</p></section>
      <section className="contact-main wwd-container" aria-label="Enquiry form and contact details">
        <EnquiryForm />
        <aside className="contact-details"><p className="wwd-eyebrow">Get in touch</p>
          <div className="contact-detail"><h3>Email</h3><a href="mailto:info@njrinvestments.net">info@njrinvestments.net</a></div>
          <div className="contact-detail"><h3>Office</h3><address>Business Central Towers, Tower B, Office 1308<br />Dubai Media City, Dubai, United Arab Emirates</address></div>
          <div className="contact-detail"><h3>Office hours</h3><p>Monday to Friday, 9:00 to 18:00 GST</p></div>
          <OfficeMap className="contact-map" />
          <a className="contact-directions" href={directionsUrl} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true"> →</span></a>
        </aside>
      </section>
      <section className="contact-next wwd-container"><div className="wwd-heading"><p className="wwd-eyebrow">What happens next</p><h2>After you get in touch</h2></div><ol>{nextSteps.map(([title, text], index) => <li key={title}><span className="contact-step-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>
    </main>
    <PageFooter active="contact" />
  </div>
}
