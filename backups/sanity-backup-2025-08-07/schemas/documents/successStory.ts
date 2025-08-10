import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'successStory',
  title: 'Priče o Uspehu',
  type: 'document',
  fields: [
    defineField({
      name: 'studentName',
      title: 'Ime Učenika',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'age',
      title: 'Uzrast',
      type: 'string',
    }),
    defineField({
      name: 'program',
      title: 'Program',
      type: 'reference',
      to: { type: 'program' },
    }),
    defineField({
      name: 'testimonial',
      title: 'Iskustvo',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Sadržaj (Alternative)',
      type: 'text',
    }),
    defineField({
      name: 'results',
      title: 'Rezultati',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'metric', title: 'Metrika', type: 'string' },
            { name: 'label', title: 'Opis', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'beforeSkills',
      title: 'Veštine Pre Kursa',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'afterSkills',
      title: 'Veštine Posle Kursa',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'video',
      title: 'Video Iskustvo',
      type: 'object',
      fields: [
        { name: 'url', title: 'Video URL', type: 'url' },
        { name: 'thumbnail', title: 'Thumbnail', type: 'image' },
        { name: 'description', title: 'Opis', type: 'string' },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Izdvojeno',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Datum Objavljivanja',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Lokacija',
      type: 'string',
      description: 'npr. Beograd, Novi Sad',
    }),
    defineField({
      name: 'createdAt',
      title: 'Datum kreiranja',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'studentName',
      subtitle: 'program.title',
      media: 'video.thumbnail',
    },
  },
})