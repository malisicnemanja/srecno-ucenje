#!/usr/bin/env tsx
import { createClient } from '@sanity/client'
import { homePageQuery, siteSettingsQuery, navigationQuery } from '../lib/sanity.queries'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '08ctxj6y',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function checkSanityData() {
  console.log('🔍 Checking current Sanity data...\n')

  try {
    // Check homepage data
    console.log('📄 Home Page Data:')
    const homeData = await client.fetch(homePageQuery)
    console.log('- HomePage document exists:', !!homeData)
    if (homeData) {
      console.log('- enhancedHero:', !!homeData.enhancedHero)
      console.log('- statistics:', Array.isArray(homeData.statistics) ? homeData.statistics.length : 'none')
      console.log('- differentiators:', !!homeData.differentiators)
      console.log('- franchiseSteps:', !!homeData.franchiseSteps)
      console.log('- successStories:', !!homeData.successStories)
      console.log('- homeFaqs:', !!homeData.homeFaqs)
      console.log('- newsletterCTA:', !!homeData.newsletterCTA)
    }

    // Check site settings
    console.log('\n🔧 Site Settings:')
    const siteSettings = await client.fetch(siteSettingsQuery)
    console.log('- SiteSettings document exists:', !!siteSettings)

    // Check navigation
    console.log('\n🧭 Navigation:')
    const navigation = await client.fetch(navigationQuery)
    console.log('- Navigation document exists:', !!navigation)

    // Check document counts
    console.log('\n📊 Document Counts:')
    const documentTypes = ['homePage', 'siteSettings', 'navigation', 'faq', 'faqCategory', 'blogPost', 'blogCategory']
    
    for (const type of documentTypes) {
      const count = await client.fetch(`count(*[_type == "${type}"])`)
      console.log(`- ${type}: ${count} documents`)
    }

    // Check for specific missing data
    console.log('\n❓ Checking for specific missing sections:')
    if (homeData) {
      if (!homeData.franchiseModels) {
        console.log('⚠️  Missing: franchiseModels section')
      }
      if (!homeData.successStories || !homeData.successStories.stories || homeData.successStories.stories.length === 0) {
        console.log('⚠️  Missing: successStories data')
      }
      if (!homeData.homeFaqs || !homeData.homeFaqs.faqs || homeData.homeFaqs.faqs.length === 0) {
        console.log('⚠️  Missing: homeFaqs data')
      }
    }

  } catch (error) {
    console.error('❌ Error checking Sanity data:', error)
  }
}

checkSanityData()