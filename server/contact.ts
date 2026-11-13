// Development equivalent of public/api/contact.php. Production runs the PHP endpoint on SiteGround.
import { randomBytes, randomInt, timingSafeEqual } from 'node:crypto'
import { readFileSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'
import { deliverEnquiry } from './formsubmit.ts'

type Session = { code: string; expires: number }
const sessions = new Map<string, Session>()
const limits = new Map<string, { count: number; expires: number }>()
const recipient = process.env.NJR_CONTACT_RECIPIENT || 'savitamerwade@bearlotsfriends.com'
function allowed(key: string, maximum: number) {
  const now = Date.now()
  for (const [id, entry] of limits) if (entry.expires < now) limits.delete(id)
  const entry = limits.get(key) ?? { count: 0, expires: now + 600000 }
  entry.count++
  limits.set(key, entry)
  return entry.count <= maximum
}
export function contactApi(): Plugin {
  return { name: 'njr-local-contact', configureServer(server) {
    server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
      if (req.url?.split('?')[0] !== '/api/contact.php') return next()
      res.setHeader('Cache-Control', 'no-store')
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('X-Content-Type-Options', 'nosniff')
      const reference = `NJR-${randomBytes(4).toString('hex').toUpperCase()}`
      const respond = (status: number, data: object) => { res.statusCode = status; res.end(JSON.stringify(data)) }
      const fail = (status: number, message: string, code: string) => respond(status, { success: false, message, reference: `${reference}-${code}` })
      const ip = req.socket.remoteAddress ?? 'local'
      const cookie = req.headers.cookie?.match(/(?:^|;\s*)njr_captcha=([a-f0-9]{48})(?:;|$)/)?.[1]
      try {
        if (req.headers.origin && new URL(req.headers.origin).host !== req.headers.host) return fail(403, 'Please submit from the website.', 'ORIGIN')
        if (req.method === 'GET') {
          if (!allowed(`${ip}:challenge`, 60)) return fail(429, 'Too many code requests. Please wait ten minutes.', 'RATE')
          for (const [id, session] of sessions) if (session.expires < Date.now()) sessions.delete(id)
          if (cookie) sessions.delete(cookie)
          const id = randomBytes(24).toString('hex')
          const glyphs = JSON.parse(readFileSync('public/api/glyphs.json', 'utf8')) as Record<string, string[]>
          const alphabet = Object.keys(glyphs)
          const code = Array.from({ length: 6 }, () => alphabet[randomInt(alphabet.length)]).join('')
          sessions.set(id, { code, expires: Date.now() + 300000 })
          let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="72" viewBox="0 0 240 72"><rect width="240" height="72" fill="#f4f0e5"/>'
          for (let i = 0; i < 10; i++) svg += `<path d="M${randomInt(240)} ${randomInt(72)}L${randomInt(240)} ${randomInt(72)}" stroke="#d8ceae" stroke-width="1"/>`
          Array.from(code).forEach((char, i) => {
            svg += `<g fill="#35372e" transform="translate(${14 + i * 37} ${18 + randomInt(-3, 4)}) rotate(${randomInt(-9, 10)} 12 18)">`
            glyphs[char].forEach((row, y) => Array.from(row).forEach((pixel, x) => { if (pixel === '1') svg += `<rect x="${x * 4}" y="${y * 5}" width="4.3" height="5.3"/>` }))
            svg += '</g>'
          })
          svg += '</svg>'
          res.setHeader('Set-Cookie', `njr_captcha=${id}; Path=/api; HttpOnly; SameSite=Strict; Max-Age=600`)
          return respond(200, { image: `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}` })
        }
        if (req.method !== 'POST') { res.setHeader('Allow', 'GET, POST'); return fail(405, 'Unsupported request.', 'METHOD') }
        if (!allowed(`${ip}:send`, 10)) return fail(429, 'Too many attempts. Please wait ten minutes.', 'RATE')
        if (!req.headers['content-type']?.startsWith('application/json')) return fail(415, 'Invalid request.', 'FORMAT')
        let body = ''
        for await (const chunk of req) { body += chunk; if (Buffer.byteLength(body) > 20000) return fail(413, 'Your message is too long.', 'SIZE') }
        const data = JSON.parse(body) as Record<string, unknown>
        if (data._honey) return fail(400, 'Your enquiry could not be verified.', 'VERIFY')
        const session = cookie ? sessions.get(cookie) : undefined
        if (cookie) sessions.delete(cookie)
        const supplied = typeof data.captchaCode === 'string' ? data.captchaCode.trim().toUpperCase() : ''
        if (!session || session.expires < Date.now() || Buffer.byteLength(supplied) !== 6 || !timingSafeEqual(Buffer.from(supplied), Buffer.from(session.code))) return fail(422, 'The security code is incorrect or has expired. Enter the new code and try again.', 'CAPTCHA')
        const text = (key: string) => typeof data[key] === 'string' ? (data[key] as string).trim() : ''
        const name = text('fullName'), email = text('email'), message = text('message'), company = text('company'), phone = text('phone'), type = text('enquiryType')
        const countries = JSON.parse(readFileSync('public/api/countries.json', 'utf8')) as { code: string; name: string }[]
        const country = countries.find(item => item.code === text('country'))
        if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !message || message.length > 4000 || company.length > 160 || phone.length > 40 || !country || data.consent !== true || !['Advisory services', 'Strategic connections', 'Joint ventures', 'Other'].includes(type)) return fail(422, 'Please check the required fields and try again.', 'FIELDS')
        const payload = { _url: `http://${req.headers.host}/contact/`, _subject: `NJR Investments | New enquiry — ${type}`, _template: 'table', _captcha: 'false', _replyto: email, 'Submission reference': reference, 'Enquiry type': type, Name: name, email, Company: company || 'Not provided', Phone: phone || 'Not provided', Country: country.name, Message: message, Consent: 'Agreed to using these details to respond to this enquiry' }
        if (process.env.NJR_CONTACT_TEST === '1') return respond(200, { success: true, reference })
        const upstream = await deliverEnquiry(recipient, payload)
        const result = upstream.result
        if (upstream.status < 200 || upstream.status >= 300 || ![true, 'true'].includes(result.success ?? false) || /activat|confirm your email/i.test(result.message ?? '')) return fail(502, 'Email delivery could not be confirmed. Please try again later or email us directly.', 'DELIVERY')
        return respond(200, { success: true, reference })
      } catch (error) {
        const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : 'SEND'
        console.error('[NJR contact]', reference, error instanceof Error ? error.message : 'Send failed')
        return fail(502, code === 'EMAIL_TIMEOUT' ? 'The email service took too long to respond. Your details have been kept. Please try again shortly.' : 'Your enquiry could not be sent. Please try again shortly.', code)
      }
    })
  } }
}
