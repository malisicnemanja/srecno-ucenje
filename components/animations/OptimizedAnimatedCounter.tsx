'use client'

import { useEffect, useRef, useState } from 'react'
import { scrollTrigger, prefersReducedMotion, isMobile, getAnimationDuration } from '@/lib/animation-utils'

interface OptimizedAnimatedCounterProps {
  end: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
  thousandsSeparator?: string
  decimalSeparator?: string
  startOnView?: boolean
  delay?: number
}

export default function OptimizedAnimatedCounter({
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  thousandsSeparator = '.',
  decimalSeparator = ',',
  startOnView = true,
  delay = 0
}: OptimizedAnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(!startOnView)
  const elementRef = useRef<HTMLSpanElement>(null)
  const animationRef = useRef<number>()

  // Format number according to Serbian standards
  const formatNumber = (num: number): string => {
    const parts = num.toFixed(decimals).split('.')
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)
    const decimalPart = parts[1]
    
    return decimalPart 
      ? `${integerPart}${decimalSeparator}${decimalPart}`
      : integerPart
  }

  // Optimized animation function using requestAnimationFrame
  const animateCounter = () => {
    if (prefersReducedMotion()) {
      setCount(end)
      return
    }

    const actualDuration = getAnimationDuration(duration)
    const startTime = performance.now()
    const startValue = 0

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / actualDuration, 1)

      // Easing function for natural feel
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (end - startValue) * easeOutQuart

      setCount(currentValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  // Set up intersection observer
  useEffect(() => {
    if (!startOnView) {
      const timer = setTimeout(() => {
        animateCounter()
      }, delay)
      return () => clearTimeout(timer)
    }

    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
            setTimeout(() => {
              animateCounter()
            }, delay)
            observer.unobserve(element)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px'
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [startOnView, delay, isVisible, animateCounter])

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <span
      ref={elementRef}
      className={`
        animated-counter font-semibold tabular-nums transition-opacity duration-300
        ${isVisible ? 'opacity-100 animate-slide-up' : 'opacity-0'}
        ${className}
      `}
      style={{
        willChange: 'contents',
        transform: 'translate3d(0, 0, 0)' // GPU acceleration
      }}
    >
      {prefix}{formatNumber(count)}{suffix}
    </span>
  )
}

// Hook for using animated counters programmatically
export function useOptimizedAnimatedCounter(
  end: number,
  options?: {
    duration?: number
    decimals?: number
    autoStart?: boolean
    delay?: number
  }
) {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const animationRef = useRef<number>()
  
  const { 
    duration = 2000, 
    decimals = 0, 
    autoStart = false,
    delay = 0 
  } = options || {}

  const startAnimation = () => {
    if (isAnimating || prefersReducedMotion()) {
      setCount(end)
      return
    }

    setIsAnimating(true)
    const actualDuration = getAnimationDuration(duration)
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / actualDuration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = easeOutQuart * end

      setCount(currentValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setCount(end)
        setIsAnimating(false)
      }
    }

    const timer = setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timer)
  }

  const resetCounter = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    setCount(0)
    setIsAnimating(false)
  }

  useEffect(() => {
    if (autoStart) {
      startAnimation()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [autoStart, end, startAnimation])

  return {
    count: count.toFixed(decimals),
    isAnimating,
    startAnimation,
    resetCounter
  }
}

// Specialized counter components
export function StatCounter({ 
  value, 
  label, 
  className = '',
  icon,
  delay = 0 
}: {
  value: number
  label: string
  className?: string
  icon?: React.ReactNode
  delay?: number
}) {
  return (
    <div className={`stat-counter text-center ${className}`}>
      {icon && (
        <div className="stat-icon mb-2 text-2xl text-primary-600">
          {icon}
        </div>
      )}
      <div className="stat-value text-3xl font-bold text-gray-900 mb-1">
        <OptimizedAnimatedCounter 
          end={value}
          duration={2000}
          delay={delay}
        />
      </div>
      <div className="stat-label text-sm text-gray-600 uppercase tracking-wide">
        {label}
      </div>
    </div>
  )
}

export function PercentageCounter({ 
  percentage, 
  className = '',
  size = 'md',
  delay = 0 
}: {
  percentage: number
  className?: string
  size?: 'sm' | 'md' | 'lg'
  delay?: number
}) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  }

  return (
    <div className={`percentage-counter ${className}`}>
      <span className={`font-bold text-primary-600 ${sizeClasses[size]}`}>
        <OptimizedAnimatedCounter 
          end={percentage}
          suffix="%"
          duration={1500}
          delay={delay}
        />
      </span>
    </div>
  )
}

export function CurrencyCounter({ 
  amount, 
  currency = 'RSD',
  className = '',
  delay = 0 
}: {
  amount: number
  currency?: string
  className?: string
  delay?: number
}) {
  const formatCurrency = (curr: string) => {
    switch (curr) {
      case 'RSD':
        return 'RSD'
      case 'EUR':
        return '€'
      case 'USD':
        return '$'
      default:
        return curr
    }
  }

  return (
    <div className={`currency-counter ${className}`}>
      <span className="text-2xl font-bold text-green-600">
        <OptimizedAnimatedCounter 
          end={amount}
          suffix={` ${formatCurrency(currency)}`}
          duration={2500}
          thousandsSeparator="."
          delay={delay}
        />
      </span>
    </div>
  )
}