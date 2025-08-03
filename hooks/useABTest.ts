'use client'

import { useEffect, useState } from 'react'
import { getVariant, trackABEvent } from '@/lib/ab-testing'

/**
 * React hook for A/B testing
 * 
 * Usage:
 * const { variant, trackEvent } = useABTest('hero-cta', 'original')
 * 
 * if (variant === 'action-focused') {
 *   // Show action-focused variant
 * } else {
 *   // Show original variant
 * }
 * 
 * // Track events
 * trackEvent('button_click')
 */
export function useABTest(testName: string, fallback: string = 'original') {
  const [variant, setVariant] = useState<string>(fallback)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const assignedVariant = getVariant(testName, fallback)
    setVariant(assignedVariant)
  }, [testName, fallback])

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (mounted) {
      trackABEvent(testName, eventName, properties)
    }
  }

  return { 
    variant: mounted ? variant : fallback, 
    trackEvent,
    isReady: mounted 
  }
}