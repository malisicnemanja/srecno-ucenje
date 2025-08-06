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
        className="c-card u-text-center"
      >
        <div className="c-success-icon u-m-b-md">
          <svg className="c-success-icon__svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="u-h3 u-m-b-sm">Uspešno zakazano!</h3>
        <p className="u-text-secondary u-m-b-lg">
          Potvrda je automatski preuzeta. Dodatno ćemo vas kontaktirati sa detaljima.
        </p>
        <div className="c-info-box">
          <p className="u-text-sm u-text-secondary">
            <span className="u-text-bold">Tip konsultacija:</span><br />
            {consultationTypes.find(t => t.value === formData.consultationType)?.label}
          </p>
          <p className="u-text-sm u-text-secondary u-m-t-sm">
            <span className="u-text-bold">Željeni termin:</span><br />
            {new Date(formData.preferredDate).toLocaleDateString('sr-RS')} u {formData.preferredTime}h
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="c-card">
      <div className="mb-8">
        {/* Progress Steps */}
        <div className="o-flex-between mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="o-cluster">
              <div
                className={`c-step-indicator ${
                  currentStep >= step
                    ? 'c-step-indicator--active'
                    : 'c-step-indicator--inactive'
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`c-step-connector ${
                    currentStep > step ? 'c-step-connector--active' : 'c-step-connector--inactive'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Titles */}
        <h2 className="u-h2 u-m-b-sm">
          {currentStep === 1 && 'Izaberite tip konsultacija'}
          {currentStep === 2 && 'Vaši podaci'}
          {currentStep === 3 && 'Dodatne informacije'}
        </h2>
        <p className="u-text-secondary">
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
            <div className="o-stack o-stack--lg">
              <div>
                <label className="u-label u-m-b-sm">
                  Tip konsultacija
                </label>
                <div className="o-stack">
                  {consultationTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`c-option-card ${
                        formData.consultationType === type.value
                          ? 'c-option-card--selected'
                          : 'c-option-card--default'
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
                        <p className="u-text-bold">{type.label}</p>
                        <p className="u-text-sm u-text-secondary">Trajanje: {type.duration}</p>
                      </div>
                      {formData.consultationType === type.value && (
                        <svg className="c-check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div className="o-stack o-stack--lg">
                <div>
                  <label className="u-label u-m-b-sm">
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
                    <label className="u-label u-m-b-sm">
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
            <div className="o-stack o-stack--lg">
              <div>
                <label className="u-label u-m-b-sm">
                  Ime i prezime
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-modern"
                />
              </div>

              <div className="o-grid o-grid--2 o-grid--gap-lg">
                <div>
                  <label className="u-label u-m-b-sm">
                    Email adresa
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-modern"
                  />
                </div>

                <div>
                  <label className="u-label u-m-b-sm">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-modern"
                  />
                </div>
              </div>

              <div>
                <label className="u-label u-m-b-sm">
                  Grad
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="npr. Beograd"
                  className="input-modern"
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
            <div className="o-stack o-stack--lg">
              <div className="o-grid o-grid--2 o-grid--gap-lg">
                <div>
                  <label className="u-label u-m-b-sm">
                    Poslovno iskustvo
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="input-modern"
                  >
                    <option value="">Izaberite</option>
                    <option value="none">Bez iskustva</option>
                    <option value="beginner">Do 2 godine</option>
                    <option value="intermediate">2-5 godina</option>
                    <option value="experienced">Preko 5 godina</option>
                  </select>
                </div>

                <div>
                  <label className="u-label u-m-b-sm">
                    Budžet za investiciju
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="input-modern"
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
                <label className="u-label u-m-b-sm">
                  Dodatne napomene
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Postavite pitanja ili nam recite više o vašim ciljevima..."
                  className="input-modern"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="o-flex-between u-m-t-lg">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="btn btn-card btn-card-arrow"
            >
              Nazad
            </button>
          )}
          
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid()}
              className="btn btn-form btn-form-send ml-auto"
            >
              Sledeće
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || !isStepValid()}
              className={`btn ${isSubmitting ? 'btn-loading' : 'btn-form btn-form-send'} u-ml-auto`}
            >
              {isSubmitting ? 'Slanje...' : 'Zakaži konsultacije'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}