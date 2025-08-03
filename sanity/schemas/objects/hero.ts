import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Sekcija',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Podnaslov',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Pozadinska Slika',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Tekst',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaText',
      title: 'Sekundarni CTA Tekst',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaLink',
      title: 'Sekundarni CTA Link',
      type: 'string',
    }),
  ],
})