import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://srecno-ucenje.rs'
  
  // Static pages
  const staticPages = [
    '',
    '/methodology',
    '/franchise-models',
    '/lokacije',
    '/uspeh',
    '/o-autorki',
    '/resursi',
    '/kalkulatori',
    '/kvizovi',
    '/ucionica',
    '/3d-ucionica',
    '/zakazivanje',
    '/kontakt',
    '/faq',
    '/blog',
    '/obuka-mentorstvo',
    '/kako-se-pridruziti',
    '/knjige',
    '/legal/privatnost',
    '/legal/uslovi-koriscenja'
  ]

  const currentDate = new Date().toISOString()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${staticPages
  .map((page) => {
    const priority = page === '' ? '1.0' : 
                    ['methodology', 'franchise-models', 'zakazivanje'].includes(page.replace('/', '')) ? '0.9' :
                    ['lokacije', 'uspeh', 'faq', 'kako-se-pridruziti'].includes(page.replace('/', '')) ? '0.8' :
                    '0.7'
    
    const changefreq = page === '' ? 'weekly' :
                      ['blog', 'uspeh'].includes(page.replace('/', '')) ? 'weekly' :
                      ['methodology', 'franchise-models', 'zakazivanje'].includes(page.replace('/', '')) ? 'monthly' :
                      'yearly'

    return `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  })
  .join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200'
    }
  })
}