'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { z } from 'zod'
import { 
  PhoneIcon, 
  EmailIcon, 
  LocationIcon, 
  ClockIcon,
  ChatIcon,
  VideoIcon,
  CheckIcon,
  InfoIcon
} from '@/components/ui/Icons'
import LoadingButton from '@/components/ui/LoadingButton'
import { ToastProvider } from '@/components/ui/Toast'

// Contact form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Ime mora imati najmanje 2 karaktera').max(50, 'Ime može imati maksimalno 50 karaktera'),
  email: z.string().email('Neispravna email adresa').min(1, 'Email je obavezan'),
  phone: z.string().regex(/^(\+381|0)6[0-9]{7,8}$/, 'Neispravni format telefona (npr. 064123456)').optional().or(z.literal('')),
  subject: z.string().min(5, 'Naslov mora imati najmanje 5 karaktera').max(100, 'Naslov može imati maksimalno 100 karaktera'),
  message: z.string().min(10, 'Poruka mora imati najmanje 10 karaktera').max(1000, 'Poruka može imati maksimalno 1000 karaktera'),
  agreement: z.boolean().refine(val => val === true, 'Morate prihvatiti uslove korišćenja')
})

type ContactFormData = z.infer<typeof contactFormSchema>

// Contact information data
const contactInfo = {
  phone: [
    { number: '+381 11 234 5678', label: 'Glavni broj' },
    { number: '+381 64 123 4567', label: 'Mobilni' },
  ],
  email: [
    { address: 'info@srecno-ucenje.rs', label: 'Opšte informacije' },
    { address: 'podrska@srecno-ucenje.rs', label: 'Tehnička podrška' },
    { address: 'fransiza@srecno-ucenje.rs', label: 'Franšiza' }
  ],
  address: {
    street: 'Knez Mihailova 42/5',
    city: '11000 Beograd',
    country: 'Srbija'
  },
  workingHours: [
    { days: 'Ponedeljak - Petak', hours: '08:00 - 18:00' },
    { days: 'Subota', hours: '09:00 - 15:00' },
    { days: 'Nedelja', hours: 'Zatvoreno' }
  ]
}

