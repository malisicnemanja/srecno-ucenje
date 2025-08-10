#!/usr/bin/env node

import { createClient } from '@sanity/client'
import { homePageQuery } from '../lib/sanity.queries'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '08ctxj6y',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function debugHomePageData() {
  console.log('🔍 Debugging home page data structure...\n')
  
  try {
    const data = await client.fetch(homePageQuery)
    
    console.log('Available sections in home page data:')
    console.log(Object.keys(data || {}))
    
    console.log('\n=== CHECKING FOR MISSING _KEY VALUES ===\n')
    
    // Function to find missing keys
    const findMissingKeys = (obj: any, path = ''): string[] => {
      const missing: string[] = []
      
      if (!obj || typeof obj !== 'object') return missing
      
      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          const itemPath = `${path}[${index}]`
          if (item && typeof item === 'object' && !item._key && !item._id) {
            // Check if this is a complex object that needs a key
            const keys = Object.keys(item).filter(k => !k.startsWith('_'))
            if (keys.length > 1 || (keys.length === 1 && !['text', 'value', 'label'].includes(keys[0]))) {
              missing.push(itemPath)
            }
          }
          missing.push(...findMissingKeys(item, itemPath))
        })
      } else {
        Object.entries(obj).forEach(([key, value]) => {
          const newPath = path ? `${path}.${key}` : key
          missing.push(...findMissingKeys(value, newPath))
        })
      }
      
      return missing
    }
    
    const missingKeys = findMissingKeys(data)
    
    if (missingKeys.length > 0) {
      console.log('❌ Missing _key values found:')
      missingKeys.forEach(path => console.log(`  - ${path}`))
      
      console.log('\n=== SAMPLE DATA STRUCTURE ===')
      
      // Show actual data for some sections
      if (data?.statistics) {
        console.log('\nStatistics section:')
        console.log(JSON.stringify(data.statistics.slice(0, 2), null, 2))
      }
      
      if (data?.differentiators?.items) {
        console.log('\nDifferentiators items:')
        console.log(JSON.stringify(data.differentiators.items.slice(0, 1), null, 2))
      }
      
    } else {
      console.log('✅ No missing _key values found!')
    }
    
    console.log('\n=== DOCUMENT METADATA ===')
    console.log(`Document ID: ${data._id}`)
    console.log(`Document Type: ${data._type}`)
    console.log(`Last Revision: ${data._rev}`)
    
  } catch (error) {
    console.error('Error fetching home page data:', error)
  }
}

debugHomePageData()