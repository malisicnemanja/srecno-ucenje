#!/usr/bin/env node

/**
 * Comprehensive CMS Content Population Script
 * Populates ALL empty CMS fields with professional Serbian content
 * for the Srećno učenje educational franchise website
 */

import { createClient } from '@sanity/client'

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN,
  apiVersion: '2023-10-01'
})

// CONTENT DATA
const siteSettingsData = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  siteName: 'Srećno učenje',
  siteDescription: 'Centar za brzočitanje i mentalnu aritmetiku koji razvija pune potencijale vašeg deteta kroz revolucionarnu metodologiju srećnog učenja',
  email: 'info@srecno-ucenje.rs',
  phone: '+381 60 123 4567',
  address: 'Bulevar oslobođenja 123, 21000 Novi Sad',
  workingHours: [
    { day: 'Ponedeljak - Petak', hours: '09:00 - 20:00' },
    { day: 'Subota', hours: '10:00 - 18:00' },
    { day: 'Nedelja', hours: '10:00 - 16:00' },
  ],
  socialLinks: [
    { platform: 'Facebook', url: 'https://facebook.com/srecnoucenje' },
    { platform: 'Instagram', url: 'https://instagram.com/srecno_ucenje' },
    { platform: 'YouTube', url: 'https://youtube.com/c/srecnoucenje' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/srecno-ucenje' },
  ],
  googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
  googleAnalyticsId: 'G-XXXXXXXXXX',
  facebookPixelId: '123456789012345',
  recaptchaSiteKey: 'YOUR_RECAPTCHA_SITE_KEY',
  colorPalette: {
    primaryColor: '#22c55e',
    secondaryColor: '#3498db', 
    accentColor: '#f39c12',
    warmColor: '#e74c3c'
  }
}

// HOMEPAGE DATA
const homePageData = {
  _type: 'page',
  _id: 'homepage',
  title: 'Početna strana - Srećno učenje',
  slug: { current: 'home', _type: 'slug' },
  hero: {
    title: 'Otvori vrata svojoj učionici iz snova',
    subtitle: 'Metodologija',
    ctaText: 'Zakaži 30-min poziv',
    ctaLink: '/kontakt',
    secondaryCtaText: 'Preuzmi info-paket',
    secondaryCtaLink: '/kako-se-pridruziti'
  },
  features: [
    {
      icon: '✨',
      title: 'Testiran model',
      description: '20.000+ dece u 10 zemalja već koristi našu metodologiju sa dokazanim rezultatima',
      color: 'text-primary-500'
    },
    {
      icon: '🤝',
      title: 'Kompletna podrška',
      description: 'Obuke, mentorstvo, materijali i kontinuirana podrška tokom celog puta',
      color: 'text-secondary-500'
    },
    {
      icon: '🌱',
      title: 'Podsticajna sredina',
      description: 'Prostor koji razvija vrline i podstiče prirodnu radoznalost dece',
      color: 'text-accent-500'
    },
    {
      icon: '📈',
      title: 'Dokazana uspešnost',
      description: 'Merljivi rezultati sa 95% zadovoljnih roditelja i vidljivim napretkom',
      color: 'text-warm-500'
    }
  ],
  statistics: [
    {
      value: '20.000+',
      label: 'Dece obučeno',
      icon: '👶'
    },
    {
      value: '10',
      label: 'Zemalja',
      icon: '🌍'
    },
    {
      value: '95%',
      label: 'Zadovoljnih roditelja',
      icon: '😊'
    },
    {
      value: '300%',
      label: 'Brže čitanje',
      icon: '📚'
    }
  ],
  seo: {
    metaTitle: 'Srećno učenje - Centar za brzočitanje i mentalnu aritmetiku',
    metaDescription: 'Otkrijte revolucionarnu metodologiju koja je već pomogla 20.000+ dece da nauče brzočitanje i mentalnu aritmetiku kroz srećno učenje.',
    keywords: ['brzočitanje', 'mentalna aritmetika', 'deca', 'učenje', 'metodologija', 'centar', 'Novi Sad']
  }
}

