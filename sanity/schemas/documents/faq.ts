import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'Često Postavljana Pitanja',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Pitanje',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Odgovor',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorija',
      type: 'reference',
      to: [{ type: 'faqCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Redosled',
      type: 'number',
    }),
    defineField({
      name: 'isActive',
      title: 'Aktivan',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'tags',
      title: 'Tagovi',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'title',
      title: 'Naslov (opciono)',
      type: 'string',
      description: 'Opcioni kratki naslov za FAQ',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
  },
})