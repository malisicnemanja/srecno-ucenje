'use client'

import { motion } from 'framer-motion'

interface SuccessIconProps {
  size?: number
  className?: string
  animate?: boolean
}

export default function SuccessIcon({ 
  size = 64, 
  className = '', 
  animate = true 
}: SuccessIconProps) {
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
      {/* Trophy Base */}
      <motion.rect
        x="24" y="48" width="16" height="8"
        fill="url(#gradientBase)"
        stroke="#92400E"
        strokeWidth="2"
        rx="2"
        initial={animate ? { y: 5, opacity: 0 } : false}
        animate={animate ? { y: 0, opacity: 1 } : false}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
      
      {/* Trophy Stem */}
      <motion.rect
        x="30" y="40" width="4" height="12"
        fill="url(#gradientStem)"
        stroke="#92400E"
        strokeWidth="1"
        initial={animate ? { scaleY: 0 } : false}
        animate={animate ? { scaleY: 1 } : false}
        transition={{ duration: 0.4, delay: 0.6 }}
        style={{ originY: '46px' }}
      />
      
      {/* Trophy Cup */}
      <motion.path
        d="M18 24C18 20 21 16 26 16H38C43 16 46 20 46 24V32C46 38 41 42 36 42H28C23 42 18 38 18 32V24Z"
        fill="url(#gradientCup)"
        stroke="#B45309"
        strokeWidth="2"
        initial={animate ? { scale: 0 } : false}
        animate={animate ? { scale: 1 } : false}
        transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 120 }}
        style={{ originX: '32px', originY: '29px' }}
      />
      
      {/* Side Handles */}
      <motion.g
        initial={animate ? { scale: 0, opacity: 0 } : false}
        animate={animate ? { scale: 1, opacity: 1 } : false}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <path
          d="M18 26C14 26 12 28 12 30V32C12 34 14 36 18 36"
          stroke="#B45309"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M46 26C50 26 52 28 52 30V32C52 34 50 36 46 36"
          stroke="#B45309"
          strokeWidth="2"
          fill="none"
        />
      </motion.g>
      
      {/* Decorative Ribbons */}
      <motion.g
        initial={animate ? { x: -10, opacity: 0 } : false}
        animate={animate ? { x: 0, opacity: 1 } : false}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <path
          d="M22 20L28 12L30 16L26 20Z"
          fill="#DC2626"
          stroke="#B91C1C"
          strokeWidth="1"
        />
      </motion.g>
      
      <motion.g
        initial={animate ? { x: 10, opacity: 0 } : false}
        animate={animate ? { x: 0, opacity: 1 } : false}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <path
          d="M42 20L36 12L34 16L38 20Z"
          fill="#DC2626"
          stroke="#B91C1C"
          strokeWidth="1"
        />
      </motion.g>
      
      {/* Star on Trophy */}
      <motion.g
        initial={animate ? { scale: 0, rotate: -45 } : false}
        animate={animate ? { scale: 1, rotate: 0 } : false}
        transition={{ duration: 0.5, delay: 1, type: "spring" }}
        style={{ originX: '32px', originY: '29px' }}
      >
        <path
          d="M32 25L33.5 28.5L37 28.5L34.25 30.75L35.5 34L32 32L28.5 34L29.75 30.75L27 28.5L30.5 28.5L32 25Z"
          fill="#FCD34D"
          stroke="#F59E0B"
          strokeWidth="1"
        />
      </motion.g>
      
      {/* Sparkles */}
      <motion.g
        initial={animate ? { opacity: 0 } : false}
        animate={animate ? { opacity: [0, 1, 0] } : false}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatDelay: 0.5 
        }}
      >
        <circle cx="20" cy="18" r="1.5" fill="#FCD34D" />
        <circle cx="44" cy="15" r="1" fill="#FCD34D" />
        <circle cx="50" cy="22" r="1.5" fill="#FCD34D" />
        <circle cx="14" cy="30" r="1" fill="#FCD34D" />
        <circle cx="48" cy="38" r="1.5" fill="#FCD34D" />
      </motion.g>
      
      {/* Glow Effect */}
      <motion.circle
        cx="32" cy="29" r="25"
        fill="none"
        stroke="url(#glowGradient)"
        strokeWidth="2"
        opacity="0.3"
        initial={animate ? { scale: 0.8, opacity: 0 } : false}
        animate={animate ? { scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] } : false}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      
      {/* Definitions */}
      <defs>
        <linearGradient id="gradientBase" x1="24" y1="48" x2="40" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D97706" />
          <stop offset="1" stopColor="#92400E" />
        </linearGradient>
        <linearGradient id="gradientStem" x1="30" y1="40" x2="34" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="gradientCup" x1="18" y1="16" x2="46" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCD34D" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <radialGradient id="glowGradient" cx="32" cy="29" r="25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCD34D" />
          <stop offset="1" stopColor="#F59E0B" />
        </radialGradient>
      </defs>
    </motion.svg>
  )
}