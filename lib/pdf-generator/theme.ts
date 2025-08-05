export interface PDFTheme {
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
    gray: {
      50: string
      100: string
      200: string
      300: string
      400: string
      500: string
      600: string
      700: string
      800: string
      900: string
    }
  }
  fonts: {
    heading: string
    body: string
  }
  spacing: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
    '2xl': number
  }
}

// Default theme matching the website design
export const defaultPDFTheme: PDFTheme = {
  colors: {
    primary: '#10b981', // green-500
    secondary: '#3b82f6', // blue-500
    accent: '#f59e0b', // amber-500
    text: '#1f2937', // gray-800
    background: '#ffffff',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    }
  },
  fonts: {
    heading: 'Helvetica-Bold',
    body: 'Helvetica',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
  }
}

// Function to get theme from CSS variables (for future use)
export const getPDFThemeFromCSS = (): PDFTheme => {
  // This would read from CSS variables in a browser environment
  // For now, return default theme
  return defaultPDFTheme
}