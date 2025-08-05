'use client'

import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage?: any
  gradient?: string
}

export default function HeroSection({ 
  title, 
  subtitle, 
  ctaText, 
  ctaLink, 
  secondaryCtaText, 
  secondaryCtaLink,
  gradient = 'from-primary-50 to-white'
}: HeroProps) {
  return (
    <section className={`relative bg-gradient-to-b ${gradient} py-12 sm:py-16 md:py-20`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-night-900">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg sm:text-xl text-night-600 mb-6 sm:mb-8">
              {subtitle}
            </p>
          )}
          {(ctaText || secondaryCtaText) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {ctaText && ctaLink && (
                <Link
                  href={ctaLink}
                  className="bg-grass-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-grass-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                >
                  {ctaText}
                </Link>
              )}
              {secondaryCtaText && secondaryCtaLink && (
                <Link
                  href={secondaryCtaLink}
                  className="bg-white text-grass-600 border-2 border-grass-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-grass-50 transition-colors"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}