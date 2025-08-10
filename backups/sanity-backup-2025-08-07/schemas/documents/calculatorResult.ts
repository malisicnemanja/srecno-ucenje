import { defineField, defineType } from 'sanity'

const calculatorResult = defineType({
  name: 'calculatorResult',
  title: 'Calculator Results',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Calculator Type',
      type: 'string',
      options: {
        list: [
          { title: 'Investment', value: 'investment' },
          { title: 'ROI', value: 'roi' },
          { title: 'Space', value: 'space' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'User Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'inputs',
      title: 'Calculator Inputs',
      type: 'object',
      fields: [
        { name: 'model', title: 'Franchise Model', type: 'string' },
        { name: 'squareMeters', title: 'Square Meters', type: 'number' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'renovation', title: 'Renovation Level', type: 'string' },
        { name: 'childrenCount', title: 'Children Count', type: 'number' },
        { name: 'pricePerChild', title: 'Price per Child', type: 'number' },
        { name: 'workingHours', title: 'Working Hours', type: 'number' },
      ],
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'object',
      fields: [
        { name: 'totalInvestment', title: 'Total Investment', type: 'number' },
        { name: 'monthlyRevenue', title: 'Monthly Revenue', type: 'number' },
        { name: 'breakEvenMonths', title: 'Break Even (Months)', type: 'number' },
        { name: 'threeYearProjection', title: '3 Year Projection', type: 'number' },
        { name: 'breakdown', title: 'Cost Breakdown', type: 'text' },
      ],
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'leadScore',
      title: 'Lead Score',
      type: 'number',
      description: '0-100 based on inputs',
    }),
    defineField({
      name: 'followUpStatus',
      title: 'Follow-up Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Qualified', value: 'qualified' },
          { title: 'Not Interested', value: 'not_interested' },
          { title: 'Converted', value: 'converted' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'type',
      createdAt: 'createdAt',
    },
    prepare(selection) {
      const { title, subtitle, createdAt } = selection
      return {
        title: title || 'Anonymous',
        subtitle: `${subtitle} - ${new Date(createdAt).toLocaleDateString()}`,
      }
    },
  },
})

export default calculatorResult