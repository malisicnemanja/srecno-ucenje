'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { client } from '@/lib/sanity.client'
import { navigationQuery, type Navigation, type NavigationItem } from '@/lib/sanity/queries/navigation'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { Icons } from '@/components/ui/Icons'

// Mega menu configuration with rich content and visual elements
interface MegaMenuSection {
  title: string
  description?: string
  items: {
    label: string
    href: string
    description?: string
    icon?: keyof typeof Icons
    badge?: string
    featured?: boolean
  }[]
}

interface MegaMenuItem {
  label: string
  href: string
  color: 'sky' | 'sun' | 'grass' | 'heart' | 'night'
  icon: keyof typeof Icons
  sections?: MegaMenuSection[]
  featured?: {
    title: string
    description: string
    href: string
    image?: string
  }
}

// Mega menu items with rich content structure
const megaMenuItems: MegaMenuItem[] = [
  {
    label: 'Franšiza',
    href: '/fransiza',
    color: 'grass',
    icon: 'Rocket',
    sections: [
      {
        title: 'Modeli franšize',
        description: 'Različiti načini pridruživanja',
        items: [
          { label: 'Osnovni paket', href: '/fransiza-modeli#osnovni', description: 'Idealno za početak', icon: 'Handshake', badge: 'Popularno' },
          { label: 'Prošireni paket', href: '/fransiza-modeli#prosireni', description: 'Za ozbiljne preduzetnike', icon: 'Trophy' },
          { label: 'Premium paket', href: '/fransiza-modeli#premium', description: 'Kompletna podrška', icon: 'Star', featured: true },
          { label: 'Poredba paketa', href: '/fransiza-modeli', description: 'Uporedi sve opcije', icon: 'Graph' }
        ]
      },
      {
        title: 'Kako se pridružiti',
        items: [
          { label: 'Proces prijave', href: '/kako-se-pridruziti#proces', description: 'Korak po korak', icon: 'Check' },
          { label: 'Finansijski kalkulator', href: '/kako-se-pridruziti#kalkulator', description: 'Izračunaj investiciju', icon: 'Graph' },
          { label: 'Obuka i podrška', href: '/kako-se-pridruziti#obuka', description: 'Kompletan training', icon: 'Graduation' },
          { label: 'Zakaži konsultacije', href: '/zakazivanje', description: 'Besplatan razgovor', icon: 'Phone', badge: 'Besplatno' }
        ]
      }
    ],
    featured: {
      title: 'Započni svoju franšizu danas',
      description: 'Pridruži se mreži od preko 150+ uspešnih škola širom regiona',
      href: '/fransiza/prijava'
    }
  },
  {
    label: 'Obrazovanje',
    href: '/obrazovanje',
    color: 'sky',
    icon: 'Graduation',
    sections: [
      {
        title: 'Metodologija',
        description: 'Naš jedinstveni pristup',
        items: [
          { label: 'Metoda brzog čitanja', href: '/methodology#brzo-citanje', description: '3x brže čitanje', icon: 'Book', featured: true },
          { label: 'Tehnike memorije', href: '/methodology#memorija', description: 'Zapamti sve što učiš', icon: 'Brain' },
          { label: 'Koncentracija', href: '/methodology#koncentracija', description: 'Fokus na učenje', icon: 'Target' },
          { label: 'Naučni pristup', href: '/methodology#nauka', description: 'Dokazane tehnike', icon: 'Graph' }
        ]
      },
      {
        title: 'Učionica i resursi',
        items: [
          { label: '3D virtuelna učionica', href: '/3d-ucionica', description: 'Obiđi našu školu', icon: 'School', badge: 'Novo' },
          { label: 'Programi za decu', href: '/programi/deca', description: 'Od 6 do 14 godina', icon: 'Backpack' },
          { label: 'Programi za odrasle', href: '/programi/odrasli', description: 'Stručno usavršavanje', icon: 'Graduation' },
          { label: 'Online kvizovi', href: '/kvizovi', description: 'Testiraj svoje znanje', icon: 'Check' }
        ]
      }
    ],
    featured: {
      title: 'Besplatna proba nastave',
      description: 'Iskusi našu metodologiju na besplatnom probnom času',
      href: '/proba-nastave'
    }
  },
  {
    label: 'O nama',
    href: '/o-nama',
    color: 'heart',
    icon: 'Heart',
    sections: [
      {
        title: 'Naša priča',
        items: [
          { label: 'O autorki', href: '/o-autorki', description: 'Sanja Miletić - osnivačica', icon: 'Star', featured: true },
          { label: 'Naša filozofija', href: '/filozofija', description: 'Zašto postojimo', icon: 'Heart' },
          { label: 'Uspešne priče', href: '/price-uspeha', description: 'Učenici govore', icon: 'Trophy' },
          { label: 'Medijski nastupi', href: '/mediji', description: 'TV, radio, štampa', icon: 'Video' }
        ]
      },
      {
        title: 'Lokacije',
        items: [
          { label: 'Sve lokacije', href: '/lokacije', description: 'Pronađi najbližu školu', icon: 'Location' },
          { label: 'Beograd', href: '/lokacije/beograd', description: '15 lokacija u BG', icon: 'School' },
          { label: 'Novi Sad', href: '/lokacije/novi-sad', description: '8 lokacija u NS', icon: 'School' },
          { label: 'Ostali gradovi', href: '/lokacije/ostali', description: '50+ gradova', icon: 'Location' }
        ]
      }
    ],
    featured: {
      title: 'Više od 25 godina iskustva',
      description: 'Preko 50.000 zadovoljnih učenika i 150+ franšiza',
      href: '/o-nama'
    }
  },
  {
    label: 'Kontakt',
    href: '/kontakt',
    color: 'sun',
    icon: 'Phone',
    sections: [
      {
        title: 'Kako da nas kontaktirate',
        items: [
          { label: 'Kontakt forma', href: '/kontakt#forma', description: 'Brz odgovor garantovan', icon: 'Email', featured: true },
          { label: 'Zakaži razgovor', href: '/zakazivanje', description: 'Besplatne konsultacije', icon: 'Phone', badge: 'Besplatno' },
          { label: 'Chat podrška', href: '/kontakt#chat', description: 'Trenutni odgovori', icon: 'Chat' },
          { label: 'Često postavljena pitanja', href: '/faq', description: 'Brzi odgovori', icon: 'Info' }
        ]
      },
      {
        title: 'Direktan kontakt',
        items: [
          { label: 'Telefon', href: 'tel:+381113456789', description: '011/345-67-89', icon: 'Phone' },
          { label: 'Email', href: 'mailto:info@srecnoucenje.rs', description: 'info@srecnoucenje.rs', icon: 'Email' },
          { label: 'WhatsApp', href: 'https://wa.me/381113456789', description: 'Direktne poruke', icon: 'Chat' },
          { label: 'Socijalne mreže', href: '/kontakt#social', description: 'Pratite nas', icon: 'Heart' }
        ]
      }
    ],
    featured: {
      title: 'Tu smo za vas 24/7',
      description: 'Kontaktirajte nas bilo kad - odgovaramo u roku od 2 sata',
      href: '/kontakt'
    }
  }
]

