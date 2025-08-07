'use client'

import React, { useState, useEffect } from 'react'
import { runAccessibilityAudit } from '@/lib/accessibility'

interface AuditResults {
  score: number
  colorContrast: any
  headingHierarchy: any
  imageAccessibility: any
  touchTargets: HTMLElement[]
  formAccessibility: any[]
  recommendations: string[]
}

const AccessibilityAudit: React.FC = () => {
  const [auditResults, setAuditResults] = useState<AuditResults | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const runAudit = async () => {
    if (typeof window === 'undefined') return
    
    setIsRunning(true)
    try {
      // Small delay to ensure DOM is ready
      await new Promise(resolve => setTimeout(resolve, 1000))
      const results = runAccessibilityAudit(document.body)
      setAuditResults(results)
    } catch (error) {
      console.error('Accessibility audit failed:', error)
    } finally {
      setIsRunning(false)
    }
  }

  useEffect(() => {
    // Run audit automatically when component mounts (in development only)
    if (process.env.NODE_ENV === 'development') {
      runAudit()
    }
  }, [])

  // Don't render in production unless explicitly enabled
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_ENABLE_A11Y_AUDIT) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 z-[9999] max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">
            Pristupačnost
          </h3>
          <button
            onClick={runAudit}
            disabled={isRunning}
            className="text-xs px-2 py-1 bg-brand-grass text-white rounded hover:bg-opacity-90 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-brand-sun focus:ring-offset-1 min-h-[32px]"
            aria-label="Pokreni audit pristupačnosti"
          >
            {isRunning ? '...' : '🔍'}
          </button>
        </div>

        {auditResults && (
          <>
            {/* Score Display */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">Ocena:</span>
                <span 
                  className={`text-sm font-bold ${
                    auditResults.score >= 90 ? 'text-green-600' :
                    auditResults.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}
                >
                  {auditResults.score}/100
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    auditResults.score >= 90 ? 'bg-green-600' :
                    auditResults.score >= 70 ? 'bg-yellow-600' : 'bg-red-600'
                  }`}
                  style={{ width: `${auditResults.score}%` }}
                  role="progressbar"
                  aria-valuenow={auditResults.score}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`Ocena pristupačnosti: ${auditResults.score} od 100`}
                ></div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-bold text-brand-grass">
                  {auditResults.colorContrast.passing.length}
                </div>
                <div className="text-gray-600">Kontrast OK</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-bold text-brand-heart">
                  {auditResults.touchTargets.length}
                </div>
                <div className="text-gray-600">Mala dugmad</div>
              </div>
            </div>

            {/* Recommendations */}
            {auditResults.recommendations.length > 0 && (
              <div className="mb-3">
                <div className="text-xs font-semibold text-gray-900 mb-1">
                  Preporuke:
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  {auditResults.recommendations.slice(0, 3).map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-500 mr-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                  {auditResults.recommendations.length > 3 && (
                    <li className="text-gray-500 italic">
                      +{auditResults.recommendations.length - 3} više...
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Toggle Details Button */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-sun focus:ring-offset-1 min-h-[32px]"
              aria-expanded={showDetails}
              aria-label={showDetails ? 'Sakrij detalje' : 'Prikaži detalje'}
            >
              {showDetails ? 'Sakrij detalje' : 'Prikaži detalje'}
            </button>
          </>
        )}

        {/* Detailed Results */}
        {showDetails && auditResults && (
          <div className="mt-3 pt-3 border-t border-gray-200 text-xs">
            <div className="space-y-2">
              {/* Heading Hierarchy */}
              <div>
                <div className="font-semibold mb-1">Hijerarhija zaglavlja:</div>
                <div className={`text-xs ${auditResults.headingHierarchy.valid ? 'text-green-600' : 'text-red-600'}`}>
                  {auditResults.headingHierarchy.valid ? '✓ Ispravna' : '✗ Problemi'}
                </div>
                {auditResults.headingHierarchy.issues.length > 0 && (
                  <ul className="text-red-600 text-xs mt-1 space-y-1">
                    {auditResults.headingHierarchy.issues.map((issue: string, index: number) => (
                      <li key={index}>• {issue}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Image Accessibility */}
              <div>
                <div className="font-semibold mb-1">Pristupačnost slika:</div>
                <div className={`text-xs ${auditResults.imageAccessibility.valid ? 'text-green-600' : 'text-red-600'}`}>
                  {auditResults.imageAccessibility.valid ? '✓ Sve slike imaju alt tekst' : '✗ Nedostaju alt tekstovi'}
                </div>
              </div>

              {/* Form Accessibility */}
              {auditResults.formAccessibility.length > 0 && (
                <div>
                  <div className="font-semibold mb-1">Forme:</div>
                  {auditResults.formAccessibility.map((form, index) => (
                    <div key={index} className={`text-xs ${form.validation.valid ? 'text-green-600' : 'text-red-600'}`}>
                      {form.validation.valid ? '✓' : '✗'} Forma {index + 1}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isRunning && (
          <div className="text-center py-4">
            <div className="inline-flex items-center text-xs text-gray-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-grass mr-2"></div>
              Analiza pristupačnosti...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccessibilityAudit