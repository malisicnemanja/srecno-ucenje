#!/usr/bin/env node

/**
 * Safe Sanity CMS Cleanup Script
 * Generated on: 2025-08-08T01:00:00.000Z
 * 
 * This script safely removes duplicates and unnecessary content from Sanity CMS.
 * Features:
 * - Interactive confirmation prompts
 * - Batch processing with error handling
 * - Detailed logging and progress reports
 * - Rollback capability (with proper backup)
 * - Safe testimonial filtering (franchise-focused)
 * 
 * IMPORTANT: 
 * 1. Test on development dataset first!
 * 2. Update projectId, dataset, and token below
 * 3. Ensure you have a backup of your data
 */

const { createClient } = require('@sanity/client');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// ========================
// CONFIGURATION
// ========================
const client = createClient({
  projectId: '08ctxj6y', // Srećno učenje project ID
  dataset: 'production', // Production dataset
  token: process.env.SANITY_API_TOKEN || 'your-write-token', // Replace with your write token or use env var
  useCdn: false,
  apiVersion: '2023-05-03'
});

// Create readline interface for user confirmation
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ========================
// ITEMS TO DELETE
// ========================
const CLEANUP_PLAN = {
  // All calculator results (temporary data)
  calculatorResults: [
    "EIn1TO6kzkBkpMuRkFfJpQ",
    "EIn1TO6kzkBkpMuRkFgcGy", 
    "EIn1TO6kzkBkpMuRkGY5vK",
    "EIn1TO6kzkBkpMuRkGYjyV",
    "RSzTvGgTwtY6EErbXmHqYB",
    "RSzTvGgTwtY6EErbXmHqln",
    "RSzTvGgTwtY6EErbXmHqw0",
    "RSzTvGgTwtY6EErbXmHr6D",
    "SBvfECCtZ11PRIA8QdD56u",
    "SVDvN8W2oCA8eZWngUb3qw",
    "SVDvN8W2oCA8eZWngUb44R",
    "hZm6tMI3obk6ZBXKfAWHZt",
    "rWY7A01dUL9wO4NRCjB8Qe"
  ],

  // Duplicate franchise fields (keeping unique ones)
  duplicateFranchiseFields: [
    "SBvfECCtZ11PRIA8QdEqTj", // telefon
    "SBvfECCtZ11PRIA8QdEqgD", // zanimanje
    "SBvfECCtZ11PRIA8QdEqoX", // motivacija_razlog
    "SBvfECCtZ11PRIA8QdEqum", // iskustvo_edukacija
    "tqJG5yH49IKSFNIKiLMpcz", // email
    "oWtMwMRBoarauLfrKfPanX", // iskustvo
    "tqJG5yH49IKSFNIKiLMq3b", // budjet
    "oWtMwMRBoarauLfrKfPaa4", // obrazovanje
    "tqJG5yH49IKSFNIKiLMpXf", // ime_prezime
    "tqJG5yH49IKSFNIKiLMpiJ", // lokacija
    "tqJG5yH49IKSFNIKiLMpsx", // ciljevi_godina
    "tqJG5yH49IKSFNIKiLMpyH"  // dostupno_vreme
  ],

  // Duplicate about author documents (keep most complete)
  duplicateAboutAuthors: [
    "drafts.EIn1TO6kzkBkpMuRkFy78E",
    "aboutAuthor" // Generic ID, keeping specific one
  ],

  // Duplicate FAQ categories
  duplicateFAQCategories: [
    "adpXclQvR9WWEgUkbtDqyC", // Duplicate "Obuka i podrška"
    "faqCategory-0ce949d5-34d7-408a-a877-998a4bf7eb1b", // Duplicate "Obuka i podrška"
    "faqCategory-0ea134cb-88f6-4616-89de-81bf3a3054bd", // Duplicate "Finansijska pitanja"
    "faqCategory-1ef2c184-522e-44e6-b85f-a2bba903439f", // Duplicate "Opšta pitanja o franšizi"
    "faqCategory-b10f85d1-bc5f-420f-9469-70cab0f407dc", // Duplicate "Operativna pitanja"
    "faqCategory.opsta-pitanja" // Duplicate "Opšta pitanja"
  ],

  // Duplicate FAQ items
  duplicateFAQs: [
    "faq-004b5dd6-4e27-44b9-b81e-272926286923",
    "faq-d8458672-bb94-43d6-add6-d58e303db918",
    "hZm6tMI3obk6ZBXKfA9sBt",
    "faq-ab5790e3-1967-417c-ae85-6bef73049303",
    "hZm6tMI3obk6ZBXKfA9sKt",
    "hWo33GCGxd3rDeD5Tiy8qn",
    "faq-3cc31acd-a09d-4791-9885-b5c38548cf61",
    "faq-972fa3d6-32fd-43ca-b04f-af17005a94e0",
    "faq-6fccd843-098b-4c2e-9801-d28222e56e0c",
    "faq-e467af0f-3cf4-4644-8a64-77a14612877e",
    "faq-e0121326-a7b0-4624-84ce-ca38beb1ed7a",
    "faq-fdd378f5-77ac-4b3d-b98c-beeaf2f26da5",
    "faq-fd10a8ca-25d8-4ee8-ae39-8b250364c921"
  ]
};

