'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import OptimizedImage from '@/components/ui/OptimizedImage'
import { usePathname } from 'next/navigation'
import { useSanityQuery } from '@/hooks/useSanity'
import { urlFor } from '@/lib/sanity.client'
import { navigationQuery } from '@/lib/sanity.queries'

const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName,
  logo
}`

interface NavItem {
  name: string
  href: string
  dropdown?: {
    name: string
    href: string
  }[]
}

interface NavigationData {
  mainMenu: {
    label: string
    href?: string
    subItems?: {
      label: string
      href: string
      description?: string
    }[]
  }[]
  ctaButton: {
    text: string
    href: string
    style: string
  }
}

export default function StickyHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const { data: siteSettings } = useSanityQuery(siteSettingsQuery)
  const { data: navigationData } = useSanityQuery<NavigationData>(navigationQuery)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Sticky header
      setIsScrolled(scrollY > 50)

      // Progress indicator
      const scrollPercent = (scrollY / (documentHeight - windowHeight)) * 100
      setScrollProgress(Math.min(scrollPercent, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // Transform CMS navigation data to component format with fallback
  const navigation: NavItem[] = navigationData?.mainMenu?.map(item => ({
    name: item.label,
    href: item.href || '#',
    dropdown: item.subItems?.map(sub => ({
      name: sub.label,
      href: sub.href
    }))
  })) || [
    { 
      name: 'Metodologija', 
      href: '/metodologija',
      dropdown: [
        { name: 'Naša Metodologija', href: '/metodologija' },
        { name: 'Knjige', href: '/knjige' },
        { name: 'O autorki', href: '/o-autorki' }
      ]
    },
    { 
      name: 'Franšiza', 
      href: '#',
      dropdown: [
        { name: 'Modeli Franšize', href: '/fransiza-modeli' },
        { name: 'Finansijski Kalkulatori', href: '/kalkulatori' },
        { name: 'Proveri Znanje', href: '/kvizovi' },
        { name: 'Kako se Pridružiti', href: '/kako-se-pridruziti' },
        { name: 'Lokacije', href: '/lokacije' }
      ]
    },
    { 
      name: 'Učionica', 
      href: '#',
      dropdown: [
        { name: 'Virtualna Učionica', href: '/ucionica' },
        { name: '3D Tour', href: '/3d-ucionica' }
      ]
    },
    { name: 'Resursi', href: '/resursi' },
    { name: 'Konsultacije', href: '/zakazivanje' },
  ]

  // Get CTA button data with fallback
  const ctaButton = navigationData?.ctaButton || {
    text: 'Započnite Sada',
    href: '/kontakt',
    style: 'primary'
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-card'
            : 'bg-white/95 backdrop-blur-sm shadow-soft'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo - Veći i bolje uklopljen */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src="/logo.svg"
                  alt="Srećno učenje logo"
                  className="w-16 h-16 lg:w-20 lg:h-20 object-contain transition-transform duration-300 group-hover:scale-105"
                />
                {/* Animirani prsten */}
                <div className="absolute inset-0 rounded-full border-2 border-primary-400 opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-125 transition-all duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary-600">
                  {siteSettings?.siteName || 'Srećno učenje'}
                </span>
                <span className="text-xs lg:text-sm text-gray-500 font-medium -mt-1">
                  Metodologija
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6" ref={dropdownRef}>
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveDropdown(activeDropdown === item.name ? null : item.name)
                        }}
                        className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 ${
                          item.dropdown.some(sub => pathname === sub.href)
                            ? 'text-primary-600'
                            : 'text-gray-700 hover:text-primary-600'
                        }`}
                      >
                        <span>{item.name}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Dropdown Menu - Fixed positioning */}
                      <div
                        className={`absolute left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 transition-all duration-200 z-50 ${
                          activeDropdown === item.name
                            ? 'opacity-100 visible translate-y-0'
                            : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                        }`}
                      >
                        <div className="py-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                                pathname === subItem.href
                                  ? 'bg-primary-50 text-primary-600'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-sm font-medium transition-colors duration-200 ${
                        pathname === item.href
                          ? 'text-primary-600'
                          : 'text-gray-700 hover:text-primary-600'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Desktop CTA Button */}
              <Link
                href={ctaButton.href}
                className={`ml-4 px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                  ctaButton.style === 'primary' 
                    ? 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-primary-500/30'
                    : ctaButton.style === 'secondary'
                    ? 'bg-secondary-500 text-white hover:bg-secondary-600 hover:shadow-secondary-500/30'
                    : 'bg-accent-500 text-white hover:bg-accent-600 hover:shadow-accent-500/30'
                }`}
              >
                {ctaButton.text}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none"
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-5">
                <span
                  className={`absolute left-0 w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
                    isMenuOpen
                      ? 'top-2.5 rotate-45'
                      : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-2.5 w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
                    isMenuOpen
                      ? 'top-2.5 -rotate-45'
                      : 'top-5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="p-4">
            {navigation.map((item, index) => (
              <div key={item.name} className="mb-2">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      className={`w-full flex items-center justify-between py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 ${
                        item.dropdown.some(sub => pathname === sub.href)
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{item.name}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Mobile Dropdown */}
                    <div
                      className={`ml-4 mt-1 space-y-1 overflow-hidden transition-all duration-200 ${
                        activeDropdown === item.name
                          ? 'max-h-96 opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block py-2 px-4 rounded-lg text-sm transition-all duration-200 ${
                            pathname === subItem.href
                              ? 'bg-primary-50 text-primary-600'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <Link
              href={ctaButton.href}
              className={`mt-6 block w-full text-white text-center py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                ctaButton.style === 'primary' 
                  ? 'bg-primary-600 hover:bg-primary-700'
                  : ctaButton.style === 'secondary'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-yellow-600 hover:bg-yellow-700'
              }`}
            >
              {ctaButton.text}
            </Link>
          </nav>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-20 lg:h-24" />
    </>
  )
}