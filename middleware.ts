import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Define redirects
  const redirects: Record<string, string> = {
    '/fransize': '/franchise-models',
    '/fransiza-modeli': '/franchise-models',
    '/metodologija': '/methodology',
    '/price-uspesne': '/uspeh',
    '/dogadjaji': '/zakazivanje',
    '/newsletter': '/zakazivanje',
    '/kontakt': '/zakazivanje',
  }

  // Check if the current path needs a redirect
  if (redirects[pathname]) {
    const url = new URL(redirects[pathname], request.url)
    return NextResponse.redirect(url, { status: 301 })
  }

  // Create response
  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // Content Security Policy
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://www.gstatic.com https://cdn.sanity.io;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https: blob:;
    connect-src 'self' https://cdn.sanity.io https://api.sanity.io https://www.google-analytics.com https://vitals.vercel-insights.com https://region1.google-analytics.com;
    frame-src 'self' https://calendly.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim()
  
  response.headers.set('Content-Security-Policy', cspHeader)

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - studio (Sanity Studio)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|studio).*)',
  ],
}
