'use client'

/**
 * SectionRenderer - Dinamičko renderovanje CMS sekcija
 * Koristi lazy loading, error boundaries i analytics tracking
 */

import React, { Suspense, useState, useCallback } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { 
  SanitySection, 
  SectionErrorBoundaryProps 
} from '@/types/sections'
import {
  getSectionComponent,
  processSection,
  getSectionAnalytics,
  getSectionPerformanceHints,
  handleSectionError,
  getDebugInfo,
} from '@/lib/sanity/section-mapper'
import { BrandColor, brandColors } from '@/lib/color-rotation'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

// Loading komponente za različite sekcije
const SectionLoadingFallback = ({ sectionType }: { sectionType: string }) => {
  const getSkeletonType = (type: string) => {
    switch (type) {
      case 'hero': return 'hero'
      case 'cardsGrid': return 'cards'
      case 'testimonials': return 'testimonials'
      case 'faq': return 'faq'
      case 'gallery': return 'gallery'
      case 'pricing': return 'pricing'
      default: return 'content'
    }
  }

  return (
    <div className="section-loading" data-section-type={sectionType}>
      <SkeletonLoader type={getSkeletonType(sectionType)} />
    </div>
  )
}

// Error fallback komponenta
const SectionErrorFallback = ({ 
  error, 
  resetErrorBoundary, 
  sectionType, 
  sectionId 
}: { 
  error: Error
  resetErrorBoundary: () => void
  sectionType: string
  sectionId: string
}) => {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = useCallback(async () => {
    setIsRetrying(true)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Kratka pauza
    resetErrorBoundary()
    setIsRetrying(false)
  }, [resetErrorBoundary])

  return (
    <section 
      className="section-error bg-red-50 border border-red-200 rounded-lg p-8 text-center"
      data-section-type={sectionType}
      data-section-id={sectionId}
    >
      <div className="max-w-md mx-auto">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Greška u učitavanju sekcije
        </h3>
        
        <p className="text-sm text-gray-600 mb-4">
          {process.env.NODE_ENV === 'development' ? (
            <>
              <strong>Tip:</strong> {sectionType}<br />
              <strong>ID:</strong> {sectionId}<br />
              <strong>Greška:</strong> {error.message}
            </>
          ) : (
            'Došlo je do greške prilikom učitavanja sadržaja. Molimo pokušajte ponovo.'
          )}
        </p>
        
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className="btn btn-primary btn-sm"
        >
          {isRetrying ? (
            <>
              <LoadingSpinner size="xs" />
              <span>Pokušavam ponovo...</span>
            </>
          ) : (
            'Pokušaj ponovo'
          )}
        </button>
      </div>
    </section>
  )
}

// Main SectionRenderer props
interface SectionRendererProps {
  section: SanitySection
  index: number
  pageType?: 'franchise' | 'education' | 'about' | 'calculator' | 'location'
  isPreview?: boolean
  onSectionView?: (analytics: any) => void
  onSectionError?: (error: any) => void
}

/**
 * SectionRenderer - renderuje pojedinačnu sekciju
 */
const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  index,
  pageType = 'franchise',
  isPreview = false,
  onSectionView,
  onSectionError,
}) => {
  const [hasViewed, setHasViewed] = useState(false)

  // Process sekciju sa color rotation
  const processedSection = processSection(section, index, pageType)
  
  // Dobij komponentu za renderovanje
  const SectionComponent = getSectionComponent(section._type)
  
  // Performance hints
  const performanceHints = getSectionPerformanceHints(section)
  
  // Analytics
  const analytics = getSectionAnalytics(section, index)
  
  // Debug info (development only)
  const debugInfo = getDebugInfo(section, index)

  // Error handler
  const handleError = useCallback((error: Error, errorInfo: any) => {
    const errorData = handleSectionError(error, section, index)
    onSectionError?.(errorData)
  }, [section, index, onSectionError])

  // Intersection Observer za analytics
  const sectionRef = useCallback((node: HTMLElement | null) => {
    if (!node || hasViewed) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasViewed(true)
            onSectionView?.(analytics)
            observer.unobserve(node)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    observer.observe(node)
    return () => observer.unobserve(node)
  }, [hasViewed, analytics, onSectionView])

  // CSS varijable za sekciju
  const sectionStyle = {
    '--section-color': brandColors[processedSection.sectionColor].hex,
    '--section-color-rgb': brandColors[processedSection.sectionColor].rgb,
    '--section-index': index,
  } as React.CSSProperties

  return (
    <div
      ref={sectionRef}
      className={`
        section-wrapper
        section-${section._type}
        ${processedSection.className || ''}
        ${isPreview ? 'section-preview' : ''}
      `}
      style={sectionStyle}
      data-section-id={section._id}
      data-section-type={section._type}
      data-section-index={index}
      data-section-color={processedSection.sectionColor}
      {...(debugInfo && { 'data-debug': JSON.stringify(debugInfo) })}
    >
      <ErrorBoundary
        FallbackComponent={(props) => (
          <SectionErrorFallback 
            {...props} 
            sectionType={section._type}
            sectionId={section._id}
          />
        )}
        onError={handleError}
        resetKeys={[section._id, section._type]}
      >
        <Suspense
          fallback={<SectionLoadingFallback sectionType={section._type} />}
        >
          <SectionComponent
            {...processedSection}
            isPreview={isPreview}
            sectionIndex={index}
          />
        </Suspense>
      </ErrorBoundary>

      {/* Preview mode controls */}
      {isPreview && process.env.NODE_ENV === 'development' && (
        <div className="section-preview-controls">
          <div className="preview-badge">
            <span className="preview-type">{section._type}</span>
            <span className="preview-color">{processedSection.sectionColor}</span>
            <span className="preview-index">#{index}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default SectionRenderer

// Export tipova
export type { SectionRendererProps }