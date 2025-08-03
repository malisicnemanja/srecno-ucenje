'use client'

import { useSanityQuery } from '@/hooks/useSanity'
import { faqsQuery } from '@/lib/sanity.queries'

interface FAQ {
  _id: string
  question: string
  answer: string
  category: string
}

export default function FAQList() {
  const { data: faqs, isLoading } = useSanityQuery<FAQ[]>(faqsQuery)

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-6 animate-pulse">
            <div className="h-6 bg-gray-300 rounded mb-3"></div>
            <div className="h-16 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  // Ako nema podataka iz CMS-a, koristi statičke podatke
  const faqItems = faqs || staticFAQs

  return (
    <div className="space-y-4">
      {faqItems.map((faq, index) => (
        <div key={(faq as any)._id || index} className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
          <p className="text-gray-600">{faq.answer}</p>
        </div>
      ))}
    </div>
  )
}

const staticFAQs = [
  {
    question: 'Koliko dugo traje program brzočitanja?',
    answer: 'Program brzočitanja traje 6 meseci sa redovnim časovima 2 puta nedeljno.',
    category: 'programs',
  },
  {
    question: 'Od koje godine dete može da krene sa mentalnom aritmetikom?',
    answer: 'Preporučujemo da deca krenu sa mentalnom aritmetikom od 5. godine.',
    category: 'programs',
  },
  {
    question: 'Da li postoji probni čas?',
    answer: 'Da, nudimo besplatan probni čas za upoznavanje sa našim metodama.',
    category: 'enrollment',
  },
  {
    question: 'Kako se vrši plaćanje?',
    answer: 'Plaćanje se vrši mesečno, unapred, putem uplatnice ili bankovnog transfera.',
    category: 'pricing',
  },
]