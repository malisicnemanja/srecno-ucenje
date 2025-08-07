'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  color?: 'primary' | 'secondary' | 'accent' | 'white' | 'gray' | 'current'
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'ring'
  text?: string
  textPosition?: 'bottom' | 'right' | 'top' | 'left'
  fullscreen?: boolean
  overlay?: boolean
  className?: string
  speed?: 'slow' | 'normal' | 'fast'
}

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6', 
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
  '2xl': 'w-16 h-16'
}

const colorClasses = {
  primary: 'text-green-600 dark:text-green-400',
  secondary: 'text-blue-600 dark:text-blue-400',
  accent: 'text-yellow-600 dark:text-yellow-400',
  white: 'text-white',
  gray: 'text-gray-600 dark:text-gray-400',
  current: 'text-current'
}

const getSpeedDuration = (speed: 'slow' | 'normal' | 'fast') => {
  switch (speed) {
    case 'slow': return 2
    case 'fast': return 0.5
    default: return 1
  }
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'primary', 
  variant = 'spinner',
  text,
  textPosition = 'bottom',
  fullscreen = false,
  overlay = false,
  className = '',
  speed = 'normal'
}: LoadingSpinnerProps) {
  const duration = getSpeedDuration(speed)

  const renderSpinner = () => {
    const spinnerClass = `${sizeClasses[size]} ${colorClasses[color]}`
    
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 bg-current rounded-full ${colorClasses[color]}`}
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        )
      
      case 'pulse':
        return (
          <motion.div
            className={`${spinnerClass} bg-current rounded-full`}
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: duration,
              repeat: Infinity
            }}
          />
        )
      
      case 'bars':
        return (
          <div className="flex items-end space-x-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className={`w-1 bg-current ${colorClasses[color]}`}
                style={{ height: `${12 + (i % 2) * 4}px` }}
                animate={{ scaleY: [1, 2, 1] }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        )
      
      case 'ring':
        return (
          <motion.div
            className={`${spinnerClass} border-2 border-current border-t-transparent rounded-full`}
            animate={{ rotate: 360 }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        )
      
      default: // spinner
        return (
          <motion.div
            className={spinnerClass}
            data-testid="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            <svg 
              className="w-full h-full" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-25"
              />
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                className="opacity-75"
              />
            </svg>
          </motion.div>
        )
    }
  }

  const getContainerClasses = () => {
    let classes = 'flex items-center justify-center'
    
    if (textPosition === 'bottom' || textPosition === 'top') {
      classes += ' flex-col'
      if (text) classes += ' space-y-2'
    } else {
      classes += ' flex-row'
      if (text) classes += textPosition === 'right' ? ' space-x-3' : ' space-x-3 flex-row-reverse'
    }
    
    if (fullscreen) {
      classes += ' fixed inset-0 z-50'
      if (overlay) {
        classes += ' bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
      }
    }
    
    return `${classes} ${className}`
  }

  const content = (
    <div className={getContainerClasses()}>
      {textPosition === 'top' && text && (
        <p className={`text-sm font-medium ${colorClasses[color]}`}>
          {text}
        </p>
      )}
      
      {renderSpinner()}
      
      {(textPosition === 'bottom' || textPosition === 'right' || textPosition === 'left') && text && (
        <p className={`text-sm font-medium ${colorClasses[color]}`}>
          {text}
        </p>
      )}
    </div>
  )

  return content
}