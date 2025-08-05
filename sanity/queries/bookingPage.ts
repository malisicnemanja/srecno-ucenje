import { client } from '@/sanity/client.js'

// Query for booking page data
export const bookingPageQuery = `
  *[_type == "bookingPage"][0] {
    title,
    hero {
      title,
      subtitle,
      badge,
      benefits[] {
        icon,
        title,
        description
      }
    },
    whySection {
      title,
      subtitle,
      reasons[] {
        icon,
        color,
        title,
        description
      }
    },
    howItWorks {
      title,
      subtitle,
      steps[] {
        number,
        title,
        description,
        icon
      }
    },
    phoneCTA {
      title,
      subtitle,
      phoneNumber,
      workingHours
    },
    faqSection {
      title,
      subtitle,
      ctaText,
      ctaLink
    },
    calendly {
      url,
      prefillName,
      prefillEmail,
      hideGdprBanner
    },
    seo {
      metaTitle,
      metaDescription,
      keywords
    }
  }
`

// Fetch function
export async function getBookingPageData() {
  try {
    return await client.fetch(bookingPageQuery)
  } catch (error) {
    console.error('Error fetching booking page data:', error)
    return null
  }
}

// Types
export interface BookingPageData {
  title: string
  hero: {
    title: string
    subtitle?: string
    badge?: string
    benefits?: Array<{
      icon: string
      title: string
      description?: string
    }>
  }
  whySection?: {
    title: string
    subtitle?: string
    reasons?: Array<{
      icon: string
      color: string
      title: string
      description: string
    }>
  }
  howItWorks?: {
    title: string
    subtitle?: string
    steps?: Array<{
      number: string
      title: string
      description: string
      icon: string
    }>
  }
  phoneCTA?: {
    title: string
    subtitle?: string
    phoneNumber: string
    workingHours?: string
  }
  faqSection?: {
    title: string
    subtitle?: string
    ctaText: string
    ctaLink: string
  }
  calendly?: {
    url: string
    prefillName?: boolean
    prefillEmail?: boolean
    hideGdprBanner?: boolean
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
}