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

  const bgColor = data.backgroundColor || 'bg-primary-50'
  const textColor = data.textColor || 'text-primary-900'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`relative overflow-hidden ${bgColor}`}
        >
          <div className="container">
            <div className="flex items-center justify-between py-2 px-4">
              <div className="flex items-center gap-3 flex-1">
                <SparklesSVG 
                  size={16} 
                  className={`${textColor} opacity-60 hidden sm:block`} 
                />
                
                <p className={`text-xs sm:text-sm ${textColor} font-medium`}>
                  {data.message}
                  
                  {data.linkText && data.linkUrl && (
                    <>
                      {' '}
                      <Link 
                        href={data.linkUrl}
                        className={`underline hover:no-underline font-semibold transition-all duration-200 ${textColor}`}
                      >
                        {data.linkText}
                      </Link>
                    </>
                  )}
                </p>
              </div>

              <button
                onClick={handleDismiss}
                className={`p-1 rounded-full transition-all duration-200 hover:bg-white/20 ${textColor}`}
                aria-label="Zatvori obaveštenje"
              >
                <CloseSVG size={16} />
              </button>
            </div>
          </div>

          {/* Suptilni gradient na dnu */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}