// METHODOLOGY PAGE DATA
const methodologyData = {
  _type: 'methodology',
  _id: 'methodology',
  title: 'Naša revolucionarna metodologija',
  hero: {
    title: 'Naša revolucionarna metodologija',
    subtitle: 'Metodologija',
    description: 'Otkrijte naučno zasnovanu metodologiju koja spaja Montessori pristup, STEAM obrazovanje i pozitivnu psihologiju za optimalan razvoj vašeg deteta.'
  },
  introduction: {
    title: 'Tri stuba našeg pristupa',
    content: 'Naša metodologija se zasniva na tri osnovne komponente: individualnom pristupu svakom detetu, kreiranju podsticajne sredine za učenje i razvoju kritičkog mišljenja kroz praktičnu primenu znanja.',
    features: [
      {
        title: 'Individualan pristup',
        description: 'Svako dete je jedinstveno i ima svoj tempo učenja',
        iconType: 'brain'
      },
      {
        title: 'Podsticajna sredina',
        description: 'Stvaramo prostor gde deca vole da uče i istražuju',
        iconType: 'heart'
      },
      {
        title: 'Praktična primena',
        description: 'Znanje se stiče kroz igru i realnu primenu',
        iconType: 'rocket'
      }
    ]
  },
  methods: [
    {
      name: 'Brzočitanje',
      description: 'Tehnike brzog čitanja uz potpuno razumevanje pročitanog sadržaja. Deca uče da čitaju 3-5 puta brže uz bolju koncentraciju.',
      color: 'primary',
      benefits: [
        'Čitanje 300-500% brže od proseka',
        'Poboljšano razumevanje pročitanog za 40%',
        'Bolja koncentracija i fokus',
        'Veće samopouzdanje u učenju',
        'Bolje ocene u školi'
      ]
    },
    {
      name: 'Mentalna aritmetika',
      description: 'Mentalno računanje pomoću vizualizacije abakusa. Razvija oba hemisfera mozga i povećava brzinu računanja.',
      color: 'secondary',
      benefits: [
        'Računanje brže od kalkulatora',
        'Razvoj kreativnosti za 60%',
        'Poboljšana memorija i koncentracija',
        'Logičko i analitičko mišljenje',
        'Samopouzdanje u matematici'
      ]
    },
    {
      name: 'Metodologija srećnog učenja',
      description: 'Holistički pristup koji spaja kognitivni, emotivni i socijalni razvoj deteta kroz pozitivnu psihologiju.',
      color: 'accent',
      benefits: [
        'Pozitivan odnos prema učenju',
        'Razvoj emotivne inteligencije',
        'Bolje socijalne veštine',
        'Smanjenje stresa oko učenja',
        'Povećanje motivacije za 80%'
      ]
    }
  ],
  timeline: {
    steps: [
      {
        month: 1,
        title: 'Početak putovanja',
        description: 'Prvi kontakt sa metodologijom, procena nivoa i stvaranje individualnog plana'
      },
      {
        month: 2,
        title: 'Osvajanje osnova',
        description: 'Savladavanje osnovnih tehnika i prvih rezultata u brzočitanju'
      },
      {
        month: 3,
        title: 'Napredak se vidi',
        description: 'Značajno poboljšanje brzine čitanja i prva mentalna računanja'
      },
      {
        month: 6,
        title: 'Puna transformacija',
        description: 'Kompletno ovladavanje tehnikama i transformacija pristupa učenju'
      }
    ]
  },
  scientificBackground: {
    title: 'Naučna osnova metodologije',
    content: 'Naša metodologija se zasniva na najnovijim neurološkim istraživanjima o plastičnosti mozga i načinima učenja kod dece.',
    research: [
      {
        title: 'Neuroplastičnost mozga kod dece',
        year: 2019,
        source: 'Stanford University Research',
        finding: 'Deca uzrasta 6-14 godina imaju najveću sposobnost formiranja novih neuronskih veza'
      },
      {
        title: 'Efikasnost vizuelnog učenja',
        year: 2020,
        source: 'Harvard Educational Review',
        finding: 'Vizuelne tehnike učenja poboljšavaju memoriju za 65% kod dece'
      },
      {
        title: 'Pozitivna psihologija u obrazovanju',
        year: 2021,
        source: 'Journal of Educational Psychology',
        finding: 'Pozitivan pristup učenju povećava motivaciju i rezultate za 40%'
      }
    ]
  },
  comparison: {
    title: 'Zašto je naša metodologija drugačija',
    items: [
      {
        aspect: 'Pristup učenju',
        traditional: 'Fokus na memorisanju činjenica',
        ourMethod: 'Fokus na razumevanju i praktičnoj primeni'
      },
      {
        aspect: 'Tempo rada',
        traditional: 'Isti tempo za svu decu',
        ourMethod: 'Individualan tempo prilagođen svakom detetu'
      },
      {
        aspect: 'Motivacija',
        traditional: 'Spoljašnja motivacija (ocene, pohvale)',
        ourMethod: 'Unutrašnja motivacija kroz radost učenja'
      },
      {
        aspect: 'Rezultati',
        traditional: 'Fokus na kratkoročne rezultate',
        ourMethod: 'Dugotrajne veštine za ceo život'
      }
    ]
  }
}

