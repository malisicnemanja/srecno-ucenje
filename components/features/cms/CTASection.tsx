'use client'

/**
 * CTASection - Call to Action sekcija
 */

import React from 'react'
import SafeLink from '@/components/common/SafeLink'
import { CTASectionProps } from '@/types/sections'
import { brandColors, getContrastColor } from '@/lib/color-rotation'

const CTASection: React.FC<CTASectionProps> = ({
  title,
  subtitle,
  description,
  buttons = [],
  visual,
  layout = 'centered',
  urgency,
  backgroundColor = 'heart',
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

  // Button classes
  const getButtonClasses = (variant: 'primary' | 'secondary' | 'outline' | 'ghost') => {
    const baseClasses = 'btn transition-all duration-300'
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} btn-white bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl`
      case 'secondary':
        return `${baseClasses} btn-outline border-white/30 text-white hover:bg-white/10`
      case 'outline':
        return `${baseClasses} btn-outline border-white text-white hover:bg-white hover:text-gray-900`
      case 'ghost':
        return `${baseClasses} text-white hover:bg-white/10`
      default:
        return `${baseClasses} btn-white`
    }
  }

  return (
    <section 
      className={`
        section-cta
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
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {layout === 'centered' && (
          <div className="text-center max-w-4xl mx-auto">
            {/* Urgency banner */}
            {urgency?.enabled && urgency.text && (
              <div className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                <span className="text-sm font-medium">
                  ⚡ {urgency.text}
                </span>
              </div>
            )}

            {/* Visual */}
            {visual && (
              <div className="mb-8">
                {visual.type === 'icon' && (
                  <div className="text-6xl mb-4">
                    {visual.src}
                  </div>
                )}
                {visual.type === 'image' && (
                  <img
                    src={visual.src}
                    alt={visual.alt || title}
                    className="mx-auto max-w-sm rounded-lg shadow-lg"
                  />
                )}
              </div>
            )}

            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {title}
            </h2>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-xl md:text-2xl mb-6 opacity-90">
                {subtitle}
              </p>
            )}

            {/* Description */}
            {description && (
              <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            )}

            {/* Buttons */}
            {buttons.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {buttons.map((button, index) => (
                  <SafeLink
                    key={index}
                    href={button.href}
                    className={`
                      ${getButtonClasses(button.variant)}
                      ${button.size === 'sm' ? 'btn-sm' : ''}
                      ${button.size === 'lg' ? 'btn-lg' : ''}
                    `}
                  >
                    {button.icon && (
                      <span className="mr-2">{button.icon}</span>
                    )}
                    {button.text}
                  </SafeLink>
                ))}
              </div>
            )}
          </div>
        )}

        {layout === 'split' && (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {title}
              </h2>

              {/* Subtitle */}
              {subtitle && (
                <p className="text-xl mb-4 opacity-90">
                  {subtitle}
                </p>
              )}

              {/* Description */}
              {description && (
                <p className="text-lg mb-8 opacity-80 leading-relaxed">
                  {description}
                </p>
              )}

              {/* Buttons */}
              {buttons.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4">
                  {buttons.map((button, index) => (
                    <SafeLink
                      key={index}
                      href={button.href}
                      className={getButtonClasses(button.variant)}
                    >
                      {button.icon && (
                        <span className="mr-2">{button.icon}</span>
                      )}
                      {button.text}
                    </SafeLink>
                  ))}
                </div>
              )}
            </div>

            {/* Visual */}
            {visual && (
              <div className="text-center lg:text-right">
                {visual.type === 'image' && (
                  <img
                    src={visual.src}
                    alt={visual.alt || title}
                    className="max-w-full rounded-lg shadow-lg"
                  />
                )}
                {visual.type === 'illustration' && (
                  <div className="text-8xl opacity-20">
                    {visual.src}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {layout === 'banner' && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {title}
              </h2>
              {subtitle && (
                <p className="opacity-90">
                  {subtitle}
                </p>
              )}
            </div>

            {buttons.length > 0 && (
              <div className="flex gap-4 flex-shrink-0">
                {buttons.map((button, index) => (
                  <SafeLink
                    key={index}
                    href={button.href}
                    className={getButtonClasses(button.variant)}
                  >
                    {button.text}
                  </SafeLink>
                ))}
              </div>
            )}
          </div>
        )}

        {layout === 'card' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center shadow-2xl">
              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {title}
              </h2>

              {/* Description */}
              {description && (
                <p className="mb-6 opacity-80">
                  {description}
                </p>
              )}

              {/* Buttons */}
              {buttons.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {buttons.map((button, index) => (
                    <SafeLink
                      key={index}
                      href={button.href}
                      className={getButtonClasses(button.variant)}
                    >
                      {button.text}
                    </SafeLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Countdown timer for urgency */}
        {urgency?.enabled && urgency.countdown && (
          <div className="text-center mt-8">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="text-sm opacity-80 mb-1">Ponuda ističe za:</div>
              <div className="text-2xl font-mono font-bold">
                {urgency.countdown}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CTASection