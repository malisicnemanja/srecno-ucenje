'use client'

import { motion } from 'framer-motion'

interface RocketIconProps {
  size?: number
  className?: string
  animate?: boolean
}

export default function RocketIcon({ 
  size = 64, 
  className = '', 
  animate = true 
}: RocketIconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={animate ? { scale: 0.8, opacity: 0, y: 10 } : false}
      animate={animate ? { scale: 1, opacity: 1, y: 0 } : false}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Rocket Body */}
      <motion.path
        d="M28 48C28 50 30 52 32 52C34 52 36 50 36 48V20C36 16 34 12 32 12C30 12 28 16 28 20V48Z"
        fill="url(#gradientBody)"
        stroke="#1E40AF"
        strokeWidth="2"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : false}
        transition={{ duration: 1, delay: 0.3 }}
      />
      
      {/* Rocket Nose Cone */}
      <motion.path
        d="M32 4C30 4 28 8 28 12H36C36 8 34 4 32 4Z"
        fill="url(#gradientNose)"
        stroke="#1E40AF"
        strokeWidth="2"
        initial={animate ? { y: -5, opacity: 0 } : false}
        animate={animate ? { y: 0, opacity: 1 } : false}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
      
      {/* Side Fins */}
      <motion.g
        initial={animate ? { scale: 0 } : false}
        animate={animate ? { scale: 1 } : false}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <path
          d="M28 36L22 40L26 44L28 40Z"
          fill="url(#gradientFin)"
          stroke="#1E40AF"
          strokeWidth="1"
        />
        <path
          d="M36 36L42 40L38 44L36 40Z"
          fill="url(#gradientFin)"
          stroke="#1E40AF"
          strokeWidth="1"
        />
      </motion.g>
      
      {/* Window */}
      <motion.circle
        cx="32" cy="24" r="4"
        fill="url(#gradientWindow)"
        stroke="#1E40AF"
        strokeWidth="2"
        initial={animate ? { scale: 0 } : false}
        animate={animate ? { scale: 1 } : false}
        transition={{ duration: 0.4, delay: 0.9 }}
      />
      
      {/* Window Glare */}
      <motion.ellipse
        cx="30" cy="22" rx="1.5" ry="2"
        fill="#FFFFFF"
        opacity="0.7"
        initial={animate ? { opacity: 0 } : false}
        animate={animate ? { opacity: 0.7 } : false}
        transition={{ duration: 0.3, delay: 1.1 }}
      />
      
      {/* Fire/Exhaust */}
      <motion.g
        initial={animate ? { scale: 0, y: -10 } : false}
        animate={animate ? { 
          scale: [1, 1.2, 1],
          y: [0, 2, 0]
        } : false}
        transition={{ 
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1.2
        }}
        style={{ originX: '32px', originY: '52px' }}
      >
        <path
          d="M30 52L32 60L34 52L36 58L32 62L28 58L30 52Z"
          fill="url(#gradientFire1)"
        />
        <path
          d="M31 52L32 58L33 52L34 56L32 60L30 56L31 52Z"
          fill="url(#gradientFire2)"
        />
      </motion.g>
      
      {/* Smoke Particles */}
      <motion.g
        initial={animate ? { opacity: 0 } : false}
        animate={animate ? { 
          opacity: [0, 0.6, 0],
          y: [0, -8, -16]
        } : false}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 0.5,
          delay: 1.5
        }}
      >
        <circle cx="26" cy="56" r="1" fill="#D1D5DB" opacity="0.5" />
        <circle cx="38" cy="58" r="1.5" fill="#D1D5DB" opacity="0.3" />
        <circle cx="30" cy="60" r="1" fill="#D1D5DB" opacity="0.4" />
      </motion.g>
      
      {/* Speed Lines */}
      <motion.g
        initial={animate ? { opacity: 0, x: 5 } : false}
        animate={animate ? { 
          opacity: [0, 0.8, 0],
          x: [5, -5, -10]
        } : false}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 1,
          delay: 2
        }}
      >
        <path
          d="M20 20L16 22"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M20 28L14 30"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M22 36L18 38"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.g>
      
      {/* Stars */}
      <motion.g
        initial={animate ? { opacity: 0 } : false}
        animate={animate ? { opacity: [0, 1, 0] } : false}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatDelay: 0.5,
          staggerChildren: 0.3
        }}
      >
        <motion.path
          d="M48 16L49 18L51 18L49.5 19.5L50 22L48 21L46 22L46.5 19.5L45 18L47 18L48 16Z"
          fill="#FCD34D"
        />
        <motion.path
          d="M52 28L52.5 29L54 29L53 30L53.5 31L52 30.5L50.5 31L51 30L50 29L51.5 29L52 28Z"
          fill="#FCD34D"
        />
        <motion.path
          d="M46 40L46.5 41L48 41L47 42L47.5 43L46 42.5L44.5 43L45 42L44 41L45.5 41L46 40Z"
          fill="#FCD34D"
        />
      </motion.g>
      
      {/* Definitions */}
      <defs>
        <linearGradient id="gradientBody" x1="28" y1="12" x2="36" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DBEAFE" />
          <stop offset="0.5" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1E40AF" />
        </linearGradient>
        <linearGradient id="gradientNose" x1="28" y1="4" x2="36" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF3C7" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="gradientFin" x1="22" y1="36" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EBF4FF" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
        <radialGradient id="gradientWindow" cx="32" cy="24" r="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BFDBFE" />
          <stop offset="1" stopColor="#1E40AF" />
        </radialGradient>
        <linearGradient id="gradientFire1" x1="28" y1="52" x2="32" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FED7AA" />
          <stop offset="0.5" stopColor="#FB923C" />
          <stop offset="1" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="gradientFire2" x1="30" y1="52" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF3C7" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}