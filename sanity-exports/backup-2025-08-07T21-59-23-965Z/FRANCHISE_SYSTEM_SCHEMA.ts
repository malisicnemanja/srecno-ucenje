// =================================================================
// EDUCATIONAL FRANCHISE SYSTEM SCHEMA DESIGN
// =================================================================
// Comprehensive CMS schema for "Srećno učenje" educational franchise
// Team: Database Architecture, Content Strategy, UX Design
// =================================================================

import { Rule, SchemaTypeDefinition } from '@sanity/types'

// =================================================================
// 1. LOCATIONS (Gradovi) - Geographic Foundation
// =================================================================

export const location: SchemaTypeDefinition = {
  name: 'location',
  title: 'Lokacije (Gradovi)',
  type: 'document',
  icon: () => '🏙️',
  fields: [
    // Basic Information
    {
      name: 'city',
      title: 'Grad',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().min(2).max(50)
    },
    {
      name: 'slug',
      title: 'URL Putanja',
      type: 'slug',
      options: {
        source: 'city',
        maxLength: 96
      },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'Beograd', value: 'belgrade' },
          { title: 'Vojvodina', value: 'vojvodina' },
          { title: 'Šumadija', value: 'sumadija' },
          { title: 'Južna Srbija', value: 'juzna-srbija' },
          { title: 'Zapadna Srbija', value: 'zapadna-srbija' },
          { title: 'Istočna Srbija', value: 'istocna-srbija' }
        ]
      },
      validation: (Rule: Rule) => Rule.required()
    },

    // Geographic Data
    {
      name: 'coordinates',
      title: 'Koordinate',
      type: 'object',
      fields: [
        {
          name: 'lat',
          title: 'Latitude',
          type: 'number',
          validation: (Rule: Rule) => Rule.required().min(-90).max(90)
        },
        {
          name: 'lng',
          title: 'Longitude', 
          type: 'number',
          validation: (Rule: Rule) => Rule.required().min(-180).max(180)
        }
      ]
    },

    // Market Information
    {
      name: 'marketSize',
      title: 'Veličina tržišta',
      type: 'string',
      options: {
        list: [
          { title: 'Veliko (100,000+)', value: 'large' },
          { title: 'Srednje (25,000-100,000)', value: 'medium' },
          { title: 'Malo (do 25,000)', value: 'small' }
        ]
      },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'demandLevel',
      title: 'Nivo tražnje',
      type: 'string',
      options: {
        list: [
          { title: 'Visoka', value: 'high' },
          { title: 'Srednja', value: 'medium' },
          { title: 'Niska', value: 'low' }
        ]
      },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'priceMultiplier',
      title: 'Cenovni multiplikator',
      type: 'number',
      description: 'Faktor za prilagođavanje cena lokalnom tržištu (npr. 1.2 za Beograd)',
      validation: (Rule: Rule) => Rule.required().min(0.5).max(2.0),
      initialValue: 1.0
    },

    // Content & SEO
    {
      name: 'description',
      title: 'Opis lokacije',
      type: 'text',
      rows: 3,
      description: 'Kratki opis grada i mogućnosti za edukacijski biznis'
    },
    {
      name: 'seoTitle',
      title: 'SEO Naslov',
      type: 'string',
      description: 'Optimizovan naslov za pretraživače (npr. "Srećno učenje Novi Sad - Brzočitanje za decu")'
    },
    {
      name: 'seoDescription', 
      title: 'SEO Opis',
      type: 'text',
      rows: 2,
      description: 'Meta opis za pretraživače (150-160 karaktera)'
    },

    // Status & Organization
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Aktivno - Centri rade', value: 'active' },
          { title: 'Uskoro - U pripremi', value: 'coming-soon' },
          { title: 'Planirano - Buduća ekspanzija', value: 'planned' },
          { title: 'Neaktivno', value: 'inactive' }
        ]
      },
      validation: (Rule: Rule) => Rule.required(),
      initialValue: 'planned'
    },
    {
      name: 'featured',
      title: 'Izdvojeno',
      type: 'boolean',
      description: 'Prikaži kao featured lokaciju na mapi',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Redosled prikaza',
      type: 'number',
      validation: (Rule: Rule) => Rule.integer().min(1),
      initialValue: 100
    }
  ],

  // Preview configuration
  preview: {
    select: {
      title: 'city',
      subtitle: 'region',
      status: 'status',
      featured: 'featured'
    },
    prepare({ title, subtitle, status, featured }) {
      const statusEmoji = {
        'active': '✅',
        'coming-soon': '🟡',
        'planned': '⏳',
        'inactive': '❌'
      }[status] || '❓'

      return {
        title: `${featured ? '⭐ ' : ''}${title}`,
        subtitle: `${subtitle?.toUpperCase()} ${statusEmoji}`,
        media: () => '🏙️'
      }
    }
  },

  // Ordering
  orderings: [
    {
      title: 'Po redu prikaza',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Po nazivu grada',
      name: 'cityAsc', 
      by: [{ field: 'city', direction: 'asc' }]
    },
    {
      title: 'Po statusu',
      name: 'statusDesc',
      by: [{ field: 'status', direction: 'desc' }]
    }
  ]
}

