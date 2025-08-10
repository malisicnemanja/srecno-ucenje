#!/usr/bin/env node

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '08ctxj6y',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false
})

async function checkBothDocuments() {
  const docs = await client.fetch('*[_type == "homePage"] | order(_createdAt desc)')
  
  docs.forEach((doc: any, i: number) => {
    console.log(`\n=== Document ${i + 1}: ${doc._id} ===`)
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

    // Show completeness score
    const sections = ['differentiators', 'franchiseSteps', 'successStories', 'homeFaqs', 'newsletterCTA']
    const present = sections.filter(s => !!doc[s]).length
    console.log(`  Completeness: ${present}/${sections.length} sections`)
  })
}

checkBothDocuments().catch(console.error)