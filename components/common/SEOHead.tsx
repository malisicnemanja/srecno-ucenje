'use client'

import Head from 'next/head'
import { SEOData, StructuredData } from '@/types/seo'
import { generateStructuredData } from '@/lib/seo'

interface SEOHeadProps {
  seoData: SEOData
  structuredData?: StructuredData | StructuredData[]
}

export default function SEOHead({ seoData, structuredData }: SEOHeadProps) {
  const renderStructuredData = () => {
    if (!structuredData) return null

    const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData]
    
    return dataArray.map((data, index) => (
      <script
        key={index}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateStructuredData(data)
        }}
      />
    ))
  }

  return (
    <Head>
      {/* Canonical URL */}
      {seoData.canonicalUrl && (
        <link rel="canonical" href={seoData.canonicalUrl || '/'} />
      )}
      
      {/* Robots */}
      <meta 
        name="robots" 
        content={seoData.noindex ? 'noindex,nofollow' : 'index,follow'} 
      />
      
      {/* Structured Data */}
      {renderStructuredData()}
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.sanity.io" />
      
      {/* DNS prefetch for performance */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      
      {/* Favicon and icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Theme color */}
      <meta name="theme-color" content="#16a34a" />
      <meta name="msapplication-TileColor" content="#16a34a" />
      
      {/* Viewport for mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    </Head>
  )
}