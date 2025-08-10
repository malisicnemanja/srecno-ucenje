import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'schoolsPage',
  title: 'Školice stranica',
  type: 'document',
  icon: HomeIcon,
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
      name: 'hero',
      title: 'Hero sekcija',
      type: 'object',
      fields: [
        { name: 'title', title: 'Naslov', type: 'string', validation: Rule => Rule.required() },
        { name: 'subtitle', title: 'Podnaslov', type: 'text' },
        { name: 'description', title: 'Opis', type: 'array', of: [{ type: 'block' }] },
        { name: 'searchPlaceholder', title: 'Placeholder za pretragu', type: 'string', initialValue: 'Unesite grad ili poštanski broj...' },
        { name: 'backgroundImage', title: 'Slika u pozadini', type: 'image', options: { hotspot: true } }
      ]
    }),
    defineField({
      name: 'mapSection',
      title: 'Sekcija mape',
      type: 'object',
      fields: [
        { name: 'title', title: 'Naslov sekcije', type: 'string' },
        { name: 'subtitle', title: 'Podnaslov', type: 'string' },
        { name: 'defaultCenter', title: 'Default centar mape', type: 'object', fields: [
          { name: 'lat', title: 'Latitude', type: 'number', initialValue: 44.0165 },
          { name: 'lng', title: 'Longitude', type: 'number', initialValue: 21.0059 }
        ]},
        { name: 'defaultZoom', title: 'Default zoom', type: 'number', initialValue: 7 },
        { name: 'mapStyle', title: 'Stil mape', type: 'string', options: {
          list: [
            { title: 'Standard', value: 'standard' },
            { title: 'Satellite', value: 'satellite' },
            { title: 'Hybrid', value: 'hybrid' },
            { title: 'Terrain', value: 'terrain' }
          ]
        }, initialValue: 'standard' }
      ]
    }),
    defineField({
      name: 'filterOptions',
      title: 'Opcije filtriranja',
      type: 'object',
      fields: [
        { name: 'enableCityFilter', title: 'Omogući filtriranje po gradu', type: 'boolean', initialValue: true },
        { name: 'enableStatusFilter', title: 'Omogući filtriranje po statusu', type: 'boolean', initialValue: true },
        { name: 'enableProgramFilter', title: 'Omogući filtriranje po programima', type: 'boolean', initialValue: true },
        { name: 'enableSpecialtyFilter', title: 'Omogući filtriranje po specijalnostima', type: 'boolean', initialValue: true },
        { name: 'sortOptions', title: 'Opcije sortiranja', type: 'array', of: [
          {
            type: 'object',
            fields: [
              { name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() },
              { name: 'value', title: 'Vrednost', type: 'string', validation: Rule => Rule.required() },
              { name: 'default', title: 'Default', type: 'boolean', initialValue: false }
            ]
          }
        ]}
      ]
    }),
    defineField({
      name: 'schoolListSection',
      title: 'Sekcija liste školica',
      type: 'object',
      fields: [
        { name: 'title', title: 'Naslov sekcije', type: 'string' },
        { name: 'viewToggle', title: 'Omogući prebacivanje prikaza (lista/mapa)', type: 'boolean', initialValue: true },
        { name: 'defaultView', title: 'Default prikaz', type: 'string', options: {
          list: [
            { title: 'Lista', value: 'list' },
            { title: 'Mapa', value: 'map' },
            { title: 'Kombinovano', value: 'combined' }
          ]
        }, initialValue: 'list' },
        { name: 'itemsPerPage', title: 'Broj stavki po stranici', type: 'number', initialValue: 12 }
      ]
    }),
    defineField({
      name: 'ctaSections',
      title: 'CTA sekcije',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Naslov', type: 'string', validation: Rule => Rule.required() },
            { name: 'description', title: 'Opis', type: 'text' },
            { name: 'buttonText', title: 'Tekst dugmeta', type: 'string', validation: Rule => Rule.required() },
            { name: 'buttonLink', title: 'Link dugmeta', type: 'string', validation: Rule => Rule.required() },
            { name: 'backgroundColor', title: 'Boja pozadine', type: 'string', options: {
              list: [
                { title: 'Primarna', value: 'primary' },
                { title: 'Sekundarna', value: 'secondary' },
                { title: 'Gradijent', value: 'gradient' },
                { title: 'Svetla', value: 'light' }
              ]
            }},
            { name: 'position', title: 'Pozicija na stranici', type: 'string', options: {
              list: [
                { title: 'Između hero-a i mape', value: 'after-hero' },
                { title: 'Između mape i liste', value: 'after-map' },
                { title: 'Na kraju stranice', value: 'end' }
              ]
            }, validation: Rule => Rule.required() },
            { name: 'image', title: 'Slika', type: 'image', options: { hotspot: true } }
          ]
        }
      ]
    }),
    defineField({
      name: 'testimonialSection',
      title: 'Sekcija preporuka',
      type: 'object',
      fields: [
        { name: 'title', title: 'Naslov sekcije', type: 'string' },
        { name: 'subtitle', title: 'Podnaslov', type: 'text' },
        { name: 'testimonials', title: 'Preporuke', type: 'array', of: [{ type: 'reference', to: { type: 'testimonial' } }] },
        { name: 'displayCount', title: 'Broj prikazanih preporuka', type: 'number', initialValue: 6 },
        { name: 'autoPlay', title: 'Automatska rotacija', type: 'boolean', initialValue: true },
        { name: 'interval', title: 'Interval rotacije (sekunde)', type: 'number', initialValue: 5 }
      ]
    }),
    defineField({
      name: 'faqSection',
      title: 'FAQ sekcija',
      type: 'object',
      fields: [
        { name: 'title', title: 'Naslov sekcije', type: 'string' },
        { name: 'faqs', title: 'Česta pitanja', type: 'array', of: [{ type: 'reference', to: { type: 'faq' } }] }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO podešavanja',
      type: 'seo'
    })
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: title || 'Školice stranica',
        subtitle: 'Mapa i lista školica'
      }
    }
  }
})