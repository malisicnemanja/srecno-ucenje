'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, HelpCircle } from 'lucide-react'
import { sanityFetch } from '@/lib/sanity.client'
import { faqsWithCategoriesQuery, faqCategoriesQuery } from '@/lib/sanity.queries'

export default function FAQPageClient() {
  const [faqs, setFaqs] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [faqsData, categoriesData] = await Promise.all([
          sanityFetch({ query: faqsWithCategoriesQuery }),
          sanityFetch({ query: faqCategoriesQuery })
        ])
        setFaqs(faqsData || defaultFaqs)
        setCategories(categoriesData || defaultCategories)
      } catch (error) {
        console.error('Error fetching FAQ data:', error)
        // Use fallback data
        setFaqs(defaultFaqs)
        setCategories(defaultCategories)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Default FAQ data if CMS is not available
  const defaultFaqs = [
    {
      _id: '1',
      question: 'Koliko košta pokretanje franšize Srećno učenje?',
      answer: 'Cene se kreću od 999€ za Starter paket do 3.499€ za Premium paket. Svaki paket uključuje obuku, materijale i podršku prilagođenu vašim potrebama.',
      category: { _id: 'cat-franchise', name: 'Franšiza', color: 'sky' },
      featured: true
    },
    {
      _id: '2',
      question: 'Koliko traje obuka za franšizante?',
      answer: 'Obuka traje od 20 do 60 sati, zavisno od odabranog paketa. Uključuje teorijski i praktični deo, sa kontinuiranom podrškom nakon završetka.',
      category: { _id: 'cat-franchise', name: 'Franšiza', color: 'grass' },
      featured: true
    },
    {
      _id: '3',
      question: 'Da li je potrebno pedagoško obrazovanje?',
      answer: 'Nije neophodno, ali je poželjno. Naša obuka pokriva sve potrebne pedagoške aspekte. Važnije su motivacija, komunikativnost i ljubav prema radu sa decom.',
      category: { _id: 'cat-general', name: 'Opšte', color: 'sun' },
      featured: true
    },
    {
      _id: '4',
      question: 'Koliko dece mogu da primim u grupu?',
      answer: 'Preporučujemo grupe od 6-8 dece za optimalne rezultate. To omogućava individualni pristup svakom detetu uz održavanje grupne dinamike.',
      category: { _id: 'cat-general', name: 'Opšte', color: 'heart' },
      featured: false
    },
    {
      _id: '5',
      question: 'Da li mogu da kombinujem sa drugim poslom?',
      answer: 'Apsolutno! Mnogi naši franšizanti vode franšizu kao dodatnu delatnost. Fleksibilnost je jedna od glavnih prednosti našeg modela.',
      category: { _id: 'cat-franchise', name: 'Franšiza', color: 'grass' },
      featured: false
    },
    {
      _id: '6',
      question: 'Kakvu podršku pružate tokom rada?',
      answer: 'Nudimo kontinuiranu podršku kroz mesečne konsultacije, dopunska obučavanja, marketing materijale i direktnu komunikaciju sa timom.',
      category: { _id: 'cat-franchise', name: 'Franšiza', color: 'sky' },
      featured: false
    }
  ]

  const defaultCategories = [
    { _id: 'cat-general', name: 'Opšte informacije', color: 'sky' },
    { _id: 'cat-franchise', name: 'Franšiza', color: 'grass' },
    { _id: 'cat-programs', name: 'Programi', color: 'sun' }
  ]

  // Filter FAQs based on category and search term
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = !activeCategory || faq.category?._id === activeCategory
    const matchesSearch = !searchTerm || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded mx-auto mb-4 w-96 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded mx-auto mb-8 w-64 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded mx-auto w-80 animate-pulse"></div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-20 bg-gray-200 rounded-xl animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-6">
              <HelpCircle size={32} className="text-sky-600" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Česta pitanja
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Pronađite odgovore na najčešća pitanja o franšizi Srećno učenje
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Pretragujte pitanja..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                !activeCategory 
                  ? 'bg-sky-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Sva pitanja
            </button>
            {categories.map(category => (
              <button
                key={category._id}
                onClick={() => setActiveCategory(category._id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeCategory === category._id
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Nema rezultata pretrage
                </h3>
                <p className="text-gray-500">
                  Pokušajte sa drugačijim pojmovima ili izaberite drugu kategoriju
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map(faq => (
                  <motion.div
                    key={faq._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === faq._id ? null : faq._id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {faq.featured && (
                          <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                        )}
                        <span className="font-semibold text-gray-900">
                          {faq.question}
                        </span>
                        {faq.category && (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            faq.category.color === 'sky' ? 'bg-sky-100 text-sky-700' :
                            faq.category.color === 'grass' ? 'bg-green-100 text-green-700' :
                            faq.category.color === 'sun' ? 'bg-yellow-100 text-yellow-700' :
                            faq.category.color === 'heart' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {faq.category.name}
                          </span>
                        )}
                      </div>
                      <motion.div
                        animate={{ rotate: openFaq === faq._id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={20} className="text-gray-400" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {openFaq === faq._id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-200"
                        >
                          <div className="px-6 py-4">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-sky-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">
              Nemate odgovor na vaše pitanje?
            </h2>
            <p className="text-xl text-sky-100 mb-8">
              Kontaktirajte nas direktno i naš tim će vam rado pomoći
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/kontakt"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-sky-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Kontaktirajte nas
              </a>
              <a
                href="/zakazivanje"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-sky-600 transition-colors"
              >
                Zakazujte konsultacije
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}