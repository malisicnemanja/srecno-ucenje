import { defineField, defineType } from 'sanity'

const franchiseStep = defineType({
  name: 'franchiseStep',
  title: 'Franchise Step',
  type: 'object',
  fields: [
    defineField({
      name: 'stepNumber',
      title: 'Step Number',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "1-2 dana", "7 dana"',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Phone', value: 'phone' },
          { title: 'Document', value: 'document' },
          { title: 'Meeting', value: 'meeting' },
          { title: 'Contract', value: 'contract' },
          { title: 'Training', value: 'training' },
          { title: 'Launch', value: 'launch' },
        ],
      },
    }),
  ],
})

export default franchiseStep