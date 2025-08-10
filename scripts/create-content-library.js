/**
 * Content Library Creation Script - Franchise-focused content
 * 
 * Creates sample blog posts, FAQs, and testimonials specifically designed
 * for franchise promotion and conversion.
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
});

// ===== SAMPLE BLOG POSTS (10 FRANCHISE-FOCUSED ARTICLES) =====
const sampleBlogPosts = [
  {
    _type: 'blogPost',
    _id: 'blog-franchise-profitability',
    title: 'Koliko se može zaraditi sa Srećno učenje franšizom?',
    slug: { current: 'koliko-se-moze-zaraditi-sa-srecno-ucenje-fransizom' },
    excerpt: 'Detaljana analiza profitabilnosti obrazovne franšize i realnih očekivanja prihoda kroz prve tri godine poslovanja.',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Jedna od najčešćih pitanja potencijalnih partnera je koliko se novca može zaraditi sa Srećno učenje franšizom. U ovom članku ćemo biti potpuno transparentni i podeliti stvarne brojke i iskustva naših postojećih partnera.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Tipični prihodi kroz godine'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Prva godina: 15.000 - 30.000 EUR\nDruga godina: 35.000 - 60.000 EUR\nTreća godina i dalje: 50.000 - 100.000 EUR\n\nOvi brojevi zavise od velikog broja faktora: lokacije, posvećenosti, lokalnog tržišta i implementacije naših preporučenih strategija.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Ključni faktori profitabilnosti'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '1. Lokacija i veličina tržišta\n2. Kvalitet implementacije naših sistema\n3. Marketing i promocija\n4. Zadovoljstvo roditelja i rezultati dece\n5. Dodatni servisi (kampovi, rođendani, radionice)'
          }
        ]
      }
    ],
    author: { _type: 'reference', _ref: 'author-marko-petrovic' },
    category: { _type: 'reference', _ref: 'category-business' },
    publishedAt: '2024-01-15',
    readTime: 8,
    featured: true,
    tags: ['franšiza', 'profitabilnost', 'biznis plan', 'prihodi'],
    seo: {
      title: 'Koliko se zarađuje sa Srećno učenje franšizom - Realni prihodi',
      description: 'Otkrijte koliko možete zaraditi sa obrazovnom franšizom. Transparentan pregled prihoda, troškova i faktora uspešnosti.',
      keywords: ['franšiza prihodi', 'obrazovna franšiza zarada', 'srećno učenje profit', 'franšiza investicija']
    }
  },
  {
    _type: 'blogPost',
    _id: 'blog-franchise-success-story',
    title: 'Od nule do 200 učenika: Priča uspeha Milice iz Novog Sada',
    slug: { current: 'od-nule-do-200-ucenika-prica-uspeha-milice-novi-sad' },
    excerpt: 'Kako je Milica Jovanović za dve godine izgradila jedan od najuspešnijih centara u našoj mreži.',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Milica Jovanović iz Novog Sada jedna je od naših najuspešnijih franšiznih partnera. U samo dve godine, njen centar je narastao sa 15 na preko 200 aktivnih učenika.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Skromni početak'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '"Kada sam otvarala centar 2022. godine, imala sam samo jednu učionicu od 25 kvadrata i 15 dece. Bila sam nervozna, ali sam verovala u metodologiju," priča Milica.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Ključ uspeha: Zadovoljni roditelji'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '"Fokusirala sam se na rezultate dece. Kada roditelji vide da njihovo dete napreduje, oni postaju naši najbolji promoteri. 70% novih učenika dolazi preko preporuka," objašnjava Milica.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Širenje i rast'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Danas Milica ima:\n- 4 učionice\n- 200+ aktivnih učenika\n- 5 zaposlenih edukatora\n- Mesečni prihod preko 8.000 EUR\n- Plan otvaranja drugog centra u 2024.'
          }
        ]
      }
    ],
    author: { _type: 'reference', _ref: 'author-ana-nikolic' },
    category: { _type: 'reference', _ref: 'category-success-stories' },
    publishedAt: '2024-01-20',
    readTime: 6,
    featured: true,
    tags: ['priča uspeha', 'franšiza partner', 'novi sad', 'rast biznisa'],
    seo: {
      title: 'Uspešna priča Srećno učenje franšize - 200 učenika za 2 godine',
      description: 'Inspirativna priča Milice Jovanović koja je izgradila veoma uspešan obrazovni centar u Novom Sadu.',
      keywords: ['franšiza uspeh', 'obrazovni centar novi sad', 'srećno učenje partner']
    }
  },
  {
    _type: 'blogPost',
    _id: 'blog-franchise-investment',
    title: '5 razloga zašto je obrazovna franšiza najbolja investicija u 2024.',
    slug: { current: 'pet-razloga-zasto-je-obrazovna-fransiza-najbolja-investicija' },
    excerpt: 'Analiza tržišnih trendova i zašto se obrazovne franšize izdvajaju kao najprofitabilnije i najsigurnije investicije.',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Tržište obrazovanja dece doživljava boom. Roditelji sve više investiraju u kvalitetno obrazovanje svoje dece, a obrazovne franšize postaju najtraženije poslovne prilike.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '1. Rastući tržišni potencijal'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Tržište privatnog obrazovanja u Srbiji raste 15% godišnje. Roditelji su spremni da izdvoje 100-200 EUR mesečno za kvalitetne programe.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '2. Stabilnost i predvidljivost'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Za razliku od drugih biznisa, obrazovanje je antikrižno. Roditelji će pre smanjiti druge troškove nego troškove za obrazovanje deteta.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '3. Nizak rizik uz visok povraćaj'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Obrazovne franšize imaju najnižu stopu neuspešnosti - manje od 5%. Povraćaj investicije je u proseku 18-24 meseca.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '4. Lična satisfakcija'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Radite posao koji ima smisla - pomažete deci da razvijaju svoje potencijale i menjate njihove živote.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '5. Podrška i dokazani sistemi'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Sa Srećno učenje franšizom dobijate kompletnu podršku: obuku, marketing materijale, operativnu pomoć i pristup testiranim sistemima.'
          }
        ]
      }
    ],
    author: { _type: 'reference', _ref: 'author-stefan-milic' },
    category: { _type: 'reference', _ref: 'category-investment' },
    publishedAt: '2024-01-25',
    readTime: 7,
    featured: false,
    tags: ['investicije', 'tržišne prilike', 'obrazovanje', 'franšiza trendovi'],
    seo: {
      title: 'Zašto je obrazovna franšiza najbolja investicija u 2024',
      description: '5 ključnih razloga zašto su obrazovne franšize najsigurnija i najprofitabilnija investicija trenutno.',
      keywords: ['obrazovna franšiza investicija', 'najbolje franšize 2024', 'franšiza trendovi']
    }
  },
  {
    _type: 'blogPost',
    _id: 'blog-franchise-location-guide',
    title: 'Kako izabrati idealnu lokaciju za svoj obrazovni centar?',
    slug: { current: 'kako-izabrati-idealnu-lokaciju-za-obrazovni-centar' },
    excerpt: 'Praktičan vodič kroz faktore koji određuju uspešnost lokacije vašeg budućeg centra.',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Lokacija je jedan od najkriticnijih faktora uspešnosti svakog obrazovnog centra. Evo kako da donesete pravu odluku.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Demografske karakteristike'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Idealne lokacije imaju:\n- Visoku koncentraciju porodica sa decom 3-14 godina\n- Prosečna ili natprosečna primanja\n- Obrazovane roditelje koji vrednuju kvalitetno obrazovanje'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Fizička pristupačnost'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '- Lako parkiranje (minimum 5-6 mesta)\n- Prizemlje ili prvi sprat\n- Blizina škola ili vrtića\n- Dobra javna transportna povezanost'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Konkurentska analiza'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Proverite:\n- Ko su direktni konkurenti u radijusu od 2km\n- Kakve cene imaju\n- Koliko je tržište zasićeno\n- Ima li mesta za novi kvalitetan centar'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Ekonomski faktori'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Kirija ne bi trebalo da prelazi 15% planiranih prihoda. Za početak, bolje je manja površina u dobroj lokaciji nego velika u lošoj.'
          }
        ]
      }
    ],
    author: { _type: 'reference', _ref: 'author-marko-petrovic' },
    category: { _type: 'reference', _ref: 'category-practical-guide' },
    publishedAt: '2024-01-30',
    readTime: 9,
    tags: ['lokacija', 'nekretnine', 'planiranje biznisa', 'franšiza vodič']
  },
  {
    _type: 'blogPost',
    _id: 'blog-franchise-marketing',
    title: 'Marketing strategije koje garantovano donose nove učenike',
    slug: { current: 'marketing-strategije-koje-donose-nove-ucenike' },
    excerpt: 'Testirrane marketing taktike koje koriste najuspešniji centri u našoj mreži.',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Marketing obrazovnog centra zahteva specifičan pristup. Evo strategija koje donose najbolje rezultate našim partnerima.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '1. Word-of-mouth marketing'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '70% novih učenika dolazi preko preporuka. Fokusirajte se na:\n- Izuzetan rad sa decom\n- Redovnu komunikaciju sa roditeljima\n- Program preporučivanja sa nagradama'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '2. Lokalne partnerije'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Sarađujte sa:\n- Vrtićima i školama\n- Pedijatrijskim ambulantama\n- Dečijim klubovima i centrimma\n- Lokalnim poduzećima'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '3. Digitalni marketing'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '- Google Ads sa lokalnim ciljanjem\n- Facebook i Instagram stranice\n- Google My Business optimizacija\n- Lokalne Facebook grupe za roditelje'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '4. Besplatne radionice i događaji'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Organizujte mesečno:\n- Besplatne testiranje koncentracije\n- Edukativne radionice za roditelje\n- Dečije predstave i događaje\n- Dan otvorenih vrata'
          }
        ]
      }
    ],
    author: { _type: 'reference', _ref: 'author-ana-nikolic' },
    category: { _type: 'reference', _ref: 'category-marketing' },
    publishedAt: '2024-02-05',
    readTime: 8,
    tags: ['marketing', 'promocija', 'digitalni marketing', 'lokalne strategije']
  }
  // Additional blog posts would follow similar pattern...
];

// ===== SAMPLE FAQ ENTRIES (20 FRANCHISE-FOCUSED QUESTIONS) =====
const sampleFAQs = [
  {
    _type: 'faq',
    _id: 'faq-investment-amount',
    question: 'Koliko iznosi početna investicija za franšizu?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Početna investicija za Srećno učenje franšizu kreće se od 8.000 do 15.000 EUR, u zavisnosti od veličine prostora i lokacije. Ova suma uključuje:'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '- Franšizni paket i licencu\n- Početnu obuku i materijale\n- Početni marketing i promociju\n- Osnovnu opremu i materijale\n- Podrška pri otvaranju\n\nNudimo i opcije finansiranja kroz naše partnere banke.'
          }
        ]
      }
    ],
    category: { _type: 'reference', _ref: 'faq-category-investment' },
    featured: true,
    order: 1,
    tags: ['investicija', 'početni troškovi', 'franšizni paket']
  },
  {
    _type: 'faq',
    _id: 'faq-profitability-timeline',
    question: 'Za koliko vremena mogu očekivati povraćaj investicije?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Na osnovu iskustva naših postojećih partnera, povraćaj investicije se očekuje u periodu od 18 do 30 meseci, zavisno od:'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '- Lokacije centra\n- Veličine tržišta\n- Posvećenosti i rada partnera\n- Implementacije naših preporučenih strategija\n\nNajuspešniji partneri dostižu profitabilnost već u prvoj godini.'
          }
        ]
      }
    ],
    category: { _type: 'reference', _ref: 'faq-category-business' },
    featured: true,
    order: 2
  },
  {
    _type: 'faq',
    _id: 'faq-required-space',
    question: 'Koliko prostora je potrebno za otvaranje centra?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Minimum je 40m² za početak, ali preporučujemo 60-100m² za optimalno funkcionisanje. Prostor treba da ima:'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '- Minimum 2 učionice (po 15-20m² svaka)\n- Recepciju/čekaonicu za roditelje\n- Toalet\n- Mogućnost proširenja\n- Dobru izolaciju zbog koncentracije učenika\n\nPomažemo vam pri pronalaženju i proceni pogodnosti prostora.'
          }
        ]
      }
    ],
    category: { _type: 'reference', _ref: 'faq-category-operations' },
    order: 3
  },
  {
    _type: 'faq',
    _id: 'faq-experience-required',
    question: 'Da li je potrebno prethodno iskustvo u obrazovanju?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Prethodno iskustvo u obrazovanju nije neophodno. Naša sveobuhvatna obuka pokriva sve potrebne aspekte:'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '- Srećno učenje metodologiju\n- Rad sa decom različitih uzrasta\n- Upravljanje centrom\n- Marketing i prodaju\n- Komunikaciju sa roditeljima\n\nBitnije je da imate strast za rad sa decom i želju za uspehom.'
          }
        ]
      }
    ],
    category: { _type: 'reference', _ref: 'faq-category-requirements' },
    order: 4
  },
  {
    _type: 'faq',
    _id: 'faq-ongoing-support',
    question: 'Kakva podrška se pruža nakon otvaranja centra?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Kontinuirana podrška uključuje:'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '- Mesečne online konsultacije\n- Kvartalne posete i evaluacije\n- Pristup novim programima i materijalima\n- Marketing podršku i materijale\n- Stručno usavršavanje edukatora\n- Tehničku podršku\n- Zajednicu partnera za razmenu iskustava\n\nPodrška je uključena u mesečnu franšiznu naknadu.'
          }
        ]
      }
    ],
    category: { _type: 'reference', _ref: 'faq-category-support' },
    featured: true,
    order: 5
  },
  {
    _type: 'faq',
    _id: 'faq-territory-protection',
    question: 'Da li postoji zaštićena teritorija?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Da, svaki partner dobija ekskluzivnu teritoriju u radijusu od 2-5 km (zavisno od gustine stanovništva). Ovo znači:'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '- Nema konkurencije od drugih Srećno učenje centara\n- Mogućnost otvaranja dodatnih centara u svojoj teritoriji\n- Prvi prioritet pri proširenju teritorije\n- Zaštićeno tržište za razvoj biznisa'
          }
        ]
      }
    ],
    category: { _type: 'reference', _ref: 'faq-category-business' },
    order: 6
  },
  {
    _type: 'faq',
    _id: 'faq-franchise-fee',
    question: 'Koliko iznosi mesečna franšizna naknada?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Mesečna franšizna naknada je 6% od ostvarenog prihoda, sa minimum od 200 EUR mesečno. Ova naknada pokriva:'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '- Kontinuiranu podršku i konsultacije\n- Pristup novim programima\n- Marketing materijale\n- Stručno usavršavanje\n- Administrativnu podršku\n- Korišćenje brenda i metodologije'
          }
        ]
      }
    ],
    category: { _type: 'reference', _ref: 'faq-category-investment' },
    order: 7
  },
  {
    _type: 'faq',
    _id: 'faq-staff-requirements',
    question: 'Koliko zaposlenih je potrebno za funkcionisanje centra?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Za početak, možete raditi sami kao vlasnik-edukator. Kako centar raste:'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '- 15-30 učenika: Vi kao edukator\n- 30-60 učenika: Vi + 1 dodatni edukator\n- 60-100 učenika: Vi + 2-3 edukatora\n- 100+ učenika: Tim od 3-5 edukatora + administrativna podrška\n\nPomažemo pri regrutovanju i obuci novih edukatora.'
          }
        ]
      }
    ],
    category: { _type: 'reference', _ref: 'faq-category-operations' },
    order: 8
  },
  {
    _type: 'faq',
    _id: 'faq-marketing-support',
    question: 'Koju marketing podršku dobijam?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Kompletna marketing podrška uključuje:'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '- Brendirane materijale (flajeri, brošure, baneri)\n- Digitalne materijale za društvene mreže\n- Gotove kampanje za Google i Facebook\n- PR pakete za lokalne medije\n- Materijale za partnerstva sa školama\n- Obuku za lokalni marketing\n- Podršku pri organizaciji događaja'
          }
        ]
      }
    ],
    category: { _type: 'reference', _ref: 'faq-category-marketing' },
    order: 9
  },
  {
    _type: 'faq',
    _id: 'faq-contract-duration',
    question: 'Koliko traje franšizni ugovor?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Početni franšizni ugovor traje 5 godina sa mogućnošću produžetka za još 5 godina. Ugovor uključuje:'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: '- Jasno definisana prava i obaveze\n- Zaštićenu teritoriju\n- Mogućnost prenosa franšize\n- Postupak za prekid ugovora\n- Uslovi za obnovu\n\nUgovor je dizajniran da zaštiti interese obe strane.'
          }
        ]
      }
    ],
    category: { _type: 'reference', _ref: 'faq-category-legal' },
    order: 10
  }
  // Additional FAQs would follow similar pattern...
];

// ===== SAMPLE FAQ CATEGORIES =====
const faqCategories = [
  {
    _type: 'faqCategory',
    _id: 'faq-category-investment',
    title: 'Investicije i troškovi',
    slug: { current: 'investicije-i-troskovi' },
    description: 'Pitanja o početnim i tekućim troškovima franšize',
    order: 1
  },
  {
    _type: 'faqCategory',
    _id: 'faq-category-business',
    title: 'Poslovanje i profitabilnost',
    slug: { current: 'poslovanje-i-profitabilnost' },
    description: 'Pitanja o poslovanju i zaradama',
    order: 2
  },
  {
    _type: 'faqCategory',
    _id: 'faq-category-operations',
    title: 'Operativno poslovanje',
    slug: { current: 'operativno-poslovanje' },
    description: 'Pitanja o svakodnevnom radu centra',
    order: 3
  },
  {
    _type: 'faqCategory',
    _id: 'faq-category-support',
    title: 'Podrška i obuka',
    slug: { current: 'podrska-i-obuka' },
    description: 'Pitanja o podršci i obuci',
    order: 4
  },
  {
    _type: 'faqCategory',
    _id: 'faq-category-requirements',
    title: 'Uslovi i zahtevi',
    slug: { current: 'uslovi-i-zahtevi' },
    description: 'Pitanja o uslovim za postajanje partner',
    order: 5
  },
  {
    _type: 'faqCategory',
    _id: 'faq-category-marketing',
    title: 'Marketing i promocija',
    slug: { current: 'marketing-i-promocija' },
    description: 'Pitanja o marketing aktivnostima',
    order: 6
  },
  {
    _type: 'faqCategory',
    _id: 'faq-category-legal',
    title: 'Pravni aspekti',
    slug: { current: 'pravni-aspekti' },
    description: 'Pitanja o ugovorima i pravnim pitanjima',
    order: 7
  }
];

// ===== SAMPLE TESTIMONIALS (FRANCHISE-FOCUSED) =====
const sampleTestimonials = [
  {
    _type: 'testimonial',
    _id: 'testimonial-milica-jovanovic',
    name: 'Milica Jovanović',
    role: 'Franšizni partner, Novi Sad',
    company: 'Srećno učenje Novi Sad',
    testimonial: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Nakon dve godine rada sa Srećno učenje franšizom, mogu reći da je ovo bila najbolja investicijska odluka koju sam donela. Centar mi je narastao sa 15 na preko 200 učenika, a mesečni prihod je preko 8.000 EUR. Najvažnije je što radim posao koji volim i vidim kako menjam živote dece svaki dan.'
          }
        ]
      }
    ],
    rating: 5,
    featured: true,
    location: 'Novi Sad',
    yearStarted: '2022',
    results: {
      studentsGrowth: '15 → 200+ učenika',
      monthlyRevenue: '8.000+ EUR',
      timeToProfit: '14 meseci'
    },
    category: 'franchise-partner',
    order: 1
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-marko-petrovic',
    name: 'Marko Petrović',
    role: 'Franšizni partner, Kragujevac',
    company: 'Srećno učenje Kragujevac',
    testimonial: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Kao bivši IT inženjer, promenio sam karijeru u 40. godini. Srećno učenje mi je pružilo kompletnu podršku - od obuke do marketing materijala. Danas imam stabilan biznis sa preko 120 učenika i planiram otvaranje drugog centra. Podrška tima je izvanredna!'
          }
        ]
      }
    ],
    rating: 5,
    featured: true,
    location: 'Kragujevac',
    yearStarted: '2021',
    results: {
      studentsGrowth: '0 → 120 učenika',
      expansion: 'Planira drugi centar',
      satisfaction: 'Promenio karijeru sa 40 godina'
    },
    category: 'career-change',
    order: 2
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-ana-stojanovic',
    name: 'Ana Stojanović',
    role: 'Franšizni partner, Pančevo',
    company: 'Srećno učenje Pančevo',
    testimonial: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Kao majka dvoje dece, htela sam posao koji mi omogućava balans porodica-karijera. Srećno učenje franšiza mi je omogućila da radim sa decom, imam fleksibilno radno vreme i zaram više nego u korporaciji. Za 18 meseci sam vratila celokupnu investiciju.'
          }
        ]
      }
    ],
    rating: 5,
    featured: false,
    location: 'Pančevo',
    yearStarted: '2022',
    results: {
      roiTime: '18 meseci',
      workLifeBalance: 'Fleksibilno radno vreme',
      income: 'Više nego u korporaciji'
    },
    category: 'work-life-balance',
    order: 3
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-stefan-milic',
    name: 'Stefan Milić',
    role: 'Franšizni partner, Niš',
    company: 'Srećno učenje Niš',
    testimonial: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Otvorio sam centar u martu 2023. sa početnom investicijom od 12.000 EUR. Za manje od godine dana imam 85 redovnih učenika i centar je profitabilan. Metodologija radi, podrška je fantastična, a vidim kako se deca razvijaju - nema boljeg osećanja!'
          }
        ]
      }
    ],
    rating: 5,
    featured: false,
    location: 'Niš',
    yearStarted: '2023',
    results: {
      studentsGrowth: '0 → 85 učenika',
      profitTime: 'Manje od 12 meseci',
      satisfaction: 'Izuzetno zadovoljan'
    },
    category: 'fast-growth',
    order: 4
  }
];

// ===== BLOG CATEGORIES =====
const blogCategories = [
  {
    _type: 'blogCategory',
    _id: 'category-business',
    title: 'Poslovanje',
    slug: { current: 'poslovanje' },
    description: 'Saveti i analize za uspešno vođenje obrazovnog biznisa'
  },
  {
    _type: 'blogCategory',
    _id: 'category-success-stories',
    title: 'Priče uspeha',
    slug: { current: 'price-uspeha' },
    description: 'Inspirativne priče naših franšiznih partnera'
  },
  {
    _type: 'blogCategory',
    _id: 'category-investment',
    title: 'Investicije',
    slug: { current: 'investicije' },
    description: 'Analize tržišta i investicijskih prilika'
  },
  {
    _type: 'blogCategory',
    _id: 'category-marketing',
    title: 'Marketing',
    slug: { current: 'marketing' },
    description: 'Marketing strategije i taktike'
  },
  {
    _type: 'blogCategory',
    _id: 'category-practical-guide',
    title: 'Praktični vodiči',
    slug: { current: 'prakticni-vodici' },
    description: 'Korak-po-korak vodiči za franšizne partnere'
  }
];

// ===== AUTHORS =====
const sampleAuthors = [
  {
    _type: 'author',
    _id: 'author-marko-petrovic',
    name: 'Marko Petrović',
    slug: { current: 'marko-petrovic' },
    title: 'Direktor franšiznog razvoja',
    bio: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Marko je direktor franšiznog razvoja sa 10 godina iskustva u obrazovanju. Odgovoran je za podršku partnerima i razvoj novih tržišta.'
          }
        ]
      }
    ]
  },
  {
    _type: 'author',
    _id: 'author-ana-nikolic',
    name: 'Ana Nikolić',
    slug: { current: 'ana-nikolic' },
    title: 'Stručni konsultant za franšize',
    bio: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Ana je magistar pedagogije i stručni konsultant koji pomaže novim partnerima u pokretanju i razvoju centara.'
          }
        ]
      }
    ]
  },
  {
    _type: 'author',
    _id: 'author-stefan-milic',
    name: 'Stefan Milić',
    slug: { current: 'stefan-milic' },
    title: 'Marketing menadžer',
    bio: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Stefan je odgovoran za marketing strategiju i podršku partnerima u promociji njihovih centara.'
          }
        ]
      }
    ]
  }
];

async function createContentLibrary() {
  console.log('📚 Creating content library (Blog posts, FAQs, Testimonials)...');
  
  try {
    // Create authors first
    console.log('👤 Creating authors...');
    for (const author of sampleAuthors) {
      await client.createOrReplace(author);
      console.log(`  ✅ Created author: ${author.name}`);
    }

    // Create blog categories
    console.log('📂 Creating blog categories...');
    for (const category of blogCategories) {
      await client.createOrReplace(category);
      console.log(`  ✅ Created category: ${category.title}`);
    }

    // Create FAQ categories
    console.log('📂 Creating FAQ categories...');
    for (const category of faqCategories) {
      await client.createOrReplace(category);
      console.log(`  ✅ Created FAQ category: ${category.title}`);
    }

    // Create blog posts
    console.log('📝 Creating blog posts...');
    for (const post of sampleBlogPosts) {
      await client.createOrReplace(post);
      console.log(`  ✅ Created blog post: ${post.title}`);
    }

    // Create FAQs
    console.log('❓ Creating FAQ entries...');
    for (const faq of sampleFAQs) {
      await client.createOrReplace(faq);
      console.log(`  ✅ Created FAQ: ${faq.question}`);
    }

    // Create testimonials
    console.log('💬 Creating testimonials...');
    for (const testimonial of sampleTestimonials) {
      await client.createOrReplace(testimonial);
      console.log(`  ✅ Created testimonial: ${testimonial.name}`);
    }

    console.log('🎉 Content library created successfully!');
    console.log('');
    console.log('📊 Created:');
    console.log(`- Authors: ${sampleAuthors.length}`);
    console.log(`- Blog Categories: ${blogCategories.length}`);
    console.log(`- Blog Posts: ${sampleBlogPosts.length}`);
    console.log(`- FAQ Categories: ${faqCategories.length}`);
    console.log(`- FAQ Entries: ${sampleFAQs.length}`);
    console.log(`- Testimonials: ${sampleTestimonials.length}`);
    
  } catch (error) {
    console.error('❌ Error creating content library:', error);
    process.exit(1);
  }
}

module.exports = {
  createContentLibrary,
  sampleBlogPosts,
  sampleFAQs,
  sampleTestimonials,
  blogCategories,
  faqCategories,
  sampleAuthors
};

if (require.main === module) {
  createContentLibrary();
}