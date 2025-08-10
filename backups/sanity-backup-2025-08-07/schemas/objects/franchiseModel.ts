import { defineField, defineType } from 'sanity'

const franchiseModel = defineType({
  name: 'franchiseModel',
  title: 'Franchise Model',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Model Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g., "€5,000"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'highlighted',
      title: 'Highlighted',
      type: 'boolean',
      description: 'Mark as recommended/popular',
      initialValue: false,
    }),
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'e.g., "Najpopularniji", "Najbolja vrednost"',
    }),
  ],
})

export default franchiseModel