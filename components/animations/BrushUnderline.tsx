'use client'

interface BrushUnderlineProps {
  color?: 'primary' | 'secondary' | 'accent' | 'warm'
  delay?: number
  className?: string
}

export const BrushUnderline = ({ 
  color = 'primary', 
  delay = 0,
  className = ''
}: BrushUnderlineProps) => {
  const colors = {
    primary: '#10B981',
    secondary: '#3B82F6',
    accent: '#F59E0B',
    warm: '#EF4444'
  }
  
  return (
    <svg 
      className={`absolute -bottom-2 left-0 w-full h-4 ${className}`} 
      viewBox="0 0 300 12"
      preserveAspectRatio="none"
    >
      <path
        d="M5,8 Q30,3 60,7 T120,6 T180,8 T240,5 T295,7"
        stroke={colors[color]}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        className="animate-brush-stroke"
        style={{
          strokeDasharray: 1000,
          animationDelay: `${delay}ms`
        }}
      />
    </svg>
  )
}

export default BrushUnderline