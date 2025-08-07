'use client'

/**
 * TimelineSection - Prikazuje timeline/stepper sadržaj
 */

import React from 'react'
import { TimelineSectionProps } from '@/types/sections'
import { brandColors, getContrastColor } from '@/lib/color-rotation'

const TimelineSection: React.FC<TimelineSectionProps> = ({
  title,
  subtitle,
  steps = [],
  layout = 'vertical',
  showConnectors = true,
  backgroundColor = 'sky',
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

  // Status icon
  const getStatusIcon = (status?: 'completed' | 'active' | 'upcoming') => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )
      case 'active':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      default:
        return (
          <div className="w-3 h-3 rounded-full bg-current opacity-50" />
        )
    }
  }

  // Status classes
  const getStatusClasses = (status?: 'completed' | 'active' | 'upcoming') => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'active':
        return 'text-blue-600 bg-blue-100'
      case 'upcoming':
        return 'text-gray-400 bg-gray-100'
      default:
        return 'text-gray-500 bg-gray-100'
    }
  }

  if (!steps.length && !isPreview) {
    return null
  }

  return (
    <section 
      className={`
        section-timeline
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

        {/* Timeline Content */}
        {steps.length > 0 ? (
          <div className={`
            max-w-4xl mx-auto
            ${layout === 'horizontal' ? 'timeline-horizontal' : ''}
            ${layout === 'alternating' ? 'timeline-alternating' : ''}
          `}>
            {layout === 'vertical' && (
              <div className="relative">
                {/* Connector line */}
                {showConnectors && steps.length > 1 && (
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
                )}

                {/* Steps */}
                <div className="space-y-8">
                  {steps.map((step, index) => (
                    <div key={step.id} className="relative flex items-start">
                      {/* Step indicator */}
                      <div className={`
                        relative z-10 flex items-center justify-center
                        w-16 h-16 rounded-full flex-shrink-0
                        ${getStatusClasses(step.status)}
                      `}>
                        {step.icon ? (
                          <span className="text-2xl">{step.icon}</span>
                        ) : (
                          getStatusIcon(step.status)
                        )}
                      </div>

                      {/* Content */}
                      <div className="ml-6 flex-1 min-w-0">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                          {/* Date */}
                          {step.date && (
                            <div className="text-sm opacity-60 mb-2">
                              {step.date}
                            </div>
                          )}

                          {/* Title */}
                          <h3 className="text-xl font-semibold mb-3">
                            {step.title}
                          </h3>

                          {/* Description */}
                          <p className="opacity-80 leading-relaxed">
                            {step.description}
                          </p>

                          {/* Image */}
                          {step.image && (
                            <div className="mt-4">
                              <img
                                src={step.image}
                                alt={step.title}
                                className="w-full max-w-sm rounded-lg shadow-md"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {layout === 'horizontal' && (
              <div className="flex overflow-x-auto pb-4 space-x-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex-shrink-0 w-80">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 h-full">
                      {/* Step number */}
                      <div className={`
                        inline-flex items-center justify-center
                        w-8 h-8 rounded-full text-sm font-semibold mb-4
                        ${getStatusClasses(step.status)}
                      `}>
                        {index + 1}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold mb-3">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="opacity-80 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Connector */}
                    {showConnectors && index < steps.length - 1 && (
                      <div className="flex justify-center mt-4">
                        <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {layout === 'alternating' && (
              <div className="relative">
                {/* Central line */}
                {showConnectors && (
                  <div className="absolute left-1/2 transform -translate-x-0.5 top-0 bottom-0 w-0.5 bg-gray-200" />
                )}

                {/* Steps */}
                <div className="space-y-12">
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`
                        relative flex items-center
                        ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}
                      `}
                    >
                      {/* Content */}
                      <div className="w-5/12">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                          <h3 className="text-lg font-semibold mb-3">
                            {step.title}
                          </h3>
                          <p className="opacity-80 text-sm">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Center indicator */}
                      <div className="w-2/12 flex justify-center">
                        <div className={`
                          w-12 h-12 rounded-full flex items-center justify-center
                          ${getStatusClasses(step.status)}
                        `}>
                          {step.icon ? (
                            <span className="text-lg">{step.icon}</span>
                          ) : (
                            getStatusIcon(step.status)
                          )}
                        </div>
                      </div>

                      {/* Spacer */}
                      <div className="w-5/12" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Empty state for preview */
          isPreview && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-20">⏱️</div>
              <p className="text-lg opacity-60">
                Dodajte korake da biste videli timeline
              </p>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default TimelineSection