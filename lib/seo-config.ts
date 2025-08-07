import { Metadata } from 'next'

// Base SEO configuration for Serbian language education website
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://srecno-ucenje.rs'
const siteName = 'Srećno učenje'
const defaultTitle = 'Srećno učenje - Franšiza obrazovne metodologije za brzo čitanje i memoriju'
const defaultDescription = 'Postanite deo uspešne mreže franšiza obrazovne metodologije koja je inspirisala 20.000+ dece da uče brzo čitanje, memoriju i koncentraciju kroz srce.'

// Key Serbian SEO keywords
const seoKeywords = [
  'brzo čitanje',
  'memorija deca',
  'koncentracija učenika',
  'franšiza obrazovanje',
  'učenje dece',
  'mentalna aritmetika',
  'obrazovna metodologija',
  'privatni časovi',
  'kurs brzog čitanja',
  'tehnike memorisanja',
  'franšiza Srbija',
  'obrazovni centar',
  'razvoj deteta',
  'čitanje sa razumevanjem',
  'efikasno učenje'
]

// Page-specific SEO configurations
export const pageConfigs: Record<string, Metadata & { keywords?: string[], structuredData?: object }> = {
  // Homepage
  '/': {
    title: defaultTitle,
    description: defaultDescription,
    keywords: seoKeywords,
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      url: baseUrl,
      siteName,
      locale: 'sr_RS',
      type: 'website',
      images: [
        {
          url: '/og-images/home.jpg',
          width: 1200,
          height: 630,
          alt: 'Srećno učenje - Franšiza obrazovne metodologije',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description: defaultDescription,
      images: ['/og-images/home.jpg'],
    },
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${baseUrl}#organization`,
          "name": "Srećno učenje",
          "url": baseUrl,
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`
          },
          "description": "Obrazovni centar za brzo čitanje, memoriju i koncentraciju dece",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "RS",
            "addressLocality": "Beograd"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+381-11-123-4567",
            "contactType": "customer service",
            "availableLanguage": "Serbian"
          },
          "sameAs": [
            "https://facebook.com/srecno-ucenje",
            "https://instagram.com/srecno-ucenje",
            "https://youtube.com/@srecno-ucenje"
          ]
        },
        {
          "@type": "EducationalOrganization",
          "@id": `${baseUrl}#educational-org`,
          "name": "Srećno učenje",
          "url": baseUrl,
          "description": "Franšiza obrazovne metodologije za brzo čitanje, memoriju i koncentraciju",
          "numberOfStudents": 20000,
          "educationalCredentialAwarded": "Sertifikat brzog čitanja",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Obrazovni programi",
            "itemListElement": [
              {
                "@type": "Course",
                "name": "Brzo čitanje za decu",
                "description": "Kurs brzog čitanja sa razumevanjem za decu uzrasta 6-16 godina",
                "provider": {
                  "@type": "Organization",
                  "name": "Srećno učenje"
                }
              }
            ]
          }
        }
      ]
    }
  },

  // Franchise application page
  '/fransiza/prijava': {
    title: 'Prijavite se za franšizu - Srećno učenje | Obrazovni biznis sa dokazanim uspehom',
    description: 'Pokrenite uspešnu franšizu obrazovne metodologije. Kompletan biznis model, obuka i podrška. Već 50+ partnera u 10 zemalja. Prijavite se danas!',
    keywords: ['franšiza obrazovanje', 'franšiza Srbija', 'obrazovni biznis', 'franšiza prijava', 'poslovni partner'],
    openGraph: {
      title: 'Prijavite se za franšizu - Srećno učenje',
      description: 'Pokrenite uspešnu franšizu obrazovne metodologije sa kompletnom podrškom i dokazanim rezultatima.',
      url: `${baseUrl}/fransiza/prijava`,
      images: [{ url: '/og-images/franchise-application.jpg', width: 1200, height: 630 }],
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Franšiza Srećno učenje",
      "description": "Franšizni program za obrazovne centre brzog čitanja i memorije",
      "provider": {
        "@type": "Organization",
        "name": "Srećno učenje"
      },
      "areaServed": "Serbia",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Franšizni paketi",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Standard franšiza",
            "description": "Kompletan franšizni paket sa osnovnom opremom"
          }
        ]
      }
    }
  },

  // Franchise models page
  '/fransiza-modeli': {
    title: 'Modeli franšize - Srećno učenje | Izaberite paket koji vam odgovara',
    description: 'Različiti modeli franšize za svaki budžet - od početničkih do premium paketa. Saznajte više o investiciji i povratu sredstava.',
    keywords: ['modeli franšize', 'franšiza paketi', 'investicija franšiza', 'cost franšize'],
    openGraph: {
      title: 'Modeli franšize - Srećno učenje',
      description: 'Izaberite franšizni model koji odgovara vašem budžetu i ciljevima',
      url: `${baseUrl}/fransiza-modeli`,
      images: [{ url: '/og-images/franchise-models.jpg', width: 1200, height: 630 }],
    }
  },

  // How to join page
  '/kako-se-pridruziti': {
    title: 'Kako se pridružiti - Srećno učenje | 5 koraka do svoje franšize',
    description: 'Jednostavan postupak pridruživanja mreži franšiza Srećnog učenja. Proces odabira, obuke i otvaranja centra u 5 koraka.',
    keywords: ['kako se pridruziti', 'franšiza koraci', 'proces pridruživanja', 'franšiza zahtevi'],
    openGraph: {
      title: 'Kako se pridružiti - Srećno učenje',
      description: 'Jednostavan postupak pridruživanja mreži franšiza u 5 koraka',
      url: `${baseUrl}/kako-se-pridruziti`,
      images: [{ url: '/og-images/how-to-join.jpg', width: 1200, height: 630 }],
    }
  },

  // Blog page
  '/blog': {
    title: 'Blog - Srećno učenje | Saveti za brzo čitanje i memoriju dece',
    description: 'Stručni članci o brzom čitanju, tehnikama memorisanja i razvoju koncentracije kod dece. Saveti za roditelje i nastavnike.',
    keywords: ['blog brzo čitanje', 'saveti memorija', 'koncentracija deca', 'obrazovni članci'],
    openGraph: {
      title: 'Blog - Srećno učenje',
      description: 'Stručni članci o brzom čitanju i memoriji za decu',
      url: `${baseUrl}/blog`,
      images: [{ url: '/og-images/blog.jpg', width: 1200, height: 630 }],
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Srećno učenje Blog",
      "description": "Stručni članci o brzom čitanju, memoriji i koncentraciji dece"
    }
  },

  // FAQ page
  '/faq': {
    title: 'Česta pitanja - Srećno učenje | Odgovori na najčešća pitanja o franšizi',
    description: 'Odgovori na najčešća pitanja o franšizi, investiciji, obukama i poslovanju. Sve što trebate znati pre donošenja odluke.',
    keywords: ['česta pitanja', 'faq franšiza', 'pitanja o franšizi', 'odgovori franšiza'],
    openGraph: {
      title: 'Česta pitanja - Srećno učenje',
      description: 'Odgovori na najčešća pitanja o franšizi i poslovanju',
      url: `${baseUrl}/faq`,
      images: [{ url: '/og-images/faq.jpg', width: 1200, height: 630 }],
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [] // This will be populated dynamically
    }
  },

  // Success stories page
  '/iskustva': {
    title: 'Iskustva partnera - Srećno učenje | Priče o uspešnim franšizama',
    description: 'Pročitajte priče uspešnih franšiznih partnera, njihova iskustva i rezultate koje su ostvarili u svojim centrima.',
    keywords: ['iskustva partnera', 'uspešne franšize', 'priče partnera', 'rezultati franšize'],
    openGraph: {
      title: 'Iskustva partnera - Srećno učenje',
      description: 'Priče uspešnih franšiznih partnera i njihovi rezultati',
      url: `${baseUrl}/iskustva`,
      images: [{ url: '/og-images/success-stories.jpg', width: 1200, height: 630 }],
    }
  },

  // About author page
  '/o-autorki': {
    title: 'O autorki - Željana Radojičić Lukić | Osnivač metodologije Srećno učenje',
    description: 'Saznajte više o Željani Radojičić Lukić, osnivači metodologije Srećnog učenja i autorki koja je inspirisala hiljade dece širom sveta.',
    keywords: ['Željana Radojičić Lukić', 'osnivač', 'autorka metodologije', 'biografija'],
    openGraph: {
      title: 'O autorki - Željana Radojičić Lukić',
      description: 'Osnivač metodologije Srećnog učenja koja je inspirisala hiljade dece',
      url: `${baseUrl}/o-autorki`,
      images: [{ url: '/og-images/author.jpg', width: 1200, height: 630 }],
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Željana Radojičić Lukić",
      "jobTitle": "Osnivač i autorka metodologije Srećno učenje",
      "description": "Autorka edukacijskih programa za brzo čitanje i memoriju dece",
      "url": `${baseUrl}/o-autorki`,
      "image": `${baseUrl}/images/zeljana-radojicic-lukic.jpg`,
      "sameAs": [
        "https://linkedin.com/in/zeljana-radojicic-lukic"
      ]
    }
  },

  // Methodology page
  '/metodologija': {
    title: 'Metodologija - Srećno učenje | Naučno dokazana metoda brzog čitanja',
    description: 'Upoznajte se sa jedinstvenom metodologijom Srećnog učenja koja kombinuje brzo čitanje, memoriju i emocionalni razvoj dece.',
    keywords: ['metodologija', 'brzo čitanje metoda', 'obrazovna metodologija', 'tehnike učenja'],
    openGraph: {
      title: 'Metodologija - Srećno učenje',
      description: 'Jedinstvena metodologija koja kombinuje brzo čitanje i emocionalni razvoj',
      url: `${baseUrl}/metodologija`,
      images: [{ url: '/og-images/methodology.jpg', width: 1200, height: 630 }],
    }
  },

  // Contact page
  '/kontakt': {
    title: 'Kontakt - Srećno učenje | Zakazivanje razgovora za franšizu',
    description: 'Kontaktirajte nas za više informacija o franšizi. Zakazivanje razgovora, adrese centara i svi kontakt podaci.',
    keywords: ['kontakt', 'zakazivanje razgovora', 'franšiza kontakt', 'adresa'],
    openGraph: {
      title: 'Kontakt - Srećno učenje',
      description: 'Kontaktirajte nas za više informacija o franšizi',
      url: `${baseUrl}/kontakt`,
      images: [{ url: '/og-images/contact.jpg', width: 1200, height: 630 }],
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Kontakt - Srećno učenje",
      "description": "Kontakt informacije za franšizu Srećno učenje"
    }
  },

  // Schools page
  '/skolice': {
    title: 'Naši centri - Srećno učenje | Lokacije franšiza širom Srbije',
    description: 'Pronađite najbliži centar Srećnog učenja. Mapa lokacija, kontakt podaci i radno vreme svih franšiznih centara.',
    keywords: ['centri lokacije', 'franšiza mapa', 'skolice srbija', 'najbliži centar'],
    openGraph: {
      title: 'Naši centri - Srećno učenje',
      description: 'Pronađite najbliži centar Srećnog učenja u vašoj blizini',
      url: `${baseUrl}/skolice`,
      images: [{ url: '/og-images/locations.jpg', width: 1200, height: 630 }],
    }
  }
}

