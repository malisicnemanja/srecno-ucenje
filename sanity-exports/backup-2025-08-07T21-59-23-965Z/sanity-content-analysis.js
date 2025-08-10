#!/usr/bin/env node

/**
 * Sanity CMS Content Analysis and Cleanup Script
 * 
 * This script analyzes migrated content from Sanity CMS backup and provides:
 * 1. Duplicate detection and identification
 * 2. Cleanup recommendations  
 * 3. Renaming strategy (schools → centres)
 * 4. Content consolidation plan
 * 
 * Usage: node sanity-content-analysis.js
 */

const fs = require('fs');
const path = require('path');

class SanityContentAnalyzer {
  constructor(backupPath) {
    this.backupPath = backupPath;
    this.data = {};
    this.analysis = {
      duplicates: {},
      toDelete: [],
      toRename: [],
      statistics: {}
    };
  }

  /**
   * Load all JSON files from backup
   */
  loadData() {
    console.log('📁 Loading Sanity backup data...\n');
    
    const files = fs.readdirSync(this.backupPath)
      .filter(file => file.endsWith('.json'))
      .filter(file => !file.startsWith('EXPORT_') && !file.startsWith('MIGRATION_'));

    files.forEach(file => {
      try {
        const content = JSON.parse(fs.readFileSync(path.join(this.backupPath, file), 'utf8'));
        const type = file.replace('.json', '');
        this.data[type] = content;
        console.log(`✅ Loaded ${type}: ${content._count || 'N/A'} items`);
      } catch (error) {
        console.log(`❌ Failed to load ${file}: ${error.message}`);
      }
    });
    
    console.log('\n');
  }

  /**
   * Analyze FAQ categories for duplicates
   */
  analyzeFaqCategories() {
    console.log('🔍 Analyzing FAQ Categories...\n');
    
    if (!this.data.faqCategory) {
      console.log('❌ No FAQ categories found\n');
      return;
    }

    const categories = this.data.faqCategory.documents || [];
    const nameGroups = {};
    const slugGroups = {};
    
    // Group by name and slug
    categories.forEach(cat => {
      const name = cat.name || cat.title;
      const slug = cat.slug;
      
      if (name) {
        if (!nameGroups[name]) nameGroups[name] = [];
        nameGroups[name].push(cat);
      }
      
      if (slug) {
        if (!slugGroups[slug]) slugGroups[slug] = [];
        slugGroups[slug].push(cat);
      }
    });

    // Find duplicates by name
    console.log('📊 Duplicate FAQ Categories by Name:');
    Object.entries(nameGroups).forEach(([name, cats]) => {
      if (cats.length > 1) {
        console.log(`\n  "${name}" - ${cats.length} duplicates:`);
        cats.forEach((cat, index) => {
          console.log(`    ${index + 1}. ID: ${cat._id} (Created: ${cat._createdAt})`);
        });
        
        // Mark extras for deletion (keep the oldest one)
        const sorted = cats.sort((a, b) => new Date(a._createdAt) - new Date(b._createdAt));
        const toDelete = sorted.slice(1);
        
        this.analysis.duplicates[`faqCategory-${name}`] = {
          keep: sorted[0]._id,
          delete: toDelete.map(cat => cat._id)
        };
        
        toDelete.forEach(cat => {
          this.analysis.toDelete.push({
            type: 'faqCategory',
            id: cat._id,
            reason: `Duplicate of "${name}" (keeping ${sorted[0]._id})`
          });
        });
      }
    });

    this.analysis.statistics.faqCategoryDuplicates = Object.keys(this.analysis.duplicates).length;
    console.log(`\n📈 Found ${this.analysis.statistics.faqCategoryDuplicates} sets of duplicates\n`);
  }

