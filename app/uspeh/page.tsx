'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedHeadline, { AnimatedSubheadline } from '@/components/ui/AnimatedHeadline'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { 
  AwardIcon as AwardSVG, StarIcon as StarSVG, HeartIcon as HeartSVG, RocketIcon as RocketSVG, 
  CheckIcon as CheckSVG, SparklesIcon as SparklesSVG, UsersIcon as UserSVG,
  BookIcon as BookSVG, BrainIcon as BrainSVG
} from '@/components/icons'

// Mock icons we need
const QuoteIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M14 17h3l2-4V7h-6v6h3M6 17h3l2-4V7H5v6h3z" fill="currentColor" />
  </svg>
)

const TrophySVG = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 0h1.5a2.5 2.5 0 1 1 0 5H18m-12 0v6a4 4 0 0 0 8 0V9m-4 12v3m-2 0h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ChartSVG = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

import Link from 'next/link'

// Success stories data
const successStories = [
  {
    id: 1,
    studentName: "Milica Jovanović",
    age: 10,
    location: "Beograd",
    program: "Brzo čitanje",
    avatar: "👧",
    quote: "Od devojčice koja je mrzela da čita, sada sam postala prava knjigoljupka! Pročitam 3 knjige nedeljno!",
    parentQuote: "Milica je potpuno promenila odnos prema učenju. Sada sama traži nove knjige!",
    parentName: "Ana Jovanović, mama",
    results: {
      readingSpeed: { before: 120, after: 450, unit: "reči/min" },
      booksPerMonth: { before: 0, after: 12 },
      gradeImprovement: { before: 3, after: 5, subject: "Srpski jezik" },
      concentrationTime: { before: 15, after: 60, unit: "minuta" }
    },
    achievements: [
      "Prvo mesto na školskom takmičenju iz čitanja",
      "Napisala svoj prvi esej",
      "Postala član biblioteke"
    ],
    duration: "6 meseci",
    featured: true
  },
  {
    id: 2,
    studentName: "Stefan Nikolić",
    age: 12,
    location: "Novi Sad",
    program: "Mentalna aritmetika",
    avatar: "👦",
    quote: "Matematika je sada moj omiljeni predmet! Mogu da računam brže od kalkulatora!",
    parentQuote: "Stefan je dobio samopouzdanje koje se prenelo na sve aspekte njegovog života.",
    parentName: "Marko Nikolić, tata",
    results: {
      mathGrade: { before: 3, after: 5 },
      calculationSpeed: { before: "Sporo", after: "3 sec/zadatak" },
      confidence: { before: 30, after: 95, unit: "%" },
      competitionRank: { before: "-", after: "2. mesto državno" }
    },
    achievements: [
      "Drugo mesto na državnom takmičenju",
      "Najbolji učenik matematike u školi",
      "Mentor mlađim učenicima"
    ],
    duration: "8 meseci"
  },
  {
    id: 3,
    studentName: "Anja Stojanović",
    age: 8,
    location: "Kragujevac",
    program: "Kombinovani program",
    avatar: "👧",
    quote: "Učenje je sada zabavno! Volim kada mogu brzo da završim domaći i imam više vremena za igru!",
    parentQuote: "Anja je procvetala u svakom smislu. Njena radoznalost i želja za učenjem su neverovatne.",
    parentName: "Jelena Stojanović, mama",
    results: {
      overallGrades: { before: 3.5, after: 4.8 },
      homeworkTime: { before: 120, after: 45, unit: "minuta" },
      selfEsteem: { before: "Nisko", after: "Visoko" },
      creativity: { before: 40, after: 90, unit: "%" }
    },
    achievements: [
      "Učenik generacije",
      "Osvojila 5 diploma",
      "Vodi školski časopis"
    ],
    duration: "1 godina"
  },
  {
    id: 4,
    studentName: "Luka Petrović",
    age: 14,
    location: "Niš",
    program: "Tehnike učenja",
    avatar: "👦",
    quote: "Naučio sam kako da učim pametnije, ne teže. Sada imam vremena i za sport i za prijatelje!",
    parentQuote: "Transformacija je bila neverovatna. Luka je sada organizovan i motivisan učenik.",
    parentName: "Miloš Petrović, tata",
    results: {
      studyTime: { before: 4, after: 1.5, unit: "sati/dan" },
      averageGrade: { before: 3.2, after: 4.6 },
      stressLevel: { before: 85, after: 20, unit: "%" },
      freeTime: { before: 1, after: 4, unit: "sata/dan" }
    },
    achievements: [
      "Vukovac",
      "Kapiten fudbalskog tima",
      "Volontira u biblioteci"
    ],
    duration: "4 meseca"
  }
]

