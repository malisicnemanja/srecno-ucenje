import { defineField, defineType } from 'sanity'
import { RocketIcon } from '@sanity/icons'

export default defineType({
  name: 'franchiseModelsPage',
  title: 'Franchise Modeli Stranica',
  type: 'document',
  icon: RocketIcon,
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
        defineField({
          name: 'alternatingTitles',
          title: 'Naizmenični naslovi',
          type: 'array',
          of: [{ type: 'string' }],
          validation: Rule => Rule.required().min(2)
        }),
        defineField({
          name: 'subtitle',
          title: 'Podnaslov',
          type: 'text'
        }),
        defineField({
          name: 'description',
          title: 'Opis',
          type: 'array',
          of: [{ type: 'block' }]
        }),
        defineField({
          name: 'floatingElements',
          title: 'Plutajući elementi',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'text', title: 'Tekst', type: 'string' },
                { name: 'icon', title: 'Ikona', type: 'string' },
                { name: 'position', title: 'Pozicija', type: 'string', options: {
                  list: [
                    { title: 'Gore levo', value: 'top-left' },
                    { title: 'Gore desno', value: 'top-right' },
                    { title: 'Dole levo', value: 'bottom-left' },
                    { title: 'Dole desno', value: 'bottom-right' },
                    { title: 'Centar levo', value: 'center-left' },
                    { title: 'Centar desno', value: 'center-right' }
                  ]
                }},
                { name: 'delay', title: 'Kašnjenje animacije (ms)', type: 'number', initialValue: 0 }
              ]
            }
          ]
        }),
        defineField({
          name: 'backgroundVideo',
          title: 'Video u pozadini',
          type: 'file',
          options: {
            accept: 'video/*'
          }
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Slika u pozadini',
          type: 'image',
          options: { hotspot: true }
        })
      ]
    }),
    defineField({
      name: 'statistics',
      title: 'Statistike',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Naslov sekcije',
          type: 'string'
        }),
        defineField({
          name: 'stats',
          title: 'Statistike',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'number', title: 'Broj', type: 'string', validation: Rule => Rule.required() },
                { name: 'label', title: 'Opis', type: 'string', validation: Rule => Rule.required() },
                { name: 'icon', title: 'Ikona', type: 'string' },
                { name: 'suffix', title: 'Sufiks (npr. +, %)', type: 'string' },
                { name: 'animationDuration', title: 'Trajanje animacije (ms)', type: 'number', initialValue: 2000 }
              ]
            }
          ],
          validation: Rule => Rule.min(3).max(6)
        })
      ]
    }),
    defineField({
      name: 'packagesSection',
      title: 'Sekcija paketa',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Naslov sekcije',
          type: 'string'
        }),
        defineField({
          name: 'subtitle',
          title: 'Podnaslov',
          type: 'string'
        }),
        defineField({
          name: 'packages',
          title: 'Paketi',
          type: 'array',
          of: [{ type: 'reference', to: { type: 'franchisePackage' } }],
          validation: Rule => Rule.required().min(1)
        })
      ]
    }),
    defineField({
      name: 'ctaSections',
      title: 'CTA sekcije',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Naslov', type: 'string', validation: Rule => Rule.required() },
            { name: 'description', title: 'Opis', type: 'text' },
            { name: 'buttonText', title: 'Tekst dugmeta', type: 'string', validation: Rule => Rule.required() },
            { name: 'buttonLink', title: 'Link dugmeta', type: 'string', validation: Rule => Rule.required() },
            { name: 'backgroundColor', title: 'Boja pozadine', type: 'string', options: {
              list: [
                { title: 'Primarna', value: 'primary' },
                { title: 'Sekundarna', value: 'secondary' },
                { title: 'Gradijent', value: 'gradient' },
                { title: 'Svetla', value: 'light' }
              ]
            }},
            { name: 'image', title: 'Slika', type: 'image', options: { hotspot: true } }
          ]
        }
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
        title: title || 'Franchise Modeli',
        subtitle: 'Stranica modela'
      }
    }
  }
})