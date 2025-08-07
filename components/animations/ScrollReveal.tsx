'use client'

import { motion, useInView, useAnimation, Variants } from 'framer-motion'
import { useRef, useEffect, ReactNode } from 'react'

export interface ScrollRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'
  delay?: number
  duration?: number
  distance?: number
  threshold?: number
  triggerOnce?: boolean
  className?: string
  stagger?: number
  cascade?: boolean
}

// Animation variants for different reveal types
const revealVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  down: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  },
  left: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  right: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }
}

export const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  stagger = 0,
  cascade = false
}: ScrollRevealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    threshold,
    once: triggerOnce,
    margin: '-50px'
  })
  const controls = useAnimation()

  // Respect user's motion preferences
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else if (!triggerOnce) {
      controls.start('hidden')
    }
  }, [isInView, controls, triggerOnce])

  // Custom variants with distance control
  const customVariants: Variants = {
    hidden: {
      opacity: 0,
      ...(direction === 'up' && { y: distance }),
      ...(direction === 'down' && { y: -distance }),
      ...(direction === 'left' && { x: -distance }),
      ...(direction === 'right' && { x: distance }),
      ...(direction === 'scale' && { scale: 0.8 })
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.25, 0.25, 0.25, 1]
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={customVariants}
      initial="hidden"
      animate={controls}
      style={{ 
        willChange: 'opacity, transform',
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      {children}
    </motion.div>
  )
}

// Staggered list animation component
export const StaggeredReveal = ({
  children,
  staggerDelay = 0.1,
  className = '',
  ...props
}: ScrollRevealProps & { staggerDelay?: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    threshold: 0.1,
    once: true,
    margin: '-50px'
  })

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.5,
        ease: [0.25, 0.25, 0.25, 1]
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ 
        willChange: 'opacity',
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>
          {children}
        </motion.div>
      )}
    </motion.div>
  )
}

// Fade in on scroll (optimized for lists)
export const FadeInList = ({ 
  children, 
  className = '',
  itemClassName = ''
}: {
  children: ReactNode[]
  className?: string
  itemClassName?: string
}) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollReveal
          key={index}
          direction="up"
          delay={index * 0.1}
          className={itemClassName}
          triggerOnce={true}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  )
}

// Performance-optimized reveal for images
export const ImageReveal = ({
  src,
  alt,
  className = '',
  ...props
}: {
  src: string
  alt: string
  className?: string
} & ScrollRevealProps) => {
  return (
    <ScrollReveal {...props} className={className}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-auto"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        loading="lazy"
        style={{
          willChange: 'opacity, transform',
          transform: 'translate3d(0, 0, 0)'
        }}
      />
    </ScrollReveal>
  )
}

// Hook for manual scroll reveal control
export const useScrollReveal = (options?: {
  threshold?: number
  triggerOnce?: boolean
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    threshold: options?.threshold || 0.1,
    once: options?.triggerOnce ?? true,
    margin: '-50px'
  })

  return { ref, isInView }
}

export default ScrollReveal