/**
 * Mobile Utilities - Comprehensive mobile experience helpers
 * Optimized for educational platform with parent-focused mobile usage
 */

// Device Detection
export const DeviceDetection = {
  isAndroid: () => /Android/i.test(navigator.userAgent),
  isIOS: () => /iPad|iPhone|iPod/i.test(navigator.userAgent),
  isIPad: () => /iPad/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1),
  isMobile: () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isTablet: () => DeviceDetection.isIPad() || (/Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent)),
  isSafari: () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
  isChrome: () => /Chrome/i.test(navigator.userAgent) && !DeviceDetection.isEdge(),
  isEdge: () => /Edg/i.test(navigator.userAgent),
  getIOSVersion: () => {
    const match = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/)
    return match ? parseInt(match[1], 10) : null
  }
}

// Viewport Utilities
export const ViewportUtils = {
  // Get safe viewport height accounting for mobile browser bars
  getViewportHeight: () => {
    return window.visualViewport?.height || window.innerHeight
  },
  
  // Get actual viewport dimensions
  getViewportDimensions: () => ({
    width: window.visualViewport?.width || window.innerWidth,
    height: window.visualViewport?.height || window.innerHeight
  }),
  
  // Check if keyboard is likely open (iOS)
  isKeyboardOpen: () => {
    if (!DeviceDetection.isIOS()) return false
    const viewport = ViewportUtils.getViewportDimensions()
    const screenDimensions = { width: window.screen.width, height: window.screen.height }
    return viewport.height < screenDimensions.height * 0.75
  },
  
  // Set CSS viewport height variable
  setCSSViewportHeight: () => {
    const vh = ViewportUtils.getViewportHeight() * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  },
  
  // Handle viewport changes (orientation, keyboard, etc.)
  handleViewportChange: (callback?: () => void) => {
    const handler = () => {
      ViewportUtils.setCSSViewportHeight()
      callback?.()
    }
    
    // Use visual viewport API if available
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handler)
      return () => window.visualViewport!.removeEventListener('resize', handler)
    } else {
      window.addEventListener('resize', handler)
      window.addEventListener('orientationchange', () => setTimeout(handler, 100))
      return () => {
        window.removeEventListener('resize', handler)
        window.removeEventListener('orientationchange', handler)
      }
    }
  }
}

// Touch and Gesture Utilities
export const TouchUtils = {
  // Prevent iOS bounce scrolling on specific elements
  preventBounceScroll: (element: HTMLElement) => {
    let startY = 0
    
    const touchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY
    }
    
    const touchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY
      const scrollTop = element.scrollTop
      const scrollHeight = element.scrollHeight
      const height = element.clientHeight
      const atTop = scrollTop <= 0
      const atBottom = scrollTop >= scrollHeight - height
      
      if ((atTop && y > startY) || (atBottom && y < startY)) {
        e.preventDefault()
      }
    }
    
    element.addEventListener('touchstart', touchStart, { passive: true })
    element.addEventListener('touchmove', touchMove, { passive: false })
    
    return () => {
      element.removeEventListener('touchstart', touchStart)
      element.removeEventListener('touchmove', touchMove)
    }
  },
  
  // Optimize touch targets for minimum 44x44px
  optimizeTouchTargets: () => {
    const touchElements = document.querySelectorAll('button, a, input, [role="button"], [tabindex]')
    
    touchElements.forEach(element => {
      if (element instanceof HTMLElement) {
        const rect = element.getBoundingClientRect()
        const computedStyle = getComputedStyle(element)
        
        // Check if element is too small
        if (rect.width < 44 || rect.height < 44) {
          const paddingNeeded = Math.max(0, (44 - rect.height) / 2)
          element.style.paddingTop = `${paddingNeeded}px`
          element.style.paddingBottom = `${paddingNeeded}px`
          element.style.minHeight = '44px'
        }
      }
    })
  },
  
  // Add haptic feedback (iOS only)
  addHapticFeedback: (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('hapticFeedback' in navigator) {
      // Future API
      (navigator as any).hapticFeedback.vibrate?.(type)
    } else if ('vibrate' in navigator && DeviceDetection.isAndroid()) {
      // Android fallback
      const patterns = { light: 10, medium: 20, heavy: 50 }
      navigator.vibrate(patterns[type])
    }
  },
  
  // Prevent double tap zoom on specific elements
  preventDoubleTopZoom: (element: HTMLElement) => {
    let lastTap = 0
    
    const touchEnd = (e: TouchEvent) => {
      const currentTime = Date.now()
      if (currentTime - lastTap < 300) {
        e.preventDefault()
      }
      lastTap = currentTime
    }
    
    element.addEventListener('touchend', touchEnd, { passive: false })
    return () => element.removeEventListener('touchend', touchEnd)
  }
}

