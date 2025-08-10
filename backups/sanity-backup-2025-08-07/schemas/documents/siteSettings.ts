import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Podešavanja Sajta',
  type: 'document',
  groups: [
    { name: 'general', title: 'Opšte' },
    { name: 'contact', title: 'Kontakt' },
    { name: 'social', title: 'Društvene Mreže' },
    { name: 'apiKeys', title: 'API Ključevi' },
    { name: 'seo', title: 'SEO' },
    { name: 'navigation', title: 'Navigacija' },
    { name: 'design', title: 'Dizajn' },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Naziv Sajta',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Opis Sajta',
      type: 'text',
      rows: 3,
      group: 'general',
    }),
    defineField({
      name: 'siteSubtitle',
      title: 'Podnaslov Sajta',
      type: 'string',
      placeholder: 'Metodologija',
      description: 'Kratak podnaslov koji se prikazuje u header-u',
      group: 'general',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'general',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'address',
      title: 'Adresa',
      type: 'text',
      rows: 2,
      group: 'contact',
    }),
    defineField({
      name: 'workingHours',
      title: 'Radno Vreme',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', title: 'Dan', type: 'string' },
            { name: 'hours', title: 'Vreme', type: 'string' },
          ],
        },
      ],
      group: 'contact',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Društvene Mreže',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platforma', type: 'string' },
            { name: 'url', title: 'Link', type: 'url' },
          ],
        },
      ],
      group: 'social',
    }),
    defineField({
      name: 'googleMapsApiKey',
      title: 'Google Maps API Ključ',
      type: 'string',
      description: 'API ključ za Google Maps integraciju na stranici lokacija. Potreban za funkcionisanje mapa.',
      validation: (Rule) => Rule.required().warning('Google Maps API ključ je potreban za funkcionalnost mapa'),
      group: 'apiKeys',
    }),
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics ID',
      type: 'string',
      description: 'Google Analytics tracking ID (GA4 format: G-XXXXXXXXXX)',
      placeholder: 'G-XXXXXXXXXX',
      group: 'apiKeys',
    }),
    defineField({
      name: 'facebookPixelId',
      title: 'Facebook Pixel ID',
      type: 'string',
      description: 'Facebook Pixel tracking ID za praćenje konverzija',
      group: 'apiKeys',
    }),
    defineField({
      name: 'recaptchaSiteKey',
      title: 'reCAPTCHA Site Key',
      type: 'string',
      description: 'Google reCAPTCHA site key za zaštićene forme',
      group: 'apiKeys',
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Podrazumevani SEO',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'navigationSettings',
      title: 'Podešavanja Navigacije',
      type: 'navigationSettings',
      group: 'navigation',
    }),
    defineField({
      name: 'colorPalette',
      title: 'Paleta Boja',
      type: 'object',
      group: 'design',
      fields: [
        {
          name: 'primaryColor',
          title: 'Primarna Boja',
          type: 'string',
          initialValue: '#22c55e',
          description: 'Zelena - glavna boja brenda'
        },
        {
          name: 'secondaryColor',
          title: 'Sekundarna Boja',
          type: 'string',
          initialValue: '#3498db',
          description: 'Plava - pouzdanost i poverenje'
        },
        {
          name: 'accentColor',
          title: 'Akcent Boja',
          type: 'string',
          initialValue: '#f39c12',
          description: 'Žuta - radost i energija'
        },
        {
          name: 'warmColor',
          title: 'Topla Boja',
          type: 'string',
          initialValue: '#e74c3c',
          description: 'Crvena - toplina i strast'
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
    },
  },
})