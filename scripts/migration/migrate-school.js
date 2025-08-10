#!/usr/bin/env node

/**
 * MIGRATION SCRIPT: school
 * 
 * Consolidates: school, location, locationData, modernFranchiseLocation
 * Target: Schools & Locations
 * Category: franchise
 * 
 * This script migrates data from multiple source schemas into the consolidated school schema.
 */

const { sanityClient } = require('../sanity-client');

async function migrateSchool() {
  console.log('🚀 Starting school migration...');
  
  try {
    // Step 1: Fetch all documents from source schemas
    const sourceTypes = ["school","location","locationData","modernFranchiseLocation"];
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
      console.log('  ℹ️  No documents to migrate for school');
      return { success: true, migrated: 0 };
    }
    
    // Step 2: Transform documents to new schema structure
    const transformedDocuments = sourceDocuments.map(doc => transformDocumentSchool(doc));
    
    // Step 3: Create new documents in consolidated schema
    const results = [];
    for (const doc of transformedDocuments) {
      try {
        const result = await sanityClient.create({
          ...doc,
          _type: 'school',
          _id: doc._id ? `school-${doc._id}` : undefined,
          migratedFrom: doc._sourceType,
          migrationDate: new Date().toISOString()
        });
        results.push(result);
      } catch (error) {
        console.error(`  ❌ Failed to migrate document ${doc._id}: ${error.message}`);
      }
    }
    
    console.log(`✅ Successfully migrated ${results.length}/${transformedDocuments.length} documents to school`);
    return { success: true, migrated: results.length, total: transformedDocuments.length };
    
  } catch (error) {
    console.error(`❌ Migration failed for school: ${error.message}`);
    return { success: false, error: error.message };
  }
}

function transformDocumentSchool(doc) {
  // TODO: Implement specific transformation logic for school
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
  // Example transformations based on school:
  
  // Merge location data
  if (doc._sourceType === 'locationData') {
    transformed.address = doc.address;
    transformed.coordinates = doc.coordinates;
    transformed.contactInfo = doc.contactInfo;
  }
  
  // Modern franchise location data
  if (doc._sourceType === 'modernFranchiseLocation') {
    transformed.facilities = doc.facilities;
    transformed.capacity = doc.capacity;
    transformed.programs = doc.programs;
  }
  
  return transformed;
}

module.exports = {
  migrate: migrateSchool,
  transform: transformDocumentSchool
};

if (require.main === module) {
  migrateSchool()
    .then(result => {
      console.log('Migration result:', result);
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}