// =================================================================
// 2. CENTERS (Obrazovni centri) - Educational Units
// =================================================================

export const center: SchemaTypeDefinition = {
  name: 'center',
  title: 'Obrazovni centri',
  type: 'document',
  icon: () => '🏫',
  fields: [
    // Basic Information
    {
      name: 'name',
      title: 'Naziv centra',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().min(3).max(100)
    },
    {
      name: 'slug',
      title: 'URL Putanja',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: (Rule: Rule) => Rule.required()
    },

    // Location Relationship
    {
      name: 'location',
      title: 'Lokacija',
      type: 'reference',
      to: [{ type: 'location' }],
      validation: (Rule: Rule) => Rule.required(),
      description: 'Grad u kome se centar nalazi'
    },

    // Center Type & Status
    {
      name: 'centerType',
      title: 'Tip centra',
      type: 'string',
      options: {
        list: [
          { title: 'Franšiza', value: 'franchise' },
          { title: 'Kompanijski centar', value: 'company-owned' },
          { title: 'Partner centar', value: 'partner' },
          { title: 'Pilot centar', value: 'pilot' }
        ]
      },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'status',
      title: 'Status rada',
      type: 'string',
      options: {
        list: [
          { title: 'Aktivno radi', value: 'active' },
          { title: 'Privremeno zatvoreno', value: 'temporarily-closed' },
          { title: 'U pripremi', value: 'preparing' },
          { title: 'Neaktivno', value: 'inactive' }
        ]
      },
      validation: (Rule: Rule) => Rule.required(),
      initialValue: 'preparing'
    },

    // Contact Information
    {
      name: 'contactInfo',
      title: 'Kontakt informacije',
      type: 'object',
      fields: [
        {
          name: 'address',
          title: 'Adresa',
          type: 'string',
          validation: (Rule: Rule) => Rule.required()
        },
        {
          name: 'phone',
          title: 'Telefon',
          type: 'string',
          validation: (Rule: Rule) => Rule.regex(/^\+381\s?\d{2}\s?\d{3}\s?\d{4}$/, {
            name: 'Serbian phone',
            invert: false
          }).error('Format: +381 XX XXX XXXX')
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule: Rule) => Rule.email()
        },
        {
          name: 'website',
          title: 'Website',
          type: 'url',
          description: 'Lokalna web stranica centra (opciono)'
        }
      ]
    },

    // Operational Details
    {
      name: 'capacity',
      title: 'Kapacitet učenika',
      type: 'object',
      fields: [
        {
          name: 'totalCapacity',
          title: 'Ukupan kapacitet',
          type: 'number',
          validation: (Rule: Rule) => Rule.integer().min(1).max(500)
        },
        {
          name: 'currentEnrollment',
          title: 'Trenutno upisano',
          type: 'number',
          validation: (Rule: Rule) => Rule.integer().min(0)
        },
        {
          name: 'classroomCount',
          title: 'Broj učionica',
          type: 'number',
          validation: (Rule: Rule) => Rule.integer().min(1).max(20)
        }
      ]
    },

    // Programs & Services
    {
      name: 'programsOffered',
      title: 'Programi koji se nude',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'program' }] }],
      description: 'Edukacijski programi dostupni u ovom centru'
    },
    {
      name: 'ageGroups',
      title: 'Uzrasne grupe',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Predškolci (4-6)', value: '4-6' },
          { title: 'Mlađi školski (7-10)', value: '7-10' },
          { title: 'Stariji školski (11-14)', value: '11-14' },
          { title: 'Srednjoškolci (15-18)', value: '15-18' },
          { title: 'Odrasli (18+)', value: '18+' }
        ]
      }
    },

    // Working Hours
    {
      name: 'workingHours',
      title: 'Radno vreme',
      type: 'object',
      fields: [
        {
          name: 'monday',
          title: 'Ponedeljak',
          type: 'object',
          fields: [
            { name: 'open', title: 'Otvaranje', type: 'string' },
            { name: 'close', title: 'Zatvaranje', type: 'string' },
            { name: 'closed', title: 'Zatvoreno', type: 'boolean', initialValue: false }
          ]
        },
        {
          name: 'tuesday',
          title: 'Utorak',
          type: 'object',
          fields: [
            { name: 'open', title: 'Otvaranje', type: 'string' },
            { name: 'close', title: 'Zatvaranje', type: 'string' },
            { name: 'closed', title: 'Zatvoreno', type: 'boolean', initialValue: false }
          ]
        },
        // ... repeat for all days
        {
          name: 'saturday',
          title: 'Subota',
          type: 'object',
          fields: [
            { name: 'open', title: 'Otvaranje', type: 'string' },
            { name: 'close', title: 'Zatvaranje', type: 'string' },
            { name: 'closed', title: 'Zatvoreno', type: 'boolean', initialValue: false }
          ]
        },
        {
          name: 'sunday',
          title: 'Nedelja',
          type: 'object',
          fields: [
            { name: 'open', title: 'Otvaranje', type: 'string' },
            { name: 'close', title: 'Zatvaranje', type: 'string' },
            { name: 'closed', title: 'Zatvoreno', type: 'boolean', initialValue: true }
          ]
        }
      ]
    },

    // Media & Content
    {
      name: 'photos',
      title: 'Fotografije centra',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alt tekst',
              type: 'string',
              validation: (Rule: Rule) => Rule.required()
            },
            {
              name: 'caption',
              title: 'Opis fotografije',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'description',
      title: 'Opis centra',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detaljni opis centra, metoda rada, specifičnosti'
    },

    // Franchise Information (if applicable)
    {
      name: 'franchiseInfo',
      title: 'Informacije o franšizi',
      type: 'object',
      fields: [
        {
          name: 'franchiseeOwner',
          title: 'Vlasnik franšize',
          type: 'string',
          description: 'Ime i prezime vlasnika franšize'
        },
        {
          name: 'openedDate',
          title: 'Datum otvaranja',
          type: 'date'
        },
        {
          name: 'franchiseAgreementDate',
          title: 'Datum ugovora o franšizi',
          type: 'date'
        }
      ],
      hidden: ({ document }) => document?.centerType !== 'franchise'
    },

    // SEO & Marketing
    {
      name: 'seoTitle',
      title: 'SEO Naslov',
      type: 'string',
      description: 'Optimizovan naslov za pretraživače'
    },
    {
      name: 'seoDescription',
      title: 'SEO Opis',
      type: 'text',
      rows: 2,
      description: 'Meta opis za pretraživače'
    },
    {
      name: 'socialProfiles',
      title: 'Društvene mreže',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' }
      ]
    },

    // Administrative
    {
      name: 'featured',
      title: 'Izdvojen centar',
      type: 'boolean',
      description: 'Prikaži kao featured na listi centara',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Redosled prikaza',
      type: 'number',
      validation: (Rule: Rule) => Rule.integer().min(1),
      initialValue: 100
    }
  ],

  // Preview
  preview: {
    select: {
      title: 'name',
      location: 'location.city',
      type: 'centerType',
      status: 'status',
      featured: 'featured',
      photo: 'photos.0'
    },
    prepare({ title, location, type, status, featured, photo }) {
      const statusEmoji = {
        'active': '✅',
        'temporarily-closed': '⏸️',
        'preparing': '🔄',
        'inactive': '❌'
      }[status] || '❓'

      const typeEmoji = {
        'franchise': '🏪',
        'company-owned': '🏢',
        'partner': '🤝',
        'pilot': '🧪'
      }[type] || '🏫'

      return {
        title: `${featured ? '⭐ ' : ''}${title}`,
        subtitle: `${location} ${typeEmoji} ${statusEmoji}`,
        media: photo || (() => '🏫')
      }
    }
  }
}

