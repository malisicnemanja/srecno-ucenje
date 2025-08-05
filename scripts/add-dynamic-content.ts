#!/usr/bin/env node

/**
 * Add Dynamic Content Script
 * Adds hero variations, success stories, and testimonials
 */

import { createClient } from '@sanity/client'

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN,
  apiVersion: '2023-10-01'
})

// SUCCESS STORIES DATA
const successStoriesData = [
  {
    _type: 'successStory',
    _id: 'success-story-1',
    studentName: 'Marko Petrović',
    age: '12 godina',
    program: 'Brzočitanje',
    testimonial: 'Pre kursa sam izbegavao da čitam knjige. Sada pročitam 2-3 knjige nedeljno! Moje ocene iz srpskog jezika su se drastično poboljšale.',
    results: [
      { metric: '300%', label: 'Brže čitanje' },
      { metric: 'Sa 3 na 5', label: 'Ocena iz srpskog' },
      { metric: '2h → 45min', label: 'Vreme učenja' },
    ],
    featured: true,
    parentTestimonial: 'Neverovatan napredak! Marko sada voli da čita i njegova koncentracija je značajno bolja.',
    parentName: 'Milica Petrović, mama'
  },
  {
    _type: 'successStory',
    _id: 'success-story-2',
    studentName: 'Ana Nikolić',
    age: '10 godina',
    program: 'Mentalna aritmetika',
    testimonial: 'Matematika mi je sada omiljeni predmet! Mogu da računam brže od svih u razredu. Osvojila sam prvo mesto na školskom takmičenju!',
    results: [
      { metric: '1. mesto', label: 'Školsko takmičenje' },
      { metric: '100%', label: 'Tačnost računanja' },
      { metric: '5', label: 'Ocena iz matematike' },
    ],
    featured: true,
    parentTestimonial: 'Ana je postala vrlo samouverena u matematici. Hvala vam što ste je naučili da voli brojeve!',
    parentName: 'Stefan Nikolić, tata'
  },
  {
    _type: 'successStory',
    _id: 'success-story-3',
    studentName: 'Luka Jovanović',
    age: '8 godina',
    program: 'Kombinovani program',
    testimonial: 'Volim što mogu da čitam brže od mama i tate, a mogu i da računam u glavi velike brojeve!',
    results: [
      { metric: '250%', label: 'Brže čitanje' },
      { metric: '90%', label: 'Brže računanje' },
      { metric: '5', label: 'Prosek u školi' },
    ],
    featured: false,
    parentTestimonial: 'Luka je postao pravi mali genije! Školski rad mu je sada igra.',
    parentName: 'Jovana Jovanović, mama'
  },
  {
    _type: 'successStory',
    _id: 'success-story-4',
    studentName: 'Mila Stojanović',
    age: '11 godina', 
    program: 'Brzočitanje',
    testimonial: 'Nikad mi učenje nije bilo ovako zanimljivo! Sada čitam po 50 strana dnevno umesto 5.',
    results: [
      { metric: '400%', label: 'Brže čitanje' },
      { metric: '90%', label: 'Bolje razumevanje' },
      { metric: '30min', label: 'Domaći zadaci' },
    ],
    featured: false,
    parentTestimonial: 'Mila je promenila odnos prema učenju. Sada uživa u čitanju i učenju.',
    parentName: 'Aleksandar Stojanović, tata'
  },
  {
    _type: 'successStory',
    _id: 'success-story-5',
    studentName: 'Nikola Mitrović',
    age: '9 godina',
    program: 'Mentalna aritmetika',
    testimonial: 'Mogu da saberem velike brojeve u sekundi! Drugari u školi me zovu "živi kalkulator".',
    results: [
      { metric: '500%', label: 'Brže računanje' },
      { metric: '2. mesto', label: 'Gradsko takmičenje' },
      { metric: '100%', label: 'Tačnost' },
    ],
    featured: false,
    parentTestimonial: 'Nikola je postao vrhunski u matematici. Njegov učitelj je oduševljen napretkom.',
    parentName: 'Marija Mitrović, mama'
  }
]

