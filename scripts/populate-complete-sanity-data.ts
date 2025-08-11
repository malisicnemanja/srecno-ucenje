#!/usr/bin/env tsx
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '08ctxj6y',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function populateCompleteSanityData() {
  console.log('🚀 Starting complete Sanity data population...\n')

  try {
    // 1. Check and create HomePage document
    console.log('📄 Populating HomePage data...')
    await ensureHomePageData()

    // 2. Check and create FAQ data
    console.log('❓ Populating FAQ data...')
    await ensureFAQData()

    // 3. Check and create Blog data
    console.log('📝 Populating Blog data...')
    await ensureBlogData()

    // 4. Check and create Site Settings
    console.log('⚙️ Populating Site Settings...')
    await ensureSiteSettings()

    // 5. Check and create Navigation
    console.log('🧭 Populating Navigation...')
    await ensureNavigation()

    // 6. Check and create About Author data
    console.log('👤 Populating About Author data...')
    await ensureAboutAuthor()

    console.log('\n✅ Complete Sanity data population finished successfully!')
    
  } catch (error) {
    console.error('❌ Error during data population:', error)
    process.exit(1)
  }
}

async function ensureHomePageData() {
  const existingHomePage = await client.fetch(`*[_type == "homePage"][0]`)
  
  if (!existingHomePage) {
    console.log('Creating new HomePage document...')
    await client.create({
      _type: 'homePage',
      _id: 'homepage',
      enhancedHero: {
        title: "Pokrenite svoju edukativnu franšizu",
        subtitle: "Pridružite se revoluciji u obrazovanju dece kroz našu jedinstvenu metodologiju",
        description: "Srećno učenje donosi inovativni pristup obrazovanju koji spaja tradiciju sa modernim tehnikama. Naša franšiza omogućava roditeljima i edukatorima da stvore okruženje gde deca uče sa radošću i postižu izuzetne rezultate.",
        buttons: [
          {
            _key: 'cta-primary',
            text: "Zakazujte konsultacije",
            link: "/zakazivanje",
            variant: "primary"
          },
          {
            _key: 'cta-secondary', 
            text: "Saznajte više",
            link: "/o-autorki",
            variant: "secondary"
          }
        ]
      },
      statistics: [
        {
          _key: 'stat-1',
          value: '500+',
          label: 'Zadovoljnih roditelja',
          icon: 'users',
          description: 'Porodice koje veruju našoj metodologiji',
          color: 'sky'
        },
        {
          _key: 'stat-2',
          value: '15+',
          label: 'Gradova u Srbiji',
          icon: 'location',
          description: 'Mreža franšiza širom zemlje',
          color: 'grass'
        },
        {
          _key: 'stat-3', 
          value: '89%',
          label: 'Poboljšanja u učenju',
          icon: 'chart',
          description: 'Prosečno poboljšanje rezultata',
          color: 'sun'
        },
        {
          _key: 'stat-4',
          value: '5+',
          label: 'Godina iskustva',
          icon: 'calendar',
          description: 'Proverena metodologija',
          color: 'heart'
        }
      ],
      differentiators: {
        sectionTitle: "Zašto baš Srećno učenje?",
        subtitle: "Naša metodologija je jedinstvena kombinacija nauke, umetnosti i radosti",
        items: [
          {
            _key: 'diff-1',
            title: "Dokazana metodologija",
            description: "Pet godina testiranja i usavršavanja našeg pristupa sa hiljade dece",
            icon: "brain"
          },
          {
            _key: 'diff-2', 
            title: "Sveobuhvatna podrška",
            description: "Kompletno obuka, materijali i kontinuiranu podršku za franšizante",
            icon: "partnership"
          },
          {
            _key: 'diff-3',
            title: "Tržišna prednost",
            description: "Jedinstveni pristup koji se izdvaja na tržištu edukativnih usluga",
            icon: "trending"
          },
          {
            _key: 'diff-4',
            title: "Emotivni pristup",
            description: "Deca uče sa radošću kroz priče i igru, što garantuje dugotrajan uspeh",
            icon: "heart"
          }
        ]
      },
      franchiseSteps: {
        sectionTitle: "Kako do vaše franšize u 4 koraka",
        steps: [
          {
            _key: 'step-1',
            number: 1,
            title: "Inicijalni kontakt",
            description: "Pozovite nas ili popunite formu. Razgovaraćemo o vašoj motivaciji i ciljevima.",
            icon: "phone"
          },
          {
            _key: 'step-2',
            number: 2, 
            title: "Analiza i odobravanje",
            description: "Analiziraćemo vaš profil i tržište. Ako se poklapamo, potpisujemo ugovor.",
            icon: "check"
          },
          {
            _key: 'step-3',
            number: 3,
            title: "Obuka i priprema", 
            description: "Intenzivna obuka od 30 sati plus materijali i priručnici za rad.",
            icon: "book"
          },
          {
            _key: 'step-4',
            number: 4,
            title: "Pokretanje rada",
            description: "Otvara se vaša franšiza uz našu podršku i marketing kampanju.",
            icon: "rocket"
          }
        ]
      },
      successStories: {
        sectionTitle: "Priče o uspehu naših partnera",
        stories: [
          {
            _key: 'story-1',
            name: "Marija Petrović", 
            role: "Vlasnica franšize",
            location: "Novi Sad",
            story: "Za 8 meseci sam udvostručila broj polaznika. Deca dolaze sa radošću, a roditelji su oduševljeni napretkom.",
            yearStarted: "2023",
            metric: {
              value: "40+",
              label: "dece mesečno"
            }
          },
          {
            _key: 'story-2',
            name: "Stefan Nikolić",
            role: "Franšizant",
            location: "Niš", 
            story: "Metodologija je neverojna. Roditelji preporučuju jedni drugima, lista čekanja je puna.",
            yearStarted: "2022",
            metric: {
              value: "95%",
              label: "preporuka"  
            }
          },
          {
            _key: 'story-3',
            name: "Ana Jovanović",
            role: "Edukatorka",
            location: "Kragujevac",
            story: "Nikad nisam videla da deca toliko vole da uče. Metodologija čini čuda!",
            yearStarted: "2023", 
            metric: {
              value: "100%",
              label: "zadovoljstva"
            }
          }
        ]
      },
      homeFaqs: {
        sectionTitle: "Najčešće postavljena pitanja"
      },
      newsletterCTA: {
        title: "Ostanite u toku sa najnovijim vestima",
        description: "Prijavite se za naš newsletter i budite prvi koji će saznati o novim lokacijama, uspesima i mogućnostima.",
        incentive: "🎁 Kao poklon, dobićete besplatnu e-knjigu 'Vodič kroz franšizu'",
        ctaText: "Prijavite se besplatno"
      },
      seo: {
        metaTitle: "Srećno učenje - Franšiza za obrazovanje dece | Jedinstvena metodologija",
        metaDescription: "Pokrenite uspešnu franšizu Srećno učenje. Dokazana metodologija, sveobuhvatna podrška i tržišna prednost. Kontaktirajte nas danas!",
        keywords: "franšiza, obrazovanje dece, metodologija učenja, edukativne usluge, Srbija"
      }
    })
  } else {
    console.log('HomePage document exists, updating missing sections...')
    
    // Update missing sections
    const updates: any = {}
    
    if (!existingHomePage.successStories?.stories || existingHomePage.successStories.stories.length === 0) {
      updates.successStories = {
        sectionTitle: "Priče o uspehu naših partnera",
        stories: [
          {
            _key: 'story-1',
            name: "Marija Petrović", 
            role: "Vlasnica franšize",
            location: "Novi Sad",
            story: "Za 8 meseci sam udvostručila broj polaznika. Deca dolaze sa radošću, a roditelji su oduševljeni napretkom.",
            yearStarted: "2023",
            metric: {
              value: "40+",
              label: "dece mesečno"
            }
          },
          {
            _key: 'story-2',
            name: "Stefan Nikolić",
            role: "Franšizant",
            location: "Niš", 
            story: "Metodologija je neverojna. Roditelji preporučuju jedni drugima, lista čekanja je puna.",
            yearStarted: "2022",
            metric: {
              value: "95%",
              label: "preporuka"  
            }
          },
          {
            _key: 'story-3',
            name: "Ana Jovanović",
            role: "Edukatorka",
            location: "Kragujevac",
            story: "Nikad nisam videla da deca toliko vole da uče. Metodologija čini čuda!",
            yearStarted: "2023", 
            metric: {
              value: "100%",
              label: "zadovoljstva"
            }
          }
        ]
      }
    }

    if (!existingHomePage.franchiseModels) {
      updates.franchiseModels = {
        sectionTitle: "Izaberite model franšize",
        models: [
          {
            _key: 'model-1',
            name: "Starter paket",
            price: "999€",
            features: [
              "Osnovna obuka (20h)",
              "Početni materijali",
              "Prva 3 meseca podrške",
              "Marketing materijali"
            ],
            highlighted: false
          },
          {
            _key: 'model-2', 
            name: "Profesional paket",
            price: "1.999€",
            features: [
              "Kompletna obuka (40h)",
              "Svi materijali uključeni",
              "Godinu dana podrške",
              "Marketing kampanja", 
              "Ekskluzivna teritorija"
            ],
            highlighted: true
          },
          {
            _key: 'model-3',
            name: "Premium paket", 
            price: "3.499€",
            features: [
              "VIP obuka (60h)",
              "Premium materijali",
              "Doživotna podrška",
              "Kompletna marketing podrška",
              "Ekskluzivna teritorija",
              "Lična mentorka"
            ],
            highlighted: false
          }
        ]
      }
    }

    if (Object.keys(updates).length > 0) {
      await client.patch('homepage').set(updates).commit()
      console.log('Updated HomePage with missing sections')
    }
  }
}

