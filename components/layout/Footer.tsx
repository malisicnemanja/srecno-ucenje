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
