import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'franchiseApplicationSubmission',
  title: 'Poslate prijave za franšizu',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ime i prezime',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'email',
      title: 'Email adresa',
      type: 'email',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'phone',
      title: 'Broj telefona',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'location',
      title: 'Željena lokacija franšize',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'occupation',
      title: 'Trenutno zanimanje',
      type: 'string'
    }),
    defineField({
      name: 'education',
      title: 'Nivo obrazovanja',
      type: 'string',
      options: {
        list: [
          { title: 'Srednja škola', value: 'srednja_skola' },
          { title: 'Viša škola', value: 'visa_skola' },
          { title: 'Fakultet (diplomirani)', value: 'fakultet' },
          { title: 'Master studije', value: 'master' },
          { title: 'Doktorske studije', value: 'doktorat' }
        ]
      }
    }),
    defineField({
      name: 'experience',
      title: 'Godine radnog iskustva',
      type: 'string',
      options: {
        list: [
          { title: 'Manje od 1 godine', value: '0-1' },
          { title: '1-3 godine', value: '1-3' },
          { title: '3-5 godina', value: '3-5' },
          { title: '5-10 godina', value: '5-10' },
          { title: 'Više od 10 godina', value: '10+' }
        ]
      }
    }),
    defineField({
      name: 'motivation',
      title: 'Motivacija za otvaranje franšize',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'educationExperience',
      title: 'Iskustvo sa decom/edukacijom',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'goals',
      title: 'Ciljevi za prvih 12 meseci',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'availableTime',
      title: 'Dostupno vreme nedeljno',
      type: 'string',
      options: {
        list: [
          { title: 'Do 10 sati (part-time)', value: '0-10' },
          { title: '10-20 sati', value: '10-20' },
          { title: '20-30 sati', value: '20-30' },
          { title: '30-40 sati (full-time)', value: '30-40' },
          { title: 'Više od 40 sati', value: '40+' }
        ]
      }
    }),
    defineField({
      name: 'budget',
      title: 'Planirani početni budžet',
      type: 'string',
      options: {
        list: [
          { title: 'Do 2.000€', value: '0-2000' },
          { title: '2.000€ - 5.000€', value: '2000-5000' },
          { title: '5.000€ - 10.000€', value: '5000-10000' },
          { title: 'Više od 10.000€', value: '10000+' },
          { title: 'Još uvek ne znam', value: 'unknown' }
        ]
      }
    }),
    defineField({
      name: 'submittedAt',
      title: 'Datum prijave',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'status',
      title: 'Status prijave',
      type: 'string',
      options: {
        list: [
          { title: 'Na čekanju', value: 'pending' },
          { title: 'U obradi', value: 'processing' },
          { title: 'Odobren', value: 'approved' },
          { title: 'Odbačen', value: 'rejected' },
          { title: 'Zatvorena', value: 'closed' }
        ]
      },
      initialValue: 'pending'
    }),
    defineField({
      name: 'notes',
      title: 'Napomene',
      type: 'text',
      rows: 3,
      description: 'Interne napomene o kandidatu'
    }),
    defineField({
      name: 'followUpDate',
      title: 'Datum za praćenje',
      type: 'date',
      description: 'Kada treba kontaktirati kandidata'
    }),
    defineField({
      name: 'rating',
      title: 'Ocena kandidata',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5]
      },
      validation: Rule => Rule.min(1).max(5)
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      description: 'location',
      status: 'status',
      date: 'submittedAt'
    },
    prepare(selection) {
      const { title, subtitle, description, status, date } = selection
      const statusLabels: Record<string, string> = {
        pending: '⏳ Na čekanju',
        processing: '⚙️ U obradi',
        approved: '✅ Odobren',
        rejected: '❌ Odbačen',
        closed: '🔒 Zatvorena'
      }
      
      const formattedDate = date ? new Date(date).toLocaleDateString('sr-RS') : ''
      
      return {
        title: `${title} - ${statusLabels[status] || status}`,
        subtitle: `${subtitle} • ${description}`,
        description: formattedDate
      }
    }
  },
  orderings: [
    {
      title: 'Najnovije prvo',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }]
    },
    {
      title: 'Po statusu',
      name: 'statusAsc',
      by: [
        { field: 'status', direction: 'asc' },
        { field: 'submittedAt', direction: 'desc' }
      ]
    }
  ]
})