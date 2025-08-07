'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Icons } from '@/components/ui/Icons'
import { saveSanityDocument } from '@/lib/sanity-write'
import { trackEvent } from '@/lib/analytics'

// Brand colors (solid only)
const brandColors = {
  sky: '#5DBFDB',
  sun: '#F4C950',
  grass: '#91C733',
  heart: '#E53935',
  night: '#1E293B'
}

// Consultation types
const consultationTypes = [
  { 
    id: 'initial',
    title: 'Početne konsultacije',
    description: 'Saznajte sve o našoj franšizi i mogućnostima',
    duration: '30 min',
    icon: Icons.Info,
    color: brandColors.sky
  },
  {
    id: 'business',
    title: 'Biznis plan i finansije',
    description: 'Detaljno o investicijama i očekivanim prihodima',
    duration: '60 min',
    icon: Icons.Graph,
    color: brandColors.grass
  },
  {
    id: 'location',
    title: 'Lokacija i prostor',
    description: 'Pomoć u odabiru idealne lokacije za vaš centar',
    duration: '45 min',
    icon: Icons.Location,
    color: brandColors.sun
  },
  {
    id: 'support',
    title: 'Operativna podrška',
    description: 'Marketing, obuke i kontinuirana podrška',
    duration: '45 min',
    icon: Icons.People,
    color: brandColors.heart
  }
]

// Time slots
const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', 
  '14:00', '15:00', '16:00', '17:00'
]

// Testimonials for trust signals
const testimonials = [
  {
    name: 'Marija Petković',
    location: 'Novi Sad',
    text: 'Konsultacije su mi pomogle da donesem ispravnu odluku. Sada imamo uspešan centar!',
    rating: 5
  },
  {
    name: 'Stefan Jovanović',
    location: 'Beograd',
    text: 'Profesionalan pristup i detaljne informacije. Preporučujem svima koji razmišljaju o franšizi.',
    rating: 5
  },
  {
    name: 'Ana Nikolić',
    location: 'Kragujevac',
    text: 'Odličan tim koji je uvek spreman da pomogne. Besplatne konsultacije su bile veoma korisne.',
    rating: 5
  }
]

