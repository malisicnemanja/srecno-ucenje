import { defineField, defineType } from 'sanity'
import { HeartIcon } from '@sanity/icons'

export default defineType({
  name: 'franchiseMotivational',
  title: 'Motivacioni sadržaj',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov sekcije',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'Pridružite se uspešnoj priči'
    }),
    defineField({
      name: 'subtitle',
      title: 'Podnaslov',
      type: 'string',
      initialValue: 'Postanite deo najveće edukacijske zajednice u Srbiji'
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      initialValue: 'Franšiza Srećno učenje vam omogućava da pokrenete svoj edukacijski biznis uz podršku dokazane metodologije i iskusnog tima.'
    }),
    defineField({
      name: 'heroImage',
      title: 'Glavna slika',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt tekst',
          type: 'string'
        })
      ]
    }),
    defineField({
      name: 'statistics',
      title: 'Statistike',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Broj',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'label',
              title: 'Labela',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'icon',
              title: 'Ikonica',
              type: 'string',
              options: {
                list: [
                  { title: 'Franšize/Lokacije', value: 'franchise' },
                  { title: 'Polaznici/Korisnici', value: 'users' },
                  { title: 'Edukatori/Treneri', value: 'educators' },
                  { title: 'Uspešnost/Rast', value: 'growth' },
                  { title: 'Ocena/Kvalitet', value: 'rating' },
                  { title: 'Sertifikati', value: 'certificates' },
                  { title: 'Nagrade', value: 'awards' },
                  { title: 'Gradovi', value: 'cities' }
                ]
              }
            }),
            defineField({
              name: 'suffix',
              title: 'Sufiks',
              type: 'string',
              description: 'Tekst koji se dodaje na kraju broja (npr. "+", "%")'
            })
          ]
        }
      ],
      validation: Rule => Rule.min(1).max(4)
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimoniali',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Ime',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'location',
              title: 'Lokacija',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'quote',
              title: 'Citat',
              type: 'text',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'image',
              title: 'Fotografija',
              type: 'image',
              options: {
                hotspot: true
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt tekst',
                  type: 'string'
                })
              ]
            }),
            defineField({
              name: 'role',
              title: 'Uloga/Pozicija',
              type: 'string'
            }),
            defineField({
              name: 'rating',
              title: 'Ocena',
              type: 'number',
              validation: Rule => Rule.min(1).max(5),
              initialValue: 5
            })
          ]
        }
      ],
      validation: Rule => Rule.min(2).max(6)
    }),
    defineField({
      name: 'benefits',
      title: 'Prednosti franšize',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Naslov prednosti',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'description',
              title: 'Opis',
              type: 'text'
            }),
            defineField({
              name: 'icon',
              title: 'Ikonica',
              type: 'string',
              options: {
                list: [
                  { title: 'Obuka/Edukacija', value: 'education' },
                  { title: 'Podrška/Pomoć', value: 'support' },
                  { title: 'Marketing/Promocija', value: 'marketing' },
                  { title: 'Biznis model', value: 'business' },
                  { title: 'Alati/Resursi', value: 'tools' },
                  { title: 'Brend/Reputacija', value: 'brand' },
                  { title: 'Finansije/Profitabilnost', value: 'finance' },
                  { title: 'Mreža/Zajednica', value: 'network' }
                ]
              }
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'ctaSection',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Naslov',
          type: 'string',
          initialValue: 'Spremni ste za sledeći korak?'
        }),
        defineField({
          name: 'description',
          title: 'Opis',
          type: 'text',
          initialValue: 'Počnite vašu franšizu priču danas i pridružite se uspešnoj edukacionoj mreži.'
        }),
        defineField({
          name: 'primaryButton',
          title: 'Glavno dugme',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Tekst',
              type: 'string',
              initialValue: 'Prijavite se sada'
            }),
            defineField({
              name: 'action',
              title: 'Akcija',
              type: 'string',
              options: {
                list: [
                  { title: 'Otvori formu za prijavu', value: 'open_form' },
                  { title: 'Skroluj na formu', value: 'scroll_to_form' },
                  { title: 'Idi na sledeću sekciju', value: 'next_section' }
                ]
              },
              initialValue: 'scroll_to_form'
            })
          ]
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Sekundarno dugme',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Tekst',
              type: 'string',
              initialValue: 'Saznajte više'
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              initialValue: '/fransize'
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'faqSection',
      title: 'Često postavljana pitanja',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Naslov sekcije',
          type: 'string',
          initialValue: 'Često postavljana pitanja'
        }),
        defineField({
          name: 'items',
          title: 'Pitanja',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'question',
                  title: 'Pitanje',
                  type: 'string',
                  validation: Rule => Rule.required()
                }),
                defineField({
                  name: 'answer',
                  title: 'Odgovor',
                  type: 'text',
                  validation: Rule => Rule.required()
                })
              ]
            }
          ]
        })
      ]
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
      isActive: 'isActive'
    },
    prepare({ title, isActive }) {
      return {
        title: title || 'Motivacioni sadržaj',
        subtitle: isActive ? 'Aktivan' : 'Neaktivan'
      }
    }
  }
})