'use client'

import { motion } from 'framer-motion'
import { QuizResult } from '@/types/quiz'

interface QuizResultsProps {
  result: QuizResult
  onGetResults: () => void
  onRetakeQuiz: () => void
}

export default function QuizResults({ result, onGetResults, onRetakeQuiz }: QuizResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      {/* Success icon */}
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Result title */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Kviz je završen!
        </h3>
        <h4 className="text-xl font-semibold text-green-600 mb-4">
          {result.title}
        </h4>
      </div>

      {/* Result description */}
      <div className="bg-gray-50 rounded-lg p-6">
        <p className="text-gray-700 leading-relaxed">
          {result.description}
        </p>
      </div>

      {/* Recommendations */}
      {result.recommendations && result.recommendations.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-6">
          <h5 className="font-semibold text-blue-900 mb-3">Naše preporuke:</h5>
          <ul className="space-y-2 text-left">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-blue-800">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onGetResults}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          {result.ctaText || 'Preuzmite detaljne rezultate'}
        </button>
        <button
          onClick={onRetakeQuiz}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Ponovi kviz
        </button>
      </div>
    </motion.div>
  )
}