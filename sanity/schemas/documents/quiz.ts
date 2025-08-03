import { defineField, defineType } from 'sanity'

const quiz = defineType({
  name: 'quiz',
  title: 'Quizzes',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Quiz Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Quiz Type',
      type: 'string',
      options: {
        list: [
          { title: 'Educator Quiz', value: 'educator' },
          { title: 'Franchise Model Quiz', value: 'franchise_model' },
          { title: 'Readiness Quiz', value: 'readiness' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'leadMagnet',
      title: 'Lead Magnet',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Lead Capture',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'title',
          title: 'Lead Form Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Lead Form Description',
          type: 'text',
          rows: 2,
        },
        {
          name: 'resource',
          title: 'Resource to Offer',
          type: 'string',
          options: {
            list: [
              { title: 'Personalized Report', value: 'report' },
              { title: 'PDF Guide', value: 'guide' },
              { title: 'Video Content', value: 'video' },
              { title: 'Consultation', value: 'consultation' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'type',
              title: 'Question Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Multiple Choice', value: 'multiple_choice' },
                  { title: 'Scale (1-10)', value: 'scale' },
                  { title: 'Yes/No', value: 'boolean' },
                  { title: 'Multiple Select', value: 'multiple_select' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answers',
              title: 'Answer Options',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'text',
                      title: 'Answer Text',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'value',
                      title: 'Score Value',
                      type: 'number',
                      description: 'Points for this answer',
                    },
                    {
                      name: 'category',
                      title: 'Category',
                      type: 'string',
                      description: 'For personality/model matching',
                    },
                  ],
                },
              ],
              hidden: ({ parent }) => parent?.type === 'scale',
            },
            {
              name: 'weight',
              title: 'Question Weight',
              type: 'number',
              initialValue: 1,
              description: 'Importance multiplier for scoring',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(5).max(20),
    }),
    defineField({
      name: 'results',
      title: 'Result Ranges',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'minScore',
              title: 'Minimum Score',
              type: 'number',
            },
            {
              name: 'maxScore',
              title: 'Maximum Score',
              type: 'number',
            },
            {
              name: 'title',
              title: 'Result Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Result Description',
              type: 'text',
            },
            {
              name: 'recommendations',
              title: 'Recommendations',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'ctaText',
              title: 'CTA Text',
              type: 'string',
            },
            {
              name: 'ctaLink',
              title: 'CTA Link',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
    },
    prepare(selection) {
      const { title, type } = selection
      return {
        title,
        subtitle: type ? type.replace('_', ' ').toUpperCase() : '',
      }
    },
  },
})

export default quiz