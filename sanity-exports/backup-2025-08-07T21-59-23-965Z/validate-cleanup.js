#!/usr/bin/env node

/**
 * Sanity Cleanup Validation Script
 * 
 * This script validates what will be deleted/modified before running the main cleanup.
 * It performs dry-run checks and generates a detailed report.
 * 
 * Usage: node validate-cleanup.js
 */

const { createClient } = require('@sanity/client');
const fs = require('fs');

// Same configuration as main cleanup script
const client = createClient({
  projectId: '08ctxj6y', // Srećno učenje project ID
  dataset: 'production', // Production dataset
  token: process.env.SANITY_API_TOKEN || 'your-read-token', // Read token sufficient for validation
  useCdn: false,
  apiVersion: '2023-05-03'
});

// Items that will be deleted (from main script)
const ITEMS_TO_DELETE = {
  calculatorResults: [
    "EIn1TO6kzkBkpMuRkFfJpQ", "EIn1TO6kzkBkpMuRkFgcGy", "EIn1TO6kzkBkpMuRkGY5vK",
    "EIn1TO6kzkBkpMuRkGYjyV", "RSzTvGgTwtY6EErbXmHqYB", "RSzTvGgTwtY6EErbXmHqln",
    "RSzTvGgTwtY6EErbXmHqw0", "RSzTvGgTwtY6EErbXmHr6D", "SBvfECCtZ11PRIA8QdD56u",
    "SVDvN8W2oCA8eZWngUb3qw", "SVDvN8W2oCA8eZWngUb44R", "hZm6tMI3obk6ZBXKfAWHZt",
    "rWY7A01dUL9wO4NRCjB8Qe"
  ],
  duplicateFranchiseFields: [
    "SBvfECCtZ11PRIA8QdEqTj", "SBvfECCtZ11PRIA8QdEqgD", "SBvfECCtZ11PRIA8QdEqoX",
    "SBvfECCtZ11PRIA8QdEqum", "tqJG5yH49IKSFNIKiLMpcz", "oWtMwMRBoarauLfrKfPanX",
    "tqJG5yH49IKSFNIKiLMq3b", "oWtMwMRBoarauLfrKfPaa4", "tqJG5yH49IKSFNIKiLMpXf",
    "tqJG5yH49IKSFNIKiLMpiJ", "tqJG5yH49IKSFNIKiLMpsx", "tqJG5yH49IKSFNIKiLMpyH"
  ],
  duplicateAboutAuthors: [
    "drafts.EIn1TO6kzkBkpMuRkFy78E",
    "aboutAuthor"
  ],
  duplicateFAQCategories: [
    "adpXclQvR9WWEgUkbtDqyC", "faqCategory-0ce949d5-34d7-408a-a877-998a4bf7eb1b",
    "faqCategory-0ea134cb-88f6-4616-89de-81bf3a3054bd", "faqCategory-1ef2c184-522e-44e6-b85f-a2bba903439f",
    "faqCategory-b10f85d1-bc5f-420f-9469-70cab0f407dc", "faqCategory.opsta-pitanja"
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

async function validateItems(category, itemIds) {
  console.log(`\n🔍 Validating ${category}...`);
  
  const results = {
    found: [],
    notFound: [],
    hasReferences: []
  };

  for (const itemId of itemIds) {
    try {
      // Check if document exists
      const doc = await client.getDocument(itemId);
      if (doc) {
        results.found.push({ id: itemId, doc });
        
        // Check for incoming references
        const references = await client.fetch(
          `*[references($id)] { _type, _id, title }`,
          { id: itemId }
        );
        
        if (references.length > 0) {
          results.hasReferences.push({ id: itemId, references });
        }
      }
    } catch (error) {
      if (error.statusCode === 404) {
        results.notFound.push(itemId);
      } else {
        console.log(`⚠️ Error checking ${itemId}: ${error.message}`);
      }
    }
  }

  console.log(`  ✅ Found: ${results.found.length}`);
  console.log(`  ❌ Not found: ${results.notFound.length}`);
  console.log(`  🔗 Has references: ${results.hasReferences.length}`);
  
  if (results.hasReferences.length > 0) {
    console.log(`  ⚠️ WARNING: Some items have incoming references!`);
    results.hasReferences.forEach(item => {
      console.log(`    ${item.id} referenced by:`);
      item.references.forEach(ref => {
        console.log(`      - ${ref._type}: ${ref.title || ref._id}`);
      });
    });
  }

  return results;
}

async function validateTestimonials() {
  console.log('\n💬 Validating testimonials...');
  
  try {
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

    console.log(`  ✅ Franchise-relevant (KEEP): ${franchiseRelevant.length}`);
    console.log(`  ⚠️ Non-franchise (REVIEW): ${nonFranchise.length}`);

    if (nonFranchise.length > 0) {
      console.log('  📝 Non-franchise testimonials:');
      nonFranchise.forEach((testimonial, index) => {
        console.log(`    ${index + 1}. ${testimonial.authorName || 'Unknown'} - ${testimonial.authorRole || 'No role'} (${testimonial._id})`);
      });
    }

    return { franchiseRelevant, nonFranchise };
  } catch (error) {
    console.log(`❌ Error validating testimonials: ${error.message}`);
    return { franchiseRelevant: [], nonFranchise: [] };
  }
}

async function validateLocationUpdates() {
  console.log('\n🏢 Validating location updates...');
  
  try {
    const locations = await client.fetch(`
      *[_type == "locationData"] {
        _id,
        city,
        centerCount,
        centreCount
      }
    `);

    const needsUpdate = locations.filter(loc => loc.centerCount && !loc.centreCount);
    const alreadyUpdated = locations.filter(loc => loc.centreCount);
    const noCount = locations.filter(loc => !loc.centerCount && !loc.centreCount);

    console.log(`  🔄 Needs update (centerCount → centreCount): ${needsUpdate.length}`);
    console.log(`  ✅ Already updated: ${alreadyUpdated.length}`);
    console.log(`  ⚠️ No count field: ${noCount.length}`);

    if (needsUpdate.length > 0) {
      console.log('  📝 Locations to update:');
      needsUpdate.forEach(loc => {
        console.log(`    - ${loc.city}: ${loc.centerCount} centers`);
      });
    }

    return { needsUpdate, alreadyUpdated, noCount };
  } catch (error) {
    console.log(`❌ Error validating locations: ${error.message}`);
    return { needsUpdate: [], alreadyUpdated: [], noCount: [] };
  }
}

async function generateValidationReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalToDelete: 0,
      potentialIssues: 0,
      safeDeletions: 0
    },
    categories: {},
    recommendations: []
  };

  // Process validation results
  Object.entries(results).forEach(([category, result]) => {
    if (result.found) {
      report.categories[category] = {
        found: result.found.length,
        notFound: result.notFound.length,
        hasReferences: result.hasReferences.length,
        safeToDelete: result.found.length - result.hasReferences.length
      };
      
      report.summary.totalToDelete += result.found.length;
      report.summary.potentialIssues += result.hasReferences.length;
      report.summary.safeDeletions += (result.found.length - result.hasReferences.length);
    }
  });

  // Add recommendations
  if (report.summary.potentialIssues > 0) {
    report.recommendations.push('⚠️ Some items have incoming references. Review these carefully before deletion.');
  }
  
  if (results.testimonials?.nonFranchise.length > 0) {
    report.recommendations.push(`📝 ${results.testimonials.nonFranchise.length} testimonials need manual review.`);
  }
  
  if (results.locations?.needsUpdate.length > 0) {
    report.recommendations.push(`🔄 ${results.locations.needsUpdate.length} locations need field updates.`);
  }

  // Save report to file
  const reportPath = 'validation-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📊 Detailed report saved to: ${reportPath}`);

  return report;
}

