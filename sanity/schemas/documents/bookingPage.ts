import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'bookingPage',
  title: 'Stranica za zakazivanje',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov stranice',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Zakazivanje konsultacija',
    }),
    
    // Hero sekcija
    defineField({
      name: 'hero',
      title: 'Hero sekcija',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Glavni naslov',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Podnaslov',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'badge',
          title: 'Badge tekst',
          type: 'string',
          description: 'npr. "100% besplatno i bez obaveza"',
        }),
        defineField({
          name: 'benefits',
          title: 'Benefiti',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Ikona',
                  type: 'string',
                  description: 'Naziv ikone',
                }),
                defineField({
                  name: 'title',
                  title: 'Naslov',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Opis',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),
    
    // Razlozi sekcija
    defineField({
      name: 'whySection',
      title: 'Zašto zakazati sekcija',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Naslov',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Podnaslov',
          type: 'string',
        }),
        defineField({
          name: 'reasons',
          title: 'Razlozi',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Ikona',
                  type: 'string',
                }),
                defineField({
                  name: 'color',
                  title: 'Boja',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Plava', value: 'blue' },
                      { title: 'Zelena', value: 'green' },
                      { title: 'Ljubičasta', value: 'purple' },
                      { title: 'Narandžasta', value: 'orange' },
                    ],
                  },
                }),
                defineField({
                  name: 'title',
                  title: 'Naslov',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Opis',
                  type: 'text',
                  rows: 2,
                }),
              ],
            },
          ],
        }),
      ],
    }),
    
    // Kako funkcioniše sekcija
    defineField({
      name: 'howItWorks',
      title: 'Kako funkcioniše sekcija',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Naslov',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Podnaslov',
          type: 'string',
        }),
        defineField({
          name: 'steps',
          title: 'Koraci',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'number',
                  title: 'Broj koraka',
                  type: 'string',
                }),
                defineField({
                  name: 'title',
                  title: 'Naslov',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Opis',
                  type: 'text',
                  rows: 2,
                }),
                defineField({
                  name: 'icon',
                  title: 'Ikona',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),
    
    // Phone CTA sekcija
    defineField({
      name: 'phoneCTA',
      title: 'Telefonski CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Naslov',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Podnaslov',
          type: 'string',
        }),
        defineField({
          name: 'phoneNumber',
          title: 'Broj telefona',
          type: 'string',
        }),
        defineField({
          name: 'workingHours',
          title: 'Radno vreme',
          type: 'string',
        }),
      ],
    }),
    
    // FAQ sekcija
    defineField({
      name: 'faqSection',
      title: 'FAQ sekcija',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Naslov',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Podnaslov',
          type: 'string',
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA tekst',
          type: 'string',
          description: 'Tekst za dugme koje vodi na FAQ stranicu',
        }),
        defineField({
          name: 'ctaLink',
          title: 'CTA link',
          type: 'string',
          initialValue: '/faq',
        }),
      ],
    }),
    
    // Calendly integracija
    defineField({
      name: 'calendly',
      title: 'Calendly podešavanja',
      type: 'object',
      fields: [
        defineField({
          name: 'url',
          title: 'Calendly URL',
          type: 'url',
          validation: (Rule) => Rule.required(),
          description: 'URL vašeg Calendly profila',
        }),
        defineField({
          name: 'prefillName',
          title: 'Unapred popuni ime',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'prefillEmail',
          title: 'Unapred popuni email',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'hideGdprBanner',
          title: 'Sakrij GDPR banner',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
    
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Stranica za zakazivanje',
        subtitle: 'Booking page',
      }
    },
  },
})