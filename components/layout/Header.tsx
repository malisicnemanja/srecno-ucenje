'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSiteSettings } from '@/contexts/SiteSettingsContext'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@/components/icons'

export default function Header() {
  const { siteSettings, navigation, isLoading } = useSiteSettings()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
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
      text: 'Zakaži poziv',
      href: '/kontakt',
      style: 'primary'
    }
  }
  
  const nav = navigation || defaultNavigation
  const settings = siteSettings || {
    siteName: 'Srećno učenje',
    logo: null
  }
  
  const getButtonClasses = (style: string) => {
    switch (style) {
      case 'secondary':
        return 'bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700'
      case 'accent':
        return 'bg-sun-600 text-white px-4 py-2 rounded-lg hover:bg-sun-700'
      default:
        return 'bg-grass-600 text-white px-4 py-2 rounded-lg hover:bg-grass-700'
    }
  }

  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className={`flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-14' : 'h-16'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {settings.logo ? (
              <img 
                src={settings.logo} 
                alt={settings.siteName} 
                className={`transition-all duration-300 ${scrolled ? 'h-10' : 'h-12'} w-auto`}
              />
            ) : (
              <>
                <div className={`bg-grass-600 rounded-full flex items-center justify-center transition-all duration-300 ${
                  scrolled ? 'w-10 h-10' : 'w-12 h-12'
                }`}>
                  <span className="text-white font-bold">SU</span>
                </div>
                <span className={`font-bold text-night-900 transition-all duration-300 ${
                  scrolled ? 'text-lg' : 'text-xl'
                }`}>{settings.siteName}</span>
              </>
            )}
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {nav.mainMenu?.map((item: any, index: number) => (
              <div key={index} className="relative">
                {item.subItems && item.subItems.length > 0 ? (
                  <>
                    <button
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                      className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      {item.label}
                      <ChevronDownIcon size={16} className="ml-1" />
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
                          className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50"
                        >
                          {item.subItems.map((subItem: any, subIndex: number) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                            >
                              <div className="font-medium">{subItem.label}</div>
                              {subItem.description && (
                                <div className="text-sm text-gray-500">{subItem.description}</div>
                              )}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link 
                    href={item.href || '#'} 
                    className="text-night-700 hover:text-grass-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            
            {nav.ctaButton && (
              <Link 
                href={nav.ctaButton.href} 
                className={getButtonClasses(nav.ctaButton.style)}
              >
                {nav.ctaButton.text}
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-night-700 hover:text-grass-600 hover:bg-grass-50 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-sky-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {nav.mainMenu?.map((item: any, index: number) => (
                <div key={index}>
                  {item.subItems && item.subItems.length > 0 ? (
                    <>
                      <div className="px-3 py-2 text-night-700 font-medium">{item.label}</div>
                      <div className="ml-4">
                        {item.subItems.map((subItem: any, subIndex: number) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block px-3 py-2 text-night-600 hover:text-grass-600"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      className="block px-3 py-2 text-night-700 hover:text-grass-600 hover:bg-grass-50 rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              
              {nav.ctaButton && (
                <Link
                  href={nav.ctaButton.href}
                  className={`block mx-3 text-center ${getButtonClasses(nav.ctaButton.style)}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {nav.ctaButton.text}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}