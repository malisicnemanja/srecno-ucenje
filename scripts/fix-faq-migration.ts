#!/usr/bin/env tsx

/**
 * FAQ Migration Fix Script
 * 
 * This script fixes the FAQ migration by:
 * 1. Creating FAQ categories first with proper IDs  
 * 2. Creating a mapping between problematic and correct category IDs
 * 3. Migrating FAQs with correct category references
 * 4. Ensuring NO data is lost
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

// Types
interface FaqCategory {
  _id: string;
  _type: 'faqCategory';
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
  name?: string;
  title?: string;
  description?: string;
  slug?: string | { current: string };
  order?: number;
  isActive?: boolean;
  icon?: string;
  color?: string;
  backReferences?: any[];
  references?: any[];
}

interface Faq {
  _id: string;
  _type: 'faq';
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
  question: string;
  answer: string;
  category?: {
    _type: 'reference';
    _ref: string;
  };
  order?: number;
  isActive?: boolean;
  tags?: string[];
  backReferences?: any[];
  references?: any[];
}

interface MigrationResults {
  categories: {
    successful: Array<{ id: string; result: any }>;
    failed: Array<{ id: string; error: string; document: any }>;
    total: number;
  };
  faqs: {
    successful: Array<{ id: string; result: any }>;
    failed: Array<{ id: string; error: string; document: any }>;
    total: number;
  };
  summary: {
    startTime: string;
    endTime: string | null;
    totalCategories: number;
    totalFaqs: number;
    successfulCategories: number;
    successfulFaqs: number;
    failedCategories: number;
    failedFaqs: number;
  };
  error?: string;
}

// Sanity client setup
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '08ctxj6y',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03'
});

// Configuration
const backupDir = '/Users/nemanjamalisic/Desktop/srecno-ucenje 2/sanity-exports/backup-2025-08-07T21-59-23-965Z';

// Category ID mapping - maps problematic references to existing ones
const categoryIdMapping: Record<string, string> = {
  'faq-category-general': 'faqCategory.general',
  'faq-category-programs': 'faqCategory.programs', 
  'faq-category-franchise': 'faqCategory.franchise',
  'faq-category-technical': 'faqCategory.technical',
  'faq-category-opsta-pitanja': 'faqCategory.opsta-pitanja'
};

// Utility functions
function loadJsonFile(filename: string): any {
  const filePath = path.join(backupDir, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function saveResults(results: any, filename: string): void {
  const outputPath = path.join(backupDir, filename);
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`📁 Results saved to: ${outputPath}`);
}

// Clean and prepare category document for migration
function prepareCategoryDocument(doc: FaqCategory): FaqCategory {
  const cleanDoc: FaqCategory = {
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
    if ((cleanDoc as any)[key] === undefined) {
      delete (cleanDoc as any)[key];
    }
  });

  return cleanDoc;
}

// Clean and prepare FAQ document for migration
function prepareFaqDocument(doc: Faq, categoryMapping: Record<string, string>): Faq {
  let categoryRef = null;
  
  if (doc.category && doc.category._ref) {
    const originalRef = doc.category._ref;
    // Check if we need to map this reference
    const mappedRef = categoryMapping[originalRef] || originalRef;
    categoryRef = {
      _type: 'reference' as const,
      _ref: mappedRef
    };
  }

  const cleanDoc: Faq = {
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
    if ((cleanDoc as any)[key] === undefined) {
      delete (cleanDoc as any)[key];
    }
  });

  return cleanDoc;
}

// Batch create documents with error handling
async function batchCreateDocuments(documents: any[], docType: string) {
  const results = {
    successful: [] as Array<{ id: string; result: any }>,
    failed: [] as Array<{ id: string; error: string; document: any }>,
    total: documents.length
  };

  console.log(`\n📦 Creating ${documents.length} ${docType} documents...`);

  // Process in batches of 5 to avoid overwhelming Sanity
  const batchSize = 5;
  for (let i = 0; i < documents.length; i += batchSize) {
    const batch = documents.slice(i, i + batchSize);
    
    console.log(`Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(documents.length/batchSize)}...`);

    await Promise.all(batch.map(async (doc: any) => {
      try {
        // Use createOrReplace to handle existing documents
        const result = await client.createOrReplace(doc);
        results.successful.push({
          id: doc._id,
          result: result
        });
        console.log(`✅ ${docType} created: ${doc._id}`);
      } catch (error: any) {
        console.error(`❌ Failed to create ${docType} ${doc._id}:`, error.message);
        results.failed.push({
          id: doc._id,
          error: error.message,
          document: doc
        });
      }
    }));

    // Small delay between batches to be gentle on Sanity
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return results;
}

// Main migration function
async function migrateFaqData(): Promise<MigrationResults> {
  console.log('🚀 Starting FAQ migration fix...\n');
  
  const migrationResults: MigrationResults = {
    categories: { successful: [], failed: [], total: 0 },
    faqs: { successful: [], failed: [], total: 0 },
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
    
    const categories: FaqCategory[] = faqCategoriesData.documents || [];
    const faqs: Faq[] = faqsData.documents || [];
    
    migrationResults.summary.totalCategories = categories.length;
    migrationResults.summary.totalFaqs = faqs.length;
    
    console.log(`📊 Found ${categories.length} FAQ categories and ${faqs.length} FAQs`);

    // Step 2: Prepare categories with missing ones for broken references
    console.log('\n🏗️  Preparing FAQ categories...');
    const preparedCategories = categories.map(prepareCategoryDocument);
    
    // Create fallback categories for the problematic references if they don't exist
    const missingCategories: FaqCategory[] = [];
    Object.entries(categoryIdMapping).forEach(([wrongId, correctId]) => {
      // Check if the correct category exists in our prepared categories
      const existsCorrect = preparedCategories.find(cat => cat._id === correctId);
      // Check if the wrong ID already exists (it shouldn't)
      const existsWrong = preparedCategories.find(cat => cat._id === wrongId);
      
      if (!existsCorrect && !existsWrong) {
        // Create the missing category with the wrong ID so FAQs can reference it
        missingCategories.push({
          _id: wrongId, // Use the ID that FAQs are actually referencing
          _type: 'faqCategory',
          name: 'General Questions',
          title: 'General Questions', 
          description: 'General FAQ category (auto-created)',
          slug: wrongId.replace('faq-category-', ''),
          order: 1,
          isActive: true,
          icon: '❓',
          color: 'primary'
        });
      }
    });

    const allCategories = [...preparedCategories, ...missingCategories];
    console.log(`📋 Preparing ${allCategories.length} categories (${missingCategories.length} auto-created)`);
    
    // Step 3: Create categories first
    migrationResults.categories = await batchCreateDocuments(allCategories, 'FAQ Category');
    migrationResults.summary.successfulCategories = migrationResults.categories.successful.length;
    migrationResults.summary.failedCategories = migrationResults.categories.failed.length;

    // Step 4: Wait for categories to be available in Sanity
    console.log('\n⏳ Waiting for categories to be available...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Step 5: Prepare and create FAQs with corrected references
    console.log('\n🏗️  Preparing FAQ documents...');
    const preparedFaqs = faqs.map(faq => prepareFaqDocument(faq, categoryIdMapping));
    
    // Log some debug info about category references
    const categoryRefs = preparedFaqs
      .filter(faq => faq.category)
      .map(faq => faq.category!._ref)
      .filter((ref, index, arr) => arr.indexOf(ref) === index);
    
    console.log(`📋 Found ${categoryRefs.length} unique category references:`, categoryRefs);
    
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
      
      // Show failed items
      if (migrationResults.categories.failed.length > 0) {
        console.log('\n❌ Failed categories:');
        migrationResults.categories.failed.forEach(item => {
          console.log(`  - ${item.id}: ${item.error}`);
        });
      }
      
      if (migrationResults.faqs.failed.length > 0) {
        console.log('\n❌ Failed FAQs:');
        migrationResults.faqs.failed.forEach(item => {
          console.log(`  - ${item.id}: ${item.error}`);
        });
      }
    }

    return migrationResults;

  } catch (error: any) {
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
    
    console.log(`📊 Found ${categories.length} FAQ categories in Sanity`);
    console.log(`📊 Found ${faqs.length} FAQs in Sanity`);
    
    // Check for orphaned FAQs (FAQs without valid category references)
    const orphanedFaqs = faqs.filter((faq: any) => {
      if (!faq.category || !faq.category._ref) return true;
      return !categories.find((cat: any) => cat._id === faq.category._ref);
    });
    
    if (orphanedFaqs.length > 0) {
      console.log(`⚠️  Found ${orphanedFaqs.length} orphaned FAQs:`);
      orphanedFaqs.forEach((faq: any) => {
        console.log(`  - ${faq._id}: references "${faq.category?._ref || 'null'}"`);
      });
    } else {
      console.log('✅ All FAQs have valid category references');
    }
    
    // List categories
    console.log('\n📋 FAQ Categories:');
    categories.forEach((cat: any) => {
      console.log(`  - ${cat._id}: ${cat.name || cat.title}`);
    });
    
    return { categories, faqs, orphanedFaqs };
    
  } catch (error: any) {
    console.error('❌ Validation failed:', error);
    throw error;
  }
}

// Main execution
async function main() {
  const command = process.argv[2] || 'migrate';
  
  try {
    // Check environment variables
    const token = process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
    if (!token) {
      console.error('❌ Missing required Sanity API token:');
      console.error('   Set either NEXT_PUBLIC_SANITY_WRITE_TOKEN or SANITY_API_TOKEN');
      console.error('\nMake sure this is set in your .env.local file');
      console.error('\nGet a token from: https://sanity.io/manage');
      process.exit(1);
    }
    
    console.log(`📡 Using Sanity project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '08ctxj6y'}`);
    console.log(`📊 Using dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`);
    
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
  npx tsx scripts/fix-faq-migration.ts [command]

Commands:
  migrate    - Run the full FAQ migration (default)
  validate   - Validate current FAQ data in Sanity  
  help       - Show this help message

Environment Variables:
  NEXT_PUBLIC_SANITY_PROJECT_ID - Sanity project ID (default: 08ctxj6y)
  NEXT_PUBLIC_SANITY_DATASET    - Sanity dataset (default: production)
  NEXT_PUBLIC_SANITY_WRITE_TOKEN - Sanity API token with write permissions
  (or SANITY_API_TOKEN)         - Alternative token variable name
        `);
        break;
        
      default:
        console.error(`❌ Unknown command: ${command}`);
        console.log('Run "npx tsx scripts/fix-faq-migration.ts help" for usage information.');
        process.exit(1);
    }
    
  } catch (error: any) {
    console.error('💥 Script failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { migrateFaqData, validateMigration };