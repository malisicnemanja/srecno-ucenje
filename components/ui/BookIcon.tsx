'use client'

import { motion } from 'framer-motion'

interface BookIconProps {
  size?: number
  className?: string
  animate?: boolean
}

export default function BookIcon({ 
  size = 64, 
  className = '', 
  animate = true 
}: BookIconProps) {
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
      {/* Book Cover */}
      <motion.path
        d="M16 12C16 10 17 8 19 8H45C47 8 48 10 48 12V52C48 54 47 56 45 56H19C17 56 16 54 16 52V12Z"
        fill="url(#gradientCover)"
        stroke="#7C2D12"
        strokeWidth="2"
        initial={animate ? { pathLength: 0, fill: "transparent" } : false}
        animate={animate ? { pathLength: 1, fill: "url(#gradientCover)" } : false}
        transition={{ duration: 1, delay: 0.2 }}
      />
      
      {/* Book Spine */}
      <motion.path
        d="M16 12V52C16 54 14 56 12 56V8C14 8 16 10 16 12Z"
        fill="url(#gradientSpine)"
        stroke="#92400E"
        strokeWidth="2"
        initial={animate ? { x: -5, opacity: 0 } : false}
        animate={animate ? { x: 0, opacity: 1 } : false}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      
      {/* Book Pages */}
      <motion.g
        initial={animate ? { opacity: 0 } : false}
        animate={animate ? { opacity: 1 } : false}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <rect x="20" y="16" width="24" height="1" fill="#F3F4F6" rx="0.5" />
        <rect x="20" y="20" width="20" height="1" fill="#F3F4F6" rx="0.5" />
        <rect x="20" y="24" width="24" height="1" fill="#F3F4F6" rx="0.5" />
        <rect x="20" y="28" width="18" height="1" fill="#F3F4F6" rx="0.5" />
        <rect x="20" y="32" width="22" height="1" fill="#F3F4F6" rx="0.5" />
        <rect x="20" y="36" width="24" height="1" fill="#F3F4F6" rx="0.5" />
        <rect x="20" y="40" width="19" height="1" fill="#F3F4F6" rx="0.5" />
        <rect x="20" y="44" width="23" height="1" fill="#F3F4F6" rx="0.5" />
      </motion.g>
      
      {/* Book Title Area */}
      <motion.rect
        x="20" y="14" width="24" height="8"
        fill="url(#gradientTitle)"
        stroke="#B45309"
        strokeWidth="1"
        rx="2"
        initial={animate ? { scale: 0 } : false}
        animate={animate ? { scale: 1 } : false}
        transition={{ duration: 0.4, delay: 0.8 }}
        style={{ originX: '32px', originY: '18px' }}
      />
      
      {/* Bookmark */}
      <motion.path
        d="M40 8V26L44 22L48 26V8"
        fill="#DC2626"
        stroke="#B91C1C"
        strokeWidth="1"
        initial={animate ? { y: -10, opacity: 0 } : false}
        animate={animate ? { y: 0, opacity: 1 } : false}
        transition={{ duration: 0.5, delay: 1 }}
      />
      
      {/* Animated Pages Turning */}
      <motion.g
        initial={animate ? { opacity: 0 } : false}
        animate={animate ? { opacity: [0, 0.7, 0] } : false}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          repeatDelay: 2 
        }}
      >
        <path
          d="M48 12C48 12 52 16 52 32C52 48 48 52 48 52"
          stroke="#E5E7EB"
          strokeWidth="2"
          fill="none"
          strokeDasharray="2,2"
        />
      </motion.g>
      
      {/* Knowledge Sparkles */}
      <motion.g
        initial={animate ? { opacity: 0 } : false}
        animate={animate ? { opacity: [0, 1, 0] } : false}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatDelay: 1,
          staggerChildren: 0.2 
        }}
      >
        <motion.circle cx="54" cy="20" r="1.5" fill="#3B82F6" />
        <motion.circle cx="58" cy="32" r="1" fill="#8B5CF6" />
        <motion.circle cx="55" cy="44" r="1.5" fill="#06B6D4" />
        <motion.circle cx="50" cy="50" r="1" fill="#10B981" />
      </motion.g>
      
      {/* Light Ray from Book */}
      <motion.g
        initial={animate ? { opacity: 0, scale: 0 } : false}
        animate={animate ? { opacity: [0, 0.6, 0], scale: [0.8, 1.2, 0.8] } : false}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          repeatDelay: 1 
        }}
        style={{ originX: '32px', originY: '32px' }}
      >
        <path
          d="M32 32L28 28L36 28L32 32L36 36L28 36L32 32Z"
          fill="url(#lightGradient)"
          opacity="0.3"
        />
      </motion.g>
      
      {/* Definitions */}
      <defs>
        <linearGradient id="gradientCover" x1="16" y1="8" x2="48" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF3C7" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="gradientSpine" x1="12" y1="8" x2="16" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DC2626" />
          <stop offset="1" stopColor="#92400E" />
        </linearGradient>
        <linearGradient id="gradientTitle" x1="20" y1="14" x2="44" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF3C7" />
          <stop offset="1" stopColor="#FCD34D" />
        </linearGradient>
        <radialGradient id="lightGradient" cx="32" cy="32" r="8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCD34D" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
      </defs>
    </motion.svg>
  )
}