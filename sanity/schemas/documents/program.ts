import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'program',
  title: 'Programi',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naziv Programa',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'icon',
      title: 'Ikonica',
      type: 'string',
      description: 'Naziv ikonice (npr. book, calculator, target)',
      options: {
        list: [
          {title: 'Knjiga', value: 'book'},
          {title: 'Kalkulator', value: 'calculator'},
          {title: 'Meta', value: 'target'},
          {title: 'Mozak', value: 'brain'},
          {title: 'Zvezda', value: 'star'},
          {title: 'Akademska kapa', value: 'graduation-cap'},
          {title: 'Slovo A', value: 'font-size'},
          {title: 'Brojevi', value: 'hashtag'}
        ]
      }
    }),
    defineField({
      name: 'description',
      title: 'Kratak Opis',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'fullDescription',
      title: 'Detaljan Opis',
      type: 'blockContent',
    }),
    defineField({
      name: 'ageRange',
      title: 'Uzrast',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      title: 'Trajanje',
      type: 'string',
    }),
    defineField({
      name: 'groupSize',
      title: 'Veličina Grupe',
      type: 'string',
    }),
    defineField({
      name: 'modules',
      title: 'Moduli',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { 
              name: 'icon', 
              title: 'Ikonica', 
              type: 'string',
              options: {
                list: [
                  {title: 'Ključ', value: 'key'},
                  {title: 'Lightbulb', value: 'lightbulb'},
                  {title: 'Puzzle', value: 'puzzle-piece'},
                  {title: 'Raketa', value: 'rocket'},
                  {title: 'Trofej', value: 'trophy'},
                  {title: 'Oko', value: 'eye'},
                  {title: 'Srce', value: 'heart'},
                  {title: 'Čitanje', value: 'book-open'}
                ]
              }
            },
            { name: 'title', title: 'Naziv', type: 'string' },
            { name: 'description', title: 'Opis', type: 'text' },
            {
              name: 'topics',
              title: 'Teme',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'benefits',
      title: 'Benefiti',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'requirements',
      title: 'Uslovi',
      type: 'object',
      fields: [
        {
          name: 'basic',
          title: 'Osnovni Uslovi',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'desired',
          title: 'Poželjne Karakteristike',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'pricing',
      title: 'Cene',
      type: 'array',
      of: [{ type: 'pricingPlan' }],
    }),
    defineField({
      name: 'order',
      title: 'Redosled',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'duration',
      media: 'icon',
    },
  },
})