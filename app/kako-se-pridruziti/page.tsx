'use client'

import { motion } from 'framer-motion'
import { 
  PhoneIcon, CalendarIcon, UsersIcon, CheckIcon,
  StarIcon, AwardIcon, ClockIcon, TargetIcon,
  SparklesIcon, HeartIcon, BookIcon, BrainIcon
} from '@/components/icons'
import { HappyStudents, ReadingChild } from '@/components/illustrations/ChildIllustrations'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import { useSanityQuery } from '@/hooks/useSanity'
import { franchiseStepsQuery, programsQuery, faqsQuery } from '@/lib/sanity.queries'

// Move fallback data to top of component
const fallbackSteps = [
  {
    title: 'Kontaktirajte Nas',
    description: 'Pozovite nas ili popunite kontakt formu na našem sajtu',
    details: [
      'Telefonske konsultacije radnim danima 9-20h',
      'Online forma dostupna 24/7',
      'Odgovor u roku od 24h'
    ],
    icon: PhoneIcon,
    iconColor: 'primary'
  },
  {
    title: 'Besplatna Procena',
    description: 'Zakažite besplatnu procenu sposobnosti vašeg deteta',
    details: [
      'Testiranje traje 30-45 minuta',
      'Procena čitalačkih sposobnosti',
      'Analiza matematičkih veština'
    ],
    icon: CalendarIcon,
    iconColor: 'secondary'
  },
  {
    title: 'Upis u Grupu',
    description: 'Vaše dete se upisuje u odgovarajuću grupu prema uzrastu i nivou',
    details: [
      'Male grupe do 8 učenika',
      'Homogene grupe po nivou znanja',
      'Fleksibilni termini'
    ],
    icon: UsersIcon,
    iconColor: 'accent'
  },
  {
    title: 'Početak Programa',
    description: 'Započinjemo sa programom i praćenjem napretka',
    details: [
      'Redovno praćenje napretka',
      'Mesečni izveštaji roditeljima',
      'Sertifikat po završetku'
    ],
    icon: SparklesIcon,
    iconColor: 'warm'
  }
];

// Fallback programs data
const fallbackPrograms = [
  {
    icon: <BookIcon size={48} className="text-primary" />,
    title: 'Brzočitanje',
    description: 'Ovladajte veštinom brzog čitanja uz potpuno razumevanje',
    age: '7-16 godina',
    duration: '6 meseci',
    groupSize: '6-8 učenika'
  },
  {
    icon: <BrainIcon size={48} className="text-primary" />,
    title: 'Mentalna Aritmetika',
    description: 'Naučite da računate brže od kalkulatora',
    age: '5-14 godina',
    duration: '12 meseci',
    groupSize: '6-8 učenika'
  },
  {
    icon: <TargetIcon size={48} className="text-primary" />,
    title: 'Kombinovani Program',
    description: 'Najbolje iz oba programa za maksimalne rezultate',
    age: '7-14 godina',
    duration: '12 meseci',
    groupSize: '6-8 učenika'
  }
];

// Fallback FAQs data
const fallbackFaqs = [
  {
    question: 'Da li postoji probni period?',
    answer: 'Da, nudimo besplatan probni čas kako bi vaše dete moglo da se upozna sa našim metodama pre upisa.'
  },
  {
    question: 'Koliko traje jedan čas?',
    answer: 'Standardni čas traje 60 minuta za brzočitanje i 90 minuta za mentalnu aritmetiku.'
  },
  {
    question: 'Šta ako dete propušti čas?',
    answer: 'Propušteni časovi se mogu nadoknaditi u dogovoru sa instruktorom, u okviru tekućeg meseca.'
  },
  {
    question: 'Da li postoje popusti?',
    answer: 'Da, nudimo porodične popuste od 10% za drugo dete i 15% za treće dete iz iste porodice.'
  }
];