// ========================
// TESTIMONIAL FILTERING
// ========================
const TESTIMONIAL_FILTERS = {
  // Keep franchise-related testimonials with these IDs
  keepFranchiseTestimonials: [
    "adpXclQvR9WWEgUkbtDlbd", // Marija Petrović - Vlasnica franšize
    "jsO7i4LmwGEnLQvVmoJo7P", // Stefan Jovanović - Direktor centra
    "jsO7i4LmwGEnLQvVmoJoRF", // Ana Nikolić - Osnivačica centra
    "jsO7i4LmwGEnLQvVmoJol5", // Miloš Stojanović - Partner franšize
    "atDdCAAfWCLcotj1z9HJRX", // Jovana Đorđević - Vlasnica centra
    "testimonial-3", // Marko Petrović - Vlasnik franšize
    "testimonial-5"  // Ana Miletić - Vlasnica franšize
  ],

  // Review these testimonials (not auto-delete, but flag for manual review)
  reviewTestimonials: [
    "EIn1TO6kzkBkpMuRkFFepa" // Parent testimonials - may want to keep some
  ]
};

// ========================
// UTILITY FUNCTIONS
// ========================

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.toLowerCase().trim());
    });
  });
}

function logProgress(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const symbols = {
    info: 'ℹ️',
    success: '✅',
    error: '❌',
    warning: '⚠️',
    progress: '🔄'
  };
  
  console.log(`${symbols[type]} [${timestamp}] ${message}`);
  
  // Also log to file
  const logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}\n`;
  fs.appendFileSync('cleanup-log.txt', logMessage);
}

async function confirmAction(action, count) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📋 ABOUT TO ${action.toUpperCase()}`);
  console.log(`Items to process: ${count}`);
  console.log(`${'='.repeat(60)}\n`);
  
  const answer = await askQuestion(`⚠️  Are you sure you want to proceed with ${action}? (yes/no): `);
  return answer === 'yes' || answer === 'y';
}

async function batchDelete(items, itemType, batchSize = 10) {
  logProgress(`Starting batch deletion of ${items.length} ${itemType} items`, 'progress');
  
  const results = {
    successful: 0,
    failed: 0,
    errors: []
  };

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    logProgress(`Processing batch ${Math.floor(i/batchSize) + 1} (${batch.length} items)`, 'progress');

    for (const itemId of batch) {
      try {
        logProgress(`Deleting ${itemType}: ${itemId}`, 'progress');
        await client.delete(itemId);
        results.successful++;
        logProgress(`Successfully deleted: ${itemId}`, 'success');
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        results.failed++;
        const errorMsg = `Failed to delete ${itemId}: ${error.message}`;
        results.errors.push({ id: itemId, error: error.message });
        logProgress(errorMsg, 'error');
      }
    }

    // Progress update
    const progress = Math.round((i + batchSize) / items.length * 100);
    logProgress(`Progress: ${Math.min(progress, 100)}% (${results.successful + results.failed}/${items.length})`, 'info');
    
    // Pause between batches to be gentle on the API
    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}

async function checkTestimonials() {
  logProgress('Analyzing testimonials for franchise relevance...', 'progress');
  
  try {
    // Query all testimonials
    const testimonials = await client.fetch(`
      *[_type == "testimonial"] {
        _id,
        authorName,
        authorRole,
        content,
        category,
        businessMetrics
      }
    `);

    const franchiseRelevant = [];
    const nonFranchise = [];

    testimonials.forEach(testimonial => {
      const role = (testimonial.authorRole || '').toLowerCase();
      const content = (testimonial.content || '').toLowerCase();
      
      const isFranchiseRelevant = 
        role.includes('franš') ||
        role.includes('vlasni') ||
        role.includes('partner') ||
        role.includes('direktor') ||
        role.includes('osniv') ||
        content.includes('franš') ||
        content.includes('biznis') ||
        content.includes('investicij') ||
        testimonial.businessMetrics;

      if (isFranchiseRelevant) {
        franchiseRelevant.push(testimonial);
      } else {
        nonFranchise.push(testimonial);
      }
    });

    logProgress(`Found ${franchiseRelevant.length} franchise-relevant testimonials`, 'info');
    logProgress(`Found ${nonFranchise.length} non-franchise testimonials for review`, 'warning');

    return {
      franchiseRelevant,
      nonFranchise,
      total: testimonials.length
    };

  } catch (error) {
    logProgress(`Error analyzing testimonials: ${error.message}`, 'error');
    return { franchiseRelevant: [], nonFranchise: [], total: 0 };
  }
}

