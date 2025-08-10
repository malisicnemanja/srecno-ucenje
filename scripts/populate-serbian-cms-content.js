/**
 * POPULATE SERBIAN CMS CONTENT SCRIPT
 * 
 * Popunjava Sanity CMS sa kvalitetnim srpskim sadržajem za obrazovnu franšizu
 * Uključuje: Home Page, FAQ kategorije i pitanja, i sve potrebne sekcije
 */

const { sanityClient, validateClient } = require('./sanity-client');

// Kvalitetan srpski sadržaj za obrazovnu franšizu
const contentData = {
  // HOME PAGE SADRŽAJ
  homePage: {
    enhancedHero: {
      layout: 'centered',
      title: 'Transformišite obrazovanje u vašoj zajednici',
      highlightText: 'transformišite',
      titleVariants: [
        'revolucioniraćete',
        'poboljšaćete',
        'unapredićete',
        'modernizujete'
      ],
      brushStrokeWords: ['transformišite', 'obrazovanje'],
      animationSettings: {
        enableBrushStrokes: true,
        enableTextRotation: true,
        brushStrokeColor: '#FDD835',
        rotationSpeed: 3000,
        brushStrokeDelay: 1000
      },
      subtitle: 'Postanite deo najveće mreže obrazovnih centara u Srbiji. Više od 20.000 dece je već doživelo radost učenja kroz našu jedinstvenu metodologiju.',
      animatedNumber: {
        target: 20000,
        suffix: '+ dece',
        duration: 2500
      },
      badge: 'Franšiza #1 u obrazovanju',
      primaryCta: {
        text: 'Počnite svoju priču',
        href: '/franchise-application'
      },
      secondaryCta: {
        text: 'Pogledajte naše centre',
        href: '/centri'
      },
      features: [
        {
          icon: 'star',
          text: 'Dokazana metodologija'
        },
        {
          icon: 'users',
          text: '50+ partnera u Srbiji'
        },
        {
          icon: 'chart',
          text: '95% zadovoljstvo roditelja'
        },
        {
          icon: 'award',
          text: 'Brend godine 2023'
        }
      ],
      backgroundType: 'pattern',
      backgroundPattern: 'dots',
      trustBadges: [
        {
          icon: 'shield',
          text: 'Licencirani program'
        },
        {
          icon: 'certificate',
          text: 'ISO sertifikat'
        }
      ]
    },
    
    statistics: [
      {
        number: '20000',
        suffix: '+',
        label: 'Zadovoljne dece',
        description: 'kroz našu metodologiju'
      },
      {
        number: '50',
        suffix: '+',
        label: 'Aktivnih centara',
        description: 'širom Srbije'
      },
      {
        number: '15',
        suffix: '',
        label: 'Godina iskustva',
        description: 'u obrazovanju'
      },
      {
        number: '95',
        suffix: '%',
        label: 'Zadovoljstvo',
        description: 'partnera i roditelja'
      }
    ],
    
    differentiators: {
      sectionTitle: 'Zašto baš Srećno učenje?',
      items: [
        {
          icon: 'brain',
          title: 'Jedinstvena metodologija',
          description: 'Naš autorski pristup učenju koji kombinuje igru, kreativnost i tehnologiju za maksimalne rezultate.',
          benefits: [
            'Individualizovan pristup svakom detetu',
            'Razvoj kritičkog mišljenja',
            'Podsticanje kreativnosti'
          ]
        },
        {
          icon: 'support',
          title: 'Kompletna podrška',
          description: 'Od početnog treninga do kontinuirane podrške - nikada niste sami u vašem poslovnom putovanju.',
          benefits: [
            '24/7 tehnička podrška',
            'Redovne edukacije',
            'Marketing materijali'
          ]
        },
        {
          icon: 'growth',
          title: 'Dokazana profitabilnost',
          description: 'Naši partneri ostvaruju prosečan ROI od 35% već u drugoj godini poslovanja.',
          benefits: [
            'Brz povraćaj investicije',
            'Stabilna klijentela',
            'Skalabilno poslovanje'
          ]
        }
      ]
    },
    
    franchiseSteps: {
      sectionTitle: '4 koraka do vaše franšize',
      steps: [
        {
          stepNumber: 1,
          title: 'Početni razgovor',
          description: 'Upoznajemo se i razgovaramo o vašim ciljevima i viziji za centar u vašoj zajednici.',
          duration: '30 min',
          icon: 'chat'
        },
        {
          stepNumber: 2,
          title: 'Prezentacija modela',
          description: 'Detaljno vam predstavljamo poslovni model, metodologiju i finansijske projekcije.',
          duration: '60 min',
          icon: 'presentation'
        },
        {
          stepNumber: 3,
          title: 'Potpisivanje ugovora',
          description: 'Finalizujemo partnerstvo i počinjemo pripremu za otvaranje vašeg centra.',
          duration: '1 dan',
          icon: 'contract'
        },
        {
          stepNumber: 4,
          title: 'Obuka i otvaranje',
          description: 'Intenzivna obuka i potpuna podrška za uspešno pokretanje vašeg centra.',
          duration: '2 nedelje',
          icon: 'rocket'
        }
      ]
    },
    
    franchiseModels: {
      sectionTitle: 'Naši modeli franšize',
      models: [
        {
          name: 'Starter',
          price: 'Od €8,000',
          description: 'Idealan za početak u manjem gradu ili kao dodatna delatnost.',
          features: [
            'Osnovno opremanje',
            'Početni marketing paket',
            'Online obuka',
            '6 meseci podrške',
            'Teritorija do 20.000 stanovnika'
          ],
          highlighted: false,
          ctaText: 'Saznajte više'
        },
        {
          name: 'Professional',
          price: 'Od €15,000',
          description: 'Kompletno rešenje za ozbiljne preduzetnike koji žele brz rast.',
          features: [
            'Kompletno opremanje',
            'Prošireni marketing paket',
            'Lična obuka + online',
            '12 meseci podrške',
            'Teritorija do 50.000 stanovnika',
            'Ekskluzivne radionice'
          ],
          highlighted: true,
          ctaText: 'Najpopularniji izbor',
          badge: 'Preporučujemo'
        },
        {
          name: 'Master',
          price: 'Od €25,000',
          description: 'Premium model za velike gradove sa maksimalnom podrškom.',
          features: [
            'Premium opremanje',
            'VIP marketing paket',
            'Individualna obuka',
            '24 meseca podrške',
            'Ekskluzivna teritorija',
            'Personalizovani programi',
            'Prioritetna podrška'
          ],
          highlighted: false,
          ctaText: 'Kontaktirajte nas'
        }
      ]
    },
    
    successStories: {
      sectionTitle: 'Priče uspešnih partnera',
      featuredVideo: 'https://www.youtube.com/watch?v=example',
      stories: [
        {
          name: 'Marija Nikolić',
          role: 'Vlasnica centra',
          location: 'Novi Sad',
          story: 'Već u prvoj godini rada moj centar je premašio sve očekivanja. Deca dolaze sa radošću, roditelji su oduševljeni rezultatima, a ja sam konačno našla posao koji me ispunjava.',
          yearStarted: '2021',
          metric: {
            value: '120',
            label: 'dece mesečno'
          },
          image: null
        },
        {
          name: 'Aleksandar Petrov',
          role: 'Franšiza partner',
          location: 'Kragujevac',
          story: 'Nikad nisam bio u obrazovanju, ali uz Srećno učenje podršku uspeo sam da izgradim profitabilan biznis koji pomaže deci u mojoj zajednici.',
          yearStarted: '2020',
          metric: {
            value: '200%',
            label: 'rast u 2 godine'
          },
          image: null
        },
        {
          name: 'Ana Đorđević',
          role: 'Obrazovna stručnjakinja',
          location: 'Niš',
          story: 'Kombinacija mojih pedagogskih znanja sa Srećno učenje metodologijom stvorila je neverojan rezultat. Imam listu čekanja od 3 meseca!',
          yearStarted: '2022',
          metric: {
            value: '98%',
            label: 'zadovoljstvo roditelja'
          },
          image: null
        }
      ]
    },
    
    leadMagnets: {
      sectionTitle: 'Besplatni resursi za buduće partnere',
      resources: [
        {
          title: 'Vodič za pokretanje obrazovne franšize',
          description: 'Kompletni vodič sa svim koracima, proverama i savetima za uspešan start.',
          icon: 'book',
          downloadUrl: '/downloads/vodic-pokretanje-fransiz.pdf',
          type: 'PDF vodič'
        },
        {
          title: 'Finansijski kalkulator profitabilnosti',
          description: 'Izračunajte potencijalne prihode i period povraćaja investicije za vaš grad.',
          icon: 'calculator',
          downloadUrl: '/calculator',
          type: 'Online alat'
        },
        {
          title: 'Webinar: Sekreti uspešnih franšiza',
          description: 'Ekskluzivni uvidi od naših najuspešnijih partnera o tome što stvarno funkcioniše.',
          icon: 'video',
          downloadUrl: '/webinar-registration',
          type: 'Live webinar'
        }
      ]
    },
    
    newsletter: {
      title: 'Budite u toku sa prilikama',
      description: 'Prijavite se na naš newsletter i budite prvi koji će saznati o novim mogućnostima, uspesima naših partnera i ekskluzivnim ponudama.',
      incentive: 'Dobijte besplatan "Vodič za pokretanje obrazovne franšize" (vrednost 2.000 RSD)',
      ctaText: 'Prijavite se besplatno'
    },
    
    seo: {
      title: 'Srećno učenje franšiza - Pokrenite profitabilnu obrazovnu franšizu',
      description: 'Postanite deo najveće mreže obrazovnih centara u Srbiji. Dokazana metodologija, kompletna podrška, više od 20.000 zadovoljne dece.',
      keywords: 'obrazovna franšiza, franšiza Srbija, obrazovni centar, Srećno učenje, poslovna prilika',
      ogImage: '/images/og-franchise.jpg'
    }
  },
  
  // FAQ KATEGORIJE
  faqCategories: [
    {
      name: 'Opšte informacije',
      slug: 'opste-informacije',
      description: 'Osnovna pitanja o Srećno učenje franšizi'
    },
    {
      name: 'Finansije i investicija',
      slug: 'finansije-investicija',
      description: 'Pitanja o investiciji, profitabilnosti i finansiranju'
    },
    {
      name: 'Obuka i podrška',
      slug: 'obuka-podrska',
      description: 'Informacije o obuci, podršci i mentorstvu'
    },
    {
      name: 'Teritorija i lokacija',
      slug: 'teritorija-lokacija',
      description: 'Pitanja o teritoriji, lokaciji i ekskluzivnosti'
    },
    {
      name: 'Marketing i promocija',
      slug: 'marketing-promocija',
      description: 'Podrška u marketingu i promociji centra'
    }
  ],
  
  // FAQ PITANJA I ODGOVORI
  faqs: [
    // Opšte informacije
    {
      question: 'Šta je Srećno učenje franšiza?',
      answer: 'Srećno učenje je najveća mreža obrazovnih centara u Srbiji koja koristi jedinstvenu metodologiju za učenje kroz igru. Kao franšiza, omogućavamo partnerima da otvore svoj obrazovni centar uz kompletnu podršku, obuku i dokazane poslovne procese.',
      category: 'opste-informacije',
      order: 1
    },
    {
      question: 'Koliko dugo postoji Srećno učenje?',
      answer: 'Srećno učenje postoji više od 15 godina. Osnovano je 2008. godine i od tada je kontinuirano raslo, razvijajući metodologiju i proširujući mrežu centara širom Srbije.',
      category: 'opste-informacije',
      order: 2
    },
    {
      question: 'Koliko centara trenutno imate u Srbiji?',
      answer: 'Trenutno imamo više od 50 aktivnih centara u Srbiji, od Subotica do Vranja. Naša mreža se kontinuirano proširuje, a plan je da do kraja 2024. imamo 75 centara.',
      category: 'opste-informacije',
      order: 3
    },
    {
      question: 'Da li mogu da otvorim centar ako nemam iskustvo u obrazovanju?',
      answer: 'Apsolutno! Mnogi naši najuspešniji partneri nisu imali prethodro iskustvo u obrazovanju. Naša kompletna obuka i kontinuirana podrška omogućiće vam da savladate sve potrebne veštine.',
      category: 'opste-informacije',
      order: 4
    },
    {
      question: 'Šta čini Srećno učenje metodologiju jedinstvenom?',
      answer: 'Naša metodologija kombinuje naučno dokazane tehnike učenja sa igrom, kreativnošću i modernom tehnologijom. Fokusiramo se na individualizovan pristup, razvoj kritičkog mišljenja i emocionalne inteligencije, što rezultuje boljim akademskim rezultatima i srećnijom decom.',
      category: 'opste-informacije',
      order: 5
    },
    
    // Finansije i investicija
    {
      question: 'Kolika je početna investicija za otvaranje centra?',
      answer: 'Početna investicija zavisi od modela koji birate i veličine teritorije. Kreće se od 8.000€ za Starter model, do 25.000€ za Master model. U cenu su uključeni franšiza fee, oprema, početni marketing i obuka.',
      category: 'finansije-investicija',
      order: 1
    },
    {
      question: 'Kada mogu da očekujem povraćaj investicije?',
      answer: 'Većina naših partnera ostvaruje pozitivnu godišnju zaradu već u prvoj godini, dok je pun povraćaj investicije obično između 18-30 meseci, zavisno od lokacije i angažovanja partnera.',
      category: 'finansije-investicija',
      order: 2
    },
    {
      question: 'Koje su tekuće franšiza naknade?',
      answer: 'Mesečna franšiza naknada je 8% od bruto prometa, što uključuje korišćenje brenda, kontinuiranu podršku, marketing materijale i pristup svim novim programima i materijalima.',
      category: 'finansije-investicija',
      order: 3
    },
    {
      question: 'Da li mogu da dobijem kredit za finansiranje franšize?',
      answer: 'Da, sarađujemo sa nekoliko banaka koje imaju specijalizovane kredite za franšize. Takođe, nudimo mogućnost plaćanja na rate za početni franšiza fee pod određenim uslovima.',
      category: 'finansije-investicija',
      order: 4
    },
    {
      question: 'Kolika je prosečna mesečna zarada centra?',
      answer: 'Prosečna mesečna zarada varira od 1.500€ do 5.000€, zavisno od veličine centra, broja dece i lokacije. Najuspešniji centri ostvaruju i preko 8.000€ mesečno.',
      category: 'finansije-investicija',
      order: 5
    },
    
    // Obuka i podrška
    {
      question: 'Kakvu obuku pružate novim partnerima?',
      answer: 'Nudimo kombinaciju online i lične obuke koja traje 2-4 nedelje. Obuka pokriva metodologiju rada, vođenje centra, marketing, administraciju i rad sa roditeljima. Takođe imate mentora tokom prvih 6-24 meseca.',
      category: 'obuka-podrska',
      order: 1
    },
    {
      question: 'Da li je obuka uključena u cenu franšize?',
      answer: 'Da, osnovna obuka je uključena u početnu investiciju. Dodatne specijalizovane obuke i radionice su dostupne uz simboličnu naknadu ili besplatno za Master model.',
      category: 'obuka-podrska',
      order: 2
    },
    {
      question: 'Kakva podrška se pruža tokom rada?',
      answer: 'Pružamo kontinuiranu podršku kroz: 24/7 telefonsku podršku, mesečne video konsultacije, kvartalne posete, pristup online platformi sa materijalima, redovne webinare i godišnje konferencije partnera.',
      category: 'obuka-podrska',
      order: 3
    },
    {
      question: 'Mogu li da dovedem svoj tim ili moram da radim sam?',
      answer: 'Možete raditi i solo i sa timom. Mnogi partneri počinju sami, a zatim proširuju tim. Pružamo obuku i za vaše buduće saradnike po potrebi.',
      category: 'obuka-podrska',
      order: 4
    },
    
    // Teritorija i lokacija
    {
      question: 'Da li dobijam ekskluzivnu teritoriju?',
      answer: 'Da, svaki partner dobija ekskluzivnu teritoriju čija veličina zavisi od modela franšize i demografskih karakteristika. Teritorija se definiše u ugovoru i zaštićena je od konkurentnih centara.',
      category: 'teritorija-lokacija',
      order: 1
    },
    {
      question: 'Kako se određuje veličina teritorije?',
      answer: 'Teritorija se određuje na osnovu broja stanovnika, gustine naseljenosti, konkurencije i potencijala za rast. Starter model pokriva do 20.000, Professional do 50.000, a Master model može pokrivati i veće gradove.',
      category: 'teritorija-lokacija',
      order: 2
    },
    {
      question: 'Mogu li da otvorim više centara?',
      answer: 'Da, nakon što prvi centar postane profitabilan i stabilno posluje (obično nakon 12-18 meseci), možete aplicirati za dodatne teritorije uz povoljnije uslove.',
      category: 'teritorija-lokacija',
      order: 3
    },
    {
      question: 'Koje su preporuke za lokaciju centra?',
      answer: 'Idealna lokacija je u blizini škola, vrtića ili stambenih naselja sa mladim porodicama. Potrebno je između 60-120m² prostora, parking mesto i dobra pristupačnost. Pomažemo vam u pronalaženju idealne lokacije.',
      category: 'teritorija-lokacija',
      order: 4
    },
    
    // Marketing i promocija
    {
      question: 'Koju marketing podršku pružate?',
      answer: 'Pružamo kompletnu marketing podršku: brendirane materijale, društvene mreže sadržaj, lokalne kampanje, PR podršku, web sajt, Google Ads kampanje i obuku za digitalni marketing.',
      category: 'marketing-promocija',
      order: 1
    },
    {
      question: 'Da li mogu da vodim svoj marketing?',
      answer: 'Marketing aktivnosti treba da budu usklađene sa brendom, ali imate slobodu u kreiranju lokalnih kampanja. Sav marketing se odobrava kroz našu platformu radi očuvanja kvaliteta brenda.',
      category: 'marketing-promocija',
      order: 2
    },
    {
      question: 'Kako privući prve klijente?',
      answer: 'Pomaći ćemo vam u organizovanju otvorenih dana, demo radionica, partnerstva sa školama i vrtićima, kao i u kreiranju specijalnih ponuda za prve klijente. Imamo dokazane strategije za brzo pokretanje.',
      category: 'marketing-promocija',
      order: 3
    },
    {
      question: 'Da li mogu da koristim društvene mreže?',
      answer: 'Da, društvene mreže su ključne za uspeh. Pružamo vam gotove sadržaje, obuciće vas za vođenje profila i povezaćemo vas sa našom glavnom stranicom za veću vidljivost.',
      category: 'marketing-promocija',
      order: 4
    }
  ]
};

