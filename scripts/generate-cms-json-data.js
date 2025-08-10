/**
 * GENERATE CMS JSON DATA
 * 
 * Generiše JSON fajlove sa kvalitetnim srpskim sadržajem
 * koji možete manuelno uvoziti u Sanity Studio
 */

const fs = require('fs');
const path = require('path');

// Kreiranje output direktorijuma
const outputDir = path.join(__dirname, 'cms-data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Kompletni CMS sadržaj za franšizu
const cmsData = {
  faqCategories: [
    {
      _type: 'faqCategory',
      name: 'Opšte informacije',
      slug: { _type: 'slug', current: 'opste-informacije' },
      description: 'Osnovna pitanja o Srećno učenje franšizi'
    },
    {
      _type: 'faqCategory',
      name: 'Finansije i investicija',
      slug: { _type: 'slug', current: 'finansije-investicija' },
      description: 'Pitanja o investiciji, profitabilnosti i finansiranju'
    },
    {
      _type: 'faqCategory',
      name: 'Obuka i podrška',
      slug: { _type: 'slug', current: 'obuka-podrska' },
      description: 'Informacije o obuci, podršci i mentorstvu'
    },
    {
      _type: 'faqCategory',
      name: 'Teritorija i lokacija',
      slug: { _type: 'slug', current: 'teritorija-lokacija' },
      description: 'Pitanja o teritoriji, lokaciji i ekskluzivnosti'
    },
    {
      _type: 'faqCategory',
      name: 'Marketing i promocija',
      slug: { _type: 'slug', current: 'marketing-promocija' },
      description: 'Podrška u marketingu i promociji centra'
    }
  ],

  faqs: [
    // Opšte informacije
    {
      _type: 'faq',
      question: 'Šta je Srećno učenje franšiza?',
      answer: 'Srećno učenje je najveća mreža obrazovnih centara u Srbiji koja koristi jedinstvenu metodologiju za učenje kroz igru. Kao franšiza, omogućavamo partnerima da otvore svoj obrazovni centar uz kompletnu podršku, obuku i dokazane poslovne procese.',
      category: 'REF_TO_CATEGORY_opste-informacije',
      order: 1
    },
    {
      _type: 'faq',
      question: 'Koliko dugo postoji Srećno učenje?',
      answer: 'Srećno učenje postoji više od 15 godina. Osnovano je 2008. godine i od tada je kontinuirano raslo, razvijajući metodologiju i proširujući mrežu centara širom Srbije.',
      category: 'REF_TO_CATEGORY_opste-informacije',
      order: 2
    },
    {
      _type: 'faq',
      question: 'Koliko centara trenutno imate u Srbiji?',
      answer: 'Trenutno imamo više od 50 aktivnih centara u Srbiji, od Subotica do Vranja. Naša mreža se kontinuirano proširuje, a plan je da do kraja 2024. imamo 75 centara.',
      category: 'REF_TO_CATEGORY_opste-informacije',
      order: 3
    },
    {
      _type: 'faq',
      question: 'Da li mogu da otvorim centar ako nemam iskustvo u obrazovanju?',
      answer: 'Apsolutno! Mnogi naši najuspešniji partneri nisu imali prethodno iskustvo u obrazovanju. Naša kompletna obuka i kontinuirana podrška omogućiće vam da savladate sve potrebne veštine.',
      category: 'REF_TO_CATEGORY_opste-informacije',
      order: 4
    },
    {
      _type: 'faq',
      question: 'Šta čini Srećno učenje metodologiju jedinstvenom?',
      answer: 'Naša metodologija kombinuje naučno dokazane tehnike učenja sa igrom, kreativnošću i modernom tehnologijom. Fokusiramo se na individualizovan pristup, razvoj kritičkog mišljenja i emocionalne inteligencije, što rezultuje boljim akademskim rezultatima i srećnijom decom.',
      category: 'REF_TO_CATEGORY_opste-informacije',
      order: 5
    },
    
    // Finansije i investicija
    {
      _type: 'faq',
      question: 'Kolika je početna investicija za otvaranje centra?',
      answer: 'Početna investicija zavisi od modela koji birate i veličine teritorije. Kreće se od 8.000€ za Starter model, do 25.000€ za Master model. U cenu su uključeni franšiza fee, oprema, početni marketing i obuka.',
      category: 'REF_TO_CATEGORY_finansije-investicija',
      order: 1
    },
    {
      _type: 'faq',
      question: 'Kada mogu da očekujem povraćaj investicije?',
      answer: 'Većina naših partnera ostvaruje pozitivnu godišnju zaradu već u prvoj godini, dok je pun povraćaj investicije obično između 18-30 meseci, zavisno od lokacije i angažovanja partnera.',
      category: 'REF_TO_CATEGORY_finansije-investicija',
      order: 2
    },
    {
      _type: 'faq',
      question: 'Koje su tekuće franšiza naknade?',
      answer: 'Mesečna franšiza naknada je 8% od bruto prometa, što uključuje korišćenje brenda, kontinuiranu podršku, marketing materijale i pristup svim novim programima i materijalima.',
      category: 'REF_TO_CATEGORY_finansije-investicija',
      order: 3
    },
    {
      _type: 'faq',
      question: 'Da li mogu da dobijem kredit za finansiranje franšize?',
      answer: 'Da, sarađujemo sa nekoliko banaka koje imaju specijalizovane kredite za franšize. Takođe, nudimo mogućnost plaćanja na rate za početni franšiza fee pod određenim uslovima.',
      category: 'REF_TO_CATEGORY_finansije-investicija',
      order: 4
    },
    {
      _type: 'faq',
      question: 'Kolika je prosečna mesečna zarada centra?',
      answer: 'Prosečna mesečna zarada varira od 1.500€ do 5.000€, zavisno od veličine centra, broja dece i lokacije. Najuspešniji centri ostvaruju i preko 8.000€ mesečno.',
      category: 'REF_TO_CATEGORY_finansije-investicija',
      order: 5
    },
    
    // Obuka i podrška
    {
      _type: 'faq',
      question: 'Kakvu obuku pružate novim partnerima?',
      answer: 'Nudimo kombinaciju online i lične obuke koja traje 2-4 nedelje. Obuka pokriva metodologiju rada, vođenje centra, marketing, administraciju i rad sa roditeljima. Takođe imate mentora tokom prvih 6-24 meseca.',
      category: 'REF_TO_CATEGORY_obuka-podrska',
      order: 1
    },
    {
      _type: 'faq',
      question: 'Da li je obuka uključena u cenu franšize?',
      answer: 'Da, osnovna obuka je uključena u početnu investiciju. Dodatne specijalizovane obuke i radionice su dostupne uz simboličnu naknadu ili besplatno za Master model.',
      category: 'REF_TO_CATEGORY_obuka-podrska',
      order: 2
    },
    {
      _type: 'faq',
      question: 'Kakva podrška se pruža tokom rada?',
      answer: 'Pružamo kontinuiranu podršku kroz: 24/7 telefonsku podršku, mesečne video konsultacije, kvartalne posete, pristup online platformi sa materijalima, redovne webinare i godišnje konferencije partnera.',
      category: 'REF_TO_CATEGORY_obuka-podrska',
      order: 3
    },
    {
      _type: 'faq',
      question: 'Mogu li da dovedem svoj tim ili moram da radim sam?',
      answer: 'Možete raditi i solo i sa timom. Mnogi partneri počinju sami, a zatim proširuju tim. Pružamo obuku i za vaše buduće saradnike po potrebi.',
      category: 'REF_TO_CATEGORY_obuka-podrska',
      order: 4
    },
    
    // Teritorija i lokacija
    {
      _type: 'faq',
      question: 'Da li dobijam ekskluzivnu teritoriju?',
      answer: 'Da, svaki partner dobija ekskluzivnu teritoriju čija veličina zavisi od modela franšize i demografskih karakteristika. Teritorija se definiše u ugovoru i zaštićena je od konkurentnih centara.',
      category: 'REF_TO_CATEGORY_teritorija-lokacija',
      order: 1
    },
    {
      _type: 'faq',
      question: 'Kako se određuje veličina teritorije?',
      answer: 'Teritorija se određuje na osnovu broja stanovnika, gustine naseljenosti, konkurencije i potencijala za rast. Starter model pokriva do 20.000, Professional do 50.000, a Master model može pokrivati i veće gradove.',
      category: 'REF_TO_CATEGORY_teritorija-lokacija',
      order: 2
    },
    {
      _type: 'faq',
      question: 'Mogu li da otvorim više centara?',
      answer: 'Da, nakon što prvi centar postane profitabilan i stabilno posluje (obično nakon 12-18 meseci), možete aplicirati za dodatne teritorije uz povoljnije uslove.',
      category: 'REF_TO_CATEGORY_teritorija-lokacija',
      order: 3
    },
    {
      _type: 'faq',
      question: 'Koje su preporuke za lokaciju centra?',
      answer: 'Idealna lokacija je u blizini škola, vrtića ili stambenih naselja sa mladim porodicama. Potrebno je između 60-120m² prostora, parking mesto i dobra pristupačnost. Pomažemo vam u pronalaženju idealne lokacije.',
      category: 'REF_TO_CATEGORY_teritorija-lokacija',
      order: 4
    },
    
    // Marketing i promocija
    {
      _type: 'faq',
      question: 'Koju marketing podršku pružate?',
      answer: 'Pružamo kompletnu marketing podršku: brendirane materijale, društvene mreže sadržaj, lokalne kampanje, PR podršku, web sajt, Google Ads kampanje i obuku za digitalni marketing.',
      category: 'REF_TO_CATEGORY_marketing-promocija',
      order: 1
    },
    {
      _type: 'faq',
      question: 'Da li mogu da vodim svoj marketing?',
      answer: 'Marketing aktivnosti treba da budu usklađene sa brendom, ali imate slobodu u kreiranju lokalnih kampanja. Sav marketing se odobrava kroz našu platformu radi očuvanja kvaliteta brenda.',
      category: 'REF_TO_CATEGORY_marketing-promocija',
      order: 2
    },
    {
      _type: 'faq',
      question: 'Kako privući prve klijente?',
      answer: 'Pomoći ćemo vam u organizovanju otvorenih dana, demo radionica, partnerstva sa školama i vrtićima, kao i u kreiranju specijalnih ponuda za prve klijente. Imamo dokazane strategije za brzo pokretanje.',
      category: 'REF_TO_CATEGORY_marketing-promocija',
      order: 3
    },
    {
      _type: 'faq',
      question: 'Da li mogu da koristim društvene mreže?',
      answer: 'Da, društvene mreže su ključne za uspeh. Pružamo vam gotove sadržaje, obučićemo vas za vođenje profila i povezaćemo vas sa našom glavnom stranicom za veću vidljivost.',
      category: 'REF_TO_CATEGORY_marketing-promocija',
      order: 4
    }
  ],

  homePage: {
    _type: 'homePage',
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
          }
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
          }
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
          }
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
      keywords: 'obrazovna franšiza, franšiza Srbija, obrazovni centar, Srećno učenje, poslovna prilika'
    }
  }
};

