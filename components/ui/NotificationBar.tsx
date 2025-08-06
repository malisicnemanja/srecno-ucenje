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

  const bgColor = data.backgroundColor || 'bg-brand-grass-soft'
  const textColor = data.textColor || 'u-text-brand-night'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`c-notification-bar ${bgColor}`}
        >
          <div className="container">
            <div className="c-notification-bar__content">
              <div className="c-notification-bar__message">
                <SparklesSVG 
                  size={16} 
                  className={`c-notification-bar__icon ${textColor}`} 
                />
                
                <p className={`c-notification-bar__text ${textColor}`}>
                  {data.message}
                  
                  {data.linkText && data.linkUrl && (
                    <>
                      {' '}
                      <SafeLink 
                        href={data.linkUrl || '/'}
                        className={`c-notification-bar__link ${textColor}`}
                      >
                        {data.linkText}
                      </SafeLink>
                    </>
                  )}
                </p>
              </div>

              <button
                onClick={handleDismiss}
                className={`c-notification-bar__close ${textColor}`}
                aria-label="Zatvori obaveštenje"
              >
                <CloseSVG size={16} />
              </button>
            </div>
          </div>

          {/* Suptilni gradient na dnu */}
          <div className="c-notification-bar__border" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}