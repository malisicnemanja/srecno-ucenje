import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'legalPage',
  title: 'Pravne stranice',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
      description: 'URL putanja (npr. politika-privatnosti)',
    }),
    defineField({
      name: 'pageType',
      title: 'Tip stranice',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Politika privatnosti', value: 'privacy' },
          { title: 'Uslovi korišćenja', value: 'terms' },
          { title: 'Politika kolačića', value: 'cookies' },
          { title: 'GDPR', value: 'gdpr' },
          { title: 'Ostalo', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'subtitle',
      title: 'Podnaslov',
      type: 'string',
      description: 'Kratko objašnjenje dokumenta',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Poslednje ažurirano',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'effectiveDate',
      title: 'Datum stupanja na snagu',
      type: 'date',
    }),
    defineField({
      name: 'sections',
      title: 'Sekcije',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Naslov sekcije',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'number',
              title: 'Broj sekcije',
              type: 'string',
              description: 'npr. 1. ili 1.1',
            }),
            defineField({
              name: 'content',
              title: 'Sadržaj',
              type: 'array',
              of: [
                { type: 'block' },
                {
                  type: 'object',
                  name: 'bulletList',
                  title: 'Lista sa tackama',
                  fields: [
                    {
                      name: 'items',
                      title: 'Stavke',
                      type: 'array',
                      of: [{ type: 'string' }],
                    },
                  ],
                },
                {
                  type: 'object',
                  name: 'numberedList',
                  title: 'Numerisana lista',
                  fields: [
                    {
                      name: 'items',
                      title: 'Stavke',
                      type: 'array',
                      of: [{ type: 'string' }],
                    },
                  ],
                },
                {
                  type: 'object',
                  name: 'highlight',
                  title: 'Istaknuti tekst',
                  fields: [
                    {
                      name: 'text',
                      title: 'Tekst',
                      type: 'text',
                      rows: 3,
                    },
                    {
                      name: 'type',
                      title: 'Tip',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Info', value: 'info' },
                          { title: 'Upozorenje', value: 'warning' },
                          { title: 'Važno', value: 'important' },
                        ],
                      },
                      initialValue: 'info',
                    },
                  ],
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              number: 'number',
            },
            prepare({ title, number }) {
              return {
                title: number ? `${number} ${title}` : title,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Kontakt informacije',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Email za pravna pitanja',
          type: 'string',
          validation: (Rule) => Rule.email(),
        }),
        defineField({
          name: 'address',
          title: 'Adresa',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'phone',
          title: 'Telefon',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pageType: 'pageType',
      date: 'lastUpdated',
    },
    prepare({ title, pageType, date }) {
      const types = {
        privacy: 'Privatnost',
        terms: 'Uslovi',
        cookies: 'Kolačići',
        gdpr: 'GDPR',
        other: 'Ostalo',
      }
      return {
        title,
        subtitle: `${types[pageType] || pageType} • Ažurirano: ${new Date(date).toLocaleDateString('sr-RS')}`,
      }
    },
  },
})