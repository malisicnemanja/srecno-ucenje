const { client } = require('../sanity/client.js')

// About Author podaci
const ABOUT_AUTHOR_DATA = {
  _type: 'aboutAuthor',
  heroTitle: 'Željana Radojičić Lukić',
  heroSubtitle: 'Učiteljica, spisateljica i kreatorka metodologije Srećnog učenja',
  
  // Istaknuti citat
  featuredQuote: {
    text: 'Moji likovi nose vrline koje želim da deca prepoznaju. Cilj je razvoj srećnih i odgovornih pojedinaca koji će svoje znanje primenjivati za dobrobit društva.',
    context: 'O filozofiji Čarobnog sela'
  },
  
  // Sekcije sadržaja
  sections: [
    {
      title: 'Početak puta',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Rođena 1969. godine u Banovićima, Željana je odrasla okružena prirodom Bosne i Hercegovine. Kao devojčica koja je rano krenula u školu, nije znala ni slova ni brojeve, ali je znala prepoznati vrste ptica po glasu, razlikovati drveće i poznavati lekovite biljke.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Biblioteka je postala njeno utočište - kroz knjige je putovala svetom, upoznavala druge kulture i učila da prepoznaje vrline kod sebe i drugih. Odrastanje u višekulturnoj sredini naučilo ju je da poštuje različitosti, što je kasnije postalo temelj njenog obrazovnog pristupa.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Prve nastavničke korake napravila je krajem devedesetih u malim selima na padinama planine Ozren. Rat ju je primorao da napusti Bosnu i preseli se u Banju Vrujci, gde i danas živi, radi i stvara.'
            }
          ]
        }
      ],
      imagePosition: 'right',
      backgroundColor: '#FFF9E6',
      decorativeElement: 'floating-books'
    },
    {
      title: 'Od seoske učiteljice do vizionara obrazovanja',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Nakon preseljenja u Srbiju, Željana nastavlja rad kao seoska učiteljica, gde razvija inovativne metode rada sa decom. Njen talenat i posvećenost dovode je do pozicije pomoćnice ministra prosvete (2015-2016).'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Ipak, na vrhuncu karijere u državnoj službi, donosi hrabru odluku - odriče se sigurne pozicije kako bi se u potpunosti posvetila razvoju pedagogije srećnog učenja i pisanju knjiga za decu. "Shvatila sam da mogu više doprineti direktnim radom sa decom nego kroz administrativne pozicije", kaže Željana.'
            }
          ]
        }
      ],
      imagePosition: 'left',
      backgroundColor: '#E3F2FD',
      decorativeElement: 'growth-plant'
    },
    {
      title: 'Rođenje Čarobnog sela',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Godine 2012, uz podršku UNICEF-a, Željana pokreće projekat "Čarobno selo" - obrazovni univerzum u kojem svako godišnje doba ima svoju kuću, vilu i priče koje spajaju bajku sa naukom.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Koncept srećnog učenja zasniva se na tri stuba: ljubavi prema bajci, značaju iskustvenog učenja i primeni znanja u svakodnevnom životu. Kroz priče o vilama i deci, Željana integriše nauku, ekologiju, jezik, tradiciju i kulturu, razvijajući kod dece vrline poput zahvalnosti, hrabrosti i empatije.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: '"Moji likovi nose vrline koje želim da deca prepoznaju. Cilj je razvoj srećnih i odgovornih pojedinaca koji će svoje znanje primenjivati za dobrobit društva", objašnjava svoju filozofiju.'
            }
          ]
        }
      ],
      imagePosition: 'right',
      backgroundColor: '#F3E5F5',
      decorativeElement: 'magic-sparkles'
    },
    {
      title: 'Knjige koje menjaju obrazovanje',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Serijal "Luka godišnjih doba" sastoji se od četiri knjige - Jesenja gozba (2021), Zimski mir (2022), Prolećna žurba (2022) i Letnja vreva (2023). Svaka knjiga je pažljivo osmišljena da spoji tradicionalne vrednosti sa modernim pristupom učenju.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Uz knjige, Željana je kreirala radne sveske sa integrativnim zadacima i metodički priručnik "Pedagogija srećnog učenja" koji pomaže nastavnicima da primene njen koncept u svojim učionicama.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Knjige nisu samo za decu - one su vodiči za roditelje i nastavnike kako da kroz igru i maštu razvijaju celovite ličnosti.'
            }
          ]
        }
      ],
      imagePosition: 'left',
      backgroundColor: '#FFF3E0',
      decorativeElement: 'open-book'
    },
    {
      title: 'Društveni uticaj i priznanja',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Željana je osnivač i predsednica udruženja KREATIVA - kreativno obrazovanje, koje razvija obrazovne i ekološke projekte. Vodi i festival "Kreativna čarolija", najveći festival dečjeg stvaralaštva u Srbiji.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Pokrenula je asocijaciju najboljih nastavnika bivše Jugoslavije i nagradu "Prosvetitelj", povezujući edukatore i promovisajući inovativne pristupe učenju.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Njen rad prepoznat je brojnim nagradama, uključujući Global Teacher Prize i Svetosavsku nagradu, što je svrstava među najuticajnije edukatore u regionu.'
            }
          ]
        }
      ],
      imagePosition: 'right',
      backgroundColor: '#E8F5E9',
      decorativeElement: 'award-stars'
    }
  ],
  
  // Vremenska linija
  timeline: [
    {
      year: '1969',
      title: 'Rođenje u Banovićima',
      description: 'Početak puta u Bosni i Hercegovini, odrastanje okruženo prirodom',
      icon: 'birth',
      featured: false
    },
    {
      year: '1990-te',
      title: 'Prvi nastavnički koraci',
      description: 'Rad u selima na planini Ozren, razvoj prve ideje o srećnom učenju',
      icon: 'teaching',
      featured: false
    },
    {
      year: '2012',
      title: 'Osnivanje Čarobnog sela',
      description: 'Početak projekta uz podršku UNICEF-a, rođenje metodologije',
      icon: 'village',
      featured: true
    },
    {
      year: '2015-2016',
      title: 'Pomoćnica ministra prosvete',
      description: 'Rad u državnoj službi na sistemskim promenama u obrazovanju',
      icon: 'government',
      featured: false
    },
    {
      year: '2021-2023',
      title: 'Objavljivanje serijala knjiga',
      description: 'Luka godišnjih doba - 4 knjige koje definišu metodologiju',
      icon: 'books',
      featured: true
    },
    {
      year: '2024',
      title: 'Međunarodna priznanja',
      description: 'Global Teacher Prize i Svetosavska nagrada za doprinos obrazovanju',
      icon: 'award',
      featured: true
    }
  ],
  
  // Dostignuća
  achievements: [
    {
      title: 'Global Teacher Prize',
      description: 'Međunarodno priznanje za inovativnost u obrazovanju i doprinos metodologiji učenja',
      icon: 'globe',
      color: '#3498DB',
      year: '2024'
    },
    {
      title: 'Svetosavska nagrada',
      description: 'Najviše priznanje u srpskom obrazovanju za doprinos pedagoškoj nauci',
      icon: 'medal',
      color: '#E74C3C',
      year: '2023'
    },
    {
      title: 'UNICEF partner',
      description: 'Službena podrška za razvoj Čarobnog sela i metodologije srećnog učenja',
      icon: 'partnership',
      color: '#F39C12',
      year: '2012'
    },
    {
      title: 'Kreativna čarolija',
      description: 'Osnivač i organizator najvećeg festivala dečjeg stvaralaštva u Srbiji',
      icon: 'festival',
      color: '#27AE60',
      year: '2018'
    },
    {
      title: '4 objavljena dela',
      description: 'Serijal "Luka godišnjih doba" i metodički priručnik za nastavnike',
      icon: 'book',
      color: '#9B59B6',
      year: '2021-2023'
    },
    {
      title: 'Asocijacija Prosvetitelj',
      description: 'Pokretanje mreže najboljih nastavnika bivše Jugoslavije',
      icon: 'star',
      color: '#E91E63',
      year: '2020'
    }
  ],
  
  // SEO
  seo: {
    metaTitle: 'O autorki - Željana Radojičić Lukić | Srećno učenje',
    metaDescription: 'Upoznajte Željanu Radojičić Lukić, učiteljicu i spisateljicu koja je stvorila Čarobno selo i metodologiju srećnog učenja. Dobitnica Global Teacher Prize i Svetosavske nagrade.',
    keywords: ['Željana Radojičić Lukić', 'autorka', 'učiteljica', 'Čarobno selo', 'srećno učenje', 'pedagogija', 'Global Teacher Prize', 'Svetosavska nagrada']
  }
}