// Main booking component
function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    consultationType: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.consultationType !== ''
      case 2: return formData.date !== '' && formData.time !== ''
      case 3: return formData.name && formData.email && formData.phone && formData.city
      case 4: return true
      default: return false
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const consultation = consultationTypes.find(t => t.id === formData.consultationType)
      await saveSanityDocument('booking', {
        ...formData,
        consultationTitle: consultation?.title || '',
        submittedAt: new Date().toISOString()
      })

      trackEvent({
        category: 'Booking',
        action: 'submit',
        label: formData.consultationType
      })

      setIsSuccess(true)
    } catch (error) {
      console.error('Booking error:', error)
      alert('Greška pri slanju zahteva. Molimo pokušajte ponovo.')
    }
    setIsSubmitting(false)
  }

  // Success state
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: brandColors.grass }}
          >
            <Icons.Check size={32} className="text-white" animate={false} />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Uspešno zakazano!
          </h2>
          <p className="text-gray-600 mb-6">
            Vaš zahtev je poslat. Kontaktiraćemo vas u najkraćem roku da potvrdimo termin.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Tip konsultacija:</span><br />
              {consultationTypes.find(t => t.id === formData.consultationType)?.title}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Željeni termin:</span><br />
              {formData.date} u {formData.time}h
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/'}
            className="mt-6 w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors"
            style={{ backgroundColor: brandColors.sky }}
          >
            Nazad na početnu
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center" style={{ backgroundColor: `${brandColors.sky}15` }}>
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full opacity-20"
              style={{ 
                backgroundColor: Object.values(brandColors)[i % 5],
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                rotate: 360
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8"
                style={{ backgroundColor: `${brandColors.grass}20`, color: brandColors.grass }}
              >
                <Icons.Check size={16} className="mr-2" animate={false} />
                100% besplatno i bez obaveza
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: brandColors.night }}>
                Zakažite besplatne<br />
                <span style={{ color: brandColors.sky }}>konsultacije</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Saznajte sve o mogućnostima franšize kroz personalizovane konsultacije sa našim ekspertima
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center gap-4 mb-10"
              >
                {[
                  { icon: Icons.Phone, text: "Online ili uživo", color: brandColors.sky },
                  { icon: Icons.Clock, text: "30-60 minuta", color: brandColors.sun },
                  { icon: Icons.Target, text: "Personalizovano", color: brandColors.grass },
                  { icon: Icons.Check, text: "Bez obaveza", color: brandColors.heart }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                    className="flex items-center bg-white px-4 py-3 rounded-full shadow-md border-l-4"
                    style={{ borderLeftColor: feature.color }}
                  >
                    <feature.icon size={20} className="mr-2" style={{ color: feature.color }} animate={false} />
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg px-8 py-4 rounded-xl font-semibold text-white shadow-lg transition-all"
                style={{ backgroundColor: brandColors.grass }}
              >
                Započni rezervaciju
                <Icons.ArrowRight size={20} className="ml-2 inline" animate={false} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Booking Form */}
      <section id="booking-form" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Indicator */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                        currentStep >= step ? 'text-white' : 'text-gray-400 bg-gray-200'
                      }`}
                      style={{
                        backgroundColor: currentStep >= step ? brandColors.grass : undefined
                      }}
                      animate={{
                        scale: currentStep === step ? [1, 1.1, 1] : 1
                      }}
                      transition={{ duration: 0.5, repeat: currentStep === step ? Infinity : 0 }}
                    >
                      {currentStep > step ? (
                        <Icons.Check size={16} animate={false} />
                      ) : step}
                    </motion.div>
                    {step < 4 && (
                      <div 
                        className={`w-12 h-1 transition-all duration-300 ${
                          currentStep > step ? 'opacity-100' : 'bg-gray-200 opacity-50'
                        }`}
                        style={{
                          backgroundColor: currentStep > step ? brandColors.grass : undefined
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <ServiceSelectionStep 
                    selectedType={formData.consultationType}
                    onSelect={(type) => handleInputChange('consultationType', type)}
                    onNext={nextStep}
                  />
                )}
                {currentStep === 2 && (
                  <DateTimeStep
                    date={formData.date}
                    time={formData.time}
                    onDateChange={(date) => handleInputChange('date', date)}
                    onTimeChange={(time) => handleInputChange('time', time)}
                    onNext={nextStep}
                    onBack={prevStep}
                  />
                )}
                {currentStep === 3 && (
                  <ContactInfoStep
                    formData={formData}
                    onChange={handleInputChange}
                    onNext={nextStep}
                    onBack={prevStep}
                  />
                )}
                {currentStep === 4 && (
                  <ConfirmationStep
                    formData={formData}
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                    onBack={prevStep}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Signals & Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: brandColors.night }}>
              Što kažu naši partneri?
            </h2>
            <p className="text-xl text-gray-600">Uspešne priče iz cele Srbije</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icons.Star 
                      key={i} 
                      size={20} 
                      className="text-yellow-400 fill-current" 
                      animate={false} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="text-sm text-gray-600">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p>{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="py-16" style={{ backgroundColor: `${brandColors.sky}10` }}>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6" style={{ color: brandColors.night }}>
              Više volite direktan kontakt?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Pozovite nas ili pošaljite email - tu smo da odgovorimo na sva vaša pitanja!
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <motion.a
                href="tel:+381111234567"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center bg-white rounded-xl p-6 shadow-lg text-left hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                     style={{ backgroundColor: `${brandColors.grass}20` }}>
                  <Icons.Phone size={24} style={{ color: brandColors.grass }} animate={false} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg" style={{ color: brandColors.night }}>Pozovite nas</h3>
                  <p className="text-gray-600">+381 11 123 4567</p>
                  <p className="text-sm text-gray-500">Radnim danima 9-17h</p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:info@srecno-ucenje.rs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center bg-white rounded-xl p-6 shadow-lg text-left hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                     style={{ backgroundColor: `${brandColors.sky}20` }}>
                  <Icons.Email size={24} style={{ color: brandColors.sky }} animate={false} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg" style={{ color: brandColors.night }}>Pošaljite email</h3>
                  <p className="text-gray-600">info@srecno-ucenje.rs</p>
                  <p className="text-sm text-gray-500">Odgovorimo za 24h</p>
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Step Components
function ServiceSelectionStep({ selectedType, onSelect, onNext }: {
  selectedType: string
  onSelect: (type: string) => void
  onNext: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4" style={{ color: brandColors.night }}>
          Odaberite tip konsultacija
        </h2>
        <p className="text-gray-600 text-lg">
          Izaberite temu koja vas najviše zanima
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {consultationTypes.map((type) => {
          const IconComponent = type.icon
          const isSelected = selectedType === type.id
          
          return (
            <motion.button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={`p-6 rounded-xl text-left transition-all duration-300 border-2 ${
                isSelected 
                  ? 'border-current shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              style={{
                borderColor: isSelected ? type.color : undefined,
                backgroundColor: isSelected ? `${type.color}08` : 'white'
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start space-x-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${type.color}20` }}
                >
                  <IconComponent size={24} style={{ color: type.color }} animate={false} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2" style={{ color: brandColors.night }}>
                    {type.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{type.description}</p>
                  <div className="flex items-center text-sm" style={{ color: type.color }}>
                    <Icons.Clock size={16} className="mr-1" animate={false} />
                    {type.duration}
                  </div>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: type.color }}
                  >
                    <Icons.Check size={16} className="text-white" animate={false} />
                  </motion.div>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>

      <div className="flex justify-end pt-6">
        <motion.button
          onClick={onNext}
          disabled={!selectedType}
          className={`px-8 py-3 rounded-xl font-semibold transition-all ${
            selectedType 
              ? 'text-white shadow-lg hover:shadow-xl' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          style={{
            backgroundColor: selectedType ? brandColors.grass : undefined
          }}
          whileHover={selectedType ? { scale: 1.05 } : {}}
          whileTap={selectedType ? { scale: 0.95 } : {}}
        >
          Sledeći korak
          <Icons.ArrowRight size={20} className="ml-2 inline" animate={false} />
        </motion.button>
      </div>
    </motion.div>
  )
}

