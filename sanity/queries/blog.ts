import { client } from '@/sanity/client'

// Query for all blog posts
export const allBlogPostsQuery = `
  *[_type == "blogPost"] | order(publishedDate desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage {
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
    category-> {
      name,
      slug,
      color
    },
    tags,
    author-> {
      name,
      slug,
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
    publishedDate,
    isFeatured,
    readingTime,
    seo {
      metaTitle,
      metaDescription
    }
  }
`

// Query for featured blog posts
export const featuredBlogPostsQuery = `
  *[_type == "blogPost" && isFeatured == true] | order(publishedDate desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage {
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
    category-> {
      name,
      slug,
      color
    },
    tags,
    author-> {
      name,
      slug,
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
    publishedDate,
    readingTime
  }
`

// Query for single blog post by slug
export const blogPostBySlugQuery = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage {
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
    category-> {
      name,
      slug,
      color,
      description
    },
    tags,
    author-> {
      name,
      slug,
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
    publishedDate,
    isFeatured,
    readingTime,
    seo {
      metaTitle,
      metaDescription
    }
  }
`

// Query for blog posts by category
export const blogPostsByCategoryQuery = `
  *[_type == "blogPost" && category->slug.current == $categorySlug] | order(publishedDate desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage {
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
    category-> {
      name,
      slug,
      color
    },
    tags,
    author-> {
      name,
      slug,
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
    publishedDate,
    readingTime
  }
`

// Query for all blog categories
export const allBlogCategoriesQuery = `
  *[_type == "blogCategory"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    color,
    "postCount": count(*[_type == "blogPost" && references(^._id)])
  }
`

// Query for related blog posts
export const relatedBlogPostsQuery = `
  *[_type == "blogPost" && _id != $postId && (
    category->_id == $categoryId ||
    count(tags[@ in $tags]) > 0
  )] | order(publishedDate desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage {
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
    category-> {
      name,
      slug,
      color
    },
    author-> {
      name,
      slug
    },
    publishedDate,
    readingTime
  }
`

// Fetch functions
export async function getAllBlogPosts() {
  try {
    return await client.fetch(allBlogPostsQuery)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getFeaturedBlogPosts() {
  try {
    return await client.fetch(featuredBlogPostsQuery)
  } catch (error) {
    console.error('Error fetching featured blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    return await client.fetch(blogPostBySlugQuery, { slug })
  } catch (error) {
    console.error('Error fetching blog post by slug:', error)
    return null
  }
}

export async function getBlogPostsByCategory(categorySlug: string) {
  try {
    return await client.fetch(blogPostsByCategoryQuery, { categorySlug })
  } catch (error) {
    console.error('Error fetching blog posts by category:', error)
    return []
  }
}

export async function getAllBlogCategories() {
  try {
    return await client.fetch(allBlogCategoriesQuery)
  } catch (error) {
    console.error('Error fetching blog categories:', error)
    return []
  }
}

export async function getRelatedBlogPosts(postId: string, categoryId: string, tags: string[]) {
  try {
    return await client.fetch(relatedBlogPostsQuery, { postId, categoryId, tags })
  } catch (error) {
    console.error('Error fetching related blog posts:', error)
    return []
  }
}

// Types
export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  featuredImage: {
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
  content?: any[] // Portable text blocks
  category: {
    name: string
    slug: { current: string }
    color: string
    description?: string
  }
  tags: string[]
  author: {
    name: string
    slug: { current: string }
    bio?: string
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
  publishedDate: string
  isFeatured: boolean
  readingTime: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface BlogCategory {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  color: string
  postCount?: number
}