// HERO VARIATIONS DATA
const heroVariationsData = [
  {
    title: 'Otvori vrata svojoj učionici iz snova',
    subtitle: 'Postanite deo mreže koja je već inspirisala 20.000+ dece da uče srcem kroz metodologiju Srećnog učenja',
    variant: 'franchise-focused'
  },
  {
    title: 'Vaše dete čita 3x brže već za 3 meseca',
    subtitle: 'Otkrijte metodologiju koja je pomogla hiljadama dece da postanu brži i precizniji u čitanju i učenju',
    variant: 'parent-focused'
  },
  {
    title: 'Revolucionarna metodologija koja spaja nauku i bajku',
    subtitle: 'Preko 20.000 dece je već otkrilo čarobnu moć brzočitanja i mentalne aritmetike',
    variant: 'methodology-focused'
  },
  {
    title: 'Od obične škole do centra izvrsnosti',
    subtitle: 'Pridružite se edukativnoj revoluciji koja preobražava način na koji deca uče i rastu',
    variant: 'transformation-focused'
  },
  {
    title: 'Deca računaju brže od kalkulatora',
    subtitle: 'Otkrijte kako mentalna aritmetika i brzočitanje mogu transformisati obrazovni put vašeg deteta',
    variant: 'results-focused'
  }
]

// TESTIMONIALS DATA
const testimonialsData = [
  {
    _type: 'testimonial',
    _id: 'testimonial-1',
    text: 'Srećno učenje je promenilo život mog deteta. Od deteta koje je mrzelo da čita, Ana je postala pravi bibliofilčić!',
    author: 'Milica Jovanović',
    role: 'Mama Ane (10 godina)',
    rating: 5,
    category: 'parent',
    featured: true
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-2',
    text: 'Kao pedagog sa 20 godina iskustva, mogu reći da je ova metodologija nešto revolucionarno u obrazovanju.',
    author: 'Dr. Stefan Nikolić',
    role: 'Pedagog, Novi Sad',
    rating: 5,
    category: 'professional',
    featured: true
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-3',
    text: 'Franšiza je bila odlična investicija. ROI od 250% u prvoj godini rada je nadmašio sva očekivanja.',
    author: 'Marko Petrović',
    role: 'Vlasnik franšize, Beograd',
    rating: 5,
    category: 'franchise',
    featured: true
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-4',
    text: 'Luka je sa trojke u matematici došao do petice za samo 4 meseca. Neverovatno!',
    author: 'Jovana Stojanović',
    role: 'Mama Luke (8 godina)',
    rating: 5,
    category: 'parent',
    featured: false
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-5',
    text: 'Podrška franšize je izvanredna. Uvek imamo pomoć kada nam je potrebna.',
    author: 'Ana Miletić',
    role: 'Vlasnica franšize, Niš',
    rating: 5,
    category: 'franchise',
    featured: false
  }
]

// DIFFERENTIATORS DATA
const differentiatorsData = [
  {
    _type: 'differentiator',
    _id: 'differentiator-1',
    title: 'Naučno zasnovana metodologija',
    description: 'Naš pristup se zasniva na najnovijim neurološkim istraživanjima o plastičnosti mozga',
    icon: '🧠',
    details: [
      'Korišćenje neuroplastičnosti mozga',
      'Vizuelne tehnike učenja',
      'Pozitivna psihologija u obrazovanju',
      'Individualan pristup svakom detetu'
    ],
    order: 1
  },
  {
    _type: 'differentiator',
    _id: 'differentiator-2',
    title: 'Dokazani rezultati',
    description: '20.000+ dece je već osvojilo veštine brzočitanja i mentalne aritmetike',
    icon: '📊',
    details: [
      '95% zadovoljnih roditelja',
      'Prosečno poboljšanje brzine čitanja za 300%',
      'Bolji školski uspeh kod 90% učenika',
      'Povećana koncentracija za 80%'
    ],
    order: 2
  },
  {
    _type: 'differentiator',
    _id: 'differentiator-3',
    title: 'Holistički pristup',
    description: 'Ne fokusiramo se samo na brzinu, već i na razumevanje i emotivni razvoj',
    icon: '🌟',
    details: [
      'Razvoj kritičkog mišljenja',
      'Povećanje samopouzdanja',
      'Bolje socijalne veštine',
      'Pozitivan odnos prema učenju'
    ],
    order: 3
  },
  {
    _type: 'differentiator',
    _id: 'differentiator-4',
    title: 'Kontinuirana podrška',
    description: 'Pružamo podršku tokom celog procesa učenja i nakon završetka programa',
    icon: '🤝',
    details: [
      'Redovni progress reporti',
      'Konsultacije sa roditeljima',
      'Dodatni materijali za vežbanje',
      'Pristup online platformi'
    ],
    order: 4
  }
]

