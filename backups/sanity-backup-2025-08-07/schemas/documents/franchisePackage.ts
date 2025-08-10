import { defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export default defineType({
  name: 'franchisePackage',
  title: 'Franchise Paketi',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Naziv paketa',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL putanja',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'tagline',
      title: 'Kratak opis',
      type: 'string'
    }),
    defineField({
      name: 'price',
      title: 'Cena',
      type: 'object',
      fields: [
        { name: 'amount', title: 'Iznos', type: 'number', validation: Rule => Rule.required() },
        { name: 'currency', title: 'Valuta', type: 'string', initialValue: 'EUR' },
        { name: 'period', title: 'Period', type: 'string', options: {
          list: [
            { title: 'Jednokratno', value: 'one-time' },
            { title: 'Mesečno', value: 'monthly' },
            { title: 'Godišnje', value: 'yearly' }
          ]
        }},
        { name: 'displayText', title: 'Tekst za prikaz', type: 'string' }
      ]
    }),
    defineField({
      name: 'features',
      title: 'Karakteristike',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Tekst', type: 'string', validation: Rule => Rule.required() },
            { name: 'included', title: 'Uključeno', type: 'boolean', initialValue: true },
            { name: 'highlight', title: 'Istakni', type: 'boolean', initialValue: false },
            { name: 'tooltip', title: 'Dodatne informacije', type: 'text' }
          ]
        }
      ],
      validation: Rule => Rule.required().min(3)
    }),
    defineField({
      name: 'benefits',
      title: 'Benefiti',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'target',
      title: 'Ciljna grupa',
      type: 'text'
    }),
    defineField({
      name: 'investment',
      title: 'Investicija',
      type: 'object',
      fields: [
        { name: 'initial', title: 'Početna investicija', type: 'number' },
        { name: 'monthly', title: 'Mesečni troškovi', type: 'number' },
        { name: 'royalty', title: 'Royalty (%)', type: 'number' },
        { name: 'marketingFee', title: 'Marketing fee (%)', type: 'number' }
      ]
    }),
    defineField({
      name: 'support',
      title: 'Podrška',
      type: 'object',
      fields: [
        { name: 'training', title: 'Obuka', type: 'array', of: [{ type: 'string' }] },
        { name: 'marketing', title: 'Marketing podrška', type: 'array', of: [{ type: 'string' }] },
        { name: 'operational', title: 'Operativna podrška', type: 'array', of: [{ type: 'string' }] }
      ]
    }),
    defineField({
      name: 'timeline',
      title: 'Vremenska linija',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'phase', title: 'Faza', type: 'string', validation: Rule => Rule.required() },
            { name: 'duration', title: 'Trajanje', type: 'string' },
            { name: 'description', title: 'Opis', type: 'text' }
          ]
        }
      ]
    }),
    defineField({
      name: 'highlighted',
      title: 'Istaknut paket',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'badge',
      title: 'Bedž',
      type: 'string',
      description: 'npr. "Najpopularniji", "Najbolja vrednost"'
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA dugme',
      type: 'object',
      fields: [
        { name: 'text', title: 'Tekst', type: 'string', initialValue: 'Započni odmah' },
        { name: 'link', title: 'Link', type: 'string', initialValue: '/kako-se-pridruziti' },
        { name: 'style', title: 'Stil', type: 'string', options: {
          list: [
            { title: 'Primarni', value: 'primary' },
            { title: 'Sekundarni', value: 'secondary' },
            { title: 'Outline', value: 'outline' }
          ]
        }}
      ]
    }),
    defineField({
      name: 'testimonials',
      title: 'Preporuke',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'testimonial' } }]
    }),
    defineField({
      name: 'faq',
      title: 'Česta pitanja',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'faq' } }]
    }),
    defineField({
      name: 'active',
      title: 'Aktivan',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'order',
      title: 'Redosled prikaza',
      type: 'number',
      initialValue: 0
    })
  ],
  orderings: [
    {
      title: 'Po redosledu',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Po ceni',
      name: 'priceAsc', 
      by: [{ field: 'price.amount', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price.amount',
      currency: 'price.currency',
      highlighted: 'highlighted',
      active: 'active'
    },
    prepare({ title, price, currency, highlighted, active }) {
      return {
        title,
        subtitle: `${price} ${currency || 'EUR'} ${highlighted ? '⭐' : ''} ${!active ? '(Neaktivan)' : ''}`,
      }
    }
  }
})