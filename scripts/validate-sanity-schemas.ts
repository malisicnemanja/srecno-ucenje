import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '08ctxj6y',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

interface ValidationResult {
  documentType: string
  issues: string[]
  warnings: string[]
  suggestions: string[]
}

// Check for unknown fields in documents
async function checkUnknownFields(): Promise<ValidationResult[]> {
  console.log('🔍 Checking for unknown fields in Sanity documents...\n')
  
  const results: ValidationResult[] = []
  
  // Get all document types from schemas
  const schemaTypes = [
    'homePage', 'siteSettings', 'author', 'blogPost', 'blogCategory',
    'program', 'successStory', 'faq', 'faqCategory', 'testimonial',
    'teamMember', 'book', 'experience', 'aboutAuthor', 'methodology',
    'calculatorSettings', 'quiz', 'resource', 'booking', 'newsletterSubscriber',
    'navigation', 'virtualClassroom'
  ]
  
  for (const type of schemaTypes) {
    const result: ValidationResult = {
      documentType: type,
      issues: [],
      warnings: [],
      suggestions: []
    }
    
    try {
      // Fetch documents and check structure
      const documents = await client.fetch(`*[_type == $type]`, { type })
      
      if (documents.length === 0) {
        result.warnings.push(`No documents found for type ${type}`)
      } else {
        console.log(`📄 Checking ${documents.length} ${type} documents...`)
        
        // Check for common issues
        for (const doc of documents) {
          // Check for null required fields
          checkRequiredFields(doc, type, result)
          
          // Check for deprecated fields
          checkDeprecatedFields(doc, type, result)
          
          // Check for data consistency
          checkDataConsistency(doc, type, result)
        }
      }
    } catch (error) {
      result.issues.push(`Error fetching ${type}: ${error}`)
    }
    
    if (result.issues.length > 0 || result.warnings.length > 0 || result.suggestions.length > 0) {
      results.push(result)
    }
  }
  
  return results
}

// Check required fields
function checkRequiredFields(doc: any, type: string, result: ValidationResult) {
  const requiredFields: { [key: string]: string[] } = {
    'homePage': ['enhancedHero'],
    'author': ['name', 'slug'],
    'blogPost': ['title', 'slug', 'author', 'publishedDate'],
    'testimonial': ['authorName', 'authorRole', 'content'],
    'program': ['title', 'ageGroup'],
    'successStory': ['studentName', 'content'],
    'book': ['title', 'slug', 'year', 'colorTheme', 'order', 'coverImage'],
    'faq': ['question', 'answer'],
  }
  
  const required = requiredFields[type] || []
  
  for (const field of required) {
    const value = getNestedValue(doc, field)
    if (value === null || value === undefined || value === '') {
      result.issues.push(`Document ${doc._id} missing required field: ${field}`)
    }
  }
}

// Check for deprecated fields that shouldn't exist anymore
function checkDeprecatedFields(doc: any, type: string, result: ValidationResult) {
  const deprecatedFields: { [key: string]: string[] } = {
    'homePage': ['newsletterCTA', 'enhancedHero.ctaPrimary', 'enhancedHero.ctaSecondary'],
    'testimonial': ['name', 'role'],
    'blogPost': ['readingTime'],
    'program': ['ageRange'],
    'successStory': ['testimonial'],
  }
  
  const deprecated = deprecatedFields[type] || []
  
  for (const field of deprecated) {
    const value = getNestedValue(doc, field)
    if (value !== undefined) {
      result.warnings.push(`Document ${doc._id} still has deprecated field: ${field}`)
    }
  }
}

// Check data consistency
function checkDataConsistency(doc: any, type: string, result: ValidationResult) {
  // Check for inconsistent data patterns
  if (type === 'blogPost') {
    if (doc.readTime && doc.readingTime) {
      result.warnings.push(`Document ${doc._id} has both readTime and readingTime fields`)
    }
  }
  
  if (type === 'homePage') {
    if (doc.homeFaqs && doc.homeFAQ) {
      result.warnings.push(`Document ${doc._id} has both homeFaqs and homeFAQ fields`)
    }
    if (doc.newsletter && doc.newsletterCTA) {
      result.warnings.push(`Document ${doc._id} has both newsletter and newsletterCTA fields`)
    }
  }
  
  // Check for empty arrays that should have content
  const arrayFields: { [key: string]: string[] } = {
    'homePage': ['statistics', 'differentiators.items', 'franchiseSteps.steps'],
    'program': ['modules', 'benefits'],
    'book': ['fairy.virtues', 'childCharacters'],
  }
  
  const arrays = arrayFields[type] || []
  for (const field of arrays) {
    const value = getNestedValue(doc, field)
    if (Array.isArray(value) && value.length === 0) {
      result.suggestions.push(`Document ${doc._id} has empty array for ${field}`)
    }
  }
}

// Helper function to get nested value
function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.')
  let value = obj
  
  for (const key of keys) {
    if (value === null || value === undefined) {
      return undefined
    }
    value = value[key]
  }
  
  return value
}

// Generate report
function generateReport(results: ValidationResult[]) {
  console.log('\n' + '='.repeat(60))
  console.log('📊 SANITY SCHEMA VALIDATION REPORT')
  console.log('='.repeat(60) + '\n')
  
  let totalIssues = 0
  let totalWarnings = 0
  let totalSuggestions = 0
  
  for (const result of results) {
    if (result.issues.length === 0 && result.warnings.length === 0 && result.suggestions.length === 0) {
      continue
    }
    
    console.log(`\n📄 ${result.documentType.toUpperCase()}`)
    console.log('-'.repeat(40))
    
    if (result.issues.length > 0) {
      console.log('\n❌ Issues:')
      result.issues.forEach(issue => console.log(`   • ${issue}`))
      totalIssues += result.issues.length
    }
    
    if (result.warnings.length > 0) {
      console.log('\n⚠️  Warnings:')
      result.warnings.forEach(warning => console.log(`   • ${warning}`))
      totalWarnings += result.warnings.length
    }
    
    if (result.suggestions.length > 0) {
      console.log('\n💡 Suggestions:')
      result.suggestions.forEach(suggestion => console.log(`   • ${suggestion}`))
      totalSuggestions += result.suggestions.length
    }
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('📈 SUMMARY')
  console.log('='.repeat(60))
  console.log(`   Issues: ${totalIssues}`)
  console.log(`   Warnings: ${totalWarnings}`)
  console.log(`   Suggestions: ${totalSuggestions}`)
  console.log('='.repeat(60) + '\n')
  
  if (totalIssues === 0 && totalWarnings === 0) {
    console.log('✅ All schemas are valid and data is consistent!')
  } else if (totalIssues === 0) {
    console.log('⚠️  No critical issues, but some warnings need attention.')
  } else {
    console.log('❌ Critical issues found that need immediate attention!')
  }
}

// Main function
async function main() {
  try {
    const results = await checkUnknownFields()
    generateReport(results)
    
    // Exit with error code if there are issues
    const hasIssues = results.some(r => r.issues.length > 0)
    process.exit(hasIssues ? 1 : 0)
  } catch (error) {
    console.error('❌ Validation failed:', error)
    process.exit(1)
  }
}

// Execute if run directly
if (require.main === module) {
  main()
}

export { checkUnknownFields, generateReport }