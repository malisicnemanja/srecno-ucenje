'use client'

import { ReactNode, useEffect, useState } from 'react'
import { getVariant, trackABEvent } from '@/lib/ab-testing'

interface ABTestWrapperProps {
  testName: string
  variants: Record<string, ReactNode>
  fallback?: string
  trackView?: boolean
}

/**
 * Wrapper component for A/B testing
 * 
 * Usage:
 * <ABTestWrapper
 *   testName="hero-cta"
 *   variants={{
 *     original: <button>Get Started</button>,
 *     'action-focused': <button>Start Learning Now!</button>
 *   }}
 *   trackView={true}
 * />
 */
export default function ABTestWrapper({ 
  testName, 
  variants, 
  fallback = 'original',
  trackView = false 
}: ABTestWrapperProps) {
  const [variant, setVariant] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const assignedVariant = getVariant(testName, fallback)
    setVariant(assignedVariant)

    // Track view event if enabled
    if (trackView) {
      trackABEvent(testName, 'view')
    }
  }, [testName, fallback, trackView])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted || !variant) {
    return variants[fallback] || null
  }

  return <>{variants[variant] || variants[fallback] || null}</>
}