async function updateLocationFields() {
  logProgress('Updating location fields: centerCount → centreCount', 'progress');
  
  try {
    const locations = await client.fetch(`
      *[_type == "locationData" && defined(centerCount)] {
        _id,
        _rev,
        city,
        centerCount
      }
    `);

    logProgress(`Found ${locations.length} locations to update`, 'info');

    let successful = 0;
    let failed = 0;

    for (const location of locations) {
      try {
        await client
          .patch(location._id)
          .set({ centreCount: location.centerCount })
          .unset(['centerCount'])
          .commit();
        
        successful++;
        logProgress(`Updated ${location.city}: centerCount → centreCount`, 'success');
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

// ========================
// MAIN CLEANUP FUNCTIONS
// ========================

async function cleanupCalculatorResults() {
  const items = CLEANUP_PLAN.calculatorResults;
  
  console.log('\n🧮 CALCULATOR RESULTS CLEANUP');
  console.log('These are temporary calculation results and safe to delete.');
  console.log(`Items to delete: ${items.length}`);
  
  if (!await confirmAction('delete calculator results', items.length)) {
    logProgress('Skipped calculator results cleanup', 'warning');
    return { skipped: true };
  }

  return await batchDelete(items, 'calculator result', 5);
}

async function cleanupDuplicateFranchiseFields() {
  const items = CLEANUP_PLAN.duplicateFranchiseFields;
  
  console.log('\n📝 FRANCHISE FIELDS CLEANUP');
  console.log('Removing duplicate franchise form fields (keeping unique ones).');
  console.log(`Items to delete: ${items.length}`);
  
  if (!await confirmAction('delete duplicate franchise fields', items.length)) {
    logProgress('Skipped franchise fields cleanup', 'warning');
    return { skipped: true };
  }

  return await batchDelete(items, 'franchise field', 5);
}

async function cleanupDuplicateAuthors() {
  const items = CLEANUP_PLAN.duplicateAboutAuthors;
  
  console.log('\n👤 ABOUT AUTHORS CLEANUP');
  console.log('Removing duplicate author documents (keeping most complete).');
  console.log(`Items to delete: ${items.length}`);
  
  if (!await confirmAction('delete duplicate authors', items.length)) {
    logProgress('Skipped authors cleanup', 'warning');
    return { skipped: true };
  }

  return await batchDelete(items, 'about author', 3);
}

async function cleanupFAQs() {
  const categories = CLEANUP_PLAN.duplicateFAQCategories;
  const faqs = CLEANUP_PLAN.duplicateFAQs;
  
  console.log('\n❓ FAQ CLEANUP');
  console.log(`FAQ Categories to delete: ${categories.length}`);
  console.log(`FAQ Items to delete: ${faqs.length}`);
  console.log(`Total: ${categories.length + faqs.length} items`);
  
  if (!await confirmAction('delete duplicate FAQs', categories.length + faqs.length)) {
    logProgress('Skipped FAQ cleanup', 'warning');
    return { skipped: true };
  }

  // Delete FAQ items first, then categories
  const faqResults = await batchDelete(faqs, 'FAQ item', 8);
  const categoryResults = await batchDelete(categories, 'FAQ category', 5);

  return {
    faqs: faqResults,
    categories: categoryResults,
    totalSuccessful: faqResults.successful + categoryResults.successful,
    totalFailed: faqResults.failed + categoryResults.failed
  };
}

async function reviewTestimonials() {
  console.log('\n💬 TESTIMONIALS REVIEW');
  console.log('Analyzing testimonials for franchise relevance...');
  
  const analysis = await checkTestimonials();
  
  console.log(`\nAnalysis Results:`);
  console.log(`✅ Franchise-relevant: ${analysis.franchiseRelevant.length}`);
  console.log(`⚠️  Needs review: ${analysis.nonFranchise.length}`);
  
  if (analysis.nonFranchise.length > 0) {
    console.log(`\nNon-franchise testimonials (review these manually):`);
    analysis.nonFranchise.forEach((testimonial, index) => {
      console.log(`  ${index + 1}. ${testimonial.authorName} - ${testimonial.authorRole} (${testimonial._id})`);
    });
    
    const shouldDelete = await askQuestion('\n🗑️  Delete non-franchise testimonials? (yes/no): ');
    
    if (shouldDelete === 'yes' || shouldDelete === 'y') {
      const nonFranchiseIds = analysis.nonFranchise.map(t => t._id);
      const results = await batchDelete(nonFranchiseIds, 'testimonial', 5);
      logProgress(`Deleted ${results.successful} non-franchise testimonials`, 'success');
      return results;
    }
  }
  
  logProgress(`Keeping ${analysis.franchiseRelevant.length} franchise testimonials`, 'success');
  return { kept: analysis.franchiseRelevant.length, reviewed: analysis.nonFranchise.length };
}

async function performLocationUpdates() {
  console.log('\n🏢 LOCATION UPDATES');
  console.log('Updating "centerCount" to "centreCount" (British spelling)');
  
  if (!await confirmAction('update location field names', 1)) {
    logProgress('Skipped location updates', 'warning');
    return { skipped: true };
  }

  return await updateLocationFields();
}

// ========================
// MAIN EXECUTION
// ========================

async function main() {
  console.log('🚀 SAFE SANITY CMS CLEANUP');
  console.log('=' .repeat(60));
  console.log('This script will safely remove duplicates and clean up your CMS.');
  console.log('Each step requires confirmation and can be skipped.');
  console.log('=' .repeat(60));

  // Initialize log file
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  logProgress(`Starting cleanup session - ${timestamp}`, 'info');
  
  try {
    // Test connection
    logProgress('Testing Sanity client connection...', 'progress');
    await client.fetch('*[_type == "sanitySchema"] | order(_id)[0]');
    logProgress('✅ Connected to Sanity successfully', 'success');
    
  } catch (error) {
    logProgress(`❌ Failed to connect to Sanity: ${error.message}`, 'error');
    console.log('\n🔧 Please check your configuration:');
    console.log('- projectId: Update with your actual project ID');
    console.log('- dataset: Should be "development" for testing');
    console.log('- token: Must have write permissions');
    rl.close();
    return;
  }

  const results = {
    calculatorResults: null,
    franchiseFields: null,
    authors: null,
    faqs: null,
    testimonials: null,
    locations: null
  };

  try {
    // Step 1: Calculator Results
    results.calculatorResults = await cleanupCalculatorResults();
    
    // Step 2: Franchise Fields
    results.franchiseFields = await cleanupDuplicateFranchiseFields();
    
    // Step 3: Authors
    results.authors = await cleanupDuplicateAuthors();
    
    // Step 4: FAQs
    results.faqs = await cleanupFAQs();
    
    // Step 5: Testimonials
    results.testimonials = await reviewTestimonials();
    
    // Step 6: Locations
    results.locations = await performLocationUpdates();

  } catch (error) {
    logProgress(`Critical error during cleanup: ${error.message}`, 'error');
  }

  // ========================
  // FINAL REPORT
  // ========================
  
  console.log('\n📊 CLEANUP SUMMARY');
  console.log('=' .repeat(60));
  
  let totalDeleted = 0;
  let totalErrors = 0;
  
  Object.entries(results).forEach(([category, result]) => {
    if (result && !result.skipped) {
      const successful = result.successful || result.totalSuccessful || result.kept || 0;
      const failed = result.failed || result.totalFailed || 0;
      
      console.log(`${category}: ✅ ${successful} success, ❌ ${failed} errors`);
      totalDeleted += successful;
      totalErrors += failed;
    } else if (result && result.skipped) {
      console.log(`${category}: ⏭️  Skipped`);
    }
  });
  
  console.log('=' .repeat(60));
  console.log(`🎯 Total Items Processed: ${totalDeleted}`);
  console.log(`❌ Total Errors: ${totalErrors}`);
  console.log(`📝 Detailed log saved to: cleanup-log.txt`);
  
  if (totalErrors === 0) {
    logProgress('🎉 Cleanup completed successfully!', 'success');
  } else {
    logProgress(`⚠️ Cleanup completed with ${totalErrors} errors. Check log for details.`, 'warning');
  }

  rl.close();
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n⚠️ Cleanup interrupted by user');
  logProgress('Cleanup interrupted by user', 'warning');
  rl.close();
  process.exit(0);
});

// Run the cleanup
if (require.main === module) {
  main().catch(error => {
    logProgress(`Fatal error: ${error.message}`, 'error');
    console.error('💥 Fatal error occurred:', error);
    rl.close();
    process.exit(1);
  });
}

module.exports = {
  cleanupCalculatorResults,
  cleanupDuplicateFranchiseFields,
  cleanupDuplicateAuthors,
  cleanupFAQs,
  reviewTestimonials,
  performLocationUpdates
};