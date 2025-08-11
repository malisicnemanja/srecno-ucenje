'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useSanityQuery } from '@/hooks/useSanity'
import { franchiseModelsPageQuery, franchisePackagesQuery } from '@/lib/sanity.queries'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import SafeLink from '@/components/common/SafeLink'
import { useState, useEffect, useRef } from 'react'

// Import new components
import { Button } from '@/components/ui/Button'
import * as Icons from '@/components/ui/Icons'
import { BrushUnderline } from '@/components/ui/BrushUnderline'
import { AlternatingText } from '@/components/ui/AlternatingText'
import { HeroSection } from '@/components/features/cms/HeroSection'

// Import missing icons
import { Rocket as RocketIcon, Star as StarIcon, Heart as HeartIcon, Check as CheckIcon } from 'lucide-react'

// Success Stories Floating Bubbles Component
const SuccessStoryBubble = ({ story, index }: { story: any; index: number }) => {
  const positions = [
    'top-16 left-8', 'top-8 right-16', 'top-32 left-24',
    'bottom-20 right-8', 'bottom-16 left-16', 'bottom-32 right-32'
  ]
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotate: 0,
        y: [0, -15, 0],
        x: [0, 10, 0]
      }}
      transition={{ 
        delay: (index * 0.4),
        duration: 0.8,
        y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        x: { duration: 8, repeat: Infinity, ease: "easeInOut" }
      }}
      className={`absolute ${positions[index % positions.length]} z-10`}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border-2 border-brand-sky max-w-48">
        <Icons.Trophy className="w-8 h-8 text-brand-sun mb-2" />
        <div className="text-sm font-bold text-gray-800 mb-1">{story.name}</div>
        <div className="text-xs text-gray-600">{story.location}</div>
        <div className="text-xs text-brand-sky font-medium mt-1">"{story.quote}"</div>
      </div>
    </motion.div>
  )
}