// =================================================================
// 3. EDUCATORS (Edukatori) - Teaching Staff
// =================================================================

export const educator: SchemaTypeDefinition = {
  name: 'educator',
  title: 'Edukatori',
  type: 'document',
  icon: () => '👨‍🏫',
  fields: [
    // Basic Information
    {
      name: 'name',
      title: 'Ime i prezime',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().min(2).max(100)
    },
    {
      name: 'slug',
      title: 'URL Putanja',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: (Rule: Rule) => Rule.required()
    },

    // Professional Information
    {
      name: 'title',
      title: 'Stručni naziv',
      type: 'string',
      description: 'npr. "Instruktor brzočitanja", "Sertifikovani edukator"'
    },
    {
      name: 'bio',
      title: 'Biografija',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Profesionalna biografija i opis rada sa decom'
    },

    // Media
    {
      name: 'photo',
      title: 'Fotografija',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alt tekst',
          type: 'string',
          validation: (Rule: Rule) => Rule.required()
        }
      ]
    },

    // Professional Details
    {
      name: 'certificationLevel',
      title: 'Nivo sertifikacije',
      type: 'string',
      options: {
        list: [
          { title: 'Osnovni instruktor', value: 'basic' },
          { title: 'Napredni instruktor', value: 'advanced' },
          { title: 'Senior instruktor', value: 'senior' },
          { title: 'Master trener', value: 'master' },
          { title: 'Mentor', value: 'mentor' }
        ]
      },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'yearsOfExperience',
      title: 'Godine iskustva',
      type: 'number',
      validation: (Rule: Rule) => Rule.integer().min(0).max(50),
      description: 'Ukupno godina rada u obrazovanju'
    },
    {
      name: 'srećnoUčenjeExperience',
      title: 'Godine u Srećno učenje',
      type: 'number',
      validation: (Rule: Rule) => Rule.integer().min(0),
      description: 'Godine rada sa Srećno učenje metodologijom'
    },

    // Specializations
    {
      name: 'specializations',
      title: 'Specijalizacije',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Brzočitanje', value: 'speed-reading' },
          { title: 'Mentalna aritmetika', value: 'mental-arithmetic' },
          { title: 'Tehnike memorije', value: 'memory-techniques' },
          { title: 'Koncentracija i fokus', value: 'focus-concentration' },
          { title: 'Rad sa predškolcima', value: 'preschool' },
          { title: 'Rad sa decom sa posebnim potrebama', value: 'special-needs' },
          { title: 'Grupni rad', value: 'group-work' },
          { title: 'Individualni rad', value: 'individual-work' }
        ]
      }
    },
    {
      name: 'ageGroupsWorking',
      title: 'Uzrasne grupe sa kojima radi',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Predškolci (4-6)', value: '4-6' },
          { title: 'Mlađi školski (7-10)', value: '7-10' },
          { title: 'Stariji školski (11-14)', value: '11-14' },
          { title: 'Srednjoškolci (15-18)', value: '15-18' },
          { title: 'Odrasli (18+)', value: '18+' }
        ]
      }
    },

    // Work Assignment
    {
      name: 'workType',
      title: 'Tip rada',
      type: 'string',
      options: {
        list: [
          { title: 'Zaposlen u centru', value: 'center-employed' },
          { title: 'Nezavisan saradnik', value: 'independent' },
          { title: 'Pokretni edukator', value: 'mobile' },
          { title: 'Online edukator', value: 'online' }
        ]
      },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'centerAffiliation',
      title: 'Centar',
      type: 'reference',
      to: [{ type: 'center' }],
      description: 'Centar u kome edukator radi (za zaposlene)',
      hidden: ({ document }) => document?.workType === 'independent' || document?.workType === 'online'
    },
    {
      name: 'coverageAreas',
      title: 'Područja rada',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'location' }] }],
      description: 'Lokacije koje pokriva (za nezavisne i pokretne edukatore)',
      hidden: ({ document }) => document?.workType === 'center-employed'
    },

    // Professional Achievements
    {
      name: 'achievements',
      title: 'Postignuća i nagrade',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Naziv postignuća',
              type: 'string',
              validation: (Rule: Rule) => Rule.required()
            },
            {
              name: 'description',
              title: 'Opis',
              type: 'text',
              rows: 2
            },
            {
              name: 'year',
              title: 'Godina',
              type: 'number',
              validation: (Rule: Rule) => Rule.integer().min(1990).max(new Date().getFullYear())
            },
            {
              name: 'organization',
              title: 'Organizacija',
              type: 'string'
            }
          ]
        }
      ]
    },

    // Student Success Metrics
    {
      name: 'successMetrics',
      title: 'Metrije uspeha',
      type: 'object',
      fields: [
        {
          name: 'totalStudentsTaught',
          title: 'Ukupno učenika obučeno',
          type: 'number',
          validation: (Rule: Rule) => Rule.integer().min(0)
        },
        {
          name: 'averageImprovement',
          title: 'Prosečno poboljšanje (%)',
          type: 'number',
          description: 'Prosečno poboljšanje rezultata učenika',
          validation: (Rule: Rule) => Rule.min(0).max(1000)
        },
        {
          name: 'parentSatisfactionRate',
          title: 'Stopa zadovoljstva roditelja (%)',
          type: 'number',
          validation: (Rule: Rule) => Rule.min(0).max(100)
        }
      ]
    },

    // Contact & Availability
    {
      name: 'contactInfo',
      title: 'Kontakt informacije',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule: Rule) => Rule.email()
        },
        {
          name: 'phone',
          title: 'Telefon',
          type: 'string',
          validation: (Rule: Rule) => Rule.regex(/^\+381\s?\d{2}\s?\d{3}\s?\d{4}$/, {
            name: 'Serbian phone',
            invert: false
          }).error('Format: +381 XX XXX XXXX')
        },
        {
          name: 'publicContact',
          title: 'Javno dostupan kontakt',
          type: 'boolean',
          description: 'Da li prikazati kontakt informacije na web stranici',
          initialValue: false
        }
      ]
    },
    {
      name: 'availability',
      title: 'Dostupnost za nove učenike',
      type: 'string',
      options: {
        list: [
          { title: 'Dostupan - Prima nove učenike', value: 'available' },
          { title: 'Lista čekanja - Ograničena dostupnost', value: 'waiting-list' },
          { title: 'Nedostupan - Trenutno ne prima nove', value: 'unavailable' },
          { title: 'Pauza - Privremeno neaktivan', value: 'on-break' }
        ]
      },
      validation: (Rule: Rule) => Rule.required(),
      initialValue: 'available'
    },

    // Social Proof
    {
      name: 'testimonials',
      title: 'Preporuke roditelja',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      description: 'Testimonijali specifično o ovom edukatoru'
    },

    // Administrative
    {
      name: 'featured',
      title: 'Izdvojen edukator',
      type: 'boolean',
      description: 'Prikaži kao featured na stranici edukatora',
      initialValue: false
    },
    {
      name: 'isActive',
      title: 'Aktivan',
      type: 'boolean',
      description: 'Da li edukator trenutno radi',
      initialValue: true
    },
    {
      name: 'order',
      title: 'Redosled prikaza',
      type: 'number',
      validation: (Rule: Rule) => Rule.integer().min(1),
      initialValue: 100
    }
  ],

  // Preview
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      center: 'centerAffiliation.name',
      workType: 'workType',
      featured: 'featured',
      photo: 'photo',
      isActive: 'isActive'
    },
    prepare({ title, subtitle, center, workType, featured, photo, isActive }) {
      const workTypeEmoji = {
        'center-employed': '🏢',
        'independent': '🆓',
        'mobile': '🚗',
        'online': '💻'
      }[workType] || '👨‍🏫'

      const status = isActive ? '' : ' (Neaktivan)'
      const centerInfo = center ? ` @ ${center}` : ''

      return {
        title: `${featured ? '⭐ ' : ''}${title}${status}`,
        subtitle: `${subtitle}${centerInfo} ${workTypeEmoji}`,
        media: photo || (() => '👨‍🏫')
      }
    }
  }
}

