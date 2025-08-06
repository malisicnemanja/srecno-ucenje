'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useSanityQuery } from '@/hooks/useSanity'
import { urlFor } from '@/lib/sanity.client'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import AnimatedHeadline, { AnimatedSubheadline } from '@/components/ui/AnimatedHeadline'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { 
  BrainIcon as BrainSVG, BookIcon as BookSVG, HeartIcon as HeartSVG, SparklesIcon as SparklesSVG,
  ClockIcon as ClockSVG, CheckIcon as CheckSVG, StarIcon as StarSVG, LightbulbIcon as LightbulbSVG,
  RocketIcon as RocketSVG, AwardIcon as AwardSVG, UsersIcon as UsersSVG, CalendarIcon as CalendarSVG,
  MapPinIcon as LocationSVG, PhoneIcon as PhoneSVG, TargetIcon
} from '@/components/icons'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'

const methodologyQuery = `*[_type == "methodology"][0]{
  title,
  hero,
  introduction,
  methods,
  scientificBackground,
  gallery,
  timeline,
  comparison,
  seo
}`

// Floating animated elements component
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Book floating */}
      <motion.div
        className="absolute top-20 right-10 opacity-20"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <BookSVG size={80} className="text-primary-400" />
      </motion.div>

      {/* Brain pulsating */}
      <motion.div
        className="absolute bottom-40 left-20 opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <BrainSVG size={100} className="text-secondary-400" />
      </motion.div>

      {/* Numbers floating */}
      <motion.div
        className="absolute top-1/3 left-1/4 opacity-30"
        animate={{
          y: [0, -20, 0],
          x: [-10, 10, -10],
          rotate: [0, 360]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <span className="text-6xl font-bold text-accent-400">123</span>
      </motion.div>

      {/* ABC letters */}
      <motion.div
        className="absolute top-2/3 right-1/3 opacity-25"
        animate={{
          y: [0, 20, 0],
          rotate: [-5, 5, -5]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <span className="text-5xl font-bold text-warm-400">ABC</span>
      </motion.div>

      {/* Sparkles scattered */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-20"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 20}%`
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        >
          <SparklesSVG size={30} className="text-primary-300" />
        </motion.div>
      ))}
    </div>
  )
}

