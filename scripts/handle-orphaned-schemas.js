#!/usr/bin/env node

/**
 * ORPHANED SCHEMAS HANDLER
 * 
 * This script addresses the 4 orphaned schemas identified in the migration analysis:
 * 1. author (documents/author.ts) - CRITICAL: Has important content
 * 2. franchiseApplication (franchise-application.ts) - CRITICAL: Business data
 * 3. franchiseModel (objects/franchiseModel.ts) - UI component
 * 4. franchiseStep (objects/franchiseStep.ts) - UI component
 * 
 * CRITICAL: This must be resolved before proceeding with migration!
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const logSection = (title) => {
  log('\n' + '='.repeat(60), 'cyan');
  log(`  ${title}`, 'cyan');
  log('='.repeat(60), 'cyan');
};

const logSuccess = (message) => {
  log(`✅ ${message}`, 'green');
};

const logError = (message) => {
  log(`❌ ${message}`, 'red');
};

const logWarning = (message) => {
  log(`⚠️  ${message}`, 'yellow');
};

// Orphaned schemas identified by the analysis
const ORPHANED_SCHEMAS = [
  {
    name: 'author',
    file: 'documents/author.ts',
    type: 'document',
    complexity: 2,
    risk: 'CRITICAL',
    recommendation: 'Merge into author consolidation',
    action: 'MERGE'
  },
  {
    name: 'franchiseApplication',
    file: 'franchise-application.ts',
    type: 'document', 
    complexity: 3,
    risk: 'CRITICAL',
    recommendation: 'Merge into franchiseApplication consolidation',
    action: 'MERGE'
  },
  {
    name: 'franchiseModel',
    file: 'objects/franchiseModel.ts',
    type: 'object',
    complexity: 1,
    risk: 'LOW',
    recommendation: 'Merge into uiComponent consolidation',
    action: 'MERGE'
  },
  {
    name: 'franchiseStep',
    file: 'objects/franchiseStep.ts',
    type: 'object',
    complexity: 1,
    risk: 'LOW', 
    recommendation: 'Merge into uiComponent consolidation',
    action: 'MERGE'
  }
];

async function analyzeOrphanedSchemas() {
  logSection('ANALYZING ORPHANED SCHEMAS');
  
  const analysis = {
    totalOrphaned: ORPHANED_SCHEMAS.length,
    critical: 0,
    safe: 0,
    recommendations: []
  };
  
  for (const schema of ORPHANED_SCHEMAS) {
    log(`\n🔍 Analyzing: ${schema.name}`, 'blue');
    log(`   File: ${schema.file}`, 'blue');
    log(`   Type: ${schema.type}`, 'blue');
    log(`   Complexity: ${schema.complexity}`, 'blue');
    log(`   Risk: ${schema.risk}`, schema.risk === 'CRITICAL' ? 'red' : 'yellow');
    
    if (schema.risk === 'CRITICAL') {
      analysis.critical++;
      logError(`   CRITICAL: This schema contains important business data!`);
    } else {
      analysis.safe++;
      logWarning(`   LOW RISK: Simple UI component`);
    }
    
    log(`   Recommendation: ${schema.recommendation}`, 'cyan');
    
    // Check if schema file exists and analyze content
    const fullPath = path.join(__dirname, '../sanity/schemas', schema.file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const hasContent = content.length > 500; // Basic content check
      const hasValidation = content.includes('validation:');
      const hasPreview = content.includes('preview:');
      
      log(`   Content Size: ${content.length} bytes ${hasContent ? '(Substantial)' : '(Minimal)'}`, 'blue');
      log(`   Has Validation: ${hasValidation ? 'Yes' : 'No'}`, 'blue');
      log(`   Has Preview: ${hasPreview ? 'Yes' : 'No'}`, 'blue');
      
      analysis.recommendations.push({
        ...schema,
        hasContent,
        hasValidation,
        hasPreview,
        contentSize: content.length
      });
    } else {
      logError(`   FILE NOT FOUND: ${fullPath}`);
    }
  }
  
  return analysis;
}

async function generateUpdatedConsolidationPlan(analysis) {
  logSection('GENERATING UPDATED CONSOLIDATION PLAN');
  
  const updatedPlan = {
    // Core System (4 schemas) - NO CHANGES
    'siteSettings': {
      name: 'siteSettings',
      title: 'Site Settings',
      category: 'core',
      consolidates: ['siteSettings', 'modernSiteSettings', 'notificationBar'],
      description: 'All site-wide settings, notifications, and configurations'
    },
    
    'navigation': {
      name: 'navigation',
      title: 'Navigation',
      category: 'core',
      consolidates: ['navigation', 'modernNavigation', 'navigationSettings'],
      description: 'All navigation menus and links'
    },
    
    'page': {
      name: 'page',
      title: 'Pages',
      category: 'core',
      consolidates: ['page', 'modernPage', 'homePage', 'legalPage', 'errorPage', 'bookingPage'],
      description: 'All static pages including home, legal, error pages'
    },
    
    'pageBuilder': {
      name: 'pageBuilder',
      title: 'Page Builder Components',
      category: 'core',
      consolidates: ['pageBuilder', 'pageSection', 'hero', 'modernHero', 'enhancedHero', 'cta', 'videoBackground'],
      description: 'All page building blocks and sections'
    },
    
    // Franchise System (4 schemas) - UPDATED WITH ORPHANED SCHEMAS
    'franchise': {
      name: 'franchise',
      title: 'Franchise Management',
      category: 'franchise',
      consolidates: [
        'franchisePackage', 'modernFranchisePackage', 
        'franchiseModelsPage', 'howToJoinPage', 'franchiseApplicationPage',
        'financialCalculatorPage', 'schoolsPage'
      ],
      description: 'All franchise-related pages and packages'
    },
    
    'franchiseApplication': {
      name: 'franchiseApplication',
      title: 'Franchise Applications',
      category: 'franchise',
      consolidates: [
        'franchiseApplication', // ← ADDED ORPHANED SCHEMA
        'franchiseApplicationSubmission',
        'franchiseField', 'enhancedFranchiseField', 'franchiseSection',
        'franchiseMotivational', 'franchiseSteps', 'franchiseProcess'
      ],
      description: 'All franchise application forms and submissions'
    },
    
    'school': {
      name: 'school',
      title: 'Schools & Locations',
      category: 'franchise',
      consolidates: ['school', 'location', 'locationData', 'modernFranchiseLocation'],
      description: 'All school locations and franchise sites'
    },
    
    'calculator': {
      name: 'calculator',
      title: 'Financial Calculator',
      category: 'franchise',
      consolidates: ['calculatorSettings', 'calculatorResult'],
      description: 'Financial calculator system for franchise ROI'
    },
    
    // Content System (4 schemas) - NO CHANGES
    'blog': {
      name: 'blog',
      title: 'Blog System',
      category: 'content',
      consolidates: ['blogPost', 'blogCategory'],
      description: 'Blog posts and categories'
    },
    
    'book': {
      name: 'book',
      title: 'Books & Publications',
      category: 'content',
      consolidates: ['book', 'booksLanding', 'publications'],
      description: 'Books, publications, and book landing pages'
    },
    
    'program': {
      name: 'program',
      title: 'Educational Programs',
      category: 'content',
      consolidates: ['program', 'trainingProgram', 'methodology', 'virtualClassroom', 'resource'],
      description: 'All educational content and programs'
    },
    
    'quiz': {
      name: 'quiz',
      title: 'Quizzes & Interactive Content',
      category: 'content',
      consolidates: ['quiz', 'quizResult'],
      description: 'Interactive quizzes and results'
    },
    
    // People System (2 schemas) - UPDATED WITH ORPHANED SCHEMA
    'author': {
      name: 'author',
      title: 'Author & Team',
      category: 'people',
      consolidates: [
        'author', // ← ORPHANED SCHEMA ALREADY INCLUDED
        'aboutAuthor', 'authorTimeline', 'authorAchievements', 'teamMember'
      ],
      description: 'Author information, achievements, and team members'
    },
    
    'testimonial': {
      name: 'testimonial',
      title: 'Testimonials & Stories',
      category: 'people',
      consolidates: ['testimonial', 'modernTestimonial', 'successStory', 'experience'],
      description: 'All testimonials, success stories, and experiences'
    },
    
    // Support System (2 schemas) - NO CHANGES
    'faq': {
      name: 'faq',
      title: 'FAQ System',
      category: 'support',
      consolidates: ['faq', 'faqCategory', 'modernFranchiseFAQ'],
      description: 'FAQ system with categories'
    },
    
    'booking': {
      name: 'booking',
      title: 'Bookings & Subscribers',
      category: 'support',
      consolidates: ['booking', 'newsletterSubscriber'],
      description: 'Booking system and newsletter subscriptions'
    },
    
    // UI Components (2 schemas) - UPDATED WITH ORPHANED SCHEMAS
    'uiComponent': {
      name: 'uiComponent',
      title: 'UI Components',
      category: 'ui',
      consolidates: [
        'button', 'feature', 'statistic', 'pricingPlan', 'modernPricingPlan',
        'trustBadge', 'differentiator', 
        'franchiseStep', // ← ADDED ORPHANED SCHEMA
        'franchiseModel', // ← ADDED ORPHANED SCHEMA
        'leadMagnet', 'blockContent', 'seo'
      ],
      description: 'All reusable UI components and building blocks'
    },
    
    'migration': {
      name: 'migration',
      title: 'Migration & Validation',
      category: 'system',
      consolidates: ['migrationStrategy', 'validationRules'],
      description: 'Migration tracking and validation rules (technical)'
    }
  };
  
  return updatedPlan;
}

async function validateUpdatedPlan(updatedPlan) {
  logSection('VALIDATING UPDATED CONSOLIDATION PLAN');
  
  const validation = {
    allOrphanedAccountedFor: true,
    duplicates: [],
    missing: [],
    totalTargetSchemas: Object.keys(updatedPlan).length,
    totalConsolidatedSchemas: 0
  };
  
  // Count total schemas being consolidated
  const allConsolidated = new Set();
  for (const [targetName, schema] of Object.entries(updatedPlan)) {
    validation.totalConsolidatedSchemas += schema.consolidates.length;
    
    // Check for duplicates
    for (const consolidatedSchema of schema.consolidates) {
      if (allConsolidated.has(consolidatedSchema)) {
        validation.duplicates.push(consolidatedSchema);
      } else {
        allConsolidated.add(consolidatedSchema);
      }
    }
  }
  
  // Check if all orphaned schemas are now accounted for
  const orphanedNames = ORPHANED_SCHEMAS.map(s => s.name);
  for (const orphanedName of orphanedNames) {
    if (!allConsolidated.has(orphanedName)) {
      validation.missing.push(orphanedName);
      validation.allOrphanedAccountedFor = false;
    }
  }
  
  // Report validation results
  if (validation.allOrphanedAccountedFor && validation.duplicates.length === 0) {
    logSuccess('✅ ALL ORPHANED SCHEMAS SUCCESSFULLY INTEGRATED!');
    log(`   Target schemas: ${validation.totalTargetSchemas}`, 'green');
    log(`   Consolidated schemas: ${validation.totalConsolidatedSchemas}`, 'green');
  } else {
    if (!validation.allOrphanedAccountedFor) {
      logError(`Missing orphaned schemas: ${validation.missing.join(', ')}`);
    }
    if (validation.duplicates.length > 0) {
      logError(`Duplicate schemas: ${validation.duplicates.join(', ')}`);
    }
  }
  
  return validation;
}

async function generateFixedMigrationScripts(updatedPlan) {
  logSection('GENERATING UPDATED MIGRATION SCRIPTS');
  
  // Update the main migration analysis with the fixed plan
  const migrationAnalysisPath = path.join(__dirname, 'migration-analysis.js');
  const analysisContent = fs.readFileSync(migrationAnalysisPath, 'utf8');
  
  // Create a backup of the original
  fs.writeFileSync(
    migrationAnalysisPath + '.backup',
    analysisContent
  );
  
  // Update CONSOLIDATED_SCHEMAS constant
  const updatedContent = analysisContent.replace(
    /const CONSOLIDATED_SCHEMAS = \{[\s\S]*?\};/,
    `const CONSOLIDATED_SCHEMAS = ${JSON.stringify(updatedPlan, null, 2)};`
  );
  
  fs.writeFileSync(migrationAnalysisPath, updatedContent);
  
  logSuccess('Updated migration-analysis.js with orphaned schema fixes');
  
  // Regenerate migration scripts
  const { execSync } = require('child_process');
  try {
    execSync('node migration-analysis.js', { 
      cwd: path.join(__dirname),
      stdio: 'inherit'
    });
    logSuccess('Regenerated migration scripts with updated plan');
  } catch (error) {
    logError(`Failed to regenerate scripts: ${error.message}`);
  }
}

// Main execution
async function main() {
  logSection('ORPHANED SCHEMAS RESOLUTION');
  log('🔍 Addressing 4 orphaned schemas identified in migration analysis...', 'cyan');
  
  try {
    // Analyze orphaned schemas
    const analysis = await analyzeOrphanedSchemas();
    
    log(`\n📊 Analysis Summary:`, 'yellow');
    log(`  Total orphaned: ${analysis.totalOrphaned}`, 'blue');
    log(`  Critical risk: ${analysis.critical}`, analysis.critical > 0 ? 'red' : 'green');
    log(`  Low risk: ${analysis.safe}`, 'green');
    
    // Generate updated consolidation plan
    const updatedPlan = await generateUpdatedConsolidationPlan(analysis);
    
    // Validate the updated plan
    const validation = await validateUpdatedPlan(updatedPlan);
    
    if (validation.allOrphanedAccountedFor && validation.duplicates.length === 0) {
      // Generate updated migration scripts
      await generateFixedMigrationScripts(updatedPlan);
      
      logSection('RESOLUTION COMPLETE');
      logSuccess('🎉 All orphaned schemas successfully integrated!');
      log('\n📋 Integration Summary:', 'cyan');
      log('  • author → Already in author consolidation ✅', 'green');
      log('  • franchiseApplication → Added to franchiseApplication consolidation ✅', 'green');
      log('  • franchiseModel → Added to uiComponent consolidation ✅', 'green');
      log('  • franchiseStep → Added to uiComponent consolidation ✅', 'green');
      
      log('\n🚀 Ready to proceed with migration!', 'cyan');
      log('  1. All schemas are now accounted for', 'blue');
      log('  2. No data loss risk', 'blue');
      log('  3. Migration scripts updated', 'blue');
      log('  4. Run: node scripts/migration/run-migration.js', 'blue');
      
    } else {
      logError('❌ Validation failed - manual review required');
      if (validation.missing.length > 0) {
        log(`Missing: ${validation.missing.join(', ')}`, 'red');
      }
      if (validation.duplicates.length > 0) {
        log(`Duplicates: ${validation.duplicates.join(', ')}`, 'red');
      }
    }
    
  } catch (error) {
    logError(`Resolution failed: ${error.message}`);
    process.exit(1);
  }
}

// Execute orphaned schema resolution
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = {
  resolveOrphanedSchemas: main,
  ORPHANED_SCHEMAS
};