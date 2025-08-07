'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSanityQuery } from '@/hooks/useSanity'
import { faqCategoriesQuery, faqsWithCategoriesQuery } from '@/lib/sanity.queries'
import { SearchIcon, CalendarIcon, ClipboardIcon, FolderIcon, CheckIcon, LightbulbIcon, SmileIcon } from 'lucide-react'
import { HappyStudents } from '@/components/illustrations/ChildIllustrations'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import { Button } from '@/components/ui/Button'
import { Icons } from '@/components/ui/Icons'
import BrushUnderline from '@/components/ui/BrushUnderline'
import StructuredData from '@/components/common/StructuredData'
import { baseUrl } from '@/lib/seo-config'

interface FAQ {
  _id: string
  question: string
  answer: string
  category: {
    _id: string
    name: string
    slug: string
    icon?: string
    color?: string
  }
  order: number
}

interface Category {
  _id: string
  name: string
  slug: string
  description?: string
  icon?: string
  color?: string
  order: number
}

// Category configuration for consistent styling
const categoryConfig = {
  franshiza: {
    name: 'Franšiza',
    icon: 'Briefcase',
    color: '#5DBFDB'
  },
  programa: {
    name: 'Programi',
    icon: 'Book',
    color: '#F4C950'
  },
  uslovi: {
    name: 'Uslovi',
    icon: 'Check',
    color: '#91C733'
  },
  podrška: {
    name: 'Podrška',
    icon: 'Heart',
    color: '#E53935'
  },
  general: {
    name: 'Opšte',
    icon: 'Info',
    color: '#1E293B'
  }
}

// Smart CTAs based on FAQ content
const smartCTAs: Record<string, {
  ctaText: string
  ctaLink: string
  ctaColor: 'sky' | 'sun' | 'grass' | 'heart'
}> = {}

// SEO metadata for FAQ page
export async function generateMetadata() {
  return {
    title: 'Česta pitanja - Srećno učenje | Sve o franšizi i programima',
    description: 'Odgovori na najčešća pitanja o franšizi Srećno učenje, programima brzog čitanja, investiciji i poslovanju. Saznajte sve što vas zanima!',
    keywords: ['česta pitanja', 'FAQ franšiza', 'Srećno učenje pitanja', 'franšiza odgovori', 'brzo čitanje pitanja'],
    openGraph: {
      title: 'Česta pitanja - Srećno učenje',
      description: 'Pronađite odgovore na sva vaša pitanja o franšizi i programima Srećnog učenja',
      url: `${baseUrl}/faq`,
      type: 'website'
    }
  }
}

// Helper function to render icon based on icon name
const renderIcon = (iconName: string | undefined, size = 20) => {
  switch (iconName) {
    case 'clipboard':
      return <ClipboardIcon size={size} />
    case 'folder':
      return <FolderIcon size={size} />
    default:
      return null
  }
}

// Helper function to render category icon
const renderCategoryIcon = (categorySlug: string, size = 20, animate = false) => {
  const config = categoryConfig[categorySlug as keyof typeof categoryConfig]
  if (!config) return <Icons.Info size={size} animate={animate} />
  
  const IconComponent = Icons[config.icon as keyof typeof Icons] as React.ComponentType<any>
  return <IconComponent size={size} animate={animate} style={{ color: config.color }} />
}

// Get category color
const getCategoryColor = (categorySlug: string): string => {
  const config = categoryConfig[categorySlug as keyof typeof categoryConfig]
  return config?.color || '#1E293B'
}

// Analytics tracking helper
const trackFAQInteraction = (action: string, faqId: string, question?: string) => {
  if (typeof window !== 'undefined') {
    // Prepare for analytics integration
    console.log('[FAQ Analytics]', { action, faqId, question })
    // Future: gtag('event', action, { faq_id: faqId, question })
  }
}

