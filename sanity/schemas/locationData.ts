import { defineField, defineType } from 'sanity'
import { PinIcon } from '@sanity/icons'

export default defineType({
  name: 'locationData',
  title: 'Podaci o lokacijama',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'city',
      title: 'Grad',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'centerCount',
      title: 'Broj centara',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Aktivan', value: 'active' },
          { title: 'Uskoro', value: 'coming-soon' },
          { title: 'Planiran', value: 'planned' },
          { title: 'Neaktivan', value: 'inactive' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'coordinates',
      title: 'Koordinate',
      type: 'object',
      fields: [
        defineField({
          name: 'lat',
          title: 'Latitude',
          type: 'number',
          validation: Rule => Rule.required().min(-90).max(90)
        }),
        defineField({
          name: 'lng',
          title: 'Longitude', 
          type: 'number',
          validation: Rule => Rule.required().min(-180).max(180)
        })
      ]
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'Vojvodina', value: 'vojvodina' },
          { title: 'Beograd', value: 'belgrade' },
          { title: 'Šumadija i Zapadna Srbija', value: 'sumadija' },
          { title: 'Južna i Istočna Srbija', value: 'juzna-srbija' },
          { title: 'Kosovo i Metohija', value: 'kosovo' }
        ]
      }
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      description: 'Kratak opis stanja u gradu'
    }),
    defineField({
      name: 'contactInfo',
      title: 'Kontakt informacije',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: 'Telefon',
          type: 'string'
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string'
        }),
        defineField({
          name: 'address',
          title: 'Adresa',
          type: 'string'
        })
      ]
    }),
    defineField({
      name: 'demandLevel',
      title: 'Nivo potražnje',
      type: 'string',
      options: {
        list: [
          { title: 'Visoka', value: 'high' },
          { title: 'Srednja', value: 'medium' },
          { title: 'Niska', value: 'low' }
        ]
      },
      initialValue: 'medium'
    }),
    defineField({
      name: 'priceMultiplier',
      title: 'Multiplikator cene',
      type: 'number',
      validation: Rule => Rule.min(0.5).max(3),
      initialValue: 1,
      description: 'Faktor koji utiče na cene franšize u ovom gradu'
    }),
    defineField({
      name: 'marketSize',
      title: 'Veličina tržišta',
      type: 'string',
      options: {
        list: [
          { title: 'Veliko', value: 'large' },
          { title: 'Srednje', value: 'medium' },
          { title: 'Malo', value: 'small' }
        ]
      }
    }),
    defineField({
      name: 'order',
      title: 'Redosled prikaza',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'isActive',
      title: 'Aktivno',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      city: 'city',
      centerCount: 'centerCount',
      status: 'status',
      isActive: 'isActive'
    },
    prepare({ city, centerCount, status, isActive }) {
      const statusEmoji: Record<string, string> = {
        active: '✅',
        'coming-soon': '🔜', 
        planned: '📋',
        inactive: '⏸️'
      }
      
      return {
        title: `${city} (${centerCount} centara)`,
        subtitle: `${statusEmoji[status] || '📍'} ${status}${!isActive ? ' - Neaktivno' : ''}`
      }
    }
  },
  orderings: [
    {
      title: 'Po redosledu',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Po gradu (A-Z)',
      name: 'cityAsc',
      by: [{ field: 'city', direction: 'asc' }]
    }
  ]
})