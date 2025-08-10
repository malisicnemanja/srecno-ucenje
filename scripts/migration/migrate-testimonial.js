#!/usr/bin/env node

/**
 * MIGRATION SCRIPT: testimonial
 * 
 * Consolidates: testimonial, modernTestimonial, successStory, experience
 * Target: Testimonials & Stories
 * Category: people
 * 
 * This script migrates data from multiple source schemas into the consolidated testimonial schema.
 */

const { sanityClient } = require('../sanity-client');

async function migrateTestimonial() {
  console.log('🚀 Starting testimonial migration...');
  
  try {
    // Step 1: Fetch all documents from source schemas
    const sourceTypes = ["testimonial","modernTestimonial","successStory","experience"];
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
      console.log('  ℹ️  No documents to migrate for testimonial');
      return { success: true, migrated: 0 };
    }
    
    // Step 2: Transform documents to new schema structure
    const transformedDocuments = sourceDocuments.map(doc => transformDocumentTestimonial(doc));
    
    // Step 3: Create new documents in consolidated schema
    const results = [];
    for (const doc of transformedDocuments) {
      try {
        const result = await sanityClient.create({
          ...doc,
          _type: 'testimonial',
          _id: doc._id ? `testimonial-${doc._id}` : undefined,
          migratedFrom: doc._sourceType,
          migrationDate: new Date().toISOString()
        });
        results.push(result);
      } catch (error) {
        console.error(`  ❌ Failed to migrate document ${doc._id}: ${error.message}`);
      }
    }
    
    console.log(`✅ Successfully migrated ${results.length}/${transformedDocuments.length} documents to testimonial`);
    return { success: true, migrated: results.length, total: transformedDocuments.length };
    
  } catch (error) {
    console.error(`❌ Migration failed for testimonial: ${error.message}`);
    return { success: false, error: error.message };
  }
}

function transformDocumentTestimonial(doc) {
  // TODO: Implement specific transformation logic for testimonial
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
  // Example transformations based on testimonial:
  
  // Add specific transformation logic for testimonial
  // Preserve all important fields from source schemas
  
  return transformed;
}

module.exports = {
  migrate: migrateTestimonial,
  transform: transformDocumentTestimonial
};

if (require.main === module) {
  migrateTestimonial()
    .then(result => {
      console.log('Migration result:', result);
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}
