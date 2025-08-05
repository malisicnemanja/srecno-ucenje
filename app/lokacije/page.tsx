'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useSanityQuery } from '@/hooks/useSanity'
import { locationDataQuery } from '@/lib/sanity.queries'

// Animated City Transformation SVG
const CityTransformationSVG = () => (
  <motion.svg 
    width="300" 
    height="200" 
    viewBox="0 0 300 200" 
    className="mx-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    {/* Background sky with gradient */}
    <defs>
      <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#87CEEB', stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: '#98D8E8', stopOpacity: 0.3 }} />
      </linearGradient>
      <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 0.9 }} />
        <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.7 }} />
      </linearGradient>
    </defs>
    
    {/* Sky background */}
    <rect width="300" height="200" fill="url(#skyGradient)" />
    
    {/* Original small buildings */}
    <motion.g
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 0.3, 0] }}
      transition={{ duration: 3, delay: 1 }}
    >
      <rect x="50" y="150" width="30" height="40" fill="#94a3b8" rx="2" />
      <rect x="90" y="140" width="25" height="50" fill="#94a3b8" rx="2" />
      <rect x="125" y="160" width="20" height="30" fill="#94a3b8" rx="2" />
    </motion.g>
    
    {/* Modern Srećno učenje center building */}
    <motion.g
      initial={{ y: 50, opacity: 0, scale: 0.5 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 2, delay: 2, type: "spring" }}
    >
      {/* Main building */}
      <rect x="60" y="100" width="80" height="90" fill="url(#buildingGradient)" rx="8" />
      
      {/* Windows with animated lights */}
      {[0, 1, 2].map((floor) => 
        [0, 1, 2].map((window) => (
          <motion.rect
            key={`${floor}-${window}`}
            x={75 + window * 20}
            y={115 + floor * 20}
            width="8"
            height="12"
            fill="#fef3c7"
            rx="1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: (floor + window) * 0.3 
            }}
          />
        ))
      )}
      
      {/* Srećno učenje sign */}
      <motion.rect
        x="70"
        y="105"
        width="60"
        height="12"
        fill="#fbbf24"
        rx="2"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      
      {/* Modern entrance */}
      <rect x="85" y="170" width="30" height="20" fill="#1e293b" rx="2" />
      
      {/* Happy children silhouettes */}
      <motion.g
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="75" cy="175" r="3" fill="#f59e0b" />
        <circle cx="85" cy="175" r="3" fill="#ef4444" />
        <circle cx="95" cy="175" r="3" fill="#10b981" />
        <circle cx="105" cy="175" r="3" fill="#3b82f6" />
      </motion.g>
    </motion.g>
    
    {/* Surrounding enhanced neighborhood */}
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 3 }}
    >
      {/* New modern buildings */}
      <rect x="150" y="120" width="35" height="70" fill="#64748b" rx="3" />
      <rect x="190" y="130" width="40" height="60" fill="#64748b" rx="3" />
      <rect x="20" y="135" width="30" height="55" fill="#64748b" rx="3" />
      
      {/* Trees and greenery */}
      <motion.circle
        cx="180"
        cy="180"
        r="8"
        fill="#22c55e"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.circle
        cx="40"
        cy="185"
        r="6"
        fill="#22c55e"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
    </motion.g>
    
    {/* Transformation sparkles */}
    <motion.g
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
    >
      {[...Array(8)].map((_, i) => (
        <motion.circle
          key={i}
          cx={80 + Math.random() * 100}
          cy={100 + Math.random() * 80}
          r="2"
          fill="#fbbf24"
          animate={{ 
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 1.5, 
            delay: i * 0.2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        />
      ))}
    </motion.g>
    
    {/* Success indicator */}
    <motion.text
      x="150"
      y="50"
      textAnchor="middle"
      className="text-lg font-bold fill-primary-600"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 4 }}
    >
      Vaš grad, transformisan!
    </motion.text>
  </motion.svg>
)

// Dynamically import map component to avoid SSR issues
const GoogleLocationMap = dynamic(
  () => import('@/components/features/map/GoogleLocationMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Učitavanje mape...</p>
        </div>
      </div>
    )
  }
)

interface City {
  name: string
  centers: number
  status: 'active' | 'expansion'
  highlight?: boolean
}

const staticCities: City[] = [
  { name: 'Beograd', centers: 3, status: 'active', highlight: true },
  { name: 'Novi Sad', centers: 1, status: 'active', highlight: true },
  { name: 'Niš', centers: 1, status: 'expansion' },
  { name: 'Kragujevac', centers: 1, status: 'active' },
  { name: 'Subotica', centers: 1, status: 'expansion' },
  { name: 'Pančevo', centers: 0, status: 'expansion' },
  { name: 'Zrenjanin', centers: 0, status: 'expansion' },
  { name: 'Šabac', centers: 0, status: 'expansion' },
]

