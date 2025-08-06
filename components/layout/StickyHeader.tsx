'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import OptimizedImage from '@/components/ui/OptimizedImage'
import { usePathname } from 'next/navigation'
import { useSanityQuery } from '@/hooks/useSanity'
import { urlFor } from '@/lib/sanity.client'

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

export default function StickyHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const { data: siteSettings } = useSanityQuery(siteSettingsQuery)

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

  const navigation: NavItem[] = [
    { name: 'Metodologija', href: '/metodologija' },
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
  ]

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
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <SafeLink href="/" className="flex items-center space-x-2">
              {siteSettings?.logo ? (
                <OptimizedImage
                  src={urlFor(siteSettings.logo).width(128).height(128).url()}
                  alt={siteSettings.siteName || 'Srećno učenje'}
                  width={56}
                  height={56}
                  className="w-12 h-12 lg:w-14 lg:h-14 object-contain"
                  priority={true}
                  quality={85}
                />
              ) : (
                <div className="w-12 h-12 lg:w-14 lg:h-14 gradient-primary rounded-full flex items-center justify-center shadow-lg shadow-primary-500/25">
                  <span className="text-white font-bold text-xl lg:text-2xl">SU</span>
                </div>
              )}
              <span className="text-xl lg:text-2xl font-bold text-gray-900">
                {siteSettings?.siteName || 'Srećno učenje'}
              </span>
            </SafeLink>

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
                            ? 'text-green-600'
                            : 'text-gray-700 hover:text-green-600'
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

                      {/* Dropdown Menu */}
                      <div
                        className={`absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 transition-all duration-200 ${
                          activeDropdown === item.name
                            ? 'opacity-100 visible translate-y-0'
                            : 'opacity-0 invisible -translate-y-2'
                        }`}
                      >
                        <div className="py-2">
                          {item.dropdown.map((subItem) => (
                            <SafeLink                               key={subItem.name}
                              href={subItem.href || '/'}
                              className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                                pathname === subItem.href
                                  ? 'bg-green-50 text-green-600'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {subItem.name}
                            </SafeLink>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <SafeLink                       href={item.href || '/'}
                      className={`text-sm font-medium transition-colors duration-200 ${
                        pathname === item.href
                          ? 'text-green-600'
                          : 'text-gray-700 hover:text-green-600'
                      }`}
                    >
                      {item.name}
                    </SafeLink>
                  )}
                </div>
              ))}
              
              {/* Desktop CTA Button */}
              <SafeLink                 href="/zakazivanje"
                className="ml-4 bg-green-600 text-white px-3 py-2 text-sm rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 min-h-[36px] flex items-center"
              >
                Zakaži
              </SafeLink>
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
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-150"
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
                          ? 'bg-green-50 text-green-600'
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
                        <SafeLink                           key={subItem.name}
                          href={subItem.href || '/'}
                          className={`block py-2 px-4 rounded-lg text-sm transition-all duration-200 ${
                            pathname === subItem.href
                              ? 'bg-green-50 text-green-600'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {subItem.name}
                        </SafeLink>
                      ))}
                    </div>
                  </>
                ) : (
                  <SafeLink                     href={item.href || '/'}
                    className={`block py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? 'bg-green-50 text-green-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </SafeLink>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <SafeLink               href="/zakazivanje"
              className="mt-6 block w-full bg-green-600 text-white text-center py-3 px-4 text-sm rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
            >
              Zakaži
            </SafeLink>
          </nav>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  )
}