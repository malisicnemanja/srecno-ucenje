'use client'

import React from 'react'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import Image from 'next/image'
import { AnimatedTitle, PulseButton } from '@/components/animations'
import ShareButtons from './ShareButtons'
import { ChevronLeft, Users, Book, Star, Sparkles, BookOpen, ShoppingCart } from 'lucide-react'

export default function BookClient({ book, relatedBooks, bookUrl }: any) {
  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-secondary-50">
      {/* Hero Section with Book Cover */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${
          book.colorTheme === 'green' ? 'from-green-100 via-green-50 to-yellow-50' :
          book.colorTheme === 'yellow' ? 'from-yellow-100 via-yellow-50 to-orange-50' :
          book.colorTheme === 'orange' ? 'from-orange-100 via-orange-50 to-red-50' :
          book.colorTheme === 'blue' ? 'from-blue-100 via-blue-50 to-cyan-50' :
          'from-primary-100 via-secondary-50 to-warm-50'
        } opacity-50`} />
        
        <div className="container mx-auto px-4 relative z-10">
          <SafeLink 
            href="/knjige"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Nazad na sve knjige</span>
          </SafeLink>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <div className="relative">
              <div className="relative mx-auto max-w-md">
                {book.coverImage?.asset?.url && (
                  <Image
                    src={book.coverImage.asset.url}
                    alt={book.coverImage?.alt || book.title}
                    width={400}
                    height={600}
                    className="rounded-2xl shadow-2xl"
                    priority
                  />
                )}
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-300 rounded-full opacity-20 blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-300 rounded-full opacity-20 blur-xl" />
              </div>
            </div>

            {/* Book Info */}
            <div>
              <AnimatedTitle 
                text={book.title}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
              />
              
              {book.subtitle && (
                <p className="text-xl text-gray-600 mb-6">
                  {book.subtitle}
                </p>
              )}

              {book.heroText && (
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {book.heroText}
                </p>
              )}

              {/* Meta info */}
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                  📚 {book.pageCount || 48} stranica
                </span>
                <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                  👥 Uzrast {book.ageRange || '5-12 godina'}
                </span>
                <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                  📅 {book.year}
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <PulseButton 
                  variant="accent"
                  size="lg"
                  intensity="medium"
                  className="bg-white text-gray-900 hover:bg-gray-100"
                  onClick={() => handleScrollToSection('about-book')}
                >
                  Saznajte više
                </PulseButton>
                
                {book.purchaseLinks && book.purchaseLinks.length > 0 && (
                  <PulseButton 
                    variant="secondary"
                    size="lg"
                    intensity="subtle"
                    className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900"
                    onClick={() => handleScrollToSection('purchase')}
                  >
                    Kupite knjigu
                  </PulseButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the content... */}
      {/* Add other sections here */}

      {/* Share Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Podelite ovu knjigu:</h3>
            <ShareButtons url={bookUrl} title={book.title} />
          </div>
        </div>
      </section>
    </div>
  )
}