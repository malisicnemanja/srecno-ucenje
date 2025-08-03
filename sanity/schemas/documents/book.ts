import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'book',
  title: 'Knjiga',
  type: 'document',
  icon: () => '📚',
  groups: [
    { name: 'basic', title: 'Osnovni Podaci' },
    { name: 'content', title: 'Sadržaj' },
    { name: 'characters', title: 'Likovi' },
    { name: 'media', title: 'Slike i Galerija' },
    { name: 'reviews', title: 'Recenzije' },
    { name: 'purchase', title: 'Prodaja' },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    // Osnovni podaci
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'basic'
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) => input
          .toLowerCase()
          .replace(/š/g, 's')
          .replace(/č/g, 'c')
          .replace(/ć/g, 'c')
          .replace(/ž/g, 'z')
          .replace(/đ/g, 'dj')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      },
      validation: (Rule) => Rule.required(),
      group: 'basic'
    }),
    defineField({
      name: 'subtitle',
      title: 'Podnaslov',
      type: 'string',
      placeholder: 'sa vilom Bosiljčicom',
      group: 'basic'
    }),
    defineField({
      name: 'year',
      title: 'Godina Izdanja',
      type: 'number',
      validation: (Rule) => Rule.required().min(2020).max(new Date().getFullYear()),
      group: 'basic'
    }),
    defineField({
      name: 'colorTheme',
      title: 'Tema Boje',
      type: 'string',
      options: {
        list: [
          { title: 'Žuta (Jesen)', value: 'yellow' },
          { title: 'Plava (Zima)', value: 'blue' },
          { title: 'Zelena (Proleće)', value: 'green' },
          { title: 'Crvena (Leto)', value: 'red' }
        ]
      },
      validation: (Rule) => Rule.required(),
      group: 'basic'
    }),
    defineField({
      name: 'order',
      title: 'Redosled u Serijalu',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(4),
      description: '1 = Jesenja gozba, 2 = Zimski mir, 3 = Prolećna žurba, 4 = Letnja vreva',
      group: 'basic'
    }),

    // Slike
    defineField({
      name: 'coverImage',
      title: 'Korica Knjige',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule) => Rule.required(),
      group: 'media'
    }),
    defineField({
      name: 'heroIllustration',
      title: 'Hero Ilustracija',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Glavna ilustracija za hero sekciju stranice',
      group: 'media'
    }),
    defineField({
      name: 'galleryImages',
      title: 'Galerija Slika',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      group: 'media'
    }),

    // Sadržaj
    defineField({
      name: 'heroText',
      title: 'Hero Tekst',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
      group: 'content'
    }),
    defineField({
      name: 'aboutBook',
      title: 'O Knjizi',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ],
      validation: (Rule) => Rule.required(),
      group: 'content'
    }),

    // Vila
    defineField({
      name: 'fairy',
      title: 'Vila',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Ime Vile',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'description',
          title: 'Opis Vile',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.required()
        },
        {
          name: 'virtues',
          title: 'Vrline',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (Rule) => Rule.required().min(1)
        },
        {
          name: 'illustration',
          title: 'Ilustracija Vile',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'birthDate',
          title: 'Datum Rođenja',
          type: 'string',
          placeholder: '17. septembar'
        },
        {
          name: 'secretPlace',
          title: 'Tajna Radionica',
          type: 'string',
          placeholder: 'Vajat ukusa'
        }
      ],
      group: 'characters'
    }),

    // Deca likovi
    defineField({
      name: 'childCharacters',
      title: 'Deca Likovi',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Ime Deteta',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'description',
              title: 'Opis',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required()
            },
            {
              name: 'characteristics',
              title: 'Karakteristike',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required().min(1)
            },
            {
              name: 'illustration',
              title: 'Ilustracija',
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ]
        }
      ],
      group: 'characters'
    }),

    // Recenzije
    defineField({
      name: 'reviews',
      title: 'Recenzije',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Tekst Recenzije',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required()
            },
            {
              name: 'author',
              title: 'Autor Recenzije',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'title',
              title: 'Titula/Pozicija',
              type: 'string',
              placeholder: 'pisac, pedagog, rodzitelj...'
            },
            {
              name: 'rating',
              title: 'Ocena',
              type: 'number',
              validation: (Rule) => Rule.min(1).max(5),
              options: {
                list: [
                  { title: '⭐', value: 1 },
                  { title: '⭐⭐', value: 2 },
                  { title: '⭐⭐⭐', value: 3 },
                  { title: '⭐⭐⭐⭐', value: 4 },
                  { title: '⭐⭐⭐⭐⭐', value: 5 }
                ]
              }
            }
          ]
        }
      ],
      group: 'reviews'
    }),

    // Prodaja
    defineField({
      name: 'purchaseLinks',
      title: 'Linkovi za Kupovinu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'storeName',
              title: 'Naziv Prodavnice',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'url',
              title: 'URL Link',
              type: 'url',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'type',
              title: 'Tip Prodavnice',
              type: 'string',
              options: {
                list: [
                  { title: 'Online Prodavnica', value: 'online' },
                  { title: 'Fizička Prodavnica', value: 'physical' }
                ]
              },
              validation: (Rule) => Rule.required()
            },
            {
              name: 'price',
              title: 'Cena (RSD)',
              type: 'number',
              description: 'Cena u dinarima'
            }
          ]
        }
      ],
      group: 'purchase'
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Podešavanja',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Naslov',
          type: 'string',
          validation: (Rule) => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Opis',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.max(160)
        },
        {
          name: 'ogImage',
          title: 'Social Media Slika',
          type: 'image',
          options: {
            hotspot: true
          },
          description: 'Slika za Facebook, Twitter, itd.'
        },
        {
          name: 'keywords',
          title: 'Ključne Reči',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'SEO ključne reči'
        }
      ],
      group: 'seo'
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      year: 'year',
      media: 'coverImage',
      colorTheme: 'colorTheme'
    },
    prepare(selection) {
      const { title, subtitle, year, colorTheme } = selection
      const colors = {
        yellow: '🟡',
        blue: '🔵', 
        green: '🟢',
        red: '🔴'
      }
      
      return {
        title: title,
        subtitle: `${subtitle} (${year}) ${colors[colorTheme] || ''}`,
        media: selection.media
      }
    }
  },
  
  orderings: [
    {
      title: 'Redosled u Serijalu',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    },
    {
      title: 'Godina Izdanja',
      name: 'yearDesc',
      by: [
        { field: 'year', direction: 'desc' }
      ]
    }
  ]
})