function DateTimeStep({ date, time, onDateChange, onTimeChange, onNext, onBack }: {
  date: string
  time: string  
  onDateChange: (date: string) => void
  onTimeChange: (time: string) => void
  onNext: () => void
  onBack: () => void
}) {
  // Generate next 30 days (excluding weekends)
  const availableDates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    return date
  }).filter(date => date.getDay() !== 0 && date.getDay() !== 6) // Exclude Sundays and Saturdays

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4" style={{ color: brandColors.night }}>
          Odaberite datum i vreme
        </h2>
        <p className="text-gray-600 text-lg">
          Izaberite termin koji vam najbolje odgovara
        </p>
      </div>

      {/* Date Selection */}
      <div>
        <h3 className="text-xl font-semibold mb-4" style={{ color: brandColors.night }}>
          Datum konsultacija
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {availableDates.slice(0, 15).map((availableDate) => {
            const dateStr = availableDate.toISOString().split('T')[0]
            const isSelected = date === dateStr
            
            return (
              <motion.button
                key={dateStr}
                onClick={() => onDateChange(dateStr)}
                className={`p-3 rounded-lg text-center transition-all ${
                  isSelected 
                    ? 'text-white shadow-lg' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
                style={{
                  backgroundColor: isSelected ? brandColors.sky : undefined
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-xs font-medium">
                  {availableDate.toLocaleDateString('sr-RS', { weekday: 'short' })}
                </div>
                <div className="text-sm font-bold">
                  {availableDate.getDate()}.{availableDate.getMonth() + 1}.
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Time Selection */}
      {date && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-semibold mb-4" style={{ color: brandColors.night }}>
            Vreme konsultacija
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {timeSlots.map((slot) => {
              const isSelected = time === slot
              
              return (
                <motion.button
                  key={slot}
                  onClick={() => onTimeChange(slot)}
                  className={`p-3 rounded-lg font-semibold transition-all ${
                    isSelected 
                      ? 'text-white shadow-lg' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                  style={{
                    backgroundColor: isSelected ? brandColors.sun : undefined
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {slot}h
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      )}

      <div className="flex justify-between items-center pt-6">
        <motion.button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          whileHover={{ x: -2 }}
        >
          <Icons.ArrowRight size={20} className="mr-2 rotate-180" animate={false} />
          Nazad
        </motion.button>

        <motion.button
          onClick={onNext}
          disabled={!date || !time}
          className={`px-8 py-3 rounded-xl font-semibold transition-all ${
            date && time 
              ? 'text-white shadow-lg hover:shadow-xl' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          style={{
            backgroundColor: date && time ? brandColors.grass : undefined
          }}
          whileHover={date && time ? { scale: 1.05 } : {}}
          whileTap={date && time ? { scale: 0.95 } : {}}
        >
          Sledeći korak
          <Icons.ArrowRight size={20} className="ml-2 inline" animate={false} />
        </motion.button>
      </div>
    </motion.div>
  )
}

function ContactInfoStep({ formData, onChange, onNext, onBack }: {
  formData: any
  onChange: (field: string, value: string) => void
  onNext: () => void
  onBack: () => void
}) {
  const isValid = formData.name && formData.email && formData.phone && formData.city
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4" style={{ color: brandColors.night }}>
          Vaši kontakt podaci
        </h2>
        <p className="text-gray-600 text-lg">
          Kako možemo da vas kontaktiramo?
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: brandColors.night }}>
            Ime i prezime *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
            style={{ '--tw-ring-color': brandColors.sky } as any}
            placeholder="Vaše ime i prezime"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: brandColors.night }}>
              Email adresa *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
              style={{ '--tw-ring-color': brandColors.sky } as any}
              placeholder="vas@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: brandColors.night }}>
              Telefon *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
              style={{ '--tw-ring-color': brandColors.sky } as any}
              placeholder="063 123 4567"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: brandColors.night }}>
            Grad *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => onChange('city', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
            style={{ '--tw-ring-color': brandColors.sky } as any}
            placeholder="Beograd"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: brandColors.night }}>
            Dodatne napomene (opciono)
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => onChange('message', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
            style={{ '--tw-ring-color': brandColors.sky } as any}
            placeholder="Postavite pitanja ili nam recite više o vašim ciljevima..."
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-6">
        <motion.button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          whileHover={{ x: -2 }}
        >
          <Icons.ArrowRight size={20} className="mr-2 rotate-180" animate={false} />
          Nazad
        </motion.button>

        <motion.button
          onClick={onNext}
          disabled={!isValid}
          className={`px-8 py-3 rounded-xl font-semibold transition-all ${
            isValid 
              ? 'text-white shadow-lg hover:shadow-xl' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          style={{
            backgroundColor: isValid ? brandColors.grass : undefined
          }}
          whileHover={isValid ? { scale: 1.05 } : {}}
          whileTap={isValid ? { scale: 0.95 } : {}}
        >
          Pregled i potvrda
          <Icons.ArrowRight size={20} className="ml-2 inline" animate={false} />
        </motion.button>
      </div>
    </motion.div>
  )
}

function ConfirmationStep({ formData, isSubmitting, onSubmit, onBack }: {
  formData: any
  isSubmitting: boolean
  onSubmit: () => void
  onBack: () => void
}) {
  const selectedConsultation = consultationTypes.find(t => t.id === formData.consultationType)
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4" style={{ color: brandColors.night }}>
          Potvrdite rezervaciju
        </h2>
        <p className="text-gray-600 text-lg">
          Proverite podatke pre slanja zahteva
        </p>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <div>
          <h3 className="font-semibold mb-2" style={{ color: brandColors.night }}>
            Tip konsultacija
          </h3>
          <div className="flex items-center space-x-3">
            {selectedConsultation && (
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${selectedConsultation.color}20` }}
              >
                <selectedConsultation.icon size={16} style={{ color: selectedConsultation.color }} animate={false} />
              </div>
            )}
            <div>
              <p className="font-medium">{selectedConsultation?.title}</p>
              <p className="text-sm text-gray-600">{selectedConsultation?.duration}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2" style={{ color: brandColors.night }}>
            Željeni termin
          </h3>
          <p className="text-gray-700">
            {new Date(formData.date).toLocaleDateString('sr-RS', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} u {formData.time}h
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2" style={{ color: brandColors.night }}>
            Kontakt podaci
          </h3>
          <div className="space-y-1 text-gray-700">
            <p>{formData.name}</p>
            <p>{formData.email}</p>
            <p>{formData.phone}</p>
            <p>{formData.city}</p>
          </div>
        </div>

        {formData.message && (
          <div>
            <h3 className="font-semibold mb-2" style={{ color: brandColors.night }}>
              Napomene
            </h3>
            <p className="text-gray-700">{formData.message}</p>
          </div>
        )}
      </div>

      {/* Important Notice */}
      <div className="border rounded-xl p-4" style={{ borderColor: `${brandColors.grass}40`, backgroundColor: `${brandColors.grass}08` }}>
        <div className="flex items-start space-x-3">
          <Icons.Info size={20} style={{ color: brandColors.grass }} className="mt-0.5 flex-shrink-0" animate={false} />
          <div>
            <h4 className="font-semibold mb-1" style={{ color: brandColors.grass }}>
              Sledeći koraci
            </h4>
            <p className="text-sm text-gray-700">
              Kontaktiraćemo vas u roku od 24 sata da potvrdimo termin i pošaljemo link za online konsultacije ili adresu za uživo sastanak.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6">
        <motion.button
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
          whileHover={!isSubmitting ? { x: -2 } : {}}
        >
          <Icons.ArrowRight size={20} className="mr-2 rotate-180" animate={false} />
          Nazad
        </motion.button>

        <motion.button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-8 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          style={{ backgroundColor: brandColors.grass }}
          whileHover={!isSubmitting ? { scale: 1.05 } : {}}
          whileTap={!isSubmitting ? { scale: 0.95 } : {}}
        >
          {isSubmitting ? 'Šalje se...' : 'Pošalji zahtev'}
          {!isSubmitting && <Icons.Check size={20} className="ml-2 inline" animate={false} />}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default BookingPage