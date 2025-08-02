'use client'

import { useState } from 'react'

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    gdprConsent: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    alert('Hvala vam! Vaša poruka je poslata.')
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kontaktirajte nas
          </h1>
          <p className="text-xl text-gray-600">
            Imaš ideju ili pitanje? Javi nam se - odgovor stiže u roku od 48h
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ime i prezime *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Telefon
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Poruka *
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                required
                id="gdpr"
                className="mt-1"
                checked={formData.gdprConsent}
                onChange={(e) => setFormData({...formData, gdprConsent: e.target.checked})}
              />
              <label htmlFor="gdpr" className="text-sm text-gray-600">
                Slažem se sa uslovima korišćenja i politikom privatnosti
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Pošalji poruku
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Ili nas kontaktirajte direktno:</p>
          <p className="text-lg">
            📧 carobnoselo@gmail.com<br />
            📞 063.394.251
          </p>
        </div>
      </div>
    </div>
  )
}
