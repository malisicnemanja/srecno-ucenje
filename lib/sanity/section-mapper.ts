/**
 * Section Mapper za PageBuilder
 * Mapira CMS sekcije na React komponente sa lazy loading
 */

import { lazy } from 'react'
import { 
  SanitySection, 
  SupportedSectionType,
  isSupportedSectionType 
} from '@/types/sections'
import { BrandColor, getSectionColor } from '@/lib/color-rotation'

// Lazy loading komponenti za performanse
const HeroSection = lazy(() => import('@/components/features/cms/HeroSection'))
const CardsGridSection = lazy(() => import('@/components/features/cms/CardsGridSection'))
const TimelineSection = lazy(() => import('@/components/features/cms/TimelineSection'))
const TestimonialsSection = lazy(() => import('@/components/features/cms/TestimonialsSection'))
const FAQSection = lazy(() => import('@/components/features/cms/FAQSection'))
const CTASection = lazy(() => import('@/components/features/cms/CTASection'))
const StatsSection = lazy(() => import('@/components/features/cms/StatsSection'))
const GallerySection = lazy(() => import('@/components/features/cms/GallerySection'))
const ContentSection = lazy(() => import('@/components/features/cms/ContentSection'))
const PricingSection = lazy(() => import('@/components/features/cms/PricingSection'))

// Mapa komponenti
const COMPONENT_MAP = {
  hero: HeroSection,
  cardsGrid: CardsGridSection,
  timeline: TimelineSection,
  testimonials: TestimonialsSection,
  faq: FAQSection,
  cta: CTASection,
  stats: StatsSection,
  gallery: GallerySection,
  content: ContentSection,
  pricing: PricingSection,
} as const

// Fallback komponenta za nepoznate sekcije
const UnknownSection = lazy(() => import('@/components/features/cms/UnknownSection'))

/**
 * Dobijanje React komponente za dati tip sekcije
 */
export const getSectionComponent = (sectionType: string) => {
  if (isSupportedSectionType(sectionType)) {
    return COMPONENT_MAP[sectionType]
  }
  return UnknownSection
}

/**
 * Validacija sekcije pre renderovanja
 */
export const validateSection = (section: any): section is SanitySection => {
  if (!section || typeof section !== 'object') {
    return false
  }

  // Obavezna polja
  if (!section._id || !section._type) {
    console.warn('Section missing required fields (_id, _type):', section)
    return false
  }

  // Proveri da li je tip podržan
  if (!isSupportedSectionType(section._type)) {
    console.warn('Unsupported section type:', section._type)
    return false
  }

  return true
}

/**
 * Processovanje sekcije sa color rotation
 */
export const processSection = (
  section: SanitySection,
  index: number,
  pageType: 'franchise' | 'education' | 'about' | 'calculator' | 'location' = 'franchise'
): SanitySection & { sectionColor: BrandColor; sectionIndex: number } => {
  const sectionColor = getSectionColor(pageType, index)
  
  return {
    ...section,
    sectionColor,
    sectionIndex: index,
    // Override backgroundColor ako nije eksplicitno setovan
    backgroundColor: section.backgroundColor || sectionColor,
  }
}

/**
 * Batch processovanje svih sekcija
 */
export const processSections = (
  sections: any[],
  pageType: 'franchise' | 'education' | 'about' | 'calculator' | 'location' = 'franchise'
) => {
  return sections
    .filter(validateSection)
    .map((section, index) => processSection(section, index, pageType))
}

/**
 * Metadata ekstraktovanje iz sekcije
 */
export const extractSectionMetadata = (section: SanitySection) => {
  const metadata = {
    id: section._id,
    type: section._type,
    title: section.title || '',
    hasContent: true,
    estimatedHeight: 'auto' as const,
    requiresInteraction: false,
    seoWeight: 1, // 1-5, important za SEO
  }

  // Specifična metadata po tipu
  switch (section._type) {
    case 'hero':
      metadata.estimatedHeight = 'screen'
      metadata.seoWeight = 5
      break
      
    case 'cta':
      metadata.requiresInteraction = true
      metadata.seoWeight = 4
      break
      
    case 'testimonials':
      metadata.requiresInteraction = true
      metadata.seoWeight = 3
      break
      
    case 'faq':
      metadata.requiresInteraction = true
      metadata.seoWeight = 3
      break
      
    case 'content':
      metadata.seoWeight = 4
      break
      
    case 'pricing':
      metadata.requiresInteraction = true
      metadata.seoWeight = 4
      break
      
    default:
      metadata.seoWeight = 2
  }

  return metadata
}

/**
 * Performance hints za različite sekcije
 */
export const getSectionPerformanceHints = (section: SanitySection) => {
  const hints = {
    priority: 'normal' as 'high' | 'normal' | 'low',
    preload: false,
    lazy: true,
    prefetch: false,
  }

  switch (section._type) {
    case 'hero':
      hints.priority = 'high'
      hints.preload = true
      hints.lazy = false
      break
      
    case 'cta':
      hints.priority = 'high'
      hints.prefetch = true
      break
      
    case 'gallery':
      hints.priority = 'low'
      hints.prefetch = true
      break
      
    case 'testimonials':
      hints.prefetch = true
      break
  }

  return hints
}

/**
 * Analytics tracking setup
 */
export const getSectionAnalytics = (section: SanitySection, index: number) => {
  return {
    sectionId: section._id,
    sectionType: section._type,
    sectionIndex: index,
    sectionTitle: section.title || '',
    trackingEvents: {
      view: `section_${section._type}_view`,
      interact: `section_${section._type}_interact`,
      complete: `section_${section._type}_complete`,
    }
  }
}

/**
 * Error handling utilities
 */
export const handleSectionError = (error: Error, section: SanitySection, index: number) => {
  console.error(`Error rendering section ${section._type} at index ${index}:`, error)
  
  // Log to analytics/monitoring service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'section_error', {
      section_type: section._type,
      section_id: section._id,
      section_index: index,
      error_message: error.message,
    })
  }

  return {
    error: true,
    message: error.message,
    sectionType: section._type,
    sectionId: section._id,
  }
}

/**
 * Development utilities
 */
export const getDebugInfo = (section: SanitySection, index: number) => {
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return {
    sectionInfo: {
      id: section._id,
      type: section._type,
      index,
      title: section.title,
      backgroundColor: section.backgroundColor,
    },
    componentInfo: {
      component: COMPONENT_MAP[section._type as SupportedSectionType]?.name || 'Unknown',
      lazy: true,
    },
    performance: getSectionPerformanceHints(section),
    metadata: extractSectionMetadata(section),
  }
}

/**
 * Export utilities
 */
export default {
  getSectionComponent,
  validateSection,
  processSection,
  processSections,
  extractSectionMetadata,
  getSectionPerformanceHints,
  getSectionAnalytics,
  handleSectionError,
  getDebugInfo,
}