// Statistics data
const globalStats = [
  { value: 5000, suffix: "+", label: "Zadovoljnih učenika", icon: UserSVG, color: "primary" },
  { value: 95, suffix: "%", label: "Stopa uspeha", icon: ChartSVG, color: "secondary" },
  { value: 150, suffix: "+", label: "Osvojenih nagrada", icon: TrophySVG, color: "accent" },
  { value: 4.8, suffix: "/5", label: "Prosečna ocena", icon: StarSVG, color: "warm" }
]

// Achievement categories
const achievementCategories = [
  {
    title: "Akademska dostignuća",
    icon: BookSVG,
    color: "primary",
    achievements: [
      { year: "2024", text: "52 učenika postalo vukovac" },
      { year: "2023", text: "Prvi na državnom takmičenju iz matematike" },
      { year: "2023", text: "38 učenika poboljšalo prosek za 1.5+" }
    ]
  },
  {
    title: "Takmičenja",
    icon: TrophySVG,
    color: "accent",
    achievements: [
      { year: "2024", text: "15 zlatnih medalja na regionalnim takmičenjima" },
      { year: "2023", text: "Ekipno prvo mesto - Matematička olimpijada" },
      { year: "2022", text: "Najbolji centar godine - Srbija" }
    ]
  },
  {
    title: "Lični razvoj",
    icon: HeartSVG,
    color: "warm",
    achievements: [
      { year: "2024", text: "89% učenika povećalo samopouzdanje" },
      { year: "2023", text: "Osnovan klub mladih lidera" },
      { year: "2023", text: "200+ učenika u volonterskim akcijama" }
    ]
  },
  {
    title: "Inovacije",
    icon: RocketSVG,
    color: "secondary",
    achievements: [
      { year: "2024", text: "Prva VR učionica u regionu" },
      { year: "2023", text: "AI asistent za personalizovano učenje" },
      { year: "2022", text: "Mobilna aplikacija za vežbanje" }
    ]
  }
]

