import { defineField, defineType } from 'sanity'
import { PinIcon } from '@sanity/icons'

export default defineType({
  name: 'location',
  title: 'Gradovi',
  type: 'document',
  icon: PinIcon,
  groups: [
    {
      name: 'basic',
      title: 'Osnovne informacije',
      default: true
    },
    {
      name: 'details',
      title: 'Detalji'
    },
    {
      name: 'seo',
      title: 'SEO'
    }
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Naziv grada',
      type: 'string',
      group: 'basic',
      validation: Rule => Rule.required().min(2).max(50),
      description: 'Puni naziv grada (npr. "Novi Sad")'
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
      description: 'URL identifikator (automatski generisan iz naziva)'
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Vojvodina', value: 'vojvodina' },
          { title: 'Beograd', value: 'belgrade' },
          { title: 'Šumadija i Zapadna Srbija', value: 'sumadija' },
          { title: 'Južna i Istočna Srbija', value: 'juzna-srbija' },
          { title: 'Kosovo i Metohija', value: 'kosovo' }
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'coordinates',
      title: 'Geografske koordinate',
      type: 'object',
      group: 'details',
      fields: [
        defineField({
          name: 'lat',
          title: 'Širina (Latitude)',
          type: 'number',
          validation: Rule => Rule.required().min(-90).max(90),
          description: 'Geografska širina (-90 do 90)'
        }),
        defineField({
          name: 'lng',
          title: 'Dužina (Longitude)', 
          type: 'number',
          validation: Rule => Rule.required().min(-180).max(180),
          description: 'Geografska dužina (-180 do 180)'
        })
      ],
      validation: Rule => Rule.required(),
      preview: {
        select: {
          lat: 'lat',
          lng: 'lng'
        },
        prepare({ lat, lng }) {
          return {
            title: `${lat?.toFixed(4)}, ${lng?.toFixed(4)}`,
          }
        }
      }
    }),
    defineField({
      name: 'description',
      title: 'Opis grada',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
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
      description: 'Detaljni opis grada, tržišta, mogućnosti'
    }),
    defineField({
      name: 'marketAnalysis',
      title: 'Analiza tržišta',
      type: 'object',
      group: 'details',
      fields: [
        defineField({
          name: 'marketSize',
          title: 'Veličina tržišta',
          type: 'string',
          options: {
            list: [
              { title: 'Veliko tržište (100k+ stanovnika)', value: 'large' },
              { title: 'Srednje tržište (30k-100k)', value: 'medium' },
              { title: 'Malo tržište (do 30k)', value: 'small' }
            ],
            layout: 'dropdown'
          },
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'demandLevel',
          title: 'Nivo potražnje',
          type: 'string',
          options: {
            list: [
              { title: 'Visoka potražnja', value: 'high' },
              { title: 'Umerena potražnja', value: 'medium' },
              { title: 'Niska potražnja', value: 'low' }
            ],
            layout: 'radio'
          },
          validation: Rule => Rule.required(),
          initialValue: 'medium'
        }),
        defineField({
          name: 'competition',
          title: 'Konkurencija',
          type: 'string',
          options: {
            list: [
              { title: 'Niska konkurencija', value: 'low' },
              { title: 'Umerena konkurencija', value: 'medium' },
              { title: 'Jaka konkurencija', value: 'high' }
            ]
          }
        }),
        defineField({
          name: 'priceMultiplier',
          title: 'Cenovni multiplikator',
          type: 'number',
          validation: Rule => Rule.min(0.5).max(3.0),
          initialValue: 1.0,
          description: 'Faktor koji utiče na cene programa (0.5 - 3.0)'
        })
      ]
    }),
    defineField({
      name: 'contactInfo',
      title: 'Kontakt informacije',
      type: 'object',
      group: 'details',
      fields: [
        defineField({
          name: 'phone',
          title: 'Telefon',
          type: 'string',
          description: 'Glavni telefon za grad (format: +381 XX XXX XXXX)'
        }),
        defineField({
          name: 'email',
          title: 'Email adresa',
          type: 'string',
          validation: Rule => Rule.email(),
          description: 'Glavni email za grad'
        }),
        defineField({
          name: 'address',
          title: 'Adresa kancelarije',
          type: 'string',
          description: 'Glavna adresa za administrativne poslove u gradu'
        }),
        defineField({
          name: 'workingHours',
          title: 'Radno vreme',
          type: 'string',
          placeholder: 'Pon-Pet: 9:00-17:00',
          description: 'Radno vreme glavne kancelarije'
        })
      ]
    }),
    defineField({
      name: 'images',
      title: 'Slike grada',
      type: 'array',
      group: 'details',
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
            }
          ]
        }
      ],
      description: 'Fotografije grada, centara, aktivnosti'
    }),
    defineField({
      name: 'featured',
      title: 'Istaknuti grad',
      type: 'boolean',
      group: 'basic',
      initialValue: false,
      description: 'Da li je grad istaknut na početnoj strani'
    }),
    defineField({
      name: 'isActive',
      title: 'Aktivan',
      type: 'boolean',
      group: 'basic',
      initialValue: true,
      description: 'Da li je grad aktivan i vidljiv na sajtu'
    }),
    defineField({
      name: 'order',
      title: 'Redosled prikaza',
      type: 'number',
      group: 'basic',
      validation: Rule => Rule.required().integer().min(0),
      description: 'Broj koji određuje redosled prikaza (manji broj = veći prioritet)'
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
      region: 'region',
      isActive: 'isActive',
      featured: 'featured',
      image: 'images.0'
    },
    prepare({ name, region, isActive, featured, image }) {
      const regions = {
        'vojvodina': 'Vojvodina',
        'belgrade': 'Beograd',
        'sumadija': 'Šumadija i Zapadna Srbija',
        'juzna-srbija': 'Južna i Istočna Srbija',
        'kosovo': 'Kosovo i Metohija'
      }
      
      return {
        title: `${name}${featured ? ' ⭐' : ''}`,
        subtitle: `${regions[region] || region}${!isActive ? ' (Neaktivan)' : ''}`,
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
      title: 'Po regijama',
      name: 'regionAsc',
      by: [
        { field: 'region', direction: 'asc' },
        { field: 'name', direction: 'asc' }
      ]
    }
  ]
})