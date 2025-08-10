import { defineField, defineType } from 'sanity'

const videoBackground = defineType({
  name: 'videoBackground',
  title: 'Video Background',
  type: 'object',
  fields: [
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'URL to the video file (MP4 recommended)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image',
      type: 'image',
      description: 'Fallback image while video loads',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'mobileVideoUrl',
      title: 'Mobile Video URL',
      type: 'url',
      description: 'Optional lighter video for mobile devices',
    }),
  ],
})

export default videoBackground