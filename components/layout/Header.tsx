export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <a href="/metodologija" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">SU</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Srećno učenje</span>
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/knjige" className="text-gray-700 hover:text-green-600">Knjige</a>
            <a href="/fransiza-modeli" className="text-gray-700 hover:text-green-600">Modeli</a>
            <a href="/ucionica" className="text-gray-700 hover:text-green-600">Učionica</a>
            <a href="/obuka-mentorstvo" className="text-gray-700 hover:text-green-600">Obuka</a>
            <a href="/faq" className="text-gray-700 hover:text-green-600">FAQ</a>
            <a href="/kontakt" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Zakaži poziv
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
