import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'newsletterSubscriber',
  title: 'Newsletter Pretplatnik',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'name',
      title: 'Ime',
      type: 'string',
    }),
    defineField({
      name: 'interests',
      title: 'Interesovanja',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Franšiza', value: 'franchise' },
          { title: 'Metodologija', value: 'methodology' },
          { title: 'Edukacija', value: 'education' },
          { title: 'Novosti', value: 'news' },
          { title: 'Eventi', value: 'events' },
        ],
      },
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Datum Prijave',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Aktivan',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'unsubscribedAt',
      title: 'Datum Odjave',
      type: 'datetime',
    }),
    defineField({
      name: 'source',
      title: 'Izvor',
      type: 'string',
      options: {
        list: [
          { title: 'Website', value: 'website' },
          { title: 'Landing Page', value: 'landing' },
          { title: 'Blog', value: 'blog' },
          { title: 'Event', value: 'event' },
          { title: 'Manual', value: 'manual' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tagovi',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'name',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, subtitle, isActive } = selection
      return {
        title,
        subtitle: `${subtitle || 'No name'} - ${isActive ? 'Active' : 'Inactive'}`,
      }
    },
  },
})