// Generate metadata for dynamic routes
export function generateBlogPostMetadata(slug: string, post: any): Metadata {
  const title = `${post.title} - Srećno učenje Blog`
  const description = post.excerpt || post.description?.substring(0, 155) + '...'
  
  return {
    title,
    description,
    keywords: [...(post.tags || []), ...seoKeywords.slice(0, 8)],
    authors: [{ name: post.author?.name || 'Srećno učenje' }],
    publishedTime: post.publishedAt,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/blog/${slug}`,
      siteName,
      locale: 'sr_RS',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author?.name || 'Srećno učenje'],
      images: post.mainImage ? [
        {
          url: post.mainImage.asset.url,
          width: 1200,
          height: 630,
          alt: post.mainImage.alt || post.title,
        }
      ] : [{ url: '/og-images/blog-default.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.mainImage ? [post.mainImage.asset.url] : ['/og-images/blog-default.jpg'],
    }
  }
}

// Generate structured data for blog posts
export function generateBlogPostStructuredData(slug: string, post: any) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.description,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "Željana Radojičić Lukić",
      "url": `${baseUrl}/o-autorki`
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${baseUrl}#organization`,
      "name": "Srećno učenje",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post._updatedAt || post.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`
    },
    "image": post.mainImage ? {
      "@type": "ImageObject",
      "url": post.mainImage.asset.url,
      "width": post.mainImage.asset.metadata?.dimensions?.width || 1200,
      "height": post.mainImage.asset.metadata?.dimensions?.height || 630
    } : undefined,
    "articleSection": post.categories?.[0]?.title || "Obrazovanje",
    "keywords": post.tags?.join(", ") || seoKeywords.slice(0, 5).join(", ")
  }
}

// Default metadata fallback
export function getPageMetadata(path: string): Metadata {
  return pageConfigs[path] || {
    title: `${siteName} - Franšiza obrazovne metodologije`,
    description: defaultDescription,
    keywords: seoKeywords,
    openGraph: {
      title: `${siteName} - Franšiza obrazovne metodologije`,
      description: defaultDescription,
      url: `${baseUrl}${path}`,
      siteName,
      locale: 'sr_RS',
      type: 'website',
    }
  }
}

// Sitemap URLs configuration
export const sitemapUrls = [
  { url: '/', priority: 1.0, changeFreq: 'weekly' },
  { url: '/fransiza/prijava', priority: 0.9, changeFreq: 'monthly' },
  { url: '/fransiza-modeli', priority: 0.9, changeFreq: 'monthly' },
  { url: '/kako-se-pridruziti', priority: 0.8, changeFreq: 'monthly' },
  { url: '/blog', priority: 0.8, changeFreq: 'weekly' },
  { url: '/faq', priority: 0.7, changeFreq: 'monthly' },
  { url: '/iskustva', priority: 0.7, changeFreq: 'monthly' },
  { url: '/o-autorki', priority: 0.6, changeFreq: 'yearly' },
  { url: '/metodologija', priority: 0.7, changeFreq: 'monthly' },
  { url: '/kontakt', priority: 0.8, changeFreq: 'monthly' },
  { url: '/skolice', priority: 0.7, changeFreq: 'weekly' }
]

export { baseUrl, siteName, defaultTitle, defaultDescription, seoKeywords }