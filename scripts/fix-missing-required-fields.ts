import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '08ctxj6y',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function fixMissingRequiredFields() {
  console.log('🔧 Fixing missing required fields...\n')

  // Fix blogPost publishedDate
  console.log('📄 Fixing blogPost documents...')
  const blogPosts = await client.fetch(`*[_type == "blogPost" && !defined(publishedDate)]`)
  
  for (const post of blogPosts) {
    const date = post._createdAt || new Date().toISOString()
    await client
      .patch(post._id)
      .set({ publishedDate: date })
      .commit()
    console.log(`  ✅ Fixed publishedDate for ${post._id}`)
  }

  // Fix successStory studentName
  console.log('\n📄 Fixing successStory documents...')
  const successStories = await client.fetch(`*[_type == "successStory" && !defined(studentName)]`)
  
  for (const story of successStories) {
    const name = story.name || 'Učenik'
    await client
      .patch(story._id)
      .set({ studentName: name })
      .commit()
    console.log(`  ✅ Fixed studentName for ${story._id}`)
  }

  // Fix book required fields
  console.log('\n📄 Fixing book documents...')
  const books = await client.fetch(`*[_type == "book" && (!defined(year) || !defined(colorTheme) || !defined(order))]`)
  
  const bookDefaults = {
    'EIn1TO6kzkBkpMuRkFybRO': { year: 2023, colorTheme: 'yellow', order: 1 }, // Jesenja gozba
    'EIn1TO6kzkBkpMuRkFybbz': { year: 2023, colorTheme: 'blue', order: 2 },   // Zimski mir
    'hWo33GCGxd3rDeD5Tjrudh': { year: 2024, colorTheme: 'green', order: 3 },  // Prolećna žurba
    'hWo33GCGxd3rDeD5Tjrurv': { year: 2024, colorTheme: 'red', order: 4 },    // Letnja vreva
  }
  
  for (const book of books) {
    const defaults = bookDefaults[book._id] || { year: 2024, colorTheme: 'green', order: 1 }
    const updates: any = {}
    
    if (!book.year) updates.year = defaults.year
    if (!book.colorTheme) updates.colorTheme = defaults.colorTheme
    if (!book.order) updates.order = defaults.order
    
    if (Object.keys(updates).length > 0) {
      await client
        .patch(book._id)
        .set(updates)
        .commit()
      console.log(`  ✅ Fixed fields for book ${book._id}`)
    }
  }

  console.log('\n✨ All required fields fixed!')
}

// Main function
async function main() {
  try {
    await fixMissingRequiredFields()
    console.log('\n✅ Successfully fixed all missing required fields!')
  } catch (error) {
    console.error('\n❌ Failed to fix fields:', error)
    process.exit(1)
  }
}

// Execute if run directly
if (require.main === module) {
  main()
}

export { fixMissingRequiredFields }