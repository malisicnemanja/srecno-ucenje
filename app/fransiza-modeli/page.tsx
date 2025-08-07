'use client'

import { motion, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { useSanityQuery } from '@/hooks/useSanity'
import { franchiseModelsPageQuery, franchisePackagesQuery } from '@/lib/sanity.queries'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

// Import new design system components
import { Button } from '@/components/ui/Button'
import Icons from '@/components/ui/Icons'
import BrushUnderline from '@/components/ui/BrushUnderline'
import AlternatingText from '@/components/ui/AlternatingText'
import HeroSection from '@/components/features/cms/HeroSection'

// Success Story Bubble Component
const SuccessStoryBubble = ({ story, index }: { story: any; index: number }) => {
  const positions = [
    { top: '10%', left: '5%' },
    { top: '15%', right: '10%' },
    { bottom: '20%', left: '8%' },
    { bottom: '15%', right: '5%' },
    { top: '40%', left: '3%' },
    { top: '35%', right: '3%' }
  ]
  
  const position = positions[index % positions.length]
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -10, 0]
      }}
      transition={{ 
        delay: index * 0.3,
        duration: 0.6,
        y: { duration: 4 + index, repeat: Infinity, ease: "easeInOut" }
      }}
      className="absolute z-10 hidden lg:block"
      style={position}
    >
      <div className="bg-white rounded-2xl p-4 shadow-xl border-2 border-brand-sky max-w-[200px]">
        <Icons.Trophy className="w-6 h-6 text-brand-sun mb-2" animate={false} />
        <div className="text-sm font-bold text-gray-800">{story.name}</div>
        <div className="text-xs text-gray-600">{story.location}</div>
        <div className="text-xs text-brand-sky font-medium mt-1">"{story.quote}"</div>
      </div>
    </motion.div>
  )
}

// Animated Counter Component
const AnimatedCounter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  if (inView && count === 0) {
    let start = 0
    const increment = target / 50
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 30)
  }

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

// Package Card Component
const PackageCard = ({ pkg, index }: { pkg: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const colors = ['sky', 'sun', 'heart'] as const
  const color = colors[index % colors.length]
  
  const iconMap = {
    sky: <Icons.Rocket className="w-8 h-8 text-white" animate={false} />,
    sun: <Icons.Star className="w-8 h-8 text-white" animate={false} />,
    heart: <Icons.Heart className="w-8 h-8 text-white" animate={false} />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-full"
    >
      {pkg.badge && (
        <motion.div 
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="bg-brand-sun text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
            {pkg.badge}
          </div>
        </motion.div>
      )}
      
      <motion.div
        animate={{ 
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`bg-white rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl border-2 ${
          color === 'sky' ? 'border-brand-sky' :
          color === 'sun' ? 'border-brand-sun' :
          'border-brand-heart'
        }`}
      >
        {/* Icon */}
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
          color === 'sky' ? 'bg-brand-sky' :
          color === 'sun' ? 'bg-brand-sun' :
          'bg-brand-heart'
        }`}>
          {iconMap[color]}
        </div>
        
        {/* Content */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
        <p className="text-gray-600 mb-6">{pkg.tagline}</p>
        
        {/* Price */}
        <div className="text-center mb-8">
          <div className={`text-4xl font-bold mb-2 ${
            color === 'sky' ? 'text-brand-sky' :
            color === 'sun' ? 'text-brand-sun' :
            'text-brand-heart'
          }`}>
            {pkg.price.displayText}
          </div>
          <div className="text-sm text-gray-500">jednokratno</div>
        </div>
        
        {/* Features */}
        <ul className="space-y-3 mb-8">
          {pkg.features.map((feature: any, i: number) => (
            <li key={i} className="flex items-start">
              <Icons.Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                color === 'sky' ? 'text-brand-sky' :
                color === 'sun' ? 'text-brand-sun' :
                'text-brand-heart'
              }`} animate={false} />
              <span className="text-gray-700 text-sm">{feature.text}</span>
            </li>
          ))}
        </ul>
        
        {/* CTA Button */}
        <Button
          color={color}
          variant="filled"
          size="lg"
          fullWidth
          onClick={() => window.location.href = pkg.ctaButton.link}
        >
          {pkg.ctaButton.text}
        </Button>
      </motion.div>
    </motion.div>
  )
}

