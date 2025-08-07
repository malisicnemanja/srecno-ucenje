'use client'

import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import { BrandColor, brandColors, getContrastColor } from '@/lib/color-rotation'
import { useState, useEffect } from 'react'

// Type definitions
interface ButtonProps {
  text: string
  href: string
  variant: 'primary' | 'secondary' | 'outline'
}

interface FloatingElement {
  id: string
  type: 'circle' | 'triangle' | 'square' | 'star' | 'wave'
  position: {
    top?: string
    right?: string
    bottom?: string
    left?: string
  }
  size: 'sm' | 'md' | 'lg'
  color: BrandColor
  animation?: 'float' | 'pulse' | 'rotate' | 'drift'
}

interface StatItem {
  value: string
  label: string
  suffix?: string
  animated?: boolean
}

interface HeroSectionProps {
  layout: 'split-left' | 'split-right' | 'centered' | 'full-stats'
  title: string
  alternatingWords?: string[]
  subtitle?: string
  buttons?: ButtonProps[]
  visual?: {
    type: 'image' | 'illustration' | 'video'
    src: string
    alt?: string
  }
  floatingElements?: FloatingElement[]
  stats?: StatItem[]
  backgroundColor?: BrandColor
}

// Legacy props interface for backward compatibility
interface LegacyHeroProps {
  title: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage?: any
  gradient?: string
}

type HeroProps = HeroSectionProps | LegacyHeroProps

// Type guard to check if props are legacy
function isLegacyProps(props: HeroProps): props is LegacyHeroProps {
  return 'ctaText' in props && !('layout' in props)
}

// Floating SVG Elements Component
function FloatingElements({ elements }: { elements: FloatingElement[] }) {
  const getSVGElement = (type: FloatingElement['type'], color: BrandColor, size: string) => {
    const colorHex = brandColors[color].hex
    
    switch (type) {
      case 'circle':
        return (
          <svg className={size} viewBox="0 0 24 24" fill={colorHex}>
            <circle cx="12" cy="12" r="10" opacity="0.6" />
          </svg>
        )
      case 'triangle':
        return (
          <svg className={size} viewBox="0 0 24 24" fill={colorHex}>
            <path d="M12 2 L22 20 L2 20 Z" opacity="0.6" />
          </svg>
        )
      case 'square':
        return (
          <svg className={size} viewBox="0 0 24 24" fill={colorHex}>
            <rect x="4" y="4" width="16" height="16" rx="2" opacity="0.6" />
          </svg>
        )
      case 'star':
        return (
          <svg className={size} viewBox="0 0 24 24" fill={colorHex}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" opacity="0.6" />
          </svg>
        )
      case 'wave':
        return (
          <svg className={size} viewBox="0 0 24 24" fill="none" stroke={colorHex} strokeWidth="2">
            <path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4 4 6 0" opacity="0.6" />
          </svg>
        )
      default:
        return null
    }
  }

  const getSizeClass = (size: FloatingElement['size']) => {
    switch (size) {
      case 'sm': return 'w-8 h-8 md:w-12 md:h-12'
      case 'md': return 'w-12 h-12 md:w-16 md:h-16'
      case 'lg': return 'w-16 h-16 md:w-20 md:h-20'
    }
  }

  const getAnimationClass = (animation?: FloatingElement['animation']) => {
    switch (animation) {
      case 'float': return 'animate-bounce'
      case 'pulse': return 'animate-pulse'
      case 'rotate': return 'animate-spin'
      case 'drift': return 'animate-pulse'
      default: return ''
    }
  }

  return (
    <>
      {elements.map((element) => (
        <div
          key={element.id}
          className={`absolute ${getAnimationClass(element.animation)} pointer-events-none z-10`}
          style={{
            top: element.position.top,
            right: element.position.right,
            bottom: element.position.bottom,
            left: element.position.left,
          }}
        >
          {getSVGElement(element.type, element.color, getSizeClass(element.size))}
        </div>
      ))}
    </>
  )
}

