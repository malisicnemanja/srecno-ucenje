'use client'

import { useEffect } from 'react'
import { 
  validateBrandColorAccessibility, 
  validateHeadingHierarchy, 
  validateImageAccessibility,
  getInsufficientTouchTargets,
  announceToScreenReader 
} from '@/lib/accessibility'

/**
 * Accessibility Validator Component
 * Runs accessibility checks on page load and provides warnings for issues
 */
const AccessibilityValidator = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      runValidation()
    }, 2000)

    return () => clearTimeout(timeoutId)
  }, [])

  const runValidation = () => {
    console.group('🔍 Accessibility Validation Report')
    
    // 1. Color Contrast Validation
    const colorResults = validateBrandColorAccessibility()
    console.log('✅ Color Combinations Passing WCAG:', colorResults.passing.length)
    console.log('⚠️ Color Combinations Failing WCAG:', colorResults.failing.length)
    
    if (colorResults.failing.length > 0) {
      console.warn('Color contrast issues:', colorResults.failing)
    }

    // 2. Heading Hierarchy Validation
    const headingResults = validateHeadingHierarchy()
    if (headingResults.valid) {
      console.log('✅ Heading hierarchy is correct')
    } else {
      console.error('❌ Heading hierarchy issues:', headingResults.issues)
    }

    // 3. Image Accessibility Validation  
    const imageResults = validateImageAccessibility()
    if (imageResults.valid) {
      console.log('✅ All images have proper alt text')
    } else {
      console.error('❌ Image accessibility issues:', imageResults.issues)
    }

    // 4. Touch Target Validation
    const touchTargets = getInsufficientTouchTargets()
    if (touchTargets.length === 0) {
      console.log('✅ All interactive elements meet touch target requirements')
    } else {
      console.warn(`⚠️ ${touchTargets.length} elements below 44x44px minimum:`, touchTargets)
    }

    // 5. Landmark Validation
    const landmarks = {
      main: document.querySelector('main, [role="main"]'),
      navigation: document.querySelector('nav, [role="navigation"]'),
      contentinfo: document.querySelector('footer, [role="contentinfo"]')
    }

    Object.entries(landmarks).forEach(([landmark, element]) => {
      if (element) {
        console.log(`✅ ${landmark} landmark found`)
      } else {
        console.error(`❌ ${landmark} landmark missing`)
      }
    })

    // 6. Form Validation
    const forms = document.querySelectorAll('form')
    forms.forEach((form, index) => {
      const inputs = form.querySelectorAll('input, textarea, select')
      let formIssues = []

      inputs.forEach(input => {
        const element = input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        
        // Check for labels
        const hasLabel = element.labels && element.labels.length > 0
        const hasAriaLabel = element.hasAttribute('aria-label')
        const hasAriaLabelledBy = element.hasAttribute('aria-labelledby')
        
        if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
          formIssues.push(`Field ${element.name || element.id || 'unnamed'} missing label`)
        }

        // Check required field indicators
        if (element.required && !element.hasAttribute('aria-required')) {
          formIssues.push(`Required field ${element.name || element.id} missing aria-required`)
        }
      })

      if (formIssues.length === 0) {
        console.log(`✅ Form ${index + 1} accessibility: OK`)
      } else {
        console.warn(`⚠️ Form ${index + 1} issues:`, formIssues)
      }
    })

    // 7. Skip Links Validation
    const skipLinks = document.querySelectorAll('.skip-link, [href="#main-content"]')
    if (skipLinks.length > 0) {
      console.log(`✅ ${skipLinks.length} skip navigation link(s) found`)
    } else {
      console.error('❌ No skip navigation links found')
    }

    // 8. Language Validation
    const htmlLang = document.documentElement.lang
    if (htmlLang && htmlLang.startsWith('sr')) {
      console.log('✅ Page language properly declared:', htmlLang)
    } else {
      console.error('❌ Page language not properly declared')
    }

    console.groupEnd()

    // Announce validation completion to screen readers in development
    if (process.env.NODE_ENV === 'development') {
      announceToScreenReader('Accessibility validation completed', 'polite')
    }
  }

  return null // This component doesn't render anything visible
}

export default AccessibilityValidator