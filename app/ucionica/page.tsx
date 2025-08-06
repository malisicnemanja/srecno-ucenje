'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import AnimatedHeadline, { AnimatedSubheadline } from '@/components/ui/AnimatedHeadline'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { 
  BookIcon as BookSVG, UsersIcon as UsersSVG, SparklesIcon as SparklesSVG, HeartIcon as HeartSVG,
  BrainIcon as BrainSVG, PaletteIcon, ClockIcon as ClockSVG, TargetIcon,
  AwardIcon as AwardSVG, SmileIcon, LightbulbIcon as LightbulbSVG, StarIcon as StarSVG,
  CalendarIcon as CalendarSVG, RocketIcon as RocketSVG, CheckIcon as CheckSVG
} from '@/components/icons'
import {
  BookShelfIllustration,
  SmartBoardIllustration,
  CreativeCornerIllustration,
  SmallGroupsIllustration,
  WarmAtmosphereIllustration,
  ModernTechIllustration
} from '@/components/ui/ClassroomIllustrations'
import { useSanityQuery } from '@/hooks/useSanity'
import { urlFor } from '@/lib/sanity.client'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

const classroomQuery = `*[_type == "classroom"][0]{
  hero,
  features,
  gallery,
  virtualTour,
  schedule,
  programs
}`

// Floating elements component
const FloatingClassroomElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-10 right-20 opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 15, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <BookSVG size={60} className="text-secondary-400" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-10 opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -10, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <PaletteIcon size={80} className="text-accent-400" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-1/3 opacity-15"
        animate={{
          y: [0, 30, 0],
          x: [-10, 10, -10]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <BrainSVG size={70} className="text-primary-400" />
      </motion.div>
    </div>
  )
}

