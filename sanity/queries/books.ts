import { groq } from 'next-sanity'
import { sanityFetch } from '@/lib/sanity.client'

// Query for books landing page data
export const booksLandingQuery = groq`
  *[_type == "booksLanding"][0] {
    heroTitle,
    heroSubtitle,
    heroDescription,
    heroBackgroundImage,
    seriesTitle,
    seriesDescription,
    seriesValues[] {
      title,
      description,
      icon
    },
    authorSection {
      title,
      description,
      image,
      linkToAbout,
      ctaText
    },
    showBooksCarousel,
    booksCarouselTitle,
    ctaSection {
      title,
      description,
      primaryButton {
        text,
        url
      },
      secondaryButton {
        text,
        url
      }
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage,
      keywords
    }
  }
`

// Query for all books
export const allBooksQuery = groq`
  *[_type == "book"] | order(order asc) {
    _id,
    title,
    slug,
    subtitle,
    year,
    colorTheme,
    order,
    coverImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    heroIllustration {
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    heroText,
    aboutBook,
    fairy {
      name,
      description,
      virtues,
      illustration {
        asset-> {
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt
      },
      birthDate,
      secretPlace
    },
    childCharacters[] {
      name,
      description,
      characteristics,
      illustration {
        asset-> {
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt
      }
    },
    reviews[] {
      text,
      author,
      title,
      rating
    },
    purchaseLinks[] {
      storeName,
      url,
      type,
      price
    },
    galleryImages[] {
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage,
      keywords
    }
  }
`

// Query for single book by slug
export const bookBySlugQuery = groq`
  *[_type == "book" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    subtitle,
    year,
    colorTheme,
    order,
    coverImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    heroIllustration {
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    heroText,
    aboutBook,
    fairy {
      name,
      description,
      virtues,
      illustration {
        asset-> {
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt
      },
      birthDate,
      secretPlace
    },
    childCharacters[] {
      name,
      description,
      characteristics,
      illustration {
        asset-> {
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt
      }
    },
    reviews[] {
      text,
      author,
      title,
      rating
    },
    purchaseLinks[] {
      storeName,
      url,
      type,
      price
    },
    galleryImages[] {
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset-> {
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt
      },
      keywords
    }
  }
`

// Fetch functions
export async function getBooksLandingData() {
  try {
    return await sanityFetch({ query: booksLandingQuery })
  } catch (error) {
    console.error('Error fetching books landing data:', error)
    return null
  }
}

export async function getAllBooks() {
  try {
    return await sanityFetch({ query: allBooksQuery })
  } catch (error) {
    console.error('Error fetching books:', error)
    return []
  }
}

export async function getBookBySlug(slug: string) {
  try {
    return await sanityFetch({ query: bookBySlugQuery, params: { slug } })
  } catch (error) {
    console.error('Error fetching book by slug:', error)
    return null
  }
}

// Types
export interface Book {
  _id: string
  title: string
  slug: { current: string }
  subtitle?: string
  year: number
  colorTheme: 'yellow' | 'blue' | 'green' | 'red'
  order: number
  coverImage?: {
    asset: {
      _id: string
      url: string
      metadata: {
        dimensions: { width: number; height: number }
        lqip: string
      }
    }
    alt?: string
  }
  heroIllustration?: {
    asset: {
      _id: string
      url: string
      metadata: {
        dimensions: { width: number; height: number }
        lqip: string
      }
    }
    alt?: string
  }
  heroText: string
  aboutBook: any[] // Portable text
  fairy: {
    name: string
    description: string
    virtues: string[]
    illustration?: {
      asset: {
        _id: string
        url: string
        metadata: {
          dimensions: { width: number; height: number }
          lqip: string
        }
      }
      alt?: string
    }
    birthDate?: string
    secretPlace?: string
  }
  childCharacters: Array<{
    name: string
    description: string
    characteristics: string[]
    illustration?: {
      asset: {
        _id: string
        url: string
        metadata: {
          dimensions: { width: number; height: number }
          lqip: string
        }
      }
      alt?: string
    }
  }>
  reviews: Array<{
    text: string
    author: string
    title?: string
    rating?: number
  }>
  purchaseLinks: Array<{
    storeName: string
    url: string
    type: 'online' | 'physical'
    price?: number
  }>
  galleryImages: Array<{
    asset: {
      _id: string
      url: string
      metadata: {
        dimensions: { width: number; height: number }
        lqip: string
      }
    }
    alt?: string
  }>
  seo: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: {
      asset: {
        _id: string
        url: string
        metadata: {
          dimensions: { width: number; height: number }
          lqip: string
        }
      }
      alt?: string
    }
    keywords?: string[]
  }
}

export interface BooksLandingData {
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  heroBackgroundImage?: {
    asset: {
      _id: string
      url: string
      metadata: {
        dimensions: { width: number; height: number }
        lqip: string
      }
    }
    alt?: string
  }
  seriesTitle: string
  seriesDescription: any[] // Portable text
  seriesValues: Array<{
    title: string
    description: string
    icon: string
  }>
  authorSection: {
    title: string
    description: any[] // Portable text
    image?: {
      asset: {
        _id: string
        url: string
        metadata: {
          dimensions: { width: number; height: number }
          lqip: string
        }
      }
      alt?: string
    }
    linkToAbout: string
    ctaText: string
  }
  showBooksCarousel: boolean
  booksCarouselTitle: string
  ctaSection: {
    title: string
    description: string
    primaryButton: {
      text: string
      url: string
    }
    secondaryButton: {
      text: string
      url: string
    }
  }
  seo: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: {
      asset: {
        _id: string
        url: string
        metadata: {
          dimensions: { width: number; height: number }
          lqip: string
        }
      }
      alt?: string
    }
    keywords?: string[]
  }
}