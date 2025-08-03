// Skripta za import metodologije u Sanity
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skYc1dLdlL4lEIKyyuy39qoANTkDFMlnL8IUaKYcyiJ31DsmSBJWyWLA5vWBKcGRAtDcVsB5DPKn4I8NheeBOG75VBTuWZSDEjFGewZFaypQtvaSIQEVmb1EQEOOtrYhKZvseL1xw9QRJcvQmkUo3HE2ze29bGx5hmL0Yj4mzJduq0WxNrPV',
  useCdn: false
})

async function importMethodology() {
  console.log('📝 Kreiram Metodologiju dokument...')

  try {
    const methodology = await client.create({
      _type: 'methodology',
      title: 'Srećno Učenje - Metodologija',
      hero: {
        title: 'Šta znači učiti srećno?',
        subtitle: 'Metodologija koja povezuje školu sa životom kroz bajke, radionice i vrline',
      },
      introduction: {
        title: 'Srećno učenje – Po receptu Čarobnog sela',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Srećno učenje je originalna metodologija koja povezuje književni tekst, vrline i integraciju nastavnih sadržaja u celovit, smislen i radostan proces učenja. Ova metodologija transformiše način na koji deca pristupaju znanju, čineći učenje prirodnim, radosnim i duboko smislenim procesom.'
              }
            ]
          }
        ]
      },
      methods: [
        {
          title: '8 Koraka Srećnog Učenja',
          description: 'Struktuiran pristup koji vodi dete kroz celovit proces učenja',
          benefits: [
            'Književni tekst postaje pokretač učenja',
            'Vrline se ne predaju, već proživljavaju',
            'Nastavni predmeti se sjedinjuju u smislenu celinu',
            'Ambijent postaje aktivan resurs',
            'Dete postaje istraživač i koautor svog učenja'
          ],
          steps: [
            {
              number: 1,
              title: 'Priprema',
              description: 'Čitanje bajke, kreiranje ambijenta i prikupljanje resursa'
            },
            {
              number: 2,
              title: 'Luka reči',
              description: 'Rad sa ključnim pojmovima i jezičko povezivanje'
            },
            {
              number: 3,
              title: 'Čitalaksija',
              description: 'Analiza teksta kroz pitanja različite dubine'
            },
            {
              number: 4,
              title: 'Azbuka vrlina',
              description: 'Razvoj vrednosnog i moralnog rasuđivanja'
            },
            {
              number: 5,
              title: 'Izazov',
              description: 'Centralni problem ili zadatak koji pokreće proces'
            },
            {
              number: 6,
              title: 'Kreativna realizacija',
              description: 'Istraživačke, umetničke i praktične aktivnosti'
            },
            {
              number: 7,
              title: 'Čarobnopedija',
              description: 'Digitalna zbirka resursa i učeničkih produkata'
            },
            {
              number: 8,
              title: 'Evaluacija',
              description: 'Refleksija, vrednovanje i analiza postignuća'
            }
          ]
        },
        {
          title: '4 Godišnja Doba - 4 Vila',
          description: 'Holistički pristup učenju kroz cikluse prirode',
          benefits: [
            'Proleće - Vila Đurđica: Ekologija i život u prirodi',
            'Leto - Vila Sunčica: Nauka, umetnost i kreativno mišljenje',
            'Jesen - Vila Bosiljčica: Zdrava hrana, porodica i briga o telu',
            'Zima - Vila Božica: Tradicija, zavičaj i kulturno nasleđe'
          ]
        }
      ],
      scientificBackground: {
        title: 'Naučna Osnova',
        research: [
          {
            title: 'Integrisano učenje i kognitivni razvoj',
            year: 2023,
            source: 'Pedagoški fakultet, Univerzitet u Beogradu',
            finding: 'Deca koja uče kroz integrisane metode pokazuju 40% bolje razumevanje gradiva'
          },
          {
            title: 'Vrline i emocionalna inteligencija',
            year: 2022,
            source: 'Institut za psihologiju',
            finding: 'Učenje kroz vrline razvija emocionalnu inteligenciju i socijalnu kompetentnost'
          },
          {
            title: 'Bajke kao pedagoški alat',
            year: 2021,
            source: 'Centar za obrazovne inovacije',
            finding: 'Korišćenje bajki povećava retenciju znanja za 60%'
          }
        ]
      },
      timeline: [
        {
          year: 2010,
          title: 'Početak razvoja',
          description: 'Prva radionica Srećnog učenja',
          milestone: false
        },
        {
          year: 2015,
          title: 'Prva knjiga',
          description: 'Objavljena metodologija',
          milestone: true
        },
        {
          year: 2018,
          title: '1000 učitelja',
          description: 'Obučeno preko 1000 učitelja',
          milestone: true
        },
        {
          year: 2020,
          title: 'Online platforma',
          description: 'Lansirana digitalna platforma',
          milestone: false
        },
        {
          year: 2024,
          title: '20.000 dece',
          description: 'Metodologija primenjena na preko 20.000 dece',
          milestone: true
        }
      ],
      comparison: {
        title: 'Zašto je Srećno učenje jedinstveno?',
        items: [
          {
            aspect: 'Pristup učenju',
            traditional: 'Fragmentovano po predmetima, bez međusobne povezanosti',
            ourMethod: 'Integrisano i povezano sa životom, sve je međusobno isprepletano'
          },
          {
            aspect: 'Uloga deteta',
            traditional: 'Pasivni primalac informacija koje treba zapamtiti',
            ourMethod: 'Aktivan istraživač i stvaralac sopstvenog znanja'
          },
          {
            aspect: 'Vrline i karakter',
            traditional: 'Sporadično i teoretski, kroz pouke',
            ourMethod: 'Svakodnevno kroz praktične situacije i proživljavanje'
          },
          {
            aspect: 'Motivacija',
            traditional: 'Spoljna - ocene, nagrade, kazne',
            ourMethod: 'Unutrašnja - radoznalost, radost otkrivanja'
          }
        ]
      }
    })

    console.log('✅ Metodologija kreirana uspešno!')
    console.log('\nSada možeš videti metodologiju u Sanity Studio-u.')

  } catch (error) {
    console.error('❌ Greška:', error)
  }
}

// Pokreni import
importMethodology()