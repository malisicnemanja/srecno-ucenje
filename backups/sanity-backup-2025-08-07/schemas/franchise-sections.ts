import { defineField, defineType } from 'sanity'
import { ComponentIcon } from '@sanity/icons'

export default defineType({
  name: 'franchiseSection',
  title: 'Sekcija prijave',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov sekcije',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Podnaslov',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Opis sekcije',
      type: 'text'
    }),
    defineField({
      name: 'sectionId',
      title: 'ID sekcije',
      type: 'string',
      validation: Rule => Rule.required().regex(/^[a-z0-9-]+$/, {
        name: 'URL format',
        invert: false
      }),
      description: 'Jedinstveni identifikator sekcije (npr. "general-info", "motivation")'
    }),
    defineField({
      name: 'icon',
      title: 'Ikonica',
      type: 'string',
      options: {
        list: [
          { title: '👤 Profil/Opšti podaci', value: 'user' },
          { title: '💼 Posao/Karijera', value: 'briefcase' },
          { title: '🎯 Motivacija/Ciljevi', value: 'target' },
          { title: '💡 Ideje/Kreativnost', value: 'lightbulb' },
          { title: '📈 Biznis/Finansije', value: 'chart' },
          { title: '🏆 Iskustvo/Postignuća', value: 'trophy' },
          { title: '📍 Lokacija/Geografija', value: 'location' },
          { title: '📞 Kontakt/Komunikacija', value: 'phone' },
          { title: '📋 Lista/Dokumenti', value: 'clipboard' },
          { title: '⭐ Kvaliteti/Vrline', value: 'star' }
        ]
      }
    }),
    defineField({
      name: 'fields',
      title: 'Polja sekcije',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'franchiseField' } }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'order',
      title: 'Redosled sekcije',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'isRequired',
      title: 'Obavezna sekcija',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'progressWeight',
      title: 'Težina u progress baru',
      type: 'number',
      validation: Rule => Rule.min(1).max(100),
      initialValue: 25,
      description: 'Koliko procenata ukupnog progress bara čini ova sekcija'
    }),
    defineField({
      name: 'helpText',
      title: 'Pomoćni tekst',
      type: 'text',
      description: 'Dodatne informacije ili uputstva za korisnika'
    }),
    defineField({
      name: 'validationRules',
      title: 'Pravila validacije',
      type: 'object',
      fields: [
        defineField({
          name: 'minRequiredFields',
          title: 'Minimum obaveznih polja',
          type: 'number',
          description: 'Koliko polja mora biti popunjeno da se sekcija smatra validnom'
        }),
        defineField({
          name: 'customValidationMessage',
          title: 'Prilagođena poruka greške',
          type: 'string'
        })
      ]
    }),
    defineField({
      name: 'isActive',
      title: 'Aktivna sekcija',
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
      const iconMap: Record<string, string> = {
        user: '👤',
        briefcase: '💼',
        target: '🎯',
        lightbulb: '💡',
        chart: '📈',
        trophy: '🏆',
        location: '📍',
        phone: '📞',
        clipboard: '📋',
        star: '⭐'
      }
      
      return {
        title: `${order}. ${title}`,
        subtitle: isActive ? 'Aktivna' : 'Neaktivna',
        media: iconMap[icon] || '📝'
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