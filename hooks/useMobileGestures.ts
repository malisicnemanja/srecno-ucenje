'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { prefersReducedMotion } from '@/lib/animation-utils'

interface SwipeOptions {
  threshold?: number
  velocity?: number
  directional?: boolean
  preventDefault?: boolean
}

interface SwipeResult {
  direction: 'left' | 'right' | 'up' | 'down' | null
  distance: number
  velocity: number
  duration: number
}

interface PullToRefreshOptions {
  threshold?: number
  resistance?: number
  snapBackDuration?: number
  onRefresh?: () => Promise<void>
}

interface LongPressOptions {
  delay?: number
  moveThreshold?: number
}

interface PinchZoomOptions {
  minZoom?: number
  maxZoom?: number
  doubleTapZoom?: boolean
  wheelZoom?: boolean
}

// Swipe gesture hook
export const useSwipeGesture = (
  onSwipe: (result: SwipeResult) => void,
  options: SwipeOptions = {}
) => {
  const {
    threshold = 50,
    velocity = 0.3,
    directional = true,
    preventDefault = true
  } = options

  const elementRef = useRef<HTMLElement>(null)
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (preventDefault) e.preventDefault()
    
    const touch = e.touches[0]
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }
  }, [preventDefault])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStart.current) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStart.current.x
    const deltaY = touch.clientY - touchStart.current.y
    const duration = Date.now() - touchStart.current.time
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    if (distance < threshold) return

    const velocityX = Math.abs(deltaX) / duration
    const velocityY = Math.abs(deltaY) / duration
    const maxVelocity = Math.max(velocityX, velocityY)

    if (maxVelocity < velocity) return

    let direction: SwipeResult['direction'] = null

    if (directional) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? 'right' : 'left'
      } else {
        direction = deltaY > 0 ? 'down' : 'up'
      }
    } else {
      // Non-directional - just return the primary direction
      const primaryDelta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY
      if (primaryDelta === deltaX) {
        direction = deltaX > 0 ? 'right' : 'left'
      } else {
        direction = deltaY > 0 ? 'down' : 'up'
      }
    }

    onSwipe({
      direction,
      distance,
      velocity: maxVelocity,
      duration
    })

    touchStart.current = null
  }, [onSwipe, threshold, velocity, directional])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.addEventListener('touchstart', handleTouchStart, { passive: !preventDefault })
    element.addEventListener('touchend', handleTouchEnd, { passive: !preventDefault })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchEnd, preventDefault])

  return { ref: elementRef }
}

// Pull to refresh hook
export const usePullToRefresh = (options: PullToRefreshOptions = {}) => {
  const {
    threshold = 80,
    resistance = 2.5,
    snapBackDuration = 300,
    onRefresh
  } = options

  const elementRef = useRef<HTMLElement>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isPulling, setIsPulling] = useState(false)
  
  const touchStart = useRef<{ y: number; scrollTop: number } | null>(null)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const element = elementRef.current
    if (!element) return

    const touch = e.touches[0]
    touchStart.current = {
      y: touch.clientY,
      scrollTop: element.scrollTop
    }
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStart.current || isRefreshing) return

    const element = elementRef.current
    if (!element) return

    const touch = e.touches[0]
    const deltaY = touch.clientY - touchStart.current.y

    // Only allow pull down when at the top
    if (touchStart.current.scrollTop > 0 || deltaY < 0) {
      setIsPulling(false)
      setPullDistance(0)
      return
    }

    const pullDistance = Math.max(0, deltaY / resistance)
    
    if (pullDistance > 10) {
      setIsPulling(true)
      setPullDistance(pullDistance)
      
      if (!prefersReducedMotion()) {
        element.style.transform = `translateY(${pullDistance}px)`
        element.style.transition = 'none'
      }
      
      e.preventDefault()
    }
  }, [isRefreshing, resistance])

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling || isRefreshing) return

    const element = elementRef.current
    if (!element) return

    setIsPulling(false)

    if (pullDistance >= threshold && onRefresh) {
      setIsRefreshing(true)
      
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
      }
    }

    // Snap back animation
    if (!prefersReducedMotion()) {
      element.style.transition = `transform ${snapBackDuration}ms cubic-bezier(0.25, 0.25, 0.25, 1)`
      element.style.transform = 'translateY(0)'
    }

    setPullDistance(0)
  }, [isPulling, isRefreshing, pullDistance, threshold, onRefresh, snapBackDuration])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  return {
    ref: elementRef,
    isRefreshing,
    isPulling,
    pullDistance,
    pullProgress: Math.min(pullDistance / threshold, 1)
  }
}

