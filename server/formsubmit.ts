import { resolve4 } from 'node:dns/promises'
import { request } from 'node:https'

/** Resolve IPv4 explicitly, retaining the provider hostname for TLS verification. */
export async function deliverEnquiry(recipient: string, payload: Record<string, string>) {
  const hostname = 'formsubmit.co'
  const addresses = await resolve4(hostname)
  if (!addresses.length) throw new Error('Email provider DNS lookup failed')
  const body = JSON.stringify(payload)
  return new Promise<{ status: number; result: { success?: boolean | string; message?: string } }>((resolve, reject) => {
    const req = request({
      hostname: addresses[0], servername: hostname, port: 443,
      path: `/ajax/${encodeURIComponent(recipient)}`, method: 'POST', agent: false,
      headers: { Host: hostname, Referer: payload._url, Origin: new URL(payload._url).origin, 'X-Requested-With': 'XMLHttpRequest', 'User-Agent': 'NJR-Contact/1.0', 'Content-Type': 'application/json', Accept: 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, response => {
      let content = ''
      response.setEncoding('utf8')
      response.on('data', (chunk: string) => {
        content += chunk
        if (content.length > 65536) req.destroy(new Error('Unexpected email provider response'))
      })
      response.on('error', reject)
      response.on('end', () => {
        clearTimeout(timer)
        try { resolve({ status: response.statusCode ?? 502, result: JSON.parse(content) }) }
        catch { reject(new Error('Unexpected email provider response')) }
      })
    })
    const timer = setTimeout(() => req.destroy(Object.assign(new Error('Email provider timed out'), { code: 'EMAIL_TIMEOUT' })), 45000)
    req.on('error', error => { clearTimeout(timer); reject(error) })
    req.end(body)
  })
}
