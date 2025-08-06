'use client'

import { motion } from 'framer-motion'
import styles from './FormSuccess.module.css'

interface FormSuccessProps {
  successMessage: any
  formData: Record<string, any>
  onDownloadPDF: () => void
}

export default function FormSuccess({ successMessage, formData, onDownloadPDF }: FormSuccessProps) {
  return (
    <motion.div 
      className={styles.successContainer}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Success Icon */}
      <motion.div 
        className={styles.successIcon}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="40" fill="var(--brand-grass)"/>
          <path 
            d="M25 40L35 50L55 30" 
            stroke="white" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Success Title */}
      <h2 className={styles.successTitle}>
        {successMessage?.title || 'Uspešno ste poslali prijavu!'}
      </h2>

      {/* Success Message */}
      <p className={styles.successMessage}>
        {successMessage?.message || 'Vaša prijava je uspešno poslata. Kontaktiraćemo vas u najkraćem mogućem roku.'}
      </p>

      {/* Application Summary */}
      <div className={styles.summaryCard}>
        <h3 className={styles.summaryTitle}>Podaci o prijavi</h3>
        <div className={styles.summaryDetails}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Ime i prezime:</span>
            <span className={styles.summaryValue}>{formData.ime_prezime}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Email:</span>
            <span className={styles.summaryValue}>{formData.email}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Telefon:</span>
            <span className={styles.summaryValue}>{formData.telefon}</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Lokacija:</span>
            <span className={styles.summaryValue}>{formData.lokacija}</span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      {successMessage?.nextSteps && (
        <div className={styles.nextSteps}>
          <h3 className={styles.nextStepsTitle}>Sledeći koraci</h3>
          <ol className={styles.nextStepsList}>
            {successMessage.nextSteps.map((step: string, index: number) => (
              <motion.li 
                key={index}
                className={styles.nextStepItem}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <span className={styles.stepNumber}>{index + 1}</span>
                <span className={styles.stepText}>{step}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      )}

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button 
          onClick={onDownloadPDF}
          className="btn btn-form-outline"
        >
          <span className={styles.downloadIcon}>📄</span>
          Preuzmite kopiju prijave
        </button>
        <a 
          href="/"
          className="btn btn-form-primary"
        >
          Vratite se na početnu
          <span className={styles.arrowIcon}>→</span>
        </a>
      </div>

      {/* Contact Info */}
      <div className={styles.contactInfo}>
        <p>Imate pitanja? Kontaktirajte nas:</p>
        <div className={styles.contactMethods}>
          <a href="tel:+381112345678" className={styles.contactItem}>
            <span>📞</span> +381 11 234 5678
          </a>
          <a href="mailto:fransiza@srecno-ucenje.rs" className={styles.contactItem}>
            <span>✉️</span> fransiza@srecno-ucenje.rs
          </a>
        </div>
      </div>
    </motion.div>
  )
}