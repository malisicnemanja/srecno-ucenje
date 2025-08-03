/**
 * Simple A/B Testing Framework
 * 
 * Usage:
 * const variant = getVariant('test-name', ['A', 'B'])
 * if (variant === 'A') {
 *   // Show variant A
 * } else {
 *   // Show variant B
 * }
 */

interface ABTest {
  name: string
  variants: string[]
  traffic?: number // 0-1, percentage of users to include in test
  enabled?: boolean
}

interface ABTestResult {
  testName: string
  variant: string
  timestamp: number
}

// Storage key for persisting user's test assignments
const STORAGE_KEY = 'ab_tests'

// Available A/B tests configuration
export const AB_TESTS: Record<string, ABTest> = {
  'hero-cta': {
    name: 'hero-cta',
    variants: ['original', 'action-focused'],
    traffic: 0.5, // Test with 50% of users
    enabled: true,
  },
  'pricing-display': {
    name: 'pricing-display',
    variants: ['monthly', 'yearly-focused'],
    traffic: 0.3, // Test with 30% of users
    enabled: false, // Disabled by default
  },
  'contact-form': {
    name: 'contact-form',
    variants: ['standard', 'simplified'],
    traffic: 1.0, // Test with all users
    enabled: true,
  },
}

/**
 * Get user's assigned variant for a specific test
 */
export function getVariant(testName: string, fallback: string = 'original'): string {
  // Check if running in browser
  if (typeof window === 'undefined') {
    return fallback
  }

  const test = AB_TESTS[testName]
  
  // If test doesn't exist or is disabled, return fallback
  if (!test || !test.enabled) {
    return fallback
  }

  // Check if user is in the test traffic percentage
  const userId = getUserId()
  const userHash = hashCode(userId + testName)
  const userPercentile = Math.abs(userHash) % 100 / 100
  
  if (userPercentile > (test.traffic || 1)) {
    return fallback
  }

  // Check if user already has an assignment
  const existingResult = getStoredResult(testName)
  if (existingResult) {
    return existingResult.variant
  }

  // Assign user to a variant
  const variantIndex = Math.abs(userHash) % test.variants.length
  const variant = test.variants[variantIndex]

  // Store the assignment
  storeResult({
    testName,
    variant,
    timestamp: Date.now(),
  })

  return variant
}

/**
 * Track an event for A/B testing analytics
 */
export function trackABEvent(testName: string, eventName: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined') return

  const variant = getVariant(testName)
  
  // Send to your analytics provider
  if (window.gtag) {
    window.gtag('event', 'ab_test_event', {
      test_name: testName,
      variant,
      event_name: eventName,
      ...properties,
    })
  }

  // Also send to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('A/B Test Event:', {
      testName,
      variant,
      eventName,
      properties,
    })
  }
}

/**
 * Get or generate a user ID for consistent test assignment
 */
function getUserId(): string {
  if (typeof window === 'undefined') return 'server'

  let userId = localStorage.getItem('user_id')
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9)
    localStorage.setItem('user_id', userId)
  }
  return userId
}

/**
 * Simple hash function for consistent variant assignment
 */
function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}

/**
 * Get stored test result from localStorage
 */
function getStoredResult(testName: string): ABTestResult | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    const results: ABTestResult[] = JSON.parse(stored)
    return results.find(r => r.testName === testName) || null
  } catch {
    return null
  }
}

/**
 * Store test result in localStorage
 */
function storeResult(result: ABTestResult) {
  if (typeof window === 'undefined') return

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const results: ABTestResult[] = stored ? JSON.parse(stored) : []
    
    // Remove existing result for this test
    const filtered = results.filter(r => r.testName !== result.testName)
    filtered.push(result)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  } catch {
    // Silently fail if localStorage is not available
  }
}

/**
 * React hook for using A/B tests in components
 */
export function useABTest(testName: string, fallback: string = 'original') {
  if (typeof window === 'undefined') {
    return { variant: fallback, trackEvent: () => {} }
  }

  const variant = getVariant(testName, fallback)
  
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    trackABEvent(testName, eventName, properties)
  }

  return { variant, trackEvent }
}

/**
 * Get all active test assignments for the current user
 */
export function getAllTestAssignments(): ABTestResult[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Force a specific variant for testing purposes (development only)
 */
export function forceVariant(testName: string, variant: string) {
  if (process.env.NODE_ENV !== 'development') {
    console.warn('forceVariant should only be used in development')
    return
  }

  storeResult({
    testName,
    variant,
    timestamp: Date.now(),
  })
}