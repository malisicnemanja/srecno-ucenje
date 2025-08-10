#!/usr/bin/env node

/**
 * MODIFIED SAFE Sanity CMS Cleanup Script
 * Based on validation results - EXCLUDES items with references
 * Generated on: 2025-08-08T06:15:00.000Z
 * 
 * This version only processes items that are safe to delete
 */

const { createClient } = require('@sanity/client');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Configuration
const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03'
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// SAFE CLEANUP PLAN - Only items without references
const SAFE_CLEANUP_PLAN = {
  // Calculator results - all safe to delete
  calculatorResults: [
    "EIn1TO6kzkBkpMuRkFfJpQ", "EIn1TO6kzkBkpMuRkFgcGy", "EIn1TO6kzkBkpMuRkGY5vK",
    "EIn1TO6kzkBkpMuRkGYjyV", "RSzTvGgTwtY6EErbXmHqYB", "RSzTvGgTwtY6EErbXmHqln",
    "RSzTvGgTwtY6EErbXmHqw0", "RSzTvGgTwtY6EErbXmHr6D", "SBvfECCtZ11PRIA8QdD56u",
    "SVDvN8W2oCA8eZWngUb3qw", "SVDvN8W2oCA8eZWngUb44R", "hZm6tMI3obk6ZBXKfAWHZt",
    "rWY7A01dUL9wO4NRCjB8Qe"
  ],

  // About authors - safe to delete
  aboutAuthors: [
    "drafts.EIn1TO6kzkBkpMuRkFy78E",
    "aboutAuthor"
  ],

  // FAQ items - safe to delete (but NOT categories!)
  duplicateFAQs: [
    "faq-004b5dd6-4e27-44b9-b81e-272926286923", "faq-d8458672-bb94-43d6-add6-d58e303db918",
    "hZm6tMI3obk6ZBXKfA9sBt", "faq-ab5790e3-1967-417c-ae85-6bef73049303",
    "hZm6tMI3obk6ZBXKfA9sKt", "hWo33GCGxd3rDeD5Tiy8qn",
    "faq-3cc31acd-a09d-4791-9885-b5c38548cf61", "faq-972fa3d6-32fd-43ca-b04f-af17005a94e0",
    "faq-6fccd843-098b-4c2e-9801-d28222e56e0c", "faq-e467af0f-3cf4-4644-8a64-77a14612877e",
    "faq-e0121326-a7b0-4624-84ce-ca38beb1ed7a", "faq-fdd378f5-77ac-4b3d-b98c-beeaf2f26da5",
    "faq-fd10a8ca-25d8-4ee8-ae39-8b250364c921"
  ],

  // Non-franchise testimonials for review
  reviewTestimonials: [
    "EIn1TO6kzkBkpMuRkFFeUO", "drafts.EIn1TO6kzkBkpMuRkFFeUO",
    "testimonial-0e3d1429-e8a4-4a0d-bf98-9b15a1bb7ced", "testimonial-1",
    "testimonial-1888d872-17b3-4c75-8900-32ec08037c08", "testimonial-2",
    "testimonial-3", "testimonial-4", "testimonial-40999edb-2ea0-439d-a030-5bbf345356ea",
    "testimonial-5", "testimonial-f8b93849-4a48-43b9-85bd-242cd3051cea"
  ]
};

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.toLowerCase().trim());
    });
  });
}

function logProgress(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const symbols = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️', progress: '🔄' };
  
  console.log(`${symbols[type]} [${timestamp}] ${message}`);
  
  const logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}\n`;
  fs.appendFileSync('safe-cleanup-log.txt', logMessage);
}

async function confirmAction(action, count) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📋 ABOUT TO ${action.toUpperCase()}`);
  console.log(`Items to process: ${count}`);
  console.log(`${'='.repeat(60)}\n`);
  
  const answer = await askQuestion(`⚠️  Are you sure you want to proceed with ${action}? (yes/no): `);
  return answer === 'yes' || answer === 'y';
}

