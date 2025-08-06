'use client'

import { useState, useEffect } from 'react'
import styles from './prijava.module.css'

// Form sections configuration
const formSections = [
  {
    id: 'personal',
    title: 'Lični podaci',
    subtitle: 'Hajde da se upoznamo',
    icon: '👤',
    fields: [
      {
        id: 'fullName',
        label: 'Ime i prezime',
        type: 'text',
        placeholder: 'Unesite vaše puno ime',
        required: true,
        validation: (value: string) => value.length >= 3 ? '' : 'Ime mora imati najmanje 3 karaktera'
      },
      {
        id: 'email',
        label: 'Email adresa',
        type: 'email',
        placeholder: 'vasa.email@domen.com',
        required: true,
        validation: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Unesite validnu email adresu'
      },
      {
        id: 'phone',
        label: 'Broj telefona',
        type: 'tel',
        placeholder: '+381 XX XXX XXXX',
        required: true,
        validation: (value: string) => value.length >= 9 ? '' : 'Unesite validan broj telefona'
      },
      {
        id: 'city',
        label: 'Grad',
        type: 'text',
        placeholder: 'Grad u kom živite',
        required: true,
        validation: (value: string) => value.length >= 2 ? '' : 'Unesite naziv grada'
      }
    ]
  },
  {
    id: 'franchise-location',
    title: 'Lokacija franšize',
    subtitle: 'Gde želite da otvorite franšizu?',
    icon: '📍',
    fields: [
      {
        id: 'desiredLocation',
        label: 'Željena lokacija franšize',
        type: 'text',
        placeholder: 'Grad ili opština',
        required: true,
        validation: (value: string) => value.length >= 2 ? '' : 'Unesite lokaciju'
      },
      {
        id: 'hasSpace',
        label: 'Da li imate prostor?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Da, imam prostor' },
          { value: 'no', label: 'Ne, tražim prostor' },
          { value: 'considering', label: 'Razmatram opcije' }
        ],
        required: true
      },
      {
        id: 'spaceSize',
        label: 'Veličina prostora (m²)',
        type: 'number',
        placeholder: 'npr. 50',
        required: false,
        showIf: (formData: any) => formData.hasSpace === 'yes'
      },
      {
        id: 'targetAudience',
        label: 'Ciljna grupa',
        type: 'checkbox',
        options: [
          { value: 'preschool', label: 'Predškolci (4-6 godina)' },
          { value: 'elementary', label: 'Osnovci (7-14 godina)' },
          { value: 'highschool', label: 'Srednjoškolci (15-18 godina)' },
          { value: 'adults', label: 'Odrasli (18+ godina)' }
        ],
        required: true
      }
    ]
  },
  {
    id: 'experience',
    title: 'Iskustvo i kvalifikacije',
    subtitle: 'Recite nam više o sebi',
    icon: '🎓',
    fields: [
      {
        id: 'education',
        label: 'Nivo obrazovanja',
        type: 'select',
        options: [
          { value: 'highschool', label: 'Srednja škola' },
          { value: 'bachelor', label: 'Osnovne studije' },
          { value: 'master', label: 'Master studije' },
          { value: 'phd', label: 'Doktorske studije' }
        ],
        required: true
      },
      {
        id: 'workExperience',
        label: 'Da li imate iskustvo u radu sa decom?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Da' },
          { value: 'no', label: 'Ne' }
        ],
        required: true
      },
      {
        id: 'experienceDetails',
        label: 'Opišite vaše iskustvo',
        type: 'textarea',
        placeholder: 'Recite nam više o vašem iskustvu u radu sa decom...',
        required: false,
        showIf: (formData: any) => formData.workExperience === 'yes',
        rows: 4
      },
      {
        id: 'businessExperience',
        label: 'Da li imate preduzetničko iskustvo?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Da, vodim/vodio sam biznis' },
          { value: 'no', label: 'Ne, ovo bi bio moj prvi biznis' }
        ],
        required: true
      }
    ]
  },
  {
    id: 'motivation',
    title: 'Motivacija',
    subtitle: 'Zašto baš Srećno učenje?',
    icon: '💡',
    fields: [
      {
        id: 'whyFranchise',
        label: 'Zašto želite da otvorite franšizu Srećno učenje?',
        type: 'textarea',
        placeholder: 'Opišite vašu motivaciju i razloge...',
        required: true,
        rows: 5,
        validation: (value: string) => value.length >= 50 ? '' : 'Molimo vas da detaljnije opišete vašu motivaciju (min. 50 karaktera)'
      },
      {
        id: 'expectations',
        label: 'Šta očekujete od saradnje?',
        type: 'textarea',
        placeholder: 'Vaša očekivanja od franšize...',
        required: true,
        rows: 4,
        validation: (value: string) => value.length >= 30 ? '' : 'Molimo opišite vaša očekivanja (min. 30 karaktera)'
      },
      {
        id: 'investment',
        label: 'Planirana investicija',
        type: 'select',
        options: [
          { value: '2000-3000', label: '2.000 - 3.000 EUR' },
          { value: '3000-5000', label: '3.000 - 5.000 EUR' },
          { value: '5000-10000', label: '5.000 - 10.000 EUR' },
          { value: '10000+', label: 'Više od 10.000 EUR' }
        ],
        required: true
      },
      {
        id: 'startTime',
        label: 'Kada planirate da počnete?',
        type: 'select',
        options: [
          { value: 'immediately', label: 'Odmah' },
          { value: '1-3months', label: 'Za 1-3 meseca' },
          { value: '3-6months', label: 'Za 3-6 meseci' },
          { value: '6months+', label: 'Za više od 6 meseci' }
        ],
        required: true
      }
    ]
  },
  {
    id: 'additional',
    title: 'Dodatne informacije',
    subtitle: 'Još malo o vama',
    icon: '📝',
    fields: [
      {
        id: 'howDidYouHear',
        label: 'Kako ste saznali za nas?',
        type: 'select',
        options: [
          { value: 'google', label: 'Google pretraga' },
          { value: 'facebook', label: 'Facebook' },
          { value: 'instagram', label: 'Instagram' },
          { value: 'friend', label: 'Preporuka prijatelja' },
          { value: 'other', label: 'Drugo' }
        ],
        required: true
      },
      {
        id: 'additionalNotes',
        label: 'Dodatne napomene',
        type: 'textarea',
        placeholder: 'Ako imate dodatnih pitanja ili napomena...',
        required: false,
        rows: 4
      },
      {
        id: 'newsletter',
        label: 'Želim da primam newsletter',
        type: 'checkbox',
        options: [
          { value: 'yes', label: 'Da, želim da budem obavešten o novostima' }
        ],
        required: false
      },
      {
        id: 'terms',
        label: 'Uslovi korišćenja',
        type: 'checkbox',
        options: [
          { value: 'accept', label: 'Prihvatam uslove korišćenja i politiku privatnosti' }
        ],
        required: true,
        validation: (value: string[]) => value?.includes('accept') ? '' : 'Morate prihvatiti uslove korišćenja'
      }
    ]
  }
]

