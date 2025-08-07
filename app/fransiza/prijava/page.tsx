'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icons from '@/components/ui/Icons'
import { Button } from '@/components/ui/Button'
import BrushUnderline from '@/components/ui/BrushUnderline'
import StructuredData from '@/components/common/StructuredData'
import { baseUrl } from '@/lib/seo-config'
import styles from './prijava.module.css'

// Simplified 4-step form configuration
const formSteps = [
  {
    id: 'personal',
    title: 'Lični podaci',
    subtitle: 'Hajde da se upoznamo',
    icon: Icons.People,
    color: 'sky' as const,
    fields: [
      {
        id: 'fullName',
        label: 'Ime i prezime',
        type: 'text',
        placeholder: 'Vaše puno ime',
        required: true,
        icon: Icons.People
      },
      {
        id: 'email',
        label: 'Email adresa',
        type: 'email',
        placeholder: 'email@domen.com',
        required: true,
        icon: Icons.Email
      },
      {
        id: 'phone',
        label: 'Broj telefona',
        type: 'tel',
        placeholder: '+381 XX XXX XXXX',
        required: true,
        icon: Icons.Phone
      },
      {
        id: 'city',
        label: 'Grad',
        type: 'text',
        placeholder: 'Vaš grad',
        required: true,
        icon: Icons.Location
      }
    ]
  },
  {
    id: 'business',
    title: 'Poslovni plan',
    subtitle: 'Vaša vizija franšize',
    icon: Icons.Rocket,
    color: 'sun' as const,
    fields: [
      {
        id: 'desiredLocation',
        label: 'Željena lokacija franšize',
        type: 'text',
        placeholder: 'Grad ili opština',
        required: true,
        icon: Icons.Location
      },
      {
        id: 'hasSpace',
        label: 'Da li imate prostor?',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Da, imam', icon: Icons.Check },
          { value: 'no', label: 'Tražim', icon: Icons.Close },
          { value: 'considering', label: 'Razmatram', icon: Icons.Info }
        ],
        required: true
      },
      {
        id: 'investment',
        label: 'Planirana investicija',
        type: 'select',
        options: [
          { value: 'starter', label: 'Sky Starter (2.900€)' },
          { value: 'professional', label: 'Sun Professional (5.900€)' },
          { value: 'premium', label: 'Heart Premium (9.900€)' }
        ],
        required: true,
        icon: Icons.Graph
      },
      {
        id: 'startTime',
        label: 'Kada želite početi?',
        type: 'select',
        options: [
          { value: 'immediately', label: 'Odmah' },
          { value: '1-3months', label: 'Za 1-3 meseca' },
          { value: '3-6months', label: 'Za 3-6 meseci' }
        ],
        required: true,
        icon: Icons.Clock
      }
    ]
  },
  {
    id: 'experience',
    title: 'Iskustvo',
    subtitle: 'Vaše kvalifikacije',
    icon: Icons.Trophy,
    color: 'grass' as const,
    fields: [
      {
        id: 'education',
        label: 'Obrazovanje',
        type: 'select',
        options: [
          { value: 'highschool', label: 'Srednja škola' },
          { value: 'bachelor', label: 'Fakultet' },
          { value: 'master', label: 'Master/PhD' }
        ],
        required: true,
        icon: Icons.Graduation
      },
      {
        id: 'workExperience',
        label: 'Iskustvo sa decom',
        type: 'radio',
        options: [
          { value: 'yes', label: 'Imam iskustvo', icon: Icons.Heart },
          { value: 'no', label: 'Nemam, ali volim decu', icon: Icons.Star }
        ],
        required: true
      },
      {
        id: 'businessExperience',
        label: 'Preduzetnička veština',
        type: 'radio',
        options: [
          { value: 'experienced', label: 'Iskusan preduzetnik', icon: Icons.Trophy },
          { value: 'beginner', label: 'Prvi biznis', icon: Icons.Rocket }
        ],
        required: true
      }
    ]
  },
  {
    id: 'motivation',
    title: 'Motivacija',
    subtitle: 'Zašto baš mi?',
    icon: Icons.Heart,
    color: 'heart' as const,
    fields: [
      {
        id: 'whyFranchise',
        label: 'Zašto Srećno učenje?',
        type: 'textarea',
        placeholder: 'Recite nam vašu priču i motivaciju...',
        required: true,
        rows: 4,
        icon: Icons.Heart
      },
      {
        id: 'agreement',
        label: '',
        type: 'checkbox',
        options: [
          { value: 'terms', label: 'Prihvatam uslove korišćenja' },
          { value: 'newsletter', label: 'Želim da primam novosti' }
        ],
        required: ['terms']
      }
    ]
  }
]

