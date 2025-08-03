// SEO related types

export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  ogType?: 'website' | 'article' | 'product'
  canonicalUrl?: string
  noindex?: boolean
  structuredData?: StructuredData
}

export interface StructuredData {
  '@context': 'https://schema.org'
  '@type': string
  [key: string]: any
}

// Specific page types
export interface PageSEO extends SEOData {
  breadcrumbs?: BreadcrumbItem[]
}

export interface BlogPostSEO extends PageSEO {
  author: {
    name: string
    image?: string
  }
  publishedAt: string
  modifiedAt?: string
  readingTime?: number
  category?: string
  tags?: string[]
}

export interface ProductSEO extends PageSEO {
  price?: number
  currency?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  brand?: string
  sku?: string
}

export interface BreadcrumbItem {
  name: string
  url: string
}

// Default SEO values
export const DEFAULT_SEO: SEOData = {
  title: 'Srećno učenje - Franšiza za decu',
  description: 'Pridružite se Srećnom učenju - vodećoj franšizi za predškolce u Srbiji. Obrazovni programi koji razvijaju kreativnost i znanje dece.',
  keywords: ['franšiza', 'deca', 'obrazovanje', 'predškolci', 'Srbija'],
  ogImage: '/images/og-default.jpg',
  ogType: 'website'
}