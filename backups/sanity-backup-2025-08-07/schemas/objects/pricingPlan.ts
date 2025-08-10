import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pricingPlan',
  title: 'Plan Cena',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Naziv Plana',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Cena',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'currency',
      title: 'Valuta',
      type: 'string',
      initialValue: 'RSD',
    }),
    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      initialValue: 'mesečno',
    }),
    defineField({
      name: 'features',
      title: 'Karakteristike',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Preporučeno',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'buttonText',
      title: 'Tekst Dugmeta',
      type: 'string',
      initialValue: 'Izaberite Plan',
    }),
  ],
})