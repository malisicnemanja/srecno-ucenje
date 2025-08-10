#!/usr/bin/env tsx

/**
 * HOMEPAGE POPULATION SCRIPT
 * 
 * Creates the homePage document with proper Serbian content
 * aligned with the fixed schema structure.
 */

import { createClient } from '@sanity/client'
// Generate simple unique IDs without external dependency
function generateKey() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01'
})

const homePageContent = {
  _id: 'homePage',
  _type: 'homePage',
  
  enhancedHero: {
    _type: 'enhancedHero',
    title: 'Započnite svoju obrazovnu franšizu sa Srećno učenje',
    subtitle: 'Pridružite se uspešnoj mreži od preko 50 centara širom Srbije',
    description: 'Transformišite svoju karijeru kroz dokazanu metodologiju koja je pomogla hiljadama dece da otkriju radost učenja. Kompletan sistem podrške, obuke i marketinga za vaš uspeh.',
    buttons: [
      {
        _key: generateKey(),
        text: 'Zatražite informacije',
        link: '/franšiza/kako-se-priključiti',
        variant: 'primary'
      },
      {
        _key: generateKey(),
        text: 'Virtualna učionica',
        link: '/virtualna-ucionica',
        variant: 'secondary'
      }
    ]
  },

  statistics: [
    {
      _key: generateKey(),
      value: '50+',
      label: 'Centara širom Srbije',
      icon: '🏢'
    },
    {
      _key: generateKey(),
      value: '15+',
      label: 'Godina iskustva',
      icon: '📅'
    },
    {
      _key: generateKey(),
      value: '5000+',
      label: 'Srećne dece',
      icon: '👶'
    },
    {
      _key: generateKey(),
      value: '98%',
      label: 'Zadovoljnih roditelja',
      icon: '❤️'
    }
  ],

  differentiators: {
    sectionTitle: 'Zašto baš Srećno učenje?',
    items: [
      {
        _key: generateKey(),
        title: 'Dokazana metodologija',
        description: 'Jedinstvena metodologija razvijena kroz 15 godina rada sa decom, testirana u preko 50 centara.',
        icon: '🎓'
      },
      {
        _key: generateKey(),
        title: 'Kompletna podrška',
        description: 'Od početne obuke do stalnog marketinga - tu smo da obezbedimo vaš uspeh.',
        icon: '🤝'
      },
      {
        _key: generateKey(),
        title: 'Fleksibilni modeli',
        description: 'Različiti paketi investicije prilagođeni vašim mogućnostima i ambicijama.',
        icon: '⚡'
      },
      {
        _key: generateKey(),
        title: 'Brz povrat investicije',
        description: 'Većina partnera postiže profitabilnost u prvoj godini rada.',
        icon: '📈'
      }
    ]
  },

  franchiseSteps: {
    sectionTitle: '4 koraka do vaše franšize',
    steps: [
      {
        _key: generateKey(),
        number: 1,
        title: 'Prva konsultacija',
        description: 'Razgovaramo o vašim ciljevima i predstavljamo mogućnosti franšize.',
        icon: '💬'
      },
      {
        _key: generateKey(),
        number: 2,
        title: 'Odabir lokacije',
        description: 'Pomažemo vam da pronađete idealnu lokaciju za vaš centar.',
        icon: '📍'
      },
      {
        _key: generateKey(),
        number: 3,
        title: 'Obuka i priprema',
        description: 'Kompletna obuka za metodologiju, poslovanje i marketing.',
        icon: '🎯'
      },
      {
        _key: generateKey(),
        number: 4,
        title: 'Otvaranje centra',
        description: 'Zvaničo otvaranje sa našom podrškom za marketing i prve klijente.',
        icon: '🚀'
      }
    ]
  },

  franchiseModels: {
    sectionTitle: 'Naši modeli franšize',
    models: [
      {
        _key: generateKey(),
        name: 'Starter',
        price: 'Od €8.000',
        features: [
          'Osnovna obuka',
          'Marketing materijali',
          'Prva 6 meseci podrške'
        ],
        highlighted: false
      },
      {
        _key: generateKey(),
        name: 'Professional',
        price: 'Od €15.000',
        features: [
          'Kompletna obuka',
          'Redovno marketingo',
          'Stalna podrška',
          'Teritorijalna ekskluzivnost'
        ],
        highlighted: true
      },
      {
        _key: generateKey(),
        name: 'Premium',
        price: 'Od €25.000',
        features: [
          'VIP obuka i mentoring',
          'Personalizovani marketing',
          'Prioritetna podrška',
          'Razvoj dodatnih programa'
        ],
        highlighted: false
      }
    ]
  },

  successStories: {
    sectionTitle: 'Priče uspeha naših partnera',
    featuredVideo: 'https://www.youtube.com/watch?v=example',
    stories: [
      {
        _key: generateKey(),
        name: 'Marija Petrović',
        role: 'Vlasnica centra',
        location: 'Novi Sad',
        story: 'Već u prvoj godini rada postigla sam profitabilnost. Deca vole da dolaze, roditelji su zadovoljni, a ja živim svoj san.',
        yearStarted: '2020',
        metric: {
          value: '85',
          label: 'dece mesečno'
        }
      },
      {
        _key: generateKey(),
        name: 'Stefan Jovanović',
        role: 'Franšizni partner',
        location: 'Kragujevac',
        story: 'Otvorio sam drugi centar nakon dve godine. Metodologija stvarno funkcioniše i roditelji prepoznaju kvalitet.',
        yearStarted: '2019',
        metric: {
          value: '2',
          label: 'centra'
        }
      },
      {
        _key: generateKey(),
        name: 'Ana Nikolić',
        role: 'Edukator',
        location: 'Subotica',
        story: 'Transformisala sam svoju karijeru. Rad sa decom po ovoj metodologiji mi donosi ogromno zadovoljstvo.',
        yearStarted: '2021',
        metric: {
          value: '95%',
          label: 'zadovoljnih roditelja'
        }
      }
    ]
  },

  homeFaqs: {
    sectionTitle: 'Često postavljana pitanja',
    faqs: [] // Will be populated with references later
  },

  interactiveClassroom: {
    sectionTitle: 'Interaktivna učionica',
    description: 'Istražite našu virtualnu učionicu i vidite kako metodologija funkcioniše u praksi.',
    ctaText: 'Istražite učionicu'
  },

  leadMagnets: {
    sectionTitle: 'Besplatni resursi za buduće partnere',
    resources: [
      {
        _key: generateKey(),
        title: 'Vodič kroz franšizu',
        description: 'Kompletne informacije o tome kako funkcioniše naša franšiza.',
        downloadUrl: '#'
      },
      {
        _key: generateKey(),
        title: 'Finansijski kalkulator',
        description: 'Izračunajte potencijalnu profitabilnost vašeg centra.',
        downloadUrl: '/franšiza/kalkulator'
      }
    ]
  },

  newsletterCTA: {
    title: 'Budite u toku sa prilikama',
    description: 'Prijavite se za newsletter i prvi saznajte o novim mogućnostima za franšizu.',
    incentive: 'Besplatan vodič: "10 koraka do uspešne obrazovne franšize"',
    ctaText: 'Prijavite se'
  },

  seo: {
    metaTitle: 'Srećno učenje franšiza - Počnite svoju obrazovnu priču',
    metaDescription: 'Pridružite se mreži od 50+ uspešnih centara. Dokazana metodologija, kompletna podrška, fleksibilni modeli investicije.',
    keywords: ['franšiza', 'obrazovanje', 'deca', 'Srećno učenje', 'centar za učenje', 'investicija'],
    focusKeyword: 'obrazovna franšiza'
  }
}

