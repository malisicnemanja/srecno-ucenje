#!/usr/bin/env node

/**
 * AUTOMATED SAFE Sanity CMS Cleanup Script
 * Non-interactive version that executes the cleanup automatically
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03'
});

const SAFE_ITEMS = {
  calculatorResults: [
    "EIn1TO6kzkBkpMuRkFfJpQ", "EIn1TO6kzkBkpMuRkFgcGy", "EIn1TO6kzkBkpMuRkGY5vK",
    "EIn1TO6kzkBkpMuRkGYjyV", "RSzTvGgTwtY6EErbXmHqYB", "RSzTvGgTwtY6EErbXmHqln",
    "RSzTvGgTwtY6EErbXmHqw0", "RSzTvGgTwtY6EErbXmHr6D", "SBvfECCtZ11PRIA8QdD56u",
    "SVDvN8W2oCA8eZWngUb3qw", "SVDvN8W2oCA8eZWngUb44R", "hZm6tMI3obk6ZBXKfAWHZt",
    "rWY7A01dUL9wO4NRCjB8Qe"
  ],
  aboutAuthors: [
    "drafts.EIn1TO6kzkBkpMuRkFy78E",
    "aboutAuthor"
  ],
  duplicateFAQs: [
    "faq-004b5dd6-4e27-44b9-b81e-272926286923", "faq-d8458672-bb94-43d6-add6-d58e303db918",
    "hZm6tMI3obk6ZBXKfA9sBt", "faq-ab5790e3-1967-417c-ae85-6bef73049303",
    "hZm6tMI3obk6ZBXKfA9sKt", "hWo33GCGxd3rDeD5Tiy8qn",
    "faq-3cc31acd-a09d-4791-9885-b5c38548cf61", "faq-972fa3d6-32fd-43ca-b04f-af17005a94e0",
    "faq-6fccd843-098b-4c2e-9801-d28222e56e0c", "faq-e467af0f-3cf4-4644-8a64-77a14612877e",
    "faq-e0121326-a7b0-4624-84ce-ca38beb1ed7a", "faq-fdd378f5-77ac-4b3d-b98c-beeaf2f26da5",
    "faq-fd10a8ca-25d8-4ee8-ae39-8b250364c921"
  ]
};

function logProgress(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const symbols = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️', progress: '🔄' };
  
  console.log(`${symbols[type]} [${timestamp}] ${message}`);
  
  const logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}\n`;
  fs.appendFileSync('automated-cleanup-log.txt', logMessage);
}

async function batchDelete(items, itemType, batchSize = 5) {
  logProgress(`Starting deletion of ${items.length} ${itemType} items`, 'progress');
  
  const results = { successful: 0, failed: 0, errors: [] };

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    logProgress(`Processing batch ${Math.floor(i/batchSize) + 1} (${batch.length} items)`, 'progress');

    for (const itemId of batch) {
      try {
        await client.delete(itemId);
        results.successful++;
        logProgress(`Successfully deleted ${itemType}: ${itemId}`, 'success');
        
        // Small delay to be gentle on API
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
    
    // Pause between batches
    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
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
  console.log('🤖 AUTOMATED SAFE SANITY CMS CLEANUP');
  console.log('=' .repeat(60));
  console.log('Executing safe cleanup automatically...');
  console.log('=' .repeat(60));

  const timestamp = new Date().toISOString();
  logProgress(`Starting automated cleanup session - ${timestamp}`, 'info');
  
  try {
    logProgress('Testing connection...', 'progress');
    await client.fetch('*[_type == "sanitySchema"] | order(_id)[0]');
    logProgress('Connected to Sanity successfully', 'success');
    
  } catch (error) {
    logProgress(`Connection failed: ${error.message}`, 'error');
    return { error: 'Connection failed' };
  }

  const results = {};

  try {
    // Step 1: Calculator Results
    console.log('\n🧮 Cleaning calculator results...');
    results.calculatorResults = await batchDelete(SAFE_ITEMS.calculatorResults, 'calculator result', 5);

    // Step 2: About Authors
    console.log('\n👤 Cleaning duplicate authors...');
    results.authors = await batchDelete(SAFE_ITEMS.aboutAuthors, 'about author', 2);

    // Step 3: FAQ Items
    console.log('\n❓ Cleaning duplicate FAQ items...');
    results.faqs = await batchDelete(SAFE_ITEMS.duplicateFAQs, 'FAQ item', 6);

    // Step 4: Location Updates
    console.log('\n🏢 Updating location fields...');
    results.locations = await updateLocationFields();

  } catch (error) {
    logProgress(`Critical error: ${error.message}`, 'error');
  }

  // Final Report
  console.log('\n📊 CLEANUP RESULTS');
  console.log('=' .repeat(60));
  
  let totalProcessed = 0;
  let totalErrors = 0;
  
  Object.entries(results).forEach(([category, result]) => {
    if (result) {
      const successful = result.successful || 0;
      const failed = result.failed || 0;
      
      console.log(`${category}: ✅ ${successful} success, ❌ ${failed} errors`);
      totalProcessed += successful;
      totalErrors += failed;
      
      if (failed > 0 && result.errors) {
        console.log(`  Errors: ${result.errors.map(e => e.id).join(', ')}`);
      }
    }
  });
  
  console.log('=' .repeat(60));
  console.log(`🎯 Total Processed: ${totalProcessed}`);
  console.log(`❌ Total Errors: ${totalErrors}`);
  
  const summary = {
    totalProcessed,
    totalErrors,
    results,
    completedAt: new Date().toISOString()
  };

  fs.writeFileSync('cleanup-summary.json', JSON.stringify(summary, null, 2));
  logProgress(`Summary saved to cleanup-summary.json`, 'info');

  if (totalErrors === 0) {
    logProgress('🎉 Cleanup completed successfully!', 'success');
  } else {
    logProgress(`⚠️ Cleanup completed with ${totalErrors} errors`, 'warning');
  }

  return summary;
}

if (require.main === module) {
  main().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
}

module.exports = main;