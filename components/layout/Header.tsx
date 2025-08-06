'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
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
    <header className={`l-header ${
      scrolled 
        ? 'l-header--scrolled' 
        : 'l-header--default'
    }`}>
      <div className="container">
        <nav className={`o-flex-between ${
          scrolled ? 'l-header__nav--compact' : 'l-header__nav--full'
        }`}>
          {/* Logo */}
          <SafeLink href="/" className="o-cluster">
            {settings.logo ? (
              <img 
                src={settings.logo} 
                alt={settings.siteName} 
                className={`${scrolled ? 'l-logo--compact' : 'l-logo--full'}`}
              />
            ) : (
              <>
                <div className={`c-logo-circle ${
                  scrolled ? 'c-logo-circle--compact' : 'c-logo-circle--full'
                }`}>
                  <span className="c-logo-circle__text">SU</span>
                </div>
                <span className={`c-logo-text ${
                  scrolled ? 'c-logo-text--compact' : 'c-logo-text--full'
                }`}>{settings.siteName}</span>
              </>
            )}
          </SafeLink>
          
          {/* Desktop Navigation */}
          <div className="desktop-only o-cluster o-cluster--gap-lg">
            {nav.mainMenu?.map((item: any, index: number) => (
              <div key={index} className="relative">
                {item.subItems && item.subItems.length > 0 ? (
                  <>
                    <button
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                      className="c-nav-dropdown"
                    >
                      {item.label}
                      <ChevronDownIcon size={16} className="u-ml-xs" />
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
                          className="c-dropdown-menu"
                        >
                          {item.subItems.map((subItem: any, subIndex: number) => (
                            <SafeLink                               key={subIndex}
                              href={subItem.href || '#'}
                              className="c-dropdown-item"
                            >
                              <div className="c-dropdown-item__title">{subItem.label}</div>
                              {subItem.description && (
                                <div className="c-dropdown-item__desc">{subItem.description}</div>
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
                    className="c-nav-link"
                  >
                    {item.label}
                  </SafeLink>
                )}
              </div>
            ))}
            
            {nav.ctaButton?.href && (
              <SafeLink 
                href={nav.ctaButton.href || '/'} 
                className={`${getButtonClasses(nav.ctaButton.style)} btn-sm c-header__cta`}
              >
                {nav.ctaButton.text}
              </SafeLink>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-only c-mobile-menu-toggle"
          >
            <svg className="c-mobile-menu-toggle__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            className="mobile-only c-mobile-menu"
          >
            <div className="c-mobile-menu__content">
              {nav.mainMenu?.map((item: any, index: number) => (
                <div key={index}>
                  {item.subItems && item.subItems.length > 0 ? (
                    <>
                      <div className="c-mobile-menu__title">{item.label}</div>
                      <div className="c-mobile-menu__submenu">
                        {item.subItems.map((subItem: any, subIndex: number) => (
                          <SafeLink                             key={subIndex}
                            href={subItem.href || '#'}
                            className="c-mobile-menu__sublink"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </SafeLink>
                        ))}
                      </div>
                    </>
                  ) : (
                    <SafeLink                       href={item.href || '#'}
                      className="c-mobile-menu__link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </SafeLink>
                  )}
                </div>
              ))}
              
              {nav.ctaButton?.href && (
                <SafeLink                   href={nav.ctaButton.href || '/'}
                  className={`c-mobile-menu__cta ${getButtonClasses(nav.ctaButton.style)} btn-sm`}
                  onClick={() => setMobileMenuOpen(false)}
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