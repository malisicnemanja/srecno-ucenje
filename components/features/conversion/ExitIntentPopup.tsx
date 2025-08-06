'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { saveSanityDocument } from '@/lib/sanity-write'
import { trackEvent } from '@/lib/analytics'
import { generateNewsletterWelcomePDF, generateFilename } from '@/lib/pdf-generator'
import { Gift } from 'lucide-react'

interface ExitIntentPopupProps {
  pageType?: 'home' | 'franchise' | 'calculator' | 'quiz' | 'default'
}

export default function ExitIntentPopup({ pageType = 'default' }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Personalized content based on page type
  const getContent = () => {
    switch (pageType) {
      case 'franchise':
        return {
          title: 'Čekajte! Ne propustite ovu priliku!',
          subtitle: 'Preuzmite BESPLATAN vodič za franšizu',
          offer: 'Vodič: 10 koraka do uspešne franšize',
          cta: 'Pošaljite mi vodič',
        }
      case 'calculator':
        return {
          title: 'Pre nego što odete...',
          subtitle: 'Dobijte detaljnu analizu vaše investicije',
          offer: 'Personalizovan izveštaj + konsultacije',
          cta: 'Želim analizu',
        }
      case 'quiz':
        return {
          title: 'Imate još pitanja?',
          subtitle: 'Naš tim je tu da vam pomogne',
          offer: 'Besplatne 30-min konsultacije',
          cta: 'Zakaži',
        }
      case 'home':
        return {
          title: 'Postanite deo naše priče!',
          subtitle: 'Pridružite se mreži od 20.000+ srećne dece',
          offer: 'Info paket + prezentacija',
          cta: 'Pošaljite informacije',
        }
      default:
        return {
          title: 'Ne propustite priliku!',
          subtitle: 'Ostavite email za ekskluzivne informacije',
          offer: 'Newsletter + posebne ponude',
          cta: 'Prijavite me',
        }
    }
  }

  const content = getContent()

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('exitIntentShown')
    if (popupShown) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger only when mouse leaves from top
      if (e.clientY <= 0 && !hasShown && !isVisible) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exitIntentShown', 'true')
        
        // Track event
        trackEvent({
          category: 'Exit Intent',
          action: 'show',
          label: pageType,
        })
      }
    }

    // Mobile: detect when user scrolls up quickly (might leave)
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDiff = lastScrollY - currentScrollY
      
      // If user scrolls up quickly near top of page
      if (scrollDiff > 50 && currentScrollY < 200 && !hasShown && !isVisible) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exitIntentShown', 'true')
        
        trackEvent({
          category: 'Exit Intent',
          action: 'show_mobile',
          label: pageType,
        })
      }
      
      lastScrollY = currentScrollY
    }

    // Add listeners
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hasShown, isVisible, pageType])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Save lead to Sanity
      await saveSanityDocument('newsletterSubscriber', {
        email,
        source: `exit_intent_${pageType}`,
        subscribedAt: new Date().toISOString(),
      })

      // Track conversion
      trackEvent({
        category: 'Exit Intent',
        action: 'convert',
        label: pageType,
      })

      // Generate and download resource based on page type
      try {
        const resourceType = pageType === 'franchise' ? 'franchise_guide' : 
                           pageType === 'calculator' || pageType === 'quiz' ? 'methodology_intro' : 
                           'general'
        
        await generateNewsletterWelcomePDF({
          subscriberEmail: email,
          resourceType
        }, {
          autoDownload: true,
          filename: generateFilename('srecno-ucenje-vodic')
        })
      } catch (pdfError) {
        console.error('Error generating PDF:', pdfError)
      }

      setIsSuccess(true)
      
      // Auto close after 3 seconds
      setTimeout(() => {
        setIsVisible(false)
      }, 3000)
    } catch (error) {
      console.error('Error saving lead:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    trackEvent({
      category: 'Exit Intent',
      action: 'close',
      label: pageType,
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="p-8">
                {!isSuccess ? (
                  <>
                    <div className="text-center mb-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-4"
                      >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </motion.div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{content.title}</h2>
                      <p className="text-gray-600">{content.subtitle}</p>
                    </div>

                    {/* Offer box */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6">
                      <p className="text-center font-semibold text-gray-900">
                        <Gift size={20} className="inline mr-2" />{content.offer}
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Vaša email adresa"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Slanje...' : content.cta}
                      </button>
                    </form>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      Bez spama. Možete se odjaviti u bilo kom trenutku.
                    </p>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring' }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
                    >
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Hvala vam!</h3>
                    <p className="text-gray-600">Vaš vodič se automatski preuzima!</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}