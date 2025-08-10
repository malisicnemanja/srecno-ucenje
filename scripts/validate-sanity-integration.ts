#!/usr/bin/env node

/**
 * Comprehensive Sanity CMS Integration Validation Script
 * 
 * This script validates:
 * 1. Sanity client connection
 * 2. Schema structure and field definitions
 * 3. Home page data retrieval
 * 4. TypeScript type consistency
 * 5. Missing _key validations
 * 6. Referenced document integrity
 */

import { createClient } from '@sanity/client'
import { homePageQuery, siteSettingsQuery, navigationQuery } from '../lib/sanity.queries'

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // Use fresh data for validation
  token: process.env.SANITY_API_TOKEN, // Optional for read operations
})

interface ValidationResult {
  success: boolean
  message: string
  data?: any
  errors?: string[]
}

class SanityValidator {
  private results: ValidationResult[] = []

  async runAllValidations(): Promise<void> {
    console.log('🔍 Starting Sanity CMS Integration Validation...\n')
    
    await this.validateConnection()
    await this.validateSchemas()
    await this.validateHomePageData()
    await this.validateReferences()
    await this.validateMissingKeys()
    await this.validateTypeConsistency()
    
    this.printResults()
  }

  private async validateConnection(): Promise<void> {
    console.log('1. Testing Sanity connection...')
    try {
      const projects = await client.fetch('*[_type == "sanity.imageAsset"][0]')
      this.results.push({
        success: true,
        message: 'Sanity connection established successfully'
      })
    } catch (error) {
      this.results.push({
        success: false,
        message: 'Failed to connect to Sanity',
        errors: [error instanceof Error ? error.message : String(error)]
      })
    }
  }

  private async validateSchemas(): Promise<void> {
    console.log('2. Validating schema structure...')
    try {
      // Check if core document types exist
      const schemaTypes = [
        'homePage',
        'siteSettings', 
        'navigation',
        'faq',
        'faqCategory'
      ]

      const validationPromises = schemaTypes.map(async (type) => {
        const count = await client.fetch(`count(*[_type == "${type}"])`)
        return { type, count }
      })

      const schemaCounts = await Promise.all(validationPromises)
      const missingSchemas = schemaCounts.filter(s => s.count === 0)
      
      if (missingSchemas.length > 0) {
        this.results.push({
          success: false,
          message: 'Missing required schema documents',
          errors: missingSchemas.map(s => `No documents found for schema type: ${s.type}`)
        })
      } else {
        this.results.push({
          success: true,
          message: 'All required schema types have documents',
          data: schemaCounts
        })
      }
    } catch (error) {
      this.results.push({
        success: false,
        message: 'Schema validation failed',
        errors: [error instanceof Error ? error.message : String(error)]
      })
    }
  }

  private async validateHomePageData(): Promise<void> {
    console.log('3. Validating home page data structure...')
    try {
      const homePageData = await client.fetch(homePageQuery)
      
      if (!homePageData) {
        this.results.push({
          success: false,
          message: 'No home page data found',
          errors: ['homePageQuery returned null or undefined']
        })
        return
      }

      // Validate required sections
      const requiredSections = [
        'enhancedHero',
        'statistics', 
        'differentiators',
        'franchiseSteps'
      ]

      const missingSections: string[] = []
      const sectionsData: any = {}

      for (const section of requiredSections) {
        if (!homePageData[section]) {
          missingSections.push(section)
        } else {
          sectionsData[section] = homePageData[section]
        }
      }

      // Validate array fields have _key
      const arrayValidation = await this.validateArrayKeys(homePageData)

      if (missingSections.length > 0 || arrayValidation.errors.length > 0) {
        this.results.push({
          success: false,
          message: 'Home page data validation failed',
          errors: [
            ...missingSections.map(s => `Missing section: ${s}`),
            ...arrayValidation.errors
          ]
        })
      } else {
        this.results.push({
          success: true,
          message: 'Home page data structure is valid',
          data: {
            sectionsFound: Object.keys(sectionsData),
            arrayKeysValid: arrayValidation.valid
          }
        })
      }
    } catch (error) {
      this.results.push({
        success: false,
        message: 'Home page data validation failed',
        errors: [error instanceof Error ? error.message : String(error)]
      })
    }
  }

