#!/usr/bin/env node

/**
 * Test Home Page Component Rendering
 * 
 * This script tests if the home page can render properly with real CMS data
 */

import { createClient } from '@sanity/client'
import { homePageQuery } from '../lib/sanity.queries'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '08ctxj6y',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

interface TestResult {
  section: string
  success: boolean
  message: string
  data?: any
  errors?: string[]
}

class HomePageRenderingValidator {
  private results: TestResult[] = []

  async validateHomePageRendering(): Promise<void> {
    console.log('🏠 Testing Home Page Component Rendering...\n')
    
    // Fetch data
    const pageData = await this.fetchPageData()
    if (!pageData) {
      console.error('❌ Failed to fetch page data')
      return
    }

    // Test each section
    await this.testHeroSection(pageData)
    await this.testStatisticsSection(pageData)
    await this.testDifferentiatorsSection(pageData)
    await this.testFranchiseStepsSection(pageData)
    await this.testSuccessStoriesSection(pageData)
    await this.testFAQSection(pageData)
    await this.testNewsletterSection(pageData)

    this.printResults()
  }

  private async fetchPageData(): Promise<any> {
    try {
      return await client.fetch(homePageQuery)
    } catch (error) {
      this.results.push({
        section: 'Data Fetching',
        success: false,
        message: 'Failed to fetch home page data',
        errors: [error instanceof Error ? error.message : String(error)]
      })
      return null
    }
  }

  private async testHeroSection(pageData: any): Promise<void> {
    const section = 'Hero Section'
    
    if (!pageData.enhancedHero) {
      this.results.push({
        section,
        success: false,
        message: 'enhancedHero data is missing'
      })
      return
    }

    const hero = pageData.enhancedHero
    const requiredFields = ['title', 'subtitle']
    const missingFields = requiredFields.filter(field => !hero[field])
    
    if (missingFields.length > 0) {
      this.results.push({
        section,
        success: false,
        message: 'Missing required hero fields',
        errors: missingFields.map(f => `Missing field: ${f}`)
      })
    } else {
      this.results.push({
        section,
        success: true,
        message: 'Hero section data is valid',
        data: { title: hero.title, hasButtons: !!hero.buttons }
      })
    }
  }

  private async testStatisticsSection(pageData: any): Promise<void> {
    const section = 'Statistics Section'
    
    if (!pageData.statistics || !Array.isArray(pageData.statistics)) {
      this.results.push({
        section,
        success: false,
        message: 'Statistics array is missing or invalid'
      })
      return
    }

    const stats = pageData.statistics
    const issues: string[] = []
    
    stats.forEach((stat: any, index: number) => {
      if (!stat._key) {
        issues.push(`Statistic ${index} missing _key`)
      }
      if (!stat.value && !stat.number) {
        issues.push(`Statistic ${index} missing value/number`)
      }
      if (!stat.label) {
        issues.push(`Statistic ${index} missing label`)
      }
    })

    if (issues.length > 0) {
      this.results.push({
        section,
        success: false,
        message: 'Statistics validation failed',
        errors: issues
      })
    } else {
      this.results.push({
        section,
        success: true,
        message: `${stats.length} statistics validated successfully`,
        data: { count: stats.length, hasKeys: stats.every((s: any) => s._key) }
      })
    }
  }

  private async testDifferentiatorsSection(pageData: any): Promise<void> {
    const section = 'Differentiators Section'
    
    if (!pageData.differentiators?.items) {
      this.results.push({
        section,
        success: false,
        message: 'Differentiators items missing'
      })
      return
    }

    const items = pageData.differentiators.items
    const issues: string[] = []
    
    items.forEach((item: any, index: number) => {
      if (!item._key) {
        issues.push(`Differentiator ${index} missing _key`)
      }
      if (!item.title) {
        issues.push(`Differentiator ${index} missing title`)
      }
      if (!item.description) {
        issues.push(`Differentiator ${index} missing description`)
      }
    })

    if (issues.length > 0) {
      this.results.push({
        section,
        success: false,
        message: 'Differentiators validation failed',
        errors: issues
      })
    } else {
      this.results.push({
        section,
        success: true,
        message: `${items.length} differentiators validated successfully`
      })
    }
  }

