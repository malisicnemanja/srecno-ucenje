import { defineField, defineType } from 'sanity'
import { CubeIcon } from '@sanity/icons'

export default defineType({
  name: 'virtualClassroom',
  title: '3D Učionica',
  type: 'document',
  icon: CubeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Podnaslov',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text'
    }),
    defineField({
      name: 'features',
      title: 'Karakteristike',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'icon',
            title: 'Ikona',
            type: 'string',
            options: {
              list: [
                { title: 'Gamepad', value: 'gamepad' },
                { title: 'Target', value: 'target' },
                { title: 'Trophy', value: 'trophy' },
                { title: 'Book', value: 'book' },
                { title: 'Brain', value: 'brain' },
                { title: 'Sparkles', value: 'sparkles' }
              ]
            }
          },
          {
            name: 'title',
            title: 'Naslov',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'description',
            title: 'Opis',
            type: 'text'
          }
        ]
      }]
    }),
    defineField({
      name: 'tourHighlights',
      title: 'Tura - Istaknute lokacije',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'location',
            title: 'Lokacija',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'description',
            title: 'Opis',
            type: 'text'
          },
          {
            name: 'activities',
            title: 'Aktivnosti',
            type: 'array',
            of: [{ type: 'string' }]
          }
        ]
      }]
    }),
    defineField({
      name: 'tips',
      title: 'Saveti za navigaciju',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'tip',
            title: 'Savet',
            type: 'string'
          }
        ]
      }]
    }),
    defineField({
      name: 'tourUrl',
      title: 'Link do 3D ture',
      type: 'url',
      description: 'URL do Matterport ili druge 3D ture'
    }),
    defineField({
      name: 'embedCode',
      title: 'Embed kod',
      type: 'text',
      description: 'HTML embed kod za 3D turu'
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Naslov',
      type: 'string',
      initialValue: 'Spremni da doživite čaroliju?'
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Opis',
      type: 'text',
      initialValue: 'Prijavite svoje dete za besplatnu procenu i otkrijte kako možemo zajedno otključati njihov puni potencijal.'
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Dugme',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Tekst',
          type: 'string',
          initialValue: 'Zakažite besplatnu procenu'
        },
        {
          name: 'link',
          title: 'Link',
          type: 'string',
          initialValue: '/zakazivanje'
        }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle'
    }
  }
})