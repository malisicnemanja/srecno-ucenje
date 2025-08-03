// Web Vitals tracking
export function reportWebVitals(metric: any) {
  if (metric.label === 'web-vital') {
    // Send to analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      })
    }
  }
}

// Performance observer for monitoring
export function initPerformanceObserver() {
  if (typeof window === 'undefined') return

  // Observe Largest Contentful Paint
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1] as any
      console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime)
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
  } catch (e) {
    console.log('LCP observer not supported')
  }

  // Observe First Input Delay
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        console.log('FID:', entry.processingStart - entry.startTime)
      })
    })
    fidObserver.observe({ entryTypes: ['first-input'] })
  } catch (e) {
    console.log('FID observer not supported')
  }

  // Observe Cumulative Layout Shift
  try {
    let clsValue = 0
    let clsEntries: any[] = []

    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          if (clsEntries.length === 0) {
            clsValue = entry.value
            clsEntries = [entry]
          } else {
            const firstSessionEntry = clsEntries[0]
            const lastSessionEntry = clsEntries[clsEntries.length - 1]

            if (
              entry.startTime - lastSessionEntry.startTime < 1000 &&
              entry.startTime - firstSessionEntry.startTime < 5000
            ) {
              clsValue += entry.value
              clsEntries.push(entry)
            } else {
              clsValue = entry.value
              clsEntries = [entry]
            }
          }

          console.log('CLS:', clsValue)
        }
      }
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })
  } catch (e) {
    console.log('CLS observer not supported')
  }
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof document === 'undefined') return

  // Preload fonts
  const fonts = [
    '/fonts/inter-var.woff2',
  ]

  fonts.forEach((font) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.href = font
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })

  // Preconnect to external domains
  const domains = [
    'https://cdn.sanity.io',
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com',
  ]

  domains.forEach((domain) => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = domain
    document.head.appendChild(link)
  })
}

// Resource hints for better performance
export function addResourceHints() {
  if (typeof document === 'undefined') return

  // DNS prefetch for external resources
  const dnsPrefetchDomains = [
    'cdn.sanity.io',
    'www.google-analytics.com',
    'fonts.googleapis.com',
  ]

  dnsPrefetchDomains.forEach((domain) => {
    const link = document.createElement('link')
    link.rel = 'dns-prefetch'
    link.href = `//${domain}`
    document.head.appendChild(link)
  })

  // Prefetch next likely navigation
  const prefetchPaths = [
    '/metodologija',
    '/fransiza-modeli',
    '/zakazivanje',
  ]

  prefetchPaths.forEach((path) => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = path
    document.head.appendChild(link)
  })
}

// Lazy load images with native loading attribute
export function setupLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[data-lazy]')
    images.forEach((img) => {
      img.setAttribute('loading', 'lazy')
    })
  } else {
    // Fallback to Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || ''
          img.removeAttribute('data-src')
          observer.unobserve(img)
        }
      })
    })

    const images = document.querySelectorAll('img[data-src]')
    images.forEach((img) => imageObserver.observe(img))
  }
}

// Optimize third-party scripts
export function optimizeThirdPartyScripts() {
  // Load non-critical scripts after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      // Load analytics, chat widgets, etc.
      loadScript('https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX')
    }, 2000)
  })
}

function loadScript(src: string) {
  const script = document.createElement('script')
  script.src = src
  script.async = true
  document.body.appendChild(script)
}