async function ensureFAQData() {
  const faqCount = await client.fetch(`count(*[_type == "faq"])`)
  
  if (faqCount === 0) {
    console.log('Creating FAQ documents...')
    
    // Create FAQ categories first
    const categories = [
      {
        _type: 'faqCategory',
        _id: 'cat-general',
        name: 'Opšte informacije',
        slug: { current: 'opste-informacije' },
        description: 'Osnovna pitanja o franšizi',
        icon: 'info',
        color: 'sky',
        order: 1
      },
      {
        _type: 'faqCategory', 
        _id: 'cat-franchise',
        name: 'Franšiza',
        slug: { current: 'fransiza' },
        description: 'Pitanja o poslovnom modelu',
        icon: 'business',
        color: 'grass',
        order: 2
      }
    ]

    for (const category of categories) {
      await client.createOrReplace(category)
    }

    // Create FAQ documents
    const faqs = [
      {
        _type: 'faq',
        question: 'Koliko košta pokretanje franšize Srećno učenje?',
        answer: 'Cene se kreću od 999€ za Starter paket do 3.499€ za Premium paket. Svaki paket uključuje obuku, materijale i podršku prilagođenu vašim potrebama.',
        category: { _type: 'reference', _ref: 'cat-franchise' },
        order: 1,
        featured: true
      },
      {
        _type: 'faq',
        question: 'Koliko traje obuka za franšizante?',
        answer: 'Obuka traje od 20 do 60 sati, zavisno od odabranog paketa. Uključuje teorijski i praktični deo, sa kontinuiranom podrškom nakon završetka.',
        category: { _type: 'reference', _ref: 'cat-franchise' },
        order: 2,
        featured: true
      },
      {
        _type: 'faq', 
        question: 'Da li je potrebno pedagoško obrazovanje?',
        answer: 'Nije neophodno, ali je poželjno. Naša obuka pokriva sve potrebne pedagogške aspekte. Važnije su motivacija, komunikativnost i ljubav prema radu sa decom.',
        category: { _type: 'reference', _ref: 'cat-general' },
        order: 3,
        featured: true
      },
      {
        _type: 'faq',
        question: 'Koliko dece mogu da primim u grupu?',
        answer: 'Preporučujemo grupe od 6-8 dece za optimalne rezultate. To omogućava individualni pristup svakom detetu uz održavanje grupne dinamike.',
        category: { _type: 'reference', _ref: 'cat-general' },
        order: 4,
        featured: false
      },
      {
        _type: 'faq',
        question: 'Da li mogu da kombinujem sa drugim poslom?',
        answer: 'Apsolutno! Mnogi naši franšizanti vode franšizu kao dodatnu delatnost. Fleksibilnost je jedna od glavnih prednosti našeg modela.',
        category: { _type: 'reference', _ref: 'cat-franchise' },
        order: 5,
        featured: false
      },
      {
        _type: 'faq',
        question: 'Kakvu podršku pružate tokom rada?',
        answer: 'Nudimo kontinuiranu podršku kroz mesečne konsultacije, dopunska obučavanja, marketing materijale i direktnu komunikaciju sa timom.',
        category: { _type: 'reference', _ref: 'cat-franchise' },
        order: 6,
        featured: false
      }
    ]

    for (const faq of faqs) {
      await client.create(faq)
    }

    // Update HomePage to reference FAQ documents
    const faqRefs = await client.fetch(`*[_type == "faq" && featured == true]._id`)
    await client.patch('homepage').set({
      'homeFaqs.faqs': faqRefs.map((id: string) => ({ _type: 'reference', _ref: id }))
    }).commit()

    console.log(`Created ${faqs.length} FAQ documents`)
  }
}

