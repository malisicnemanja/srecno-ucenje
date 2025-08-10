#!/usr/bin/env node

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '08ctxj6y',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false
})

async function checkSections() {
  // First check all home page documents
  const docs = await client.fetch('*[_type == "homePage"] { _id, _createdAt, "title": enhancedHero.title }')
  console.log('All home page documents:')
  docs.forEach((doc: any) => {
    console.log(`  ID: ${doc._id}, Title: ${doc.title || 'No title'}, Created: ${doc._createdAt}`)
  })
  
  const doc = await client.fetch('*[_type == "homePage"][0]')
  console.log('\nAvailable sections in home page:')
  Object.keys(doc || {}).forEach(key => {
    if (!key.startsWith('_')) {
      const value = doc[key]
      if (Array.isArray(value)) {
        console.log(`  ${key}: array with ${value.length} items`)
      } else if (value && typeof value === 'object') {
        console.log(`  ${key}: object with keys: ${Object.keys(value).join(', ')}`)
      } else {
        console.log(`  ${key}: ${typeof value} - ${value ? 'has data' : 'empty'}`)
      }
    }
  })

  // Check specific missing sections
  console.log('\n=== Checking specific sections ===')
  console.log('differentiators:', !!doc.differentiators)
  console.log('franchiseSteps:', !!doc.franchiseSteps)
  console.log('successStories:', !!doc.successStories)
  console.log('homeFaqs:', !!doc.homeFaqs)
  console.log('newsletterCTA:', !!doc.newsletterCTA)
}

checkSections().catch(console.error)