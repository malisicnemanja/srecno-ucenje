'use client'

import { motion } from 'framer-motion'
import styles from './FranchiseBenefits.module.css'

interface Benefit {
  title: string
  description: string
  icon: string
}

interface FranchiseBenefitsProps {
  benefits: Benefit[]
}

export default function FranchiseBenefits({ benefits }: FranchiseBenefitsProps) {
  const getIconElement = (iconName: string) => {
    const icons: Record<string, string> = {
      education: '🎓',
      marketing: '📢',
      support: '🤝',
      finance: '💰',
      business: '💼',
      network: '🌐'
    }
    return icons[iconName] || '✨'
  }

  return (
    <section className={styles.benefitsSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.sectionTitle}>Zašto izabrati franšizu Srećno učenje?</h2>
          <p className={styles.sectionSubtitle}>
            Sve što vam je potrebno za uspešan start i razvoj vašeg edukacionog biznisa
          </p>
        </motion.div>

        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className={styles.benefitCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className={styles.benefitIcon}>
                {getIconElement(benefit.icon)}
              </div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDescription}>{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}