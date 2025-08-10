import { defineField, defineType } from 'sanity'

const leadMagnet = defineType({
  name: 'leadMagnet',
  title: 'Lead Magnet',
  type: 'object',
  fields: [
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
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'PDF', value: 'pdf' },
          { title: 'Video', value: 'video' },
          { title: 'Checklist', value: 'checklist' },
          { title: 'Guide', value: 'guide' },
          { title: 'Calculator', value: 'calculator' },
        ],
      },
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      description: 'e.g., "Preuzmite besplatno"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formId',
      title: 'Form ID',
      type: 'string',
      description: 'ID for tracking conversions',
    }),
  ],
})

export default leadMagnet