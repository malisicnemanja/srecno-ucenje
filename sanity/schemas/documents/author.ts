import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Autori',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ime i Prezime',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
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
      name: 'bio',
      title: 'Biografija',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'title',
      title: 'Titula',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
    },
  },
})