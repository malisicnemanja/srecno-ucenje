'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PulseButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  intensity?: 'subtle' | 'medium' | 'strong'
}

export default function PulseButton({
  children,
  className = '',
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  intensity = 'medium'
}: PulseButtonProps) {
  const variants = {
    primary: {
      bg: 'bg-primary-600 hover:bg-primary-700',
      text: 'text-white',
      ring: 'ring-primary-400'
    },
    secondary: {
      bg: 'bg-secondary-600 hover:bg-secondary-700',
      text: 'text-white',
      ring: 'ring-secondary-400'
    },
    accent: {
      bg: 'bg-accent-600 hover:bg-accent-700',
      text: 'text-white',
      ring: 'ring-accent-400'
    }
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const intensityConfig = {
    subtle: {
      scale: [1, 1.02, 1],
      boxShadow: [
        '0 0 0 0 rgba(59, 130, 246, 0)',
        '0 0 0 4px rgba(59, 130, 246, 0.1)',
        '0 0 0 0 rgba(59, 130, 246, 0)'
      ]
    },
    medium: {
      scale: [1, 1.05, 1],
      boxShadow: [
        '0 0 0 0 rgba(59, 130, 246, 0)',
        '0 0 0 8px rgba(59, 130, 246, 0.2)',
        '0 0 0 0 rgba(59, 130, 246, 0)'
      ]
    },
    strong: {
      scale: [1, 1.08, 1],
      boxShadow: [
        '0 0 0 0 rgba(59, 130, 246, 0)',
        '0 0 0 12px rgba(59, 130, 246, 0.3)',
        '0 0 0 0 rgba(59, 130, 246, 0)'
      ]
    }
  }

  const currentVariant = variants[variant]
  const currentSize = sizes[size]
  const currentIntensity = intensityConfig[intensity]

  return (
    <motion.button
      className={`
        relative rounded-lg font-semibold transition-all duration-200 
        ${currentVariant.bg} ${currentVariant.text} ${currentSize}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentVariant.ring}
        ${className}
      `}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      animate={!disabled ? currentIntensity : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Pulsiranje pozadina */}
      <motion.div
        className={`absolute inset-0 rounded-lg ${currentVariant.bg.split(' ')[0]} opacity-75`}
        animate={!disabled ? {
          scale: [1, 1.1, 1],
          opacity: [0.75, 0.3, 0.75]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Sadržaj dugmeta */}
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Hover efekt */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-white opacity-0"
        whileHover={!disabled ? { opacity: 0.1 } : {}}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  )
}

// Varijanta sa ikonom
export function PulseIconButton({
  icon,
  children,
  className = '',
  onClick,
  variant = 'primary',
  iconPosition = 'left'
}: {
  icon: ReactNode
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'accent'
  iconPosition?: 'left' | 'right'
}) {
  return (
    <PulseButton
      className={className}
      onClick={onClick}
      variant={variant}
    >
      <div className="flex items-center gap-2">
        {iconPosition === 'left' && (
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>
        )}
        
        {children}
        
        {iconPosition === 'right' && (
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>
        )}
      </div>
    </PulseButton>
  )
}

// Floating Action Button varijanta
export function FloatingActionButton({
  icon,
  onClick,
  className = '',
  variant = 'primary'
}: {
  icon: ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'accent'
}) {
  return (
    <motion.button
      className={`
        fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg
        flex items-center justify-center text-white z-50
        ${variant === 'primary' ? 'bg-primary-600 hover:bg-primary-700' :
          variant === 'secondary' ? 'bg-secondary-600 hover:bg-secondary-700' :
          'bg-accent-600 hover:bg-accent-700'}
        ${className}
      `}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        y: [0, -5, 0],
        boxShadow: [
          '0 4px 20px rgba(0,0,0,0.1)',
          '0 8px 25px rgba(0,0,0,0.15)',
          '0 4px 20px rgba(0,0,0,0.1)'
        ]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {icon}
      </motion.div>
    </motion.button>
  )
}