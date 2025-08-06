'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './FranchiseFAQ.module.css'

interface FAQItem {
  question: string
  answer: string
}

interface FranchiseFAQProps {
  faqSection: {
    title: string
    items: FAQItem[]
  }
}

export default function FranchiseFAQ({ faqSection }: FranchiseFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // Open first item by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.sectionTitle}>{faqSection.title}</h2>
          <p className={styles.sectionSubtitle}>
            Odgovori na pitanja koja najčešće postavljaju budući franšiini
          </p>
        </motion.div>

        <div className={styles.faqList}>
          {faqSection.items.map((faq, index) => (
            <motion.div
              key={index}
              className={`${styles.faqItem} ${openIndex === index ? styles.faqItemOpen : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <motion.span 
                  className={styles.faqIcon}
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  +
                </motion.span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className={styles.faqAnswer}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className={styles.answerContent}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div 
          className={styles.contactCTA}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className={styles.ctaText}>
            Nemate odgovor na vaše pitanje?
          </p>
          <div className={styles.ctaButtons}>
            <a href="tel:+381112345678" className="btn btn-form-outline">
              📞 Pozovite nas
            </a>
            <a href="mailto:fransiza@srecno-ucenje.rs" className="btn btn-form-primary">
              ✉️ Pošaljite email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}