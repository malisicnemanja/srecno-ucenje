'use client'

/**
 * ContentSection - Rich text content sekcija
 */

import React from 'react'
import { PortableText } from '@portabletext/react'
import { ContentSectionProps } from '@/types/sections'
import { brandColors, getContrastColor } from '@/lib/color-rotation'
import { SimplePortableTextRenderer, portableTextComponents } from './PortableTextComponents'

// Portable Text renderer with proper handling
const PortableTextRenderer: React.FC<{ content: any }> = ({ content }) => {
  if (!content) {
    return null
  }
  
  // If content has _type or is an array of blocks, use full PortableText
  if (Array.isArray(content) || (content._type && content._type !== 'string')) {
    return (
      <PortableText 
        value={content}
        components={portableTextComponents}
      />
    )
  }
  
  // Fallback to simple renderer
  return <SimplePortableTextRenderer content={content} />
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  subtitle,
  content,
  layout = 'single-column',
  sidebar,
  backgroundColor = 'night',
  spacing = 'lg',
  className = '',
  isPreview = false,
}) => {
  const bgColor = brandColors[backgroundColor]
  const textColor = getContrastColor(backgroundColor)

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
      case 'single-column': return 'max-w-4xl mx-auto'
      case 'two-column': return 'grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto'
      case 'sidebar-left': return 'grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto'
      case 'sidebar-right': return 'grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto'
      default: return 'max-w-4xl mx-auto'
    }
  }

  if (!content && !isPreview) {
    return null
  }

  return (
    <section 
      className={`
        section-content
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

        {/* Content Layout */}
        <div className={getLayoutClasses()}>
          {/* Sidebar Left */}
          {layout === 'sidebar-left' && sidebar && (
            <aside className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 sticky top-8">
                {sidebar.title && (
                  <h3 className="text-lg font-semibold mb-4">
                    {sidebar.title}
                  </h3>
                )}
                
                {sidebar.content && (
                  <div className="prose prose-sm prose-invert max-w-none mb-6">
                    <PortableTextRenderer content={sidebar.content} />
                  </div>
                )}

                {/* Sidebar Widgets */}
                {sidebar.widgets && sidebar.widgets.map((widget, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    {widget.type === 'toc' && (
                      <div>
                        <h4 className="font-medium mb-3">Sadržaj</h4>
                        <nav className="space-y-2 text-sm">
                          {/* TOC implementacija */}
                        </nav>
                      </div>
                    )}
                    
                    {widget.type === 'cta' && (
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <p className="text-sm mb-3">Potrebna vam je pomoć?</p>
                        <button className="btn btn-primary btn-sm">
                          Kontaktiraj nas
                        </button>
                      </div>
                    )}
                    
                    {widget.type === 'social' && (
                      <div>
                        <h4 className="font-medium mb-3">Podeli</h4>
                        <div className="flex space-x-3">
                          <button className="p-2 bg-white/10 rounded">📱</button>
                          <button className="p-2 bg-white/10 rounded">📧</button>
                          <button className="p-2 bg-white/10 rounded">🔗</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main className={`
            ${layout === 'sidebar-left' || layout === 'sidebar-right' ? 'lg:col-span-2' : ''}
          `}>
            {content ? (
              <div className={`
                prose max-w-none
                ${textColor === 'white' ? 'prose-invert' : 'prose-gray'}
                prose-lg prose-headings:font-bold
                prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-current prose-code:text-current
                prose-pre:bg-white/10 prose-pre:backdrop-blur-sm
                prose-blockquote:border-l-white/30 prose-blockquote:text-white/80
              `}>
                <PortableTextRenderer content={content} />
              </div>
            ) : (
              isPreview && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-20">📄</div>
                  <p className="text-lg opacity-60">
                    Dodajte sadržaj da biste videli prikaz
                  </p>
                </div>
              )
            )}
          </main>

          {/* Sidebar Right */}
          {layout === 'sidebar-right' && sidebar && (
            <aside className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 sticky top-8">
                {sidebar.title && (
                  <h3 className="text-lg font-semibold mb-4">
                    {sidebar.title}
                  </h3>
                )}
                
                {sidebar.content && (
                  <div className="prose prose-sm prose-invert max-w-none">
                    <PortableTextRenderer content={sidebar.content} />
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>

        {/* Two Column Layout */}
        {layout === 'two-column' && Array.isArray(content) && (
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="prose prose-invert max-w-none">
              <PortableTextRenderer content={content[0]} />
            </div>
            <div className="prose prose-invert max-w-none">
              <PortableTextRenderer content={content[1]} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ContentSection