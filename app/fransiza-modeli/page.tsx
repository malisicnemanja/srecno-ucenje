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
