'use client'

// Re-export animation components from ui folder
export { default as FloatingLetters } from '@/components/ui/FloatingLetters'
export { default as PulseButton } from '@/components/ui/PulseButton'
export { default as BookOpeningAnimation } from '@/components/ui/BookOpeningAnimation'

// Check if AnimatedTitle exists, if not create a simple one
import { motion } from 'framer-motion'

interface AnimatedTitleProps {
  text: string
  className?: string
}

export const AnimatedTitle = ({ text, className = '' }: AnimatedTitleProps) => (
  <motion.h1
    className={className}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    {text}
  </motion.h1>
)