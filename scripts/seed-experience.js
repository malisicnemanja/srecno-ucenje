const { client } = require('../sanity/client.js')

// Iskustvo podaci prema zadatku
const EXPERIENCE_DATA = {
  _type: 'experience',
  title: 'Indija - zemlja kontrasta',
  slug: { _type: 'slug', current: 'indija-zemlja-kontrasta' },
  destination: 'Indija',
  excerpt: 'Putovanje koje menja perspektivu kroz zemlju začina, boja i kontrasta koji oduzimaju dah.',
  
  content: [
    {
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Indija vas dočekuje mirisom začina, šarenilom boja i kontrastima koji oduzimaju dah. Od luksuznih privatnih škola u Nju Delhiju do siromašnih četvrti, od veličanstvenog Tadž Mahala do haotičnih ulica Džajpura - svaki korak je lekcija o životu.'
        }
      ]
    }
  ],
  
  chapters: [
    {
      title: 'Prvi utisci',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Izlazak sa aerodroma u Nju Delhiju je kao ulazak u drugi svet. Miris začina meša se sa dimom, zvuci saobraćaja sa pozivima na molitvu. Prvi susret sa Indijom je uvek šok za čula - toliko je intenzivna da vas potpuno obuzme već u prvim minutima.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Haos ulica, gužve ljudi, krave koje mirno šetaju između automobila - sve to deluje nestvarno onome ko dolazi iz ureñene Evrope. Ali upravo u tom haosu krije se čitava filozofija života koja uči toleranciji i prilagođavanju.'
            }
          ]
        }
      ]
    },
    {
      title: 'Obrazovni sistem: Drugačiji svet',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Privatne škole u Indiji imaju poseban pristup - veliki akcenat na moral, disciplinu i poštovanje tradicije. Nastavnici rade sa grupama od 40-50 učenika, ali atmosfera je mirna i fokusirana. Svaki dan počinje molitvom i meditacijom.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Ono što me je najviše fasciniralo jeste koliko deca poštuju svoje učitelje. Guru-učenik odnos nije samo akademski, već duhovni. Učitelji nisu samo prenosioci znanja, već mentori za život. Ovaj pristup obrazovanju ima duboke korene u indijskoj tradiciji.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Disciplina se ne nameće silom, već se razvija kroz razumevanje i unutrašnju motivaciju. Deca uče da poštovanje prema znanju i učitelju nije strah, već blagodarnost za priliku da uče.'
            }
          ]
        }
      ]
    },
    {
      title: 'Lekcije koje nosim',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Indija uči toleranciji i pokazuje da sreća ne zavisi od materijalnog bogatstva. Osmesi dece u siromašnim četvrtima podsetiće vas na prave vrednosti života. Njihova radost u jednostavnim trenucima, igri sa improvizovanim igračkama, deli istinsku lekciju o tome šta znači biti srećan.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Svaki susret sa lokalnim stanovništvom bio je prilika za učenje. Od prodavaca na ulici koji su mi objasnili filozofiju za radom, do majki koje su me naučile kako da napravim tradicijelne kolače - svaka interakcija je bila kulturna razmena.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Indija me je naučila da je različitost bogatstvo, ne prepreka. U zemlji gde se govori preko 700 jezika, gde se prakti more religija, gde se meša tradicija sa modernošću - naučiš da prihvatiš i poštuješ ono što je drugačije.'
            }
          ]
        }
      ]
    }
  ],
  
  tips: [
    {
      title: 'Najbolje vreme za posetu',
      description: 'Oktobar - mart zbog povoljnije klime',
      icon: 'calendar'
    },
    {
      title: 'Transport',
      description: 'Obavezno organizovan prevoz',
      icon: 'car'
    },
    {
      title: 'Zdravlje',
      description: 'Voda samo flaširana',
      icon: 'water'
    },
    {
      title: 'Oblačenje',
      description: 'Lagana pamučna odeća',
      icon: 'clothing'
    },
    {
      title: 'Novac',
      description: 'Kartice nisu svugde prihvaćene, poneshe kes',
      icon: 'money'
    },
    {
      title: 'Dokumenta',
      description: 'Viza je obavezna, potreban pasoš sa važenjem minimum 6 meseci',
      icon: 'documents'
    }
  ],
  
  authorInfo: {
    name: 'Željana Radojičić Lukić',
    bio: 'Tokom svoje dvadesetgodišnje karijere u obrazovanju, putovala je širom sveta istražujući različite obrazovne sisteme i metodologije. Iskustva iz ovih putovanja utkala je u svoju metodologiju Srećnog učenja, obogaćujući je kulturnim perspektivama i pristupima učenju iz različitih delova sveta.',
    // image: null // Dodaće se kada budu dostupne slike
  },
  
  metadata: {
    duration: '10-14 dana',
    bestTime: 'Oktobar - mart',
    difficulty: 'moderate'
  },
  
  publishedDate: '2024-09-15T10:00:00Z',
  featured: true,
  
  seo: {
    metaTitle: 'Indija - zemlja kontrasta | Iskustva iz sveta',
    metaDescription: 'Putovanje kroz Indiju koje menja perspektivu - od obrazovnih sistema do kulturnih razlika koje obogaćuju naš pristup učenju.',
    keywords: ['Indija', 'putovanje', 'obrazovanje', 'kultura', 'iskustvo', 'tolerancija']
  }
}