export default function MethodologyPage() {
  const { data: methodology, isLoading } = useSanityQuery(methodologyQuery)
  const [activeMethod, setActiveMethod] = useState(0)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  
  const { scrollYProgress } = useScroll()
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container py-20">
          <SkeletonLoader type="title" className="mb-4 max-w-2xl mx-auto" />
          <SkeletonLoader type="text" lines={3} className="max-w-3xl mx-auto mb-16" />
          <div className="grid md:grid-cols-2 gap-8">
            <SkeletonLoader type="image" />
            <div className="space-y-4">
              <SkeletonLoader type="title" />
              <SkeletonLoader type="text" lines={5} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default data with enhanced content
  const defaultData = {
    hero: {
      title: 'Šta znači učiti srećno?',
      subtitle: 'Otkrijte naučno zasnovanu metodologiju koja menja način na koji deca uče',
      backgroundType: 'animated'
    },
    introduction: {
      title: 'Učenje kao avantura, ne obaveza',
      content: 'Srećno učenje je jedinstvena obrazovna metodologija koja kombinuje najbolje iz svetskih praksi sa lokalnim potrebama. Kroz 15 godina razvoja i rada sa preko 20.000 dece, stvorili smo sistem koji pretvara učenje u uzbudljivu avanturu.',
      features: [
        { 
          icon: BrainSVG, 
          title: 'Razvoj kognicije', 
          description: 'Unapređujemo pamćenje, koncentraciju i brzinu razmišljanja',
          color: 'primary'
        },
        { 
          icon: HeartSVG, 
          title: 'Emocionalna inteligencija', 
          description: 'Gradimo samopouzdanje i pozitivan odnos prema učenju',
          color: 'secondary'
        },
        { 
          icon: RocketSVG, 
          title: 'Praktične veštine', 
          description: 'Učimo decu kako da uče, ne samo šta da uče',
          color: 'accent'
        }
      ]
    },
    methods: [
      {
        name: 'Speed Reading',
        description: 'Tehnike brzog čitanja koje povećavaju brzinu i razumevanje teksta do 5 puta',
        benefits: ['3-5x brže čitanje', '90%+ razumevanje', 'Bolja koncentracija', 'Fotografsko pamćenje'],
        icon: BookSVG,
        color: 'primary',
        stats: { speed: '800', unit: 'reči/min' }
      },
      {
        name: 'Mentalna Aritmetika',
        description: 'Računanje bez kalkulatora koje razvija oba hemisfera mozga istovremeno',
        benefits: ['Brže od kalkulatora', 'Logičko mišljenje', 'Vizuelna memorija', 'Prostorna inteligencija'],
        icon: BrainSVG,
        color: 'secondary',
        stats: { speed: '0.3', unit: 'sekundi/zadatak' }
      },
      {
        name: 'Memory Palace',
        description: 'Drevne tehnike pamćenja prilagođene modernoj deci za 21. vek',
        benefits: ['Fotografsko pamćenje', 'Kreativnost+++', 'Organizacija znanja', 'Dugoročno pamćenje'],
        icon: SparklesSVG,
        color: 'accent',
        stats: { speed: '100', unit: 'informacija/sat' }
      }
    ],
    timeline: {
      title: 'Put deteta kroz program',
      steps: [
        { 
          month: 1, 
          title: 'Osnove i Adaptacija', 
          description: 'Upoznavanje sa metodom, gradnja navika učenja, prvi rezultati',
          icon: BookSVG
        },
        { 
          month: 3, 
          title: 'Vidljiv Napredak', 
          description: 'Značajno poboljšanje brzine čitanja i računanja, rast samopouzdanja',
          icon: RocketSVG
        },
        { 
          month: 6, 
          title: 'Majstorstvo Veština', 
          description: 'Samostalna primena tehnika, pomaganje drugim đacima, liderske veštine',
          icon: AwardSVG
        },
        { 
          month: 12, 
          title: 'Potpuna Transformacija', 
          description: 'Novo dete - sigurno, sposobno, motivisano za celoživotno učenje',
          icon: StarSVG
        }
      ]
    }
  }

  const data = methodology || defaultData

  return (
    <div className="min-h-screen">
      {/* Hero Section with Floating Elements */}
      <motion.section 
        className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 min-h-[90vh] flex items-center"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        <FloatingElements />
        
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
                  <BrainSVG size={64} className="text-primary-500" />
                  <motion.div
                    className="absolute -inset-4 bg-primary-200 rounded-full opacity-30"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
              
              <AnimatedHeadline
                text="Šta znači učiti srećno?"
                highlightText="učiti srećno"
                variants={["učiti srećno", "biti uspešan", "voleti znanje"]}
                className="text-gray-900 mb-6"
                underlineColor="text-primary-500"
              />
              
              <AnimatedSubheadline
                text={data.hero.subtitle}
                className="mb-8"
                delay={0.4}
              />

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <SafeLink href="/zakazivanje" className="btn-primary group">
                  <CalendarSVG size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                  Zakaži demo čas
                </SafeLink>
                <SafeLink href="#methods" className="btn-outline-primary">
                  Saznaj više
                </SafeLink>
              </motion.div>

              {/* Stats badges */}
              <motion.div
                className="grid grid-cols-3 gap-4 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {[
                  { number: 15, suffix: "+", label: "godina iskustva" },
                  { number: 20000, suffix: "+", label: "srećne dece" },
                  { number: 97, suffix: "%", label: "zadovoljstva" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">
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
              {/* 3D-like illustration composition */}
              <div className="relative w-full h-[500px]">
                <motion.div
                  className="absolute top-0 right-0 w-64 h-64"
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="w-full h-full bg-primary-100 rounded-3xl flex items-center justify-center">
                    <BookSVG size={120} className="text-primary-500" />
                  </div>
                </motion.div>
                
                <motion.div
                  className="absolute bottom-0 left-0 w-56 h-56"
                  animate={{ 
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                >
                  <div className="w-full h-full bg-secondary-100 rounded-3xl flex items-center justify-center">
                    <BrainSVG size={100} className="text-secondary-500" />
                  </div>
                </motion.div>
                
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                >
                  <div className="w-full h-full bg-accent-100 rounded-full flex items-center justify-center">
                    <SparklesSVG size={80} className="text-accent-500" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Introduction Section with Animated Features */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {data.introduction.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              {data.introduction.content}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {data.introduction.features.map((feature: any, i: number) => {
              const Icon = feature.icon

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                  onMouseEnter={() => setHoveredFeature(i)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <motion.div
                    className="card hover:shadow-xl transition-all duration-300"
                    animate={{
                      y: hoveredFeature === i ? -10 : 0,
                    }}
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-50 to-transparent rounded-xl opacity-0`}
                      animate={{
                        opacity: hoveredFeature === i ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="relative">
                      <motion.div
                        className={`w-20 h-20 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mb-6`}
                        animate={{
                          rotate: hoveredFeature === i ? [0, -10, 10, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon size={40} className={`text-${feature.color}-500`} />
                      </motion.div>
                      
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                      
                      {/* Floating particles on hover */}
                      <AnimatePresence>
                        {hoveredFeature === i && (
                          <>
                            {[...Array(3)].map((_, j) => (
                              <motion.div
                                key={j}
                                className={`absolute w-2 h-2 bg-${feature.color}-400 rounded-full`}
                                initial={{ 
                                  opacity: 0,
                                  x: 0,
                                  y: 0
                                }}
                                animate={{ 
                                  opacity: [0, 1, 0],
                                  x: [0, (j - 1) * 50],
                                  y: [0, -50, -100]
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ 
                                  duration: 1.5,
                                  delay: j * 0.2,
                                  repeat: Infinity
                                }}
                              />
                            ))}
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Methods Section with Advanced Tabs */}
      <section id="methods" className="py-16 md:py-20 lg:py-24 bg-gray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500 rounded-full filter blur-3xl" />
        </div>

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Naše <span className="text-primary-600">revolucionarne</span> metode
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Tri stuba našeg pristupa koji transformišu učenje
            </p>
          </motion.div>

          {/* Advanced Method Tabs */}
          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation with progress indicator */}
            <div className="relative mb-12">
              <div className="flex flex-wrap justify-center gap-4">
                {data.methods.map((method: any, i: number) => {
                  const Icon = method.icon
                  return (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setActiveMethod(i)}
                      className={`relative px-6 py-4 rounded-xl font-medium transition-all group ${
                        activeMethod === i
                          ? `bg-${method.color}-500 text-white shadow-lg shadow-${method.color}-500/30`
                          : 'bg-white text-gray-700 hover:shadow-md'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon 
                          size={24} 
                          className={activeMethod === i ? 'text-white' : `text-${method.color}-500`}
                        />
                        <span>{method.name}</span>
                      </div>
                      
                      {/* Active indicator */}
                      {activeMethod === i && (
                        <motion.div
                          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white rounded-full"
                          layoutId="activeTab"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Method Content with Advanced Animations */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMethod}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-soft overflow-hidden"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Content Side */}
                  <div className="p-8 md:p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
                        {data.methods[activeMethod].name}
                        <motion.span
                          className={`text-sm font-normal px-3 py-1 rounded-full bg-${data.methods[activeMethod].color}-100 text-${data.methods[activeMethod].color}-600`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                        >
                          Revolucionarno
                        </motion.span>
                      </h3>
                      <p className="text-gray-600 mb-8 text-lg">
                        {data.methods[activeMethod].description}
                      </p>
                      
                      {/* Animated Stats */}
                      <motion.div
                        className="mb-8 p-6 bg-gray-50 rounded-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className="text-sm text-gray-500 mb-2">Prosečna brzina nakon 3 meseca:</p>
                        <div className="flex items-baseline gap-2">
                          <AnimatedCounter
                            end={data.methods[activeMethod]?.stats?.speed ? parseFloat(data.methods[activeMethod].stats.speed) : 0}
                            decimals={data.methods[activeMethod]?.stats?.speed?.includes?.('.') ? 1 : 0}
                            className={`text-4xl font-bold text-${data.methods[activeMethod].color}-600`}
                          />
                          <span className="text-lg text-gray-600">{data.methods[activeMethod]?.stats?.unit || ''}</span>
                        </div>
                      </motion.div>
                      
                      <h4 className="font-semibold mb-4 text-lg">Ključne prednosti:</h4>
                      <div className="space-y-3">
                        {data.methods[activeMethod].benefits.map((benefit: string, i: number) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="flex items-start gap-3 group"
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 180 }}
                              transition={{ type: "spring" }}
                            >
                              <CheckSVG 
                                size={20} 
                                className={`text-${data.methods[activeMethod].color}-500 mt-0.5`} 
                              />
                            </motion.div>
                            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                              {benefit}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Visual Side */}
                  <motion.div 
                    className={`relative bg-gradient-to-br from-${data.methods[activeMethod].color}-50 to-${data.methods[activeMethod].color}-100 p-8 md:p-12 flex items-center justify-center`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Method specific illustration */}
                    <motion.div
                      className="relative"
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {activeMethod === 0 && (
                        <div className="relative">
                          <BookSVG size={200} className={`text-${data.methods[activeMethod].color}-500`} />
                          {/* Speed lines */}
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`absolute h-0.5 bg-${data.methods[activeMethod].color}-400`}
                              style={{
                                top: `${30 + i * 20}%`,
                                left: '10%',
                                width: '80%'
                              }}
                              initial={{ scaleX: 0, opacity: 0 }}
                              animate={{ 
                                scaleX: [0, 1, 0],
                                opacity: [0, 1, 0]
                              }}
                              transition={{
                                duration: 2,
                                delay: i * 0.3,
                                repeat: Infinity
                              }}
                            />
                          ))}
                        </div>
                      )}
                      
                      {activeMethod === 1 && (
                        <div className="relative">
                          <BrainSVG size={200} className={`text-${data.methods[activeMethod].color}-500`} />
                          {/* Floating numbers */}
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute text-2xl font-bold text-secondary-400"
                              style={{
                                top: `${Math.random() * 80}%`,
                                left: `${Math.random() * 80}%`
                              }}
                              animate={{
                                y: [-20, -40],
                                opacity: [0, 1, 0]
                              }}
                              transition={{
                                duration: 2,
                                delay: i * 0.4,
                                repeat: Infinity
                              }}
                            >
                              {Math.floor(Math.random() * 100)}
                            </motion.div>
                          ))}
                        </div>
                      )}
                      
                      {activeMethod === 2 && (
                        <div className="relative">
                          <SparklesSVG size={200} className={`text-${data.methods[activeMethod].color}-500`} />
                          {/* Memory particles */}
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`absolute w-3 h-3 bg-${data.methods[activeMethod].color}-400 rounded-full`}
                              style={{
                                top: '50%',
                                left: '50%'
                              }}
                              animate={{
                                x: [0, Math.cos(i * 45 * Math.PI / 180) * 100],
                                y: [0, Math.sin(i * 45 * Math.PI / 180) * 100],
                                opacity: [1, 0]
                              }}
                              transition={{
                                duration: 2,
                                delay: i * 0.1,
                                repeat: Infinity
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Enhanced Timeline Section with Path Animation */}
      <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Put deteta kroz <span className="text-primary-600">program</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Od prvog koraka do potpune transformacije
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {/* Timeline Path SVG */}
            <svg className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full" style={{ top: 0 }}>
              <motion.path
                d="M 1 0 L 1 1000"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </svg>

            {/* Timeline Steps */}
            <div className="relative space-y-24">
              {data.timeline.steps.map((step: any, i: number) => {
                const Icon = step.icon
                const isLeft = i % 2 === 0

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`flex items-center ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8`}
                  >
                    {/* Content Card */}
                    <div className="flex-1">
                      <motion.div
                        className="card hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start gap-4">
                          <motion.div
                            className={`w-16 h-16 bg-gradient-to-br from-${['primary', 'secondary', 'accent', 'warm'][i]}-400 to-${['primary', 'secondary', 'accent', 'warm'][i]}-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            {step.month}
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                              {step.title}
                              <span className="text-sm font-normal text-gray-500">mesec</span>
                            </h3>
                            <p className="text-gray-600">{step.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Center Icon */}
                    <motion.div
                      className="relative z-10"
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Icon size={24} className={`text-${['primary', 'secondary', 'accent', 'warm'][i]}-500`} />
                      </div>
                    </motion.div>
                    
                    {/* Spacer */}
                    <div className="flex-1 hidden lg:block" />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary-500 to-primary-600 text-white relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, 30, 0]
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
            <LightbulbSVG size={64} className="mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Spremni da promenite način učenja?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Zakažite besplatan demo čas i uverite se sami u efikasnost naše metodologije
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SafeLink href="/zakazivanje" className="btn bg-white text-primary-600 hover:bg-gray-100 hover:scale-105 transition-all">
                <CalendarSVG size={20} className="mr-2" />
                Zakaži demo čas
              </SafeLink>
              <SafeLink href="/franchise-models" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 transition-all">
                Postani franšizer
              </SafeLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}