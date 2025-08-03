'use client'

import { motion } from 'framer-motion'
import { 
  RocketIcon, StarIcon, TrendingUpIcon, CheckIcon,
  UsersIcon, BookIcon, HeartIcon, AwardIcon, SparklesIcon
} from '@/components/icons'
import { useSanityQuery } from '@/hooks/useSanity'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Link from 'next/link'
import { useState } from 'react'

const franchiseModelsQuery = `*[_type == "franchiseModel"] | order(order asc) {
  _id,
  name,
  description,
  price,
  features,
  isRecommended,
  color
}`

export default function FransizaModeliPage() {
  const { data: models, isLoading } = useSanityQuery(franchiseModelsQuery)
  const [hoveredModel, setHoveredModel] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-white">
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

  // Default models if no CMS data
  const defaultModels = [
    {
      _id: '1',
      name: 'Mini Franšiza',
      description: 'Savršeno za početak - testirajte model sa minimalnom investicijom',
      price: '2.900€',
      features: [
        'Licenca za 1 lokaciju',
        'Osnovna obuka (3 dana)',
        'Početni marketing paket',
        'Podrška prve 3 meseca',
        'Priručnici i materijali'
      ],
      color: 'primary',
      icon: RocketIcon
    },
    {
      _id: '2',
      name: 'Standard Franšiza',
      description: 'Najpopularniji izbor - sve što vam treba za uspešan biznis',
      price: '5.900€',
      features: [
        'Licenca za 1 lokaciju + mogućnost proširenja',
        'Kompletna obuka (7 dana)',
        'Premium marketing paket',
        'Podrška prve godine',
        'CRM sistem',
        'Mesečne konsultacije',
        'Pristup online akademiji'
      ],
      isRecommended: true,
      color: 'secondary',
      icon: StarIcon
    },
    {
      _id: '3',
      name: 'Premium Franšiza',
      description: 'Za ambiciozne - postanite regionalni lider',
      price: '9.900€',
      features: [
        'Master licenca za region',
        'VIP obuka (14 dana) + mentorstvo',
        'Kompletan brending paket',
        'Neograničena podrška',
        'Napredni CRM sa automatizacijom',
        'Nedeljne konsultacije',
        'Pomoć pri zapošljavanju',
        'Ekskluzivna teritorija'
      ],
      color: 'accent',
      icon: TrendingUpIcon
    }
  ]

  const franchiseModels = models || defaultModels

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-soft-secondary">
        <div className="absolute inset-0 bg-white/30" />
        
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 right-20 w-64 h-64 bg-secondary-200 rounded-full opacity-20"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 20, 0]
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-80 h-80 bg-accent-200 rounded-full opacity-20"
            animate={{ 
              scale: [1, 1.1, 1],
              y: [0, -20, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
        </div>

        <div className="container relative pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-6"
            >
              <SparklesIcon size={48} className="text-accent-500" />
            </motion.div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Izaberite <span className="text-gradient-primary">Tempo Rasta</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Mini za probu, Standard za praksu, Premium za lidere
            </p>

            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {[
                { icon: UsersIcon, value: '50+', label: 'Aktivnih franšiza' },
                { icon: BookIcon, value: '100+', label: 'Obučenih mentora' },
                { icon: HeartIcon, value: '95%', label: 'Zadovoljnih partnera' },
                { icon: AwardIcon, value: '3', label: 'Modela franšize' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <stat.icon size={32} className="mx-auto mb-2 text-secondary-500" />
                  <div className="font-bold text-2xl">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Franšizni <span className="text-gradient-rainbow">Paketi</span>
            </h2>
            <p className="text-xl text-gray-600">
              Svaki paket je dizajniran da odgovara vašim potrebama i ambicijama
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {franchiseModels.map((model: any, i: number) => {
              const Icon = model.icon || StarIcon
              const isHovered = hoveredModel === model._id
              
              return (
                <motion.div
                  key={model._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredModel(model._id)}
                  onMouseLeave={() => setHoveredModel(null)}
                  className="relative"
                >
                  {model.isRecommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-warm-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                        Najpopularniji
                      </div>
                    </div>
                  )}
                  
                  <motion.div
                    animate={{ 
                      y: isHovered ? -5 : 0,
                      boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.05)'
                    }}
                    className={`card h-full ${model.isRecommended ? 'ring-2 ring-warm-500' : ''}`}
                  >
                    <div className={`gradient-soft-${model.color || 'primary'} rounded-xl p-6 mb-6`}>
                      <Icon size={48} className={`mx-auto text-${model.color || 'primary'}-600`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3">{model.name}</h3>
                    <p className="text-gray-600 mb-6">{model.description}</p>
                    
                    <div className="text-center mb-8">
                      <div className="text-4xl font-bold text-gradient-primary mb-2">
                        {model.price}
                      </div>
                      <div className="text-sm text-gray-500">jednokratno</div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {model.features.map((feature: string, j: number) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + j * 0.05 }}
                          className="flex items-start"
                        >
                          <CheckIcon 
                            size={20} 
                            className={`text-${model.color || 'primary'}-500 mr-3 mt-0.5 flex-shrink-0`} 
                          />
                          <span className="text-gray-700">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <Link
                      href="/zakazivanje"
                      className={`btn btn-${model.color || 'primary'} w-full text-center`}
                    >
                      Započnite sada
                    </Link>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Detaljno <span className="text-gradient-primary">Poređenje</span>
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-card">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-6">Karakteristike</th>
                  <th className="text-center p-6 text-primary-600">Mini</th>
                  <th className="text-center p-6 text-secondary-600">Standard</th>
                  <th className="text-center p-6 text-accent-600">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Broj lokacija', '1', '1 + proširenje', 'Neograničeno'],
                  ['Obuka', '3 dana', '7 dana', '14 dana + mentorstvo'],
                  ['Marketing podrška', 'Osnovna', 'Premium', 'VIP'],
                  ['CRM sistem', '❌', '✅', '✅ Napredni'],
                  ['Online akademija', '3 meseca', '1 godina', 'Doživotno'],
                  ['Teritorijalna ekskluzivnost', '❌', 'Delimično', '✅ Potpuna'],
                  ['ROI garancija', '❌', '❌', '✅'],
                ].map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4 font-medium">{row[0]}</td>
                    <td className="p-4 text-center">{row[1]}</td>
                    <td className="p-4 text-center">{row[2]}</td>
                    <td className="p-4 text-center">{row[3]}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
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
        
        <div className="container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Icon with animated glow */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="relative mb-8"
            >
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150" />
              <HeartIcon size={64} className="mx-auto text-white relative z-10" />
            </motion.div>
            
            {/* Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            >
              Niste sigurni koji model je za vas?
            </motion.h2>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl lg:text-2xl mb-10 max-w-3xl mx-auto text-white/90 leading-relaxed"
            >
              Bez brige! Naš tim će vam pomoći da izaberete najbolju opciju za vaše potrebe i ciljeve.
            </motion.p>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <Link 
                href="/zakazivanje" 
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:bg-gray-50 group"
              >
                <span>Zakažite besplatne konsultacije</span>
                <svg 
                  className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
            
            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80"
            >
              <div className="flex items-center">
                <CheckIcon size={20} className="mr-2" />
                <span>Besplatno bez obaveze</span>
              </div>
              <div className="flex items-center">
                <CheckIcon size={20} className="mr-2" />
                <span>15 godina iskustva</span>
              </div>
              <div className="flex items-center">
                <CheckIcon size={20} className="mr-2" />
                <span>50+ uspešnih franšiza</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}