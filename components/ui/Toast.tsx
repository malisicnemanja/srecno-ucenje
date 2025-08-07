'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Loader2 } from 'lucide-react'

// Toast Types
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading' | 'achievement' | 'lesson-complete' | 'quiz-result' | 'streak' | 'level-up'

export type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'

export interface ToastAction {
  label: string
  onClick: () => void
  primary?: boolean
}

export interface Toast {
  id: string
  type: ToastType
  title?: string
  message: string
  duration?: number
  actions?: ToastAction[]
  dismissible?: boolean
  progress?: boolean
  onClose?: () => void
}

export interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => string
  removeToast: (id: string) => void
  clearAll: () => void
  success: (message: string, options?: Partial<Omit<Toast, 'id' | 'type'>>) => string
  error: (message: string, options?: Partial<Omit<Toast, 'id' | 'type'>>) => string
  warning: (message: string, options?: Partial<Omit<Toast, 'id' | 'type'>>) => string
  info: (message: string, options?: Partial<Omit<Toast, 'id' | 'type'>>) => string
  loading: (message: string, options?: Partial<Omit<Toast, 'id' | 'type'>>) => string
  achievement: (message: string, options?: Partial<Omit<Toast, 'id' | 'type'>>) => string
}

const ToastContext = createContext<ToastContextType | null>(null)

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

// Toast Icons
const ToastIcon = ({ type }: { type: ToastType }) => {
  const iconProps = { className: "w-4 h-4", strokeWidth: 2 }
  
  switch (type) {
    case 'success':
    case 'lesson-complete':
      return <CheckCircle {...iconProps} />
    case 'error':
      return <AlertCircle {...iconProps} />
    case 'warning':
      return <AlertTriangle {...iconProps} />
    case 'info':
    case 'quiz-result':
      return <Info {...iconProps} />
    case 'loading':
      return <Loader2 {...iconProps} className="w-4 h-4 animate-spin" />
    case 'achievement':
      return <span className="text-sm">🏆</span>
    case 'streak':
      return <span className="text-sm">🔥</span>
    case 'level-up':
      return <span className="text-sm">⭐</span>
    default:
      return <Info {...iconProps} />
  }
}

// Single Toast Component
interface ToastItemProps {
  toast: Toast
  onClose: (id: string) => void
  position: ToastPosition
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose, position }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState(toast.duration || 5000)

  useEffect(() => {
    setIsVisible(true)
    
    if (toast.duration && toast.duration > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 100) {
            onClose(toast.id)
            return 0
          }
          return prev - 100
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [toast.duration, toast.id, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose(toast.id)
      toast.onClose?.()
    }, 200)
  }

  const getAnimationProps = () => {
    const isLeft = position.includes('left')
    const isCenter = position.includes('center')
    const isTop = position.includes('top')

    return {
      initial: {
        opacity: 0,
        x: isCenter ? 0 : isLeft ? -100 : 100,
        y: isCenter ? (isTop ? -100 : 100) : 0,
        scale: 0.9
      },
      animate: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1
      },
      exit: {
        opacity: 0,
        x: isCenter ? 0 : isLeft ? -100 : 100,
        y: isCenter ? (isTop ? -100 : 100) : 0,
        scale: 0.8
      }
    }
  }

  const getToastClasses = () => {
    const baseClasses = "c-toast pointer-events-auto relative flex w-full max-w-sm items-start space-x-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm"
    
    const typeClasses = {
      success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300",
      error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300",
      info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300",
      loading: "bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900/20 dark:border-gray-700 dark:text-gray-300",
      achievement: "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300 text-yellow-900 dark:from-yellow-900/20 dark:to-yellow-800/20 dark:border-yellow-700 dark:text-yellow-200",
      'lesson-complete': "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-900 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-700 dark:text-green-200",
      'quiz-result': "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 text-blue-900 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-700 dark:text-blue-200",
      streak: "bg-gradient-to-r from-orange-50 to-red-50 border-orange-300 text-orange-900 dark:from-orange-900/20 dark:to-red-900/20 dark:border-orange-700 dark:text-orange-200",
      'level-up': "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 text-purple-900 dark:from-purple-900/20 dark:to-pink-900/20 dark:border-purple-700 dark:text-purple-200"
    }
    
    return `${baseClasses} ${typeClasses[toast.type]}`
  }

  return (
    <motion.div
      layout
      {...getAnimationProps()}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className={getToastClasses()}
      role="alert"
      aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
      aria-describedby={`toast-${toast.id}-message`}
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-current/10">
          <ToastIcon type={toast.type} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {toast.title && (
          <h4 className="text-sm font-semibold leading-tight mb-1">
            {toast.title}
          </h4>
        )}
        <p 
          id={`toast-${toast.id}-message`}
          className="text-sm leading-relaxed break-words"
        >
          {toast.message}
        </p>

        {/* Actions */}
        {toast.actions && toast.actions.length > 0 && (
          <div className="mt-2 flex space-x-2">
            {toast.actions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  action.onClick()
                  if (!action.primary) handleClose()
                }}
                className={`text-xs font-medium px-2 py-1 rounded border transition-colors ${
                  action.primary
                    ? 'bg-current/10 border-current/20 hover:bg-current/20'
                    : 'border-current/20 hover:bg-current/10'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Close Button */}
      {toast.dismissible !== false && (
        <button
          onClick={handleClose}
          className="flex-shrink-0 rounded-md p-1 hover:bg-current/10 focus:outline-none focus:ring-2 focus:ring-current/20"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {/* Progress Bar */}
      {toast.progress && toast.duration && toast.duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-current/20 rounded-b-lg overflow-hidden">
          <motion.div
            className="h-full bg-current/60"
            initial={{ width: '100%' }}
            animate={{ width: `${(timeLeft / (toast.duration || 5000)) * 100}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      )}
    </motion.div>
  )
}

