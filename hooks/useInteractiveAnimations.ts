'use client'

import { useRef, useCallback, useEffect } from 'react'
import { prefersReducedMotion } from '@/lib/animation-utils'

interface TiltOptions {
  maxTilt?: number
  perspective?: number
  scale?: number
  speed?: number
  glare?: boolean
  maxGlare?: number
}

interface RippleOptions {
  color?: string
  duration?: number
  size?: number
}

interface DragOptions {
  bounds?: { left: number; right: number; top: number; bottom: number }
  elastic?: boolean
  momentum?: boolean
}

// 3D Tilt effect hook
export const useTiltEffect = (options: TiltOptions = {}) => {
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.05,
    speed = 300,
    glare = false,
    maxGlare = 0.2
  } = options

  const elementRef = useRef<HTMLElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!elementRef.current || prefersReducedMotion()) return

    const element = elementRef.current
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateX = (mouseY / (rect.height / 2)) * maxTilt
    const rotateY = (mouseX / (rect.width / 2)) * maxTilt

    element.style.transition = `transform ${speed}ms cubic-bezier(0.25, 0.25, 0.25, 1)`
    element.style.transform = `
      perspective(${perspective}px)
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
      scale(${scale})
      translate3d(0, 0, 0)
    `

    if (glare) {
      const glareElement = element.querySelector('.glare') as HTMLElement
      if (glareElement) {
        const glareX = (mouseX / rect.width) * 100
        const glareY = (mouseY / rect.height) * 100
        const glareOpacity = Math.min(
          Math.sqrt(mouseX * mouseX + mouseY * mouseY) / 
          Math.sqrt(rect.width * rect.width + rect.height * rect.height) * 
          maxGlare, 
          maxGlare
        )

        glareElement.style.background = `
          radial-gradient(circle at ${50 + glareX}% ${50 + glareY}%, 
          rgba(255,255,255,${glareOpacity}) 0%, 
          transparent 50%)
        `
      }
    }
  }, [maxTilt, perspective, scale, speed, glare, maxGlare])

  const handleMouseLeave = useCallback(() => {
    if (!elementRef.current || prefersReducedMotion()) return

    const element = elementRef.current
    element.style.transition = `transform ${speed}ms cubic-bezier(0.25, 0.25, 0.25, 1)`
    element.style.transform = `
      perspective(${perspective}px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
      translate3d(0, 0, 0)
    `

    if (glare) {
      const glareElement = element.querySelector('.glare') as HTMLElement
      if (glareElement) {
        glareElement.style.background = 'transparent'
      }
    }
  }, [perspective, speed, glare])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return { ref: elementRef }
}

