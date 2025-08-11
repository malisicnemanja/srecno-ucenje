/**
 * KOMPLETNO POPUNJAVANJE SANITY CMS-a
 * 
 * Ovaj script kreira i popunjava SVE nedostajuće podatke u Sanity CMS-u:
 * - HomePage (franchise modeli, success stories)
 * - FAQ kategorije i pitanja
 * - Blog postove i kategorije  
 * - Site settings
 * - Navigation
 * - About author
 * - Metodologija
 * - I sve reference između dokumenata
 */

const { sanityClient, validateClient, migrationUtils } = require('./sanity-client');

// PODACI ZA KOMPLETNO POPUNJAVANJE CMS-a
const CMS_DATA = {
  // FAQ KATEGORIJE
  faqCategories: [
    {
      _type: 'faqCategory',
      name: 'Franšiza',
      slug: { current: 'fransiza' },
      description: 'Pitanja o franšizi i poslovnom modelu',
      order: 1
    },
    {
      _type: 'faqCategory', 
      name: 'Edukacija',
      slug: { current: 'edukacija' },
      description: 'Pitanja o obrazovnim programima',
      order: 2
    },
    {
      _type: 'faqCategory',
      name: 'Tehnička podrška',
      slug: { current: 'tehnicka-podrska' },
      description: 'Tehnička pitanja i podrška',
      order: 3
    },
    {
      _type: 'faqCategory',
      name: 'Finansije',
      slug: { current: 'finansije' },
      description: 'Pitanja o cenama i plaćanju',
      order: 4
    }
  ],

  // FAQ PITANJA
  faqs: [
    {
      _type: 'faq',
      question: 'Koliko košta pokretanje Srećno učenje franšize?',
      answer: 'Investicija za pokretanje franšize kreće se od 3.000€ do 15.000€, u zavisnosti od odabranog paketa. Mini paket košta 3.000€, Standard paket 7.000€, a Premium paket 15.000€. Ova investicija pokriva sve potrebno za uspešno pokretanje: obuku, materijale, softver, marketing podršku i kontinuiranu stručnu pomoć.',
      categoryRef: 'fransiza-category',
      order: 1,
      isActive: true,
      tags: ['franšiza', 'cena', 'investicija']
    },
    {
      _type: 'faq', 
      question: 'Da li je potrebno prethodno iskustvo u obrazovanju?',
      answer: 'Nije potrebno prethodno iskustvo u obrazovanju! Naš sistem je dizajniran tako da omogućava uspeh svima koji imaju želju da rade sa decom i roditelje. Kroz našu detaljnu obuku od 40 sati, online resurse i kontinuiranu podršku, naučićete sve što je potrebno za uspešno vođenje centra.',
      categoryRef: 'fransiza-category',
      order: 2,
      isActive: true,
      tags: ['iskustvo', 'obuka', 'preduslov']
    },
    {
      _type: 'faq',
      question: 'Koliko vremena je potrebno da pokretam centar?',
      answer: 'Od potpisivanja ugovora do otvaranja centra potrebno je 4-8 nedelja. Ovaj period uključuje završetak obuke, pripremu prostora, nabavku materijala i marketinške aktivnosti za pronalaženje prvih polaznika. Naš tim vam pomaže u svakom koraku.',
      categoryRef: 'fransiza-category',
      order: 3,
      isActive: true,
      tags: ['vreme', 'pokretanje', 'proces']
    },
    {
      _type: 'faq',
      question: 'Koja je metodologija Srećno učenje?',
      answer: 'Naša metodologija kombinuje najnovija dostignuća u obrazovanju: mentalne mape za vizuelno učenje, tehnike brzog čitanja, mnemotehnike za bolje pamćenje, i emotional intelligence za celokupan razvoj deteta. Sve tehnike su prilagođene uzrastu i individualno testirane.',
      categoryRef: 'edukacija-category',
      order: 1,
      isActive: true,
      tags: ['metodologija', 'tehnike', 'pristup']
    },
    {
      _type: 'faq',
      question: 'Za koji uzrast su namenjeni programi?',
      answer: 'Naši programi pokrivaju uzrast od 5 do 18 godina, podeljeni u tri kategorije: Srećno čitanje (5-8 godina), Srećno učenje (9-14 godina) i Srećno maturiranje (15-18 godina). Svaki program je posebno prilagođen razvojnim potrebama određene starosne grupe.',
      categoryRef: 'edukacija-category',
      order: 2,
      isActive: true,
      tags: ['uzrast', 'programi', 'kategorije']
    },
    {
      _type: 'faq',
      question: 'Kakvu tehničku podršku pružate?',
      answer: 'Pružamo kompletnu tehničku podršku 24/7: online platforma sa svim materijalima, video tutoriali, mesečni webinari, direkt linija za pomoć, i lični account manager koji je uvek dostupan. Takođe imate pristup našoj zajednici edukatora za međusobnu podršku.',
      categoryRef: 'tehnicka-podrska-category',
      order: 1,
      isActive: true,
      tags: ['podrška', '24/7', 'tehnička']
    },
    {
      _type: 'faq',
      question: 'Da li mogu da radim online ili samo uživo?',
      answer: 'Možete da radite i online i uživo! Naš hibridni model vam omogućava maksimalnu fleksibilnost. Možete držati časove uživo u vašem centru, online preko naše platforme, ili kombinovati oba pristupa. Sve potrebne tehnologije i obuke su uključene.',
      categoryRef: 'tehnicka-podrska-category',
      order: 2,
      isActive: true,
      tags: ['online', 'uživo', 'hibridno']
    },
    {
      _type: 'faq',
      question: 'Kako funkcioniše plaćanje franšize?',
      answer: 'Plaćanje možete izvršiti u ratama: 50% prilikom potpisivanja ugovora, a ostatak u 2-4 rate tokom prva 3 meseca rada. Prihvatamo bankovni transfer, kartice i kešno plaćanje. Takođe nudimo i mogućnost finansiranja kroz naše partnere banke.',
      categoryRef: 'finansije-category',
      order: 1,
      isActive: true,
      tags: ['plaćanje', 'rate', 'finansiranje']
    },
    {
      _type: 'faq',
      question: 'Da li postoje dodatni troškovi tokom rada?',
      answer: 'Jedini redovni troškovi su mesečna lična licenca od 50€ i 5% tantijema od prometa (samo kad zarađujete). Nema skrivenih troškova, dodatnih naknada za materijale ili održavanje. Sve ostalo je uključeno u početnu investiciju.',
      categoryRef: 'finansije-category',
      order: 2,
      isActive: true,
      tags: ['troškovi', 'licenca', 'tantijeme']
    }
  ],

  // BLOG KATEGORIJE
  blogCategories: [
    {
      _type: 'blogCategory',
      title: 'Saveti za učenje',
      slug: { current: 'saveti-za-ucenje' },
      description: 'Praktični saveti i tehnike za efikasniju edukaciju'
    },
    {
      _type: 'blogCategory',
      title: 'Franšiza priče',
      slug: { current: 'fransiza-price' },
      description: 'Priče uspeha naših franšizera'
    },
    {
      _type: 'blogCategory',
      title: 'Roditeljski vodič',
      slug: { current: 'roditeljski-vodic' },
      description: 'Vodič za roditelje o podršci deci u učenju'
    },
    {
      _type: 'blogCategory',
      title: 'Obrazovne vesti',
      slug: { current: 'obrazovne-vesti' },
      description: 'Najnovije vesti iz sveta obrazovanja'
    }
  ],

  // BLOG POSTOVI
  blogPosts: [
    {
      _type: 'blogPost',
      title: '5 revolucionarnih tehnika učenja koje menjaju sve',
      slug: { current: '5-revolucionarnih-tehnika-ucenja' },
      excerpt: 'Otkrijte najnovije tehnike koje čine učenje brzim, efikasnim i zabavnim za svu decu.',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'U svetu brzih promena, tradicionalne metode učenja često ne prate potrebe moderne dece. Srećno učenje je razvilo 5 revolucionarnih tehnika koje transformišu način na koji deca uče i pamte informacije.' }]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [{ _type: 'span', text: '1. Mentalne mape - vizuelni put do znanja' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Mentalne mape koriste prirodnu tendenciju mozga da razmišlja u slikama. Umesto linearnih beleški, deca kreiraju koloritetne dijagrame koji povezuju informacije na intuitivan način.' }]
        }
      ],
      categoryRef: 'saveti-za-ucenje-category',
      publishedAt: new Date().toISOString(),
      seo: {
        title: '5 revolucionarnih tehnika učenja - Srećno učenje',
        description: 'Otkrijte najnovije tehnike koje čine učenje brzim, efikasnim i zabavnim za svu decu.'
      }
    },
    {
      _type: 'blogPost',
      title: 'Kako sam otvorao franšizu u malom gradu i udvostručio prihod',
      slug: { current: 'fransiza-u-malom-gradu-uspeh' },
      excerpt: 'Priča Marka Petrovića iz Valjeva o tome kako je franšiza promenila njegov život.',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Kada sam pre dve godine razmišljao o otvaranju franšize Srećno učenje u Valjevu, mnogi su me upozoravali da mali grad neće imati dovoljno dece za ozbiljan biznis. Grešili su.' }]
        }
      ],
      categoryRef: 'fransiza-price-category',
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      seo: {
        title: 'Franšiza u malom gradu - priča uspeha | Srećno učenje',
        description: 'Kako je Marko Petrović udvostručio prihod otvaranjem franšize u Valjevu.'
      }
    },
    {
      _type: 'blogPost',
      title: 'Kako da motišete dete koje "mrzi" da uči',
      slug: { current: 'kako-motivovati-dete-koje-mrzi-ucenje' },
      excerpt: 'Praktičan vodič za roditelje čija deca pokazuju otpor prema učenju.',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: 'Svako dete je rođeno sa prirodnom radoznalošću. Ako vaše dete "mrzi" da uči, to je signal da trenutni pristup nije prikladan za njegov stil učenja.' }]
        }
      ],
      categoryRef: 'roditeljski-vodic-category',
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      seo: {
        title: 'Kako motivovati dete koje mrzi učenje - saveti stručnjaka',
        description: 'Praktične tehnike za povećanje motivacije kod dece koja pokazuju otpor prema učenju.'
      }
    }
  ],

  // SUCCESS STORIES ZA HOMEPAGE
  successStories: [
    {
      name: 'Milica Jovanović',
      role: 'Vlasnica franšize',
      location: 'Novi Sad',
      story: 'Za samo 18 meseci sam izgradila najuspešniji centar u regiji. Počela sam sa 5 dece, a sada imam preko 120 polaznika mesečno. Srećno učenje mi je omogućilo da ostavim korporativni posao i bavim se onim što volim.',
      yearStarted: '2022',
      metric: {
        value: '120+',
        label: 'dece mesečno'
      },
      image: {
        _type: 'image',
        alt: 'Milica Jovanović sa svojom grupom polaznika'
      }
    },
    {
      name: 'Stefan Marković',
      role: 'Edukator i franšizer',
      location: 'Kragujevac',
      story: 'Kao bivši profesor, skeptično sam pristupao novim metodama. Ali rezultati koji sam video kod dece su me potpuno oduševili. Sada imam 3 lokacije i tim od 8 edukatora.',
      yearStarted: '2021',
      metric: {
        value: '3',
        label: 'lokacije'
      },
      image: {
        _type: 'image',
        alt: 'Stefan Marković sa svojim timom'
      }
    },
    {
      name: 'Ana Stojanović',
      role: 'Online edukator',
      location: 'Niš',
      story: 'Kombinujem online i uživo nastavu. Radim sa decom iz celog regiona, a prihod mi je veći nego što sam imala kao profesorka sa 15 godina iskustva.',
      yearStarted: '2023',
      metric: {
        value: '200%',
        label: 'povećanje prihoda'
      },
      image: {
        _type: 'image',
        alt: 'Ana Stojanović tokom online časa'
      }
    }
  ],

  // FRANCHISE MODELS ZA HOMEPAGE
  franchiseModels: [
    {
      name: 'Mini',
      price: '3.000€',
      description: 'Idealno za početak - do 30 polaznika',
      features: [
        'Osnovna obuka (20h)',
        'Početni set materijala',
        'Online platforma',
        '3 meseca podrške',
        'Marketing materijali'
      ],
      isPopular: false,
      cta: 'Započni Mini'
    },
    {
      name: 'Standard',
      price: '7.000€',
      description: 'Najjiji izbor - do 80 polaznika',
      features: [
        'Kompletna obuka (40h)',
        'Prošireni materijali',
        'Online + offline alati',
        '6 meseci podrške',
        'Napredni marketing',
        'Lični account manager'
      ],
      isPopular: true,
      cta: 'Izaberi Standard'
    },
    {
      name: 'Premium',
      price: '15.000€',
      description: 'Za ambiciozne - neograničeno polaznika',
      features: [
        'Master obuka (60h)',
        'Premium materijali',
        'Sve platforme i alati',
        '12 meseci podrške',
        'Premium marketing',
        'Personalizovani brending',
        'Obuka za tim',
        'Ekskluzivni teritoriji'
      ],
      isPopular: false,
      cta: 'Idi Premium'
    }
  ],

  // SITE SETTINGS
  siteSettings: {
    _type: 'siteSettings',
    title: 'Srećno učenje',
    description: 'Revolucionarna franšiza koja menja način na koji deca uče. Pridružite se mreži od preko 200 centara širom Srbije.',
    keywords: ['franšiza', 'obrazovanje', 'deca', 'učenje', 'Srećno učenje', 'edukacija'],
    author: 'Dr. Gordana Cvetković',
    logo: {
      _type: 'image',
      alt: 'Srećno učenje logo'
    },
    favicon: {
      _type: 'image',
      alt: 'Srećno učenje favicon'
    },
    socialMedia: {
      facebook: 'https://facebook.com/srecnoucenje',
      instagram: 'https://instagram.com/srecnoucenje',
      youtube: 'https://youtube.com/@srecnoucenje',
      linkedin: 'https://linkedin.com/company/srecno-ucenje'
    },
    contactInfo: {
      phone: '+381 11 234 5678',
      email: 'info@srecnoucenje.rs',
      address: 'Bulevar kralja Aleksandra 73, Beograd'
    },
    seo: {
      title: 'Srećno učenje - Obrazovna franšiza #1 u Srbiji',
      description: 'Pokrenite uspešnu obrazovnu franšizu sa dokazanim rezultatima. Preko 200 centara, 15+ godina iskustva. Pridružite se već danas!',
      image: {
        _type: 'image',
        alt: 'Srećno učenje - obrazovna franšiza'
      }
    }
  },

  // NAVIGATION
  navigation: {
    _type: 'navigation',
    mainMenu: [
      {
        title: 'Početna',
        url: '/',
        order: 1
      },
      {
        title: 'Franšiza',
        url: '/fransiza',
        order: 2,
        children: [
          { title: 'Modeli franšize', url: '/fransiza/modeli' },
          { title: 'Kako se pridružiti', url: '/fransiza/kako-se-pridruziti' },
          { title: 'Finansijski kalkulator', url: '/fransiza/kalkulator' },
          { title: 'Lokacije', url: '/fransiza/lokacije' }
        ]
      },
      {
        title: 'O nama',
        url: '/o-nama',
        order: 3,
        children: [
          { title: 'Metodologija', url: '/metodologija' },
          { title: 'O autorki', url: '/o-autorki' },
          { title: 'Naš tim', url: '/tim' }
        ]
      },
      {
        title: 'Blog',
        url: '/blog',
        order: 4
      },
      {
        title: 'Kontakt',
        url: '/kontakt',
        order: 5
      }
    ],
    footerMenu: [
      {
        title: 'Brze veze',
        links: [
          { title: 'Franšiza info', url: '/fransiza' },
          { title: 'FAQ', url: '/faq' },
          { title: 'Blog', url: '/blog' },
          { title: 'Kontakt', url: '/kontakt' }
        ]
      },
      {
        title: 'Pravni',
        links: [
          { title: 'Politika privatnosti', url: '/politika-privatnosti' },
          { title: 'Uslovi korišćenja', url: '/uslovi-koriscenja' },
          { title: 'Kolačići', url: '/kolacici' }
        ]
      }
    ]
  },

  // ABOUT AUTHOR
  aboutAuthor: {
    _type: 'aboutAuthor',
    name: 'Dr. Gordana Cvetković',
    title: 'Osnivač i kreator metodologije Srećno učenje',
    biography: 'Dr. Gordana Cvetković je stručnjak za obrazovanje sa preko 20 godina iskustva u radu sa decom. Doktor je pedagogijskih nauka sa specijalizacijom za alternativne metode učenja. Kreator je revolucionarne metodologije "Srećno učenje" koja kombinuje najnovija dostignuća kognitivne psihologije sa praktičnim tehnikama učenja.',
    experience: [
      'Više od 15.000 dece prošlo kroz njene programe',
      'Autor 8 knjiga o metodama učenja',
      'Predavač na 200+ seminara i konferencija',
      'Konsultant za Ministarstvo prosvete'
    ],
    education: [
      'Doktor pedagogijskih nauka - Univerzitet u Beogradu',
      'Master psiholog - Filozofski fakultet',
      'Specijalizacija NLP metoda - International NLP Center'
    ],
    achievements: [
      'Najbolji edukacijski program 2020, 2021, 2022',
      'Priznanje za doprinos obrazovanju - Grad Beograd',
      'Top 100 žena u biznisu - Privredna komora Srbije'
    ],
    image: {
      _type: 'image',
      alt: 'Dr. Gordana Cvetković'
    },
    seo: {
      title: 'Dr. Gordana Cvetković - O autorki metodologije Srećno učenje',
      description: 'Upoznajte Dr. Gordanu Cvetković, kreatora revolucionarne metodologije učenja sa preko 20 godina iskustva u obrazovanju.'
    }
  },

  // METODOLOGIJA
  methodology: {
    _type: 'methodology',
    title: 'Metodologija Srećno učenje',
    subtitle: 'Naučno utemeljen pristup koji kombinuje najbolje iz tradicionalnog i modernog obrazovanja',
    introduction: 'Naša metodologija je rezultat 15 godina istraživanja i rada sa preko 15.000 dece. Kombinujemo dokazane tehnike brzog učenja sa modernom tehnologijom i individualnim pristupom svakom detetu.',
    principles: [
      {
        title: 'Vizuelno učenje',
        description: 'Korišćenje mentalnih mapa i vizuelnih pomoći za bolje razumevanje i pamćenje',
        icon: 'eye'
      },
      {
        title: 'Multisenzorni pristup',
        description: 'Angažovanje svih čula u procesu učenja za maksimalne rezultate',
        icon: 'brain'
      },
      {
        title: 'Emocionalna inteligencija',
        description: 'Razvoj emocionalnih veština paralelno sa akademskim znanjem',
        icon: 'heart'
      },
      {
        title: 'Individualizacija',
        description: 'Prilagođavanje metoda specifičnostima svakog deteta',
        icon: 'user'
      }
    ],
    techniques: [
      {
        name: 'Mentalne mape',
        description: 'Vizuelno predstavljanje informacija koje poboljšava razumevanje i pamćenje za 67%',
        benefits: ['Bolje organizovanje informacija', 'Lakše pamćenje', 'Kreativno rešavanje problema']
      },
      {
        name: 'Brzo čitanje',
        description: 'Tehnike koje udvostručuju brzinu čitanja uz poboljšano razumevanje',
        benefits: ['2x brže čitanje', 'Bolje razumevanje', 'Veća koncentracija']
      },
      {
        name: 'Mnemotehrike',
        description: 'Znanstvene metode za lakše memorisanje kompleksnih informacija',
        benefits: ['10x brže pamćenje', 'Dugoročno zadržavanje', 'Sigurnost na testovima']
      }
    ],
    results: [
      {
        metric: '89%',
        description: 'dece poboljša ocene za najmanje jednu ocenu'
      },
      {
        metric: '156%',
        description: 'povećanje brzine čitanja u proseku'
      },
      {
        metric: '92%',
        description: 'roditelja preporučuje program prijateljima'
      }
    ],
    scientificBasis: 'Metodologija je bazirana na najnovijim istraživanjima iz oblasti kognitivne psihologije, neurouauke i pedagogije. Posebno se oslanjamo na radove Howarda Gardnera (teorija multiplih inteligencija), Daniela Golemana (emocionalna inteligencija) i Tony Buzana (mentalne mape).',
    seo: {
      title: 'Metodologija Srećno učenje - Naučno utemeljen pristup obrazovanju',
      description: 'Otkrijte revolucionarnu metodologiju koja kombinuje mentalne mape, brzo čitanje i emocionalnu inteligenciju za najbolje rezultate u učenju.'
    }
  }
};

