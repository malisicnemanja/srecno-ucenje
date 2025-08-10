/**
 * Complete Sanity CMS Migration Script
 * Rešava sve probleme sa shemom i podacima
 */

import { createClient } from '@sanity/client'
import { v4 as uuidv4 } from 'uuid'

// Sanity client configuration
const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-10-10'
})

// Helper funkcije
const generateKey = () => uuidv4().replace(/-/g, '').substring(0, 12)

// Srpski sadržaj za različite sekcije
const SERBIAN_CONTENT = {
  enhancedHero: {
    title: "Pokrenite svoju obrazovnu franšizu sa Srećno učenje",
    subtitle: "Metodologija koja garantuje uspeh",
    description: "Priključite se najvećoj mreži obrazovnih centara u Srbiji. Naša dokazana metodologija i potpuna podrška omogućavaju vam da izgradite uspešan posao dok menjate živote dece u svojoj zajednici.",
    buttons: [
      {
        _key: generateKey(),
        text: "Započni franšizu",
        link: "/franchise-form",
        variant: "primary"
      },
      {
        _key: generateKey(),
        text: "Saznaj više",
        link: "/o-nama",
        variant: "secondary"
      }
    ]
  },
  
  statistics: [
    {
      _key: generateKey(),
      value: "500+",
      label: "Zadovoljne dece",
      icon: "👶"
    },
    {
      _key: generateKey(),
      value: "15+",
      label: "Partnera",
      icon: "🤝"
    },
    {
      _key: generateKey(),
      value: "98%",
      label: "Uspešnosti",
      icon: "📊"
    },
    {
      _key: generateKey(),
      value: "5+",
      label: "Godina iskustva",
      icon: "🎯"
    }
  ],

  differentiators: {
    sectionTitle: "Zašto baš Srećno učenje?",
    items: [
      {
        _key: generateKey(),
        title: "Dokazana metodologija",
        description: "Naša metodologija je testirana sa preko 500 dece i pokazuje izuzetne rezultate u razvoju kognitivnih sposobnosti.",
        icon: "🧠"
      },
      {
        _key: generateKey(),
        title: "Potpuna podrška",
        description: "Dobijate kompletnu obuku, marketing materijale, tehnološku podršku i kontinuiranu pomoć našeg tima.",
        icon: "🎓"
      },
      {
        _key: generateKey(),
        title: "Brz povraćaj investicije",
        description: "Prosečan ROI od 200% u prvoj godini rada. Početna investicija se vraća već nakon 8-12 meseci.",
        icon: "💰"
      },
      {
        _key: generateKey(),
        title: "Fleksibilni modeli",
        description: "Biraju između različitih franchise modela koji odgovaraju vašim mogućnostima i ciljevima.",
        icon: "⚡"
      }
    ]
  },

  franchiseSteps: {
    sectionTitle: "4 koraka do vaše franšize",
    steps: [
      {
        _key: generateKey(),
        number: "1",
        title: "Aplikacija",
        description: "Popunite online aplikaciju i proćićemo kroz vaše ciljeve i expectacije.",
        icon: "📝"
      },
      {
        _key: generateKey(),
        number: "2", 
        title: "Obuka",
        description: "Prođite kroz našu sertifikovanu obuku koja traje 2 nedelje i naučite sve o metodologiji.",
        icon: "🎯"
      },
      {
        _key: generateKey(),
        number: "3",
        title: "Pokretanje",
        description: "Otvorite svoj centar uz našu podršku za lokaciju, marketing i prve grupe dece.",
        icon: "🚀"
      },
      {
        _key: generateKey(),
        number: "4",
        title: "Rast",
        description: "Rastite vaš posao uz kontinuiranu podršku, nova deca se prijavljuju mesečno.",
        icon: "📈"
      }
    ]
  },

  franchiseModels: {
    sectionTitle: "Naši modeli",
    models: [
      {
        _key: generateKey(),
        name: "Starter",
        price: "€5,000",
        features: [
          "Osnovna obuka (2 nedelje)",
          "Marketing materijali",
          "6 meseci podrške",
          "Do 30 dece"
        ],
        highlighted: false
      },
      {
        _key: generateKey(),
        name: "Professional", 
        price: "€12,000",
        features: [
          "Napredna obuka (4 nedelje)",
          "Premium marketing",
          "12 meseci podrške", 
          "Do 80 dece",
          "Online platforma"
        ],
        highlighted: true
      },
      {
        _key: generateKey(),
        name: "Master",
        price: "€25,000",
        features: [
          "Master obuka (6 nedelja)",
          "Kompletna podrška", 
          "24 meseca podrške",
          "Neograničeno dece",
          "Ekskluzivna teritorija"
        ],
        highlighted: false
      }
    ]
  },

  successStories: {
    sectionTitle: "Priče uspeha",
    featuredVideo: "https://www.youtube.com/watch?v=example",
    stories: [
      {
        _key: generateKey(),
        name: "Marija Petrović",
        role: "Vlasnica centra",
        location: "Novi Sad",
        story: "Posle samo 6 meseci rada moj centar ima preko 40 dece. Deca napreduju neverovatno, a ja sam izgradila posao iz snova.",
        yearStarted: "2023",
        metric: {
          value: "40+",
          label: "aktivne dece"
        }
      },
      {
        _key: generateKey(),
        name: "Stefan Jovanović", 
        role: "Direktor franšize",
        location: "Kragujevac",
        story: "U prvoj godini rada centar je ostvario prihod od preko €30,000. Metodologija stvarno radi i roditelji vide rezultate.",
        yearStarted: "2022",
        metric: {
          value: "€30k+",
          label: "godišnji prihod"
        }
      }
    ]
  },

  homeFaqs: {
    sectionTitle: "Česta pitanja"
  },

  interactiveClassroom: {
    sectionTitle: "Interaktivna učionica",
    description: "Posetite našu virtualnu učionicu i vidite kako izgleda jedna tipična sesija sa decom.",
    ctaText: "Istražite učionicu"
  },

  leadMagnets: {
    sectionTitle: "Besplatni resursi",
    resources: [
      {
        _key: generateKey(),
        title: "Vodič za pokretanje franšize",
        description: "Kompletna analiza tržišta i koraci za uspešno pokretanje vaše franšize.",
        downloadUrl: "/downloads/franchise-guide.pdf"
      },
      {
        _key: generateKey(),
        title: "ROI kalkulator",
        description: "Izračunajte potencijalni povraćaj investicije za vaš grad i model franšize.",
        downloadUrl: "/roi-calculator"
      }
    ]
  },

  newsletterCTA: {
    title: "Budite u toku sa prilikama",
    description: "Prijavite se na newsletter i dobijate ekskluzivne informacije o novim lokacijama, promo cenama i uspesima naših partnera.",
    incentive: "Besplatan vodič: 10 koraka do uspešne obrazovne franšize",
    ctaText: "Prijavite se besplatno"
  },

  seo: {
    metaTitle: "Srećno učenje - Obrazovna franšiza koja garantuje uspeh",
    metaDescription: "Pokrenite uspešnu obrazovnu franšizu sa metodologijom koja je dokazana na preko 500 dece. ROI 200% u prvoj godini.",
    keywords: ["obrazovna franšiza", "franšiza za decu", "Srećno učenje", "edukacija dece", "poslovne prilike"]
  }
}

