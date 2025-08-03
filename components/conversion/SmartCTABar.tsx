'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { TrendingUp, Target, Briefcase, BookOpen, ChevronUp, ChevronDown, X } from 'lucide-react'

export default function SmartCTABar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Show CTA bar after user has been on page for 30 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 30000)

    // Check if user has scrolled more than 50% of page
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const scrollPercent = scrollTop / (docHeight - winHeight)

      if (scrollPercent > 0.5 && !isVisible) {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isVisible])

  const getCTAContent = () => {
    if (pathname.includes('fransiza') || pathname.includes('franchise')) {
      return {
        message: 'Zainteresovani za franšizu?',
        icon: <Briefcase size={20} className="inline mr-2" />,
        cta: 'Kontaktirajte nas',
        href: '/kontakt?tip=fransiza',
        urgent: true
      }
    }
    
    if (pathname.includes('kalkulator')) {
      return {
        message: 'Vidite potencijal? Saznajte više!',
        icon: <TrendingUp size={20} className="inline mr-2" />,
        cta: 'Zakazivanje konsultacije',
        href: '/zakazivanje',
        urgent: false
      }
    }
    
    if (pathname.includes('kviz')) {
      return {
        message: 'Završite kviz i otkrijte rezultate!',
        icon: <Target size={20} className="inline mr-2" />,
        cta: 'Nastavite kviz',
        href: '#',
        urgent: true
      }
    }

    // Default CTA for other pages
    return {
      message: 'Želite da saznate više o našoj metodi?',
      icon: <BookOpen size={20} className="inline mr-2" />,
      cta: 'Preuzmite vodič',
      href: '/kontakt',
      urgent: false
    }
  }

  const content = getCTAContent()

  if (!isVisible) return null

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 ${
      isMinimized ? 'transform translate-y-12' : 'transform translate-y-0'
    }`}>
      <div className={`bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg ${
        content.urgent ? 'animate-pulse' : ''
      }`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <p className="text-sm md:text-base font-medium">
                {content.icon}{content.message}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <a
                href={content.href}
                className="bg-white text-primary-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base whitespace-nowrap"
              >
                {content.cta}
              </a>
              
              {/* Minimize/Close buttons */}
              <div className="flex space-x-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:text-gray-200 p-1"
                  title={isMinimized ? 'Prikaži' : 'Sakrij'}
                >
                  {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-white hover:text-gray-200 p-1"
                  title="Zatvori"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}