async function ensureBlogData() {
  const blogCount = await client.fetch(`count(*[_type == "blogPost"])`)
  
  if (blogCount === 0) {
    console.log('Creating blog documents...')
    
    // Create blog categories
    const blogCategories = [
      {
        _type: 'blogCategory',
        _id: 'cat-methodology',
        title: 'Metodologija',
        slug: { current: 'metodologija' },
        description: 'Članci o našoj edukativnoj metodologiji',
        color: 'sky'
      },
      {
        _type: 'blogCategory',
        _id: 'cat-tips',
        title: 'Saveti za roditelje',
        slug: { current: 'saveti-za-roditelje' },
        description: 'Praktični saveti za podržavanje učenja kod kuće',
        color: 'grass'
      }
    ]

    for (const category of blogCategories) {
      await client.createOrReplace(category)
    }

    // Create sample blog posts
    const blogPosts = [
      {
        _type: 'blogPost',
        title: 'Kako da vaše dete zavoli čitanje',
        slug: { current: 'kako-da-vase-dete-zavoli-citanje' },
        excerpt: 'Otkrijte praktične načine da kod deteta razvijate ljubav prema knjigama i čitanju kroz igru i kreativnost.',
        content: [
          {
            _type: 'block',
            children: [{
              _type: 'span',
              text: 'Čitanje je temelj uspešnog obrazovanja. Evo kako da ga učinite zabavnim za vašu decu...'
            }]
          }
        ],
        author: {
          _type: 'reference',
          _ref: 'author-zeljana'
        },
        category: {
          _type: 'reference', 
          _ref: 'cat-tips'
        },
        publishedAt: new Date().toISOString(),
        featured: true,
        readTime: 5
      },
      {
        _type: 'blogPost',
        title: 'Metodologija Srećno učenje - osnove',
        slug: { current: 'metodologija-srecno-ucenje-osnove' },
        excerpt: 'Upoznajte se sa osnovnim principima naše jedinstvene metodologije koja spaja bajku sa naukom.',
        content: [
          {
            _type: 'block',
            children: [{
              _type: 'span',
              text: 'Naša metodologija zasniva se na holističkom pristupu razvoju deteta...'
            }]
          }
        ],
        author: {
          _type: 'reference',
          _ref: 'author-zeljana'
        },
        category: {
          _type: 'reference',
          _ref: 'cat-methodology'
        },
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        featured: false,
        readTime: 8
      }
    ]

    // Create author document first
    await client.createOrReplace({
      _type: 'author',
      _id: 'author-zeljana',
      name: 'Željana Radojičić Lukić',
      title: 'Autorka metodologije',
      bio: 'Pedagog sa 20+ godina iskustva u razvoju kreativnih pristupa učenju'
    })

    for (const post of blogPosts) {
      await client.create(post)
    }

    console.log(`Created ${blogPosts.length} blog posts`)
  }
}

