'use client'

import { useRef, useEffect, useState } from 'react'

type SwipeDirection = 'up' | 'down' | 'left' | 'right'
type SwipeCallback = (direction: SwipeDirection, distance: number) => void

interface UseSwipeGestureOptions {
  threshold?: number
  preventScroll?: boolean
  onSwipe?: SwipeCallback
  onSwipeStart?: () => void
  onSwipeEnd?: () => void
}

interface TouchInfo {
  startX: number
  startY: number
  startTime: number
  currentX: number
  currentY: number
  currentTime: number
}

export function useSwipeGesture<T extends HTMLElement>(
  options: UseSwipeGestureOptions = {}
) {
  const {
    threshold = 50,
    preventScroll = false,
    onSwipe,
    onSwipeStart,
    onSwipeEnd
  } = options

  const elementRef = useRef<T>(null)
  const touchInfo = useRef<TouchInfo | null>(null)
  const [isSwipingHorizontally, setIsSwipingHorizontally] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return
      
      const touch = e.touches[0]
      touchInfo.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        startTime: Date.now(),
        currentX: touch.clientX,
        currentY: touch.clientY,
        currentTime: Date.now()
      }

      onSwipeStart?.()
      setIsSwipingHorizontally(false)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchInfo.current || e.touches.length !== 1) return

      const touch = e.touches[0]
      const deltaX = Math.abs(touch.clientX - touchInfo.current.startX)
      const deltaY = Math.abs(touch.clientY - touchInfo.current.startY)

      touchInfo.current.currentX = touch.clientX
      touchInfo.current.currentY = touch.clientY
      touchInfo.current.currentTime = Date.now()

      // Determine if this is primarily a horizontal swipe
      const isHorizontal = deltaX > deltaY

      if (isHorizontal && !isSwipingHorizontally && deltaX > 10) {
        setIsSwipingHorizontally(true)
      }

      // Prevent scroll if needed and we're swiping horizontally
      if (preventScroll && isSwipingHorizontally) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchInfo.current) return

      const touch = touchInfo.current
      const deltaX = touch.currentX - touch.startX
      const deltaY = touch.currentY - touch.startY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const duration = touch.currentTime - touch.startTime

      // Calculate velocity (pixels per ms)
      const velocity = distance / Math.max(duration, 1)

      // Determine direction
      let direction: SwipeDirection
      const absDeltaX = Math.abs(deltaX)
      const absDeltaY = Math.abs(deltaY)

      if (absDeltaX > absDeltaY) {
        direction = deltaX > 0 ? 'right' : 'left'
      } else {
        direction = deltaY > 0 ? 'down' : 'up'
      }

      // Trigger swipe if threshold is met (either distance or velocity)
      if (distance > threshold || velocity > 0.3) {
        onSwipe?.(direction, distance)
      }

      onSwipeEnd?.()
      touchInfo.current = null
      setIsSwipingHorizontally(false)
    }

    const handleTouchCancel = () => {
      touchInfo.current = null
      setIsSwipingHorizontally(false)
      onSwipeEnd?.()
    }

    // Add event listeners with passive: false for preventDefault
    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })
    element.addEventListener('touchcancel', handleTouchCancel, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
      element.removeEventListener('touchcancel', handleTouchCancel)
    }
  }, [threshold, preventScroll, onSwipe, onSwipeStart, onSwipeEnd])

  return {
    ref: elementRef,
    isSwipingHorizontally
  }
}

// Utility hook for simple swipe detection
export function useSimpleSwipe(
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  onSwipeUp?: () => void,
  onSwipeDown?: () => void,
  threshold = 50
) {
  return useSwipeGesture({
    threshold,
    onSwipe: (direction) => {
      switch (direction) {
        case 'left':
          onSwipeLeft?.()
          break
        case 'right':
          onSwipeRight?.()
          break
        case 'up':
          onSwipeUp?.()
          break
        case 'down':
          onSwipeDown?.()
          break
      }
    }
  })
}