export default function FranchiseApplicationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<any>({})
  const [errors, setErrors] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())

  // Calculate progress
  const progress = ((currentStep + 1) / formSections.length) * 100

  // Validate single field
  const validateField = (fieldId: string, value: any, field: any) => {
    if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
      return 'Ovo polje je obavezno'
    }
    if (field.validation) {
      return field.validation(value)
    }
    return ''
  }

  // Validate current section
  const validateSection = () => {
    const section = formSections[currentStep]
    const newErrors: any = {}
    let isValid = true

    section.fields.forEach((field: any) => {
      // Skip fields that shouldn't be shown
      if (field.showIf && !field.showIf(formData)) {
        return
      }

      const error = validateField(field.id, formData[field.id], field)
      if (error) {
        newErrors[field.id] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  // Handle field change
  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [fieldId]: value }))
    
    // Clear error for this field if it exists
    if (errors[fieldId]) {
      setErrors((prev: any) => {
        const newErrors = { ...prev }
        delete newErrors[fieldId]
        return newErrors
      })
    }
  }

  // Handle field blur
  const handleFieldBlur = (fieldId: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldId))
    
    // Validate this field
    const field = formSections[currentStep].fields.find((f: any) => f.id === fieldId)
    if (field) {
      const error = validateField(fieldId, formData[fieldId], field)
      if (error) {
        setErrors((prev: any) => ({ ...prev, [fieldId]: error }))
      }
    }
  }

  // Handle next step
  const handleNext = () => {
    if (validateSection()) {
      if (currentStep < formSections.length - 1) {
        setCurrentStep(prev => prev + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        handleSubmit()
      }
    } else {
      // Mark all fields as touched to show errors
      const section = formSections[currentStep]
      section.fields.forEach((field: any) => {
        setTouchedFields(prev => new Set(prev).add(field.id))
      })
    }
  }

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would normally send data to your API
      console.log('Form submitted:', formData)
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Greška pri slanju prijave. Molimo pokušajte ponovo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render field based on type
  const renderField = (field: any) => {
    // Check if field should be shown
    if (field.showIf && !field.showIf(formData)) {
      return null
    }

    const fieldError = touchedFields.has(field.id) && errors[field.id]

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
        return (
          <div key={field.id} className={styles.fieldGroup}>
            <label htmlFor={field.id} className={styles.label}>
              {field.label}
              {field.required && <span className={styles.required}>*</span>}
            </label>
            <input
              id={field.id}
              type={field.type}
              value={formData[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              onBlur={() => handleFieldBlur(field.id)}
              placeholder={field.placeholder}
              className={`${styles.input} ${fieldError ? styles.inputError : ''}`}
            />
            {fieldError && <span className={styles.error}>{errors[field.id]}</span>}
          </div>
        )

      case 'textarea':
        return (
          <div key={field.id} className={styles.fieldGroup}>
            <label htmlFor={field.id} className={styles.label}>
              {field.label}
              {field.required && <span className={styles.required}>*</span>}
            </label>
            <textarea
              id={field.id}
              value={formData[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              onBlur={() => handleFieldBlur(field.id)}
              placeholder={field.placeholder}
              rows={field.rows || 3}
              className={`${styles.textarea} ${fieldError ? styles.inputError : ''}`}
            />
            {fieldError && <span className={styles.error}>{errors[field.id]}</span>}
          </div>
        )

      case 'select':
        return (
          <div key={field.id} className={styles.fieldGroup}>
            <label htmlFor={field.id} className={styles.label}>
              {field.label}
              {field.required && <span className={styles.required}>*</span>}
            </label>
            <select
              id={field.id}
              value={formData[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              onBlur={() => handleFieldBlur(field.id)}
              className={`${styles.select} ${fieldError ? styles.inputError : ''}`}
            >
              <option value="">Izaberite opciju</option>
              {field.options.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {fieldError && <span className={styles.error}>{errors[field.id]}</span>}
          </div>
        )

      case 'radio':
        return (
          <div key={field.id} className={styles.fieldGroup}>
            <label className={styles.label}>
              {field.label}
              {field.required && <span className={styles.required}>*</span>}
            </label>
            <div className={styles.radioGroup}>
              {field.options.map((option: any) => (
                <label key={option.value} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name={field.id}
                    value={option.value}
                    checked={formData[field.id] === option.value}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    className={styles.radio}
                  />
                  <span className={styles.radioText}>{option.label}</span>
                </label>
              ))}
            </div>
            {fieldError && <span className={styles.error}>{errors[field.id]}</span>}
          </div>
        )

      case 'checkbox':
        return (
          <div key={field.id} className={styles.fieldGroup}>
            <label className={styles.label}>
              {field.label}
              {field.required && <span className={styles.required}>*</span>}
            </label>
            <div className={styles.checkboxGroup}>
              {field.options.map((option: any) => (
                <label key={option.value} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={(formData[field.id] || []).includes(option.value)}
                    onChange={(e) => {
                      const currentValues = formData[field.id] || []
                      const newValues = e.target.checked
                        ? [...currentValues, option.value]
                        : currentValues.filter((v: string) => v !== option.value)
                      handleFieldChange(field.id, newValues)
                    }}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkboxText}>{option.label}</span>
                </label>
              ))}
            </div>
            {fieldError && <span className={styles.error}>{errors[field.id]}</span>}
          </div>
        )

      default:
        return null
    }
  }

  // Success screen
  if (isSubmitted) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successContent}>
          <div className={styles.successIcon}>✅</div>
          <h1 className={styles.successTitle}>Uspešno ste poslali prijavu!</h1>
          <p className={styles.successMessage}>
            Hvala vam na interesovanju za Srećno učenje franšizu.
            Kontaktiraćemo vas u roku od 48 sati sa detaljnim informacijama.
          </p>
          <div className={styles.nextSteps}>
            <h3>Šta dalje?</h3>
            <ul>
              <li>📧 Proverićemo vašu prijavu</li>
              <li>📞 Zakazaćemo uvodni razgovor</li>
              <li>📋 Poslati ćemo vam detaljne informacije o franšizi</li>
              <li>🤝 Organizovati ćemo sastanak sa lokalnim franšizama</li>
            </ul>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className={styles.homeButton}
          >
            Vrati se na početnu
          </button>
        </div>
      </div>
    )
  }

  const currentSection = formSections[currentStep]

  return (
    <main className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Prijava za franšizu Srećno učenje</h1>
        <p className={styles.subtitle}>
          Pridružite se mreži od preko 450 edukatora širom Srbije
        </p>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={styles.progressSteps}>
          {formSections.map((section, index) => (
            <div 
              key={section.id}
              className={`${styles.progressStep} ${
                index < currentStep ? styles.stepCompleted : ''
              } ${index === currentStep ? styles.stepActive : ''}`}
            >
              <div className={styles.stepIcon}>
                {index < currentStep ? '✓' : section.icon}
              </div>
              <span className={styles.stepLabel}>{section.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className={styles.formContainer}>
        <div className={styles.formCard}>
          {/* Section Header */}
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>{currentSection.icon}</div>
            <div>
              <h2 className={styles.sectionTitle}>{currentSection.title}</h2>
              <p className={styles.sectionSubtitle}>{currentSection.subtitle}</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className={styles.formFields}>
            {currentSection.fields.map(renderField)}
          </div>

          {/* Navigation Buttons */}
          <div className={styles.navigation}>
            {currentStep > 0 && (
              <button 
                onClick={handlePrevious}
                className={styles.prevButton}
                disabled={isSubmitting}
              >
                ← Nazad
              </button>
            )}
            <button 
              onClick={handleNext}
              className={styles.nextButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className={styles.loading}>Slanje...</span>
              ) : currentStep === formSections.length - 1 ? (
                'Pošalji prijavu'
              ) : (
                'Sledeće →'
              )}
            </button>
          </div>

          {/* Step Indicator */}
          <div className={styles.stepIndicator}>
            Korak {currentStep + 1} od {formSections.length}
          </div>
        </div>

        {/* Side Info */}
        <div className={styles.sideInfo}>
          <div className={styles.infoCard}>
            <h3>Zašto Srećno učenje?</h3>
            <ul>
              <li>✅ Preko 127 aktivnih franšiza</li>
              <li>✅ 15,000+ zadovoljnih polaznika</li>
              <li>✅ Kompletna obuka i podrška</li>
              <li>✅ Dokazana metodologija</li>
              <li>✅ Marketing podrška</li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h3>Potrebna investicija</h3>
            <p>Početna investicija: <strong>2,000 - 5,000 EUR</strong></p>
            <p>ROI period: <strong>6-12 meseci</strong></p>
          </div>

          <div className={styles.infoCard}>
            <h3>Imate pitanja?</h3>
            <p>📞 <a href="tel:+381641234567">+381 64 123 4567</a></p>
            <p>📧 <a href="mailto:fransiza@srecno-ucenje.rs">fransiza@srecno-ucenje.rs</a></p>
          </div>
        </div>
      </div>
    </main>
  )
}