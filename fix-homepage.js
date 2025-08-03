// Script to update homepage with complete structure
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skYc1dLdlL4lEIKyyuy39qoANTkDFMlnL8IUaKYcyiJ31DsmSBJWyWLA5vWBKcGRAtDcVsB5DPKn4I8NheeBOG75VBTuWZSDEjFGewZFaypQtvaSIQEVmb1EQEOOtrYhKZvseL1xw9QRJcvQmkUo3HE2ze29bGx5hmL0Yj4mzJduq0WxNrPV'
})

async function fixHomepage() {
  try {
    // Delete existing homepage
    const existing = await client.fetch(`*[_type == "homePage"]`)
    if (existing.length > 0) {
      for (const doc of existing) {
        await client.delete(doc._id)
        console.log(`Deleted existing homepage: ${doc._id}`)
      }
    }

    // Create complete homepage
    const homePage = await client.create({
      _type: 'homePage',
      enhancedHero: {
        mainHeading: 'Srećno učenje - Franšiza koja menja živote',
        subHeading: 'Pridružite se mreži koja je već inspirisala 20.000+ dece da uče srcem',
        description: 'Naša jedinstvena metodologija kombinuje brzo čitanje, mentalnu aritmetiku i emocionalno učenje za revolutivne rezultate.',
        primaryCTA: {
          text: 'Saznajte više o metodologiji',
          link: '/metodologija'
        },
        secondaryCTA: {
          text: 'Kontaktirajte nas',
          link: '/kontakt'
        },
        trustBadge: {
          text: '20.000+ zadovoljne dece',
          icon: 'heart'
        },
        backgroundType: 'gradient',
        showVideoPreview: false
      },
      statistics: [
        {
          number: '20000',
          label: 'Zadovoljne dece',
          description: 'Koji su uspešno završili naš program',
          icon: 'users'
        },
        {
          number: '150',
          label: 'Aktivnih lokacija',
          description: 'Širom Srbije i regiona',
          icon: 'location'
        },
        {
          number: '95',
          label: '% Uspešnosti',
          description: 'Deca koja poboljšavaju rezultate',
          icon: 'chart'
        },
        {
          number: '15',
          label: 'Godina iskustva',
          description: 'U razvoju metodologije',
          icon: 'calendar'
        }
      ],
      differentiators: [
        {
          title: 'Jedinstvena Metodologija',
          description: 'Kombinujemo brzo čitanje, mentalnu aritmetiku i emocionalno učenje u jedinstven pristup koji je prilagođen našoj deci.',
          icon: 'brain',
          features: [
            'Naučno dokazane tehnike',
            'Prilagođeno lokalnim potrebama',
            'Individualizovan pristup'
          ]
        },
        {
          title: 'Dokazani Rezultati',
          description: 'Preko 95% naše dece pokazuje značajno poboljšanje u brzini čitanja, računanja i opštem akademskom uspehu.',
          icon: 'trophy',
          features: [
            '5x brže čitanje',
            'Bolje ocene u školi',
            'Povećana koncentracija'
          ]
        },
        {
          title: 'Kompletna Podrška',
          description: 'Pružamo kontinuiranu obuku, materijale i podršku svim našim franšiza partnerima za garantovani uspeh.',
          icon: 'heart',
          features: [
            'Početna obuka',
            'Kontinuirano mentorstvo',
            'Marketing podrška'
          ]
        }
      ],
      franchiseSteps: [
        {
          step: 1,
          title: 'Kontakt i konsultacije',
          description: 'Zakažite besplatan razgovor sa našim timom',
          icon: 'phone'
        },
        {
          step: 2,
          title: 'Odaberite model franšize',
          description: 'Izaberite paket koji odgovara vašim potrebama',
          icon: 'package'
        },
        {
          step: 3,
          title: 'Obuka i sertifikacija',
          description: 'Prođite kroz našu komprehensivnu obuku',
          icon: 'graduation'
        },
        {
          step: 4,
          title: 'Pokretanje centra',
          description: 'Otvorite svoj Srećno učenje centar',
          icon: 'rocket'
        }
      ],
      successStories: [
        {
          studentName: 'Marko Petrović',
          age: 10,
          achievement: 'Povećao brzinu čitanja sa 120 na 600 reči po minutu',
          quote: 'Sada volim da čitam! Mogu da pročitam celu knjigu za jedan dan.',
          beforeAfter: {
            before: '120 reči/min',
            after: '600 reči/min'
          }
        },
        {
          studentName: 'Ana Marković',
          age: 8,
          achievement: 'Postala najbrža u računanju u svom razredu',
          quote: 'Matematika je sada moja omiljena oblast. Računam brže od kalkulatora!',
          beforeAfter: {
            before: 'Mrzela matematiku',
            after: 'Odličan uspeh'
          }
        },
        {
          studentName: 'Stefan Nikolić',
          age: 12,
          achievement: 'Poboljšao ocene iz 3.5 na 5.0 prosek',
          quote: 'Učenje je postalo zabavno. Sada razumem sve mnogo lakše.',
          beforeAfter: {
            before: 'Prosek 3.5',
            after: 'Prosek 5.0'
          }
        }
      ],
      homeFaqs: {
        sectionTitle: 'Često postavljana pitanja',
        description: 'Evo odgovora na najčešća pitanja o našoj metodologiji i franšizi.'
      }
    })

    console.log('✅ Complete homepage created:', homePage._id)
    
  } catch (error) {
    console.error('Error fixing homepage:', error)
  }
}

fixHomepage()