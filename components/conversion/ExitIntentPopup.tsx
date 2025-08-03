'use client'

import React, { useState, useEffect } from 'react'
import { Hand, Briefcase, TrendingUp, BookOpen, X } from 'lucide-react'

interface ExitIntentPopupProps {
  pageType: string
}

export default function ExitIntentPopup({ pageType }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if popup has already been shown in this session
    const popupShown = sessionStorage.getItem('exitIntentShown')
    if (popupShown) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving through the top of the page
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }
    }

    // Add event listener after a delay to avoid immediate triggers
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 3000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasShown])

  const getContent = () => {
    switch (pageType) {
      case 'home':
        return {
          title: 'Samo sekund!',
          icon: <Hand size={32} className="text-yellow-500" />,
          subtitle: 'Ne propustite priliku da saznate više o našoj metodi!',
          offer: 'Preuzmite BESPLATAN vodič za roditelje',
          cta: 'Preuzmite odmah'
        }
      case 'franchise':
        return {
          title: 'Zainteresovani ste za franšizu?',
          icon: <Briefcase size={32} className="text-primary-600" />,
          subtitle: 'Kontaktirajte nas za detaljne informacije!',
          offer: 'Besplatna konsultacija o poslovnoj prilici',
          cta: 'Zakazivanje poziva'
        }
      case 'calculator':
        return {
          title: 'Vidite potencijal?',
          icon: <TrendingUp size={32} className="text-green-600" />,
          subtitle: 'Saznajte kako možete ostvariti ovakve rezultate!',
          offer: 'Razgovor sa našim stručnjakom',
          cta: 'Zakažite konsultaciju'
        }
      default:
        return {
          title: 'Čekaj, imate pitanja?',
          icon: <BookOpen size={32} className="text-primary-600" />,
          subtitle: 'Pošaljite nam poruku i odgovorićemo uskoro!',
          offer: 'Besplatno personalizovano savjetovanje',
          cta: 'Kontaktirajte nas'
        }
    }
  }

  const content = getContent()

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="text-center">
          {content.icon && <div className="mb-4">{content.icon}</div>}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {content.title}
          </h3>
          <p className="text-gray-600 mb-4">
            {content.subtitle}
          </p>
          <div className="bg-primary-50 rounded-lg p-4 mb-6">
            <p className="text-primary-700 font-semibold">
              {content.offer}
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => {
                setIsVisible(false)
                // Redirect based on page type
                if (pageType === 'franchise') {
                  window.location.href = '/kontakt?tip=fransiza'
                } else {
                  window.location.href = '/kontakt'
                }
              }}
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {content.cta}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="w-full text-gray-500 py-2 hover:text-gray-700 transition-colors"
            >
              Ne, hvala
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}