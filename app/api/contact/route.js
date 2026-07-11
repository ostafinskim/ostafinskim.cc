import {NextResponse} from 'next/server'
import {Resend} from 'resend'
import {site} from '@/data/site'

// Node runtime — Resend SDK expects Node, not edge.
export const runtime = 'nodejs'

// --- validation helpers -----------------------------------------------------
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

// Strip control chars (incl. CR/LF -> blocks email header injection), trim,
// and hard-cap length so a payload can't smuggle headers or flood.
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\x00-\x1F\x7F]/g
const clean = (v, max) =>
	typeof v === 'string' ? v.replace(CONTROL_CHARS, ' ').trim().slice(0, max) : ''

// --- in-memory rate limiter -------------------------------------------------
// Per warm function instance. On serverless a cold start resets it, so it's a
// best-effort throttle, not a hard guarantee — good enough to blunt floods.
const WINDOW_MS = 10 * 60 * 1000 // 10 min
const MAX_HITS = 3
const hits = new Map() // ip -> number[] (timestamps)

const rateLimited = (ip, now) => {
	const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
	if (recent.length >= MAX_HITS) {
		hits.set(ip, recent)
		return true
	}
	recent.push(now)
	hits.set(ip, recent)
	// opportunistic cleanup so the Map can't grow unbounded
	if (hits.size > 5000) {
		for (const [k, v] of hits) {
			if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k)
		}
	}
	return false
}

// --- optional Cloudflare Turnstile verification -----------------------------
// Only enforced when TURNSTILE_SECRET_KEY is set. Free, unlimited, invisible.
async function turnstileOk(token, ip) {
	const secret = process.env.TURNSTILE_SECRET_KEY
	if (!secret) return true // not configured -> skip
	if (typeof token !== 'string' || !token) return false
	try {
		const res = await fetch(
			'https://challenges.cloudflare.com/turnstile/v0/siteverify',
			{
				method: 'POST',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				body: new URLSearchParams({secret, response: token, remoteip: ip}),
			},
		)
		const data = await res.json()
		return data.success === true
	} catch {
		return false
	}
}

// --- handler ----------------------------------------------------------------
export async function POST(request) {
	// Origin check: only accept posts issued from this site.
	const origin = request.headers.get('origin')
	const host = request.headers.get('host')
	if (origin && host) {
		try {
			if (new URL(origin).host !== host) {
				return NextResponse.json({error: 'Forbidden'}, {status: 403})
			}
		} catch {
			return NextResponse.json({error: 'Forbidden'}, {status: 403})
		}
	}

	const ip =
		request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
		request.headers.get('x-nf-client-connection-ip') ||
		'unknown'

	const now = Date.now()

	if (rateLimited(ip, now)) {
		return NextResponse.json(
			{error: 'Too many messages. Please try again later.'},
			{status: 429},
		)
	}

	let body
	try {
		body = await request.json()
	} catch {
		return NextResponse.json({error: 'Invalid request'}, {status: 400})
	}

	const {botField, ts, turnstileToken} = body ?? {}
	const name = clean(body?.name, 100)
	const email = clean(body?.email, 200)
	const message = clean(body?.message, 5000)

	// Honeypot: real users leave this empty; bots fill everything.
	if (typeof botField === 'string' && botField.trim().length > 0) {
		return NextResponse.json({ok: true}) // silently accept + drop
	}

	// Time-trap: a human can't fill and submit in under 3 seconds.
	if (typeof ts === 'number' && now - ts < 3000) {
		return NextResponse.json({ok: true}) // silently drop
	}

	if (!name || !isEmail(email) || !message) {
		return NextResponse.json({error: 'Missing or invalid fields'}, {status: 400})
	}

	if (!(await turnstileOk(turnstileToken, ip))) {
		return NextResponse.json({error: 'Verification failed'}, {status: 400})
	}

	const apiKey = process.env.RESEND_API_KEY
	if (!apiKey) {
		return NextResponse.json({error: 'Email is not configured'}, {status: 500})
	}

	// FROM must be an address on a domain verified in Resend.
	// Falls back to Resend's shared test sender if you haven't verified yet.
	const from = process.env.CONTACT_FROM ?? 'onboarding@resend.dev'

	const resend = new Resend(apiKey)
	const {error} = await resend.emails.send({
		from: `${site.name} — website <${from}>`,
		to: site.email,
		replyTo: `${name} <${email}>`,
		subject: `New contact form message from ${name}`,
		text: `From: ${name} <${email}>\n\n${message}`,
	})

	if (error) {
		return NextResponse.json({error: 'Failed to send message'}, {status: 502})
	}

	return NextResponse.json({ok: true})
}
