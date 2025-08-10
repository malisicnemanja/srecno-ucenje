import { defineType, defineField } from 'sanity'
import { MenuIcon } from 'lucide-react'

export default defineType({
  name: 'navigation',
  title: 'Navigacija',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      initialValue: 'Glavna navigacija',
      readOnly: true,
    }),
    defineField({
      name: 'mainMenu',
      title: 'Glavni meni',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Naziv',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link',
              type: 'string',
              description: 'Ostavite prazno za dropdown meni',
            },
            {
              name: 'subItems',
              title: 'Podmeni',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Naziv',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'href',
                      title: 'Link',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'description',
                      title: 'Opis',
                      type: 'string',
                      description: 'Kratak opis stavke (opciono)',
                    },
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'href',
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
              subItems: 'subItems',
            },
            prepare({ title, subtitle, subItems }) {
              const hasSubItems = subItems && subItems.length > 0
              return {
                title,
                subtitle: hasSubItems ? `Dropdown sa ${subItems.length} stavki` : subtitle,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Dugme',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Tekst dugmeta',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'href',
          title: 'Link',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'style',
          title: 'Stil',
          type: 'string',
          options: {
            list: [
              { title: 'Primarno', value: 'primary' },
              { title: 'Sekundarno', value: 'secondary' },
              { title: 'Akcent', value: 'accent' },
            ],
          },
          initialValue: 'primary',
        },
      ],
    }),
    defineField({
      name: 'mobileMenuOrder',
      title: 'Redosled u mobilnom meniju',
      type: 'array',
      description: 'Prevucite stavke da promenite redosled',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Navigacija sajta',
        subtitle: 'Glavni meni i CTA dugme',
      }
    },
  },
})