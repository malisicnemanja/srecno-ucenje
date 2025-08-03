const { client } = require('../sanity/client.js')

// Knjige podaci
const BOOKS_DATA = [
  {
    _type: 'book',
    title: 'Jesenja gozba',
    slug: { _type: 'slug', current: 'jesenja-gozba' },
    subtitle: 'Luka godišnjih doba - Jesen',
    excerpt: 'Prva knjiga iz serijala Luka godišnjih doba, gde upoznajemo dečaka Luku i vilu Bosiljčicu u čarobnoj jesenjoj priči punoj učenja i avantura.',
    description: 'Jesenja gozba je prva knjiga iz serijala koja uvodi decu u svet Čarobnog sela. Kroz avanturu dečaka Luke i vile Bosiljčice, deca uče o prirodi, godišnjim dobima i važnosti zahvalnosti.',
    seasonalTheme: 'autumn',
    publicationYear: 2021,
    isbn: '978-86-123456-0-1',
    pageCount: 48,
    ageGroup: '6-10 godina',
    price: 890,
    features: [
      'Ilustracije srpskih umetnika',
      'Integrativni zadaci za učenje',
      'QR kodovi za dodatne sadržaje',
      'Eko-prijateljski papir'
    ],
    educationalTopics: [
      'Prepoznavanje godišnjih doba',
      'Razumevanje prirodnih ciklusa',
      'Razvoj zahvalnosti',
      'Timski rad'
    ],
    awards: [
      'Nagrada "Neven" za najbolju dečju knjigu 2021'
    ],
    purchaseLinks: [
      { type: 'laguna', url: 'https://www.laguna.rs/jesenja-gozba' },
      { type: 'delfi', url: 'https://www.delfi.rs/jesenja-gozba' }
    ],
    seo: {
      metaTitle: 'Jesenja gozba - Luka godišnjih doba | Srećno učenje',
      metaDescription: 'Prva knjiga iz serijala Luka godišnjih doba. Edukativna priča o jeseni koja uči decu o prirodi i zahvalnosti.',
      keywords: ['jesenja gozba', 'luka godišnjih doba', 'dečje knjige', 'edukativne priče', 'jesen']
    }
  },
  {
    _type: 'book',
    title: 'Zimski mir',
    slug: { _type: 'slug', current: 'zimski-mir' },
    subtitle: 'Luka godišnjih doba - Zima',
    excerpt: 'Druga knjiga serijala vodi nas kroz zimske avanture Luke i vile Božice, učeći o strpljenju, miru i lepoti zimskih dana.',
    description: 'Zimski mir nastavlja priču o Luki koji sada upoznaje vilu Božicu i tajne zime. Kroz snežne avanture, deca uče o strpljenju, unutrašnjem miru i važnosti tišine za učenje.',
    seasonalTheme: 'winter',
    publicationYear: 2022,
    isbn: '978-86-123456-1-8',
    pageCount: 52,
    ageGroup: '6-10 godina',
    price: 890,
    features: [
      'Zimske ilustracije pune čarolije',
      'Zadaci za razvoj koncentracije',
      'Priče za čitanje pred spavanje',
      'Bonus: Zimske pesme'
    ],
    educationalTopics: [
      'Razvoj strpljenja',
      'Koncentracija i fokus',
      'Razumevanje tišine',
      'Zimska priroda'
    ],
    purchaseLinks: [
      { type: 'vulkan', url: 'https://www.knjizare-vulkan.rs/zimski-mir' },
      { type: 'delfi', url: 'https://www.delfi.rs/zimski-mir' }
    ],
    seo: {
      metaTitle: 'Zimski mir - Luka godišnjih doba | Srećno učenje',
      metaDescription: 'Druga knjiga serijala o zimskim avanturama koje uče strpljenju i koncentraciji kroz čarobne priče.',
      keywords: ['zimski mir', 'luka godišnjih doba', 'zimske priče', 'strpljenje', 'koncentracija']
    }
  },
  {
    _type: 'book',
    title: 'Prolećna žurba',
    slug: { _type: 'slug', current: 'prolecna-zurba' },
    subtitle: 'Luka godišnjih doba - Proleće',
    excerpt: 'Treća knjiga donosi prolećno buđenje prirode sa vilom Đurđicom, učeći o rastu, razvoju i radosti stvaranja.',
    description: 'Prolećna žurba je priča o buđenju i rastu. Luka i vila Đurđica otkrivaju tajne prolećnog cvetanja, uče o životnim ciklusima i važnosti marljivog rada.',
    seasonalTheme: 'spring',
    publicationYear: 2022,
    isbn: '978-86-123456-2-5',
    pageCount: 48,
    ageGroup: '6-10 godina',
    price: 890,
    features: [
      'Prolećne boje i ilustracije',
      'Praktični zadaci o biljkama',
      'Eko-aktivnosti za decu',
      'Prolećni kalendar'
    ],
    educationalTopics: [
      'Životni ciklusi biljaka',
      'Važnost rada i truda',
      'Prolećno buđenje prirode',
      'Ekologija'
    ],
    awards: [
      'Specijalno priznanje EKO-fest 2022'
    ],
    purchaseLinks: [
      { type: 'laguna', url: 'https://www.laguna.rs/prolecna-zurba' },
      { type: 'knjizara_com', url: 'https://knjizara.com/prolecna-zurba' }
    ],
    seo: {
      metaTitle: 'Prolećna žurba - Luka godišnjih doba | Srećno učenje',
      metaDescription: 'Treća knjiga o prolećnom buđenju prirode koja uči o rastu, razvoju i ekologiji kroz zabavne priče.',
      keywords: ['prolećna žurba', 'luka godišnjih doba', 'proleće', 'ekologija', 'biljke']
    }
  },
  {
    _type: 'book',
    title: 'Letnja vreva',
    slug: { _type: 'slug', current: 'letnja-vreva' },
    subtitle: 'Luka godišnjih doba - Leto',
    excerpt: 'Četvrta knjiga zaokružuje godišnji ciklus sa vilom Ivanom, slaveći radost, igru i druženje tokom leta.',
    description: 'Letnja vreva je finalna knjiga serijala koja slavi radost leta. Kroz avanture sa vilom Ivanom, deca uče o prijateljstvu, igri na otvorenom i važnosti aktivnog leta.',
    seasonalTheme: 'summer',
    publicationYear: 2023,
    isbn: '978-86-123456-3-2',
    pageCount: 56,
    ageGroup: '6-10 godina',
    price: 890,
    features: [
      'Letnje ilustracije pune sunca',
      'Aktivnosti za leto',
      'Igre za dvorište',
      'Letnji dnevnik'
    ],
    educationalTopics: [
      'Važnost igre',
      'Prijateljstvo i saradnja',
      'Letnje aktivnosti',
      'Bezbednost na suncu'
    ],
    purchaseLinks: [
      { type: 'vulkan', url: 'https://www.knjizare-vulkan.rs/letnja-vreva' },
      { type: 'laguna', url: 'https://www.laguna.rs/letnja-vreva' }
    ],
    seo: {
      metaTitle: 'Letnja vreva - Luka godišnjih doba | Srećno učenje',
      metaDescription: 'Četvrta knjiga koja zaokružuje godišnji ciklus učeći o radosti, igri i druženju kroz letnje avanture.',
      keywords: ['letnja vreva', 'luka godišnjih doba', 'leto', 'igra', 'prijateljstvo']
    }
  }
]