export default function UspehPage() {
  const [selectedStory, setSelectedStory] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-100/90 via-secondary-100/80 to-accent-100/90 min-h-[85vh] flex items-center">
        {/* Vibrant animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large colorful orbs */}
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full opacity-40"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              x: [0, 50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full opacity-35"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -180, -360],
              y: [0, -30, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full opacity-30"
            animate={{ 
              scale: [1, 1.4, 1],
              rotate: [0, 90, 0],
              x: [0, -20, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Floating colorful elements */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${15 + i * 12}%`,
                left: `${75 + (i % 3) * 8}%`
              }}
              animate={{
                y: [0, -40, 0],
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 7 + i,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            >
              {i % 4 === 0 && <TrophySVG size={70} className="text-accent-500 opacity-60" />}
              {i % 4 === 1 && <StarSVG size={60} className="text-warm-500 opacity-70" />}
              {i % 4 === 2 && <RocketSVG size={65} className="text-primary-500 opacity-65" />}
              {i % 4 === 3 && <SparklesSVG size={55} className="text-secondary-500 opacity-60" />}
            </motion.div>
          ))}

          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className={`absolute w-3 h-3 rounded-full ${
                i % 3 === 0 ? 'bg-primary-400' : 
                i % 3 === 1 ? 'bg-accent-400' : 'bg-secondary-400'
              } opacity-70`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -80, 0],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0.7, 1, 0.3, 0.7]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Dynamic gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '100%']
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
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <StarSVG size={80} className="text-accent-500" />
                <motion.div
                  className="absolute -inset-4 bg-accent-200 rounded-full opacity-30"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            <AnimatedHeadline
              text="Priče koje inspirišu"
              highlightText="inspirišu"
              variants={["inspirišu", "motivišu", "pokreću"]}
              className="text-gray-900 mb-6"
              underlineColor="text-accent-500"
            />
            
            <AnimatedSubheadline
              text="Svaki učenik ima svoju jedinstvenu priču uspeha. Ovo su samo neke od njih."
              className="mb-8"
              delay={0.3}
            />

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link href="#stories" className="btn-primary group">
                <SparklesSVG size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                Pročitajte priče
              </Link>
              <Link href="/zakazivanje" className="btn-outline-primary">
                Započnite svoju priču
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Statistics */}
      <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Brojevi koji <span className="text-primary-600">govore</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Naš uspeh merimo kroz uspeh naših učenika
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {globalStats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    className={`w-24 h-24 bg-${stat.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon size={48} className={`text-${stat.color}-600`} />
                  </motion.div>
                  <div className={`text-4xl font-bold text-${stat.color}-600 mb-2`}>
                    <AnimatedCounter end={stat.value} decimals={stat.suffix === "/5" ? 1 : 0} />
                    {stat.suffix}
                  </div>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="stories" className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Transformacije koje <span className="text-accent-600">inspirišu</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Svaki učenik ima svoju jedinstvenu priču transformacije
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {successStories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="text-5xl"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring" }}
                      >
                        {story.avatar}
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold">{story.studentName}</h3>
                        <p className="text-gray-600">{story.age} godina, {story.location}</p>
                        <p className="text-sm text-primary-600 font-medium">{story.program}</p>
                      </div>
                    </div>
                    {story.featured && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-accent-100 text-accent-600 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        Istaknuto
                      </motion.div>
                    )}
                  </div>

                  {/* Quote */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <QuoteIcon size={24} className="text-gray-400 mb-2" />
                    <p className="text-gray-700 italic">{story.quote}</p>
                  </div>

                  {/* Key Results */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(story.results).slice(0, 2).map(([key, value], idx) => (
                      <div key={idx} className="text-center p-3 bg-primary-50 rounded-lg">
                        <div className="text-2xl font-bold text-primary-600">
                          {value.after}{'unit' in value && value.unit ? ` ${value.unit}` : ''}
                        </div>
                        <p className="text-xs text-gray-600">
                          {key === 'readingSpeed' ? 'Brzina čitanja' :
                           key === 'mathGrade' ? 'Ocena iz matematike' :
                           key === 'overallGrades' ? 'Prosek ocena' :
                           key === 'studyTime' ? 'Vreme učenja' : key}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-gray-900">Dostignuća:</h4>
                    <ul className="space-y-1">
                      {story.achievements.slice(0, 2).map((achievement, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckSVG size={16} className="text-primary-500" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <motion.button
                    onClick={() => setSelectedStory(story.id)}
                    className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Pročitajte celu priču
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Gallery */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Naša <span className="text-secondary-600">dostignuća</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Ponosni smo na svaki uspeh naših učenika
            </p>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {achievementCategories.map((category, i) => {
              const Icon = category.icon
              return (
                <motion.button
                  key={i}
                  onClick={() => setActiveCategory(i)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    activeCategory === i
                      ? `bg-${category.color}-500 text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                  {category.title}
                </motion.button>
              )
            })}
          </div>

          {/* Achievements List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-gray-50 rounded-2xl p-8">
                {achievementCategories[activeCategory].achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 mb-4 last:mb-0"
                  >
                    <div className={`w-16 h-16 bg-${achievementCategories[activeCategory].color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <span className={`text-${achievementCategories[activeCategory].color}-600 font-bold`}>
                        {achievement.year}
                      </span>
                    </div>
                    <div className="flex-1 bg-white rounded-lg p-4">
                      <p className="text-gray-700">{achievement.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Before/After Transformation */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-primary-50/10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Vidljiva <span className="text-primary-600">transformacija</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Pogledajte kako naši programi menjaju živote učenika
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Before */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-100">
                  <h3 className="text-2xl font-bold text-red-600 mb-6 text-center">Pre programa</h3>
                  <ul className="space-y-4">
                    {[
                      "Sporo čitanje - 100-150 reči/minut",
                      "Poteškoće sa koncentracijom",
                      "3+ sata za domaći zadatak",
                      "Strah od testova i ispita",
                      "Nisko samopouzdanje",
                      "Izbegavanje čitanja"
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-red-600 text-xs">✗</span>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* After */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-100">
                  <h3 className="text-2xl font-bold text-green-600 mb-6 text-center">Posle programa</h3>
                  <ul className="space-y-4">
                    {[
                      "Brzo čitanje - 400-600 reči/minut",
                      "Odlična koncentracija i fokus",
                      "45 minuta za domaći zadatak",
                      "Samopouzdanje na testovima",
                      "Visoko samopouzdanje",
                      "Ljubav prema knjigama"
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckSVG size={14} className="text-green-600" />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Transformation Arrow */}
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-white rounded-full p-4 shadow-lg">
                <RocketSVG size={32} className="text-primary-600" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary-500 to-primary-600 text-white relative overflow-hidden">
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
            <SparklesSVG size={64} className="mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Počnite pisati svoju priču uspeha
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Pridružite se hiljadama učenika koji su transformisali svoj način učenja
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/zakazivanje" className="btn bg-white text-primary-600 hover:bg-gray-100 hover:scale-105 transition-all">
                <StarSVG size={20} className="mr-2" />
                Zakažite besplatnu procenu
              </Link>
              <Link href="/kontakt" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 transition-all">
                Kontaktirajte nas
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const story = successStories.find(s => s.id === selectedStory)!
                return (
                  <div className="p-8">
                    <button
                      onClick={() => setSelectedStory(null)}
                      className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    {/* Header */}
                    <div className="flex items-center gap-6 mb-8">
                      <div className="text-7xl">{story.avatar}</div>
                      <div>
                        <h2 className="text-3xl font-bold mb-2">{story.studentName}</h2>
                        <p className="text-gray-600">{story.age} godina, {story.location}</p>
                        <p className="text-primary-600 font-medium">{story.program} • {story.duration}</p>
                      </div>
                    </div>

                    {/* Student Quote */}
                    <div className="bg-primary-50 rounded-xl p-6 mb-8">
                      <QuoteIcon size={32} className="text-primary-400 mb-3" />
                      <p className="text-lg text-gray-700 italic mb-4">{story.quote}</p>
                      <p className="text-sm text-gray-600">- {story.studentName}</p>
                    </div>

                    {/* Parent Quote */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-8">
                      <h3 className="font-semibold mb-3">Šta kaže roditelj:</h3>
                      <p className="text-gray-700 italic mb-2">"{story.parentQuote}"</p>
                      <p className="text-sm text-gray-600">- {story.parentName}</p>
                    </div>

                    {/* Detailed Results */}
                    <h3 className="text-xl font-bold mb-4">Detaljni rezultati:</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                      {Object.entries(story.results).map(([key, value], idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-2">
                            {key === 'readingSpeed' ? 'Brzina čitanja' :
                             key === 'booksPerMonth' ? 'Knjiga mesečno' :
                             key === 'gradeImprovement' ? 'Poboljšanje ocene' :
                             key === 'concentrationTime' ? 'Koncentracija' :
                             key === 'mathGrade' ? 'Ocena iz matematike' :
                             key === 'calculationSpeed' ? 'Brzina računanja' :
                             key === 'confidence' ? 'Samopouzdanje' :
                             key === 'competitionRank' ? 'Rang na takmičenju' :
                             key === 'overallGrades' ? 'Prosek ocena' :
                             key === 'homeworkTime' ? 'Vreme za domaći' :
                             key === 'selfEsteem' ? 'Samopoštovanje' :
                             key === 'creativity' ? 'Kreativnost' :
                             key === 'studyTime' ? 'Vreme učenja' :
                             key === 'averageGrade' ? 'Prosečna ocena' :
                             key === 'stressLevel' ? 'Nivo stresa' :
                             key === 'freeTime' ? 'Slobodno vreme' : key}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 line-through">
                              {value.before}{'unit' in value && value.unit ? ` ${value.unit}` : ''}
                            </span>
                            <span className="text-primary-600">→</span>
                            <span className="text-xl font-bold text-primary-600">
                              {value.after}{'unit' in value && value.unit ? ` ${value.unit}` : ''}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Achievements */}
                    <h3 className="text-xl font-bold mb-4">Dostignuća:</h3>
                    <ul className="space-y-2 mb-8">
                      {story.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <TrophySVG size={16} className="text-accent-600" />
                          </div>
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/zakazivanje"
                      className="btn-primary w-full text-center"
                    >
                      Započnite svoju priču uspeha
                    </Link>
                  </div>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}