export default function UcionicaPage() {
  const { data: classroom, isLoading } = useSanityQuery(classroomQuery)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState('features')
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container py-20">
          <SkeletonLoader type="title" className="mb-4 max-w-2xl mx-auto" />
          <SkeletonLoader type="text" lines={2} className="max-w-xl mx-auto mb-16" />
          <div className="grid md:grid-cols-3 gap-8">
            <SkeletonLoader type="card" />
            <SkeletonLoader type="card" />
            <SkeletonLoader type="card" />
          </div>
        </div>
      </div>
    )
  }

  // Enhanced features with illustrations
  const features = [
    {
      icon: BookSVG,
      illustration: BookShelfIllustration,
      title: 'Bogata Biblioteka',
      description: 'Preko 1000 pažljivo odabranih knjiga prilagođenih različitim uzrastima i nivoima čitanja',
      color: 'primary',
      stats: { number: 1000, suffix: '+', label: 'knjiga' }
    },
    {
      icon: BrainSVG,
      illustration: SmartBoardIllustration,
      title: 'Pametne Table',
      description: 'Najsavremenije interaktivne table za dinamično i angažujuće učenje',
      color: 'secondary',
      stats: { number: 4, suffix: '', label: 'smart table' }
    },
    {
      icon: PaletteIcon,
      illustration: CreativeCornerIllustration,
      title: 'Kreativni Kutak',
      description: 'Posebno dizajniran prostor za likovne aktivnosti i kreativno izražavanje',
      color: 'accent',
      stats: { number: 20, suffix: '+', label: 'aktivnosti' }
    },
    {
      icon: UsersSVG,
      illustration: SmallGroupsIllustration,
      title: 'Male Grupe',
      description: 'Maksimalno 8 dece po grupi omogućava personalizovan pristup svakom detetu',
      color: 'warm',
      stats: { number: 8, suffix: '', label: 'dece max' }
    },
    {
      icon: HeartSVG,
      illustration: WarmAtmosphereIllustration,
      title: 'Topla Atmosfera',
      description: 'Prostor koji deca doživljavaju kao svoj drugi dom, pun ljubavi i pažnje',
      color: 'primary',
      stats: { number: 97, suffix: '%', label: 'zadovoljstva' }
    },
    {
      icon: SparklesSVG,
      illustration: ModernTechIllustration,
      title: 'Moderne Tehnologije',
      description: 'Tableti, VR naočare i edukativni softver za učenje prilagođeno 21. veku',
      color: 'secondary',
      stats: { number: 30, suffix: '+', label: 'uređaja' }
    }
  ]

  const galleryImages = [
    { category: 'prostor', title: 'Glavni prostor učionice', description: 'Svetao i prostran ambijent' },
    { category: 'prostor', title: 'Čitaonica', description: 'Tihi kutak za koncentraciju' },
    { category: 'aktivnosti', title: 'Deca tokom časa', description: 'Aktivno učenje kroz igru' },
    { category: 'aktivnosti', title: 'Grupni rad', description: 'Timski duh i saradnja' },
    { category: 'oprema', title: 'Smart board u akciji', description: 'Interaktivno učenje' },
    { category: 'oprema', title: 'Edukativni materijali', description: 'Bogat izbor resursa' }
  ]

  const programs = [
    {
      age: '5-7',
      name: 'Mali Geniji',
      description: 'Program pripreme za školu kroz igru i zabavu',
      icon: SmileIcon,
      color: 'accent',
      features: ['Osnove čitanja', 'Brojevi do 100', 'Fina motorika', 'Socijalne veštine']
    },
    {
      age: '8-10',
      name: 'Mladi Istraživači',
      description: 'Osnove brzog čitanja i mentalne aritmetike',
      icon: TargetIcon,
      color: 'primary',
      features: ['Brzo čitanje', 'Mentalna aritmetika', 'Koncentracija', 'Memorijske tehnike']
    },
    {
      age: '11-14',
      name: 'Budući Lideri',
      description: 'Napredne tehnike učenja i razvoj liderskih veština',
      icon: AwardSVG,
      color: 'secondary',
      features: ['Speed reading pro', 'Javni nastup', 'Liderske veštine', 'Projektno učenje']
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Floating Elements */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-secondary-50/20 to-accent-50/10 min-h-[80vh] flex items-center">
        <FloatingClassroomElements />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <LightbulbSVG size={64} className="text-accent-500" />
                  <motion.div
                    className="absolute -inset-4 bg-accent-200 rounded-full opacity-30"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
              
              <AnimatedHeadline
                text="Naša čarobna učionica"
                highlightText="čarobna učionica"
                variants={["čarobna učionica", "prostor za rast", "mesto inspiracije"]}
                className="text-gray-900 mb-6"
                underlineColor="text-accent-500"
              />
              
              <AnimatedSubheadline
                text="Moderno opremljen prostor dizajniran da inspiriše i motiviše svako dete"
                className="mb-8"
                delay={0.4}
              />

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <SafeLink href="/3d-ucionica" className="btn-primary group">
                  <SparklesSVG size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                  3D Virtuelni obilazak
                </SafeLink>
                <SafeLink href="/zakazivanje" className="btn-outline-primary">
                  Zakažite posetu
                </SafeLink>
              </motion.div>

              {/* Stats mini cards */}
              <motion.div
                className="grid grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {[
                  { number: 300, suffix: "m²", label: "prostora" },
                  { number: 6, suffix: "", label: "učionica" },
                  { number: 100, suffix: "%", label: "bezbedno" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="bg-white p-4 rounded-lg shadow-soft text-center"
                    whileHover={{ y: -5, shadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                  >
                    <div className="text-xl md:text-2xl font-bold text-gray-900">
                      <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              {/* 3D classroom preview */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-3xl opacity-20"
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 overflow-hidden">
                  <SmartBoardIllustration className="w-full h-64" />
                  <div className="absolute top-4 right-4">
                    <motion.div
                      className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      LIVE TOUR
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Navigation Tabs */}
      <section className="sticky top-20 z-40 bg-white shadow-soft">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-3 py-4">
            {[
              { id: 'features', label: 'Karakteristike', icon: StarSVG, color: 'primary' },
              { id: 'gallery', label: 'Galerija', icon: PaletteIcon, color: 'secondary' },
              { id: 'programs', label: 'Programi', icon: BookSVG, color: 'accent' }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? `bg-${tab.color}-500 text-white shadow-lg shadow-${tab.color}-500/30`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon size={20} className="mr-2" />
                {tab.label}
                
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white rounded-full"
                    layoutId="activeTabIndicator"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section with Illustrations */}
      <AnimatePresence mode="wait">
        {activeTab === 'features' && (
          <motion.section
            key="features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-16 md:py-20 lg:py-24"
          >
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Prostor koji <span className="text-primary-600">inspiriše učenje</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                  Svaki detalj naše učionice je pažljivo osmišljen da stvori idealno okruženje za razvoj
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, i) => {
                  const Icon = feature.icon
                  const Illustration = feature.illustration
                  
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative"
                      onMouseEnter={() => setHoveredFeature(i)}
                      onMouseLeave={() => setHoveredFeature(null)}
                    >
                      <motion.div
                        className="card h-full hover:shadow-xl transition-all duration-300"
                        animate={{
                          y: hoveredFeature === i ? -10 : 0,
                        }}
                      >
                        {/* Illustration */}
                        <div className="h-48 mb-6 relative overflow-hidden rounded-lg bg-gray-50">
                          <Illustration 
                            className="w-full h-full p-4" 
                            primaryColor={
                              feature.color === 'primary' ? '#10B981' :
                              feature.color === 'secondary' ? '#3B82F6' :
                              feature.color === 'accent' ? '#F59E0B' :
                              '#EF4444'
                            }
                          />
                          
                          {/* Hover overlay */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-t from-${feature.color}-500/20 to-transparent`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredFeature === i ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <Icon size={24} className={`text-${feature.color}-500`} />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                          </div>
                        </div>
                        
                        {/* Stats */}
                        <motion.div
                          className={`mt-4 p-3 bg-${feature.color}-50 rounded-lg`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ 
                            opacity: hoveredFeature === i ? 1 : 0.7,
                            scale: hoveredFeature === i ? 1 : 0.95
                          }}
                        >
                          <div className="flex items-baseline gap-1">
                            <AnimatedCounter
                              end={feature.stats.number}
                              className={`text-2xl font-bold text-${feature.color}-600`}
                            />
                            <span className={`text-lg font-bold text-${feature.color}-600`}>
                              {feature.stats.suffix}
                            </span>
                            <span className="text-sm text-gray-600 ml-1">{feature.stats.label}</span>
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.section>
        )}

        {/* Enhanced Gallery Section */}
        {activeTab === 'gallery' && (
          <motion.section
            key="gallery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-16 md:py-20 lg:py-24 bg-gray-50"
          >
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Virtuelna <span className="text-secondary-600">šetnja</span> kroz učionicu
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                  Pogledajte kako izgleda naš prostor i zašto ga deca obožavaju
                </p>
              </motion.div>

              {/* Category filter */}
              <div className="flex justify-center gap-4 mb-8">
                {['sve', 'prostor', 'aktivnosti', 'oprema'].map((cat) => (
                  <motion.button
                    key={cat}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      cat === 'sve' 
                        ? 'bg-secondary-500 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </motion.button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedImage(i)}
                    whileHover={{ y: -10 }}
                  >
                    <div className="relative h-64 rounded-xl overflow-hidden shadow-soft">
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary-100 to-accent-100" />
                      
                      {/* Placeholder illustration */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <PaletteIcon size={80} className="text-white/50" />
                        </motion.div>
                      </div>
                      
                      {/* Content overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                        <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                        <p className="text-white/80 text-sm">{image.description}</p>
                      </div>
                      
                      {/* Hover effect */}
                      <motion.div
                        className="absolute inset-0 bg-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-white rounded-full p-3"
                        >
                          <svg className="w-6 h-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA for 3D tour */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <SafeLink href="/3d-ucionica" className="btn-primary inline-flex items-center group">
                  <RocketSVG size={20} className="mr-2 group-hover:translate-x-1 transition-transform" />
                  Pokreni 3D virtuelni obilazak
                </SafeLink>
              </motion.div>
            </div>

            {/* Enhanced Lightbox */}
            <AnimatePresence>
              {selectedImage !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                  onClick={() => setSelectedImage(null)}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-white rounded-2xl p-6 max-w-4xl w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="aspect-video bg-gradient-to-br from-secondary-100 to-accent-100 rounded-xl flex items-center justify-center mb-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <PaletteIcon size={120} className="text-white/30" />
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {galleryImages[selectedImage].title}
                    </h3>
                    <p className="text-gray-600 mb-4">{galleryImages[selectedImage].description}</p>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="btn-secondary w-full"
                    >
                      Zatvori
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}

        {/* Enhanced Programs Section */}
        {activeTab === 'programs' && (
          <motion.section
            key="programs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-16 md:py-20 lg:py-24"
          >
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Programi prilagođeni <span className="text-accent-600">uzrastu</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                  Svaki program je pažljivo osmišljen da prati razvojne faze vašeg deteta
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {programs.map((program, i) => {
                  const Icon = program.icon
                  
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="relative"
                    >
                      <motion.div
                        className="h-full bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-xl transition-all duration-300"
                        whileHover={{ y: -10 }}
                      >
                        {/* Header with gradient */}
                        <div className={`bg-gradient-to-br from-${program.color}-400 to-${program.color}-600 p-8 text-white text-center`}>
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                          >
                            <Icon size={64} className="mx-auto mb-4" />
                          </motion.div>
                          <div className="text-3xl font-bold mb-2">{program.age} godina</div>
                          <h3 className="text-xl font-semibold">{program.name}</h3>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6">
                          <p className="text-gray-600 mb-6">{program.description}</p>
                          
                          <h4 className="font-semibold mb-3 text-gray-900">Program uključuje:</h4>
                          <div className="space-y-2">
                            {program.features.map((feature, j) => (
                              <motion.div
                                key={j}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + j * 0.1 }}
                                className="flex items-center gap-2"
                              >
                                <CheckSVG size={16} className={`text-${program.color}-500`} />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </motion.div>
                            ))}
                          </div>
                          
                          <motion.button
                            className={`w-full mt-6 px-4 py-3 bg-${program.color}-50 text-${program.color}-600 rounded-lg font-medium hover:bg-${program.color}-100 transition-colors`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Saznaj više
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-16"
              >
                <p className="text-gray-600 mb-4">Niste sigurni koji program je najbolji za vaše dete?</p>
                <SafeLink href="/zakazivanje" className="btn-primary">
                  Zakažite besplatne konsultacije
                </SafeLink>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Enhanced CTA Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-accent-500 to-accent-600 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              y: [0, -30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="container relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <HeartSVG size={64} className="mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Dođite i uverite se sami
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Zakažite besplatnu posetu i demo čas. Vaše dete će obožavati našu učionicu!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SafeLink href="/zakazivanje" className="btn bg-white text-accent-600 hover:bg-gray-100 hover:scale-105 transition-all">
                <CalendarSVG size={20} className="mr-2" />
                Zakažite posetu
              </SafeLink>
              <SafeLink href="/kontakt" className="btn border-2 border-white text-white hover:bg-white hover:text-accent-600 transition-all">
                Kontaktirajte nas
              </SafeLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}