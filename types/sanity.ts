import { Image, PortableTextBlock } from 'sanity'

// Base document type
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

// SEO type
export interface SEO {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogImage?: Image
}

// Author type
export interface Author extends SanityDocument {
  _type: 'author'
  name: string
  slug: { current: string }
  image?: Image
  bio?: string
  title?: string
  email?: string
  socialLinks?: {
    facebook?: string
    instagram?: string
    linkedin?: string
    twitter?: string
  }
  isActive?: boolean
}

// Testimonial type
export interface Testimonial extends SanityDocument {
  _type: 'testimonial'
  name?: string // legacy field
  authorName: string
  role?: string // legacy field
  authorRole: string
  content: string
  rating?: number
  image?: Image
  featured?: boolean
  location?: string
  createdAt: string
}

// Blog Post type
export interface BlogPost extends SanityDocument {
  _type: 'blogPost'
  title: string
  slug: { current: string }
  excerpt?: string
  featuredImage?: Image
  content: PortableTextBlock[]
  tags?: string[]
  categories?: BlogCategory[]
  author: Author
  publishedDate: string
  isFeatured?: boolean
  readingTime?: number // legacy field
  readTime: number
  seo?: SEO
}

// Blog Category type
export interface BlogCategory extends SanityDocument {
  _type: 'blogCategory'
  name: string
  slug: string
  description?: string
  icon?: string
  color?: string
  order?: number
  isActive?: boolean
}

// Program type
export interface Program extends SanityDocument {
  _type: 'program'
  title: string
  slug?: { current: string }
  icon?: string
  description?: string
  fullDescription?: PortableTextBlock[]
  ageRange?: string // legacy field
  ageGroup: string
  duration?: string
  groupSize?: string
  modules?: ProgramModule[]
  benefits?: string[]
  requirements?: {
    basic?: string[]
    desired?: string[]
  }
  pricing?: PricingPlan[]
  order?: number
  color?: string
  isActive?: boolean
}

// Program Module type
export interface ProgramModule {
  icon?: string
  title: string
  description?: string
  topics?: string[]
}

// Pricing Plan type
export interface PricingPlan {
  name: string
  price: number
  currency?: string
  period?: string
  features?: string[]
  highlighted?: boolean
}

// Success Story type
export interface SuccessStory extends SanityDocument {
  _type: 'successStory'
  studentName: string
  age?: string
  program?: Program
  testimonial?: string // legacy field
  content: string
  results?: {
    metric: string
    label: string
  }[]
  beforeSkills?: string[]
  afterSkills?: string[]
  video?: {
    url?: string
    thumbnail?: Image
    description?: string
  }
  featured?: boolean
  publishedAt?: string
  location?: string
  createdAt: string
}

// FAQ type
export interface FAQ extends SanityDocument {
  _type: 'faq'
  question: string
  answer: string
  category?: FAQCategory
  order?: number
  isActive?: boolean
}

// FAQ Category type
export interface FAQCategory extends SanityDocument {
  _type: 'faqCategory'
  name: string
  slug: string
  description?: string
  icon?: string
  color?: string
  order?: number
  isActive?: boolean
}

// Enhanced Hero type
export interface EnhancedHero {
  title: string
  highlightText?: string
  titleVariants?: string[]
  subtitle: string
  animatedNumber?: {
    target?: number
    suffix?: string
    duration?: number
  }
  badge?: string
  primaryCta?: {
    text: string
    link: string
  }
  ctaPrimary?: { // legacy field
    text?: string
    href?: string
  }
  secondaryCta?: {
    text: string
    link: string
  }
  ctaSecondary?: { // legacy field
    text?: string
    href?: string
  }
  features?: {
    icon?: string
    text?: string
  }[]
  backgroundType?: 'none' | 'pattern' | 'image' | 'video' | 'gradient'
  backgroundImage?: Image
  videoBackground?: VideoBackground
  trustBadges?: TrustBadge[]
}

// Video Background type
export interface VideoBackground {
  url?: string
  poster?: Image
  overlay?: boolean
  overlayOpacity?: number
}

