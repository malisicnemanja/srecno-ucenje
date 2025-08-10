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
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
  },
})