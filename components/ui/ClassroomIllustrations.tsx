'use client'

import { motion } from 'framer-motion'

interface IllustrationProps {
  className?: string
  primaryColor?: string
  secondaryColor?: string
}

// Book shelf illustration
export const BookShelfIllustration = ({ 
  className = '', 
  primaryColor = '#10B981',
  secondaryColor = '#F59E0B' 
}: IllustrationProps) => (
  <motion.svg
    className={className}
    viewBox="0 0 400 300"
    fill="none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {/* Shelf */}
    <rect x="50" y="200" width="300" height="10" fill="#8B7355" />
    <rect x="50" y="140" width="300" height="8" fill="#8B7355" />
    <rect x="50" y="80" width="300" height="8" fill="#8B7355" />
    
    {/* Books - Bottom shelf */}
    <motion.rect
      x="60" y="150" width="25" height="50" fill={primaryColor}
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <rect x="88" y="155" width="20" height="45" fill="#3B82F6" />
    <rect x="111" y="152" width="22" height="48" fill="#EF4444" />
    <motion.rect
      x="136" y="148" width="18" height="52" fill={secondaryColor}
      animate={{ y: [148, 145, 148] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <rect x="157" y="150" width="25" height="50" fill="#8B5CF6" />
    
    {/* Books - Middle shelf */}
    <rect x="70" y="90" width="20" height="50" fill="#10B981" />
    <motion.rect
      x="93" y="88" width="25" height="52" fill="#F59E0B"
      animate={{ rotate: [0, -3, 0] }}
      transition={{ duration: 5, repeat: Infinity }}
    />
    <rect x="121" y="92" width="18" height="48" fill="#EC4899" />
    <rect x="142" y="88" width="22" height="52" fill="#14B8A6" />
    
    {/* Floating book */}
    <motion.g
      animate={{ 
        y: [0, -10, 0],
        rotate: [0, 5, 0]
      }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <rect x="250" y="110" width="30" height="40" fill={primaryColor} rx="2" />
      <rect x="255" y="115" width="20" height="2" fill="white" opacity="0.5" />
      <rect x="255" y="120" width="15" height="1" fill="white" opacity="0.3" />
    </motion.g>
    
    {/* Sparkles */}
    {[...Array(3)].map((_, i) => (
      <motion.circle
        key={i}
        cx={200 + i * 40}
        cy={50 + i * 20}
        r="2"
        fill={secondaryColor}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0]
        }}
        transition={{
          duration: 2,
          delay: i * 0.5,
          repeat: Infinity
        }}
      />
    ))}
  </motion.svg>
)

// Smart board illustration
export const SmartBoardIllustration = ({ 
  className = '', 
  primaryColor = '#3B82F6',
  secondaryColor = '#10B981' 
}: IllustrationProps) => (
  <motion.svg
    className={className}
    viewBox="0 0 400 300"
    fill="none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {/* Board frame */}
    <rect x="50" y="50" width="300" height="180" fill="#1F2937" rx="8" />
    <rect x="60" y="60" width="280" height="160" fill="#111827" rx="4" />
    
    {/* Screen */}
    <rect x="70" y="70" width="260" height="140" fill="#1E293B" />
    
    {/* Interactive elements */}
    <motion.rect
      x="90" y="90" width="80" height="60"
      fill={primaryColor}
      opacity="0.8"
      animate={{ 
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{ duration: 2, repeat: Infinity }}
      rx="4"
    />
    
    <motion.circle
      cx="250" cy="120" r="30"
      fill={secondaryColor}
      opacity="0.7"
      animate={{ 
        scale: [1, 1.1, 1],
        rotate: [0, 360]
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    
    {/* Touch points */}
    {[...Array(5)].map((_, i) => (
      <motion.circle
        key={i}
        cx={100 + i * 50}
        cy={150 + Math.sin(i) * 20}
        r="5"
        fill="white"
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0]
        }}
        transition={{
          duration: 2,
          delay: i * 0.3,
          repeat: Infinity
        }}
      />
    ))}
    
    {/* Stand */}
    <rect x="190" y="230" width="20" height="50" fill="#374151" />
    <rect x="170" y="270" width="60" height="10" fill="#374151" rx="2" />
  </motion.svg>
)