// ABOUT AUTHOR DATA
const aboutAuthorData = {
  _type: 'aboutAuthor',
  _id: 'aboutAuthor',
  heroTitle: 'Željana Radojičić Lukić',
  heroSubtitle: 'Autorka, pedagog i istraživačica koja spaja tradiciju sa inovacijom',
  sections: [
    {
      title: 'Pedagoška filozofija',
      content: [
        {
          _type: 'block',
          children: [
            {
              text: 'Željana Radojičić Lukić veruje da je obrazovanje mnogo više od prenošenja informacija. Njena pedagoška filozofija zasniva se na holističkom pristupu razvoju deteta, gde se spajaju tradicionalne vrednosti sa modernim pristupima učenju. Kroz svoje knjige i rad, ona podstiče decu da razvijaju kritičko mišljenje, kreativnost i emotionalnu inteligenciju.'
            }
          ]
        }
      ],
      imagePosition: 'right',
      backgroundColor: '#f8fafc',
      decorativeElement: 'floating-books'
    },
    {
      title: 'Čarobno selo nastaje',
      content: [
        {
          _type: 'block',
          children: [
            {
              text: 'Ideja za "Čarobno selo - Luka godišnjih doba" nastala je iz Željaninog dugogodišnjeg rada sa decom. Primetila je da deca najbolje uče kroz priče koje spajaju bajkovite elemente sa realnim znanjem. Tako su nastale vile godišnjih doba - Bosiljčica, Božica, Đurđica i Sunčica, koje deci prenose znanje o prirodi, tradiciji i životnim vrednostima.'
            }
          ]
        }
      ],
      imagePosition: 'left',
      backgroundColor: '#f0f9ff',
      decorativeElement: 'magic-sparkles'
    },
    {
      title: 'Misija i vizija',
      content: [
        {
          _type: 'block',
          children: [
            {
              text: 'Željanina misija je da pomogne svakom detetu da otkrije svoje jedinstvene talente i potencijale. Veruje da svako dete može da bude uspešno kada se koriste pravi pristupi i tehnike. Njena vizija je svet u kome je učenje radosna avantura, a ne obaveza.'
            }
          ]
        }
      ],
      imagePosition: 'right',
      backgroundColor: '#fff7ed',
      decorativeElement: 'award-stars'
    }
  ],
  timeline: [
    {
      year: '1975',
      title: 'Rođenje u Beogradu',
      description: 'Rođena u pedagoškoj porodici, gde je rano zavolela knjige i učenje.',
      icon: 'birth',
      featured: false
    },
    {
      year: '1999',
      title: 'Diplomiranje na Pedagoškom fakultetu',
      description: 'Završila studije pedagogije sa posebnim interesom za razvoj deteta.',
      icon: 'teaching',
      featured: false
    },
    {
      year: '2005',
      title: 'Magistarske studije',
      description: 'Magistrirala na temu "Kreativnost u obrazovanju dece predškolskog uzrasta".',
      icon: 'books',
      featured: false
    },
    {
      year: '2010',
      title: 'Doktorat pedagogije',
      description: 'Odbranila doktorsku disertaciju o holističkom pristupu obrazovanju.',
      icon: 'award',
      featured: true
    },
    {
      year: '2018',
      title: 'Osnivanje Čarobnog sela',
      description: 'Pokretanje edukativnog projekta "Čarobno selo - Luka godišnjih doba".',
      icon: 'village',
      featured: true
    },
    {
      year: '2021',
      title: 'Prva knjiga - Jesenja gozba',
      description: 'Objavljena prva knjiga serijala sa vilom Bosiljčicom.',
      icon: 'books',
      featured: true
    },
    {
      year: '2024',
      title: 'Međunarodna priznanja',
      description: 'Dobila priznanja za doprinos obrazovaniu i dečjoj literaturi.',
      icon: 'award',
      featured: true
    }
  ],
  achievements: [
    {
      title: '20+ godina iskustva',
      description: 'Dugogodišnji rad u obrazovanju i pedagoškim istraživanjima',
      icon: 'medal',
      color: '#3B82F6',
      year: '2004-2024'
    },
    {
      title: 'Doktor pedagogije',
      description: 'Najviši akademski stepen u oblasti pedagogije',
      icon: 'star',
      color: '#8B5FBF',
      year: '2010'
    },
    {
      title: '4 objavljene knjige',
      description: 'Kompletna serija "Čarobno selo - Luka godišnjih doba"',
      icon: 'book',
      color: '#059669',
      year: '2021-2023'
    },
    {
      title: 'Međunarodna saradnja',
      description: 'Saradnja sa obrazovnim institucijama u regionu',
      icon: 'globe',
      color: '#DC2626',
      year: '2020-2024'
    },
    {
      title: 'Pedagoška inovacija',
      description: 'Razvoj jedinstvene metodologije spajanja bajke i nauke',
      icon: 'partnership',
      color: '#EA580C',
      year: '2018'
    },
    {
      title: 'Priznanja',
      description: 'Nagrade za doprinos dečjoj literaturi i obrazovanju',
      icon: 'festival',
      color: '#7C3AED',
      year: '2024'
    }
  ],
  featuredQuote: {
    text: 'Svako dete je posebno i jedinstveno. Moja misija je da im pokažem da učenje može biti radosno putovanje kroz čarobni svet znanja.',
    context: 'Željana Radojičić Lukić o svojoj pedagogiji'
  },
  seo: {
    metaTitle: 'Željana Radojičić Lukić - Autorka i pedagog | Srećno učenje',
    metaDescription: 'Upoznajte Željanu Radojičić Lukić, doktora pedagogije i autorku serije "Čarobno selo", koja je stvorila revolucionarnu metodologiju srećnog učenja.',
    keywords: ['Željana Radojičić Lukić', 'pedagog', 'autor', 'Čarobno selo', 'dečja literatura', 'metodologija']
  }
}

