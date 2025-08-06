const { createClient } = require('@sanity/client')

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03'
})

const franchiseContent = {
  // Franchise Fields - Opšti podaci
  generalFields: [
    {
      _type: 'franchiseField',
      label: 'Ime i prezime',
      fieldId: 'ime_prezime',
      type: 'text',
      placeholder: 'Unesite vaše puno ime',
      helpText: 'Unesite vaše ime i prezime kako stoji u ličnim dokumentima',
      isRequired: true,
      validation: {
        minLength: 2,
        maxLength: 50,
        customErrorMessage: 'Ime i prezime mora imati između 2 i 50 karaktera'
      },
      order: 1,
      width: 'half'
    },
    {
      _type: 'franchiseField',
      label: 'Email adresa',
      fieldId: 'email',
      type: 'email',
      placeholder: 'vasa.email@domen.com',
      helpText: 'Unesite valjan email koji redovno proveravate',
      isRequired: true,
      validation: {
        customErrorMessage: 'Molimo unesite valjan email format'
      },
      order: 2,
      width: 'half'
    },
    {
      _type: 'franchiseField',
      label: 'Broj telefona',
      fieldId: 'telefon',
      type: 'tel',
      placeholder: '+381 XX XXX XXXX',
      helpText: 'Unesite broj mobilnog telefona',
      isRequired: true,
      order: 3,
      width: 'half'
    },
    {
      _type: 'franchiseField',
      label: 'Trenutno zanimanje',
      fieldId: 'zanimanje',
      type: 'text',
      placeholder: 'npr. Nastavnik, Menadžer, Preduzetnik...',
      helpText: 'Opišite vašu trenutnu profesiju ili oblast rada',
      isRequired: true,
      order: 4,
      width: 'half'
    },
    {
      _type: 'franchiseField',
      label: 'Nivo obrazovanja',
      fieldId: 'obrazovanje',
      type: 'select',
      helpText: 'Izaberite vaš najviši stepen završenog obrazovanja',
      isRequired: true,
      order: 5,
      width: 'half',
      options: [
        { label: 'Srednja škola', value: 'srednja_skola' },
        { label: 'Viša škola', value: 'visa_skola' },
        { label: 'Fakultet (diplomirani)', value: 'fakultet' },
        { label: 'Master studije', value: 'master' },
        { label: 'Doktorske studije', value: 'doktorat' }
      ]
    },
    {
      _type: 'franchiseField',
      label: 'Godine radnog iskustva',
      fieldId: 'iskustvo',
      type: 'select',
      helpText: 'Koliko godina imate ukupnog radnog iskustva',
      isRequired: true,
      order: 6,
      width: 'half',
      options: [
        { label: 'Manje od 1 godine', value: '0-1' },
        { label: '1-3 godine', value: '1-3' },
        { label: '3-5 godina', value: '3-5' },
        { label: '5-10 godina', value: '5-10' },
        { label: 'Više od 10 godina', value: '10+' }
      ]
    },
    {
      _type: 'franchiseField',
      label: 'Željena lokacija franšize',
      fieldId: 'lokacija',
      type: 'text',
      placeholder: 'Grad ili opština...',
      helpText: 'U kom gradu/opštini planirate da otvorite franšizu',
      isRequired: true,
      order: 7,
      width: 'full'
    }
  ],

  // Franchise Fields - Motivacija
  motivationFields: [
    {
      _type: 'franchiseField',
      label: 'Zašto želite da otvorite franšizu Srećno učenje?',
      fieldId: 'motivacija_razlog',
      type: 'textarea',
      placeholder: 'Opišite vašu motivaciju u nekoliko rečenica...',
      helpText: 'Želimo da čujemo vašu iskrenu priču o tome što vas pokreće',
      isRequired: true,
      validation: {
        minLength: 100,
        maxLength: 1000,
        customErrorMessage: 'Odgovor treba da ima između 100 i 1000 karaktera'
      },
      order: 1,
      width: 'full'
    },
    {
      _type: 'franchiseField',
      label: 'Kakvo iskustvo imate sa decom/edukacijom?',
      fieldId: 'iskustvo_edukacija',
      type: 'textarea',
      placeholder: 'Opišite vaše iskustvo u radu sa decom ili u edukaciji...',
      helpText: 'Ukljutite formalno i neformalno iskustvo',
      isRequired: true,
      validation: {
        minLength: 50,
        maxLength: 800
      },
      order: 2,
      width: 'full'
    },
    {
      _type: 'franchiseField',
      label: 'Vaši ciljevi za prvih 12 meseci',
      fieldId: 'ciljevi_godina',
      type: 'textarea',
      placeholder: 'Šta želite da postignete u prvoj godini rada...',
      helpText: 'Konkretni, merljivi ciljevi koje planirate da ostvarite',
      isRequired: true,
      order: 3,
      width: 'full'
    },
    {
      _type: 'franchiseField',
      label: 'Dostupno vreme nedeljno',
      fieldId: 'dostupno_vreme',
      type: 'select',
      helpText: 'Koliko sati nedeljno možete da posvetite franšizi',
      isRequired: true,
      order: 4,
      width: 'half',
      options: [
        { label: 'Do 10 sati (part-time)', value: '0-10' },
        { label: '10-20 sati', value: '10-20' },
        { label: '20-30 sati', value: '20-30' },
        { label: '30-40 sati (full-time)', value: '30-40' },
        { label: 'Više od 40 sati', value: '40+' }
      ]
    },
    {
      _type: 'franchiseField',
      label: 'Planirani početni budžet',
      fieldId: 'budjet',
      type: 'select',
      helpText: 'Koliko novca možete da izdvojite za početak',
      isRequired: true,
      order: 5,
      width: 'half',
      options: [
        { label: 'Do 2.000€', value: '0-2000' },
        { label: '2.000€ - 5.000€', value: '2000-5000' },
        { label: '5.000€ - 10.000€', value: '5000-10000' },
        { label: 'Više od 10.000€', value: '10000+' },
        { label: 'Još uvek ne znam', value: 'unknown' }
      ]
    }
  ],

  // Franchise Sections
  sections: [
    {
      _type: 'franchiseSection',
      title: 'Opšti podaci',
      subtitle: 'Hajde da se upoznamo',
      description: 'U ovom delu želimo da Vas upoznamo kao osobu, gde radite, šta Vas pokreće i kakvo je Vaše iskustvo. Ovi podaci nam pomažu da bolje razumemo Vaš profil.',
      sectionId: 'general-info',
      icon: 'user',
      order: 1,
      isRequired: true,
      progressWeight: 40,
      helpText: 'Molimo vas da budete precizni jer će ovi podaci biti korišćeni tokom celog procesa.'
    },
    {
      _type: 'franchiseSection',
      title: 'Motivacija i ideja',
      subtitle: 'Zašto baš Vi i zašto baš sada?',
      description: 'Ovde želimo da čujemo Vašu priču - šta Vas motiviše, kakvi su Vaši planovi i kako vidite sebe u ulozi franšiize Srećno učenje.',
      sectionId: 'motivation',
      icon: 'target',
      order: 2,
      isRequired: true,
      progressWeight: 60,
      helpText: 'Budite iskreni i detaljni - ovo nam pomaže da procenimo da li ste pravi kandidat.',
      validationRules: {
        minRequiredFields: 4,
        customValidationMessage: 'Molimo popunite sve motivacione odgovore da biste nastavili.'
      }
    }
  ],

  // Motivational Content
  motivationalContent: {
    _type: 'franchiseMotivational',
    title: 'Pridružite se najvećoj edukacionoj mreži u Srbiji',
    subtitle: 'Postanite deo uspešne priče Srećno učenje',
    description: 'Franšiza Srećno učenje vam omogućava da pokrenete svoj edukacijski biznis uz podršku dokazane metodologije, kontinuiranu obuku i marketing podršku iskusnog tima.',
    statistics: [
      {
        number: '127',
        label: 'aktivnih franšiza',
        icon: 'franchise',
        suffix: '+'
      },
      {
        number: '15,000',
        label: 'zadovoljnih polaznika',
        icon: 'users',
        suffix: '+'
      },
      {
        number: '450',
        label: 'sertifikovanih edukatora',
        icon: 'educators',
        suffix: '+'
      },
      {
        number: '4.9',
        label: 'prosečna ocena',
        icon: 'rating',
        suffix: '/5'
      }
    ],
    testimonials: [
      {
        name: 'Milica Stanković',
        location: 'Novi Sad',
        quote: 'Prelazak iz korporativnog sveta u obrazovanje kroz Srećno učenje bila je najbolja odluka moje karijere. Za godinu dana sam izgradila stabilnu bazu od preko 80 polaznika.',
        role: 'Vlasnik franšize Novi Sad Centar',
        rating: 5
      },
      {
        name: 'Ana Marić',
        location: 'Kragujevac',
        quote: 'Metodologija Srećnog učenja dala mi je strukturu koju sam tražila. Deca napreduju brže nego što sam očekivala, a roditelji su prezadovoljni rezultatima.',
        role: 'Franšiza Kragujevac',
        rating: 5
      },
      {
        name: 'Marko Jovanović',
        location: 'Niš',
        quote: 'Kontinuirana podrška tima i kvalitetni materijali omogućili su mi da se fokusiram na ono što volim - rad sa decom. Biznis se vodi gotovo sam.',
        role: 'Franšiza Niš Medijana',
        rating: 5
      }
    ],
    benefits: [
      {
        title: 'Sveobuhvatna obuka',
        description: 'Kompletna obuka za metodologiju, upravljanje biznisom i rad sa roditeljima',
        icon: 'education'
      },
      {
        title: 'Marketing podrška',
        description: 'Готови marketinški materijali, web prezentacija i društvene mreže',
        icon: 'marketing'
      },
      {
        title: 'Kontinuirana podrška',
        description: 'Stalan kontakt sa timom, mesečni sastanci i dodatne obuke',
        icon: 'support'
      },
      {
        title: 'Dokazana profitabilnost',
        description: 'Preko 90% franšiza postiže profitabilnost u prvoj godini rada',
        icon: 'finance'
      },
      {
        title: 'Fleksibilnost rada',
        description: 'Možete raditi part-time ili full-time, prilagodite posao svom ritmu',
        icon: 'business'
      },
      {
        title: 'Jaka mreža kolega',
        description: 'Pristup zajednici od preko 450 edukatora širom Srbije',
        icon: 'network'
      }
    ],
    ctaSection: {
      title: 'Spremni ste za sledeći korak?',
      description: 'Pridružite se mreži uspešnih edukatora i započnite svoju franšizu priču već danas. Proces prijave traje samo 10 minuta.',
      primaryButton: {
        text: 'Prijavite se sada',
        action: 'scroll_to_form'
      },
      secondaryButton: {
        text: 'Saznajte više o franšizi',
        link: '/fransize'
      }
    },
    faqSection: {
      title: 'Najčešće postavljana pitanja',
      items: [
        {
          question: 'Koliko novca je potrebno za početak?',
          answer: 'Početna investicija se kreće od 2.000 do 5.000 evra, što pokriva licencnu naknadu, početni materijal i marketing podrušku za prvih 6 meseci.'
        },
        {
          question: 'Da li moram da imam iskustvo u edukaciji?',
          answer: 'Ne morate imati formalno iskustvo. Naša obuka pokriva sve što vam je potrebno - od metodologije rada sa decom do upravljanja biznisom.'
        },
        {
          question: 'Koliko vremena treba da se franšiza pokrene?',
          answer: 'Od potpisivanja ugovora do prve grupe polaznika prođe obično 4-6 nedelja, u zavisnosti od vašeg tempa i lokalne tražnje.'
        },
        {
          question: 'Kakvu podršku dobijam tokom rada?',
          answer: 'Kontinuiranu podršku kroz mesečne sastanke, pristup bazi materijala, marketing podršku i direktnu komunikaciju sa timom.'
        }
      ]
    }
  },

  // Main Franchise Application
  application: {
    _type: 'franchiseApplication',
    title: 'Prijava za franšizu Srećno učenje',
    subtitle: 'Počnite vašu edukacionu priču',
    description: 'Pridružite se mreži od preko 450 edukatora širom Srbije i pokrenite uspešan edukacioni biznis uz našu podršku.',
    slug: { _type: 'slug', current: 'prijava-za-franshizu' },
    successMessage: {
      title: 'Uspešno ste poslali prijavu!',
      message: 'Vaša prijava je uspešno poslata. Naš tim će je proveriti i kontaktirati vas u roku od 48 sati sa sledećim koracima.',
      nextSteps: [
        'Proverićemo vašu prijavu i dokumentaciju',
        'Zakazaćemo uvodni razgovor preko video poziva',
        'Poslati ćemo vam detaljne informacije o franšizi',
        'Organizovati ćemo upoznavanje sa lokalnm franšizama'
      ]
    },
    formSettings: {
      submitButtonText: 'Pošaljite prijavu',
      requiredFieldsNote: '* Sva polja označena zvezdicom su obavezna',
      privacyNote: 'Vaši podaci su bezbedni i neće biti prosleđivani trećim licima. Koristićemo ih isključivo za proces prijave za franšizu.'
    },
    seo: {
      title: 'Prijava za franšizu Srećno učenje - Pokrenite svoj edukacioni biznis',
      description: 'Pridružite se mreži od preko 450 edukatora i pokrenite profitabilan edukacioni biznis. Sveobuhvatna podrška, dokazana metodologija.',
      keywords: ['franšiza', 'edukacija', 'Srećno učenje', 'biznis', 'deca', 'kursevi']
    }
  }
}