// Trust Badge type
export interface TrustBadge {
  icon?: string
  text?: string
  value?: string
}

// Home Page type
export interface HomePage extends SanityDocument {
  _type: 'homePage'
  enhancedHero?: EnhancedHero
  statistics?: Statistic[]
  differentiators?: {
    sectionTitle?: string
    items?: Differentiator[]
  }
  franchiseSteps?: {
    sectionTitle?: string
    steps?: FranchiseStep[]
  }
  franchiseModels?: {
    sectionTitle?: string
    models?: FranchiseModel[]
  }
  successStories?: {
    sectionTitle?: string
    featuredVideo?: string
  }
  homeFaqs?: {
    sectionTitle?: string
    faqs?: FAQ[]
  }
  homeFAQ?: { // legacy field
    sectionTitle?: string
    faqs?: {
      question?: string
      answer?: string
      category?: string
    }[]
  }
  interactiveClassroom?: {
    sectionTitle?: string
    description?: string
    previewImage?: Image
    ctaText?: string
  }
  leadMagnets?: {
    sectionTitle?: string
    resources?: LeadMagnet[]
  }
  newsletter?: {
    title?: string
    description?: string
    incentive?: string
    ctaText?: string
  }
  newsletterCTA?: { // legacy field
    title?: string
    description?: string
    incentive?: string
    ctaText?: string
  }
  seo?: SEO
}

// Statistic type
export interface Statistic {
  number: string
  label: string
  icon?: string
  suffix?: string
}

// Differentiator type
export interface Differentiator {
  icon?: string
  title: string
  description?: string
  highlight?: boolean
}

// Franchise Step type
export interface FranchiseStep {
  number: number
  title: string
  description?: string
  icon?: string
  duration?: string
}

// Franchise Model type
export interface FranchiseModel {
  name: string
  investment?: string
  space?: string
  capacity?: string
  roi?: string
  features?: string[]
  recommended?: boolean
}

// Lead Magnet type
export interface LeadMagnet {
  title: string
  description?: string
  type?: string
  icon?: string
  downloadUrl?: string
  requiresEmail?: boolean
}

// Book type
export interface Book extends SanityDocument {
  _type: 'book'
  title: string
  slug: { current: string }
  subtitle?: string
  year: number
  colorTheme: 'yellow' | 'blue' | 'green' | 'red'
  order: number
  coverImage: Image
  heroIllustration?: Image
  description?: string
  shortDescription?: string
  fairy?: {
    name: string
    description: string
    virtues?: string[]
    illustration?: Image
    birthDate?: string
    secretPlace?: string
  }
  childCharacters?: {
    name: string
    description: string
    characteristics?: string[]
    illustration?: Image
  }[]
  gallery?: Image[]
  reviews?: {
    author?: string
    content?: string
    rating?: number
    source?: string
  }[]
  purchaseLinks?: {
    platform?: string
    url?: string
    price?: number
  }[]
  isbn?: string
  pageCount?: number
  publisher?: string
  seo?: SEO
}

// Site Settings type
export interface SiteSettings extends SanityDocument {
  _type: 'siteSettings'
  siteName?: string
  siteDescription?: string
  logo?: Image
  email?: string
  phone?: string
  address?: string
  workingHours?: string
  socialLinks?: {
    facebook?: string
    instagram?: string
    linkedin?: string
    youtube?: string
    tiktok?: string
  }
  googleMapsApiKey?: string
  googleAnalyticsId?: string
  facebookPixelId?: string
  recaptchaSiteKey?: string
  defaultSeo?: SEO
  navigationSettings?: NavigationSettings
  colorPalette?: {
    primary?: string
    secondary?: string
    accent?: string
  }
}

// Navigation Settings type
export interface NavigationSettings {
  mainMenu?: {
    label: string
    href: string
    subItems?: {
      label: string
      href: string
      description?: string
    }[]
  }[]
  ctaButton?: {
    text?: string
    href?: string
    style?: string
  }
  mobileMenuOrder?: string[]
}

// Export all types
export type {
  Image,
  PortableTextBlock,
}