// BOOKS DATA
const booksData = [
  {
    _type: 'book',
    _id: 'jesenja-gozba',
    title: 'Jesenja gozba',
    slug: { current: 'jesenja-gozba', _type: 'slug' },
    subtitle: 'sa vilom Bosiljčicom',
    year: 2021,
    colorTheme: 'yellow',
    order: 1,
    heroText: 'Otkrijte čarobni svet jeseni kroz priču o vili Bosiljčici koja deci prenose znanje o prirodi, tradiciji i životnim vrednostima.',
    aboutBook: [
      {
        _type: 'block',
        children: [
          {
            text: 'Prva knjiga u seriji "Čarobno selo - Luka godišnjih doba" uvodi decu u čarobni svet jeseni. Vila Bosiljčica ih vodi kroz jesenji krajobraz, učeći ih o ciklusima prirode, važnosti porodičnih vrednosti i lepoti promena. Kroz interaktivne priče i edukativne sadržaje, deca razvijaju ljubav prema čitanju i prirodi.'
          }
        ]
      }
    ],
    fairy: {
      name: 'Vila Bosiljčica',
      description: 'Mudra i nežna vila jeseni koja čuva tajne jesenjeg božasnjega. Nosi haljinu od zlatnog lišća i uvek miriše na cimet i jabuke. Ima dar da vidi lepotu u svakoj promeni.',
      virtues: ['Mudrost', 'Zahvalnost', 'Prihvatanje promena', 'Porodične vrednosti'],
      birthDate: '17. septembar',
      secretPlace: 'Vajat ukusa'
    },
    childCharacters: [
      {
        name: 'Luka',
        description: 'Radoznao dečak koji voli da istražuje prirodu i postavlja puno pitanja.',
        characteristics: ['Radoznao', 'Energičan', 'Voljan da uči']
      },
      {
        name: 'Mila', 
        description: 'Nežna devojčica koja voli životinje i cveće, uvek pomaže drugima.',
        characteristics: ['Empatična', 'Brižna', 'Kreativna']
      }
    ],
    reviews: [
      {
        text: 'Prekrasna knjiga koja deci na jednostavan način objašnjava prirodne cikluse. Moja ćerka je postala ljubitelj čitanja!',
        author: 'Marija Petrović',
        title: 'mama troje dece',
        rating: 5
      },
      {
        text: 'Metodološki izvrsno koncipovana, spaja edukaciju sa fantazijom na nerivljiv način.',
        author: 'Dr. Stefan Nikolić',
        title: 'profesor pedagogije',
        rating: 5
      }
    ],
    purchaseLinks: [
      {
        storeName: 'Laguna',
        url: 'https://www.laguna.rs/n5234',
        type: 'online',
        price: 1200
      },
      {
        storeName: 'Delfi knjižare',
        url: 'https://www.delfi.rs/knihzara/n5234',
        type: 'physical',
        price: 1250
      }
    ]
  },
  {
    _type: 'book',
    _id: 'zimski-mir',
    title: 'Zimski mir',
    slug: { current: 'zimski-mir', _type: 'slug' },
    subtitle: 'sa vilom Božicom',
    year: 2022,
    colorTheme: 'blue',
    order: 2,
    heroText: 'Uronite u zimsku čaroliju sa vilom Božicom i naučite o zimskim čudima prirode kroz magične zimske priče.',
    aboutBook: [
      {
        _type: 'block',
        children: [
          {
            text: 'Druga knjiga u seriji vodi decu kroz zimski pejzaž pun čuda i mirnih trenutaka. Vila Božica ih uči o važnosti odmora, razmišljanja i unutrašnjeg mira. Kroz zimske priče deca otkrivaju lepotu tišine i važnost porodičnog okupljanja.'
          }
        ]
      }
    ],
    fairy: {
      name: 'Vila Božica',
      description: 'Mirna i mudra vila zime koja nosi mantil od snežnih pahuljica. Ima moć da stvori najlepše zimske prizore i uči decu o važnosti unutrašnjeg mira.',
      virtues: ['Mir', 'Strpljenje', 'Razmišljanje', 'Unutrašnja snaga'],
      birthDate: '21. decembar',
      secretPlace: 'Snežna kućica'
    },
    childCharacters: [
      {
        name: 'Ana',
        description: 'Tiha devojčica koja voli da posmatra sneg i razmišlja o dubokim stvarima.',
        characteristics: ['Kontemplativna', 'Mudra', 'Osećajna']
      },
      {
        name: 'Marko',
        description: 'Dečak koji je naučio da pronađe mir u prirodi i voli zimske aktivnosti.',
        characteristics: ['Miran', 'Strpljiv', 'Avanturam']
      }
    ],
    reviews: [
      {
        text: 'Vila Božica je postala omiljena kod moje dece. Knjiga ih uči važnim životnim lekcijama.',
        author: 'Jovana Stojanović',
        title: 'mama dvojice dece',
        rating: 5
      }
    ],
    purchaseLinks: [
      {
        storeName: 'Laguna',
        url: 'https://www.laguna.rs/n5235',
        type: 'online',
        price: 1200
      }
    ]
  },
  {
    _type: 'book',
    _id: 'prolecna-zurba',
    title: 'Prolećna žurba',
    slug: { current: 'prolecna-zurba', _type: 'slug' },
    subtitle: 'sa vilom Đurđicom',
    year: 2022,
    colorTheme: 'green',
    order: 3,
    heroText: 'Probudite se uz prolećnu magiju vile Đurđice i otkrijte lepote proleća kroz energične prolećne avanture.',
    aboutBook: [
      {
        _type: 'block',
        children: [
          {
            text: 'Treća knjiga donosi energiju prolećnog buđenja i nove početke. Vila Đurđica vodi decu kroz avanture rasta, učeći ih o novim mogućnostima, hrabrosti za promene i energiji koja dolazi sa novim početcima.'
          }
        ]
      }
    ],
    fairy: {
      name: 'Vila Đurđica',
      description: 'Energična vila proleća koja nosi venac od prvih prolećnih cvetića. Puna je života i podstiče decu da budu hrabra i istražuju nove mogućnosti.',
      virtues: ['Energija', 'Hrabrost', 'Novi početci', 'Rast'],
      birthDate: '21. mart',
      secretPlace: 'Cvetni vrt'
    },
    childCharacters: [
      {
        name: 'Teodora',
        description: 'Hrabra devojčica koja voli nove izazove i nije joj strašno da proba nešto novo.',
        characteristics: ['Hrabra', 'Energična', 'Voljana za avanture']
      }
    ],
    reviews: [
      {
        text: 'Savršena knjiga za prolećno čitanje! Motiviše decu da budu aktivna i istražuju.',
        author: 'Milica Jovanović',
        title: 'učiteljica',
        rating: 5
      }
    ],
    purchaseLinks: [
      {
        storeName: 'Laguna',
        url: 'https://www.laguna.rs/n5236',
        type: 'online',
        price: 1200
      }
    ]
  },
  {
    _type: 'book',
    _id: 'letnja-vreva',
    title: 'Letnja vreva',
    slug: { current: 'letnja-vreva', _type: 'slug' },
    subtitle: 'sa vilom Sunčicom',
    year: 2023,
    colorTheme: 'red',
    order: 4,
    heroText: 'Zakoračite u letnju avanturu sa vilom Sunčicom i istražite letnje radosti kroz nezaboravne letnje priče.',
    aboutBook: [
      {
        _type: 'block',
        children: [
          {
            text: 'Poslednja knjiga u seriji donosi vrelinu i radost leta. Vila Sunčica vodi decu kroz letnje avanture, učeći ih o prijateljstvu, igri, kreativnosti i tome kako da uživaju u svakom trenutku.'
          }
        ]
      }
    ],
    fairy: {
      name: 'Vila Sunčica',
      description: 'Vesela vila leta koja sija poput sunca. Nosi žutu haljinu i uvek je okružena leptirovima. Uči decu da uživaju u životu i neguju prijateljstva.',
      virtues: ['Radość', 'Prijateljstvo', 'Kreativnost', 'Uživanje u životu'],
      birthDate: '21. jun',
      secretPlace: 'Sunčana livada'
    },
    childCharacters: [
      {
        name: 'Nikola',
        description: 'Veseo dečak koji voli leto, igru i družeje sa svojom braćom i sestrema.',
        characteristics: ['Veseo', 'Društven', 'Kreativan']
      }
    ],
    reviews: [
      {
        text: 'Kompletirala je kolekciju i postala omiljena letnja knjiga naše porodice!',
        author: 'Aleksandar Mitrović',
        title: 'tata četvoro dece',
        rating: 5
      }
    ],
    purchaseLinks: [
      {
        storeName: 'Laguna',
        url: 'https://www.laguna.rs/n5237',
        type: 'online',
        price: 1300
      }
    ]
  }
]

