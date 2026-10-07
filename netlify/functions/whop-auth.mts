import type { Config } from '@netlify/functions'
import { createHash, randomBytes, createCipheriv, createDecipheriv } from 'node:crypto'

const COOKIE = 'whop_session'
const PKCE_COOKIE = 'whop_oauth_pkce'

function env(name: string) {
  return Netlify.env.get(name)?.trim() || ''
}

function b64url(input: Buffer | string) {
  return Buffer.from(input).toString('base64url')
}

function cookie(name: string, value: string, options = 'Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600') {
  return `${name}=${value}; ${options}`
}

function getCookie(request: Request, name: string) {
  const header = request.headers.get('cookie') || ''
  const match = header.split(';').map(v => v.trim()).find(v => v.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.slice(name.length + 1)) : ''
}

function sessionKey() {
  const secret = env('WHOP_SESSION_SECRET')
  if (secret.length < 32) throw new Error('WHOP_SESSION_SECRET must be at least 32 characters.')
  return createHash('sha256').update(secret).digest()
}

function encryptSession(payload: object) {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', sessionKey(), iv)
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(payload), 'utf8'), cipher.final()])
  return `${b64url(iv)}.${b64url(cipher.getAuthTag())}.${b64url(encrypted)}`
}

function decryptSession(value: string) {
  try {
    const [ivRaw, tagRaw, dataRaw] = value.split('.')
    const decipher = createDecipheriv('aes-256-gcm', sessionKey(), Buffer.from(ivRaw, 'base64url'))
    decipher.setAuthTag(Buffer.from(tagRaw, 'base64url'))
    return JSON.parse(Buffer.concat([decipher.update(Buffer.from(dataRaw, 'base64url')), decipher.final()]).toString('utf8')) as { userId: string; name?: string }
  } catch {
    return null
  }
}

async function login(request: Request) {
  const clientId = env('WHOP_APP_ID')
  if (!clientId) return new Response('WHOP_APP_ID is not configured.', { status: 500 })
  const redirectUri = `${new URL(request.url).origin}/api/whop-auth?action=callback`
  const returnPath = new URL(request.url).searchParams.get('return') || '/'
  const safeReturn = returnPath.startsWith('/') && !returnPath.startsWith('//') ? returnPath : '/'
  const state = b64url(randomBytes(24))
  const verifier = b64url(randomBytes(48))
  const challenge = b64url(createHash('sha256').update(verifier).digest())
  const nonce = b64url(randomBytes(24))
  const authorize = new URL('https://api.whop.com/oauth/authorize')
  authorize.searchParams.set('client_id', clientId)
  authorize.searchParams.set('redirect_uri', redirectUri)
  authorize.searchParams.set('response_type', 'code')
  authorize.searchParams.set('scope', 'openid profile email')
  authorize.searchParams.set('state', state)
  authorize.searchParams.set('code_challenge', challenge)
  authorize.searchParams.set('code_challenge_method', 'S256')
  authorize.searchParams.set('nonce', nonce)

  // Store the complete PKCE state in ONE cookie. This avoids relying on
  // multiple Set-Cookie headers surviving the Netlify redirect unchanged.
  const pkce = b64url(JSON.stringify({ state, verifier, nonce, returnPath: safeReturn }))
  const headers = new Headers({ Location: authorize.toString() })
  headers.append('Set-Cookie', cookie(PKCE_COOKIE, pkce))
  return new Response(null, { status: 302, headers })
}

async function callback(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code') || ''
  const state = url.searchParams.get('state') || ''
  const pkceRaw = getCookie(request, PKCE_COOKIE)
  let pkce: { state: string; verifier: string; nonce: string; returnPath: string } | null = null
  try {
    pkce = pkceRaw ? JSON.parse(Buffer.from(pkceRaw, 'base64url').toString('utf8')) : null
  } catch {
    pkce = null
  }
  const redirectUri = `${url.origin}/api/whop-auth?action=callback`
  if (!code || !state || !pkce || state !== pkce.state || !pkce.verifier || !pkce.nonce) return new Response('Invalid Whop login state.', { status: 400 })
  const verifier = pkce.verifier
  const returnPath = pkce.returnPath || '/'
  const clientId = env('WHOP_APP_ID')
  const clientSecret = env('WHOP_APP_SECRET')
  if (!clientId || !clientSecret) return new Response('Whop OAuth is not configured.', { status: 500 })

  const tokenResponse = await fetch('https://api.whop.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ grant_type: 'authorization_code', client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, code, code_verifier: verifier }),
  })
  if (!tokenResponse.ok) {
    const details = await tokenResponse.text()
    return new Response(`Whop login could not be completed. ${details}`, { status: 502 })
  }
  const token = await tokenResponse.json() as { access_token?: string; id_token?: string }
  if (!token.access_token) return new Response('Whop did not return an access token.', { status: 502 })

  // Whop requires a nonce when using the openid scope. Verify the returned
  // ID token before trusting the user identity.
  if (token.id_token) {
    try {
      const payload = JSON.parse(Buffer.from(token.id_token.split('.')[1], 'base64url').toString('utf8')) as { nonce?: string }
      if (payload.nonce !== pkce.nonce) return new Response('Whop login nonce mismatch.', { status: 400 })
    } catch {
      return new Response('Invalid Whop ID token.', { status: 400 })
    }
  }

  const userResponse = await fetch('https://api.whop.com/oauth/userinfo', { headers: { Authorization: `Bearer ${token.access_token}` } })
  if (!userResponse.ok) return new Response('Unable to retrieve your Whop account.', { status: 502 })
  const user = await userResponse.json() as { sub?: string; name?: string }
  if (!user.sub) return new Response('Whop account ID was not returned.', { status: 502 })

  const headers = new Headers({ Location: returnPath.startsWith('/') && !returnPath.startsWith('//') ? returnPath : '/' })
  headers.append('Set-Cookie', cookie(COOKIE, encryptSession({ userId: user.sub, name: user.name }), 'Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000'))
  headers.append('Set-Cookie', cookie(PKCE_COOKIE, '', 'Path=/; Max-Age=0'))
  return new Response(null, { status: 302, headers })
}

async function logout(request: Request) {
  return new Response(null, { status: 302, headers: { Location: new URL(request.url).searchParams.get('return') || '/', 'Set-Cookie': `${COOKIE}=; Path=/; Max-Age=0` } })
}

export default async (request: Request) => {
  const action = new URL(request.url).searchParams.get('action') || 'login'
  try {
    if (action === 'login') return login(request)
    if (action === 'callback') return callback(request)
    if (action === 'logout') return logout(request)
    if (action === 'session') {
      const session = decryptSession(getCookie(request, COOKIE))
      return Response.json({ authenticated: !!session, user: session ? { name: session.name } : null })
    }
    return new Response('Not found', { status: 404 })
  } catch (error) {
    return new Response(error instanceof Error ? error.message : 'Authentication error.', { status: 500 })
  }
}

export const config: Config = { path: '/api/whop-auth' }
