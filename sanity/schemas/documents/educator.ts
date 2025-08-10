import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export default defineType({
  name: 'educator',
  title: 'Edukatori',
  type: 'document',
  icon: UserIcon,
  groups: [
    {
      name: 'basic',
      title: 'Osnovne informacije',
      default: true
    },
    {
      name: 'professional',
      title: 'Profesionalne informacije'
    },
    {
      name: 'contact',
      title: 'Kontakt'
    },
    {
      name: 'media',
      title: 'Mediji'
    },
    {
      name: 'seo',
      title: 'SEO'
    }
  ],
  fields: [
    defineField({
      name: 'firstName',
      title: 'Ime',
      type: 'string',
      group: 'basic',
      validation: Rule => Rule.required().min(2).max(50),
      description: 'Ime edukatora'
    }),
    defineField({
      name: 'lastName',
      title: 'Prezime',
      type: 'string',
      group: 'basic',
      validation: Rule => Rule.required().min(2).max(50),
      description: 'Prezime edukatora'
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: (doc) => `${doc.firstName} ${doc.lastName}`,
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
      description: 'URL identifikator (automatski generisan iz imena)'
    }),
    defineField({
      name: 'title',
      title: 'Titula/Pozicija',
      type: 'string',
      group: 'basic',
      validation: Rule => Rule.max(100),
      description: 'Zvanje ili pozicija (npr. "Senior edukator", "Stručni saradnik")'
    }),
    defineField({
      name: 'photo',
      title: 'Fotografija',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required(),
      description: 'Profesionalna fotografija edukatora'
    }),
    defineField({
      name: 'bio',
      title: 'Biografija',
      type: 'array',
      group: 'basic',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' }
            ]
          }
        }
      ],
      validation: Rule => Rule.required(),
      description: 'Detaljni opis edukatora, iskustva, pristupa'
    }),
    defineField({
      name: 'shortBio',
      title: 'Kratka biografija',
      type: 'text',
      group: 'basic',
      validation: Rule => Rule.max(300),
      description: 'Kratki opis za pregled i kartice (do 300 karaktera)'
    }),
    defineField({
      name: 'centers',
      title: 'Centri',
      type: 'array',
      group: 'professional',
      of: [
        {
          type: 'reference',
          to: [{ type: 'center' }]
        }
      ],
      validation: Rule => Rule.required().min(1),
      description: 'Centri u kojima edukator radi'
    }),
    defineField({
      name: 'specializations',
      title: 'Specijalnosti',
      type: 'array',
      group: 'professional',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Predškolski uzrast (3-6 godina)', value: 'preschool' },
          { title: 'Mladi školski uzrast (7-10 godina)', value: 'elementary' },
          { title: 'Stariji školski uzrast (11-14 godina)', value: 'middle-school' },
          { title: 'Srednja škola (15-18 godina)', value: 'high-school' },
          { title: 'Odrasli', value: 'adults' },
          { title: 'Brzo čitanje', value: 'speed-reading' },
          { title: 'Mentalna aritmetika', value: 'mental-arithmetic' },
          { title: 'Koncentracija i pažnja', value: 'concentration' },
          { title: 'Kreativno pisanje', value: 'creative-writing' },
          { title: 'Razvojna psihologija', value: 'developmental-psychology' },
          { title: 'Rad sa decom sa posebnim potrebama', value: 'special-needs' },
          { title: 'Online nastava', value: 'online-teaching' }
        ]
      },
      validation: Rule => Rule.required().min(1),
      description: 'Oblasti u kojima se edukator specijalizuje'
    }),
    defineField({
      name: 'experience',
      title: 'Iskustvo',
      type: 'object',
      group: 'professional',
      fields: [
        defineField({
          name: 'yearsTotal',
          title: 'Ukupno godina iskustva',
          type: 'number',
          validation: Rule => Rule.min(0).max(50),
          description: 'Ukupno godina rada u obrazovanju'
        }),
        defineField({
          name: 'yearsWithCompany',
          title: 'Godina u Srećno učenje',
          type: 'number',
          validation: Rule => Rule.min(0),
          description: 'Godina rada sa našom organizacijom'
        }),
        defineField({
          name: 'previousExperience',
          title: 'Prethodno iskustvo',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'position',
                  title: 'Pozicija',
                  type: 'string',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'organization',
                  title: 'Organizacija',
                  type: 'string',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'duration',
                  title: 'Period',
                  type: 'string',
                  description: 'npr. "2018-2020" ili "3 godine"'
                },
                {
                  name: 'description',
                  title: 'Opis',
                  type: 'text'
                }
              ]
            }
          ],
          description: 'Prethodno radno iskustvo'
        })
      ]
    }),
    defineField({
      name: 'education',
      title: 'Obrazovanje',
      type: 'array',
      group: 'professional',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'degree',
              title: 'Stručna sprema',
              type: 'string',
              options: {
                list: [
                  { title: 'Osnovno obrazovanje', value: 'elementary' },
                  { title: 'Srednja škola', value: 'high-school' },
                  { title: 'Viša škola', value: 'college' },
                  { title: 'Bachelor/Osnovne studije', value: 'bachelor' },
                  { title: 'Master/Diplomske studije', value: 'master' },
                  { title: 'Doktorat/PhD', value: 'phd' },
                  { title: 'Specijalizacija', value: 'specialization' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'field',
              title: 'Oblast studija',
              type: 'string',
              validation: Rule => Rule.required(),
              description: 'npr. "Pedagogija", "Psihologija", "Defektologija"'
            },
            {
              name: 'institution',
              title: 'Institucija',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'year',
              title: 'Godina završetka',
              type: 'number',
              validation: Rule => Rule.min(1950).max(new Date().getFullYear() + 10)
            },
            {
              name: 'thesis',
              title: 'Tema rada/teze',
              type: 'string'
            }
          ]
        }
      ],
      validation: Rule => Rule.required().min(1),
      description: 'Formalno obrazovanje edukatora'
    }),
    defineField({
      name: 'certifications',
      title: 'Sertifikati i obuke',
      type: 'array',
      group: 'professional',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Naziv sertifikata',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'issuer',
              title: 'Izdavač',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'year',
              title: 'Godina stečenog',
              type: 'number'
            },
            {
              name: 'description',
              title: 'Opis',
              type: 'text'
            },
            {
              name: 'certificate',
              title: 'Sertifikat (slika)',
              type: 'image'
            }
          ]
        }
      ],
      description: 'Dodatne obuke, sertifikati, seminari'
    }),
    defineField({
      name: 'languages',
      title: 'Jezici',
      type: 'array',
      group: 'professional',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'language',
              title: 'Jezik',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'level',
              title: 'Nivo',
              type: 'string',
              options: {
                list: [
                  { title: 'Osnovni (A1-A2)', value: 'basic' },
                  { title: 'Srednji (B1-B2)', value: 'intermediate' },
                  { title: 'Napredni (C1-C2)', value: 'advanced' },
                  { title: 'Maternji', value: 'native' }
                ]
              },
              validation: Rule => Rule.required()
            }
          ]
        }
      ],
      description: 'Jezici koje edukator govori'
    }),
    defineField({
      name: 'contact',
      title: 'Kontakt informacije',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({
          name: 'phone',
          title: 'Telefon',
          type: 'string',
          description: 'Službeni telefon edukatora'
        }),
        defineField({
          name: 'email',
          title: 'Email adresa',
          type: 'string',
          validation: Rule => Rule.email(),
          description: 'Službena email adresa'
        }),
        defineField({
          name: 'workingHours',
          title: 'Radno vreme',
          type: 'string',
          description: 'Kad je edukator dostupan za kontakt'
        })
      ]
    }),
    defineField({
      name: 'social',
      title: 'Društvene mreže',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          description: 'LinkedIn profil'
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
          description: 'Facebook profil'
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          description: 'Instagram profil'
        }),
        defineField({
          name: 'website',
          title: 'Lični sajt',
          type: 'url',
          description: 'Lična web stranica'
        })
      ]
    }),
    defineField({
      name: 'gallery',
      title: 'Galerija slika',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt tekst',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'caption',
              title: 'Opis slike',
              type: 'string'
            },
            {
              name: 'category',
              title: 'Kategorija',
              type: 'string',
              options: {
                list: [
                  { title: 'Sa časova', value: 'classes' },
                  { title: 'Sa događaja', value: 'events' },
                  { title: 'Radionice', value: 'workshops' },
                  { title: 'Sa decom', value: 'with-children' },
                  { title: 'Profesionalno', value: 'professional' }
                ]
              }
            }
          ]
        }
      ],
      description: 'Fotografije sa časova, događaja, radionica'
    }),
    defineField({
      name: 'achievements',
      title: 'Postignuća i nagrade',
      type: 'array',
      group: 'professional',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Naziv postignuća',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Opis',
              type: 'text'
            },
            {
              name: 'date',
              title: 'Datum',
              type: 'date'
            },
            {
              name: 'issuer',
              title: 'Ko je dodelio',
              type: 'string'
            },
            {
              name: 'image',
              title: 'Slika/Dokument',
              type: 'image'
            }
          ]
        }
      ],
      description: 'Nagrade, priznanja, značajni rezultati'
    }),
    defineField({
      name: 'testimonials',
      title: 'Preporuke',
      type: 'array',
      group: 'professional',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Citat',
              type: 'text',
              validation: Rule => Rule.required()
            },
            {
              name: 'author',
              title: 'Autor',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'position',
              title: 'Pozicija/Uloga',
              type: 'string',
              description: 'npr. "Roditelj", "Kolega", "Upravnik"'
            },
            {
              name: 'photo',
              title: 'Fotografija',
              type: 'image'
            }
          ]
        }
      ],
      description: 'Preporuke od roditelja, kolega, rukovodstva'
    }),
    defineField({
      name: 'featured',
      title: 'Istaknut edukator',
      type: 'boolean',
      group: 'basic',
      initialValue: false,
      description: 'Da li je edukator istaknut na početnoj strani'
    }),
    defineField({
      name: 'isActive',
      title: 'Aktivan',
      type: 'boolean',
      group: 'basic',
      initialValue: true,
      description: 'Da li je edukator aktivan i vidljiv na sajtu'
    }),
    defineField({
      name: 'availability',
      title: 'Dostupnost',
      type: 'string',
      group: 'professional',
      options: {
        list: [
          { title: 'Puno radno vreme', value: 'full-time' },
          { title: 'Skraćeno radno vreme', value: 'part-time' },
          { title: 'Honorarno', value: 'freelance' },
          { title: 'Privremeno nedostupan', value: 'temporarily-unavailable' },
          { title: 'Na odsustvu', value: 'on-leave' }
        ]
      },
      initialValue: 'full-time',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'order',
      title: 'Redosled prikaza',
      type: 'number',
      group: 'basic',
      validation: Rule => Rule.required().integer().min(0),
      description: 'Redosled prikaza u listi edukatora'
    }),
    // SEO Fields
    defineField({
      name: 'seo',
      title: 'SEO podešavanja',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO naslov',
          type: 'string',
          validation: Rule => Rule.max(60),
          description: 'Naslov za Google (do 60 karaktera)'
        }),
        defineField({
          name: 'description',
          title: 'Meta opis',
          type: 'text',
          validation: Rule => Rule.max(160),
          description: 'Opis za Google (do 160 karaktera)'
        }),
        defineField({
          name: 'keywords',
          title: 'Ključne reči',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Ključne reči za pretraživače'
        })
      ]
    })
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      title: 'title',
      isActive: 'isActive',
      featured: 'featured',
      availability: 'availability',
      photo: 'photo',
      centers: 'centers'
    },
    prepare({ firstName, lastName, title, isActive, featured, availability, photo, centers }) {
      const availabilityLabels = {
        'full-time': 'Puno vreme',
        'part-time': 'Skraćeno',
        'freelance': 'Honorarno',
        'temporarily-unavailable': 'Nedostupan',
        'on-leave': 'Na odsustvu'
      }
      
      const name = `${firstName} ${lastName}`
      const roleInfo = title ? `${title}` : ''
      const availabilityInfo = availability ? availabilityLabels[availability] : ''
      const centerCount = centers ? `(${centers.length} centar${centers.length === 1 ? '' : 'a'})` : ''
      
      const subtitle = [roleInfo, availabilityInfo, centerCount]
        .filter(Boolean)
        .join(' • ')
      
      return {
        title: `${name}${featured ? ' ⭐' : ''}${!isActive ? ' (Neaktivan)' : ''}`,
        subtitle,
        media: photo
      }
    }
  },
  orderings: [
    {
      title: 'Po redosledu',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Po prezimenu (A-Z)',
      name: 'lastNameAsc',
      by: [{ field: 'lastName', direction: 'asc' }]
    },
    {
      title: 'Po imenu (A-Z)',
      name: 'firstNameAsc',
      by: [{ field: 'firstName', direction: 'asc' }]
    },
    {
      title: 'Po dostupnosti',
      name: 'availabilityAsc',
      by: [
        { field: 'availability', direction: 'asc' },
        { field: 'lastName', direction: 'asc' }
      ]
    }
  ]
})