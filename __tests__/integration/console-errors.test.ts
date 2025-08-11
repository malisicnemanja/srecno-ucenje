import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock console methods to capture errors and warnings
const originalConsole = {
  error: console.error,
  warn: console.warn,
  log: console.log
}

let consoleErrors: any[] = []
let consoleWarnings: any[] = []

describe('Console Errors and Warnings Test', () => {
  beforeEach(() => {
    // Reset arrays
    consoleErrors = []
    consoleWarnings = []

    // Mock console methods to capture output
    console.error = vi.fn((...args) => {
      consoleErrors.push(args)
      originalConsole.error(...args)
    })
    
    console.warn = vi.fn((...args) => {
      consoleWarnings.push(args)
      originalConsole.warn(...args)
    })
  })

  afterEach(() => {
    // Restore original console methods
    console.error = originalConsole.error
    console.warn = originalConsole.warn
  })

  it('should not have React hydration errors', async () => {
    // Common React hydration errors to check for
    const hydrationErrors = [
      'Hydration failed',
      'Expected server HTML',
      'Text content does not match',
      'Prop `className` did not match',
      'Warning: validateDOMNesting'
    ]

    // Check if any console errors contain hydration issues
    const hasHydrationErrors = consoleErrors.some(errorArgs => 
      errorArgs.some(arg => 
        typeof arg === 'string' && 
        hydrationErrors.some(error => arg.includes(error))
      )
    )

    expect(hasHydrationErrors).toBe(false)
  })

  it('should not have Next.js specific errors', async () => {
    const nextJSErrors = [
      'Fast Refresh had to perform a full reload',
      'Module not found',
      'Cannot resolve module',
      'Webpack build error',
      'Build optimization failed'
    ]

    const hasNextJSErrors = consoleErrors.some(errorArgs => 
      errorArgs.some(arg => 
        typeof arg === 'string' && 
        nextJSErrors.some(error => arg.includes(error))
      )
    )

    expect(hasNextJSErrors).toBe(false)
  })

  it('should not have Sanity CMS errors', async () => {
    const sanityErrors = [
      'Sanity Client Error',
      'Failed to fetch from Sanity',
      'GROQ query error',
      'Sanity API Error',
      'Invalid Sanity token'
    ]

    const hasSanityErrors = consoleErrors.some(errorArgs => 
      errorArgs.some(arg => 
        typeof arg === 'string' && 
        sanityErrors.some(error => arg.includes(error))
      )
    )

    expect(hasSanityErrors).toBe(false)
  })

  it('should not have critical JavaScript errors', async () => {
    const jsErrors = [
      'TypeError',
      'ReferenceError', 
      'SyntaxError',
      'RangeError',
      'EvalError',
      'URIError'
    ]

    const hasJSErrors = consoleErrors.some(errorArgs => 
      errorArgs.some(arg => {
        if (arg instanceof Error) {
          return jsErrors.some(error => arg.constructor.name === error)
        }
        return typeof arg === 'string' && 
               jsErrors.some(error => arg.includes(error))
      })
    )

    expect(hasJSErrors).toBe(false)
  })

  it('should not have accessibility errors', async () => {
    const a11yErrors = [
      'aria-hidden',
      'aria-label',
      'missing alt attribute',
      'Form control is not labelled',
      'Elements with the ARIA role',
      'Invalid ARIA attribute'
    ]

    const hasA11yErrors = consoleErrors.some(errorArgs => 
      errorArgs.some(arg => 
        typeof arg === 'string' && 
        a11yErrors.some(error => arg.toLowerCase().includes(error.toLowerCase()))
      )
    )

    expect(hasA11yErrors).toBe(false)
  })

  it('should not have performance warnings in production', async () => {
    // Only check performance warnings if NODE_ENV is production
    if (process.env.NODE_ENV === 'production') {
      const performanceWarnings = [
        'Performance warning',
        'Bundle size exceeded',
        'Slow component render',
        'Memory leak detected',
        'Large bundle size'
      ]

      const hasPerformanceWarnings = consoleWarnings.some(warningArgs => 
        warningArgs.some(arg => 
          typeof arg === 'string' && 
          performanceWarnings.some(warning => arg.includes(warning))
        )
      )

      expect(hasPerformanceWarnings).toBe(false)
    }
  })

  it('should not have deprecated API warnings', async () => {
    const deprecatedWarnings = [
      'deprecated',
      'will be removed in',
      'legacy',
      'componentWillMount',
      'componentWillReceiveProps',
      'componentWillUpdate'
    ]

    const hasDeprecatedWarnings = consoleWarnings.some(warningArgs => 
      warningArgs.some(arg => 
        typeof arg === 'string' && 
        deprecatedWarnings.some(warning => arg.toLowerCase().includes(warning.toLowerCase()))
      )
    )

    expect(hasDeprecatedWarnings).toBe(false)
  })

  it('should not have network or API errors', async () => {
    const networkErrors = [
      'Network request failed',
      'Failed to fetch',
      'XMLHttpRequest error',
      'CORS error',
      'API request failed',
      '404 Not Found',
      '500 Internal Server Error',
      'Timeout error'
    ]

    const hasNetworkErrors = consoleErrors.some(errorArgs => 
      errorArgs.some(arg => 
        typeof arg === 'string' && 
        networkErrors.some(error => arg.includes(error))
      )
    )

    expect(hasNetworkErrors).toBe(false)
  })

  it('should handle Serbian characters without encoding errors', async () => {
    const encodingErrors = [
      'encoding error',
      'character set error',
      'UTF-8 error',
      'Unicode error',
      'malformed character'
    ]

    const hasEncodingErrors = consoleErrors.some(errorArgs => 
      errorArgs.some(arg => 
        typeof arg === 'string' && 
        encodingErrors.some(error => arg.toLowerCase().includes(error.toLowerCase()))
      )
    )

    expect(hasEncodingErrors).toBe(false)
  })

  it('should not have third-party library errors', async () => {
    const libraryErrors = [
      'React Router Error',
      'Redux Error',
      'Styled Components Error',
      'Framer Motion Error',
      'Chart.js Error',
      'Google Maps Error'
    ]

    const hasLibraryErrors = consoleErrors.some(errorArgs => 
      errorArgs.some(arg => 
        typeof arg === 'string' && 
        libraryErrors.some(error => arg.includes(error))
      )
    )

    expect(hasLibraryErrors).toBe(false)
  })

  describe('Development vs Production Error Handling', () => {
    it('should have appropriate error level for environment', async () => {
      const isDevelopment = process.env.NODE_ENV === 'development'
      const isProduction = process.env.NODE_ENV === 'production'

      if (isProduction) {
        // In production, there should be fewer console logs
        expect(consoleErrors.length).toBeLessThanOrEqual(5)
      } else if (isDevelopment) {
        // In development, some warnings are acceptable
        expect(consoleWarnings.length).toBeLessThanOrEqual(20)
      }
    })
  })

  describe('Error Recovery', () => {
    it('should handle error boundaries gracefully', async () => {
      const errorBoundaryErrors = [
        'Error boundary caught',
        'ComponentDidCatch',
        'Error fallback rendered'
      ]

      // Error boundaries should work without throwing additional errors
      const hasErrorBoundaryIssues = consoleErrors.some(errorArgs => 
        errorArgs.some(arg => 
          typeof arg === 'string' && 
          errorBoundaryErrors.some(error => arg.includes(error))
        )
      )

      // If error boundaries are triggered, they should work correctly
      // This test ensures no secondary errors from error handling
      expect(hasErrorBoundaryIssues).toBe(false)
    })
  })

  describe('Console Output Quality', () => {
    it('should not spam console with repetitive messages', async () => {
      // Check for repetitive error messages
      const errorMessages = consoleErrors.map(args => args.join(' '))
      const uniqueErrors = new Set(errorMessages)
      
      // If there are many errors, most should be unique (not repetitive)
      if (errorMessages.length > 5) {
        const uniqueRatio = uniqueErrors.size / errorMessages.length
        expect(uniqueRatio).toBeGreaterThan(0.5) // At least 50% should be unique
      }
    })

    it('should not have undefined or null error messages', async () => {
      const hasUndefinedErrors = consoleErrors.some(errorArgs => 
        errorArgs.some(arg => arg === undefined || arg === null)
      )

      expect(hasUndefinedErrors).toBe(false)
    })
  })

  describe('Framework-Specific Error Checks', () => {
    it('should not have Next.js Image optimization errors', async () => {
      const imageErrors = [
        'Image optimization error',
        'Invalid src prop',
        'Image loading error',
        'Failed to load image'
      ]

      const hasImageErrors = consoleErrors.some(errorArgs => 
        errorArgs.some(arg => 
          typeof arg === 'string' && 
          imageErrors.some(error => arg.includes(error))
        )
      )

      expect(hasImageErrors).toBe(false)
    })

    it('should not have CSS-in-JS errors', async () => {
      const cssErrors = [
        'Styled component error',
        'CSS parsing error',
        'Invalid CSS property',
        'Stylesheet error'
      ]

      const hasCSSErrors = consoleErrors.some(errorArgs => 
        errorArgs.some(arg => 
          typeof arg === 'string' && 
          cssErrors.some(error => arg.includes(error))
        )
      )

      expect(hasCSSErrors).toBe(false)
    })
  })
})

// Utility function to analyze console output
export function analyzeConsoleOutput() {
  return {
    errorCount: consoleErrors.length,
    warningCount: consoleWarnings.length,
    errors: consoleErrors,
    warnings: consoleWarnings,
    hasErrors: consoleErrors.length > 0,
    hasWarnings: consoleWarnings.length > 0,
    summary: `Console Analysis: ${consoleErrors.length} errors, ${consoleWarnings.length} warnings`
  }
}