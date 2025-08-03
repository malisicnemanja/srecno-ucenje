// Skripta za potpuno resetovanje Sanity baze i import svežih podataka
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skYc1dLdlL4lEIKyyuy39qoANTkDFMlnL8IUaKYcyiJ31DsmSBJWyWLA5vWBKcGRAtDcVsB5DPKn4I8NheeBOG75VBTuWZSDEjFGewZFaypQtvaSIQEVmb1EQEOOtrYhKZvseL1xw9QRJcvQmkUo3HE2ze29bGx5hmL0Yj4mzJduq0WxNrPV',
  useCdn: false
})

async function resetAndImport() {
  console.log('🗑️  Počinje potpuno resetovanje Sanity baze...')

  try {
    // Prvo obriši sve dokumente
    console.log('📝 Brišem sve postojeće dokumente...')
    
    const allDocuments = await client.fetch(`*[!(_id in path("_.*"))]`)
    console.log(`Pronađeno ${allDocuments.length} dokumenata za brisanje`)
    
    // Briši u batch-ovima od 100
    const batchSize = 100
    for (let i = 0; i < allDocuments.length; i += batchSize) {
      const batch = allDocuments.slice(i, i + batchSize)
      const transaction = client.transaction()
      
      batch.forEach(doc => {
        transaction.delete(doc._id)
      })
      
      await transaction.commit()
      console.log(`Obrisano ${Math.min(i + batchSize, allDocuments.length)}/${allDocuments.length} dokumenata`)
    }

    console.log('✅ Svi dokumenti obrisani!')
    console.log('\n📝 Počinje import novih podataka...\n')

    // Sada importuj samo po jedan od svakog
    
    // 1. Site Settings (samo jedan!)
    console.log('📝 Kreiram Site Settings...')
    const existingSettings = await client.fetch(`*[_type == "siteSettings"][0]`)
    if (!existingSettings) {
      await client.create({
        _type: 'siteSettings',
        siteName: 'Srećno učenje',
        siteDescription: 'Centar za brzočitanje i mentalnu aritmetiku koji razvija pune potencijale vašeg deteta',
        email: 'info@srecno-ucenje.rs',
        phone: '+381 60 123 4567',
        address: 'Bulevar oslobođenja 123, 21000 Novi Sad',
        workingHours: [
          { day: 'Ponedeljak - Petak', hours: '09:00 - 20:00' },
          { day: 'Subota', hours: '10:00 - 18:00' },
          { day: 'Nedelja', hours: '10:00 - 16:00' },
          { day: 'Praznici', hours: 'Zatvoreno' }
        ],
        socialLinks: [
          { platform: 'Facebook', url: 'https://facebook.com/srecnoucenje' },
          { platform: 'Instagram', url: 'https://instagram.com/srecnoucenje' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/company/srecnoucenje' },
        ]
      })
      console.log('✅ Site Settings kreiran')
    } else {
      console.log('⚠️  Site Settings već postoji, preskačem')
    }

    // 2. Programi (samo 3)
    console.log('\n📝 Kreiram programe...')
    const programs = [
      {
        _type: 'program',
        title: 'Brzočitanje',
        slug: { current: 'brzocitanje' },
        icon: 'book',
        description: 'Ovladajte veštinom brzog čitanja uz potpuno razumevanje pročitanog teksta',
        ageRange: '7-16 godina',
        duration: '6 meseci',
        groupSize: '6-8 učenika',
        benefits: [
          'Čitanje 3-5 puta brže',
          'Bolje razumevanje pročitanog',
          'Poboljšana koncentracija',
          'Veće samopouzdanje'
        ],
        order: 1
      },
      {
        _type: 'program',
        title: 'Mentalna aritmetika',
        slug: { current: 'mentalna-aritmetika' },
        icon: 'calculator',
        description: 'Naučite da računate brže od kalkulatora koristeći moć vizualizacije',
        ageRange: '5-14 godina',
        duration: '12 meseci',
        groupSize: '6-8 učenika',
        benefits: [
          'Brže mentalno računanje',
          'Razvoj oba hemisfera mozga',
          'Poboljšana memorija',
          'Bolja logika'
        ],
        order: 2
      },
      {
        _type: 'program',
        title: 'Kombinovani program',
        slug: { current: 'kombinovani-program' },
        icon: 'target',
        description: 'Najbolje iz oba programa za maksimalne rezultate',
        ageRange: '7-14 godina',
        duration: '12 meseci',
        groupSize: '6-8 učenika',
        benefits: [
          'Kompletan kognitivni razvoj',
          'Ušteda vremena i novca',
          'Sinergija programa',
          'Brži napredak'
        ],
        order: 3
      }
    ]

    for (const program of programs) {
      const existing = await client.fetch(`*[_type == "program" && title == $title][0]`, { title: program.title })
      if (!existing) {
        await client.create(program)
        console.log(`✅ Program "${program.title}" kreiran`)
      } else {
        console.log(`⚠️  Program "${program.title}" već postoji`)
      }
    }

    // 3. FAQ (samo nekoliko osnovnih)
    console.log('\n📝 Kreiram FAQ pitanja...')
    const faqs = [
      {
        _type: 'faq',
        question: 'Koliko dugo traje program brzočitanja?',
        answer: 'Program brzočitanja traje 6 meseci sa redovnim časovima 2 puta nedeljno.',
        category: 'programs',
        order: 1
      },
      {
        _type: 'faq',
        question: 'Od koje godine dete može da krene sa mentalnom aritmetikom?',
        answer: 'Preporučujemo da deca krenu sa mentalnom aritmetikom od 5. godine.',
        category: 'programs',
        order: 2
      },
      {
        _type: 'faq',
        question: 'Da li postoji probni čas?',
        answer: 'Da, nudimo besplatan probni čas.',
        category: 'enrollment',
        order: 3
      }
    ]

    for (const faq of faqs) {
      const existing = await client.fetch(`*[_type == "faq" && question == $question][0]`, { question: faq.question })
      if (!existing) {
        await client.create(faq)
        console.log(`✅ FAQ "${faq.question.substring(0, 30)}..." kreirano`)
      }
    }

    console.log('\n🎉 Reset i import završen!')
    console.log('Sada imaš čistu bazu sa osnovnim podacima.')

  } catch (error) {
    console.error('❌ Greška:', error)
  }
}

// Pokreni reset
resetAndImport()