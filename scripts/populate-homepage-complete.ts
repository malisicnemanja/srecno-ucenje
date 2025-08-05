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

async function populateHomepage() {
  console.log('🚀 Populating homepage with complete data...')

  try {
    const homepageData = {
      _type: 'homePage',
      _id: 'homePage',
      
      // Hero Section - COMPLETE
      heroSekcija: {
        _type: 'enhancedHero',
        title: 'Postanite deo najuspešnije obrazovne franšize u Srbiji',
        highlightText: 'najuspešnije obrazovne franšize',
        titleVariants: [
          'najboljeg obrazovnog sistema',
          'Srećno učenje porodice',
          'proverene metodologije',
          'budućnosti obrazovanja'
        ],
        subtitle: 'Srećno učenje - gde se znanje sreće sa radošću. Pridružite se mreži od 50+ uspešnih centara širom Srbije i ostvarite svoj san o sopstvenom obrazovnom biznisu.',
        
        // Animated Number
        animatedNumber: {
          target: 25000,
          suffix: '+ dece',
          duration: 3000
        },
        
        badge: 'Naučno zasnovana metodologija ✨',
        
        // Primary CTA
        primaryCta: {
          text: 'Započnite svoju priču',
          link: '/zakazivanje'
        },
        
        // Secondary CTA
        secondaryCta: {
          text: 'Istražite mogućnosti',
          link: '/fransiza'
        },
        
        // Features
        features: [
          {
            _key: 'feat1',
            icon: 'users',
            text: '50+ uspešnih centara'
          },
          {
            _key: 'feat2',
            icon: 'chart',
            text: 'ROI za 12-18 meseci'
          },
          {
            _key: 'feat3',
            icon: 'star',
            text: '98% zadovoljnih partnera'
          },
          {
            _key: 'feat4',
            icon: 'shield',
            text: '10 godina iskustva'
          }
        ],
        
        backgroundType: 'pattern',
        backgroundPattern: 'dots',
        
        // Trust Badges
        trustBadges: [
          {
            _key: 'tb1',
            _type: 'trustBadge',
            icon: 'certificate',
            text: 'Sertifikovana metodologija',
            link: '/metodologija'
          },
          {
            _key: 'tb2',
            _type: 'trustBadge',
            icon: 'award',
            text: 'Nagrađivani program',
            link: '/nagrade'
          },
          {
            _key: 'tb3',
            _type: 'trustBadge',
            icon: 'shield',
            text: 'Garancija kvaliteta',
            link: '/garancija'
          },
          {
            _key: 'tb4',
            _type: 'trustBadge',
            icon: 'users',
            text: 'Podrška 24/7',
            link: '/podrska'
          }
        ]
      },
      
      // Statistics Section
      statistics: [
        {
          _key: 'stat1',
          _type: 'statistic',
          value: '50+',
          label: 'Aktivnih centara',
          icon: '🏢'
        },
        {
          _key: 'stat2',
          _type: 'statistic',
          value: '25,000+',
          label: 'Srećne dece',
          icon: '👶'
        },
        {
          _key: 'stat3',
          _type: 'statistic',
          value: '95%',
          label: 'Stopa zadržavanja',
          icon: '📈'
        },
        {
          _key: 'stat4',
          _type: 'statistic',
          value: '250%',
          label: 'Prosečan ROI',
          icon: '💰'
        }
      ],
      
      // Why Srećno učenje Section
      whySrecnoUcenje: {
        sectionTitle: 'Zašto baš Srećno učenje?',
        differentiators: [
          {
            _key: 'diff1',
            _type: 'differentiator',
            title: 'Dokazana metodologija',
            description: 'Naša metodologija je razvijena kroz 10 godina rada sa preko 25,000 dece. Kombinuje najbolje svetske prakse sa lokalnim potrebama.',
            icon: '🎓'
          },
          {
            _key: 'diff2',
            _type: 'differentiator',
            title: 'Potpuna podrška',
            description: 'Od prvog dana dobijate kompletnu podršku - obuka, materijali, marketing, mentorstvo. Nikada niste sami.',
            icon: '🤝'
          },
          {
            _key: 'diff3',
            _type: 'differentiator',
            title: 'Brza isplativost',
            description: 'Naši partneri u proseku ostvaruju povrat investicije za 12-18 meseci. Transparentni model bez skrivenih troškova.',
            icon: '⚡'
          },
          {
            _key: 'diff4',
            _type: 'differentiator',
            title: 'Ekskluzivna teritorija',
            description: 'Svaki partner dobija ekskluzivnu teritoriju bez konkurencije iz naše mreže. Vaš uspeh je naš prioritet.',
            icon: '🗺️'
          }
        ]
      },
      
      // 4 Steps Timeline
      fourStepsTimeline: {
        sectionTitle: 'Vaš put do uspešne franšize',
        steps: [
          {
            _key: 'step1',
            _type: 'step',
            number: '1',
            title: 'Upoznavanje',
            description: 'Besplatna konsultacija gde upoznajete našu metodologiju, modele saradnje i odgovaramo na sva vaša pitanja.',
            icon: '💬'
          },
          {
            _key: 'step2',
            _type: 'step',
            number: '2',
            title: 'Obuka i priprema',
            description: 'Intenzivna obuka od 2 nedelje gde savladavate metodologiju, poslovne procese i marketing strategije.',
            icon: '📚'
          },
          {
            _key: 'step3',
            _type: 'step',
            number: '3',
            title: 'Otvaranje centra',
            description: 'Uz našu podršku otvarate svoj centar - od izbora lokacije, opremanja prostora do prve promocije.',
            icon: '🎉'
          },
          {
            _key: 'step4',
            _type: 'step',
            number: '4',
            title: 'Rast i razvoj',
            description: 'Kontinuirana podrška, mesečni mentoring, novi programi i zajednički marketing za stalni rast.',
            icon: '🚀'
          }
        ]
      },
      
      // Franchise Models Comparison
      franchiseModelsComparison: {
        sectionTitle: 'Modeli saradnje prilagođeni vama',
        models: [
          {
            _key: 'model1',
            _type: 'franchiseModel',
            name: 'Starter',
            price: '5,000€',
            description: 'Idealno za početnike koji žele da testiraju koncept',
            features: [
              'Licenca za korišćenje brenda',
              'Osnovna metodologija',
              'Online obuka (7 dana)',
              'Početni set materijala',
              'Email podrška'
            ],
            highlighted: false
          },
          {
            _key: 'model2',
            _type: 'franchiseModel',
            name: 'Professional',
            price: '10,000€',
            description: 'Najpopularniji model sa optimalnim odnosom cene i podrške',
            features: [
              'Sve iz Starter paketa',
              'Kompletna metodologija',
              'Obuka uživo (14 dana)',
              'Marketing materijali',
              'Mesečni mentoring',
              'Ekskluzivna teritorija',
              'CRM sistem'
            ],
            highlighted: true
          },
          {
            _key: 'model3',
            _type: 'franchiseModel',
            name: 'Premium',
            price: '15,000€',
            description: 'Maksimalna podrška za brzi rast i skaliranje',
            features: [
              'Sve iz Professional paketa',
              'Pomoć pri izboru lokacije',
              'Dizajn enterijera',
              'Web sajt i brending',
              'Nedeljni mentoring',
              '24/7 podrška',
              'Garancija uspeha*'
            ],
            highlighted: false
          }
        ]
      },
      
      // Success Stories Section
      successStories: {
        sectionTitle: 'Priče naših partnera',
        featuredVideo: 'https://youtube.com/watch?v=example',
        stories: [
          {
            _key: 'story1',
            name: 'Marija Petrović',
            role: 'Vlasnica franšize u Novom Sadu',
            location: 'Novi Sad',
            story: 'Posle 10 godina u korporaciji, želela sam promenu. Srećno učenje mi je pružilo priliku da radim ono što volim - rad sa decom, i istovremeno vodim uspešan biznis. Za godinu dana sam povratila investiciju i sada imam tim od 8 ljudi.',
            yearStarted: '2021',
            metric: {
              value: '150+',
              label: 'učenika mesečno'
            }
          },
          {
            _key: 'story2',
            name: 'Milan Jovanović',
            role: 'Vlasnik 3 franšize',
            location: 'Beograd',
            story: 'Počeo sam sa jednim centrom pre 3 godine. Danas imam tri centra i tim od 15 ljudi. Metodologija Srećnog učenja je ključ uspeha - rezultati govore sami za sebe. Deca napreduju, roditelji su zadovoljni, biznis raste.',
            yearStarted: '2020',
            metric: {
              value: '3',
              label: 'uspešna centra'
            }
          },
          {
            _key: 'story3',
            name: 'Ana Stojanović',
            role: 'Profesorka i franšizer',
            location: 'Kragujevac',
            story: 'Kao nastavnica sa 20 godina iskustva, prepoznala sam vrednost ove metodologije. Nije samo biznis - menjamo živote dece na bolje svaki dan. Podrška tima je neverovatna.',
            yearStarted: '2022',
            metric: {
              value: '98%',
              label: 'zadovoljnih roditelja'
            }
          }
        ]
      },
      
      // Home FAQs
      homeFaqs: {
        sectionTitle: 'Često postavljana pitanja',
        faqs: []
      },
      
      // Direct FAQs
      homeFaq: {
        sectionTitle: 'Najčešća pitanja o franšizi',
        faqs: [
          {
            _key: 'faq1',
            question: 'Kolika je početna investicija?',
            answer: 'Početna investicija zavisi od modela franšize koji izaberete. Naš Starter model počinje od 5.000€, Professional od 10.000€, dok Premium model sa potpunom podrškom iznosi 15.000€. U cenu je uključeno sve što vam je potrebno za početak.'
          },
          {
            _key: 'faq2',
            question: 'Kada mogu očekivati povrat investicije?',
            answer: 'Naši partneri u proseku ostvaruju povrat investicije za 12-18 meseci, zavisno od lokacije i angažovanja. Professional i Premium modeli imaju bržu stopu povrata zbog dodatne podrške.'
          },
          {
            _key: 'faq3',
            question: 'Da li je potrebno pedagoško iskustvo?',
            answer: 'Pedagoško iskustvo je prednost ali nije obavezno. Pružamo kompletnu obuku i kontinuiranu podršku svim partnerima. Važnije je da volite rad sa decom i da ste posvećeni.'
          },
          {
            _key: 'faq4',
            question: 'Kakvu podršku mogu očekivati?',
            answer: 'Podrška zavisi od modela koji izaberete. Svi modeli uključuju obuku i pristup metodologiji. Professional i Premium modeli imaju mentoring, marketing podršku i pomoć pri svim aspektima poslovanja.'
          },
          {
            _key: 'faq5',
            question: 'Da li mogu zadržati svoj posao?',
            answer: 'Da, mnogi naši partneri počinju franšizu kao dodatni posao. Sa dobrom organizacijom i timom, centar može uspešno da funkcioniše i bez vašeg stalnog prisustva.'
          }
        ]
      },
      
      // Interactive Classroom Preview
      interactiveClassroomPreview: {
        sectionTitle: 'Pogledajte kako izgleda naša učionica',
        description: 'Virtuelna šetnja kroz prostor dizajniran za inspiraciju i učenje. Svaki detalj je pažljivo osmišljen da podstiče kreativnost i radost učenja.',
        previewImage: null, // Treba dodati sliku
        ctaText: 'Istražite 3D učionicu'
      },
      
      // Free Resources
      freeResources: {
        sectionTitle: 'Besplatni resursi za početak',
        resources: [
          {
            _key: 'res1',
            title: 'Priručnik metodologije',
            description: 'Kompletan vodič kroz našu pedagošku metodologiju (50 strana)',
            fileUrl: '/downloads/metodologija-prirucnik.pdf',
            icon: '📚'
          },
          {
            _key: 'res2',
            title: 'Biznis plan template',
            description: 'Excel template sa projekcijama za prvih 3 godine',
            fileUrl: '/downloads/biznis-plan-template.xlsx',
            icon: '📊'
          },
          {
            _key: 'res3',
            title: 'Video prezentacija',
            description: '30-minutna prezentacija kompletnog sistema',
            fileUrl: 'https://youtube.com/watch?v=presentation',
            icon: '🎥'
          },
          {
            _key: 'res4',
            title: 'Priče uspeha eBook',
            description: '10 inspirativnih priča naših partnera',
            fileUrl: '/downloads/price-uspeha-ebook.pdf',
            icon: '📖'
          }
        ]
      },
      
      // Newsletter Section
      newsletterSection: {
        title: 'Budite u toku sa prilikama',
        description: 'Primajte ekskluzivne informacije o franšizi, uspešne priče i savete direktno u inbox.',
        incentive: 'Besplatan vodič: "10 koraka do uspešne obrazovne franšize"',
        ctaText: 'Prijavite se besplatno'
      },
      
      // Newsletter CTA
      newsletterCta: {
        title: 'Ne propustite priliku vašeg života',
        description: 'Pridružite se 500+ pretplatnika koji već grade svoje obrazovne centre',
        incentive: 'BONUS: Dobijte 10% popusta na bilo koji paket franšize',
        ctaText: 'Da, želim da počnem'
      },
      
      // SEO
      seo: {
        _type: 'seo',
        metaTitle: 'Franšiza Srećno učenje - Obrazovna franšiza #1 u Srbiji | ROI 12-18 meseci',
        metaDescription: 'Postanite deo najuspešnije obrazovne franšize u Srbiji. 50+ centara, 25,000+ dece, garancija uspeha. Investicija od 5,000€. Zakažite besplatnu konsultaciju danas.',
        keywords: [
          'franšiza srbija',
          'obrazovna franšiza',
          'srećno učenje',
          'franšiza za početnike',
          'biznis prilika',
          'obrazovni centar',
          'investicija u obrazovanje',
          'sopstveni biznis',
          'rad sa decom',
          'metodologija učenja'
        ]
      }
    }

    // Create or update the homepage
    await client.createOrReplace(homepageData)
    
    console.log('✅ Successfully populated homepage with all data!')
    console.log('\n📊 Summary:')
    console.log('- Hero section: Complete with all fields')
    console.log('- Statistics: 4 items')
    console.log('- Why section: 4 differentiators')
    console.log('- Timeline: 4 steps')
    console.log('- Models: 3 franchise models')
    console.log('- Stories: 3 success stories')
    console.log('- FAQs: 5 questions')
    console.log('- Resources: 4 free downloads')
    console.log('- Newsletter: Both sections configured')
    console.log('- SEO: Optimized meta tags')
    
  } catch (error) {
    console.error('❌ Error populating homepage:', error)
    process.exit(1)
  }
}

// Run the population
populateHomepage().then(() => {
  console.log('\n🎉 Homepage fully populated! Check your Sanity Studio.')
})