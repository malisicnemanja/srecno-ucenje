// Skripta za brisanje duplikata iz Sanity
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skYc1dLdlL4lEIKyyuy39qoANTkDFMlnL8IUaKYcyiJ31DsmSBJWyWLA5vWBKcGRAtDcVsB5DPKn4I8NheeBOG75VBTuWZSDEjFGewZFaypQtvaSIQEVmb1EQEOOtrYhKZvseL1xw9QRJcvQmkUo3HE2ze29bGx5hmL0Yj4mzJduq0WxNrPV',
  useCdn: false
})

async function cleanDuplicates() {
  console.log('🧹 Počinje čišćenje duplikata iz Sanity...')

  try {
    // Prvo, obriši sve postojeće dokumente
    const allDocuments = await client.fetch(`*[!(_id in path("_.*"))]`)
    console.log(`Pronađeno ${allDocuments.length} dokumenata. Brišem sve...`)
    
    for (const doc of allDocuments) {
      await client.delete(doc._id)
    }
    
    console.log('✅ Svi dokumenti obrisani')

    // Sada importuj samo jedinstvene podatke
    console.log('\n📝 Import jedinstvenih podataka...')
    
    // 1. Site Settings
    console.log('📝 Kreiram Site Settings...')
    const siteSettings = await client.create({
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

    // 2. Programi (bez emoji ikona!)
    console.log('📝 Kreiram programe...')
    const program1 = await client.create({
      _type: 'program',
      title: 'Brzočitanje',
      slug: { current: 'brzocitanje' },
      icon: 'book', // Tekstualna ikona
      description: 'Ovladajte veštinom brzog čitanja uz potpuno razumevanje pročitanog teksta',
      ageRange: '7-16 godina',
      duration: '6 meseci',
      groupSize: '6-8 učenika',
      benefits: [
        'Čitanje 3-5 puta brže',
        'Bolje razumevanje pročitanog',
        'Poboljšana koncentracija',
        'Veće samopouzdanje',
        'Bolje ocene u školi',
        'Ljubav prema knjigama'
      ],
      order: 1
    })

    const program2 = await client.create({
      _type: 'program',
      title: 'Mentalna aritmetika',
      slug: { current: 'mentalna-aritmetika' },
      icon: 'calculator', // Tekstualna ikona
      description: 'Naučite da računate brže od kalkulatora koristeći moć vizualizacije',
      ageRange: '5-14 godina',
      duration: '12 meseci',
      groupSize: '6-8 učenika',
      benefits: [
        'Brže mentalno računanje',
        'Razvoj oba hemisfera mozga',
        'Poboljšana memorija',
        'Bolja logika',
        'Veća kreativnost',
        'Samopouzdanje u matematici'
      ],
      order: 2
    })

    const program3 = await client.create({
      _type: 'program',
      title: 'Kombinovani program',
      slug: { current: 'kombinovani-program' },
      icon: 'target', // Tekstualna ikona
      description: 'Najbolje iz oba programa za maksimalne rezultate',
      ageRange: '7-14 godina',
      duration: '12 meseci',
      groupSize: '6-8 učenika',
      benefits: [
        'Kompletan kognitivni razvoj',
        'Ušteda vremena i novca',
        'Sinergija programa',
        'Brži napredak',
        'Sveobuhvatni rezultati'
      ],
      order: 3
    })
    console.log('✅ Programi kreirani')

    // 3. FAQ
    console.log('📝 Kreiram FAQ pitanja...')
    const faqData = [
      {
        question: 'Koliko dugo traje program brzočitanja?',
        answer: 'Program brzočitanja traje 6 meseci sa redovnim časovima 2 puta nedeljno.',
        category: 'programs',
        order: 1
      },
      {
        question: 'Od koje godine dete može da krene sa mentalnom aritmetikom?',
        answer: 'Preporučujemo da deca krenu sa mentalnom aritmetikom od 5. godine.',
        category: 'programs',
        order: 2
      },
      {
        question: 'Da li postoji probni čas?',
        answer: 'Da, nudimo besplatan probni čas.',
        category: 'enrollment',
        order: 3
      },
      {
        question: 'Kako se vrši plaćanje?',
        answer: 'Plaćanje se vrši mesečno, unapred.',
        category: 'pricing',
        order: 4
      },
      {
        question: 'Šta ako dete propusti čas?',
        answer: 'Propušteni časovi se mogu nadoknaditi u dogovoru sa instruktorom.',
        category: 'general',
        order: 5
      },
      {
        question: 'Da li postoje popusti?',
        answer: 'Da, nudimo porodične popuste.',
        category: 'pricing',
        order: 6
      }
    ]

    for (const faq of faqData) {
      await client.create({ _type: 'faq', ...faq })
    }
    console.log('✅ FAQ pitanja kreirana')

    // 4. Blog kategorije
    console.log('📝 Kreiram blog kategorije...')
    const categories = [
      { title: 'Brzočitanje', slug: { current: 'brzocitanje' } },
      { title: 'Mentalna aritmetika', slug: { current: 'mentalna-aritmetika' } },
      { title: 'Saveti za roditelje', slug: { current: 'saveti-za-roditelje' } },
      { title: 'Uspešne priče', slug: { current: 'uspesne-price' } },
      { title: 'Edukacija', slug: { current: 'edukacija' } },
      { title: 'Vesti', slug: { current: 'vesti' } }
    ]

    const createdCategories = {}
    for (const cat of categories) {
      const created = await client.create({ _type: 'blogCategory', ...cat })
      createdCategories[cat.title] = created._id
    }
    console.log('✅ Blog kategorije kreirane')

    // 5. Autori
    console.log('📝 Kreiram autore...')
    const authors = [
      {
        name: 'Dr. Milica Jovanović',
        slug: { current: 'dr-milica-jovanovic' },
        title: 'Stručnjak za brzočitanje',
        bio: 'Doktor pedagoških nauka sa 15 godina iskustva.'
      },
      {
        name: 'Prof. Stefan Nikolić',
        slug: { current: 'prof-stefan-nikolic' },
        title: 'Instruktor mentalne aritmetike',
        bio: 'Profesor matematike i sertifikovani instruktor.'
      },
      {
        name: 'Psiholog Marija Stojanović',
        slug: { current: 'marija-stojanovic' },
        title: 'Dečji psiholog',
        bio: 'Specijalista za rad sa decom.'
      }
    ]

    const createdAuthors = {}
    for (const author of authors) {
      const created = await client.create({ _type: 'author', ...author })
      createdAuthors[author.name] = created._id
    }
    console.log('✅ Autori kreirani')

    // 6. Jedan primer blog posta
    console.log('📝 Kreiram primer blog posta...')
    await client.create({
      _type: 'blogPost',
      title: '5 tehnika brzočitanja koje svako dete može da nauči',
      slug: { current: '5-tehnika-brzocitanja' },
      author: { _ref: createdAuthors['Dr. Milica Jovanović'] },
      category: { _ref: createdCategories['Brzočitanje'] },
      excerpt: 'Otkrijte jednostavne tehnike koje mogu transformisati način na koji vaše dete čita.',
      body: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Brzočitanje nije samo o brzini - to je veština koja otvara vrata znanja.' }]
        }
      ],
      publishedAt: new Date().toISOString()
    })
    console.log('✅ Blog post kreiran')

    // 7. Testimonijali
    console.log('📝 Kreiram testimonijale...')
    await client.create({
      _type: 'testimonial',
      name: 'Milica Stojanović',
      role: 'Majka dvoje dece',
      content: 'Neverovatna promena kod moje dece!',
      rating: 5,
      featured: true
    })
    console.log('✅ Testimonijal kreiran')

    // 8. Success Story
    console.log('📝 Kreiram priču o uspehu...')
    await client.create({
      _type: 'successStory',
      studentName: 'Marko Petrović',
      age: '12 godina',
      program: { _ref: program1._id },
      testimonial: 'Pre kursa sam izbegavao da čitam knjige. Sada pročitam 2-3 knjige nedeljno!',
      results: [
        { metric: '300%', label: 'Brže čitanje' }
      ],
      featured: true,
      publishedAt: new Date().toISOString()
    })
    console.log('✅ Priča o uspehu kreirana')

    console.log('\n🎉 Čišćenje i ponovan import završen uspešno!')
    console.log('Sada imaš samo jedinstvene podatke bez duplikata.')

  } catch (error) {
    console.error('❌ Greška:', error)
  }
}

// Pokreni čišćenje
cleanDuplicates()