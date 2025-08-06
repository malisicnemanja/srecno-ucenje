import { defineField, defineType } from 'sanity'
import { ControlsIcon } from '@sanity/icons'

export default defineType({
  name: 'franchiseField',
  title: 'Polje forme',
  type: 'document',
  icon: ControlsIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Labela polja',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'fieldId',
      title: 'ID polja',
      type: 'string',
      validation: Rule => Rule.required().regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, {
        name: 'Variable format',
        invert: false
      }),
      description: 'Jedinstveni identifikator polja (npr. "ime_prezime", "email")'
    }),
    defineField({
      name: 'type',
      title: 'Tip polja',
      type: 'string',
      options: {
        list: [
          { title: 'Tekst (kratki)', value: 'text' },
          { title: 'Email', value: 'email' },
          { title: 'Telefon', value: 'tel' },
          { title: 'Broj', value: 'number' },
          { title: 'Tekstualna oblast (dugačka)', value: 'textarea' },
          { title: 'Padajuća lista', value: 'select' },
          { title: 'Radio dugmad', value: 'radio' },
          { title: 'Checkbox-ovi', value: 'checkbox' },
          { title: 'Datum', value: 'date' },
          { title: 'URL/Link', value: 'url' },
          { title: 'Fajl upload', value: 'file' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder tekst',
      type: 'string',
      description: 'Tekst koji se prikazuje u praznom polju'
    }),
    defineField({
      name: 'helpText',
      title: 'Pomoćni tekst',
      type: 'string',
      description: 'Dodatne informacije o polju'
    }),
    defineField({
      name: 'isRequired',
      title: 'Obavezno polje',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'validation',
      title: 'Validaciona pravila',
      type: 'object',
      fields: [
        defineField({
          name: 'minLength',
          title: 'Minimum karaktera',
          type: 'number'
        }),
        defineField({
          name: 'maxLength',
          title: 'Maksimum karaktera',
          type: 'number'
        }),
        defineField({
          name: 'pattern',
          title: 'Regex pattern',
          type: 'string',
          description: 'Regularni izraz za validaciju'
        }),
        defineField({
          name: 'customErrorMessage',
          title: 'Prilagođena poruka greške',
          type: 'string'
        })
      ]
    }),
    defineField({
      name: 'options',
      title: 'Opcije (za select/radio/checkbox)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Labela opcije',
              type: 'string'
            }),
            defineField({
              name: 'value',
              title: 'Vrednost opcije',
              type: 'string'
            })
          ]
        }
      ],
      hidden: ({ parent }) => !['select', 'radio', 'checkbox'].includes(parent?.type)
    }),
    defineField({
      name: 'order',
      title: 'Redosled u sekciji',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'width',
      title: 'Širina polja',
      type: 'string',
      options: {
        list: [
          { title: 'Puna širina (100%)', value: 'full' },
          { title: 'Polovina (50%)', value: 'half' },
          { title: 'Trećina (33%)', value: 'third' },
          { title: 'Četvrtina (25%)', value: 'quarter' }
        ]
      },
      initialValue: 'full'
    }),
    defineField({
      name: 'conditionalLogic',
      title: 'Uslovna logika',
      type: 'object',
      fields: [
        defineField({
          name: 'showIf',
          title: 'Prikaži ako',
          type: 'object',
          fields: [
            defineField({
              name: 'fieldId',
              title: 'ID polja',
              type: 'string'
            }),
            defineField({
              name: 'operator',
              title: 'Operator',
              type: 'string',
              options: {
                list: [
                  { title: 'Jednako (=)', value: 'equals' },
                  { title: 'Nije jednako (≠)', value: 'not_equals' },
                  { title: 'Sadrži', value: 'contains' },
                  { title: 'Veće od (>)', value: 'greater_than' },
                  { title: 'Manje od (<)', value: 'less_than' }
                ]
              }
            }),
            defineField({
              name: 'value',
              title: 'Vrednost',
              type: 'string'
            })
          ]
        })
      ],
      description: 'Definiše kada se polje prikazuje na osnovu drugih polja'
    }),
    defineField({
      name: 'isActive',
      title: 'Aktivno polje',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      label: 'label',
      type: 'type',
      isRequired: 'isRequired',
      isActive: 'isActive',
      order: 'order'
    },
    prepare({ label, type, isRequired, isActive, order }) {
      const typeIcons: Record<string, string> = {
        text: '📝',
        email: '📧',
        tel: '📞',
        number: '🔢',
        textarea: '📄',
        select: '📋',
        radio: '🔘',
        checkbox: '☑️',
        date: '📅',
        url: '🔗',
        file: '📎'
      }
      
      return {
        title: `${order}. ${label}${isRequired ? ' *' : ''}`,
        subtitle: `${type}${isActive ? '' : ' (neaktivno)'}`,
        media: typeIcons[type] || '📝'
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