// FAQ data
const faqData = [
  {
    question: 'Kako mogu da zakažem konsultacije?',
    answer: 'Možete zakazati konsultacije putem kontakt forme, pozivom na naše brojevi telefona, ili slanjem email-a. Odgovorićemo u roku od 24 sata.'
  },
  {
    question: 'Da li nudite online konsultacije?',
    answer: 'Da, nudimo online konsultacije putem video poziva. Ova opcija je pogodna za roditelje koji ne mogu da dođu u naše prostorije.'
  },
  {
    question: 'Koliko traje proces prijave za franšizu?',
    answer: 'Proces prijave za franšizu obično traje 2-4 nedelje, zavisno od kompletnosti dokumentacije i brzine komunikacije.'
  },
  {
    question: 'Da li imate podršku tokom vikenda?',
    answer: 'Subotom imamo ograničenu podršku od 9:00 do 15:00. Za hitne slučajeve možete kontaktirati naš mobilni broj.'
  },
  {
    question: 'Kako mogu da dobijem više informacija o programima?',
    answer: 'Možete preuzeti naše brošure sa sajta, zakazati besplatnu konsultaciju, ili posjetiti naše centre u Beogradu i Novom Sadu.'
  }
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const KontaktPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    agreement: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  
  // Toast functionality
  const [toastMessage, setToastMessage] = useState<string>('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [showToast, setShowToast] = useState(false)
  
  const showSuccess = (message: string) => {
    setToastMessage(message)
    setToastType('success')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 5000)
  }
  
  const showError = (message: string) => {
    setToastMessage(message)
    setToastType('error')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 5000)
  }

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Validate form
  const validateForm = () => {
    try {
      contactFormSchema.parse(formData)
      setErrors({})
      return true
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        err.errors.forEach(error => {
          if (error.path[0]) {
            newErrors[error.path[0] as string] = error.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      showError('Molimo ispravite greške u formi')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Success
      setIsSubmitted(true)
      showSuccess('Vaša poruka je uspešno poslata! Kontaktiraćemo vas u najkraćem roku.')
      
      // Reset form after delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          agreement: false
        })
        setIsSubmitted(false)
      }, 3000)
      
    } catch (err) {
      showError('Dogodila se greška prilikom slanja poruke. Pokušajte ponovo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ToastProvider>
      <motion.div
        className="min-h-screen bg-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className="fixed top-4 right-4 z-50 max-w-sm w-full"
            >
              <div className={`p-4 rounded-lg shadow-lg border-l-4 ${
                toastType === 'success' 
                  ? 'bg-grass/10 border-grass text-grass' 
                  : 'bg-heart/10 border-heart text-heart'
              }`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {toastType === 'success' ? (
                      <CheckIcon size={20} className="text-grass" />
                    ) : (
                      <InfoIcon size={20} className="text-heart" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">
                      {toastMessage}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowToast(false)}
                    className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Zatvori</span>
                    ×
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      {/* Hero Section */}
      <motion.section 
        className="py-16 lg:py-24 bg-night"
        variants={itemVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-sky rounded-full mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChatIcon size={32} className="text-white" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Kontaktirajte nas
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Spremni smo da odgovorimo na sva vaša pitanja i pomognemo vam da napravite prave korake 
            prema uspešnom obrazovanju vašeg deteta.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Form & Info Section */}
      <motion.section 
        className="py-16 lg:py-24"
        variants={itemVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-2"
              variants={itemVariants}
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10 shadow-lg">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-night mb-4">
                    Pošaljite nam poruku
                  </h2>
                  <p className="text-gray-600">
                    Popunite formu ispod i odgovorićemo vam u najkraćem roku
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      onSubmit={handleSubmit} 
                      className="space-y-6"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Name Field */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-night mb-2">
                          Ime i prezime *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                            errors.name 
                              ? 'border-heart focus:border-heart' 
                              : 'border-gray-200 focus:border-sky'
                          }`}
                          placeholder="Unesite vaše ime i prezime"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-heart">{errors.name}</p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-night mb-2">
                          Email adresa *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                            errors.email 
                              ? 'border-heart focus:border-heart' 
                              : 'border-gray-200 focus:border-sky'
                          }`}
                          placeholder="vase@email.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-heart">{errors.email}</p>
                        )}
                      </div>

                      {/* Phone Field */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-night mb-2">
                          Broj telefona
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                            errors.phone 
                              ? 'border-heart focus:border-heart' 
                              : 'border-gray-200 focus:border-sky'
                          }`}
                          placeholder="064 123 4567"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-heart">{errors.phone}</p>
                        )}
                      </div>

                      {/* Subject Field */}
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-night mb-2">
                          Naslov *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                            errors.subject 
                              ? 'border-heart focus:border-heart' 
                              : 'border-gray-200 focus:border-sky'
                          }`}
                        >
                          <option value="">Izaberite temu</option>
                          <option value="Opšte informacije o programima">Opšte informacije o programima</option>
                          <option value="Zakazivanje konsultacija">Zakazivanje konsultacija</option>
                          <option value="Franšiza - informacije">Franšiza - informacije</option>
                          <option value="Tehnička podrška">Tehnička podrška</option>
                          <option value="Predlozi i pritužbe">Predlozi i pritužbe</option>
                          <option value="Ostalo">Ostalo</option>
                        </select>
                        {errors.subject && (
                          <p className="mt-1 text-sm text-heart">{errors.subject}</p>
                        )}
                      </div>

                      {/* Message Field */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-night mb-2">
                          Poruka *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors resize-none ${
                            errors.message 
                              ? 'border-heart focus:border-heart' 
                              : 'border-gray-200 focus:border-sky'
                          }`}
                          placeholder="Opišite detaljno vaše pitanje ili potrebu..."
                        />
                        <div className="flex justify-between items-center mt-1">
                          {errors.message && (
                            <p className="text-sm text-heart">{errors.message}</p>
                          )}
                          <p className="text-sm text-gray-500 ml-auto">
                            {formData.message.length}/1000
                          </p>
                        </div>
                      </div>

                      {/* Agreement Checkbox */}
                      <div>
                        <label className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="agreement"
                            checked={formData.agreement}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-sky border-2 border-gray-300 rounded focus:ring-sky focus:ring-2 mt-0.5"
                          />
                          <span className="text-sm text-gray-700 leading-relaxed">
                            Slažem se sa <a href="/pravila-privatnosti" className="text-sky hover:underline">pravilima privatnosti</a> i 
                            dozvoljavem korišćenje mojih podataka u svrhu kontaktiranja. *
                          </span>
                        </label>
                        {errors.agreement && (
                          <p className="mt-1 text-sm text-heart">{errors.agreement}</p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <LoadingButton
                        type="submit"
                        loading={isSubmitting}
                        loadingText="Šalje se..."
                        variant="primary"
                        size="lg"
                        fullWidth
                        className="bg-sky hover:bg-sky/90 border-sky hover:border-sky/90 text-white font-semibold py-4"
                      >
                        Pošaljite poruku
                      </LoadingButton>
                    </motion.form>
                  ) : (
                    <motion.div 
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 bg-grass rounded-full mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                      >
                        <CheckIcon size={24} className="text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-night mb-4">
                        Poruka je uspešno poslata!
                      </h3>
                      <p className="text-gray-600">
                        Hvala vam na kontaktu. Odgovorićemo vam u najkraćem roku.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div 
              className="space-y-6"
              variants={itemVariants}
            >
              {/* Phone Numbers */}
              <div className="bg-sky/5 border border-sky/20 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-sky rounded-lg flex items-center justify-center mr-3">
                    <PhoneIcon size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-night">Pozovite nas</h3>
                </div>
                <div className="space-y-3">
                  {contactInfo.phone.map((phone, index) => (
                    <div key={index}>
                      <a 
                        href={`tel:${phone.number.replace(/\s/g, '')}`}
                        className="block text-sky hover:text-sky/80 font-medium transition-colors"
                      >
                        {phone.number}
                      </a>
                      <p className="text-sm text-gray-600">{phone.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Addresses */}
              <div className="bg-sun/5 border border-sun/20 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-sun rounded-lg flex items-center justify-center mr-3">
                    <EmailIcon size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-night">Email</h3>
                </div>
                <div className="space-y-3">
                  {contactInfo.email.map((email, index) => (
                    <div key={index}>
                      <a 
                        href={`mailto:${email.address}`}
                        className="block text-sun hover:text-sun/80 font-medium transition-colors"
                      >
                        {email.address}
                      </a>
                      <p className="text-sm text-gray-600">{email.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="bg-grass/5 border border-grass/20 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-grass rounded-lg flex items-center justify-center mr-3">
                    <LocationIcon size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-night">Adresa</h3>
                </div>
                <div className="text-gray-700">
                  <p>{contactInfo.address.street}</p>
                  <p>{contactInfo.address.city}</p>
                  <p>{contactInfo.address.country}</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-night/5 border border-night/20 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-night rounded-lg flex items-center justify-center mr-3">
                    <ClockIcon size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-night">Radno vreme</h3>
                </div>
                <div className="space-y-2">
                  {contactInfo.workingHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{schedule.days}</span>
                      <span className="font-medium text-night">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact Options */}
              <div className="bg-heart/5 border border-heart/20 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-night mb-4">Brzi kontakt</h3>
                <div className="grid grid-cols-2 gap-3">
                  <motion.a
                    href="#"
                    className="flex items-center justify-center p-3 bg-white border border-gray-200 rounded-lg hover:bg-sky/5 hover:border-sky transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChatIcon size={20} className="text-sky mr-2" />
                    <span className="text-sm font-medium">Chat</span>
                  </motion.a>
                  <motion.a
                    href="#"
                    className="flex items-center justify-center p-3 bg-white border border-gray-200 rounded-lg hover:bg-grass/5 hover:border-grass transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <VideoIcon size={20} className="text-grass mr-2" />
                    <span className="text-sm font-medium">Video</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="py-16 lg:py-24 bg-gray-50"
        variants={itemVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-night mb-4">
              Često postavljana pitanja
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pronađite odgovore na najčešća pitanja naših korisnika
            </p>
          </motion.div>

          <motion.div 
            className="max-w-3xl mx-auto space-y-4"
            variants={containerVariants}
          >
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                variants={itemVariants}
              >
                <motion.button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                >
                  <span className="font-semibold text-night">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <InfoIcon size={20} className="text-gray-400" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200"
                    >
                      <div className="px-6 py-4">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      </motion.div>
    </ToastProvider>
  )
}

export default KontaktPage