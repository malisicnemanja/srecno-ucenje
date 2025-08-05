import React from 'react'
import { 
  BookIcon, 
  StarIcon, 
  UserIcon, 
  DocumentsIcon, 
  FolderIcon,
  CheckmarkCircleIcon,
  InfoOutlineIcon,
  DocumentTextIcon,
  PresentationIcon,
  BulbOutlineIcon,
  DashboardIcon,
  UsersIcon,
  ChartUpwardIcon,
  ComponentIcon,
  CircleIcon
} from '@sanity/icons'
import { 
  Heart, 
  MapPin, 
  Target, 
  Users,
  Brain,
  Sparkles,
  Award,
  Calendar,
  Clock,
  Phone
} from 'lucide-react'

// Map of icon names to components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  // Sanity Icons
  'book': BookIcon,
  'star': StarIcon,
  'user': UserIcon,
  'documents': DocumentsIcon,
  'folder': FolderIcon,
  'checkmark': CheckmarkCircleIcon,
  'info': InfoOutlineIcon,
  'document': DocumentTextIcon,
  'presentation': PresentationIcon,
  'bulb': BulbOutlineIcon,
  'dashboard': DashboardIcon,
  'users': UsersIcon,
  'chart': ChartUpwardIcon,
  'component': ComponentIcon,
  'circle': CircleIcon,
  
  // Lucide Icons
  'heart': Heart,
  'map': MapPin,
  'target': Target,
  'people': Users,
  'brain': Brain,
  'sparkles': Sparkles,
  'award': Award,
  'calendar': Calendar,
  'clock': Clock,
  'phone': Phone,
  
  // Default fallback
  'default': CircleIcon
}

// Color map for legacy emoji colors
const colorMap: Record<string, string> = {
  'primary': 'text-blue-500',
  'secondary': 'text-green-500',
  'accent': 'text-yellow-500',
  'warm': 'text-orange-500',
  'red': 'text-red-500',
  'purple': 'text-purple-500'
}

interface IconResolverProps {
  icon?: string | null
  color?: string | null
  className?: string
  size?: number
}

export function resolveIcon({ icon, color, className = '', size = 24 }: IconResolverProps) {
  // If no icon provided, return null
  if (!icon) return null
  
  // Get the icon component
  const IconComponent = iconMap[icon] || iconMap['default']
  
  // Resolve color class
  const colorClass = color ? (colorMap[color] || color) : ''
  
  // Combine classes
  const finalClassName = `${colorClass} ${className}`.trim()
  
  return <IconComponent className={finalClassName} />
}

// Export individual components for direct use
export { iconMap, colorMap }