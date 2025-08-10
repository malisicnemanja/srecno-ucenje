#!/usr/bin/env node

/**
 * FAQ Migration Fix Script
 * 
 * This script fixes the FAQ migration by:
 * 1. Creating FAQ categories first with proper IDs
 * 2. Creating a mapping between old and new category IDs
 * 3. Migrating FAQs with correct category references
 * 4. Ensuring NO data is lost
 */

const fs = require('fs');
const path = require('path');

// Sanity client setup (you'll need to install @sanity/client)
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN, // Needs write permissions
  useCdn: false,
  apiVersion: '2023-05-03'
});

// Backup directory path
const backupDir = '/Users/nemanjamalisic/Desktop/srecno-ucenje 2/sanity-exports/backup-2025-08-07T21-59-23-965Z';

// Category ID mapping - mapping problematic references to correct ones
const categoryIdMapping = {
  'faq-category-general': 'faqCategory.general',
  'faq-category-programs': 'faqCategory.programs', 
  'faq-category-franchise': 'faqCategory.franchise',
  'faq-category-technical': 'faqCategory.technical',
  'faq-category-opsta-pitanja': 'faqCategory.opsta-pitanja'
};

// Utility functions
function loadJsonFile(filename) {
  const filePath = path.join(backupDir, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function saveResults(results, filename) {
  const outputPath = path.join(backupDir, filename);
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`Results saved to: ${outputPath}`);
}

// Clean and prepare category document for migration
function prepareCategoryDocument(doc) {
  const cleanDoc = {
    _id: doc._id,
    _type: 'faqCategory',
    name: doc.name || doc.title,
    title: doc.title || doc.name,
    description: doc.description,
    slug: typeof doc.slug === 'string' ? doc.slug : doc.slug?.current,
    order: doc.order || 999,
    isActive: doc.isActive !== false, // Default to true
    icon: doc.icon || '❓',
    color: doc.color || 'primary'
  };

  // Remove undefined values
  Object.keys(cleanDoc).forEach(key => {
    if (cleanDoc[key] === undefined) {
      delete cleanDoc[key];
    }
  });

  return cleanDoc;
}

// Clean and prepare FAQ document for migration
function prepareFaqDocument(doc, categoryMapping) {
  let categoryRef = null;
  
  if (doc.category && doc.category._ref) {
    const originalRef = doc.category._ref;
    // Check if we need to map this reference
    const mappedRef = categoryMapping[originalRef] || originalRef;
    categoryRef = {
      _type: 'reference',
      _ref: mappedRef
    };
  }

  const cleanDoc = {
    _id: doc._id,
    _type: 'faq',
    question: doc.question,
    answer: doc.answer,
    category: categoryRef,
    order: doc.order || 999,
    isActive: doc.isActive !== false, // Default to true
    tags: doc.tags || []
  };

  // Remove undefined values
  Object.keys(cleanDoc).forEach(key => {
    if (cleanDoc[key] === undefined) {
      delete cleanDoc[key];
    }
  });

  return cleanDoc;
}

// Batch create documents with error handling
async function batchCreateDocuments(documents, docType) {
  const results = {
    successful: [],
    failed: [],
    total: documents.length
  };

  console.log(`\n📦 Creating ${documents.length} ${docType} documents...`);

  // Process in batches of 10 to avoid overwhelming Sanity
  const batchSize = 10;
  for (let i = 0; i < documents.length; i += batchSize) {
    const batch = documents.slice(i, i + batchSize);
    
    console.log(`Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(documents.length/batchSize)}...`);

    await Promise.all(batch.map(async (doc, index) => {
      try {
        // Use createOrReplace to handle existing documents
        const result = await client.createOrReplace(doc);
        results.successful.push({
          id: doc._id,
          result: result
        });
        console.log(`✅ ${docType} created: ${doc._id}`);
      } catch (error) {
        console.error(`❌ Failed to create ${docType} ${doc._id}:`, error.message);
        results.failed.push({
          id: doc._id,
          error: error.message,
          document: doc
        });
      }
    }));

    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  return results;
}

// Main migration function
async function migrateFaqData() {
  console.log('🚀 Starting FAQ migration fix...\n');
  
  const migrationResults = {
    categories: null,
    faqs: null,
    summary: {
      startTime: new Date().toISOString(),
      endTime: null,
      totalCategories: 0,
      totalFaqs: 0,
      successfulCategories: 0,
      successfulFaqs: 0,
      failedCategories: 0,
      failedFaqs: 0
    }
  };

  try {
    // Step 1: Load backup data
    console.log('📂 Loading backup data...');
    const faqCategoriesData = loadJsonFile('faqCategory.json');
    const faqsData = loadJsonFile('faq.json');
    
    const categories = faqCategoriesData.documents || [];
    const faqs = faqsData.documents || [];
    
    migrationResults.summary.totalCategories = categories.length;
    migrationResults.summary.totalFaqs = faqs.length;
    
    console.log(`Found ${categories.length} FAQ categories and ${faqs.length} FAQs`);

    // Step 2: Prepare and create FAQ categories first
    console.log('\n🏗️  Preparing FAQ categories...');
    const preparedCategories = categories.map(prepareCategoryDocument);
    
    // Create missing categories for the failed references
    const missingCategories = [];
    Object.entries(categoryIdMapping).forEach(([wrongId, correctId]) => {
      // Check if the correct category already exists in our prepared categories
      if (!preparedCategories.find(cat => cat._id === correctId)) {
        // Create a basic category to satisfy the reference
        missingCategories.push({
          _id: wrongId, // Use the wrong ID that FAQs are referencing
          _type: 'faqCategory',
          name: 'General Questions',
          title: 'General Questions', 
          description: 'General FAQ category',
          slug: 'general',
          order: 1,
          isActive: true,
          icon: '❓',
          color: 'primary'
        });
      }
    });

    const allCategories = [...preparedCategories, ...missingCategories];
    migrationResults.categories = await batchCreateDocuments(allCategories, 'FAQ Category');
    migrationResults.summary.successfulCategories = migrationResults.categories.successful.length;
    migrationResults.summary.failedCategories = migrationResults.categories.failed.length;

    // Step 3: Wait a moment for categories to be available
    console.log('\n⏳ Waiting for categories to be available...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 4: Prepare and create FAQs with corrected references
    console.log('\n🏗️  Preparing FAQ documents...');
    const preparedFaqs = faqs.map(faq => prepareFaqDocument(faq, categoryIdMapping));
    
    migrationResults.faqs = await batchCreateDocuments(preparedFaqs, 'FAQ');
    migrationResults.summary.successfulFaqs = migrationResults.faqs.successful.length;
    migrationResults.summary.failedFaqs = migrationResults.faqs.failed.length;

    migrationResults.summary.endTime = new Date().toISOString();

    // Save results
    saveResults(migrationResults, 'FAQ_MIGRATION_FIX_RESULTS.json');

    // Print summary
    console.log('\n📊 Migration Summary:');
    console.log('=====================================');
    console.log(`📂 Total FAQ Categories: ${migrationResults.summary.totalCategories}`);
    console.log(`✅ Successful Categories: ${migrationResults.summary.successfulCategories}`);
    console.log(`❌ Failed Categories: ${migrationResults.summary.failedCategories}`);
    console.log('');
    console.log(`📄 Total FAQs: ${migrationResults.summary.totalFaqs}`);
    console.log(`✅ Successful FAQs: ${migrationResults.summary.successfulFaqs}`);
    console.log(`❌ Failed FAQs: ${migrationResults.summary.failedFaqs}`);
    console.log('');
    
    if (migrationResults.summary.failedCategories === 0 && migrationResults.summary.failedFaqs === 0) {
      console.log('🎉 Migration completed successfully! All data has been migrated.');
    } else {
      console.log('⚠️  Migration completed with some failures. Check the results file for details.');
    }

    return migrationResults;

  } catch (error) {
    console.error('💥 Migration failed:', error);
    migrationResults.summary.endTime = new Date().toISOString();
    migrationResults.error = error.message;
    saveResults(migrationResults, 'FAQ_MIGRATION_FIX_RESULTS.json');
    throw error;
  }
}

// Validation function to check current state
async function validateMigration() {
  console.log('\n🔍 Validating migration...');
  
  try {
    const categories = await client.fetch('*[_type == "faqCategory"] | order(order asc)');
    const faqs = await client.fetch('*[_type == "faq"] | order(order asc)');
    
    console.log(`Found ${categories.length} FAQ categories in Sanity`);
    console.log(`Found ${faqs.length} FAQs in Sanity`);
    
    // Check for orphaned FAQs (FAQs without valid category references)
    const orphanedFaqs = faqs.filter(faq => {
      if (!faq.category || !faq.category._ref) return true;
      return !categories.find(cat => cat._id === faq.category._ref);
    });
    
    if (orphanedFaqs.length > 0) {
      console.log(`⚠️  Found ${orphanedFaqs.length} orphaned FAQs:`);
      orphanedFaqs.forEach(faq => {
        console.log(`  - ${faq._id}: references "${faq.category?._ref || 'null'}"`);
      });
    } else {
      console.log('✅ All FAQs have valid category references');
    }
    
    return { categories, faqs, orphanedFaqs };
    
  } catch (error) {
    console.error('Validation failed:', error);
    throw error;
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'migrate';
  
  try {
    switch (command) {
      case 'migrate':
        await migrateFaqData();
        await validateMigration();
        break;
        
      case 'validate':
        await validateMigration();
        break;
        
      case 'help':
        console.log(`
FAQ Migration Fix Script

Usage:
  node fix-faq-migration.js [command]

Commands:
  migrate    - Run the full FAQ migration (default)
  validate   - Validate current FAQ data in Sanity
  help       - Show this help message

Environment Variables:
  NEXT_PUBLIC_SANITY_PROJECT_ID - Sanity project ID
  NEXT_PUBLIC_SANITY_DATASET    - Sanity dataset (default: production)
  SANITY_API_TOKEN              - Sanity API token with write permissions
        `);
        break;
        
      default:
        console.error(`Unknown command: ${command}`);
        console.log('Run "node fix-faq-migration.js help" for usage information.');
        process.exit(1);
    }
    
  } catch (error) {
    console.error('Script failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { migrateFaqData, validateMigration };