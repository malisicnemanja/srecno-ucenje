#!/usr/bin/env node

/**
 * Fix Orphaned FAQs Script
 * 
 * This script fixes FAQs that have invalid category references by:
 * 1. Finding FAQs with missing or invalid category references
 * 2. Assigning them to a default category based on their content
 * 3. Creating missing categories if needed
 */

import { createClient } from '@sanity/client'

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '08ctxj6y',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN,
  apiVersion: '2023-10-01'
})

interface OrphanedFaq {
  _id: string
  question: string
  answer: string
  category?: {
    _ref: string
  }
}

/**
 * Categorizes FAQ based on content
 */
function categorizeFaq(question: string, answer: string): string {
  const text = (question + ' ' + answer).toLowerCase()

  if (text.includes('franšiza') || text.includes('franšiz') || text.includes('posao') || text.includes('investicija') || text.includes('zarada') || text.includes('povrać')) {
    return 'faqCategory.franchise'
  }
  
  if (text.includes('program') || text.includes('kurs') || text.includes('učenje') || text.includes('nastava') || text.includes('metodolog')) {
    return 'faqCategory.programs'
  }
  
  if (text.includes('tehnič') || text.includes('platforma') || text.includes('sistem') || text.includes('aplikacij') || text.includes('podrška')) {
    return 'faqCategory.technical'
  }

  // Default to general category
  return 'faqCategory.general'
}

/**
 * Fixes orphaned FAQs
 */
async function fixOrphanedFaqs(): Promise<void> {
  console.log('🔧 Finding and fixing orphaned FAQs...\n')

  try {
    // Find orphaned FAQs
    const orphanedFaqs = await client.fetch<OrphanedFaq[]>(
      `*[_type == "faq" && !defined(category->_id)] {
        _id,
        question,
        answer,
        category
      }`
    )

    if (orphanedFaqs.length === 0) {
      console.log('✓ No orphaned FAQs found!')
      return
    }

    console.log(`Found ${orphanedFaqs.length} orphaned FAQs`)

    // Process each orphaned FAQ
    for (const faq of orphanedFaqs) {
      try {
        const categoryId = categorizeFaq(faq.question, faq.answer)
        
        // Check if the category exists
        const categoryExists = await client.fetch<boolean>(
          `count(*[_type == "faqCategory" && _id == $id]) > 0`,
          { id: categoryId }
        )

        if (!categoryExists) {
          console.log(`⚠ Category ${categoryId} doesn't exist, skipping FAQ: ${faq.question.substring(0, 50)}...`)
          continue
        }

        // Update the FAQ
        await client.patch(faq._id)
          .set({
            category: {
              _type: 'reference',
              _ref: categoryId
            }
          })
          .commit()

        console.log(`✓ Fixed FAQ: ${faq.question.substring(0, 50)}...`)
        console.log(`  Assigned to category: ${categoryId}`)
      } catch (error) {
        console.error(`✗ Failed to fix FAQ ${faq._id}:`, error)
      }
    }

    // Verify fix
    const remainingOrphans = await client.fetch<number>(
      `count(*[_type == "faq" && !defined(category->_id)])`
    )

    console.log(`\n📊 Fix Summary:`)
    console.log(`Original orphaned FAQs: ${orphanedFaqs.length}`)
    console.log(`Remaining orphaned FAQs: ${remainingOrphans}`)
    console.log(`Fixed FAQs: ${orphanedFaqs.length - remainingOrphans}`)

    if (remainingOrphans === 0) {
      console.log('🎉 All orphaned FAQs have been fixed!')
    } else {
      console.log(`⚠ ${remainingOrphans} FAQs still need manual attention`)
    }

  } catch (error) {
    console.error('\n❌ Fix failed:', error)
    process.exit(1)
  }
}

/**
 * Main function
 */
async function main(): Promise<void> {
  console.log('🔍 Validating environment...')

  // Check environment variables
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
    process.exit(1)
  }

  if (!process.env.SANITY_API_TOKEN && !process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN) {
    console.error('❌ Missing SANITY_API_TOKEN or NEXT_PUBLIC_SANITY_WRITE_TOKEN environment variable')
    process.exit(1)
  }

  // Test connection
  try {
    await client.fetch('*[_type == "faq"][0]._id')
    console.log('✓ Sanity connection successful\n')
  } catch (error) {
    console.error('❌ Failed to connect to Sanity:', error)
    process.exit(1)
  }

  // Run fix
  await fixOrphanedFaqs()
}

// Run the script
if (require.main === module) {
  main().catch(console.error)
}

export { fixOrphanedFaqs }