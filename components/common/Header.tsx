'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { client } from '@/lib/sanity.client'
import { navigationQuery, type Navigation, type NavigationItem } from '@/lib/sanity/queries/navigation'

// Fallback menu items (used if CMS data is not available)
const fallbackMenuItems: NavigationItem[] = [
  {
    label: 'Metodologija',
    href: '/methodology',
    subItems: [
      { label: 'Naše metode', href: '/methodology' },
      { label: 'Obuka i mentorstvo', href: '/obuka-mentorstvo' },
      { label: 'O autorki', href: '/o-autorki' }
    ]
  },
  {
    label: 'Franšiza',
    href: '/franchise-models',
    subItems: [
      { label: 'Modeli franšize', href: '/franchise-models' },
      { label: 'Kako se pridružiti', href: '/kako-se-pridruziti' },
      { label: 'Kalkulatori', href: '/kalkulatori' },
      { label: 'Kvizovi', href: '/kvizovi' }
    ]
  },
  {
    label: 'Učionica',
    href: '/ucionica',
    subItems: [
      { label: 'Naša učionica', href: '/ucionica' },
      { label: '3D virtuelni obilazak', href: '/3d-ucionica' },
      { label: 'Programi', href: '/ucionica#programs' }
    ]
  },
  {
    label: 'Knjige',
    href: '/knjige'
  },
  {
    label: 'Resursi',
    href: '/resursi',
    subItems: [
      { label: 'Besplatni resursi', href: '/resursi' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' }
    ]
  },
  {
    label: 'Kontakt',
    href: '/kontakt',
    subItems: [
      { label: 'Kontaktirajte nas', href: '/kontakt' },
      { label: 'Lokacije', href: '/lokacije' }
    ]
  }
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [navigation, setNavigation] = useState<Navigation | null>(null)
  const [menuItems, setMenuItems] = useState<NavigationItem[]>(fallbackMenuItems)
  const [ctaButton, setCTAButton] = useState<{ text: string; href: string; style: 'primary' | 'secondary' | 'accent' }>({ text: 'Zakaži', href: '/zakazivanje', style: 'primary' })
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch navigation data from Sanity
  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const navData = await client.fetch<Navigation>(navigationQuery)
        if (navData) {
          setNavigation(navData)
          setMenuItems(navData.mainMenu || fallbackMenuItems)
          if (navData.ctaButton) {
            setCTAButton(navData.ctaButton)
          }
        }
      } catch (error) {
        console.warn('Failed to fetch navigation from Sanity, using fallback menu:', error)
      }
    }

    fetchNavigation()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  return (
    <header className="fixed top-0 w-full bg-white shadow-sm z-[100]">
      <div className="container">
        <nav className="flex items-center justify-between h-20" ref={dropdownRef}>
          {/* Logo */}
          <SafeLink href="/" className="flex items-center space-x-3 z-[110]">
            <motion.div 
              className="w-14 h-14 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/logo.svg" alt="Srećno učenje logo" className="w-full h-full" />
            </motion.div>
            <div>
              <span className="text-2xl font-bold text-gray-900">Srećno učenje</span>
              <p className="text-xs text-gray-600 -mt-1">Centar za brzo čitanje</p>
            </div>
          </SafeLink>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.label} className="relative">
                {item.subItems ? (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    className={`flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors font-medium ${
                      pathname.startsWith(item.href) ? 'text-primary-600' : ''
                    }`}
                  >
                    <span>{item.label}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <SafeLink                     href={item.href || '#'}
                    className={`text-gray-700 hover:text-primary-600 transition-colors font-medium ${
                      pathname === item.href ? 'text-primary-600' : ''
                    }`}
                  >
                    {item.label}
                  </SafeLink>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.subItems && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[120]"
                    >
                      {item.subItems.map((subItem, index) => (
                        <SafeLink                           key={subItem.href}
                          href={subItem.href || '#'}
                          className="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          {subItem.label}
                        </SafeLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* CTA Button */}
            <SafeLink 
              href={ctaButton.href || '/zakazivanje'}
              className={`px-6 py-3 rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                ctaButton.style === 'primary' ? 'bg-primary-600 text-white hover:bg-primary-700' :
                ctaButton.style === 'secondary' ? 'bg-secondary-600 text-white hover:bg-secondary-700' :
                'bg-accent-600 text-white hover:bg-accent-700'
              }`}
            >
              {ctaButton.text}
            </SafeLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors z-[110]"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container py-4 space-y-2">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <span className="font-medium">{item.label}</span>
                        <svg 
                          className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-8 space-y-1"
                          >
                            {item.subItems.map((subItem) => (
                              <SafeLink                                 key={subItem.href}
                                href={subItem.href || '#'}
                                className="block px-4 py-2 text-gray-600 hover:text-primary-600 transition-colors"
                              >
                                {subItem.label}
                              </SafeLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <SafeLink                       href={item.href || '#'}
                      className={`block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium ${
                        pathname === item.href ? 'text-primary-600 bg-primary-50' : ''
                      }`}
                    >
                      {item.label}
                    </SafeLink>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA */}
              <SafeLink 
                href={ctaButton.href || '/zakazivanje'}
                className={`block w-full px-4 py-3 rounded-xl text-sm font-medium text-center transition-colors mt-4 min-h-[44px] flex items-center justify-center ${
                  ctaButton.style === 'primary' ? 'bg-primary-600 text-white hover:bg-primary-700' :
                  ctaButton.style === 'secondary' ? 'bg-secondary-600 text-white hover:bg-secondary-700' :
                  'bg-accent-600 text-white hover:bg-accent-700'
                }`}
              >
                {ctaButton.text}
              </SafeLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}