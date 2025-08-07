import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export default defineType({
  name: 'howToJoinPage',
  title: 'Kako se pridružiti stranica',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov stranice',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL putanja',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'hero',
      title: 'Hero sekcija',
      type: 'object',
      fields: [
        { name: 'title', title: 'Naslov', type: 'string', validation: Rule => Rule.required() },
        { name: 'subtitle', title: 'Podnaslov', type: 'text' },
        { name: 'description', title: 'Opis', type: 'array', of: [{ type: 'block' }] },
        { name: 'image', title: 'Slika', type: 'image', options: { hotspot: true } },
        { name: 'video', title: 'Video', type: 'file', options: { accept: 'video/*' } }
      ]
    }),
    defineField({
      name: 'processSteps',
      title: 'Koraci procesa',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Naslov sekcije',
          type: 'string'
        }),
        defineField({
          name: 'steps',
          title: 'Koraci',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Naslov', type: 'string', validation: Rule => Rule.required() },
                { name: 'shortDescription', title: 'Kratak opis', type: 'text' },
                { name: 'expandedContent', title: 'Prošireni sadržaj', type: 'array', of: [{ type: 'block' }] },
                { name: 'icon', title: 'Ikona', type: 'string' },
                { name: 'duration', title: 'Trajanje', type: 'string' },
                { name: 'requirements', title: 'Zahtevi', type: 'array', of: [{ type: 'string' }] },
                { name: 'deliverables', title: 'Isporuke', type: 'array', of: [{ type: 'string' }] },
                { name: 'tips', title: 'Saveti', type: 'array', of: [{ type: 'string' }] },
                { name: 'ctaButton', title: 'CTA dugme', type: 'object', fields: [
                  { name: 'text', title: 'Tekst', type: 'string' },
                  { name: 'link', title: 'Link', type: 'string' }
                ]}
              ]
            }
          ],
          validation: Rule => Rule.required().min(3)
        })
      ]
    }),
    defineField({
      name: 'faqSection',
      title: 'FAQ sekcija',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Naslov sekcije',
          type: 'string',
          initialValue: 'Česta pitanja o pridruživanju'
        }),
        defineField({
          name: 'faqs',
          title: 'Česta pitanja',
          type: 'array',
          of: [{ type: 'reference', to: { type: 'faq' } }],
          validation: Rule => Rule.min(5)
        })
      ]
    }),
    defineField({
      name: 'motivationalCtas',
      title: 'Motivacioni CTA-ovi',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Naslov', type: 'string', validation: Rule => Rule.required() },
            { name: 'description', title: 'Opis', type: 'text' },
            { name: 'statistics', title: 'Statistike', type: 'array', of: [
              {
                type: 'object',
                fields: [
                  { name: 'number', title: 'Broj', type: 'string' },
                  { name: 'label', title: 'Opis', type: 'string' }
                ]
              }
            ]},
            { name: 'buttonText', title: 'Tekst dugmeta', type: 'string', validation: Rule => Rule.required() },
            { name: 'buttonLink', title: 'Link dugmeta', type: 'string', validation: Rule => Rule.required() },
            { name: 'backgroundColor', title: 'Boja pozadine', type: 'string', options: {
              list: [
                { title: 'Primarna', value: 'primary' },
                { title: 'Sekundarna', value: 'secondary' },
                { title: 'Gradijent', value: 'gradient' },
                { title: 'Neutralna', value: 'neutral' }
              ]
            }},
            { name: 'image', title: 'Slika', type: 'image', options: { hotspot: true } }
          ]
        }
      ]
    }),
    defineField({
      name: 'successStories',
      title: 'Priče uspeha',
      type: 'object',
      fields: [
        { name: 'title', title: 'Naslov sekcije', type: 'string' },
        { name: 'stories', title: 'Priče', type: 'array', of: [{ type: 'reference', to: { type: 'successStory' } }] }
      ]
    }),
    defineField({
      name: 'requirements',
      title: 'Zahtevi',
      type: 'object',
      fields: [
        { name: 'title', title: 'Naslov sekcije', type: 'string' },
        { name: 'categories', title: 'Kategorije zahteva', type: 'array', of: [
          {
            type: 'object',
            fields: [
              { name: 'category', title: 'Kategorija', type: 'string', validation: Rule => Rule.required() },
              { name: 'requirements', title: 'Zahtevi', type: 'array', of: [{ type: 'string' }], validation: Rule => Rule.required() }
            ]
          }
        ]}
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO podešavanja',
      type: 'seo'
    })
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: title || 'Kako se pridružiti',
        subtitle: 'Proces pridruživanja'
      }
    }
  }
})