import { getComputedStyle } from '@/lib/utils'

export interface PDFTheme {
  colors: {
    primary: string
    secondary: string
    accent: string
    text: {
      primary: string
      secondary: string
      inverse: string
    }
    background: {
      primary: string
      secondary: string
      accent: string
    }
    border: string
    success: string
    warning: string
    error: string
  }
  fonts: {
    body: string
    heading: string
    mono: string
  }
  spacing: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
    '2xl': number
  }
  fontSize: {
    xs: number
    sm: number
    base: number
    lg: number
    xl: number
    '2xl': number
    '3xl': number
    '4xl': number
  }
  borderRadius: {
    sm: number
    md: number
    lg: number
    xl: number
    full: number
  }
  shadows: {
    sm: string
    md: string
    lg: string
    xl: string
  }
}

// Function to extract CSS variable value
function getCSSVariable(varName: string): string {
  if (typeof window === 'undefined') return ''
  const root = document.documentElement
  const styles = getComputedStyle(root)
  return styles.getPropertyValue(varName).trim()
}

// Function to extract RGB values from CSS color
function extractRGB(cssVar: string): string {
  const rgb = getCSSVariable(cssVar)
  if (!rgb) return '0 0 0'
  return rgb
}

// Function to create RGB color string
function rgb(cssVar: string): string {
  const values = extractRGB(cssVar)
  return `rgb(${values.replace(/\s/g, ', ')})`
}

// Get the current theme from CSS variables
export function getPDFTheme(): PDFTheme {
  // Default theme for SSR or when CSS variables are not available
  const defaultTheme: PDFTheme = {
    colors: {
      primary: '#10b981', // green-500
      secondary: '#3b82f6', // blue-500
      accent: '#f59e0b', // amber-500
      text: {
        primary: '#111827', // gray-900
        secondary: '#6b7280', // gray-500
        inverse: '#ffffff',
      },
      background: {
        primary: '#ffffff',
        secondary: '#f9fafb', // gray-50
        accent: '#f3f4f6', // gray-100
      },
      border: '#e5e7eb', // gray-200
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
    fonts: {
      body: 'Inter, sans-serif',
      heading: 'Inter, sans-serif',
      mono: 'Consolas, monospace',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      '2xl': 48,
    },
    fontSize: {
      xs: 10,
      sm: 12,
      base: 14,
      lg: 16,
      xl: 18,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    borderRadius: {
      sm: 2,
      md: 4,
      lg: 8,
      xl: 12,
      full: 9999,
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
  }

  // If running on server, return default theme
  if (typeof window === 'undefined') {
    return defaultTheme
  }

  // Try to extract theme from CSS variables
  try {
    return {
      colors: {
        primary: rgb('--primary') || defaultTheme.colors.primary,
        secondary: rgb('--secondary') || defaultTheme.colors.secondary,
        accent: rgb('--accent') || defaultTheme.colors.accent,
        text: {
          primary: rgb('--foreground') || defaultTheme.colors.text.primary,
          secondary: rgb('--muted-foreground') || defaultTheme.colors.text.secondary,
          inverse: '#ffffff',
        },
        background: {
          primary: rgb('--background') || defaultTheme.colors.background.primary,
          secondary: rgb('--muted') || defaultTheme.colors.background.secondary,
          accent: rgb('--accent') || defaultTheme.colors.background.accent,
        },
        border: rgb('--border') || defaultTheme.colors.border,
        success: rgb('--success') || defaultTheme.colors.success,
        warning: rgb('--warning') || defaultTheme.colors.warning,
        error: rgb('--destructive') || defaultTheme.colors.error,
      },
      fonts: {
        body: getCSSVariable('--font-sans') || defaultTheme.fonts.body,
        heading: getCSSVariable('--font-sans') || defaultTheme.fonts.heading,
        mono: getCSSVariable('--font-mono') || defaultTheme.fonts.mono,
      },
      spacing: defaultTheme.spacing,
      fontSize: defaultTheme.fontSize,
      borderRadius: defaultTheme.borderRadius,
      shadows: defaultTheme.shadows,
    }
  } catch (error) {
    console.warn('Failed to extract theme from CSS variables:', error)
    return defaultTheme
  }
}

// Export a function to sync theme changes
export function syncPDFTheme(callback: (theme: PDFTheme) => void) {
  if (typeof window === 'undefined') return

  // Initial sync
  callback(getPDFTheme())

  // Watch for theme changes
  const observer = new MutationObserver(() => {
    callback(getPDFTheme())
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'style'],
  })

  return () => observer.disconnect()
}