// Long press gesture hook
export const useLongPress = (
  onLongPress: () => void,
  options: LongPressOptions = {}
) => {
  const {
    delay = 500,
    moveThreshold = 10
  } = options

  const elementRef = useRef<HTMLElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const startPos = useRef<{ x: number; y: number } | null>(null)

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = undefined
    }
    startPos.current = null
  }, [])

  const handleStart = useCallback((e: TouchEvent | MouseEvent) => {
    clear()

    let clientX: number, clientY: number
    if (e instanceof TouchEvent) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    startPos.current = { x: clientX, y: clientY }

    timeoutRef.current = setTimeout(() => {
      onLongPress()
      clear()
    }, delay)
  }, [onLongPress, delay, clear])

  const handleMove = useCallback((e: TouchEvent | MouseEvent) => {
    if (!startPos.current) return

    let clientX: number, clientY: number
    if (e instanceof TouchEvent) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const deltaX = clientX - startPos.current.x
    const deltaY = clientY - startPos.current.y
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    if (distance > moveThreshold) {
      clear()
    }
  }, [moveThreshold, clear])

  const handleEnd = useCallback(() => {
    clear()
  }, [clear])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Touch events
    element.addEventListener('touchstart', handleStart as EventListener, { passive: true })
    element.addEventListener('touchmove', handleMove as EventListener, { passive: true })
    element.addEventListener('touchend', handleEnd, { passive: true })
    element.addEventListener('touchcancel', handleEnd, { passive: true })

    // Mouse events for testing
    element.addEventListener('mousedown', handleStart as EventListener)
    element.addEventListener('mousemove', handleMove as EventListener)
    element.addEventListener('mouseup', handleEnd)
    element.addEventListener('mouseleave', handleEnd)

    return () => {
      clear()
      element.removeEventListener('touchstart', handleStart as EventListener)
      element.removeEventListener('touchmove', handleMove as EventListener)
      element.removeEventListener('touchend', handleEnd)
      element.removeEventListener('touchcancel', handleEnd)
      element.removeEventListener('mousedown', handleStart as EventListener)
      element.removeEventListener('mousemove', handleMove as EventListener)
      element.removeEventListener('mouseup', handleEnd)
      element.removeEventListener('mouseleave', handleEnd)
    }
  }, [handleStart, handleMove, handleEnd, clear])

  return { ref: elementRef }
}

// Pinch to zoom hook
export const usePinchZoom = (options: PinchZoomOptions = {}) => {
  const {
    minZoom = 0.5,
    maxZoom = 3,
    doubleTapZoom = true,
    wheelZoom = false
  } = options

  const elementRef = useRef<HTMLElement>(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  const initialDistance = useRef(0)
  const initialScale = useRef(1)
  const lastTap = useRef(0)

  const updateTransform = useCallback((newScale: number, newX: number = position.x, newY: number = position.y) => {
    const element = elementRef.current
    if (!element || prefersReducedMotion()) return

    element.style.transform = `translate(${newX}px, ${newY}px) scale(${newScale})`
  }, [position])

  const getDistance = useCallback((touches: TouchList) => {
    const touch1 = touches[0]
    const touch2 = touches[1]
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    )
  }, [])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault()
      initialDistance.current = getDistance(e.touches)
      initialScale.current = scale
    }

    if (e.touches.length === 1 && doubleTapZoom) {
      const now = Date.now()
      if (now - lastTap.current < 300) {
        // Double tap
        const newScale = scale === 1 ? 2 : 1
        const clampedScale = Math.min(Math.max(newScale, minZoom), maxZoom)
        
        setScale(clampedScale)
        if (clampedScale === 1) {
          setPosition({ x: 0, y: 0 })
        }
        updateTransform(clampedScale, clampedScale === 1 ? 0 : position.x, clampedScale === 1 ? 0 : position.y)
      }
      lastTap.current = now
    }
  }, [scale, doubleTapZoom, getDistance, minZoom, maxZoom, updateTransform, position])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault()
      const currentDistance = getDistance(e.touches)
      const scaleChange = currentDistance / initialDistance.current
      const newScale = Math.min(Math.max(initialScale.current * scaleChange, minZoom), maxZoom)
      
      setScale(newScale)
      updateTransform(newScale)
    }
  }, [getDistance, minZoom, maxZoom, updateTransform])

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!wheelZoom) return
    
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    const newScale = Math.min(Math.max(scale + delta, minZoom), maxZoom)
    
    setScale(newScale)
    updateTransform(newScale)
  }, [wheelZoom, scale, minZoom, maxZoom, updateTransform])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.addEventListener('touchstart', handleTouchStart, { passive: false })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    
    if (wheelZoom) {
      element.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      if (wheelZoom) {
        element.removeEventListener('wheel', handleWheel)
      }
    }
  }, [handleTouchStart, handleTouchMove, handleWheel, wheelZoom])

  const reset = useCallback(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
    updateTransform(1, 0, 0)
  }, [updateTransform])

  return {
    ref: elementRef,
    scale,
    position,
    reset,
    isZoomed: scale !== 1
  }
}

// Combined mobile gestures hook
export const useMobileGestures = () => {
  return {
    useSwipeGesture,
    usePullToRefresh,
    useLongPress,
    usePinchZoom
  }
}

export default {
  useSwipeGesture,
  usePullToRefresh,
  useLongPress,
  usePinchZoom,
  useMobileGestures
}