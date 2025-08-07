'use client'

/**
 * PageBuilder - Glavni dinamički page builder
 * Renderuje stranicu na osnovu CMS sekcija sa color rotation
 */

import React, { useState, useCallback, useMemo } from 'react'
import { PageBuilderProps, SanitySection } from '@/types/sections'
import { processSections } from '@/lib/sanity/section-mapper'
import { useColorRotation } from '@/lib/color-rotation'
import SectionRenderer from './SectionRenderer'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import EmptyState from '@/components/ui/EmptyState'

// Analytics interface
interface PageAnalytics {
  pageType: string
  sectionsCount: number
  sectionsViewed: number
  sectionErrors: number
  loadTime: number
  userInteractions: number
}

/**
 * PageBuilder komponenta
 */
const PageBuilder: React.FC<PageBuilderProps> = ({
  sections: rawSections = [],
  pageType = 'franchise',
  isPreview = false,
  className = '',
}) => {
  // State management
  const [analytics, setAnalytics] = useState<PageAnalytics>({
    pageType,
    sectionsCount: rawSections.length,
    sectionsViewed: 0,
    sectionErrors: 0,
    loadTime: 0,
    userInteractions: 0,
  })
  
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})
  const [errors, setErrors] = useState<Record<string, any>>({})

  // Color rotation hook
  const colorRotation = useColorRotation(pageType)

  // Process sekcije sa validacijom i color rotation
  const sections = useMemo(() => {
    const startTime = performance.now()
    const processed = processSections(rawSections, pageType)
    const endTime = performance.now()
    
    setAnalytics(prev => ({
      ...prev,
      sectionsCount: processed.length,
      loadTime: endTime - startTime,
    }))

    return processed
  }, [rawSections, pageType])

  // Analytics handlers
  const handleSectionView = useCallback((sectionAnalytics: any) => {
    setAnalytics(prev => ({
      ...prev,
      sectionsViewed: prev.sectionsViewed + 1,
    }))

    // Send to analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', sectionAnalytics.trackingEvents.view, {
        section_id: sectionAnalytics.sectionId,
        section_type: sectionAnalytics.sectionType,
        section_index: sectionAnalytics.sectionIndex,
        page_type: pageType,
      })
    }
  }, [pageType])

  const handleSectionError = useCallback((errorData: any) => {
    setErrors(prev => ({
      ...prev,
      [errorData.sectionId]: errorData,
    }))

    setAnalytics(prev => ({
      ...prev,
      sectionErrors: prev.sectionErrors + 1,
    }))
  }, [])

  const handleSectionLoading = useCallback((sectionId: string, loading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [sectionId]: loading,
    }))
  }, [])

  // Loading state
  const isPageLoading = Object.values(loadingStates).some(Boolean)

  // Empty state
  if (!sections.length) {
    return (
      <div className={`page-builder page-builder--empty ${className}`}>
        <EmptyState
          icon="document"
          title="Nema sadržaja"
          description="Ova stranica trenutno nema definisane sekcije u CMS-u."
          action={isPreview ? {
            label: "Dodaj sekciju",
            href: "#",
            onClick: () => console.log('Add section clicked')
          } : undefined}
        />
      </div>
    )
  }

  // Error state (sve sekcije su neispravne)
  const allSectionsFailed = sections.length > 0 && 
    Object.keys(errors).length === sections.length

  if (allSectionsFailed) {
    return (
      <div className={`page-builder page-builder--error ${className}`}>
        <EmptyState
          icon="warning"
          title="Greška pri učitavanju"
          description="Došlo je do greške prilikom učitavanja sadržaja stranice."
          action={{
            label: "Osveži stranicu",
            href: "#",
            onClick: () => window.location.reload()
          }}
        />
      </div>
    )
  }

  return (
    <main 
      className={`
        page-builder 
        page-builder--${pageType}
        ${isPreview ? 'page-builder--preview' : ''}
        ${isPageLoading ? 'page-builder--loading' : ''}
        ${className}
      `}
      data-page-type={pageType}
      data-sections-count={sections.length}
      data-is-preview={isPreview}
    >
      {/* Loading indicator */}
      {isPageLoading && (
        <div className="page-builder__loading-indicator">
          <LoadingSpinner size="sm" />
          <span>Učitavam sadržaj...</span>
        </div>
      )}

      {/* Render sekcije */}
      <div className="page-builder__sections">
        {sections.map((section, index) => (
          <SectionRenderer
            key={section._id}
            section={section}
            index={index}
            pageType={pageType}
            isPreview={isPreview}
            onSectionView={handleSectionView}
            onSectionError={handleSectionError}
          />
        ))}
      </div>

      {/* Preview mode analytics */}
      {isPreview && process.env.NODE_ENV === 'development' && (
        <div className="page-builder__analytics">
          <details className="preview-analytics">
            <summary>Analytics Info</summary>
            <div className="analytics-data">
              <div className="analytics-grid">
                <div className="analytics-item">
                  <label>Page Type:</label>
                  <span>{analytics.pageType}</span>
                </div>
                <div className="analytics-item">
                  <label>Sections:</label>
                  <span>{analytics.sectionsCount}</span>
                </div>
                <div className="analytics-item">
                  <label>Viewed:</label>
                  <span>{analytics.sectionsViewed}</span>
                </div>
                <div className="analytics-item">
                  <label>Errors:</label>
                  <span className={analytics.sectionErrors > 0 ? 'error' : ''}>
                    {analytics.sectionErrors}
                  </span>
                </div>
                <div className="analytics-item">
                  <label>Load Time:</label>
                  <span>{analytics.loadTime.toFixed(2)}ms</span>
                </div>
              </div>

              {/* Color palette preview */}
              <div className="color-palette">
                <label>Color Rotation:</label>
                <div className="color-swatches">
                  {sections.map((section, index) => {
                    const color = colorRotation.getSectionColor(index)
                    return (
                      <div
                        key={section._id}
                        className="color-swatch"
                        style={{ backgroundColor: `var(--color-${color})` }}
                        title={`Section ${index}: ${section._type} (${color})`}
                      />
                    )
                  })}
                </div>
              </div>

              {/* Error details */}
              {Object.keys(errors).length > 0 && (
                <div className="error-details">
                  <label>Errors:</label>
                  <pre>{JSON.stringify(errors, null, 2)}</pre>
                </div>
              )}
            </div>
          </details>
        </div>
      )}

      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `${pageType} page`,
            description: `Srećno učenje ${pageType} page with ${sections.length} sections`,
            mainEntity: {
              '@type': 'Organization',
              name: 'Srećno učenje',
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: sections.map((section, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: section.title || `Section ${index + 1}`,
              })),
            },
          }),
        }}
      />
    </main>
  )
}

export default PageBuilder

// Hook za korišćenje PageBuilder-a
export const usePageBuilder = (sections: SanitySection[], pageType: PageBuilderProps['pageType']) => {
  const processedSections = useMemo(() => 
    processSections(sections, pageType), 
    [sections, pageType]
  )

  const colorRotation = useColorRotation(pageType || 'franchise')

  return {
    sections: processedSections,
    colorRotation,
    isEmpty: processedSections.length === 0,
  }
}