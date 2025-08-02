#!/bin/bash

echo "🚀 Postavljanje kompletnog Srećno učenje projekta..."
echo "================================================"

# Kreiraj sve potrebne foldere
echo "📁 Kreiranje foldera..."
mkdir -p app/{metodologija,knjige,fransiza-modeli,ucionica,obuka-mentorstvo,kako-se-pridruziti,uspeh,blog,faq,kontakt,legal}
mkdir -p app/api/contact
mkdir -p app/blog/\[slug\]
mkdir -p components/{layout,home,icons,metodologija,classroom,shared,franchize,training}
mkdir -p lib
mkdir -p styles/tailwind
mkdir -p public/images
mkdir -p cms/strapi/content-types
mkdir -p messages

# ===== OSNOVNI FAJLOVI =====
echo "📄 Kreiranje osnovnih fajlova..."

# middleware.ts
cat > middleware.ts << 'EOF'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
EOF

# lib/utils.ts
cat > lib/utils.ts << 'EOF'
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('sr-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}
EOF

# lib/constants.ts
cat > lib/constants.ts << 'EOF'
export const SITE_NAME = 'Srećno učenje'
export const SITE_URL = 'https://srecnoucenje.rs'
export const CONTACT_EMAIL = 'carobnoselo@gmail.com'
export const CONTACT_PHONE = '063.394.251'

export const SEASONS = {
  spring: { color: '#66BB6A', name: 'Proleće', fairy: 'Đurđica' },
  summer: { color: '#EF5350', name: 'Leto', fairy: 'Sunčica' },
  autumn: { color: '#FFA726', name: 'Jesen', fairy: 'Bosiljčica' },
  winter: { color: '#42A5F5', name: 'Zima', fairy: 'Božica' },
}
EOF

# ===== KOMPONENTE =====
echo "🧩 Kreiranje komponenti..."

# components/icons/Logo.tsx
cat > components/icons/Logo.tsx << 'EOF'
interface LogoProps {
  className?: string
}

export default function Logo({ className = "w-12 h-12" }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="20" y="28" width="8" height="12" fill="#8B4513" rx="1"/>
      <g transform="translate(24, 20)">
        <path d="M-12 -8 Q-12 -16 -4 -16 Q0 -12 0 -8 Z" fill="#66BB6A"/>
        <path d="M0 -8 Q0 -12 4 -16 Q12 -16 12 -8 Z" fill="#EF5350"/>
        <path d="M12 -8 Q12 0 4 0 Q0 -4 0 -8 Z" fill="#FFA726"/>
        <path d="M0 -8 Q0 -4 -4 0 Q-12 0 -12 -8 Z" fill="#42A5F5"/>
      </g>
      <circle cx="14" cy="10" r="2" fill="#66BB6A" opacity="0.6"/>
      <circle cx="34" cy="8" r="2" fill="#EF5350" opacity="0.6"/>
      <circle cx="38" cy="24" r="2" fill="#FFA726" opacity="0.6"/>
      <circle cx="10" cy="26" r="2" fill="#42A5F5" opacity="0.6"/>
      <path d="M18 34 Q24 38 30 34" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  )
}
EOF

# components/layout/Footer.tsx
cat > components/layout/Footer.tsx << 'EOF'
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Srećno učenje</h3>
            <p className="text-gray-400">
              Franšiza obrazovne metodologije - Za one koji žele da ostave trag
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Brzi linkovi</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/metodologija" className="hover:text-white">Metodologija</a></li>
              <li><a href="/fransiza-modeli" className="hover:text-white">Modeli</a></li>
              <li><a href="/obuka-mentorstvo" className="hover:text-white">Obuka</a></li>
              <li><a href="/uspeh" className="hover:text-white">Priče uspeha</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Kontakt</h4>
            <p className="text-gray-400">
              📧 carobnoselo@gmail.com<br />
              📞 063.394.251<br />
              🌐 www.carobnoselo.edu.rs
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Srećno učenje. Sva prava zadržana.</p>
          <p className="text-sm mt-2">Metodologija Srećno učenje je autorsko delo Željane Radojičić Lukić.</p>
        </div>
      </div>
    </footer>
  )
}
EOF

# Ažuriraj app/layout.tsx da uključi Footer
cat > app/layout.tsx << 'EOF'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Srećno učenje - Franšiza obrazovne metodologije',
  description: 'Postanite deo mreže koja je već inspirisala 20.000+ dece da uče srcem',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
EOF

# ===== STRANICE =====
echo "📄 Kreiranje stranica..."

