import { Metadata } from 'next'
import { SEOData, BlogPostSEO, ProductSEO, StructuredData, DEFAULT_SEO } from '@/types/seo'
import { SITE_CONFIG } from '@/utils/constants'

// Generate metadata for pages
export function generateMetadata(seoData: Partial<SEOData>): Metadata {
  const {
    title,
    description,
    keywords,
    ogImage,
    ogType = 'website' as 'website' | 'article',
    canonicalUrl,
    noindex = false
  } = { ...DEFAULT_SEO, ...seoData }

  const fullTitle = title.includes(SITE_CONFIG.name) 
    ? title 
    : `${title} | ${SITE_CONFIG.name}`

  const baseUrl = SITE_CONFIG.url
  const imageUrl = ogImage?.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`

  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(', '),
    robots: noindex ? 'noindex,nofollow' : 'index,follow',
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      type: ogType,
      url: canonicalUrl || baseUrl,
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title
      }],
      siteName: SITE_CONFIG.name,
      locale: 'sr_RS'
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl]
    },
    
    // Canonical URL
    ...(canonicalUrl && { alternates: { canonical: canonicalUrl } }),
    
    // Additional meta
    other: {
      'theme-color': '#16a34a'
    }
  }
}

// Generate blog post metadata
export function generateBlogMetadata(post: BlogPostSEO): Metadata {
  const baseMetadata = generateMetadata({
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    ogImage: post.ogImage,
    ogType: 'article',
    canonicalUrl: post.canonicalUrl
  })

  return {
    ...baseMetadata,
    authors: [{ name: post.author.name }],
    
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
      authors: [post.author.name],
      section: post.category,
      tags: post.tags
    },
    
    // Article specific
    other: {
      ...baseMetadata.other,
      'article:published_time': post.publishedAt,
      'article:modified_time': post.modifiedAt,
      'article:author': post.author.name,
      'article:section': post.category,
      'article:tag': post.tags?.join(',')
    }
  }
}

// Generate product metadata  
export function generateProductMetadata(product: ProductSEO): Metadata {
  const baseMetadata = generateMetadata({
    title: product.title,
    description: product.description,
    keywords: product.keywords,
    ogImage: product.ogImage,
    ogType: 'product',
    canonicalUrl: product.canonicalUrl
  })

  return {
    ...baseMetadata,
    
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'website',
      ...(product.price && {
        priceAmount: product.price.toString(),
        priceCurrency: product.currency || 'EUR'
      })
    },
    
    // Product specific
    other: {
      ...baseMetadata.other,
      ...(product.price && {
        'product:price:amount': product.price.toString(),
        'product:price:currency': product.currency || 'EUR'
      }),
      ...(product.availability && {
        'product:availability': product.availability
      })
    }
  }
}

// Generate structured data
export function generateStructuredData(data: StructuredData): string {
  return JSON.stringify(data)
}

// Common structured data generators
export function generateOrganizationSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo.png`,
    description: DEFAULT_SEO.description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RS',
      addressLocality: 'Beograd'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+381-11-123-4567',
      contactType: 'Customer Service',
      availableLanguage: 'Serbian'
    },
    sameAs: [
      'https://www.facebook.com/srecnoucenje',
      'https://www.instagram.com/srecnoucenje'
    ]
  }
}

export function generateWebsiteSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: DEFAULT_SEO.description,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }
}

export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string, url: string }>): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.url}${item.url}`
    }))
  }
}

export function generateFAQSchema(faqItems: Array<{ question: string, answer: string }>): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }
}