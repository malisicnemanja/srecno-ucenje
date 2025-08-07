'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SparklesIcon as SparklesSVG } from '@/components/icons'

// Mock close icon
const CloseSVG = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'

interface NotificationBarProps {
  data?: {
    message: string
    linkText?: string
    linkUrl?: string
    backgroundColor?: string
    textColor?: string
    isActive: boolean
  }
}

export default function NotificationBar({ data }: NotificationBarProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Proveri da li je korisnik već zatvorio ovu notifikaciju
    const dismissedKey = `notification-dismissed-${data?.message}`
    const wasDismissed = localStorage.getItem(dismissedKey)
    
    if (!wasDismissed && data?.isActive) {
      setIsVisible(true)
    }
  }, [data])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    // Zapamti da je korisnik zatvorio ovu notifikaciju
    if (data?.message) {
      localStorage.setItem(`notification-dismissed-${data.message}`, 'true')
    }
  }

  if (!data || !data.isActive || isDismissed) return null

  const bgColor = data.backgroundColor || 'bg-brand-grass bg-opacity-10'
  const textColor = data.textColor || 'text-brand-night'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`${bgColor} border-b border-brand-grass border-opacity-20`}
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <SparklesSVG 
                  size={16} 
                  className={`${textColor} opacity-80`} 
                />
                
                <p className={`${textColor} text-sm font-medium`}>
                  {data.message}
                  
                  {data.linkText && data.linkUrl && (
                    <>
                      {' '}
                      <SafeLink 
                        href={data.linkUrl || '/'}
                        className={`${textColor} font-semibold underline hover:no-underline transition-all duration-200`}
                      >
                        {data.linkText}
                      </SafeLink>
                    </>
                  )}
                </p>
              </div>

              <button
                onClick={handleDismiss}
                className={`${textColor} hover:opacity-60 transition-opacity duration-200 p-1 rounded-md`}
                aria-label="Zatvori obaveštenje"
              >
                <CloseSVG size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}