  /**
   * Analyze FAQ items
   */
  analyzeFaqs() {
    console.log('🔍 Analyzing FAQ Items...\n');
    
    if (!this.data.faq) {
      console.log('❌ No FAQs found\n');
      return;
    }

    const faqs = this.data.faq.documents || [];
    const questionGroups = {};
    
    // Group by question
    faqs.forEach(faq => {
      const question = faq.question;
      if (question) {
        if (!questionGroups[question]) questionGroups[question] = [];
        questionGroups[question].push(faq);
      }
    });

    console.log('📊 Duplicate FAQs by Question:');
    let duplicateCount = 0;
    
    Object.entries(questionGroups).forEach(([question, faqItems]) => {
      if (faqItems.length > 1) {
        console.log(`\n  "${question}" - ${faqItems.length} duplicates:`);
        faqItems.forEach((faq, index) => {
          console.log(`    ${index + 1}. ID: ${faq._id} (Created: ${faq._createdAt})`);
        });
        
        // Mark extras for deletion (keep the newest one)
        const sorted = faqItems.sort((a, b) => new Date(b._createdAt) - new Date(a._createdAt));
        const toDelete = sorted.slice(1);
        
        toDelete.forEach(faq => {
          this.analysis.toDelete.push({
            type: 'faq',
            id: faq._id,
            reason: `Duplicate question (keeping ${sorted[0]._id})`
          });
        });
        
        duplicateCount++;
      }
    });

    this.analysis.statistics.faqDuplicates = duplicateCount;
    console.log(`\n📈 Found ${duplicateCount} duplicate FAQ questions\n`);
  }

  /**
   * Analyze schools/locations (to be renamed to centres)
   */
  analyzeSchoolsAndLocations() {
    console.log('🔍 Analyzing Schools and Locations (to rename to Centres)...\n');
    
    // Check both locationData and any school-type documents
    const locations = this.data.locationData?.documents || [];
    
    console.log('📍 Current Locations/Schools:');
    locations.forEach((location, index) => {
      console.log(`  ${index + 1}. ${location.city} (ID: ${location._id})`);
      console.log(`     Status: ${location.status}, Centers: ${location.centerCount}`);
      
      this.analysis.toRename.push({
        type: 'locationData',
        id: location._id,
        field: 'centerCount',
        from: 'centerCount',
        to: 'centreCount',
        reason: 'Rename from American to British spelling'
      });
    });
    
    // Check for any documents with "school" in the name/type
    Object.entries(this.data).forEach(([type, typeData]) => {
      if (type.toLowerCase().includes('school')) {
        console.log(`\n🏫 Found school-related type: ${type}`);
        const documents = typeData.documents || [];
        documents.forEach(doc => {
          this.analysis.toRename.push({
            type: type,
            id: doc._id,
            from: 'school',
            to: 'centre',
            reason: 'Rename schools to centres throughout system'
          });
        });
      }
    });

    console.log(`\n📈 Found ${locations.length} locations to process\n`);
  }

