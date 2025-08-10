import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export default defineType({
  name: 'experience',
  title: 'Iskustvo',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'basic', title: 'Osnovni Podaci' },
    { name: 'content', title: 'Sadržaj' },
    { name: 'chapters', title: 'Poglavlja' },
    { name: 'tips', title: 'Saveti' },
    { name: 'author', title: 'Autor' },
    { name: 'meta', title: 'Metadata' },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov Iskustva',
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
      name: 'destination',
      title: 'Destinacija',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Zemlja ili grad koji se opisuje',
      group: 'basic'
    }),
    defineField({
      name: 'excerpt',
      title: 'Kratak Opis',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
      description: 'Kratak opis iskustva koji će se prikazati na listing stranici',
      group: 'basic'
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Slika',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: 'Glavna slika koja će se prikazati kao cover iskustva',
      group: 'basic'
    }),
    defineField({
      name: 'gallery',
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
      description: 'Dodatne slike koje ilustruju iskustvo',
      group: 'basic'
    }),
    defineField({
      name: 'content',
      title: 'Glavni Sadržaj',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
      description: 'Uvodni deo teksta o iskustvu',
      group: 'content'
    }),
    defineField({
      name: 'chapters',
      title: 'Poglavlja',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Naslov Poglavlja',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'content',
              title: 'Sadržaj Poglavlja',
              type: 'blockContent',
              validation: (Rule) => Rule.required()
            }
          ]
        }
      ],
      validation: (Rule) => Rule.required().min(1),
      description: 'Poglavlja koja detaljno opisuju različite aspekte iskustva',
      group: 'chapters'
    }),
    defineField({
      name: 'tips',
      title: 'Praktični Saveti',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Naslov Saveta',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'description',
              title: 'Opis',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required()
            },
            {
              name: 'icon',
              title: 'Ikona',
              type: 'string',
              options: {
                list: [
                  { title: 'Kalendar', value: 'calendar' },
                  { title: 'Transport', value: 'car' },
                  { title: 'Voda/Zdravlje', value: 'water' },
                  { title: 'Oblačenje', value: 'clothing' },
                  { title: 'Novac', value: 'money' },
                  { title: 'Tehnologija', value: 'tech' },
                  { title: 'Hrana', value: 'food' },
                  { title: 'Smeštaj', value: 'accommodation' },
                  { title: 'Dokumenta', value: 'documents' },
                  { title: 'Energija', value: 'energy' }
                ]
              },
              initialValue: 'calendar'
            }
          ]
        }
      ],
      description: 'Praktični saveti za posetu destinacije',
      group: 'tips'
    }),
    defineField({
      name: 'authorInfo',
      title: 'Informacije o Autoru',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Ime Autora',
          type: 'string',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'bio',
          title: 'Biografija',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required()
        },
        {
          name: 'image',
          title: 'Slika Autora',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      validation: (Rule) => Rule.required(),
      group: 'author'
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata Putovanja',
      type: 'object',
      fields: [
        {
          name: 'duration',
          title: 'Trajanje',
          type: 'string',
          placeholder: '10-14 dana',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'bestTime',
          title: 'Najbolje Vreme za Posetu',
          type: 'string',
          placeholder: 'Oktobar - mart',
          validation: (Rule) => Rule.required()
        },
        {
          name: 'difficulty',
          title: 'Nivo Težine',
          type: 'string',
          options: {
            list: [
              { title: 'Lako', value: 'easy' },
              { title: 'Umereno', value: 'moderate' },
              { title: 'Izazovno', value: 'challenging' }
            ]
          },
          validation: (Rule) => Rule.required()
        }
      ],
      validation: (Rule) => Rule.required(),
      group: 'meta'
    }),
    defineField({
      name: 'publishedDate',
      title: 'Datum Objavljivanja',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
      group: 'meta'
    }),
    defineField({
      name: 'featured',
      title: 'Istaknut',
      type: 'boolean',
      initialValue: false,
      description: 'Da li će se iskustvo prikazati kao istaknuto',
      group: 'meta'
    }),
    defineField({
      name: 'seo',
      title: 'SEO Podešavanja',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Naslov',
          type: 'string',
          validation: (Rule) => Rule.max(60),
          description: 'Naslov za search engines (max 60 karaktera)'
        },
        {
          name: 'metaDescription',
          title: 'Meta Opis',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.max(160),
          description: 'Opis za search engines (max 160 karaktera)'
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
      destination: 'destination',
      media: 'heroImage',
      date: 'publishedDate',
      featured: 'featured'
    },
    prepare(selection) {
      const { title, destination, date } = selection
      
      return {
        ...selection,
        title: title,
        subtitle: `${destination} • ${
          date ? new Date(date).toLocaleDateString('sr-RS') : 'Bez datuma'
        }`
      }
    }
  },
  
  orderings: [
    {
      title: 'Datum objavljivanja (najnoviji)',
      name: 'publishedDateDesc',
      by: [
        { field: 'publishedDate', direction: 'desc' }
      ]
    },
    {
      title: 'Naslov (A-Z)',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    },
    {
      title: 'Destinacija (A-Z)',
      name: 'destinationAsc',
      by: [
        { field: 'destination', direction: 'asc' }
      ]
    }
  ]
})