const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'your_token_here', // Replace with actual token
  apiVersion: '2023-01-01'
})

async function populateHomePage() {
  console.log('🚀 EMERGENCY: Creating homePage document...')
  
  try {
    // Check if homePage already exists
    const existingHomePage = await client.fetch('*[_type == "homePage"][0]')
    
    if (existingHomePage) {
      console.log('✅ HomePage document already exists:', existingHomePage._id)
      return existingHomePage._id
    }

    // Create homePage document with fixed _id
    const homePageDocument = {
      _type: 'homePage',
      _id: 'homePage', // Fixed ID that query expects
      enhancedHero: {
        title: 'Pokrenite svoju obrazovnu franšizu',
        subtitle: 'Srećno učenje - Dokazana metodologija koja transformiše način kako deca uče',
        description: 'Pridružite se mreži uspešnih centara koji pomažu deci da otkrivaju radost učenja kroz inovativne programe prilagođene svakom detetu.',
        buttons: [
          {
            _key: 'primary-cta',
            text: 'Saznajte više o franšizi',
            link: '/franshiza',
            variant: 'primary'
          },
          {
            _key: 'secondary-cta',  
            text: 'Rezervišite konsultaciju',
            link: '/rezervacija',
            variant: 'secondary'
          }
        ]
      },
      statistics: [
        {
          _key: 'stat-1',
          value: '200+',
          label: 'Zadovoljnih roditelja',
          icon: '👥',
          color: 'sky'
        },
        {
          _key: 'stat-2', 
          value: '15+',
          label: 'Godina iskustva',
          icon: '⭐',
          color: 'sun'
        },
        {
          _key: 'stat-3',
          value: '95%',
          label: 'Stopa uspešnosti',
          icon: '📈',
          color: 'grass'
        },
        {
          _key: 'stat-4',
          value: '3+',
          label: 'Aktivna centra',
          icon: '🏢',
          color: 'heart'
        }
      ],
      differentiators: {
        sectionTitle: 'Zašto baš Srećno učenje?',
        items: [
          {
            _key: 'diff-1',
            title: 'Dokazana metodologija',
            description: 'Preko 15 godina razvoja i usavršavanja pristupa koji stvarno radi',
            icon: '🎯'
          },
          {
            _key: 'diff-2',
            title: 'Kontinuirana podrška',
            description: 'Potpuna podrška od otvaranja do rasta vašeg centra',
            icon: '🤝'
          },
          {
            _key: 'diff-3',
            title: 'Brz povrat investicije',
            description: 'Optimizovan model za brz rast i profitabilnost',
            icon: '💰'
          },
          {
            _key: 'diff-4',
            title: 'Zadovoljna deca i roditelji',
            description: 'Visok nivo zadovoljstva garantuje lojalnost klijenata',
            icon: '❤️'
          }
        ]
      },
      franchiseSteps: {
        sectionTitle: '4 koraka do vaše franšize',
        steps: [
          {
            _key: 'step-1',
            number: '1',
            title: 'Konsultacija',
            description: 'Besplatna konsultacija o mogućnostima franšize',
            icon: '💬'
          },
          {
            _key: 'step-2', 
            number: '2',
            title: 'Planiranje',
            description: 'Izrada detaljnog poslovnog plana za vaš centar',
            icon: '📋'
          },
          {
            _key: 'step-3',
            number: '3', 
            title: 'Obuka',
            description: 'Kompletna obuka za vas i vaš tim',
            icon: '🎓'
          },
          {
            _key: 'step-4',
            number: '4',
            title: 'Otvaranje',
            description: 'Podrška pri otvaranju i lansiranju centra',
            icon: '🚀'
          }
        ]
      },
      successStories: {
        sectionTitle: 'Priče uspeha',
        stories: [
          {
            _key: 'story-1',
            name: 'Ana Marić',
            role: 'Vlasnica centra',
            location: 'Novi Sad',
            story: 'Za 6 meseci smo duplirali broj polaznika. Deca vole da dolaze, a roditelji su oduševljeni napretkom.',
            yearStarted: '2022',
            metric: {
              value: '60+',
              label: 'polaznika mesečno'
            }
          },
          {
            _key: 'story-2',
            name: 'Marko Jovanović',
            role: 'Franšizer',
            location: 'Kragujevac',
            story: 'Investicija se vratila za 8 meseci. Sada planiram drugi centar.',
            yearStarted: '2021',
            metric: {
              value: '150%',
              label: 'rast prihoda'
            }
          },
          {
            _key: 'story-3',
            name: 'Milica Stojanović',
            role: 'Edukatorka',
            location: 'Niš',
            story: 'Svako dete napreduje u svom tempu. Radost kad vidim kako se oslobađaju blokada je neprocenjiva.',
            yearStarted: '2023',
            metric: {
              value: '98%',
              label: 'zadovoljnih roditelja'
            }
          }
        ]
      },
      homeFaqs: {
        sectionTitle: 'Česta pitanja'
      },
      interactiveClassroom: {
        sectionTitle: 'Interaktivna učionica',
        description: 'Posetite našu virtualnu učionicu i vidite kako izgleda Srećno učenje u praksi',
        ctaText: 'Istražite učionicu'
      },
      leadMagnets: {
        sectionTitle: 'Besplatni resursi',
        resources: [
          {
            _key: 'resource-1',
            title: 'Vodič za franšizu',
            description: 'Kompletne informacije o otvaranju centra',
            downloadUrl: '/downloads/vodic-fransiza.pdf'
          }
        ]
      },
      newsletterCTA: {
        title: 'Budite u toku sa prilikama',
        description: 'Prijavite se na naš newsletter i saznajte prve o novim mogućnostima franšize',
        incentive: 'Besplatan vodič: 10 koraka do uspešne obrazovne franšize',
        ctaText: 'Prijavite se'
      },
      seo: {
        metaTitle: 'Srećno učenje - Pokrenite obrazovnu franšizu',
        metaDescription: 'Pridružite se mreži uspešnih centara Srećno učenje. Dokazana metodologija, kontinuirana podrška i brz povrat investicije.',
        keywords: 'franšiza, obrazovanje, deca, učenje, Srećno učenje, metodologija'
      }
    }

    const result = await client.create(homePageDocument)
    console.log('✅ SUCCESS: HomePage document created with ID:', result._id)
    
    return result._id
  } catch (error) {
    console.error('❌ ERROR creating homepage:', error)
    throw error
  }
}

// Execute immediately
populateHomePage()
  .then((id) => {
    console.log(`🎉 DONE! HomePage ready with ID: ${id}`)
    console.log('🌐 Site should now load properly!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 FAILED:', error)
    process.exit(1)
  })