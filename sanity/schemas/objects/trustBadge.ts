import { defineField, defineType } from 'sanity'

const trustBadge = defineType({
  name: 'trustBadge',
  title: 'Trust Badge',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Award', value: 'award' },
          { title: 'Star', value: 'star' },
          { title: 'Shield', value: 'shield' },
          { title: 'Certificate', value: 'certificate' },
          { title: 'Trophy', value: 'trophy' },
          { title: 'Users', value: 'users' },
          { title: 'Clock', value: 'clock' },
        ],
      },
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'e.g., "50+", "15 godina"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g., "Franšiza", "Iskustva"',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

export default trustBadge