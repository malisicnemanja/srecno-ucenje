/**
 * SREĆNO UČENJE - ANIMATION UTILITIES
 * Performant animation utilities for educational platform
 * Focus on CPU efficiency and mobile optimization
 */

// Device detection for mobile optimization
export const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// Check for reduced motion preference
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Animation duration calculator (shorter on mobile)
export const getAnimationDuration = (baseDuration: number): number => {
  if (prefersReducedMotion()) return 0
  return isMobile() ? Math.min(baseDuration, 200) : baseDuration
}

// GPU acceleration helper
export const enableGPUAcceleration = (element: HTMLElement) => {
  element.style.transform = 'translate3d(0, 0, 0)'
  element.style.willChange = 'transform, opacity'
}

// Disable GPU acceleration after animation
export const disableGPUAcceleration = (element: HTMLElement) => {
  element.style.willChange = 'auto'
}

// Intersection Observer for scroll-triggered animations
export class ScrollTrigger {
  private observer: IntersectionObserver | null = null
  private elements: Map<Element, () => void> = new Map()

  constructor() {
    if (typeof window !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const callback = this.elements.get(entry.target)
              if (callback) {
                callback()
                this.unobserve(entry.target)
              }
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '-50px 0px -50px 0px'
        }
      )
    }
  }

  observe(element: Element, callback: () => void) {
    if (!this.observer) return
    
    this.elements.set(element, callback)
    this.observer.observe(element)
  }

  unobserve(element: Element) {
    if (!this.observer) return
    
    this.observer.unobserve(element)
    this.elements.delete(element)
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect()
      this.elements.clear()
    }
  }
}

// Singleton scroll trigger instance
export const scrollTrigger = new ScrollTrigger()

// Stagger animation helper
export const staggerChildren = (container: HTMLElement, animationClass: string, delay = 100) => {
  const children = container.children
  
  Array.from(children).forEach((child, index) => {
    const element = child as HTMLElement
    element.style.setProperty('--item-index', index.toString())
    element.style.animationDelay = `${index * delay}ms`
    element.classList.add(animationClass)
  })
}

// Touch feedback helper
export const addTouchFeedback = (element: HTMLElement) => {
  if (!isMobile()) return

  const handleTouchStart = () => {
    element.style.transform = 'scale(0.98)'
    element.style.transition = 'transform 100ms ease-out'
  }

  const handleTouchEnd = () => {
    element.style.transform = 'scale(1)'
    setTimeout(() => {
      element.style.transition = ''
    }, 100)
  }

  element.addEventListener('touchstart', handleTouchStart, { passive: true })
  element.addEventListener('touchend', handleTouchEnd, { passive: true })
  element.addEventListener('touchcancel', handleTouchEnd, { passive: true })

  return () => {
    element.removeEventListener('touchstart', handleTouchStart)
    element.removeEventListener('touchend', handleTouchEnd)
    element.removeEventListener('touchcancel', handleTouchEnd)
  }
}

// Confetti animation helper
export const createConfetti = (container: HTMLElement, options?: {
  count?: number
  colors?: string[]
  duration?: number
}) => {
  const {
    count = 50,
    colors = ['#8AF76D', '#83E6FF', '#FFEA8C', '#FF9B9B', '#D4A5F9'],
    duration = 3000
  } = options || {}

  const confettiElements: HTMLElement[] = []

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div')
    confetti.className = 'confetti-piece'
    confetti.style.cssText = `
      position: absolute;
      width: 8px;
      height: 8px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 2px;
      pointer-events: none;
      left: ${Math.random() * 100}%;
      animation: confettiFall ${duration}ms ease-out forwards;
      animation-delay: ${Math.random() * 1000}ms;
    `
    
    container.appendChild(confetti)
    confettiElements.push(confetti)
  }

  // Clean up after animation
  setTimeout(() => {
    confettiElements.forEach(el => el.remove())
  }, duration + 1000)
}

// Performance monitoring
export const measureAnimationPerformance = (name: string, fn: () => void) => {
  if (typeof performance === 'undefined') {
    fn()
    return
  }

  performance.mark(`${name}-start`)
  fn()
  
  requestAnimationFrame(() => {
    performance.mark(`${name}-end`)
    performance.measure(name, `${name}-start`, `${name}-end`)
    
    const measure = performance.getEntriesByName(name)[0]
    if (measure.duration > 16) {
      console.warn(`Animation '${name}' took ${measure.duration.toFixed(2)}ms (>16ms threshold)`)
    }
  })
}

// Animation queue for complex sequences
export class AnimationQueue {
  private queue: Array<() => Promise<void>> = []
  private isRunning = false

  add(animation: () => Promise<void>) {
    this.queue.push(animation)
    this.process()
  }

  private async process() {
    if (this.isRunning || this.queue.length === 0) return
    
    this.isRunning = true
    
    while (this.queue.length > 0) {
      const animation = this.queue.shift()
      if (animation) {
        await animation()
      }
    }
    
    this.isRunning = false
  }

  clear() {
    this.queue = []
    this.isRunning = false
  }
}

// Hero text reveal animation
export const animateHeroText = (element: HTMLElement) => {
  const words = element.textContent?.split(' ') || []
  element.innerHTML = ''
  
  words.forEach((word, index) => {
    const span = document.createElement('span')
    span.textContent = word + ' '
    span.className = 'hero-word'
    span.style.cssText = `
      display: inline-block;
      opacity: 0;
      transform: translateY(30px);
      animation: heroWordReveal 0.6s ease-out forwards;
      animation-delay: ${index * 100}ms;
    `
    element.appendChild(span)
  })
}

// Success celebration helper
export const celebrateSuccess = (element: HTMLElement) => {
  element.classList.add('animate-celebration')
  createConfetti(element.parentElement || document.body)
  
  setTimeout(() => {
    element.classList.remove('animate-celebration')
  }, 800)
}

// Quiz feedback animation
export const animateQuizFeedback = (element: HTMLElement, isCorrect: boolean) => {
  const animationClass = isCorrect ? 'animate-correct' : 'animate-incorrect'
  element.classList.add(animationClass)
  
  setTimeout(() => {
    element.classList.remove(animationClass)
  }, isCorrect ? 1000 : 500)
}

// Loading skeleton animation
export const createSkeletonLoader = (container: HTMLElement, lines = 3) => {
  container.innerHTML = ''
  container.className = 'skeleton-container'
  
  for (let i = 0; i < lines; i++) {
    const line = document.createElement('div')
    line.className = 'skeleton-line'
    line.style.cssText = `
      height: 16px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: skeletonLoading 1.5s infinite;
      border-radius: 4px;
      margin-bottom: 8px;
    `
    if (i === lines - 1) line.style.width = '60%'
    container.appendChild(line)
  }
}

// Export types
export interface AnimationOptions {
  duration?: number
  delay?: number
  easing?: string
  mobile?: boolean
}

export interface ScrollTriggerOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export interface ConfettiOptions {
  count?: number
  colors?: string[]
  duration?: number
}