'use client'

import Script from 'next/script'

interface StructuredDataProps {
  data: object
  id?: string
}

export default function StructuredData({ data, id = 'structured-data' }: StructuredDataProps) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}

// Reusable structured data generators
export const generateOrganizationSchema = (baseUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${baseUrl}#organization`,
  "name": "Srećno učenje",
  "url": baseUrl,
  "logo": {
    "@type": "ImageObject",
    "url": `${baseUrl}/logo.png`,
    "width": 400,
    "height": 400
  },
  "description": "Franšiza obrazovne metodologije za brzo čitanje, memoriju i koncentraciju dece",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Bulevar kralja Aleksandra 73",
    "addressLocality": "Beograd",
    "postalCode": "11000",
    "addressCountry": "RS"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+381-11-123-4567",
      "contactType": "customer service",
      "availableLanguage": ["Serbian", "English"],
      "areaServed": "RS"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+381-64-123-4567",
      "contactType": "franchise information",
      "availableLanguage": "Serbian",
      "areaServed": "RS"
    }
  ],
  "sameAs": [
    "https://facebook.com/srecno.ucenje",
    "https://instagram.com/srecno.ucenje",
    "https://youtube.com/@srecno-ucenje",
    "https://linkedin.com/company/srecno-ucenje"
  ],
  "foundingDate": "2008",
  "numberOfEmployees": "50-100",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Obrazovni programi i franšize",
    "itemListElement": [
      {
        "@type": "Course",
        "name": "Brzo čitanje za decu",
        "description": "Kurs brzog čitanja sa razumevanjem za decu uzrasta 6-16 godina",
        "provider": {
          "@type": "Organization",
          "name": "Srećno učenje"
        },
        "courseMode": "In person",
        "educationalCredentialAwarded": "Sertifikat brzog čitanja"
      },
      {
        "@type": "Course",
        "name": "Mentalna aritmetika",
        "description": "Program za razvoj brzog računanja i koncentracije",
        "provider": {
          "@type": "Organization",
          "name": "Srećno učenje"
        },
        "courseMode": "In person"
      },
      {
        "@type": "Service",
        "name": "Franšiza Srećno učenje",
        "description": "Kompletna franšizna podrška za pokretanje obrazovnog centra",
        "provider": {
          "@type": "Organization",
          "name": "Srećno učenje"
        },
        "areaServed": "Serbia"
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150",
    "bestRating": "5"
  }
})

export const generateWebSiteSchema = (baseUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseUrl}#website`,
  "url": baseUrl,
  "name": "Srećno učenje",
  "description": "Franšiza obrazovne metodologije za brzo čitanje i memoriju dece",
  "inLanguage": "sr-RS",
  "potentialAction": [
    {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/blog?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  ],
  "publisher": {
    "@type": "Organization",
    "@id": `${baseUrl}#organization`
  }
})

export const generateBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
})

export const generateLocalBusinessSchema = (location: any, baseUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${baseUrl}/skolice/${location.slug}#business`,
  "name": `Srećno učenje - ${location.city}`,
  "description": `Centar za brzo čitanje i memoriju u ${location.city}u`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": location.address,
    "addressLocality": location.city,
    "postalCode": location.postalCode,
    "addressCountry": "RS"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": location.latitude,
    "longitude": location.longitude
  },
  "telephone": location.phone,
  "openingHours": location.openingHours || [
    "Mo-Fr 16:00-20:00",
    "Sa 09:00-14:00"
  ],
  "parentOrganization": {
    "@type": "Organization",
    "@id": `${baseUrl}#organization`
  },
  "hasMap": `https://maps.google.com/?q=${location.latitude},${location.longitude}`,
  "priceRange": "€€",
  "paymentAccepted": ["Cash", "Credit Card"],
  "currenciesAccepted": "RSD"
})