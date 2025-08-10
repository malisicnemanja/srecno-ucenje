import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export default defineType({
  name: 'authorTimeline',
  title: 'Biografija - Vremenska linija',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'year',
      title: 'Godina',
      type: 'number',
      validation: Rule => Rule.required().min(1950).max(new Date().getFullYear())
    }),
    defineField({
      name: 'title',
      title: 'Naslov događaja',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      validation: Rule => Rule.required().max(300)
    }),
    defineField({
      name: 'order',
      title: 'Redosled',
      type: 'number',
      validation: Rule => Rule.required().min(0),
      description: 'Redosled prikazivanja (0 = prvo)'
    }),
    defineField({
      name: 'isHighlight',
      title: 'Istaknut događaj',
      type: 'boolean',
      initialValue: false,
      description: 'Da li je ovo ključni momenat u karijeri'
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
          { title: 'Roze', value: 'pink' }
        ]
      },
      initialValue: 'blue'
    })
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      highlight: 'isHighlight'
    },
    prepare({ title, year, highlight }) {
      return {
        title: `${year} - ${title}`,
        subtitle: highlight ? 'Ključni momenat' : 'Događaj'
      }
    }
  },
  orderings: [
    {
      title: 'Po godini (rastući)',
      name: 'yearAsc',
      by: [{ field: 'year', direction: 'asc' }]
    },
    {
      title: 'Po redosledu',
      name: 'orderAsc', 
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
})