export default function KakoSePridruziti() {
  // Fetch franchise steps from Sanity
  const { data: franchiseData, isLoading } = useSanityQuery(franchiseStepsQuery)
  const { data: programsData } = useSanityQuery(programsQuery)
  const { data: faqsData } = useSanityQuery(faqsQuery)
  
  // Use Sanity data if available, otherwise use fallback
  const steps = franchiseData?.[0]?.steps || fallbackSteps
  const programs = programsData || fallbackPrograms
  const faqs = faqsData?.filter(faq => faq.category === 'franchise') || fallbackFaqs
  return (
    <main className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-100/80 via-secondary-100/60 to-accent-100/70 min-h-[90vh] flex items-center">
        {/* Floating animated elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating particles with vibrant colors */}
          <motion.div
            className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full opacity-60"
            animate={{ 
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 left-16 w-16 h-16 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full opacity-50"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full opacity-40"
            animate={{ 
              y: [0, -25, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-br from-warm-400 to-warm-500 rounded-full opacity-70"
            animate={{ 
              x: [0, 30, 0],
              y: [0, -15, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Additional smaller particles */}
          <motion.div
            className="absolute top-1/2 right-1/3 w-8 h-8 bg-primary-300 rounded-full opacity-60"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-2/3 left-1/3 w-6 h-6 bg-secondary-300 rounded-full opacity-50"
            animate={{ 
              y: [0, -20, 0],
              x: [0, 15, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container relative pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient-primary">Kako Se</span>{' '}
                <span className="text-gradient-rainbow">Pridružiti</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Jednostavan i transparentan proces prijave za naše programe brzočitanja i mentalne aritmetike
              </p>

              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center space-x-2">
                  <ClockIcon size={24} className="text-primary-500" />
                  <span className="text-sm text-gray-600">Brzo i efikasno</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HeartIcon size={24} className="text-warm-500" />
                  <span className="text-sm text-gray-600">Personalizovano</span>
                </div>
              </div>

              <SafeLink href="/zakazivanje" className="btn-primary">
                <CalendarIcon size={20} className="mr-2" />
                Započnite danas
              </SafeLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <HappyStudents className="w-full h-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-gradient-to-b from-white via-primary-50/30 to-secondary-50/20">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gradient-primary">5 jednostavnih</span> koraka
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Od prvog kontakta do početka transformacije vašeg deteta
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Učitavanje koraka...</p>
              </div>
            ) : (
            steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="relative mb-16 last:mb-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <motion.div 
                    className="absolute left-8 top-20 bottom-0 w-1 bg-gradient-to-b from-primary-300 to-primary-100"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index * 0.2) + 0.3, duration: 0.5 }}
                    style={{ transformOrigin: 'top' }}
                  />
                )}
                
                <div className="flex items-start">
                  {/* Step number */}
                  <motion.div 
                    className="flex-shrink-0 w-16 h-16 gradient-primary text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg z-10 relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {index + 1}
                  </motion.div>
                  
                  {/* Step content */}
                  <div className="ml-8 flex-grow">
                    <h3 className="text-3xl font-bold mb-4 text-gradient-primary">{step.title}</h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">{step.description}</p>
                    
                    {step.details && (
                      <motion.div 
                        className="bg-gradient-to-br from-white to-primary-50/50 rounded-xl p-6 mb-6 border border-primary-200 shadow-lg"
                        whileHover={{ y: -2, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      >
                        <div className="grid gap-3">
                          {step.details.map((detail, i) => (
                            <motion.div 
                              key={i} 
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: (index * 0.2) + (i * 0.1) }}
                            >
                              <CheckIcon className="text-primary-500 mr-3 mt-1 flex-shrink-0" size={18} />
                              <span className="text-gray-700">{detail}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    
                    {step.action && (
                      <SafeLink                         href={step.action.link || '/'}
                        className="btn-primary group"
                      >
                        {step.action.text}
                        <motion.span
                          className="ml-2 group-hover:translate-x-1 transition-transform"
                          whileHover={{ x: 5 }}
                        >
                          →
                        </motion.span>
                      </SafeLink>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
            )}
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-20 gradient-soft-secondary">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gradient-secondary">Dostupni</span> Programi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Izaberite program koji najbolje odgovara uzrastu i potrebama vašeg deteta
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {programs.map((program, index) => {
              const Icon = program.icon === 'book' ? BookIcon : 
                         program.icon === 'brain' ? BrainIcon : 
                         program.icon === 'target' ? TargetIcon : BookIcon;
              return (
              <motion.div 
                key={index} 
                className="card-interactive bg-white border border-secondary-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div 
                  className="text-5xl mb-6 text-center"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {program.icon && typeof program.icon !== 'string' ? program.icon : <Icon size={48} className="text-primary mx-auto" />}
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-center text-gradient-secondary">{program.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-center">{program.description}</p>
                
                <div className="space-y-3 bg-secondary-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <UsersIcon size={16} className="mr-2 text-secondary-500" />
                      Uzrast:
                    </span>
                    <span className="font-semibold text-secondary-600">{program.ageGroup || program.age}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <ClockIcon size={16} className="mr-2 text-secondary-500" />
                      Trajanje:
                    </span>
                    <span className="font-semibold text-secondary-600">{program.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <TargetIcon size={16} className="mr-2 text-secondary-500" />
                      Grupa:
                    </span>
                    <span className="font-semibold text-secondary-600">{program.groupSize}</span>
                  </div>
                </div>
              </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-accent-50/60 via-warm-50/40 to-primary-50/30 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-accent-200 to-accent-300 rounded-full opacity-30"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full opacity-40"
            animate={{ 
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="container relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gradient-accent">Cenovnik</span> i Paketi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transparentne cene sa najboljem odnosu cene i vrednosti
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className={`rounded-2xl shadow-soft p-8 relative ${
                  plan.featured
                    ? 'gradient-accent text-white transform scale-105 shadow-xl'
                    : 'bg-white border border-accent-200'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {plan.featured && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="bg-white text-accent-600 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      <StarIcon size={16} className="inline mr-1" />
                      Najpopularniji
                    </span>
                  </motion.div>
                )}
                
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6">
                  {plan.price}
                  <span className="text-lg font-normal opacity-80">/mesečno</span>
                </div>
                
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index * 0.1) + (i * 0.05) }}
                    >
                      <CheckIcon 
                        className={`mr-3 flex-shrink-0 ${plan.featured ? 'text-white' : 'text-accent-500'}`} 
                        size={18} 
                      />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                <SafeLink                   href="/zakazivanje"
                  className={`block text-center py-4 rounded-xl font-semibold transition ${
                    plan.featured
                      ? 'bg-white text-accent-600 hover:bg-gray-100'
                      : 'gradient-accent text-white hover:shadow-lg'
                  }`}
                >
                  Izaberite Paket
                </SafeLink>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 gradient-soft-warm">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gradient-warm">Često Postavljana</span> Pitanja
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Odgovori na najčešća pitanja o procesu prijavljivanja
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                className="card bg-white border border-warm-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <h3 className="text-xl font-bold mb-4 text-gradient-warm">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <SafeLink href="/faq" className="btn-warm">
              Pogledajte sva pitanja
            </SafeLink>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SparklesIcon size={48} className="mx-auto mb-6" />
            </motion.div>
            
            <h2 className="text-4xl font-bold mb-6">
              Spremni da Započnete Transformaciju?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Kontaktirajte nas danas i rezervišite mesto za vaše dete u našem programu
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SafeLink                 href="/zakazivanje"
                className="btn bg-white text-primary-600 hover:bg-gray-100 group"
              >
                <CalendarIcon size={20} className="mr-2" />
                Zakažite Konsultacije
              </SafeLink>
              <SafeLink                 href="tel:+381601234567"
                className="btn bg-primary-400 text-white hover:bg-primary-300"
              >
                <PhoneIcon size={20} className="mr-2" />
                Pozovite Nas
              </SafeLink>
            </div>
            
            <motion.div
              className="mt-12 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <ReadingChild className="w-full h-auto" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}


const pricingPlans = [
  {
    name: 'Osnovni',
    price: '8.000 RSD',
    features: [
      '4 časa mesečno',
      'Grupni časovi',
      'Osnovni materijali',
      'Mesečni izveštaji'
    ],
    featured: false
  },
  {
    name: 'Standardni',
    price: '12.000 RSD',
    features: [
      '8 časova mesečno',
      'Grupni časovi',
      'Svi materijali uključeni',
      'Nedeljni izveštaji',
      'Online podrška'
    ],
    featured: true
  },
  {
    name: 'Premium',
    price: '20.000 RSD',
    features: [
      '8 časova mesečno',
      'Kombinacija grupa/individual',
      'Premium materijali',
      'Personalizovan pristup',
      '24/7 online podrška',
      'Dodatni mentoring'
    ],
    featured: false
  }
];
