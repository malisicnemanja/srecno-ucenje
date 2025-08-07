'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'
import { useSwipeGesture, usePinchZoom } from '@/hooks/useMobileGestures'
import { DeviceDetection, TouchUtils, PerformanceUtils } from '@/lib/mobile-utils'

interface ImageData {
  src: string
  alt: string
  title?: string
  description?: string
  width?: number
  height?: number
}

interface MobileImageGalleryProps {
  images: ImageData[]
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
  showThumbnails?: boolean
  enableZoom?: boolean
  enableRotation?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

const MobileImageGallery: React.FC<MobileImageGalleryProps> = ({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
  showThumbnails = true,
  enableZoom = true,
  enableRotation = false,
  autoPlay = false,
  autoPlayInterval = 5000,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [thumbnailsVisible, setThumbnailsVisible] = useState(showThumbnails)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout>()

  // Initialize pinch zoom for the current image
  const { ref: zoomRef, scale, reset: resetZoom, isZoomed: isPinchZoomed } = usePinchZoom({
    minZoom: 0.5,
    maxZoom: 4,
    doubleTapZoom: enableZoom,
    wheelZoom: false
  })

  // Handle swipe gestures for navigation
  const { ref: swipeRef } = useSwipeGesture((result) => {
    if (isPinchZoomed) return // Don't navigate when zoomed
    
    if (result.direction === 'left') {
      nextImage()
    } else if (result.direction === 'right') {
      previousImage()
    } else if (result.direction === 'down' && result.distance > 100) {
      onClose()
    }
  }, { threshold: 50, velocity: 0.3 })

  // Navigation functions
  const nextImage = useCallback(() => {
    if (images.length === 0) return
    
    setCurrentIndex((prev) => (prev + 1) % images.length)
    resetZoom()
    setRotation(0)
    setIsZoomed(false)
    
    if (DeviceDetection.isMobile()) {
      TouchUtils.addHapticFeedback('light')
    }
  }, [images.length, resetZoom])

  const previousImage = useCallback(() => {
    if (images.length === 0) return
    
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    resetZoom()
    setRotation(0)
    setIsZoomed(false)
    
    if (DeviceDetection.isMobile()) {
      TouchUtils.addHapticFeedback('light')
    }
  }, [images.length, resetZoom])

  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index)
    resetZoom()
    setRotation(0)
    setIsZoomed(false)
  }, [resetZoom])

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && isOpen && !isPinchZoomed) {
      autoPlayRef.current = setInterval(() => {
        nextImage()
      }, autoPlayInterval)
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [autoPlay, isOpen, isPinchZoomed, nextImage, autoPlayInterval])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          previousImage()
          break
        case 'ArrowRight':
          nextImage()
          break
        case ' ':
          e.preventDefault()
          setThumbnailsVisible(!thumbnailsVisible)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, previousImage, nextImage, thumbnailsVisible])

  // Close on outside click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isPinchZoomed) {
      onClose()
    }
  }

  // Image loading handler
  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
    console.error('Failed to load image:', images[currentIndex]?.src)
  }

  // Zoom controls
  const handleZoomIn = () => {
    setIsZoomed(true)
  }

  const handleZoomOut = () => {
    resetZoom()
    setIsZoomed(false)
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
    if (DeviceDetection.isMobile()) {
      TouchUtils.addHapticFeedback('medium')
    }
  }

  if (!isOpen || images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm ${className}`}
        onClick={handleBackdropClick}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 z-60 p-4 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </span>
              {currentImage.title && (
                <h3 className="text-lg font-semibold truncate max-w-48">
                  {currentImage.title}
                </h3>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {enableZoom && (
                <>
                  <button
                    onClick={handleZoomIn}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={20} />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Zoom out"
                  >
                    <ZoomOut size={20} />
                  </button>
                </>
              )}
              
              {enableRotation && (
                <button
                  onClick={handleRotate}
                  className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Rotate image"
                >
                  <RotateCw size={20} />
                </button>
              )}
              
              <button
                onClick={onClose}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close gallery"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Image Area */}
        <div
          ref={swipeRef}
          className="flex items-center justify-center h-full pt-20 pb-24"
        >
          {/* Navigation Arrows (Desktop) */}
          {!DeviceDetection.isMobile() && images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Image Container */}
          <div
            ref={zoomRef}
            className="relative max-w-full max-h-full flex items-center justify-center"
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="loading-mobile w-12 h-12 rounded-full" />
              </div>
            )}
            
            <motion.img
              ref={imageRef}
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: rotation
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-w-full max-h-full object-contain"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                transition: PerformanceUtils.prefersReducedMotion() ? 'none' : 'transform 0.2s ease'
              }}
              onLoad={handleImageLoad}
              onError={handleImageError}
              onLoadStart={() => setIsLoading(true)}
            />
          </div>
        </div>

        {/* Bottom Controls and Thumbnails */}
        <div className="absolute bottom-0 left-0 right-0 z-60 p-4 bg-gradient-to-t from-black/50 to-transparent">
          {currentImage.description && (
            <p className="text-white text-sm mb-4 text-center">
              {currentImage.description}
            </p>
          )}
          
          {/* Mobile Navigation Dots */}
          {DeviceDetection.isMobile() && images.length > 1 && (
            <div className="flex justify-center space-x-2 mb-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex 
                      ? 'bg-white' 
                      : 'bg-white/40'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Thumbnails */}
          {thumbnailsVisible && images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2 scroll-snap-x">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors scroll-snap-start ${
                    index === currentIndex 
                      ? 'border-white' 
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
          
          {/* Toggle Thumbnails Button */}
          {images.length > 1 && (
            <div className="flex justify-center mt-2">
              <button
                onClick={() => setThumbnailsVisible(!thumbnailsVisible)}
                className="text-white/70 hover:text-white text-sm transition-colors"
              >
                {thumbnailsVisible ? 'Hide Thumbnails' : 'Show Thumbnails'}
              </button>
            </div>
          )}
        </div>

        {/* Swipe Indicators for Mobile */}
        {DeviceDetection.isMobile() && images.length > 1 && (
          <div className="absolute top-1/2 left-4 text-white/50 text-xs">
            ← Swipe
          </div>
        )}
        
        {DeviceDetection.isMobile() && images.length > 1 && (
          <div className="absolute top-1/2 right-4 text-white/50 text-xs">
            Swipe →
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default MobileImageGallery