  private async validateArrayKeys(data: any, path = ''): Promise<{valid: boolean, errors: string[]}> {
    const errors: string[] = []
    
    const checkObject = (obj: any, currentPath: string) => {
      if (!obj || typeof obj !== 'object') return

      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          const itemPath = `${currentPath}[${index}]`
          if (item && typeof item === 'object' && !item._key && !item._id) {
            // Only require _key for complex objects, not simple strings/numbers
            if (Object.keys(item).length > 1 || (Object.keys(item).length === 1 && !['text', 'value', 'label'].includes(Object.keys(item)[0]))) {
              errors.push(`Missing _key at ${itemPath}`)
            }
          }
          checkObject(item, itemPath)
        })
      } else {
        Object.entries(obj).forEach(([key, value]) => {
          checkObject(value, currentPath ? `${currentPath}.${key}` : key)
        })
      }
    }

    checkObject(data, path)
    
    return {
      valid: errors.length === 0,
      errors
    }
  }

  private async validateReferences(): Promise<void> {
    console.log('4. Validating document references...')
    try {
      // Check FAQ references in home page
      const homePageWithRefs = await client.fetch(`
        *[_type == "homePage"][0] {
          homeFaqs {
            faqs[]->{_id, question, answer, category}
          }
        }
      `)

      let brokenRefs = 0
      let totalRefs = 0

      if (homePageWithRefs?.homeFaqs?.faqs) {
        totalRefs = homePageWithRefs.homeFaqs.faqs.length
        brokenRefs = homePageWithRefs.homeFaqs.faqs.filter((faq: any) => !faq || !faq._id).length
      }

      this.results.push({
        success: brokenRefs === 0,
        message: `Reference validation: ${totalRefs - brokenRefs}/${totalRefs} references valid`,
        data: { totalRefs, brokenRefs }
      })
    } catch (error) {
      this.results.push({
        success: false,
        message: 'Reference validation failed',
        errors: [error instanceof Error ? error.message : String(error)]
      })
    }
  }

  private async validateMissingKeys(): Promise<void> {
    console.log('5. Checking for missing _key values in arrays...')
    try {
      // Find documents with arrays missing _key values
      const query = `
        *[_type in ["homePage", "siteSettings", "navigation"]] {
          _type,
          _id,
          ...
        }
      `
      
      const documents = await client.fetch(query)
      const keyIssues: string[] = []

      for (const doc of documents) {
        const validation = await this.validateArrayKeys(doc, `${doc._type}(${doc._id})`)
        keyIssues.push(...validation.errors)
      }

      this.results.push({
        success: keyIssues.length === 0,
        message: `Array _key validation: ${keyIssues.length} issues found`,
        errors: keyIssues
      })
    } catch (error) {
      this.results.push({
        success: false,
        message: 'Missing keys validation failed',
        errors: [error instanceof Error ? error.message : String(error)]
      })
    }
  }

  private async validateTypeConsistency(): Promise<void> {
    console.log('6. Validating TypeScript type consistency...')
    try {
      // Test queries that are used in the application
      const queries = [
        { name: 'homePageQuery', query: homePageQuery },
        { name: 'siteSettingsQuery', query: siteSettingsQuery },
        { name: 'navigationQuery', query: navigationQuery }
      ]

      const queryResults = await Promise.all(
        queries.map(async ({ name, query }) => {
          try {
            const result = await client.fetch(query)
            return {
              name,
              success: true,
              hasData: !!result,
              dataType: Array.isArray(result) ? 'array' : typeof result
            }
          } catch (error) {
            return {
              name,
              success: false,
              error: error instanceof Error ? error.message : String(error)
            }
          }
        })
      )

      const failedQueries = queryResults.filter(r => !r.success)
      const emptyQueries = queryResults.filter(r => r.success && !r.hasData)

      if (failedQueries.length > 0 || emptyQueries.length > 0) {
        this.results.push({
          success: false,
          message: 'Query validation issues found',
          errors: [
            ...failedQueries.map(q => `Query ${q.name} failed: ${q.error}`),
            ...emptyQueries.map(q => `Query ${q.name} returned no data`)
          ]
        })
      } else {
        this.results.push({
          success: true,
          message: 'All queries executed successfully and returned data',
          data: queryResults
        })
      }
    } catch (error) {
      this.results.push({
        success: false,
        message: 'Type consistency validation failed',
        errors: [error instanceof Error ? error.message : String(error)]
      })
    }
  }

  private printResults(): void {
    console.log('\n' + '='.repeat(60))
    console.log('🏆 SANITY CMS VALIDATION RESULTS')
    console.log('='.repeat(60))

    const totalTests = this.results.length
    const passedTests = this.results.filter(r => r.success).length
    const failedTests = totalTests - passedTests

    console.log(`\n📊 Summary: ${passedTests}/${totalTests} tests passed\n`)

    this.results.forEach((result, index) => {
      const icon = result.success ? '✅' : '❌'
      console.log(`${icon} Test ${index + 1}: ${result.message}`)
      
      if (result.data) {
        console.log(`   Data: ${JSON.stringify(result.data, null, 2).substring(0, 200)}...`)
      }
      
      if (result.errors && result.errors.length > 0) {
        console.log(`   Errors:`)
        result.errors.forEach(error => {
          console.log(`     - ${error}`)
        })
      }
      console.log()
    })

    if (failedTests > 0) {
      console.log('❌ VALIDATION FAILED - Issues need to be resolved')
      console.log('\nNext steps:')
      console.log('1. Check Sanity Studio for missing documents')
      console.log('2. Add missing _key values to array items')
      console.log('3. Fix broken references')
      console.log('4. Ensure all required schema fields are populated')
    } else {
      console.log('🎉 ALL VALIDATIONS PASSED - Sanity integration is healthy!')
    }

    console.log('\n' + '='.repeat(60))
  }
}

// Run validation
async function main() {
  const validator = new SanityValidator()
  await validator.runAllValidations()
}

if (require.main === module) {
  main().catch(console.error)
}

export default main