/**
 * Glavna funkcija za seed about author podataka
 */
async function seedAboutAuthorData() {
  console.log('🚀 Započinje seed about author podataka u Sanity...\\n')
  
  try {
    // Kreiraj about author dokument
    console.log('👤 Kreiranje about author dokumenta...')
    
    // Proveri da li već postoji
    const existing = await client.fetch('*[_type == "aboutAuthor"][0]')
    
    if (existing) {
      // Update postojećeg
      console.log('📝 Ažuriranje postojećeg about author dokumenta...')
      const updated = await client.patch(existing._id).set(ABOUT_AUTHOR_DATA).commit()
      console.log(`✅ About author dokument ažuriran (ID: ${updated._id})`)
    } else {
      // Kreiraj novi
      const created = await client.create(ABOUT_AUTHOR_DATA)
      console.log(`✅ About author dokument kreiran (ID: ${created._id})`)
    }
    
    console.log('\\n🎉 About Author seed uspešno završen!')
    console.log('📊 Kreiran sadržaj:')
    console.log(`   - Hero sekcija sa naslovom "${ABOUT_AUTHOR_DATA.heroTitle}"`)
    console.log(`   - ${ABOUT_AUTHOR_DATA.sections.length} sekcija sadržaja`)
    console.log(`   - ${ABOUT_AUTHOR_DATA.timeline.length} događaja u vremenskoj liniji`)
    console.log(`   - ${ABOUT_AUTHOR_DATA.achievements.length} dostignuća`)
    console.log(`   - Istaknuti citat: "${ABOUT_AUTHOR_DATA.featuredQuote.text.substring(0, 50)}..."`)
    
    console.log('\\n📋 Sledeći koraci:')
    console.log('   1. Uploaduj fotografije autorki u Sanity Media Library')
    console.log('   2. Dodeli fotografije u About Author dokumentu')
    console.log('   3. Dodaj reference na knjige u featuredBooks polju')
    
  } catch (error) {
    console.error('❌ Greška tokom seed-a:', error.message)
    process.exit(1)
  }
}

