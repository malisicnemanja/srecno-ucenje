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

interface MigrationRule {
  documentType: string
  migrations: {
    from: string
    to: string
    transform?: (value: any) => any
  }[]
}

// Define migration rules for each document type
const migrationRules: MigrationRule[] = [
  {
    documentType: 'homePage',
    migrations: [
      // Migrate CTA fields
      { from: 'enhancedHero.ctaPrimary', to: 'enhancedHero.primaryCta' },
      { from: 'enhancedHero.ctaSecondary', to: 'enhancedHero.secondaryCta' },
      { from: 'newsletterCTA', to: 'newsletter' },
    ],
  },
  {
    documentType: 'testimonial',
    migrations: [
      { from: 'name', to: 'authorName' },
      { from: 'role', to: 'authorRole' },
    ],
  },
  {
    documentType: 'blogPost',
    migrations: [
      { from: 'readingTime', to: 'readTime' },
    ],
  },
  {
    documentType: 'program',
    migrations: [
      { from: 'ageRange', to: 'ageGroup' },
    ],
  },
  {
    documentType: 'successStory',
    migrations: [
      { from: 'testimonial', to: 'content' },
    ],
  },
]

async function migrateDocuments() {
  console.log('🚀 Starting field migration...\n')

  for (const rule of migrationRules) {
    console.log(`📄 Processing ${rule.documentType} documents...`)
    
    try {
      // Fetch all documents of this type
      const documents = await client.fetch(
        `*[_type == $type]`,
        { type: rule.documentType }
      )
      
      console.log(`  Found ${documents.length} documents`)
      
      for (const doc of documents) {
        const patches: any[] = []
        let hasChanges = false
        
        for (const migration of rule.migrations) {
          // Get nested value from document
          const fromValue = getNestedValue(doc, migration.from)
          const toValue = getNestedValue(doc, migration.to)
          
          // Only migrate if source has value and destination doesn't
          if (fromValue !== undefined && fromValue !== null && !toValue) {
            const transformedValue = migration.transform 
              ? migration.transform(fromValue) 
              : fromValue
              
            patches.push({
              set: { [migration.to]: transformedValue }
            })
            
            hasChanges = true
            console.log(`  ✓ Migrating ${migration.from} → ${migration.to} for document ${doc._id}`)
          }
        }
        
        // Apply patches if there are changes
        if (hasChanges) {
          try {
            await client
              .patch(doc._id)
              .set(patches.reduce((acc, patch) => ({ ...acc, ...patch.set }), {}))
              .commit()
              
            console.log(`  ✅ Updated document ${doc._id}`)
          } catch (error) {
            console.error(`  ❌ Failed to update document ${doc._id}:`, error)
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error processing ${rule.documentType}:`, error)
    }
    
    console.log('')
  }
  
  console.log('✨ Migration completed!')
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

// Helper function to set nested value in object
function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.')
  const lastKey = keys.pop()!
  
  let current = obj
  for (const key of keys) {
    if (!current[key]) {
      current[key] = {}
    }
    current = current[key]
  }
  
  current[lastKey] = value
}

// Run migration
async function main() {
  try {
    await migrateDocuments()
    console.log('\n✅ All migrations completed successfully!')
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

// Execute if run directly
if (require.main === module) {
  main()
}

export { migrateDocuments, migrationRules }