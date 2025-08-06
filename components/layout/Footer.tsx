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
        return 'u-text-brand-sky'
      case 'accent':
        return 'u-text-brand-sun'
      case 'warm':
        return 'u-text-brand-heart'
      default:
        return 'u-text-brand-grass'
    }
  }

  return (
    <footer className="l-footer">
      <div className="container">
        <div className="o-grid o-grid--1 md:o-grid--2 lg:o-grid--4 o-grid--gap-lg u-m-b-xl">
          {/* Dynamic Footer Columns */}
          {footerColumns.map((column: any, index: number) => (
            <div key={index}>
              <h4 className={`c-footer-heading ${column.colorAccent ? getColorClass(column.colorAccent) : ''}`}>
                {column.title}
              </h4>
              <ul className="c-footer-links">
                {column.links?.map((link: any, linkIndex: number) => (
                  <li key={linkIndex}>
                    <SafeLink href={link.href || link.link || '#'} className="c-footer-link">
                      {link.label}
                    </SafeLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Contact Column */}
          <div>
            <h4 className="c-footer-heading">Kontakt</h4>
            <div className="c-contact-info u-m-b-md">
              {contactInfo.email && (
                <p className="o-cluster">
                  <Mail size={16} className="u-mr-xs" /> 
                  {contactInfo.email}
                </p>
              )}
              {contactInfo.phone && (
                <p className="o-cluster">
                  <Phone size={16} className="u-mr-xs" /> 
                  {contactInfo.phone}
                </p>
              )}
              {contactInfo.address && (
                <p className="o-cluster">
                  <Globe size={16} className="u-mr-xs" /> 
                  {contactInfo.address}
                </p>
              )}
            </div>
            <div className="c-legal-links">
              <SafeLink href="/legal/privatnost" className="c-legal-link">
                Politika privatnosti
              </SafeLink>
              <SafeLink href="/legal/uslovi-koriscenja" className="c-legal-link">
                Uslovi korišćenja
              </SafeLink>
            </div>
          </div>
        </div>
        
        {/* Logo & Copyright */}
        <div className="c-footer-bottom">
          <div className="c-footer-bottom__content">
            <div className="c-footer-brand">
              {contactInfo.logo ? (
                <img 
                  src={contactInfo.logo} 
                  alt={contactInfo.siteName} 
                  className="c-footer-logo"
                />
              ) : (
                <>
                  <div className="c-footer-logo-circle">
                    <span className="c-footer-logo-text">SU</span>
                  </div>
                  <div>
                    <h3 className="c-footer-site-name">{contactInfo.siteName}</h3>
                    <p className="c-footer-tagline">Franšiza obrazovne metodologije</p>
                  </div>
                </>
              )}
            </div>
            
            <div className="c-footer-copyright">
              <p>&copy; {new Date().getFullYear()} {contactInfo.siteName}. Sva prava zadržana.</p>
              <p className="u-m-t-xs">Metodologija Srećno učenje je autorsko delo Željane Radojičić Lukić.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}