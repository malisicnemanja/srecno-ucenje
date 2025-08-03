import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://srecno-ucenje.rs'
  
  const robotsTxt = `User-agent: *
Allow: /

# Block admin and development routes
Disallow: /studio/
Disallow: /api/
Disallow: /_next/
Disallow: /_vercel/

# Allow important pages
Allow: /methodology
Allow: /franchise-models
Allow: /zakazivanje
Allow: /kontakt
Allow: /faq
Allow: /blog
Allow: /lokacije
Allow: /uspeh

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay (be nice to servers)
Crawl-delay: 1`

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400'
    }
  })
}