// Performance Utilities
export const PerformanceUtils = {
  // Debounce function for scroll/resize events
  debounce: <T extends (...args: any[]) => any>(func: T, wait: number): T => {
    let timeout: NodeJS.Timeout
    return ((...args: any[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }) as T
  },
  
  // Throttle function for frequent events
  throttle: <T extends (...args: any[]) => any>(func: T, limit: number): T => {
    let inThrottle: boolean
    return ((...args: any[]) => {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }) as T
  },
  
  // Optimize images for mobile
  optimizeImages: () => {
    const images = document.querySelectorAll('img[data-mobile-optimize]')
    
    images.forEach(img => {
      if (img instanceof HTMLImageElement) {
        // Add intersection observer for lazy loading
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const image = entry.target as HTMLImageElement
              if (image.dataset.src) {
                image.src = image.dataset.src
                image.removeAttribute('data-src')
                observer.unobserve(image)
              }
            }
          })
        }, { rootMargin: '50px' })
        
        observer.observe(img)
      }
    })
  },
  
  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },
  
  // Optimize CSS animations for mobile
  optimizeAnimations: () => {
    if (PerformanceUtils.prefersReducedMotion()) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms')
      document.documentElement.style.setProperty('--transition-duration', '0.01ms')
    } else {
      // Enable hardware acceleration for smooth animations
      const animatedElements = document.querySelectorAll('[data-animate]')
      animatedElements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.style.willChange = 'transform, opacity'
          element.style.backfaceVisibility = 'hidden'
          element.style.perspective = '1000px'
        }
      })
    }
  }
}

// Form Utilities for Mobile
export const FormUtils = {
  // Set appropriate input types for mobile keyboards
  optimizeInputs: () => {
    const inputs = document.querySelectorAll('input')
    
    inputs.forEach(input => {
      // Email inputs
      if (input.name?.includes('email') || input.placeholder?.includes('email')) {
        input.type = 'email'
        input.autocomplete = 'email'
        input.inputMode = 'email'
      }
      
      // Phone inputs
      if (input.name?.includes('phone') || input.name?.includes('tel')) {
        input.type = 'tel'
        input.autocomplete = 'tel'
        input.inputMode = 'tel'
      }
      
      // Number inputs
      if (input.name?.includes('number') || input.name?.includes('amount')) {
        input.inputMode = 'numeric'
      }
      
      // URL inputs
      if (input.name?.includes('url') || input.name?.includes('website')) {
        input.type = 'url'
        input.inputMode = 'url'
      }
    })
  },
  
  // Prevent iOS zoom on input focus
  preventInputZoom: () => {
    if (!DeviceDetection.isIOS()) return
    
    const inputs = document.querySelectorAll('input, textarea, select')
    
    inputs.forEach(input => {
      if (input instanceof HTMLElement) {
        const computedStyle = getComputedStyle(input)
        const fontSize = parseInt(computedStyle.fontSize, 10)
        
        if (fontSize < 16) {
          input.style.fontSize = '16px'
        }
      }
    })
  },
  
  // Handle keyboard appearance/disappearance
  handleMobileKeyboard: (onShow?: () => void, onHide?: () => void) => {
    if (!DeviceDetection.isMobile()) return
    
    let initialViewport = ViewportUtils.getViewportHeight()
    
    const checkKeyboard = () => {
      const currentViewport = ViewportUtils.getViewportHeight()
      const isKeyboardOpen = currentViewport < initialViewport * 0.75
      
      if (isKeyboardOpen && onShow) {
        onShow()
      } else if (!isKeyboardOpen && onHide) {
        onHide()
      }
    }
    
    const debouncedCheck = PerformanceUtils.debounce(checkKeyboard, 150)
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', debouncedCheck)
      return () => window.visualViewport!.removeEventListener('resize', debouncedCheck)
    } else {
      window.addEventListener('resize', debouncedCheck)
      return () => window.removeEventListener('resize', debouncedCheck)
    }
  }
}

// Scroll Utilities
export const ScrollUtils = {
  // Smooth scroll with mobile optimization
  smoothScrollTo: (target: HTMLElement | string, offset = 0) => {
    const element = typeof target === 'string' ? document.querySelector(target) as HTMLElement : target
    if (!element) return
    
    const rect = element.getBoundingClientRect()
    const scrollTop = window.pageYOffset + rect.top - offset
    
    if (PerformanceUtils.prefersReducedMotion()) {
      window.scrollTo(0, scrollTop)
    } else {
      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      })
    }
  },
  
  // Add scroll snap to containers
  addScrollSnap: (container: HTMLElement, type: 'x' | 'y' | 'both' = 'y') => {
    if (type === 'x' || type === 'both') {
      container.style.scrollSnapType = 'x mandatory'
      const children = Array.from(container.children) as HTMLElement[]
      children.forEach(child => {
        child.style.scrollSnapAlign = 'start'
      })
    }
    
    if (type === 'y' || type === 'both') {
      container.style.scrollSnapType = 'y mandatory'
      const children = Array.from(container.children) as HTMLElement[]
      children.forEach(child => {
        child.style.scrollSnapAlign = 'start'
      })
    }
  },
  
  // Enable momentum scrolling (iOS)
  enableMomentumScrolling: (element: HTMLElement) => {
    ;(element.style as any).webkitOverflowScrolling = 'touch'
    ;(element.style as any).overflowBehavior = 'contain'
  },
  
  // Lock body scroll (useful for modals)
  lockBodyScroll: () => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
    
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }
}

