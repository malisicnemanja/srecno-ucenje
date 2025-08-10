#!/usr/bin/env node

/**
 * MIGRATION SCRIPT: quiz
 * 
 * Consolidates: quiz, quizResult
 * Target: Quizzes & Interactive Content
 * Category: content
 * 
 * This script migrates data from multiple source schemas into the consolidated quiz schema.
 */

const { sanityClient } = require('../sanity-client');

async function migrateQuiz() {
  console.log('🚀 Starting quiz migration...');
  
  try {
    // Step 1: Fetch all documents from source schemas
    const sourceTypes = ["quiz","quizResult"];
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
      console.log('  ℹ️  No documents to migrate for quiz');
      return { success: true, migrated: 0 };
    }
    
    // Step 2: Transform documents to new schema structure
    const transformedDocuments = sourceDocuments.map(doc => transformDocumentQuiz(doc));
    
    // Step 3: Create new documents in consolidated schema
    const results = [];
    for (const doc of transformedDocuments) {
      try {
        const result = await sanityClient.create({
          ...doc,
          _type: 'quiz',
          _id: doc._id ? `quiz-${doc._id}` : undefined,
          migratedFrom: doc._sourceType,
          migrationDate: new Date().toISOString()
        });
        results.push(result);
      } catch (error) {
        console.error(`  ❌ Failed to migrate document ${doc._id}: ${error.message}`);
      }
    }
    
    console.log(`✅ Successfully migrated ${results.length}/${transformedDocuments.length} documents to quiz`);
    return { success: true, migrated: results.length, total: transformedDocuments.length };
    
  } catch (error) {
    console.error(`❌ Migration failed for quiz: ${error.message}`);
    return { success: false, error: error.message };
  }
}

function transformDocumentQuiz(doc) {
  // TODO: Implement specific transformation logic for quiz
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
  // Example transformations based on quiz:
  
  // Add specific transformation logic for quiz
  // Preserve all important fields from source schemas
  
  return transformed;
}

module.exports = {
  migrate: migrateQuiz,
  transform: transformDocumentQuiz
};

if (require.main === module) {
  migrateQuiz()
    .then(result => {
      console.log('Migration result:', result);
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}
