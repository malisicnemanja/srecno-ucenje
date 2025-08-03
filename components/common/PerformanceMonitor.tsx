'use client'

import { useEffect } from 'react'
import { 
  reportWebVitals, 
  initPerformanceObserver, 
  preloadCriticalResources,
  addResourceHints,
  setupLazyLoading,
  optimizeThirdPartyScripts
} from '@/lib/performance'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Initialize performance monitoring
    initPerformanceObserver()
    
    // Preload critical resources
    preloadCriticalResources()
    
    // Add resource hints for better performance
    addResourceHints()
    
    // Setup lazy loading for images
    setupLazyLoading()
    
    // Optimize third-party scripts
    optimizeThirdPartyScripts()
    
    // Report Web Vitals
    if ('web-vital' in window) {
      ;(window as any).addEventListener('web-vital', reportWebVitals)
    }
    
    return () => {
      if ('web-vital' in window) {
        ;(window as any).removeEventListener('web-vital', reportWebVitals)
      }
    }
  }, [])
  
  return null
}