async function populateHomePage() {
  try {
    console.log('🏠 Starting homepage population...')
    
    // Check if homePage document already exists
    const existingHomePage = await client.fetch('*[_type == "homePage"][0]')
    
    if (existingHomePage) {
      console.log('📄 HomePage document already exists. Updating...')
      
      // Update the existing document
      const result = await client
        .patch(existingHomePage._id)
        .set(homePageContent)
        .commit()
        
      console.log('✅ HomePage document updated successfully!')
      console.log('📄 Document ID:', result._id)
      
    } else {
      console.log('📄 Creating new homePage document...')
      
      // Create new document
      const result = await client.create(homePageContent)
      
      console.log('✅ HomePage document created successfully!')
      console.log('📄 Document ID:', result._id)
    }
    
    // Verify the document
    const verifyDoc = await client.fetch('*[_type == "homePage"][0]')
    if (verifyDoc) {
      console.log('✅ Verification successful - document exists and is queryable')
      console.log('📊 Sections populated:')
      console.log(`  - Enhanced Hero: ${verifyDoc.enhancedHero ? '✅' : '❌'}`)
      console.log(`  - Statistics: ${verifyDoc.statistics?.length || 0} items`)
      console.log(`  - Differentiators: ${verifyDoc.differentiators?.items?.length || 0} items`)
      console.log(`  - Franchise Steps: ${verifyDoc.franchiseSteps?.steps?.length || 0} steps`)
      console.log(`  - Success Stories: ${verifyDoc.successStories?.stories?.length || 0} stories`)
      console.log(`  - Lead Magnets: ${verifyDoc.leadMagnets?.resources?.length || 0} resources`)
    } else {
      console.error('❌ Verification failed - document not found after creation')
    }
    
  } catch (error) {
    console.error('❌ Error populating homepage:', error)
    throw error
  }
}

// Run the population if called directly
if (require.main === module) {
  populateHomePage().catch((error) => {
    console.error('💥 Homepage population failed:', error)
    process.exit(1)
  })
}

export default populateHomePage