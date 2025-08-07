'use client'

/**
 * GallerySection - Image gallery sekcija
 */

import React, { useState } from 'react'
import { GallerySectionProps } from '@/types/sections'
import { brandColors, getContrastColor } from '@/lib/color-rotation'

const GallerySection: React.FC<GallerySectionProps> = ({
  title,
  subtitle,
  images = [],
  layout = 'grid',
  categories = [],
  filterable = false,
  backgroundColor = 'sky',
  spacing = 'lg',
  className = '',
  isPreview = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const bgColor = brandColors[backgroundColor]
  const textColor = getContrastColor(backgroundColor)

  // Filter images by category
  const filteredImages = images.filter(image => 
    !activeCategory || image.category === activeCategory
  )

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

  // Layout classes
  const getLayoutClasses = () => {
    switch (layout) {
      case 'grid': return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
      case 'masonry': return 'columns-2 md:columns-3 lg:columns-4 gap-4'
      case 'slider': return 'flex overflow-x-auto gap-4 pb-4'
      case 'lightbox': return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
      default: return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
    }
  }

  // Open lightbox
  const openLightbox = (index: number) => {
    if (layout === 'lightbox') {
      setLightboxIndex(index)
    }
  }

  // Navigate lightbox
  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxIndex === null) return
    
    if (direction === 'prev') {
      setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : filteredImages.length - 1)
    } else {
      setLightboxIndex(lightboxIndex < filteredImages.length - 1 ? lightboxIndex + 1 : 0)
    }
  }

  if (!images.length && !isPreview) {
    return null
  }

  return (
    <section 
      className={`
        section-gallery
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

        {/* Category Filter */}
        {filterable && categories.length > 0 && (
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
              Sve slike
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

        {/* Gallery */}
        {filteredImages.length > 0 ? (
          <div className={getLayoutClasses()}>
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className={`
                  group cursor-pointer overflow-hidden rounded-lg
                  ${layout === 'masonry' ? 'break-inside-avoid mb-4' : ''}
                  ${layout === 'slider' ? 'flex-shrink-0 w-80' : ''}
                  ${image.featured ? 'ring-2 ring-white/50' : ''}
                `}
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm5 6a2 2 0 104 0 2 2 0 00-4 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Featured badge */}
                  {image.featured && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-white/20 backdrop-blur-sm px-2 py-1 text-xs rounded-full">
                        ⭐
                      </span>
                    </div>
                  )}
                </div>

                {/* Caption */}
                {image.caption && (
                  <div className="p-3 bg-white/10 backdrop-blur-sm">
                    <p className="text-sm opacity-80">{image.caption}</p>
                    {image.category && (
                      <span className="inline-block mt-1 text-xs opacity-60">
                        {image.category}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-12">
            {images.length === 0 && isPreview ? (
              <>
                <div className="text-6xl mb-4 opacity-20">🖼️</div>
                <p className="text-lg opacity-60">
                  Dodajte slike da biste videli galeriju
                </p>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4 opacity-20">🔍</div>
                <p className="text-lg opacity-60">
                  Nema slika u kategoriji "{activeCategory}"
                </p>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="mt-4 btn btn-outline btn-sm"
                >
                  Prikaži sve slike
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && layout === 'lightbox' && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Image */}
            <img
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].alt}
              className="max-w-full max-h-full object-contain"
            />

            {/* Navigation */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={() => navigateLightbox('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 p-2"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={() => navigateLightbox('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 p-2"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </>
            )}

            {/* Caption */}
            {filteredImages[lightboxIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
                <p className="text-white text-center">
                  {filteredImages[lightboxIndex].caption}
                </p>
              </div>
            )}

            {/* Counter */}
            <div className="absolute top-4 left-4 text-white text-sm">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default GallerySection