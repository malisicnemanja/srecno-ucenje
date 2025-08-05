'use client'

import Link from 'next/link'
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
        return 'text-secondary-400'
      case 'accent':
        return 'text-accent-400'
      case 'warm':
        return 'text-warm-400'
      default:
        return 'text-primary-400'
    }
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Dynamic Footer Columns */}
          {footerColumns.map((column: any, index: number) => (
            <div key={index}>
              <h4 className={`font-semibold mb-4 text-white ${column.colorAccent ? getColorClass(column.colorAccent) : ''}`}>
                {column.title}
              </h4>
              <ul className="space-y-2 text-gray-400">
                {column.links?.map((link: any, linkIndex: number) => (
                  <li key={linkIndex}>
                    <Link href={link.href || link.link} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Contact Column */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Kontakt</h4>
            <div className="text-gray-400 mb-4 space-y-2">
              {contactInfo.email && (
                <p className="flex items-center">
                  <Mail size={16} className="mr-2" /> 
                  {contactInfo.email}
                </p>
              )}
              {contactInfo.phone && (
                <p className="flex items-center">
                  <Phone size={16} className="mr-2" /> 
                  {contactInfo.phone}
                </p>
              )}
              {contactInfo.address && (
                <p className="flex items-center">
                  <Globe size={16} className="mr-2" /> 
                  {contactInfo.address}
                </p>
              )}
            </div>
            <div className="space-y-2 text-gray-400 text-sm">
              <Link href="/legal/privatnost" className="block hover:text-white transition-colors">
                Politika privatnosti
              </Link>
              <Link href="/legal/uslovi-koriscenja" className="block hover:text-white transition-colors">
                Uslovi korišćenja
              </Link>
            </div>
          </div>
        </div>
        
        {/* Logo & Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              {contactInfo.logo ? (
                <img 
                  src={contactInfo.logo} 
                  alt={contactInfo.siteName} 
                  className="h-14 w-auto"
                />
              ) : (
                <>
                  <div className="w-14 h-14 gradient-primary rounded-full flex items-center justify-center shadow-lg shadow-primary-500/25">
                    <span className="text-white font-bold text-2xl">SU</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{contactInfo.siteName}</h3>
                    <p className="text-gray-300 text-sm">Franšiza obrazovne metodologije</p>
                  </div>
                </>
              )}
            </div>
            
            <div className="text-center md:text-right text-gray-400 text-sm">
              <p>&copy; {new Date().getFullYear()} {contactInfo.siteName}. Sva prava zadržana.</p>
              <p className="mt-1">Metodologija Srećno učenje je autorsko delo Željane Radojičić Lukić.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}