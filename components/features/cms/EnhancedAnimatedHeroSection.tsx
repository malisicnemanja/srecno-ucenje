'use client'

import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import { 
  AnimatedHeroText, 
  FloatingElement, 
  OptimizedCTAButton, 
  OptimizedPulseButton,
  StaggeredList 
} from '@/components/animations'

interface EnhancedHeroProps {
  title: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage?: any
  gradient?: string
  decorativeElements?: {
    icon: string
    color: string
    delay: number
  }[]
  urgent?: boolean
}

export default function EnhancedAnimatedHeroSection({ 
  title, 
  subtitle, 
  ctaText, 
  ctaLink, 
  secondaryCtaText, 
  secondaryCtaLink,
  gradient = 'from-blue-50 to-white',
  decorativeElements = [
    { icon: '☀️', color: 'bg-yellow-400', delay: 500 },
    { icon: '☁️', color: 'bg-blue-400', delay: 1000 },
    { icon: '🌱', color: 'bg-green-400', delay: 1500 }
  ],
  urgent = false
}: EnhancedHeroProps) {
  return (
    <section className={`relative bg-gradient-to-b ${gradient} py-20 overflow-hidden`}>
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="container mx-auto px-4 h-full relative">
          {decorativeElements.map((element, index) => (
            <FloatingElement 
              key={index}
              animation="gentle" 
              delay={element.delay}
              className={`absolute ${getElementPosition(index)}`}
            >
              <div className={`w-16 h-16 ${element.color} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                {element.icon}
              </div>
            </FloatingElement>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated hero title */}
          <div className="mb-6">
            <AnimatedHeroText 
              className="text-4xl md:text-5xl font-bold text-gray-900"
              brushStroke={true}
            >
              {title}
            </AnimatedHeroText>
          </div>

          {/* Animated subtitle */}
          {subtitle && (
            <div className="mb-8 opacity-0 animate-fade-in animate-delay-700">
              <p className="text-xl text-gray-600">
                {subtitle}
              </p>
            </div>
          )}

          {/* Animated CTA buttons */}
          {(ctaText || secondaryCtaText) && (
            <div className="opacity-0 animate-slide-up animate-delay-1000">
              <StaggeredList
                staggerDelay={200}
                animation="scaleIn"
                startDelay={1200}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                {ctaText && ctaLink && (
                  <SafeLink href={ctaLink || '/'}>
                    <OptimizedCTAButton
                      urgent={urgent}
                      className="min-w-[200px]"
                    >
                      {ctaText}
                    </OptimizedCTAButton>
                  </SafeLink>
                )}
                
                {secondaryCtaText && secondaryCtaLink && (
                  <SafeLink href={secondaryCtaLink || '/'}>
                    <OptimizedPulseButton
                      variant="secondary"
                      animation="pulse"
                      intensity="subtle"
                      className="min-w-[200px] bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50"
                    >
                      {secondaryCtaText}
                    </OptimizedPulseButton>
                  </SafeLink>
                )}
              </StaggeredList>
            </div>
          )}

          {/* Educational progress indicators */}
          <div className="mt-12 opacity-0 animate-fade-in animate-delay-1500">
            <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Preko 5000 zadovoljne dece</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animate-delay-200"></div>
                <span>98% uspešnost</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse animate-delay-300"></div>
                <span>Sertifikovani edukatori</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>
    </section>
  )
}

// Helper function to position floating elements
function getElementPosition(index: number): string {
  const positions = [
    'top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2',
    'top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2',
    'top-2/3 left-1/6 transform -translate-x-1/2 translate-y-1/2',
    'top-1/2 right-1/6 transform translate-x-1/2 -translate-y-1/2',
    'bottom-1/4 left-1/3 transform -translate-x-1/2 translate-y-1/2'
  ]
  
  return positions[index % positions.length]
}

// Specialized hero variants
export function EducationalHeroSection(props: Omit<EnhancedHeroProps, 'decorativeElements'>) {
  return (
    <EnhancedAnimatedHeroSection
      {...props}
      decorativeElements={[
        { icon: '📚', color: 'bg-blue-400', delay: 500 },
        { icon: '🎓', color: 'bg-green-400', delay: 1000 },
        { icon: '✨', color: 'bg-yellow-400', delay: 1500 },
        { icon: '🎨', color: 'bg-purple-400', delay: 2000 }
      ]}
    />
  )
}

export function FranchiseHeroSection(props: Omit<EnhancedHeroProps, 'decorativeElements'>) {
  return (
    <EnhancedAnimatedHeroSection
      {...props}
      decorativeElements={[
        { icon: '🏢', color: 'bg-blue-500', delay: 500 },
        { icon: '💼', color: 'bg-gray-600', delay: 1000 },
        { icon: '📈', color: 'bg-green-500', delay: 1500 },
        { icon: '🤝', color: 'bg-orange-400', delay: 2000 }
      ]}
      urgent={true}
    />
  )
}

export function ParentHeroSection(props: Omit<EnhancedHeroProps, 'decorativeElements'>) {
  return (
    <EnhancedAnimatedHeroSection
      {...props}
      decorativeElements={[
        { icon: '👨‍👩‍👧‍👦', color: 'bg-pink-400', delay: 500 },
        { icon: '❤️', color: 'bg-red-400', delay: 1000 },
        { icon: '🏠', color: 'bg-blue-400', delay: 1500 },
        { icon: '🌟', color: 'bg-yellow-400', delay: 2000 }
      ]}
    />
  )
}