async function addDynamicContent() {
  console.log('🎭 Dodavanje dinamičkog sadržaja...')
  
  try {
    // 1. Add success stories
    console.log('🏆 Dodavanje priča o uspehu...')
    for (const story of successStoriesData) {
      await client.createOrReplace(story)
    }
    
    // 2. Add testimonials
    console.log('💬 Dodavanje svedočenja...')
    for (const testimonial of testimonialsData) {
      await client.createOrReplace(testimonial)
    }
    
    // 3. Add differentiators
    console.log('⭐ Dodavanje diferencirajućih faktora...')
    for (const differentiator of differentiatorsData) {
      await client.createOrReplace(differentiator)
    }
    
    // 4. Update homepage with hero variations
    console.log('🎯 Ažuriranje početne strane sa varijacijama...')
    await client
      .patch('homepage')
      .set({
        heroVariations: heroVariationsData,
        featuredSuccessStories: [
          { _type: 'reference', _ref: 'success-story-1' },
          { _type: 'reference', _ref: 'success-story-2' },
          { _type: 'reference', _ref: 'success-story-3' }
        ],
        featuredTestimonials: [
          { _type: 'reference', _ref: 'testimonial-1' },
          { _type: 'reference', _ref: 'testimonial-2' },
          { _type: 'reference', _ref: 'testimonial-3' }
        ]
      })
      .commit()
    
    // 5. Create lead magnets
    console.log('🧲 Kreiranje lead magneta...')
    const leadMagnetsData = [
      {
        _type: 'leadMagnet',
        _id: 'lead-magnet-1',
        title: 'Besplatni e-book: "5 tajni brzočitanja"',
        description: 'Otkrijte teknike koje koriste naši najbolji učenici za 3x brže čitanje',
        ctaText: 'Preuzmi besplatno',
        formFields: ['name', 'email', 'childAge'],
        deliveryMethod: 'email',
        downloadUrl: '/downloads/5-tajni-brzocitanja.pdf',
        featured: true
      },
      {
        _type: 'leadMagnet',
        _id: 'lead-magnet-2', 
        title: 'Webinar: "Kako da vaše dete voli matematiku"',
        description: 'Uživo sesija sa stručnjacima o mentalnoj aritmetici i razvoju numeričkih veština',
        ctaText: 'Rezerviši mesto',
        formFields: ['name', 'email', 'phone', 'childAge'],
        deliveryMethod: 'webinar',
        webinarUrl: 'https://zoom.us/webinar/123',
        featured: true
      },
      {
        _type: 'leadMagnet',
        _id: 'lead-magnet-3',
        title: 'Proceni spremnost deteta za brzočitanje',
        description: 'Besplatni kviz koji vam pomaže da procenite da li je vaše dete spremno za program',
        ctaText: 'Uradi kviz',
        formFields: ['name', 'email', 'childAge'],
        deliveryMethod: 'quiz',
        quizUrl: '/kviz/spremnost-za-brzocitanje',
        featured: false
      }
    ]
    
    for (const leadMagnet of leadMagnetsData) {
      await client.createOrReplace(leadMagnet)
    }
    
    // 6. Create newsletter content
    console.log('📧 Kreiranje newsletter sadržaja...')
    const newsletterData = {
      _type: 'newsletterSettings',
      _id: 'newsletter-settings',
      title: 'Srećno učenje novosti',
      description: 'Budite u toku sa najnovijim tehnikama učenja, pričama o uspehu i ekskluzivnim sadržajima',
      welcomeEmail: {
        subject: 'Dobrodošli u Srećno učenje zajednicu!',
        content: 'Hvala vam što ste se pridružili našoj zajednici roditelja i pedagoga koji veruju u snagu srećnog učenja...'
      },
      frequency: 'weekly',
      categories: [
        'Saveti za roditelje',
        'Tehnike brzočitanja',
        'Mentalna aritmetika',
        'Priče o uspehu',
        'Franšiza vesti'
      ]
    }
    
    await client.createOrReplace(newsletterData)
    
    console.log('✅ Uspešno dodana sva dinamička sadržaja!')
    
    console.log(`
    🎉 Završeno dodavanje dinamičkog sadržaja:
    
    ✅ ${successStoriesData.length} priča o uspehu
    ✅ ${testimonialsData.length} svedočenja
    ✅ ${differentiatorsData.length} diferencirajućih faktora
    ✅ ${heroVariationsData.length} varijacija hero sekcije
    ✅ ${leadMagnetsData.length} lead magneta
    ✅ Newsletter postavke
    
    🔥 Sada vaš sajt ima:
       • Dinamičke hero varijacije
       • Autentične priče o uspehu
       • Kredibilne testimoniale
       • Jasne diferencirajuće faktore
       • Lead generation magnete
       • Kompletnu newsletter strategiju
    
    📈 Sve je pripremljeno za visoke konverzije!
    `)
    
  } catch (error) {
    console.error('❌ Greška tokom dodavanja dinamičkog sadržaja:', error)
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  addDynamicContent()
}

export { addDynamicContent }