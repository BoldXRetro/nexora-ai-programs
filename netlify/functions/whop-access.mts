import type { Config } from '@netlify/functions'
import { createHash, createDecipheriv } from 'node:crypto'

const COOKIE = 'whop_session'
function env(name: string) { return Netlify.env.get(name)?.trim() || '' }
function getCookie(request: Request, name: string) {
  const header = request.headers.get('cookie') || ''
  const match = header.split(';').map(v => v.trim()).find(v => v.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.slice(name.length + 1)) : ''
}
function sessionKey() { return createHash('sha256').update(env('WHOP_SESSION_SECRET')).digest() }
function decryptSession(value: string) {
  try {
    const [ivRaw, tagRaw, dataRaw] = value.split('.')
    const decipher = createDecipheriv('aes-256-gcm', sessionKey(), Buffer.from(ivRaw, 'base64url'))
    decipher.setAuthTag(Buffer.from(tagRaw, 'base64url'))
    return JSON.parse(Buffer.concat([decipher.update(Buffer.from(dataRaw, 'base64url')), decipher.final()]).toString('utf8')) as { userId: string }
  } catch { return null }
}

export default async (request: Request) => {
  const productId = new URL(request.url).searchParams.get('productId') || ''
  if (!/^prod_[A-Za-z0-9]+$/.test(productId)) return Response.json({ error: 'Invalid product.' }, { status: 400 })
  const session = decryptSession(getCookie(request, COOKIE))
  if (!session?.userId) return Response.json({ authenticated: false, hasAccess: false })
  const sessionSecret = env('WHOP_SESSION_SECRET')
  if (sessionSecret.length < 32) return Response.json({ error: 'Whop session security is not configured.' }, { status: 503 })
  const apiKey = env('WHOP_COMPANY_API_KEY')
  if (!apiKey) return Response.json({ error: 'Whop access checking is not configured.' }, { status: 503 })
  const response = await fetch(`https://api.whop.com/api/v1/users/${encodeURIComponent(session.userId)}/access/${encodeURIComponent(productId)}`, { headers: { Authorization: `Bearer ${apiKey}` }, cache: 'no-store' })
  if (!response.ok) return Response.json({ authenticated: true, hasAccess: false }, { status: 200 })
  const result = await response.json() as { has_access?: boolean; access_level?: string }
  return Response.json({ authenticated: true, hasAccess: result.has_access === true, accessLevel: result.access_level || 'no_access' }, { headers: { 'Cache-Control': 'no-store' } })
}

export const config: Config = { path: '/api/whop-access' }
