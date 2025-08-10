/**
 * Script za kreiranje FAQ podataka koji nedostaju
 */

import { createClient } from '@sanity/client'
import { v4 as uuidv4 } from 'uuid'

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-10-10'
})

const generateKey = () => uuidv4().replace(/-/g, '').substring(0, 12)

const FAQ_DATA = [
  {
    _id: `faq-${generateKey()}`,
    _type: 'faq',
    question: "Kolika je početna investicija za franšizu?",
    answer: "Početna investicija zavisi od odabranog modela franšize i kreće se od €5,000 za Starter model do €25,000 za Master model. U cenu su uključeni obuka, marketing materijali i početna podrška.",
    order: 1
  },
  {
    _id: `faq-${generateKey()}`,
    _type: 'faq', 
    question: "Koliko vremena treba da se investicija vrati?",
    answer: "Na osnovu iskustva naših partnera, početna investicija se vraća u proseku za 8-12 meseci rada. Neki partneri su postigli povraćaj već posle 6 meseci.",
    order: 2
  },
  {
    _id: `faq-${generateKey()}`,
    _type: 'faq',
    question: "Da li je potrebno prethodno iskustvo u radu sa decom?",
    answer: "Nije potrebno prethodno iskustvo. Naša obuka pokriva sve aspekte rada sa decom, metodologiju, upravljanje centrom i marketing. Važni su entuzijazam i želja za rad sa decom.",
    order: 3
  },
  {
    _id: `faq-${generateKey()}`,
    _type: 'faq',
    question: "Koliko dece može da pohađa centar?",
    answer: "Kapacitet zavisi od odabranog modela. Starter model podržava do 30 dece, Professional do 80, dok Master model nema ograničenja. Preporučujemo početak sa manjim brojem i postepeno proširenje.",
    order: 4
  },
  {
    _id: `faq-${generateKey()}`,
    _type: 'faq',
    question: "Kakva podrška se dobija nakon pokretanja centra?",
    answer: "Dobijate kontinuiranu podršku našeg tima uključujući: marketing materijale, pomoć sa regrutovanjem dece, stručnu podršku za metodologiju i redovne kontrole kvaliteta rada.",
    order: 5
  },
  {
    _id: `faq-${generateKey()}`,
    _type: 'faq',
    question: "Da li mogu da radim centar uz postojeći posao?",
    answer: "Mnogi naši partneri su započeli uz postojeći posao. Centar može da radi popodne/uveče ili vikendom. Sa rastom broja dece, većina partnera prelazi na puno radno vreme.",
    order: 6
  },
  {
    _id: `faq-${generateKey()}`,
    _type: 'faq',
    question: "Koje su mesečne naknade za franšizu?",
    answer: "Mesečne naknade se kreću od 5-10% mesečnog prihoda, zavisno od modela. U naknade su uključeni marketing podrška, nova izdanja materijala i kontinuirana obuka.",
    order: 7
  },
  {
    _id: `faq-${generateKey()}`,
    _type: 'faq',
    question: "Da li mogu da otvorim više centara?",
    answer: "Apsolutno! Mnogi naši uspešni partneri su proširili na više lokacija. Nudimo posebne uslove za multi-unit franchise i podršku za razvoj regionalne mreže.",
    order: 8
  }
]

async function createFAQs() {
  console.log("📝 Kreiram FAQ podatke...")
  
  try {
    // Proveri da li već postoje FAQs
    const existingFAQs = await client.fetch('*[_type == "faq"]')
    
    if (existingFAQs.length > 0) {
      console.log(`ℹ️ Već postoji ${existingFAQs.length} FAQ-ova. Preskačem kreiranje.`)
      return true
    }

    // Kreiraj sve FAQs u batch operaciji
    const transaction = client.transaction()
    
    FAQ_DATA.forEach(faq => {
      transaction.create(faq)
    })
    
    await transaction.commit()
    
    console.log(`✅ Uspešno kreirao ${FAQ_DATA.length} FAQ-ova`)
    return true
    
  } catch (error) {
    console.error("❌ Greška pri kreiranju FAQ-ova:", error)
    return false
  }
}

async function updateHomePageWithFAQs() {
  console.log("🔗 Povezujem FAQs sa HomePage...")
  
  try {
    // Uzmi sve FAQ IDs
    const faqs = await client.fetch('*[_type == "faq"] | order(order asc) { _id }')
    
    if (faqs.length === 0) {
      console.log("❌ Nema FAQ-ova za povezivanje")
      return false
    }

    // Ažuriraj homePage sa FAQ referencama
    await client.patch('homePage').set({
      homeFaqs: {
        sectionTitle: "Česta pitanja",
        faqs: faqs.slice(0, 6).map(faq => ({
          _type: 'reference',
          _ref: faq._id,
          _key: generateKey()
        }))
      }
    }).commit()
    
    console.log(`✅ Povezao ${Math.min(faqs.length, 6)} FAQ-ova sa HomePage`)
    return true
    
  } catch (error) {
    console.error("❌ Greška pri povezivanju FAQ-ova:", error)
    return false
  }
}

async function main() {
  console.log("🚀 KREIRANJE FAQ PODATAKA")
  console.log("=" .repeat(40))
  
  try {
    // 1. Kreiraj FAQs
    const faqSuccess = await createFAQs()
    if (!faqSuccess) {
      throw new Error("Kreiranje FAQ-ova neuspešno")
    }
    
    // 2. Povezuj sa HomePage
    const linkSuccess = await updateHomePageWithFAQs()
    if (!linkSuccess) {
      throw new Error("Povezivanje sa HomePage neuspešno")
    }
    
    console.log("\n✅ FAQ podaci uspešno kreirani i povezani!")
    return true
    
  } catch (error) {
    console.error("❌ Greška:", error.message)
    return false
  }
}

main()
  .then(success => process.exit(success ? 0 : 1))
  .catch(error => {
    console.error("💥 Neočekivana greška:", error)
    process.exit(1)
  })