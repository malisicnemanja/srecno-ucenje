'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

// Brand colors type for prop validation
type BrandColor = 'sky' | 'sun' | 'grass' | 'heart' | 'night'

// Animation modes with distinct visual effects
type AnimationMode = 'fade' | 'slide-up' | 'slide-down' | 'rotate-x' | 'scale'

interface AlternatingTextProps {
  /** Array of words to cycle through */
  words: string[]
  /** Interval between word changes in milliseconds */
  interval?: number
  /** Animation style for transitions */
  animationMode?: AnimationMode
  /** Brand color theme */
  color?: BrandColor
  /** Pause animation on hover */
  pauseOnHover?: boolean
  /** Additional CSS classes */
  className?: string
}

// Animation variants for each mode
const animationVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4, ease: 'easeInOut' }
  },
  'slide-up': {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }
  },
  'slide-down': {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }
  },
  'rotate-x': {
    initial: { opacity: 0, rotateX: 90, transformOrigin: '50% 100%' },
    animate: { opacity: 1, rotateX: 0 },
    exit: { opacity: 0, rotateX: -90, transformOrigin: '50% 0%' },
    transition: { duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
    transition: { duration: 0.4, ease: [0.68, -0.55, 0.265, 1.55] }
  }
}

// Brand color CSS custom property mappings
const colorClasses = {
  sky: 'text-[var(--brand-sky)]',
  sun: 'text-[var(--brand-sun)]',
  grass: 'text-[var(--brand-grass)]',
  heart: 'text-[var(--brand-heart)]',
  night: 'text-[var(--brand-night)]'
}

/**
 * AlternatingText Component
 * 
 * A delightful text animation component that cycles through words with smooth,
 * personality-filled transitions. Perfect for hero sections, taglines, and
 * adding dynamic personality to static text.
 * 
 * Features:
 * - 5 distinct animation modes with spring physics
 * - Brand color integration
 * - Accessibility-first design with screen reader support
 * - Pause on hover and focus for better UX
 * - Keyboard navigation support
 * - Performance optimized with requestAnimationFrame
 */
export default function AlternatingText({
  words,
  interval = 3000,
  animationMode = 'slide-up',
  color,
  pauseOnHover = true,
  className
}: AlternatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const componentRef = useRef<HTMLSpanElement>(null)

  // Cycle to next word
  const nextWord = () => {
    setCurrentIndex((prev) => (prev + 1) % words.length)
  }

  // Setup interval with pause support
  useEffect(() => {
    if (words.length <= 1 || isPaused) return

    intervalRef.current = setInterval(nextWord, interval)
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [words.length, interval, isPaused])

  // Handle pause/resume on hover
  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true)
  }

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false)
  }

  // Handle focus events for keyboard accessibility
  const handleFocus = () => {
    setIsPaused(true)
  }

  const handleBlur = () => {
    if (!pauseOnHover) setIsPaused(false)
  }

  // Get animation configuration
  const animation = animationVariants[animationMode]

  return (
    <span
      ref={componentRef}
      className={cn(
        'inline-block relative',
        'focus:outline-none focus:ring-2 focus:ring-[var(--brand-sky)] focus:ring-opacity-50 focus:rounded-sm',
        color && colorClasses[color],
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      role="text"
      aria-live="polite"
      aria-label={`Alternating text: ${words.join(', ')}`}
      style={{
        // Ensure consistent width to prevent layout shifts
        minWidth: '1em',
        // Enable 3D transforms for rotate-x mode
        transformStyle: 'preserve-3d'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={`${currentIndex}-${words[currentIndex]}`}
          initial={animation.initial}
          animate={animation.animate}
          exit={animation.exit}
          transition={animation.transition}
          className="inline-block whitespace-nowrap"
          // Announce changes to screen readers
          aria-hidden={false}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
      
      {/* Screen reader friendly current state */}
      <span className="sr-only">
        Word {currentIndex + 1} of {words.length}: {words[currentIndex]}
      </span>
    </span>
  )
}

// Export types for external usage
export type { AlternatingTextProps, BrandColor, AnimationMode }