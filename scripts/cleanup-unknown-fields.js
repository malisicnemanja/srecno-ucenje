const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'your_token_here',
  apiVersion: '2023-01-01'
})

async function cleanupUnknownFields() {
  console.log('🧹 CLEANUP: Removing unknown fields from documents...')
  
  try {
    // Get all documents that might have unknown fields
    const documentsToClean = await client.fetch(`
      *[_type in ["homePage", "faq", "siteSettings"]]
    `)

    console.log(`Found ${documentsToClean.length} documents to check`)

    let cleanedCount = 0

    for (const doc of documentsToClean) {
      try {
        // Clean up common unknown fields
        const cleanupOperations = []
        
        // Remove unknown fields that might exist
        const unknownFields = [
          'homeFAQ', // Duplicate FAQ field
          'title', // If exists in FAQ and not defined in schema
          'newsletter', // Old newsletter field
          'migrationInfo',
          'legacyData',
          'outdatedFields'
        ]

        unknownFields.forEach(field => {
          if (doc[field] !== undefined) {
            cleanupOperations.push(`unset("${field}")`)
          }
        })

        if (cleanupOperations.length > 0) {
          await client
            .patch(doc._id)
            .unset(unknownFields.filter(field => doc[field] !== undefined))
            .commit()
          
          cleanedCount++
          console.log(`✅ Cleaned ${doc._type} (${doc._id}): removed ${cleanupOperations.length} unknown fields`)
        }

      } catch (error) {
        console.warn(`⚠️ Could not clean ${doc._type} (${doc._id}):`, error.message)
      }
    }

    console.log(`🎉 DONE! Cleaned ${cleanedCount} documents`)
    return cleanedCount

  } catch (error) {
    console.error('❌ ERROR during cleanup:', error)
    throw error
  }
}

// Execute cleanup
cleanupUnknownFields()
  .then((count) => {
    console.log(`✨ SUCCESS: Cleaned ${count} documents`)
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 CLEANUP FAILED:', error)
    process.exit(1)
  })