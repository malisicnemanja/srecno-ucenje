'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useSanityQuery } from '@/hooks/useSanity'
import Icons from '@/components/ui/Icons'
import { Button } from '@/components/ui/Button'
import BrushUnderline from '@/components/ui/BrushUnderline'
import AlternatingText from '@/components/ui/AlternatingText'

// Google Map Component (lazy loaded)
const GoogleLocationMap = dynamic(
  () => import('@/components/features/map/GoogleLocationMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] bg-gray-100 rounded-2xl flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Icons.Location className="w-12 h-12 text-brand-sky" />
        </motion.div>
        <p className="ml-4 text-gray-600">Učitavanje mape...</p>
      </div>
    )
  }
)

// School Card Component
const SchoolCard = ({ school, index, isActive, onClick }: any) => {
  const colors = ['sky', 'sun', 'grass', 'heart'] as const
  const color = colors[index % colors.length]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, translateY: -5 }}
      onClick={onClick}
      className={`relative bg-white rounded-2xl p-6 cursor-pointer transition-all ${
        isActive ? `ring-2 ring-brand-${color} shadow-2xl` : 'shadow-lg hover:shadow-xl'
      }`}
    >
      {school.featured && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute -top-3 -right-3 bg-brand-${color} text-white text-xs px-3 py-1 rounded-full font-medium`}
        >
          Popularna
        </motion.div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 rounded-xl bg-brand-${color}/10 flex items-center justify-center`}>
          <Icons.School className={`w-8 h-8 text-brand-${color}`} animate={false} />
        </div>
        {school.status === 'active' && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-3 h-3 bg-green-500 rounded-full"
          />
        )}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">{school.city}</h3>
      
      {school.centerCount > 0 ? (
        <div>
          <p className={`text-brand-${color} font-semibold mb-2`}>
            {school.centerCount} {school.centerCount === 1 ? 'školica' : 'školice'}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Icons.Heart className="w-4 h-4 text-brand-heart" animate={false} />
            <span>{school.studentCount || '500+'} srećne dece</span>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-brand-sun font-semibold">Uskoro otvara</p>
          <p className="text-sm text-gray-600 mt-1">Prijavite se za obaveštenja</p>
        </div>
      )}
      
      {school.address && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 flex items-start">
            <Icons.Location className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" animate={false} />
            {school.address}
          </p>
        </div>
      )}
      
      {isActive && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-gray-100"
        >
          <Button
            color={color}
            variant="filled"
            size="sm"
            className="w-full"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation()
              window.location.href = '/zakazivanje'
            }}
          >
            Zakažite posetu
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

