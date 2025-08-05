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

interface CleanupRule {
  documentType: string
  fieldsToRemove: string[]
}

// Define fields to remove after migration
const cleanupRules: CleanupRule[] = [
  {
    documentType: 'homePage',
    fieldsToRemove: [
      'enhancedHero.ctaPrimary',
      'enhancedHero.ctaSecondary',
      'homeFAQ',
      'newsletterCTA',
    ],
  },
  {
    documentType: 'testimonial',
    fieldsToRemove: [
      'name', // Keep authorName
      'role', // Keep authorRole
    ],
  },
  {
    documentType: 'blogPost',
    fieldsToRemove: [
      'readingTime', // Keep readTime
    ],
  },
  {
    documentType: 'program',
    fieldsToRemove: [
      'ageRange', // Keep ageGroup
    ],
  },
  {
    documentType: 'successStory',
    fieldsToRemove: [
      'testimonial', // Keep content
    ],
  },
]

async function cleanupDuplicateFields() {
  console.log('🧹 Starting cleanup of duplicate fields...\n')

  for (const rule of cleanupRules) {
    console.log(`📄 Processing ${rule.documentType} documents...`)
    
    try {
      // Fetch all documents of this type
      const documents = await client.fetch(
        `*[_type == $type]`,
        { type: rule.documentType }
      )
      
      console.log(`  Found ${documents.length} documents`)
      
      for (const doc of documents) {
        const unsetFields: string[] = []
        
        for (const field of rule.fieldsToRemove) {
          // Check if field exists
          const fieldValue = getNestedValue(doc, field)
          
          if (fieldValue !== undefined) {
            unsetFields.push(field)
            console.log(`  🗑️ Removing ${field} from document ${doc._id}`)
          }
        }
        
        // Unset fields if any exist
        if (unsetFields.length > 0) {
          try {
            await client
              .patch(doc._id)
              .unset(unsetFields)
              .commit()
              
            console.log(`  ✅ Cleaned document ${doc._id}`)
          } catch (error) {
            console.error(`  ❌ Failed to clean document ${doc._id}:`, error)
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error processing ${rule.documentType}:`, error)
    }
    
    console.log('')
  }
  
  console.log('✨ Cleanup completed!')
}

// Helper function to get nested value from object
function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.')
  let value = obj
  
  for (const key of keys) {
    if (value === null || value === undefined) {
      return undefined
    }
    value = value[key]
  }
  
  return value
}

// Verify data integrity before cleanup
async function verifyDataIntegrity() {
  console.log('🔍 Verifying data integrity before cleanup...\n')
  
  let hasIssues = false
  
  for (const rule of cleanupRules) {
    const documents = await client.fetch(
      `*[_type == $type]`,
      { type: rule.documentType }
    )
    
    for (const doc of documents) {
      // Check if new fields have data
      const checks: { [key: string]: string } = {
        'homePage': {
          'enhancedHero.ctaPrimary': 'enhancedHero.primaryCta',
          'enhancedHero.ctaSecondary': 'enhancedHero.secondaryCta',
          'homeFAQ': 'homeFaqs',
          'newsletterCTA': 'newsletter',
        },
        'testimonial': {
          'name': 'authorName',
          'role': 'authorRole',
        },
        'blogPost': {
          'readingTime': 'readTime',
        },
        'program': {
          'ageRange': 'ageGroup',
        },
        'successStory': {
          'testimonial': 'content',
        },
      }[rule.documentType] || {}
      
      for (const [oldField, newField] of Object.entries(checks)) {
        const oldValue = getNestedValue(doc, oldField)
        const newValue = getNestedValue(doc, newField)
        
        if (oldValue && !newValue) {
          console.error(`  ⚠️ Document ${doc._id}: ${oldField} has data but ${newField} is empty!`)
          hasIssues = true
        }
      }
    }
  }
  
  return !hasIssues
}

// Run cleanup
async function main() {
  try {
    // First verify data integrity
    const isDataSafe = await verifyDataIntegrity()
    
    if (!isDataSafe) {
      console.error('\n❌ Data integrity check failed! Please run migration first.')
      process.exit(1)
    }
    
    console.log('✅ Data integrity verified!\n')
    
    // Proceed with cleanup
    await cleanupDuplicateFields()
    console.log('\n✅ All cleanup completed successfully!')
  } catch (error) {
    console.error('\n❌ Cleanup failed:', error)
    process.exit(1)
  }
}

// Execute if run directly
if (require.main === module) {
  main()
}

export { cleanupDuplicateFields, verifyDataIntegrity }