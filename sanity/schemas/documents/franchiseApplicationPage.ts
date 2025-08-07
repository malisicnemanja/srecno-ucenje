import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export default defineType({
  name: 'franchiseApplicationPage',
  title: 'Aplikacija za franšizu stranica',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov stranice',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL putanja',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'formSteps',
      title: 'Koraci forme',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'stepNumber', title: 'Broj koraka', type: 'number', validation: Rule => Rule.required() },
            { name: 'title', title: 'Naslov koraka', type: 'string', validation: Rule => Rule.required() },
            { name: 'description', title: 'Opis koraka', type: 'text' },
            { name: 'fields', title: 'Polja', type: 'array', of: [{ type: 'reference', to: { type: 'franchiseField' } }], validation: Rule => Rule.required() },
            { name: 'validationRules', title: 'Pravila validacije', type: 'array', of: [
              {
                type: 'object',
                fields: [
                  { name: 'fieldName', title: 'Naziv polja', type: 'string', validation: Rule => Rule.required() },
                  { name: 'required', title: 'Obavezno', type: 'boolean', initialValue: false },
                  { name: 'minLength', title: 'Minimalna dužina', type: 'number' },
                  { name: 'maxLength', title: 'Maksimalna dužina', type: 'number' },
                  { name: 'pattern', title: 'Regex pattern', type: 'string' },
                  { name: 'customValidation', title: 'Kustom validacija', type: 'text' },
                  { name: 'errorMessage', title: 'Poruka greške', type: 'string' }
                ]
              }
            ]},
            { name: 'progressPercentage', title: 'Procenat progresa', type: 'number', validation: Rule => Rule.min(0).max(100) },
            { name: 'nextButtonText', title: 'Tekst dugmeta dalje', type: 'string', initialValue: 'Dalje' },
            { name: 'prevButtonText', title: 'Tekst dugmeta nazad', type: 'string', initialValue: 'Nazad' }
          ]
        }
      ],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'sidebarContent',
      title: 'Sadržaj sidebar-a',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'stepNumbers', title: 'Koraci kada se prikazuje', type: 'array', of: [{ type: 'number' }] },
            { name: 'title', title: 'Naslov', type: 'string', validation: Rule => Rule.required() },
            { name: 'content', title: 'Sadržaj', type: 'array', of: [{ type: 'block' }] },
            { name: 'image', title: 'Slika', type: 'image', options: { hotspot: true } },
            { name: 'statistics', title: 'Statistike', type: 'array', of: [
              {
                type: 'object',
                fields: [
                  { name: 'number', title: 'Broj', type: 'string', validation: Rule => Rule.required() },
                  { name: 'label', title: 'Opis', type: 'string', validation: Rule => Rule.required() },
                  { name: 'icon', title: 'Ikona', type: 'string' }
                ]
              }
            ]},
            { name: 'testimonial', title: 'Preporuka', type: 'reference', to: { type: 'testimonial' } },
            { name: 'ctaButton', title: 'CTA dugme', type: 'object', fields: [
              { name: 'text', title: 'Tekst', type: 'string' },
              { name: 'link', title: 'Link', type: 'string' },
              { name: 'style', title: 'Stil', type: 'string', options: {
                list: [
                  { title: 'Primarni', value: 'primary' },
                  { title: 'Sekundarni', value: 'secondary' },
                  { title: 'Link', value: 'link' }
                ]
              }}
            ]}
          ]
        }
      ]
    }),
    defineField({
      name: 'successPage',
      title: 'Stranica uspešne prijave',
      type: 'object',
      fields: [
        { name: 'title', title: 'Naslov', type: 'string', validation: Rule => Rule.required() },
        { name: 'message', title: 'Poruka', type: 'array', of: [{ type: 'block' }] },
        { name: 'nextSteps', title: 'Sledeći koraci', type: 'array', of: [
          {
            type: 'object',
            fields: [
              { name: 'title', title: 'Naslov', type: 'string', validation: Rule => Rule.required() },
              { name: 'description', title: 'Opis', type: 'text' },
              { name: 'timeline', title: 'Vremenska linija', type: 'string' },
              { name: 'icon', title: 'Ikona', type: 'string' }
            ]
          }
        ]},
        { name: 'contactInfo', title: 'Kontakt informacije', type: 'object', fields: [
          { name: 'title', title: 'Naslov', type: 'string' },
          { name: 'phone', title: 'Telefon', type: 'string' },
          { name: 'email', title: 'Email', type: 'string' },
          { name: 'workingHours', title: 'Radno vreme', type: 'string' }
        ]},
        { name: 'additionalResources', title: 'Dodatni resursi', type: 'array', of: [
          {
            type: 'object',
            fields: [
              { name: 'title', title: 'Naslov', type: 'string', validation: Rule => Rule.required() },
              { name: 'description', title: 'Opis', type: 'text' },
              { name: 'link', title: 'Link', type: 'string', validation: Rule => Rule.required() },
              { name: 'type', title: 'Tip resursa', type: 'string', options: {
                list: [
                  { title: 'PDF', value: 'pdf' },
                  { title: 'Video', value: 'video' },
                  { title: 'Webinar', value: 'webinar' },
                  { title: 'Stranica', value: 'page' }
                ]
              }}
            ]
          }
        ]}
      ]
    }),
    defineField({
      name: 'formSettings',
      title: 'Podešavanja forme',
      type: 'object',
      fields: [
        { name: 'allowSaveDraft', title: 'Omogući čuvanje nacrta', type: 'boolean', initialValue: true },
        { name: 'sessionTimeout', title: 'Timeout sesije (minuti)', type: 'number', initialValue: 30 },
        { name: 'showProgressBar', title: 'Prikaži progress bar', type: 'boolean', initialValue: true },
        { name: 'enableAutoSave', title: 'Automatkso čuvanje', type: 'boolean', initialValue: true },
        { name: 'autoSaveInterval', title: 'Interval automatskog čuvanja (sekunde)', type: 'number', initialValue: 30 },
        { name: 'requiredFieldsNote', title: 'Napomena o obaveznim poljima', type: 'string', initialValue: '* Sva polja označena zvezdicom su obavezna' },
        { name: 'privacyNote', title: 'Napomena o privatnosti', type: 'text', initialValue: 'Vaši podaci su bezbedni i neće biti prosleđivani trećim licima.' },
        { name: 'submitButtonText', title: 'Tekst dugmeta za slanje', type: 'string', initialValue: 'Pošalji prijavu' },
        { name: 'loadingText', title: 'Tekst tokom slanja', type: 'string', initialValue: 'Slanje u toku...' }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO podešavanja',
      type: 'seo'
    }),
    defineField({
      name: 'active',
      title: 'Aktivna aplikacija',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      active: 'active'
    },
    prepare({ title, active }) {
      return {
        title: title || 'Aplikacija za franšizu',
        subtitle: active ? 'Aktivna' : 'Neaktivna'
      }
    }
  }
})