async function main() {
  console.log('🔍 SANITY CLEANUP VALIDATION');
  console.log('=' .repeat(60));
  console.log('Validating items before cleanup...');

  try {
    // Test connection
    console.log('\n🔌 Testing connection...');
    await client.fetch('*[_type == "sanitySchema"] | order(_id)[0]');
    console.log('✅ Connected to Sanity successfully');

    const results = {};

    // Validate each category
    results.calculatorResults = await validateItems('Calculator Results', ITEMS_TO_DELETE.calculatorResults);
    results.franchiseFields = await validateItems('Franchise Fields', ITEMS_TO_DELETE.duplicateFranchiseFields);
    results.aboutAuthors = await validateItems('About Authors', ITEMS_TO_DELETE.duplicateAboutAuthors);
    results.faqCategories = await validateItems('FAQ Categories', ITEMS_TO_DELETE.duplicateFAQCategories);
    results.faqs = await validateItems('FAQ Items', ITEMS_TO_DELETE.duplicateFAQs);

    // Special validations
    results.testimonials = await validateTestimonials();
    results.locations = await validateLocationUpdates();

    // Generate report
    const report = await generateValidationReport(results);

    // Final summary
    console.log('\n📋 VALIDATION SUMMARY');
    console.log('=' .repeat(60));
    console.log(`🎯 Total items to delete: ${report.summary.totalToDelete}`);
    console.log(`✅ Safe deletions: ${report.summary.safeDeletions}`);
    console.log(`⚠️ Items with references: ${report.summary.potentialIssues}`);
    
    if (report.summary.potentialIssues === 0) {
      console.log('\n🟢 All items are safe to delete!');
    } else {
      console.log('\n🟡 Some items have references - review before deletion.');
    }

    console.log('\nRecommendations:');
    report.recommendations.forEach(rec => console.log(`  ${rec}`));

    console.log('\n✅ Validation complete. You can now run safe-sanity-cleanup.js');

  } catch (error) {
    console.error('\n❌ Validation failed:', error);
    console.log('\n🔧 Please check your configuration in the script.');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { validateItems, validateTestimonials, validateLocationUpdates };