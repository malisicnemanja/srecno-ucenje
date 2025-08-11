'use client'

import { ReactNode, useEffect, useRef, useCallback } from 'react'
import { addTouchFeedback, prefersReducedMotion, isMobile } from '@/lib/animation-utils'

interface OptimizedPulseButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  intensity?: 'subtle' | 'medium' | 'strong'
  animation?: 'pulse' | 'glow' | 'bounce' | 'none'
}

export default function OptimizedPulseButton({
  children,
  className = '',
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  intensity = 'medium',
  animation = 'pulse'
}: OptimizedPulseButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Mapiranje na naše nove CSS klase
  const variants = {
    primary: 'btn-hero', // Sun color with Filled → Outline animation
    secondary: 'btn-hero-grass', // Grass color variant  
    accent: 'btn-cta' // Heart color with scale effect
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const currentVariant = variants[variant]
  const currentSize = sizes[size]

  const getAnimationClasses = useCallback(() => {
    if (disabled || prefersReducedMotion() || animation === 'none') return ''

    switch (animation) {
      case 'pulse':
        return intensity === 'subtle' ? 'animate-pulse-subtle' :
               intensity === 'medium' ? 'animate-pulse' :
               'animate-pulse-strong'
      case 'glow':
        return 'animate-glow'
      case 'bounce':
        return 'hover:animate-bounce-gentle'
      default:
        return ''
    }
  }, [disabled, animation, intensity])

  useEffect(() => {
    const button = buttonRef.current
    if (!button || disabled || prefersReducedMotion()) return

    // Add touch feedback
    const cleanup = addTouchFeedback(button)

    // Add animation classes based on intensity and animation type
    const animationClasses = getAnimationClasses()
    if (animationClasses) {
      button.classList.add(...animationClasses.split(' '))
    }

    return () => {
      cleanup?.()
      if (animationClasses) {
        button.classList.remove(...animationClasses.split(' '))
      }
    }
  }, [disabled, intensity, animation, getAnimationClasses])

  const getShadowIntensity = () => {
    if (disabled || isMobile()) return ''
    
    switch (intensity) {
      case 'subtle':
        return 'shadow-sm hover:shadow-md'
      case 'medium':
        return 'shadow-md hover:shadow-lg'
      case 'strong':
        return 'shadow-lg hover:shadow-xl'
      default:
        return 'shadow-md hover:shadow-lg'
    }
  }

  return (
    <button
      ref={buttonRef}
      className={`
        btn ${currentVariant}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        willChange: 'transform, box-shadow',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Ripple effect on click */}
      <span 
        className="absolute inset-0 rounded-lg bg-white opacity-0 pointer-events-none ripple-effect"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
          transform: 'scale(0)',
          transition: 'transform 0.3s, opacity 0.3s'
        }}
      />
    </button>
  )
}

// Icon button variant
export function OptimizedIconButton({
  icon,
  children,
  className = '',
  onClick,
  variant = 'primary',
  iconPosition = 'left',
  ...props
}: {
  icon: ReactNode
  children?: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'accent'
  iconPosition?: 'left' | 'right'
} & Omit<OptimizedPulseButtonProps, 'children' | 'className' | 'onClick' | 'variant'>) {
  return (
    <OptimizedPulseButton
      className={className}
      onClick={onClick}
      variant={variant}
      {...props}
    >
      <div className={`flex items-center gap-2 ${!children ? 'justify-center' : ''}`}>
        {iconPosition === 'left' && (
          <span className="icon-hover">
            {icon}
          </span>
        )}
        
        {children && <span>{children}</span>}
        
        {iconPosition === 'right' && (
          <span className="icon-hover">
            {icon}
          </span>
        )}
      </div>
    </OptimizedPulseButton>
  )
}

// Floating Action Button
export function OptimizedFloatingActionButton({
  icon,
  onClick,
  className = '',
  variant = 'primary',
  position = 'bottom-right'
}: {
  icon: ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'accent'
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const positions = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  }

  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-500/25',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white shadow-secondary-500/25',
    accent: 'bg-accent-600 hover:bg-accent-700 text-white shadow-accent-500/25'
  }

  useEffect(() => {
    const button = buttonRef.current
    if (!button || prefersReducedMotion()) return

    button.classList.add('animate-gentle-float')
    const cleanup = addTouchFeedback(button)

    return cleanup
  }, [])

  return (
    <button
      ref={buttonRef}
      className={`
        fixed w-14 h-14 rounded-full shadow-lg z-50
        flex items-center justify-center transition-all duration-300
        transform hover:scale-110 active:scale-95
        focus:outline-none focus:ring-4 focus:ring-offset-2
        btn-press touch-feedback
        ${positions[position]}
        ${variants[variant]}
        ${className}
      `}
      onClick={onClick}
      style={{
        willChange: 'transform, box-shadow',
        backfaceVisibility: 'hidden'
      }}
    >
      <span className="icon-hover text-xl">
        {icon}
      </span>
    </button>
  )
}

// CTA Button with special effects
export function OptimizedCTAButton({
  children,
  className = '',
  onClick,
  urgent = false,
  success = false,
  ...props
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  urgent?: boolean
  success?: boolean
} & Omit<OptimizedPulseButtonProps, 'children' | 'className' | 'onClick'>) {
  const getVariant = () => {
    if (success) return 'primary'
    if (urgent) return 'accent'
    return 'primary'
  }

  const getAnimation = () => {
    if (success) return 'glow'
    if (urgent) return 'pulse'
    return 'pulse'
  }

  const getIntensity = () => {
    if (urgent) return 'strong'
    if (success) return 'medium'
    return 'medium'
  }

  return (
    <OptimizedPulseButton
      variant={getVariant()}
      animation={getAnimation()}
      intensity={getIntensity()}
      size="lg"
      className={`
        font-bold uppercase tracking-wide
        ${urgent ? 'animate-wiggle-on-hover' : ''}
        ${success ? 'success-glow' : ''}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </OptimizedPulseButton>
  )
}