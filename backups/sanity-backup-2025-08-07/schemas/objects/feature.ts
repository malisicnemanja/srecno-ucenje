import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'feature',
  title: 'Karakteristika',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Ikonica',
      type: 'string',
      description: 'Emoji ili naziv ikonice',
    }),
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'color',
      title: 'Boja',
      type: 'string',
      description: 'Tailwind CSS klasa za boju (npr. text-blue-500)',
    }),
  ],
})