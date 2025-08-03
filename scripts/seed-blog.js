const { client } = require('../sanity/client.js')

// Blog kategorije
const BLOG_CATEGORIES = [
  {
    _type: 'blogCategory',
    name: 'Događaji',
    slug: { _type: 'slug', current: 'dogadjaji' },
    description: 'Vesti o događajima, radionicama i aktivnostima',
    color: 'primary'
  },
  {
    _type: 'blogCategory', 
    name: 'Vesti',
    slug: { _type: 'slug', current: 'vesti' },
    description: 'Najnovije vesti iz sveta obrazovanja i metodologije',
    color: 'secondary'
  },
  {
    _type: 'blogCategory',
    name: 'Metodologija',
    slug: { _type: 'slug', current: 'metodologija' },
    description: 'Članci o metodama i tehnikama učenja',
    color: 'accent'
  }
]

// Osnovni autor
const AUTHOR = {
  _type: 'author',
  name: 'Željana Radojičić Lukić',
  slug: { _type: 'slug', current: 'zeljana-radojicic-lukic' },
  bio: 'Doktor pedagogije, profesorka i istraživačica sa preko 20 godina iskustva u obrazovanju. Osnivačica metodologije Srećnog učenja.',
  // image: null // Dodaće se kada budu dostupne slike
}

// Blog postovi prema zadatku
const BLOG_POSTS = [
  {
    _type: 'blogPost',
    title: 'Kada bajka oživi - naučni eksperimenti inspirisani Čarobnim selom',
    slug: { _type: 'slug', current: 'divlja-kupina-naucni-eksperimenti' },
    excerpt: 'Poljoprivredni fakultet u Čačku postao je pozornica jedinstvenog događaja gde su se spojile bajka i nauka.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '5. juna 2025. godine, Poljoprivredni fakultet u Čačku postao je pozornica jedinstvenog događaja gde su se spojile bajka i nauka. Deca, učitelji i roditelji zajedno su oživeli scene iz knjige "Prolećna žurba", demonstrirajući proces liofilizacije voća.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span', 
            text: 'Nauka kroz bajku'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Učesnici su kroz praktične eksperimente pokazali kako se divlja kupina zamrzava i suši, povezujući Vilinu čaroliju sa stvarnim naučnim procesima. "Svaka naša knjiga spaja bajku i realnost, razvijajući vrline kroz konkretno iskustvo", ističu organizatori.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3', 
        children: [
          {
            _type: 'span',
            text: 'Transformacija obrazovanja'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Ovaj događaj pokazuje kako metodologija srećnog učenja može da transformiše način na koji deca doživljavaju nauku - ne kao apstraktnu teoriju, već kao uzbudljivu avanturu otkrivanja.'
          }
        ]
      }
    ],
    tags: ['nauka', 'eksperimenti', 'metodologija', 'događaj'],
    publishedDate: '2025-06-05T10:00:00Z',
    isFeatured: true,
    readingTime: 3
  },
  {
    _type: 'blogPost',
    title: 'Pedagozi koji menjaju obrazovanje - poznati finalisti',
    slug: { _type: 'slug', current: 'rezultati-konkursa-najbolji-od-nas-2025' },
    excerpt: 'Objavljen je spisak finalista prestižnog konkursa koji nagrađuje inovativne pedagoge.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Objavljen je spisak finalista prestižnog konkursa koji nagrađuje inovativne pedagoge. Ove godine, fokus je na holistički pristup i bajkovito učenje koje inspirišu metodologija Srećnog učenja.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Inovativni pristupi'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Finalisti su predstavili izuzetne pedagoške scenarije koji integrišu različite oblasti znanja kroz priče i praktične aktivnosti. Njihovi radovi pokazuju kako se tradicionalno obrazovanje može transformisati u uzbudljivo putovanje otkrivanja.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Poziv nastavnicima'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Svi zainteresovani nastavnici pozivaju se na "Metodičke dane Srećnog učenja" koji će se održati 28-29. avgusta 2025. godine, gde će finalisti podeliti svoja iskustva i metode rada.'
          }
        ]
      }
    ],
    tags: ['konkurs', 'nastavnici', 'edukacija', 'finalisti'],
    publishedDate: '2025-07-15T12:00:00Z',
    isFeatured: false,
    readingTime: 4
  },
  {
    _type: 'blogPost',
    title: 'Karte inspiracije - alat za razvoj kreativnosti kod dece',
    slug: { _type: 'slug', current: 'kreativnost-kao-kljucna-vestina-buducnosti' },
    excerpt: 'U eri digitalizacije, kreativnost postaje ključna veština.',
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'U eri digitalizacije, kreativnost postaje ključna veština. Predstavljamo "Karte inspiracije" - edukativni alat koji podstiče kreativno mišljenje kroz igru i izazove.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Kako funkcionišu karte?'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Karte sadrže zadatke koji inspirišu decu da analiziraju, stvaraju i istražuju van okvira. Od izmišljanja novih završetaka priča do kreiranja izuma koji rešavaju svakodnevne probleme, svaka karta je prilika za razvoj divergentnog mišljenja.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Poziv nastavnicima'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Pozivamo nastavnike da podele svoje primere kreativne primene karata i doprinese razvoju zajednice koja neguje maštu i inovativnost.'
          }
        ]
      }
    ],
    tags: ['kreativnost', 'alati', 'edukacija', 'inovacije'],
    publishedDate: '2025-03-20T14:00:00Z',
    isFeatured: false,
    readingTime: 2
  }
]

