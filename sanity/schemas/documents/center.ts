import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'center',
  title: 'Obrazovni centri',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {
      name: 'basic',
      title: 'Osnovne informacije',
      default: true
    },
    {
      name: 'location',
      title: 'Lokacija'
    },
    {
      name: 'staff',
      title: 'Personal'
    },
    {
      name: 'programs',
      title: 'Programi'
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
      name: 'name',
      title: 'Naziv centra',
      type: 'string',
      group: 'basic',
      validation: Rule => Rule.required().min(3).max(100),
      description: 'Puni naziv centra (npr. "Srećno učenje - Centar Novi Sad")'
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
      description: 'URL identifikator za centar'
    }),
    defineField({
      name: 'shortName',
      title: 'Kratki naziv',
      type: 'string',
      group: 'basic',
      validation: Rule => Rule.max(50),
      description: 'Skraćeni naziv za prikazovanje (npr. "Novi Sad", "Vračar")'
    }),
    defineField({
      name: 'city',
      title: 'Grad',
      type: 'reference',
      to: [{ type: 'location' }],
      group: 'location',
      validation: Rule => Rule.required(),
      description: 'Grad u kojem se nalazi centar'
    }),
    defineField({
      name: 'status',
      title: 'Status centra',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Aktivan', value: 'active' },
          { title: 'Uskoro otvaranje', value: 'coming-soon' },
          { title: 'U pripremi', value: 'in-preparation' },
          { title: 'Zatvoreno', value: 'closed' },
          { title: 'Privremeno zatvoreno', value: 'temporarily-closed' }
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required(),
      initialValue: 'active'
    }),
    defineField({
      name: 'address',
      title: 'Adresa',
      type: 'object',
      group: 'location',
      fields: [
        defineField({
          name: 'street',
          title: 'Ulica i broj',
          type: 'string',
          validation: Rule => Rule.required(),
          description: 'Puna adresa ulice'
        }),
        defineField({
          name: 'city',
          title: 'Grad',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'postalCode',
          title: 'Poštanski broj',
          type: 'string'
        }),
        defineField({
          name: 'coordinates',
          title: 'GPS koordinate',
          type: 'object',
          fields: [
            {
              name: 'lat',
              title: 'Latitude',
              type: 'number',
              validation: Rule => Rule.required().min(-90).max(90)
            },
            {
              name: 'lng',
              title: 'Longitude',
              type: 'number',
              validation: Rule => Rule.required().min(-180).max(180)
            }
          ],
          description: 'Tačne GPS koordinate za Google Maps'
        })
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'contact',
      title: 'Kontakt informacije',
      type: 'object',
      group: 'location',
      fields: [
        defineField({
          name: 'phone',
          title: 'Telefon',
          type: 'string',
          validation: Rule => Rule.required(),
          description: 'Glavni telefon centra'
        }),
        defineField({
          name: 'email',
          title: 'Email adresa',
          type: 'string',
          validation: Rule => Rule.required().email(),
          description: 'Glavni email centra'
        }),
        defineField({
          name: 'workingHours',
          title: 'Radno vreme',
          type: 'object',
          fields: [
            {
              name: 'weekdays',
              title: 'Radni dani',
              type: 'string',
              initialValue: 'Ponedeljak - Petak: 08:00 - 20:00'
            },
            {
              name: 'saturday',
              title: 'Subota',
              type: 'string',
              initialValue: 'Subota: 09:00 - 15:00'
            },
            {
              name: 'sunday',
              title: 'Nedelja',
              type: 'string',
              initialValue: 'Nedelja: Zatvoreno'
            }
          ]
        })
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'manager',
      title: 'Menadžer centra',
      type: 'object',
      group: 'staff',
      fields: [
        defineField({
          name: 'name',
          title: 'Ime i prezime',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'photo',
          title: 'Fotografija',
          type: 'image',
          options: {
            hotspot: true
          }
        }),
        defineField({
          name: 'bio',
          title: 'Kratka biografija',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Kratak opis menadžera i iskustva'
        }),
        defineField({
          name: 'phone',
          title: 'Telefon',
          type: 'string',
          description: 'Direktan telefon menadžera'
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: Rule => Rule.email(),
          description: 'Email adresa menadžera'
        })
      ],
      description: 'Informacije o menadžeru centra'
    }),
    defineField({
      name: 'educators',
      title: 'Edukatori',
      type: 'array',
      group: 'staff',
      of: [
        {
          type: 'reference',
          to: [{ type: 'educator' }]
        }
      ],
      description: 'Lista edukatora koji rade u ovom centru'
    }),
    defineField({
      name: 'capacity',
      title: 'Kapacitet centra',
      type: 'object',
      group: 'programs',
      fields: [
        defineField({
          name: 'totalStudents',
          title: 'Ukupno učenika',
          type: 'number',
          validation: Rule => Rule.min(1),
          description: 'Maksimalan broj učenika'
        }),
        defineField({
          name: 'classrooms',
          title: 'Broj učionica',
          type: 'number',
          validation: Rule => Rule.min(1)
        }),
        defineField({
          name: 'ageGroups',
          title: 'Uzrasne grupe',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: '3-4 godine', value: '3-4' },
              { title: '5-6 godina', value: '5-6' },
              { title: '7-10 godina', value: '7-10' },
              { title: '11-14 godina', value: '11-14' },
              { title: 'Odrasli', value: 'adults' }
            ]
          }
        })
      ]
    }),
    defineField({
      name: 'programs',
      title: 'Dostupni programi',
      type: 'array',
      group: 'programs',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Predškolski program', value: 'preschool' },
          { title: 'Školski program', value: 'school' },
          { title: 'Brza čitanja', value: 'speed-reading' },
          { title: 'Koncentracija', value: 'concentration' },
          { title: 'Kreativno pisanje', value: 'creative-writing' },
          { title: 'Mentalna aritmetika', value: 'mental-arithmetic' },
          { title: 'Radionice', value: 'workshops' },
          { title: 'Letnji kamp', value: 'summer-camp' },
          { title: 'Zimski kamp', value: 'winter-camp' },
          { title: 'Rođendanske zabave', value: 'birthdays' },
          { title: 'Online programi', value: 'online' }
        ]
      },
      validation: Rule => Rule.required().min(1),
      description: 'Programi koji se izvode u centru'
    }),
    defineField({
      name: 'specialties',
      title: 'Specijalnosti centra',
      type: 'array',
      group: 'programs',
      of: [{ type: 'string' }],
      description: 'Posebne karakteristike ili fokus centra'
    }),
    defineField({
      name: 'description',
      title: 'Opis centra',
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
      description: 'Detaljni opis centra, atmosfere, pristupa'
    }),
    defineField({
      name: 'images',
      title: 'Fotografije centra',
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
                  { title: 'Spoljašnjost', value: 'exterior' },
                  { title: 'Učionice', value: 'classrooms' },
                  { title: 'Aktivnosti', value: 'activities' },
                  { title: 'Događaji', value: 'events' },
                  { title: 'Tim', value: 'team' }
                ]
              }
            }
          ]
        }
      ],
      description: 'Fotografije centra, učionica, aktivnosti'
    }),
    defineField({
      name: 'virtualTour',
      title: 'Virtuelna šetnja',
      type: 'url',
      group: 'media',
      description: 'Link ka virtuelnoj šetnji centra'
    }),
    defineField({
      name: 'videos',
      title: 'Video materijali',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Naslov',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'url',
              title: 'YouTube URL',
              type: 'url',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Opis',
              type: 'text'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'achievements',
      title: 'Postignuća',
      type: 'array',
      group: 'basic',
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
              name: 'image',
              title: 'Slika',
              type: 'image'
            }
          ]
        }
      ],
      description: 'Nagrade, priznanja, značajni rezultati'
    }),
    defineField({
      name: 'featured',
      title: 'Istaknuti centar',
      type: 'boolean',
      group: 'basic',
      initialValue: false,
      description: 'Da li je centar istaknut na početnoj strani'
    }),
    defineField({
      name: 'isActive',
      title: 'Aktivan',
      type: 'boolean',
      group: 'basic',
      initialValue: true,
      description: 'Da li je centar aktivan i vidljiv na sajtu'
    }),
    defineField({
      name: 'order',
      title: 'Redosled prikaza',
      type: 'number',
      group: 'basic',
      validation: Rule => Rule.required().integer().min(0),
      description: 'Redosled prikaza u listi centara'
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
        }),
        defineField({
          name: 'image',
          title: 'Social sharing slika',
          type: 'image',
          description: 'Slika za deljenje na društvenim mrežama'
        })
      ]
    })
  ],
  preview: {
    select: {
      name: 'name',
      shortName: 'shortName',
      status: 'status',
      city: 'city.name',
      isActive: 'isActive',
      featured: 'featured',
      image: 'images.0'
    },
    prepare({ name, shortName, status, city, isActive, featured, image }) {
      const statusLabels = {
        'active': 'Aktivan',
        'coming-soon': 'Uskoro',
        'in-preparation': 'U pripremi',
        'closed': 'Zatvoreno',
        'temporarily-closed': 'Privremeno zatvoreno'
      }
      
      const displayName = shortName || name
      const subtitle = `${city} - ${statusLabels[status] || status}${!isActive ? ' (Neaktivan)' : ''}`
      
      return {
        title: `${displayName}${featured ? ' ⭐' : ''}`,
        subtitle,
        media: image
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
      title: 'Po nazivu (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }]
    },
    {
      title: 'Po gradu',
      name: 'cityAsc',
      by: [
        { field: 'city.name', direction: 'asc' },
        { field: 'name', direction: 'asc' }
      ]
    },
    {
      title: 'Po statusu',
      name: 'statusAsc',
      by: [
        { field: 'status', direction: 'asc' },
        { field: 'name', direction: 'asc' }
      ]
    }
  ]
})