// Fallback menu items for backward compatibility
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

export default function Header({ initialSiteSettings }: { initialSiteSettings?: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [navigation, setNavigation] = useState<Navigation | null>(null)
  const [menuItems, setMenuItems] = useState<NavigationItem[]>(fallbackMenuItems)
  const [ctaButton, setCTAButton] = useState<{ text: string; href: string; style: 'primary' | 'secondary' | 'accent' }>({ text: 'Zakaži', href: '/zakazivanje', style: 'primary' })
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const { siteSettings: hookSettings } = useSiteSettings()
  const siteSettings = initialSiteSettings || hookSettings

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
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
    setActiveMegaMenu(null)
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
              <img 
                src={siteSettings.logo || "/logo.svg"} 
                alt="Srećno učenje logo" 
                className="w-full h-full object-contain" 
              />
            </motion.div>
            <div>
              <span className="text-2xl font-bold text-gray-900">{siteSettings.siteName}</span>
              <p className="text-xs text-gray-600 -mt-1">{siteSettings.siteSubtitle}</p>
            </div>
          </SafeLink>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8" ref={megaMenuRef}>
            {/* Mega Menu Items */}
            {megaMenuItems.map((item) => {
              const IconComponent = Icons[item.icon]
              const isActive = activeMegaMenu === item.label
              const isCurrentPage = pathname.startsWith(item.href)
              
              return (
                <div key={item.label} className="relative">
                  <button
                    onMouseEnter={() => setActiveMegaMenu(item.label)}
                    onClick={() => setActiveMegaMenu(isActive ? null : item.label)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isCurrentPage
                        ? `text-white bg-${item.color === 'sky' ? 'secondary' : item.color === 'grass' ? 'primary' : item.color === 'sun' ? 'accent' : item.color === 'heart' ? 'warm' : 'night'}-600`
                        : `text-gray-700 hover:text-${item.color === 'sky' ? 'secondary' : item.color === 'grass' ? 'primary' : item.color === 'sun' ? 'accent' : item.color === 'heart' ? 'warm' : 'night'}-600 hover:bg-gray-50`
                    }`}
                    aria-expanded={isActive}
                  >
                    <IconComponent size={16} animate={isActive} />
                    <span>{item.label}</span>
                    <Icons.ChevronDown 
                      size={14} 
                      className={`transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[120]"
                        onMouseLeave={() => setActiveMegaMenu(null)}
                      >
                        <div className="p-8">
                          <div className="grid grid-cols-3 gap-8">
                            {/* Menu Sections */}
                            <div className="col-span-2">
                              <div className="grid grid-cols-2 gap-8">
                                {item.sections?.map((section, sectionIndex) => (
                                  <div key={sectionIndex}>
                                    <div className="mb-4">
                                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        {section.title}
                                      </h3>
                                      {section.description && (
                                        <p className="text-sm text-gray-500">{section.description}</p>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      {section.items.map((subItem, itemIndex) => {
                                        const SubIconComponent = subItem.icon ? Icons[subItem.icon] : null
                                        return (
                                          <SafeLink
                                            key={itemIndex}
                                            href={subItem.href}
                                            className={`group flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 ${
                                              subItem.featured
                                                ? `hover:bg-${item.color === 'sky' ? 'secondary' : item.color === 'grass' ? 'primary' : item.color === 'sun' ? 'accent' : item.color === 'heart' ? 'warm' : 'night'}-50 border border-${item.color === 'sky' ? 'secondary' : item.color === 'grass' ? 'primary' : item.color === 'sun' ? 'accent' : item.color === 'heart' ? 'warm' : 'night'}-100`
                                                : 'hover:bg-gray-50'
                                            }`}
                                          >
                                            <div className={`p-2 rounded-lg ${
                                              subItem.featured
                                                ? `bg-${item.color === 'sky' ? 'secondary' : item.color === 'grass' ? 'primary' : item.color === 'sun' ? 'accent' : item.color === 'heart' ? 'warm' : 'night'}-100 text-${item.color === 'sky' ? 'secondary' : item.color === 'grass' ? 'primary' : item.color === 'sun' ? 'accent' : item.color === 'heart' ? 'warm' : 'night'}-600`
                                                : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                                            }`}>
                                              {SubIconComponent && <SubIconComponent size={16} animate={false} />}
                                            </div>
                                            <div className="flex-1">
                                              <div className="flex items-center space-x-2">
                                                <span className="text-sm font-medium text-gray-900">
                                                  {subItem.label}
                                                </span>
                                                {subItem.badge && (
                                                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                                    item.color === 'sky' ? 'bg-secondary-100 text-secondary-700' :
                                                    item.color === 'grass' ? 'bg-primary-100 text-primary-700' :
                                                    item.color === 'sun' ? 'bg-accent-100 text-accent-700' :
                                                    item.color === 'heart' ? 'bg-warm-100 text-warm-700' :
                                                    'bg-gray-100 text-gray-700'
                                                  }`}>
                                                    {subItem.badge}
                                                  </span>
                                                )}
                                              </div>
                                              {subItem.description && (
                                                <p className="text-xs text-gray-500 mt-1">
                                                  {subItem.description}
                                                </p>
                                              )}
                                            </div>
                                          </SafeLink>
                                        )
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Featured Section */}
                            <div className={`col-span-1 p-6 rounded-xl ${
                              item.color === 'sky' ? 'bg-secondary-50 border border-secondary-100' :
                              item.color === 'grass' ? 'bg-primary-50 border border-primary-100' :
                              item.color === 'sun' ? 'bg-accent-50 border border-accent-100' :
                              item.color === 'heart' ? 'bg-warm-50 border border-warm-100' :
                              'bg-gray-50 border border-gray-100'
                            }`}>
                              <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${
                                item.color === 'sky' ? 'bg-secondary-100' :
                                item.color === 'grass' ? 'bg-primary-100' :
                                item.color === 'sun' ? 'bg-accent-100' :
                                item.color === 'heart' ? 'bg-warm-100' :
                                'bg-gray-100'
                              }`}>
                                <IconComponent 
                                  size={24} 
                                  animate={true} 
                                  className={`${
                                    item.color === 'sky' ? 'text-secondary-600' :
                                    item.color === 'grass' ? 'text-primary-600' :
                                    item.color === 'sun' ? 'text-accent-600' :
                                    item.color === 'heart' ? 'text-warm-600' :
                                    'text-gray-600'
                                  }`}
                                />
                              </div>
                              <h4 className="font-semibold text-gray-900 mb-2">
                                {item.featured?.title}
                              </h4>
                              <p className="text-sm text-gray-600 mb-4">
                                {item.featured?.description}
                              </p>
                              <SafeLink
                                href={item.featured?.href || item.href}
                                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 ${
                                  item.color === 'sky' ? 'bg-secondary-600 hover:bg-secondary-700' :
                                  item.color === 'grass' ? 'bg-primary-600 hover:bg-primary-700' :
                                  item.color === 'sun' ? 'bg-accent-600 hover:bg-accent-700' :
                                  item.color === 'heart' ? 'bg-warm-600 hover:bg-warm-700' :
                                  'bg-gray-600 hover:bg-gray-700'
                                }`}
                              >
                                <span className="text-sm">Saznaj više</span>
                                <Icons.ArrowRight size={14} />
                              </SafeLink>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}

            {/* Fallback Menu Items (for backward compatibility) */}
            {menuItems.filter(item => !megaMenuItems.some(mega => mega.label === item.label)).map((item) => (
              <div key={item.label} className="relative">
                {item.subItems ? (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    className={`flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors font-medium ${
                      pathname.startsWith(item.href) ? 'text-primary-600' : ''
                    }`}
                  >
                    <span>{item.label}</span>
                    <Icons.ChevronDown 
                      size={16} 
                      className={`transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} 
                    />
                  </button>
                ) : (
                  <SafeLink
                    href={item.href || '#'}
                    className={`text-gray-700 hover:text-primary-600 transition-colors font-medium ${
                      pathname === item.href ? 'text-primary-600' : ''
                    }`}
                  >
                    {item.label}
                  </SafeLink>
                )}

                {/* Simple Dropdown Menu */}
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
                        <SafeLink
                          key={subItem.href}
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

          {/* Mobile Menu Button - Enhanced for touch */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-lg hover:bg-gray-100 transition-colors z-[110] touch-target"
            aria-label={isOpen ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <Icons.Close size={28} className="text-gray-700" animate={true} />
            ) : (
              <Icons.Menu size={28} className="text-gray-700" animate={true} />
            )}
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
              {/* Mobile Mega Menu Items */}
              {megaMenuItems.map((item) => {
                const IconComponent = Icons[item.icon]
                const isActive = activeDropdown === item.label
                const isCurrentPage = pathname.startsWith(item.href)
                
                return (
                  <div key={item.label} className="border-b border-gray-100 last:border-b-0">
                    <button
                      onClick={() => setActiveDropdown(isActive ? null : item.label)}
                      className={`w-full flex items-center justify-between px-4 py-4 rounded-lg transition-all duration-200 touch-target ${
                        isCurrentPage
                          ? `bg-${item.color === 'sky' ? 'secondary' : item.color === 'grass' ? 'primary' : item.color === 'sun' ? 'accent' : item.color === 'heart' ? 'warm' : 'night'}-50 text-${item.color === 'sky' ? 'secondary' : item.color === 'grass' ? 'primary' : item.color === 'sun' ? 'accent' : item.color === 'heart' ? 'warm' : 'night'}-700`
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      aria-expanded={isActive}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          isCurrentPage
                            ? `bg-${item.color === 'sky' ? 'secondary' : item.color === 'grass' ? 'primary' : item.color === 'sun' ? 'accent' : item.color === 'heart' ? 'warm' : 'night'}-100`
                            : 'bg-gray-100'
                        }`}>
                          <IconComponent 
                            size={18} 
                            animate={isActive} 
                            className={isCurrentPage 
                              ? `text-${item.color === 'sky' ? 'secondary' : item.color === 'grass' ? 'primary' : item.color === 'sun' ? 'accent' : item.color === 'heart' ? 'warm' : 'night'}-600`
                              : 'text-gray-600'
                            }
                          />
                        </div>
                        <span className="font-medium text-left">{item.label}</span>
                      </div>
                      <Icons.ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pb-4"
                        >
                          {item.sections?.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="mb-4">
                              <div className="px-4 py-2">
                                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                                  {section.title}
                                </h4>
                                {section.description && (
                                  <p className="text-xs text-gray-500 mb-3">{section.description}</p>
                                )}
                              </div>
                              <div className="space-y-1">
                                {section.items.map((subItem, itemIndex) => {
                                  const SubIconComponent = subItem.icon ? Icons[subItem.icon] : null
                                  return (
                                    <SafeLink
                                      key={itemIndex}
                                      href={subItem.href}
                                      className={`flex items-center space-x-3 px-8 py-3 text-gray-600 hover:bg-gray-50 transition-colors touch-target ${
                                        subItem.featured ? `border-l-2 border-${item.color === 'sky' ? 'secondary' : item.color === 'grass' ? 'primary' : item.color === 'sun' ? 'accent' : item.color === 'heart' ? 'warm' : 'night'}-400` : ''
                                      }`}
                                    >
                                      {SubIconComponent && (
                                        <div className={`p-1.5 rounded-md ${
                                          subItem.featured
                                            ? `bg-${item.color === 'sky' ? 'secondary' : item.color === 'grass' ? 'primary' : item.color === 'sun' ? 'accent' : item.color === 'heart' ? 'warm' : 'night'}-100 text-${item.color === 'sky' ? 'secondary' : item.color === 'grass' ? 'primary' : item.color === 'sun' ? 'accent' : item.color === 'heart' ? 'warm' : 'night'}-600`
                                            : 'bg-gray-100 text-gray-500'
                                        }`}>
                                          <SubIconComponent size={14} animate={false} />
                                        </div>
                                      )}
                                      <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                          <span className="text-sm font-medium">{subItem.label}</span>
                                          {subItem.badge && (
                                            <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${
                                              item.color === 'sky' ? 'bg-secondary-100 text-secondary-700' :
                                              item.color === 'grass' ? 'bg-primary-100 text-primary-700' :
                                              item.color === 'sun' ? 'bg-accent-100 text-accent-700' :
                                              item.color === 'heart' ? 'bg-warm-100 text-warm-700' :
                                              'bg-gray-100 text-gray-700'
                                            }`}>
                                              {subItem.badge}
                                            </span>
                                          )}
                                        </div>
                                        {subItem.description && (
                                          <p className="text-xs text-gray-500 mt-0.5">
                                            {subItem.description}
                                          </p>
                                        )}
                                      </div>
                                    </SafeLink>
                                  )
                                })}
                              </div>
                            </div>
                          ))}
                          
                          {/* Featured CTA for Mobile */}
                          {item.featured && (
                            <div className={`mx-4 mt-4 p-4 rounded-lg ${
                              item.color === 'sky' ? 'bg-secondary-50 border border-secondary-100' :
                              item.color === 'grass' ? 'bg-primary-50 border border-primary-100' :
                              item.color === 'sun' ? 'bg-accent-50 border border-accent-100' :
                              item.color === 'heart' ? 'bg-warm-50 border border-warm-100' :
                              'bg-gray-50 border border-gray-100'
                            }`}>
                              <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                                {item.featured.title}
                              </h4>
                              <p className="text-xs text-gray-600 mb-3">
                                {item.featured.description}
                              </p>
                              <SafeLink
                                href={item.featured.href || item.href}
                                className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-white text-sm transition-colors ${
                                  item.color === 'sky' ? 'bg-secondary-600 hover:bg-secondary-700' :
                                  item.color === 'grass' ? 'bg-primary-600 hover:bg-primary-700' :
                                  item.color === 'sun' ? 'bg-accent-600 hover:bg-accent-700' :
                                  item.color === 'heart' ? 'bg-warm-600 hover:bg-warm-700' :
                                  'bg-gray-600 hover:bg-gray-700'
                                }`}
                              >
                                <span>Saznaj više</span>
                                <Icons.ArrowRight size={12} />
                              </SafeLink>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
              
              {/* Fallback Menu Items */}
              {menuItems.filter(item => !megaMenuItems.some(mega => mega.label === item.label)).map((item) => (
                <div key={item.label}>
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between px-4 py-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors touch-target"
                        aria-expanded={activeDropdown === item.label}
                      >
                        <span className="font-medium">{item.label}</span>
                        <Icons.ChevronDown 
                          size={16} 
                          className={`transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} 
                        />
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
                              <SafeLink
                                key={subItem.href}
                                href={subItem.href || '#'}
                                className="block px-4 py-3 text-gray-600 hover:text-primary-600 transition-colors touch-target"
                              >
                                {subItem.label}
                              </SafeLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <SafeLink
                      href={item.href || '#'}
                      className={`block px-4 py-4 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium touch-target ${
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