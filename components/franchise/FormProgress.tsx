'use client'

import { motion } from 'framer-motion'
import styles from './FormProgress.module.css'

interface FormProgressProps {
  currentSection: number
  totalSections: number
  sectionTitles: string[]
  progress: number
}

export default function FormProgress({ 
  currentSection, 
  totalSections, 
  sectionTitles,
  progress 
}: FormProgressProps) {
  return (
    <div className={styles.progressContainer}>
      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <motion.div 
          className={styles.progressFill}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Progress Text */}
      <div className={styles.progressInfo}>
        <span className={styles.progressStep}>
          Korak {currentSection + 1} od {totalSections}
        </span>
        <span className={styles.progressPercent}>
          {progress}% završeno
        </span>
      </div>

      {/* Section Indicators */}
      <div className={styles.sectionIndicators}>
        {sectionTitles.map((title, index) => (
          <div
            key={index}
            className={`${styles.indicator} ${
              index < currentSection ? styles.indicatorComplete :
              index === currentSection ? styles.indicatorActive :
              styles.indicatorPending
            }`}
          >
            <div className={styles.indicatorDot}>
              {index < currentSection ? (
                <span className={styles.checkmark}>✓</span>
              ) : (
                <span className={styles.indicatorNumber}>{index + 1}</span>
              )}
            </div>
            <span className={styles.indicatorTitle}>{title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}