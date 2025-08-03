'use client'

import { useEffect } from 'react'
import { initializeAnalytics } from '@/lib/analytics'

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeAnalytics()
  }, [])

  return <>{children}</>
}