'use client'

/**
 * PageBuilder Example - Primer korišćenja PageBuilder sistema
 */

import React from 'react'
import PageBuilder from '@/components/features/cms/PageBuilder'
import { SanitySection } from '@/types/sections'

// Mock data for demonstration
const mockSections: SanitySection[] = [
  // Hero sekcija
  {
    _id: 'hero-1',
    _type: 'hero',
    layout: 'split-left',
    title: 'Dobrodošli u svet dinamičkog sadržaja',
    alternatingWords: ['inovativnog', 'kreativnog', 'edukativnog'],
    subtitle: 'PageBuilder sistem koji menja način na koji kreiraš sadržaj',
    buttons: [
      {
        text: 'Počni sada',
        href: '/start',
        variant: 'primary'
      },
      {
        text: 'Saznaj više',
        href: '/learn',
        variant: 'outline'
      }
    ],
    visual: {
      type: 'illustration',
      src: '🚀',
      alt: 'Rocket illustration'
    },
    stats: [
      { value: '1000+', label: 'Korisnika', animated: true },
      { value: '50+', label: 'Sekcija', animated: true },
      { value: '99%', label: 'Uptime', animated: true }
    ],
    backgroundColor: 'sky'
  },

  // Cards Grid sekcija
  {
    _id: 'cards-1',
    _type: 'cardsGrid',
    title: 'Naše usluge',
    subtitle: 'Kompletne solucije za vaše potrebe',
    layout: 'grid-3',
    cardStyle: 'elevated',
    cards: [
      {
        id: 'card-1',
        title: 'Web Development',
        description: 'Kreiramo moderne i funkcionalne web sajtove koji privlače pažnju.',
        icon: '💻',
        tags: ['React', 'Next.js', 'TypeScript'],
        href: '/services/web'
      },
      {
        id: 'card-2',
        title: 'UI/UX Design',
        description: 'Dizajniramo korisno iskustvo koje korisnici obožavaju.',
        icon: '🎨',
        tags: ['Figma', 'Design System', 'Prototyping'],
        href: '/services/design',
        badge: 'Popularno'
      },
      {
        id: 'card-3',
        title: 'CMS Integration',
        description: 'Integrisemo moćne CMS sisteme za lako upravljanje sadržajem.',
        icon: '⚙️',
        tags: ['Sanity', 'Contentful', 'Strapi'],
        href: '/services/cms'
      }
    ],
    backgroundColor: 'sun'
  },

  // Stats sekcija
  {
    _id: 'stats-1',
    _type: 'stats',
    title: 'Brojke govore za nas',
    layout: 'grid',
    showTrends: true,
    stats: [
      {
        id: 'stat-1',
        value: '500',
        label: 'Uspešnih projekata',
        icon: '📊',
        animated: true,
        suffix: '+',
        trend: { direction: 'up', percentage: 25 }
      },
      {
        id: 'stat-2',
        value: '10',
        label: 'Godina iskustva',
        icon: '🏆',
        animated: true,
        suffix: '+',
        trend: { direction: 'up', percentage: 15 }
      },
      {
        id: 'stat-3',
        value: '99',
        label: 'Zadovoljnih klijenata',
        icon: '😊',
        animated: true,
        suffix: '%',
        trend: { direction: 'up', percentage: 5 }
      },
      {
        id: 'stat-4',
        value: '24',
        label: 'Podrška',
        icon: '🔧',
        animated: true,
        suffix: '/7',
        trend: { direction: 'neutral' }
      }
    ],
    backgroundColor: 'grass'
  },

  // FAQ sekcija
  {
    _id: 'faq-1',
    _type: 'faq',
    title: 'Često postavljana pitanja',
    subtitle: 'Odgovori na najčešća pitanja o našim uslugama',
    layout: 'accordion',
    searchable: true,
    faqs: [
      {
        id: 'faq-1',
        question: 'Kako funkcioniše PageBuilder?',
        answer: 'PageBuilder koristi dinamičko mapiranje CMS sekcija na React komponente, omogućavajući vam da lako kreirate i upravljate sadržajem bez programiranja.',
        category: 'Osnove',
        featured: true
      },
      {
        id: 'faq-2',
        question: 'Da li podržava color rotation?',
        answer: 'Da! PageBuilder automatski rotira brand boje kroz sekcije koristeći naš napredni color rotation sistem.',
        category: 'Funkcionalnosti'
      },
      {
        id: 'faq-3',
        question: 'Je li moguće dodati custom sekcije?',
        answer: 'Apsolutno! Sistem je potpuno modularan i možete lako dodati nove tipove sekcija prema potrebi.',
        category: 'Prilagođavanje'
      }
    ],
    categories: ['Osnove', 'Funkcionalnosti', 'Prilagođavanje'],
    backgroundColor: 'heart'
  },

  // CTA sekcija
  {
    _id: 'cta-1',
    _type: 'cta',
    layout: 'centered',
    title: 'Spremni za početak?',
    subtitle: 'Pokrenite svoj projekat danas',
    description: 'Kontaktirajte nas i saznajte kako možemo pomoći u realizaciji vaših ideja.',
    buttons: [
      {
        text: 'Započni projekat',
        href: '/contact',
        variant: 'primary',
        icon: '🚀'
      },
      {
        text: 'Pogledaj portfolio',
        href: '/portfolio',
        variant: 'outline',
        icon: '👁️'
      }
    ],
    visual: {
      type: 'icon',
      src: '🎯',
      alt: 'Target icon'
    },
    urgency: {
      enabled: true,
      text: 'Ograničena ponuda - 20% popusta do kraja meseca!'
    },
    backgroundColor: 'night'
  }
]

interface PageBuilderExampleProps {
  pageType?: 'franchise' | 'education' | 'about' | 'calculator' | 'location'
  isPreview?: boolean
}

const PageBuilderExample: React.FC<PageBuilderExampleProps> = ({
  pageType = 'franchise',
  isPreview = false
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Controls */}
      {isPreview && (
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  PageBuilder Demo
                </h1>
                <p className="text-gray-600">
                  Demonstracija dinamičkog CMS sistema sa {mockSections.length} sekcija
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <span className="font-medium">Page Type:</span>
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    {pageType}
                  </span>
                </div>
                
                <div className="text-sm">
                  <span className="font-medium">Mode:</span>
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded">
                    {isPreview ? 'Preview' : 'Live'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PageBuilder */}
      <PageBuilder
        sections={mockSections}
        pageType={pageType}
        isPreview={isPreview}
      />
    </div>
  )
}

export default PageBuilderExample

// Export mock data za testiranje
export { mockSections }