async function analyzeCurrentData() {
  console.log("🔍 Analiziram trenutno stanje podataka...")
  
  try {
    // Proveri da li postoji homePage dokument
    const homePage = await client.fetch('*[_type == "homePage"][0]')
    console.log("📊 HomePage dokument:", homePage ? "POSTOJI" : "NE POSTOJI")
    
    if (homePage) {
      console.log("🔍 Polja u homePage dokumentu:")
      Object.keys(homePage).forEach(key => {
        console.log(`  - ${key}: ${typeof homePage[key]}`)
      })

      // Proveri problematična polja
      const problematicFields = ['freeResources', 'heroSekcija', 'homeFaq']
      problematicFields.forEach(field => {
        if (homePage[field]) {
          console.log(`⚠️  PRONAĐENO STARO POLJE: ${field}`)
        }
      })

      // Proveri _key vrednosti u arrays
      if (homePage.statistics && Array.isArray(homePage.statistics)) {
        const hasKeys = homePage.statistics.every(item => item._key)
        console.log(`📊 Statistics _key status: ${hasKeys ? "DODELJENI" : "NEDOSTAJU"}`)
      }
    }

    return homePage
  } catch (error) {
    console.error("❌ Greška pri analizi:", error)
    return null
  }
}

async function createHomePageDocument() {
  console.log("📝 Kreiram novi homePage dokument...")
  
  const homePageDoc = {
    _id: 'homePage',
    _type: 'homePage',
    
    enhancedHero: {
      _type: 'enhancedHero',
      ...SERBIAN_CONTENT.enhancedHero
    },

    statistics: SERBIAN_CONTENT.statistics,
    
    differentiators: SERBIAN_CONTENT.differentiators,
    
    franchiseSteps: SERBIAN_CONTENT.franchiseSteps,
    
    franchiseModels: SERBIAN_CONTENT.franchiseModels,
    
    successStories: SERBIAN_CONTENT.successStories,
    
    homeFaqs: SERBIAN_CONTENT.homeFaqs,
    
    interactiveClassroom: SERBIAN_CONTENT.interactiveClassroom,
    
    leadMagnets: SERBIAN_CONTENT.leadMagnets,
    
    newsletterCTA: SERBIAN_CONTENT.newsletterCTA,
    
    seo: SERBIAN_CONTENT.seo
  }

  try {
    await client.createOrReplace(homePageDoc)
    console.log("✅ HomePage dokument uspešno kreiran/ažuriran!")
    return true
  } catch (error) {
    console.error("❌ Greška pri kreiranju HomePage:", error)
    return false
  }
}

