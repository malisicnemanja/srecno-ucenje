// Analytics tracking utility for calculators and user interactions

interface AnalyticsEvent {
  category: string
  action: string
  label?: string
  value?: number
}

interface CalculatorEvent extends AnalyticsEvent {
  calculatorType: 'investment' | 'roi' | 'space'
  inputs?: Record<string, any>
  results?: Record<string, any>
}

// Track general events
export const trackEvent = ({ category, action, label, value }: AnalyticsEvent) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', { category, action, label, value })
  }
}

// Track calculator usage
export const trackCalculatorUse = (
  calculatorType: CalculatorEvent['calculatorType'],
  inputs: Record<string, any>
) => {
  trackEvent({
    category: 'Calculator',
    action: 'calculate',
    label: calculatorType,
  })

  // Track specific input ranges for segmentation
  if (calculatorType === 'investment' && inputs.squareMeters) {
    const sizeCategory = 
      inputs.squareMeters < 100 ? 'small' :
      inputs.squareMeters < 150 ? 'medium' : 'large'
    
    trackEvent({
      category: 'Calculator_Investment',
      action: 'space_size',
      label: sizeCategory,
    })
  }
}

// Track lead generation
export const trackLeadCapture = (
  calculatorType: CalculatorEvent['calculatorType'],
  leadScore: number
) => {
  trackEvent({
    category: 'Lead',
    action: 'capture',
    label: calculatorType,
    value: leadScore,
  })

  // Track lead quality
  const quality = 
    leadScore >= 80 ? 'hot' :
    leadScore >= 60 ? 'warm' : 'cold'
  
  trackEvent({
    category: 'Lead_Quality',
    action: quality,
    label: calculatorType,
  })
}

// Track PDF downloads
export const trackPDFDownload = (calculatorType: string) => {
  trackEvent({
    category: 'Download',
    action: 'pdf',
    label: `calculator_${calculatorType}`,
  })
}

// Track consultation requests
export const trackConsultationRequest = (source: string) => {
  trackEvent({
    category: 'Conversion',
    action: 'consultation_request',
    label: source,
  })
}

// Track page views with enhanced data
export const trackPageView = (pageName: string, additionalData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      ...additionalData,
    })
  }
}

// Track calculator completion rate
export const trackCalculatorCompletion = (
  calculatorType: string,
  timeSpentSeconds: number
) => {
  trackEvent({
    category: 'Calculator_Engagement',
    action: 'complete',
    label: calculatorType,
    value: timeSpentSeconds,
  })
}

// Track errors for monitoring
export const trackError = (errorType: string, errorMessage: string) => {
  trackEvent({
    category: 'Error',
    action: errorType,
    label: errorMessage,
  })
}

// Initialize GA4 (call this in _app.tsx or layout.tsx)
export const initializeAnalytics = () => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    // Add GA4 script
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`
    document.head.appendChild(script1)

    // Initialize gtag
    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
    `
    document.head.appendChild(script2)

    // Make gtag available globally
    ;(window as any).gtag = (window as any).gtag || function() {
      ((window as any).dataLayer = (window as any).dataLayer || []).push(arguments)
    }
  }
}

// Declare gtag on window object
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}