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
