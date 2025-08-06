'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import AnimatedHeadline, { AnimatedSubheadline } from '@/components/ui/AnimatedHeadline'
import { 
  RocketIcon as RocketSVG, SparklesIcon as SparklesSVG, CalendarIcon as CalendarSVG,
  ClockIcon as ClockSVG, CheckIcon as CheckSVG
} from '@/components/icons'
import { useSanityQuery } from '@/hooks/useSanity'
import { virtualClassroomQuery } from '@/lib/sanity.queries'
import { BookIcon, BrainIcon, TargetIcon, AwardIcon } from '@/components/icons'

// Mock VR/3D icons since we don't have them
const VRIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="7" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="8" cy="12" r="2" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="12" r="2" stroke="currentColor" strokeWidth="2" />
    <path d="M12 10v4" stroke="currentColor" strokeWidth="2" />
  </svg>
)

const MouseIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="6" y="3" width="12" height="18" rx="6" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="7" x2="12" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const KeyboardIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    <rect x="5" y="9" width="2" height="2" fill="currentColor" />
    <rect x="9" y="9" width="2" height="2" fill="currentColor" />
    <rect x="13" y="9" width="2" height="2" fill="currentColor" />
    <rect x="17" y="9" width="2" height="2" fill="currentColor" />
    <rect x="8" y="14" width="8" height="2" fill="currentColor" />
  </svg>
)

const TouchIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" opacity="0.5" />
  </svg>
)

const PlayIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 3l14 9-14 9V3z" fill="currentColor" />
  </svg>
)

const ArrowRightIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const InfoIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

// Icon resolver function
const resolveFeatureIcon = (icon: string | React.ComponentType<any>) => {
  // If it's already a component, return it
  if (typeof icon === 'function') {
    return icon
  }
  
  // Map string icon names to components
  const iconMap: Record<string, React.ComponentType<any>> = {
    'gamepad': MouseIcon,
    'target': TargetIcon,
    'trophy': AwardIcon,
    'book': BookIcon,
    'brain': BrainIcon,
    'sparkles': SparklesSVG,
    'mouse': MouseIcon,
    'keyboard': KeyboardIcon,
    'touch': TouchIcon,
    'vr': VRIcon
  }
  
  return iconMap[icon] || InfoIcon
}