// Click ripple effect hook
export const useRippleEffect = (options: RippleOptions = {}) => {
  const {
    color = 'rgba(255, 255, 255, 0.6)',
    duration = 600,
    size = 100
  } = options

  const elementRef = useRef<HTMLElement>(null)

  const createRipple = useCallback((e: MouseEvent | TouchEvent) => {
    if (!elementRef.current || prefersReducedMotion()) return

    const element = elementRef.current
    const rect = element.getBoundingClientRect()
    
    // Get click position
    let clientX: number, clientY: number
    if (e instanceof MouseEvent) {
      clientX = e.clientX
      clientY = e.clientY
    } else {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    }

    const x = clientX - rect.left
    const y = clientY - rect.top

    // Create ripple element
    const ripple = document.createElement('span')
    ripple.style.position = 'absolute'
    ripple.style.borderRadius = '50%'
    ripple.style.background = color
    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x - size / 2}px`
    ripple.style.top = `${y - size / 2}px`
    ripple.style.pointerEvents = 'none'
    ripple.style.transform = 'scale(0)'
    ripple.style.animation = `ripple-effect ${duration}ms cubic-bezier(0.25, 0.25, 0.25, 1)`
    ripple.style.zIndex = '1'

    // Add CSS animation if not already present
    if (!document.getElementById('ripple-styles')) {
      const style = document.createElement('style')
      style.id = 'ripple-styles'
      style.textContent = `
        @keyframes ripple-effect {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
      `
      document.head.appendChild(style)
    }

    // Make sure element has relative positioning
    if (getComputedStyle(element).position === 'static') {
      element.style.position = 'relative'
    }
    
    element.style.overflow = 'hidden'
    element.appendChild(ripple)

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple)
      }
    }, duration)
  }, [color, duration, size])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.addEventListener('click', createRipple as EventListener)
    element.addEventListener('touchstart', createRipple as EventListener)

    return () => {
      element.removeEventListener('click', createRipple as EventListener)
      element.removeEventListener('touchstart', createRipple as EventListener)
    }
  }, [createRipple])

  return { ref: elementRef }
}

// Drag animation hook
export const useDragAnimation = (options: DragOptions = {}) => {
  const {
    bounds,
    elastic = true,
    momentum = false
  } = options

  const elementRef = useRef<HTMLElement>(null)
  const isDragging = useRef(false)
  const startPos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const lastTime = useRef(0)

  const handleStart = useCallback((e: MouseEvent | TouchEvent) => {
    if (!elementRef.current || prefersReducedMotion()) return

    isDragging.current = true
    lastTime.current = Date.now()

    let clientX: number, clientY: number
    if (e instanceof MouseEvent) {
      clientX = e.clientX
      clientY = e.clientY
    } else {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    }

    startPos.current = { x: clientX, y: clientY }
    
    const element = elementRef.current
    element.style.cursor = 'grabbing'
    element.style.userSelect = 'none'
    
    e.preventDefault()
  }, [])

  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging.current || !elementRef.current) return

    let clientX: number, clientY: number
    if (e instanceof MouseEvent) {
      clientX = e.clientX
      clientY = e.clientY
    } else {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    }

    const deltaX = clientX - startPos.current.x
    const deltaY = clientY - startPos.current.y

    // Calculate velocity for momentum
    const now = Date.now()
    const timeDelta = now - lastTime.current
    if (timeDelta > 0) {
      velocity.current.x = (deltaX - currentPos.current.x) / timeDelta * 16
      velocity.current.y = (deltaY - currentPos.current.y) / timeDelta * 16
    }
    lastTime.current = now

    currentPos.current = { x: deltaX, y: deltaY }

    // Apply bounds if specified
    let newX = deltaX
    let newY = deltaY

    if (bounds) {
      newX = Math.max(bounds.left, Math.min(bounds.right, deltaX))
      newY = Math.max(bounds.top, Math.min(bounds.bottom, deltaY))
    }

    const element = elementRef.current
    element.style.transform = `translate3d(${newX}px, ${newY}px, 0)`

    e.preventDefault()
  }, [bounds])

  const handleEnd = useCallback(() => {
    if (!isDragging.current || !elementRef.current) return

    isDragging.current = false
    const element = elementRef.current
    element.style.cursor = 'grab'
    element.style.userSelect = 'auto'

    if (elastic) {
      // Snap back to original position
      element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.25, 0.25, 1)'
      element.style.transform = 'translate3d(0, 0, 0)'
      
      setTimeout(() => {
        element.style.transition = ''
      }, 300)
    } else if (momentum && (Math.abs(velocity.current.x) > 1 || Math.abs(velocity.current.y) > 1)) {
      // Apply momentum
      const finalX = currentPos.current.x + velocity.current.x * 10
      const finalY = currentPos.current.y + velocity.current.y * 10
      
      element.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.25, 0.25, 1)'
      element.style.transform = `translate3d(${finalX}px, ${finalY}px, 0)`
      
      setTimeout(() => {
        element.style.transition = ''
        if (elastic) {
          element.style.transform = 'translate3d(0, 0, 0)'
        }
      }, 800)
    }

    currentPos.current = { x: 0, y: 0 }
    velocity.current = { x: 0, y: 0 }
  }, [elastic, momentum])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.style.cursor = 'grab'
    element.style.touchAction = 'none'

    // Mouse events
    element.addEventListener('mousedown', handleStart as EventListener)
    document.addEventListener('mousemove', handleMove as EventListener)
    document.addEventListener('mouseup', handleEnd)

    // Touch events
    element.addEventListener('touchstart', handleStart as EventListener)
    document.addEventListener('touchmove', handleMove as EventListener)
    document.addEventListener('touchend', handleEnd)

    return () => {
      element.removeEventListener('mousedown', handleStart as EventListener)
      document.removeEventListener('mousemove', handleMove as EventListener)
      document.removeEventListener('mouseup', handleEnd)
      
      element.removeEventListener('touchstart', handleStart as EventListener)
      document.removeEventListener('touchmove', handleMove as EventListener)
      document.removeEventListener('touchend', handleEnd)
    }
  }, [handleStart, handleMove, handleEnd])

  return { ref: elementRef }
}

// Touch feedback hook
export const useTouchFeedback = () => {
  const elementRef = useRef<HTMLElement>(null)

  const handleTouchStart = useCallback(() => {
    if (!elementRef.current || prefersReducedMotion()) return

    const element = elementRef.current
    element.style.transform = 'scale(0.95) translate3d(0, 0, 0)'
    element.style.transition = 'transform 0.1s ease-out'
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!elementRef.current) return

    const element = elementRef.current
    element.style.transform = 'scale(1) translate3d(0, 0, 0)'
    element.style.transition = 'transform 0.1s ease-out'
  }, [])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.addEventListener('touchstart', handleTouchStart)
    element.addEventListener('touchend', handleTouchEnd)
    element.addEventListener('touchcancel', handleTouchEnd)

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchend', handleTouchEnd)
      element.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchEnd])

  return { ref: elementRef }
}

export default {
  useTiltEffect,
  useRippleEffect,
  useDragAnimation,
  useTouchFeedback
}