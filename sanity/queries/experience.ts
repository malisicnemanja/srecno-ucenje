import { client } from '@/sanity/client'

// Query for all experiences
export const allExperiencesQuery = `
  *[_type == "experience"] | order(publishedDate desc) {
    _id,
    title,
    slug,
    destination,
    excerpt,
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
    authorInfo {
      name,
      bio,
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
    metadata {
      duration,
      bestTime,
      difficulty
    },
    publishedDate,
    featured,
    seo {
      metaTitle,
      metaDescription
    }
  }
`

// Query for featured experiences
export const featuredExperiencesQuery = `
  *[_type == "experience" && featured == true] | order(publishedDate desc) {
    _id,
    title,
    slug,
    destination,
    excerpt,
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
    authorInfo {
      name,
      bio,
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
    metadata {
      duration,
      bestTime,
      difficulty
    },
    publishedDate
  }
`

// Query for single experience by slug
export const experienceBySlugQuery = `
  *[_type == "experience" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    destination,
    excerpt,
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
    gallery[] {
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
    content,
    chapters[] {
      title,
      content
    },
    tips[] {
      title,
      description,
      icon
    },
    authorInfo {
      name,
      bio,
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
    metadata {
      duration,
      bestTime,
      difficulty
    },
    publishedDate,
    featured,
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

// Query for related experiences
export const relatedExperiencesQuery = `
  *[_type == "experience" && _id != $experienceId] | order(publishedDate desc) [0...3] {
    _id,
    title,
    slug,
    destination,
    excerpt,
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
    authorInfo {
      name
    },
    metadata {
      duration,
      difficulty
    },
    publishedDate
  }
`

// Fetch functions
export async function getAllExperiences() {
  try {
    return await client.fetch(allExperiencesQuery)
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return []
  }
}

export async function getFeaturedExperiences() {
  try {
    return await client.fetch(featuredExperiencesQuery)
  } catch (error) {
    console.error('Error fetching featured experiences:', error)
    return []
  }
}

export async function getExperienceBySlug(slug: string) {
  try {
    return await client.fetch(experienceBySlugQuery, { slug })
  } catch (error) {
    console.error('Error fetching experience by slug:', error)
    return null
  }
}

export async function getRelatedExperiences(experienceId: string) {
  try {
    return await client.fetch(relatedExperiencesQuery, { experienceId })
  } catch (error) {
    console.error('Error fetching related experiences:', error)
    return []
  }
}

// Types
export interface Experience {
  _id: string
  title: string
  slug: { current: string }
  destination: string
  excerpt: string
  heroImage: {
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
  gallery?: Array<{
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
  content?: any[] // Portable text blocks
  chapters?: Array<{
    title: string
    content: any[] // Portable text blocks
  }>
  tips?: Array<{
    title: string
    description: string
    icon: string
  }>
  authorInfo: {
    name: string
    bio: string
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
  metadata: {
    duration: string
    bestTime: string
    difficulty: 'easy' | 'moderate' | 'challenging'
  }
  publishedDate: string
  featured: boolean
  seo?: {
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