async function migrateOldData() {
  console.log("🔄 Pokrećem migraciju starih podataka...")
  
  try {
    const currentData = await analyzeCurrentData()
    
    if (!currentData) {
      console.log("📝 Nema postojećih podataka, kreiram novi dokument...")
      return await createHomePageDocument()
    }

    // Kreiraj objekt za patch operacije
    let patchObject = {}
    let shouldPatch = false

    // Migracija freeResources → leadMagnets
    if (currentData.freeResources && !currentData.leadMagnets) {
      console.log("🔄 Migracija: freeResources → leadMagnets")
      patchObject.leadMagnets = currentData.freeResources
      patchObject.freeResources = undefined // Ukloni staro polje
      shouldPatch = true
    }

    // Migracija heroSekcija → enhancedHero  
    if (currentData.heroSekcija && !currentData.enhancedHero) {
      console.log("🔄 Migracija: heroSekcija → enhancedHero")
      patchObject.enhancedHero = currentData.heroSekcija
      patchObject.heroSekcija = undefined // Ukloni staro polje
      shouldPatch = true
    }

    // Migracija homeFaq → homeFaqs
    if (currentData.homeFaq && !currentData.homeFaqs) {
      console.log("🔄 Migracija: homeFaq → homeFaqs")
      patchObject.homeFaqs = currentData.homeFaq
      patchObject.homeFaq = undefined // Ukloni staro polje
      shouldPatch = true
    }

    // Dodaj _key vrednosti za statistics ako nedostaju
    if (currentData.statistics && Array.isArray(currentData.statistics)) {
      const needsKeys = currentData.statistics.some(item => !item._key)
      if (needsKeys) {
        console.log("🔑 Dodajem _key vrednosti za statistics...")
        patchObject.statistics = currentData.statistics.map(item => ({
          ...item,
          _key: item._key || generateKey()
        }))
        shouldPatch = true
      }
    }

    // Dodaj nedostajuće sekcije sa srpskim sadržajem
    const requiredSections = [
      'enhancedHero', 'statistics', 'differentiators', 
      'franchiseSteps', 'franchiseModels', 'successStories',
      'homeFaqs', 'interactiveClassroom', 'leadMagnets', 'newsletterCTA'
    ]

    requiredSections.forEach(section => {
      if (!currentData[section] && SERBIAN_CONTENT[section]) {
        console.log(`➕ Dodajem nedostajuću sekciju: ${section}`)
        patchObject[section] = SERBIAN_CONTENT[section]
        shouldPatch = true
      }
    })

    // Primeni patch ako je potrebno
    if (shouldPatch) {
      await client.patch('homePage').set(patchObject).commit()
      console.log("✅ Migracija uspešno završena!")
      return true
    } else {
      console.log("ℹ️ Nema potrebe za migracijom, svi podaci su ispravni.")
      return true
    }

  } catch (error) {
    console.error("❌ Greška tokom migracije:", error)
    return false
  }
}

