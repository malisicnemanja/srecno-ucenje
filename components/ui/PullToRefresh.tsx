'use client'

import React, { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePullToRefresh } from '@/hooks/useMobileGestures'
import { DeviceDetection, PerformanceUtils } from '@/lib/mobile-utils'

interface PullToRefreshProps {
  children: React.ReactNode
  onRefresh: () => Promise<void>
  threshold?: number
  resistance?: number
  disabled?: boolean
  showIndicator?: boolean
  className?: string
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({
  children,
  onRefresh,
  threshold = 80,
  resistance = 2.5,
  disabled = false,
  showIndicator = true,
  className = ''
}) => {
  const [lastRefresh, setLastRefresh] = useState<number>(0)
  
  // Prevent too frequent refreshes
  const handleRefresh = useCallback(async () => {
    const now = Date.now()
    if (now - lastRefresh < 2000) return // Minimum 2 seconds between refreshes
    
    setLastRefresh(now)
    await onRefresh()
  }, [onRefresh, lastRefresh])

  const {
    ref,
    isRefreshing,
    isPulling,
    pullDistance,
    pullProgress
  } = usePullToRefresh({
    threshold,
    resistance,
    onRefresh: disabled ? undefined : handleRefresh
  })

  // Don't render on non-mobile devices unless explicitly enabled
  if (!DeviceDetection.isMobile() && !showIndicator) {
    return <div className={className}>{children}</div>
  }

  const getRefreshIcon = () => {
    if (isRefreshing) {
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-6 h-6"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
        </motion.div>
      )
    }

    return (
      <motion.div
        animate={{ rotate: pullProgress >= 1 ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="w-6 h-6"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5l0 14" />
          <path d="M18 13l-6 6" />
          <path d="M6 13l6 6" />
        </svg>
      </motion.div>
    )
  }

  const getRefreshText = () => {
    if (isRefreshing) return 'Osvežava se...'
    if (pullProgress >= 1) return 'Otpustite za osvežavanje'
    return 'Povucite za osvežavanje'
  }

  const getIndicatorOpacity = () => {
    if (!isPulling && !isRefreshing) return 0
    if (isRefreshing) return 1
    return Math.min(pullProgress * 2, 1)
  }

  return (
    <div 
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        // Add safe area padding for mobile
        paddingTop: DeviceDetection.isIOS() ? 'env(safe-area-inset-top)' : '0'
      }}
    >
      {/* Pull to refresh indicator */}
      <AnimatePresence>
        {(isPulling || isRefreshing) && showIndicator && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ 
              opacity: getIndicatorOpacity(),
              y: Math.min(pullDistance / 2, 30)
            }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center py-4"
          >
            <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200">
              <div className="text-brand-grass">
                {getRefreshIcon()}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {getRefreshText()}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      {isPulling && showIndicator && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 z-10">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-grass to-brand-sun"
            animate={{ width: `${Math.min(pullProgress * 100, 100)}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
      )}

      {/* Content */}
      <div 
        className={`${isPulling && !PerformanceUtils.prefersReducedMotion() ? 'transition-none' : 'transition-transform duration-300'}`}
        style={{
          transform: isPulling && !PerformanceUtils.prefersReducedMotion() 
            ? `translateY(${Math.min(pullDistance, 60)}px)` 
            : 'translateY(0)'
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default PullToRefresh