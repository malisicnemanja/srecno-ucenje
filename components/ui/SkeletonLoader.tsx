import { cn } from '@/lib/utils'

interface SkeletonLoaderProps {
  type?: 'text' | 'title' | 'image' | 'card' | 'avatar' | 'button' | 'custom'
  lines?: number
  className?: string
}

export default function SkeletonLoader({ 
  type = 'text', 
  lines = 1, 
  className 
}: SkeletonLoaderProps) {
  if (type === 'card') {
    return (
      <div className={cn("card", className)}>
        <div className="skeleton-image mb-4" />
        <div className="skeleton-title w-3/4" />
        <div className="space-y-2">
          <div className="skeleton-text" />
          <div className="skeleton-text" />
          <div className="skeleton-text w-5/6" />
        </div>
      </div>
    )
  }

  if (type === 'avatar') {
    return (
      <div className={cn("flex items-center space-x-4", className)}>
        <div className="skeleton-avatar" />
        <div className="flex-1 space-y-2">
          <div className="skeleton-text w-32" />
          <div className="skeleton-text w-24" />
        </div>
      </div>
    )
  }

  if (type === 'image') {
    return <div className={cn("skeleton-image", className)} />
  }

  if (type === 'title') {
    return <div className={cn("skeleton-title", className)} />
  }

  if (type === 'button') {
    return (
      <div className={cn("skeleton-button", className)}>
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    )
  }

  if (type === 'custom') {
    return <div className={cn("skeleton", className)} />
  }

  // Default text type
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className={cn(
            "skeleton-text",
            i === lines - 1 && lines > 1 && "w-4/5"
          )} 
        />
      ))}
    </div>
  )
}