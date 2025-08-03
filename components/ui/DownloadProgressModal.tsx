'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DownloadProgressModalProps {
  isOpen: boolean
  onClose: () => void
  fileName: string
  progress: number
  speed?: string
  remainingTime?: string
  error?: string
}

export default function DownloadProgressModal({
  isOpen,
  onClose,
  fileName,
  progress,
  speed,
  remainingTime,
  error
}: DownloadProgressModalProps) {
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    if (progress >= 100 && !error) {
      setIsCompleted(true)
      // Auto close after 2 seconds when completed
      const timer = setTimeout(() => {
        onClose()
        setIsCompleted(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [progress, error, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-xl p-6 mx-4 max-w-md w-full shadow-2xl"
        >
          <div className="text-center">
            {/* Icon */}
            <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center">
              {error ? (
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              ) : isCompleted ? (
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold mb-2">
              {error ? 'Greška pri preuzimanju' : isCompleted ? 'Preuzimanje završeno!' : 'Preuzimanje u toku...'}
            </h3>

            {/* File name */}
            <p className="text-sm text-gray-600 mb-4 truncate">
              {fileName}
            </p>

            {/* Progress or Error */}
            {error ? (
              <div className="text-red-600 text-sm mb-4">
                {error}
              </div>
            ) : (
              <>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Progress Text */}
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>{Math.round(progress)}%</span>
                  {speed && <span>{speed}</span>}
                </div>

                {/* Remaining Time */}
                {remainingTime && !isCompleted && (
                  <p className="text-xs text-gray-500 mb-4">
                    Preostalo vreme: {remainingTime}
                  </p>
                )}
              </>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              {error && (
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Zatvori
                </button>
              )}
              
              {!error && !isCompleted && (
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Skrij
                </button>
              )}

              {isCompleted && (
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Odlično!
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}