'use client'

import { motion } from 'framer-motion'
import { 
  CheckIcon, StarIcon, BookIcon, UserIcon, PhoneIcon, MailIcon, CalendarIcon
} from '@/components/icons'

export default function PrivatnostPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-100/80 via-secondary-100/60 to-accent-100/70 py-20">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary-200/30"
            animate={{ y: [0, -20, 0], rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-40 right-20 w-16 h-16 rounded-full bg-secondary-200/30"
            animate={{ y: [0, 20, 0], rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-accent-200/30"
            animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 7, repeat: Infinity }}
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
              <CheckIcon size={64} className="mx-auto text-primary-600 mb-6" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Politika <span className="text-primary-600">Privatnosti</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Vaša privatnost i sigurnost podataka su naš prioritet. Ovde možete pronaći sve informacije o tome kako koristimo vaše podatke.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Informacije koje prikupljamo</h2>
            <p>Prikupljamo sledeće tipove informacija:</p>
            <ul>
              <li>Lične informacije (ime, email, telefon)</li>
              <li>Informacije o korišćenju sajta</li>
              <li>Tehničke informacije o vašem uređaju</li>
            </ul>

            <h2>2. Kako koristimo vaše informacije</h2>
            <p>Vaše informacije koristimo za:</p>
            <ul>
              <li>Pružanje usluga i podrške</li>
              <li>Poboljšanje našeg sajta i usluga</li>
              <li>Komunikaciju o našim programima</li>
            </ul>

            <h2>3. Deljenje informacija</h2>
            <p>Ne delimo vaše lične informacije sa trećim stranama bez vaše saglasnosti, osim u sledećim slučajevima:</p>
            <ul>
              <li>Kada je to zakonski potrebno</li>
              <li>Sa pouzadnim partnerima koji nam pomažu u pružanju usluga</li>
            </ul>

            <h2>4. Sigurnost podataka</h2>
            <p>Primenjujemo odgovarajuće sigurnosne mere za zaštitu vaših podataka.</p>

            <h2>5. Vaša prava</h2>
            <p>Imate pravo da:</p>
            <ul>
              <li>Pristupite svojim podacima</li>
              <li>Ispravite netačne podatke</li>
              <li>Zatražite brisanje podataka</li>
            </ul>

            <h2>6. Kontakt</h2>
            <p>Za sva pitanja o privatnosti kontaktirajte nas na: info@srecno-ucenje.rs</p>
          </div>
        </div>
      </section>
    </main>
  )
}