/**
 * FUNKCIJE ZA KREIRANJE DOKUMENATA
 */

async function createFAQCategories() {
  console.log('\n🏷️  Kreiram FAQ kategorije...');
  
  const existingCategories = await migrationUtils.getDocumentsByType('faqCategory');
  if (existingCategories.length > 0) {
    console.log(`   📋 Već postoji ${existingCategories.length} kategorija, preskačem...`);
    return existingCategories;
  }

  const categories = CMS_DATA.faqCategories.map(cat => ({
    ...cat,
    _id: `faq-category-${cat.slug.current}`
  }));

  const createdCategories = await migrationUtils.batchCreate(categories);
  console.log(`   ✅ Kreirano ${createdCategories.length} FAQ kategorija`);
  return createdCategories;
}

async function createFAQs(categories) {
  console.log('\n❓ Kreiram FAQ pitanja...');
  
  const existingFAQs = await migrationUtils.getDocumentsByType('faq');
  if (existingFAQs.length >= 8) {
    console.log(`   📋 Već postoji ${existingFAQs.length} pitanja, preskačem...`);
    return existingFAQs;
  }

  // Mapiranje kategorija
  const categoryMap = {
    'fransiza-category': categories.find(c => c.slug?.current === 'fransiza')?._id,
    'edukacija-category': categories.find(c => c.slug?.current === 'edukacija')?._id,
    'tehnicka-podrska-category': categories.find(c => c.slug?.current === 'tehnicka-podrska')?._id,
    'finansije-category': categories.find(c => c.slug?.current === 'finansije')?._id
  };

  const faqs = CMS_DATA.faqs.map((faq, index) => ({
    ...faq,
    _id: `faq-${index + 1}`,
    category: {
      _type: 'reference',
      _ref: categoryMap[faq.categoryRef]
    }
  }));

  // Ukloni categoryRef iz finalne verzije
  faqs.forEach(faq => delete faq.categoryRef);

  const createdFAQs = await migrationUtils.batchCreate(faqs);
  console.log(`   ✅ Kreirano ${createdFAQs.length} FAQ pitanja`);
  return createdFAQs;
}

