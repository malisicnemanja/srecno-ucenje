'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Check, X } from 'lucide-react'

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  success?: boolean
  error?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loadingText?: string
  successText?: string
  errorText?: string
  icon?: React.ReactNode
  fullWidth?: boolean
  children: React.ReactNode
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  success = false,
  error = false,
  variant = 'primary',
  size = 'md',
  loadingText,
  successText,
  errorText,
  icon,
  fullWidth = false,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const getVariantClasses = () => {
    const variants = {
      primary: 'bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700 focus:ring-green-500',
      secondary: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700 focus:ring-blue-500',
      outline: 'bg-transparent hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400 focus:ring-gray-500',
      ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent hover:border-gray-200 focus:ring-gray-500',
      danger: 'bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 focus:ring-red-500'
    }
    
    if (success) {
      return 'bg-green-600 text-white border-green-600'
    }
    
    if (error) {
      return 'bg-red-600 text-white border-red-600'
    }
    
    return variants[variant]
  }

  const getSizeClasses = () => {
    const sizes = {
      sm: 'px-3 py-1.5 text-xs h-8',
      md: 'px-4 py-2 text-sm h-10',
      lg: 'px-6 py-3 text-base h-12',
      xl: 'px-8 py-4 text-lg h-14'
    }
    return sizes[size]
  }

  const isDisabled = disabled || loading || success

  const getCurrentIcon = () => {
    if (loading) {
      return <Loader2 className="w-4 h-4 animate-spin" />
    }
    if (success) {
      return <Check className="w-4 h-4" />
    }
    if (error) {
      return <X className="w-4 h-4" />
    }
    return icon
  }

  const getCurrentText = () => {
    if (loading && loadingText) return loadingText
    if (success && successText) return successText
    if (error && errorText) return errorText
    return children
  }

  return (
    <motion.button
      className={`
        relative inline-flex items-center justify-center
        border rounded-lg font-medium
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={isDisabled}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      {...props}
    >
      <AnimatePresence mode="wait">
        {getCurrentIcon() && (
          <motion.span
            key={`${loading}-${success}-${error}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={getCurrentText() ? 'mr-2' : ''}
          >
            {getCurrentIcon()}
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.span
          key={`${loading}-${success}-${error}-text`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {getCurrentText()}
        </motion.span>
      </AnimatePresence>

      {/* Success and Error state animations */}
      <AnimatePresence>
        {(success || error) && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20 
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 rounded-lg ${
                success ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default LoadingButton