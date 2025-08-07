'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  distance?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  distance = 50,
  direction = 'up',
  className = ''
}: ScrollRevealProps) {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  }

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0,
        ...directions[direction]
      }}
      whileInView={{ 
        opacity: 1,
        x: 0,
        y: 0
      }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration,
        delay,
        ease: [0.4, 0.0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

// Additional exports for compatibility
export function StaggeredReveal({ children, className = '' }: { children: ReactNode, className?: string }) {
  return <ScrollReveal className={className}>{children}</ScrollReveal>
}

export function FadeInList({ children, className = '' }: { children: ReactNode, className?: string }) {
  return <ScrollReveal className={className}>{children}</ScrollReveal>
}

export function ImageReveal({ children, className = '' }: { children: ReactNode, className?: string }) {
  return <ScrollReveal className={className}>{children}</ScrollReveal>
}

export function useScrollReveal() {
  return { inView: true, ref: null }
}

// Removed duplicate exports - these should come from their respective files
// - WordByWordReveal from TextAnimations.tsx
// - FadeInOnScroll from ScrollTrigger.tsx  
// - OptimizedAnimatedCounter from OptimizedAnimatedCounter.tsx