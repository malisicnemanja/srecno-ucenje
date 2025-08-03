'use client'

import { motion } from 'framer-motion'
import { 
  CheckIcon, BookIcon, UserIcon, CalendarIcon
} from '@/components/icons'

export default function UsloviKoriscenjaPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary-100/80 via-accent-100/60 to-primary-100/70 py-20">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-10 w-20 h-20 rounded-full bg-secondary-200/30"
            animate={{ y: [0, -20, 0], rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-40 left-20 w-16 h-16 rounded-full bg-accent-200/30"
            animate={{ y: [0, 20, 0], rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <BookIcon size={64} className="mx-auto text-secondary-600 mb-6" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Uslovi <span className="text-secondary-600">Korišćenja</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Molimo vas da pažljivo pročitate uslove korišćenja naših usluga i sajta.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Opšti uslovi</h2>
            <p>Korišćenjem našeg sajta pristajete na sledeće uslove korišćenja.</p>

            <h2>2. Usluge</h2>
            <p>Srećno učenje pruža obrazovne usluge i franšizne mogućnosti u oblasti brzog čitanja i mentalne aritmetike.</p>

            <h2>3. Odgovornost korisnika</h2>
            <ul>
              <li>Korišćenje sajta u skladu sa zakonom</li>
              <li>Poštovanje autorskih prava</li>
              <li>Nepovređivanje prava drugih korisnika</li>
            </ul>

            <h2>4. Ograničenja odgovornosti</h2>
            <p>Srećno učenje nije odgovorno za štetu nastalu korišćenjem sajta van predviđene namene.</p>

            <h2>5. Izmene uslova</h2>
            <p>Zadržavamo pravo izmene ovih uslova u bilo kom trenutku.</p>

            <h2>6. Kontakt</h2>
            <p>Za pitanja o uslovima korišćenja kontaktirajte nas na: info@srecno-ucenje.rs</p>
          </div>
        </div>
      </section>
    </main>
  )
}