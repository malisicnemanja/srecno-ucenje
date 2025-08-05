import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
})

// Static content to migrate
const staticContent = {
  siteSettings: {
    _type: 'siteSettings',
    _id: 'siteSettings',
    siteName: 'Srećno učenje',
    siteDescription: 'Obrazovna platforma za decu - Srećno učenje sa autorkom Danijelom Trkulja',
    email: 'info@srecno-ucenje.rs',
    phone: '+381 60 1234567',
    address: 'Beograd, Srbija',
    workingHours: [
      { day: 'Ponedeljak - Petak', hours: '09:00 - 17:00' },
      { day: 'Subota', hours: '10:00 - 14:00' },
      { day: 'Nedelja', hours: 'Zatvoreno' }
    ],
    socialLinks: [
      { platform: 'Facebook', url: 'https://facebook.com/srecno-ucenje' },
      { platform: 'Instagram', url: 'https://instagram.com/srecno-ucenje' },
      { platform: 'YouTube', url: 'https://youtube.com/srecno-ucenje' }
    ],
    navigationSettings: {
      _type: 'navigationSettings',
      mainMenu: [
        { title: 'Početna', url: '/', order: 1 },
        { title: 'O nama', url: '/o-nama', order: 2 },
        { title: 'Programi', url: '/programi', order: 3 },
        { title: 'Blog', url: '/blog', order: 4 },
        { title: 'Kontakt', url: '/kontakt', order: 5 },
        { title: 'Zakaži konsultaciju', url: '/zakazivanje', order: 6, highlighted: true }
      ],
      footerMenu: [
        { title: 'Politika privatnosti', url: '/privacy-policy' },
        { title: 'Uslovi korišćenja', url: '/terms' },
        { title: 'FAQ', url: '/faq' }
      ]
    },
    defaultSeo: {
      _type: 'seo',
      metaTitle: 'Srećno učenje - Obrazovna platforma za decu',
      metaDescription: 'Obrazovna platforma za decu sa autorkom Danijelom Trkulja. Programi za predškolce, đake i roditelje.',
      keywords: ['srećno učenje', 'obrazovanje', 'deca', 'predškolci', 'Danijela Trkulja'],
      ogImage: null
    }
  },

  aboutAuthor: {
    _type: 'aboutAuthor',
    _id: 'about-author',
    heroTitle: 'Danijela Trkulja',
    heroSubtitle: 'Autorka obrazovnih programa i osnivačica Srećno učenje',
    sections: [
      {
        title: 'Moja priča',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Već više od 20 godina posvećena sam obrazovanju i razvoju dece. Moja misija je da svako dete pronađe radost u učenju i razvije svoje pune potencijale kroz igru, kreativnost i pozitivno okruženje.'
              }
            ]
          }
        ],
        imagePosition: 'right',
        backgroundColor: '#FFF9E6'
      },
      {
        title: 'Obrazovanje',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Diplomirala sam pedagogiju na Filozofskom fakultetu u Beogradu, nakon čega sam stekla master diplomu iz oblasti razvojne psihologije. Kontinuirano se usavršavam kroz međunarodne seminare i radionice.'
              }
            ]
          }
        ],
        imagePosition: 'left',
        backgroundColor: '#E3F2FD'
      },
      {
        title: 'Iskustvo',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Radila sam kao pedagog u nekoliko osnovnih škola, vodila sam privatnu praksu za podršku u učenju, i osnovala sam Srećno učenje centar koji danas pomaže stotinama dece i njihovih porodica.'
              }
            ]
          }
        ],
        imagePosition: 'right',
        backgroundColor: '#E8F5E9'
      }
    ],
    timeline: [
      {
        year: '2000',
        title: 'Diploma pedagogije',
        description: 'Diplomirala na Filozofskom fakultetu u Beogradu',
        icon: 'teaching',
        featured: true
      },
      {
        year: '2005',
        title: 'Master studije',
        description: 'Master iz razvojne psihologije',
        icon: 'award',
        featured: true
      },
      {
        year: '2010',
        title: 'Osnivanje centra',
        description: 'Otvorila prvi Srećno učenje centar',
        icon: 'books',
        featured: true
      },
      {
        year: '2015',
        title: 'Prva knjiga',
        description: 'Objavila prvu knjigu za decu',
        icon: 'books',
        featured: false
      },
      {
        year: '2020',
        title: 'Online programi',
        description: 'Lansirala online obrazovne programe',
        icon: 'award',
        featured: true
      }
    ],
    achievements: [
      {
        title: '5000+ dece',
        description: 'Pomogli smo preko 5000 dece u njihovom obrazovnom putu',
        icon: 'globe',
        color: '#3498DB'
      },
      {
        title: '15 programa',
        description: 'Razvili smo 15 specijalnih obrazovnih programa',
        icon: 'medal',
        color: '#E74C3C'
      },
      {
        title: '98% uspešnost',
        description: 'Visoka stopa zadovoljstva roditelja i dece',
        icon: 'star',
        color: '#F39C12'
      }
    ],
    featuredQuote: {
      text: 'Svako dete ima svoj jedinstveni način učenja. Naša uloga je da ga otkrijemo i podržimo.',
      context: 'Iz govora na konferenciji o obrazovanju, 2023'
    },
    seo: {
      metaTitle: 'Danijela Trkulja - O autorki | Srećno učenje',
      metaDescription: 'Upoznajte Danijelu Trkulju, autorku obrazovnih programa i osnivaču Srećno učenje centra sa preko 20 godina iskustva.',
      keywords: ['Danijela Trkulja', 'autorka', 'pedagog', 'obrazovanje dece']
    }
  },

  bookingPage: {
    _type: 'bookingPage',
    _id: 'booking-page',
    title: 'Zakazivanje konsultacija',
    hero: {
      title: 'Zakažite besplatnu konsultaciju',
      subtitle: 'Razgovarajmo o potrebama vašeg deteta i kako možemo pomoći',
      badge: '100% besplatno i bez obaveza',
      benefits: [
        {
          icon: '✨',
          title: '30 minuta',
          description: 'Individualni razgovor'
        },
        {
          icon: '📊',
          title: 'Analiza potreba',
          description: 'Procena trenutnog stanja'
        },
        {
          icon: '🎯',
          title: 'Plan akcije',
          description: 'Personalizovane preporuke'
        }
      ]
    },
    whySection: {
      title: 'Zašto zakazati konsultaciju?',
      subtitle: 'Otkrijte kako možemo pomoći vašem detetu',
      reasons: [
        {
          icon: '🎓',
          color: 'blue',
          title: 'Stručna podrška',
          description: 'Tim pedagoga i psihologa sa dugogodišnjim iskustvom'
        },
        {
          icon: '🌱',
          color: 'green',
          title: 'Individualni pristup',
          description: 'Program prilagođen potrebama vašeg deteta'
        },
        {
          icon: '💜',
          color: 'purple',
          title: 'Sigurno okruženje',
          description: 'Topla atmosfera koja podstiče učenje'
        },
        {
          icon: '🎯',
          color: 'orange',
          title: 'Merljivi rezultati',
          description: 'Redovno praćenje napretka i izveštavanje'
        }
      ]
    },
    howItWorks: {
      title: 'Kako funkcioniše?',
      subtitle: 'Jednostavan proces u 3 koraka',
      steps: [
        {
          number: '1',
          title: 'Izaberite termin',
          description: 'Pronađite termin koji vam odgovara u kalendaru',
          icon: '📅'
        },
        {
          number: '2',
          title: 'Popunite podatke',
          description: 'Ostavite osnovne informacije o detetu',
          icon: '✍️'
        },
        {
          number: '3',
          title: 'Razgovarajmo',
          description: 'Pridružite se video pozivu u zakazano vreme',
          icon: '💬'
        }
      ]
    },
    phoneCTA: {
      title: 'Više volite razgovor telefonom?',
      subtitle: 'Pozovite nas i zakažemo konsultaciju zajedno',
      phoneNumber: '+381 60 1234567',
      workingHours: 'Ponedeljak - Petak, 09:00 - 17:00'
    },
    faqSection: {
      title: 'Imate pitanja?',
      subtitle: 'Pronađite odgovore na najčešća pitanja',
      ctaText: 'Pogledajte sva pitanja',
      ctaLink: '/faq'
    },
    calendly: {
      url: 'https://calendly.com/srecno-ucenje/konsultacija',
      prefillName: true,
      prefillEmail: true,
      hideGdprBanner: false
    },
    seo: {
      _type: 'seo',
      metaTitle: 'Zakazivanje konsultacija | Srećno učenje',
      metaDescription: 'Zakažite besplatnu konsultaciju sa našim stručnim timom. Analizirajte potrebe vašeg deteta i dobijte personalizovan plan učenja.',
      keywords: ['konsultacija', 'zakazivanje', 'besplatno', 'savetovanje']
    }
  }
}

async function migrateStaticContent() {
  console.log('🚀 Starting static content migration...')
  
  try {
    // Migrate Site Settings
    console.log('📝 Migrating site settings...')
    await client.createOrReplace(staticContent.siteSettings)
    console.log('✅ Site settings migrated')
    
    // Migrate About Author
    console.log('📝 Migrating about author content...')
    await client.createOrReplace(staticContent.aboutAuthor)
    console.log('✅ About author content migrated')
    
    // Migrate Booking Page
    console.log('📝 Migrating booking page content...')
    await client.createOrReplace(staticContent.bookingPage)
    console.log('✅ Booking page content migrated')
    
    console.log('\n🎉 Static content migration completed successfully!')
    console.log('\n📊 Summary:')
    console.log('- Site Settings: ✅')
    console.log('- About Author: ✅')
    console.log('- Booking Page: ✅')
    
    console.log('\n💡 Next steps:')
    console.log('1. Check Sanity Studio to verify the migrated content')
    console.log('2. Update page components to fetch data from CMS')
    console.log('3. Remove hardcoded content from components')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrateStaticContent()