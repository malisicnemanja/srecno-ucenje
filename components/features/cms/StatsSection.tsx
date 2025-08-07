'use client'

/**
 * StatsSection - Prikazuje statistike i brojke
 */

import React, { useState, useEffect, useRef } from 'react'
import { StatsSectionProps } from '@/types/sections'
import { brandColors, getContrastColor } from '@/lib/color-rotation'

// Counter komponenta sa animacijom
const AnimatedCounter: React.FC<{
  value: string
  duration?: number
  prefix?: string
  suffix?: string
}> = ({ value, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  // Parse numeričku vrednost iz stringa
  const numericValue = parseFloat(value.replace(/[^\d.]/g, '')) || 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime

      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      
      setCount(Math.floor(numericValue * easeOutCubic))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, numericValue, duration])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

const StatsSection: React.FC<StatsSectionProps> = ({
  title,
  subtitle,
  stats = [],
  layout = 'grid',
  showTrends = false,
  backgroundColor = 'grass',
  spacing = 'lg',
  className = '',
  isPreview = false,
}) => {
  const bgColor = brandColors[backgroundColor]
  const textColor = getContrastColor(backgroundColor)

  // Spacing classes
  const getSpacingClasses = () => {
    switch (spacing) {
      case 'none': return 'py-0'
      case 'sm': return 'py-8'
      case 'md': return 'py-12'
      case 'lg': return 'py-16'
      case 'xl': return 'py-24'
      default: return 'py-16'
    }
  }

  // Layout classes
  const getLayoutClasses = () => {
    switch (layout) {
      case 'horizontal':
        return 'flex flex-wrap justify-center divide-x divide-white/20'
      case 'grid':
        return `grid grid-cols-2 lg:grid-cols-${Math.min(stats.length, 4)} gap-6`
      case 'featured':
        return 'flex flex-col lg:flex-row items-center gap-8'
      default:
        return `grid grid-cols-2 lg:grid-cols-${Math.min(stats.length, 4)} gap-6`
    }
  }

  // Trend arrow
  const getTrendIcon = (direction?: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return (
          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        )
      case 'down':
        return (
          <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )
      case 'neutral':
        return (
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        )
      default:
        return null
    }
  }

  if (!stats.length && !isPreview) {
    return null
  }

  return (
    <section 
      className={`
        section-stats
        ${getSpacingClasses()}
        ${className}
        relative overflow-hidden
      `}
      style={{
        backgroundColor: bgColor.hex,
        color: textColor === 'white' ? '#ffffff' : '#1E293B',
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`
                text-lg md:text-xl opacity-90
                ${textColor === 'white' ? 'text-white/80' : 'text-gray-600'}
              `}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Stats */}
        {stats.length > 0 ? (
          <div className={getLayoutClasses()}>
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className={`
                  stat-item text-center
                  ${layout === 'horizontal' ? 'px-8 py-4' : 'py-6'}
                  ${layout === 'featured' && index === 0 ? 'lg:text-left flex-1' : ''}
                  ${layout === 'featured' && index > 0 ? 'text-center' : ''}
                `}
              >
                {/* Icon */}
                {stat.icon && (
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg">
                      <span className="text-2xl">{stat.icon}</span>
                    </div>
                  </div>
                )}

                {/* Value */}
                <div className={`
                  font-bold mb-2
                  ${layout === 'featured' && index === 0 ? 'text-5xl lg:text-6xl' : 'text-3xl lg:text-4xl'}
                `}>
                  {stat.animated ? (
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  ) : (
                    <>
                      {stat.prefix}{stat.value}{stat.suffix}
                    </>
                  )}
                </div>

                {/* Label */}
                <div className={`
                  font-semibold opacity-90 mb-2
                  ${layout === 'featured' && index === 0 ? 'text-xl' : 'text-lg'}
                `}>
                  {stat.label}
                </div>

                {/* Description */}
                {stat.description && (
                  <p className="text-sm opacity-70 leading-relaxed">
                    {stat.description}
                  </p>
                )}

                {/* Trend */}
                {showTrends && stat.trend && (
                  <div className="flex items-center justify-center mt-3 space-x-2">
                    {getTrendIcon(stat.trend.direction)}
                    {stat.trend.percentage && (
                      <span className={`
                        text-sm font-medium
                        ${stat.trend.direction === 'up' ? 'text-green-400' : ''}
                        ${stat.trend.direction === 'down' ? 'text-red-400' : ''}
                        ${stat.trend.direction === 'neutral' ? 'text-gray-400' : ''}
                      `}>
                        {stat.trend.percentage > 0 ? '+' : ''}{stat.trend.percentage}%
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Empty state for preview */
          isPreview && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-20">📊</div>
              <p className="text-lg opacity-60">
                Dodajte statistike da biste videli prikaz
              </p>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default StatsSection