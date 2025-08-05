import { defineField, defineType } from 'sanity'

const booking = defineType({
  name: 'booking',
  title: 'Bookings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'consultationType',
      title: 'Consultation Type',
      type: 'string',
      options: {
        list: [
          { title: 'Franšiza - Početne informacije', value: 'franchise_intro' },
          { title: 'Biznis plan konsultacije', value: 'business_plan' },
          { title: 'Lokacija i prostor', value: 'location' },
          { title: 'Marketing strategija', value: 'marketing' },
          { title: 'Finansijske konsultacije', value: 'financial' },
          { title: 'Ostalo', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'preferredDate',
      title: 'Preferred Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'preferredTime',
      title: 'Preferred Time',
      type: 'string',
      options: {
        list: [
          { title: '09:00', value: '09:00' },
          { title: '10:00', value: '10:00' },
          { title: '11:00', value: '11:00' },
          { title: '12:00', value: '12:00' },
          { title: '13:00', value: '13:00' },
          { title: '14:00', value: '14:00' },
          { title: '15:00', value: '15:00' },
          { title: '16:00', value: '16:00' },
          { title: '17:00', value: '17:00' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'experience',
      title: 'Business Experience',
      type: 'string',
      options: {
        list: [
          { title: 'Bez iskustva', value: 'none' },
          { title: 'Do 2 godine', value: 'beginner' },
          { title: '2-5 godina', value: 'intermediate' },
          { title: 'Preko 5 godina', value: 'experienced' },
        ],
      },
    }),
    defineField({
      name: 'budget',
      title: 'Investment Budget',
      type: 'string',
      options: {
        list: [
          { title: 'Do 20.000 EUR', value: 'under_20k' },
          { title: '20.000 - 40.000 EUR', value: '20k_40k' },
          { title: '40.000 - 60.000 EUR', value: '40k_60k' },
          { title: 'Preko 60.000 EUR', value: 'over_60k' },
        ],
      },
    }),
    defineField({
      name: 'message',
      title: 'Additional Message',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'leadScore',
      title: 'Lead Score',
      type: 'number',
      description: '0-100 based on inputs',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'confirmedDate',
      title: 'Confirmed Date & Time',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'consultationType',
      date: 'preferredDate',
      status: 'status',
    },
    prepare(selection) {
      const { title, subtitle, date, status } = selection
      const statusEmoji = {
        pending: '⏳',
        confirmed: '✅',
        completed: '✔️',
        cancelled: '❌',
      }
      return {
        title: `${statusEmoji[status] || ''} ${title}`,
        subtitle: `${subtitle} - ${new Date(date).toLocaleDateString('sr-RS')}`,
      }
    },
  },
})

export default booking