  /**
   * Analyze calculator results (marked for deletion)
   */
  analyzeCalculatorResults() {
    console.log('🔍 Analyzing Calculator Results (marked for deletion)...\n');
    
    const results = this.data.calculatorResult?.documents || [];
    
    console.log('🗑️ Calculator Results to Delete:');
    results.forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.type} - ${result.email} (${result._createdAt})`);
      
      this.analysis.toDelete.push({
        type: 'calculatorResult',
        id: result._id,
        reason: 'Calculator results are temporary data and should be deleted'
      });
    });

    this.analysis.statistics.calculatorResults = results.length;
    console.log(`\n📈 Marked ${results.length} calculator results for deletion\n`);
  }

  /**
   * Analyze franchise fields (check for duplicates)
   */
  analyzeFranchiseFields() {
    console.log('🔍 Analyzing Franchise Fields...\n');
    
    const fields = this.data.franchiseField?.documents || [];
    const fieldGroups = {};
    
    // Group by fieldId
    fields.forEach(field => {
      const fieldId = field.fieldId;
      if (fieldId) {
        if (!fieldGroups[fieldId]) fieldGroups[fieldId] = [];
        fieldGroups[fieldId].push(field);
      }
    });

    console.log('📊 Franchise Fields Analysis:');
    let duplicateCount = 0;
    
    Object.entries(fieldGroups).forEach(([fieldId, fieldItems]) => {
      if (fieldItems.length > 1) {
        console.log(`\n  Field "${fieldId}" - ${fieldItems.length} duplicates:`);
        fieldItems.forEach((field, index) => {
          console.log(`    ${index + 1}. ID: ${field._id} (Created: ${field._createdAt})`);
          console.log(`        Label: "${field.label}", Section: ${field.references?.[0]?.title || 'N/A'}`);
        });
        
        // Keep the newest one, delete the rest
        const sorted = fieldItems.sort((a, b) => new Date(b._createdAt) - new Date(a._createdAt));
        const toDelete = sorted.slice(1);
        
        toDelete.forEach(field => {
          this.analysis.toDelete.push({
            type: 'franchiseField',
            id: field._id,
            reason: `Duplicate fieldId "${fieldId}" (keeping ${sorted[0]._id})`
          });
        });
        
        duplicateCount++;
      }
    });

    this.analysis.statistics.franchiseFieldDuplicates = duplicateCount;
    console.log(`\n📈 Found ${duplicateCount} duplicate franchise fields\n`);
  }

  /**
   * Analyze About Authors (check for duplicates)
   */
  analyzeAboutAuthors() {
    console.log('🔍 Analyzing About Authors...\n');
    
    const authors = this.data.aboutAuthor?.documents || [];
    
    console.log('👤 About Author Documents:');
    authors.forEach((author, index) => {
      console.log(`  ${index + 1}. "${author.heroTitle}" (ID: ${author._id})`);
      console.log(`     Created: ${author._createdAt}`);
      console.log(`     Subtitle: "${author.heroSubtitle}"`);
    });

    // Check for duplicates by name
    const nameGroups = {};
    authors.forEach(author => {
      const name = author.heroTitle;
      if (name) {
        if (!nameGroups[name]) nameGroups[name] = [];
        nameGroups[name].push(author);
      }
    });

    console.log('\n📊 Duplicate Analysis:');
    Object.entries(nameGroups).forEach(([name, authorDocs]) => {
      if (authorDocs.length > 1) {
        console.log(`\n  "${name}" - ${authorDocs.length} duplicates:`);
        authorDocs.forEach((author, index) => {
          console.log(`    ${index + 1}. ID: ${author._id} (Created: ${author._createdAt})`);
        });
        
        // Keep the most complete one (most achievements/sections)
        const sorted = authorDocs.sort((a, b) => {
          const aContent = (a.achievements?.length || 0) + (a.sections?.length || 0);
          const bContent = (b.achievements?.length || 0) + (b.sections?.length || 0);
          return bContent - aContent; // Descending
        });
        
        const toDelete = sorted.slice(1);
        toDelete.forEach(author => {
          this.analysis.toDelete.push({
            type: 'aboutAuthor',
            id: author._id,
            reason: `Duplicate author "${name}" (keeping most complete: ${sorted[0]._id})`
          });
        });
      }
    });

    this.analysis.statistics.aboutAuthorDuplicates = Object.keys(nameGroups).filter(name => nameGroups[name].length > 1).length;
    console.log(`\n📈 Found ${this.analysis.statistics.aboutAuthorDuplicates} duplicate authors\n`);
  }

  /**
   * Analyze testimonials (keep only franchise-related ones)
   */
  analyzeTestimonials() {
    console.log('🔍 Analyzing Testimonials...\n');
    
    const testimonials = this.data.testimonial?.documents || [];
    
    console.log('💬 Testimonial Analysis:');
    
    const franchiseRelated = [];
    const parentRelated = [];
    const others = [];
    
    testimonials.forEach(testimonial => {
      const role = testimonial.authorRole || testimonial.role || '';
      const category = testimonial.category || '';
      const content = testimonial.content || testimonial.text || '';
      
      const isFranchise = 
        role.toLowerCase().includes('franš') ||
        role.toLowerCase().includes('vlasni') ||
        role.toLowerCase().includes('partner') ||
        role.toLowerCase().includes('direktor') ||
        role.toLowerCase().includes('osniv') ||
        category === 'franchise' ||
        content.toLowerCase().includes('franš') ||
        content.toLowerCase().includes('investicij') ||
        content.toLowerCase().includes('biznis') ||
        !!testimonial.businessMetrics;
      
      const isParent = 
        role.toLowerCase().includes('majka') ||
        role.toLowerCase().includes('mama') ||
        role.toLowerCase().includes('otac') ||
        role.toLowerCase().includes('roditelj') ||
        category === 'parent';
      
      if (isFranchise) {
        franchiseRelated.push(testimonial);
      } else if (isParent) {
        parentRelated.push(testimonial);
      } else {
        others.push(testimonial);
      }
    });

    console.log(`\n📊 Testimonial Categories:`);
    console.log(`  🏢 Franchise-related: ${franchiseRelated.length}`);
    console.log(`  👨‍👩‍👧‍👦 Parent-related: ${parentRelated.length}`);
    console.log(`  📚 Others (students, professionals): ${others.length}`);

    // Mark non-franchise testimonials for review (not automatic deletion)
    console.log(`\n🔍 Franchise Testimonials (KEEP):`);
    franchiseRelated.forEach((testimonial, index) => {
      const name = testimonial.authorName || testimonial.author || 'Unknown';
      const role = testimonial.authorRole || testimonial.role || 'Unknown';
      console.log(`  ${index + 1}. ${name} - ${role} (${testimonial._id})`);
      if (testimonial.businessMetrics) {
        console.log(`     📈 Revenue: €${testimonial.businessMetrics.monthlyRevenue}, ROI: ${testimonial.businessMetrics.roi}`);
      }
    });

    console.log(`\n⚠️ Parent/Other Testimonials (REVIEW FOR RELEVANCE):`);
    [...parentRelated, ...others].forEach((testimonial, index) => {
      const name = testimonial.authorName || testimonial.author || 'Unknown';
      const role = testimonial.authorRole || testimonial.role || 'Unknown';
      console.log(`  ${index + 1}. ${name} - ${role} (${testimonial._id})`);
    });

    this.analysis.statistics.testimonials = {
      franchise: franchiseRelated.length,
      parent: parentRelated.length,
      others: others.length,
      total: testimonials.length
    };

    console.log(`\n📈 Recommend keeping ${franchiseRelated.length} franchise testimonials\n`);
  }

  /**
   * Analyze How To Join pages (check for duplicates)
   */
  analyzeHowToJoinPages() {
    console.log('🔍 Analyzing How To Join Pages...\n');
    
    // Look through all data for howToJoin type pages
    Object.entries(this.data).forEach(([type, typeData]) => {
      const documents = typeData.documents || [];
      const howToJoinDocs = documents.filter(doc => 
        doc._type === 'howToJoinPage' || 
        (doc.title && doc.title.toLowerCase().includes('kako se pridružiti'))
      );
      
      if (howToJoinDocs.length > 0) {
        console.log(`📄 Found ${howToJoinDocs.length} "How To Join" pages in ${type}:`);
        
        howToJoinDocs.forEach((doc, index) => {
          console.log(`  ${index + 1}. "${doc.title}" (ID: ${doc._id})`);
          console.log(`     Created: ${doc._createdAt}`);
        });
        
        if (howToJoinDocs.length > 1) {
          console.log(`\n⚠️ Multiple "How To Join" pages detected - should only have one!`);
          
          // Keep the newest one, mark others for deletion
          const sorted = howToJoinDocs.sort((a, b) => new Date(b._createdAt) - new Date(a._createdAt));
          const toDelete = sorted.slice(1);
          
          toDelete.forEach(doc => {
            this.analysis.toDelete.push({
              type: doc._type,
              id: doc._id,
              reason: `Duplicate "How To Join" page (keeping newest: ${sorted[0]._id})`
            });
          });
        }
      }
    });
    
    console.log('');
  }

  /**
   * Generate cleanup plan
   */
  generateCleanupPlan() {
    console.log('📋 CLEANUP PLAN SUMMARY\n');
    console.log('=' .repeat(50));
    
    console.log('\n🗑️ ITEMS TO DELETE:');
    console.log(`Total items marked for deletion: ${this.analysis.toDelete.length}\n`);
    
    // Group deletions by type
    const deleteByType = {};
    this.analysis.toDelete.forEach(item => {
      if (!deleteByType[item.type]) deleteByType[item.type] = [];
      deleteByType[item.type].push(item);
    });
    
    Object.entries(deleteByType).forEach(([type, items]) => {
      console.log(`  📁 ${type}: ${items.length} items`);
      items.forEach((item, index) => {
        console.log(`    ${index + 1}. ${item.id} - ${item.reason}`);
      });
      console.log('');
    });

    console.log('🔄 ITEMS TO RENAME:');
    console.log(`Total items marked for rename: ${this.analysis.toRename.length}\n`);
    
    // Group renames by type
    const renameByType = {};
    this.analysis.toRename.forEach(item => {
      if (!renameByType[item.type]) renameByType[item.type] = [];
      renameByType[item.type].push(item);
    });
    
    Object.entries(renameByType).forEach(([type, items]) => {
      console.log(`  📁 ${type}: ${items.length} items`);
      items.slice(0, 3).forEach((item, index) => {
        console.log(`    ${index + 1}. ${item.id} - ${item.reason}`);
      });
      if (items.length > 3) {
        console.log(`    ... and ${items.length - 3} more`);
      }
      console.log('');
    });

    console.log('📊 STATISTICS:');
    console.log(`  • FAQ Category Duplicates: ${this.analysis.statistics.faqCategoryDuplicates || 0}`);
    console.log(`  • FAQ Duplicates: ${this.analysis.statistics.faqDuplicates || 0}`);
    console.log(`  • Franchise Field Duplicates: ${this.analysis.statistics.franchiseFieldDuplicates || 0}`);
    console.log(`  • About Author Duplicates: ${this.analysis.statistics.aboutAuthorDuplicates || 0}`);
    console.log(`  • Calculator Results: ${this.analysis.statistics.calculatorResults || 0}`);
    console.log(`  • Franchise Testimonials: ${this.analysis.statistics.testimonials?.franchise || 0}`);
    console.log(`  • Other Testimonials: ${(this.analysis.statistics.testimonials?.parent || 0) + (this.analysis.statistics.testimonials?.others || 0)}`);
  }

  /**
   * Generate executable cleanup script
   */
  generateCleanupScript() {
    const script = `#!/usr/bin/env node

/**
 * Auto-generated Sanity Cleanup Script
 * Generated on: ${new Date().toISOString()}
 * 
 * WARNING: This script will DELETE and MODIFY data in your Sanity dataset.
 * Always test on a development dataset first!
 */

const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: 'your-project-id',
  dataset: 'production', // or 'development' for testing
  token: 'your-write-token',
  useCdn: false
});

