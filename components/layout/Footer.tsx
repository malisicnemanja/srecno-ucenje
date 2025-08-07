'use client'

import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import { Mail, Phone, Globe } from 'lucide-react'
import { useSiteSettings } from '@/contexts/SiteSettingsContext'

export default function Footer() {
  const { siteSettings, navigation } = useSiteSettings()
  
  // Default footer data
  const defaultFooterColumns = [
    {
      title: 'O nama',
      links: [
        { label: 'Metodologija', href: '/metodologija' },
        { label: 'Priče uspeha', href: '/uspeh' },
        { label: 'O autorki', href: '/o-autorki' },
        { label: 'Blog', href: '/blog' },
      ]
    },
    {
      title: 'Franšiza',
      links: [
        { label: 'Modeli franšize', href: '/fransiza-modeli' },
        { label: 'Kako se pridružiti', href: '/kako-se-pridruziti' },
        { label: 'Lokacije', href: '/lokacije' },
        { label: 'FAQ', href: '/faq' },
      ]
    },
    {
      title: 'Resursi',
      links: [
        { label: 'Preuzmi materijale', href: '/resursi' },
        { label: 'Preporučene knjige', href: '/knjige' },
        { label: 'Obuka & Mentorstvo', href: '/obuka-mentorstvo' },
        { label: 'Kontakt', href: '/kontakt' },
      ]
    }
  ]
  
  const footerColumns = siteSettings?.navigationSettings?.footer?.columns || defaultFooterColumns
  const contactInfo = siteSettings || {
    email: 'carobnoselo@gmail.com',
    phone: '063.394.251',
    address: 'www.carobnoselo.edu.rs',
    siteName: 'Srećno učenje'
  }
  
  const getColorClass = (color: string) => {
    switch (color) {
      case 'secondary':
        return 'text-brand-sky'
      case 'accent':
        return 'text-brand-sun'
      case 'warm':
        return 'text-brand-heart'
      default:
        return 'text-brand-grass'
    }
  }

  return (
    <footer 
      id="footer-content" 
      className="bg-gray-50 pt-16 pb-8" 
      role="contentinfo" 
      aria-label="Podnožje stranice"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Dynamic Footer Columns */}
          {footerColumns.map((column: any, index: number) => (
            <div key={index}>
              <h4 className={`text-lg font-semibold mb-4 ${column.colorAccent ? getColorClass(column.colorAccent) : 'text-brand-grass'}`}>
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links?.map((link: any, linkIndex: number) => (
                  <li key={linkIndex}>
                    <SafeLink 
                      href={link.href || link.link || '#'} 
                      className="text-gray-600 hover:text-brand-grass transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-sun focus:ring-offset-2 rounded min-h-[44px] flex items-center"
                    >
                      {link.label}
                    </SafeLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Contact Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brand-grass">Kontakt</h4>
            <div className="space-y-2 mb-4">
              {contactInfo.email && (
                <p className="flex items-center text-gray-600">
                  <Mail size={16} className="mr-2" aria-hidden="true" /> 
                  <a 
                    href={`mailto:${contactInfo.email}`} 
                    className="hover:text-brand-grass transition-colors focus:outline-none focus:ring-2 focus:ring-brand-sun focus:ring-offset-2 rounded"
                    aria-label={`Pošaljite email na ${contactInfo.email}`}
                  >
                    {contactInfo.email}
                  </a>
                </p>
              )}
              {contactInfo.phone && (
                <p className="flex items-center text-gray-600">
                  <Phone size={16} className="mr-2" aria-hidden="true" /> 
                  <a 
                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} 
                    className="hover:text-brand-grass transition-colors focus:outline-none focus:ring-2 focus:ring-brand-sun focus:ring-offset-2 rounded"
                    aria-label={`Pozovite na broj ${contactInfo.phone}`}
                  >
                    {contactInfo.phone}
                  </a>
                </p>
              )}
              {contactInfo.address && (
                <p className="flex items-center text-gray-600">
                  <Globe size={16} className="mr-2" aria-hidden="true" /> 
                  <a 
                    href={`https://${contactInfo.address}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-brand-grass transition-colors focus:outline-none focus:ring-2 focus:ring-brand-sun focus:ring-offset-2 rounded"
                    aria-label={`Posetite web sajt ${contactInfo.address} (otvara se u novom prozoru)`}
                  >
                    {contactInfo.address}
                  </a>
                </p>
              )}
            </div>
            <div className="space-y-2">
              <SafeLink 
                href="/legal/privatnost" 
                className="block text-sm text-gray-500 hover:text-brand-grass transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-sun focus:ring-offset-2 rounded min-h-[44px] flex items-center"
              >
                Politika privatnosti
              </SafeLink>
              <SafeLink 
                href="/legal/uslovi-koriscenja" 
                className="block text-sm text-gray-500 hover:text-brand-grass transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-sun focus:ring-offset-2 rounded min-h-[44px] flex items-center"
              >
                Uslovi korišćenja
              </SafeLink>
            </div>
          </div>
        </div>
        
        {/* Logo & Copyright */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              {contactInfo.logo ? (
                <img 
                  src={contactInfo.logo} 
                  alt={`${contactInfo.siteName} logo`} 
                  className="h-10 w-auto"
                  width="auto"
                  height="40"
                />
              ) : (
                <>
                  <div className="w-10 h-10 bg-brand-grass rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">SU</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{contactInfo.siteName}</h3>
                    <p className="text-sm text-gray-600">Franšiza obrazovne metodologije</p>
                  </div>
                </>
              )}
            </div>
            
            <div className="text-sm text-gray-500">
              <p>&copy; {new Date().getFullYear()} {contactInfo.siteName}. Sva prava zadržana.</p>
              <p className="mt-1">Metodologija Srećno učenje je autorsko delo Željane Radojičić Lukić.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}