// FRANCHISE MODELS DATA
const franchiseModelsData = [
  {
    name: 'Starter paket',
    price: '€3.500',
    features: [
      'Osnovna obuka za 2 osobe',
      'Didaktički materijali za 30 učenika',
      'Kompletna metodologija brzočitanja',
      'Online podrška 6 meseci',
      'Početni marketing materijali',
      'Sertifikat instruktora'
    ],
    highlighted: false,
    badge: 'Idealno za početak'
  },
  {
    name: 'Professional paket',
    price: '€7.500',
    features: [
      'Proširena obuka za 4 osobe',
      'Didaktički materijali za 60 učenika',
      'Kompletna metodologija (brzočitanje + mentalna aritmetika)',
      'Online podrška 12 meseci',
      'Kompletni marketing materijali',
      'Sertifikat instruktora + master sertifikat',
      'Merchandising podrška',
      'Teritorijalna ekskluzivnost'
    ],
    highlighted: true,
    badge: 'Najpopularniji'
  },
  {
    name: 'Premium paket',
    price: '€12.000',
    features: [
      'Master obuka za neograničen broj osoba',
      'Didaktički materijali za 100+ učenika',
      'Kompletna metodologija + inovacije',
      'Online podrška 24 meseci',
      'Kompletna marketing strategija',
      'Master sertifikat + pravo na edukaciju',
      'Ekskluzivni merchandising',
      'Teritorijalna ekskluzivnost',
      'Mentorstvo osnivača 1 godinu',
      'Pomoć u otvaranju centra'
    ],
    highlighted: false,
    badge: 'Najbolja vrednost'
  }
]

