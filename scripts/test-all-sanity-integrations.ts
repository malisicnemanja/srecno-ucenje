#!/usr/bin/env tsx

/**
 * Comprehensive Sanity Integration Test Script
 * 
 * This script tests all major pages and their Sanity data integration
 * to ensure the website works properly with real CMS data.
 */

import { createClient } from '@sanity/client'
import { 
  homePageQuery, 
  siteSettingsQuery, 
  navigationQuery,
  faqsWithCategoriesQuery,
  blogPostsQuery,
  aboutAuthorQuery
} from '../lib/sanity.queries'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '08ctxj6y',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

interface TestResult {
  name: string
  success: boolean
  data?: any
  error?: string
  details?: string[]
}

class SanityIntegrationTester {
  private results: TestResult[] = []

  async runAllTests(): Promise<void> {
    console.log('🔍 Starting Sanity Integration Tests...\n')
    
    await this.testHomePageIntegration()
    await this.testSiteSettings()
    await this.testNavigation()
    await this.testFAQIntegration()
    await this.testBlogIntegration()
    await this.testAboutAuthorIntegration()
    await this.testDataCompleteness()
    
    this.printResults()
  }

  private async testHomePageIntegration(): Promise<void> {
    console.log('🏠 Testing Home Page Integration...')
    
    try {
      const homeData = await client.fetch(homePageQuery)
      
      if (!homeData) {
        this.results.push({
          name: 'Home Page Data',
          success: false,
          error: 'No home page document found'
        })
        return
      }

      const requiredSections = [
        'enhancedHero',
        'statistics', 
        'differentiators',
        'franchiseSteps'
      ]

      const missingSections = requiredSections.filter(section => !homeData[section])
      const details: string[] = []

      // Check individual sections
      if (homeData.enhancedHero) {
        details.push(`✅ Hero section: ${homeData.enhancedHero.title}`)
      } else {
        details.push('❌ Missing hero section')
      }

      if (homeData.statistics && Array.isArray(homeData.statistics)) {
        details.push(`✅ Statistics: ${homeData.statistics.length} items`)
      } else {
        details.push('❌ Missing statistics')
      }

      if (homeData.successStories && homeData.successStories.stories) {
        details.push(`✅ Success Stories: ${homeData.successStories.stories.length} stories`)
      } else {
        details.push('❌ Missing success stories')
      }

      if (homeData.homeFaqs && homeData.homeFaqs.faqs) {
        details.push(`✅ Home FAQs: ${homeData.homeFaqs.faqs.length} FAQs`)
      } else {
        details.push('❌ Missing home FAQs')
      }

      this.results.push({
        name: 'Home Page Data',
        success: missingSections.length === 0,
        data: {
          sectionsFound: Object.keys(homeData).filter(key => homeData[key]),
          missingSections
        },
        details
      })

    } catch (error) {
      this.results.push({
        name: 'Home Page Data',
        success: false,
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }

  private async testSiteSettings(): Promise<void> {
    console.log('⚙️ Testing Site Settings...')
    
    try {
      const settings = await client.fetch(siteSettingsQuery)
      
      if (!settings) {
        this.results.push({
          name: 'Site Settings',
          success: false,
          error: 'No site settings found'
        })
        return
      }

      const details: string[] = []
      
      if (settings.siteName) details.push(`✅ Site Name: ${settings.siteName}`)
      if (settings.email) details.push(`✅ Email: ${settings.email}`)
      if (settings.phone) details.push(`✅ Phone: ${settings.phone}`)
      if (settings.address) details.push(`✅ Address: ${settings.address}`)

      this.results.push({
        name: 'Site Settings',
        success: true,
        data: settings,
        details
      })

    } catch (error) {
      this.results.push({
        name: 'Site Settings',
        success: false,
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }

  private async testNavigation(): Promise<void> {
    console.log('🧭 Testing Navigation...')
    
    try {
      const navigation = await client.fetch(navigationQuery)
      
      if (!navigation) {
        this.results.push({
          name: 'Navigation',
          success: false,
          error: 'No navigation found'
        })
        return
      }

      const details: string[] = []
      
      if (navigation.mainMenu && Array.isArray(navigation.mainMenu)) {
        details.push(`✅ Main Menu: ${navigation.mainMenu.length} items`)
      }
      
      if (navigation.ctaButton) {
        details.push(`✅ CTA Button: ${navigation.ctaButton.text}`)
      }

      this.results.push({
        name: 'Navigation',
        success: true,
        data: navigation,
        details
      })

    } catch (error) {
      this.results.push({
        name: 'Navigation',
        success: false,
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }

  private async testFAQIntegration(): Promise<void> {
    console.log('❓ Testing FAQ Integration...')
    
    try {
      const faqs = await client.fetch(faqsWithCategoriesQuery)
      
      if (!faqs || faqs.length === 0) {
        this.results.push({
          name: 'FAQ Integration',
          success: false,
          error: 'No FAQ documents found'
        })
        return
      }

      const details: string[] = []
      details.push(`✅ Total FAQs: ${faqs.length}`)
      
      const withCategories = faqs.filter((faq: any) => faq.category)
      details.push(`✅ FAQs with categories: ${withCategories.length}`)
      
      const featured = faqs.filter((faq: any) => faq.featured)
      details.push(`✅ Featured FAQs: ${featured.length}`)

      this.results.push({
        name: 'FAQ Integration',
        success: true,
        data: { totalFaqs: faqs.length, withCategories: withCategories.length, featured: featured.length },
        details
      })

    } catch (error) {
      this.results.push({
        name: 'FAQ Integration',
        success: false,
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }

  private async testBlogIntegration(): Promise<void> {
    console.log('📝 Testing Blog Integration...')
    
    try {
      const blogPosts = await client.fetch(blogPostsQuery)
      
      if (!blogPosts) {
        this.results.push({
          name: 'Blog Integration',
          success: false,
          error: 'No blog posts found'
        })
        return
      }

      const details: string[] = []
      
      if (Array.isArray(blogPosts)) {
        details.push(`✅ Total Blog Posts: ${blogPosts.length}`)
        
        const withAuthors = blogPosts.filter(post => post.author)
        details.push(`✅ Posts with authors: ${withAuthors.length}`)
        
        const withCategories = blogPosts.filter(post => post.category)
        details.push(`✅ Posts with categories: ${withCategories.length}`)
        
        const featured = blogPosts.filter(post => post.featured)
        details.push(`✅ Featured posts: ${featured.length}`)
      } else {
        details.push('⚠️ Blog posts data structure unexpected')
      }

      this.results.push({
        name: 'Blog Integration',
        success: Array.isArray(blogPosts) && blogPosts.length > 0,
        data: blogPosts,
        details
      })

    } catch (error) {
      this.results.push({
        name: 'Blog Integration',
        success: false,
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }

  private async testAboutAuthorIntegration(): Promise<void> {
    console.log('👤 Testing About Author Integration...')
    
    try {
      const aboutData = await client.fetch(aboutAuthorQuery)
      
      if (!aboutData) {
        this.results.push({
          name: 'About Author Integration',
          success: false,
          error: 'No about author document found'
        })
        return
      }

      const details: string[] = []
      
      if (aboutData.heroTitle) details.push(`✅ Hero Title: ${aboutData.heroTitle}`)
      if (aboutData.heroSubtitle) details.push(`✅ Hero Subtitle available`)
      if (aboutData.sections && Array.isArray(aboutData.sections)) {
        details.push(`✅ Content Sections: ${aboutData.sections.length}`)
      }
      if (aboutData.timeline && Array.isArray(aboutData.timeline)) {
        details.push(`✅ Timeline Events: ${aboutData.timeline.length}`)
      }
      if (aboutData.achievements && Array.isArray(aboutData.achievements)) {
        details.push(`✅ Achievements: ${aboutData.achievements.length}`)
      }

      this.results.push({
        name: 'About Author Integration',
        success: true,
        data: aboutData,
        details
      })

    } catch (error) {
      this.results.push({
        name: 'About Author Integration',
        success: false,
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }

  private async testDataCompleteness(): Promise<void> {
    console.log('✅ Testing Data Completeness...')
    
    try {
      // Check document counts
      const documentCounts = await Promise.all([
        client.fetch(`count(*[_type == "homePage"])`),
        client.fetch(`count(*[_type == "siteSettings"])`),
        client.fetch(`count(*[_type == "navigation"])`),
        client.fetch(`count(*[_type == "faq"])`),
        client.fetch(`count(*[_type == "faqCategory"])`),
        client.fetch(`count(*[_type == "blogPost"])`),
        client.fetch(`count(*[_type == "blogCategory"])`),
        client.fetch(`count(*[_type == "aboutAuthor"])`)
      ])

      const [homePages, siteSettings, navigation, faqs, faqCategories, blogPosts, blogCategories, aboutAuthor] = documentCounts

      const details: string[] = []
      details.push(`📄 Home Pages: ${homePages}`)
      details.push(`⚙️ Site Settings: ${siteSettings}`)
      details.push(`🧭 Navigation: ${navigation}`)
      details.push(`❓ FAQs: ${faqs}`)
      details.push(`📁 FAQ Categories: ${faqCategories}`)
      details.push(`📝 Blog Posts: ${blogPosts}`)
      details.push(`📁 Blog Categories: ${blogCategories}`)
      details.push(`👤 About Author: ${aboutAuthor}`)

      const allRequiredExists = homePages > 0 && siteSettings > 0 && navigation > 0 && faqs > 0

      this.results.push({
        name: 'Data Completeness',
        success: allRequiredExists,
        data: {
          homePages, siteSettings, navigation, faqs, faqCategories, 
          blogPosts, blogCategories, aboutAuthor
        },
        details
      })

    } catch (error) {
      this.results.push({
        name: 'Data Completeness',
        success: false,
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }

  private printResults(): void {
    console.log('\n' + '='.repeat(60))
    console.log('🏆 SANITY INTEGRATION TEST RESULTS')
    console.log('='.repeat(60))

    const totalTests = this.results.length
    const passedTests = this.results.filter(r => r.success).length
    const failedTests = totalTests - passedTests

    console.log(`\n📊 Summary: ${passedTests}/${totalTests} tests passed\n`)

    this.results.forEach((result, index) => {
      const icon = result.success ? '✅' : '❌'
      console.log(`${icon} ${result.name}`)
      
      if (result.details && result.details.length > 0) {
        result.details.forEach(detail => {
          console.log(`   ${detail}`)
        })
      }
      
      if (result.error) {
        console.log(`   Error: ${result.error}`)
      }
      
      if (result.data && typeof result.data === 'object') {
        const keys = Object.keys(result.data)
        if (keys.length > 0 && keys.length <= 5) {
          console.log(`   Data: ${JSON.stringify(result.data, null, 2).substring(0, 100)}...`)
        }
      }
      console.log()
    })

    if (failedTests === 0) {
      console.log('🎉 ALL TESTS PASSED! Sanity integration is working correctly.')
      console.log('\n✨ Your website is ready to use with real CMS data!')
      console.log('\n📋 Next Steps:')
      console.log('1. Visit your website and verify all pages load correctly')
      console.log('2. Test the Sanity Studio to make content changes')
      console.log('3. Verify that changes appear on the live site')
    } else {
      console.log('❌ SOME TESTS FAILED - Issues need to be resolved')
      console.log('\n🔧 Recommended Actions:')
      console.log('1. Check failed tests above for specific issues')
      console.log('2. Verify Sanity Studio has required documents')
      console.log('3. Run the data population script if needed')
      console.log('4. Check environment variables')
    }

    console.log('\n' + '='.repeat(60))
  }
}

// Run tests
async function main() {
  const tester = new SanityIntegrationTester()
  await tester.runAllTests()
}

if (require.main === module) {
  main().catch(console.error)
}

export default main