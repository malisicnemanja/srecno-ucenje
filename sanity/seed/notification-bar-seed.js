import { client } from '../lib/client'

const notificationBarData = {
  _type: 'notificationBar',
  title: 'Posebna ponuda za januar',
  message: '🎓 Specijalna ponuda za januar - 20% popusta na sve franšiza pakete!',
  linkText: 'Saznaj više',
  linkUrl: '/fransiza-modeli',
  backgroundColor: 'bg-primary-50',
  textColor: 'text-primary-900',
  isActive: true,
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 dana
}

async function seedNotificationBar() {
  try {
    console.log('Creating notification bar...')
    const result = await client.create(notificationBarData)
    console.log('Notification bar created:', result._id)
  } catch (error) {
    console.error('Error creating notification bar:', error)
  }
}

seedNotificationBar()