/**
 * Glavna funkcija za seed experience podataka
 */
async function seedExperienceData() {
  console.log('🚀 Započinje seed experience podataka u Sanity...\\n')
  
  try {
    // Kreiranje experience dokumenta
    console.log('✈️ Kreiranje experience dokumenta...')
    
    const createdExperience = await client.create(EXPERIENCE_DATA)
    console.log(`✅ Iskustvo "${EXPERIENCE_DATA.title}" kreirano (ID: ${createdExperience._id})`)
    
    console.log('\\n🎉 Experience seed uspešno završen!')
    console.log('📊 Kreiran sadržaj:')
    console.log(`   - 1 iskustvo iz Indije`)
    console.log(`   - ${EXPERIENCE_DATA.chapters.length} poglavlja`)
    console.log(`   - ${EXPERIENCE_DATA.tips.length} praktičnih saveta`)
    console.log(`   - Istaknuto iskustvo: ${EXPERIENCE_DATA.featured ? 'DA' : 'NE'}`)
    console.log(`   - Nivo težine: ${EXPERIENCE_DATA.metadata.difficulty}`)
    
  } catch (error) {
    console.error('❌ Greška tokom seed-a:', error.message)
    process.exit(1)
  }
}

/**
 * Briše postojeće experience podatke
 */
async function cleanExperienceData() {
  console.log('🧹 Brisanje postojećih experience podataka...')
  
  try {
    // Briši sve experience dokumente
    await client.delete({
      query: '*[_type == "experience"]'
    })
    
    console.log('✅ Postojeći experience podaci obrisani')
    
  } catch (error) {
    console.log('⚠️  Greška pri brisanju:', error.message)
  }
}

/**
 * Dodaje dodatna test iskustva za demonstraciju
 */
