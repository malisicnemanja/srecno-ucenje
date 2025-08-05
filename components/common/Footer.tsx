'use client'

import Link from 'next/link'
import { useSanityQuery } from '@/hooks/useSanity'
import { MailIcon, PhoneIcon, GlobeIcon } from '@/components/icons'

const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName,
  email,
  phone,
  address,
  socialLinks[],
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

export default function Footer() {
  const { data: siteSettings } = useSanityQuery(siteSettingsQuery)
  
  const footerColumns = siteSettings?.navigationSettings?.footer?.columns || [
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
      primary: 'text-grass-400',
      secondary: 'text-sky-400', 
      accent: 'text-sun-400',
      warm: 'text-heart-400'
    }
    return colorClasses[colorAccent as keyof typeof colorClasses] || 'text-white'
  }

  return (
    <footer className="bg-night-800 text-white py-12 sm:py-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-400 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-secondary-400 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-400 rounded-full filter blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Dynamic columns from CMS */}
          {footerColumns.map((column: any, index: number) => (
            <div key={index}>
              <h4 className={`font-semibold mb-4 ${getHeaderColor(column.colorAccent)}`}>
                {column.title}
              </h4>
              <ul className="space-y-2 text-gray-400">
                {column.links?.map((link: any, linkIndex: number) => (
                  <li key={linkIndex}>
                    <Link href={link.link} className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Contact column */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Kontakt</h4>
            <div className="space-y-3 text-gray-400 mb-4">
              <div className="flex items-center gap-2">
                <MailIcon size={16} />
                <span>{siteSettings?.email || 'carobnoselo@gmail.com'}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon size={16} />
                <span>{siteSettings?.phone || '063.394.251'}</span>
              </div>
              <div className="flex items-center gap-2">
                <GlobeIcon size={16} />
                <span>{siteSettings?.navigationSettings?.footer?.contactInfo?.website || 'www.carobnoselo.edu.rs'}</span>
              </div>
            </div>
            <div className="space-y-2 text-gray-400 text-sm">
              <Link href="/legal/privatnost" className="block hover:text-white transition-all duration-300 hover:translate-x-1">
                Politika privatnosti
              </Link>
              <Link href="/legal/uslovi-koriscenja" className="block hover:text-white transition-all duration-300 hover:translate-x-1">
                Uslovi korišćenja
              </Link>
            </div>
          </div>
        </div>
        
        {/* Logo & Copyright */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mr-3 transition-all duration-300 hover:scale-110 hover:bg-primary-400">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold">{siteSettings?.siteName || 'Srećno učenje'}</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 Srećno učenje. Sva prava zadržana.
          </p>
        </div>
      </div>
    </footer>
  )
}