const ITEMS_TO_DELETE = ${JSON.stringify(this.analysis.toDelete, null, 2)};

const ITEMS_TO_RENAME = ${JSON.stringify(this.analysis.toRename, null, 2)};

async function deleteDocuments() {
  console.log('🗑️ Starting deletion process...');
  
  for (const item of ITEMS_TO_DELETE) {
    try {
      console.log(\`Deleting \${item.type} \${item.id}: \${item.reason}\`);
      await client.delete(item.id);
      console.log('✅ Deleted successfully');
    } catch (error) {
      console.log(\`❌ Failed to delete \${item.id}: \${error.message}\`);
    }
  }
}

async function renameFields() {
  console.log('🔄 Starting rename process...');
  
  // This would need custom logic for each rename operation
  // For now, just log what needs to be renamed
  ITEMS_TO_RENAME.forEach(item => {
    console.log(\`Rename needed: \${item.type} \${item.id} - \${item.reason}\`);
  });
}

async function main() {
  console.log('🚀 Starting Sanity cleanup process...');
  console.log(\`Items to delete: \${ITEMS_TO_DELETE.length}\`);
  console.log(\`Items to rename: \${ITEMS_TO_RENAME.length}\`);
  
  // Uncomment the lines below when ready to execute
  // await deleteDocuments();
  // await renameFields();
  
  console.log('✅ Cleanup process completed!');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { deleteDocuments, renameFields };
`;

    fs.writeFileSync(path.join(this.backupPath, 'cleanup-script.js'), script);
    console.log('\n💾 Generated cleanup-script.js');
  }

  /**
   * Run complete analysis
   */
  runAnalysis() {
    console.log('🔬 SANITY CMS CONTENT ANALYSIS\n');
    console.log('=' .repeat(50));
    
    this.loadData();
    this.analyzeFaqCategories();
    this.analyzeFaqs();
    this.analyzeSchoolsAndLocations();
    this.analyzeCalculatorResults();
    this.analyzeFranchiseFields();
    this.analyzeAboutAuthors();
    this.analyzeTestimonials();
    this.analyzeHowToJoinPages();
    
    this.generateCleanupPlan();
    this.generateCleanupScript();
    
    console.log('\n✅ Analysis complete! Check cleanup-script.js for executable cleanup code.');
  }
}

// Run analysis if called directly
if (require.main === module) {
  const backupPath = process.argv[2] || __dirname;
  const analyzer = new SanityContentAnalyzer(backupPath);
  analyzer.runAnalysis();
}

module.exports = SanityContentAnalyzer;