async function ensureSiteSettings() {
  const existingSettings = await client.fetch(`*[_type == "siteSettings"][0]`)
  
  if (!existingSettings) {
    console.log('Creating Site Settings...')
    await client.create({
      _type: 'siteSettings',
      _id: 'site-settings',
      siteName: 'Srećno učenje',
      siteSubtitle: 'Franšiza za obrazovanje dece',
      siteDescription: 'Pokrenite uspešnu edukativnu franšizu sa dokazanom metodologijom Srećno učenje. Kompletna podrška, obuka i materijali za vaš uspeh.',
      email: 'info@srecno-ucenje.rs',
      phone: '+381 11 123 4567',
      address: 'Beograd, Srbija',
      socialLinks: [
        {
          _key: 'facebook',
          platform: 'Facebook',
          url: 'https://facebook.com/srecno-ucenje'
        },
        {
          _key: 'instagram', 
          platform: 'Instagram',
          url: 'https://instagram.com/srecno-ucenje'
        }
      ],
      defaultSeo: {
        metaTitle: 'Srećno učenje - Franšiza za obrazovanje dece',
        metaDescription: 'Pokrenite uspešnu edukativnu franšizu sa dokazanom metodologijom. Kompletna podrška i obuka.',
        keywords: 'franšiza, obrazovanje, deca, metodologija, učenje'
      }
    })
  }
}