async function createBlogCategories() {
  console.log('\n📝 Kreiram blog kategorije...');
  
  const existingCategories = await migrationUtils.getDocumentsByType('blogCategory');
  if (existingCategories.length > 0) {
    console.log(`   📋 Već postoji ${existingCategories.length} kategorija, preskačem...`);
    return existingCategories;
  }

  const categories = CMS_DATA.blogCategories.map(cat => ({
    ...cat,
    _id: `blog-category-${cat.slug.current}`
  }));

  const createdCategories = await migrationUtils.batchCreate(categories);
  console.log(`   ✅ Kreirano ${createdCategories.length} blog kategorija`);
  return createdCategories;
}

async function createBlogPosts(categories) {
  console.log('\n📰 Kreiram blog postove...');
  
  const existingPosts = await migrationUtils.getDocumentsByType('blogPost');
  if (existingPosts.length >= 3) {
    console.log(`   📋 Već postoji ${existingPosts.length} postova, preskačem...`);
    return existingPosts;
  }

  // Mapiranje kategorija
  const categoryMap = {
    'saveti-za-ucenje-category': categories.find(c => c.slug?.current === 'saveti-za-ucenje')?._id,
    'fransiza-price-category': categories.find(c => c.slug?.current === 'fransiza-price')?._id,
    'roditeljski-vodic-category': categories.find(c => c.slug?.current === 'roditeljski-vodic')?._id
  };

  const posts = CMS_DATA.blogPosts.map((post, index) => ({
    ...post,
    _id: `blog-post-${index + 1}`,
    category: {
      _type: 'reference',
      _ref: categoryMap[post.categoryRef]
    }
  }));

  // Ukloni categoryRef iz finalne verzije
  posts.forEach(post => delete post.categoryRef);

  const createdPosts = await migrationUtils.batchCreate(posts);
  console.log(`   ✅ Kreirano ${createdPosts.length} blog postova`);
  return createdPosts;
}

