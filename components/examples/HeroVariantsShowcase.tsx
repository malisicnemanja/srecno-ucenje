'use client'

import HeroSection, { HeroSectionProps, FloatingElement, StatItem, ButtonProps } from '@/components/features/cms/HeroSection'
import { BrandColor } from '@/lib/color-rotation'

// Example floating elements configurations
const exampleFloatingElements: FloatingElement[] = [
  {
    id: 'circle-1',
    type: 'circle',
    position: { top: '10%', right: '10%' },
    size: 'md',
    color: 'sun',
    animation: 'float'
  },
  {
    id: 'triangle-1',
    type: 'triangle',
    position: { bottom: '20%', left: '5%' },
    size: 'sm',
    color: 'grass',
    animation: 'pulse'
  },
  {
    id: 'star-1',
    type: 'star',
    position: { top: '30%', left: '15%' },
    size: 'lg',
    color: 'heart',
    animation: 'rotate'
  },
  {
    id: 'wave-1',
    type: 'wave',
    position: { bottom: '10%', right: '20%' },
    size: 'md',
    color: 'night',
    animation: 'drift'
  }
]

// Example stats data
const exampleStats: StatItem[] = [
  {
    value: '1500',
    label: 'Zadovoljnih učenika',
    suffix: '+',
    animated: true
  },
  {
    value: '50',
    label: 'Lokacija u Srbiji',
    suffix: '+',
    animated: true
  },
  {
    value: '98',
    label: 'Stopa uspešnosti',
    suffix: '%',
    animated: true
  },
  {
    value: '15',
    label: 'Godina iskustva',
    suffix: '',
    animated: true
  }
]

// Example buttons
const exampleButtons: ButtonProps[] = [
  {
    text: 'Započni učenje',
    href: '/kako-se-pridruziti',
    variant: 'primary'
  },
  {
    text: 'Pogledaj lokacije',
    href: '/lokacije',
    variant: 'secondary'
  }
]

// Example alternating words
const alternatingWords = [
  'Inteligentno',
  'Efikasno',
  'Srećno',
  'Prirodno'
]

export default function HeroVariantsShowcase() {
  const heroVariants: HeroSectionProps[] = [
    // Split Left Layout
    {
      layout: 'split-left',
      title: 'Učenje je',
      alternatingWords: alternatingWords,
      subtitle: 'Otkrijte revolucionarni pristup učenju koji transformiše način na koji deca razumeju matematiku i jezik.',
      buttons: exampleButtons,
      visual: {
        type: 'illustration',
        src: '/images/hero-illustration.svg',
        alt: 'Deca koja se radosno uče'
      },
      floatingElements: exampleFloatingElements,
      backgroundColor: 'sky'
    },

    // Split Right Layout
    {
      layout: 'split-right',
      title: 'Vaše dete zaslužuje',
      alternatingWords: ['najbolje', 'kvalitetno', 'personalizovano', 'inovativno'],
      subtitle: 'Sa našim pristupom, svako dete može da dostigne svoj puni potencijal kroz igru i radost učenja.',
      buttons: [
        {
          text: 'Rezervišite termin',
          href: '/rezervacija',
          variant: 'primary'
        }
      ],
      visual: {
        type: 'image',
        src: '/images/happy-children-learning.jpg',
        alt: 'Srećna deca tokom časova'
      },
      floatingElements: exampleFloatingElements.slice(0, 2),
      backgroundColor: 'grass'
    },

    // Centered Layout
    {
      layout: 'centered',
      title: 'Transformišite budućnost',
      alternatingWords: ['deteta', 'obrazovanja', 'učenja', 'znanja'],
      subtitle: 'Pridružite se hiljadama zadovoljnih roditelja koji su videli neverovatnu transformaciju svoje dece.',
      buttons: exampleButtons,
      visual: {
        type: 'video',
        src: '/videos/hero-testimonial.mp4',
        alt: 'Testimonial video'
      },
      floatingElements: [
        ...exampleFloatingElements,
        {
          id: 'square-1',
          type: 'square',
          position: { top: '15%', left: '10%' },
          size: 'sm',
          color: 'sun',
          animation: 'pulse'
        }
      ],
      backgroundColor: 'heart'
    },

    // Full Stats Layout
    {
      layout: 'full-stats',
      title: 'Više od',
      alternatingWords: ['15 godina', '1500 učenika', '50 lokacija', '98% uspešnosti'],
      subtitle: 'Naši rezultati govore o posvećenosti kvalitetnom obrazovanju i radosti učenja.',
      buttons: [
        {
          text: 'Pogledajte rezultate',
          href: '/rezultati',
          variant: 'primary'
        },
        {
          text: 'Kontaktirajte nas',
          href: '/kontakt',
          variant: 'outline'
        }
      ],
      stats: exampleStats,
      visual: {
        type: 'image',
        src: '/images/success-stories.jpg',
        alt: 'Priče o uspešnim učenicima'
      },
      floatingElements: exampleFloatingElements.slice(1, 3),
      backgroundColor: 'night'
    }
  ]

  return (
    <div className="space-y-0">
      <div className="mb-16 text-center bg-gray-50 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Hero Section Varijante
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Četiri različita layout-a za Hero sekcije, svi mobile-first responsive
          sa animiranim elementima i CMS podrška.
        </p>
      </div>

      {heroVariants.map((heroProps, index) => (
        <div key={index} className="mb-2">
          <div className="text-center py-4 bg-gray-100 border-b">
            <h2 className="text-lg font-semibold text-gray-700 capitalize">
              Layout: {heroProps.layout.replace('-', ' ')} • Color: {heroProps.backgroundColor}
            </h2>
          </div>
          <HeroSection {...heroProps} />
        </div>
      ))}

      {/* Usage Examples */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Kako koristiti nove Hero varijante
          </h2>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">TypeScript tipovi:</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`interface HeroSectionProps {
  layout: 'split-left' | 'split-right' | 'centered' | 'full-stats'
  title: string
  alternatingWords?: string[]
  subtitle?: string
  buttons?: ButtonProps[]
  visual?: {
    type: 'image' | 'illustration' | 'video'
    src: string
    alt?: string
  }
  floatingElements?: FloatingElement[]
  stats?: StatItem[]
  backgroundColor?: BrandColor
}`}
            </pre>
          </div>

          <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Primer korišćenja:</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`<HeroSection
  layout="split-left"
  title="Učenje je"
  alternatingWords={['srećno', 'efikasno', 'prirodno']}
  subtitle="Otkrijte revolucionarni pristup učenju..."
  buttons={[
    {
      text: 'Započni učenje',
      href: '/kako-se-pridruziti',
      variant: 'primary'
    }
  ]}
  backgroundColor="sky"
  floatingElements={floatingElements}
/>`}
            </pre>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-brand-sky">
                📱 Mobile-first Design
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Svi layout-ovi se stack-uju na mobilnom</li>
                <li>• Responzivne tipografije</li>
                <li>• Touch-friendly dugmići</li>
                <li>• Optimizovane animacije</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3 text-brand-grass">
                🎨 Brand Colors Integration
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Automatski kontrast tekstovi</li>
                <li>• Brand color sistem</li>
                <li>• Komplementarne kombinacije</li>
                <li>• Accessibility compliant</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}