export default {
  name: 'notificationBar',
  title: 'Notification Bar',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Naziv (interno)',
      type: 'string',
      description: 'Naziv za lakše upravljanje u CMS-u',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'message',
      title: 'Poruka',
      type: 'string',
      description: 'Tekst koji će se prikazati u notification bar-u',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'linkText',
      title: 'Tekst linka',
      type: 'string',
      description: 'Opciono - tekst za link (npr. "Saznaj više")'
    },
    {
      name: 'linkUrl',
      title: 'URL linka',
      type: 'string',
      description: 'Opciono - URL ka kome vodi link'
    },
    {
      name: 'backgroundColor',
      title: 'Boja pozadine',
      type: 'string',
      description: 'Tailwind CSS klasa za boju (npr. bg-primary-50, bg-secondary-50)',
      initialValue: 'bg-primary-50',
      options: {
        list: [
          { title: 'Primarna svetla', value: 'bg-primary-50' },
          { title: 'Sekundarna svetla', value: 'bg-secondary-50' },
          { title: 'Akcent svetla', value: 'bg-accent-50' },
          { title: 'Siva svetla', value: 'bg-gray-100' },
          { title: 'Zelena svetla', value: 'bg-green-50' },
          { title: 'Plava svetla', value: 'bg-blue-50' }
        ]
      }
    },
    {
      name: 'textColor',
      title: 'Boja teksta',
      type: 'string',
      description: 'Tailwind CSS klasa za boju teksta',
      initialValue: 'text-primary-900',
      options: {
        list: [
          { title: 'Primarna tamna', value: 'text-primary-900' },
          { title: 'Sekundarna tamna', value: 'text-secondary-900' },
          { title: 'Akcent tamna', value: 'text-accent-900' },
          { title: 'Siva tamna', value: 'text-gray-900' },
          { title: 'Zelena tamna', value: 'text-green-900' },
          { title: 'Plava tamna', value: 'text-blue-900' }
        ]
      }
    },
    {
      name: 'isActive',
      title: 'Aktivno',
      type: 'boolean',
      description: 'Da li prikazati notification bar',
      initialValue: false
    },
    {
      name: 'startDate',
      title: 'Datum početka',
      type: 'datetime',
      description: 'Opciono - kada početi sa prikazivanjem'
    },
    {
      name: 'endDate',
      title: 'Datum završetka',
      type: 'datetime',
      description: 'Opciono - kada prestati sa prikazivanjem'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'message',
      isActive: 'isActive'
    },
    prepare({ title, subtitle, isActive }: any) {
      return {
        title,
        subtitle: `${isActive ? '✅ Aktivno' : '❌ Neaktivno'} - ${subtitle}`
      }
    }
  }
}