export default function FAQPage() {
  const { data: faqs, isLoading: faqsLoading } = useSanityQuery<FAQ[]>(faqsWithCategoriesQuery)
  const { data: cmsCategories, isLoading: categoriesLoading } = useSanityQuery<Category[]>(faqCategoriesQuery)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openItems, setOpenItems] = useState<string[]>([])
  const [allExpanded, setAllExpanded] = useState(false)
  
  // Generate structured data for FAQ page
  const faqStructuredData = useMemo(() => {
    if (!faqs) return null
    
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${baseUrl}/faq#faqpage`,
      "name": "Česta pitanja - Srećno učenje",
      "description": "Odgovori na najčešća pitanja o franšizi Srećno učenje",
      "url": `${baseUrl}/faq`,
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  }, [faqs])

  // Enhanced search with highlighting
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text
    
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'))
    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <mark key={index} className="bg-[#F4C950] bg-opacity-30 px-1 rounded">
          {part}
        </mark>
      ) : part
    )
  }

  // Track search interactions
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term.length > 2) {
      trackFAQInteraction('faq_search', 'search', term)
    }
  }

  // Track category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    trackFAQInteraction('category_selected', categoryId)
  }

  // Build categories from CMS data with "All" option
  const categories = useMemo(() => {
    const allCategory = { id: 'all', name: 'Sve', icon: 'clipboard' }
    if (!cmsCategories) return [allCategory]
    
    const cmsOptions = cmsCategories.map(cat => ({
      id: cat.slug,
      name: cat.name,
      icon: cat.icon || 'folder',
      color: cat.color
    }))
    
    return [allCategory, ...cmsOptions]
  }, [cmsCategories])

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    if (!faqs) return []

    return faqs.filter((faq) => {
      const matchesSearch =
        searchTerm === '' ||
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === 'all' || faq.category?.slug === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [faqs, searchTerm, selectedCategory])

  // Toggle single FAQ with analytics
  const toggleFAQ = (id: string, question?: string) => {
    const isOpening = !openItems.includes(id)
    
    setOpenItems((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    )
    
    // Track FAQ interaction
    trackFAQInteraction(
      isOpening ? 'faq_opened' : 'faq_closed',
      id,
      question
    )
  }

  // Expand/Collapse all
  const toggleAll = () => {
    if (allExpanded) {
      setOpenItems([])
    } else {
      setOpenItems(filteredFAQs.map((faq) => faq._id))
    }
    setAllExpanded(!allExpanded)
  }

  // Update allExpanded state when items change
  useEffect(() => {
    setAllExpanded(
      filteredFAQs.length > 0 &&
        filteredFAQs.every((faq) => openItems.includes(faq._id))
    )
  }, [openItems, filteredFAQs])

  // Check for hash in URL to scroll to specific FAQ
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && faqs) {
      const faq = faqs.find((f) => f._id === hash)
      if (faq) {
        setOpenItems([faq._id])
        trackFAQInteraction('faq_direct_link', faq._id, faq.question)
        setTimeout(() => {
          const element = document.getElementById(hash)
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100)
      }
    }
  }, [faqs])

  if (faqsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-primary-50">
        <div className="container py-20">
          <SkeletonLoader type="title" className="mb-4 max-w-2xl mx-auto" />
          <SkeletonLoader type="text" lines={2} className="max-w-xl mx-auto mb-8" />
          <div className="max-w-4xl mx-auto space-y-4">
            <SkeletonLoader type="card" />
            <SkeletonLoader type="card" />
            <SkeletonLoader type="card" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Structured Data for FAQ */}
      {faqStructuredData && (
        <StructuredData data={faqStructuredData} id="faq-structured-data" />
      )}
      
      <main className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-accent-50">
        <div className="absolute inset-0 bg-white/50" />
        
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-accent-200 rounded-full opacity-30"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-200 rounded-full opacity-30"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 25, repeat: Infinity }}
          />
        </div>

        <div className="container relative pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-primary-600">Česta</span>{' '}
                <span className="text-secondary-600">Pitanja</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Pronađite odgovore na sva vaša pitanja o našoj franšizi i metodologiji
              </p>

              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center space-x-2">
                  <LightbulbIcon size={24} className="text-accent-500" />
                  <span className="text-sm text-gray-600">Brze pretrage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <SmileIcon size={24} className="text-primary-500" />
                  <span className="text-sm text-gray-600">Jasni odgovori</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <HappyStudents className="w-full h-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Pretražite pitanja... (npr. 'cena', 'dužina programa', 'godine')"
                className="w-full px-4 py-4 pl-12 border-2 border-accent-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all bg-white shadow-soft"
              />
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-400" size={20} />
            </motion.div>

            {/* Category Filters */}
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-accent-500 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-accent-50 hover:text-accent-600 shadow-soft'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  {category.icon && <span className="mr-2">{renderIcon(category.icon)}</span>}
                  {category.name}
                </motion.button>
              ))}
            </motion.div>

            {/* Expand/Collapse All */}
            <motion.div 
              className="flex justify-between items-center bg-accent-50 rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-sm text-gray-600 flex items-center">
                <CheckIcon size={16} className="mr-2 text-accent-500" />
                Prikazano {filteredFAQs.length} od {faqs?.length || 0} pitanja
              </p>
              <motion.button
                onClick={toggleAll}
                className="text-sm font-semibold text-accent-600 hover:text-accent-700 px-4 py-2 rounded-lg hover:bg-accent-100 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {allExpanded ? 'Skupi sve' : 'Proširi sve'}
              </motion.button>
            </motion.div>
          </div>

          {/* FAQ Items */}
          {filteredFAQs.length > 0 ? (
            <div className="space-y-6">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq._id}
                  id={faq._id}
                  className="card-interactive bg-white border border-accent-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <motion.button
                    onClick={() => toggleFAQ(faq._id, faq.question)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded-xl group"
                    style={{ '--tw-ring-color': getCategoryColor(faq.category?.slug || 'general') } as React.CSSProperties}
                    aria-expanded={openItems.includes(faq._id)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div 
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: getCategoryColor(faq.category?.slug || 'general') + '15' }}
                      >
                        {renderCategoryIcon(faq.category?.slug || 'general', 20, openItems.includes(faq._id))}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 pr-4 group-hover:text-gray-700 transition-colors">
                          {highlightText(faq.question, searchTerm)}
                        </h3>
                        {openItems.includes(faq._id) && smartCTAs[faq._id] && (
                          <div className="mt-2">
                            <span className="text-xs font-medium px-2 py-1 rounded-full" 
                              style={{ 
                                backgroundColor: getCategoryColor(faq.category?.slug || 'general') + '20',
                                color: getCategoryColor(faq.category?.slug || 'general')
                              }}
                            >
                              Možete odmah da:
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <motion.div
                      animate={{ 
                        rotate: openItems.includes(faq._id) ? 180 : 0,
                        scale: openItems.includes(faq._id) ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                    >
                      <Icons.ChevronDown 
                        size={20} 
                        style={{ color: getCategoryColor(faq.category?.slug || 'general') }}
                        animate
                      />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {openItems.includes(faq._id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ 
                          duration: 0.3,
                          ease: [0.4, 0.0, 0.2, 1]
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            <p className="text-gray-600 leading-relaxed mb-6 text-base">
                              {highlightText(faq.answer, searchTerm)}
                            </p>
                            
                            {/* Smart CTA Section */}
                            {smartCTAs[faq._id] && (
                              <motion.div 
                                className="bg-gray-50 rounded-lg p-4 mb-4"
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Icons.Target size={16} style={{ color: getCategoryColor(faq.category?.slug || 'general') }} />
                                    <span className="text-sm font-medium text-gray-700">Sledeći korak:</span>
                                  </div>
                                  <Button
                                    variant="filled"
                                    color={smartCTAs[faq._id].ctaColor}
                                    size="sm"
                                    onClick={() => {
                                      trackFAQInteraction('cta_clicked', faq._id, smartCTAs[faq._id].ctaText)
                                    }}
                                    rightIcon={<Icons.ArrowRight size={14} />}
                                  >
                                    <Link href={smartCTAs[faq._id].ctaLink || '#'}>
                                      {smartCTAs[faq._id].ctaText}
                                    </Link>
                                  </Button>
                                </div>
                              </motion.div>
                            )}
                            
                            <div className="flex items-center justify-between">
                              <span 
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
                                style={{
                                  backgroundColor: getCategoryColor(faq.category?.slug || 'general') + '15',
                                  color: getCategoryColor(faq.category?.slug || 'general')
                                }}
                              >
                                {renderCategoryIcon(faq.category?.slug || 'general', 16)}
                                <span className="ml-2">{faq.category?.name || categoryConfig[faq.category?.slug as keyof typeof categoryConfig]?.name || 'Opšte'}</span>
                              </span>
                              
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(window.location.origin + '/faq#' + faq._id)
                                  trackFAQInteraction('link_copied', faq._id)
                                }}
                                className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
                                title="Kopiraj link"
                              >
                                <Icons.Check size={14} />
                                Podeli
                              </button>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Icons.Target className="w-16 h-16 mx-auto mb-6" style={{ color: '#F4C950' }} animate />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Nema rezultata pretrage</h3>
              <p className="text-gray-600 mb-6">
                Nema pitanja koja odgovaraju vašoj pretrazi. Pokušajte sa drugim ključnim rečima ili kontaktirajte nas direktno.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => { 
                    setSearchTerm(''); 
                    setSelectedCategory('all'); 
                    trackFAQInteraction('filters_reset', 'no_results')
                  }}
                  color="sun"
                  leftIcon={<Icons.ArrowRight size={16} />}
                >
                  Poništi filtere
                </Button>
                <Button
                  variant="outline"
                  color="sky"
                  leftIcon={<Icons.Chat size={16} />}
                >
                  <Link href="/kontakt">Kontaktirajte nas</Link>
                </Button>
              </div>
            </motion.div>
          )}

          {/* Enhanced "Still have questions?" Section */}
          <motion.div 
            className="mt-16 rounded-2xl p-8 text-center border-2"
            style={{ 
              background: 'linear-gradient(135deg, #5DBFDB10 0%, #F4C95010 50%, #91C73310 100%)',
              borderColor: '#5DBFDB'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Icons.Heart size={48} className="mx-auto mb-6" style={{ color: '#E53935' }} animate />
            </motion.div>
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#1E293B' }}>
              <span className="relative inline-block">
                Niste pronašli odgovor?
                <BrushUnderline color="heart" style="wavy" thickness="medium" />
              </span>
            </h3>
            <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
              Naš stručni tim je tu da vam pomogne sa svim dodatnim pitanjima. 
              Kontaktirajte nas putem bilo kog od sledećih načina:
            </p>
            {/* Contact Options Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <motion.div 
                className="bg-white rounded-lg p-6 shadow-lg border-2"
                style={{ borderColor: '#5DBFDB' }}
                whileHover={{ scale: 1.02, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Icons.Phone size={32} className="mx-auto mb-3" style={{ color: '#5DBFDB' }} animate />
                <h4 className="font-semibold mb-2" style={{ color: '#1E293B' }}>Pozovite nas</h4>
                <p className="text-sm text-gray-600 mb-3">Razgovarajte direktno sa našim stručnjacima</p>
                <Button color="sky" size="sm" fullWidth>
                  <a href="tel:+381111234567">+381 11 123 4567</a>
                </Button>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg p-6 shadow-lg border-2"
                style={{ borderColor: '#F4C950' }}
                whileHover={{ scale: 1.02, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <CalendarIcon size={32} className="mx-auto mb-3" style={{ color: '#F4C950' }} />
                <h4 className="font-semibold mb-2" style={{ color: '#1E293B' }}>Zakažite sastanak</h4>
                <p className="text-sm text-gray-600 mb-3">Personalizovane konsultacije</p>
                <Button color="sun" size="sm" fullWidth>
                  <SafeLink href="/zakazivanje">Zakažite odmah</SafeLink>
                </Button>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg p-6 shadow-lg border-2"
                style={{ borderColor: '#91C733' }}
                whileHover={{ scale: 1.02, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Icons.Chat size={32} className="mx-auto mb-3" style={{ color: '#91C733' }} animate />
                <h4 className="font-semibold mb-2" style={{ color: '#1E293B' }}>Live Chat</h4>
                <p className="text-sm text-gray-600 mb-3">Trenutna podrška online</p>
                <Button color="grass" size="sm" fullWidth>
                  <SafeLink href="/kontakt">Počnite chat</SafeLink>
                </Button>
              </motion.div>
            </div>
            
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                color="sky"
                size="lg"
                leftIcon={<CalendarIcon size={20} />}
                onClick={() => trackFAQInteraction('cta_clicked', 'main_cta', 'Zakažite besplatan probni čas')}
              >
                <SafeLink href="/zakazivanje">Zakažite besplatan probni čas</SafeLink>
              </Button>
              <Button
                variant="outline"
                color="heart"
                size="lg"
                leftIcon={<Icons.Rocket size={20} />}
                onClick={() => trackFAQInteraction('cta_clicked', 'franchise_cta', 'Saznajte o franšizi')}
              >
                <SafeLink href="/fransiza">Saznajte o franšizi</SafeLink>
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              💡 Saveto: Možete podeliti bilo koje pitanje sa prijateljima koristeći dugme "Podeli"
            </p>
          </motion.div>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}