async function createFAQCategories() {
  console.log('🏷️  Kreiram FAQ kategorije...');
  
  const createdCategories = {};
  
  for (const category of contentData.faqCategories) {
    try {
      const categoryDoc = await sanityClient.create({
        _type: 'faqCategory',
        name: category.name,
        slug: {
          _type: 'slug',
          current: category.slug
        },
        description: category.description
      });
      
      createdCategories[category.slug] = categoryDoc._id;
      console.log(`  ✅ Kreirana kategorija: ${category.name}`);
    } catch (error) {
      console.error(`  ❌ Greška pri kreiranju kategorije ${category.name}:`, error.message);
    }
  }
  
  return createdCategories;
}

async function createFAQs(categories) {
  console.log('❓ Kreiram FAQ pitanja...');
  
  let createdCount = 0;
  const createdFAQs = [];
  
  for (const faq of contentData.faqs) {
    try {
      const categoryId = categories[faq.category];
      if (!categoryId) {
        console.warn(`  ⚠️  Kategorija ${faq.category} nije pronađena za pitanje: ${faq.question}`);
        continue;
      }
      
      const faqDoc = await sanityClient.create({
        _type: 'faq',
        question: faq.question,
        answer: faq.answer,
        category: {
          _type: 'reference',
          _ref: categoryId
        },
        order: faq.order
      });
      
      createdFAQs.push(faqDoc._id);
      createdCount++;
      console.log(`  ✅ Kreirano pitanje ${createdCount}: ${faq.question.substring(0, 50)}...`);
    } catch (error) {
      console.error(`  ❌ Greška pri kreiranju FAQ:`, error.message);
    }
  }
  
  console.log(`📊 Ukupno kreirano ${createdCount} FAQ pitanja`);
  return createdFAQs.slice(0, 10); // Vraća prvih 10 za home page
}

