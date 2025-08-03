// This file configures a tunnel route for Sentry, allowing for better error tracking
// even when ad blockers are present
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const envelope = await request.text()
    const pieces = envelope.split('\n')
    const header = JSON.parse(pieces[0])
    
    // Get the DSN from Sentry header
    const dsn = header.dsn
    if (!dsn) {
      return new Response('Missing DSN', { status: 400 })
    }
    
    // Extract the project ID from DSN
    const dsnUrl = new URL(dsn)
    const projectId = dsnUrl.pathname.replace('/', '')
    
    // Forward to Sentry's ingest API
    const sentryUrl = `https://sentry.io/api/${projectId}/envelope/`
    
    const response = await fetch(sentryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-sentry-envelope',
      },
      body: envelope,
    })
    
    return new Response(null, { status: response.status })
  } catch (error) {
    console.error('Sentry tunnel error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}