import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  as?: keyof JSX.IntrinsicElements
}

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl', 
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full'
}

export function Container({ 
  children, 
  className, 
  size = 'xl',
  as: Component = 'div'
}: ContainerProps) {
  return (
    <Component 
      className={cn(
        'container mx-auto px-4',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  )
}

export default Container