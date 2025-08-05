'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { 
  addTouchFeedback, 
  createConfetti, 
  animateHeroText, 
  celebrateSuccess,
  animateQuizFeedback,
  prefersReducedMotion,
  isMobile,
  staggerChildren
} from '@/lib/animation-utils'

// Hero text with animated reveal
interface AnimatedHeroTextProps {
  children: string
  className?: string
  brushStroke?: boolean
  delay?: number
}

export function AnimatedHeroText({ 
  children, 
  className = '', 
  brushStroke = true,
  delay = 0 
}: AnimatedHeroTextProps) {
  const textRef = useRef<HTMLHeadingElement>(null)
  const underlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current || prefersReducedMotion()) return

    const timer = setTimeout(() => {
      animateHeroText(textRef.current!)
      
      // Add brush stroke underline animation
      if (brushStroke && underlineRef.current) {
        setTimeout(() => {
          underlineRef.current!.classList.add('animate-brush-stroke')
        }, children.split(' ').length * 100 + 300)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [children, brushStroke, delay])

  return (
    <div className={`hero-text-container ${className}`}>
      <h1 
        ref={textRef}
        className="hero-text"
        style={{ opacity: prefersReducedMotion() ? 1 : 0 }}
      >
        {children}
      </h1>
      {brushStroke && (
        <div 
          ref={underlineRef}
          className="brush-underline"
          style={{
            position: 'absolute',
            bottom: '-8px',
            left: '0',
            height: '4px',
            background: 'linear-gradient(90deg, var(--color-accent), var(--color-primary))',
            borderRadius: '2px',
            width: '0',
            opacity: 0
          }}
        />
      )}
    </div>
  )
}

// Animated card with hover effects
interface AnimatedCardProps {
  children: ReactNode
  className?: string
  variant?: 'lift' | 'scale' | 'glow'
  disabled?: boolean
  onClick?: () => void
}

export function AnimatedCard({ 
  children, 
  className = '', 
  variant = 'lift',
  disabled = false,
  onClick 
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card || disabled) return

    // Add touch feedback on mobile
    const cleanup = addTouchFeedback(card)

    return cleanup
  }, [disabled])

  const getVariantClass = () => {
    switch (variant) {
      case 'lift':
        return 'animate-card-lift'
      case 'scale':
        return 'hover:animate-scale-in'
      case 'glow':
        return 'hover:animate-pulse'
      default:
        return 'animate-card-lift'
    }
  }

  return (
    <div
      ref={cardRef}
      className={`
        card transition-all duration-300 cursor-pointer
        ${!disabled ? getVariantClass() : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </div>
  )
}

// Animated button with color inversion
interface AnimatedButtonProps {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'accent'
  animation?: 'invert' | 'bounce' | 'pulse'
  disabled?: boolean
  onClick?: () => void
}

export function AnimatedButton({ 
  children, 
  className = '', 
  variant = 'primary',
  animation = 'invert',
  disabled = false,
  onClick 
}: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button || disabled) return

    const cleanup = addTouchFeedback(button)
    return cleanup
  }, [disabled])

  const getVariantClasses = () => {
    const base = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200 focus-ring'
    
    switch (variant) {
      case 'primary':
        return `${base} bg-primary-600 text-white border-2 border-primary-600`
      case 'secondary':
        return `${base} bg-secondary-600 text-white border-2 border-secondary-600`
      case 'accent':
        return `${base} bg-accent-600 text-white border-2 border-accent-600`
      default:
        return `${base} bg-primary-600 text-white border-2 border-primary-600`
    }
  }

  const getAnimationClass = () => {
    if (disabled) return ''
    
    switch (animation) {
      case 'invert':
        return 'animate-button-invert'
      case 'bounce':
        return 'hover:animate-bounce'
      case 'pulse':
        return 'hover:animate-pulse'
      default:
        return 'animate-button-invert'
    }
  }

  return (
    <button
      ref={buttonRef}
      className={`
        ${getVariantClasses()}
        ${getAnimationClass()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        btn-press
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// Floating decorative elements
interface FloatingElementProps {
  children: ReactNode
  className?: string
  animation?: 'gentle' | 'bounce' | 'letters'
  delay?: number
}

export function FloatingElement({ 
  children, 
  className = '', 
  animation = 'gentle',
  delay = 0 
}: FloatingElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current || prefersReducedMotion() || isMobile()) return

    const timer = setTimeout(() => {
      const animationClass = {
        gentle: 'animate-gentle-float',
        bounce: 'animate-float-bounce',
        letters: 'animate-letter-float'
      }[animation]

      elementRef.current!.classList.add(animationClass)
    }, delay)

    return () => clearTimeout(timer)
  }, [animation, delay])

  return (
    <div
      ref={elementRef}
      className={`floating-element ${className}`}
      style={{ 
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </div>
  )
}

// Quiz question with feedback animation
interface QuizQuestionProps {
  children: ReactNode
  className?: string
  isCorrect?: boolean | null
  showFeedback?: boolean
  onFeedbackComplete?: () => void
}

export function QuizQuestion({ 
  children, 
  className = '', 
  isCorrect = null,
  showFeedback = false,
  onFeedbackComplete 
}: QuizQuestionProps) {
  const questionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showFeedback || isCorrect === null || !questionRef.current) return

    animateQuizFeedback(questionRef.current, isCorrect)

    if (isCorrect) {
      // Add confetti for correct answers
      createConfetti(questionRef.current, {
        count: 30,
        colors: ['#8AF76D', '#83E6FF', '#FFEA8C'],
        duration: 2000
      })
    }

    const timer = setTimeout(() => {
      onFeedbackComplete?.()
    }, isCorrect ? 1000 : 500)

    return () => clearTimeout(timer)
  }, [showFeedback, isCorrect, onFeedbackComplete])

  return (
    <div
      ref={questionRef}
      className={`
        quiz-question p-6 rounded-lg border-2 transition-all duration-300
        ${isCorrect === true ? 'border-green-400 bg-green-50' : ''}
        ${isCorrect === false ? 'border-red-400 bg-red-50' : ''}
        ${isCorrect === null ? 'border-gray-200 bg-white' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

// Success celebration component
interface CelebrationProps {
  trigger?: boolean
  children: ReactNode
  className?: string
  confetti?: boolean
  onComplete?: () => void
}

export function Celebration({ 
  trigger = false, 
  children, 
  className = '',
  confetti = true,
  onComplete 
}: CelebrationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trigger || !elementRef.current) return

    const element = elementRef.current
    
    if (confetti) {
      celebrateSuccess(element)
    } else {
      element.classList.add('animate-celebration')
      setTimeout(() => {
        element.classList.remove('animate-celebration')
      }, 800)
    }

    const timer = setTimeout(() => {
      onComplete?.()
    }, 1200)

    return () => clearTimeout(timer)
  }, [trigger, confetti, onComplete])

  return (
    <div
      ref={elementRef}
      className={`celebration-container ${className}`}
    >
      {children}
    </div>
  )
}

// Staggered list animation
interface StaggeredListProps {
  children: ReactNode[]
  className?: string
  animation?: 'fadeIn' | 'slideUp' | 'scaleIn'
  staggerDelay?: number
  startDelay?: number
}

export function StaggeredList({ 
  children, 
  className = '',
  animation = 'slideUp',
  staggerDelay = 100,
  startDelay = 0 
}: StaggeredListProps) {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!listRef.current || prefersReducedMotion()) return

    const timer = setTimeout(() => {
      const animationClass = {
        fadeIn: 'animate-fade-in',
        slideUp: 'animate-slide-up',
        scaleIn: 'animate-scale-in'
      }[animation]

      staggerChildren(listRef.current!, animationClass, staggerDelay)
    }, startDelay)

    return () => clearTimeout(timer)
  }, [animation, staggerDelay, startDelay])

  return (
    <div
      ref={listRef}
      className={`staggered-list ${className}`}
    >
      {children.map((child, index) => (
        <div
          key={index}
          className="stagger-item"
          style={{
            opacity: prefersReducedMotion() ? 1 : 0,
            transform: prefersReducedMotion() ? 'none' : 'translateY(20px)'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

// Loading skeleton with animation
interface LoadingSkeletonProps {
  lines?: number
  className?: string
  width?: string[]
}

export function LoadingSkeleton({ 
  lines = 3, 
  className = '',
  width = ['100%', '100%', '60%']
}: LoadingSkeletonProps) {
  return (
    <div className={`skeleton-container ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="skeleton-line animate-skeleton"
          style={{
            height: '16px',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            borderRadius: '4px',
            marginBottom: '8px',
            width: width[index] || '100%'
          }}
        />
      ))}
    </div>
  )
}

// Progress bar with animation
interface AnimatedProgressProps {
  progress: number
  className?: string
  color?: string
  showPercentage?: boolean
  duration?: number
}

export function AnimatedProgress({ 
  progress, 
  className = '',
  color = 'var(--color-primary)',
  showPercentage = true,
  duration = 1000
}: AnimatedProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!fillRef.current) return

    const fill = fillRef.current
    fill.style.width = '0%'
    fill.style.backgroundColor = color

    const timer = setTimeout(() => {
      fill.style.width = `${progress}%`
      fill.style.transition = `width ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`
    }, 100)

    return () => clearTimeout(timer)
  }, [progress, color, duration])

  return (
    <div
      ref={progressRef}
      className={`progress-container relative h-4 bg-gray-200 rounded-full overflow-hidden ${className}`}
    >
      <div
        ref={fillRef}
        className="progress-fill h-full rounded-full relative"
      />
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700">
          {progress}%
        </div>
      )}
    </div>
  )
}