// Animated Text Component
function AnimatedText({ words, interval = 3000 }: { words: string[]; interval?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (words.length <= 1) return
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, interval)

    return () => clearInterval(timer)
  }, [words.length, interval])

  if (words.length === 0) return null

  return (
    <span className="inline-block transition-all duration-500 ease-in-out text-brand-sky">
      {words[currentIndex]}
    </span>
  )
}

// Animated Stats Component
function AnimatedStats({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-white mb-2">
            {stat.animated ? (
              <AnimatedCounter target={parseInt(stat.value)} suffix={stat.suffix} />
            ) : (
              `${stat.value}${stat.suffix || ''}`
            )}
          </div>
          <div className="text-white/80 text-sm md:text-base">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}

// Animated Counter Component
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const increment = target / 50
    const timer = setInterval(() => {
      setCount(prev => {
        const next = prev + increment
        return next >= target ? target : next
      })
    }, 50)

    return () => clearInterval(timer)
  }, [target])

  return <span>{Math.floor(count)}{suffix}</span>
}

// Button Component
function HeroButton({ button, bgColor }: { button: ButtonProps; bgColor: BrandColor }) {
  const getButtonClasses = (variant: ButtonProps['variant']) => {
    const baseClasses = 'px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold transition-all duration-200 hover:transform hover:-translate-y-0.5'
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-white text-gray-900 hover:bg-gray-50 shadow-lg`
      case 'secondary':
        return `${baseClasses} bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900`
      case 'outline':
        return `${baseClasses} bg-transparent border border-white/30 text-white hover:border-white hover:bg-white/10`
    }
  }

  return (
    <SafeLink
      href={button.href}
      className={getButtonClasses(button.variant)}
    >
      {button.text}
    </SafeLink>
  )
}

export default function HeroSection(props: HeroProps) {
  // Handle legacy props
  if (isLegacyProps(props)) {
    const { title, subtitle, ctaText, ctaLink, secondaryCtaText, secondaryCtaLink, gradient } = props
    
    return (
      <section className={`py-20 md:py-32 ${gradient === 'bg-brand-grass-soft' ? 'bg-brand-grass bg-opacity-10' : gradient}`}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
                {subtitle}
              </p>
            )}
            {(ctaText || secondaryCtaText) && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {ctaText && ctaLink && (
                  <SafeLink
                    href={ctaLink || '/'}
                    className="btn-primary px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 hover:transform hover:-translate-y-0.5"
                  >
                    {ctaText}
                  </SafeLink>
                )}
                {secondaryCtaText && secondaryCtaLink && (
                  <SafeLink
                    href={secondaryCtaLink || '/'}
                    className="text-brand-grass font-semibold hover:underline transition-all duration-200 flex items-center space-x-1"
                  >
                    <span>{secondaryCtaText}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </SafeLink>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // New props handling
  const {
    layout,
    title,
    alternatingWords = [],
    subtitle,
    buttons = [],
    visual,
    floatingElements = [],
    stats = [],
    backgroundColor = 'sky'
  } = props as HeroSectionProps

  const bgColorData = brandColors[backgroundColor]
  const textColor = getContrastColor(backgroundColor)
  const textColorClass = textColor === 'white' ? 'text-white' : 'text-gray-900'
  const subtitleColorClass = textColor === 'white' ? 'text-white/80' : 'text-gray-600'

  // Split layouts (split-left and split-right)
  if (layout === 'split-left' || layout === 'split-right') {
    const isLeftLayout = layout === 'split-left'
    
    return (
      <section 
        className="relative py-20 md:py-32 overflow-hidden"
        style={{ backgroundColor: bgColorData.hex }}
      >
        {floatingElements.length > 0 && <FloatingElements elements={floatingElements} />}
        
        <div className="container mx-auto px-4 max-w-7xl">
          <div className={`grid lg:grid-cols-5 gap-12 items-center ${!isLeftLayout ? 'lg:grid-flow-col-dense' : ''}`}>
            {/* Text Content */}
            <div className={`lg:col-span-2 ${!isLeftLayout ? 'lg:col-start-4' : ''} space-y-6`}>
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${textColorClass}`}>
                {alternatingWords.length > 0 ? (
                  <>
                    {title} <AnimatedText words={alternatingWords} />
                  </>
                ) : (
                  title
                )}
              </h1>
              
              {subtitle && (
                <p className={`text-xl md:text-2xl leading-relaxed ${subtitleColorClass}`}>
                  {subtitle}
                </p>
              )}
              
              {buttons.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4">
                  {buttons.map((button, index) => (
                    <HeroButton key={index} button={button} bgColor={backgroundColor} />
                  ))}
                </div>
              )}
            </div>
            
            {/* Visual Content */}
            {visual && (
              <div className={`lg:col-span-3 ${!isLeftLayout ? 'lg:col-start-1' : ''}`}>
                {visual.type === 'image' && (
                  <img 
                    src={visual.src}
                    alt={visual.alt || ''}
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                )}
                {visual.type === 'video' && (
                  <video 
                    src={visual.src}
                    className="w-full h-auto rounded-lg shadow-2xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}
                {visual.type === 'illustration' && (
                  <div className="w-full h-96 rounded-lg bg-white/10 flex items-center justify-center">
                    <span className={`text-6xl ${textColorClass}`}>🎨</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Centered layout
  if (layout === 'centered') {
    return (
      <section 
        className="relative py-20 md:py-32 overflow-hidden"
        style={{ backgroundColor: bgColorData.hex }}
      >
        {floatingElements.length > 0 && <FloatingElements elements={floatingElements} />}
        
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className={`text-4xl md:text-5xl lg:text-7xl font-bold leading-tight ${textColorClass}`}>
              {alternatingWords.length > 0 ? (
                <>
                  {title} <AnimatedText words={alternatingWords} />
                </>
              ) : (
                title
              )}
            </h1>
            
            {subtitle && (
              <p className={`text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto ${subtitleColorClass}`}>
                {subtitle}
              </p>
            )}
            
            {buttons.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {buttons.map((button, index) => (
                  <HeroButton key={index} button={button} bgColor={backgroundColor} />
                ))}
              </div>
            )}
            
            {visual && (
              <div className="mt-12">
                {visual.type === 'image' && (
                  <img 
                    src={visual.src}
                    alt={visual.alt || ''}
                    className="w-full max-w-2xl mx-auto h-auto rounded-lg shadow-2xl"
                  />
                )}
                {visual.type === 'video' && (
                  <video 
                    src={visual.src}
                    className="w-full max-w-2xl mx-auto h-auto rounded-lg shadow-2xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Full stats layout
  if (layout === 'full-stats') {
    return (
      <section 
        className="relative py-20 md:py-32 overflow-hidden"
        style={{ backgroundColor: bgColorData.hex }}
      >
        {floatingElements.length > 0 && <FloatingElements elements={floatingElements} />}
        
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-8">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${textColorClass}`}>
              {alternatingWords.length > 0 ? (
                <>
                  {title} <AnimatedText words={alternatingWords} />
                </>
              ) : (
                title
              )}
            </h1>
            
            {subtitle && (
              <p className={`text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto ${subtitleColorClass}`}>
                {subtitle}
              </p>
            )}
            
            {buttons.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {buttons.map((button, index) => (
                  <HeroButton key={index} button={button} bgColor={backgroundColor} />
                ))}
              </div>
            )}
            
            {stats.length > 0 && (
              <AnimatedStats stats={stats} />
            )}
            
            {visual && (
              <div className="mt-16">
                {visual.type === 'image' && (
                  <img 
                    src={visual.src}
                    alt={visual.alt || ''}
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                )}
                {visual.type === 'video' && (
                  <video 
                    src={visual.src}
                    className="w-full h-auto rounded-lg shadow-2xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Fallback
  return null
}

// Export individual components for standalone usage
export { FloatingElements, AnimatedText, AnimatedStats, HeroButton }

// Export types for external usage
export type { HeroSectionProps, ButtonProps, FloatingElement, StatItem }