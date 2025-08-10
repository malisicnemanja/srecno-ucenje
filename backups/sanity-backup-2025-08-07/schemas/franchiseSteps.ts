import { defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export default defineType({
  name: 'franchiseSteps',
  title: 'Koraci do franšize',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov koraka',
      type: 'string',
      validation: Rule => Rule.required().max(50)
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      validation: Rule => Rule.required().max(200)
    }),
    defineField({
      name: 'icon',
      title: 'Tip ikonice',
      type: 'string',
      options: {
        list: [
          { title: 'Telefon/Kontakt', value: 'phone' },
          { title: 'Kalendar/Zakazivanje', value: 'calendar' },
          { title: 'Razgovor/Konsultacije', value: 'chat' },
          { title: 'Ugovor/Potpisivanje', value: 'contract' },
          { title: 'Obuka/Edukacija', value: 'education' },
          { title: 'Pokretanje/Start', value: 'launch' },
          { title: 'Analiza/Procena', value: 'analysis' },
          { title: 'Izgradnja/Setup', value: 'setup' }
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
          { title: 'Zelena (Primary)', value: 'green' },
          { title: 'Plava', value: 'blue' },
          { title: 'Ljubičasta', value: 'purple' },
          { title: 'Zlatna', value: 'yellow' },
          { title: 'Roze', value: 'pink' },
          { title: 'Crvena', value: 'red' }
        ]
      },
      initialValue: 'green'
    }),
    defineField({
      name: 'duration',
      title: 'Procenjeno vreme',
      type: 'string',
      description: 'Koliko vremena traje ovaj korak (npr. "30 min", "1-2 dana")'
    }),
    defineField({
      name: 'order',
      title: 'Redosled',
      type: 'number',
      validation: Rule => Rule.required().min(1),
      description: 'Redni broj koraka (1, 2, 3, 4...)'
    }),
    defineField({
      name: 'actionButton',
      title: 'Dugme za akciju',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Tekst dugmeta',
          type: 'string'
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'string',
          description: 'Interna ruta (npr. /kontakt) ili eksterni link'
        }),
        defineField({
          name: 'style',
          title: 'Stil dugmeta',
          type: 'string',
          options: {
            list: [
              { title: 'Primarno (zeleno)', value: 'primary' },
              { title: 'Sekundarno (outline)', value: 'secondary' },
              { title: 'Ghost (prozirno)', value: 'ghost' }
            ]
          },
          initialValue: 'primary'
        })
      ]
    }),
    defineField({
      name: 'requirements',
      title: 'Potrebni dokumenti/informacije',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista stvari koje korisnik treba da pripremi za ovaj korak'
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
      title: 'title',
      order: 'order',
      icon: 'icon',
      isActive: 'isActive'
    },
    prepare({ title, order, icon, isActive }) {
      return {
        title: `${order}. ${title}`,
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