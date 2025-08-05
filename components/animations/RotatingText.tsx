'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/animation-utils'

interface RotatingTextProps {
  words: string[]
  interval?: number
  className?: string
  style?: 'fade' | 'slide' | 'flip' | 'typewriter'
  infinite?: boolean
  startDelay?: number
}

export const RotatingText = ({
  words,
  interval = 3000,
  className = '',
  style = 'fade',
  infinite = true,
  startDelay = 0
}: RotatingTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const textRef = useRef<HTMLSpanElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (words.length <= 1 || prefersReducedMotion()) return

    const startTimer = setTimeout(() => {
      setHasStarted(true)
    }, startDelay)

    return () => clearTimeout(startTimer)
  }, [startDelay, words.length])

  useEffect(() => {
    if (!hasStarted || words.length <= 1) return

    const rotateText = () => {
      setIsAnimating(true)
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % words.length
          if (!infinite && nextIndex === 0) {
            return prevIndex // Stop at the last word if not infinite
          }
          return nextIndex
        })
        setIsAnimating(false)
      }, style === 'typewriter' ? 500 : 200)
    }

    intervalRef.current = setInterval(rotateText, interval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [hasStarted, words.length, interval, infinite, style])

  const getAnimationClass = () => {
    if (!hasStarted || prefersReducedMotion()) return ''
    
    const baseClass = 'transition-all duration-300 ease-in-out'
    
    switch (style) {
      case 'fade':
        return `${baseClass} ${isAnimating ? 'opacity-0' : 'opacity-100'}`
      case 'slide':
        return `${baseClass} ${isAnimating ? 'transform -translate-y-2 opacity-0' : 'transform translate-y-0 opacity-100'}`
      case 'flip':
        return `${baseClass} ${isAnimating ? 'transform rotateX-90 opacity-0' : 'transform rotateX-0 opacity-100'}`
      case 'typewriter':
        return 'typewriter-animation'
      default:
        return baseClass
    }
  }

  if (words.length === 0) return null
  if (words.length === 1) return <span className={className}>{words[0]}</span>

  return (
    <span 
      ref={textRef}
      className={`inline-block ${getAnimationClass()} ${className}`}
      style={{
        minWidth: style === 'typewriter' ? 'auto' : '1ch',
        textAlign: 'left'
      }}
    >
      {words[currentIndex]}
    </span>
  )
}

// Typewriter effect component
interface TypewriterTextProps {
  text: string
  speed?: number
  startDelay?: number
  className?: string
  cursor?: boolean
  onComplete?: () => void
}

export const TypewriterText = ({
  text,
  speed = 50,
  startDelay = 0,
  className = '',
  cursor = true,
  onComplete
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplayText(text)
      setIsComplete(true)
      onComplete?.()
      return
    }

    const startTimer = setTimeout(() => {
      setHasStarted(true)
    }, startDelay)

    return () => clearTimeout(startTimer)
  }, [text, startDelay, onComplete])

  useEffect(() => {
    if (!hasStarted || currentIndex >= text.length) {
      if (currentIndex >= text.length && !isComplete) {
        setIsComplete(true)
        onComplete?.()
      }
      return
    }

    const timer = setTimeout(() => {
      setDisplayText(text.slice(0, currentIndex + 1))
      setCurrentIndex(currentIndex + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [hasStarted, currentIndex, text, speed, isComplete, onComplete])

  return (
    <span className={className}>
      {displayText}
      {cursor && !isComplete && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  )
}

export default RotatingText