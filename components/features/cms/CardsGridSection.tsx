'use client'

/**
 * CardsGridSection - Prikazuje kartice u grid formatu
 */

import React from 'react'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import { CardsGridSectionProps } from '@/types/sections'
import { brandColors, getContrastColor } from '@/lib/color-rotation'

const CardsGridSection: React.FC<CardsGridSectionProps> = ({
  title,
  subtitle,
  cards = [],
  layout = 'grid-3',
  cardStyle = 'elevated',
  backgroundColor = 'sky',
  spacing = 'lg',
  className = '',
  isPreview = false,
}) => {
  const bgColor = brandColors[backgroundColor]
  const textColor = getContrastColor(backgroundColor)

  // Grid classes based on layout
  const getGridClasses = () => {
    switch (layout) {
      case 'grid-2': return 'grid-cols-1 md:grid-cols-2'
      case 'grid-3': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case 'grid-4': return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      case 'masonry': return 'columns-1 md:columns-2 lg:columns-3'
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }
  }

  // Card style classes
  const getCardClasses = () => {
    const baseClasses = 'card transition-all duration-300'
    
    switch (cardStyle) {
      case 'elevated':
        return `${baseClasses} bg-white shadow-lg hover:shadow-xl rounded-xl`
      case 'outlined':
        return `${baseClasses} bg-white border-2 hover:border-gray-300 rounded-xl`
      case 'minimal':
        return `${baseClasses} bg-transparent hover:bg-white/10 rounded-lg`
      case 'gradient':
        return `${baseClasses} bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl`
      default:
        return `${baseClasses} bg-white shadow-lg hover:shadow-xl rounded-xl`
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

  if (!cards.length && !isPreview) {
    return null
  }

  return (
    <section 
      className={`
        section-cards-grid
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

        {/* Cards Grid */}
        {cards.length > 0 ? (
          <div className={`
            ${layout === 'masonry' ? '' : `grid ${getGridClasses()} gap-6`}
            ${layout === 'masonry' ? 'gap-6' : ''}
          `}>
            {cards.map((card) => (
              <div
                key={card.id}
                className={`
                  ${getCardClasses()}
                  ${layout === 'masonry' ? 'break-inside-avoid mb-6' : ''}
                  group
                `}
              >
                {/* Card Image */}
                {card.image && (
                  <div className="aspect-video overflow-hidden rounded-t-xl">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6">
                  {/* Badge */}
                  {card.badge && (
                    <div className="mb-3">
                      <span className={`
                        inline-block px-3 py-1 text-xs font-semibold rounded-full
                        bg-${backgroundColor}-100 text-${backgroundColor}-800
                      `}>
                        {card.badge}
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  {card.icon && !card.image && (
                    <div className="mb-4">
                      <div className={`
                        w-12 h-12 rounded-lg flex items-center justify-center
                        bg-${backgroundColor}-100
                      `}>
                        <span className="text-2xl">{card.icon}</span>
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {card.description}
                  </p>

                  {/* Tags */}
                  {card.tags && card.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {card.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    {/* Price */}
                    {card.price && (
                      <div className="text-lg font-semibold text-primary">
                        {card.price}
                      </div>
                    )}

                    {/* Link */}
                    {card.href && (
                      <SafeLink
                        href={card.href}
                        className="btn btn-primary btn-sm"
                      >
                        Saznaj više
                      </SafeLink>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state for preview */
          isPreview && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-20">🎯</div>
              <p className="text-lg opacity-60">
                Dodajte kartice da biste videli prikaz
              </p>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default CardsGridSection