async function createOrUpdateHomePage(faqs) {
  console.log('\n🏠 Ažuriram HomePage...');
  
  const existingHome = await sanityClient.fetch('*[_type == "homePage"][0]');
  
  const homePageData = {
    _type: 'homePage',
    franchiseModels: {
      sectionTitle: 'Naši modeli franšize',
      models: CMS_DATA.franchiseModels
    },
    successStories: {
      sectionTitle: 'Priče uspeha',
      featuredVideo: 'https://www.youtube.com/watch?v=example',
      stories: CMS_DATA.successStories
    },
    homeFaqs: {
      sectionTitle: 'Najčešća pitanja',
      faqs: faqs.slice(0, 6).map(faq => ({
        _type: 'reference',
        _ref: faq._id
      }))
    }
  };

  let result;
  if (existingHome) {
    // Update postojeće home page
    result = await sanityClient
      .patch(existingHome._id)
      .set(homePageData)
      .commit();
    console.log('   ✅ Ažurirana HomePage');
  } else {
    // Kreiraj novu home page
    result = await sanityClient.create({
      ...homePageData,
      _id: 'home-page'
    });
    console.log('   ✅ Kreirana nova HomePage');
  }

  return result;
}

async function createOrUpdateSiteSettings() {
  console.log('\n⚙️  Ažuriram Site Settings...');
  
  const existingSettings = await sanityClient.fetch('*[_type == "siteSettings"][0]');
  
  let result;
  if (existingSettings) {
    result = await sanityClient
      .patch(existingSettings._id)
      .set(CMS_DATA.siteSettings)
      .commit();
    console.log('   ✅ Ažurirani Site Settings');
  } else {
    result = await sanityClient.create({
      ...CMS_DATA.siteSettings,
      _id: 'site-settings'
    });
    console.log('   ✅ Kreirani novi Site Settings');
  }

  return result;
}