// Creative corner illustration
export const CreativeCornerIllustration = ({ 
  className = '', 
  primaryColor = '#F59E0B',
  secondaryColor = '#EC4899' 
}: IllustrationProps) => (
  <motion.svg
    className={className}
    viewBox="0 0 400 300"
    fill="none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {/* Easel */}
    <line x1="150" y1="250" x2="200" y2="100" stroke="#8B7355" strokeWidth="6" />
    <line x1="250" y1="250" x2="200" y2="100" stroke="#8B7355" strokeWidth="6" />
    <line x1="130" y1="180" x2="270" y2="180" stroke="#8B7355" strokeWidth="4" />
    
    {/* Canvas */}
    <rect x="160" y="80" width="80" height="100" fill="white" stroke="#D1D5DB" strokeWidth="2" />
    
    {/* Paint strokes */}
    <motion.path
      d="M 180 100 Q 200 120 220 100"
      stroke={primaryColor}
      strokeWidth="8"
      fill="none"
      strokeLinecap="round"
      animate={{ 
        pathLength: [0, 1],
        opacity: [0, 1]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        repeatDelay: 1
      }}
    />
    
    <motion.circle
      cx="200" cy="140"
      r="15"
      fill={secondaryColor}
      animate={{ 
        scale: [0, 1, 0.8],
        opacity: [0, 1, 0.8]
      }}
      transition={{ 
        duration: 2,
        delay: 0.5,
        repeat: Infinity,
        repeatDelay: 1
      }}
    />
    
    {/* Paint palette */}
    <motion.g
      animate={{ 
        rotate: [0, 10, -10, 0],
        y: [0, -5, 0]
      }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <ellipse cx="100" cy="200" rx="40" ry="30" fill="#D97706" />
      <circle cx="85" cy="190" r="8" fill="#EF4444" />
      <circle cx="105" cy="185" r="8" fill="#3B82F6" />
      <circle cx="95" cy="205" r="8" fill="#10B981" />
      <circle cx="115" cy="200" r="8" fill="#8B5CF6" />
    </motion.g>
    
    {/* Brushes */}
    <motion.g
      animate={{ rotate: [-5, 5, -5] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <rect x="280" y="150" width="5" height="60" fill="#8B7355" />
      <rect x="278" y="140" width="9" height="15" fill={primaryColor} rx="2" />
    </motion.g>
    
    <motion.g
      animate={{ rotate: [5, -5, 5] }}
      transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
    >
      <rect x="295" y="155" width="5" height="60" fill="#8B7355" />
      <rect x="293" y="145" width="9" height="15" fill={secondaryColor} rx="2" />
    </motion.g>
  </motion.svg>
)

// Small groups illustration
export const SmallGroupsIllustration = ({ 
  className = '', 
  primaryColor = '#10B981',
  secondaryColor = '#3B82F6' 
}: IllustrationProps) => (
  <motion.svg
    className={className}
    viewBox="0 0 400 300"
    fill="none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {/* Table */}
    <ellipse cx="200" cy="200" rx="100" ry="50" fill="#D97706" opacity="0.3" />
    
    {/* Kids around table */}
    {[...Array(6)].map((_, i) => {
      const angle = (i * 60) * Math.PI / 180
      const x = 200 + Math.cos(angle) * 80
      const y = 200 + Math.sin(angle) * 40
      
      return (
        <motion.g
          key={i}
          animate={{ 
            y: [0, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 2,
            delay: i * 0.2,
            repeat: Infinity
          }}
        >
          {/* Head */}
          <circle 
            cx={x} 
            cy={y - 20} 
            r="15" 
            fill={i % 2 === 0 ? primaryColor : secondaryColor}
          />
          {/* Body */}
          <rect 
            x={x - 10} 
            y={y - 10} 
            width="20" 
            height="25" 
            fill={i % 2 === 0 ? primaryColor : secondaryColor}
            opacity="0.8"
            rx="5"
          />
          {/* Eyes */}
          <circle cx={x - 5} cy={y - 23} r="2" fill="white" />
          <circle cx={x + 5} cy={y - 23} r="2" fill="white" />
          {/* Smile */}
          <path 
            d={`M ${x - 5} ${y - 17} Q ${x} ${y - 14} ${x + 5} ${y - 17}`}
            stroke="white" 
            strokeWidth="2" 
            fill="none"
            strokeLinecap="round"
          />
        </motion.g>
      )
    })}
    
    {/* Center activity */}
    <motion.circle
      cx="200" cy="200"
      r="30"
      fill="#FBBF24"
      opacity="0.5"
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5]
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    
    {/* Papers/activities on table */}
    <motion.rect
      x="185" y="190"
      width="30" height="20"
      fill="white"
      stroke="#E5E7EB"
      animate={{ rotate: [-5, 5, -5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.svg>
)

// Warm atmosphere illustration
export const WarmAtmosphereIllustration = ({ 
  className = '', 
  primaryColor = '#EF4444',
  secondaryColor = '#F59E0B' 
}: IllustrationProps) => (
  <motion.svg
    className={className}
    viewBox="0 0 400 300"
    fill="none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {/* House outline */}
    <path
      d="M 200 80 L 120 150 L 120 250 L 280 250 L 280 150 Z"
      fill="#FEF3C7"
      stroke="#F59E0B"
      strokeWidth="3"
    />
    
    {/* Roof */}
    <path
      d="M 200 80 L 120 150 L 280 150 Z"
      fill={primaryColor}
    />
    
    {/* Door */}
    <rect x="180" y="190" width="40" height="60" fill="#92400E" rx="2" />
    <circle cx="210" cy="220" r="3" fill="#F59E0B" />
    
    {/* Windows */}
    <motion.rect
      x="140" y="170" width="30" height="30"
      fill="#FDE68A"
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.rect
      x="230" y="170" width="30" height="30"
      fill="#FDE68A"
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
    />
    
    {/* Heart on roof */}
    <motion.path
      d="M 200 100 C 195 95, 185 95, 185 105 C 185 95, 175 95, 170 100 C 170 110, 190 125, 200 130 C 210 125, 230 110, 230 100 C 225 95, 215 95, 215 105 C 215 95, 205 95, 200 100 Z"
      fill="white"
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Smoke from chimney */}
    <motion.circle
      cx="250" cy="120"
      r="8"
      fill="white"
      opacity="0.6"
      animate={{ 
        y: [0, -20, -40],
        opacity: [0.6, 0.4, 0],
        scale: [1, 1.5, 2]
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    
    {/* Garden */}
    <motion.circle
      cx="100" cy="250"
      r="20"
      fill={secondaryColor}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.circle
      cx="300" cy="250"
      r="20"
      fill="#10B981"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
    />
  </motion.svg>
)

// Modern tech illustration
export const ModernTechIllustration = ({ 
  className = '', 
  primaryColor = '#8B5CF6',
  secondaryColor = '#3B82F6' 
}: IllustrationProps) => (
  <motion.svg
    className={className}
    viewBox="0 0 400 300"
    fill="none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {/* Tablet */}
    <rect x="150" y="100" width="100" height="140" fill="#1F2937" rx="8" />
    <rect x="160" y="110" width="80" height="110" fill="#111827" />
    
    {/* Screen content */}
    <motion.rect
      x="170" y="120" width="60" height="40"
      fill={primaryColor}
      opacity="0.8"
      animate={{ 
        scaleX: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    <motion.circle
      cx="200" cy="185"
      r="20"
      fill={secondaryColor}
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360]
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    
    {/* Floating UI elements */}
    {[...Array(4)].map((_, i) => (
      <motion.rect
        key={i}
        x={100 + i * 50}
        y={50 + i * 10}
        width="30"
        height="30"
        fill={i % 2 === 0 ? primaryColor : secondaryColor}
        opacity="0.3"
        rx="4"
        animate={{ 
          y: [50 + i * 10, 40 + i * 10, 50 + i * 10],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 4,
          delay: i * 0.5,
          repeat: Infinity
        }}
      />
    ))}
    
    {/* WiFi signal */}
    <motion.g
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <path
        d="M 200 250 C 180 240, 180 240, 200 230 C 220 240, 220 240, 200 250"
        stroke={primaryColor}
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M 200 240 C 185 235, 185 235, 200 230 C 215 235, 215 235, 200 240"
        stroke={primaryColor}
        strokeWidth="3"
        fill="none"
      />
      <circle cx="200" cy="245" r="3" fill={primaryColor} />
    </motion.g>
    
    {/* Sparkles */}
    {[...Array(5)].map((_, i) => (
      <motion.path
        key={i}
        d={`M ${250 + i * 20} ${100 + i * 30} l 5 0 l -5 5 l -5 -5 l 5 0 l 0 -5 l 0 5`}
        fill={secondaryColor}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
          rotate: [0, 180]
        }}
        transition={{
          duration: 2,
          delay: i * 0.3,
          repeat: Infinity
        }}
      />
    ))}
  </motion.svg>
)