// Books landing page data
const BOOKS_LANDING_DATA = {
  _type: 'booksLanding',
  heroTitle: 'Luka godišnjih doba',
  heroSubtitle: 'Četiri čarobne knjige koje prate godišnje cikluse i uče decu o prirodi, emocijama i vrednostima',
  seriesDescription: 'Serijal "Luka godišnjih doba" je jedinstvena kolekcija od četiri knjige koje prate avanture dečaka Luke kroz sve četiri godišnje doba. Svaka knjiga donosi priču o jednom godišnjem dobu sa svojom vilom čuvaricom, učeći decu o prirodnim ciklusima, emocionalnoj inteligenciji i važnim životnim vrednostima.',
  authorSection: {
    title: 'O autorki',
    description: 'Željana Radojičić Lukić je učiteljica i spisateljica sa više od 20 godina iskustva u obrazovanju. Kreatorka je metodologije Srećnog učenja i osnivačica Čarobnog sela.',
    achievements: [
      'Dobitnica Global Teacher Prize',
      'Svetosavska nagrada',
      'Autorka metodologije Srećnog učenja',
      'Osnivačica festivala Kreativna čarolija'
    ]
  },
  features: [
    {
      title: 'Edukativne priče',
      description: 'Svaka knjiga sadrži pažljivo osmišljene priče koje uče važne životne lekcije',
      icon: 'book'
    },
    {
      title: 'Integrativni zadaci',
      description: 'Praktični zadaci koji povezuju različite oblasti učenja',
      icon: 'tasks'
    },
    {
      title: 'Ilustracije',
      description: 'Prelepe ilustracije srpskih umetnika koje oživaljavaju priče',
      icon: 'art'
    },
    {
      title: 'QR kodovi',
      description: 'Dodatni digitalni sadržaji dostupni putem QR kodova',
      icon: 'qr'
    }
  ],
  seo: {
    metaTitle: 'Knjige - Luka godišnjih doba | Srećno učenje',
    metaDescription: 'Otkrijte serijal "Luka godišnjih doba" - četiri edukativne knjige koje prate godišnje cikluse i uče decu o prirodi i vrednostima.',
    keywords: ['luka godišnjih doba', 'dečje knjige', 'edukativne priče', 'srećno učenje', 'željana radojičić lukić']
  }
}

