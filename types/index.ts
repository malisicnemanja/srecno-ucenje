// Common types used across the application

export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface Image {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface Slug {
  current: string
  _type: 'slug'
}

// Calculator types
export interface CalculatorInputs {
  model: string
  city: string
  squareMeters: number
  renovationLevel: 'basic' | 'standard' | 'premium'
}

export interface CalculatorResults {
  totalInvestment: number
  monthlyRevenue: number
  monthlyExpenses: number
  breakEvenMonths: number
  threeYearProjection: number
  breakdown: {
    franchiseFee: number
    renovationCost: number
    equipmentCost: number
    monthlyOperational: number
  }
}

export interface ROIInputs {
  childrenCount: number
  pricePerChild: number
  workingHours: number
  occupancyRate: number
  city: string
}

export interface ROIResults {
  monthlyRevenue: number
  yearlyRevenue: number
  revenuePerHour: number
  revenuePerChild: number
  profitMargin: number
  recommendedPrice: number
}

// Quiz types
export interface QuizQuestion {
  question: string
  type: 'multiple_choice' | 'scale' | 'boolean' | 'multiple_select'
  answers?: {
    text: string
    value: number
    category?: string
  }[]
  weight: number
}

export interface QuizResult {
  minScore: number
  maxScore: number
  title: string
  description: string
  recommendations: string[]
  ctaText?: string
  ctaLink?: string
}

// Booking types
export interface BookingFormData {
  name: string
  email: string
  phone: string
  consultationType: string
  date: Date | null
  time: string
  message: string
}

// Resource types
export interface Resource extends SanityDocument {
  title: string
  slug: Slug
  category: 'guides' | 'templates' | 'checklists' | 'ebooks' | 'whitepapers'
  description: string
  resourceType: 'pdf' | 'doc' | 'xls' | 'video'
  fileSize: number
  pages?: number
  requiresLead: boolean
  tags: string[]
  featured: boolean
  downloadCount: number
  fileUrl: string
  thumbnail?: Image
}

// Blog types
export interface BlogPost extends SanityDocument {
  title: string
  slug: Slug
  excerpt: string
  content: any[] // Portable text
  author: {
    name: string
    image?: Image
  }
  categories: string[]
  tags: string[]
  publishedAt: string
  readTime: number
  featured: boolean
  image?: Image
}

// Lead types
export interface LeadInfo {
  name?: string
  email: string
  phone?: string
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Newsletter types
export interface NewsletterSubscriber {
  email: string
  name?: string
  interests?: string[]
  subscribedAt: string
  isActive: boolean
  source: string
}

// Location types
export interface Location {
  _id: string
  name: string
  address: string
  city: string
  coordinates: {
    lat: number
    lng: number
  }
  type: 'owned' | 'franchise'
  isActive: boolean
  contactEmail?: string
  contactPhone?: string
  workingHours?: string
}

// Settings types
export interface SiteSettings {
  title: string
  description: string
  keywords: string[]
  socialMedia: {
    facebook?: string
    instagram?: string
    linkedin?: string
    youtube?: string
  }
  contact: {
    email: string
    phone: string
    address: string
  }
  apiKeys?: {
    googleMapsApiKey?: string
    googleAnalyticsId?: string
    facebookPixelId?: string
    recaptchaSiteKey?: string
  }
}