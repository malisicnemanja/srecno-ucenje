#!/usr/bin/env node

/**
 * MASTER MIGRATION ORCHESTRATOR
 * 
 * This script orchestrates the complete migration from 81 schemas to 18.
 * It runs all individual migration scripts in the correct order.
 */

const fs = require('fs');
const path = require('path');

// Migration order (dependencies considered)
const MIGRATION_ORDER = [
  'uiComponent',     // Components first (no dependencies)
  'migration',       // System schemas
  'siteSettings',    // Core settings
  'navigation',      // Navigation
  'pageBuilder',     // Page components
  'author',          // People data
  'testimonial',     // Testimonials
  'blog',            // Content
  'book',            // Publications
  'program',         // Educational content
  'quiz',            // Interactive content
  'faq',             // Support content
  'booking',         // Customer data
  'calculator',      // Financial tools
  'school',          // Locations
  'franchiseApplication', // Applications
  'franchise',       // Main franchise data
  'page'             // Pages last (may reference other content)
];

async function runMasterMigration() {
  console.log('🚀 Starting Master Migration: 81 → 18 schemas');
  console.log('⚠️  This is a MAJOR operation - ensure you have backups!\n');
  
  const results = [];
  let totalMigrated = 0;
  let totalErrors = 0;
  
  for (const schemaName of MIGRATION_ORDER) {
    console.log(`\n📦 Migrating: ${schemaName}`);
    console.log('─'.repeat(50));
    
    try {
      const migrationScript = require(`./migrate-${schemaName}`);
      const result = await migrationScript.migrate();
      
      results.push({
        schema: schemaName,
        ...result
      });
      
      if (result.success) {
        totalMigrated += result.migrated || 0;
        console.log(`✅ ${schemaName}: ${result.migrated || 0} documents migrated`);
      } else {
        totalErrors++;
        console.error(`❌ ${schemaName}: Migration failed - ${result.error}`);
      }
      
      // Small delay between migrations
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      totalErrors++;
      console.error(`❌ ${schemaName}: Script error - ${error.message}`);
      results.push({
        schema: schemaName,
        success: false,
        error: error.message
      });
    }
  }
  
  // Generate final report
  console.log('\n' + '='.repeat(80));
  console.log('📊 MIGRATION COMPLETE - FINAL REPORT');
  console.log('='.repeat(80));
  
  console.log(`Total documents migrated: ${totalMigrated}`);
  console.log(`Migration errors: ${totalErrors}`);
  console.log(`Success rate: ${Math.round((MIGRATION_ORDER.length - totalErrors) / MIGRATION_ORDER.length * 100)}%`);
  
  // Detailed results
  console.log('\n📋 Detailed Results:');
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    const details = result.success ? 
      `${result.migrated || 0} docs` : 
      `ERROR: ${result.error}`;
    console.log(`  ${status} ${result.schema}: ${details}`);
  });
  
  // Save detailed report
  const reportPath = path.join(__dirname, '../backups/migration-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    totalMigrated,
    totalErrors,
    results,
    summary: {
      originalSchemas: 81,
      targetSchemas: 18,
      reduction: '77% reduction in schema count'
    }
  }, null, 2));
  
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  
  if (totalErrors === 0) {
    console.log('\n🎉 ALL MIGRATIONS SUCCESSFUL!');
    console.log('Next steps:');
    console.log('1. Verify all content in Sanity Studio');
    console.log('2. Test all frontend functionality');
    console.log('3. Update schema index file');
    console.log('4. Remove old schema files');
  } else {
    console.log('\n⚠️  Some migrations failed - review errors above');
    console.log('Do not proceed with cleanup until all migrations succeed');
  }
  
  return { totalMigrated, totalErrors, results };
}

if (require.main === module) {
  runMasterMigration()
    .then(result => {
      process.exit(result.totalErrors === 0 ? 0 : 1);
    })
    .catch(error => {
      console.error('Master migration failed:', error);
      process.exit(1);
    });
}

module.exports = { runMasterMigration };
