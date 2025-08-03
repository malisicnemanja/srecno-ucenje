// Script to seed basic Sanity data
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  useCdn: false,
  token: 'skYc1dLdlL4lEIKyyuy39qoANTkDFMlnL8IUaKYcyiJ31DsmSBJWyWLA5vWBKcGRAtDcVsB5DPKn4I8NheeBOG75VBTuWZSDEjFGewZFaypQtvaSIQEVmb1EQEOOtrYhKZvseL1xw9QRJcvQmkUo3HE2ze29bGx5hmL0Yj4mzJduq0WxNrPV'
})

async function seedData() {
  try {
    // Create Home Page
    const homePage = await client.create({
      _type: 'homePage',
      enhancedHero: {
        mainHeading: 'Srećno učenje - Franšiza koja menja živote',
        subHeading: 'Pridružite se mreži koja je već inspirisala 20.000+ dece da uče srcem',
        primaryCTA: {
          text: 'Saznajte više',
          link: '/metodologija'
        },
        secondaryCTA: {
          text: 'Kontaktirajte nas',
          link: '/kontakt'
        },
        trustBadge: {
          text: '20.000+ zadovoljne dece',
          icon: 'heart'
        }
      },
      statistics: [
        {
          number: '20000',
          label: 'Zadovoljne dece',
          description: 'Koji su prošli kroz naš program'
        },
        {
          number: '150',
          label: 'Lokacija',
          description: 'Širom Srbije i regiona'
        },
        {
          number: '95',
          label: '% Uspešnosti',
          description: 'Deca koja poboljšavaju rezultate'
        },
        {
          number: '15',
          label: 'Godina iskustva',
          description: 'U razvoju metodologije'
        }
      ],
      differentiators: [
        {
          title: 'Jedinstvena Metodologija',
          description: 'Naš pristup kombinuje najbolje iz svetskih metodologija sa lokalnim potrebama.',
          icon: 'brain'
        },
        {
          title: 'Dokazani Rezultati',
          description: 'Preko 95% dece pokazuje značajno poboljšanje u učenju.',
          icon: 'trophy'
        },
        {
          title: 'Kontinuirana Podrška',
          description: 'Pružamo stalnu podršku i obuku našim partnerima.',
          icon: 'heart'
        }
      ]
    })

    console.log('Home page created:', homePage._id)

    // Create Site Settings
    const siteSettings = await client.create({
      _type: 'siteSettings',
      siteName: 'Srećno učenje',
      description: 'Franšiza obrazovne metodologije',
      contactEmail: 'info@srecno-ucenje.rs',
      phone: '+381 11 123 4567',
      address: 'Beograd, Srbija'
    })

    console.log('Site settings created:', siteSettings._id)

    // Create some FAQs
    const faq1 = await client.create({
      _type: 'faq',
      question: 'Šta je Srećno učenje metodologija?',
      answer: 'Srećno učenje je inovativna metodologija koja kombinuje brzo čitanje, mentalnu aritmetiku i emocionalno učenje kako bi deca naučila da uče srcem.',
      category: 'metodologija'
    })

    const faq2 = await client.create({
      _type: 'faq',
      question: 'Koliko košta franšiza?',
      answer: 'Imamo nekoliko modela franšize sa različitim investicionim nivoima. Kontaktirajte nas za detaljne informacije.',
      category: 'fransiza'
    })

    console.log('FAQs created')

    // Create methodology
    const methodology = await client.create({
      _type: 'methodology',
      title: 'Naša Metodologija',
      introduction: {
        title: 'Revolucionarni pristup učenju',
        description: 'Srećno učenje kombinuje najbolje tehnike iz svetskih metodologija.',
        features: [
          {
            title: 'Brzo čitanje',
            description: 'Poboljšanje brzine i razumevanja teksta',
            iconType: 'brain'
          },
          {
            title: 'Emocionalno učenje',
            description: 'Učenje kroz pozitivne emocije',
            iconType: 'heart'
          },
          {
            title: 'Mentalna aritmetika',
            description: 'Razvoj matematičkih sposobnosti',
            iconType: 'rocket'
          }
        ]
      },
      methods: [
        {
          name: 'Brzo čitanje',
          description: 'Tehnike za povećanje brzine čitanja uz održavanje razumevanja.',
          benefits: [
            'Povećana brzina čitanja',
            'Bolje razumevanje teksta',
            'Povećana koncentracija'
          ]
        },
        {
          name: 'Mentalna aritmetika',
          description: 'Računanje bez kalkulatora uz pomoć mentalnih tehnika.',
          benefits: [
            'Brže računanje',
            'Povećana koncentracija',
            'Bolje logičko razmišljanje'
          ]
        }
      ],
      timeline: {
        title: 'Naš put kroz godine',
        steps: [
          {
            year: '2010',
            title: 'Početak istraživanja',
            description: 'Započeli smo istraživanje svetskih metodologija učenja.'
          },
          {
            year: '2015',
            title: 'Prva škola',
            description: 'Otvorili smo prvu školu Srećno učenje u Beogradu.'
          },
          {
            year: '2020',
            title: 'Širenje mreže',
            description: 'Proširili smo se na 50+ lokacija širom Srbije.'
          },
          {
            year: '2024',
            title: 'Današnji dan',
            description: 'Danas imamo 150+ lokacija i 20.000+ zadovoljne dece.'
          }
        ]
      }
    })

    console.log('Methodology created:', methodology._id)

    console.log('✅ All seed data created successfully!')
    
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

seedData()