/**
 * Briše postojeće about author podatke
 */
async function cleanAboutAuthorData() {
  console.log('🧹 Brisanje postojećih about author podataka...')
  
  try {
    // Briši sve about author dokumente
    await client.delete({
      query: '*[_type == "aboutAuthor"]'
    })
    
    console.log('✅ Postojeći about author podaci obrisani')
    
  } catch (error) {
    console.log('⚠️  Greška pri brisanju:', error.message)
  }
}

/**
 * Dodaje fotografije i povezuje knjige
 */
async function enhanceAboutAuthorData() {
  console.log('🖼️ Poboljšavanje about author podataka...')
  
  try {
    // Pronađi about author dokument
    const aboutAuthor = await client.fetch('*[_type == "aboutAuthor"][0]')
    if (!aboutAuthor) {
      console.log('⚠️  About author dokument ne postoji. Prvo pokreni osnovni seed.')
      return
    }
    
    // Pronađi sve knjige
    const books = await client.fetch('*[_type == "book"]')
    if (books.length > 0) {
      console.log(`📚 Pronađeno ${books.length} knjiga, dodajem reference...`)
      
      // Dodaj reference na knjige
      const bookReferences = books.map(book => ({
        _type: 'reference',
        _ref: book._id
      }))
      
      await client.patch(aboutAuthor._id).set({
        featuredBooks: bookReferences
      }).commit()
      
      console.log('✅ Dodane reference na knjige')
    }
    
    console.log('🎉 About author podaci poboljšani!')
    
  } catch (error) {
    console.error('❌ Greška pri poboljšavanju:', error.message)
  }
}

// CLI interface
if (require.main === module) {
  const command = process.argv[2]
  
  switch (command) {
    case 'clean':
      cleanAboutAuthorData()
      break
      
    case 'enhance':
      enhanceAboutAuthorData()
      break
      
    case 'full':
      Promise.resolve()
        .then(() => cleanAboutAuthorData())
        .then(() => seedAboutAuthorData())
        .then(() => enhanceAboutAuthorData())
      break
      
    case 'seed':
    default:
      seedAboutAuthorData()
      break
  }
}

module.exports = {
  seedAboutAuthorData,
  cleanAboutAuthorData,
  enhanceAboutAuthorData,
  ABOUT_AUTHOR_DATA
}