// Statistics Component
const Statistics = () => {
  const stats = [
    { number: '127+', label: 'Aktivnih školica', icon: Icons.School, color: 'sky' },
    { number: '15,000+', label: 'Srećne dece', icon: Icons.Heart, color: 'heart' },
    { number: '98%', label: 'Zadovoljnih roditelja', icon: Icons.Star, color: 'sun' },
    { number: '500+', label: 'Mentora', icon: Icons.People, color: 'grass' }
  ]
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-2xl p-6 text-center shadow-lg"
        >
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-brand-${stat.color}/10 flex items-center justify-center`}>
            <stat.icon className={`w-8 h-8 text-brand-${stat.color}`} animate />
          </div>
          <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
          <div className="text-sm text-gray-600 mt-2">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

// Query for schools data
const schoolsQuery = `*[_type == "school"] | order(featured desc, city asc) {
  _id,
  city,
  centerCount,
  status,
  featured,
  coordinates,
  address,
  studentCount,
  description
}`

// Fallback data
const fallbackSchools = [
  {
    _id: '1',
    city: 'Beograd',
    centerCount: 3,
    status: 'active',
    featured: true,
    studentCount: 2500,
    address: 'Više lokacija dostupno',
    coordinates: { lat: 44.7866, lng: 20.4489 }
  },
  {
    _id: '2',
    city: 'Novi Sad',
    centerCount: 2,
    status: 'active',
    featured: true,
    studentCount: 1200,
    address: 'Centar grada',
    coordinates: { lat: 45.2671, lng: 19.8335 }
  },
  {
    _id: '3',
    city: 'Niš',
    centerCount: 1,
    status: 'active',
    featured: false,
    studentCount: 800,
    address: 'Medijana',
    coordinates: { lat: 43.3209, lng: 21.8958 }
  },
  {
    _id: '4',
    city: 'Kragujevac',
    centerCount: 1,
    status: 'active',
    featured: false,
    studentCount: 600,
    coordinates: { lat: 44.0142, lng: 20.9395 }
  },
  {
    _id: '5',
    city: 'Subotica',
    centerCount: 0,
    status: 'coming-soon',
    featured: false,
    coordinates: { lat: 46.1001, lng: 19.6651 }
  },
  {
    _id: '6',
    city: 'Pančevo',
    centerCount: 0,
    status: 'coming-soon',
    featured: false,
    coordinates: { lat: 44.8738, lng: 20.6403 }
  },
  {
    _id: '7',
    city: 'Zrenjanin',
    centerCount: 0,
    status: 'coming-soon',
    featured: false,
    coordinates: { lat: 45.3834, lng: 20.3899 }
  },
  {
    _id: '8',
    city: 'Šabac',
    centerCount: 0,
    status: 'coming-soon',
    featured: false,
    coordinates: { lat: 44.7463, lng: 19.6907 }
  }
]

export default function SchoolsPage() {
  const [activeSchool, setActiveSchool] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'coming-soon'>('all')
  
  const { data: schoolsData, isLoading } = useSanityQuery(schoolsQuery)
  const schools = schoolsData || fallbackSchools
  
  // Filter schools based on status
  const filteredSchools = schools.filter((school: any) => {
    if (filterStatus === 'all') return true
    return school.status === filterStatus
  })
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sun-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[0, 1, 2, 3, 4].map(i => (
            <motion.div
              key={i}
              className={`absolute w-64 h-64 rounded-full bg-brand-${
                ['sky', 'sun', 'grass', 'heart'][i % 4]
              }/5`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center px-4 py-2 bg-brand-sun/10 text-brand-sun rounded-full text-sm font-medium mb-6"
            >
              <Icons.Location className="w-4 h-4 mr-2" animate={false} />
              Mreža obrazovnih centara širom Srbije
            </motion.div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Pronađite{' '}
              <span className="relative inline-block">
                <AlternatingText
                  words={['najbolju', 'najbližu', 'idealnu', 'vašu']}
                  interval={3000}
                  animationMode="slide-up"
                  color="sky"
                />
                <BrushUnderline color="sun" style="wavy" thickness="medium" />
              </span>
              <br />
              Srećno učenje školicu
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Sa preko 127 aktivnih centara, sigurno postoji jedan koji čeka baš vaše dete
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                color="sky"
                variant="filled"
                size="lg"
                onClick={() => document.getElementById('schools-map')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icons.Location className="w-5 h-5 mr-2" animate={false} />
                Pogledajte mapu
              </Button>
              <Button
                color="sun"
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/zakazivanje'}
              >
                <Icons.Phone className="w-5 h-5 mr-2" animate={false} />
                Zakažite posetu
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Statistics */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="container">
          <Statistics />
        </div>
      </section>
      
      {/* Filter Tabs */}
      <section className="py-8">
        <div className="container">
          <div className="flex justify-center gap-4">
            {[
              { value: 'all', label: 'Sve školice', color: 'sky' },
              { value: 'active', label: 'Aktivne', color: 'grass' },
              { value: 'coming-soon', label: 'Uskoro', color: 'sun' }
            ].map((filter) => (
              <Button
                key={filter.value}
                color={filter.color as any}
                variant={filterStatus === filter.value ? 'filled' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(filter.value as any)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section id="schools-map" className="py-16 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Naše školice na mapi
            </h2>
            <p className="text-xl text-gray-600">
              Kliknite na marker da vidite detalje
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <GoogleLocationMap viewMode="map" />
          </motion.div>
        </div>
      </section>
      
      {/* Schools Grid */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Gradovi gde nas možete pronaći
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Konstantno širimo našu mrežu kako bi što više dece imalo pristup kvalitetnom obrazovanju
            </p>
          </motion.div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={filterStatus}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 animate-pulse shadow-lg">
                    <div className="w-14 h-14 bg-gray-200 rounded-xl mb-4" />
                    <div className="h-6 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                ))
              ) : (
                filteredSchools.map((school: any, index: number) => (
                  <SchoolCard
                    key={school._id}
                    school={school}
                    index={index}
                    isActive={activeSchool === school._id}
                    onClick={() => setActiveSchool(
                      activeSchool === school._id ? null : school._id
                    )}
                  />
                ))
              )}
            </motion.div>
          </AnimatePresence>
          
          {filteredSchools.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Icons.Info className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl text-gray-600">
                Nema školica u ovoj kategoriji
              </p>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Franchise CTA */}
      <section className="py-20 bg-brand-night text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Icons.Rocket className="w-20 h-20 mx-auto mb-8 text-brand-sun" animate />
            
            <h2 className="text-4xl font-bold mb-6">
              Želite da otvorite školicu u vašem gradu?
            </h2>
            
            <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto">
              Postanite deo naše priče i promenite živote dece u vašoj zajednici.
              Pružamo kompletnu podršku na svakom koraku.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
              {[
                { icon: Icons.Trophy, text: 'Dokazana metodologija' },
                { icon: Icons.Handshake, text: 'Kompletna podrška' },
                { icon: Icons.Graph, text: 'Brz povrat investicije' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <item.icon className="w-12 h-12 mx-auto mb-3 text-brand-sun" />
                  <p className="font-medium">{item.text}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                color="sun"
                variant="filled"
                size="lg"
                onClick={() => window.location.href = '/fransiza-modeli'}
              >
                Saznajte više o franšizi
              </Button>
              <Button
                color="sky"
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/kako-se-pridruziti'}
              >
                Vidite kako funkcioniše
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}