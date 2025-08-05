'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { scrollTrigger, prefersReducedMotion, isMobile, getAnimationDuration } from '@/lib/animation-utils'

interface ScrollTriggerProps {
  children: ReactNode
  animation?: string
  delay?: number
  threshold?: number
  rootMargin?: string
  once?: boolean
  className?: string
  onEnter?: () => void
  onExit?: () => void
  disabled?: boolean
}

export default function ScrollTrigger({
  children,
  animation = 'animate-fade-in',
  delay = 0,
  threshold = 0.1,
  rootMargin = '-50px 0px -50px 0px',
  once = true,
  className = '',
  onEnter,
  onExit,
  disabled = false
}: ScrollTriggerProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element || disabled || prefersReducedMotion()) return

    // Mobile optimization: reduce animation complexity
    const mobileClass = isMobile() ? 'mobile-optimized' : ''
    const animationDuration = getAnimationDuration(300)

    // Apply animation duration for mobile
    if (isMobile()) {
      element.style.setProperty('--animation-duration', `${animationDuration}ms`)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger enter animation
            setTimeout(() => {
              element.classList.add(animation, mobileClass)
              onEnter?.()
            }, delay)

            if (once) {
              hasTriggered.current = true
              observer.unobserve(element)
            }
          } else if (!once && hasTriggered.current) {
            // Trigger exit animation
            element.classList.remove(animation, mobileClass)
            onExit?.()
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [animation, delay, threshold, rootMargin, once, onEnter, onExit, disabled])

  return (
    <div 
      ref={elementRef} 
      className={`scroll-trigger ${className}`}
      style={{
        opacity: prefersReducedMotion() ? 1 : 0
      }}
    >
      {children}
    </div>
  )
}

// Specialized components for common use cases
export function FadeInOnScroll({ 
  children, 
  delay = 0, 
  className = '' 
}: { 
  children: ReactNode
  delay?: number
  className?: string 
}) {
  return (
    <ScrollTrigger 
      animation="animate-fade-in" 
      delay={delay}
      className={className}
    >
      {children}
    </ScrollTrigger>
  )
}

export function SlideUpOnScroll({ 
  children, 
  delay = 0, 
  className = '' 
}: { 
  children: ReactNode
  delay?: number
  className?: string 
}) {
  return (
    <ScrollTrigger 
      animation="animate-slide-up" 
      delay={delay}
      className={className}
    >
      {children}
    </ScrollTrigger>
  )
}

export function ScaleInOnScroll({ 
  children, 
  delay = 0, 
  className = '' 
}: { 
  children: ReactNode
  delay?: number
  className?: string 
}) {
  return (
    <ScrollTrigger 
      animation="animate-scale-in" 
      delay={delay}
      className={className}
    >
      {children}
    </ScrollTrigger>
  )
}

// Staggered list animation
export function StaggeredList({ 
  children, 
  staggerDelay = 100,
  animation = 'animate-slide-up',
  className = '' 
}: { 
  children: ReactNode[]
  staggerDelay?: number
  animation?: string
  className?: string 
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || prefersReducedMotion()) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = container.children
            Array.from(children).forEach((child, index) => {
              const element = child as HTMLElement
              setTimeout(() => {
                element.classList.add(animation)
              }, index * staggerDelay)
            })
            observer.unobserve(container)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [staggerDelay, animation])

  return (
    <div ref={containerRef} className={`staggered-container ${className}`}>
      {children.map((child, index) => (
        <div 
          key={index}
          className="stagger-item"
          style={{ 
            opacity: prefersReducedMotion() ? 1 : 0,
            transform: prefersReducedMotion() ? 'none' : 'translateY(20px)'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

// Performance optimized scroll trigger hook
export function useScrollTrigger(
  options: {
    threshold?: number
    rootMargin?: string
    once?: boolean
  } = {}
) {
  const elementRef = useRef<HTMLElement>(null)
  const isVisible = useRef(false)
  const callbackRef = useRef<() => void>()

  const { threshold = 0.1, rootMargin = '0px', once = true } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible.current) {
            isVisible.current = true
            callbackRef.current?.()
            
            if (once) {
              observer.unobserve(element)
            }
          } else if (!entry.isIntersecting && !once) {
            isVisible.current = false
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  const setCallback = (callback: () => void) => {
    callbackRef.current = callback
  }

  return { elementRef, isVisible: isVisible.current, setCallback }
}