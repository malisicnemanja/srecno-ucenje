import { MetadataRoute } from 'next'
import { baseUrl } from '@/lib/seo-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio',
          '/studio/*',
          '/api/*',
          '/admin/*',
          '/_next/*',
          '/test-*',
          '/button-test',
          '*.json',
          '*?preview=true',
          '*?draft=true',
        ],
      },
      // Special rules for search engine crawlers
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/studio',
          '/api/*',
          '/admin/*',
          '/_next/*',
          '/test-*',
          '*?preview=true',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/studio',
          '/api/*',
          '/admin/*',
          '/_next/*',
          '/test-*',
          '*?preview=true',
        ],
        crawlDelay: 2,
      },
      // Block common spam bots
      {
        userAgent: [
          'SemrushBot',
          'AhrefsBot',
          'MJ12bot',
          'DotBot',
          'BLEXBot',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}