// Step indicator component
const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  return (
    <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = formSteps[index]
        const Icon = step.icon
        const isActive = index === currentStep
        const isCompleted = index < currentStep
        
        return (
          <div key={index} className="flex items-center flex-1">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: isActive ? 1.1 : 1,
                backgroundColor: isCompleted ? `var(--brand-${step.color})` : isActive ? `var(--brand-${step.color})` : '#e5e7eb'
              }}
              className={`relative w-12 h-12 rounded-full flex items-center justify-center ${
                isCompleted || isActive ? 'text-white' : 'text-gray-400'
              }`}
            >
              {isCompleted ? (
                <Icons.Check className="w-6 h-6" animate={false} />
              ) : (
                <Icon className="w-6 h-6" animate={false} />
              )}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ borderColor: `var(--brand-${step.color})` }}
                />
              )}
            </motion.div>
            {index < totalSteps - 1 && (
              <div className={`flex-1 h-1 mx-2 ${
                isCompleted ? `bg-brand-${step.color}` : 'bg-gray-200'
              }`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// Field component
const FormField = ({ field, value, onChange, error, color }: any) => {
  const Icon = field.icon
  
  if (field.type === 'radio') {
    return (
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {field.label}
        </label>
        <div className="space-y-2">
          {field.options.map((option: any) => {
            const OptionIcon = option.icon
            return (
              <label
                key={option.value}
                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  value === option.value
                    ? `border-brand-${color} bg-brand-${color}/5`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={field.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(e.target.value)}
                  className="sr-only"
                />
                {OptionIcon && <OptionIcon className="w-5 h-5 mr-3" animate={false} />}
                <span className={value === option.value ? 'font-medium' : ''}>{option.label}</span>
              </label>
            )
          })}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    )
  }
  
  if (field.type === 'select') {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {field.label}
        </label>
        <div className="relative">
          {Icon && (
            <Icon className={`absolute left-3 top-3 w-5 h-5 text-brand-${color}`} animate={false} />
          )}
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-3 border-2 rounded-lg focus:outline-none focus:border-brand-${color} transition-colors`}
          >
            <option value="">Izaberite opciju</option>
            {field.options.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    )
  }
  
  if (field.type === 'textarea') {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {field.label}
        </label>
        <div className="relative">
          {Icon && (
            <Icon className={`absolute left-3 top-3 w-5 h-5 text-brand-${color}`} animate={false} />
          )}
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-3 border-2 rounded-lg focus:outline-none focus:border-brand-${color} transition-colors resize-none`}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    )
  }
  
  if (field.type === 'checkbox') {
    return (
      <div className="space-y-3">
        {field.label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
          </label>
        )}
        <div className="space-y-2">
          {field.options.map((option: any) => (
            <label
              key={option.value}
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                value={option.value}
                checked={Array.isArray(value) ? value.includes(option.value) : false}
                onChange={(e) => {
                  const newValue = Array.isArray(value) ? [...value] : []
                  if (e.target.checked) {
                    newValue.push(option.value)
                  } else {
                    const index = newValue.indexOf(option.value)
                    if (index > -1) newValue.splice(index, 1)
                  }
                  onChange(newValue)
                }}
                className={`mr-3 w-5 h-5 text-brand-${color} rounded focus:ring-brand-${color}`}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    )
  }
  
  // Default text/email/tel/number input
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {field.label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className={`absolute left-3 top-3 w-5 h-5 text-brand-${color}`} animate={false} />
        )}
        <input
          type={field.type}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-3 border-2 rounded-lg focus:outline-none focus:border-brand-${color} transition-colors`}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default function FranchiseApplicationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<any>({})
  const [errors, setErrors] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // Structured data for franchise application
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/fransiza/prijava#service`,
    "name": "Franšiza Srećno učenje - Prijava",
    "description": "Online prijava za franšizu obrazovne metodologije Srećno učenje. Kompletna podrška za pokretanje vašeg obrazovnog centra.",
    "provider": {
      "@type": "Organization",
      "@id": `${baseUrl}#organization`,
      "name": "Srećno učenje"
    },
    "url": `${baseUrl}/fransiza/prijava`,
    "areaServed": {
      "@type": "Country",
      "name": "Serbia"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Franšizni paketi",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Sky Starter",
          "description": "Osnovni franšizni paket",
          "price": "2900",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "name": "Sun Professional",
          "description": "Profesionalni franšizni paket",
          "price": "5900",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "name": "Heart Premium",
          "description": "Premium franšizni paket",
          "price": "9900",
          "priceCurrency": "EUR"
        }
      ]
    },
    "applicationProcess": {
      "@type": "HowTo",
      "name": "Kako se prijaviti za franšizu",
      "description": "4 jednostavna koraka do vaše franšize",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Lični podaci",
          "description": "Unesite vaše osnovne informacije"
        },
        {
          "@type": "HowToStep",
          "name": "Poslovni plan",
          "description": "Definišite vašu viziju franšize"
        },
        {
          "@type": "HowToStep",
          "name": "Iskustvo",
          "description": "Podelite vaše kvalifikacije"
        },
        {
          "@type": "HowToStep",
          "name": "Motivacija",
          "description": "Objasnite zašto baš mi"
        }
      ]
    }
  }
  
  const currentStepData = formSteps[currentStep]
  const Icon = currentStepData.icon
  const color = currentStepData.color
  
  // Validate current step
  const validateStep = () => {
    const newErrors: any = {}
    let isValid = true
    
    currentStepData.fields.forEach((field: any) => {
      const value = formData[field.id]
      
      if (field.required) {
        const requiredFields = Array.isArray(field.required) ? field.required : [field.id]
        
        if (field.type === 'checkbox') {
          const hasRequired = requiredFields.every((req: string) => 
            Array.isArray(value) && value.includes(req)
          )
          if (!hasRequired) {
            newErrors[field.id] = 'Ovo polje je obavezno'
            isValid = false
          }
        } else if (!value || value === '') {
          newErrors[field.id] = 'Ovo polje je obavezno'
          isValid = false
        }
      }
    })
    
    setErrors(newErrors)
    return isValid
  }
  
  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < formSteps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    }
  }
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/franchise-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-24 h-24 bg-brand-grass rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Icons.Check className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Uspešno ste se prijavili!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Hvala vam na interesovanju za Srećno učenje franšizu.
            Kontaktiraćemo vas u narednih 24 sata.
          </p>
          
          <Button
            color="sky"
            variant="filled"
            size="lg"
            onClick={() => window.location.href = '/'}
          >
            Vrati se na početnu
          </Button>
        </motion.div>
      </div>
    )
  }
  
  return (
    <>
      {/* Structured Data */}
      <StructuredData data={structuredData} id="franchise-application-structured-data" />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="container max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Postanite deo{' '}
            <span className="relative inline-block">
              Srećno učenje
              <BrushUnderline color="sun" style="wavy" thickness="medium" />
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Ispunite prijavu u samo 4 koraka
          </p>
        </motion.div>
        
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={formSteps.length} />
        
        {/* Form Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Step Header */}
          <div className="flex items-center mb-8">
            <div className={`w-16 h-16 rounded-xl bg-brand-${color}/10 flex items-center justify-center mr-4`}>
              <Icon className={`w-8 h-8 text-brand-${color}`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {currentStepData.title}
              </h2>
              <p className="text-gray-600">{currentStepData.subtitle}</p>
            </div>
          </div>
          
          {/* Fields */}
          <div className="space-y-6">
            {currentStepData.fields.map((field: any) => (
              <FormField
                key={field.id}
                field={field}
                value={formData[field.id]}
                onChange={(value: any) => {
                  setFormData({ ...formData, [field.id]: value })
                  if (errors[field.id]) {
                    setErrors({ ...errors, [field.id]: null })
                  }
                }}
                error={errors[field.id]}
                color={color}
              />
            ))}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              color="sky"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={currentStep === 0 ? 'invisible' : ''}
            >
              Nazad
            </Button>
            
            <Button
              color={color}
              variant="filled"
              onClick={handleNext}
              disabled={isSubmitting}
            >
              {currentStep === formSteps.length - 1 ? (
                isSubmitting ? 'Šalje se...' : 'Pošalji prijavu'
              ) : (
                'Sledeći korak'
              )}
            </Button>
          </div>
        </motion.div>
        
        {/* Progress Bar */}
        <div className="mt-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-brand-${color}`}
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Korak {currentStep + 1} od {formSteps.length}
          </p>
        </div>
      </div>
    </div>
    </>
  )
}