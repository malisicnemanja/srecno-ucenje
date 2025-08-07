'use client'

import { useState } from 'react'
import { saveSanityDocument } from '@/lib/sanity-write'
import { motion } from 'framer-motion'
import { trackEvent } from '@/lib/analytics'
import CalendarPicker from './CalendarPicker'
import TimePicker from './TimePicker'
import { generateConsultationPDF, generateFilename } from '@/lib/pdf-generator'
import { DeviceDetection, FormUtils, TouchUtils } from '@/lib/mobile-utils'

interface BookingFormProps {
  preselectedType?: string
}

const consultationTypes = [
  { value: 'franchise_intro', label: 'Franšiza - Početne informacije', duration: '30 min' },
  { value: 'business_plan', label: 'Biznis plan konsultacije', duration: '60 min' },
  { value: 'location', label: 'Lokacija i prostor', duration: '45 min' },
  { value: 'marketing', label: 'Marketing strategija', duration: '45 min' },
  { value: 'financial', label: 'Finansijske konsultacije', duration: '60 min' },
  { value: 'other', label: 'Ostalo', duration: '30 min' },
]

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', 
  '14:00', '15:00', '16:00', '17:00'
]

export default function BookingForm({ preselectedType }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: preselectedType || '',
    preferredDate: '',
    preferredTime: '',
    city: '',
    experience: '',
    budget: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    
    // Add haptic feedback on mobile for better UX
    if (isMobile) {
      TouchUtils.addHapticFeedback('light')
    }
  }

  const calculateLeadScore = () => {
    let score = 50 // Base score
    
    // Budget score
    if (formData.budget === 'over_60k') score += 20
    else if (formData.budget === '40k_60k') score += 15
    else if (formData.budget === '20k_40k') score += 10
    
    // Experience score
    if (formData.experience === 'experienced') score += 15
    else if (formData.experience === 'intermediate') score += 10
    else if (formData.experience === 'beginner') score += 5
    
    // Consultation type score
    if (formData.consultationType === 'business_plan' || formData.consultationType === 'financial') {
      score += 10
    }
    
    return Math.min(score, 100)
  }

  // Mobile detection and form optimization
  useEffect(() => {
    setIsMobile(DeviceDetection.isMobile())
    // Optimize form inputs for mobile
    if (DeviceDetection.isMobile()) {
      FormUtils.optimizeInputs()
      FormUtils.preventInputZoom()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await saveSanityDocument('booking', {
        ...formData,
        leadScore: calculateLeadScore(),
      })

      // Track booking
      trackEvent({
        category: 'Booking',
        action: 'submit',
        label: formData.consultationType,
      })

      // Generate PDF confirmation
      try {
        const consultationType = consultationTypes.find(t => t.value === formData.consultationType)
        const pdfData = {
          ...formData,
          consultationTypeLabel: consultationType?.label || '',
          duration: consultationType?.duration || '',
          confirmationNumber: `SU-${Date.now().toString(36).toUpperCase()}`
        }

        // Generate PDF confirmation
        await generateConsultationPDF(pdfData, {
          autoDownload: true,
          filename: generateFilename('srecno-ucenje-potvrda-konsultacija')
        })
      } catch (pdfError) {
        console.error('Error generating PDF:', pdfError)
      }

      setIsSuccess(true)
    } catch (error) {
      console.error('Error saving booking:', error)
      alert('Greška pri slanju. Molimo pokušajte ponovo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
      if (isMobile) {
        TouchUtils.addHapticFeedback('medium')
        // Smooth scroll to top on mobile
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      if (isMobile) {
        TouchUtils.addHapticFeedback('light')
        // Smooth scroll to top on mobile
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.consultationType && formData.preferredDate && formData.preferredTime
      case 2:
        return formData.name && formData.email && formData.phone && formData.city
      case 3:
        return true // Optional fields
      default:
        return false
    }
  }


  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto"
      >
        <div className="w-16 h-16 bg-brand-grass rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Uspešno zakazano!</h3>
        <p className="text-gray-600 mb-6">
          Potvrda je automatski preuzeta. Dodatno ćemo vas kontaktirati sa detaljima.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Tip konsultacija:</span><br />
            {consultationTypes.find(t => t.value === formData.consultationType)?.label}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Željeni termin:</span><br />
            {new Date(formData.preferredDate).toLocaleDateString('sr-RS')} u {formData.preferredTime}h
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={3} aria-label={`Korak ${currentStep} od 3`}>
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200 ${
                  currentStep >= step
                    ? 'bg-brand-grass text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
                aria-current={currentStep === step ? 'step' : undefined}
                aria-label={`Korak ${step}${currentStep === step ? ' - trenutni korak' : currentStep > step ? ' - završen' : ' - sledeći'}`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`w-16 md:w-24 h-1 mx-2 transition-all duration-200 ${
                    currentStep > step ? 'bg-brand-grass' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Titles */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {currentStep === 1 && 'Izaberite tip konsultacija'}
          {currentStep === 2 && 'Vaši podaci'}
          {currentStep === 3 && 'Dodatne informacije'}
        </h2>
        <p className="text-gray-600">
          {currentStep === 1 && 'Odaberite temu i termin koji vam odgovara'}
          {currentStep === 2 && 'Kako možemo da vas kontaktiramo'}
          {currentStep === 3 && 'Pomozite nam da se bolje pripremimo (opciono)'}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Consultation Type & Time */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <div className="space-y-8">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Tip konsultacija
                </label>
                <div className="space-y-3">
                  {consultationTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`block p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        formData.consultationType === type.value
                          ? 'border-brand-grass bg-brand-grass bg-opacity-5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="consultationType"
                        value={type.value}
                        checked={formData.consultationType === type.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-900">{type.label}</p>
                          <p className="text-sm text-gray-600">Trajanje: {type.duration}</p>
                        </div>
                        {formData.consultationType === type.value && (
                          <svg className="w-6 h-6 text-brand-grass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    Željeni datum
                  </label>
                  <CalendarPicker
                    value={formData.preferredDate}
                    onChange={(date) => setFormData({ ...formData, preferredDate: date })}
                    minDate={new Date()}
                    maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 30 days from now
                    excludeWeekends={true}
                  />
                </div>

                {formData.preferredDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-lg font-semibold text-gray-900 mb-4">
                      Željeno vreme
                    </label>
                    <TimePicker
                      value={formData.preferredTime}
                      onChange={(time) => setFormData({ ...formData, preferredTime: time })}
                      selectedDate={formData.preferredDate}
                      bookedSlots={[]} // In a real app, this would come from the backend
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Personal Information */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-2">
                  Ime i prezime
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-grass focus:border-transparent transition-all duration-200 text-base"
                  style={{ fontSize: '16px' }} // Prevent zoom on iOS
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-2">
                    Email adresa
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    inputMode="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-grass focus:border-transparent transition-all duration-200 text-base"
                    style={{ fontSize: '16px' }} // Prevent zoom on iOS
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-grass focus:border-transparent transition-all duration-200 text-base"
                    style={{ fontSize: '16px' }} // Prevent zoom on iOS
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-2">
                  Grad
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="npr. Beograd"
                  autoComplete="address-level2"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-grass focus:border-transparent transition-all duration-200 text-base"
                  style={{ fontSize: '16px' }} // Prevent zoom on iOS
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Additional Information */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-2">
                    Poslovno iskustvo
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-grass focus:border-transparent transition-all duration-200 text-base appearance-none bg-white"
                    style={{ fontSize: '16px' }} // Prevent zoom on iOS
                  >
                    <option value="">Izaberite</option>
                    <option value="none">Bez iskustva</option>
                    <option value="beginner">Do 2 godine</option>
                    <option value="intermediate">2-5 godina</option>
                    <option value="experienced">Preko 5 godina</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-2">
                    Budžet za investiciju
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-grass focus:border-transparent transition-all duration-200 text-base appearance-none bg-white"
                    style={{ fontSize: '16px' }} // Prevent zoom on iOS
                  >
                    <option value="">Izaberite</option>
                    <option value="under_20k">Do 20.000 EUR</option>
                    <option value="20k_40k">20.000 - 40.000 EUR</option>
                    <option value="40k_60k">40.000 - 60.000 EUR</option>
                    <option value="over_60k">Preko 60.000 EUR</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-2">
                  Dodatne napomene
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={isMobile ? 3 : 4}
                  placeholder="Postavite pitanja ili nam recite više o vašim ciljevima..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-grass focus:border-transparent transition-all duration-200 text-base resize-none"
                  style={{ fontSize: '16px' }} // Prevent zoom on iOS
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Nazad</span>
            </button>
          )}
          
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid()}
              className={`ml-auto px-8 py-3 rounded-lg font-semibold transition-all duration-200 min-h-[44px] active:scale-95 ${
                isStepValid() 
                  ? 'bg-brand-grass text-white hover:bg-opacity-90' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Sledeće
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || !isStepValid()}
              className={`ml-auto px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                isSubmitting || !isStepValid()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-brand-grass text-white hover:bg-opacity-90'
              }`}
            >
              {isSubmitting ? 'Slanje...' : 'Zakaži konsultacije'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}