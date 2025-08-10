#!/usr/bin/env node

/**
 * MIGRATION SCRIPT: franchiseApplication
 * 
 * Consolidates: franchiseApplication, franchiseApplicationSubmission, franchiseField, enhancedFranchiseField, franchiseSection, franchiseMotivational, franchiseSteps, franchiseProcess
 * Target: Franchise Applications
 * Category: franchise
 * 
 * This script migrates data from multiple source schemas into the consolidated franchiseApplication schema.
 */

const { sanityClient } = require('../sanity-client');

async function migrateFranchiseApplication() {
  console.log('🚀 Starting franchiseApplication migration...');
  
  try {
    // Step 1: Fetch all documents from source schemas
    const sourceTypes = ["franchiseApplication","franchiseApplicationSubmission","franchiseField","enhancedFranchiseField","franchiseSection","franchiseMotivational","franchiseSteps","franchiseProcess"];
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
      console.log('  ℹ️  No documents to migrate for franchiseApplication');
      return { success: true, migrated: 0 };
    }
    
    // Step 2: Transform documents to new schema structure
    const transformedDocuments = sourceDocuments.map(doc => transformDocumentFranchiseApplication(doc));
    
    // Step 3: Create new documents in consolidated schema
    const results = [];
    for (const doc of transformedDocuments) {
      try {
        const result = await sanityClient.create({
          ...doc,
          _type: 'franchiseApplication',
          _id: doc._id ? `franchiseApplication-${doc._id}` : undefined,
          migratedFrom: doc._sourceType,
          migrationDate: new Date().toISOString()
        });
        results.push(result);
      } catch (error) {
        console.error(`  ❌ Failed to migrate document ${doc._id}: ${error.message}`);
      }
    }
    
    console.log(`✅ Successfully migrated ${results.length}/${transformedDocuments.length} documents to franchiseApplication`);
    return { success: true, migrated: results.length, total: transformedDocuments.length };
    
  } catch (error) {
    console.error(`❌ Migration failed for franchiseApplication: ${error.message}`);
    return { success: false, error: error.message };
  }
}

function transformDocumentFranchiseApplication(doc) {
  // TODO: Implement specific transformation logic for franchiseApplication
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
  // Example transformations based on franchiseApplication:
  
  // Handle form fields
  if (doc._sourceType === 'franchiseField' || doc._sourceType === 'enhancedFranchiseField') {
    transformed.formFields = transformed.formFields || [];
    transformed.formFields.push({
      name: doc.name,
      type: doc.type,
      label: doc.label,
      required: doc.required,
      validation: doc.validation
    });
  }
  
  // Handle submissions
  if (doc._sourceType === 'franchiseApplicationSubmission') {
    transformed.applicationData = doc.data;
    transformed.status = doc.status;
    transformed.submissionDate = doc.submissionDate;
  }
  
  return transformed;
}

module.exports = {
  migrate: migrateFranchiseApplication,
  transform: transformDocumentFranchiseApplication
};

if (require.main === module) {
  migrateFranchiseApplication()
    .then(result => {
      console.log('Migration result:', result);
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}
