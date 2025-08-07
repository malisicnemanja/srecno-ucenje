#!/usr/bin/env node

/**
 * FAQ Migration Verification Script
 * 
 * This script verifies that the FAQ migration was successful by:
 * 1. Checking that all FAQ references are valid
 * 2. Verifying that no inline FAQ data remains
 * 3. Confirming that FAQ categories exist and are properly referenced
 * 4. Displaying a summary of the current state
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

interface FaqReference {
  _type: string
  _ref: string
}

interface HomePageFaqSection {
  sectionTitle?: string
  faqs?: (FaqReference | any)[]
}

interface HomePageDocument {
  _id: string
  _type: 'homePage'
  homeFaqs?: HomePageFaqSection
  homeFAQ?: HomePageFaqSection
}

/**
 * Checks if an item is a valid FAQ reference
 */
function isValidFaqReference(item: any): item is FaqReference {
  return item && 
         typeof item === 'object' && 
         item._type === 'reference' && 
         typeof item._ref === 'string' &&
         item._ref.startsWith('faq.')
}

/**
 * Checks if an item is inline FAQ data
 */
function isInlineFaqData(item: any): boolean {
  return item && 
         typeof item === 'object' && 
         (item.question || item.answer) &&
         (!item._type || item._type !== 'reference')
}

/**
 * Verifies FAQ references exist in the database
 */
async function verifyFaqReferences(references: FaqReference[]): Promise<{
  valid: string[]
  invalid: string[]
}> {
  const valid: string[] = []
  const invalid: string[] = []

  for (const ref of references) {
    try {
      const exists = await client.fetch<boolean>(
        `count(*[_type == "faq" && _id == $id]) > 0`,
        { id: ref._ref }
      )
      
      if (exists) {
        valid.push(ref._ref)
      } else {
        invalid.push(ref._ref)
      }
    } catch (error) {
      console.error(`Error checking reference ${ref._ref}:`, error)
      invalid.push(ref._ref)
    }
  }

  return { valid, invalid }
}

/**
 * Main verification function
 */
