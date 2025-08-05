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

const locationsData = [
  {
    _type: 'locationData',
    city: 'Beograd',
    centerCount: 3,
    status: 'active',
    coordinates: {
      lat: 44.7866,
      lng: 20.4489
    },
    region: 'belgrade',
    description: 'Glavni grad sa najve\u0107om mrežom Srećno učenje centara. Tri moderna centra pokrivaju sve delove grada.',
    contactInfo: {
      phone: '+381 11 123 4567',
      email: 'beograd@srecno-ucenje.rs',
      address: 'Knez Mihailova 50, Beograd'
    },
    demandLevel: 'high',
    priceMultiplier: 1.3,
    marketSize: 'large',
    order: 1,
    isActive: true,
    featured: true
  },
  {
    _type: 'locationData',
    city: 'Novi Sad',
    centerCount: 2,
    status: 'active',
    coordinates: {
      lat: 45.2671,
      lng: 19.8335
    },
    region: 'vojvodina',
    description: 'Univerzitetski grad sa rastućom mrežom centara. Idealno okruženje za obrazovne programe.',
    contactInfo: {
      phone: '+381 21 123 4567',
      email: 'novisad@srecno-ucenje.rs',
      address: 'Dunavska 20, Novi Sad'
    },
    demandLevel: 'high',
    priceMultiplier: 1.1,
    marketSize: 'large',
    order: 2,
    isActive: true,
    featured: false
  },
  {
    _type: 'locationData',
    city: 'Niš',
    centerCount: 1,
    status: 'active',
    coordinates: {
      lat: 43.3209,
      lng: 21.8958
    },
    region: 'juzna-srbija',
    description: 'Centar južne Srbije sa velikim potencijalom rasta. Novi centar otvoren 2023. godine.',
    contactInfo: {
      phone: '+381 18 123 4567',
      email: 'nis@srecno-ucenje.rs',
      address: 'Obrenovićeva 15, Niš'
    },
    demandLevel: 'medium',
    priceMultiplier: 0.9,
    marketSize: 'medium',
    order: 3,
    isActive: true,
    featured: false
  },
  {
    _type: 'locationData',
    city: 'Kragujevac',
    centerCount: 1,
    status: 'active',
    coordinates: {
      lat: 44.0142,
      lng: 20.9395
    },
    region: 'sumadija',
    description: 'Industrijski i obrazovni centar Šumadije. Odličan odziv lokalne zajednice.',
    contactInfo: {
      phone: '+381 34 123 4567',
      email: 'kragujevac@srecno-ucenje.rs',
      address: 'Kralja Petra I 30, Kragujevac'
    },
    demandLevel: 'medium',
    priceMultiplier: 0.85,
    marketSize: 'medium',
    order: 4,
    isActive: true,
    featured: false
  },
  {
    _type: 'locationData',
    city: 'Subotica',
    centerCount: 1,
    status: 'coming-soon',
    coordinates: {
      lat: 46.1001,
      lng: 19.6651
    },
    region: 'vojvodina',
    description: 'Multikultiralni grad na severu Srbije. Otvaranje planira za prole\u0107e 2024.',
    contactInfo: {
      phone: '+381 24 123 4567',
      email: 'subotica@srecno-ucenje.rs',
      address: 'Korzo 1, Subotica'
    },
    demandLevel: 'high',
    priceMultiplier: 1.0,
    marketSize: 'medium',
    order: 5,
    isActive: true,
    featured: false
  },
  {
    _type: 'locationData',
    city: 'Pančevo',
    centerCount: 1,
    status: 'active',
    coordinates: {
      lat: 44.8708,
      lng: 20.6403
    },
    region: 'belgrade',
    description: 'Grad u blizini Beograda sa jakom lokalnom podrškom. Centar otvoren 2022. godine.',
    contactInfo: {
      phone: '+381 13 123 4567',
      email: 'pancevo@srecno-ucenje.rs',
      address: 'Vojvode Radomira Putnika 10, Pančevo'
    },
    demandLevel: 'medium',
    priceMultiplier: 0.95,
    marketSize: 'small',
    order: 6,
    isActive: true,
    featured: false
  },
  {
    _type: 'locationData',
    city: 'Zrenjanin',
    centerCount: 1,
    status: 'coming-soon',
    coordinates: {
      lat: 45.3834,
      lng: 20.3899
    },
    region: 'vojvodina',
    description: 'Centar Banata sa velikim potencijalom. Planirano otvaranje u Q2 2024.',
    contactInfo: {
      phone: '',
      email: 'info@srecno-ucenje.rs',
      address: ''
    },
    demandLevel: 'medium',
    priceMultiplier: 0.85,
    marketSize: 'small',
    order: 7,
    isActive: true,
    featured: false
  },
  {
    _type: 'locationData',
    city: 'Valjevo',
    centerCount: 0,
    status: 'planned',
    coordinates: {
      lat: 44.2721,
      lng: 19.8872
    },
    region: 'sumadija',
    description: 'U fazi pregovora sa lokalnim partnerima. Planiran početak rada krajem 2024.',
    contactInfo: {
      phone: '',
      email: 'info@srecno-ucenje.rs',
      address: ''
    },
    demandLevel: 'medium',
    priceMultiplier: 0.8,
    marketSize: 'small',
    order: 8,
    isActive: true,
    featured: false
  },
  {
    _type: 'locationData',
    city: 'Čačak',
    centerCount: 0,
    status: 'planned',
    coordinates: {
      lat: 43.8914,
      lng: 20.3497
    },
    region: 'sumadija',
    description: 'Obrazovni centar zapadne Srbije. Velika zainteresovanost lokalne zajednice.',
    contactInfo: {
      phone: '',
      email: 'info@srecno-ucenje.rs',
      address: ''
    },
    demandLevel: 'high',
    priceMultiplier: 0.85,
    marketSize: 'small',
    order: 9,
    isActive: true,
    featured: false
  },
  {
    _type: 'locationData',
    city: 'Smederevo',
    centerCount: 0,
    status: 'planned',
    coordinates: {
      lat: 44.6653,
      lng: 20.9280
    },
    region: 'belgrade',
    description: 'Grad na Dunavu sa rastućom populacijom mladih porodica.',
    contactInfo: {
      phone: '',
      email: 'info@srecno-ucenje.rs',
      address: ''
    },
    demandLevel: 'low',
    priceMultiplier: 0.8,
    marketSize: 'small',
    order: 10,
    isActive: true,
    featured: false
  }
]

