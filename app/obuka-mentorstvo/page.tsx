'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookIcon, StarIcon, RocketIcon, CheckIcon } from '@/components/icons'

export default function ObukaMentorstvo() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-100/60 via-secondary-100/40 to-accent-100/50 min-h-[85vh] flex items-center overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <BookIcon size={64} className="mx-auto text-primary-600 mb-6" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Obuka i <span className="text-primary-600">Mentorstvo</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Postanite deo našeg tima i naučite kako da uspešno vodite centar za brzo čitanje
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/zakazivanje" className="btn-primary px-8 py-4 text-lg">
                Zakažite konsultacije
              </Link>
              <Link href="/franchise-models" className="btn-outline-primary px-8 py-4 text-lg">
                Saznajte više
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Naši programi obuke
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kompletan pristup obuci koji vam omogućava da uspešno pokrenete i vodite svoj centar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookIcon,
                title: "Osnovna obuka",
                description: "Naučite osnove metodologije brzog čitanja i mentalne aritmetike",
                duration: "2 nedelje",
                features: ["Teorijske osnove", "Praktična vežba", "Materijali za rad"]
              },
              {
                icon: StarIcon,
                title: "Napredna obuka",
                description: "Dublje razumevanje tehnika i prilagođavanje različitim uzrastima",
                duration: "3 nedelje",
                features: ["Napredne tehnike", "Individualizacija", "Rad sa roditeljima"]
              },
              {
                icon: RocketIcon,
                title: "Mentorstvo",
                description: "Kontinuirana podrška i praćenje vašeg napretka",
                duration: "6 meseci",
                features: ["Redovni pozivi", "Analiza napretka", "Rešavanje problema"]
              }
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <program.icon size={48} className="text-primary-600 mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <div className="text-sm text-primary-600 font-semibold mb-4">
                  Trajanje: {program.duration}
                </div>
                <ul className="space-y-2">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <CheckIcon size={16} className="text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Spremni ste da započnete?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Kontaktirajte nas i zakažite besplatnu konsultaciju o našim programima obuke
            </p>
            <Link href="/zakazivanje" className="btn-primary px-8 py-4 text-lg">
              Zakažite konsultacije
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}