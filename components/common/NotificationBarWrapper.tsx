import { client } from '@/lib/sanity.client'
import NotificationBar from '@/components/ui/NotificationBar'

const notificationQuery = `*[_type == "notificationBar" && isActive == true][0]{
  message,
  linkText,
  linkUrl,
  backgroundColor,
  textColor,
  isActive,
  startDate,
  endDate
}`

async function getNotificationData() {
  try {
    const data = await client.fetch(notificationQuery)
    
    // Proveri da li je notifikacija u okviru datuma
    if (data && (data.startDate || data.endDate)) {
      const now = new Date()
      const start = data.startDate ? new Date(data.startDate) : null
      const end = data.endDate ? new Date(data.endDate) : null
      
      if (start && now < start) return null
      if (end && now > end) return null
    }
    
    return data
  } catch (error) {
    console.error('Error fetching notification data:', error)
    return null
  }
}

export default async function NotificationBarWrapper() {
  const data = await getNotificationData()
  
  if (!data) return null
  
  return <NotificationBar data={data} />
}