async function seedFranchiseContent() {
  console.log('🚀 Pokretanje seed procesa za franšizu sadržaj...')

  try {
    // Create franchise fields first
    console.log('📝 Kreiram polja za opšte podatke...')
    const generalFields = []
    for (const field of franchiseContent.generalFields) {
      const result = await client.create(field)
      generalFields.push(result)
      console.log(`✅ Kreiran field: ${field.label}`)
    }

    console.log('💭 Kreiram polja za motivaciju...')
    const motivationFields = []
    for (const field of franchiseContent.motivationFields) {
      const result = await client.create(field)
      motivationFields.push(result)
      console.log(`✅ Kreiran field: ${field.label}`)
    }

    // Create franchise sections with references to fields
    console.log('📑 Kreiram sekcije...')
    const sections = []
    
    // General info section
    const generalSection = {
      ...franchiseContent.sections[0],
      fields: generalFields.map(field => ({
        _type: 'reference',
        _ref: field._id
      }))
    }
    const generalSectionResult = await client.create(generalSection)
    sections.push(generalSectionResult)
    console.log(`✅ Kreirana sekcija: ${generalSection.title}`)

    // Motivation section
    const motivationSection = {
      ...franchiseContent.sections[1],
      fields: motivationFields.map(field => ({
        _type: 'reference',
        _ref: field._id
      }))
    }
    const motivationSectionResult = await client.create(motivationSection)
    sections.push(motivationSectionResult)
    console.log(`✅ Kreirana sekcija: ${motivationSection.title}`)

    // Create motivational content
    console.log('🎯 Kreiram motivacioni sadržaj...')
    const motivationalResult = await client.create(franchiseContent.motivationalContent)
    console.log(`✅ Kreiran motivacioni sadržaj`)

    // Create main application with references
    console.log('🏗️ Kreiram glavnu aplikaciju...')
    const application = {
      ...franchiseContent.application,
      sections: sections.map(section => ({
        _type: 'reference',
        _ref: section._id
      })),
      motivationalContent: {
        _type: 'reference',
        _ref: motivationalResult._id
      }
    }
    
    const applicationResult = await client.create(application)
    console.log(`✅ Kreirana aplikacija: ${application.title}`)

    console.log('🎉 Seed proces uspešno završen!')
    console.log('\n📊 Kreiran sadržaj:')
    console.log(`- ${generalFields.length} polja za opšte podatke`)
    console.log(`- ${motivationFields.length} polja za motivaciju`)
    console.log(`- ${sections.length} sekcije`)
    console.log(`- 1 motivacioni sadržaj sa ${franchiseContent.motivationalContent.testimonials.length} testimonijala`)
    console.log(`- 1 glavna aplikacija`)

    return {
      success: true,
      data: {
        application: applicationResult,
        sections,
        fields: [...generalFields, ...motivationFields],
        motivational: motivationalResult
      }
    }

  } catch (error) {
    console.error('❌ Greška tokom seed procesa:', error)
    return { success: false, error }
  }
}

// Run if called directly
if (require.main === module) {
  seedFranchiseContent()
    .then((result) => {
      if (result.success) {
        console.log('\n✨ Franchise sadržaj je uspešno kreiran u Sanity!')
        process.exit(0)
      } else {
        console.error('\n💥 Seed proces neuspešan')
        process.exit(1)
      }
    })
    .catch((error) => {
      console.error('💥 Neočekivana greška:', error)
      process.exit(1)
    })
}

module.exports = { seedFranchiseContent, franchiseContent }