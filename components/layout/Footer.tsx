import Link from 'next/link'
import { Mail, Phone, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Kolona 1 - O nama */}
          <div>
            <h4 className="font-semibold mb-4 text-white">O nama</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/metodologija" className="hover:text-white transition-colors">Metodologija</Link></li>
              <li><Link href="/uspeh" className="hover:text-white transition-colors">Priče uspeha</Link></li>
              <li><Link href="/o-autorki" className="hover:text-white transition-colors">O autorki</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          {/* Kolona 2 - Franšiza */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Franšiza</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/fransiza-modeli" className="hover:text-white transition-colors">Modeli franšize</Link></li>
              <li><Link href="/kako-se-pridruziti" className="hover:text-white transition-colors">Kako se pridružiti</Link></li>
              <li><Link href="/lokacije" className="hover:text-white transition-colors">Lokacije</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Kolona 3 - Resursi */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Resursi</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/resursi" className="hover:text-white transition-colors">Preuzmi materijale</Link></li>
              <li><Link href="/knjige" className="hover:text-white transition-colors">Preporučene knjige</Link></li>
              <li><Link href="/obuka-mentorstvo" className="hover:text-white transition-colors">Obuka & Mentorstvo</Link></li>
              <li><Link href="/kontakt" className="hover:text-white transition-colors">Kontakt</Link></li>
            </ul>
          </div>
          
          {/* Kolona 4 - Kontakt & Pravno */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Kontakt</h4>
            <div className="text-gray-400 mb-4 space-y-2">
              <p className="flex items-center"><Mail size={16} className="mr-2" /> carobnoselo@gmail.com</p>
              <p className="flex items-center"><Phone size={16} className="mr-2" /> 063.394.251</p>
              <p className="flex items-center"><Globe size={16} className="mr-2" /> www.carobnoselo.edu.rs</p>
            </div>
            <div className="space-y-2 text-gray-400 text-sm">
              <Link href="/legal/privatnost" className="block hover:text-white transition-colors">Politika privatnosti</Link>
              <Link href="/legal/uslovi-koriscenja" className="block hover:text-white transition-colors">Uslovi korišćenja</Link>
            </div>
          </div>
        </div>
        
        {/* Logo & Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-14 h-14 gradient-primary rounded-full flex items-center justify-center shadow-lg shadow-primary-500/25">
                <span className="text-white font-bold text-2xl">SU</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Srećno učenje</h3>
                <p className="text-gray-300 text-sm">Franšiza obrazovne metodologije</p>
              </div>
            </div>
            
            <div className="text-center md:text-right text-gray-400 text-sm">
              <p>&copy; 2024 Srećno učenje. Sva prava zadržana.</p>
              <p className="mt-1">Metodologija Srećno učenje je autorsko delo Željane Radojičić Lukić.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
