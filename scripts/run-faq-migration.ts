#!/usr/bin/env node

/**
 * Complete FAQ Migration Runner
 * 
 * This script runs the complete FAQ migration process:
 * 1. Main migration (migrate-faq-data.ts)
 * 2. Fix orphaned FAQs (fix-orphaned-faqs.ts)
 * 3. Verify migration (verify-faq-migration.ts)
 */

import { migrateFaqData } from './migrate-faq-data'
import { fixOrphanedFaqs } from './fix-orphaned-faqs'
import { verifyFaqMigration } from './verify-faq-migration'

/**
 * Runs the complete FAQ migration process
 */
async function runCompleteMigration(): Promise<void> {
  console.log('🚀 Starting complete FAQ migration process...\n')
  console.log('=' .repeat(60))

  try {
    // Step 1: Main migration
    console.log('\n📋 STEP 1: Running main FAQ migration...')
    console.log('-'.repeat(40))
    await migrateFaqData()

    // Step 2: Fix orphaned FAQs
    console.log('\n🔧 STEP 2: Fixing orphaned FAQs...')
    console.log('-'.repeat(40))
    await fixOrphanedFaqs()

    // Step 3: Verify migration
    console.log('\n✅ STEP 3: Verifying migration...')
    console.log('-'.repeat(40))
    await verifyFaqMigration()

    console.log('\n' + '='.repeat(60))
    console.log('🎉 COMPLETE FAQ MIGRATION FINISHED SUCCESSFULLY!')
    console.log('=' .repeat(60))
    
    console.log('\n📝 Next Steps:')
    console.log('1. Test your FAQ display on the website')
    console.log('2. Verify admin interface functionality')
    console.log('3. Update frontend queries if needed')
    console.log('4. Consider removing old schema fields')

  } catch (error) {
    console.error('\n❌ Migration process failed:', error)
    console.log('\n🔍 Troubleshooting:')
    console.log('1. Check your environment variables')
    console.log('2. Verify Sanity connection')
    console.log('3. Review the error message above')
    console.log('4. Run individual scripts for more detailed logging')
    process.exit(1)
  }
}

/**
 * Main function with environment validation
 */
async function main(): Promise<void> {
  console.log('🔍 Validating environment for complete migration...')

  // Check environment variables
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
    console.log('💡 Add this to your .env.local file')
    process.exit(1)
  }

  if (!process.env.SANITY_API_TOKEN && !process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN) {
    console.error('❌ Missing SANITY_API_TOKEN or NEXT_PUBLIC_SANITY_WRITE_TOKEN environment variable')
    console.log('💡 Add this to your .env.local file with write permissions')
    process.exit(1)
  }

  console.log('✓ Environment validation passed')

  // Run complete migration
  await runCompleteMigration()
}

// Run the script
if (require.main === module) {
  main().catch(console.error)
}