/**
 * Glavna funkcija za seed books podataka
 */
async function seedBooksData() {
  console.log('🚀 Započinje seed books podataka u Sanity...\\n')
  
  try {
    // Kreiraj knjige
    console.log('📚 Kreiranje knjiga...')
    
    for (const book of BOOKS_DATA) {
      const createdBook = await client.create(book)
      console.log(`✅ Knjiga "${book.title}" kreirana (ID: ${createdBook._id})`)
    }
    
    // Kreiraj books landing page
    console.log('\\n🏠 Kreiranje books landing page...')
    
    // Proveri da li već postoji
    const existingLanding = await client.fetch('*[_type == "booksLanding"][0]')
    
    if (existingLanding) {
      // Update postojećeg
      console.log('📝 Ažuriranje postojećeg books landing dokumenta...')
      const updated = await client.patch(existingLanding._id).set(BOOKS_LANDING_DATA).commit()
      console.log(`✅ Books landing dokument ažuriran (ID: ${updated._id})`)
    } else {
      // Kreiraj novi
      const createdLanding = await client.create(BOOKS_LANDING_DATA)
      console.log(`✅ Books landing dokument kreiran (ID: ${createdLanding._id})`)
    }
    
    console.log('\\n🎉 Books seed uspešno završen!')
    console.log('📊 Kreiran sadržaj:')
    console.log(`   - ${BOOKS_DATA.length} knjige`)
    console.log(`   - 1 books landing page`)
    console.log('\\n📋 Sledeći koraci:')
    console.log('   1. Pokreni "npm run upload-images" da uploaduješ cover slike')
    console.log('   2. Pregledaj knjige na /knjige stranici')
    
  } catch (error) {
    console.error('❌ Greška tokom seed-a:', error.message)
    process.exit(1)
  }
}

/**
 * Briše postojeće books podatke
 */
async function cleanBooksData() {
  console.log('🧹 Brisanje postojećih books podataka...')
  
  try {
    // Briši sve knjige
    await client.delete({
      query: '*[_type == "book"]'
    })
    
    // Briši books landing
    await client.delete({
      query: '*[_type == "booksLanding"]'
    })
    
    console.log('✅ Postojeći books podaci obrisani')
    
  } catch (error) {
    console.log('⚠️  Greška pri brisanju:', error.message)
  }
}

// CLI interface
if (require.main === module) {
  const command = process.argv[2]
  
  switch (command) {
    case 'clean':
      cleanBooksData()
      break
      
    case 'full':
      Promise.resolve()
        .then(() => cleanBooksData())
        .then(() => seedBooksData())
      break
      
    case 'seed':
    default:
      seedBooksData()
      break
  }
}

module.exports = {
  seedBooksData,
  cleanBooksData,
  BOOKS_DATA,
  BOOKS_LANDING_DATA
}