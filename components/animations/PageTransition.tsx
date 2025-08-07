'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

export interface PageTransitionProps {
  children: ReactNode
  className?: string
  transitionType?: 'fade' | 'slide' | 'scale' | 'slideUp' | 'slideDown'
  duration?: number
  delay?: number
}

// Transition variants for different animation types
const transitionVariants: Record<string, Variants> = {
  fade: {
    initial: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slide: {
    initial: { opacity: 0, x: 100 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    enter: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 }
  }
}

// Loading overlay component
const LoadingOverlay = () => (
  <motion.div
    className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <motion.div
          className="w-12 h-12 border-4 border-primary/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-primary rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <motion.p
        className="text-sm text-gray-600 font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Učitavam...
      </motion.p>
    </div>
  </motion.div>
)

export const PageTransition = ({
  children,
  className = '',
  transitionType = 'fade',
  duration = 0.3,
  delay = 0
}: PageTransitionProps) => {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  
  // Respect user's motion preferences
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  const variants = transitionVariants[transitionType]
  
  const transition = {
    duration: prefersReducedMotion ? 0.1 : duration,
    delay: prefersReducedMotion ? 0 : delay,
    ease: [0.25, 0.25, 0.25, 1] // Smooth easing
  }

  // Handle route change loading
  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => {
      setTimeout(() => setIsLoading(false), 100)
    }

    // Simulate route change events (in a real app, you'd listen to Next.js router events)
    handleStart()
    const timer = setTimeout(handleComplete, 300)
    
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingOverlay key="loading" />}
      </AnimatePresence>
      
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          className={className}
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={transition}
          style={{ 
            willChange: 'opacity, transform',
            transform: 'translate3d(0, 0, 0)' // Force GPU acceleration
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

// Route-specific transition wrapper
export const RouteTransition = ({ 
  children, 
  className = '',
  ...props 
}: PageTransitionProps) => {
  const pathname = usePathname()
  
  // Different transitions for different page types
  const getTransitionType = (path: string) => {
    if (path.includes('/kviz')) return 'scale'
    if (path.includes('/kalkulator')) return 'slideUp'
    if (path.includes('/kontakt')) return 'slide'
    return 'fade'
  }

  return (
    <PageTransition
      transitionType={getTransitionType(pathname)}
      className={`min-h-screen ${className}`}
      {...props}
    >
      {children}
    </PageTransition>
  )
}

// Hook for programmatic page transitions
export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const startTransition = () => setIsTransitioning(true)
  const endTransition = () => setIsTransitioning(false)
  
  return {
    isTransitioning,
    startTransition,
    endTransition
  }
}

export default PageTransition