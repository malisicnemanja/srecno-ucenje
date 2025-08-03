import { client } from '@/sanity/client.js'

// Query for about author page data
export const aboutAuthorQuery = `
  *[_type == "aboutAuthor"][0] {
    heroTitle,
    heroSubtitle,
    heroImage {
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
    heroBackground {
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
    sections[] {
      title,
      content,
      image {
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
      imagePosition,
      backgroundColor,
      decorativeElement
    },
    timeline[] {
      year,
      title,
      description,
      icon,
      featured
    },
    achievements[] {
      title,
      description,
      icon,
      color,
      year
    },
    featuredQuote {
      text,
      context,
      image {
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
    featuredBooks[]-> {
      _id,
      title,
      slug,
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
      excerpt,
      seasonalTheme,
      publicationYear
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
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
      }
    }
  }
`

// Fetch function
export async function getAboutAuthorData() {
  try {
    return await client.fetch(aboutAuthorQuery)
  } catch (error) {
    console.error('Error fetching about author data:', error)
    return null
  }
}

// Types
export interface AboutAuthorSection {
  title: string
  content: any[] // Portable text blocks
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
  imagePosition: 'left' | 'right'
  backgroundColor: string
  decorativeElement: string
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
  icon: string
  featured: boolean
}

export interface Achievement {
  title: string
  description: string
  icon: string
  color: string
  year?: string
}

export interface FeaturedQuote {
  text: string
  context?: string
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
}

export interface Book {
  _id: string
  title: string
  slug: { current: string }
  coverImage: {
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
  excerpt: string
  seasonalTheme: 'spring' | 'summer' | 'autumn' | 'winter'
  publicationYear: number
}

export interface AboutAuthorData {
  heroTitle: string
  heroSubtitle?: string
  heroImage?: {
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
  heroBackground?: {
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
  sections?: AboutAuthorSection[]
  timeline?: TimelineEvent[]
  achievements?: Achievement[]
  featuredQuote?: FeaturedQuote
  featuredBooks?: Book[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
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
  }
}