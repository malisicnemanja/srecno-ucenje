import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Izjava o pristupačnosti',
  description: 'Izjava o pristupačnosti veb sajta Srećno učenje - naša posvećenost digitalnoj uključivosti.',
  keywords: ['pristupačnost', 'accessibility', 'WCAG', 'digitalna uključivost', 'Srećno učenje'],
}

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-50 to-grass-50 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-night-700 mb-6">
              Izjava o pristupačnosti
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              U Srećnom učenju verujemo da edukacija mora biti dostupna svima. Naš veb sajt je dizajniran da bude pristupačan svim korisnicima, uključujući osobe sa invaliditetom.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Naša posvećenost */}
            <div className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-night-700 mb-6">
                Naša posvećenost pristupačnosti
              </h2>
              <p className="text-gray-700 mb-4">
                Srećno učenje je posvećeno tome da naš veb sajt bude pristupačan što je većem broju korisnika moguće, 
                uključujući osobe koje koriste pomoćne tehnologije kao što su čitači ekrana, softver za prepoznavanje govora, 
                ili koji navigiraju koristeći samo tastaturu.
              </p>
              <p className="text-gray-700">
                Verujemo da je digitalna pristupačnost ljudsko pravo i nastojimo da naš sadržaj bude dostupan svima, 
                bez obzira na njihove sposobnosti ili tehnologiju koju koriste.
              </p>
            </div>

            {/* Standardi pristupačnosti */}
            <div className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-night-700 mb-6">
                Standardi pristupačnosti
              </h2>
              <p className="text-gray-700 mb-4">
                Naš veb sajt je razvijen u skladu sa <strong>WCAG 2.1 (Web Content Accessibility Guidelines)</strong> 
                na AA nivou. Ovi standardi obezbeđuju da je sadržaj:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li><strong>Opažljiv</strong> - Informacije i komponente korisničkog interfejsa moraju biti predstavljene na način da ih korisnici mogu da opaze</li>
                <li><strong>Upotrebljiv</strong> - Komponente korisničkog interfejsa i navigacija moraju biti upotrebljive</li>
                <li><strong>Razumljiv</strong> - Informacije i funkcionisanje korisničkog interfejsa moraju biti razumljive</li>
                <li><strong>Robustan</strong> - Sadržaj mora biti dovoljno robustan da ga može interpretirati veliki broj korisničkih agenata, uključujući pomoćne tehnologije</li>
              </ul>
            </div>

            {/* Funkcionalnosti pristupačnosti */}
            <div className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-night-700 mb-6">
                Funkcionalnosti pristupačnosti
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-sky-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-night-700 mb-3">Navigacija tastaturom</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Potpuna podrška za navigaciju tastaturom</li>
                    <li>• Jasni fokus indikatori</li>
                    <li>• Logičan redosled tabulatora</li>
                    <li>• Skip linkovi za brže kretanje</li>
                  </ul>
                </div>
                
                <div className="bg-grass-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-night-700 mb-3">Čitači ekrana</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Semantička HTML struktura</li>
                    <li>• ARIA labeli i opisi</li>
                    <li>• Alt tekstovi za sve slike</li>
                    <li>• Opisna zaglavlja stranica</li>
                  </ul>
                </div>
                
                <div className="bg-sun-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-night-700 mb-3">Vizuelni dizajn</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Visok kontrast boja (4.5:1 minimum)</li>
                    <li>• Čitljivi fontovi i veličine</li>
                    <li>• Responzivni dizajn</li>
                    <li>• Bez oslanjanja samo na boju</li>
                  </ul>
                </div>
                
                <div className="bg-heart-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-night-700 mb-3">Interakcija</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Dovoljno velike touch targets (44x44px)</li>
                    <li>• Jasne greške i potvrde</li>
                    <li>• Dovoljno vremena za čitanje</li>
                    <li>• Kontrola nad automatskim sadržajem</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Testiranje i evaluacija */}
            <div className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-night-700 mb-6">
                Testiranje i evaluacija
              </h2>
              <p className="text-gray-700 mb-4">
                Redovno testiramo naš sajt koristeći različite metode i alate:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Automatsko testiranje pristupačnosti pomoću WAVE, axe i Lighthouse alata</li>
                <li>Ručno testiranje navigacije tastaturom</li>
                <li>Testiranje sa čitačima ekrana (NVDA, JAWS, VoiceOver)</li>
                <li>Pregled sa korisnicima koji imaju različite potrebe</li>
                <li>Testiranje na različitim uređajima i brauzovima</li>
              </ul>
            </div>

            {/* Trenutno stanje */}
            <div className="mb-12 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl lg:text-3xl font-bold text-night-700 mb-6">
                Trenutno stanje pristupačnosti
              </h2>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-3xl font-bold text-grass-600 mb-2">AA</div>
                  <div className="text-sm text-gray-600">WCAG 2.1 nivo</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-3xl font-bold text-sky-600 mb-2">4.8:1</div>
                  <div className="text-sm text-gray-600">Prosečan kontrast</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-3xl font-bold text-sun-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600">Tastatura podrška</div>
                </div>
              </div>
              <p className="text-gray-700">
                <strong>Poslednje ažuriranje:</strong> {new Date().toLocaleDateString('sr-RS')} - 
                Kontinuirano poboljšavamo pristupačnost na osnovu korisničkih povratnih informacija i novih standarda.
              </p>
            </div>

            {/* Poznati problemi */}
            <div className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-night-700 mb-6">
                Poznati problemi i ograničenja
              </h2>
              <p className="text-gray-700 mb-4">
                Iako nastojimo da postignemo potpunu pristupačnost, svesni smo sledećih područja za poboljšanje:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Neki video sadržaji možda nemaju potpune titlove ili audio opise</li>
                <li>Kompleksne animacije možda nisu optimalno prilagođene korisnicima osetljivim na pokret</li>
                <li>Neki PDF dokumenti možda nisu u potpunosti optimizovani za čitače ekrana</li>
              </ul>
              <p className="text-gray-700">
                Aktivno radimo na rešavanju ovih problema u budućim verzijama sajta.
              </p>
            </div>

            {/* Povratne informacije */}
            <div className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-night-700 mb-6">
                Povratne informacije i podrška
              </h2>
              <p className="text-gray-700 mb-4">
                Vaše povratne informacije su veoma važne za nas. Ako naiđete na bilo kakve probleme sa pristupačnošću 
                ili imate predloge za poboljšanja, molimo vas da nas kontaktirate:
              </p>
              
              <div className="bg-sky-50 p-6 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-night-700 mb-3">Kontakt informacije</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Email:</strong> <a href="mailto:pristupacnost@carobnoselo.edu.rs" className="text-sky-600 hover:text-sky-800">pristupacnost@carobnoselo.edu.rs</a></li>
                  <li><strong>Telefon:</strong> <a href="tel:+381633394251" className="text-sky-600 hover:text-sky-800">+381 63 339 4251</a></li>
                  <li><strong>Adresa:</strong> Beograd, Srbija</li>
                </ul>
              </div>
              
              <p className="text-gray-700">
                Trudićemo se da odgovorimo na sva pitanja i zahteve u vezi sa pristupačnošću u roku od 2 radna dana.
              </p>
            </div>

            {/* Alternativni formati */}
            <div className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-night-700 mb-6">
                Alternativni formati sadržaja
              </h2>
              <p className="text-gray-700 mb-4">
                Ako vam je potreban sadržaj sa naše veb stranice u alternativnom formatu, možemo ga obezbediti u:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Audio formatu (za vizuelne materijale)</li>
                <li>Tekstualnom opisu (za grafike i dijagrame)</li>
                <li>Velikim fontom (za štampane materijale)</li>
                <li>Brailjevom pismu (na zahtev)</li>
                <li>Jednostavnom jeziku (za složene koncepte)</li>
              </ul>
              <p className="text-gray-700">
                Kontaktirajte nas na gore navedene kontakt informacije za zahtev alternativnih formata.
              </p>
            </div>

            {/* Pravni okvir */}
            <div className="mb-12 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl lg:text-3xl font-bold text-night-700 mb-6">
                Pravni okvir i usaglašenost
              </h2>
              <p className="text-gray-700 mb-4">
                Ova izjava o pristupačnosti je u skladu sa:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>WCAG 2.1 AA standardima</li>
                <li>EN 301 549 evropskim standardom</li>
                <li>Zakonom o sprečavanju diskriminacije osoba sa invaliditetom u Republici Srbiji</li>
                <li>UN Konvencijom o pravima osoba sa invaliditetom</li>
              </ul>
            </div>

            {/* Kontinuirano poboljšanje */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-night-700 mb-6">
                Kontinuirano poboljšavanje
              </h2>
              <p className="text-gray-700 mb-4">
                Pristupačnost je kontinuirani proces. Nastojimo da:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Redovno ažuriramo ovu izjavu o pristupačnosti</li>
                <li>Sprovodimo redovne evaluacije pristupačnosti</li>
                <li>Obučavamo naš tim o najboljem praksama pristupačnosti</li>
                <li>Uključujemo osobe sa invaliditetom u proces dizajna i testiranja</li>
                <li>Pratimo nove standarde i tehnologije</li>
              </ul>
              <p className="text-gray-700">
                Zahvaljujemo vam na tome što pomažete da naš sajt bude pristupačniji svima.
              </p>
            </div>

            {/* Datum poslednjeg ažuriranja */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Poslednje ažuriranje izjave:</strong> {new Date().toLocaleDateString('sr-RS', {
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric'
                })}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Ova izjava će biti ažurirana kako budu dodavane nove funkcionalnosti ili pronađeni novi problemi pristupačnosti.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}