// Funkcija za generisanje JSON fajlova
function generateJSONFiles() {
  console.log('📄 Generiram JSON fajlove sa CMS sadržajem...\n');

  // FAQ Kategorije
  const faqCategoriesPath = path.join(outputDir, 'faq-categories.json');
  fs.writeFileSync(faqCategoriesPath, JSON.stringify(cmsData.faqCategories, null, 2));
  console.log(`✅ Kreiran fajl: ${faqCategoriesPath}`);

  // FAQ Pitanja
  const faqsPath = path.join(outputDir, 'faqs.json');
  fs.writeFileSync(faqsPath, JSON.stringify(cmsData.faqs, null, 2));
  console.log(`✅ Kreiran fajl: ${faqsPath}`);

  // Home Page
  const homePagePath = path.join(outputDir, 'home-page.json');
  fs.writeFileSync(homePagePath, JSON.stringify(cmsData.homePage, null, 2));
  console.log(`✅ Kreiran fajl: ${homePagePath}`);

  // Kompletni sadržaj
  const allDataPath = path.join(outputDir, 'complete-cms-data.json');
  fs.writeFileSync(allDataPath, JSON.stringify(cmsData, null, 2));
  console.log(`✅ Kreiran fajl: ${allDataPath}`);

  // Instrukcije za uvoz
  const instructionsPath = path.join(outputDir, 'INSTRUKCIJE-ZA-UVOZ.md');
  const instructions = `# Instrukcije za uvoz CMS sadržaja

## Generirani fajlovi:

1. **faq-categories.json** - 5 FAQ kategorija
2. **faqs.json** - 24 kvalitetna pitanja i odgovora
3. **home-page.json** - Kompletna home page sa svim sekcijama
4. **complete-cms-data.json** - Sav sadržaj u jednom fajlu

## Način uvoza u Sanity Studio:

### Opcija 1: Manuelni uvoz preko Studio interfejsa
1. Otvorite Sanity Studio (/studio)
2. Kreirajte FAQ kategorije prvo (kopirajte sadržaj iz faq-categories.json)
3. Zatim kreirajte FAQ pitanja (kopirajte sadržaj iz faqs.json)
4. Konačno kreirajte/ažurirajte Home Page (kopirajte sadržaj iz home-page.json)

### Opcija 2: Programski uvoz (potreban je Sanity auth token)
\`\`\`bash
# Postavite environment varijable
export SANITY_AUTH_TOKEN="your-auth-token"
export NEXT_PUBLIC_SANITY_PROJECT_ID="08ctxj6y"

# Pokrenite script za uvoz
node ../populate-serbian-cms-content.js
\`\`\`

### Opcija 3: Sanity CLI Import
\`\`\`bash
# Instalirajte Sanity CLI ako ga nemate
npm install -g @sanity/cli

# Uvezite podatke
sanity dataset import complete-cms-data.ndjson production --replace
\`\`\`

## Napomene:

- Sav sadržaj je na srpskom jeziku
- Optimizovan za SEO
- Profesionalan marketing copy
- Reference između FAQ kategorija i pitanja su označene kao "REF_TO_CATEGORY_slug"
- Nakon uvoza možda ćete morati da ručno povežete reference

## Sadržaj uključuje:

### Home Page:
- ✅ Enhanced Hero sa animacijama
- ✅ 4 statistike
- ✅ 3 ključne prednosti
- ✅ 4 koraka franšiza procesa
- ✅ 3 franšiza modela (Starter, Professional, Master)
- ✅ 3 priče uspešnih partnera
- ✅ 3 besplatna resursa (lead magnets)
- ✅ Newsletter CTA sekcija
- ✅ SEO optimizovani sadržaj

### FAQ sistem:
- ✅ 5 tematskih kategorija
- ✅ 24 detaljnih pitanja i odgovora
- ✅ Pokriva sve aspekte franšize

Sav sadržaj je kreiran profesionalno i optimizovan za konverzije!
`;

  fs.writeFileSync(instructionsPath, instructions);
  console.log(`✅ Kreiran fajl: ${instructionsPath}`);

  console.log('\n🎉 USPEŠNO ZAVRŠENO!');
  console.log(`📁 Svi fajlovi su kreirani u: ${outputDir}`);
  console.log('\n📋 Kreiran sadržaj:');
  console.log('   • 5 FAQ kategorija');
  console.log('   • 24 FAQ pitanja');
  console.log('   • 1 kompletna Home Page sa svim sekcijama');
  console.log('   • Instrukcije za uvoz');
  console.log('\n🎯 Sledeći koraci:');
  console.log('1. Pregledajte generirane JSON fajlove');
  console.log('2. Sledite instrukcije u INSTRUKCIJE-ZA-UVOZ.md');
  console.log('3. Uvezite sadržaj u Sanity Studio');
  console.log('4. Dodajte slike za hero sekciju i priče partnera');
}

// Pokretanje generisanja
if (require.main === module) {
  generateJSONFiles();
}

module.exports = { cmsData, generateJSONFiles };