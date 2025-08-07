'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useSanityQuery } from '@/hooks/useSanity'
import Icons from '@/components/ui/Icons'
import { Button } from '@/components/ui/Button'
import BrushUnderline from '@/components/ui/BrushUnderline'
import AlternatingText from '@/components/ui/AlternatingText'

// Timeline Item Component
const TimelineItem = ({ step, index, isActive, onClick }: any) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  
  const colors = ['sky', 'sun', 'grass', 'heart', 'night'] as const
  const color = colors[index % colors.length]
  
  const iconMap = {
    contact: Icons.Phone,
    meeting: Icons.Video,
    training: Icons.Graduation,
    launch: Icons.Rocket,
    support: Icons.Handshake
  }
  
  const Icon = iconMap[step.icon as keyof typeof iconMap] || Icons.Phone
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center gap-8`}
    >
      {/* Content Card */}
      <motion.div
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        className={`flex-1 cursor-pointer ${index % 2 === 0 ? 'text-right' : 'text-left'}`}
      >
        <motion.div
          className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all ${
            isActive 
              ? `border-brand-${color} shadow-2xl` 
              : 'border-gray-100 hover:border-gray-200'
          }`}
        >
          <div className={`flex items-start gap-4 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
            <Icon className={`w-12 h-12 text-brand-${color} flex-shrink-0`} animate={false} />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 mb-4">{step.description}</p>
              
              {/* Details List */}
              <ul className={`space-y-2 mb-4 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                {step.details.map((detail: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: index % 2 === 0 ? 10 : -10 }}
                    animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-2 text-sm text-gray-700 ${
                      index % 2 === 0 ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <Icons.Check className={`w-4 h-4 text-brand-${color}`} animate={false} />
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
              
              <div className={`flex items-center gap-4 ${index % 2 === 0 ? 'justify-end' : ''}`}>
                <span className={`inline-block px-3 py-1 bg-brand-${color}/10 text-brand-${color} rounded-full text-sm font-medium`}>
                  {step.estimatedTime}
                </span>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs text-gray-500"
                  >
                    Klikni za detalje
                  </motion.span>
                )}
              </div>
            </div>
          </div>
          
          {/* Expanded Content */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={isActive ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-gray-100">
              <p className="text-gray-700">{step.expandedContent}</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Timeline Node */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="relative z-10"
      >
        <motion.div
          animate={isActive ? {
            scale: [1, 1.2, 1],
            boxShadow: [`0 0 0 0 rgba(93, 191, 219, 0.4)`, `0 0 0 20px rgba(93, 191, 219, 0)`, `0 0 0 0 rgba(93, 191, 219, 0)`]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${
            isActive 
              ? `bg-brand-${color} border-white` 
              : 'bg-white border-gray-300'
          }`}
        >
          <span className={`text-2xl font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>
            {index + 1}
          </span>
        </motion.div>
      </motion.div>
      
      {/* Empty space for alternating layout */}
      <div className="flex-1" />
    </motion.div>
  )
}

// Statistics Component
const Statistics = () => {
  const stats = [
    { number: '127+', label: 'Aktivnih franšiza', icon: Icons.Location },
    { number: '15,000+', label: 'Srećne dece', icon: Icons.Heart },
    { number: '98%', label: 'Zadovoljnih partnera', icon: Icons.Trophy },
    { number: '12', label: 'Meseci ROI', icon: Icons.Graph }
  ]
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="text-center"
        >
          <stat.icon className="w-12 h-12 mx-auto mb-3 text-brand-sky" />
          <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

// FAQ Component
const FAQSection = ({ faqs }: { faqs: any[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  
  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
        >
          <button
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            className="w-full text-left p-6 bg-white rounded-xl hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-900">{faq.question}</h4>
              <motion.div
                animate={{ rotate: activeIndex === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icons.ChevronDown className="w-5 h-5 text-brand-sky" animate={false} />
              </motion.div>
            </div>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={activeIndex === i ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="mt-4 text-gray-600">{faq.answer}</p>
            </motion.div>
          </button>
        </motion.div>
      ))}
    </div>
  )
}

// Query for CMS data
const howToJoinQuery = `*[_type == "howToJoinPage"][0] {
  hero {
    title,
    subtitle,
    highlightedText,
    ctaText,
    ctaLink
  },
  processSteps[] {
    title,
    description,
    icon,
    details[],
    expandedContent,
    estimatedTime
  },
  faqs[] {
    question,
    answer,
    category
  },
  finalCTA {
    title,
    subtitle,
    primaryButton {
      text,
      link
    },
    secondaryButton {
      text,
      link
    }
  }
}`

// Fallback data
const fallbackData = {
  hero: {
    title: "Vaš put do uspešne franšize",
    subtitle: "Jednostavan i transparentan proces u 5 koraka",
    highlightedText: "5 koraka",
    ctaText: "Započni svoju priču",
    ctaLink: "/fransiza/prijava"
  },
  processSteps: [
    {
      title: "Prvi kontakt",
      description: "Popunite formu ili nas pozovite - počinje vaša franšizna priča",
      icon: "contact",
      details: [
        "Online forma dostupna 24/7",
        "Telefonske konsultacije",
        "Odgovor u roku od 24h",
        "Besplatna procena"
      ],
      expandedContent: "Nakon što nas kontaktirate, naš stručni tim će detaljno analizirati vašu situaciju i ciljeve. Ova faza je ključna za pravilno usmeravanje kroz ceo proces.",
      estimatedTime: "1-2 dana"
    },
    {
      title: "Dublje upoznavanje",
      description: "Lični sastanak i predstavljanje koncepta",
      icon: "meeting",
      details: [
        "Predstavljanje metodologije",
        "Analiza tržišta",
        "Finansijski plan",
        "Prvi uvid u materijale"
      ],
      expandedContent: "Organizujemo detaljnu prezentaciju gde ćete upoznati našu metodologiju i poslovni model. Analiziraćemo potencijal vaše lokacije.",
      estimatedTime: "3-5 dana"
    },
    {
      title: "Intenzivna obuka",
      description: "Sveobuhvatna priprema za vođenje franšize",
      icon: "training",
      details: [
        "7-14 dana obuke",
        "Praktični rad",
        "Sertifikacija",
        "Priručnici i materijali"
      ],
      expandedContent: "Prolazite kroz intenzivnu obuku koja pokriva sve aspekte vođenja uspešne obrazovne franšize.",
      estimatedTime: "7-14 dana"
    },
    {
      title: "Lansiranje centra",
      description: "Otvaranje vašeg obrazovnog centra",
      icon: "launch",
      details: [
        "Marketing kampanja",
        "Otvorena vrata",
        "Prvi učenici",
        "Medijska podrška"
      ],
      expandedContent: "Uz našu potpunu podršku otvarate svoj centar. Pomažemo u svim aspektima lansiranja.",
      estimatedTime: "14-21 dan"
    },
    {
      title: "Stalna podrška",
      description: "Kontinuirana pomoć i razvoj",
      icon: "support",
      details: [
        "24/7 podrška",
        "Mesečni mentoring",
        "Novi materijali",
        "Zajednica franšizera"
      ],
      expandedContent: "Nikad niste sami - naš tim je uvek tu za vas sa podrškom, savetima i resursima.",
      estimatedTime: "Doživotno"
    }
  ],
  faqs: [
    {
      question: "Koliko je potrebno početno ulaganje?",
      answer: "Početno ulaganje zavisi od izabranog franšiznog paketa i kreće se od 2.900€ do 9.900€. Ova investicija uključuje licencu, obuku, početne materijale i marketing podršku.",
      category: "finansije"
    },
    {
      question: "Da li je potrebno prethodno iskustvo u obrazovanju?",
      answer: "Ne, prethodno iskustvo nije neophodno. Naša sveobuhvatna obuka će vas pripremiti za sve aspekte vođenja obrazovnog centra. Važna je ljubav prema radu sa decom i posvećenost.",
      category: "zahtevi"
    },
    {
      question: "Koliko brzo mogu očekivati povraćaj investicije?",
      answer: "Većina naših franšizera dostiže profitabilnost u prvih 6-12 meseci, a potpun povraćaj investicije u roku od 12-18 meseci, u zavisnosti od lokacije i zalaganja.",
      category: "finansije"
    },
    {
      question: "Kakvu podršku mogu očekivati nakon otvaranja?",
      answer: "Pružamo kontinuiranu podršku koja uključuje mesečni mentoring, pristup novim materijalima, marketing kampanje, tehničku podršku i pristup zajednici uspešnih franšizera.",
      category: "podrska"
    }
  ],
  finalCTA: {
    title: "Spremni da započnete svoju priču?",
    subtitle: "Pridružite se porodici od preko 127 uspešnih obrazovnih centara",
    primaryButton: {
      text: "Prijavite se sada",
      link: "/fransiza/prijava"
    },
    secondaryButton: {
      text: "Zakažite konsultacije",
      link: "/zakazivanje"
    }
  }
}

export default function HowToJoinPage() {
  const { data, isLoading } = useSanityQuery(howToJoinQuery)
  const pageData = data || fallbackData
  const [activeStep, setActiveStep] = useState(0)
  
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-50 to-white py-20 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%235DBFDB" fill-opacity="0.2"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {pageData.hero.title.split(' ').map((word: string, i: number) => (
                <span key={i}>
                  {i === 2 ? (
                    <span className="relative inline-block mx-2">
                      {word}
                      <BrushUnderline color="sun" style="wavy" thickness="medium" />
                    </span>
                  ) : (
                    word + ' '
                  )}
                </span>
              ))}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {pageData.hero.subtitle}
            </p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                color="sky"
                variant="filled"
                size="lg"
                onClick={() => window.location.href = pageData.hero.ctaLink}
              >
                {pageData.hero.ctaText}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Vaš put do uspeha u{' '}
              <AlternatingText
                words={['5 koraka', '30 dana', 'jednom potezu']}
                interval={3000}
                animationMode="fade"
                color="sky"
              />
            </h2>
            <p className="text-xl text-gray-600">
              Kliknite na svaki korak da saznate više
            </p>
          </motion.div>
          
          {/* Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-brand-sky via-brand-sun to-brand-heart opacity-20" />
            
            {/* Timeline Items */}
            <div className="space-y-16">
              {pageData.processSteps.map((step: any, index: number) => (
                <TimelineItem
                  key={index}
                  step={step}
                  index={index}
                  isActive={activeStep === index}
                  onClick={() => setActiveStep(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Brojevi koji govore
            </h2>
            <p className="text-xl text-gray-600">
              Pridružite se uspešnoj priči
            </p>
          </motion.div>
          
          <Statistics />
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Često postavljana pitanja
            </h2>
            <p className="text-xl text-gray-600">
              Sve što trebate znati pre pristupanja
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <FAQSection faqs={pageData.faqs} />
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 bg-brand-night text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Icons.Heart className="w-16 h-16 mx-auto mb-8 text-brand-heart" />
            
            <h2 className="text-4xl font-bold mb-6">
              {pageData.finalCTA.title}
            </h2>
            
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
              {pageData.finalCTA.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                color="sky"
                variant="filled"
                size="lg"
                onClick={() => window.location.href = pageData.finalCTA.primaryButton.link}
              >
                {pageData.finalCTA.primaryButton.text}
              </Button>
              <Button
                color="sky"
                variant="outline"
                size="lg"
                onClick={() => window.location.href = pageData.finalCTA.secondaryButton.link}
              >
                {pageData.finalCTA.secondaryButton.text}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}