// Skripta za import svih podataka u Sanity
// Pokreni sa: node scripts/import-to-sanity.js

const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skYc1dLdlL4lEIKyyuy39qoANTkDFMlnL8IUaKYcyiJ31DsmSBJWyWLA5vWBKcGRAtDcVsB5DPKn4I8NheeBOG75VBTuWZSDEjFGewZFaypQtvaSIQEVmb1EQEOOtrYhKZvseL1xw9QRJcvQmkUo3HE2ze29bGx5hmL0Yj4mzJduq0WxNrPV',
  useCdn: false
})

async function importData() {
  console.log('🚀 Počinje import podataka u Sanity...')

  try {
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

    // 2. Programi
    console.log('📝 Kreiram programe...')
    const program1 = await client.create({
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
      icon: 'calculator',
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
      icon: 'target',
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
        answer: 'Program brzočitanja traje 6 meseci sa redovnim časovima 2 puta nedeljno. Nakon završetka osnovnog programa, učenici mogu nastaviti sa naprednim tehnikama.',
        category: 'programs',
        order: 1
      },
      {
        question: 'Od koje godine dete može da krene sa mentalnom aritmetikom?',
        answer: 'Preporučujemo da deca krenu sa mentalnom aritmetikom od 5. godine, kada već poznaju brojeve i osnovne matematičke operacije.',
        category: 'programs',
        order: 2
      },
      {
        question: 'Da li postoji probni čas?',
        answer: 'Da, nudimo besplatan probni čas kako bi vaše dete moglo da se upozna sa našim metodama i instruktorima pre upisa.',
        category: 'enrollment',
        order: 3
      },
      {
        question: 'Kako se vrši plaćanje?',
        answer: 'Plaćanje se vrši mesečno, unapred, putem uplatnice ili bankovnog transfera. Nudimo porodične popuste za upis više dece.',
        category: 'pricing',
        order: 4
      },
      {
        question: 'Šta ako dete propusti čas?',
        answer: 'Propušteni časovi se mogu nadoknaditi u dogovoru sa instruktorom, u okviru tekućeg meseca.',
        category: 'general',
        order: 5
      },
      {
        question: 'Da li postoje popusti?',
        answer: 'Da, nudimo porodične popuste od 10% za drugo dete i 15% za treće dete iz iste porodice.',
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
        bio: 'Doktor pedagoških nauka sa 15 godina iskustva u radu sa decom. Autor nekoliko knjiga o modernim metodama učenja.'
      },
      {
        name: 'Prof. Stefan Nikolić',
        slug: { current: 'prof-stefan-nikolic' },
        title: 'Instruktor mentalne aritmetike',
        bio: 'Profesor matematike i sertifikovani instruktor mentalne aritmetike sa međunarodnim iskustvom.'
      },
      {
        name: 'Psiholog Marija Stojanović',
        slug: { current: 'marija-stojanovic' },
        title: 'Dečji psiholog',
        bio: 'Specijalista za rad sa decom i porodičnu terapiju. Pomaže roditeljima da razumeju i podrže razvoj svoje dece.'
      }
    ]

    const createdAuthors = {}
    for (const author of authors) {
      const created = await client.create({ _type: 'author', ...author })
      createdAuthors[author.name] = created._id
    }
    console.log('✅ Autori kreirani')

    // 6. Blog postovi
    console.log('📝 Kreiram blog postove...')
    const blogPosts = [
      {
        title: '5 tehnika brzočitanja koje svako dete može da nauči',
        slug: { current: '5-tehnika-brzocitanja' },
        excerpt: 'Otkrijte jednostavne tehnike koje će pomoći vašem detetu da čita brže i efikasnije.',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Brzočitanje nije samo o brzini - to je veština koja pomaže deci da bolje razumeju ono što čitaju.'
              }
            ]
          },
          {
            _type: 'block',
            style: 'h2',
            children: [{ _type: 'span', text: '1. Tehnike skeniranja' }]
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Naučite dete da brzo skenira tekst kako bi identifikovalo ključne informacije.'
              }
            ]
          }
        ],
        author: { _ref: createdAuthors['Dr. Milica Jovanović'] },
        category: { _ref: createdCategories['Brzočitanje'] },
        featured: true,
        publishedAt: new Date('2024-02-01').toISOString()
      },
      {
        title: 'Kako mentalna aritmetika pomaže u razvoju mozga',
        slug: { current: 'mentalna-aritmetika-razvoj-mozga' },
        excerpt: 'Naučno objašnjenje kako mentalna aritmetika stimuliše oba hemisfera mozga.',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Mentalna aritmetika je moćan alat za cjelokupni kognitivni razvoj deteta.'
              }
            ]
          }
        ],
        author: { _ref: createdAuthors['Prof. Stefan Nikolić'] },
        category: { _ref: createdCategories['Mentalna aritmetika'] },
        featured: true,
        publishedAt: new Date('2024-01-28').toISOString()
      },
      {
        title: 'Kako da motivišete dete za učenje',
        slug: { current: 'kako-motivisati-dete' },
        excerpt: 'Praktični saveti za roditelje o tome kako da podržite svoju decu u procesu učenja.',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Motivacija je ključ uspešnog učenja. Evo kako možete pomoći svom detetu.'
              }
            ]
          }
        ],
        author: { _ref: createdAuthors['Psiholog Marija Stojanović'] },
        category: { _ref: createdCategories['Saveti za roditelje'] },
        featured: false,
        publishedAt: new Date('2024-01-25').toISOString()
      },
      {
        title: 'Priča o Marku - od mrzitelja knjiga do bibliotekara',
        slug: { current: 'prica-o-marku' },
        excerpt: 'Inspirativna priča transformacije jednog učenika kroz program brzočitanja.',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Marko je sa 10 godina mrzeo čitanje. Evo kako se sve promenilo...'
              }
            ]
          }
        ],
        author: { _ref: createdAuthors['Dr. Milica Jovanović'] },
        category: { _ref: createdCategories['Uspešne priče'] },
        featured: true,
        publishedAt: new Date('2024-01-20').toISOString()
      },
      {
        title: 'Značaj čitanja u digitalnom dobu',
        slug: { current: 'znacaj-citanja-digitalno-doba' },
        excerpt: 'Zašto je čitanje važnije nego ikad u eri digitalnih tehnologija.',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'U doba pametnih telefona i tableta, čitanje ostaje temelj obrazovanja.'
              }
            ]
          }
        ],
        author: { _ref: createdAuthors['Dr. Milica Jovanović'] },
        category: { _ref: createdCategories['Edukacija'] },
        featured: false,
        publishedAt: new Date('2024-01-18').toISOString()
      },
      {
        title: 'Novo istraživanje o efikasnosti mentalne aritmetike',
        slug: { current: 'istrazivanje-mentalna-aritmetika' },
        excerpt: 'Najnoviji rezultati pokazuju neverovatne benefite mentalne aritmetike za decu.',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Nedavno istraživanje potvrđuje da mentalna aritmetika poboljšava akademske performanse.'
              }
            ]
          }
        ],
        author: { _ref: createdAuthors['Prof. Stefan Nikolić'] },
        category: { _ref: createdCategories['Vesti'] },
        featured: false,
        publishedAt: new Date('2024-01-15').toISOString()
      }
    ]

    for (const post of blogPosts) {
      await client.create({ _type: 'blogPost', ...post })
    }
    console.log('✅ Blog postovi kreirani')

    // 7. Testimonijali
    console.log('📝 Kreiram testimonijale...')
    const testimonials = [
      {
        name: 'Milica Stojanović',
        role: 'Majka dvoje dece',
        content: 'Neverovatna promena kod moje dece! Marko sada obožava da čita, a Ana je postala prava matematička zvezda. Preporučujem svima!',
        rating: 5,
        featured: true
      },
      {
        name: 'Petar Nikolić',
        role: 'Otac',
        content: 'Najbolja investicija u budućnost našeg deteta. Rezultati su vidljivi već nakon mesec dana.',
        rating: 5,
        featured: true
      }
    ]

    for (const testimonial of testimonials) {
      await client.create({ _type: 'testimonial', ...testimonial })
    }
    console.log('✅ Testimonijali kreirani')

    // 8. Success Stories
    console.log('📝 Kreiram priče o uspehu...')
    const successStories = [
      {
        _type: 'successStory',
        studentName: 'Marko Petrović',
        age: '12 godina',
        program: { _ref: program1._id },
        testimonial: 'Pre kursa sam izbegavao da čitam knjige. Sada pročitam 2-3 knjige nedeljno! Moje ocene iz srpskog jezika su se drastično poboljšale, a učenje mi ide mnogo lakše.',
        results: [
          { metric: '300%', label: 'Brže čitanje' },
          { metric: 'Sa 3 na 5', label: 'Ocena iz srpskog' },
          { metric: '2h → 45min', label: 'Vreme učenja' }
        ],
        beforeSkills: [
          'Sporo čitanje - 150 reči/minut',
          'Poteškoće sa koncentracijom',
          'Dugotrajno učenje lekcija',
          'Strah od čitanja',
          'Nisko samopouzdanje'
        ],
        afterSkills: [
          'Brzo čitanje - 500+ reči/minut',
          'Odlična koncentracija i fokus',
          'Efikasno učenje za kraće vreme',
          'Ljubav prema knjigama',
          'Visoko samopouzdanje'
        ],
        featured: true,
        publishedAt: new Date('2024-01-15').toISOString()
      },
      {
        _type: 'successStory',
        studentName: 'Ana Nikolić',
        age: '10 godina',
        program: { _ref: program2._id },
        testimonial: 'Matematika mi je sada omiljeni predmet! Mogu da računam brže od svih u razredu, čak i od nastavnice ponekad. Osvojila sam prvo mesto na školskom takmičenju!',
        results: [
          { metric: '1. mesto', label: 'Školsko takmičenje' },
          { metric: '100%', label: 'Tačnost računanja' },
          { metric: '5', label: 'Ocena iz matematike' }
        ],
        featured: true,
        publishedAt: new Date('2024-01-10').toISOString()
      }
    ]

    for (const story of successStories) {
      await client.create(story)
    }
    console.log('✅ Priče o uspehu kreirane')

    console.log('\n🎉 Import završen uspešno!')
    console.log('Proveri svoj Sanity Studio da vidiš sve podatke.')

  } catch (error) {
    console.error('❌ Greška prilikom importa:', error)
  }
}

// Pokreni import
importData()