async function batchDelete(items, itemType, batchSize = 5) {
  logProgress(`Starting batch deletion of ${items.length} ${itemType} items`, 'progress');
  
  const results = { successful: 0, failed: 0, errors: [] };

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    logProgress(`Processing batch ${Math.floor(i/batchSize) + 1} (${batch.length} items)`, 'progress');

    for (const itemId of batch) {
      try {
        logProgress(`Deleting ${itemType}: ${itemId}`, 'progress');
        await client.delete(itemId);
        results.successful++;
        logProgress(`Successfully deleted: ${itemId}`, 'success');
        
        await new Promise(resolve => setTimeout(resolve, 200));
        
      } catch (error) {
        results.failed++;
        const errorMsg = `Failed to delete ${itemId}: ${error.message}`;
        results.errors.push({ id: itemId, error: error.message });
        logProgress(errorMsg, 'error');
      }
    }

    const progress = Math.round((i + batchSize) / items.length * 100);
    logProgress(`Progress: ${Math.min(progress, 100)}% (${results.successful + results.failed}/${items.length})`, 'info');
    
    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }

  return results;
}

async function updateLocationFields() {
  logProgress('Updating location fields: centerCount → centreCount', 'progress');
  
  try {
    const locations = await client.fetch(`
      *[_type == "locationData" && defined(centerCount) && !defined(centreCount)] {
        _id, _rev, city, centerCount
      }
    `);

    logProgress(`Found ${locations.length} locations to update`, 'info');

    let successful = 0, failed = 0;

    for (const location of locations) {
      try {
        await client
          .patch(location._id)
          .set({ centreCount: location.centerCount })
          .unset(['centerCount'])
          .commit();
        
        successful++;
        logProgress(`Updated ${location.city}: centerCount → centreCount (${location.centerCount})`, 'success');
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        failed++;
        logProgress(`Failed to update ${location.city}: ${error.message}`, 'error');
      }
    }

    return { successful, failed, total: locations.length };
    
  } catch (error) {
    logProgress(`Error updating locations: ${error.message}`, 'error');
    return { successful: 0, failed: 0, total: 0 };
  }
}