// FRANCHISE STEPS DATA
const franchiseStepsData = [
  {
    stepNumber: 1,
    title: 'Početni razgovor',
    description: 'Detaljno upoznavanje sa vašim ciljevima i mogućnostima kroz 30-minutni poziv',
    duration: '30 minuta',
    icon: 'phone'
  },
  {
    stepNumber: 2,
    title: 'Procena pogodnosti',
    description: 'Analiza vašeg tržišta, konkurencije i potencijala za uspeh u vašoj lokaciji',
    duration: '1-2 dana',
    icon: 'document'
  },
  {
    stepNumber: 3,
    title: 'Prezentacija modela',
    description: 'Detaljna prezentacija franchise modela, investicije i očekivanih prinosa',
    duration: '2 sata',
    icon: 'meeting'
  },
  {
    stepNumber: 4,
    title: 'Potpisivanje ugovora',
    description: 'Formalizovanje partnerstva kroz detaljno razrađen franchise ugovor',
    duration: '1 dan',
    icon: 'contract'
  },
  {
    stepNumber: 5,
    title: 'Početna obuka',
    description: 'Intenzivna obuka za vas i vaš tim o metodologiji i poslovnim procesima',
    duration: '5-7 dana',
    icon: 'training'
  },
  {
    stepNumber: 6,
    title: 'Pokretanje centra',
    description: 'Pomoć u otvaranju i promociji vašeg centra sa podrškom našeg tima',
    duration: '1-2 nedelje',
    icon: 'launch'
  }
]

