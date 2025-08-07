import { defineType } from 'sanity'

export default defineType({
  name: 'modernHero',
  title: 'Modern Hero Section',
  type: 'object',
  fields: [
    {
      name: 'layout',
      title: 'Layout Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Split Left (Text left, image right)', value: 'split-left' },
          { title: 'Split Right (Image left, text right)', value: 'split-right' },
          { title: 'Centered', value: 'centered' },
          { title: 'Full Width with Stats', value: 'full-stats' },
        ],
      },
      initialValue: 'split-left',
    },
    {
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small text above the main headline',
    },
    {
      name: 'headline',
      title: 'Main Headline',
      type: 'array',
      of: [{
        type: 'block',
        styles: [{ title: 'Normal', value: 'normal' }],
        lists: [],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
            { title: 'Brush Underline', value: 'brush' },
            { title: 'Highlight', value: 'highlight' },
          ],
          annotations: [],
        },
      }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'alternatingText',
      title: 'Alternating Text Animation',
      type: 'object',
      description: 'Text that cycles through different phrases',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Alternating Text',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'prefix',
          title: 'Text Before Animation',
          type: 'string',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'phrases',
          title: 'Alternating Phrases',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (Rule) => Rule.min(2).max(5),
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'suffix',
          title: 'Text After Animation',
          type: 'string',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'animationType',
          title: 'Animation Type',
          type: 'string',
          options: {
            list: [
              { title: 'Type Writer', value: 'typewriter' },
              { title: 'Fade', value: 'fade' },
              { title: 'Slide Up', value: 'slideUp' },
              { title: 'Flip', value: 'flip' },
            ],
          },
          initialValue: 'typewriter',
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{
        type: 'block',
        styles: [{ title: 'Normal', value: 'normal' }],
        lists: [],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
          ],
        },
      }],
    },
    {
      name: 'buttons',
      title: 'Action Buttons',
      type: 'array',
      of: [{ type: 'button' }],
      validation: (Rule) => Rule.max(3),
    },
    {
      name: 'visual',
      title: 'Visual Content',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Visual Type',
          type: 'string',
          options: {
            list: [
              { title: 'Photo', value: 'photo' },
              { title: 'Illustration', value: 'illustration' },
              { title: 'Video', value: 'video' },
              { title: 'Animation', value: 'animation' },
            ],
          },
          initialValue: 'photo',
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          hidden: ({ parent }) => parent?.type !== 'photo' && parent?.type !== 'illustration',
        },
        {
          name: 'video',
          title: 'Video',
          type: 'file',
          options: {
            accept: 'video/*',
          },
          hidden: ({ parent }) => parent?.type !== 'video',
        },
        {
          name: 'animationCode',
          title: 'Animation Component',
          type: 'string',
          description: 'Name of the React animation component',
          hidden: ({ parent }) => parent?.type !== 'animation',
        },
      ],
    },
    {
      name: 'floatingElements',
      title: 'Floating Elements',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'floatingElement',
          fields: [
            {
              name: 'type',
              title: 'Element Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Icon', value: 'icon' },
                  { title: 'Shape', value: 'shape' },
                  { title: 'Image', value: 'image' },
                  { title: 'Text', value: 'text' },
                ],
              },
            },
            {
              name: 'content',
              title: 'Content',
              type: 'string',
              description: 'Icon name, shape type, or text content',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              hidden: ({ parent }) => parent?.type !== 'image',
            },
            {
              name: 'position',
              title: 'Position',
              type: 'object',
              fields: [
                {
                  name: 'top',
                  title: 'Top (%)',
                  type: 'number',
                  validation: (Rule) => Rule.min(0).max(100),
                },
                {
                  name: 'left',
                  title: 'Left (%)',
                  type: 'number',
                  validation: (Rule) => Rule.min(0).max(100),
                },
              ],
            },
            {
              name: 'animation',
              title: 'Animation',
              type: 'string',
              options: {
                list: [
                  { title: 'None', value: 'none' },
                  { title: 'Float', value: 'float' },
                  { title: 'Rotate', value: 'rotate' },
                  { title: 'Pulse', value: 'pulse' },
                  { title: 'Bounce', value: 'bounce' },
                ],
              },
              initialValue: 'float',
            },
          ],
          preview: {
            select: {
              type: 'type',
              content: 'content',
            },
            prepare({ type, content }) {
              return {
                title: content || type,
                subtitle: `Floating ${type}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(5),
    },
    {
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [{ type: 'statistic' }],
      description: 'Statistics to display (for full-stats layout)',
      validation: (Rule) => Rule.max(4),
    },
    {
      name: 'background',
      title: 'Background Settings',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Background Type',
          type: 'string',
          options: {
            list: [
              { title: 'Solid Color', value: 'solid' },
              { title: 'Gradient', value: 'gradient' },
              { title: 'Image', value: 'image' },
              { title: 'Pattern', value: 'pattern' },
            ],
          },
          initialValue: 'solid',
        },
        {
          name: 'color',
          title: 'Background Color',
          type: 'color',
          hidden: ({ parent }) => parent?.type !== 'solid',
        },
        {
          name: 'gradient',
          title: 'Gradient',
          type: 'object',
          fields: [
            {
              name: 'from',
              title: 'From Color',
              type: 'color',
            },
            {
              name: 'to',
              title: 'To Color',
              type: 'color',
            },
            {
              name: 'direction',
              title: 'Direction',
              type: 'string',
              options: {
                list: [
                  { title: 'To Right', value: 'to-r' },
                  { title: 'To Left', value: 'to-l' },
                  { title: 'To Bottom', value: 'to-b' },
                  { title: 'To Top', value: 'to-t' },
                  { title: 'To Bottom Right', value: 'to-br' },
                  { title: 'To Bottom Left', value: 'to-bl' },
                  { title: 'To Top Right', value: 'to-tr' },
                  { title: 'To Top Left', value: 'to-tl' },
                ],
              },
              initialValue: 'to-r',
            },
          ],
          hidden: ({ parent }) => parent?.type !== 'gradient',
        },
        {
          name: 'image',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          hidden: ({ parent }) => parent?.type !== 'image',
        },
        {
          name: 'pattern',
          title: 'Pattern Type',
          type: 'string',
          options: {
            list: [
              { title: 'Dots', value: 'dots' },
              { title: 'Grid', value: 'grid' },
              { title: 'Diagonal Lines', value: 'diagonal' },
              { title: 'Circles', value: 'circles' },
            ],
          },
          hidden: ({ parent }) => parent?.type !== 'pattern',
        },
      ],
    },
    {
      name: 'spacing',
      title: 'Section Spacing',
      type: 'object',
      fields: [
        {
          name: 'paddingTop',
          title: 'Padding Top',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Small', value: 'sm' },
              { title: 'Medium', value: 'md' },
              { title: 'Large', value: 'lg' },
              { title: 'Extra Large', value: 'xl' },
            ],
          },
          initialValue: 'lg',
        },
        {
          name: 'paddingBottom',
          title: 'Padding Bottom',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Small', value: 'sm' },
              { title: 'Medium', value: 'md' },
              { title: 'Large', value: 'lg' },
              { title: 'Extra Large', value: 'xl' },
            ],
          },
          initialValue: 'lg',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'headline',
      layout: 'layout',
      media: 'visual.image',
    },
    prepare({ title, layout, media }) {
      const headline = title?.[0]?.children?.[0]?.text || 'Hero Section'
      return {
        title: headline,
        subtitle: `Layout: ${layout}`,
        media,
      }
    },
  },
})
