import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'location',
  title: 'Lokacije (DEPRECATED - Use school instead)',
  type: 'document',
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
      initialValue: 1,
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
          { title: 'U pripremi', value: 'in-preparation' }
        ]
      },
      initialValue: 'active',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'featured',
      title: 'Istaknut',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'coordinates',
      title: 'Koordinate',
      type: 'object',
      fields: [
        {
          name: 'lat',
          title: 'Latitude',
          type: 'number',
          validation: Rule => Rule.required()
        },
        {
          name: 'lng',
          title: 'Longitude',
          type: 'number',
          validation: Rule => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'address',
      title: 'Adresa',
      type: 'string'
    }),
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
      name: 'workingHours',
      title: 'Radno vreme',
      type: 'string',
      initialValue: 'Pon-Pet: 09:00-19:00, Sub: 09:00-14:00'
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text'
    }),
    defineField({
      name: 'image',
      title: 'Slika centra',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'manager',
      title: 'Menadžer',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Ime i prezime',
          type: 'string'
        },
        {
          name: 'photo',
          title: 'Fotografija',
          type: 'image'
        },
        {
          name: 'bio',
          title: 'Kratka biografija',
          type: 'text'
        }
      ]
    }),
    defineField({
      name: 'programs',
      title: 'Dostupni programi',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Predškolski program', value: 'preschool' },
          { title: 'Školski program', value: 'school' },
          { title: 'Radionice', value: 'workshops' },
          { title: 'Letnji kamp', value: 'summer-camp' },
          { title: 'Zimski kamp', value: 'winter-camp' },
          { title: 'Rođendani', value: 'birthdays' }
        ]
      }
    }),
    defineField({
      name: 'order',
      title: 'Redosled',
      type: 'number',
      initialValue: 0
    })
  ],
  preview: {
    select: {
      title: 'city',
      subtitle: 'status',
      media: 'image'
    },
    prepare({ title, subtitle, media }) {
      const statusLabel = {
        'active': 'Aktivan',
        'coming-soon': 'Uskoro',
        'in-preparation': 'U pripremi'
      }
      return {
        title,
        subtitle: statusLabel[subtitle as keyof typeof statusLabel] || subtitle,
        media
      }
    }
  }
})