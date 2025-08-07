'use client'

/**
 * UnknownSection - Fallback komponenta za nepoznate tipove sekcija
 */

import React from 'react'
import { BaseSectionProps } from '@/types/sections'

interface UnknownSectionProps extends BaseSectionProps {
  [key: string]: any
}

const UnknownSection: React.FC<UnknownSectionProps> = ({
  _id,
  _type,
  title,
  isPreview = false,
  ...props
}) => {
  return (
    <section className="section section--unknown bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          {/* Warning Icon */}
          <div className="text-gray-400 mb-6">
            <svg 
              className="w-16 h-16 mx-auto" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>

          {/* Content */}
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Nepoznat tip sekcije
          </h3>
          
          <p className="text-gray-600 mb-6">
            Sekcija tipa <code className="bg-gray-200 px-2 py-1 rounded text-sm">
              {_type}
            </code> nije podržana u trenutnoj verziji.
          </p>

          {/* Preview mode details */}
          {isPreview && process.env.NODE_ENV === 'development' && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-left">
              <h4 className="font-medium text-gray-900 mb-3">Debug Info:</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>ID:</strong> <code>{_id}</code>
                </div>
                <div>
                  <strong>Type:</strong> <code>{_type}</code>
                </div>
                {title && (
                  <div>
                    <strong>Title:</strong> {title}
                  </div>
                )}
                <div>
                  <strong>Available Props:</strong>
                  <pre className="bg-gray-100 p-2 rounded text-xs mt-1 overflow-auto max-h-32">
                    {JSON.stringify(Object.keys(props), null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Action button for preview mode */}
          {isPreview && (
            <div className="mt-6">
              <button
                onClick={() => {
                  console.log('Unknown section data:', { _id, _type, title, ...props })
                }}
                className="btn btn-outline btn-sm"
              >
                Log to Console
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default UnknownSection