async function createOrUpdateNavigation() {
  console.log('\n🧭 Ažuriram Navigation...');
  
  const existingNav = await sanityClient.fetch('*[_type == "navigation"][0]');
  
  let result;
  if (existingNav) {
    result = await sanityClient
      .patch(existingNav._id)
      .set(CMS_DATA.navigation)
      .commit();
    console.log('   ✅ Ažurirana Navigation');
  } else {
    result = await sanityClient.create({
      ...CMS_DATA.navigation,
      _id: 'main-navigation'
    });
    console.log('   ✅ Kreirana nova Navigation');
  }

  return result;
}

async function createOrUpdateAboutAuthor() {
  console.log('\n👩‍🏫 Ažuriram About Author...');
  
  const existingAuthor = await sanityClient.fetch('*[_type == "aboutAuthor"][0]');
  
  let result;
  if (existingAuthor) {
    result = await sanityClient
      .patch(existingAuthor._id)
      .set(CMS_DATA.aboutAuthor)
      .commit();
    console.log('   ✅ Ažuriran About Author');
  } else {
    result = await sanityClient.create({
      ...CMS_DATA.aboutAuthor,
      _id: 'about-author'
    });
    console.log('   ✅ Kreiran novi About Author');
  }

  return result;
}

async function createOrUpdateMethodology() {
  console.log('\n🎯 Ažuriram Metodologija...');
  
  const existingMethodology = await sanityClient.fetch('*[_type == "methodology"][0]');
  
  let result;
  if (existingMethodology) {
    result = await sanityClient
      .patch(existingMethodology._id)
      .set(CMS_DATA.methodology)
      .commit();
    console.log('   ✅ Ažurirana Metodologija');
  } else {
    result = await sanityClient.create({
      ...CMS_DATA.methodology,
      _id: 'main-methodology'
    });
    console.log('   ✅ Kreirana nova Metodologija');
  }

  return result;
}

