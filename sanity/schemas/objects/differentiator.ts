import { defineField, defineType } from 'sanity'

const differentiator = defineType({
  name: 'differentiator',
  title: 'Differentiator',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Quality', value: 'quality' },
          { title: 'Innovation', value: 'innovation' },
          { title: 'Support', value: 'support' },
          { title: 'Results', value: 'results' },
          { title: 'Community', value: 'community' },
          { title: 'Method', value: 'method' },
        ],
      },
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
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight Text',
      type: 'string',
      description: 'Key metric or fact to highlight',
    }),
  ],
})

export default differentiator