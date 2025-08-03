'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MailIcon, CheckIcon, SparklesIcon } from '@/components/icons'

interface NewsletterFormProps {
  variant?: 'inline' | 'card' | 'minimal'
  showInterests?: boolean
  className?: string
}

export default function NewsletterForm({ 
  variant = 'card', 
  showInterests = false,
  className = ''
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const interestOptions = [
    { value: 'franchise', label: 'Franšiza' },
    { value: 'methodology', label: 'Metodologija' },
    { value: 'education', label: 'Edukacija' },
    { value: 'news', label: 'Novosti' },
    { value: 'events', label: 'Eventi' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, interests }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Uspešno ste se prijavili na naš newsletter!')
        setEmail('')
        setName('')
        setInterests([])
      } else {
        setStatus('error')
        setMessage(data.error || 'Došlo je do greške. Pokušajte ponovo.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Došlo je do greške. Pokušajte ponovo.')
    }
  }

  const toggleInterest = (value: string) => {
    setInterests(prev =>
      prev.includes(value)
        ? prev.filter(i => i !== value)
        : [...prev, value]
    )
  }

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Vaš email"
          required
          disabled={status === 'loading' || status === 'success'}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="btn-primary"
        >
          {status === 'loading' ? 'Slanje...' : status === 'success' ? 'Prijavljeni!' : 'Prijavite se'}
        </button>
      </form>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={`bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 ${className}`}>
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Budite u toku sa novostima</h3>
          <p className="text-gray-600 mb-6">
            Prijavite se na naš newsletter i dobijajte korisne savete i vesti
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Vaš email"
              required
              disabled={status === 'loading' || status === 'success'}
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="btn-primary"
            >
              {status === 'loading' ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                  <SparklesIcon size={20} />
                </motion.div>
              ) : status === 'success' ? (
                <>
                  <CheckIcon size={20} className="mr-2" />
                  Prijavljeni!
                </>
              ) : (
                <>
                  <MailIcon size={20} className="mr-2" />
                  Prijavite se
                </>
              )}
            </button>
          </form>
          {message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 text-sm ${status === 'error' ? 'text-warm-600' : 'text-primary-600'}`}
            >
              {message}
            </motion.p>
          )}
        </div>
      </div>
    )
  }

  // Card variant (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card max-w-md mx-auto ${className}`}
    >
      <div className="text-center mb-6">
        <div className="inline-block p-3 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full mb-4">
          <MailIcon size={32} className="text-primary-600" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Prijavite se na Newsletter</h3>
        <p className="text-gray-600">
          Budite prvi koji će saznati o novostima i posebnim ponudama
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Vaše ime (opciono)"
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Vaš email"
            required
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {showInterests && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Šta vas zanima? (opciono)
            </p>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleInterest(option.value)}
                  disabled={status === 'loading' || status === 'success'}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    interests.includes(option.value)
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full btn-primary"
        >
          {status === 'loading' ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              <SparklesIcon size={20} />
            </motion.div>
          ) : status === 'success' ? (
            <>
              <CheckIcon size={20} className="inline mr-2" />
              Uspešno prijavljeni!
            </>
          ) : (
            'Prijavite se'
          )}
        </button>
      </form>

      {message && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 text-center text-sm ${
            status === 'error' ? 'text-warm-600' : 'text-primary-600'
          }`}
        >
          {message}
        </motion.p>
      )}

      <p className="text-xs text-gray-500 text-center mt-4">
        Poštujemo vašu privatnost. Možete se odjaviti u bilo kom trenutku.
      </p>
    </motion.div>
  )
}