// Animated Counter Component
const AnimatedCounter = ({ target, suffix = '', duration = 2000 }: { target: string, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })

  useEffect(() => {
    if (!inView) return
    
    const numericTarget = parseInt(target.replace(/[^0-9]/g, ''), 10)
    if (isNaN(numericTarget)) return

    let start = 0
    const increment = numericTarget / (duration / 16)
    
    const counter = setInterval(() => {
      start += increment
      if (start >= numericTarget) {
        setCount(numericTarget)
        clearInterval(counter)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(counter)
  }, [inView, target, duration])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export default function FransizaModeliPage() {
  const { data: pageData, isLoading: pageLoading } = useSanityQuery(franchiseModelsPageQuery)
  const { data: packages, isLoading: packagesLoading } = useSanityQuery(franchisePackagesQuery)
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null)
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  // Alternating titles animation - NEW IMPROVED VERSION
  const alternatingTitles = [
    'Izaberite Tempo Rasta',
    'Pronađite Svoj Put',
    'Ostvarite Snove',
    'Počnite Avanturu',
    'Transformišite Budućnost'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % alternatingTitles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [alternatingTitles.length])

  // Success stories for floating bubbles
  const successStories = [
    { name: 'Marija P.', location: 'Novi Sad', quote: 'Najbolja investicija!', emoji: '🌟' },
    { name: 'Stefan K.', location: 'Kragujevac', quote: 'Promenio mi život', emoji: '🚀' },
    { name: 'Ana M.', location: 'Niš', quote: '100+ dece mesečno!', emoji: '💚' },
    { name: 'Petar J.', location: 'Subotica', quote: 'Fantastična podrška', emoji: '🎯' },
    { name: 'Milica D.', location: 'Čačak', quote: 'Brz povraćaj', emoji: '📈' },
    { name: 'Miloš V.', location: 'Leskovac', quote: 'Volim što radim!', emoji: '❤️' }
  ]

  if (pageLoading || packagesLoading) {
    return (
      <div className="min-h-screen bg-sky-50">
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

  // Enhanced packages with Sky/Sun/Heart theme colors
  const enhancedPackages = [
    {
      _id: '1',
      name: 'Sky Starter',
      tagline: 'Počnite sa poverenjem',
      themeColor: 'sky',
      price: { amount: 2900, currency: 'EUR', displayText: '2.900€' },
      features: [
        { text: 'Licenca za 1 lokaciju', included: true },
        { text: 'Sky obuka (3 dana)', included: true },
        { text: 'Početni marketing paket', included: true },
        { text: 'Podrška prve 3 meseca', included: true },
        { text: 'Online resursi', included: true }
      ],
      highlighted: false,
      ctaButton: { text: 'Počni avanturu', link: '/zakazivanje', style: 'primary' }
    },
    {
      _id: '2', 
      name: 'Sun Professional',
      tagline: 'Zasijajte u obrazovanju',
      themeColor: 'sun',
      price: { amount: 5900, currency: 'EUR', displayText: '5.900€' },
      features: [
        { text: 'Proširena licenca', included: true },
        { text: 'Sun obuka (7 dana + online)', included: true },
        { text: 'Premium marketing kampanje', included: true },
        { text: 'Podrška cele godine', included: true },
        { text: 'Napredan CRM sistem', included: true },
        { text: 'VIP mentor podrška', included: true }
      ],
      highlighted: true,
      badge: 'Najpopularniji',
      ctaButton: { text: 'Zasijajte sada', link: '/zakazivanje', style: 'secondary' }
    },
    {
      _id: '3',
      name: 'Heart Premium',
      tagline: 'Sa srcem do uspeha',
      themeColor: 'heart',
      price: { amount: 9900, currency: 'EUR', displayText: '9.900€' },
      features: [
        { text: 'Master licenca za region', included: true },
        { text: 'Heart obuka (14 dana VIP)', included: true },
        { text: 'Kompletna brend podrška', included: true },
        { text: 'AI-enhanced CRM', included: true },
        { text: 'Ekskluzivna teritorija', included: true },
        { text: 'Personalni biznis mentor', included: true },
        { text: 'ROI garancija 18 meseci', included: true }
      ],
      highlighted: false,
      ctaButton: { text: 'Investiraj sa srcem', link: '/zakazivanje', style: 'accent' }
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced with alternating text */}
      <section className="relative overflow-hidden bg-sky-50 min-h-screen flex items-center">
        {/* Success Story Bubbles */}
        {successStories.map((story, index) => (
          <SuccessStoryBubble key={index} story={story} index={index} />
        ))}

        {/* Animated background elements */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <motion.div
            className="absolute top-20 right-20 w-64 h-64 bg-sky-200 rounded-full opacity-40"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-80 h-80 bg-sun-200 rounded-full opacity-30"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -180, -360]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-96 h-96 bg-heart-200 rounded-full opacity-20"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 90, 180]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        <div className="container relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Enhanced Animated Title */}
            <div className="relative mb-8">
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold text-gray-900 relative z-10 min-h-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.span
                  key={currentTitleIndex}
                  initial={{ opacity: 0, rotateX: -90, y: 50 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  exit={{ opacity: 0, rotateX: 90, y: -50 }}
                  transition={{ duration: 0.8, ease: "backInOut" }}
                  className="inline-block"
                  style={{
                    background: currentTitleIndex % 3 === 0 ? 'linear-gradient(45deg, #0ea5e9, #0369a1)' :
                               currentTitleIndex % 3 === 1 ? 'linear-gradient(45deg, #f59e0b, #d97706)' :
                               'linear-gradient(45deg, #dc2626, #b91c1c)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {alternatingTitles[currentTitleIndex]}
                </motion.span>
              </motion.h1>
              
              {/* Animated underline with theme colors */}
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 rounded-full"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 128, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                style={{
                  background: currentTitleIndex % 3 === 0 ? 'linear-gradient(to right, #0ea5e9, #0369a1)' :
                             currentTitleIndex % 3 === 1 ? 'linear-gradient(to right, #f59e0b, #d97706)' :
                             'linear-gradient(to right, #dc2626, #b91c1c)'
                }}
              />
            </div>
            
            <motion.p 
              className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Sky za početak, Sun za praksu, Heart za lidere
            </motion.p>

            {/* Enhanced statistics with animated counters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {[
                { number: '150+', label: 'Aktivnih franšiza', icon: UsersIcon, color: 'sky' },
                { number: '20000+', label: 'Srećne dece', icon: BookIcon, color: 'sun' },
                { number: '98%', label: 'Zadovoljnih partnera', icon: HeartIcon, color: 'heart' },
                { number: '3', label: 'Premium modela', icon: AwardIcon, color: 'sky' }
              ].map((stat, i) => {
                const IconComponent = stat.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                    className="text-center group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`inline-block p-4 bg-white rounded-2xl shadow-lg mb-4 group-hover:shadow-xl transition-shadow duration-300 border-2 ${
                        stat.color === 'sky' ? 'border-sky-200 hover:border-sky-400' :
                        stat.color === 'sun' ? 'border-amber-200 hover:border-amber-400' :
                        'border-red-200 hover:border-red-400'
                      }`}
                    >
                      <IconComponent size={36} className={
                        stat.color === 'sky' ? 'text-sky-600' :
                        stat.color === 'sun' ? 'text-amber-600' :
                        'text-red-600'
                      } />
                    </motion.div>
                    <div className="font-bold text-3xl lg:text-4xl text-gray-900 mb-2">
                      <AnimatedCounter 
                        target={stat.number} 
                        duration={2000}
                      />
                    </div>
                    <div className="text-sm lg:text-base text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-20"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto relative"
              >
                <motion.div
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-3 bg-sky-500 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2"
                />
              </motion.div>
              <p className="text-sm text-gray-500 mt-2">Skrolujte da vidite modele</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Packages Section - Sky/Sun/Heart Colors */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100 rounded-full opacity-50" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100 rounded-full opacity-50" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-red-100 rounded-full opacity-30" />
        
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Franšizni <span className="bg-gradient-to-r from-sky-600 via-amber-600 to-red-600 bg-clip-text text-transparent">Modeli</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Svaki model je dizajniran sa različitom bojom energije i nivoom podrške
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {enhancedPackages.map((packageItem, i) => {
              const isHovered = hoveredPackage === packageItem._id
              const isHighlighted = packageItem.highlighted
              const themeColors = {
                sky: {
                  bg: 'from-sky-400 to-sky-500',
                  border: 'border-sky-200 hover:border-sky-400',
                  text: 'text-sky-600',
                  bgLight: 'bg-sky-100',
                  gradient: 'from-white to-sky-50'
                },
                sun: {
                  bg: 'from-amber-400 to-amber-500',
                  border: 'border-amber-200 hover:border-amber-400',
                  text: 'text-amber-600',
                  bgLight: 'bg-amber-100',
                  gradient: 'from-white to-amber-50'
                },
                heart: {
                  bg: 'from-red-400 to-red-500',
                  border: 'border-red-200 hover:border-red-400',
                  text: 'text-red-600',
                  bgLight: 'bg-red-100',
                  gradient: 'from-white to-red-50'
                }
              }
              const theme = themeColors[packageItem.themeColor as keyof typeof themeColors]
              
              return (
                <motion.div
                  key={packageItem._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                  onMouseEnter={() => setHoveredPackage(packageItem._id)}
                  onMouseLeave={() => setHoveredPackage(null)}
                  className="relative group"
                >
                  {/* Badge */}
                  {packageItem.badge && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                    >
                      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {packageItem.badge}
                      </div>
                    </motion.div>
                  )}
                  
                  <motion.div
                    animate={{ 
                      y: isHovered ? -8 : 0,
                      scale: isHovered ? 1.02 : 1
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`relative bg-gradient-to-br ${theme.gradient} rounded-3xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${
                      isHighlighted 
                        ? theme.border
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    {/* Card header with theme icon */}
                    <div className="text-center mb-8">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-br ${theme.bg}`}
                      >
                        {packageItem.themeColor === 'sky' && <RocketIcon size={32} className="text-white" />}
                        {packageItem.themeColor === 'sun' && <StarIcon size={32} className="text-white" />}
                        {packageItem.themeColor === 'heart' && <HeartIcon size={32} className="text-white" />}
                      </motion.div>
                      
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        {packageItem.name}
                      </h3>
                      <p className="text-gray-600 text-lg mb-6">
                        {packageItem.tagline}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-8">
                      <motion.div 
                        className={`text-4xl lg:text-5xl font-bold ${theme.text} mb-2`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {packageItem.price.displayText}
                      </motion.div>
                      <div className="text-sm text-gray-500 uppercase tracking-wide">
                        Jednokratna investicija
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {packageItem.features.map((feature, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + j * 0.05, duration: 0.4 }}
                          className="flex items-start group-item"
                        >
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            className={`flex-shrink-0 w-6 h-6 rounded-full ${theme.bgLight} flex items-center justify-center mr-3 mt-0.5`}
                          >
                            <CheckIcon size={14} className={theme.text} />
                          </motion.div>
                          <span className="text-gray-700 leading-relaxed">
                            {feature.text}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <SafeLink 
                        href={packageItem.ctaButton.link}
                        className={`btn w-full text-center py-4 text-lg font-semibold rounded-2xl transition-all duration-300 ${
                          packageItem.themeColor === 'sky' ? 'bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-lg hover:shadow-xl' :
                          packageItem.themeColor === 'sun' ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl' :
                          'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl'
                        }`}
                      >
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="inline-block"
                        >
                          {packageItem.ctaButton.text}
                        </motion.span>
                      </SafeLink>
                    </div>

                    {/* Hover overlay effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 0.05 : 0 }}
                      className={`absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-br ${theme.bg}`}
                    />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interactive Comparison Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Interaktivno <span className="bg-gradient-to-r from-sky-600 via-amber-600 to-red-600 bg-clip-text text-transparent">Poređenje</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kliknite na red da vidite detalje o svakoj karakteristici
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-sky-50 via-amber-50 to-red-50">
                    <tr>
                      <th className="text-left p-6 font-bold text-gray-900">Karakteristike</th>
                      <th className="text-center p-6">
                        <div className="text-sky-700 font-bold text-lg">Sky</div>
                        <div className="text-sm text-sky-600">Početak sa poverenjem</div>
                      </th>
                      <th className="text-center p-6">
                        <div className="text-amber-700 font-bold text-lg">Sun</div>
                        <div className="text-sm text-amber-600">Zasijajte u praksi</div>
                      </th>
                      <th className="text-center p-6">
                        <div className="text-red-700 font-bold text-lg">Heart</div>
                        <div className="text-sm text-red-600">Lideristvo sa srcem</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        feature: 'Broj lokacija',
                        sky: '1 lokacija',
                        sun: '1 + proširenje', 
                        heart: 'Neograničeno regiono'
                      },
                      {
                        feature: 'Trajanje obuke',
                        sky: '3 dana intenzivno',
                        sun: '7 dana + online resursi',
                        heart: '14 dana VIP + mentorstvo'
                      },
                      {
                        feature: 'Marketing podrška',
                        sky: 'Osnovni starter paket',
                        sun: 'Premium kampanje',
                        heart: 'VIP brend strategija'
                      },
                      {
                        feature: 'CRM sistem',
                        sky: '❌ Bez sistema',
                        sun: '✅ Standardni CRM',
                        heart: '✅ AI-Enhanced CRM'
                      },
                      {
                        feature: 'Teritorijalna zaštita',
                        sky: '❌ Bez zaštite',
                        sun: '✅ Umerena zaštita',
                        heart: '✅ Ekskluzivna teritorija'
                      },
                      {
                        feature: 'ROI garancija',
                        sky: '❌ Bez garancije',
                        sun: '❌ Bez garancije',
                        heart: '✅ 18 meseci garancija'
                      }
                    ].map((row, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-sky-25 hover:via-amber-25 hover:to-red-25 transition-all duration-300 cursor-pointer"
                        whileHover={{ scale: 1.01 }}
                      >
                        <td className="p-6 font-semibold text-gray-900">{row.feature}</td>
                        <td className="p-6 text-center text-gray-700">{row.sky}</td>
                        <td className="p-6 text-center text-gray-700">{row.sun}</td>
                        <td className="p-6 text-center text-gray-700">{row.heart}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-gradient-to-br from-sky-600 via-amber-600 to-red-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        <div className="container relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block mb-8"
            >
              <HeartIcon size={64} className="text-white" />
            </motion.div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Niste sigurni koji <span className="text-amber-200">model je za vas?</span>
            </h2>
            
            <p className="text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
              Bez brige! Naš stručni tim će analizirati vaše potrebe i pomoći da izaberete 
              <strong className="text-amber-200"> savršenu opciju</strong> za vaše ciljeve.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SafeLink 
                href="/zakazivanje" 
                className="bg-white text-sky-600 text-xl px-12 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center gap-3"
              >
                <span>Zakažite besplatne konsultacije</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </SafeLink>
            </motion.div>

            <motion.p 
              className="text-white/70 mt-6 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ✅ Bez obaveze • ✅ Stručni saveti • ✅ Trenutno dostupno
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}