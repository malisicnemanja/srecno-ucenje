import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cta',
  title: 'CTA Sekcija',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'buttonText',
      title: 'Tekst Dugmeta',
      type: 'string',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Link Dugmeta',
      type: 'string',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Boja Pozadine',
      type: 'string',
      description: 'Tailwind CSS klasa (npr. bg-blue-600)',
    }),
  ],
})