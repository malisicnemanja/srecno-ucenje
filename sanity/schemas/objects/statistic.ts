import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'statistic',
  title: 'Statistika',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Vrednost',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Oznaka',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Ikonica',
      type: 'string',
    }),
  ],
})