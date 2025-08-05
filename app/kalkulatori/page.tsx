'use client'

import { useState } from 'react'
import { BrainIcon, TrendingUpIcon, RocketIcon, TargetIcon } from '@/components/icons'
import { motion } from 'framer-motion'
import InvestmentCalculator from '@/components/features/calculators/InvestmentCalculator'
import ROICalculator from '@/components/features/calculators/ROICalculator'
import SpaceOptimizer from '@/components/features/calculators/SpaceOptimizer'
import { useSanityQuery } from '@/hooks/useSanity'
import { calculatorSettingsQuery } from '@/lib/sanity.queries'

type CalculatorType = 'investment' | 'roi' | 'space'

// Animated Science SVG
const ScienceAtom = () => (
  <motion.svg 
    width="120" 
    height="120" 
    viewBox="0 0 120 120" 
    className="text-primary-400 opacity-20"
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    <motion.circle 
      cx="60" 
      cy="60" 
      r="8" 
      fill="currentColor"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.ellipse 
      cx="60" 
      cy="60" 
      rx="40" 
      ry="15" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      animate={{ rotateX: [0, 360] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
    <motion.ellipse 
      cx="60" 
      cy="60" 
      rx="40" 
      ry="15" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      transform="rotate(60 60 60)"
      animate={{ rotateY: [0, 360] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    />
    <motion.ellipse 
      cx="60" 
      cy="60" 
      rx="40" 
      ry="15" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      transform="rotate(120 60 60)"
      animate={{ rotateZ: [0, 360] }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    />
  </motion.svg>
)

// Animated Nature Leaf SVG
const NatureLeaf = () => (
  <motion.svg 
    width="100" 
    height="100" 
    viewBox="0 0 100 100" 
    className="text-secondary-400 opacity-25"
    animate={{ 
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0]
    }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <motion.path 
      d="M50 10 C70 30, 70 50, 50 70 C30 50, 30 30, 50 10 Z" 
      fill="currentColor"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.path 
      d="M50 10 L50 70" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none"
      animate={{ pathLength: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.svg>
)

// Animated Art Palette SVG
const ArtPalette = () => (
  <motion.svg 
    width="110" 
    height="110" 
    viewBox="0 0 110 110" 
    className="text-accent-400 opacity-20"
    animate={{ 
      rotate: [0, 10, -10, 0],
      scale: [1, 1.05, 1]
    }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    <motion.path 
      d="M30 55 C30 35, 45 20, 65 20 C85 20, 100 35, 100 55 C100 65, 95 70, 85 70 L40 70 C35 70, 30 65, 30 55 Z" 
      fill="currentColor"
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <motion.circle cx="50" cy="35" r="4" fill="white" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
    <motion.circle cx="65" cy="40" r="4" fill="white" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
    <motion.circle cx="75" cy="55" r="4" fill="white" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
  </motion.svg>
)

// Calculator Graph SVG
const CalculatorGraph = () => (
  <motion.svg 
    width="130" 
    height="130" 
    viewBox="0 0 130 130" 
    className="text-warm-400 opacity-25"
    animate={{ 
      scale: [1, 1.1, 1],
      rotate: [0, 2, -2, 0]
    }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  >
    <motion.rect 
      x="20" 
      y="20" 
      width="90" 
      height="90" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      rx="8"
      animate={{ strokeDasharray: ["0 400", "400 400", "400 0"] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <motion.path 
      d="M30 80 L50 60 L70 70 L90 40 L110 50" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3"
      animate={{ pathLength: [0, 1], opacity: [0, 1] }}
      transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
    />
    <motion.circle cx="50" cy="60" r="3" fill="currentColor" animate={{ scale: [0, 1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
    <motion.circle cx="70" cy="70" r="3" fill="currentColor" animate={{ scale: [0, 1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} />
    <motion.circle cx="90" cy="40" r="3" fill="currentColor" animate={{ scale: [0, 1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 2 }} />
  </motion.svg>
)

export default function CalculatorsPage() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('investment')
  
  // Fetch calculator settings from Sanity
  const { data: settings, isLoading } = useSanityQuery(calculatorSettingsQuery)

  // Default calculator data
  const defaultCalculators = [
    {
      id: 'investment' as CalculatorType,
      title: settings?.roiCalculator?.title || 'Kalkulator Investicije',
      description: settings?.roiCalculator?.description || 'Izračunajte ukupnu investiciju i ROI period za vašu franšizu',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'roi' as CalculatorType,
      title: settings?.investmentCalculator?.title || 'ROI Analiza',
      description: settings?.investmentCalculator?.description || 'Analizirajte profitabilnost i uporedite sa konkurencijom',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: 'space' as CalculatorType,
      title: 'Optimizator Prostora',
      description: '3D planiranje i optimizacija vašeg edukativnog prostora',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
  ]
  
  const calculators = defaultCalculators

  // Default benefits data
  const defaultBenefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Precizne Projekcije",
      description: "Baziran na realnim podacima iz naše mreže franšiza sa tačnošću od 95%",
      color: "primary"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Analiza Tržišta",
      description: "Upoređujte vaše projekcije sa lokalnim tržištem i konkurencijom",
      color: "secondary"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: "Personalizovano",
      description: "Prilagođeno vašem gradu, modelu franšize i specifičnim potrebama",
      color: "accent"
    }
  ]
  
  const benefits = settings?.features || defaultBenefits

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Učitavanje kalkulatora...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-primary-50/30 to-secondary-50/20 min-h-[90vh] flex items-center">
        {/* Floating animated elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Science Atom - top right */}
          <motion.div
            className="absolute top-20 right-20"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ScienceAtom />
          </motion.div>

          {/* Nature Leaf - middle left */}
          <motion.div
            className="absolute top-1/2 left-20 transform -translate-y-1/2"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <NatureLeaf />
          </motion.div>

          {/* Art Palette - bottom right */}
          <motion.div
            className="absolute bottom-32 right-1/4"
            animate={{
              y: [0, -25, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArtPalette />
          </motion.div>

          {/* Calculator Graph - top left */}
          <motion.div
            className="absolute top-32 left-1/4"
            animate={{
              rotate: [0, 5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <CalculatorGraph />
          </motion.div>

          {/* Additional floating particles */}
          <motion.div
            className="absolute top-1/4 right-1/3 w-4 h-4 bg-accent-300 rounded-full opacity-40"
            animate={{
              y: [0, -40, 0],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-6 h-6 bg-secondary-300 rounded-full opacity-30"
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
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
                className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Profesionalni alati za uspeh
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                Pametni <span className="text-gradient-primary">Kalkulatori</span>
                <br />
                za Vašu <span className="text-gradient-secondary">Franšizu</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Profesionalni alati za planiranje investicije, analizu profitabilnosti i optimizaciju prostora
              </p>

              {/* Feature highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-6 mb-8"
              >
                {[
                  { icon: <BrainIcon size={24} className="text-primary" />, text: "Precizne kalkulacije" },
                  { icon: <TrendingUpIcon size={24} className="text-primary" />, text: "Vizuelni izveštaji" },
                  { icon: <RocketIcon size={24} className="text-primary" />, text: "Trenutni rezultati" },
                  { icon: <TargetIcon size={24} className="text-primary" />, text: "Personalizovano" }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
                    className="flex items-center bg-white px-4 py-2 rounded-full shadow-md"
                  >
                    <span className="mr-2">{feature.icon}</span>
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-4"
                  onClick={() => document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Počnite kalkulaciju
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/zakazivanje"
                  className="btn-outline-primary text-lg px-8 py-4"
                >
                  Zakaži konsultacije
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calculator Tabs */}
      <section id="calculators" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Izaberite Vaš <span className="text-gradient-primary">Kalkulator</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Svaki kalkulator je prilagođen specifičnim potrebama vašeg poslovnog planiranja
            </p>
          </motion.div>

          {/* Modern Calculator Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {calculators.map((calc, index) => (
              <motion.button
                key={calc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveCalculator(calc.id)}
                className={`group relative p-8 rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                  activeCalculator === calc.id
                    ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-2xl shadow-primary-500/25'
                    : 'bg-white text-gray-700 shadow-xl hover:shadow-2xl border border-gray-100'
                }`}
              >
                {/* Decorative elements */}
                <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-2xl transition-all duration-300 ${
                  activeCalculator === calc.id 
                    ? 'bg-white/10' 
                    : 'bg-gradient-to-br from-primary-50 to-secondary-50'
                }`} />
                
                {/* Icon with enhanced styling */}
                <motion.div
                  className={`relative z-10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                    activeCalculator === calc.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gradient-to-br from-primary-100 to-secondary-100 text-primary-600'
                  }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {calc.icon}
                </motion.div>

                {/* Content */}
                <div className="relative z-10 text-left">
                  <h3 className={`font-bold text-xl mb-3 transition-colors duration-300 ${
                    activeCalculator === calc.id ? 'text-white' : 'text-gray-900'
                  }`}>
                    {calc.title}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                    activeCalculator === calc.id ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    {calc.description}
                  </p>
                </div>

                {/* Active indicator */}
                {activeCalculator === calc.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-3 left-1/2 transform -translate-x-1/2"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rotate-45 shadow-lg" />
                  </motion.div>
                )}

                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                  activeCalculator === calc.id 
                    ? 'opacity-100 bg-gradient-to-br from-primary-400/20 to-primary-600/20' 
                    : 'opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary-50/50 to-secondary-50/50'
                }`} />

                {/* Selection glow */}
                {activeCalculator === calc.id && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 opacity-20 blur-xl scale-110"
                    animate={{ 
                      opacity: [0.2, 0.3, 0.2],
                      scale: [1.1, 1.15, 1.1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Active Calculator */}
          <div className="mt-16">
            {activeCalculator === 'investment' && <InvestmentCalculator />}
            {activeCalculator === 'roi' && <ROICalculator />}
            {activeCalculator === 'space' && <SpaceOptimizer />}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Zašto koristiti naše <span className="text-gradient-primary">kalkulatore</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Profesionalni alati koji vam garantuju uspeh na osnovu realnih podataka
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br from-${benefit.color}-100 to-${benefit.color}-200 rounded-xl flex items-center justify-center mb-6 text-${benefit.color}-600 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full filter blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="mb-6"
            >
              <svg className="w-16 h-16 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.div>
            
            <h2 className="text-4xl font-bold mb-6">
              Spremni za sledeći korak?
            </h2>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              Naš tim eksperata je tu da vam pomogne da donesete najbolju odluku za vašu franšizu
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/zakazivanje"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-gray-50"
              >
                <span>Zakaži besplatne konsultacije</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/franchise-models"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-300"
              >
                <span>Saznaj više o franšizi</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}