import { defineField, defineType } from 'sanity'
import { ComposeIcon } from '@sanity/icons'

export default defineType({
  name: 'enhancedFranchiseField',
  title: 'Enhanced Franchise Polja',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Naziv polja',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 50,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'label',
      title: 'Label za prikaz',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'type',
      title: 'Tip polja',
      type: 'string',
      options: {
        list: [
          { title: 'Tekst', value: 'text' },
          { title: 'Tekstualna oblast', value: 'textarea' },
          { title: 'Email', value: 'email' },
          { title: 'Telefon', value: 'phone' },
          { title: 'Broj', value: 'number' },
          { title: 'Select lista', value: 'select' },
          { title: 'Radio dugmići', value: 'radio' },
          { title: 'Checkbox-ovi', value: 'checkbox' },
          { title: 'Datum', value: 'date' },
          { title: 'URL', value: 'url' },
          { title: 'Upload fajla', value: 'file' },
          { title: 'Range slider', value: 'range' },
          { title: 'Multi-select', value: 'multiselect' },
          { title: 'Rating (zvezdice)', value: 'rating' },
          { title: 'Boolean (Da/Ne)', value: 'boolean' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder tekst',
      type: 'string'
    }),
    defineField({
      name: 'helpText',
      title: 'Pomoćni tekst',
      type: 'text'
    }),
    defineField({
      name: 'tooltip',
      title: 'Tooltip',
      type: 'text'
    }),
    defineField({
      name: 'defaultValue',
      title: 'Default vrednost',
      type: 'string'
    }),
    defineField({
      name: 'options',
      title: 'Opcije (za select, radio, checkbox)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() },
            { name: 'value', title: 'Vrednost', type: 'string', validation: Rule => Rule.required() },
            { name: 'description', title: 'Opis opcije', type: 'text' },
            { name: 'icon', title: 'Ikona', type: 'string' },
            { name: 'disabled', title: 'Onemugućeno', type: 'boolean', initialValue: false }
          ]
        }
      ],
      hidden: ({ document }) => !['select', 'radio', 'checkbox', 'multiselect'].includes(document?.type)
    }),
    defineField({
      name: 'validation',
      title: 'Validacijska pravila',
      type: 'object',
      fields: [
        { name: 'required', title: 'Obavezno polje', type: 'boolean', initialValue: false },
        { name: 'minLength', title: 'Minimalna dužina', type: 'number' },
        { name: 'maxLength', title: 'Maksimalna dužina', type: 'number' },
        { name: 'minValue', title: 'Minimalna vrednost', type: 'number' },
        { name: 'maxValue', title: 'Maksimalna vrednost', type: 'number' },
        { name: 'pattern', title: 'Regex pattern', type: 'string' },
        { name: 'customValidation', title: 'Custom JavaScript validacija', type: 'text' },
        { name: 'errorMessage', title: 'Custom poruka greške', type: 'string' },
        { name: 'acceptedFileTypes', title: 'Prihvaćeni tipovi fajlova', type: 'string', hidden: ({ document }) => document?.type !== 'file' },
        { name: 'maxFileSize', title: 'Maksimalna veličina fajla (MB)', type: 'number', hidden: ({ document }) => document?.type !== 'file' }
      ]
    }),
    defineField({
      name: 'conditional',
      title: 'Uslovno prikazivanje',
      type: 'object',
      fields: [
        { name: 'enabled', title: 'Omogući uslovno prikazivanje', type: 'boolean', initialValue: false },
        { name: 'dependsOn', title: 'Zavisi od polja', type: 'string' },
        { name: 'condition', title: 'Uslov', type: 'string', options: {
          list: [
            { title: 'Jednako', value: 'equals' },
            { title: 'Nije jednako', value: 'not_equals' },
            { title: 'Sadrži', value: 'contains' },
            { title: 'Ne sadrži', value: 'not_contains' },
            { title: 'Veće od', value: 'greater_than' },
            { title: 'Manje od', value: 'less_than' },
            { title: 'Prazan', value: 'empty' },
            { title: 'Nije prazan', value: 'not_empty' }
          ]
        }},
        { name: 'value', title: 'Vrednost za poređenje', type: 'string' },
        { name: 'customLogic', title: 'Custom JavaScript logika', type: 'text' }
      ]
    }),
    defineField({
      name: 'styling',
      title: 'Podešavanja stila',
      type: 'object',
      fields: [
        { name: 'width', title: 'Širina polja', type: 'string', options: {
          list: [
            { title: 'Puna širina', value: 'full' },
            { title: 'Polovina', value: 'half' },
            { title: 'Trećina', value: 'third' },
            { title: 'Dve trećine', value: 'two-thirds' },
            { title: 'Četvrtina', value: 'quarter' }
          ]
        }, initialValue: 'full' },
        { name: 'cssClasses', title: 'Dodatne CSS klase', type: 'string' },
        { name: 'inline', title: 'Inline prikaz', type: 'boolean', initialValue: false }
      ]
    }),
    defineField({
      name: 'category',
      title: 'Kategorija',
      type: 'string',
      options: {
        list: [
          { title: 'Lični podaci', value: 'personal' },
          { title: 'Kontakt podaci', value: 'contact' },
          { title: 'Poslovno iskustvo', value: 'business' },
          { title: 'Finansijski podaci', value: 'financial' },
          { title: 'Motivacija', value: 'motivation' },
          { title: 'Lokacija', value: 'location' },
          { title: 'Reference', value: 'references' },
          { title: 'Dodatno', value: 'additional' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'order',
      title: 'Redosled u formi',
      type: 'number',
      initialValue: 0
    }),
    defineField({
      name: 'active',
      title: 'Aktivno polje',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'dataProcessing',
      title: 'Obrada podataka',
      type: 'object',
      fields: [
        { name: 'storageKey', title: 'Ključ za čuvanje', type: 'string' },
        { name: 'encrypt', title: 'Enkriptovano', type: 'boolean', initialValue: false },
        { name: 'sensitive', title: 'Osetljivi podaci', type: 'boolean', initialValue: false },
        { name: 'export', title: 'Uključiti u export', type: 'boolean', initialValue: true },
        { name: 'transformFunction', title: 'Transform funkcija', type: 'text', description: 'JavaScript funkcija za transformaciju podataka' }
      ]
    })
  ],
  orderings: [
    {
      title: 'Po redosledu',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Po kategorijama',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }, { field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'type',
      category: 'category',
      required: 'validation.required',
      active: 'active'
    },
    prepare({ title, subtitle, category, required, active }) {
      return {
        title: `${title} ${required ? '*' : ''}`,
        subtitle: `${subtitle.toUpperCase()} - ${category} ${!active ? '(Neaktivno)' : ''}`,
      }
    }
  }
})