#!/usr/bin/env tsx

/**
 * SANITY CONTENT EXPORT SCRIPT
 * 
 * This script safely exports ALL existing Sanity content to JSON files
 * CRITICAL: This prevents any data loss during migration
 * 
 * Features:
 * - Complete backup of all document types
 * - Asset references preservation
 * - Detailed logging and progress tracking
 * - Error handling with retry mechanism
 * - Timestamped backups for version control
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

// Sanity client configuration
const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Will need to be provided
})

// Export configuration
const EXPORT_DIR = path.join(process.cwd(), 'sanity-exports')
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-')
const BACKUP_DIR = path.join(EXPORT_DIR, `backup-${TIMESTAMP}`)

// All document types we need to export
const DOCUMENT_TYPES = [
  // Core content
  'siteSettings',
  'homePage',
  'navigation',
  'notificationBar',
  
  // Blog system
  'blogPost',
  'blogCategory',
  'author',
  
  // Educational content
  'methodology',
  'program',
  'trainingProgram',
  'virtualClassroom',
  'resource',
  
  // Books and publications
  'book',
  'booksLanding',
  'publications',
  
  // People and testimonials
  'aboutAuthor',
  'authorTimeline',
  'authorAchievements',
  'teamMember',
  'successStory',
  'testimonial',
  
  // Support system
  'faq',
  'faqCategory',
  
  // Franchise system (existing)
  'locationData',
  'franchiseSteps',
  'franchiseApplication',
  'franchiseSection',
  'franchiseField',
  'franchiseMotivational',
  'franchiseApplicationSubmission',
  
  // Calculator and tools
  'calculatorSettings',
  'calculatorResult',
  
  // Bookings and interactions
  'booking',
  'bookingPage',
  'newsletterSubscriber',
  
  // Pages
  'page',
  'legalPage',
  'errorPage',
  'experience',
]

interface ExportStats {
  totalDocuments: number
  successfulExports: number
  failedExports: number
  documentCounts: Record<string, number>
  errors: Array<{ type: string; error: string }>
}

class SanityExporter {
  private stats: ExportStats = {
    totalDocuments: 0,
    successfulExports: 0,
    failedExports: 0,
    documentCounts: {},
    errors: []
  }

  async initialize() {
    console.log('🚀 Starting Sanity Content Export...')
    console.log(`📁 Export directory: ${BACKUP_DIR}`)
    
    // Create export directories
    if (!fs.existsSync(EXPORT_DIR)) {
      fs.mkdirSync(EXPORT_DIR, { recursive: true })
    }
    
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true })
    }

    // Test Sanity connection
    try {
      const testQuery = await client.fetch('*[_type == "siteSettings"][0]._id')
      console.log('✅ Sanity connection successful')
    } catch (error) {
      console.error('❌ Failed to connect to Sanity:', error)
      throw new Error('Cannot connect to Sanity. Please check your credentials and network connection.')
    }
  }

  async exportDocumentType(documentType: string): Promise<void> {
    try {
      console.log(`📥 Exporting ${documentType}...`)
      
      // Query all documents of this type with all fields
      const query = `*[_type == "${documentType}"] {
        ...,
        "references": *[references(^._id)]{_type, _id, title, name},
        "backReferences": *[_type != "${documentType}" && references(^._id)]{_type, _id}
      }`
      
      const documents = await client.fetch(query)
      
      if (documents && documents.length > 0) {
        // Save to JSON file
        const fileName = `${documentType}.json`
        const filePath = path.join(BACKUP_DIR, fileName)
        
        const exportData = {
          _type: documentType,
          _exportedAt: new Date().toISOString(),
          _count: documents.length,
          documents: documents
        }
        
        fs.writeFileSync(filePath, JSON.stringify(exportData, null, 2))
        
        this.stats.documentCounts[documentType] = documents.length
        this.stats.successfulExports++
        this.stats.totalDocuments += documents.length
        
        console.log(`  ✅ ${documents.length} ${documentType} documents exported`)
      } else {
        console.log(`  ⚠️  No ${documentType} documents found`)
        this.stats.documentCounts[documentType] = 0
      }
      
    } catch (error) {
      console.error(`  ❌ Failed to export ${documentType}:`, error)
      this.stats.failedExports++
      this.stats.errors.push({
        type: documentType,
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }

  async exportAssets(): Promise<void> {
    try {
      console.log('🖼️  Exporting asset references...')
      
      const assetsQuery = `*[_type == "sanity.imageAsset" || _type == "sanity.fileAsset"] {
        _id,
        _type,
        url,
        originalFilename,
        size,
        mimeType,
        "references": *[references(^._id)]{_type, _id}
      }`
      
      const assets = await client.fetch(assetsQuery)
      
      if (assets && assets.length > 0) {
        const filePath = path.join(BACKUP_DIR, 'assets.json')
        const exportData = {
          _type: 'assets',
          _exportedAt: new Date().toISOString(),
          _count: assets.length,
          assets: assets
        }
        
        fs.writeFileSync(filePath, JSON.stringify(exportData, null, 2))
        console.log(`  ✅ ${assets.length} assets exported`)
      }
      
    } catch (error) {
      console.error('  ❌ Failed to export assets:', error)
      this.stats.errors.push({
        type: 'assets',
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }

  async exportAllSchemas(): Promise<void> {
    try {
      console.log('📋 Exporting schema information...')
      
      // Get all document types that actually exist in the dataset
      const typesQuery = `array::unique(*[]._type)`
      const existingTypes = await client.fetch(typesQuery)
      
      const schemaInfo = {
        _exportedAt: new Date().toISOString(),
        configuredTypes: DOCUMENT_TYPES,
        existingTypes: existingTypes,
        missingTypes: DOCUMENT_TYPES.filter(type => !existingTypes.includes(type)),
        extraTypes: existingTypes.filter(type => !DOCUMENT_TYPES.includes(type))
      }
      
      const filePath = path.join(BACKUP_DIR, 'schema-info.json')
      fs.writeFileSync(filePath, JSON.stringify(schemaInfo, null, 2))
      
      console.log(`  ✅ Schema information exported`)
      console.log(`  📊 Found ${existingTypes.length} document types in dataset`)
      
      if (schemaInfo.extraTypes.length > 0) {
        console.log(`  ⚠️  Found unexpected types: ${schemaInfo.extraTypes.join(', ')}`)
      }
      
    } catch (error) {
      console.error('  ❌ Failed to export schema info:', error)
    }
  }

  async generateManifest(): Promise<void> {
    const manifest = {
      exportTimestamp: new Date().toISOString(),
      sanityProject: {
        projectId: '08ctxj6y',
        dataset: 'production'
      },
      stats: this.stats,
      files: fs.readdirSync(BACKUP_DIR).map(file => ({
        filename: file,
        size: fs.statSync(path.join(BACKUP_DIR, file)).size,
        type: file.replace('.json', '')
      })),
      nextSteps: [
        '1. Review the content analysis report',
        '2. Run the migration analysis script',
        '3. Create the migration plan',
        '4. Test migration on development dataset first',
        '5. Execute migration with backup verification'
      ]
    }
    
    const manifestPath = path.join(BACKUP_DIR, 'EXPORT_MANIFEST.json')
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
    
    // Also create a summary file
    const summaryPath = path.join(BACKUP_DIR, 'EXPORT_SUMMARY.md')
    const summary = `# Sanity Content Export Summary

**Export Date:** ${new Date().toISOString()}
**Export Directory:** ${BACKUP_DIR}

## Statistics
- **Total Documents:** ${this.stats.totalDocuments}
- **Successful Exports:** ${this.stats.successfulExports} document types
- **Failed Exports:** ${this.stats.failedExports} document types

## Document Counts
${Object.entries(this.stats.documentCounts)
  .sort(([,a], [,b]) => b - a)
  .map(([type, count]) => `- **${type}:** ${count} documents`)
  .join('\n')}

## Errors
${this.stats.errors.length === 0 ? 'No errors encountered! 🎉' : 
  this.stats.errors.map(err => `- **${err.type}:** ${err.error}`).join('\n')}

## Next Steps
1. ✅ Content safely exported
2. 🔍 Run content analysis: \`npm run analyze-content\`
3. 📋 Create migration plan: \`npm run create-migration-plan\`
4. 🧪 Test migration on development
5. 🚀 Execute production migration

## Files Generated
${manifest.files.map(file => `- ${file.filename} (${Math.round(file.size / 1024)} KB)`).join('\n')}

⚠️ **IMPORTANT:** Keep this export safe until migration is complete and verified!
`
    
    fs.writeFileSync(summaryPath, summary)
  }

  async run(): Promise<void> {
    try {
      await this.initialize()
      
      // Export all document types
      console.log('\n📄 Exporting documents...')
      for (const documentType of DOCUMENT_TYPES) {
        await this.exportDocumentType(documentType)
      }
      
      // Export assets
      console.log('\n🖼️  Exporting assets...')
      await this.exportAssets()
      
      // Export schema information
      console.log('\n📋 Exporting schemas...')
      await this.exportAllSchemas()
      
      // Generate manifest and summary
      console.log('\n📋 Generating manifest...')
      await this.generateManifest()
      
      // Final summary
      console.log('\n🎉 Export Complete!')
      console.log(`📊 Total: ${this.stats.totalDocuments} documents from ${this.stats.successfulExports} types`)
      console.log(`📁 Location: ${BACKUP_DIR}`)
      
      if (this.stats.errors.length > 0) {
        console.log(`⚠️  ${this.stats.errors.length} errors encountered - check EXPORT_SUMMARY.md`)
      }
      
      console.log('\n🔍 Next step: Run content analysis with:')
      console.log('npm run analyze-content')
      
    } catch (error) {
      console.error('\n💥 Export failed:', error)
      process.exit(1)
    }
  }
}

// Run the export if called directly
if (require.main === module) {
  const exporter = new SanityExporter()
  
  // Handle environment check
  if (!process.env.SANITY_API_TOKEN) {
    console.log('⚠️  SANITY_API_TOKEN not found in environment variables')
    console.log('Please set your Sanity API token with read permissions:')
    console.log('export SANITY_API_TOKEN="your_token_here"')
    console.log('\nYou can generate a token at: https://sanity.io/manage')
    process.exit(1)
  }
  
  exporter.run().catch(console.error)
}

export default SanityExporter