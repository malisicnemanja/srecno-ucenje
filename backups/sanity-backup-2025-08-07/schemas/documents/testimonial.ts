import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Iskustva',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ime',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Ime autora (Alternative)',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Uloga',
      type: 'string',
      description: 'npr. Roditelj, Učenik',
    }),
    defineField({
      name: 'authorRole',
      title: 'Uloga autora (Alternative)',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Iskustvo',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Ocena',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'image',
      title: 'Slika',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Izdvojeno',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'location',
      title: 'Lokacija',
      type: 'string',
      description: 'npr. Beograd, Novi Sad',
    }),
    defineField({
      name: 'createdAt',
      title: 'Datum kreiranja',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})