'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  aspectRatio?: '1:1' | '4:3' | '16:9' | '3:2'
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  aspectRatio,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Calculate dimensions based on aspect ratio if not provided
  const getDimensions = () => {
    if (width && height) return { width, height }
    
    const baseWidth = 800
    switch (aspectRatio) {
      case '1:1':
        return { width: baseWidth, height: baseWidth }
      case '4:3':
        return { width: baseWidth, height: Math.round(baseWidth * 3 / 4) }
      case '16:9':
        return { width: baseWidth, height: Math.round(baseWidth * 9 / 16) }
      case '3:2':
        return { width: baseWidth, height: Math.round(baseWidth * 2 / 3) }
      default:
        return { width: baseWidth, height: 600 }
    }
  }

  const { width: imageWidth, height: imageHeight } = getDimensions()

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  // Default blur data URL (1x1 transparent pixel)
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='

  if (hasError) {
    return (
      <div 
        className={cn(
          'bg-gray-200 flex items-center justify-center',
          className
        )}
        style={{ 
          width: imageWidth, 
          height: imageHeight,
          aspectRatio: aspectRatio?.replace(':', '/')
        }}
      >
        <div className="text-center p-4">
          <svg
            className="w-12 h-12 text-gray-400 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm text-gray-500">Image failed to load</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gray-200 animate-pulse z-10"
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        width={imageWidth}
        height={imageHeight}
        quality={quality}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  )
}

// Lazy loading wrapper with Intersection Observer
export function LazyImage(props: OptimizedImageProps) {
  const [isInView, setIsInView] = useState(false)

  return (
    <motion.div
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, margin: '50px' }}
    >
      {isInView ? (
        <OptimizedImage {...props} />
      ) : (
        <div 
          className={cn(
            'bg-gray-200 animate-pulse',
            props.className
          )}
          style={{ 
            aspectRatio: props.aspectRatio?.replace(':', '/') || 
                        (props.width && props.height ? `${props.width}/${props.height}` : '16/9')
          }}
        />
      )}
    </motion.div>
  )
}