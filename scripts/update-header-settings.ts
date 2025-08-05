#!/usr/bin/env node

/**
 * Update Header Settings Script
 * Makes logo and subtitle editable in CMS
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

async function updateHeaderSettings() {
  console.log('🔧 Ažuriranje header podešavanja...')
  
  try {
    // Update site settings to include subtitle
    const updatedSiteSettings = await client
      .patch('siteSettings')
      .set({
        siteSubtitle: 'Metodologija'
      })
      .commit()
    
    console.log('✅ Uspešno ažurirane osnovne postavke!')
    
    // Create a navigation/header document
    const headerData = {
      _type: 'navigation',
      _id: 'main-navigation',
      title: 'Glavna navigacija',
      logo: {
        text: 'Srećno učenje',
        subtitle: 'Metodologija',
        showSubtitle: true
      },
      menuItems: [
        {
          title: 'O metodologiji',
          link: '/metodologija',
          order: 1
        },
        {
          title: 'Franšiza',
          link: '/fransiza',
          order: 2
        },
        {
          title: 'Knjige',
          link: '/knjige',
          order: 3
        },
        {
          title: 'O autorki',
          link: '/o-autorki',
          order: 4
        },
        {
          title: 'Kalkulatori',
          link: '/kalkulatori',
          order: 5
        },
        {
          title: 'Lokacije',
          link: '/lokacije',
          order: 6
        },
        {
          title: 'Kontakt',
          link: '/kontakt',
          order: 7
        }
      ],
      ctaButton: {
        text: 'Zakaži poziv',
        link: '/kontakt',
        variant: 'primary'
      }
    }
    
    await client.createOrReplace(headerData)
    
    console.log('✅ Kreirana navigacija sa editable logo i subtitle!')
    
    // Create additional page content
    const additionalPages = [
      {
        _type: 'page',
        _id: 'franchise-page',
        title: 'Franšiza - Pridružite se uspešnoj mreži',
        slug: { current: 'fransiza', _type: 'slug' },
        hero: {
          title: 'Pokretanje franšize je jednostavno',
          subtitle: 'Poslovni model koji je već dokazao uspeh u 10 zemalja',
          ctaText: 'Saznaj više o investiciji',
          ctaLink: '/franchise-models',
          secondaryCtaText: 'Zakaži konsultacije',
          secondaryCtaLink: '/kontakt'
        },
        features: [
          {
            icon: '💰',
            title: 'Brz povrat investicije',
            description: 'ROI od 150-300% u prvoj godini rada',
            color: 'text-primary-500'
          },
          {
            icon: '🎯',
            title: 'Dokazana metodologija',
            description: '20.000+ zadovoljne dece i roditelja',
            color: 'text-secondary-500'
          },
          {
            icon: '🤝',
            title: 'Kontinuirana podrška',
            description: 'Kompletan sistem podrške od prvog dana',
            color: 'text-accent-500'
          },
          {
            icon: '📈',
            title: 'Tržište u ekspanziji',
            description: 'Rastući segment dodatnog obrazovanja',
            color: 'text-warm-500'
          }
        ],
        statistics: [
          {
            value: '150-300%',
            label: 'ROI u prvoj godini',
            icon: '💰'
          },
          {
            value: '€3.500',
            label: 'Minimalna investicija',
            icon: '💵'
          },
          {
            value: '30 dana',
            label: 'Do pokretanja',
            icon: '⚡'
          },
          {
            value: '24/7',
            label: 'Podrška',
            icon: '🤝'
          }
        ],
        seo: {
          metaTitle: 'Franšiza Srećno učenje - Investicija u budućnost',
          metaDescription: 'Pridružite se uspešnoj mreži centara za brzočitanje i mentalnu aritmetiku. ROI 150-300%, kompletna podrška, dokazana metodologija.',
          keywords: ['franšiza', 'investicija', 'brzočitanje', 'mentalna aritmetika', 'obrazovanje', 'poslovni model']
        }
      },
      {
        _type: 'page',
        _id: 'books-page',
        title: 'Knjige - Čarobno selo Luka godišnjih doba',
        slug: { current: 'knjige', _type: 'slug' },
        hero: {
          title: 'Čarobno selo - Luka godišnjih doba',
          subtitle: 'Serija knjiga koja spaja bajku sa naukom',
          ctaText: 'Pogledaj knjige',
          ctaLink: '#books',
          secondaryCtaText: 'Naruči komplet',
          secondaryCtaLink: '/kontakt'
        },
        features: [
          {
            icon: '🍂',
            title: 'Jesenja gozba',
            description: 'Vila Bosiljčica vodi decu kroz čarobni svet jeseni',
            color: 'text-yellow-600'
          },
          {
            icon: '❄️',
            title: 'Zimski mir',
            description: 'Vila Božica otkriva lepote zime i unutrašnji mir',
            color: 'text-blue-600'
          },
          {
            icon: '🌸',
            title: 'Prolećna žurba',
            description: 'Vila Đurđica donosi energiju proleća i novih početaka',
            color: 'text-green-600'
          },
          {
            icon: '☀️',
            title: 'Letnja vreva',
            description: 'Vila Sunčica čuva tajne leta i prijateljstva',
            color: 'text-red-600'
          }
        ],
        statistics: [
          {
            value: '4',
            label: 'Knjige u seriji',
            icon: '📚'
          },
          {
            value: '5+',
            label: 'Uzrast',
            icon: '👶'
          },
          {
            value: '100%',
            label: 'Pozitivnih recenzija',
            icon: '⭐'
          },
          {
            value: '1000+',
            label: 'Zadovoljnih čitalaca',
            icon: '😊'
          }
        ],
        seo: {
          metaTitle: 'Knjige - Čarobno selo Luka godišnjih doba | Srećno učenje',
          metaDescription: 'Otkrijte čarobnu seriju knjiga koje spajaju bajku sa naukom. 4 knjige o vilama godišnjih doba koje uče decu o prirodi i životnim vrednostima.',
          keywords: ['knjige za decu', 'Čarobno selo', 'vile godišnjih doba', 'edukativne priče', 'dečja literatura']
        }
      },
      {
        _type: 'page',
        _id: 'calculators-page',
        title: 'Kalkulatori - Procenite svoju investiciju',
        slug: { current: 'kalkulatori', _type: 'slug' },
        hero: {
          title: 'Kalkulatori za planiranje',
          subtitle: 'Alati koji vam pomažu da donesete informisanu odluku',
          ctaText: 'Koristi ROI kalkulator',
          ctaLink: '#roi-calculator',
          secondaryCtaText: 'Kontaktiraj nas',
          secondaryCtaLink: '/kontakt'
        },
        features: [
          {
            icon: '💰',
            title: 'ROI Kalkulator',
            description: 'Izračunajte potencijalni povrat na investiciju',
            color: 'text-primary-500'
          },
          {
            icon: '📊',
            title: 'Kalkulator investicije',
            description: 'Saznajte ukupnu potrebnu investiciju za vaš centar',
            color: 'text-secondary-500'
          },
          {
            icon: '📈',
            title: 'Kalkulator prihoda',
            description: 'Procenite mesečne i godišnje prihode',
            color: 'text-accent-500'
          },
          {
            icon: '⚖️',
            title: 'Kalkulator poređenja',
            description: 'Uporedite različite franchise modele',
            color: 'text-warm-500'
          }
        ],
        seo: {
          metaTitle: 'Kalkulatori za franšizu | Srećno učenje',
          metaDescription: 'Koristite naše kalkulatore da procenite ROI, potrebnu investiciju i potencijalne prihode od franšize Srećno učenje.',
          keywords: ['ROI kalkulator', 'franšiza kalkulator', 'investicija', 'prihodi', 'planiranje']
        }
      },
      {
        _type: 'page',
        _id: 'locations-page',
        title: 'Lokacije - Naši centri',
        slug: { current: 'lokacije', _type: 'slug' },
        hero: {
          title: 'Posetite naše centre',
          subtitle: 'Pronađite najbliži centar Srećnog učenja',
          ctaText: 'Zakaži probni čas',
          ctaLink: '/kontakt',
          secondaryCtaText: 'Pozovi centar',
          secondaryCtaLink: 'tel:+381601234567'
        },
        features: [
          {
            icon: '🏢',
            title: 'Moderni prostori',
            description: 'Posebno dizajnirani prostori za optimalno učenje',
            color: 'text-primary-500'
          },
          {
            icon: '👨‍🏫',
            title: 'Stručni instruktori',
            description: 'Sertifikovani instruktori sa dugogodišnjim iskustvom',
            color: 'text-secondary-500'
          },
          {
            icon: '📍',
            title: 'Pristupačne lokacije',
            description: 'Centri na pristupačnim lokacijama u gradu',
            color: 'text-accent-500'
          },
          {
            icon: '🅿️',
            title: 'Besplatan parking',
            description: 'Obezbeđen parking za sve posetioce',
            color: 'text-warm-500'
          }
        ],
        statistics: [
          {
            value: '2',
            label: 'Grada',
            icon: '🏙️'
          },
          {
            value: '50+',
            label: 'Učenika nedeljno',
            icon: '👥'
          },
          {
            value: '5',
            label: 'Godina iskustva',
            icon: '📅'
          },
          {
            value: '100%',
            label: 'Zadovoljnih roditelja',
            icon: '😊'
          }
        ],
        seo: {
          metaTitle: 'Lokacije centara Srećno učenje',
          metaDescription: 'Pronađite najbliži centar Srećno učenje u Novom Sadu ili Beogradu. Kontakt informacije, radni termini i kako da se prijavite.',
          keywords: ['lokacije', 'centri', 'Novi Sad', 'Beograd', 'adrese', 'kontakt']
        }
      }
    ]
    
    // Create additional pages
    console.log('📄 Kreiranje dodatnih stranica...')
    for (const page of additionalPages) {
      await client.createOrReplace(page)
    }
    
    console.log('✅ Sve stranice su kreirane sa kompletnim sadržajem!')
    
    console.log(`
    🎯 Završeno ažuriranje header podešavanja:
    
    ✅ Dodato polje za podnaslov u site settings
    ✅ Kreirana glavna navigacija sa editable logo
    ✅ Dodane stranice:
       • Franšiza (/fransiza)
       • Knjige (/knjige) 
       • Kalkulatori (/kalkulatori)
       • Lokacije (/lokacije)
    
    📝 Sada možete uređivati:
       • Logo tekst i podnaslov kroz navigaciju
       • Sve header elemente kroz Sanity Studio
       • Kompletnu navigaciju kroz CMS
    
    🚀 Pristupite Sanity Studio na http://localhost:3001/studio
    `)
    
  } catch (error) {
    console.error('❌ Greška tokom ažuriranja:', error)
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  updateHeaderSettings()
}

export { updateHeaderSettings }