/**
 * Glavna funkcija za seed blog podataka
 */
async function seedBlogData() {
  console.log('🚀 Započinje seed blog podataka u Sanity...\\n')
  
  try {
    // 1. Kreiranje kategorija
    console.log('📂 Kreiranje blog kategorija...')
    const createdCategories = []
    
    for (const category of BLOG_CATEGORIES) {
      const doc = await client.create(category)
      createdCategories.push(doc)
      console.log(`✅ Kategorija "${category.name}" kreirana`)
    }
    
    // 2. Kreiranje autora
    console.log('\\n👤 Kreiranje autora...')
    const createdAuthor = await client.create(AUTHOR)
    console.log(`✅ Autor "${AUTHOR.name}" kreiran`)
    
    // 3. Kreiranje blog postova
    console.log('\\n📝 Kreiranje blog postova...')
    
    for (let i = 0; i < BLOG_POSTS.length; i++) {
      const post = BLOG_POSTS[i]
      
      // Povezivanje sa kategorijom
      let categoryRef = null
      if (i === 0) {
        categoryRef = { _type: 'reference', _ref: createdCategories[0]._id } // Događaji
      } else if (i === 1) {
        categoryRef = { _type: 'reference', _ref: createdCategories[1]._id } // Vesti
      } else {
        categoryRef = { _type: 'reference', _ref: createdCategories[2]._id } // Metodologija
      }
      
      // Povezivanje sa autorom
      const authorRef = { _type: 'reference', _ref: createdAuthor._id }
      
      const postWithRefs = {
        ...post,
        category: categoryRef,
        author: authorRef,
        seo: {
          metaTitle: post.title,
          metaDescription: post.excerpt
        }
      }
      
      const createdPost = await client.create(postWithRefs)
      console.log(`✅ Post "${post.title}" kreiran`)
    }
    
    console.log('\\n🎉 Blog seed uspešno završen!')
    console.log('📊 Kreiran sadržaj:')
    console.log(`   - ${BLOG_CATEGORIES.length} kategorija`)
    console.log(`   - 1 autor`)
    console.log(`   - ${BLOG_POSTS.length} blog postova`)
    console.log(`   - 1 istaknut post`)
    
  } catch (error) {
    console.error('❌ Greška tokom seed-a:', error.message)
    process.exit(1)
  }
}

/**
 * Briše postojeće blog podatke
 */
async function cleanBlogData() {
  console.log('🧹 Brisanje postojećih blog podataka...')
  
  try {
    // Briši blog postove
    await client.delete({
      query: '*[_type == "blogPost"]'
    })
    
    // Briši kategorije  
    await client.delete({
      query: '*[_type == "blogCategory"]'
    })
    
    // Briši autore (samo one kreiranje u ovom script-u)
    await client.delete({
      query: '*[_type == "author" && slug.current == "zeljana-radojicic-lukic"]'
    })
    
    console.log('✅ Postojeći blog podaci obrisani')
    
  } catch (error) {
    console.log('⚠️  Greška pri brisanju:', error.message)
  }
}

// CLI interface
if (require.main === module) {
  const command = process.argv[2]
  
  switch (command) {
    case 'clean':
      cleanBlogData()
      break
      
    case 'seed':
    default:
      seedBlogData()
      break
  }
}

module.exports = {
  seedBlogData,
  cleanBlogData,
  BLOG_CATEGORIES,
  BLOG_POSTS,
  AUTHOR
}