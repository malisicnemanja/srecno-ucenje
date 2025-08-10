import { defineField, defineType } from 'sanity'
import { StarFilledIcon } from '@sanity/icons'

export default defineType({
  name: 'authorAchievements',
  title: 'Dostignuća autora',
  type: 'document',
  icon: StarFilledIcon,
  fields: [
    defineField({
      name: 'number',
      title: 'Broj/Statistika',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Broj ili kratka statistika (npr. "500+", "15", "98%")'
    }),
    defineField({
      name: 'label',
      title: 'Opis',
      type: 'string',
      validation: Rule => Rule.required().max(50),
      description: 'Kratko objašnjenje statistike'
    }),
    defineField({
      name: 'description',
      title: 'Detaljni opis',
      type: 'text',
      validation: Rule => Rule.max(200),
      description: 'Dodatno objašnjenje za tooltip ili prošireni prikaz'
    }),
    defineField({
      name: 'icon',
      title: 'Tip ikonice',
      type: 'string',
      options: {
        list: [
          { title: 'Ljudi/Učenici', value: 'people' },
          { title: 'Nagrade/Priznanja', value: 'awards' },
          { title: 'Knjige/Publikacije', value: 'books' },
          { title: 'Ocena/Kvalitet', value: 'rating' },
          { title: 'Uspeh/Rezultati', value: 'success' },
          { title: 'Godine/Iskustvo', value: 'experience' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'color',
      title: 'Boja teme',
      type: 'string',
      options: {
        list: [
          { title: 'Plava', value: 'blue' },
          { title: 'Zelena', value: 'green' },
          { title: 'Ljubičasta', value: 'purple' },
          { title: 'Zlatna', value: 'yellow' },
          { title: 'Roze', value: 'pink' },
          { title: 'Crvena', value: 'red' }
        ]
      },
      initialValue: 'blue'
    }),
    defineField({
      name: 'order',
      title: 'Redosled prikaza',
      type: 'number',
      validation: Rule => Rule.required().min(0),
      description: 'Redosled prikazivanja na stranici (0 = prvo)'
    }),
    defineField({
      name: 'animationDuration',
      title: 'Trajanje animacije (ms)',
      type: 'number',
      initialValue: 2000,
      validation: Rule => Rule.min(500).max(5000),
      description: 'Koliko dugo traje animacija brojanja'
    }),
    defineField({
      name: 'isActive',
      title: 'Aktivno',
      type: 'boolean',
      initialValue: true,
      description: 'Da li se prikazuje na stranici'
    })
  ],
  preview: {
    select: {
      number: 'number',
      label: 'label',
      icon: 'icon',
      isActive: 'isActive'
    },
    prepare({ number, label, isActive }) {
      return {
        title: `${number} - ${label}`,
        subtitle: isActive ? 'Aktivno' : 'Neaktivno'
      }
    }
  },
  orderings: [
    {
      title: 'Po redosledu',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
})