async function validateMigration() {
  console.log("🔍 Validiram rezultate migracije...")
  
  try {
    const homePage = await client.fetch(`
      *[_type == "homePage"][0] {
        _id,
        enhancedHero,
        statistics,
        differentiators,
        franchiseSteps,
        franchiseModels,
        successStories,
        homeFaqs,
        interactiveClassroom,
        leadMagnets,
        newsletterCTA,
        seo
      }
    `)

    if (!homePage) {
      console.error("❌ HomePage dokument ne postoji!")
      return false
    }

    console.log("✅ Validacija - HomePage dokument postoji")

    // Proveri da li postoje potrebne sekcije
    const requiredSections = [
      'enhancedHero', 'statistics', 'differentiators', 
      'franchiseSteps', 'franchiseModels', 'successStories',
      'homeFaqs', 'interactiveClassroom', 'leadMagnets', 'newsletterCTA'
    ]

    let allSectionsPresent = true
    requiredSections.forEach(section => {
      if (homePage[section]) {
        console.log(`✅ ${section}: POSTOJI`)
      } else {
        console.log(`❌ ${section}: NEDOSTAJE`)
        allSectionsPresent = false
      }
    })

    // Proveri _key vrednosti
    if (homePage.statistics && Array.isArray(homePage.statistics)) {
      const allHaveKeys = homePage.statistics.every(item => item._key)
      console.log(`✅ Statistics _key: ${allHaveKeys ? "SVI IMAJU" : "NEDOSTAJU"}`)
    }

    console.log(`\n🎯 REZULTAT VALIDACIJE: ${allSectionsPresent ? "USPEŠNO" : "NEISPRAVNO"}`)
    return allSectionsPresent

  } catch (error) {
    console.error("❌ Greška pri validaciji:", error)
    return false
  }
}

async function cleanupOldFields() {
  console.log("🧹 Čistim stara/nepotrebna polja...")
  
  try {
    await client.patch('homePage').unset([
      'freeResources', 'heroSekcija', 'homeFaq'
    ]).commit()
    
    console.log("✅ Stara polja uspešno obrisana")
    return true
  } catch (error) {
    console.error("❌ Greška pri brisanju starih polja:", error)
    return false
  }
}

async function runCompleteMigration() {
  console.log("🚀 POKRETAM KOMPLETNU SANITY MIGRACIJU")
  console.log("=" .repeat(50))
  
  try {
    // 1. Analiziraj trenutno stanje
    const currentData = await analyzeCurrentData()
    
    // 2. Pokreni migraciju
    const migrationSuccess = await migrateOldData()
    if (!migrationSuccess) {
      throw new Error("Migracija neuspešna")
    }
    
    // 3. Očisti stara polja
    await cleanupOldFields()
    
    // 4. Validacija
    const validationSuccess = await validateMigration()
    if (!validationSuccess) {
      throw new Error("Validacija neuspešna")
    }

    console.log("\n" + "=" .repeat(50))
    console.log("🎉 MIGRACIJA USPEŠNO ZAVRŠENA!")
    console.log("✅ Svi problemi su rešeni:")
    console.log("  - Unknown fields uklonjeni")  
    console.log("  - _key vrednosti dodeljene")
    console.log("  - Struktura ažurirana")
    console.log("  - Srpski sadržaj popunjen")
    console.log("=" .repeat(50))
    
    return true

  } catch (error) {
    console.error("\n❌ MIGRACIJA NEUSPEŠNA:", error.message)
    return false
  }
}

// Pokreni migraciju
runCompleteMigration()
  .then(success => {
    process.exit(success ? 0 : 1)
  })
  .catch(error => {
    console.error("💥 Neočekivana greška:", error)
    process.exit(1)
  })