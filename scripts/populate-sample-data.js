/**
 * Sample Data Population Script for Srećno učenje CMS
 * 
 * This script provides sample data structures that can be used to populate
 * the Sanity CMS with realistic franchise-focused content.
 * 
 * Run this script after setting up your Sanity client to populate initial content.
 */

const { createClient } = require('@sanity/client');

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN, // Required for write operations
  apiVersion: '2024-01-01',
});

// ===== CORE SITE SETTINGS =====
const siteSettings = {
  _type: 'siteSettings',
  _id: 'site-settings',
  siteName: 'Srećno učenje',
  siteDescription: 'Vodeća franšiza u obrazovanju dece sa inovativnim metodama učenja. Pokrenite svoju uspešnu obrazovnu franšizu sa našom podrškom.',
  siteSubtitle: 'Metodologija',
  email: 'info@srecno-ucenje.rs',
  phone: '+381 11 123 4567',
  address: 'Knez Mihailova 42, 11000 Beograd, Srbija',
  workingHours: [
    { day: 'Ponedeljak - Petak', hours: '08:00 - 20:00' },
    { day: 'Subota', hours: '09:00 - 15:00' },
    { day: 'Nedelja', hours: 'Zatvoreno' }
  ],
  socialLinks: [
    { platform: 'Facebook', url: 'https://facebook.com/srecno-ucenje' },
    { platform: 'Instagram', url: 'https://instagram.com/srecno_ucenje' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/srecno-ucenje' },
    { platform: 'YouTube', url: 'https://youtube.com/@srecno-ucenje' }
  ],
  colorPalette: {
    primaryColor: '#7CB342', // Brand grass - learning & growth
    secondaryColor: '#5DBFDB', // Brand sky - trust & communication  
    accentColor: '#FDD835', // Brand sun - energy & success
    warmColor: '#E53935' // Brand heart - care & support
  },
  defaultSeo: {
    title: 'Srećno učenje - Obrazovna franšiza za uspešnu budućnost',
    description: 'Pokrenite svoju obrazovnu franšizu sa Srećno učenje. Dokazane metode, kontinuirana podrška i profitabilan biznis model. Zakazujte konsultacije.',
    keywords: ['obrazovna franšiza', 'franšiza za decu', 'metodologija učenja', 'poslovne prilike', 'investicija u obrazovanje'],
    image: null // TODO: Upload hero image through Sanity Studio
  }
};

// ===== NAVIGATION STRUCTURE =====
const navigation = {
  _type: 'navigation',
  _id: 'main-navigation',
  title: 'Glavna navigacija',
  items: [
    {
      title: 'Početna',
      href: '/',
      isActive: true
    },
    {
      title: 'Franšize',
      href: '/fransiza',
      children: [
        {
          title: 'Modeli franšize',
          href: '/fransiza-modeli',
          description: 'Izaberite model koji vam odgovara'
        },
        {
          title: 'Kako se priključiti',
          href: '/kako-se-pridruziti', 
          description: '4 jednostavna koraka do vaše franšize'
        },
        {
          title: 'Prijava za franšizu',
          href: '/fransiza/prijava',
          description: 'Započnite proces aplikacije'
        },
        {
          title: 'Finansijski kalkulator',
          href: '/kalkulator',
          description: 'Proverite profitabilnost investicije'
        }
      ]
    },
    {
      title: 'Centri',
      href: '/centri',
      children: [
        {
          title: 'Svi centri',
          href: '/centri',
          description: 'Pronađite centar u vašoj blizini'
        },
        {
          title: 'Naš tim',
          href: '/tim',
          description: 'Upoznajte naše edukatore'
        }
      ]
    },
    {
      title: 'O nama',
      href: '/o-nama',
      children: [
        {
          title: 'Naša misija',
          href: '/o-nama',
          description: 'Zašto postojimo i čemu težimo'
        },
        {
          title: 'Metodologija',
          href: '/metodologija',
          description: 'Naš pristup obrazovanju dece'
        },
        {
          title: 'Uspeh',
          href: '/uspeh',
          description: 'Rezultati i priče uspeha'
        }
      ]
    },
    {
      title: 'Blog',
      href: '/blog'
    },
    {
      title: 'Kontakt',
      href: '/kontakt',
      isSecondary: true
    }
  ]
};

// ===== HOMEPAGE HERO CONTENT =====
const homePage = {
  _type: 'homePage',
  _id: 'home-page',
  enhancedHero: {
    _type: 'enhancedHero',
    title: 'Pokrenite profitabilnu obrazovnu franšizu',
    subtitle: 'Sa Srećno učenje metodologijom transformišite živote dece i izgradite uspešan biznis',
    description: 'Pridružite se mreži od preko 150 uspešnih franšiznih partnera širom Srbije. Kompletna podrška, dokazane metode i profitabilan biznis model.',
    primaryCTA: {
      text: 'Zakazati konsultacije',
      href: '/konsultacije',
      variant: 'primary'
    },
    secondaryCTA: {
      text: 'Pregledaj modele',
      href: '/fransiza-modeli',
      variant: 'outline'
    },
    heroImage: null, // TODO: Upload hero image through Sanity Studio
    features: [
      'Dokazana metodologija sa 15+ godina iskustva',
      'Kontinuirana obuka i podrška partnerima',
      'Profitabilan biznis sa brzim povraćajem investicije',
      'Ekskluzivnost na teritoriji'
    ]
  },
  statistics: [
    {
      _type: 'statistic',
      number: '150+',
      label: 'Aktivnih centara',
      description: 'Širom Srbije i regiona'
    },
    {
      _type: 'statistic', 
      number: '15,000+',
      label: 'Zadovoljne dece',
      description: 'Koje su prošle naše programe'
    },
    {
      _type: 'statistic',
      number: '98%',
      label: 'Stopa zadovoljstva',
      description: 'Roditelja sa rezultatima'
    },
    {
      _type: 'statistic',
      number: '2-3 godine',
      label: 'Povraćaj investicije',
      description: 'Za većinu naših partnera'
    }
  ]
};

// ===== SAMPLE LOCATIONS (10 CITIES) =====
const sampleLocations = [
  {
    _type: 'location',
    _id: 'location-beograd',
    name: 'Beograd',
    slug: { current: 'beograd' },
    region: 'belgrade',
    coordinates: { lat: 44.7866, lng: 20.4489 },
    marketAnalysis: {
      marketSize: 'large',
      demandLevel: 'high',
      competition: 'high',
      priceMultiplier: 1.2
    },
    contactInfo: {
      phone: '+381 11 123 4567',
      email: 'beograd@srecno-ucenje.rs',
      address: 'Knez Mihailova 42, 11000 Beograd',
      workingHours: 'Pon-Pet: 8:00-20:00, Sub: 9:00-15:00'
    },
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Beograd kao glavni grad Srbije predstavlja najveće tržište za obrazovne usluge. Sa preko 1.7 miliona stanovnika, visoki je potencijal za razvoj kvalitetnih edukativnih programa za decu.'
          }
        ]
      }
    ],
    featured: true,
    isActive: true,
    order: 1,
    seo: {
      title: 'Srećno učenje Beograd - Obrazovna franšiza u glavnom gradu',
      description: 'Pokrenite uspešnu obrazovnu franšizu u Beogradu. Vodeća metodologija, kontinuirana podrška i profitabilan biznis model.',
      keywords: ['franšiza beograd', 'obrazovanje deca beograd', 'metodologija učenja']
    }
  },
  {
    _type: 'location',
    _id: 'location-novi-sad',
    name: 'Novi Sad',
    slug: { current: 'novi-sad' },
    region: 'vojvodina',
    coordinates: { lat: 45.2671, lng: 19.8335 },
    marketAnalysis: {
      marketSize: 'medium',
      demandLevel: 'high',
      competition: 'medium',
      priceMultiplier: 1.0
    },
    contactInfo: {
      phone: '+381 21 456 789',
      email: 'novi-sad@srecno-ucenje.rs',
      address: 'Zmaj Jovina 15, 21000 Novi Sad',
      workingHours: 'Pon-Pet: 8:00-20:00'
    },
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Novi Sad, evropska prestonica kulture, čini idealno okruženje za inovativne obrazovne programe. Grad mladih i studenata sa visokom svešću o važnosti kvalitetnog obrazovanja.'
          }
        ]
      }
    ],
    featured: true,
    isActive: true,
    order: 2
  },
  {
    _type: 'location',
    _id: 'location-nis',
    name: 'Niš',
    slug: { current: 'nis' },
    region: 'juzna-srbija',
    coordinates: { lat: 43.3209, lng: 21.8958 },
    marketAnalysis: {
      marketSize: 'medium',
      demandLevel: 'medium',
      competition: 'medium',
      priceMultiplier: 0.85
    },
    contactInfo: {
      phone: '+381 18 345 678',
      email: 'nis@srecno-ucenje.rs',
      address: 'Obrenovićeva 25, 18000 Niš',
      workingHours: 'Pon-Pet: 8:00-19:00'
    },
    isActive: true,
    order: 3
  },
  {
    _type: 'location',
    _id: 'location-kragujevac',
    name: 'Kragujevac',
    slug: { current: 'kragujevac' },
    region: 'sumadija',
    coordinates: { lat: 44.0125, lng: 20.9094 },
    marketAnalysis: {
      marketSize: 'medium',
      demandLevel: 'medium',
      competition: 'low',
      priceMultiplier: 0.9
    },
    contactInfo: {
      phone: '+381 34 234 567',
      email: 'kragujevac@srecno-ucenje.rs',
      address: 'Kralja Aleksandra 67, 34000 Kragujevac',
      workingHours: 'Pon-Pet: 8:00-19:00'
    },
    isActive: true,
    order: 4
  },
  {
    _type: 'location',
    _id: 'location-subotica',
    name: 'Subotica',
    slug: { current: 'subotica' },
    region: 'vojvodina',
    coordinates: { lat: 46.1006, lng: 19.6675 },
    marketAnalysis: {
      marketSize: 'small',
      demandLevel: 'medium',
      competition: 'low',
      priceMultiplier: 0.8
    },
    contactInfo: {
      phone: '+381 24 123 456',
      email: 'subotica@srecno-ucenje.rs',
      address: 'Korzo 12, 24000 Subotica',
      workingHours: 'Pon-Pet: 8:00-18:00'
    },
    isActive: true,
    order: 5
  },
  {
    _type: 'location',
    _id: 'location-pancevo',
    name: 'Pančevo',
    slug: { current: 'pancevo' },
    region: 'vojvodina',
    coordinates: { lat: 44.8704, lng: 20.6286 },
    marketAnalysis: {
      marketSize: 'small',
      demandLevel: 'medium',
      competition: 'low',
      priceMultiplier: 0.9
    },
    contactInfo: {
      phone: '+381 13 987 654',
      email: 'pancevo@srecno-ucenje.rs',
      address: 'Cara Dušana 8, 26000 Pančevo',
      workingHours: 'Pon-Pet: 8:00-19:00'
    },
    isActive: true,
    order: 6
  },
  {
    _type: 'location',
    _id: 'location-cacak',
    name: 'Čačak',
    slug: { current: 'cacak' },
    region: 'sumadija',
    coordinates: { lat: 43.8914, lng: 20.3497 },
    marketAnalysis: {
      marketSize: 'small',
      demandLevel: 'medium',
      competition: 'low',
      priceMultiplier: 0.8
    },
    contactInfo: {
      phone: '+381 32 876 543',
      email: 'cacak@srecno-ucenje.rs',
      address: 'Gradski trg 3, 32000 Čačak',
      workingHours: 'Pon-Pet: 8:00-18:00'
    },
    isActive: true,
    order: 7
  },
  {
    _type: 'location',
    _id: 'location-leskovac',
    name: 'Leskovac',
    slug: { current: 'leskovac' },
    region: 'juzna-srbija',
    coordinates: { lat: 42.9980, lng: 21.9461 },
    marketAnalysis: {
      marketSize: 'small',
      demandLevel: 'medium',
      competition: 'low',
      priceMultiplier: 0.75
    },
    contactInfo: {
      phone: '+381 16 765 432',
      email: 'leskovac@srecno-ucenje.rs',
      address: 'Bulevar oslobođenja 15, 16000 Leskovac',
      workingHours: 'Pon-Pet: 8:00-18:00'
    },
    isActive: true,
    order: 8
  },
  {
    _type: 'location',
    _id: 'location-valjevo',
    name: 'Valjevo',
    slug: { current: 'valjevo' },
    region: 'sumadija',
    coordinates: { lat: 44.2750, lng: 19.8900 },
    marketAnalysis: {
      marketSize: 'small',
      demandLevel: 'medium',
      competition: 'low',
      priceMultiplier: 0.8
    },
    contactInfo: {
      phone: '+381 14 654 321',
      email: 'valjevo@srecno-ucenje.rs',
      address: 'Karađorđeva 45, 14000 Valjevo',
      workingHours: 'Pon-Pet: 8:00-18:00'
    },
    isActive: true,
    order: 9
  },
  {
    _type: 'location',
    _id: 'location-zrenjanin',
    name: 'Zrenjanin',
    slug: { current: 'zrenjanin' },
    region: 'vojvodina',
    coordinates: { lat: 45.3839, lng: 20.3900 },
    marketAnalysis: {
      marketSize: 'small',
      demandLevel: 'medium',
      competition: 'low',
      priceMultiplier: 0.85
    },
    contactInfo: {
      phone: '+381 23 543 210',
      email: 'zrenjanin@srecno-ucenje.rs',
      address: 'Trg slobode 7, 23000 Zrenjanin',
      workingHours: 'Pon-Pet: 8:00-18:00'
    },
    isActive: true,
    order: 10
  }
];

