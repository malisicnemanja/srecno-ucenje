import { defineField, defineType } from 'sanity'

const methodology = defineType({
  name: 'methodology',
  title: 'Metodologija',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Sekcija',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Naslov',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'subtitle',
          title: 'Podnaslov',
          type: 'text',
          rows: 2,
        },
        {
          name: 'backgroundImage',
          title: 'Pozadinska Slika',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'introduction',
      title: 'Uvod',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Naslov',
          type: 'string',
        },
        {
          name: 'content',
          title: 'Sadržaj',
          type: 'blockContent',
        },
        {
          name: 'image',
          title: 'Slika',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'methods',
      title: 'Metode',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Naziv Metode',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Opis',
              type: 'text',
              rows: 3,
            },
            {
              name: 'content',
              title: 'Detaljan Sadržaj',
              type: 'blockContent',
            },
            {
              name: 'image',
              title: 'Ilustracija',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'benefits',
              title: 'Benefiti',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'steps',
              title: 'Koraci',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'number',
                      title: 'Broj Koraka',
                      type: 'number',
                    },
                    {
                      name: 'title',
                      title: 'Naslov',
                      type: 'string',
                    },
                    {
                      name: 'description',
                      title: 'Opis',
                      type: 'text',
                      rows: 2,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'scientificBackground',
      title: 'Naučna Osnova',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Naslov',
          type: 'string',
        },
        {
          name: 'content',
          title: 'Sadržaj',
          type: 'blockContent',
        },
        {
          name: 'research',
          title: 'Istraživanja',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Naslov Istraživanja',
                  type: 'string',
                },
                {
                  name: 'year',
                  title: 'Godina',
                  type: 'number',
                },
                {
                  name: 'source',
                  title: 'Izvor',
                  type: 'string',
                },
                {
                  name: 'finding',
                  title: 'Glavni Nalazi',
                  type: 'text',
                  rows: 2,
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Galerija',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Slika',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Opis',
              type: 'string',
            },
            {
              name: 'category',
              title: 'Kategorija',
              type: 'string',
              options: {
                list: [
                  { title: 'Učionica', value: 'classroom' },
                  { title: 'Materijali', value: 'materials' },
                  { title: 'Aktivnosti', value: 'activities' },
                  { title: 'Rezultati', value: 'results' },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline Razvoja',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'year',
              title: 'Godina',
              type: 'number',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Naslov',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Opis',
              type: 'text',
              rows: 2,
            },
            {
              name: 'milestone',
              title: 'Prekretnica',
              type: 'boolean',
              description: 'Označite ako je ovo važna prekretnica',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'comparison',
      title: 'Poređenje sa Tradicionalnim Metodama',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Naslov',
          type: 'string',
        },
        {
          name: 'items',
          title: 'Stavke za Poređenje',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'aspect',
                  title: 'Aspekt',
                  type: 'string',
                },
                {
                  name: 'traditional',
                  title: 'Tradicionalna Metoda',
                  type: 'text',
                  rows: 2,
                },
                {
                  name: 'ourMethod',
                  title: 'Naša Metoda',
                  type: 'text',
                  rows: 2,
                },
              ],
            },
          ],
        },
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
    },
  },
})

export default methodology