  private async testFranchiseStepsSection(pageData: any): Promise<void> {
    const section = 'Franchise Steps Section'
    
    if (!pageData.franchiseSteps?.steps) {
      this.results.push({
        section,
        success: false,
        message: 'Franchise steps missing'
      })
      return
    }

    const steps = pageData.franchiseSteps.steps
    const issues: string[] = []
    
    steps.forEach((step: any, index: number) => {
      if (!step._key) {
        issues.push(`Step ${index} missing _key`)
      }
      if (!step.title) {
        issues.push(`Step ${index} missing title`)
      }
      if (!step.description) {
        issues.push(`Step ${index} missing description`)
      }
    })

    if (issues.length > 0) {
      this.results.push({
        section,
        success: false,
        message: 'Franchise steps validation failed',
        errors: issues
      })
    } else {
      this.results.push({
        section,
        success: true,
        message: `${steps.length} franchise steps validated successfully`
      })
    }
  }

  private async testSuccessStoriesSection(pageData: any): Promise<void> {
    const section = 'Success Stories Section'
    
    if (!pageData.successStories?.stories) {
      this.results.push({
        section,
        success: false,
        message: 'Success stories missing'
      })
      return
    }

    const stories = pageData.successStories.stories
    const issues: string[] = []
    
    stories.forEach((story: any, index: number) => {
      if (!story._key) {
        issues.push(`Story ${index} missing _key`)
      }
      if (!story.name) {
        issues.push(`Story ${index} missing name`)
      }
      if (!story.story) {
        issues.push(`Story ${index} missing story text`)
      }
    })

    if (issues.length > 0) {
      this.results.push({
        section,
        success: false,
        message: 'Success stories validation failed',
        errors: issues
      })
    } else {
      this.results.push({
        section,
        success: true,
        message: `${stories.length} success stories validated successfully`
      })
    }
  }

  private async testFAQSection(pageData: any): Promise<void> {
    const section = 'FAQ Section'
    
    if (!pageData.homeFaqs?.faqs) {
      this.results.push({
        section,
        success: false,
        message: 'FAQ data missing'
      })
      return
    }

    const faqs = pageData.homeFaqs.faqs
    const issues: string[] = []
    
    faqs.forEach((faq: any, index: number) => {
      if (!faq._id) {
        issues.push(`FAQ ${index} missing _id`)
      }
      if (!faq.question) {
        issues.push(`FAQ ${index} missing question`)
      }
      if (!faq.answer) {
        issues.push(`FAQ ${index} missing answer`)
      }
    })

    if (issues.length > 0) {
      this.results.push({
        section,
        success: false,
        message: 'FAQ validation failed',
        errors: issues
      })
    } else {
      this.results.push({
        section,
        success: true,
        message: `${faqs.length} FAQs validated successfully`
      })
    }
  }

  private async testNewsletterSection(pageData: any): Promise<void> {
    const section = 'Newsletter Section'
    
    if (!pageData.newsletterCTA) {
      this.results.push({
        section,
        success: false,
        message: 'Newsletter CTA data missing'
      })
      return
    }

    const newsletter = pageData.newsletterCTA
    const requiredFields = ['title']
    const missingFields = requiredFields.filter(field => !newsletter[field])
    
    if (missingFields.length > 0) {
      this.results.push({
        section,
        success: false,
        message: 'Newsletter CTA missing required fields',
        errors: missingFields.map(f => `Missing field: ${f}`)
      })
    } else {
      this.results.push({
        section,
        success: true,
        message: 'Newsletter CTA data is valid'
      })
    }
  }

  private printResults(): void {
    console.log('\n' + '='.repeat(60))
    console.log('🏠 HOME PAGE RENDERING VALIDATION RESULTS')
    console.log('='.repeat(60))

    const totalTests = this.results.length
    const passedTests = this.results.filter(r => r.success).length
    const failedTests = totalTests - passedTests

    console.log(`\n📊 Summary: ${passedTests}/${totalTests} sections validated\n`)

    this.results.forEach((result) => {
      const icon = result.success ? '✅' : '❌'
      console.log(`${icon} ${result.section}: ${result.message}`)
      
      if (result.data) {
        console.log(`   📋 Data: ${JSON.stringify(result.data)}`)
      }
      
      if (result.errors && result.errors.length > 0) {
        console.log(`   🚨 Issues:`)
        result.errors.forEach(error => {
          console.log(`     - ${error}`)
        })
      }
      console.log()
    })

    if (failedTests === 0) {
      console.log('🎉 ALL HOME PAGE SECTIONS ARE READY FOR RENDERING!')
      console.log('\n✨ The home page should render without issues')
    } else {
      console.log('⚠️ SOME SECTIONS HAVE VALIDATION ISSUES')
      console.log('\n🔧 Fix the issues above before deploying')
    }

    console.log('\n' + '='.repeat(60))
  }
}

// Run validation
async function main() {
  const validator = new HomePageRenderingValidator()
  await validator.validateHomePageRendering()
}

if (require.main === module) {
  main().catch(console.error)
}

export default main