// FAQ DATA
const faqData = [
  {
    _type: 'faq',
    _id: 'faq-1',
    question: 'Koliko dugo traje program brzočitanja?',
    answer: 'Program brzočitanja traje 6 meseci sa redovnim časovima 2 puta nedeljno. Nakon završetka osnovnog programa, učenici mogu nastaviti sa naprednim tehnikama. Već nakon prvog meseca vidljivi su početni rezultati.',
    category: 'programs',
    order: 1
  },
  {
    _type: 'faq',
    _id: 'faq-2',
    question: 'Od koje godine dete može da krene sa mentalnom aritmetikom?',
    answer: 'Preporučujemo da deca krenu sa mentalnom aritmetikom od 5. godine, kada već poznaju brojeve i osnovne matematičke operacije. Program je prilagođen uzrastu i mogućnostima deteta.',
    category: 'programs',
    order: 2
  },
  {
    _type: 'faq',
    _id: 'faq-3',
    question: 'Da li postoji probni čas?',
    answer: 'Da, nudimo besplatan probni čas kako bi vaše dete moglo da se upozna sa našim metodama i instruktorima pre upisa. Tokom probnog časa dobićete i detaljnu procenu trenutnih sposobnosti vašeg deteta.',
    category: 'enrollment',
    order: 3
  },
  {
    _type: 'faq',
    _id: 'faq-4',
    question: 'Kolika je investicija za otvaranje franchise centra?',
    answer: 'Investicija varira od €3.500 do €12.000 u zavisnosti na odabranog paketa. Ova investicija uključuje kompletnu obuku, didaktičke materijale, marketing podršku i kontinuiranu pomoć našeg tima.',
    category: 'franchise',
    order: 4
  },
  {
    _type: 'faq',
    _id: 'faq-5',
    question: 'Kakvu podršku pružate franchise partnerima?',
    answer: 'Pružamo kompletnu podršku koja uključuje početnu obuku, kontinuirane edukacije, marketing materijale, online platformu za rad, tehničku podršku i redovne konsultacije sa našim stručnim timom.',
    category: 'franchise',
    order: 5
  },
  {
    _type: 'faq',
    _id: 'faq-6',
    question: 'Da li deca domaće zadatke rade brže nakon kursa?',
    answer: 'Apsolutno! Jedno od najvažnijih benefita našeg programa je što deca drastično skraćuju vreme potrebno za učenje i domaće zadatke. Prosečno skraćenje je 50-70%, a neki učenici postižu i bolje rezultate.',
    category: 'results',
    order: 6
  }
]

// LOCATIONS DATA
const locationsData = [
  {
    _type: 'location',
    _id: 'novi-sad',
    city: 'Novi Sad',
    address: 'Bulevar oslobođenja 123',
    phone: '+381 60 123 4567',
    email: 'novisdad@srecno-ucenje.rs',
    workingHours: [
      { day: 'Ponedeljak - Petak', hours: '09:00 - 20:00' },
      { day: 'Subota', hours: '10:00 - 18:00' },
      { day: 'Nedelja', hours: '10:00 - 16:00' }
    ],
    services: ['Brzočitanje', 'Mentalna aritmetika', 'Kombinovani program'],
    instructors: [
      {
        name: 'Milica Jovanović',
        title: 'Glavni instruktor',
        experience: '8 godina iskustva'
      },
      {
        name: 'Stefan Nikolić',
        title: 'Instruktor mentalne aritmetike',
        experience: '5 godina iskustva'
      }
    ]
  },
  {
    _type: 'location',
    _id: 'beograd',
    city: 'Beograd',
    address: 'Knez Mihailova 45',
    phone: '+381 60 234 5678',
    email: 'beograd@srecno-ucenje.rs',
    workingHours: [
      { day: 'Ponedeljak - Petak', hours: '08:00 - 21:00' },
      { day: 'Subota', hours: '10:00 - 19:00' },
      { day: 'Nedelja', hours: 'Po dogovoru' }
    ],
    services: ['Brzočitanje', 'Mentalna aritmetika', 'Kombinovani program', 'Online časovi'],
    instructors: [
      {
        name: 'Ana Petrović',
        title: 'Regionalni koordinator',
        experience: '10 godina iskustva'
      }
    ]
  }
]

