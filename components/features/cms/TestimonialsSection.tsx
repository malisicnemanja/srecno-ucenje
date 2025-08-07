'use client'

/**
 * TestimonialsSection - Testimonials/reviews sekcija
 */

import React, { useState } from 'react'
import { TestimonialsSectionProps } from '@/types/sections'
import { brandColors, getContrastColor } from '@/lib/color-rotation'

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title,
  subtitle,
  testimonials = [],
  layout = 'slider',
  showRatings = true,
  backgroundColor = 'heart',
  spacing = 'lg',
  className = '',
  isPreview = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const bgColor = brandColors[backgroundColor]
  const textColor = getContrastColor(backgroundColor)

  // Star rating component
  const StarRating = ({ rating }: { rating?: number }) => {
    if (!showRatings || !rating) return null

    return (
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm opacity-70">({rating}/5)</span>
      </div>
    )
  }

  // Testimonial card component
  const TestimonialCard = ({ 
    testimonial, 
    featured = false 
  }: { 
    testimonial: any
    featured?: boolean 
  }) => (
    <div
      className={`
        bg-white/10 backdrop-blur-sm rounded-xl p-6 h-full
        ${featured ? 'ring-2 ring-white/30 scale-105' : ''}
      `}
    >
      {/* Quote icon */}
      <div className="mb-4">
        <svg className="w-8 h-8 text-white/30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>
      </div>

      {/* Rating */}
      <StarRating rating={testimonial.rating} />

      {/* Content */}
      <blockquote className="text-lg mb-6 leading-relaxed">
        "{testimonial.content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center">
        {testimonial.author.avatar && (
          <img
            src={testimonial.author.avatar}
            alt={testimonial.author.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        )}
        
        <div className="flex-1">
          <div className="font-semibold">
            {testimonial.author.name}
            {testimonial.verified && (
              <span className="ml-2 text-green-400" title="Verifikovano">
                ✓
              </span>
            )}
          </div>
          
          {testimonial.author.role && (
            <div className="text-sm opacity-70">
              {testimonial.author.role}
              {testimonial.author.company && (
                <span> • {testimonial.author.company}</span>
              )}
            </div>
          )}
          
          {testimonial.location && (
            <div className="text-xs opacity-50 mt-1">
              📍 {testimonial.location}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Navigate slider
  const navigateSlider = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveIndex(activeIndex > 0 ? activeIndex - 1 : testimonials.length - 1)
    } else {
      setActiveIndex(activeIndex < testimonials.length - 1 ? activeIndex + 1 : 0)
    }
  }

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

  if (!testimonials.length && !isPreview) {
    return null
  }

  return (
    <section 
      className={`
        section-testimonials
        ${getSpacingClasses()}
        ${className}
        relative overflow-hidden
      `}
      style={{
        backgroundColor: bgColor.hex,
        color: textColor === 'white' ? '#ffffff' : '#1E293B',
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
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

        {/* Testimonials */}
        {testimonials.length > 0 ? (
          <>
            {/* Slider Layout */}
            {layout === 'slider' && (
              <div className="relative max-w-4xl mx-auto">
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ 
                      transform: `translateX(-${activeIndex * 100}%)` 
                    }}
                  >
                    {testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                        <TestimonialCard testimonial={testimonial} featured />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                {testimonials.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateSlider('prev')}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>

                    <button
                      onClick={() => navigateSlider('next')}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center mt-8 space-x-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveIndex(index)}
                          className={`
                            w-3 h-3 rounded-full transition-colors
                            ${index === activeIndex 
                              ? 'bg-white' 
                              : 'bg-white/30 hover:bg-white/50'
                            }
                          `}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Grid Layout */}
            {layout === 'grid' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
            )}

            {/* Single Featured Layout */}
            {layout === 'single-featured' && (
              <div className="max-w-4xl mx-auto">
                {/* Main featured testimonial */}
                <div className="mb-8">
                  <TestimonialCard 
                    testimonial={testimonials[activeIndex]} 
                    featured 
                  />
                </div>

                {/* Thumbnails */}
                {testimonials.length > 1 && (
                  <div className="flex justify-center space-x-4">
                    {testimonials.map((testimonial, index) => (
                      <button
                        key={testimonial.id}
                        onClick={() => setActiveIndex(index)}
                        className={`
                          flex items-center p-3 rounded-lg transition-all
                          ${index === activeIndex 
                            ? 'bg-white/20 scale-105' 
                            : 'bg-white/10 hover:bg-white/15'
                          }
                        `}
                      >
                        {testimonial.author.avatar ? (
                          <img
                            src={testimonial.author.avatar}
                            alt={testimonial.author.name}
                            className="w-8 h-8 rounded-full object-cover mr-2"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-white/20 rounded-full mr-2" />
                        )}
                        <span className="text-sm font-medium">
                          {testimonial.author.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          /* Empty state for preview */
          isPreview && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-20">💬</div>
              <p className="text-lg opacity-60">
                Dodajte testimoniale da biste videli prikaz
              </p>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default TestimonialsSection