async function ensureNavigation() {
  const existingNav = await client.fetch(`*[_type == "navigation"][0]`)
  
  if (!existingNav) {
    console.log('Creating Navigation...')
    await client.create({
      _type: 'navigation',
      _id: 'main-navigation',
      title: 'Glavna navigacija',
      mainMenu: [
        {
          _key: 'nav-home',
          label: 'Početna',
          href: '/'
        },
        {
          _key: 'nav-about',
          label: 'O autorki', 
          href: '/o-autorki'
        },
        {
          _key: 'nav-methodology',
          label: 'Metodologija',
          href: '/metodologija'
        },
        {
          _key: 'nav-franchise',
          label: 'Franšiza',
          href: '/franchise-models',
          subItems: [
            {
              _key: 'nav-franchise-models',
              label: 'Modeli franšize',
              href: '/franchise-models',
              description: 'Izaberite paket koji vam odgovara'
            },
            {
              _key: 'nav-franchise-apply',
              label: 'Prijavite se',
              href: '/fransiza/prijava', 
              description: 'Pokrenite proces prijave'
            }
          ]
        },
        {
          _key: 'nav-books',
          label: 'Knjige',
          href: '/knjige'
        },
        {
          _key: 'nav-blog',
          label: 'Blog', 
          href: '/blog'
        },
        {
          _key: 'nav-contact',
          label: 'Kontakt',
          href: '/kontakt'
        }
      ],
      ctaButton: {
        text: 'Zakazujte konsultacije',
        href: '/zakazivanje',
        style: 'primary'
      }
    })
  }
}

async function ensureAboutAuthor() {
  const existingAuthor = await client.fetch(`*[_type == "aboutAuthor"][0]`)
  
  if (!existingAuthor) {
    console.log('Creating About Author...')
    await client.create({
      _type: 'aboutAuthor',
      _id: 'about-author',
      title: 'O autorki',
      heroTitle: 'Željana Radojičić Lukić',
      heroSubtitle: 'Autorka, pedagog i istraživačica koja spaja tradiciju sa inovacijom',
      sections: [
        {
          _key: 'section-philosophy',
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
          backgroundColor: '#f8fafc'
        }
      ],
      seo: {
        metaTitle: 'O autorki - Željana Radojičić Lukić | Srećno učenje',
        metaDescription: 'Upoznajte Željanu Radojičić Lukić, autorku i pedagoga koja je stvorila jedinstvenu metodologiju Srećno učenje.',
        keywords: 'Željana Radojičić Lukić, autorka, pedagog, metodologija, obrazovanje dece'
      }
    })
  }
}

// Run the script
populateCompleteSanityData()