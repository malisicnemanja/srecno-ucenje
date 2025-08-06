'use client'

import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'

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
  gradient = 'bg-brand-grass-soft'
}: HeroProps) {
  return (
    <section className={`c-hero-section ${gradient}`}>
      <div className="o-container">
        <div className="c-hero-section__content">
          <h1 className="u-h1 c-hero-section__title">
            {title}
          </h1>
          {subtitle && (
            <p className="c-hero-section__subtitle">
              {subtitle}
            </p>
          )}
          {(ctaText || secondaryCtaText) && (
            <div className="c-hero-section__actions">
              {ctaText && ctaLink && (
                <SafeLink                   href={ctaLink || '/'}
                  className="btn btn-hero-grass"
                >
                  {ctaText}
                </SafeLink>
              )}
              {secondaryCtaText && secondaryCtaLink && (
                <SafeLink                   href={secondaryCtaLink || '/'}
                  className="btn btn-card btn-card-arrow"
                >
                  {secondaryCtaText}
                </SafeLink>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}