// PWA Utilities
export const PWAUtils = {
  // Check if app is installed
  isInstalled: () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any)?.standalone === true
  },
  
  // Check if PWA install is available
  canInstall: () => {
    return 'beforeinstallprompt' in window
  },
  
  // Handle install prompt
  handleInstallPrompt: () => {
    let deferredPrompt: any = null
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt = e
    })
    
    const install = async () => {
      if (!deferredPrompt) return false
      
      deferredPrompt.prompt()
      const result = await deferredPrompt.userChoice
      deferredPrompt = null
      
      return result.outcome === 'accepted'
    }
    
    return { install, canInstall: () => !!deferredPrompt }
  },
  
  // Register service worker
  registerServiceWorker: async (path = '/sw.js') => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(path)
        console.log('SW registered:', registration)
        return registration
      } catch (error) {
        console.error('SW registration failed:', error)
        return null
      }
    }
    return null
  },
  
  // Handle app update
  handleAppUpdate: (onUpdate?: () => void) => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        onUpdate?.()
      })
    }
  }
}

// Safe Area Utilities (iPhone X+ notches, etc.)
export const SafeAreaUtils = {
  // Get safe area insets
  getSafeAreaInsets: () => {
    const style = getComputedStyle(document.documentElement)
    return {
      top: parseInt(style.getPropertyValue('--safe-area-inset-top') || '0'),
      right: parseInt(style.getPropertyValue('--safe-area-inset-right') || '0'),
      bottom: parseInt(style.getPropertyValue('--safe-area-inset-bottom') || '0'),
      left: parseInt(style.getPropertyValue('--safe-area-inset-left') || '0')
    }
  },
  
  // Apply safe area padding
  applySafeAreaPadding: (element: HTMLElement, areas: ('top' | 'right' | 'bottom' | 'left')[]) => {
    areas.forEach(area => {
      element.style.paddingTop = areas.includes('top') ? 'env(safe-area-inset-top)' : element.style.paddingTop
      element.style.paddingRight = areas.includes('right') ? 'env(safe-area-inset-right)' : element.style.paddingRight
      element.style.paddingBottom = areas.includes('bottom') ? 'env(safe-area-inset-bottom)' : element.style.paddingBottom
      element.style.paddingLeft = areas.includes('left') ? 'env(safe-area-inset-left)' : element.style.paddingLeft
    })
  }
}

// Network Utilities
export const NetworkUtils = {
  // Get connection info
  getConnectionInfo: () => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    if (!connection) return null
    
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    }
  },
  
  // Check if on slow connection
  isSlowConnection: () => {
    const connection = NetworkUtils.getConnectionInfo()
    return connection?.effectiveType === 'slow-2g' || 
           connection?.effectiveType === '2g' ||
           connection?.saveData === true
  },
  
  // Optimize for slow connections
  optimizeForSlowConnection: () => {
    if (NetworkUtils.isSlowConnection()) {
      // Reduce image quality
      const images = document.querySelectorAll('img')
      images.forEach(img => {
        if (img.dataset.lowQuality) {
          img.src = img.dataset.lowQuality
        }
      })
      
      // Disable non-essential animations
      document.documentElement.style.setProperty('--animation-duration', '0.01ms')
    }
  }
}

// Complete mobile initialization
export const initializeMobileExperience = () => {
  // Basic setup
  ViewportUtils.setCSSViewportHeight()
  ViewportUtils.handleViewportChange()
  
  // Touch optimizations
  TouchUtils.optimizeTouchTargets()
  
  // Form optimizations
  FormUtils.optimizeInputs()
  FormUtils.preventInputZoom()
  
  // Performance optimizations
  PerformanceUtils.optimizeImages()
  PerformanceUtils.optimizeAnimations()
  
  // Network optimizations
  NetworkUtils.optimizeForSlowConnection()
  
  console.log('Mobile experience initialized')
}

// Export everything
const mobileUtils = {
  DeviceDetection,
  ViewportUtils,
  TouchUtils,
  PerformanceUtils,
  FormUtils,
  ScrollUtils,
  PWAUtils,
  SafeAreaUtils,
  NetworkUtils,
  initializeMobileExperience
}

export default mobileUtils