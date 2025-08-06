'use client'

import { motion } from 'framer-motion'
import styles from './FranchiseTestimonials.module.css'

interface Testimonial {
  name: string
  location: string
  quote: string
  role: string
  rating: number
}

interface FranchiseTestimonialsProps {
  testimonials: Testimonial[]
}

export default function FranchiseTestimonials({ testimonials }: FranchiseTestimonialsProps) {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={`${styles.star} ${i < rating ? styles.starFilled : ''}`}>
        ⭐
      </span>
    ))
  }

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.sectionTitle}>Priče naših franšiza</h2>
          <p className={styles.sectionSubtitle}>
            Čujte od onih koji su već krenuli svoj put uspešnog franšiinga
          </p>
        </motion.div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={styles.testimonialCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.testimonialQuote}>{testimonial.quote}</p>
              <div className={styles.testimonialFooter}>
                <div className={styles.testimonialAuthor}>
                  <h4 className={styles.authorName}>{testimonial.name}</h4>
                  <p className={styles.authorLocation}>{testimonial.location}</p>
                  <p className={styles.authorRole}>{testimonial.role}</p>
                </div>
                <div className={styles.testimonialRating}>
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}