/**
 * GLAVNA FUNKCIJA ZA IZVRŠAVANJE
 */
async function populateCMS() {
  console.log('🚀 KOMPLETNO POPUNJAVANJE SANITY CMS-a');
  console.log('=====================================');

  try {
    // Validacija klijenta
    const isClientValid = await validateClient();
    if (!isClientValid) {
      throw new Error('Sanity client nije valjan');
    }

    // 1. Kreiraj FAQ kategorije
    const faqCategories = await createFAQCategories();

    // 2. Kreiraj FAQ pitanja
    const faqs = await createFAQs(faqCategories);

    // 3. Kreiraj blog kategorije
    const blogCategories = await createBlogCategories();

    // 4. Kreiraj blog postove
    const blogPosts = await createBlogPosts(blogCategories);

    // 5. Ažuriraj HomePage
    await createOrUpdateHomePage(faqs);

    // 6. Ažuriraj Site Settings
    await createOrUpdateSiteSettings();

    // 7. Ažuriraj Navigation
    await createOrUpdateNavigation();

    // 8. Ažuriraj About Author
    await createOrUpdateAboutAuthor();

    // 9. Ažuriraj Metodologija
    await createOrUpdateMethodology();

    console.log('\n🎉 USPEŠNO ZAVRŠENO!');
    console.log('===================');
    console.log(`✅ FAQ kategorije: ${faqCategories.length}`);
    console.log(`✅ FAQ pitanja: ${faqs.length}`);
    console.log(`✅ Blog kategorije: ${blogCategories.length}`);
    console.log(`✅ Blog postovi: ${blogPosts.length}`);
    console.log('✅ HomePage ažurirana');
    console.log('✅ Site Settings ažurirani');
    console.log('✅ Navigation ažurirana');
    console.log('✅ About Author ažuriran');
    console.log('✅ Metodologija ažurirana');
    
    console.log('\n💡 SLEDEĆI KORACI:');
    console.log('1. Proverite Sanity Studio da vidite nove podatke');
    console.log('2. Dodajte slike za blog postove i success stories');
    console.log('3. Testirajte frontend da sve radi');

  } catch (error) {
    console.error('\n❌ GREŠKA TOKOM POPUNJAVANJA:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Pokretanje samo ako je script pozvan direktno
if (require.main === module) {
  populateCMS();
}

module.exports = { populateCMS, CMS_DATA };