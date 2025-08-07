'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icons from '@/components/ui/Icons'
import { Button } from '@/components/ui/Button'
import BrushUnderline from '@/components/ui/BrushUnderline'
import AlternatingText from '@/components/ui/AlternatingText'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

// Dynamic imports for heavy calculator components
const InvestmentCalculator = dynamic(() => import('@/components/features/calculators/InvestmentCalculator'), {
  loading: () => <SkeletonLoader className="h-96" />,
  ssr: false // Charts don't need SSR
})

const ROICalculator = dynamic(() => import('@/components/features/calculators/ROICalculator'), {
  loading: () => <SkeletonLoader className="h-96" />,
  ssr: false
})

const SpaceOptimizer = dynamic(() => import('@/components/features/calculators/SpaceOptimizer'), {
  loading: () => <SkeletonLoader className="h-96" />,
  ssr: false
})

type CalculatorType = 'investment' | 'roi' | 'space'

// Calculator card component
const CalculatorCard = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  type, 
  isActive, 
  onClick 
}: {
  title: string
  description: string
  icon: any
  color: 'sky' | 'sun' | 'grass' | 'heart'
  type: CalculatorType
  isActive: boolean
  onClick: () => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`relative p-6 rounded-2xl cursor-pointer transition-all ${
        isActive 
          ? `bg-brand-${color} text-white shadow-2xl` 
          : 'bg-white hover:shadow-xl'
      }`}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: `radial-gradient(circle at 30% 50%, var(--brand-${color}), transparent)`,
            opacity: 0.1
          }}
        />
      )}
      
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-xl ${
          isActive ? 'bg-white/20' : `bg-brand-${color}/10`
        } flex items-center justify-center mb-4`}>
          <Icon className={`w-8 h-8 ${
            isActive ? 'text-white' : `text-brand-${color}`
          }`} animate={false} />
        </div>
        
        <h3 className={`text-xl font-bold mb-2 ${
          isActive ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h3>
        
        <p className={`text-sm ${
          isActive ? 'text-white/90' : 'text-gray-600'
        }`}>
          {description}
        </p>
        
        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
          >
            <Icons.Check className={`w-4 h-4 text-brand-${color}`} animate={false} />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// Floating decoration component
const FloatingDecoration = ({ type, index }: { type: string; index: number }) => {
  const positions = [
    { top: '10%', left: '5%' },
    { top: '20%', right: '8%' },
    { bottom: '30%', left: '10%' },
    { bottom: '15%', right: '5%' },
    { top: '50%', left: '3%' },
    { top: '60%', right: '12%' }
  ]
  
  const colors = ['sky', 'sun', 'grass', 'heart'] as const
  const color = colors[index % colors.length]
  const position = positions[index % positions.length]
  
  return (
    <motion.div
      className={`absolute hidden lg:block`}
      style={position}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 0.1, 
        scale: 1,
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0]
      }}
      transition={{
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        y: { duration: 4 + index, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 6 + index, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <div className={`w-32 h-32 bg-brand-${color} rounded-full blur-3xl`} />
    </motion.div>
  )
}

export default function CalculatorsPage() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('investment')
  
  const calculators = [
    {
      type: 'investment' as CalculatorType,
      title: 'Kalkulator investicije',
      description: 'Izračunajte početnu investiciju i troškove pokretanja franšize',
      icon: Icons.Graph,
      color: 'sky' as const,
      component: InvestmentCalculator
    },
    {
      type: 'roi' as CalculatorType,
      title: 'Kalkulator ROI',
      description: 'Procenite povraćaj investicije i period otplate',
      icon: Icons.Trophy,
      color: 'sun' as const,
      component: ROICalculator
    },
    {
      type: 'space' as CalculatorType,
      title: 'Optimizator prostora',
      description: 'Planirajte idealan raspored učionice za maksimalan broj učenika',
      icon: Icons.School,
      color: 'grass' as const,
      component: SpaceOptimizer
    }
  ]
  
  const ActiveComponent = calculators.find(c => c.type === activeCalculator)?.component || InvestmentCalculator
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Floating decorations */}
        {[0, 1, 2, 3, 4, 5].map(i => (
          <FloatingDecoration key={i} type="circle" index={i} />
        ))}
        
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Planirajte svoju{' '}
              <span className="relative inline-block">
                <AlternatingText
                  words={['investiciju', 'budućnost', 'franšizu', 'uspeh']}
                  interval={3000}
                  animationMode="slide-up"
                  color="sky"
                />
                <BrushUnderline color="sun" style="wavy" thickness="medium" />
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Koristite naše napredne kalkulatore da precizno isplanirate svoju franšiznu investiciju
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { number: '98%', label: 'Tačnost procene', icon: Icons.Check },
                { number: '12-18', label: 'Meseci ROI', icon: Icons.Graph },
                { number: '127+', label: 'Uspešnih franšiza', icon: Icons.Trophy }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-brand-sky" />
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Calculator Selection */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Izaberite kalkulator
            </h2>
            <p className="text-lg text-gray-600">
              Kliknite na kalkulator koji želite da koristite
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {calculators.map((calc, i) => (
              <CalculatorCard
                key={calc.type}
                title={calc.title}
                description={calc.description}
                icon={calc.icon}
                color={calc.color}
                type={calc.type}
                isActive={activeCalculator === calc.type}
                onClick={() => setActiveCalculator(calc.type)}
              />
            ))}
          </div>
          
          {/* Active Calculator */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCalculator}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <Suspense fallback={<SkeletonLoader className="h-96" />}>
                  <ActiveComponent />
                </Suspense>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-brand-night text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Icons.Heart className="w-16 h-16 mx-auto mb-8 text-brand-heart" />
            
            <h2 className="text-4xl font-bold mb-6">
              Spremni za sledeći korak?
            </h2>
            
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
              Nakon što ste izračunali svoju investiciju, zakažite besplatne konsultacije
              sa našim stručnim timom
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                color="sky"
                variant="filled"
                size="lg"
                onClick={() => window.location.href = '/fransiza/prijava'}
              >
                Prijavite se sada
              </Button>
              <Button
                color="sky"
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/zakazivanje'}
              >
                Zakažite konsultacije
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
              {[
                { icon: Icons.Phone, title: 'Besplatno savetovanje', desc: '30min konsultacije' },
                { icon: Icons.Graph, title: 'Personalizovan plan', desc: 'Prilagođen vašem budžetu' },
                { icon: Icons.Trophy, title: 'Garancija uspeha', desc: '98% uspešnih franšiza' }
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <benefit.icon className="w-12 h-12 mx-auto mb-4 text-brand-sky" />
                  <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-white/80">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}