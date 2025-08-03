'use client'

import { motion } from 'framer-motion'
import { 
  HeartIcon, SparklesIcon, CalendarIcon, BookIcon,
  UsersIcon, SmileIcon
} from '@/components/icons'
import { HappyStudents, ReadingChild } from '@/components/illustrations/ChildIllustrations'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen gradient-soft-primary">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-30"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-200 rounded-full opacity-30"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="container relative min-h-screen flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Floating 404 */}
            <motion.div
              className="mb-8"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <h1 className="text-9xl font-bold text-gradient-rainbow mb-4">
                404
              </h1>
            </motion.div>

            {/* Main message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-gradient-primary">Ups!</span> Stranica se sakrila
              </h2>
              
              <p className="text-xl text-gray-600 mb-8">
                Možda je otišla na časove brzočitanja? <br />
                Ne brinite, pomoći ćemo vam da pronađete pravu stranicu!
              </p>
            </motion.div>

            {/* Illustration */}
            <motion.div
              className="max-w-md mx-auto mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ReadingChild className="w-full h-auto" />
            </motion.div>

            {/* Navigation options */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/" className="btn-primary group">
                  <HeartIcon size={20} className="mr-2" />
                  Početna stranica
                </Link>
                <Link href="/zakazivanje" className="btn-secondary">
                  <CalendarIcon size={20} className="mr-2" />
                  Zakažite konsultacije
                </Link>
              </div>

              {/* Quick links */}
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  {
                    icon: BookIcon,
                    title: "Naši programi",
                    description: "Brzočitanje i mentalna aritmetika",
                    href: "/methodology",
                    color: "primary"
                  },
                  {
                    icon: UsersIcon,
                    title: "Kako se pridružiti",
                    description: "Jednostavan proces prijave",
                    href: "/kako-se-pridruziti",
                    color: "secondary"
                  },
                  {
                    icon: SmileIcon,
                    title: "Često pitanja",
                    description: "Odgovori na vaša pitanja",
                    href: "/faq",
                    color: "accent"
                  }
                ].map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <Link href={link.href} className="block">
                      <motion.div
                        className={`card text-center border border-${link.color}-200 hover:border-${link.color}-300 transition-all`}
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <link.icon 
                            size={40} 
                            className={`mx-auto mb-4 text-${link.color}-500`} 
                          />
                        </motion.div>
                        <h3 className={`text-lg font-semibold mb-2 text-gradient-${link.color}`}>
                          {link.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {link.description}
                        </p>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Fun message */}
            <motion.div
              className="mt-16 p-6 gradient-soft-accent rounded-2xl border border-accent-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <SparklesIcon size={32} className="mx-auto mb-4 text-accent-500" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Znate li da naša deca čitaju 3-5 puta brže od proseka?
              </p>
              <p className="text-gray-600">
                Možda je vreme da se i vaše dete pridruži našoj zajednici!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom illustration */}
      <motion.div
        className="fixed bottom-0 right-0 max-w-xs opacity-20 pointer-events-none"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.2, x: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <HappyStudents className="w-full h-auto" />
      </motion.div>
    </main>
  )
}