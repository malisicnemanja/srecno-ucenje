import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Naslov',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Opis',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'keywords',
      title: 'Ključne Reči',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Slika',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})