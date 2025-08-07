#!/usr/bin/env node

/**
 * FAQ Data Structure Migration Script
 * 
 * This script fixes the FAQ data structure issue in Sanity by:
 * 1. Fetching all homePage documents with FAQ data
 * 2. Extracting inline FAQ data (question, answer, category)
 * 3. Creating proper FAQ documents if they don't exist
 * 4. Creating FAQ categories if they don't exist
 * 5. Updating homePage to use references to these FAQ documents
 * 6. Removing old inline data
 * 
 * The script is safe to run multiple times and handles edge cases properly.
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

interface OldFaqItem {
  question?: string
  answer?: string
  category?: string | { name?: string; slug?: string }
  order?: number
}

interface FaqCategory {
  _id: string
  _type: 'faqCategory'
  name: string
  slug: string
  description?: string
  icon?: string
  color?: string
  order?: number
  isActive?: boolean
}

interface FaqDocument {
  _id: string
  _type: 'faq'
  question: string
  answer: string
  category: {
    _type: 'reference'
    _ref: string
  }
  order?: number
}

interface HomePageDocument {
  _id: string
  _type: 'homePage'
  homeFaqs?: {
    sectionTitle?: string
    faqs?: (OldFaqItem | { _type: 'reference'; _ref: string })[]
  }
  homeFAQ?: {
    sectionTitle?: string
    faqs?: (OldFaqItem | { _type: 'reference'; _ref: string })[]
  }
}

// Default FAQ categories
const defaultCategories: Omit<FaqCategory, '_id'>[] = [
  {
    _type: 'faqCategory',
    name: 'Opšta pitanja',
    slug: 'general',
    description: 'Često postavljana opšta pitanja',
    icon: '❓',
    color: 'primary',
    order: 1,
    isActive: true
  },
  {
    _type: 'faqCategory',
    name: 'Programi',
    slug: 'programs',
    description: 'Pitanja o našim obrazovnim programima',
    icon: '📚',
    color: 'secondary',
    order: 2,
    isActive: true
  },
  {
    _type: 'faqCategory',
    name: 'Franšiza',
    slug: 'franchise',
    description: 'Pitanja o franšizi i poslovanju',
    icon: '🏢',
    color: 'accent',
    order: 3,
    isActive: true
  },
  {
    _type: 'faqCategory',
    name: 'Tehnička podrška',
    slug: 'technical',
    description: 'Tehnička pitanja i podrška',
    icon: '🔧',
    color: 'neutral',
    order: 4,
    isActive: true
  }
]

/**
 * Creates a slug from text
 */
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[šđčćž]/g, (match) => {
      const map: { [key: string]: string } = { š: 's', đ: 'd', č: 'c', ć: 'c', ž: 'z' }
      return map[match] || match
    })
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Gets or creates FAQ category
 */
async function getOrCreateCategory(categoryName: string): Promise<string> {
  if (!categoryName) {
    categoryName = 'Opšta pitanja'
  }

  const slug = createSlug(categoryName)
  
  // Check if category exists
  const existingCategory = await client.fetch<FaqCategory | null>(
    `*[_type == "faqCategory" && slug == $slug][0]`,
    { slug }
  )

  if (existingCategory) {
    console.log(`✓ Found existing category: ${categoryName}`)
    return existingCategory._id
  }

  // Create new category
  const categoryId = `faqCategory.${slug}`
  const newCategory: FaqCategory = {
    _id: categoryId,
    _type: 'faqCategory',
    name: categoryName,
    slug: slug,
    description: `Pitanja u kategoriji: ${categoryName}`,
    icon: '❓',
    color: 'primary',
    order: 999,
    isActive: true
  }

  try {
    await client.createOrReplace(newCategory)
    console.log(`✓ Created new category: ${categoryName}`)
    return categoryId
  } catch (error) {
    console.error(`✗ Failed to create category ${categoryName}:`, error)
    // Return default category ID as fallback
    return 'faqCategory.general'
  }
}

/**
 * Creates or updates an FAQ document
 */
async function createOrUpdateFaq(
  faqData: OldFaqItem, 
  categoryId: string, 
  order: number = 0
): Promise<string> {
  if (!faqData.question || !faqData.answer) {
    throw new Error('FAQ must have question and answer')
  }

  const faqId = `faq.${createSlug(faqData.question)}`
  
  // Check if FAQ already exists
  const existingFaq = await client.fetch<FaqDocument | null>(
    `*[_type == "faq" && _id == $id][0]`,
    { id: faqId }
  )

  const faqDocument: FaqDocument = {
    _id: faqId,
    _type: 'faq',
    question: faqData.question,
    answer: faqData.answer,
    category: {
      _type: 'reference',
      _ref: categoryId
    },
    order: faqData.order || order
  }

  try {
    if (existingFaq) {
      await client.patch(faqId)
        .set({
          question: faqDocument.question,
          answer: faqDocument.answer,
          category: faqDocument.category,
          order: faqDocument.order
        })
        .commit()
      console.log(`✓ Updated FAQ: ${faqData.question.substring(0, 50)}...`)
    } else {
      await client.createOrReplace(faqDocument)
      console.log(`✓ Created FAQ: ${faqData.question.substring(0, 50)}...`)
    }
    
    return faqId
  } catch (error) {
    console.error(`✗ Failed to create/update FAQ:`, error)
    throw error
  }
}

