'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useSanityQuery } from '@/hooks/useSanity'
import { faqCategoriesQuery, faqsWithCategoriesQuery } from '@/lib/sanity.queries'
import { 
  ChevronDownIcon, SmileIcon, LightbulbIcon, SearchIcon,
  CheckIcon, CalendarIcon, ClipboardIcon, FolderIcon
} from 'lucide-react'
import { HappyStudents } from '@/components/illustrations/ChildIllustrations'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'

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

export default function FAQPage() {
  const { data: faqs, isLoading: faqsLoading } = useSanityQuery<FAQ[]>(faqsWithCategoriesQuery)
  const { data: cmsCategories, isLoading: categoriesLoading } = useSanityQuery<Category[]>(faqCategoriesQuery)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openItems, setOpenItems] = useState<string[]>([])
  const [allExpanded, setAllExpanded] = useState(false)

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

  // Toggle single FAQ
  const toggleFAQ = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
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
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pretražite pitanja..."
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
                  onClick={() => setSelectedCategory(category.id)}
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
                    onClick={() => toggleFAQ(faq._id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 rounded-xl"
                    aria-expanded={openItems.includes(faq._id)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openItems.includes(faq._id) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDownIcon className="text-accent-500" size={20} />
                    </motion.div>
                  </motion.button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: openItems.includes(faq._id) ? 'auto' : 0,
                      opacity: openItems.includes(faq._id) ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {faq.answer}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-4 py-2 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">
                          {faq.category?.icon && <span className="mr-2">{renderIcon(faq.category.icon)}</span>}
                          {faq.category?.name || 'Uncategorized'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
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
                <LightbulbIcon className="w-16 h-16 text-accent-400 mx-auto mb-6" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Nema rezultata pretrage</h3>
              <p className="text-gray-600 mb-6">
                Nema pitanja koja odgovaraju vašoj pretrazi. Pokušajte sa drugim ključnim rečima.
              </p>
              <motion.button
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                className="btn-accent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Poništi filtere
              </motion.button>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div 
            className="mt-16 bg-primary-100 rounded-2xl p-8 text-center border border-primary-200"
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
              <SmileIcon size={48} className="mx-auto mb-6 text-primary-500" />
            </motion.div>
            <h3 className="text-3xl font-bold mb-4 text-primary-700">
              Niste pronašli odgovor?
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              Naš tim je tu da vam pomogne sa svim dodatnim pitanjima o franšizi i programima
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SafeLink href="/zakazivanje" className="btn-primary">
                <CalendarIcon size={20} className="mr-2" />
                Zakažite konsultacije
              </SafeLink>
              <SafeLink href="/kontakt" className="btn-outline-primary">
                Kontaktirajte nas
              </SafeLink>
            </div>
          </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}