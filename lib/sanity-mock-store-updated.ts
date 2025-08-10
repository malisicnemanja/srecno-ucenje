// Updated Mock Sanity store sa strukturom koja odgovara query-ju
export const mockSanityData = {
  navigation: {
    _id: 'navigation',
    _type: 'navigation',
    title: 'Glavna navigacija',
    mainMenu: [
      {
        label: 'Metodologija',
        href: '/metodologija',
        subItems: [
          { label: 'Naše metode', href: '/metodologija' },
          { label: 'Obuka i mentorstvo', href: '/obuka-mentorstvo' },
          { label: 'O autorki', href: '/o-autorki' }
        ]
      },
      {
        label: 'Franšiza',
        href: '/fransiza-modeli',
        subItems: [
          { label: 'Modeli franšize', href: '/fransiza-modeli' },
          { label: 'Kako se pridružiti', href: '/kako-se-pridruziti' },
          { label: 'Kalkulatori', href: '/kalkulatori' },
          { label: 'Kvizovi', href: '/kvizovi' }
        ]
      },
      {
        label: 'Učionica',
        href: '/ucionica',
        subItems: [
          { label: 'Naša učionica', href: '/ucionica' },
          { label: '3D virtuelni obilazak', href: '/3d-ucionica' },
          { label: 'Programi', href: '/ucionica#programs' }
        ]
      },
      {
        label: 'Knjige',
        href: '/knjige'
      },
      {
        label: 'Resursi',
        href: '/resursi',
        subItems: [
          { label: 'Besplatni resursi', href: '/resursi' },
          { label: 'Blog', href: '/blog' },
          { label: 'FAQ', href: '/faq' }
        ]
      },
      {
        label: 'Kontakt',
        href: '/kontakt',
        subItems: [
          { label: 'Kontaktirajte nas', href: '/kontakt' },
          { label: 'Lokacije', href: '/lokacije' },
          { label: 'Zakažite konsultacije', href: '/zakazivanje' }
        ]
      }
    ],
    ctaButton: {
      text: 'Zakažite konsultacije',
      href: '/zakazivanje',
      style: 'primary'
    },
    mobileMenuOrder: []
  },

  homePage: {
    _id: 'homePage',
    _type: 'homePage',
    enhancedHero: {
      title: 'Otvori vrata svojoj učionici iz snova',
      subtitle: '20.000+ dece već uči našom metodom. Pridružite se mreži koja pravi razliku.',
      description: 'Pokrenite obrazovnu franšizu koja će promeniti živote dece u vašoj zajednici',
      buttons: [
        {
          _key: 'primary-cta',
          text: 'Zakažite konsultacije',
          link: '/zakazivanje',
          variant: 'primary'
        },
        {
          _key: 'secondary-cta',
          text: 'Saznajte više',
          link: '/metodologija',
          variant: 'secondary'
        }
      ],
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
      videoBackground: null
    },
    statistics: [
      { _key: 'stat1', value: '20.000+', label: 'Zadovoljne dece', icon: 'users', description: 'Koje uče našom metodom', color: 'sky' },
      { _key: 'stat2', value: '50+', label: 'Partnera u mreži', icon: 'location', description: 'Širom regiona', color: 'grass' },
      { _key: 'stat3', value: '15', label: 'Godina iskustva', icon: 'chart', description: 'U obrazovanju', color: 'sun' },
      { _key: 'stat4', value: '95%', label: 'Stopa zadovoljstva', icon: 'calendar', description: 'Zadovoljnih roditelja', color: 'heart' }
    ],
    differentiators: {
      sectionTitle: 'Zašto baš Srećno učenje?',
      subtitle: 'Otkrijte prednosti koje čine našu franšizu jedinstvenom',
      items: [
        {
          _key: 'diff1',
          title: 'Jedinstvena metodologija',
          description: 'Naša metodologija kombinuje nauku i kreativnost za maksimalne rezultate',
          icon: 'brain'
        },
        {
          _key: 'diff2',
          title: 'Podrška kroz sve korake',
          description: 'Od početka do uspeha, tu smo za vas sa kompletnom podrškom',
          icon: 'partnership'
        },
        {
          _key: 'diff3',
          title: 'Dokazani rezultati',
          description: 'Preko 20.000 dece je već ostvarilo izvanredne rezultate',
          icon: 'trending'
        },
        {
          _key: 'diff4',
          title: 'Ljubav prema učenju',
          description: 'Učimo decu da vole da uče i razvijaju svoj puni potencijal',
          icon: 'heart'
        }
      ]
    },
    franchiseSteps: {
      sectionTitle: '4 koraka do vaše franšize',
      steps: [
        { _key: 'step1', number: 1, title: 'Kontakt', description: 'Zakažite besplatne konsultacije i saznajte sve o franšizi', icon: 'phone' },
        { _key: 'step2', number: 2, title: 'Odaberite model', description: 'Izaberite paket franšize koji najbolje odgovara vašim potrebama', icon: 'check' },
        { _key: 'step3', number: 3, title: 'Obuka', description: 'Prođite kroz našu sveobuhvatnu obuku i sertifikaciju', icon: 'book' },
        { _key: 'step4', number: 4, title: 'Pokretanje', description: 'Otvorite svoj centar uz našu kompletnu podršku', icon: 'rocket' }
      ]
    },
    franchiseModels: {
      sectionTitle: 'Izaberite vaš model franšize',
      models: [
        {
          _key: 'model1',
          name: 'Početni paket',
          price: '3.000 EUR',
          features: ['Kompletna obuka', 'Početni materijali', 'Marketing podrška'],
          highlighted: false
        },
        {
          _key: 'model2',
          name: 'Profesionalni paket',
          price: '5.000 EUR',
          features: ['Proširena obuka', 'Ekskluzivna teritorija', '6 meseci mentorstva'],
          highlighted: true
        },
        {
          _key: 'model3',
          name: 'Premium paket',
          price: '8.000 EUR',
          features: ['Master obuka', 'Velika teritorija', 'Garancija uspeha'],
          highlighted: false
        }
      ]
    },
    successStories: {
      sectionTitle: 'Priče naših partnera',
      featuredVideo: 'https://www.youtube.com/watch?v=example',
      stories: [
        {
          _key: 'story1',
          name: 'Milica Stojanović',
          role: 'Vlasnica franšize',
          location: 'Novi Sad',
          story: 'Za samo godinu dana, moj centar je postal omiljeno mesto za učenje u gradu. Deca dolaze sa osmehom!',
          yearStarted: '2023',
          metric: {
            value: '80+',
            label: 'učenika mesečno'
          },
          image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400'
        },
        {
          _key: 'story2',
          name: 'Stefan Petrović',
          role: 'Vlasnik franšize',
          location: 'Beograd',
          story: 'Najbolja poslovna odluka koju sam doneo. Roditelji su oduševljeni rezultatima svoje dece.',
          yearStarted: '2022',
          metric: {
            value: '150+',
            label: 'zadovoljnih roditelja'
          },
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
        }
      ]
    },
    homeFaqs: {
      sectionTitle: 'Često postavljana pitanja',
      faqs: [
        {
          _id: 'faq1',
          question: 'Kolika je investicija potrebna za pokretanje franšize?',
          answer: 'Investicija varira od 3.000 do 8.000 EUR u zavisnosti od izabranog paketa. Sve je transparentno bez skrivenih troškova.',
          category: { name: 'Finansije' },
          order: 1
        },
        {
          _id: 'faq2',
          question: 'Da li je potrebno prethodno iskustvo u obrazovanju?',
          answer: 'Nije potrebno! Naša obuka pokriva sve aspekte rada sa decom i vođenja edukativnog centra.',
          category: { name: 'Obuka' },
          order: 2
        },
        {
          _id: 'faq3',
          question: 'Koliko dugo traje obuka?',
          answer: 'Osnovna obuka traje 40 časova, dok proširena obuka može biti do 120 časova, u zavisnosti od paketa.',
          category: { name: 'Obuka' },
          order: 3
        },
        {
          _id: 'faq4',
          question: 'Kakva je podrška nakon otvaranja centra?',
          answer: 'Pružamo kontinuiranu podršku kroz mentorstvo, marketing materijale i redovne supervizije.',
          category: { name: 'Podrška' },
          order: 4
        },
        {
          _id: 'faq5',
          question: 'Koliko dugo traje ugovor o franšizi?',
          answer: 'Ugovor o franšizi se zaključuje na period od 5 godina, sa mogućnošću produžetka.',
          category: { name: 'Ugovor' },
          order: 5
        },
        {
          _id: 'faq6',
          question: 'Da li mogu otvoriti više centara?',
          answer: 'Da, nakon uspešnog rada prvog centra, moguće je proširiti franšizu na nova mesta.',
          category: { name: 'Proširenje' },
          order: 6
        }
      ]
    },
    interactiveClassroom: {
      sectionTitle: 'Posetite našu interaktivnu učionicu',
      description: 'Doživite našu metodologiju kroz virtuelni obilazak',
      previewImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
      ctaText: 'Počnite 3D obilazak'
    },
    leadMagnets: {
      sectionTitle: 'Besplatni resursi',
      resources: [
        {
          _key: 'resource1',
          title: 'Vodič za pokretanje franšize',
          description: 'Kompletni vodič kroz sve korake',
          downloadUrl: '#',
          previewImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
        }
      ]
    },
    newsletterCTA: {
      title: 'Budite u toku sa novostima',
      description: 'Prijavite se za newsletter i dobijajte korisne savete i ažuriranja o franšizi',
      incentive: 'Prvih 100 pretplatnika dobija besplatan vodič za pokretanje franšize',
      ctaText: 'Prijavite se'
    },
    seo: {
      metaTitle: 'Srećno učenje - Franšiza obrazovne metodologije',
      metaDescription: 'Pokrenite uspešnu obrazovnu franšizu. Preko 20.000 dece već uči našom metodom. Zakažite besplatne konsultacije.',
      keywords: 'franšiza, obrazovanje, brzočitanje, mentalna aritmetika, deca',
      ogImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800'
    }
  },

  siteSettings: {
    _id: 'site-settings-1',
    _type: 'siteSettings',
    siteName: 'Srećno učenje',
    siteDescription: 'Franšiza obrazovne metodologije koja je već inspirisala 20.000+ dece da uče srcem',
    email: 'info@srecno-ucenje.rs',
    phone: '+381 60 123 4567',
    address: 'Bulevar oslobođenja 123, 21000 Novi Sad',
    workingHours: [
      { day: 'Ponedeljak - Petak', hours: '09:00 - 20:00' },
      { day: 'Subota', hours: '10:00 - 18:00' },
      { day: 'Nedelja', hours: '10:00 - 16:00' },
      { day: 'Praznici', hours: 'Zatvoreno' }
    ],
    socialLinks: [
      { platform: 'Facebook', url: 'https://facebook.com/srecnoucenje' },
      { platform: 'Instagram', url: 'https://instagram.com/srecnoucenje' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/srecnoucenje' },
    ],
  }
}