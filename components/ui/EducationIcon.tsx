'use client'

import { motion } from 'framer-motion'

interface EducationIconProps {
  size?: number
  className?: string
  animate?: boolean
}

export default function EducationIcon({ 
  size = 64, 
  className = '', 
  animate = true 
}: EducationIconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={animate ? { scale: 0.8, opacity: 0 } : false}
      animate={animate ? { scale: 1, opacity: 1 } : false}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Graduation Cap Base */}
      <motion.path
        d="M32 12L8 22L32 32L56 22L32 12Z"
        fill="url(#gradientCap)"
        stroke="#1E40AF"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : false}
        transition={{ duration: 1, delay: 0.2 }}
      />
      
      {/* Tassel */}
      <motion.g
        initial={animate ? { rotate: -10 } : false}
        animate={animate ? { rotate: [0, 5, -5, 0] } : false}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "easeInOut" 
        }}
        style={{ originX: '56px', originY: '22px' }}
      >
        <path
          d="M56 22L58 26L56 30L54 34"
          stroke="#DC2626"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="54" cy="34" r="2" fill="#DC2626" />
      </motion.g>
      
      {/* Cap Shadow/Depth */}
      <motion.path
        d="M32 32L20 26V38C20 42 25 46 32 46C39 46 44 42 44 38V26L32 32Z"
        fill="url(#gradientShadow)"
        stroke="#1E40AF"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={animate ? { opacity: 0, y: 5 } : false}
        animate={animate ? { opacity: 1, y: 0 } : false}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      
      {/* Sparkles */}
      <motion.g
        initial={animate ? { opacity: 0 } : false}
        animate={animate ? { opacity: [0, 1, 0] } : false}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatDelay: 1 
        }}
      >
        <circle cx="42" cy="16" r="1.5" fill="#FCD34D" />
        <circle cx="22" cy="18" r="1" fill="#FCD34D" />
        <circle cx="48" cy="30" r="1.5" fill="#FCD34D" />
        <circle cx="16" cy="28" r="1" fill="#FCD34D" />
      </motion.g>
      
      {/* Book Pages */}
      <motion.g
        initial={animate ? { y: 10, opacity: 0 } : false}
        animate={animate ? { y: 0, opacity: 1 } : false}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <rect x="26" y="48" width="12" height="8" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1" rx="1" />
        <rect x="28" y="50" width="8" height="1" fill="#9CA3AF" rx="0.5" />
        <rect x="28" y="52" width="6" height="1" fill="#9CA3AF" rx="0.5" />
        <rect x="28" y="54" width="8" height="1" fill="#9CA3AF" rx="0.5" />
      </motion.g>
      
      {/* Definitions */}
      <defs>
        <linearGradient id="gradientCap" x1="8" y1="12" x2="56" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1E40AF" />
        </linearGradient>
        <linearGradient id="gradientShadow" x1="20" y1="26" x2="44" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EBF4FF" />
          <stop offset="1" stopColor="#DBEAFE" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}