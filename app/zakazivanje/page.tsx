'use client'

import { motion } from 'framer-motion'
import BookingForm from '@/components/features/booking/BookingForm'
import { useState } from 'react'

// Animated Meeting SVG
const MeetingSVG = () => (
  <motion.svg 
    width="120" 
    height="120" 
    viewBox="0 0 120 120" 
    className="text-primary-400 opacity-20"
    animate={{ 
      y: [0, -15, 0],
      rotate: [0, 2, -2, 0]
    }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Table */}
    <motion.ellipse 
      cx="60" 
      cy="80" 
      rx="40" 
      ry="15" 
      fill="currentColor"
      animate={{ scaleX: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    
    {/* People around table */}
    <motion.circle cx="40" cy="65" r="8" fill="currentColor" animate={{ y: [65, 63, 65] }} transition={{ duration: 3, repeat: Infinity }} />
    <motion.circle cx="80" cy="65" r="8" fill="currentColor" animate={{ y: [65, 63, 65] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
    <motion.circle cx="60" cy="55" r="8" fill="currentColor" animate={{ y: [55, 53, 55] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
    
    {/* Speech bubbles */}
    <motion.circle 
      cx="25" 
      cy="45" 
      r="6" 
      fill="currentColor" 
      opacity="0.7"
      animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 0.9, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.circle 
      cx="95" 
      cy="50" 
      r="5" 
      fill="currentColor" 
      opacity="0.6"
      animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
    />
  </motion.svg>
)

// Animated Calendar SVG
const CalendarSVG = () => (
  <motion.svg 
    width="110" 
    height="110" 
    viewBox="0 0 110 110" 
    className="text-secondary-400 opacity-25"
    animate={{ 
      scale: [1, 1.1, 1],
      rotate: [0, 3, -3, 0]
    }}
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Calendar base */}
    <motion.rect 
      x="20" 
      y="25" 
      width="70" 
      height="60" 
      rx="5" 
      fill="currentColor"
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    
    {/* Calendar rings */}
    <motion.rect x="35" y="15" width="4" height="15" rx="2" fill="currentColor" animate={{ scaleY: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
    <motion.rect x="70" y="15" width="4" height="15" rx="2" fill="currentColor" animate={{ scaleY: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
    
    {/* Calendar grid */}
    <motion.g animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
      <rect x="30" y="40" width="8" height="6" fill="white" opacity="0.8" />
      <rect x="45" y="40" width="8" height="6" fill="white" opacity="0.8" />
      <rect x="60" y="40" width="8" height="6" fill="white" opacity="0.8" />
      <rect x="75" y="40" width="8" height="6" fill="white" opacity="0.8" />
    </motion.g>
    
    {/* Selected date */}
    <motion.rect 
      x="45" 
      y="55" 
      width="8" 
      height="6" 
      fill="white"
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </motion.svg>
)

// Animated Expert SVG
const ExpertSVG = () => (
  <motion.svg 
    width="130" 
    height="130" 
    viewBox="0 0 130 130" 
    className="text-accent-400 opacity-20"
    animate={{ 
      y: [0, -10, 0],
      x: [0, 5, 0]
    }}
    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Expert head */}
    <motion.circle 
      cx="65" 
      cy="45" 
      r="15" 
      fill="currentColor"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    
    {/* Body */}
    <motion.rect 
      x="50" 
      y="60" 
      width="30" 
      height="40" 
      rx="15" 
      fill="currentColor"
      animate={{ scaleY: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    
    {/* Briefcase */}
    <motion.rect 
      x="85" 
      y="75" 
      width="20" 
      height="15" 
      rx="2" 
      fill="currentColor"
      animate={{ 
        rotate: [0, 5, -5, 0],
        y: [75, 73, 75]
      }}
      transition={{ duration: 2.5, repeat: Infinity }}
    />
    
    {/* Knowledge sparkles */}
    <motion.circle 
      cx="40" 
      cy="30" 
      r="2" 
      fill="currentColor"
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0.5, 1.5, 0.5]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.circle 
      cx="90" 
      cy="35" 
      r="1.5" 
      fill="currentColor"
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0.5, 1.5, 0.5]
      }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
    />
    <motion.circle 
      cx="75" 
      cy="25" 
      r="2.5" 
      fill="currentColor"
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0.5, 1.5, 0.5]
      }}
      transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
    />
  </motion.svg>
)

// Animated Success SVG
const SuccessSVG = () => (
  <motion.svg 
    width="100" 
    height="100" 
    viewBox="0 0 100 100" 
    className="text-warm-400 opacity-25"
    animate={{ 
      rotate: [0, 5, -5, 0],
      scale: [1, 1.08, 1]
    }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Success chart */}
    <motion.path 
      d="M20 70 L35 55 L50 45 L65 35 L80 20" 
      stroke="currentColor" 
      strokeWidth="3" 
      fill="none"
      animate={{ 
        pathLength: [0, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    
    {/* Chart points */}
    <motion.circle cx="35" cy="55" r="3" fill="currentColor" animate={{ scale: [0.8, 1.3, 0.8] }} transition={{ duration: 2, repeat: Infinity }} />
    <motion.circle cx="50" cy="45" r="3" fill="currentColor" animate={{ scale: [0.8, 1.3, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
    <motion.circle cx="65" cy="35" r="3" fill="currentColor" animate={{ scale: [0.8, 1.3, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
    <motion.circle cx="80" cy="20" r="3" fill="currentColor" animate={{ scale: [0.8, 1.3, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: 0.9 }} />
    
    {/* Success star */}
    <motion.path 
      d="M85 25 L87 30 L92 30 L88 33 L90 38 L85 35 L80 38 L82 33 L78 30 L83 30 Z" 
      fill="currentColor"
      animate={{ 
        rotate: [0, 360],
        scale: [0.8, 1.2, 0.8]
      }}
      transition={{ duration: 4, repeat: Infinity }}
    />
  </motion.svg>
)

// Enhanced Benefits with SVG Components
const PersonalizedApproachSVG = () => (
  <motion.svg width="48" height="48" viewBox="0 0 48 48" className="text-primary-500">
    <motion.circle 
      cx="24" cy="18" r="8" 
      fill="currentColor" 
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path 
      d="M8 40c0-8 7-12 16-12s16 4 16 12" 
      stroke="currentColor" 
      strokeWidth="3" 
      fill="none"
      animate={{ pathLength: [0, 1, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.circle 
      cx="12" cy="12" r="2" 
      fill="currentColor"
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
  </motion.svg>
)

const ExpertAdviceSVG = () => (
  <motion.svg width="48" height="48" viewBox="0 0 48 48" className="text-secondary-500">
    <motion.rect 
      x="8" y="20" width="32" height="20" rx="2" 
      fill="currentColor"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.path 
      d="M16 8 L24 16 L32 8" 
      stroke="currentColor" 
      strokeWidth="3" 
      fill="none"
      animate={{ pathLength: [0, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.circle 
      cx="20" cy="28" r="2" 
      fill="white"
      animate={{ scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  </motion.svg>
)

const ConcretePlansSVG = () => (
  <motion.svg width="48" height="48" viewBox="0 0 48 48" className="text-accent-500">
    <motion.rect 
      x="8" y="8" width="32" height="32" rx="2" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none"
      animate={{ strokeDasharray: ["0 200", "200 200", "200 0"] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.path 
      d="M16 20 L22 26 L32 16" 
      stroke="currentColor" 
      strokeWidth="3" 
      fill="none"
      animate={{ pathLength: [0, 1] }}
      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
    />
    <motion.rect x="14" y="30" width="20" height="2" fill="currentColor" animate={{ scaleX: [0, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 2 }} />
  </motion.svg>
)

const NoObligationSVG = () => (
  <motion.svg width="48" height="48" viewBox="0 0 48 48" className="text-warm-500">
    <motion.circle 
      cx="24" cy="24" r="16" 
      stroke="currentColor" 
      strokeWidth="3" 
      fill="none"
      animate={{ 
        strokeDasharray: ["0 100", "50 50", "100 0"],
        rotate: [0, 180, 360]
      }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <motion.path 
      d="M16 24 L22 30 L32 18" 
      stroke="currentColor" 
      strokeWidth="3" 
      fill="none"
      animate={{ pathLength: [0, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
    />
  </motion.svg>
)

// Feature SVG Components
const PhoneSVG = () => (
  <motion.svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    className="text-primary-500"
    animate={{ 
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 1]
    }}
    transition={{ 
      duration: 3, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    <motion.path 
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
      fill="currentColor"
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.circle 
      cx="18" 
      cy="6" 
      r="2" 
      fill="currentColor" 
      opacity="0.6"
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
    />
  </motion.svg>
)

const ClockSVG = () => (
  <motion.svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    className="text-secondary-500"
    animate={{ rotate: 360 }}
    transition={{ 
      duration: 20, 
      repeat: Infinity, 
      ease: "linear" 
    }}
  >
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
    <motion.path 
      d="M12 6v6l4 2" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round"
      animate={{ pathLength: [0, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.circle 
      cx="12" 
      cy="12" 
      r="1" 
      fill="currentColor"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  </motion.svg>
)

const TargetSVG = () => (
  <motion.svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    className="text-accent-500"
    animate={{ 
      scale: [1, 1.1, 1],
      rotate: [0, 180, 360] 
    }}
    transition={{ 
      duration: 8, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    <motion.circle 
      cx="12" 
      cy="12" 
      r="10" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      animate={{ strokeDasharray: ["0 63", "31 31", "63 0"] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.circle 
      cx="12" 
      cy="12" 
      r="6" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
    <motion.circle 
      cx="12" 
      cy="12" 
      r="2" 
      fill="currentColor"
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
    />
  </motion.svg>
)

const CheckSVG = () => (
  <motion.svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    className="text-warm-500"
    animate={{ 
      scale: [1, 1.2, 1],
      rotate: [0, 5, -5, 0] 
    }}
    transition={{ 
      duration: 4, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    <motion.circle 
      cx="12" 
      cy="12" 
      r="10" 
      fill="currentColor" 
      opacity="0.2"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path 
      d="M9 12l2 2 4-4" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      animate={{ pathLength: [0, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
    />
  </motion.svg>
)

const benefits = [
  {
    icon: PersonalizedApproachSVG,
    title: 'Personalizovan pristup',
    description: 'Konsultacije prilagođene vašim specifičnim potrebama i ciljevima',
    color: 'primary'
  },
  {
    icon: ExpertAdviceSVG,
    title: 'Ekspertski saveti',
    description: 'Razgovarajte sa ljudima koji imaju godine iskustva u franšiznom poslovanju',
    color: 'secondary'
  },
  {
    icon: ConcretePlansSVG,
    title: 'Konkretni planovi',
    description: 'Dobićete jasne smernice i akcione korake za dalji razvoj',
    color: 'accent'
  },
  {
    icon: NoObligationSVG,
    title: 'Bez obaveza',
    description: 'Konsultacije su besplatne i ne obavezuju vas ni na šta',
    color: 'warm'
  },
]

const consultationProcess = [
  {
    step: 1,
    title: 'Zakažite termin',
    description: 'Popunite formu i izaberite termin koji vam odgovara',
  },
  {
    step: 2,
    title: 'Potvrda termina',
    description: 'Kontaktiraćemo vas u roku od 24h da potvrdimo termin',
  },
  {
    step: 3,
    title: 'Priprema za razgovor',
    description: 'Pošaljemo vam materijale i pitanja za pripremu',
  },
  {
    step: 4,
    title: 'Konsultacije',
    description: 'Online ili uživo razgovor sa našim ekspertom',
  },
  {
    step: 5,
    title: 'Follow-up',
    description: 'Dobijate summary razgovora i sledeće korake',
  },
]

export default function BookingPage() {
  const [showFAQ, setShowFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Da li su konsultacije zaista besplatne?',
      answer: 'Da, prve konsultacije su potpuno besplatne i traju 30-60 minuta u zavisnosti od teme.',
    },
    {
      question: 'Mogu li zakazati konsultacije ako nisam siguran da želim franšizu?',
      answer: 'Naravno! Konsultacije su upravo prilika da razjasnite sve nedoumice i donesete informisanu odluku.',
    },
    {
      question: 'Da li mogu promeniti termin nakon zakazivanja?',
      answer: 'Da, možete promeniti termin do 24h pre zakazanog vremena kontaktirajući nas putem telefona ili emaila.',
    },
    {
      question: 'Koje teme mogu da pokrijemo tokom konsultacija?',
      answer: 'Možemo razgovarati o svemu - od osnovnih informacija o franšizi, preko finansija i lokacije, do konkretnih koraka za otvaranje centra.',
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-50 min-h-[85vh] flex items-center">
        {/* Floating animated elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Meeting SVG - top left */}
          <motion.div
            className="absolute top-20 left-16"
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <MeetingSVG />
          </motion.div>

          {/* Calendar SVG - top right */}
          <motion.div
            className="absolute top-24 right-20"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <CalendarSVG />
          </motion.div>

          {/* Expert SVG - bottom left */}
          <motion.div
            className="absolute bottom-20 left-1/4"
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ExpertSVG />
          </motion.div>

          {/* Success SVG - bottom right */}
          <motion.div
            className="absolute bottom-32 right-1/3"
            animate={{
              rotate: [0, 8, -8, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <SuccessSVG />
          </motion.div>

          {/* Additional floating particles */}
          <motion.div
            className="absolute top-1/3 right-1/5 w-4 h-4 bg-primary-400 rounded-full opacity-70"
            animate={{
              y: [0, -40, 0],
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/5 w-3 h-3 bg-secondary-400 rounded-full opacity-60"
            animate={{
              x: [0, 25, 0],
              y: [0, -30, 0],
              opacity: [0.6, 0.9, 0.6]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/6 w-5 h-5 bg-accent-400 rounded-full opacity-50"
            animate={{
              y: [0, -35, 0],
              rotate: [0, 180, 360],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-warm-400 rounded-full opacity-40"
            animate={{
              x: [0, 20, 0],
              y: [0, -25, 0],
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 9,
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
                className="inline-flex items-center px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium mb-6"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                100% besplatno i bez obaveza
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                Zakažite <span className="text-primary-600">besplatne</span>
                <br />
                <span className="text-secondary-600">konsultacije</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Razgovarajte sa našim ekspertima i saznajte sve o mogućnostima franšize
              </p>

              {/* Feature highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-6 mb-8"
              >
                {[
                  { icon: PhoneSVG, text: "Online ili uživo", color: "primary" },
                  { icon: ClockSVG, text: "30-60 minuta", color: "secondary" },
                  { icon: TargetSVG, text: "Personalizovano", color: "accent" },
                  { icon: CheckSVG, text: "Bez obaveza", color: "warm" }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
                    className={`flex items-center bg-white px-4 py-2 rounded-full shadow-md border-l-4 border-${feature.color}-500`}
                  >
                    <div className="mr-3">
                      <feature.icon />
                    </div>
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-4"
                  onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Rezerviši termin
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Booking Form */}
            <motion.div
              id="booking-form"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <BookingForm />
            </motion.div>

            {/* Right Column - Benefits & Process */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Enhanced Benefits */}
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold mb-8 text-gray-900"
                >
                  Zašto zakazati konsultacije?
                </motion.h2>
                <div className="grid gap-6">
                  {benefits.map((benefit, index) => {
                    const IconComponent = benefit.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className={`group flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-${benefit.color}-500`}
                      >
                        <motion.div 
                          className={`flex-shrink-0 w-16 h-16 bg-${benefit.color}-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                          whileHover={{ rotate: 5 }}
                        >
                          <IconComponent />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                            {benefit.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Enhanced Contact Info */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-primary-100 rounded-2xl p-8 border border-primary-200"
              >
                <div className="flex items-center mb-6">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-4"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </motion.div>
                  <h3 className="font-bold text-xl text-gray-900">
                    Više volite telefonski razgovor?
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 text-lg">
                  Pozovite nas direktno i zakažite konsultacije:
                </p>
                <motion.a
                  href="tel:+381111234567"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center bg-primary-500 text-white font-bold text-lg rounded-xl py-4 px-6 hover:bg-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +381 11 123 4567
                </motion.a>
                <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Radni dani 9:00 - 17:00
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Kako funkcionišu konsultacije?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Jednostavan proces u 5 koraka
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            {consultationProcess.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.2,
                  duration: 0.8,
                  ease: "easeOut"
                }}
                className="text-center relative"
              >
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                {index < consultationProcess.length - 1 && (
                  <motion.div 
                    className="hidden md:block absolute top-8 left-full w-full -ml-4"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ 
                      delay: index * 0.2 + 0.5,
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                    style={{ originX: 0 }}
                  >
                    <div className="h-0.5 bg-primary-300 w-full" />
                    <motion.svg 
                      className="w-8 h-8 text-primary-500 absolute -right-4 -top-3.5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.2 + 0.8,
                        duration: 0.4
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Često postavljana pitanja
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md"
              >
                <button
                  onClick={() => setShowFAQ(showFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-lg text-gray-900">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      showFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full filter blur-3xl" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mb-6"
          >
            <svg className="w-16 h-16 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </motion.div>
          
          <h2 className="text-4xl font-bold mb-6">
            Još uvek imate pitanja?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Pošaljite nam email i odgovorićemo u najkraćem roku
          </p>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:info@srecno-ucenje.rs"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-gray-50"
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            info@srecno-ucenje.rs
          </motion.a>
        </motion.div>
      </section>
    </main>
  )
}