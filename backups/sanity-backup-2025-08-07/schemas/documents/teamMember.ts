import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Tim',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ime i Prezime',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Pozicija',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      rows: 4,
    }),
    defineField({
      name: 'qualifications',
      title: 'Kvalifikacije',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Redosled',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image',
    },
  },
})