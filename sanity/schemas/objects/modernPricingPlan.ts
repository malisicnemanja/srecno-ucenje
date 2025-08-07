import { defineType } from 'sanity'

export default defineType({
  name: 'modernPricingPlan',
  title: 'Modern Pricing Plan',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
    },
    {
      name: 'description',
      title: 'Plan Description',
      type: 'text',
      description: 'Brief description of what this plan offers',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        {
          name: 'amount',
          title: 'Price Amount',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          options: {
            list: [
              { title: 'Serbian Dinar (RSD)', value: 'RSD' },
              { title: 'Euro (EUR)', value: 'EUR' },
              { title: 'US Dollar (USD)', value: 'USD' },
            ],
          },
          initialValue: 'RSD',
        },
        {
          name: 'period',
          title: 'Billing Period',
          type: 'string',
          options: {
            list: [
              { title: 'One-time', value: 'once' },
              { title: 'Monthly', value: 'month' },
              { title: 'Quarterly', value: 'quarter' },
              { title: 'Yearly', value: 'year' },
              { title: 'Per Student', value: 'student' },
              { title: 'Per Session', value: 'session' },
            ],
          },
          initialValue: 'month',
        },
        {
          name: 'originalPrice',
          title: 'Original Price (if discounted)',
          type: 'number',
          description: 'Show strikethrough price if this plan is on sale',
        },
      ],
    },
    {
      name: 'features',
      title: 'Plan Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          fields: [
            {
              name: 'text',
              title: 'Feature Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'included',
              title: 'Included',
              type: 'boolean',
              description: 'Is this feature included in the plan?',
              initialValue: true,
            },
            {
              name: 'highlight',
              title: 'Highlight Feature',
              type: 'boolean',
              description: 'Highlight this feature as important',
              initialValue: false,
            },
            {
              name: 'tooltip',
              title: 'Feature Tooltip',
              type: 'string',
              description: 'Additional explanation shown on hover',
            },
          ],
          preview: {
            select: {
              text: 'text',
              included: 'included',
              highlight: 'highlight',
            },
            prepare({ text, included, highlight }) {
              const prefix = included ? '✓' : '✗'
              const suffix = highlight ? ' ⭐' : ''
              return {
                title: `${prefix} ${text}${suffix}`,
              }
            },
          },
        },
      ],
    },
    {
      name: 'callToAction',
      title: 'Call to Action Button',
      type: 'button',
      description: 'Main action button for this plan',
    },
    {
      name: 'badge',
      title: 'Plan Badge',
      type: 'object',
      description: 'Optional badge like "Most Popular", "Best Value", etc.',
      fields: [
        {
          name: 'text',
          title: 'Badge Text',
          type: 'string',
        },
        {
          name: 'color',
          title: 'Badge Color',
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
      ],
    },
    {
      name: 'popular',
      title: 'Popular Plan',
      type: 'boolean',
      description: 'Mark as the most popular/recommended plan',
      initialValue: false,
    },
    {
      name: 'recommended',
      title: 'Recommended Plan',
      type: 'boolean',
      description: 'Mark as the recommended choice',
      initialValue: false,
    },
    {
      name: 'limitedTime',
      title: 'Limited Time Offer',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Limited Time Badge',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'endDate',
          title: 'Offer End Date',
          type: 'datetime',
          hidden: ({ parent }) => !parent?.enabled,
        },
        {
          name: 'urgencyText',
          title: 'Urgency Text',
          type: 'string',
          placeholder: 'Limited time offer!',
          hidden: ({ parent }) => !parent?.enabled,
        },
      ],
    },
    {
      name: 'additionalInfo',
      title: 'Additional Information',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Fine print, terms, or additional details',
    },
    {
      name: 'trialPeriod',
      title: 'Trial Period',
      type: 'object',
      fields: [
        {
          name: 'available',
          title: 'Trial Available',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'duration',
          title: 'Trial Duration',
          type: 'number',
          description: 'Number of days for trial',
          hidden: ({ parent }) => !parent?.available,
        },
        {
          name: 'description',
          title: 'Trial Description',
          type: 'string',
          placeholder: 'Free 14-day trial',
          hidden: ({ parent }) => !parent?.available,
        },
      ],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order for displaying plans (lower numbers first)',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      name: 'name',
      amount: 'price.amount',
      period: 'price.period',
      currency: 'price.currency',
      popular: 'popular',
      recommended: 'recommended',
    },
    prepare({ name, amount, period, currency, popular, recommended }) {
      const price = amount ? `${amount} ${currency}/${period}` : 'Price TBD'
      const badges = []
      if (popular) badges.push('POPULAR')
      if (recommended) badges.push('RECOMMENDED')
      const badgeText = badges.length > 0 ? `[${badges.join(', ')}] ` : ''
      
      return {
        title: `${badgeText}${name}`,
        subtitle: price,
      }
    },
  },
})
