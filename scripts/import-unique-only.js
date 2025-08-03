// Skripta koja importuje samo jedinstvene dokumente (ne briše postojeće)
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skYc1dLdlL4lEIKyyuy39qoANTkDFMlnL8IUaKYcyiJ31DsmSBJWyWLA5vWBKcGRAtDcVsB5DPKn4I8NheeBOG75VBTuWZSDEjFGewZFaypQtvaSIQEVmb1EQEOOtrYhKZvseL1xw9QRJcvQmkUo3HE2ze29bGx5hmL0Yj4mzJduq0WxNrPV',
  useCdn: false
})

async function importUniqueOnly() {
  console.log('📝 Import samo jedinstvenih dokumenata...\n')

  try {
    // 1. Home Page
    console.log('📝 Proveram Home Page...')
    const existingHomePage = await client.fetch(`*[_type == "homePage"][0]`)
    if (!existingHomePage) {
      await client.create({
        _type: 'homePage',
        enhancedHero: {
          title: 'Otvori vrata svojoj učionici iz snova',
          subtitle: '20.000+ dece već uči našom metodom. Pridružite se mreži koja pravi razliku.',
          animatedNumber: {
            target: 20000,
            suffix: '+ dece',
            duration: 2000
          },
          primaryCta: {
            text: 'Započni besplatnu procenu',
            link: '/kontakt'
          },
          secondaryCta: {
            text: 'Zakaži razgovor',
            link: '/kontakt'
          },
          trustBadges: [
            { icon: 'users', value: '50+', label: 'Franšiza' },
            { icon: 'clock', value: '15', label: 'Godina iskustva' },
            { icon: 'award', value: '95%', label: 'Zadovoljstva' },
            { icon: 'trophy', value: '100+', label: 'Nagrada' }
          ]
        },
        statistics: [
          { value: '20.000+', label: 'Zadovoljne dece' },
          { value: '50+', label: 'Partnera u mreži' },
          { value: '15', label: 'Godina iskustva' },
          { value: '95%', label: 'Stopa zadovoljstva' }
        ],
        differentiators: {
          sectionTitle: 'Zašto baš Srećno učenje?',
          items: [
            {
              icon: 'quality',
              title: 'Dokazana metodologija',
              description: 'Naš program je razvijan 15 godina i testiran na više od 20.000 dece sa izvrsnim rezultatima.',
              highlight: '#1 u regionu'
            },
            {
              icon: 'support',
              title: 'Potpuna podrška',
              description: 'Od obuke do marketinga, pružamo svu podršku potrebnu za uspešno vođenje franšize.'
            },
            {
              icon: 'community',
              title: 'Jaka zajednica',
              description: 'Postanite deo mreže od 50+ uspešnih franšiza koji dele znanje i iskustva.'
            }
          ]
        },
        franchiseSteps: {
          sectionTitle: '4 koraka do vaše franšize',
          steps: [
            {
              stepNumber: 1,
              title: 'Inicijalni razgovor',
              description: 'Upoznajte naš tim i saznajte sve o franšizi',
              duration: '1-2 dana',
              icon: 'phone'
            },
            {
              stepNumber: 2,
              title: 'Analiza lokacije',
              description: 'Pomažemo vam da pronađete idealan prostor',
              duration: '7 dana',
              icon: 'location'
            },
            {
              stepNumber: 3,
              title: 'Obuka i priprema',
              description: 'Kompletna obuka za vas i vaš tim',
              duration: '14 dana',
              icon: 'training'
            },
            {
              stepNumber: 4,
              title: 'Otvaranje centra',
              description: 'Svečano otvaranje uz našu podršku',
              duration: '1 dan',
              icon: 'launch'
            }
          ]
        },
        franchiseModels: {
          sectionTitle: 'Naši modeli',
          models: [
            {
              name: 'Mini',
              price: '€5,000',
              features: [
                'Osnovna licenca',
                'Obuka 3 dana',
                'Početni materijali',
                'Online podrška'
              ]
            },
            {
              name: 'Standard',
              price: '€10,000',
              features: [
                'Puna licenca',
                'Obuka 7 dana',
                'Svi materijali',
                '24/7 podrška',
                'Marketing paket'
              ],
              highlighted: true,
              badge: 'Najpopularniji'
            },
            {
              name: 'Premium',
              price: '€20,000',
              features: [
                'Ekskluzivna licenca',
                'Obuka 14 dana',
                'Premium materijali',
                'Lični mentor',
                'Komplet marketing',
                'Garancija uspeha'
              ]
            }
          ]
        },
        successStories: {
          sectionTitle: 'Priče uspeha'
        },
        homeFaqs: {
          sectionTitle: 'Česta pitanja',
          faqs: []
        },
        interactiveClassroom: {
          sectionTitle: 'Interaktivna učionica',
          description: 'Istražite kako izgleda moderna učionica Srećnog učenja. Virtuelna tura kroz prostor, opremu i materijale.',
          ctaText: 'Istražite učionicu'
        },
        leadMagnets: {
          sectionTitle: 'Besplatni resursi',
          resources: [
            {
              title: 'Info paket za franšize',
              description: 'Sve što trebate znati o pokretanju franšize',
              icon: 'pdf',
              ctaText: 'Preuzmite besplatno'
            },
            {
              title: 'ROI kalkulator',
              description: 'Izračunajte povratak investicije',
              icon: 'calculator',
              ctaText: 'Pokrenite kalkulator'
            },
            {
              title: 'Checklist za početak',
              description: 'Korak po korak vodič',
              icon: 'checklist',
              ctaText: 'Preuzmite checklist'
            }
          ]
        },
        newsletter: {
          title: 'Prijavite se na naš newsletter',
          description: 'Budite u toku sa najnovijim vestima i prilikama',
          incentive: 'Dobijte 10% popusta na prvu godinu',
          ctaText: 'Prijavite se'
        }
      })
      console.log('✅ Home Page kreiran')
    } else {
      console.log('ℹ️  Home Page već postoji')
    }

    console.log('\n✅ Import završen!')
    console.log('\nAko imaš duplikate u Studio-u, možeš ih ručno obrisati kroz interface.')
    console.log('Tvoj API token nema dozvole za brisanje dokumenata iz bezbednosnih razloga.')

  } catch (error) {
    console.error('❌ Greška:', error)
  }
}

// Pokreni import
importUniqueOnly()