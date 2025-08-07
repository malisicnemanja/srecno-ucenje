import { MetadataRoute } from 'next'
import { baseUrl, sitemapUrls } from '@/lib/seo-config'
import { sanityFetch } from '@/lib/sanity.client'

// Sanity queries for dynamic content
const blogPostsQuery = `*[_type == "post" && !(_id in path("drafts.**"))] {
  slug,
  _updatedAt,
  publishedAt
}`

const successStoriesQuery = `*[_type == "successStory" && !(_id in path("drafts.**"))] {
  slug,
  _updatedAt,
  publishedAt
}`

const schoolsQuery = `*[_type == "school" && !(_id in path("drafts.**"))] {
  slug,
  _updatedAt
}`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch dynamic content from Sanity
    const [blogPosts, successStories, schools] = await Promise.all([
      sanityFetch({ query: blogPostsQuery }),
      sanityFetch({ query: successStoriesQuery }),
      sanityFetch({ query: schoolsQuery })
    ])

    // Static pages sitemap entries
    const staticPages = sitemapUrls.map(page => ({
      url: `${baseUrl}${page.url}`,
      lastModified: new Date(),
      changeFrequency: page.changeFreq as 'weekly' | 'monthly' | 'yearly' | 'daily',
      priority: page.priority,
    }))

    // Blog posts sitemap entries
    const blogEntries = (blogPosts || []).map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug.current}`,
      lastModified: new Date(post._updatedAt || post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    // Success stories sitemap entries
    const successStoryEntries = (successStories || []).map((story: any) => ({
      url: `${baseUrl}/iskustva/${story.slug.current}`,
      lastModified: new Date(story._updatedAt || story.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

    // Schools sitemap entries
    const schoolEntries = (schools || []).map((school: any) => ({
      url: `${baseUrl}/skolice/${school.slug.current}`,
      lastModified: new Date(school._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Combine all sitemap entries
    return [
      ...staticPages,
      ...blogEntries,
      ...successStoryEntries,
      ...schoolEntries,
    ]

  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Fallback to static pages only
    return sitemapUrls.map(page => ({
      url: `${baseUrl}${page.url}`,
      lastModified: new Date(),
      changeFrequency: page.changeFreq as 'weekly' | 'monthly' | 'yearly' | 'daily',
      priority: page.priority,
    }))
  }
}