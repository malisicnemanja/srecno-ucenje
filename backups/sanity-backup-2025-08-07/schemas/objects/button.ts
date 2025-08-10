import { defineType } from 'sanity'

export default defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    },
    {
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Link Type',
          type: 'string',
          options: {
            list: [
              { title: 'Internal Page', value: 'internal' },
              { title: 'External URL', value: 'external' },
              { title: 'Email', value: 'email' },
              { title: 'Phone', value: 'phone' },
              { title: 'Scroll to Section', value: 'scroll' },
            ],
          },
          initialValue: 'internal',
        },
        {
          name: 'internal',
          title: 'Internal Page',
          type: 'reference',
          to: [{ type: 'page' }, { type: 'blogPost' }],
          hidden: ({ parent }) => parent?.type !== 'internal',
        },
        {
          name: 'external',
          title: 'External URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }),
          hidden: ({ parent }) => parent?.type !== 'external',
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'email',
          hidden: ({ parent }) => parent?.type !== 'email',
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          hidden: ({ parent }) => parent?.type !== 'phone',
        },
        {
          name: 'anchor',
          title: 'Section ID',
          type: 'string',
          description: 'ID of the section to scroll to (without #)',
          hidden: ({ parent }) => parent?.type !== 'scroll',
        },
        {
          name: 'openInNewTab',
          title: 'Open in New Tab',
          type: 'boolean',
          initialValue: false,
          hidden: ({ parent }) => parent?.type === 'scroll' || parent?.type === 'email' || parent?.type === 'phone',
        },
      ],
    },
    {
      name: 'color',
      title: 'Color Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Sky Blue', value: 'sky' },
          { title: 'Sun Yellow', value: 'sun' },
          { title: 'Grass Green', value: 'grass' },
          { title: 'Heart Pink', value: 'heart' },
          { title: 'Night Purple', value: 'night' },
        ],
      },
      initialValue: 'sky',
    },
    {
      name: 'variant',
      title: 'Button Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Filled', value: 'filled' },
          { title: 'Outline', value: 'outline' },
          { title: 'Text Only', value: 'text' },
          { title: 'Ghost', value: 'ghost' },
        ],
      },
      initialValue: 'filled',
    },
    {
      name: 'size',
      title: 'Button Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' },
          { title: 'Extra Large', value: 'xl' },
        ],
      },
      initialValue: 'md',
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Optional icon name (Lucide React icons)',
    },
    {
      name: 'iconPosition',
      title: 'Icon Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
      hidden: ({ parent }) => !parent?.icon,
    },
    {
      name: 'fullWidth',
      title: 'Full Width',
      type: 'boolean',
      description: 'Make button take full width of container',
      initialValue: false,
    },
    {
      name: 'loading',
      title: 'Loading State',
      type: 'boolean',
      description: 'Show loading spinner',
      initialValue: false,
    },
    {
      name: 'disabled',
      title: 'Disabled',
      type: 'boolean',
      description: 'Disable button interaction',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'text',
      color: 'color',
      variant: 'variant',
    },
    prepare({ title, color, variant }) {
      return {
        title: title || 'Button',
        subtitle: `${color} • ${variant}`,
      }
    },
  },
})
