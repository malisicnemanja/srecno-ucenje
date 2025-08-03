import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { mockSanityData } from './sanity-mock-store'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'srecno-ucenje-demo'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

// Use mock mode for development
const USE_MOCK = false // Set to false when using real Sanity

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Mock fetch function that returns data from mock store
export async function mockFetch(query: string, params?: any) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // Parse query to determine what data to return
  if (query.includes('navigation')) {
    return mockSanityData.navigation
  }
  if (query.includes('homePage')) {
    return mockSanityData.homePage
  }
  if (query.includes('siteSettings')) {
    return mockSanityData.siteSettings
  }
  if (query.includes('program') && query.includes('order')) {
    return mockSanityData.programs
  }
  if (query.includes('faq')) {
    return mockSanityData.faqs
  }
  if (query.includes('successStory')) {
    return mockSanityData.successStories
  }
  if (query.includes('blogPost') && query.includes('featured')) {
    return mockSanityData.blogPosts.find(p => p.featured)
  }
  if (query.includes('blogPost') && params?.slug) {
    return mockSanityData.blogPosts.find(p => p.slug.current === params.slug)
  }
  if (query.includes('blogPost')) {
    return mockSanityData.blogPosts
  }
  if (query.includes('testimonial')) {
    return mockSanityData.testimonials
  }
  if (query.includes('teamMember')) {
    return mockSanityData.teamMembers
  }
  if (query.includes('resource')) {
    return mockSanityData.resources
  }
  if (query.includes('blogCategory')) {
    return mockSanityData.blogCategories
  }
  if (query.includes('page') && params?.slug === '/') {
    return mockSanityData.pages.home
  }
  if (query.includes('page') && params?.slug === '/metodologija') {
    return mockSanityData.pages.metodologija
  }
  
  return null
}

// Override client.fetch to use mock data
if (USE_MOCK) {
  client.fetch = mockFetch as any
}