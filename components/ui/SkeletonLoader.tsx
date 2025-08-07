'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface SkeletonLoaderProps {
  type?: 'text' | 'title' | 'image' | 'card' | 'avatar' | 'button' | 'custom' | 'lesson' | 'quiz' | 'progress'
  lines?: number
  width?: string | number
  height?: string | number
  className?: string
  animated?: boolean
  variant?: 'default' | 'rounded' | 'circular'
}

const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ')

export default function SkeletonLoader({ 
  type = 'text', 
  lines = 1, 
  width,
  height,
  className,
  animated = true,
  variant = 'default'
}: SkeletonLoaderProps) {
  const getSkeletonClasses = (additionalClasses?: string) => {
    const baseClasses = "bg-gray-200 dark:bg-gray-700"
    const animationClasses = animated ? "animate-pulse" : ""
    const variantClasses = {
      default: "rounded-md",
      rounded: "rounded-lg", 
      circular: "rounded-full"
    }
    
    return cn(baseClasses, animationClasses, variantClasses[variant], additionalClasses, className)
  }

  if (type === 'card') {
    return (
      <div className={cn("p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4", className)}>
        <div className={getSkeletonClasses("h-48 w-full")} />
        <div className={getSkeletonClasses("h-6 w-3/4")} />
        <div className="space-y-2">
          <div className={getSkeletonClasses("h-4 w-full")} />
          <div className={getSkeletonClasses("h-4 w-full")} />
          <div className={getSkeletonClasses("h-4 w-5/6")} />
        </div>
        <div className="flex justify-between pt-2">
          <div className={getSkeletonClasses("h-8 w-20")} />
          <div className={getSkeletonClasses("h-8 w-16")} />
        </div>
      </div>
    )
  }

  if (type === 'lesson') {
    return (
      <div className={cn("p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3", className)}>
        <div className="flex items-start justify-between">
          <div className={getSkeletonClasses("h-5 w-8 rounded-full")} />
          <div className={getSkeletonClasses("h-8 w-8 rounded-full")} />
        </div>
        <div className={getSkeletonClasses("h-6 w-4/5")} />
        <div className={getSkeletonClasses("h-4 w-full")} />
        <div className={getSkeletonClasses("h-4 w-3/4")} />
        <div className="flex items-center justify-between pt-2">
          <div className={getSkeletonClasses("h-4 w-16")} />
          <div className={getSkeletonClasses("h-4 w-12")} />
        </div>
        <div className={getSkeletonClasses("h-2 w-full rounded-full")} />
      </div>
    )
  }

  if (type === 'quiz') {
    return (
      <div className={cn("p-6 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4", className)}>
        <div className="flex justify-between items-center">
          <div className={getSkeletonClasses("h-4 w-20")} />
          <div className={getSkeletonClasses("h-4 w-12")} />
        </div>
        <div className={getSkeletonClasses("h-6 w-full")} />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={getSkeletonClasses("h-12 w-full")} />
          ))}
        </div>
        <div className="flex justify-between pt-4">
          <div className={getSkeletonClasses("h-10 w-20")} />
          <div className={getSkeletonClasses("h-10 w-24")} />
        </div>
      </div>
    )
  }

  if (type === 'progress') {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex justify-between">
          <div className={getSkeletonClasses("h-4 w-24")} />
          <div className={getSkeletonClasses("h-4 w-12")} />
        </div>
        <div className={getSkeletonClasses("h-3 w-full rounded-full")} />
      </div>
    )
  }

  if (type === 'avatar') {
    return (
      <div className={cn("flex items-center space-x-4", className)}>
        <div className={getSkeletonClasses("h-12 w-12 rounded-full")} />
        <div className="flex-1 space-y-2">
          <div className={getSkeletonClasses("h-4 w-32")} />
          <div className={getSkeletonClasses("h-3 w-24")} />
        </div>
      </div>
    )
  }

  if (type === 'image') {
    const imageHeight = height || "h-48"
    const imageWidth = width || "w-full"
    return (
      <div 
        className={getSkeletonClasses(`${imageHeight} ${imageWidth}`)}
        style={{
          height: typeof height === 'number' ? `${height}px` : height,
          width: typeof width === 'number' ? `${width}px` : width
        }}
      />
    )
  }

  if (type === 'title') {
    const titleWidth = width || "w-3/4"
    return (
      <div 
        className={getSkeletonClasses(`h-6 ${titleWidth}`)}
        style={{
          height: typeof height === 'number' ? `${height}px` : height,
          width: typeof width === 'number' ? `${width}px` : width
        }}
      />
    )
  }

  if (type === 'button') {
    const buttonWidth = width || "w-24"
    return (
      <div 
        className={getSkeletonClasses(`h-10 ${buttonWidth}`)}
        style={{
          height: typeof height === 'number' ? `${height}px` : height,
          width: typeof width === 'number' ? `${width}px` : width
        }}
      />
    )
  }

  if (type === 'custom') {
    return (
      <div 
        className={getSkeletonClasses()}
        style={{
          height: typeof height === 'number' ? `${height}px` : height || '1rem',
          width: typeof width === 'number' ? `${width}px` : width || '100%'
        }}
      />
    )
  }

  // Default text type
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => {
        const isLastLine = i === lines - 1 && lines > 1
        const lineWidth = isLastLine ? "w-4/5" : "w-full"
        
        return (
          <div 
            key={i} 
            className={getSkeletonClasses(`h-4 ${lineWidth}`)}
            style={{
              height: typeof height === 'number' ? `${height}px` : height,
              width: typeof width === 'number' ? `${width}px` : width
            }}
          />
        )
      })}
    </div>
  )
}