async function verifyFaqMigration(): Promise<void> {
  console.log('🔍 Verifying FAQ migration...\n')

  try {
    // Step 1: Fetch homepage documents
    console.log('📄 Fetching homepage documents...')
    const homePages = await client.fetch<HomePageDocument[]>(
      `*[_type == "homePage"]`
    )

    if (homePages.length === 0) {
      console.log('⚠ No homepage documents found.')
      return
    }

    console.log(`✓ Found ${homePages.length} homepage document(s)\n`)

    // Step 2: Check each homepage document
    let totalReferences = 0
    let totalInlineData = 0
    let totalValidReferences = 0
    let totalInvalidReferences = 0

    for (const homePage of homePages) {
      console.log(`🏠 Checking homepage: ${homePage._id}`)

      // Check homeFaqs
      if (homePage.homeFaqs?.faqs && Array.isArray(homePage.homeFaqs.faqs)) {
        const faqs = homePage.homeFaqs.faqs
        const references = faqs.filter(isValidFaqReference)
        const inlineData = faqs.filter(isInlineFaqData)

        console.log(`   homeFaqs: ${faqs.length} total items`)
        console.log(`   - References: ${references.length}`)
        console.log(`   - Inline data: ${inlineData.length}`)

        if (inlineData.length > 0) {
          console.log('   ⚠ Warning: Inline FAQ data still present!')
          inlineData.forEach((item, idx) => {
            console.log(`     ${idx + 1}. ${item.question?.substring(0, 50)}...`)
          })
        }

        if (references.length > 0) {
          const verification = await verifyFaqReferences(references)
          console.log(`   - Valid references: ${verification.valid.length}`)
          console.log(`   - Invalid references: ${verification.invalid.length}`)
          
          if (verification.invalid.length > 0) {
            console.log('   ⚠ Invalid references found:')
            verification.invalid.forEach(ref => console.log(`     - ${ref}`))
          }

          totalValidReferences += verification.valid.length
          totalInvalidReferences += verification.invalid.length
        }

        totalReferences += references.length
        totalInlineData += inlineData.length
      }

      // Check homeFAQ
      if (homePage.homeFAQ?.faqs && Array.isArray(homePage.homeFAQ.faqs)) {
        const faqs = homePage.homeFAQ.faqs
        const references = faqs.filter(isValidFaqReference)
        const inlineData = faqs.filter(isInlineFaqData)

        console.log(`   homeFAQ: ${faqs.length} total items`)
        console.log(`   - References: ${references.length}`)
        console.log(`   - Inline data: ${inlineData.length}`)

        if (inlineData.length > 0) {
          console.log('   ⚠ Warning: Inline FAQ data still present!')
          inlineData.forEach((item, idx) => {
            console.log(`     ${idx + 1}. ${item.question?.substring(0, 50)}...`)
          })
        }

        if (references.length > 0) {
          const verification = await verifyFaqReferences(references)
          console.log(`   - Valid references: ${verification.valid.length}`)
          console.log(`   - Invalid references: ${verification.invalid.length}`)

          if (verification.invalid.length > 0) {
            console.log('   ⚠ Invalid references found:')
            verification.invalid.forEach(ref => console.log(`     - ${ref}`))
          }

          totalValidReferences += verification.valid.length
          totalInvalidReferences += verification.invalid.length
        }

        totalReferences += references.length
        totalInlineData += inlineData.length
      }

      console.log('')
    }

    // Step 3: Get overall statistics
    const faqCount = await client.fetch<number>(`count(*[_type == "faq"])`)
    const categoryCount = await client.fetch<number>(`count(*[_type == "faqCategory"])`)
    
    // Check for orphaned FAQs (FAQs with invalid category references)
    const orphanedFaqs = await client.fetch<number>(
      `count(*[_type == "faq" && !defined(category->_id)])`
    )

    // Step 4: Display verification summary
    console.log('📊 Verification Summary:')
    console.log('='.repeat(50))
    console.log(`Total FAQ documents: ${faqCount}`)
    console.log(`Total FAQ categories: ${categoryCount}`)
    console.log(`Total references in homepages: ${totalReferences}`)
    console.log(`Valid references: ${totalValidReferences}`)
    console.log(`Invalid references: ${totalInvalidReferences}`)
    console.log(`Remaining inline data items: ${totalInlineData}`)
    console.log(`Orphaned FAQs (invalid categories): ${orphanedFaqs}`)

    // Step 5: Overall assessment
    console.log('\n🎯 Migration Assessment:')
    
    if (totalInlineData === 0 && totalInvalidReferences === 0 && orphanedFaqs === 0) {
      console.log('✅ Migration appears to be successful!')
      console.log('   • No inline FAQ data remaining')
      console.log('   • All references are valid')
      console.log('   • No orphaned FAQs found')
    } else {
      console.log('⚠️  Migration needs attention:')
      
      if (totalInlineData > 0) {
        console.log(`   • ${totalInlineData} inline FAQ items still present`)
      }
      
      if (totalInvalidReferences > 0) {
        console.log(`   • ${totalInvalidReferences} invalid references found`)
      }
      
      if (orphanedFaqs > 0) {
        console.log(`   • ${orphanedFaqs} FAQs with invalid category references`)
      }
    }

    // Step 6: Sample FAQ data
    console.log('\n📋 Sample FAQ Data:')
    const sampleFaqs = await client.fetch(
      `*[_type == "faq"] | order(order asc) [0...3] {
        _id,
        question,
        answer,
        category->{
          _id,
          name,
          slug
        },
        order
      }`
    )

    sampleFaqs.forEach((faq: any, idx: number) => {
      console.log(`   ${idx + 1}. ${faq.question}`)
      console.log(`      Category: ${faq.category?.name || 'No category'}`)
      console.log(`      Order: ${faq.order || 'No order'}`)
      console.log('')
    })

  } catch (error) {
    console.error('\n❌ Verification failed:', error)
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
    await client.fetch('*[_type == "homePage"][0]._id')
    console.log('✓ Sanity connection successful\n')
  } catch (error) {
    console.error('❌ Failed to connect to Sanity:', error)
    process.exit(1)
  }

  // Run verification
  await verifyFaqMigration()
}

// Run the script
if (require.main === module) {
  main().catch(console.error)
}

export { verifyFaqMigration }