// Comparison Table Component
const ComparisonTable = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  
  const features = [
    { feature: 'Broj lokacija', mini: '1 lokacija', standard: '1 + proširenje', premium: 'Neograničeno' },
    { feature: 'Trajanje obuke', mini: '3 dana', standard: '7 dana + online', premium: '14 dana VIP' },
    { feature: 'Marketing podrška', mini: 'Osnovno', standard: 'Premium', premium: 'VIP brending' },
    { feature: 'CRM sistem', mini: false, standard: true, premium: 'AI-enhanced' },
    { feature: 'Online akademija', mini: '3 meseca', standard: '1 godina', premium: 'Doživotno' },
    { feature: 'Teritorijalna zaštita', mini: false, standard: 'Delimično', premium: true },
    { feature: 'ROI garancija', mini: false, standard: false, premium: '18 meseci' }
  ]

  const renderValue = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Icons.Check className="w-5 h-5 text-brand-grass mx-auto" animate={false} />
      ) : (
        <Icons.Close className="w-5 h-5 text-gray-300 mx-auto" animate={false} />
      )
    }
    return <span className="text-gray-700">{value}</span>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="text-left p-4 font-bold text-gray-900">Karakteristike</th>
            <th className="text-center p-4">
              <div className="text-brand-sky font-bold">Sky Starter</div>
            </th>
            <th className="text-center p-4">
              <div className="text-brand-sun font-bold">Sun Professional</div>
            </th>
            <th className="text-center p-4">
              <div className="text-brand-heart font-bold">Heart Premium</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((row, i) => (
            <motion.tr
              key={i}
              onMouseEnter={() => setHoveredRow(i)}
              onMouseLeave={() => setHoveredRow(null)}
              className={`border-b transition-colors ${
                hoveredRow === i ? 'bg-sky-50' : ''
              }`}
            >
              <td className="p-4 font-medium text-gray-900">{row.feature}</td>
              <td className="p-4 text-center">{renderValue(row.mini)}</td>
              <td className="p-4 text-center">{renderValue(row.standard)}</td>
              <td className="p-4 text-center">{renderValue(row.premium)}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function FranchiseModelsPage() {
  const { data: pageData, isLoading: pageLoading } = useSanityQuery(franchiseModelsPageQuery)
  const { data: packages, isLoading: packagesLoading } = useSanityQuery(franchisePackagesQuery)

  // Success stories data
  const successStories = [
    { name: 'Marija P.', location: 'Novi Sad', quote: 'Najbolja investicija!' },
    { name: 'Stefan K.', location: 'Kragujevac', quote: 'Promenio mi život' },
    { name: 'Ana M.', location: 'Niš', quote: '100+ dece mesečno!' },
    { name: 'Petar J.', location: 'Subotica', quote: 'Fantastična podrška' },
    { name: 'Milica D.', location: 'Čačak', quote: 'Brz povraćaj' },
    { name: 'Miloš V.', location: 'Leskovac', quote: 'Volim što radim!' }
  ]

  // Default packages data
  const defaultPackages = [
    {
      _id: '1',
      name: 'Sky Starter',
      tagline: 'Počnite sa poverenjem',
      price: { displayText: '2.900€' },
      features: [
        { text: 'Licenca za 1 lokaciju' },
        { text: 'Osnovna obuka (3 dana)' },
        { text: 'Početni marketing paket' },
        { text: 'Podrška prve 3 meseca' },
        { text: 'Online resursi' }
      ],
      ctaButton: { text: 'Počni avanturu', link: '/fransiza/prijava' }
    },
    {
      _id: '2',
      name: 'Sun Professional',
      tagline: 'Zasijajte u obrazovanju',
      badge: 'Najpopularniji',
      price: { displayText: '5.900€' },
      features: [
        { text: 'Proširena licenca' },
        { text: 'Kompletna obuka (7 dana)' },
        { text: 'Premium marketing kampanje' },
        { text: 'Godišnja podrška' },
        { text: 'CRM sistem' },
        { text: 'Mentor podrška' }
      ],
      ctaButton: { text: 'Zasijajte sada', link: '/fransiza/prijava' }
    },
    {
      _id: '3',
      name: 'Heart Premium',
      tagline: 'Sa srcem do uspeha',
      price: { displayText: '9.900€' },
      features: [
        { text: 'Master licenca za region' },
        { text: 'VIP obuka (14 dana)' },
        { text: 'Kompletna brend podrška' },
        { text: 'AI-enhanced CRM' },
        { text: 'Ekskluzivna teritorija' },
        { text: 'Personalni mentor' },
        { text: 'ROI garancija 18 meseci' }
      ],
      ctaButton: { text: 'Investiraj sa srcem', link: '/fransiza/prijava' }
    }
  ]

  const currentPackages = packages || defaultPackages

  if (pageLoading || packagesLoading) {
    return (
      <div className="min-h-screen bg-sky-50">
        <div className="container py-20">
          <SkeletonLoader type="title" className="mb-4 max-w-2xl mx-auto" />
          <SkeletonLoader type="text" lines={2} className="max-w-xl mx-auto mb-16" />
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <SkeletonLoader key={i} type="card" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section with new components */}
      <HeroSection
        layout="split-left"
        title={
          <>
            Postanite deo{' '}
            <span className="relative inline-block">
              Srećno učenje
              <BrushUnderline color="sun" style="wavy" thickness="medium" />
            </span>{' '}
            <AlternatingText
              words={['franšize', 'porodice', 'uspeha', 'budućnosti']}
              interval={3000}
              animationMode="slide-up"
              color="sky"
            />
          </>
        }
        subtitle="Pridružite se mreži od preko 127 uspešnih obrazovnih centara širom Srbije"
        buttons={[
          { text: 'Započni put', href: '/fransiza/prijava', variant: 'primary' },
          { text: 'Saznaj više', href: '/kako-se-pridruziti', variant: 'secondary' }
        ]}
        visual={{
          type: 'illustration',
          src: '/images/franchise-hero.svg',
          alt: 'Franchise illustration'
        }}
        floatingElements={successStories.map((story, i) => ({
          type: 'custom',
          content: <SuccessStoryBubble story={story} index={i} key={i} />
        }))}
        backgroundColor="sky"
      />

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: 127, label: 'Aktivnih centara', suffix: '+', icon: Icons.School },
              { number: 15000, label: 'Srećne dece', suffix: '+', icon: Icons.Heart },
              { number: 98, label: 'Zadovoljnih partnera', suffix: '%', icon: Icons.Trophy },
              { number: 12, label: 'Meseci ROI', suffix: '', icon: Icons.Graph }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-brand-sky" />
                <div className="text-3xl font-bold text-gray-900">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Izaberite svoj{' '}
              <span className="relative inline-block">
                paket
                <BrushUnderline color="heart" style="rough" thickness="thick" />
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Svaki paket je pažljivo dizajniran da odgovara različitim potrebama i ambicijama
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {currentPackages.map((pkg: any, i: number) => (
              <PackageCard key={pkg._id} pkg={pkg} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Detaljno poređenje</h2>
            <p className="text-xl text-gray-600">
              Uporedite sve karakteristike i pronađite savršen paket
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <ComparisonTable />
          </div>
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
              Niste sigurni koji model je za vas?
            </h2>
            
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
              Bez brige! Naš stručni tim će analizirati vaše potrebe i pomoći da izaberete
              savršenu opciju za vaše ciljeve.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                color="sky"
                variant="filled"
                size="lg"
                onClick={() => window.location.href = '/zakazivanje'}
              >
                Zakažite konsultacije
              </Button>
              <Button
                color="sky"
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/kako-se-pridruziti'}
              >
                Saznajte više
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
              {[
                { icon: Icons.Phone, title: 'Besplatno savetovanje', desc: '30min konsultacije' },
                { icon: Icons.Graph, title: 'Analiza tržišta', desc: 'Za vašu lokaciju' },
                { icon: Icons.Star, title: 'Personalizovan plan', desc: 'Prilagođen vama' }
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