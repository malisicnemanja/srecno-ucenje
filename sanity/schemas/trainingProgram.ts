import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export default defineType({
  name: 'trainingProgram',
  title: 'Program obuke',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title'
      },
      validation: Rule => Rule.required()
    }),
    
    // Hero section
    defineField({
      name: 'hero',
      title: 'Hero sekcija',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Glavni naslov',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'subtitle',
          title: 'Podnaslov',
          type: 'text',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'stats',
          title: 'Statistike',
          type: 'array',
          of: [{
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
                title: 'Opis',
                type: 'string',
                validation: Rule => Rule.required()
              })
            ]
          }]
        })
      ]
    }),

    // Program features
    defineField({
      name: 'programFeatures',
      title: 'Karakteristike programa',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'icon',
            title: 'Ikonica',
            type: 'string',
            options: {
              list: [
                { title: '🎯 Cilj', value: 'target' },
                { title: '🔬 Nauka', value: 'science' },
                { title: '🤝 Mentorstvo', value: 'mentorship' },
                { title: '💼 Posao', value: 'career' }
              ]
            }
          }),
          defineField({
            name: 'title',
            title: 'Naslov',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'description',
            title: 'Opis',
            type: 'text',
            validation: Rule => Rule.required()
          })
        ]
      }]
    }),

    // Program structure
    defineField({
      name: 'programStructure',
      title: 'Struktura programa',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'phase',
            title: 'Faza',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'description',
            title: 'Opis',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'duration',
            title: 'Trajanje',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'hours',
            title: 'Broj časova',
            type: 'string',
            validation: Rule => Rule.required()
          })
        ]
      }]
    }),

    // Training modules
    defineField({
      name: 'trainingModules',
      title: 'Moduli obuke',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'icon',
            title: 'Ikonica',
            type: 'string'
          }),
          defineField({
            name: 'title',
            title: 'Naslov',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'description',
            title: 'Opis',
            type: 'text',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'topics',
            title: 'Teme',
            type: 'array',
            of: [{ type: 'string' }],
            validation: Rule => Rule.required().min(1)
          })
        ]
      }]
    }),

    // Mentorship steps
    defineField({
      name: 'mentorshipSteps',
      title: 'Koraci mentorstva',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            title: 'Naslov',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'duration',
            title: 'Trajanje',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'icon',
            title: 'Ikonica',
            type: 'string'
          }),
          defineField({
            name: 'description',
            title: 'Opis',
            type: 'text',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'activities',
            title: 'Aktivnosti',
            type: 'array',
            of: [{ type: 'string' }],
            validation: Rule => Rule.required().min(1)
          })
        ]
      }]
    }),

    // Success stories
    defineField({
      name: 'successStories',
      title: 'Priče uspeha',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'name',
            title: 'Ime',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'role',
            title: 'Pozicija',
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
            name: 'achievement',
            title: 'Dostignuće',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'metric',
            title: 'Metrika',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'photo',
            title: 'Fotografija',
            type: 'image',
            options: { hotspot: true }
          })
        ]
      }]
    }),

    // CTA features
    defineField({
      name: 'ctaFeatures',
      title: 'CTA karakteristike',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'icon',
            title: 'Ikonica',
            type: 'string'
          }),
          defineField({
            name: 'title',
            title: 'Naslov',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'description',
            title: 'Opis',
            type: 'string',
            validation: Rule => Rule.required()
          })
        ]
      }]
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
        title,
        subtitle: isActive ? 'Aktivno' : 'Neaktivno'
      }
    }
  }
})