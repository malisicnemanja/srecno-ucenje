'use client'

import { useState, useEffect } from 'react'
import { Target, TrendingUp, Gift, MapPin, Zap, Lightbulb, Trophy } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

interface CTAMessage {
  text: string
  icon?: React.ReactNode
  cta: string
  link: string
  delay: number
}

export default function SmartCTABar() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Dynamic messages based on page and user behavior
  const getMessages = (): CTAMessage[] => {
    const baseMessages: CTAMessage[] = [
      {
        text: 'Preko 20.000 dece uči uz našu metodologiju',
        icon: <Target size={20} className="inline mr-2" />,
        cta: 'Saznaj više',
        link: '/metodologija',
        delay: 5000,
      },
      {
        text: 'Proverite isplativost investicije za vaš grad',
        icon: <TrendingUp size={20} className="inline mr-2" />,
        cta: 'Kalkulator ROI',
        link: '/kalkulatori',
        delay: 15000,
      },
      {
        text: 'Besplatne konsultacije za nove partnere',
        icon: <Gift size={20} className="inline mr-2" />,
        cta: 'Zakažite poziv',
        link: '/kontakt',
        delay: 25000,
      },
      {
        text: '7+ aktivnih centara širom Srbije',
        icon: <MapPin size={20} className="inline mr-2" />,
        cta: 'Pronađi centar',
        link: '/lokacije',
        delay: 35000,
      },
    ]

    // Page-specific messages
    if (pathname.includes('fransize')) {
      return [
        {
          text: 'Ograničen broj franšiza po gradu',
          icon: <Zap size={20} className="inline mr-2" />,
          cta: 'Rezervišite mesto',
          link: '/kontakt',
          delay: 3000,
        },
        ...baseMessages,
      ]
    } else if (pathname.includes('kalkulator')) {
      return [
        {
          text: 'Prosečan ROI period: 12-18 meseci',
          icon: <Lightbulb size={20} className="inline mr-2" />,
          cta: 'Vidite analizu',
          link: '#',
          delay: 10000,
        },
        ...baseMessages,
      ]
    } else if (pathname.includes('kviz')) {
      return [
        {
          text: '85% naših partnera je profitabilno u prvoj godini',
          icon: <Trophy size={20} className="inline mr-2" />,
          cta: 'Njihove priče',
          link: '/uspeh',
          delay: 8000,
        },
        ...baseMessages,
      ]
    }

    return baseMessages
  }

  const messages = getMessages()
  const currentMessage = messages[messageIndex % messages.length]

  useEffect(() => {
    // Don't show on mobile initially
    if (window.innerWidth < 768) return

    // Show after scroll
    const handleScroll = () => {
      if (window.scrollY > 300 && !isVisible && !hasInteracted) {
        setIsVisible(true)
        trackEvent({
          category: 'Smart CTA',
          action: 'show',
          label: pathname,
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible, hasInteracted, pathname])

  useEffect(() => {
    // Rotate messages
    if (!isVisible) return

    const timer = setTimeout(() => {
      setMessageIndex((prev) => prev + 1)
    }, currentMessage.delay)

    return () => clearTimeout(timer)
  }, [messageIndex, isVisible, currentMessage.delay])

  const handleClick = () => {
    trackEvent({
      category: 'Smart CTA',
      action: 'click',
      label: currentMessage.text,
    })
    setHasInteracted(true)
  }

  const handleClose = () => {
    setIsVisible(false)
    setHasInteracted(true)
    trackEvent({
      category: 'Smart CTA',
      action: 'close',
      label: pathname,
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={messageIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-4"
                  >
                    <p className="text-sm md:text-base font-medium">
                      {currentMessage.icon}{currentMessage.text}
                    </p>
                    <a
                      href={currentMessage.link}
                      onClick={handleClick}
                      className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
                    >
                      {currentMessage.cta}
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <button
                onClick={handleClose}
                className="ml-4 text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-800">
            <motion.div
              className="h-full bg-white"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: currentMessage.delay / 1000, ease: 'linear' }}
              key={messageIndex}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}