'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { QuizLeadInfo } from '@/types/quiz'

interface QuizLeadFormProps {
  onSubmit: (leadInfo: QuizLeadInfo) => void
  onCancel: () => void
  isSubmitting: boolean
  title?: string
  description?: string
}

export default function QuizLeadForm({ 
  onSubmit, 
  onCancel, 
  isSubmitting,
  title = "Preuzmite rezultate kviza",
  description = "Ostavite svoje podatke da biste dobili detaljne rezultate i personalizovane preporuke."
}: QuizLeadFormProps) {
  const [leadInfo, setLeadInfo] = useState<QuizLeadInfo>({
    name: '',
    email: '',
    phone: '',
  })

  const [errors, setErrors] = useState<Partial<QuizLeadInfo>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<QuizLeadInfo> = {}

    if (!leadInfo.name.trim()) {
      newErrors.name = 'Ime je obavezno'
    }

    if (!leadInfo.email.trim()) {
      newErrors.email = 'Email je obavezan'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadInfo.email)) {
      newErrors.email = 'Neispravna email adresa'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(leadInfo)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-8 max-w-md w-full"
      >
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ime i prezime *
            </label>
            <input
              type="text"
              value={leadInfo.name}
              onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Unesite vaše ime"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email adresa *
            </label>
            <input
              type="email"
              value={leadInfo.email}
              onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="vas.email@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon (opciono)
            </label>
            <input
              type="tel"
              value={leadInfo.phone}
              onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="063 123 456"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Šalje se...' : 'Pošaljite rezultate'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Otkaži
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}