async function populateLocations() {
  console.log('🚀 Populating locations data...')

  try {
    // Delete existing locations first
    const existingLocations = await client.fetch(`*[_type == "locationData"]`)
    
    if (existingLocations.length > 0) {
      console.log(`📝 Deleting ${existingLocations.length} existing locations...`)
      for (const loc of existingLocations) {
        await client.delete(loc._id)
      }
    }

    // Create new locations
    for (const location of locationsData) {
      const result = await client.create(location)
      console.log(`✅ Created location: ${location.city}`)
    }

    console.log(`\n✨ Successfully populated ${locationsData.length} locations!`)
    
    // Summary
    const activeCount = locationsData.filter(l => l.status === 'active').length
    const comingSoonCount = locationsData.filter(l => l.status === 'coming-soon').length
    const plannedCount = locationsData.filter(l => l.status === 'planned').length
    
    console.log('\n📊 Summary:')
    console.log(`- Active locations: ${activeCount}`)
    console.log(`- Coming soon: ${comingSoonCount}`)
    console.log(`- Planned: ${plannedCount}`)
    console.log(`- Total centers: ${locationsData.reduce((sum, l) => sum + l.centerCount, 0)}`)
    
  } catch (error) {
    console.error('❌ Error populating locations:', error)
    process.exit(1)
  }
}

// Run the population
populateLocations().then(() => {
  console.log('\n🎉 Locations data successfully populated!')
})