# app/metodologija/page.tsx
cat > app/metodologija/page.tsx << 'EOF'
export default function MetodologijaPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Šta znači učiti srećno?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Metodologija koja povezuje školu sa životom kroz bajke, radionice i vrline
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-2xl font-bold mb-4">Kurikulum – Srećno učenje</h2>
          <p className="mb-4 text-gray-700">
            Srećno učenje – Po receptu Čarobnog sela je originalna metodologija koja povezuje književni tekst, 
            vrline i integraciju nastavnih sadržaja u celovit, smislen i radostan proces učenja.
          </p>
          <blockquote className="border-l-4 border-green-600 pl-4 my-6 italic text-gray-600">
            "Znanje bez vrline ostaje hladno. Srećno učenje spaja i jedno i drugo – sa smislom."
          </blockquote>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">🔍 Šta je Srećno učenje?</h3>
          <p className="mb-2">To je metodologija u kojoj:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700">
            <li>Književni tekst postaje pokretač učenja</li>
            <li>Vrline se ne predaju, već proživljavaju</li>
            <li>Nastavni predmeti se sjedinjuju u smislenu celinu</li>
            <li>Ambijent (realan ili simuliran) postaje aktivan resurs</li>
            <li>Dete postaje istraživač, mislilac i koautor svog učenja</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">🧩 Osam koraka Srećnog učenja</h3>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li><strong>Priprema</strong> – čitanje bajke, kreiranje ambijenta i prikupljanje resursa</li>
            <li><strong>Luka reči</strong> – rad sa ključnim pojmovima i jezičko povezivanje</li>
            <li><strong>Čitalaksija</strong> – analiza teksta kroz pitanja različite dubine</li>
            <li><strong>Azbuka vrlina</strong> – razvoj vrednosnog i moralnog rasuđivanja</li>
            <li><strong>Izazov</strong> – centralni problem ili zadatak koji pokreće proces</li>
            <li><strong>Kreativna realizacija</strong> – istraživačke, umetničke i praktične aktivnosti</li>
            <li><strong>Čarobnopedija</strong> – digitalna zbirka resursa i učeničkih produkata</li>
            <li><strong>Evaluacija</strong> – refleksija, vrednovanje i analiza postignuća</li>
          </ol>
        </div>

        {/* 4 stuba metodologije */}
        <h2 className="text-3xl font-bold text-center mb-12">Četiri stuba metodologije</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border-t-4 border-green-500">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-600">Proleće - Istok</h3>
            <p className="text-sm text-gray-500 mb-2">Vila Đurđica</p>
            <p className="font-semibold mb-2">Ekologija i život u prirodi</p>
            <p className="text-gray-600 text-sm">Učenje o biljkama, životinjama i obnovljivim resursima kroz igru i istraživanje.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border-t-4 border-red-500">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">☀️</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-red-500">Leto - Jug</h3>
            <p className="text-sm text-gray-500 mb-2">Vila Sunčica</p>
            <p className="font-semibold mb-2">Nauka, umetnost i kreativno mišljenje</p>
            <p className="text-gray-600 text-sm">Eksperimenti, kreativnost i pokret koji inspirišu radoznalost i stvaralaštvo.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border-t-4 border-orange-500">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🍂</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-orange-500">Jesen - Zapad</h3>
            <p className="text-sm text-gray-500 mb-2">Vila Bosiljčica</p>
            <p className="font-semibold mb-2">Zdrava hrana, porodica i briga o telu</p>
            <p className="text-gray-600 text-sm">Zdrava ishrana, životni stilovi i briga o sebi kroz praktične aktivnosti.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border-t-4 border-blue-500">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">❄️</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-blue-500">Zima - Sever</h3>
            <p className="text-sm text-gray-500 mb-2">Vila Božica</p>
            <p className="font-semibold mb-2">Tradicija, zavičaj i kulturno nasleđe</p>
            <p className="text-gray-600 text-sm">Čuvanje identiteta kroz priče, običaje i vezu sa nasleđem.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-green-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Spremni da osetite metod uživo?</h2>
          <p className="text-xl mb-8 opacity-90">Zakažite demo čas i uverite se u moć Srećnog učenja</p>
          <a href="/kontakt" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block">
            Zakaži demo čas
          </a>
        </div>
      </div>
    </div>
  )
}
EOF

# app/knjige/page.tsx  
cat > app/knjige/page.tsx << 'EOF'
export default function KnjigePage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ciklus „Vile i deca"
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            44 bajke u 4 knjige – jedna za svako godišnje doba i jednu vilu
          </p>
          <p className="text-lg text-gray-600">
            Svaka priča prati jednu vilu i simbol prirode.<br />
            Svaka priča sadrži: jedno godišnje doba, jedno zanimanje, jednu vrlinu<br />
            <strong>...i mnoštvo razloga za čitanje!</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-green-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
            <div className="h-64 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <span className="text-8xl">🌱</span>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-2">🟩 Prolećna žurba sa vilom Đurđicom</h2>
              <p className="text-lg font-semibold text-green-700 mb-4">Tema: Ekologija i život u prirodi</p>
              <p className="text-gray-700 mb-6">Priče o buđenju prirode, rađanju novih života i čudima koja nas okružuju.</p>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition w-full">
                Saznaj više o knjizi
              </button>
            </div>
          </div>

          <div className="bg-red-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
            <div className="h-64 bg-gradient-to-br from-red-400 to-yellow-500 flex items-center justify-center">
              <span className="text-8xl">☀️</span>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-2">🟨 Letnja vreva sa vilom Sunčicom</h2>
              <p className="text-lg font-semibold text-red-700 mb-4">Tema: Nauka, umetnost i kreativno mišljenje</p>
              <p className="text-gray-700 mb-6">Priče pune sunca, eksperimenata i kreativnih izazova.</p>
              <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition w-full">
                Saznaj više o knjizi
              </button>
            </div>
          </div>

          <div className="bg-orange-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
            <div className="h-64 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <span className="text-8xl">🍂</span>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-2">🟧 Jesenja gozba sa vilom Bosiljčicom</h2>
              <p className="text-lg font-semibold text-orange-700 mb-4">Tema: Zdrava hrana, porodica i briga o telu</p>
              <p className="text-gray-700 mb-6">Priče o plodovima jeseni, porodičnoj toplini i brizi o sebi.</p>
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition w-full">
                Saznaj više o knjizi
              </button>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
            <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <span className="text-8xl">❄️</span>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-2">🟥 Zimski mir sa vilom Božicom</h2>
              <p className="text-lg font-semibold text-blue-700 mb-4">Tema: Tradicija, zavičaj i kulturno nasleđe</p>
              <p className="text-gray-700 mb-6">Priče o tradiciji, običajima i vrednostima koje čuvamo.</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full">
                Saznaj više o knjizi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
EOF

# app/fransiza-modeli/page.tsx
cat > app/fransiza-modeli/page.tsx << 'EOF'
export default function FransizaModeliPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Izaberite tempo rasta
          </h1>
          <p className="text-xl text-gray-600">
            Mini za probu, Standard za praksu, Premium za lidere
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* MINI */}
          <div className="bg-white rounded-2xl p-8 shadow-lg relative">
            <h3 className="text-2xl font-bold mb-2 text-teal-600">MINI</h3>
            <p className="text-gray-600 mb-4">Probni period</p>
            <div className="text-4xl font-bold mb-6 text-teal-600">€500</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 mt-1">✓</span>
                <span>Osnovna obuka</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 mt-1">✓</span>
                <span>Pristup materijalima</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 mt-1">✓</span>
                <span>Lokalna podrška</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 mt-1">✓</span>
                <span>Test period</span>
              </li>
            </ul>
            <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:border-teal-600 hover:text-teal-600 transition">
              Izaberi MINI
            </button>
          </div>

          {/* STANDARD */}
          <div className="bg-green-600 text-white rounded-2xl p-8 shadow-xl relative transform scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-6 py-1 rounded-full text-sm font-semibold">
              Preporučujemo
            </div>
            <h3 className="text-2xl font-bold mb-2">STANDARD</h3>
            <p className="opacity-90 mb-4">Najpopularniji</p>
            <div className="text-4xl font-bold mb-6">€2,000</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="mt-1">✓</span>
                <span>Kompletne obuke</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">✓</span>
                <span>Mentorska podrška</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">✓</span>
                <span>3 godine licence</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">✓</span>
                <span>Lokalna teritorija</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">✓</span>
                <span>Marketing materijali</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">✓</span>
                <span>Kontinuirane obuke</span>
              </li>
            </ul>
            <button className="w-full bg-white text-green-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Izaberi STANDARD
            </button>
          </div>

          {/* PREMIUM */}
          <div className="bg-white rounded-2xl p-8 shadow-lg relative">
            <h3 className="text-2xl font-bold mb-2 text-pink-600">PREMIUM</h3>
            <p className="text-gray-600 mb-4">Za lidere</p>
            <div className="text-4xl font-bold mb-6 text-pink-600">Kontakt</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">✓</span>
                <span>Sve iz Standard paketa</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">✓</span>
                <span>Regionalna ekskluziva</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">✓</span>
                <span>Obuka trenera</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">✓</span>
                <span>Razvoj programa</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">✓</span>
                <span>Prioritetna podrška</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-600 mt-1">✓</span>
                <span>Neograničena licenca</span>
              </li>
            </ul>
            <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:border-pink-600 hover:text-pink-600 transition">
              Izaberi PREMIUM
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
EOF

# app/kontakt/page.tsx
cat > app/kontakt/page.tsx << 'EOF'
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
EOF

# app/faq/page.tsx
cat > app/faq/page.tsx << 'EOF'
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
EOF

echo "✅ Projekat je uspešno kreiran!"
echo "📝 Pokreni server sa: npm run dev"
echo "🚀 Zatim otvori http://localhost:3000"