export default function LocationsPage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  
  // Fetch location data from CMS
  const { data: locationData, isLoading } = useSanityQuery(locationDataQuery)
  
  // Default cities data if CMS is empty
  const defaultCities = [
    {
      _id: '1',
      city: 'Beograd',
      centerCount: 3,
      status: 'active',
      featured: true,
      coordinates: { lat: 44.7866, lng: 20.4489 }
    },
    {
      _id: '2',
      city: 'Novi Sad',
      centerCount: 2,
      status: 'active',
      featured: false,
      coordinates: { lat: 45.2671, lng: 19.8335 }
    },
    {
      _id: '3',
      city: 'Niš',
      centerCount: 1,
      status: 'active',
      featured: false,
      coordinates: { lat: 43.3209, lng: 21.8958 }
    },
    {
      _id: '4',
      city: 'Kragujevac',
      centerCount: 1,
      status: 'active',
      featured: false,
      coordinates: { lat: 44.0142, lng: 20.9395 }
    },
    {
      _id: '5',
      city: 'Subotica',
      centerCount: 1,
      status: 'coming-soon',
      featured: false,
      coordinates: { lat: 46.1001, lng: 19.6651 }
    }
  ]
  
  // Use CMS data if available, otherwise use defaults
  const cities = locationData && locationData.length > 0 ? locationData : defaultCities
  
  // Compute stats from cities data
  const totalCenters = cities.reduce((sum: number, city: any) => sum + (city.centerCount || 0), 0)
  const activeCities = cities.filter((city: any) => city.status === 'active').length
  
  const stats = [
    { 
      number: `${totalCenters}+`, 
      label: 'Aktivnih centara', 
      color: 'from-primary-500 to-primary-600' 
    },
    { 
      number: `${activeCities}+`, 
      label: 'Gradova', 
      color: 'from-blue-500 to-blue-600' 
    },
    { 
      number: '20k+', 
      label: 'Srećne dece', 
      color: 'from-purple-500 to-purple-600' 
    },
    { 
      number: '100+', 
      label: 'Edukatora', 
      color: 'from-orange-500 to-orange-600' 
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-100/70 via-secondary-100/50 to-accent-100/60 min-h-[85vh] flex items-center overflow-hidden">
        {/* Floating animated elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Location markers floating */}
          <motion.div
            className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full opacity-60 flex items-center justify-center"
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </motion.div>
          
          <motion.div
            className="absolute top-1/3 left-16 w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full opacity-50 flex items-center justify-center"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full opacity-40 flex items-center justify-center"
            animate={{ 
              y: [0, -25, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </motion.div>

          {/* Additional floating particles */}
          <motion.div
            className="absolute top-1/2 right-1/3 w-6 h-6 bg-primary-400 rounded-full opacity-70"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-8 h-8 bg-secondary-400 rounded-full opacity-50"
            animate={{ 
              y: [0, -15, 0],
              x: [0, 10, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-6"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Mreža centara širom Srbije
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                Pronađite <span className="text-gradient-primary">Srećno učenje</span>
                <br />
                centar <span className="text-gradient-secondary">u vašoj blizini</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Sa preko 7 aktivnih centara širom Srbije, sigurno postoji jedan blizu vas
              </p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-4"
                  onClick={() => document.getElementById('centers-map')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Pogledajte mapu centara
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.number}
                </div>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GoogleLocationMap viewMode="map" />
          </motion.div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Gradovi u kojima poslujemo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Konstantno širimo našu mrežu centara kako bi što više dece imalo pristup kvalitetnom obrazovanju
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-300 rounded mb-2" />
                  <div className="h-4 bg-gray-300 rounded" />
                </div>
              ))
            ) : (
              cities.map((city: any, index: number) => {
                const cityName = city.city || city.name
                const centerCount = city.centerCount || city.centers || 0
                const cityStatus = city.status
                const isHighlighted = city.featured || city.highlight
                
                return (
                  <motion.div
                    key={city._id || cityName}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedCity(cityName)}
                    className={`relative bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 ${
                      selectedCity === cityName ? 'ring-2 ring-primary-500' : ''
                    } ${isHighlighted ? 'border-2 border-primary-200' : ''}`}
                  >
                    {isHighlighted && (
                      <div className="absolute -top-3 -right-3 bg-primary-500 text-white text-xs px-3 py-1 rounded-full">
                        Popularno
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{cityName}</h3>
                    
                    {city.description && (
                      <p className="text-sm text-gray-600 mb-2">{city.description}</p>
                    )}
                    
                    {cityStatus === 'active' ? (
                      <div>
                        <p className="text-primary-600 font-medium">
                          {centerCount > 0 ? `${centerCount} ${centerCount === 1 ? 'centar' : 'centra'}` : 'Uskoro'}
                        </p>
                        {centerCount > 0 && (
                          <p className="text-sm text-gray-500 mt-1">Aktivno</p>
                        )}
                        {city.demandLevel && (
                          <p className="text-xs text-gray-500 mt-1">Potražnja: {city.demandLevel}</p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p className="text-accent-600 font-medium">U pripremi</p>
                        <p className="text-sm text-gray-500 mt-1">2025</p>
                        {city.marketSize && (
                          <p className="text-xs text-gray-500 mt-1">Tržište: {city.marketSize}</p>
                        )}
                      </div>
                    )}
                    
                    {city.contactInfo && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500">Kontakt dostupan</p>
                      </div>
                    )}
                  </motion.div>
                )
              })
            )}
          </div>
        </div>
      </section>

      {/* Franchise CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl shadow-xl p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Nema centra u vašem gradu?
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Postanite deo naše mreže i otvorite Srećno učenje centar u vašem gradu. 
                  Pružamo kompletnu podršku i obuku.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">Dokazana metodologija sa 10+ godina iskustva</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">Kompletna obuka i kontinuirana podrška</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">Brz povrat investicije (12-18 meseci)</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/franchise-models"
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Saznaj više o franšizi
                  </a>
                  <a
                    href="/kalkulatori"
                    className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    Kalkulatori
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8 flex flex-col items-center justify-center">
                  <CityTransformationSVG />
                  <div className="text-center mt-4">
                    <p className="text-xl font-bold text-gray-900 mb-2">Vaš grad?</p>
                    <p className="text-gray-600">Budite prvi u vašoj sredini</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                  Prilika!
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Imate pitanja o našim lokacijama?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Kontaktirajte nas i pomoći ćemo vam da pronađete najbliži centar
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:+381111234567"
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Pozovite nas
            </a>
            <a
              href="/kontakt"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Pošaljite poruku
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  )
}