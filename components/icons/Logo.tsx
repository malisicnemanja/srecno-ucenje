interface LogoProps {
  className?: string
}

export default function Logo({ className = "w-12 h-12" }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="20" y="28" width="8" height="12" fill="#8B4513" rx="1"/>
      <g transform="translate(24, 20)">
        <path d="M-12 -8 Q-12 -16 -4 -16 Q0 -12 0 -8 Z" fill="#66BB6A"/>
        <path d="M0 -8 Q0 -12 4 -16 Q12 -16 12 -8 Z" fill="#EF5350"/>
        <path d="M12 -8 Q12 0 4 0 Q0 -4 0 -8 Z" fill="#FFA726"/>
        <path d="M0 -8 Q0 -4 -4 0 Q-12 0 -12 -8 Z" fill="#42A5F5"/>
      </g>
      <circle cx="14" cy="10" r="2" fill="#66BB6A" opacity="0.6"/>
      <circle cx="34" cy="8" r="2" fill="#EF5350" opacity="0.6"/>
      <circle cx="38" cy="24" r="2" fill="#FFA726" opacity="0.6"/>
      <circle cx="10" cy="26" r="2" fill="#42A5F5" opacity="0.6"/>
      <path d="M18 34 Q24 38 30 34" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  )
}