// Toast Container Component
interface ToastContainerProps {
  position?: ToastPosition
  maxToasts?: number
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ 
  position = 'top-right', 
  maxToasts = 3 
}) => {
  const { toasts, removeToast } = useToast()

  const getContainerClasses = () => {
    const baseClasses = "fixed z-50 flex flex-col space-y-2 pointer-events-none"
    
    const positionClasses = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
    }
    
    return `${baseClasses} ${positionClasses[position]}`
  }

  const visibleToasts = toasts.slice(0, maxToasts)

  return (
    <div className={getContainerClasses()}>
      <AnimatePresence mode="popLayout">
        {visibleToasts.map((toast, index) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={removeToast}
            position={position}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Toast Provider Component
interface ToastProviderProps {
  children: React.ReactNode
  position?: ToastPosition
  maxToasts?: number
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  position = 'top-right',
  maxToasts = 3
}) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toastData: Omit<Toast, 'id'>): string => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const toast: Toast = {
      id,
      duration: 5000,
      dismissible: true,
      progress: true,
      ...toastData
    }

    setToasts((prev) => [toast, ...prev])
    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setToasts([])
  }, [])

  // Convenience methods
  const success = useCallback((message: string, options?: Partial<Omit<Toast, 'id' | 'type'>>) => 
    addToast({ type: 'success', message, ...options }), [addToast])

  const error = useCallback((message: string, options?: Partial<Omit<Toast, 'id' | 'type'>>) => 
    addToast({ type: 'error', message, duration: 7000, ...options }), [addToast])

  const warning = useCallback((message: string, options?: Partial<Omit<Toast, 'id' | 'type'>>) => 
    addToast({ type: 'warning', message, ...options }), [addToast])

  const info = useCallback((message: string, options?: Partial<Omit<Toast, 'id' | 'type'>>) => 
    addToast({ type: 'info', message, ...options }), [addToast])

  const loading = useCallback((message: string, options?: Partial<Omit<Toast, 'id' | 'type'>>) => 
    addToast({ type: 'loading', message, duration: 0, dismissible: false, ...options }), [addToast])

  const achievement = useCallback((message: string, options?: Partial<Omit<Toast, 'id' | 'type'>>) => 
    addToast({ type: 'achievement', message, duration: 8000, ...options }), [addToast])

  const value: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    clearAll,
    success,
    error,
    warning,
    info,
    loading,
    achievement
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer position={position} maxToasts={maxToasts} />
    </ToastContext.Provider>
  )
}

export default ToastProvider