async function seedAdditionalExperiences() {
  console.log('📚 Dodavanje dodatnih test iskustava...')
  
  const additionalExperiences = [
    {
      _type: 'experience',
      title: 'Japan - zemlja gde tradicija susreće budućnost',
      slug: { _type: 'slug', current: 'japan-tradicija-i-buducnost' },
      destination: 'Japan',
      excerpt: 'Putovanje kroz Japan otkriva kako se moderna tehnologija može uklopiti sa starnim tradicijama.',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Japan je zemlja paradoksa - gde se ultramoderni neboderi nalaze pored hramova starih hiljadama godina, gde roboti služe čaj u tradicionalnim čajankama.'
            }
          ]
        }
      ],
      chapters: [
        {
          title: 'Tokyo - grad budućnosti',
          content: [
            {
              _type: 'block',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Tokyo vam pokazuje kako može da izgleda budućnost obrazovanja - škole sa robotskim učiteljima, virtuelna realnost u nastavi...'
                }
              ]
            }
          ]
        }
      ],
      tips: [
        {
          title: 'Jezik',
          description: 'Naučite osnovne japanske fraze',
          icon: 'tech'
        },
        {
          title: 'Transport',
          description: 'JR Pass je obavezan za turiste',
          icon: 'car'
        }
      ],
      authorInfo: {
        name: 'Željana Radojičić Lukić',
        bio: 'Ekspert za moderne obrazovne tehnologije i tradicionalne metode učenja.'
      },
      metadata: {
        duration: '7-10 dana',
        bestTime: 'Mart-maj, septembar-novembar',
        difficulty: 'easy'
      },
      publishedDate: '2024-06-20T14:00:00Z',
      featured: false,
      seo: {
        metaTitle: 'Japan - gde tradicija susreće budućnost',
        metaDescription: 'Otkrijte kako Japan balansira između tradicije i modernosti u obrazovanju.',
        keywords: ['Japan', 'tehnologija', 'tradicija', 'obrazovanje']
      }
    },
    {
      _type: 'experience',
      title: 'Finska - zemlja najbolje obrazovanja na svetu',
      slug: { _type: 'slug', current: 'finska-najbolje-obrazovanje' },
      destination: 'Finska',
      excerpt: 'Istraži važi Finska postala svetski lider u obrazovanju i šta možemo naučiti od njihovog sistema.',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Finska je poslednjih decenija bila na vrhu PISA lista i postala sinonim za kvalitetno obrazovanje. Šta čini njihov sistem toliko uspešnim?'
            }
          ]
        }
      ],
      chapters: [
        {
          title: 'Bez testiranja, više učenja',
          content: [
            {
              _type: 'block',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Finski pristup obrazovanju zasnovan je na poverenju, a ne na kontroli. Učenici se retko testiraju, ali rezultati su fantastični...'
                }
              ]
            }
          ]
        }
      ],
      tips: [
        {
          title: 'Klima',
          description: 'Pripremi se za hladnu klimu',
          icon: 'clothing'
        },
        {
          title: 'Jezik',
          description: 'Engleski se odlično govori',
          icon: 'tech'
        }
      ],
      authorInfo: {
        name: 'Željana Radojičić Lukić',
        bio: 'Istraživačica obrazovnih sistema i metodologija učenja.'
      },
      metadata: {
        duration: '5-7 dana',
        bestTime: 'Maj-septembar',
        difficulty: 'easy'
      },
      publishedDate: '2024-04-10T12:00:00Z',
      featured: false,
      seo: {
        metaTitle: 'Finska - zemlja najbolje obrazovanja na svetu',
        metaDescription: 'Istražite zašto je Finska zemlja sa najbolje obrazovanjem i šta možemo naučiti.',
        keywords: ['Finska', 'obrazovanje', 'PISA', 'sistem']
      }
    }
  ]

  try {
    for (const experience of additionalExperiences) {
      const created = await client.create(experience)
      console.log(`✅ Iskustvo "${experience.title}" kreirano`)
    }
    
    console.log(`\\n🎉 Dodano ${additionalExperiences.length} dodatnih iskustava!`)
    
  } catch (error) {
    console.error('❌ Greška pri dodavanju:', error.message)
  }
}

// CLI interface
if (require.main === module) {
  const command = process.argv[2]
  
  switch (command) {
    case 'clean':
      cleanExperienceData()
      break
      
    case 'additional':
      seedAdditionalExperiences()
      break
      
    case 'full':
      Promise.resolve()
        .then(() => cleanExperienceData())
        .then(() => seedExperienceData())
        .then(() => seedAdditionalExperiences())
      break
      
    case 'seed':
    default:
      seedExperienceData()
      break
  }
}

module.exports = {
  seedExperienceData,
  cleanExperienceData,
  seedAdditionalExperiences,
  EXPERIENCE_DATA
}