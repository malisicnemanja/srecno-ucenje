'use client'

import { useState } from 'react'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import { useSanityQuery } from '@/hooks/useSanity'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { motion, AnimatePresence } from 'framer-motion'
import {
  EmailIcon,
  PhoneIcon,
  LocationIcon,
  CheckIcon,
  ArrowRightIcon,
  StarIcon,
  HeartIcon,
  TrophyIcon,
  InfoIcon
} from '@/components/ui/Icons'

const footerQuery = `*[_type == "siteSettings"][0]{
  navigationSettings{
    footer{
      columns[]{
        title,
        colorAccent,
        links[]{
          label,
          link
        }
      },
      contactInfo{
        email,
        phone,
        website
      }
    }
  }
}`

// Social Media Icons (SVG components)
const FacebookIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const InstagramIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const YouTubeIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const LinkedInIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

export default function Footer() {
  const { data: footerData } = useSanityQuery(footerQuery)
  const { siteSettings } = useSiteSettings()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const footerColumns = footerData?.navigationSettings?.footer?.columns || [
    {
      title: "O nama",
      colorAccent: "primary",
      links: [
        { label: "Metodologija", link: "/metodologija" },
        { label: "Priče uspeha", link: "/uspeh" },
        { label: "O autorki", link: "/o-autorki" },
        { label: "Blog", link: "/blog" }
      ]
    },
    {
      title: "Franšiza",
      colorAccent: "secondary", 
      links: [
        { label: "Modeli franšize", link: "/fransiza-modeli" },
        { label: "Kako se pridružiti", link: "/kako-se-pridruziti" },
        { label: "Lokacije", link: "/lokacije" },
        { label: "FAQ", link: "/faq" }
      ]
    },
    {
      title: "Resursi",
      colorAccent: "accent",
      links: [
        { label: "Preuzmi materijale", link: "/resursi" },
        { label: "Preporučene knjige", link: "/knjige" },
        { label: "Obuka & Mentorstvo", link: "/obuka-mentorstvo" },
        { label: "Kontakt", link: "/kontakt" }
      ]
    }
  ]

  const getHeaderColor = (colorAccent: string) => {
    const colorClasses = {
      primary: 'text-grass',
      secondary: 'text-sky', 
      accent: 'text-sun',
      warm: 'text-heart'
    }
    return colorClasses[colorAccent as keyof typeof colorClasses] || 'text-white'
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubscribed(true)
    setIsSubmitting(false)
    setEmail('')
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Decorative Wave Pattern */}
      <div className="relative">
        <svg 
          className="w-full h-12 sm:h-16 text-grass" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <motion.path 
            d="M0,60 C300,120 900,0 1200,60 L1200,0 L0,0 Z" 
            fill="currentColor"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Animated decorative circles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <motion.div 
            className="absolute top-2 left-1/4 w-3 h-3 bg-sky rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0 }}
          />
          <motion.div 
            className="absolute top-6 right-1/3 w-2 h-2 bg-sun rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
          />
          <motion.div 
            className="absolute top-4 right-1/4 w-4 h-4 bg-heart rounded-full"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.9, 0.5]
            }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
          />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-night text-white relative">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
          
          {/* Newsletter Section */}
          <motion.div 
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
              Ostanite u toku sa našim novostima
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Pridružite se našoj zajednici i budite prvi koji će saznati o novim programima, 
              resursima i mogućnostima za učenje.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="relative flex-1">
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Vaša email adresa"
                  className="w-full px-4 py-3 rounded-lg bg-night-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky focus:ring-opacity-20 transition-all duration-300"
                  whileFocus={{ scale: 1.02 }}
                  disabled={isSubmitting || isSubscribed}
                />
                <AnimatePresence>
                  {isSubscribed && (
                    <motion.div 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      <CheckIcon size={20} className="text-grass" animate={false} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubscribed || !email}
                className="px-6 py-3 bg-grass text-white rounded-lg font-semibold hover:bg-grass-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 min-w-32"
                whileHover={!isSubmitting && !isSubscribed ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isSubscribed ? (
                  <>Hvala!</>
                ) : (
                  <>Prijaviť se <ArrowRightIcon size={16} animate={false} /></>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            
            {/* Dynamic columns from CMS */}
            {footerColumns.map((column: any, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className={`font-semibold mb-4 text-lg ${getHeaderColor(column.colorAccent)}`}>
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links?.map((link: any, linkIndex: number) => (
                    <motion.li key={linkIndex}>
                      <SafeLink 
                        href={link.link || '#'} 
                        className="text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                      >
                        <motion.span 
                          className="group-hover:translate-x-1 transition-transform duration-300"
                        >
                          {link.label}
                        </motion.span>
                        <ArrowRightIcon 
                          size={14} 
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                          animate={false}
                        />
                      </SafeLink>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4 text-lg text-white flex items-center gap-2">
                <LocationIcon size={20} className="text-sky" animate={false} />
                Kontakt
              </h4>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300">
                  <EmailIcon size={18} className="text-grass" animate={false} />
                  <span>{siteSettings?.email || 'carobnoselo@gmail.com'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300">
                  <PhoneIcon size={18} className="text-sun" animate={false} />
                  <span>{siteSettings?.phone || '063.394.251'}</span>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="mb-6">
                <h5 className="font-medium mb-3 text-white">Pratite nas</h5>
                <div className="flex gap-3">
                  {[
                    { icon: FacebookIcon, href: '#', color: 'hover:text-sky' },
                    { icon: InstagramIcon, href: '#', color: 'hover:text-heart' },
                    { icon: YouTubeIcon, href: '#', color: 'hover:text-sun' },
                    { icon: LinkedInIcon, href: '#', color: 'hover:text-grass' }
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.href}
                      className={`text-gray-400 ${social.color} transition-all duration-300 p-2 rounded-full hover:bg-night-700`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Trust Badges & Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4 text-lg text-white flex items-center gap-2">
                <TrophyIcon size={20} className="text-sun" animate={false} />
                Sertifikati
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-night-700 rounded-lg">
                  <StarIcon size={20} className="text-sun" animate={false} />
                  <div>
                    <div className="text-sm font-medium text-white">ISO 9001:2015</div>
                    <div className="text-xs text-gray-400">Sistem kvaliteta</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-night-700 rounded-lg">
                  <HeartIcon size={20} className="text-heart" animate={false} />
                  <div>
                    <div className="text-sm font-medium text-white">UNICEF Partner</div>
                    <div className="text-xs text-gray-400">Obrazovni program</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-night-700 rounded-lg">
                  <CheckIcon size={20} className="text-grass" animate={false} />
                  <div>
                    <div className="text-sm font-medium text-white">EU Standardi</div>
                    <div className="text-xs text-gray-400">Obrazovanje 2024</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Legal Links & Copyright */}
          <motion.div 
            className="border-t border-gray-700 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              
              {/* Logo & Brand */}
              <div className="flex items-center">
                <motion.div 
                  className="w-12 h-12 mr-4"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {siteSettings.logo ? (
                    <img 
                      src={siteSettings.logo} 
                      alt={`${siteSettings.siteName} logo`} 
                      className="w-full h-full object-contain" 
                    />
                  ) : (
                    <div className="w-full h-full bg-grass rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">S</span>
                    </div>
                  )}
                </motion.div>
                <div>
                  <span className="text-xl font-bold text-white">{siteSettings.siteName}</span>
                  <p className="text-sm text-gray-400">Obrazovanje kroz igru i radost</p>
                </div>
              </div>
              
              {/* Legal Links */}
              <div className="flex flex-wrap justify-center lg:justify-end items-center gap-1 text-sm">
                <SafeLink 
                  href="/legal/privatnost" 
                  className="text-gray-400 hover:text-white px-3 py-1 rounded transition-colors duration-300"
                >
                  Politika privatnosti
                </SafeLink>
                <span className="text-gray-600">•</span>
                <SafeLink 
                  href="/legal/uslovi-koriscenja" 
                  className="text-gray-400 hover:text-white px-3 py-1 rounded transition-colors duration-300"
                >
                  Uslovi korišćenja
                </SafeLink>
                <span className="text-gray-600">•</span>
                <SafeLink 
                  href="/legal/kolacici" 
                  className="text-gray-400 hover:text-white px-3 py-1 rounded transition-colors duration-300"
                >
                  Kolačići
                </SafeLink>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="text-center mt-6 pt-6 border-t border-gray-800">
              <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
                © 2024 Srećno učenje. Sva prava zadržana.
                <HeartIcon size={16} className="text-heart" animate />
                Napravljeno sa ljubavlju za decu.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}