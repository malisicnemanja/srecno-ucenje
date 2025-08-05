'use client'

import { useState } from 'react'
import { saveSanityDocument } from '@/lib/sanity-write'
import { motion } from 'framer-motion'
import { trackEvent } from '@/lib/analytics'
import CalendarPicker from './CalendarPicker'
import TimePicker from './TimePicker'
import { generateConsultationPDF, generateFilename } from '@/lib/pdf-generator'

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
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
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
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
        className="bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Uspešno zakazano!</h3>
        <p className="text-gray-600 mb-6">
          Potvrda je automatski preuzeta. Dodatno ćemo vas kontaktirati sa detaljima.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 text-left">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Tip konsultacija:</span><br />
            {consultationTypes.find(t => t.value === formData.consultationType)?.label}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <span className="font-semibold">Željeni termin:</span><br />
            {new Date(formData.preferredDate).toLocaleDateString('sr-RS')} u {formData.preferredTime}h
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`w-full h-1 mx-2 ${
                    currentStep > step ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                  style={{ width: '100px' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Titles */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
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
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tip konsultacija
                </label>
                <div className="grid gap-3">
                  {consultationTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.consultationType === type.value
                          ? 'border-primary-500 bg-primary-50'
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
                      <div>
                        <p className="font-semibold text-gray-900">{type.label}</p>
                        <p className="text-sm text-gray-600">Trajanje: {type.duration}</p>
                      </div>
                      {formData.consultationType === type.value && (
                        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ime i prezime
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email adresa
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Grad
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="npr. Beograd"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Poslovno iskustvo
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Izaberite</option>
                    <option value="none">Bez iskustva</option>
                    <option value="beginner">Do 2 godine</option>
                    <option value="intermediate">2-5 godina</option>
                    <option value="experienced">Preko 5 godina</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Budžet za investiciju
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Dodatne napomene
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Postavite pitanja ili nam recite više o vašim ciljevima..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Nazad
            </button>
          )}
          
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid()}
              className="ml-auto px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sledeće
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || !isStepValid()}
              className="ml-auto px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Slanje...' : 'Zakaži konsultacije'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}