async function main() {
  console.log('🚀 SAFE SANITY CMS CLEANUP (MODIFIED)');
  console.log('=' .repeat(60));
  console.log('This version ONLY processes items without references.');
  console.log('Franchise fields and FAQ categories are SKIPPED for safety.');
  console.log('=' .repeat(60));

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  logProgress(`Starting SAFE cleanup session - ${timestamp}`, 'info');
  
  try {
    logProgress('Testing Sanity client connection...', 'progress');
    await client.fetch('*[_type == "sanitySchema"] | order(_id)[0]');
    logProgress('Connected to Sanity successfully', 'success');
    
  } catch (error) {
    logProgress(`Failed to connect to Sanity: ${error.message}`, 'error');
    console.log('\n🔧 Please check your configuration');
    rl.close();
    return;
  }

  const results = {};

  try {
    // Step 1: Calculator Results (13 items)
    console.log('\n🧮 CALCULATOR RESULTS CLEANUP');
    console.log('These are temporary calculation results and safe to delete.');
    console.log(`Items to delete: ${SAFE_CLEANUP_PLAN.calculatorResults.length}`);
    
    if (await confirmAction('delete calculator results', SAFE_CLEANUP_PLAN.calculatorResults.length)) {
      results.calculatorResults = await batchDelete(SAFE_CLEANUP_PLAN.calculatorResults, 'calculator result', 5);
    } else {
      results.calculatorResults = { skipped: true };
    }

    // Step 2: About Authors (2 items)
    console.log('\n👤 ABOUT AUTHORS CLEANUP');
    console.log('Removing duplicate author documents (keeping most complete).');
    console.log(`Items to delete: ${SAFE_CLEANUP_PLAN.aboutAuthors.length}`);
    
    if (await confirmAction('delete duplicate authors', SAFE_CLEANUP_PLAN.aboutAuthors.length)) {
      results.authors = await batchDelete(SAFE_CLEANUP_PLAN.aboutAuthors, 'about author', 3);
    } else {
      results.authors = { skipped: true };
    }

    // Step 3: FAQ Items only (13 items) - SKIPPING Categories!
    console.log('\n❓ FAQ ITEMS CLEANUP (Categories SKIPPED for safety)');
    console.log(`FAQ Items to delete: ${SAFE_CLEANUP_PLAN.duplicateFAQs.length}`);
    console.log('⚠️ FAQ Categories are SKIPPED because they have active references');
    
    if (await confirmAction('delete duplicate FAQ items', SAFE_CLEANUP_PLAN.duplicateFAQs.length)) {
      results.faqs = await batchDelete(SAFE_CLEANUP_PLAN.duplicateFAQs, 'FAQ item', 6);
    } else {
      results.faqs = { skipped: true };
    }

    // Step 4: Testimonials Review
    console.log('\n💬 NON-FRANCHISE TESTIMONIALS REVIEW');
    console.log(`Found ${SAFE_CLEANUP_PLAN.reviewTestimonials.length} non-franchise testimonials`);
    console.log('These are parent/student testimonials, not franchise business testimonials.');
    
    if (await confirmAction('delete non-franchise testimonials', SAFE_CLEANUP_PLAN.reviewTestimonials.length)) {
      results.testimonials = await batchDelete(SAFE_CLEANUP_PLAN.reviewTestimonials, 'testimonial', 4);
    } else {
      results.testimonials = { skipped: true };
    }

    // Step 5: Location Updates
    console.log('\n🏢 LOCATION FIELD UPDATES');
    console.log('Updating "centerCount" to "centreCount" (British spelling)');
    
    if (await confirmAction('update location field names', 7)) {
      results.locations = await updateLocationFields();
    } else {
      results.locations = { skipped: true };
    }

  } catch (error) {
    logProgress(`Critical error during cleanup: ${error.message}`, 'error');
  }

  // Final Report
  console.log('\n📊 CLEANUP SUMMARY');
  console.log('=' .repeat(60));
  
  let totalProcessed = 0;
  let totalErrors = 0;
  
  Object.entries(results).forEach(([category, result]) => {
    if (result && !result.skipped) {
      const successful = result.successful || 0;
      const failed = result.failed || 0;
      
      console.log(`${category}: ✅ ${successful} success, ❌ ${failed} errors`);
      totalProcessed += successful;
      totalErrors += failed;
    } else if (result && result.skipped) {
      console.log(`${category}: ⏭️  Skipped by user`);
    }
  });
  
  console.log('=' .repeat(60));
  console.log(`🎯 Total Items Processed: ${totalProcessed}`);
  console.log(`❌ Total Errors: ${totalErrors}`);
  console.log(`📝 Log saved to: safe-cleanup-log.txt`);
  
  console.log('\n⚠️ IMPORTANT NOTES:');
  console.log('- Franchise fields were KEPT (they have active references)');
  console.log('- FAQ categories were KEPT (they have active references)');
  console.log('- Only safe-to-delete items were processed');
  
  if (totalErrors === 0 && totalProcessed > 0) {
    logProgress('🎉 Safe cleanup completed successfully!', 'success');
  } else if (totalProcessed === 0) {
    logProgress('ℹ️ No items were processed (all skipped)', 'info');
  } else {
    logProgress(`⚠️ Cleanup completed with ${totalErrors} errors.`, 'warning');
  }

  rl.close();
}

process.on('SIGINT', () => {
  console.log('\n\n⚠️ Cleanup interrupted by user');
  logProgress('Cleanup interrupted by user', 'warning');
  rl.close();
  process.exit(0);
});

if (require.main === module) {
  main().catch(error => {
    logProgress(`Fatal error: ${error.message}`, 'error');
    console.error('💥 Fatal error occurred:', error);
    rl.close();
    process.exit(1);
  });
}

module.exports = main;