export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Otvori vrata svojoj{' '}
            <span className="text-green-600">učionici iz snova</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Postanite deo mreže koja je već inspirisala <strong className="text-green-600">20.000+ dece</strong> da uče srcem kroz metodologiju Srećnog učenja
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/kontakt" className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition">
              Zakaži 30-min poziv
            </a>
            <a href="/kako-se-pridruziti" className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-green-600 hover:text-green-600 transition">
              Preuzmi info-paket
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Testiran model</h3>
              <p className="text-gray-600">20.000+ dece u 10 zemalja</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Kompletna podrška</h3>
              <p className="text-gray-600">Obuke, mentorstvo, materijali</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Podsticajna sredina</h3>
              <p className="text-gray-600">Prostor koji razvija vrline</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Dokazana uspešnost</h3>
              <p className="text-gray-600">Merljivi rezultati</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
