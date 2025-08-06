import { groq } from 'next-sanity'
import { sanityFetch } from '@/lib/sanity.client'

// Query for site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    logo {
      asset-> {
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    email,
    phone,
    address,
    workingHours[] {
      day,
      hours
    },
    socialLinks[] {
      platform,
      url
    },
    googleMapsApiKey,
    googleAnalyticsId,
    facebookPixelId,
    recaptchaSiteKey,
    defaultSeo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage {
        asset-> {
          url
        }
      }
    },
    navigationSettings {
      mainMenu[] {
        title,
        url,
        order,
        highlighted
      },
      footerMenu[] {
        title,
        url
      }
    },
    colorPalette {
      primaryColor,
      secondaryColor,
      accentColor,
      warmColor
    }
  }
`

// Fetch function
export async function getSiteSettings() {
  try {
    return await sanityFetch({ query: siteSettingsQuery })
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

// Types
export interface SiteSettings {
  siteName: string
  siteDescription?: string
  logo?: {
    asset: {
      url: string
      metadata?: {
        dimensions: { width: number; height: number }
        lqip: string
      }
    }
  }
  email?: string
  phone?: string
  address?: string
  workingHours?: Array<{
    day: string
    hours: string
  }>
  socialLinks?: Array<{
    platform: string
    url: string
  }>
  googleMapsApiKey?: string
  googleAnalyticsId?: string
  facebookPixelId?: string
  recaptchaSiteKey?: string
  defaultSeo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
    ogImage?: {
      asset: {
        url: string
      }
    }
  }
  navigationSettings?: {
    mainMenu?: Array<{
      title: string
      url: string
      order?: number
      highlighted?: boolean
    }>
    footerMenu?: Array<{
      title: string
      url: string
    }>
  }
  colorPalette?: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    warmColor: string
  }
}