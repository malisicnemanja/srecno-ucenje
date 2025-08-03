'use client'

import { motion } from 'framer-motion'
import { ReactElement } from 'react'

interface IllustrationProps {
  size?: number
  className?: string
  animate?: boolean
}

// Happy Students illustration
export const HappyStudents = ({ size = 200, className = '', animate = true }: IllustrationProps): ReactElement => (
  <motion.div
    className={`flex items-center justify-center ${className}`}
    style={{ width: size, height: size }}
    animate={animate ? { y: [0, -10, 0] } : {}}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="100" cy="100" r="90" fill="#FEF3C7" opacity="0.3" />
      
      {/* Student 1 - Left */}
      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
      >
        {/* Head */}
        <circle cx="70" cy="80" r="20" fill="#FBBF24" />
        {/* Hair */}
        <path d="M50 70 Q70 50 90 70" fill="#8B4513" />
        {/* Eyes */}
        <circle cx="65" cy="75" r="2" fill="#000" />
        <circle cx="75" cy="75" r="2" fill="#000" />
        {/* Smile */}
        <path d="M62 82 Q70 88 78 82" stroke="#000" strokeWidth="2" fill="none" />
        {/* Body */}
        <rect x="60" y="100" width="20" height="30" rx="10" fill="#3B82F6" />
        {/* Arms */}
        <circle cx="50" cy="110" r="5" fill="#FBBF24" />
        <circle cx="90" cy="110" r="5" fill="#FBBF24" />
        {/* Book */}
        <rect x="45" y="105" width="10" height="8" rx="1" fill="#EF4444" />
      </motion.g>

      {/* Student 2 - Right */}
      <motion.g
        animate={animate ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        {/* Head */}
        <circle cx="130" cy="85" r="18" fill="#F59E0B" />
        {/* Hair */}
        <path d="M112 75 Q130 55 148 75" fill="#4B5563" />
        {/* Eyes */}
        <circle cx="125" cy="80" r="2" fill="#000" />
        <circle cx="135" cy="80" r="2" fill="#000" />
        {/* Smile */}
        <path d="M122 87 Q130 93 138 87" stroke="#000" strokeWidth="2" fill="none" />
        {/* Body */}
        <rect x="120" y="103" width="20" height="30" rx="10" fill="#10B981" />
        {/* Arms */}
        <circle cx="110" cy="113" r="5" fill="#F59E0B" />
        <circle cx="150" cy="113" r="5" fill="#F59E0B" />
        {/* Pencil */}
        <rect x="145" y="108" width="2" height="12" fill="#FBBF24" />
        <rect x="144" y="108" width="4" height="3" fill="#EF4444" />
      </motion.g>

      {/* Reading materials */}
      <motion.g
        animate={animate ? { rotate: [0, 5, 0] } : {}}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <rect x="85" y="140" width="30" height="20" rx="2" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
        <line x1="90" y1="145" x2="110" y2="145" stroke="#F59E0B" strokeWidth="1" />
        <line x1="90" y1="150" x2="105" y2="150" stroke="#F59E0B" strokeWidth="1" />
        <line x1="90" y1="155" x2="110" y2="155" stroke="#F59E0B" strokeWidth="1" />
      </motion.g>

      {/* Floating hearts */}
      <motion.g
        animate={animate ? { y: [0, -5, 0], opacity: [0.5, 1, 0.5] } : {}}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        <path d="M40 40 C35 35, 25 35, 25 45 C25 35, 15 35, 10 40 C10 50, 25 65, 25 65 C25 65, 40 50, 40 40 Z" fill="#EF4444" opacity="0.7" />
        <path d="M170 50 C167 47, 163 47, 163 51 C163 47, 159 47, 156 50 C156 54, 163 61, 163 61 C163 61, 170 54, 170 50 Z" fill="#EF4444" opacity="0.7" />
      </motion.g>

      {/* Stars */}
      <motion.g
        animate={animate ? { rotate: 360 } : {}}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <path d="M160 30 L162 36 L168 36 L163 40 L165 46 L160 42 L155 46 L157 40 L152 36 L158 36 Z" fill="#FBBF24" />
        <path d="M30 120 L31 124 L35 124 L32 127 L33 131 L30 128 L27 131 L28 127 L25 124 L29 124 Z" fill="#FBBF24" />
      </motion.g>
    </svg>
  </motion.div>
)

// Reading Child illustration
export const ReadingChild = ({ size = 150, className = '', animate = true }: IllustrationProps): ReactElement => (
  <motion.div
    className={`flex items-center justify-center ${className}`}
    style={{ width: size, height: size }}
    animate={animate ? { scale: [1, 1.02, 1] } : {}}
    transition={{ duration: 3, repeat: Infinity }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <circle cx="75" cy="75" r="70" fill="#F0F9FF" opacity="0.5" />
      
      {/* Child sitting */}
      <motion.g
        animate={animate ? { y: [0, -2, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Head */}
        <circle cx="75" cy="50" r="18" fill="#FDE68A" />
        {/* Hair */}
        <path d="M57 40 Q75 25 93 40 Q75 35 57 40" fill="#92400E" />
        {/* Eyes */}
        <circle cx="70" cy="45" r="2" fill="#000" />
        <circle cx="80" cy="45" r="2" fill="#000" />
        {/* Nose */}
        <circle cx="75" cy="50" r="1" fill="#F59E0B" />
        {/* Smile */}
        <path d="M70 55 Q75 60 80 55" stroke="#000" strokeWidth="1.5" fill="none" />
        
        {/* Body */}
        <ellipse cx="75" cy="80" rx="15" ry="20" fill="#7C3AED" />
        
        {/* Arms holding book */}
        <ellipse cx="60" cy="75" rx="5" ry="12" fill="#FDE68A" />
        <ellipse cx="90" cy="75" rx="5" ry="12" fill="#FDE68A" />
        
        {/* Legs */}
        <ellipse cx="65" cy="110" rx="6" ry="15" fill="#1E40AF" />
        <ellipse cx="85" cy="110" rx="6" ry="15" fill="#1E40AF" />
      </motion.g>

      {/* Book */}
      <motion.g
        animate={animate ? { rotate: [0, 1, 0] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <rect x="55" y="70" width="40" height="25" rx="2" fill="#FECACA" stroke="#DC2626" strokeWidth="2" />
        <line x1="75" y1="72" x2="75" y2="93" stroke="#DC2626" strokeWidth="1" />
        <line x1="60" y1="77" x2="70" y2="77" stroke="#DC2626" strokeWidth="1" />
        <line x1="80" y1="77" x2="90" y2="77" stroke="#DC2626" strokeWidth="1" />
        <line x1="60" y1="82" x2="70" y2="82" stroke="#DC2626" strokeWidth="1" />
        <line x1="80" y1="82" x2="90" y2="82" stroke="#DC2626" strokeWidth="1" />
        <line x1="60" y1="87" x2="70" y2="87" stroke="#DC2626" strokeWidth="1" />
        <line x1="80" y1="87" x2="90" y2="87" stroke="#DC2626" strokeWidth="1" />
      </motion.g>

      {/* Floating letters */}
      <motion.g
        animate={animate ? { y: [0, -10, 0], opacity: [0.3, 1, 0.3] } : {}}
        transition={{ duration: 4, repeat: Infinity, staggerChildren: 0.5 }}
      >
        <text x="25" y="30" fill="#7C3AED" fontSize="14" fontWeight="bold">A</text>
        <text x="120" y="40" fill="#DC2626" fontSize="12" fontWeight="bold">B</text>
        <text x="30" y="120" fill="#059669" fontSize="13" fontWeight="bold">C</text>
        <text x="115" y="110" fill="#D97706" fontSize="11" fontWeight="bold">D</text>
      </motion.g>
    </svg>
  </motion.div>
)

// Brain Growth illustration
export const BrainGrowth = ({ size = 200, className = '', animate = true }: IllustrationProps): ReactElement => (
  <motion.div
    className={`flex items-center justify-center ${className}`}
    style={{ width: size, height: size }}
    animate={animate ? { scale: [1, 1.05, 1] } : {}}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background glow */}
      <circle cx="100" cy="100" r="80" fill="#EDE9FE" opacity="0.5" />
      
      {/* Brain shape */}
      <path
        d="M100 40 C70 40 50 60 50 90 C50 120 70 140 100 140 C130 140 150 120 150 90 C150 60 130 40 100 40"
        fill="#A78BFA"
      />
      
      {/* Brain wrinkles */}
      <path d="M80 60 Q90 70 80 80" stroke="#7C3AED" strokeWidth="2" fill="none" />
      <path d="M120 60 Q110 70 120 80" stroke="#7C3AED" strokeWidth="2" fill="none" />
      <path d="M90 90 Q100 100 110 90" stroke="#7C3AED" strokeWidth="2" fill="none" />
      
      {/* Growth sparkles */}
      <motion.g
        animate={animate ? { opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] } : {}}
        transition={{ duration: 2, repeat: Infinity, staggerChildren: 0.2 }}
      >
        <circle cx="60" cy="50" r="3" fill="#FDE047" />
        <circle cx="140" cy="50" r="3" fill="#FDE047" />
        <circle cx="100" cy="30" r="3" fill="#FDE047" />
        <circle cx="70" cy="130" r="3" fill="#FDE047" />
        <circle cx="130" cy="130" r="3" fill="#FDE047" />
      </motion.g>
      
      {/* Knowledge symbols */}
      <text x="100" y="100" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="bold">IQ</text>
    </svg>
  </motion.div>
)