async function createHomePage(homeFAQs) {
  console.log('🏠 Kreiram Home Page sadržaj...');
  
  try {
    // Proveravamo da li već postoji home page
    const existingHomePage = await sanityClient.fetch('*[_type == "homePage"][0]');
    
    if (existingHomePage) {
      console.log('  ℹ️  Home Page već postoji, ažuriram sadržaj...');
      
      // Kreiranje kompletnog sadržaja za ažuriranje
      const homePageData = {
        ...contentData.homePage,
        homeFaqs: {
          sectionTitle: 'Česta pitanja',
          faqs: homeFAQs.map(id => ({
            _type: 'reference',
            _ref: id,
            _key: id
          }))
        }
      };
      
      await sanityClient
        .patch(existingHomePage._id)
        .set(homePageData)
        .commit();
      
      console.log('  ✅ Home Page uspešno ažuriran');
    } else {
      console.log('  ➕ Kreiram novi Home Page...');
      
      const homePageData = {
        _type: 'homePage',
        ...contentData.homePage,
        homeFaqs: {
          sectionTitle: 'Česta pitanja',
          faqs: homeFAQs.map(id => ({
            _type: 'reference',
            _ref: id,
            _key: id
          }))
        }
      };
      
      await sanityClient.create(homePageData);
      console.log('  ✅ Novi Home Page uspešno kreiran');
    }
  } catch (error) {
    console.error('  ❌ Greška pri kreiranju Home Page:', error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 Počinje popunjavanje CMS-a srpskim sadržajem...\n');
  
  try {
    // Validacija klijenta
    const isValid = await validateClient();
    if (!isValid) {
      console.error('❌ Sanity klijent nije validan. Prekidam izvršavanje.');
      return;
    }
    
    console.log('✅ Sanity klijent je spreman\n');
    
    // 1. Kreiranje FAQ kategorija
    const categories = await createFAQCategories();
    console.log(`✅ Kreirano ${Object.keys(categories).length} FAQ kategorija\n`);
    
    // 2. Kreiranje FAQ pitanja
    const homeFAQs = await createFAQs(categories);
    console.log(`✅ Kreirano ${contentData.faqs.length} FAQ pitanja\n`);
    
    // 3. Kreiranje/ažuriranje Home Page
    await createHomePage(homeFAQs);
    console.log('✅ Home Page je spreman\n');
    
    // Završni izveštaj
    console.log('🎉 USPEŠNO ZAVRŠENO!');
    console.log('📊 Kreiran sadržaj:');
    console.log(`   • ${Object.keys(categories).length} FAQ kategorija`);
    console.log(`   • ${contentData.faqs.length} FAQ pitanja`);
    console.log('   • 1 kompletna Home Page sa svim sekcijama');
    console.log('   • 4 statističke vrednosti');
    console.log('   • 3 ključne prednosti (differentiators)');
    console.log('   • 4 koraka franšiza procesa');
    console.log('   • 3 franšiza modela (Starter, Professional, Master)');
    console.log('   • 3 priče uspešnih partnera');
    console.log('   • 3 besplatna resursa (lead magnets)');
    console.log('   • Newsletter CTA sekcija');
    console.log('   • SEO optimizovani sadržaj');
    
    console.log('\n🎯 Sledeći koraci:');
    console.log('1. Idite u Sanity Studio da pregledate kreiran sadržaj');
    console.log('2. Dodajte slike za hero sekciju i priče uspešnih partnera');
    console.log('3. Prilagodite sadržaj prema vašim potrebama');
    console.log('4. Testirajte home page na frontendu');
    
  } catch (error) {
    console.error('💥 Kritična greška:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Pokretanje skripte
if (require.main === module) {
  main();
}

module.exports = {
  contentData,
  createFAQCategories,
  createFAQs,
  createHomePage
};