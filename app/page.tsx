'use client'

import { PartnershipIcon, TrendingUpIcon } from '@/components/icons'
import { homePageQuery } from '@/lib/sanity.queries'
import { sanityFetch } from '@/lib/sanity.client'
import { useState, useEffect } from 'react'
import HeroSection from '@/components/features/cms/HeroSection'
import type { HeroSectionProps } from '@/components/features/cms/HeroSection'

export default function HomePage() {
  const [currentVariant, setCurrentVariant] = useState(0)
  const [pageData, setPageData] = useState<any>(null)

  // Fetch data from Sanity on client side
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sanityFetch({ query: homePageQuery })
        setPageData(data)
      } catch (error) {
        console.error('Error fetching Sanity data:', error)
      }
    }
    fetchData()
  }, [])

  // Hero variants configuration
  const heroVariants: HeroSectionProps[] = [
    {
      // Variant 1: Main homepage hero - centered
      layout: 'centered',
      title: 'Otvori vrata svojoj učionici iz',
      alternatingWords: ['snova', 'budućnosti', 'maštanja', 'inspiracije'],
      subtitle: 'Postanite deo mreže koja je već inspirisala 20.000+ dece da uče srcem kroz metodologiju Srećnog učenja',
      buttons: [
        { text: 'Zakaži razgovor', href: '/kontakt', variant: 'primary' },
        { text: 'Saznaj više', href: '/o-nama', variant: 'secondary' }
      ],
      floatingElements: [
        { id: 'sun1', type: 'star', position: { top: '20%', left: '10%' }, size: 'md', color: 'sun', animation: 'float' },
        { id: 'sky1', type: 'circle', position: { top: '30%', right: '15%' }, size: 'sm', color: 'sky', animation: 'pulse' },
        { id: 'grass1', type: 'triangle', position: { bottom: '30%', left: '20%' }, size: 'lg', color: 'grass', animation: 'drift' },
        { id: 'heart1', type: 'square', position: { bottom: '20%', right: '10%' }, size: 'sm', color: 'heart', animation: 'rotate' }
      ],
      backgroundColor: 'sky'
    },
    {
      // Variant 2: Franchise focus - split-left
      layout: 'split-left',
      title: 'Pokrenite franšizu koja menja',
      alternatingWords: ['živote', 'budućnost', 'perspektivu', 'zajednicu'],
      subtitle: 'Pridružite se mreži od 50+ uspešnih franšiznih partnera u 10 zemalja koji transformišu obrazovanje kroz metodologiju Srećnog učenja',
      buttons: [
        { text: 'Podnesite prijavu', href: '/fransiza/prijava', variant: 'primary' },
        { text: 'Preuzmi info-paket', href: '/kako-se-pridruziti', variant: 'outline' }
      ],
      visual: {
        type: 'illustration',
        src: '/images/franchise-illustration.png',
        alt: 'Franšiza ilustracija'
      },
      floatingElements: [
        { id: 'sun2', type: 'circle', position: { top: '15%', right: '5%' }, size: 'lg', color: 'sun', animation: 'float' },
        { id: 'grass2', type: 'star', position: { bottom: '25%', left: '5%' }, size: 'md', color: 'grass', animation: 'pulse' }
      ],
      backgroundColor: 'sun'
    },
    {
      // Variant 3: Education focus - split-right
      layout: 'split-right',
      title: 'Obrazovanje koje razvija',
      alternatingWords: ['srce', 'um', 'karakter', 'vrline'],
      subtitle: 'Jedinstvena metodologija koja kombinuje akademski uspeh sa razvojem emocionalnih i socijalnih veština kroz igru i kreativnost',
      buttons: [
        { text: 'Pronađi lokaciju', href: '/skole', variant: 'primary' },
        { text: 'Saznaj o programu', href: '/o-nama', variant: 'secondary' }
      ],
      visual: {
        type: 'illustration',
        src: '/images/education-illustration.png',
        alt: 'Obrazovanje ilustracija'
      },
      floatingElements: [
        { id: 'grass3', type: 'wave', position: { top: '20%', left: '10%' }, size: 'md', color: 'grass', animation: 'drift' },
        { id: 'heart3', type: 'circle', position: { bottom: '20%', right: '15%' }, size: 'sm', color: 'heart', animation: 'pulse' },
        { id: 'sky3', type: 'triangle', position: { top: '40%', left: '5%' }, size: 'lg', color: 'sky', animation: 'float' }
      ],
      backgroundColor: 'grass'
    },
    {
      // Variant 4: Achievements focus - full-stats
      layout: 'full-stats',
      title: 'Rezultati koji govore',
      alternatingWords: ['sami', 'jasno', 'istinu', 'sve'],
      subtitle: 'Više od decenije uspešnog rada sa decom, roditeljima i partnerima širom sveta koji veruju u transformativnu snagu Srećnog učenja',
      buttons: [
        { text: 'Postani partner', href: '/fransiza', variant: 'primary' },
        { text: 'Čitaj priče', href: '/uspesne-price', variant: 'outline' }
      ],
      stats: [
        { value: '20000', label: 'Dece u programu', suffix: '+', animated: true },
        { value: '50', label: 'Aktiwnih lokacija', suffix: '+', animated: true },
        { value: '10', label: 'Zemalja', suffix: '', animated: false },
        { value: '15', label: 'Godina iskustva', suffix: '+', animated: true }
      ],
      floatingElements: [
        { id: 'heart4', type: 'star', position: { top: '10%', left: '15%' }, size: 'sm', color: 'heart', animation: 'rotate' },
        { id: 'night4', type: 'square', position: { top: '25%', right: '20%' }, size: 'md', color: 'night', animation: 'pulse' },
        { id: 'sun4', type: 'circle', position: { bottom: '15%', left: '10%' }, size: 'lg', color: 'sun', animation: 'float' }
      ],
      backgroundColor: 'heart'
    }
  ]

  return (
    <>
      {/* Variant Selector - Demo showcase */}
      <div className="fixed top-20 right-4 z-50 bg-white rounded-lg shadow-lg p-2 border" role="region" aria-label="Demo kontrole">
        <div className="text-xs text-gray-600 mb-2 px-2">Hero varijante:</div>
        <div className="flex flex-col gap-1" role="group" aria-label="Izbor hero varijante">
          {heroVariants.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVariant(index)}
              className={`px-3 py-1 text-xs rounded transition-colors focus:outline-none focus:ring-2 focus:ring-brand-sun focus:ring-offset-2 min-h-[32px] ${
                currentVariant === index
                  ? 'bg-sky-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-pressed={currentVariant === index}
              aria-label={`Prikaži ${['Početna', 'Franšiza', 'Obrazovanje', 'Rezultati'][index]} varijanta hero sekcije`}
            >
              {['Početna', 'Franšiza', 'Obrazovanje', 'Rezultati'][index]}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section with current variant */}
      <HeroSection {...heroVariants[currentVariant]} />

      {/* Features Grid - Updated to use solid colors */}
      <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
        {/* Background decorations - No gradients */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-sky-100 rounded-full opacity-30 animate-gentle-float"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-sun-100 rounded-full opacity-30 animate-float-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-h2-mobile md:text-h2-tablet lg:text-h2-desktop font-bold text-night-700 mb-4">
              Zašto odabrati <span className="text-sky-600">Srećno učenje</span>?
            </h2>
            <p className="text-body-mobile md:text-body-tablet text-gray-600 max-w-2xl mx-auto">
              Pridružite se obrazovnoj revoluciji koja je već transformisala živote hiljada dece širom sveta
            </p>
          </div>
          
          {/* Features Grid - Mobile responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {((pageData?.features) || [
              { icon: "✓", title: "Testiran model", description: "20.000+ dece u 10 zemalja" },
              { icon: "partnership", title: "Kompletna podrška", description: "Obuke, mentorstvo, materijali" },
              { icon: "🌱", title: "Podsticajna sredina", description: "Prostor koji razvija vrline" },
              { icon: "trending", title: "Dokazana uspešnost", description: "Merljivi rezultati" }
            ]).map((feature: any, i: number) => {
              const colors = [
                { bg: 'bg-sky-50', border: 'border-sky-200', icon: 'text-sky-600', accent: 'bg-sky-500' },
                { bg: 'bg-grass-50', border: 'border-grass-200', icon: 'text-grass-600', accent: 'bg-grass-500' },
                { bg: 'bg-sun-50', border: 'border-sun-200', icon: 'text-sun-600', accent: 'bg-sun-500' },
                { bg: 'bg-heart-50', border: 'border-heart-200', icon: 'text-heart-600', accent: 'bg-heart-500' }
              ][i % 4]
              
              return (
                <div 
                  key={i} 
                  className={`group relative p-6 ${colors.bg} ${colors.border} border-2 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer`}
                >
                  {/* Hover accent */}
                  <div className={`absolute top-0 left-6 w-12 h-1 ${colors.accent} rounded-b-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 ${colors.accent} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon === 'partnership' ? (
                      <PartnershipIcon size={24} className="text-white" />
                    ) : feature.icon === 'trending' ? (
                      <TrendingUpIcon size={24} className="text-white" />
                    ) : (
                      <span className="text-2xl text-white">{feature.icon}</span>
                    )}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-h3-mobile font-bold text-night-700 mb-2 group-hover:text-sky-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-small-mobile md:text-body-tablet text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Decorative dot */}
                  <div className={`absolute bottom-4 right-4 w-2 h-2 ${colors.accent} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              )
            })}
          </div>
          
          {/* Call to Action - No gradients */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-sky-50 rounded-full border border-sky-200">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`w-8 h-8 bg-${['sky', 'sun', 'grass', 'heart'][i-1]}-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                    {i}
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium text-night-700">
                Već <span className="font-bold text-sky-600">20.000+</span> dece u <span className="font-bold text-grass-600">10 zemalja</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
