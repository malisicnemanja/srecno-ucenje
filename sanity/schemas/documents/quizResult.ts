import { defineField, defineType } from 'sanity'

const quizResult = defineType({
  name: 'quizResult',
  title: 'Quiz Results',
  type: 'document',
  fields: [
    defineField({
      name: 'quizType',
      title: 'Quiz Type',
      type: 'string',
      options: {
        list: [
          { title: 'Educator', value: 'educator' },
          { title: 'Franchise Model', value: 'franchise_model' },
          { title: 'Readiness', value: 'readiness' },
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
      name: 'name',
      title: 'Full Name',
      type: 'string',
    }),
    defineField({
      name: 'answers',
      title: 'Quiz Answers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'string' },
            { name: 'score', title: 'Score', type: 'number' },
          ],
        },
      ],
    }),
    defineField({
      name: 'totalScore',
      title: 'Total Score',
      type: 'number',
    }),
    defineField({
      name: 'resultCategory',
      title: 'Result Category',
      type: 'string',
      description: 'e.g., "Perfect Fit", "High Potential", etc.',
    }),
    defineField({
      name: 'recommendations',
      title: 'Personalized Recommendations',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'leadScore',
      title: 'Lead Score',
      type: 'number',
      description: '0-100 based on quiz responses',
    }),
    defineField({
      name: 'createdAt',
      title: 'Completed At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
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
      subtitle: 'quizType',
      score: 'totalScore',
      createdAt: 'createdAt',
    },
    prepare(selection) {
      const { title, subtitle, score, createdAt } = selection
      return {
        title: title || 'Anonymous',
        subtitle: `${subtitle} - Score: ${score} - ${new Date(createdAt).toLocaleDateString()}`,
      }
    },
  },
})

export default quizResult