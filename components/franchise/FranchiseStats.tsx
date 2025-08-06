'use client'

import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from './FranchiseStats.module.css'

interface Statistic {
  number: string
  label: string
  icon: string
  suffix: string
}

interface FranchiseStatsProps {
  statistics: Statistic[]
}

function AnimatedCounter({ end, suffix, duration = 2 }: { end: string, suffix: string, duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref)
  
  useEffect(() => {
    if (!isInView) return
    
    // Extract number from string (remove commas)
    const numericEnd = parseInt(end.replace(/,/g, ''))
    if (isNaN(numericEnd)) return
    
    let startTime: number
    const startCount = 0
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      
      const current = Math.floor(startCount + (numericEnd - startCount) * easeOutCubic)
      setCount(current)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isInView, end, duration])
  
  // Format number with commas if needed
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return num.toLocaleString('sr-RS')
    }
    return num.toString()
  }
  
  return (
    <span ref={ref}>
      {formatNumber(count)}{suffix}
    </span>
  )
}

export default function FranchiseStats({ statistics }: FranchiseStatsProps) {
  const getIconElement = (iconName: string) => {
    const icons: Record<string, string> = {
      franchise: '🏢',
      users: '👥',
      educators: '👩‍🏫',
      rating: '⭐',
      locations: '📍',
      growth: '📈',
      support: '🤝',
      success: '✅'
    }
    return icons[iconName] || '📊'
  }

  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.sectionTitle}>
            Pridružite se uspešnoj mreži
          </h2>
          <p className={styles.sectionSubtitle}>
            Brojevi govore umesto nas - budite deo najbrže rastuće edukacione zajednice u Srbiji
          </p>
        </motion.div>

        <div className={styles.statsGrid}>
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statCard}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -10, 
                transition: { duration: 0.3 } 
              }}
            >
              {/* Icon */}
              <div className={styles.statIcon}>
                {getIconElement(stat.icon)}
              </div>

              {/* Number */}
              <div className={styles.statNumber}>
                <AnimatedCounter 
                  end={stat.number} 
                  suffix={stat.suffix}
                  duration={2 + index * 0.2}
                />
              </div>

              {/* Label */}
              <div className={styles.statLabel}>
                {stat.label}
              </div>

              {/* Decorative Element */}
              <div className={styles.statDecoration}></div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className={styles.ctaSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className={styles.ctaText}>
            Postanite deo ovakve uspešne priče i pokrenite svoju franšizu danas!
          </p>
          <motion.button
            className="btn btn-cta-sun"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const formSection = document.querySelector('[data-section="form"]')
              if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            Prijavite se sada
            <span>→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}