export default function VirtualTourPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'mobile' | 'vr'>('desktop')
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  
  // Fetch virtual classroom data from Sanity
  const { data: classroomData, isLoading: sanityLoading } = useSanityQuery(virtualClassroomQuery)

  // Default features data
  const defaultFeatures = [
    {
      icon: MouseIcon,
      title: 'Interaktivna navigacija',
      description: 'Kliknite i prevucite za rotaciju, skrolujte za zum',
      device: 'desktop'
    },
    {
      icon: KeyboardIcon,
      title: 'Kontrole tastaturom',
      description: 'Koristite strelice i WASD za kretanje kroz prostor',
      device: 'desktop'
    },
    {
      icon: TouchIcon,
      title: 'Touch kontrole',
      description: 'Prevucite prstom za navigaciju na mobilnim uređajima',
      device: 'mobile'
    },
    {
      icon: VRIcon,
      title: 'VR podrška',
      description: 'Potpuno uronite u prostor sa VR naočarima',
      device: 'vr'
    }
  ]
  
  // Map features to ensure icons are resolved
  const features = (classroomData?.features || defaultFeatures).map(feature => ({
    ...feature,
    icon: resolveFeatureIcon(feature.icon)
  }))

  // Default tour highlights
  const defaultTourHighlights = [
    {
      title: 'Glavna učionica',
      description: 'Prostrana i svetla učionica sa najmodernijom opremom',
      duration: '2:30'
    },
    {
      title: 'Biblioteka',
      description: 'Preko 1000 knjiga za sve uzraste',
      duration: '1:45'
    },
    {
      title: 'Kreativni kutak',
      description: 'Prostor za umetnost i kreativno izražavanje',
      duration: '2:00'
    },
    {
      title: 'Tech zona',
      description: 'Moderne tehnologije za 21. vek',
      duration: '3:00'
    }
  ]
  
  const tourHighlights = classroomData?.tourHighlights || defaultTourHighlights

  const handleStartTour = () => {
    setIsLoading(true)
    // Simulacija učitavanja
    setTimeout(() => {
      // Prikaži poruku da će biti dostupno uskoro
      alert('3D virtuelni obilazak će biti dostupan uskoro! Za sada možete zakazati pravu posetu.')
      setIsLoading(false)
    }, 1000)
  }

  if (sanityLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-primary-900 to-secondary-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-white">Učitavanje virtuelne učionice...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-secondary-900 text-white min-h-[90vh] flex items-center">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-64 h-64 bg-secondary-500 rounded-full filter blur-3xl opacity-20"
            animate={{
              scale: [1, 1.3, 1],
              y: [0, -50, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <VRIcon size={80} className="text-white" />
                <motion.div
                  className="absolute -inset-4 bg-white rounded-full opacity-20"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            <AnimatedHeadline
              text={classroomData?.title || "3D virtuelni obilazak učionice"}
              highlightText="3D virtuelni obilazak"
              className="text-white mb-6"
              underlineColor="text-primary-400"
            />

            <AnimatedSubheadline
              text={classroomData?.subtitle || "Istražite našu učionicu iz udobnosti vašeg doma. Interaktivno iskustvo koje vam omogućava da vidite svaki detalj."}
              className="mb-8 text-white/80"
              delay={0.3}
            />

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <button
                onClick={handleStartTour}
                disabled={isLoading}
                className="btn bg-white text-gray-900 hover:bg-gray-100 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Učitavanje...
                  </>
                ) : (
                  <>
                    <PlayIcon size={20} className="mr-2 group-hover:translate-x-1 transition-transform" />
                    Započni obilazak
                  </>
                )}
              </button>
              <SafeLink href="/zakazivanje" className="btn border-2 border-white text-white hover:bg-white hover:text-gray-900">
                Zakažite pravu posetu
              </SafeLink>
            </motion.div>

            {/* Device selector */}
            <motion.div
              className="inline-flex bg-white/10 backdrop-blur-sm rounded-xl p-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { id: 'desktop', label: 'Desktop', icon: MouseIcon },
                { id: 'mobile', label: 'Mobilni', icon: TouchIcon },
                { id: 'vr', label: 'VR', icon: VRIcon }
              ].map((device) => (
                <button
                  key={device.id}
                  onClick={() => setSelectedDevice(device.id as any)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    selectedDevice === device.id
                      ? 'bg-white text-gray-900'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <device.icon size={20} />
                  <span className="text-sm font-medium">{device.label}</span>
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <MouseIcon size={32} className="text-white/50" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Kako funkcioniše <span className="text-primary-600">virtuelni obilazak</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Jednostavne kontrole za najbolje iskustvo
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              const isActive = feature.device === selectedDevice || selectedDevice === 'desktop'

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative ${!isActive ? 'opacity-50' : ''}`}
                  onMouseEnter={() => setHoveredFeature(i)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <motion.div
                    className="card h-full hover:shadow-xl transition-all duration-300"
                    animate={{
                      y: hoveredFeature === i ? -10 : 0,
                      scale: !isActive ? 0.95 : 1
                    }}
                  >
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon size={32} className="text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                    
                    {!isActive && (
                      <div className="absolute top-2 right-2">
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                          {feature.device === 'mobile' ? 'Samo mobilni' : 'Samo VR'}
                        </span>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tour Highlights */}
      <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Šta ćete <span className="text-secondary-600">videti</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Kompletna tura kroz sve naše prostorije i sadržaje
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tourHighlights.map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-soft hover:shadow-card transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary-600 font-bold">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
                    <p className="text-gray-600 mb-3">{highlight.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">
                        <ClockSVG size={16} className="inline mr-1" />
                        {highlight.duration}
                      </span>
                      <motion.span 
                        className="text-secondary-600 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                      >
                        Istraži
                        <ArrowRightIcon size={16} />
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary-50 rounded-2xl p-8 md:p-12"
          >
            <div className="flex items-start gap-4 mb-6">
              <InfoIcon size={32} className="text-primary-600 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4">Saveti za najbolje iskustvo</h3>
                <ul className="space-y-3">
                  {(classroomData?.tips?.map(t => t.tip) || [
                    'Koristite Chrome, Firefox ili Safari browser za najbolje performanse',
                    'Preporučujemo brzu internet konekciju (min 10 Mbps)',
                    'Za VR iskustvo potrebne su kompatibilne VR naočare',
                    'Obilazak traje približno 10-15 minuta'
                  ]).map((tip, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <CheckSVG size={20} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-secondary-500 to-secondary-600 text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SparklesSVG size={64} className="mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Spremni za virtuelnu avanturu?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Istražite našu učionicu iz udobnosti vašeg doma ili zakažite pravu posetu
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleStartTour}
                className="btn bg-white text-secondary-600 hover:bg-gray-100"
              >
                <PlayIcon size={20} className="mr-2" />
                Pokreni 3D obilazak
              </button>
              <SafeLink href="/zakazivanje" className="btn border-2 border-white text-white hover:bg-white hover:text-secondary-600">
                <CalendarSVG size={20} className="mr-2" />
                Zakažite pravu posetu
              </SafeLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-green-100 rounded-full mb-6">
                <VRIcon size={40} className="text-blue-600" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                3D Virtuelni obilazak učionice
              </h3>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Uskoro ćete moći da istražite našu učionicu u potpunom 3D okruženju. 
                Videćete svaki detalj enterijera i kako je prostor organizovan za optimalno učenje.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 rounded-lg p-4">
                  <MouseIcon size={32} className="text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">360° rotacija</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <VRIcon size={32} className="text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">VR podrška</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <TouchIcon size={32} className="text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Touch kontrole</p>
                </div>
              </div>
              
              <div className="inline-flex items-center gap-2 text-blue-600 mb-6">
                <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Dostupno uskoro</span>
              </div>
              
              <div className="border-t pt-6">
                <p className="text-gray-600 mb-4">Do tada, pozivamo vas da nas posetite uživo!</p>
                <SafeLink href="/zakazivanje" className="btn-primary inline-flex items-center">
                  <CalendarSVG size={20} className="mr-2" />
                  Zakažite pravu posetu
                </SafeLink>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}