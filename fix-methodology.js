// Script to update methodology with complete structure
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skYc1dLdlL4lEIKyyuy39qoANTkDFMlnL8IUaKYcyiJ31DsmSBJWyWLA5vWBKcGRAtDcVsB5DPKn4I8NheeBOG75VBTuWZSDEjFGewZFaypQtvaSIQEVmb1EQEOOtrYhKZvseL1xw9QRJcvQmkUo3HE2ze29bGx5hmL0Yj4mzJduq0WxNrPV'
})

async function fixMethodology() {
  try {
    // First, delete existing methodology
    const existing = await client.fetch(`*[_type == "methodology"]`)
    if (existing.length > 0) {
      for (const doc of existing) {
        await client.delete(doc._id)
        console.log(`Deleted existing methodology: ${doc._id}`)
      }
    }

    // Create complete methodology
    const methodology = await client.create({
      _type: 'methodology',
      title: 'Naša Metodologija',
      hero: {
        title: 'Revolucionarni pristup učenju',
        subtitle: 'Otkrijte kako Srećno učenje transformiše način na koji deca pristupaju znanju',
        description: 'Naša jedinstvena metodologija kombinuje najbolje iz svetskih pristupa sa lokalnim potrebama dece.'
      },
      introduction: {
        title: 'Zašto je naša metodologija drugačija?',
        description: 'Srećno učenje nije samo još jedna obrazovna metodologija. To je revolucionarni pristup koji postavlja dete u centar procesa učenja.',
        features: [
          {
            title: 'Emocionalno učenje',
            description: 'Učimo decu da vole proces učenja kroz pozitivne emocije',
            iconType: 'heart'
          },
          {
            title: 'Brzo čitanje',
            description: 'Povećavamo brzinu čitanja uz održavanje potpunog razumevanja',
            iconType: 'brain'
          },
          {
            title: 'Kreativnost',
            description: 'Razvijamo kreativno mišljenje kroz inovativne tehnike',
            iconType: 'rocket'
          }
        ]
      },
      methods: [
        {
          name: 'Brzo čitanje',
          description: 'Tehnike koje omogućavaju deci da čitaju brže uz bolje razumevanje teksta.',
          benefits: [
            'Povećana brzina čitanja do 5 puta',
            'Bolje razumevanje pročitanog sadržaja',
            'Povećana koncentracija i fokus',
            'Razvoj vizuelne memorije'
          ],
          techniques: [
            'Vizuelno čitanje',
            'Eliminacija unutrašnjeg glasa',
            'Proširivanje vidnog polja',
            'Tehnike koncentracije'
          ]
        },
        {
          name: 'Mentalna aritmetika',
          description: 'Računanje bez kalkulatora koristeći mentalne tehnike i vizualizaciju.',
          benefits: [
            'Brže računanje od kalkulatora',
            'Razvoj logičkog mišljenja',
            'Povećanje koncentracije',
            'Jačanje radne memorije'
          ],
          techniques: [
            'Abakus tehnika',
            'Vizualizacija brojeva',
            'Mentalne skraćenice',
            'Brzinske formule'
          ]
        },
        {
          name: 'Emocionalno učenje',
          description: 'Povezivanje emocija sa procesom učenja za bolje pamćenje.',
          benefits: [
            'Dugotrajno pamćenje gradiva',
            'Pozitivan odnos prema učenju',
            'Smanjenje stresa od učenja',
            'Povećanje motivacije'
          ],
          techniques: [
            'Emotivne asocijacije',
            'Pozitivno potkrepljenje',
            'Igrovne tehnike',
            'Personalizacija sadržaja'
          ]
        }
      ],
      scientificBackground: {
        title: 'Naučna osnova naše metodologije',
        description: 'Naša metodologija se zasniva na najnovijim istraživanjima u oblasti neuroplastičnosti i kognitivne psihologije.',
        researches: [
          {
            title: 'Neuroplastičnost mozga',
            description: 'Mozak se može reorganizovati tokom celog života, posebno u detinjstvu.'
          },
          {
            title: 'Multimodalno učenje',
            description: 'Kombinovanje različitih čula poboljšava efikasnost učenja.'
          },
          {
            title: 'Pozitivna psihologija',
            description: 'Pozitivne emocije omogućavaju bolju retenciju informacija.'
          }
        ]
      },
      timeline: {
        title: 'Evolucija naše metodologije',
        description: 'Pratite naš put kroz godine istraživanja i razvoja',
        steps: [
          {
            year: '2010',
            title: 'Početak istraživanja',
            description: 'Započeli smo duboko istraživanje svetskih metodologija učenja i njihove primene u našem kulturnom kontekstu.',
            achievements: [
              'Analiza 50+ svetskih metodologija',
              'Prva pilot grupa od 20 dece'
            ]
          },
          {
            year: '2012',
            title: 'Prvi rezultati',
            description: 'Naša prva deca pokazala su neverovatne rezultate - povećanje brzine čitanja za 300%.',
            achievements: [
              'Prva grupa završila program',
              'Razvoj osnovnog kurikuluma'
            ]
          },
          {
            year: '2015',
            title: 'Prva škola',
            description: 'Otvorili smo prvi centar Srećno učenje u Beogradu sa 5 instruktora.',
            achievements: [
              'Obuka 100+ dece',
              'Sertifikacija instruktora'
            ]
          },
          {
            year: '2018',
            title: 'Digitalizacija',
            description: 'Razvili smo digitalnu platformu koja podržava naše metode učenja.',
            achievements: [
              'Lansiranje online platforme',
              '10 novih lokacija'
            ]
          },
          {
            year: '2020',
            title: 'Širenje mreže',
            description: 'Tokom pandemije, proširili smo se na 50+ lokacija kroz franšizu model.',
            achievements: [
              '50+ franšiza partnera',
              '5000+ zadovoljne dece'
            ]
          },
          {
            year: '2024',
            title: 'Današnji dan',
            description: 'Danas imamo 150+ lokacija i više od 20.000 dece je prošlo kroz naš program.',
            achievements: [
              '150+ lokacija',
              '20.000+ zadovoljne dece',
              'Međunarodno priznanje'
            ]
          }
        ]
      },
      comparison: {
        title: 'Poređenje sa tradicionalnim pristupima',
        description: 'Vidite zašto je naša metodologija superiorna',
        items: [
          {
            aspect: 'Brzina učenja',
            traditional: 'Sporo, linealno učenje',
            ourMethod: '5x brže uz bolje razumevanje'
          },
          {
            aspect: 'Motivacija dece',
            traditional: 'Prinuda i strah od greške',
            ourMethod: 'Pozitivne emocije i ljubav prema učenju'
          },
          {
            aspect: 'Rezultati',
            traditional: 'Kratkoročno pamćenje',
            ourMethod: 'Dugoročno zadržavanje znanja'
          }
        ]
      }
    })

    console.log('✅ Complete methodology created:', methodology._id)
    
  } catch (error) {
    console.error('Error fixing methodology:', error)
  }
}

fixMethodology()