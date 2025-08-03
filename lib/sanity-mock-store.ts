// Mock Sanity store sa svim podacima sa sajta
// U produkciji, ovi podaci bi bili u Sanity CMS-u

export const mockSanityData = {
  navigation: {
    _id: 'navigation',
    _type: 'navigation',
    title: 'Glavna navigacija',
    mainMenu: [
      {
        label: 'Metodologija',
        href: '/metodologija',
        subItems: [
          { label: 'Naše metode', href: '/metodologija' },
          { label: 'Obuka i mentorstvo', href: '/obuka-mentorstvo' },
          { label: 'O autorki', href: '/o-autorki' }
        ]
      },
      {
        label: 'Franšiza',
        href: '/fransiza-modeli',
        subItems: [
          { label: 'Modeli franšize', href: '/fransiza-modeli' },
          { label: 'Kako se pridružiti', href: '/kako-se-pridruziti' },
          { label: 'Kalkulatori', href: '/kalkulatori' },
          { label: 'Kvizovi', href: '/kvizovi' }
        ]
      },
      {
        label: 'Učionica',
        href: '/ucionica',
        subItems: [
          { label: 'Naša učionica', href: '/ucionica' },
          { label: '3D virtuelni obilazak', href: '/3d-ucionica' },
          { label: 'Programi', href: '/ucionica#programs' }
        ]
      },
      {
        label: 'Knjige',
        href: '/knjige'
      },
      {
        label: 'Resursi',
        href: '/resursi',
        subItems: [
          { label: 'Besplatni resursi', href: '/resursi' },
          { label: 'Blog', href: '/blog' },
          { label: 'FAQ', href: '/faq' }
        ]
      },
      {
        label: 'Kontakt',
        href: '/kontakt',
        subItems: [
          { label: 'Kontaktirajte nas', href: '/kontakt' },
          { label: 'Lokacije', href: '/lokacije' },
          { label: 'Zakažite konsultacije', href: '/zakazivanje' }
        ]
      }
    ],
    ctaButton: {
      text: 'Zakažite konsultacije',
      href: '/zakazivanje',
      style: 'primary'
    },
    mobileMenuOrder: []
  },

  homePage: {
    _id: 'homePage',
    _type: 'homePage',
    enhancedHero: {
      title: 'Otvori vrata svojoj učionici iz snova',
      subtitle: '20.000+ dece već uči našom metodom. Pridružite se mreži koja pravi razliku.',
      primaryCta: {
        text: 'Zakažite konsultacije',
        link: '/zakazivanje'
      },
      secondaryCta: {
        text: 'Saznajte više',
        link: '/metodologija'
      },
      trustBadges: [
        {
          icon: 'heart',
          label: '20.000+ zadovoljne dece',
          description: 'Već su deo naše priče'
        }
      ]
    },
    statistics: [
      { icon: 'users', number: '20.000', label: 'Zadovoljne dece', description: 'Koje uče našom metodom' },
      { icon: 'location', number: '50', label: 'Partnera u mreži', description: 'Širom regiona' },
      { icon: 'chart', number: '15', label: 'Godina iskustva', description: 'U obrazovanju' },
      { icon: 'calendar', number: '95', label: 'Stopa zadovoljstva', description: 'Zadovoljnih roditelja' }
    ],
    differentiators: {
      sectionTitle: 'Zašto baš Srećno učenje?',
      items: [
        {
          title: 'Jedinstvena metodologija',
          description: 'Naša metodologija kombinuje nauku i kreativnost',
          icon: 'brain',
          features: ['Dokazana efikasnost', 'Naučni pristup', 'Kreativno učenje']
        },
        {
          title: 'Podrška kroz sve korake',
          description: 'Od početka do uspeha, tu smo za vas',
          icon: 'trophy',
          features: ['24/7 podrška', 'Kontinuirana obuka', 'Mentorstvo']
        },
        {
          title: 'Ljubav prema učenju',
          description: 'Učimo decu da vole da uče',
          icon: 'heart',
          features: ['Pozitivno okruženje', 'Motivacija', 'Radost učenja']
        }
      ]
    },
    franchiseSteps: {
      sectionTitle: '4 koraka do vaše franšize',
      steps: [
        { title: 'Kontakt', description: 'Zakažite besplatne konsultacije', icon: 'phone' },
        { title: 'Odaberite model', description: 'Izaberite paket koji vam odgovara', icon: 'check' },
        { title: 'Obuka', description: 'Prođite kroz našu obuku', icon: 'book' },
        { title: 'Pokretanje', description: 'Otvorite svoj centar', icon: 'rocket' }
      ]
    },
    successStories: {
      sectionTitle: 'Priče uspeha',
      featuredVideo: 'https://www.youtube.com/watch?v=example'
    },
    homeFaqs: {
      sectionTitle: 'Često postavljana pitanja',
      faqs: []
    }
  },

  resources: [
    {
      _id: 'resource-1',
      _type: 'resource',
      title: 'Vodič za pokretanje franšize',
      slug: { current: 'vodic-pokretanje-fransize' },
      category: 'franchise_guide',
      description: 'Kompletni vodič kroz sve korake potrebne za uspešno pokretanje franšize Srećno učenje.',
      resourceType: 'pdf',
      fileSize: 2.5,
      pages: 24,
      requiresLead: true,
      tags: ['franšiza', 'vodič', 'pokretanje'],
      featured: true,
      downloadCount: 156,
      fileUrl: 'https://example.com/guide.pdf',
      thumbnail: null
    },
    {
      _id: 'resource-2',
      _type: 'resource',
      title: 'Metodologija brzog čitanja - Osnove',
      slug: { current: 'metodologija-brzo-citanje' },
      category: 'methodology',
      description: 'Naučno zasnovana metodologija za razvoj veština brzog čitanja kod dece.',
      resourceType: 'pdf',
      fileSize: 1.8,
      pages: 16,
      requiresLead: false,
      tags: ['metodologija', 'brzo čitanje', 'deca'],
      featured: false,
      downloadCount: 89,
      fileUrl: 'https://example.com/methodology.pdf',
      thumbnail: null
    },
    {
      _id: 'resource-3',
      _type: 'resource',
      title: 'Marketing strategije za edukativne centre',
      slug: { current: 'marketing-strategije' },
      category: 'marketing',
      description: 'Praktične marketing strategije za privlačenje roditelja i dece u vaš edukativni centar.',
      resourceType: 'pdf',
      fileSize: 3.2,
      pages: 32,
      requiresLead: true,
      tags: ['marketing', 'strategije', 'centar'],
      featured: false,
      downloadCount: 67,
      fileUrl: 'https://example.com/marketing.pdf',
      thumbnail: null
    },
    {
      _id: 'resource-4',
      _type: 'resource',
      title: 'Biznis plan template',
      slug: { current: 'biznis-plan-template' },
      category: 'business_plans',
      description: 'Gotov template za kreiranje biznis plana vaše franšize.',
      resourceType: 'xlsx',
      fileSize: 0.5,
      requiresLead: true,
      tags: ['biznis plan', 'template', 'excel'],
      featured: false,
      downloadCount: 134,
      fileUrl: 'https://example.com/business-plan.xlsx',
      thumbnail: null
    }
  ],

  siteSettings: {
    _id: 'site-settings-1',
    _type: 'siteSettings',
    siteName: 'Srećno učenje',
    siteDescription: 'Franšiza obrazovne metodologije koja je već inspirisala 20.000+ dece da uče srcem',
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
    ],
  },

  pages: {
    home: {
      _id: 'page-home',
      _type: 'page',
      title: 'Početna',
      slug: { current: '/' },
      hero: {
        title: 'Otvori vrata svojoj učionici iz snova',
        subtitle: '20.000+ dece već uči našom metodom. Pridružite se mreži koja pravi razliku.',
        ctaText: 'Saznajte više o franšizi',
        ctaLink: '/fransiza-modeli',
        secondaryCtaText: 'Kontaktirajte nas',
        secondaryCtaLink: '/kontakt',
      },
      statistics: [
        { value: '20.000+', label: 'Zadovoljne dece' },
        { value: '50+', label: 'Partnera u mreži' },
        { value: '15', label: 'Godina iskustva' },
        { value: '95%', label: 'Stopa zadovoljstva' }
      ],
    },
    metodologija: {
      _id: 'page-metodologija',
      _type: 'page',
      title: 'Metodologija',
      slug: { current: '/metodologija' },
      hero: {
        title: 'Metodologija koja inspiriše učenje srcem',
        subtitle: 'Otkrijte kako naša jedinstvena metoda pomaže deci da razviju ljubav prema učenju',
      },
      content: {
        description: 'Srećno učenje je više od brzočitanja i mentalne aritmetike – to je filozofija koja podstiče decu da vole učenje, razvijaju samopouzdanje i ostvaruju svoje pune potencijale.',
        steps: [
          'Upoznavanje sa svetom knjiga i brojeva kroz igru',
          'Razvijanje prirodne radoznalosti',
          'Učenje tehnika brzočitanja',
          'Ovladavanje mentalnom aritmetikom',
          'Primena naučenog u svakodnevnom životu',
          'Građenje samopouzdanja kroz uspeh',
          'Stvaranje ljubavi prema celoživotnom učenju',
          'Postizanje izvanrednih rezultata'
        ],
        fourPillars: [
          {
            season: 'Proleće',
            name: 'Vila Nada',
            theme: 'Početak puta',
            description: 'Buđenje radoznalosti i entuzijazma za učenje',
            color: 'green'
          },
          {
            season: 'Leto',
            name: 'Vila Sreća',
            theme: 'Rast i razvoj',
            description: 'Intenzivno učenje i primena tehnika',
            color: 'yellow'
          },
          {
            season: 'Jesen',
            name: 'Vila Mudrost',
            theme: 'Sazrevanje znanja',
            description: 'Produbljivanje razumevanja i veština',
            color: 'orange'
          },
          {
            season: 'Zima',
            name: 'Vila Snaga',
            theme: 'Majstorstvo',
            description: 'Postizanje izuzetnih rezultata',
            color: 'blue'
          }
        ]
      }
    }
  },

  programs: [
    {
      _id: 'program-1',
      _type: 'program',
      title: 'Brzočitanje',
      slug: { current: 'brzocitanje' },
      icon: 'book',
      description: 'Ovladajte veštinom brzog čitanja uz potpuno razumevanje pročitanog teksta',
      fullDescription: 'Program brzočitanja omogućava deci da čitaju 3-5 puta brže uz potpuno razumevanje i pamćenje pročitanog. Kroz inovativne tehnike i vežbe, deca razvijaju ljubav prema čitanju.',
      ageRange: '7-16 godina',
      duration: '6 meseci',
      groupSize: '6-8 učenika',
      modules: [
        {
          icon: 'eye',
          title: 'Vežbe za oči',
          description: 'Razvijanje perifernog vida i brzine očiju',
          topics: ['Proširivanje vidnog polja', 'Smanjenje regresija', 'Brzina fokusiranja']
        },
        {
          icon: 'brain',
          title: 'Koncentracija',
          description: 'Tehnika duboke koncentracije',
          topics: ['Eliminisanje ometača', 'Mentalni fokus', 'Aktivno čitanje']
        },
        {
          icon: 'book-open',
          title: 'Tehnike čitanja',
          description: 'Napredne metode brzog čitanja',
          topics: ['Skeniranje', 'Skimming', 'Chunking metoda']
        }
      ],
      benefits: [
        'Čitanje 3-5 puta brže',
        'Bolje razumevanje pročitanog',
        'Poboljšana koncentracija',
        'Veće samopouzdanje',
        'Bolje ocene u školi',
        'Ljubav prema knjigama'
      ],
      pricing: [
        {
          name: 'Osnovni',
          price: '8.000',
          currency: 'RSD',
          period: 'mesečno',
          features: ['4 časa mesečno', 'Grupni časovi', 'Osnovni materijali'],
          featured: false
        },
        {
          name: 'Standardni',
          price: '12.000',
          currency: 'RSD',
          period: 'mesečno',
          features: ['8 časova mesečno', 'Grupni časovi', 'Svi materijali', 'Online podrška'],
          featured: true
        },
        {
          name: 'Premium',
          price: '20.000',
          currency: 'RSD',
          period: 'mesečno',
          features: ['8 časova mesečno', 'Kombinacija grupa/individual', 'Premium materijali', 'Mentoring'],
          featured: false
        }
      ],
      order: 1
    },
    {
      _id: 'program-2',
      _type: 'program',
      title: 'Mentalna aritmetika',
      slug: { current: 'mentalna-aritmetika' },
      icon: 'calculator',
      description: 'Naučite da računate brže od kalkulatora koristeći moć vizualizacije',
      fullDescription: 'Mentalna aritmetika razvija oba hemisfera mozga kroz rad sa abakusom. Deca uče da vizualizuju abakus i izvršavaju kompleksne matematičke operacije u glavi.',
      ageRange: '5-14 godina',
      duration: '12 meseci',
      groupSize: '6-8 učenika',
      modules: [
        {
          icon: 'calculator',
          title: 'Rad sa abakusom',
          description: 'Osnove rada sa abakusom',
          topics: ['Pozicije kuglica', 'Osnovne operacije', 'Brzina manipulacije']
        },
        {
          icon: 'target',
          title: 'Vizualizacija',
          description: 'Mentalna slika abakusa',
          topics: ['Kreiranje mentalne slike', 'Održavanje fokusa', 'Brzina vizualizacije']
        },
        {
          icon: 'rocket',
          title: 'Napredne operacije',
          description: 'Kompleksni proračuni',
          topics: ['Množenje i deljenje', 'Rad sa decimalima', 'Simultane operacije']
        }
      ],
      benefits: [
        'Brže mentalno računanje',
        'Razvoj oba hemisfera mozga',
        'Poboljšana memorija',
        'Bolja logika',
        'Veća kreativnost',
        'Samopouzdanje u matematici'
      ],
      pricing: [
        {
          name: 'Osnovni',
          price: '8.000',
          currency: 'RSD',
          period: 'mesečno',
          features: ['4 časa mesečno', 'Grupni časovi', 'Abakus uključen'],
          featured: false
        },
        {
          name: 'Standardni',
          price: '12.000',
          currency: 'RSD',
          period: 'mesečno',
          features: ['8 časova mesečno', 'Grupni časovi', 'Svi materijali', 'Online vežbanje'],
          featured: true
        },
        {
          name: 'Premium',
          price: '20.000',
          currency: 'RSD',
          period: 'mesečno',
          features: ['8 časova mesečno', 'Mali grupe', 'Individualni pristup', 'Takmičenja'],
          featured: false
        }
      ],
      order: 2
    },
    {
      _id: 'program-3',
      _type: 'program',
      title: 'Kombinovani program',
      slug: { current: 'kombinovani-program' },
      icon: 'target',
      description: 'Najbolje iz oba programa za maksimalne rezultate',
      fullDescription: 'Kombinovani program spaja tehnike brzočitanja i mentalne aritmetike za sveobuhvatan razvoj kognitivnih sposobnosti.',
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
    }
  ],

  successStories: [
    {
      _id: 'success-1',
      _type: 'successStory',
      studentName: 'Marko Petrović',
      age: '12 godina',
      program: { _ref: 'program-1' },
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
      publishedAt: new Date('2024-01-15')
    },
    {
      _id: 'success-2',
      _type: 'successStory',
      studentName: 'Ana Nikolić',
      age: '10 godina',
      program: { _ref: 'program-2' },
      testimonial: 'Matematika mi je sada omiljeni predmet! Mogu da računam brže od svih u razredu, čak i od nastavnice ponekad. Osvojila sam prvo mesto na školskom takmičenju!',
      results: [
        { metric: '1. mesto', label: 'Školsko takmičenje' },
        { metric: '100%', label: 'Tačnost računanja' },
        { metric: '5', label: 'Ocena iz matematike' }
      ],
      beforeSkills: [
        'Strah od matematike',
        'Sporo računanje',
        'Česte greške',
        'Nedostatak samopouzdanja'
      ],
      afterSkills: [
        'Ljubav prema matematici',
        'Munjevito brzo računanje',
        '100% tačnost',
        'Visoko samopouzdanje'
      ],
      featured: true,
      publishedAt: new Date('2024-01-10')
    },
    {
      _id: 'success-3',
      _type: 'successStory',
      studentName: 'Stefan Jovanović',
      age: '14 godina',
      program: { _ref: 'program-3' },
      testimonial: 'Ovaj kurs mi je promenio život. Ne samo da bolje učim, već imam više samopouzdanja i vremena za sport i druženje. Roditelji su oduševljeni mojim napretkom.',
      results: [
        { metric: '4.8', label: 'Prosek ocena' },
        { metric: '+2h', label: 'Slobodno vreme dnevno' },
        { metric: '250%', label: 'Brzina učenja' }
      ],
      featured: true,
      publishedAt: new Date('2024-01-05')
    }
  ],

  faqs: [
    {
      _id: 'faq-1',
      _type: 'faq',
      question: 'Koliko dugo traje program brzočitanja?',
      answer: 'Program brzočitanja traje 6 meseci sa redovnim časovima 2 puta nedeljno. Nakon završetka osnovnog programa, učenici mogu nastaviti sa naprednim tehnikama.',
      category: 'programs',
      order: 1
    },
    {
      _id: 'faq-2',
      _type: 'faq',
      question: 'Od koje godine dete može da krene sa mentalnom aritmetikom?',
      answer: 'Preporučujemo da deca krenu sa mentalnom aritmetikom od 5. godine, kada već poznaju brojeve i osnovne matematičke operacije.',
      category: 'programs',
      order: 2
    },
    {
      _id: 'faq-3',
      _type: 'faq',
      question: 'Da li postoji probni čas?',
      answer: 'Da, nudimo besplatan probni čas kako bi vaše dete moglo da se upozna sa našim metodama i instruktorima pre upisa.',
      category: 'enrollment',
      order: 3
    },
    {
      _id: 'faq-4',
      _type: 'faq',
      question: 'Kako se vrši plaćanje?',
      answer: 'Plaćanje se vrši mesečno, unapred, putem uplatnice ili bankovnog transfera. Nudimo porodične popuste za upis više dece.',
      category: 'pricing',
      order: 4
    },
    {
      _id: 'faq-5',
      _type: 'faq',
      question: 'Šta ako dete propusti čas?',
      answer: 'Propušteni časovi se mogu nadoknaditi u dogovoru sa instruktorom, u okviru tekućeg meseca.',
      category: 'general',
      order: 5
    },
    {
      _id: 'faq-6',
      _type: 'faq',
      question: 'Da li postoje popusti?',
      answer: 'Da, nudimo porodične popuste od 10% za drugo dete i 15% za treće dete iz iste porodice.',
      category: 'pricing',
      order: 6
    }
  ],

  blogCategories: [
    { _id: 'cat-1', _type: 'blogCategory', title: 'Brzočitanje', slug: { current: 'brzocitanje' } },
    { _id: 'cat-2', _type: 'blogCategory', title: 'Mentalna aritmetika', slug: { current: 'mentalna-aritmetika' } },
    { _id: 'cat-3', _type: 'blogCategory', title: 'Saveti za roditelje', slug: { current: 'saveti-za-roditelje' } },
    { _id: 'cat-4', _type: 'blogCategory', title: 'Uspešne priče', slug: { current: 'uspesne-price' } },
    { _id: 'cat-5', _type: 'blogCategory', title: 'Edukacija', slug: { current: 'edukacija' } },
    { _id: 'cat-6', _type: 'blogCategory', title: 'Vesti', slug: { current: 'vesti' } }
  ],

  authors: [
    {
      _id: 'author-1',
      _type: 'author',
      name: 'Dr. Milica Jovanović',
      slug: { current: 'dr-milica-jovanovic' },
      title: 'Stručnjak za brzočitanje',
      bio: 'Doktor pedagoških nauka sa 15 godina iskustva u radu sa decom. Autor nekoliko knjiga o modernim metodama učenja.',
    },
    {
      _id: 'author-2',
      _type: 'author',
      name: 'Prof. Stefan Nikolić',
      slug: { current: 'prof-stefan-nikolic' },
      title: 'Instruktor mentalne aritmetike',
      bio: 'Profesor matematike i sertifikovani instruktor mentalne aritmetike sa međunarodnim iskustvom.',
    },
    {
      _id: 'author-3',
      _type: 'author',
      name: 'Psiholog Marija Stojanović',
      slug: { current: 'marija-stojanovic' },
      title: 'Dečji psiholog',
      bio: 'Specijalista za rad sa decom i porodičnu terapiju. Pomaže roditeljima da razumeju i podrže razvoj svoje dece.',
    }
  ],

  blogPosts: [
    {
      _id: 'post-1',
      _type: 'blogPost',
      title: 'Brzočitanje za decu: Kako razviti ljubav prema čitanju',
      slug: { current: 'brzocitanje-za-decu' },
      excerpt: 'Otkrijte kako brzočitanje može transformisati odnos vašeg deteta prema knjigama i učenju.',
      author: { _ref: 'author-1' },
      category: { _ref: 'cat-1' },
      publishedAt: new Date('2024-01-15'),
      readTime: 5,
      featured: true,
      content: `
        Brzočitanje nije samo veština koja omogućava deci da čitaju brže. To je sveobuhvatan pristup koji transformiše način na koji deca percipiraju i obrađuju informacije.
        
        ## Zašto je brzočitanje važno?
        
        U današnjem svetu prepunom informacija, sposobnost brzog čitanja uz potpuno razumevanje postaje ključna veština za uspeh. Deca koja ovladaju brzočitanjem:
        
        - Uživaju u čitanju umesto da ga doživljavaju kao obavezu
        - Brže završavaju domaće zadatke
        - Imaju više vremena za igru i druge aktivnosti
        - Razvijaju bolju koncentraciju
        - Postižu bolje rezultate u školi
        
        ## Kako početi?
        
        Prvi korak je procena trenutnih sposobnosti deteta. Prosečna brzina čitanja kod dece školskog uzrasta je između 150-200 reči u minuti. Kroz naš program, deca mogu dostići brzinu od 500-800 reči u minuti uz potpuno razumevanje.
      `
    },
    {
      _id: 'post-2',
      _type: 'blogPost',
      title: 'Top 10 benefita mentalne aritmetike za razvoj deteta',
      slug: { current: 'mentalna-aritmetika-benefiti' },
      excerpt: 'Saznajte kako mentalna aritmetika pomaže u sveukupnom kognitivnom razvoju vašeg deteta.',
      author: { _ref: 'author-2' },
      category: { _ref: 'cat-2' },
      publishedAt: new Date('2024-01-10'),
      readTime: 7,
      featured: false
    },
    {
      _id: 'post-3',
      _type: 'blogPost',
      title: 'Kako motivisati dete za učenje: Praktični saveti',
      slug: { current: 'kako-motivisati-dete' },
      excerpt: 'Efikasne strategije koje će pomoći vašem detetu da razvije pozitivan odnos prema učenju.',
      author: { _ref: 'author-3' },
      category: { _ref: 'cat-3' },
      publishedAt: new Date('2024-01-05'),
      readTime: 6,
      featured: false
    }
  ],

  testimonials: [
    {
      _id: 'testimonial-1',
      _type: 'testimonial',
      name: 'Milica Stojanović',
      role: 'Majka dvoje dece',
      content: 'Neverovatna promena kod moje dece! Marko sada obožava da čita, a Ana je postala prava matematička zvezda. Preporučujem svima!',
      rating: 5,
      featured: true
    },
    {
      _id: 'testimonial-2',
      _type: 'testimonial',
      name: 'Petar Nikolić',
      role: 'Otac',
      content: 'Najbolja investicija u budućnost našeg deteta. Rezultati su vidljivi već nakon mesec dana.',
      rating: 5,
      featured: true
    }
  ],

  teamMembers: [
    {
      _id: 'team-1',
      _type: 'teamMember',
      name: 'Dr. Milica Jovanović',
      position: 'Direktor programa',
      bio: 'Sa 15 godina iskustva u obrazovanju, dr. Jovanović vodi naš tim stručnjaka.',
      qualifications: ['Doktor pedagoških nauka', 'Sertifikovani instruktor brzočitanja', 'Autor 3 knjige'],
      email: 'milica@srecno-ucenje.rs',
      order: 1
    },
    {
      _id: 'team-2',
      _type: 'teamMember',
      name: 'Prof. Stefan Nikolić',
      position: 'Glavni instruktor mentalne aritmetike',
      bio: 'Međunarodno priznati stručnjak za mentalnu aritmetiku sa brojnim nagradama.',
      qualifications: ['Profesor matematike', 'Međunarodni sertifikat za mentalnu aritmetiku', 'Mentor šampiona'],
      email: 'stefan@srecno-ucenje.rs',
      order: 2
    }
  ],

  franchiseModels: {
    _id: 'franchise-1',
    _type: 'page',
    title: 'Franšiza Modeli',
    pricing: [
      {
        name: 'Početni paket',
        price: '3.000',
        currency: 'EUR',
        period: 'jednokratno',
        features: [
          'Kompletna obuka (40h)',
          'Početni set materijala',
          'Marketing podrška',
          '3 meseca mentorstva',
          'Pristup online platformi'
        ],
        featured: false
      },
      {
        name: 'Profesionalni paket',
        price: '5.000',
        currency: 'EUR',
        period: 'jednokratno',
        features: [
          'Sve iz početnog paketa',
          'Proširena obuka (80h)',
          'Ekskluzivna teritorija',
          '6 meseci mentorstva',
          'Napredni marketing paketi',
          'Pomoć pri zapošljavanju'
        ],
        featured: true
      },
      {
        name: 'Premium paket',
        price: '8.000',
        currency: 'EUR',
        period: 'jednokratno',
        features: [
          'Sve iz profesionalnog',
          'Master obuka (120h)',
          'Veća ekskluzivna teritorija',
          '12 meseci mentorstva',
          'Kompletno brendiranje',
          'Garancija uspeha'
        ],
        featured: false
      }
    ]
  }
}