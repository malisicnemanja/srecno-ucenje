#!/usr/bin/env node

/**
 * MIGRATION SCRIPT: franchise
 * 
 * Consolidates: franchisePackage, modernFranchisePackage, franchiseModelsPage, howToJoinPage, franchiseApplicationPage, financialCalculatorPage, schoolsPage
 * Target: Franchise Management
 * Category: franchise
 * 
 * This script migrates data from multiple source schemas into the consolidated franchise schema.
 */

const { sanityClient } = require('../sanity-client');

async function migrateFranchise() {
  console.log('🚀 Starting franchise migration...');
  
  try {
    // Step 1: Fetch all documents from source schemas
    const sourceTypes = ["franchisePackage","modernFranchisePackage","franchiseModelsPage","howToJoinPage","franchiseApplicationPage","financialCalculatorPage","schoolsPage"];
    const sourceDocuments = [];
    
    for (const sourceType of sourceTypes) {
      try {
        const docs = await sanityClient.fetch(`*[_type == "${sourceType}"]`);
        sourceDocuments.push(...docs.map(doc => ({...doc, _sourceType: sourceType})));
        console.log(`  ✅ Found ${docs.length} documents of type: ${sourceType}`);
      } catch (error) {
        console.log(`  ⚠️  No documents found for type: ${sourceType}`);
      }
    }
    
    if (sourceDocuments.length === 0) {
      console.log('  ℹ️  No documents to migrate for franchise');
      return { success: true, migrated: 0 };
    }
    
    // Step 2: Transform documents to new schema structure
    const transformedDocuments = sourceDocuments.map(doc => transformDocumentFranchise(doc));
    
    // Step 3: Create new documents in consolidated schema
    const results = [];
    for (const doc of transformedDocuments) {
      try {
        const result = await sanityClient.create({
          ...doc,
          _type: 'franchise',
          _id: doc._id ? `franchise-${doc._id}` : undefined,
          migratedFrom: doc._sourceType,
          migrationDate: new Date().toISOString()
        });
        results.push(result);
      } catch (error) {
        console.error(`  ❌ Failed to migrate document ${doc._id}: ${error.message}`);
      }
    }
    
    console.log(`✅ Successfully migrated ${results.length}/${transformedDocuments.length} documents to franchise`);
    return { success: true, migrated: results.length, total: transformedDocuments.length };
    
  } catch (error) {
    console.error(`❌ Migration failed for franchise: ${error.message}`);
    return { success: false, error: error.message };
  }
}

function transformDocumentFranchise(doc) {
  // TODO: Implement specific transformation logic for franchise
  // This is a template - customize based on actual field mappings
  
  const transformed = {
    _id: doc._id,
    _rev: doc._rev,
    _createdAt: doc._createdAt,
    _updatedAt: doc._updatedAt,
    
    // Common fields that should be preserved
    title: doc.title || doc.name,
    slug: doc.slug,
    description: doc.description,
    content: doc.content,
    seo: doc.seo,
    
    // Source tracking
    _sourceType: doc._sourceType,
    _originalId: doc._id
  };
  
  // Add schema-specific transformations here
  // Example transformations based on franchise:
  
  // Handle franchise package data
  if (doc._sourceType === 'franchisePackage' || doc._sourceType === 'modernFranchisePackage') {
    transformed.packageType = doc.type;
    transformed.pricing = doc.pricing;
    transformed.features = doc.features;
    transformed.requirements = doc.requirements;
  }
  
  // Handle page content
  if (doc._sourceType.includes('Page')) {
    transformed.pageContent = {
      hero: doc.hero,
      sections: doc.sections,
      cta: doc.cta
    };
  }
  
  return transformed;
}

module.exports = {
  migrate: migrateFranchise,
  transform: transformDocumentFranchise
};

if (require.main === module) {
  migrateFranchise()
    .then(result => {
      console.log('Migration result:', result);
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}
