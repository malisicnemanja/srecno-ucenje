'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { X } from 'lucide-react'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  snapPoints?: number[] // Percentages of viewport height
  defaultSnapPoint?: number // Index of default snap point
  showHandle?: boolean
  showCloseButton?: boolean
  persistent?: boolean // Don't close on backdrop click
  className?: string
  contentClassName?: string
  maxHeight?: string
  enableSwipeToClose?: boolean
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
  snapPoints = [50, 90], // Default snap points at 50% and 90% of viewport height
  defaultSnapPoint = 0,
  showHandle = true,
  showCloseButton = true,
  persistent = false,
  className = '',
  contentClassName = '',
  maxHeight = '90vh',
  enableSwipeToClose = true
}) => {
  const [currentSnapPoint, setCurrentSnapPoint] = useState(defaultSnapPoint)
  const [dragY, setDragY] = useState(0)
  const sheetRef = useRef<HTMLDivElement>(null)
  const startY = useRef(0)
  const lastY = useRef(0)

  // Convert snap points to actual pixel values
  const getSnapPointHeight = useCallback((snapPoint: number) => {
    return (window.innerHeight * snapPoint) / 100
  }, [])

  // Handle pan gesture
  const handlePanStart = useCallback(() => {
    if (!sheetRef.current) return
    startY.current = lastY.current
    // Prevent body scroll during drag
    document.body.style.touchAction = 'none'
  }, [])

  const handlePanEnd = useCallback((event: any, info: PanInfo) => {
    // Restore body scroll
    document.body.style.touchAction = 'auto'
    
    if (!enableSwipeToClose) return
    
    const threshold = 80 // Reduced threshold for easier mobile interaction
    const velocity = info.velocity.y

    // If dragging down significantly, close or go to lower snap point
    if (info.offset.y > threshold || velocity > 400) {
      if (currentSnapPoint === 0) {
        onClose()
      } else {
        setCurrentSnapPoint(Math.max(0, currentSnapPoint - 1))
      }
    }
    // If dragging up significantly, go to higher snap point
    else if (info.offset.y < -threshold || velocity < -400) {
      setCurrentSnapPoint(Math.min(snapPoints.length - 1, currentSnapPoint + 1))
    }

    setDragY(0)
  }, [currentSnapPoint, snapPoints.length, onClose, enableSwipeToClose])

  const handlePan = useCallback((event: any, info: PanInfo) => {
    if (!enableSwipeToClose) return
    
    // Only allow dragging down from the top snap point, and up from lower ones
    const offset = info.offset.y
    if (offset < 0 && currentSnapPoint === snapPoints.length - 1) return
    if (offset > 0 && currentSnapPoint === 0 && offset > 200) {
      // Allow over-drag before closing
      setDragY(Math.min(offset, 300))
      return
    }
    
    setDragY(offset)
  }, [currentSnapPoint, snapPoints.length, enableSwipeToClose])

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && !persistent) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose, persistent])

  // Calculate current height based on snap point and drag
  const getCurrentHeight = () => {
    const baseHeight = snapPoints[currentSnapPoint]
    const dragOffset = dragY / window.innerHeight * 100
    return Math.max(0, Math.min(90, baseHeight - dragOffset))
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const sheetVariants = {
    hidden: {
      y: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    visible: {
      y: '0%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={!persistent ? onClose : undefined}
          />

          {/* Bottom Sheet */}
          <motion.div
            ref={sheetRef}
            className={`fixed left-0 right-0 bottom-0 z-50 ${className}`}
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
              height: `${getCurrentHeight()}vh`,
              maxHeight
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.1}
            onPanStart={handlePanStart}
            onPan={handlePan}
            onPanEnd={handlePanEnd}
          >
            <div className={`h-full bg-white dark:bg-gray-900 rounded-t-2xl shadow-2xl border-t border-gray-200 dark:border-gray-700 flex flex-col ${contentClassName}`}>
              {/* Handle - Enhanced for mobile */}
              {showHandle && (
                <div className="flex justify-center py-4 cursor-grab active:cursor-grabbing">
                  <div className="w-16 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
                </div>
              )}

              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  {title ? (
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {title}
                    </h2>
                  ) : (
                    <div />
                  )}
                  
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label="Close bottom sheet"
                    >
                      <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                  )}
                </div>
              )}

              {/* Content - Mobile optimized scrolling */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-2 sm:px-4">
                {children}
              </div>

              {/* Snap point indicators */}
              {snapPoints.length > 1 && (
                <div className="flex justify-center py-2 space-x-1">
                  {snapPoints.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSnapPoint(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSnapPoint
                          ? 'bg-green-600'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      aria-label={`Go to snap point ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default BottomSheet