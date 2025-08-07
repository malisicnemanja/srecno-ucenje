/**
 * TypeScript tipovi za PageBuilder sekcije
 * Kompletni tipovi za sve podržane CMS sekcije
 */

import { BrandColor } from '@/lib/color-rotation'

// Base interface za sve sekcije
export interface BaseSectionProps {
  _id: string
  _type: string
  title?: string
  subtitle?: string
  backgroundColor?: BrandColor
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  isPreview?: boolean
}

// Button interface
export interface ButtonProps {
  text: string
  href: string
  variant: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
}

// Hero sekcija sa 4 varijante
export interface HeroSectionProps extends BaseSectionProps {
  _type: 'hero'
  layout: 'split-left' | 'split-right' | 'centered' | 'full-stats'
  title: string
  alternatingWords?: string[]
  subtitle?: string
  buttons?: ButtonProps[]
  visual?: {
    type: 'image' | 'illustration' | 'video' | 'lottie'
    src: string
    alt?: string
    caption?: string
  }
  floatingElements?: Array<{
    id: string
    type: 'circle' | 'triangle' | 'square' | 'star' | 'wave'
    position: Record<string, string>
    size: 'sm' | 'md' | 'lg'
    color: BrandColor
    animation?: 'float' | 'pulse' | 'rotate' | 'drift'
  }>
  stats?: Array<{
    value: string
    label: string
    suffix?: string
    animated?: boolean
  }>
}

// Cards Grid sekcija
export interface CardsGridSectionProps extends BaseSectionProps {
  _type: 'cardsGrid'
  cards: Array<{
    id: string
    title: string
    description: string
    icon?: string
    image?: string
    href?: string
    tags?: string[]
    price?: string
    badge?: string
  }>
  layout: 'grid-2' | 'grid-3' | 'grid-4' | 'masonry'
  cardStyle: 'elevated' | 'outlined' | 'minimal' | 'gradient'
}

// Timeline sekcija
export interface TimelineSectionProps extends BaseSectionProps {
  _type: 'timeline'
  steps: Array<{
    id: string
    title: string
    description: string
    icon?: string
    image?: string
    date?: string
    status?: 'completed' | 'active' | 'upcoming'
  }>
  layout: 'vertical' | 'horizontal' | 'alternating'
  showConnectors?: boolean
}

// Testimonials sekcija
export interface TestimonialsSectionProps extends BaseSectionProps {
  _type: 'testimonials'
  testimonials: Array<{
    id: string
    content: string
    author: {
      name: string
      role?: string
      company?: string
      avatar?: string
    }
    rating?: number
    verified?: boolean
    location?: string
  }>
  layout: 'slider' | 'grid' | 'single-featured'
  showRatings?: boolean
}

// FAQ sekcija
export interface FAQSectionProps extends BaseSectionProps {
  _type: 'faq'
  faqs: Array<{
    id: string
    question: string
    answer: string
    category?: string
    featured?: boolean
  }>
  layout: 'accordion' | 'grid' | 'tabs'
  searchable?: boolean
  categories?: string[]
}

// CTA sekcija
export interface CTASectionProps extends BaseSectionProps {
  _type: 'cta'
  title: string
  subtitle?: string
  description?: string
  buttons: ButtonProps[]
  visual?: {
    type: 'image' | 'illustration' | 'video' | 'icon'
    src: string
    alt?: string
  }
  layout: 'banner' | 'split' | 'centered' | 'card'
  urgency?: {
    enabled: boolean
    text?: string
    countdown?: string
  }
}

// Stats sekcija
export interface StatsSectionProps extends BaseSectionProps {
  _type: 'stats'
  stats: Array<{
    id: string
    value: string
    label: string
    description?: string
    icon?: string
    suffix?: string
    prefix?: string
    animated?: boolean
    trend?: {
      direction: 'up' | 'down' | 'neutral'
      percentage?: number
    }
  }>
  layout: 'horizontal' | 'grid' | 'featured'
  showTrends?: boolean
}

// Gallery sekcija
export interface GallerySectionProps extends BaseSectionProps {
  _type: 'gallery'
  images: Array<{
    id: string
    src: string
    alt: string
    caption?: string
    category?: string
    featured?: boolean
  }>
  layout: 'grid' | 'masonry' | 'slider' | 'lightbox'
  categories?: string[]
  filterable?: boolean
}

// Content sekcija
export interface ContentSectionProps extends BaseSectionProps {
  _type: 'content'
  content: any // Portable Text
  layout: 'single-column' | 'two-column' | 'sidebar-left' | 'sidebar-right'
  sidebar?: {
    title?: string
    content?: any
    widgets?: Array<{
      type: 'toc' | 'related' | 'cta' | 'social'
      data: any
    }>
  }
}

// Pricing sekcija
export interface PricingSectionProps extends BaseSectionProps {
  _type: 'pricing'
  plans: Array<{
    id: string
    name: string
    description?: string
    price: {
      amount: number
      currency: string
      period: string
      originalAmount?: number
    }
    features: Array<{
      name: string
      included: boolean
      description?: string
    }>
    button: ButtonProps
    popular?: boolean
    badge?: string
  }>
  layout: 'cards' | 'table' | 'toggle'
  billingToggle?: boolean
}

// Union tip za sve sekcije
export type SanitySection = 
  | HeroSectionProps
  | CardsGridSectionProps
  | TimelineSectionProps
  | TestimonialsSectionProps
  | FAQSectionProps
  | CTASectionProps
  | StatsSectionProps
  | GallerySectionProps
  | ContentSectionProps
  | PricingSectionProps

// PageBuilder props
export interface PageBuilderProps {
  sections: SanitySection[]
  pageType?: 'franchise' | 'education' | 'about' | 'calculator' | 'location'
  isPreview?: boolean
  className?: string
}

// Error boundary props
export interface SectionErrorBoundaryProps {
  children: React.ReactNode
  sectionType: string
  sectionId: string
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>
}

// Preview props
export interface PreviewModeProps {
  enabled: boolean
  editUrl?: string
  onEdit?: (sectionId: string) => void
}

// Export tipovi za validation
export const SUPPORTED_SECTION_TYPES = [
  'hero',
  'cardsGrid',
  'timeline',
  'testimonials',
  'faq',
  'cta',
  'stats',
  'gallery',
  'content',
  'pricing'
] as const

export type SupportedSectionType = typeof SUPPORTED_SECTION_TYPES[number]

// Validator funkcija
export const isSupportedSectionType = (type: string): type is SupportedSectionType => {
  return SUPPORTED_SECTION_TYPES.includes(type as SupportedSectionType)
}