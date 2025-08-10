'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import { useSiteSettings } from '@/contexts/SiteSettingsContext'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@/components/icons'
import { DeviceDetection, TouchUtils } from '@/lib/mobile-utils'
import { useSwipeGesture } from '@/hooks/useMobileGestures'

export default function Header() {
  const { siteSettings, navigation, isLoading } = useSiteSettings()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detect mobile device
  useEffect(() => {
    setIsMobile(DeviceDetection.isMobile())
  }, [])

  // Handle swipe gesture to close mobile menu
  const { ref: swipeRef } = useSwipeGesture((result) => {
    if (result.direction === 'up' && mobileMenuOpen) {
      setMobileMenuOpen(false)
      TouchUtils.addHapticFeedback('light')
    }
  }, { threshold: 30 })
  
  // Default navigation data
  const defaultNavigation = {
    mainMenu: [
      { label: 'Knjige', href: '/knjige' },
      { label: 'Modeli', href: '/fransiza-modeli' },
      { label: 'Učionica', href: '/ucionica' },
      { label: 'Obuka', href: '/obuka-mentorstvo' },
      { label: 'FAQ', href: '/faq' },
    ],
    ctaButton: {
      text: 'Zakaži',
      href: '/zakazivanje',
      style: 'primary'
    }
  }
  
  const nav = navigation || defaultNavigation
  const settings = siteSettings || {
    siteName: 'Srećno učenje',
    logo: null
  }
  
  const getButtonClasses = (style: string) => {
    // Novi button sistem sa animacijama
    switch (style) {
      case 'secondary':
        return 'btn btn-header-outline' // Outline → Filled animacija
      case 'accent':
        return 'btn btn-hero-sun' // Sun boja za accent
      default:
        return 'btn btn-header' // Night boja za header (Filled → Outline)
    }
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-white bg-opacity-95 backdrop-blur-sm py-4'
      }`}
      role="banner"
      aria-label="Glavno zaglavlje stranice"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <nav 
          id="primary-navigation" 
          className="flex items-center justify-between" 
          role="navigation" 
          aria-label="Glavna navigacija"
        >
          {/* Logo */}
          <SafeLink 
            href="/" 
            className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-brand-sun focus:ring-offset-2 rounded-lg"
            aria-label="Srećno učenje - početna stranica"
          >
            {settings.logo ? (
              <img 
                src={settings.logo} 
                alt={`${settings.siteName} logo`} 
                className={`transition-all duration-300 ${
                  scrolled ? 'h-10' : 'h-12'
                }`}
                width={scrolled ? 40 : 48}
                height={scrolled ? 40 : 48}
              />
            ) : (
              <>
                <div className={`bg-brand-grass rounded-full flex items-center justify-center transition-all duration-300 ${
                  scrolled ? 'w-10 h-10' : 'w-12 h-12'
                }`}>
                  <span className={`text-white font-bold transition-all duration-300 ${
                    scrolled ? 'text-sm' : 'text-base'
                  }`}>SU</span>
                </div>
                <span className={`font-semibold text-gray-900 transition-all duration-300 ${
                  scrolled ? 'text-lg' : 'text-xl'
                }`}>{settings.siteName}</span>
              </>
            )}
          </SafeLink>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8" role="menubar">
            {nav.mainMenu?.map((item: any, index: number) => (
              <div key={index} className="relative">
                {item.subItems && item.subItems.length > 0 ? (
                  <>
                    <button
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                      className="flex items-center space-x-1 text-gray-700 hover:text-brand-grass transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-brand-sun focus:ring-offset-2 rounded min-h-[44px] px-2"
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                      role="menuitem"
                    >
                      <span>{item.label}</span>
                      <ChevronDownIcon size={16} className="transition-transform duration-200" />
                    </button>
                    
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => setOpenDropdown(item.label)}
                          onMouseLeave={() => setOpenDropdown(null)}
                          className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-64 z-50"
                          role="menu"
                          aria-label={`${item.label} podmeni`}
                        >
                          {item.subItems.map((subItem: any, subIndex: number) => (
                            <SafeLink
                              key={subIndex}
                              href={subItem.href || '#'}
                              className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50 focus:ring-2 focus:ring-brand-sun focus:ring-inset min-h-[44px] flex flex-col justify-center"
                              role="menuitem"
                            >
                              <div className="font-medium text-gray-900">{subItem.label}</div>
                              {subItem.description && (
                                <div className="text-sm text-gray-600 mt-1">{subItem.description}</div>
                              )}
                            </SafeLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <SafeLink 
                    href={item.href || '#'} 
                    className="text-gray-700 hover:text-brand-grass transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-brand-sun focus:ring-offset-2 rounded min-h-[44px] px-2 flex items-center"
                    role="menuitem"
                  >
                    {item.label}
                  </SafeLink>
                )}
              </div>
            ))}
            
            {nav.ctaButton?.href && (
              <SafeLink 
                href={nav.ctaButton.href || '/'} 
                className="btn-primary px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-sun focus:ring-offset-2 min-h-[44px] flex items-center"
                role="menuitem"
                aria-label={`${nav.ctaButton.text} - glavna akcija`}
              >
                {nav.ctaButton.text}
              </SafeLink>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen)
              if (isMobile) TouchUtils.addHapticFeedback('light')
            }}
            className="lg:hidden p-2 text-gray-700 hover:text-brand-grass transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-sun focus:ring-offset-2 rounded min-h-[44px] min-w-[44px] flex items-center justify-center active:bg-gray-100"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Zatvori meni' : 'Otvori meni'}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={swipeRef}
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg max-h-[80vh] overflow-y-auto overscroll-contain"
            role="menu"
            aria-label="Mobilna navigacija"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="px-4 py-6 space-y-4 pb-safe">
              {/* Swipe indicator */}
              <div className="flex justify-center mb-2">
                <div className="w-12 h-1 bg-gray-300 rounded-full" />
              </div>
              {nav.mainMenu?.map((item: any, index: number) => (
                <div key={index}>
                  {item.subItems && item.subItems.length > 0 ? (
                    <>
                      <div className="font-semibold text-gray-900 mb-2">{item.label}</div>
                      <div className="ml-4 space-y-2">
                        {item.subItems.map((subItem: any, subIndex: number) => (
                          <SafeLink
                            key={subIndex}
                            href={subItem.href || '#'}
                            className="block text-gray-600 hover:text-brand-grass hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-sun focus:ring-inset rounded min-h-[44px] flex items-center px-3 py-2"
                            onClick={() => {
                              setMobileMenuOpen(false)
                              if (isMobile) TouchUtils.addHapticFeedback('light')
                            }}
                            role="menuitem"
                          >
                            {subItem.label}
                          </SafeLink>
                        ))}
                      </div>
                    </>
                  ) : (
                    <SafeLink
                      href={item.href || '#'}
                      className="block font-medium text-gray-900 hover:text-brand-grass hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-sun focus:ring-inset rounded min-h-[44px] flex items-center px-3 py-2"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        if (isMobile) TouchUtils.addHapticFeedback('light')
                      }}
                      role="menuitem"
                    >
                      {item.label}
                    </SafeLink>
                  )}
                </div>
              ))}
              
              {nav.ctaButton?.href && (
                <SafeLink
                  href={nav.ctaButton.href || '/'}
                  className="btn-primary w-full text-center px-6 py-3 rounded-lg font-medium transition-all duration-200 mt-6 focus:outline-none focus:ring-2 focus:ring-brand-sun focus:ring-offset-2 min-h-[44px] flex items-center justify-center active:scale-95"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (isMobile) TouchUtils.addHapticFeedback('medium')
                  }}
                  role="menuitem"
                  aria-label={`${nav.ctaButton.text} - glavna akcija`}
                >
                  {nav.ctaButton.text}
                </SafeLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}