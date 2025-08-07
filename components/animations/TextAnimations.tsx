'use client'

import { motion, useInView, useAnimation, Variants } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { prefersReducedMotion } from '@/lib/animation-utils'

// Re-export existing components
export { RotatingText, TypewriterText } from './RotatingText'

interface AnimatedTextProps {
  children: string
  className?: string
  delay?: number
  duration?: number
  triggerOnce?: boolean
}

// Word-by-word reveal animation
export const WordByWordReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  triggerOnce = true
}: AnimatedTextProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: triggerOnce })
  const words = children.split(' ')

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion() ? 0 : 0.1,
        delayChildren: prefersReducedMotion() ? 0 : delay
      }
    }
  }

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion() ? 0.1 : duration,
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
      style={{ willChange: 'opacity' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-1"
          style={{ willChange: 'opacity, transform' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Letter-by-letter reveal animation
export const LetterByLetterReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 0.03,
  triggerOnce = true
}: AnimatedTextProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: triggerOnce })
  const letters = children.split('')

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion() ? 0 : duration,
        delayChildren: prefersReducedMotion() ? 0 : delay
      }
    }
  }

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion() ? 0.1 : 0.3,
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
      style={{ willChange: 'opacity' }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
          style={{ willChange: 'opacity, transform' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Highlighted text animation
interface HighlightAnimationProps extends AnimatedTextProps {
  highlightColor?: string
  highlightDelay?: number
}

export const HighlightAnimation = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  highlightColor = 'bg-yellow-200',
  highlightDelay = 0.5,
  triggerOnce = true
}: HighlightAnimationProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: triggerOnce })

  return (
    <motion.span
      ref={ref}
      className={`relative inline-block ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ willChange: 'opacity' }}
    >
      {children}
      <motion.span
        className={`absolute inset-0 ${highlightColor} -z-10`}
        variants={{
          hidden: { scaleX: 0, originX: 0 },
          visible: {
            scaleX: 1,
            transition: {
              duration: prefersReducedMotion() ? 0.1 : duration,
              delay: prefersReducedMotion() ? 0 : delay + highlightDelay,
              ease: [0.25, 0.25, 0.25, 1]
            }
          }
        }}
        style={{ willChange: 'transform' }}
      />
    </motion.span>
  )
}

// Number counter animation
interface NumberCounterProps {
  from?: number
  to: number
  duration?: number
  delay?: number
  className?: string
  suffix?: string
  prefix?: string
  decimals?: number
  triggerOnce?: boolean
}

export const NumberCounter = ({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  className = '',
  suffix = '',
  prefix = '',
  decimals = 0,
  triggerOnce = true
}: NumberCounterProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: triggerOnce })
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (!isInView) return

    if (prefersReducedMotion()) {
      setCount(to)
      return
    }

    const startTime = Date.now() + delay * 1000
    const endTime = startTime + duration * 1000

    const updateCount = () => {
      const now = Date.now()
      
      if (now < startTime) {
        requestAnimationFrame(updateCount)
        return
      }

      if (now >= endTime) {
        setCount(to)
        return
      }

      const progress = (now - startTime) / (endTime - startTime)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = from + (to - from) * easeOutQuart
      
      setCount(currentCount)
      requestAnimationFrame(updateCount)
    }

    requestAnimationFrame(updateCount)
  }, [isInView, from, to, duration, delay])

  const formatNumber = (num: number) => {
    return decimals > 0 ? num.toFixed(decimals) : Math.round(num).toString()
  }

  return (
    <span ref={ref} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  )
}

// Split text reveal (creates span for each word)
export const SplitTextReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  triggerOnce = true,
  direction = 'up'
}: AnimatedTextProps & { direction?: 'up' | 'down' | 'left' | 'right' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: triggerOnce })
  const words = children.split(' ')

  const getVariants = () => {
    const variants: Variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    }

    switch (direction) {
      case 'up':
        variants.hidden.y = 20
        variants.visible.y = 0
        break
      case 'down':
        variants.hidden.y = -20
        variants.visible.y = 0
        break
      case 'left':
        variants.hidden.x = -20
        variants.visible.x = 0
        break
      case 'right':
        variants.hidden.x = 20
        variants.visible.x = 0
        break
    }

    return variants
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion() ? 0 : 0.08,
        delayChildren: prefersReducedMotion() ? 0 : delay
      }
    }
  }

  const wordVariants = getVariants()
  wordVariants.visible.transition = {
    duration: prefersReducedMotion() ? 0.1 : duration,
    ease: [0.25, 0.25, 0.25, 1]
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ willChange: 'opacity' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-1"
          style={{ willChange: 'opacity, transform' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Gradient text animation
export const GradientText = ({
  children,
  className = '',
  colors = ['from-blue-600', 'via-purple-600', 'to-pink-600'],
  animate = true
}: {
  children: string
  className?: string
  colors?: string[]
  animate?: boolean
}) => {
  const gradientClass = `bg-gradient-to-r ${colors.join(' ')} bg-clip-text text-transparent`
  
  if (!animate || prefersReducedMotion()) {
    return <span className={`${gradientClass} ${className}`}>{children}</span>
  }

  return (
    <motion.span
      className={`${gradientClass} ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      style={{
        backgroundSize: '200% 200%',
        willChange: 'background-position'
      }}
    >
      {children}
    </motion.span>
  )
}

export default {
  WordByWordReveal,
  LetterByLetterReveal,
  HighlightAnimation,
  NumberCounter,
  SplitTextReveal,
  GradientText,
  RotatingText,
  TypewriterText
}