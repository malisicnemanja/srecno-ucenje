'use client'

import { useState } from 'react'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Koliko minimalno kvadrata mi je potrebno?",
      answer: "Minimalno vam je potrebno 30m² prostora koji omogućava kreiranje 7 zona u kompaktnom formatu. Prostor može biti i veći, ali bitno je da ima mogućnost fleksibilnog uređenja."
    },
    {
      question: "Da li mogu da počnem dok još radim u školi?",
      answer: "Da, Mini model je osmišljen upravo kao probni korak koji vam omogućava da testirate metodologiju pre potpunog prelaska na samostalan rad."
    },
    {
      question: "Kakva je podrška nakon otvaranja?",
      answer: "Dobijate kontinuiranu mentorsku podršku, pristup platformi za razmenu iskustava, redovne obuke za svaki modul i tehničku pomoć kada vam je potrebna."
    },
    {
      question: "Da li je metodologija primenljiva u državnoj školi?",
      answer: "Da, metodologija je fleksibilna i može se integrisati kao dodatni program ili redovna radionica u okviru postojećeg kurikuluma."
    },
    {
      question: "Koliko traje obuka?",
      answer: "Osnovna obuka traje 5 dana formalno, plus kontinuirane modularne obuke tokom godine. Sve obuke su praktične i primenljive odmah."
    },
    {
      question: "Da li je potrebno pedagoško iskustvo?",
      answer: "Metodologija je kreirana tako da bude pristupačna svima koji vole rad sa decom. Kroz obuke dobijate sve potrebne pedagoške veštine i tehnike."
    }
  ]

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Česta pitanja
          </h1>
          <p className="text-xl text-gray-600">
            Odgovori na najčešće nedoumice
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <span className="text-gray-400 text-2xl">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
