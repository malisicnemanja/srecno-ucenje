'use client'

import { useEffect } from 'react'
import { 
  initializeMobileExperience, 
  DeviceDetection, 
  ViewportUtils, 
  TouchUtils, 
  FormUtils, 
  ScrollUtils, 
  NetworkUtils 
} from '@/lib/mobile-utils'

// Mobile-specific performance optimizations
export default function MobileOptimizations() {
  useEffect(() => {
    // Initialize comprehensive mobile experience
    initializeMobileExperience()
    
    // Enhanced viewport handling with safe areas
    const viewport = document.querySelector('meta[name=viewport]')
    const viewportContent = DeviceDetection.isIOS() 
      ? 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover'
      : 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes'
      
    if (viewport) {
      viewport.setAttribute('content', viewportContent)
    } else {
      const newViewport = document.createElement('meta')
      newViewport.name = 'viewport'
      newViewport.content = viewportContent
      document.head.appendChild(newViewport)
    }

    // Enhanced touch events optimization
    const optimizeTouchEvents = () => {
      // Use the utility function for consistent touch targets
      TouchUtils.optimizeTouchTargets()
      
      // Add touch feedback for better mobile UX
      document.querySelectorAll('button, [role="button"], a[href]').forEach(el => {
        if (el instanceof HTMLElement) {
          el.addEventListener('touchstart', () => {
            el.style.transform = 'scale(0.98)'
          }, { passive: true })
          
          el.addEventListener('touchend', () => {
            setTimeout(() => {
              el.style.transform = 'scale(1)'
            }, 100)
          }, { passive: true })
          
          el.addEventListener('touchcancel', () => {
            el.style.transform = 'scale(1)'
          }, { passive: true })
        }
      })
    }

    // Enhanced scroll performance
    const optimizeScrolling = () => {
      // Enable momentum scrolling for iOS
      ScrollUtils.enableMomentumScrolling(document.body)
      
      // Prevent overscroll effects on body
      document.body.style.overscrollBehavior = 'none'
      
      // Optimize all scroll containers
      document.querySelectorAll('.overflow-y-auto, .overflow-x-auto, .overflow-auto, [data-scroll]').forEach(el => {
        if (el instanceof HTMLElement) {
          ScrollUtils.enableMomentumScrolling(el)
        }
      })
      
      // Add scroll snap to carousel-like containers
      document.querySelectorAll('[data-scroll-snap]').forEach(el => {
        if (el instanceof HTMLElement) {
          const type = el.dataset.scrollSnap as 'x' | 'y' | 'both' || 'x'
          ScrollUtils.addScrollSnap(el, type)
        }
      })
    }

    // Optimize animations for mobile
    const optimizeAnimations = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
      
      if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition-fast', '0ms')
        document.documentElement.style.setProperty('--transition-base', '0ms')
        document.documentElement.style.setProperty('--transition-slow', '0ms')
        document.documentElement.style.setProperty('--transition-spring', '0ms')
      }

      // Listen for changes
      prefersReducedMotion.addEventListener('change', (e) => {
        if (e.matches) {
          document.documentElement.style.setProperty('--transition-fast', '0ms')
          document.documentElement.style.setProperty('--transition-base', '0ms')
          document.documentElement.style.setProperty('--transition-slow', '0ms')
          document.documentElement.style.setProperty('--transition-spring', '0ms')
        } else {
          document.documentElement.style.setProperty('--transition-fast', '150ms')
          document.documentElement.style.setProperty('--transition-base', '250ms')
          document.documentElement.style.setProperty('--transition-slow', '350ms')
          document.documentElement.style.setProperty('--transition-spring', '500ms')
        }
      })
    }

    // Enhanced font rendering for mobile
    const optimizeFonts = () => {
      document.documentElement.style.textRendering = DeviceDetection.isAndroid() ? 'optimizeSpeed' : 'optimizeLegibility'
      document.documentElement.style.webkitFontSmoothing = 'antialiased'
      document.documentElement.style.mozOsxFontSmoothing = 'grayscale'
      
      // Prevent font size adjustment on orientation change
      document.documentElement.style.webkitTextSizeAdjust = '100%'
      document.documentElement.style.textSizeAdjust = '100%'
    }

    // Enhanced orientation change handling
    const handleOrientationChange = () => {
      // Use mobile utils for better viewport handling
      setTimeout(() => {
        ViewportUtils.setCSSViewportHeight()
        // Recalculate touch targets after orientation change
        TouchUtils.optimizeTouchTargets()
      }, 200) // Increased timeout for better stability
    }

    // Enhanced viewport height with visual viewport support
    const setViewportHeight = () => {
      ViewportUtils.setCSSViewportHeight()
      
      // Handle keyboard appearance on mobile
      if (DeviceDetection.isMobile()) {
        const isKeyboardOpen = ViewportUtils.isKeyboardOpen()
        document.documentElement.classList.toggle('keyboard-open', isKeyboardOpen)
      }
    }

    // Device-specific optimizations
    const addDeviceSpecificOptimizations = () => {
      // iOS specific optimizations
      if (DeviceDetection.isIOS()) {
        // Handle safe areas
        document.documentElement.classList.add('ios')
        
        // Prevent rubber band scrolling on iOS
        document.addEventListener('touchmove', (e) => {
          if (e.target === document.body) {
            e.preventDefault()
          }
        }, { passive: false })
      }
      
      // Android specific optimizations
      if (DeviceDetection.isAndroid()) {
        document.documentElement.classList.add('android')
        
        // Handle Android Chrome address bar
        const handleAndroidViewport = () => {
          ViewportUtils.setCSSViewportHeight()
        }
        
        window.addEventListener('resize', handleAndroidViewport)
        return () => window.removeEventListener('resize', handleAndroidViewport)
      }
    }
    
    // Network-aware optimizations
    const optimizeForNetwork = () => {
      if (NetworkUtils.isSlowConnection()) {
        document.documentElement.classList.add('slow-connection')
        NetworkUtils.optimizeForSlowConnection()
      }
    }

    // Initialize all optimizations
    optimizeTouchEvents()
    optimizeScrolling()
    optimizeAnimations()
    optimizeFonts()
    setViewportHeight()
    addDeviceSpecificOptimizations()
    optimizeForNetwork()

    // Enhanced event listeners with cleanup
    const cleanupViewport = ViewportUtils.handleViewportChange(setViewportHeight)
    window.addEventListener('orientationchange', handleOrientationChange)
    
    // Handle network changes
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      connection?.addEventListener('change', optimizeForNetwork)
    }
    
    // Handle visibility changes for performance
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause non-essential animations when page is hidden
        document.documentElement.classList.add('page-hidden')
      } else {
        document.documentElement.classList.remove('page-hidden')
        // Re-optimize when page becomes visible
        TouchUtils.optimizeTouchTargets()
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Enhanced cleanup
    return () => {
      cleanupViewport?.()
      window.removeEventListener('orientationchange', handleOrientationChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        connection?.removeEventListener('change', optimizeForNetwork)
      }
    }
  }, [])

  return null // This component doesn't render anything
}