/**
 * Processes FAQ data and returns references
 */
async function processFaqData(faqs: (OldFaqItem | { _type: 'reference'; _ref: string })[]): Promise<{ _type: 'reference'; _ref: string }[]> {
  const references: { _type: 'reference'; _ref: string }[] = []

  for (let i = 0; i < faqs.length; i++) {
    const faq = faqs[i]

    // Skip if already a reference
    if (faq && '_type' in faq && faq._type === 'reference') {
      references.push(faq)
      continue
    }

    // Process inline FAQ data
    const oldFaq = faq as OldFaqItem
    if (!oldFaq.question || !oldFaq.answer) {
      console.warn(`⚠ Skipping invalid FAQ at index ${i}:`, oldFaq)
      continue
    }

    try {
      // Extract category name
      let categoryName = 'Opšta pitanja'
      if (typeof oldFaq.category === 'string') {
        categoryName = oldFaq.category
      } else if (oldFaq.category && typeof oldFaq.category === 'object' && oldFaq.category.name) {
        categoryName = oldFaq.category.name
      }

      // Get or create category
      const categoryId = await getOrCreateCategory(categoryName)

      // Create FAQ document
      const faqId = await createOrUpdateFaq(oldFaq, categoryId, i + 1)

      // Add reference
      references.push({
        _type: 'reference',
        _ref: faqId
      })
    } catch (error) {
      console.error(`✗ Failed to process FAQ at index ${i}:`, error)
    }
  }

  return references
}

/**
 * Creates default FAQ categories if they don't exist
 */
async function createDefaultCategories(): Promise<void> {
  console.log('\n📁 Creating default FAQ categories...')

  for (const category of defaultCategories) {
    const categoryId = `faqCategory.${category.slug}`
    
    try {
      const exists = await client.fetch<boolean>(
        `count(*[_type == "faqCategory" && _id == $id]) > 0`,
        { id: categoryId }
      )

      if (!exists) {
        await client.createOrReplace({
          _id: categoryId,
          ...category
        })
        console.log(`✓ Created default category: ${category.name}`)
      } else {
        console.log(`✓ Default category already exists: ${category.name}`)
      }
    } catch (error) {
      console.error(`✗ Failed to create default category ${category.name}:`, error)
    }
  }
}

/**
 * Main migration function
 */
async function migrateFaqData(): Promise<void> {
  console.log('🚀 Starting FAQ data migration...\n')

  try {
    // Step 1: Create default categories
    await createDefaultCategories()

    // Step 2: Fetch homepage documents
    console.log('\n📄 Fetching homepage documents...')
    const homePages = await client.fetch<HomePageDocument[]>(
      `*[_type == "homePage"]`
    )

    if (homePages.length === 0) {
      console.log('⚠ No homepage documents found.')
      return
    }

    console.log(`✓ Found ${homePages.length} homepage document(s)`)

    // Step 3: Process each homepage document
    for (const homePage of homePages) {
      console.log(`\n🏠 Processing homepage: ${homePage._id}`)

      const updates: any = {}
      let hasInlineData = false

      // Process homeFaqs
      if (homePage.homeFaqs?.faqs && Array.isArray(homePage.homeFaqs.faqs)) {
        const hasInline = homePage.homeFaqs.faqs.some(
          faq => faq && !('_type' in faq && (faq as any)._type === 'reference')
        )

        if (hasInline) {
          console.log('📝 Processing homeFaqs...')
          const references = await processFaqData(homePage.homeFaqs.faqs)
          updates['homeFaqs.faqs'] = references
          hasInlineData = true
        }
      }

      // Process homeFAQ
      if (homePage.homeFAQ?.faqs && Array.isArray(homePage.homeFAQ.faqs)) {
        const hasInline = homePage.homeFAQ.faqs.some(
          faq => faq && !('_type' in faq && (faq as any)._type === 'reference')
        )

        if (hasInline) {
          console.log('📝 Processing homeFAQ...')
          const references = await processFaqData(homePage.homeFAQ.faqs)
          updates['homeFAQ.faqs'] = references
          hasInlineData = true
        }
      }

      // Update homepage if needed
      if (hasInlineData && Object.keys(updates).length > 0) {
        try {
          await client.patch(homePage._id).set(updates).commit()
          console.log(`✓ Updated homepage: ${homePage._id}`)
        } catch (error) {
          console.error(`✗ Failed to update homepage ${homePage._id}:`, error)
        }
      } else {
        console.log('✓ No inline FAQ data found, skipping update')
      }
    }

    console.log('\n🎉 FAQ migration completed successfully!')
    
    // Step 4: Display summary
    const faqCount = await client.fetch<number>(`count(*[_type == "faq"])`)
    const categoryCount = await client.fetch<number>(`count(*[_type == "faqCategory"])`)
    
    console.log(`\n📊 Migration Summary:`)
    console.log(`   • FAQ documents: ${faqCount}`)
    console.log(`   • FAQ categories: ${categoryCount}`)

  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

/**
 * Validates environment and runs migration
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
    console.log('✓ Sanity connection successful')
  } catch (error) {
    console.error('❌ Failed to connect to Sanity:', error)
    process.exit(1)
  }

  // Run migration
  await migrateFaqData()
}

// Run the script
if (require.main === module) {
  main().catch(console.error)
}

export { migrateFaqData }