// =================================================================
// SUPPORTING SCHEMAS
// =================================================================

// Enhanced Program Schema
export const enhancedProgram: SchemaTypeDefinition = {
  name: 'program',
  title: 'Edukacijski programi',
  type: 'document',
  icon: () => '📚',
  fields: [
    {
      name: 'title',
      title: 'Naziv programa',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL Putanja',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'category',
      title: 'Kategorija',
      type: 'string',
      options: {
        list: [
          { title: 'Brzočitanje', value: 'speed-reading' },
          { title: 'Mentalna aritmetika', value: 'mental-arithmetic' },
          { title: 'Tehnike memorije', value: 'memory-techniques' },
          { title: 'Kompletni program', value: 'complete-program' }
        ]
      }
    },
    {
      name: 'ageGroups',
      title: 'Uzrasne grupe',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Predškolci (4-6)', value: '4-6' },
          { title: 'Mlađi školski (7-10)', value: '7-10' },
          { title: 'Stariji školski (11-14)', value: '11-14' },
          { title: 'Srednjoškolci (15-18)', value: '15-18' }
        ]
      }
    },
    {
      name: 'duration',
      title: 'Trajanje programa',
      type: 'string',
      description: 'npr. "6 meseci", "12 nedelja"'
    },
    {
      name: 'sessionCount',
      title: 'Broj časova',
      type: 'number',
      validation: (Rule: Rule) => Rule.integer().min(1)
    },
    {
      name: 'groupSize',
      title: 'Veličina grupe',
      type: 'object',
      fields: [
        {
          name: 'min',
          title: 'Minimum učenika',
          type: 'number',
          validation: (Rule: Rule) => Rule.integer().min(1)
        },
        {
          name: 'max',
          title: 'Maksimum učenika',
          type: 'number',
          validation: (Rule: Rule) => Rule.integer().min(1)
        },
        {
          name: 'optimal',
          title: 'Optimalan broj',
          type: 'number',
          validation: (Rule: Rule) => Rule.integer().min(1)
        }
      ]
    },
    {
      name: 'prerequisites',
      title: 'Preduslovi',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Potrebne veštine ili znanja pre upisa'
    },
    {
      name: 'learningOutcomes',
      title: 'Ishodi učenja',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Šta deca nauče po završetku programa'
    },
    {
      name: 'methodology',
      title: 'Metodologija',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detaljni opis metodologije i pristupa'
    },
    {
      name: 'materials',
      title: 'Potrebni materijali',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'item', title: 'Stavka', type: 'string', validation: (Rule: Rule) => Rule.required() },
            { name: 'description', title: 'Opis', type: 'text', rows: 2 },
            { name: 'required', title: 'Obavezno', type: 'boolean', initialValue: true },
            { name: 'providedByCenter', title: 'Centar obezbeđuje', type: 'boolean', initialValue: false }
          ]
        }
      ]
    }
  ]
}

// =================================================================
// EXPORT ALL SCHEMAS
// =================================================================

export const franchiseSystemSchemas = [
  location,
  center,
  educator,
  enhancedProgram
]

export default franchiseSystemSchemas