import { Search, Puzzle, Sun, Leaf, Snowflake } from 'lucide-react'

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
          
          <h3 className="text-xl font-semibold mt-8 mb-4 flex items-center"><Search size={24} className="mr-2" /> Šta je Srećno učenje?</h3>
          <p className="mb-2">To je metodologija u kojoj:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700">
            <li>Književni tekst postaje pokretač učenja</li>
            <li>Vrline se ne predaju, već proživljavaju</li>
            <li>Nastavni predmeti se sjedinjuju u smislenu celinu</li>
            <li>Ambijent (realan ili simuliran) postaje aktivan resurs</li>
            <li>Dete postaje istraživač, mislilac i koautor svog učenja</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-8 mb-4 flex items-center"><Puzzle size={24} className="mr-2" /> Osam koraka Srećnog učenja</h3>
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
              <Sun size={32} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-red-500">Leto - Jug</h3>
            <p className="text-sm text-gray-500 mb-2">Vila Sunčica</p>
            <p className="font-semibold mb-2">Nauka, umetnost i kreativno mišljenje</p>
            <p className="text-gray-600 text-sm">Eksperimenti, kreativnost i pokret koji inspirišu radoznalost i stvaralaštvo.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border-t-4 border-orange-500">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Leaf size={32} className="text-orange-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-orange-500">Jesen - Zapad</h3>
            <p className="text-sm text-gray-500 mb-2">Vila Bosiljčica</p>
            <p className="font-semibold mb-2">Zdrava hrana, porodica i briga o telu</p>
            <p className="text-gray-600 text-sm">Zdrava ishrana, životni stilovi i briga o sebi kroz praktične aktivnosti.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border-t-4 border-blue-500">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Snowflake size={32} className="text-blue-500" />
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
