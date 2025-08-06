'use client'

import { motion } from 'framer-motion'
import styles from './FranchiseHero.module.css'

interface FranchiseHeroProps {
  title: string
  subtitle: string
  description: string
}

export default function FranchiseHero({ title, subtitle, description }: FranchiseHeroProps) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          {/* Animated Background Elements */}
          <div className={styles.backgroundElements}>
            <motion.div 
              className={styles.floatingIcon}
              style={{ top: '10%', left: '10%' }}
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              🎓
            </motion.div>
            <motion.div 
              className={styles.floatingIcon}
              style={{ top: '20%', right: '15%' }}
              animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            >
              📚
            </motion.div>
            <motion.div 
              className={styles.floatingIcon}
              style={{ bottom: '20%', left: '5%' }}
              animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
              transition={{ duration: 7, repeat: Infinity, delay: 2 }}
            >
              💼
            </motion.div>
            <motion.div 
              className={styles.floatingIcon}
              style={{ bottom: '30%', right: '8%' }}
              animate={{ y: [0, -25, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
              🌟
            </motion.div>
          </div>

          {/* Main Content */}
          <motion.div 
            className={styles.textContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {title}
            </motion.h1>
            
            <motion.p 
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {subtitle}
            </motion.p>
            
            <motion.p 
              className={styles.heroDescription}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {description}
            </motion.p>
          </motion.div>

          {/* Call to Action Scroll Indicator */}
          <motion.div 
            className={styles.scrollIndicator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            onClick={() => {
              const formSection = document.querySelector('[data-section="form"]')
              if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            <span className={styles.scrollText}>Počnite prijavu</span>
            <motion.div 
              className={styles.scrollArrow}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↓
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}