// CALCULATOR SETTINGS DATA  
const calculatorSettingsData = {
  _type: 'calculatorSettings',
  _id: 'calculatorSettings',
  roiCalculator: {
    title: 'ROI Kalkulator za Franchise',
    description: 'Izračunajte potencijalni povrat na investiciju za vaš Srećno učenje centar',
    parameters: [
      {
        name: 'initialInvestment',
        label: 'Početna investicija (€)',
        type: 'number',
        min: 3500,
        max: 15000,
        default: 7500
      },
      {
        name: 'studentsPerMonth',
        label: 'Broj učenika mesečno',
        type: 'number', 
        min: 10,
        max: 200,
        default: 50
      },
      {
        name: 'pricePerStudent',
        label: 'Cena po učeniku (€)',
        type: 'number',
        min: 30,
        max: 150,
        default: 80
      }
    ],
    formulas: {
      monthlyRevenue: 'studentsPerMonth * pricePerStudent',
      annualRevenue: 'monthlyRevenue * 12',
      roiPercentage: '((annualRevenue - initialInvestment) / initialInvestment) * 100'
    }
  },
  investmentCalculator: {
    title: 'Kalkulator Investicije',
    description: 'Saznajte koliko je potrebno da investirate za vaš tip centra',
    packageOptions: [
      {
        name: 'Starter',
        price: 3500,
        features: ['Osnovna obuka', 'Materijali za 30 učenika', 'Online podrška 6 meseci']
      },
      {
        name: 'Professional', 
        price: 7500,
        features: ['Proširena obuka', 'Materijali za 60 učenika', 'Online podrška 12 meseci', 'Teritorijalna ekskluzivnost']
      },
      {
        name: 'Premium',
        price: 12000,
        features: ['Master obuka', 'Materijali za 100+ učenika', 'Online podrška 24 meseci', 'Mentorstvo 1 godinu']
      }
    ]
  }
}

async function populateContent() {
  console.log('🚀 Početak punjenja CMS sadržaja...')
  
  try {
    // 1. Site Settings
    console.log('📝 Punjenje osnovnih podešavanja sajta...')
    await client.createOrReplace(siteSettingsData)
    
    // 2. Homepage
    console.log('🏠 Punjenje početne strane...')
    await client.createOrReplace(homePageData)
    
    // 3. Methodology
    console.log('🧠 Punjenje strane o metodologiji...')
    await client.createOrReplace(methodologyData)
    
    // 4. About Author
    console.log('👩‍🏫 Punjenje strane o autorki...')
    await client.createOrReplace(aboutAuthorData)
    
    // 5. Books
    console.log('📚 Punjenje knjiga...')
    for (const book of booksData) {
      await client.createOrReplace(book)
    }
    
    // 6. FAQ
    console.log('❓ Punjenje pitanja i odgovora...')
    for (const faq of faqData) {
      await client.createOrReplace(faq)
    }
    
    // 7. Locations
    console.log('📍 Punjenje lokacija...')
    for (const location of locationsData) {
      await client.createOrReplace(location)
    }
    
    // 8. Calculator Settings
    console.log('🧮 Punjenje podešavanja kalkulatora...')
    await client.createOrReplace(calculatorSettingsData)
    
    // 9. Franchise Models - create as separate documents
    console.log('🏢 Punjenje franchise modela...')
    for (let i = 0; i < franchiseModelsData.length; i++) {
      const model = {
        _type: 'franchiseModel',
        _id: `franchise-model-${i + 1}`,
        ...franchiseModelsData[i]
      }
      await client.createOrReplace(model)
    }
    
    // 10. Franchise Steps - create as separate documents  
    console.log('👣 Punjenje koraka za franchise...')
    for (let i = 0; i < franchiseStepsData.length; i++) {
      const step = {
        _type: 'franchiseStep',
        _id: `franchise-step-${i + 1}`,
        ...franchiseStepsData[i]
      }
      await client.createOrReplace(step)
    }
    
    console.log('✅ Uspešno popunjen sav CMS sadržaj!')
    console.log(`
    📊 Kreiran sadržaj:
    • Osnovna podešavanja sajta
    • Početna strana sa hero sekcijom i features
    • Metodologija sa detaljnim objašnjenjem
    • O autorki sa biografijom i dostignućima  
    • ${booksData.length} knjige sa kompletnim podacima
    • ${faqData.length} često postavljanih pitanja
    • ${locationsData.length} lokacije centara
    • ${franchiseModelsData.length} franchise modela
    • ${franchiseStepsData.length} koraka za pridruživanje
    • Podešavanja kalkulatora
    
    🎯 Sve CMS polja su sada popunjena sa profesionalnim sadržajem!
    Možete pristupiti Sanity Studio na http://localhost:3001/studio da vidite rezultat.
    `)
    
  } catch (error) {
    console.error('❌ Greška tokom punjenja sadržaja:', error)
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  populateContent()
}

export { populateContent }