// Function to create all sample data
async function populateSampleData() {
  console.log('🌱 Starting Srećno učenje sample data population...');
  
  try {
    // 1. Create site settings
    console.log('📝 Creating site settings...');
    await client.createOrReplace(siteSettings);
    
    // 2. Create navigation
    console.log('🧭 Creating navigation structure...');
    await client.createOrReplace(navigation);
    
    // 3. Create homepage
    console.log('🏠 Creating homepage content...');
    await client.createOrReplace(homePage);
    
    // 4. Create locations
    console.log('📍 Creating sample locations...');
    for (const location of sampleLocations) {
      await client.createOrReplace(location);
      console.log(`  ✅ Created location: ${location.name}`);
    }
    
    console.log('🎉 Sample data population completed successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Upload hero and location images through Sanity Studio');
    console.log('2. Create sample centers using the location references');
    console.log('3. Add sample educators and assign them to centers');
    console.log('4. Create FAQ entries and blog posts');
    console.log('');
    console.log('📊 Data created:');
    console.log(`- Site Settings: 1`);
    console.log(`- Navigation: 1`);
    console.log(`- Homepage: 1`);
    console.log(`- Locations: ${sampleLocations.length}`);
    
  } catch (error) {
    console.error('❌ Error populating sample data:', error);
    process.exit(1);
  }
}

// Export functions for individual use
module.exports = {
  populateSampleData,
  siteSettings,
  navigation,
  homePage,
  sampleLocations,
};

// Run if called directly
if (require.main === module) {
  populateSampleData();
}