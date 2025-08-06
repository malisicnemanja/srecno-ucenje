'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FormProgress from './FormProgress'
import FormSection from './FormSection'
import FormSuccess from './FormSuccess'
import { validateSection } from '@/lib/franchise-validation'
import { generateFranchisePDF } from '@/lib/pdf-generator'
import styles from './FranchiseForm.module.css'

interface FranchiseFormProps {
  sections: any[]
  formSettings: any
  successMessage: any
}

export default function FranchiseForm({ sections, formSettings, successMessage }: FranchiseFormProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())

  // Sort sections by order
  const sortedSections = [...sections].sort((a, b) => a.order - b.order)

  // Calculate progress
  const calculateProgress = () => {
    const totalSections = sortedSections.length
    const completedSections = sortedSections.filter((section, index) => {
      if (index >= currentSection) return false
      const sectionErrors = validateSection(section, formData)
      return Object.keys(sectionErrors).length === 0
    }).length

    return Math.round((completedSections / totalSections) * 100)
  }

  // Handle field change
  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }))
    
    // Clear error for this field
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[fieldId]
        return newErrors
      })
    }
  }

  // Handle field blur
  const handleFieldBlur = (fieldId: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldId))
  }

  // Validate current section
  const validateCurrentSection = () => {
    const section = sortedSections[currentSection]
    const sectionErrors = validateSection(section, formData)
    setErrors(sectionErrors)
    
    // Mark all fields in section as touched
    section.fields.forEach((field: any) => {
      setTouchedFields(prev => new Set(prev).add(field.fieldId))
    })
    
    return Object.keys(sectionErrors).length === 0
  }

  // Navigate to next section
  const handleNext = () => {
    if (validateCurrentSection()) {
      if (currentSection < sortedSections.length - 1) {
        setCurrentSection(prev => prev + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        handleSubmit()
      }
    }
  }

  // Navigate to previous section
  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Submit form
  const handleSubmit = async () => {
    if (!validateCurrentSection()) return

    setIsSubmitting(true)
    
    try {
      // Generate PDF
      const pdfBlob = await generateFranchisePDF(formData, sortedSections)
      
      // Create form data for submission
      const submitData = new FormData()
      submitData.append('data', JSON.stringify(formData))
      submitData.append('pdf', pdfBlob, `franchise-application-${Date.now()}.pdf`)
      
      // Submit to API
      const response = await fetch('/api/franchise-application', {
        method: 'POST',
        body: submitData
      })
      
      if (!response.ok) {
        throw new Error('Greška pri slanju prijave')
      }
      
      const result = await response.json()
      
      // Show success message
      setIsComplete(true)
      
      // Track conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'franchise_application_complete', {
          event_category: 'Franchise',
          event_label: 'Application Submitted'
        })
      }
      
    } catch (error) {
      console.error('Error submitting application:', error)
      setErrors({ submit: 'Greška pri slanju prijave. Molimo pokušajte ponovo.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Download PDF
  const handleDownloadPDF = async () => {
    try {
      const pdfBlob = await generateFranchisePDF(formData, sortedSections)
      const url = URL.createObjectURL(pdfBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `franchise-application-${Date.now()}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  if (isComplete) {
    return (
      <FormSuccess 
        successMessage={successMessage}
        formData={formData}
        onDownloadPDF={handleDownloadPDF}
      />
    )
  }

  const currentSectionData = sortedSections[currentSection]
  const progress = calculateProgress()

  return (
    <div className={styles.formContainer}>
      {/* Progress Bar */}
      <FormProgress 
        currentSection={currentSection}
        totalSections={sortedSections.length}
        sectionTitles={sortedSections.map(s => s.title)}
        progress={progress}
      />

      {/* Form Content */}
      <div className={styles.formContent}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <FormSection
              section={currentSectionData}
              formData={formData}
              errors={errors}
              touchedFields={touchedFields}
              onFieldChange={handleFieldChange}
              onFieldBlur={handleFieldBlur}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className={styles.navigationButtons}>
          {currentSection > 0 && (
            <button
              type="button"
              onClick={handlePrevious}
              className={`btn btn-form-outline ${styles.prevButton}`}
              disabled={isSubmitting}
            >
              <span className={styles.buttonIcon}>←</span>
              Nazad
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            className={`btn btn-form-primary ${styles.nextButton}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles.loadingIcon}>⟳</span>
                Slanje...
              </>
            ) : currentSection === sortedSections.length - 1 ? (
              <>
                {formSettings?.submitButtonText || 'Pošaljite prijavu'}
                <span className={styles.buttonIcon}>✓</span>
              </>
            ) : (
              <>
                Sledeće
                <span className={styles.buttonIcon}>→</span>
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className={styles.submitError}>
            <span className={styles.errorIcon}>⚠</span>
            {errors.submit}
          </div>
        )}

        {/* Privacy Note */}
        {formSettings?.privacyNote && currentSection === 0 && (
          <div className={styles.privacyNote}>
            <span className={styles.lockIcon}>🔒</span>
            {formSettings.privacyNote}
          </div>
        )}
      </div>
    </div>
  )
}