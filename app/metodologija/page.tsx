'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSanityQuery } from '@/hooks/useSanity'
import { urlFor } from '@/lib/sanity.client'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { 
  BrainIcon, BookIcon, HeartIcon, SparklesIcon,
  ClockIcon, CheckIcon, StarIcon, LightbulbIcon,
  ABCIcon, PencilIcon, PaletteIcon
} from '@/components/icons'
import { BrainGrowth, ReadingChild } from '@/components/illustrations/ChildIllustrations'
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

export default function MethodologyPage() {
  const { data: methodology, isLoading } = useSanityQuery(methodologyQuery)
  const [activeMethod, setActiveMethod] = useState(0)
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('all')
  const [timelineProgress, setTimelineProgress] = useState(0)

  // Animate timeline on scroll
  useEffect(() => {
    const handleScroll = () => {
      const timelineSection = document.getElementById('timeline-section')
      if (timelineSection) {
        const rect = timelineSection.getBoundingClientRect()
        const viewHeight = window.innerHeight
        const progress = Math.min(Math.max(0, (viewHeight - rect.top) / viewHeight), 1)
        setTimelineProgress(progress * 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-50">
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

  // Error if no data from Sanity
  if (!methodology) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Podaci nisu dostupni</h1>
          <p className="text-gray-600">Molimo vas pokušajte ponovo kasnije.</p>
        </div>
      </div>
    )
  }

  const data = methodology

  return (
    <div className="min-h-screen">
      {/* Hero Section with Animated Background */}
      <section className="relative overflow-hidden bg-primary-50">
        <div className="absolute inset-0 bg-white/40" />
        
        {/* Animated SVG patterns */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-10 left-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <ABCIcon size={80} className="text-primary-200/20" />
          </motion.div>
          <motion.div
            className="absolute top-40 right-20"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <PencilIcon size={60} className="text-secondary-200/20" />
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-1/3"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <PaletteIcon size={70} className="text-accent-200/20" />
          </motion.div>
        </div>

        <div className="container relative pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block mb-6"
              >
                <BrainIcon size={48} className="text-primary-500" />
              </motion.div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                {data.hero.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                {data.hero?.subtitle || data.hero?.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <SafeLink href="/zakazivanje" className="btn-primary">
                  Zakaži demo čas
                </SafeLink>
                <SafeLink href="#methods" className="btn-outline-primary">
                  Saznaj više
                </SafeLink>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <BrainGrowth className="w-full h-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">
              {data.introduction.title}
            </h2>
            <p className="text-xl text-gray-600">
              {data.introduction.content}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.introduction?.features?.map((feature: any, i: number) => {
              const icons = {
                brain: BrainIcon,
                heart: HeartIcon,
                rocket: SparklesIcon
              }
              const Icon = icons[feature.iconType as keyof typeof icons] || BrainIcon
              const colors = ['primary', 'secondary', 'accent']
              const color = colors[i % 3]

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-interactive group"
                >
                  <div className={`bg-${color}-100 rounded-xl p-4 mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon size={48} className={`mx-auto text-${color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Methods Section with Tabs */}
      <section id="methods" className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Naše <span className="text-primary-600 font-bold">Metode</span>
            </h2>
            <p className="text-xl text-gray-600">
              Tri stuba našeg pristupa učenju
            </p>
          </motion.div>

          {/* Method Tabs */}
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {data.methods.map((method, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setActiveMethod(i)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeMethod === i
                      ? `bg-${method.color}-500 text-white shadow-lg`
                      : 'bg-white text-gray-700 hover:shadow-md'
                  }`}
                >
                  {method.name}
                </motion.button>
              ))}
            </div>

            {/* Method Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMethod}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-card p-8 md:p-12"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-4">
                      {data.methods[activeMethod].name}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {data.methods[activeMethod].description}
                    </p>
                    
                    <h4 className="font-semibold mb-4">Ključne prednosti:</h4>
                    <ul className="space-y-3">
                      {data.methods[activeMethod].benefits.map((benefit, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center"
                        >
                          <CheckIcon 
                            size={20} 
                            className={`text-${data.methods[activeMethod].color}-500 mr-3`} 
                          />
                          <span>{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={`bg-${data.methods[activeMethod].color}-50 rounded-xl p-8`}>
                    <ReadingChild 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline-section" className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Put deteta kroz <span className="text-primary-600 font-bold">program</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {/* Progress Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200">
              <motion.div
                className="w-full bg-primary-500"
                style={{ height: `${timelineProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Timeline Steps */}
            <div className="space-y-20">
              {data.timeline.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`flex items-center ${
                    i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className="flex-1">
                    <div className={`card ${i % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                      <div className="flex items-center mb-4">
                        <div className={`bg-${['primary', 'secondary', 'accent', 'warm'][i % 4]}-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold`}>
                          {step.month}
                        </div>
                        <span className="ml-3 text-sm text-gray-500">mesec</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Center dot */}
                  <div className="relative z-10">
                    <motion.div
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      className="w-8 h-8 bg-white border-4 border-primary-500 rounded-full"
                    />
                  </div>
                  
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <LightbulbIcon size={48} className="mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">
              Spremni da promenite način učenja?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Zakažite besplatan demo čas i uverite se sami u efikasnost naše metodologije
            </p>
            <SafeLink href="/zakazivanje" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Zakaži demo čas
            </SafeLink>
          </motion.div>
        </div>
      </section>
    </div>
  )
}