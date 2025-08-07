'use client'

/**
 * FAQSection - Frequently Asked Questions sekcija
 */

import React, { useState } from 'react'
import { FAQSectionProps } from '@/types/sections'
import { brandColors, getContrastColor } from '@/lib/color-rotation'

const FAQSection: React.FC<FAQSectionProps> = ({
  title,
  subtitle,
  faqs = [],
  layout = 'accordion',
  searchable = false,
  categories = [],
  backgroundColor = 'sky',
  spacing = 'lg',
  className = '',
  isPreview = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [openFAQs, setOpenFAQs] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState(categories[0] || '')

  const bgColor = brandColors[backgroundColor]
  const textColor = getContrastColor(backgroundColor)

  // Toggle FAQ open/close
  const toggleFAQ = (faqId: string) => {
    const newOpenFAQs = new Set(openFAQs)
    if (newOpenFAQs.has(faqId)) {
      newOpenFAQs.delete(faqId)
    } else {
      newOpenFAQs.add(faqId)
    }
    setOpenFAQs(newOpenFAQs)
  }

  // Filter FAQs
  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch = !searchTerm || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = !activeCategory || faq.category === activeCategory
    const matchesTab = layout !== 'tabs' || !activeTab || faq.category === activeTab

    return matchesSearch && matchesCategory && matchesTab
  })

  // Spacing classes
  const getSpacingClasses = () => {
    switch (spacing) {
      case 'none': return 'py-0'
      case 'sm': return 'py-8'
      case 'md': return 'py-12'
      case 'lg': return 'py-16'
      case 'xl': return 'py-24'
      default: return 'py-16'
    }
  }

  if (!faqs.length && !isPreview) {
    return null
  }

  return (
    <section 
      className={`
        section-faq
        ${getSpacingClasses()}
        ${className}
      `}
      style={{
        backgroundColor: bgColor.hex,
        color: textColor === 'white' ? '#ffffff' : '#1E293B',
      }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`
                text-lg md:text-xl opacity-90
                ${textColor === 'white' ? 'text-white/80' : 'text-gray-600'}
              `}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Search */}
        {searchable && (
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Pretražite pitanja..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Categories (filter buttons) */}
        {categories.length > 0 && layout !== 'tabs' && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${!activeCategory 
                  ? 'bg-white text-gray-900' 
                  : 'bg-white/20 hover:bg-white/30'
                }
              `}
            >
              Sve kategorije
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${activeCategory === category 
                    ? 'bg-white text-gray-900' 
                    : 'bg-white/20 hover:bg-white/30'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Tabs layout */}
        {layout === 'tabs' && categories.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="border-b border-white/20 mb-8">
              <nav className="flex space-x-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`
                      py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200
                      ${activeTab === category
                        ? 'border-white text-white'
                        : 'border-transparent text-white/60 hover:text-white/80'
                      }
                    `}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* FAQ Content */}
        {filteredFAQs.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            {layout === 'accordion' && (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className={`
                      bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden
                      ${faq.featured ? 'ring-2 ring-white/30' : ''}
                    `}
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <span className="font-medium pr-4">
                        {faq.question}
                      </span>
                      <svg 
                        className={`
                          w-5 h-5 transform transition-transform duration-200
                          ${openFAQs.has(faq.id) ? 'rotate-45' : ''}
                        `}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {openFAQs.has(faq.id) && (
                      <div className="px-6 pb-4">
                        <div className="prose prose-invert max-w-none">
                          <p className="opacity-80">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {layout === 'grid' && (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
                  >
                    <h3 className="font-semibold text-lg mb-3">
                      {faq.question}
                    </h3>
                    <div className="prose prose-invert max-w-none">
                      <p className="opacity-80">{faq.answer}</p>
                    </div>
                    {faq.category && (
                      <span className="inline-block mt-3 px-2 py-1 text-xs bg-white/20 rounded-full">
                        {faq.category}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {layout === 'tabs' && (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
                  >
                    <h3 className="font-semibold text-lg mb-3">
                      {faq.question}
                    </h3>
                    <div className="prose prose-invert max-w-none">
                      <p className="opacity-80">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Empty/No results state */
          <div className="text-center py-12">
            {faqs.length === 0 && isPreview ? (
              <>
                <div className="text-6xl mb-4 opacity-20">❓</div>
                <p className="text-lg opacity-60">
                  Dodajte FAQ pitanja da biste videli prikaz
                </p>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4 opacity-20">🔍</div>
                <p className="text-lg opacity-60">
                  Nema rezultata za "{searchTerm}"
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setActiveCategory(null)
                  }}
                  className="mt-4 btn btn-outline btn-sm"
                >
                  Resetuj filter
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default FAQSection