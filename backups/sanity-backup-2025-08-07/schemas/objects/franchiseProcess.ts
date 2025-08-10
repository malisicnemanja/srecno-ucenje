import { defineType } from 'sanity'

export default defineType({
  name: 'franchiseProcess',
  title: 'Franchise Process',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Process Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Process Description',
      type: 'text',
    },
    {
      name: 'steps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'processStep',
          fields: [
            {
              name: 'stepNumber',
              title: 'Step Number',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required().max(100),
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'array',
              of: [{ type: 'block' }],
            },
            {
              name: 'duration',
              title: 'Estimated Duration',
              type: 'string',
              description: 'e.g., "2-3 days", "1 week", etc.',
            },
            {
              name: 'icon',
              title: 'Step Icon',
              type: 'string',
              description: 'Lucide React icon name',
            },
            {
              name: 'image',
              title: 'Step Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alternative Text',
                  type: 'string',
                },
              ],
            },
            {
              name: 'requirements',
              title: 'Requirements',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'List of requirements for this step',
            },
            {
              name: 'deliverables',
              title: 'Deliverables',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'What will be delivered in this step',
            },
            {
              name: 'actionButton',
              title: 'Action Button',
              type: 'button',
              description: 'Optional call-to-action for this step',
            },
            {
              name: 'completed',
              title: 'Mark as Completed',
              type: 'boolean',
              description: 'For tracking progress in applications',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'title',
              stepNumber: 'stepNumber',
              media: 'image',
            },
            prepare({ title, stepNumber, media }) {
              return {
                title: `${stepNumber}. ${title}`,
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(10),
    },
    {
      name: 'totalDuration',
      title: 'Total Process Duration',
      type: 'string',
      description: 'Overall time needed to complete the process',
    },
    {
      name: 'processType',
      title: 'Process Type',
      type: 'string',
      options: {
        list: [
          { title: 'Application Process', value: 'application' },
          { title: 'Onboarding Process', value: 'onboarding' },
          { title: 'Training Process', value: 'training' },
          { title: 'Launch Process', value: 'launch' },
          { title: 'General Process', value: 'general' },
        ],
      },
      initialValue: 'general',
    },
    {
      name: 'visualStyle',
      title: 'Visual Style',
      type: 'string',
      options: {
        list: [
          { title: 'Vertical Timeline', value: 'timeline-vertical' },
          { title: 'Horizontal Timeline', value: 'timeline-horizontal' },
          { title: 'Card Grid', value: 'cards' },
          { title: 'Numbered List', value: 'numbered' },
          { title: 'Progress Tracker', value: 'progress' },
        ],
      },
      initialValue: 'timeline-vertical',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'gray-50' },
          { title: 'Sky Blue', value: 'sky-50' },
          { title: 'Sun Yellow', value: 'sun-50' },
        ],
      },
      initialValue: 'default',
    },
  ],
  preview: {
    select: {
      title: 'title',
      processType: 'processType',
      stepsCount: 'steps.length',
    },
    prepare({ title, processType, stepsCount }) {
      return {
        title: title || 'Franchise Process',
        subtitle: `${processType} • ${stepsCount || 0} steps`,
      }
    },
  },
})
