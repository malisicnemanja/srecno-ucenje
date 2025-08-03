'use client'

import { motion } from 'framer-motion'

interface IllustrationProps {
  className?: string
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
  warmColor?: string
}

export const ReadingChild = ({ 
  className = '', 
  primaryColor = '#22c55e',
  secondaryColor = '#3498db',
  accentColor = '#f39c12'
}: IllustrationProps) => (
  <motion.svg 
    className={className}
    viewBox="0 0 400 300" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    {/* Background */}
    <motion.circle 
      cx="200" 
      cy="150" 
      r="120" 
      fill={`${primaryColor}20`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    />
    
    {/* Book */}
    <motion.path
      d="M120 180 L120 120 Q120 110 130 110 L190 110 Q200 110 200 120 L200 180 Q200 190 190 190 L130 190 Q120 190 120 180"
      fill={secondaryColor}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    />
    <motion.path
      d="M200 180 L200 120 Q200 110 210 110 L270 110 Q280 110 280 120 L280 180 Q280 190 270 190 L210 190 Q200 190 200 180"
      fill={secondaryColor}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    />
    
    {/* Child head */}
    <motion.circle 
      cx="200" 
      cy="80" 
      r="30" 
      fill="#fdbcb4"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    />
    
    {/* Eyes */}
    <motion.circle cx="190" cy="75" r="2" fill="#333" />
    <motion.circle cx="210" cy="75" r="2" fill="#333" />
    
    {/* Smile */}
    <motion.path
      d="M185 85 Q200 95 215 85"
      stroke="#333"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    
    {/* Stars around */}
    {[
      { x: 150, y: 50, size: 10 },
      { x: 250, y: 40, size: 12 },
      { x: 300, y: 100, size: 8 },
      { x: 100, y: 90, size: 10 },
    ].map((star, i) => (
      <motion.path
        key={i}
        d={`M${star.x} ${star.y} l${star.size/2} ${star.size} l${star.size} -${star.size/3} l-${star.size} -${star.size/3} z`}
        fill={accentColor}
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
      />
    ))}
  </motion.svg>
)

export const HappyStudents = ({ 
  className = '', 
  primaryColor = '#22c55e',
  secondaryColor = '#3498db',
  accentColor = '#f39c12',
  warmColor = '#e74c3c'
}: IllustrationProps) => (
  <motion.svg 
    className={className}
    viewBox="0 0 400 300" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background rainbow */}
    <motion.path
      d="M50 200 Q200 100 350 200"
      stroke={primaryColor}
      strokeWidth="20"
      fill="none"
      opacity="0.3"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1 }}
    />
    <motion.path
      d="M50 220 Q200 120 350 220"
      stroke={secondaryColor}
      strokeWidth="20"
      fill="none"
      opacity="0.3"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.1 }}
    />
    <motion.path
      d="M50 240 Q200 140 350 240"
      stroke={accentColor}
      strokeWidth="20"
      fill="none"
      opacity="0.3"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    />
    
    {/* Student 1 */}
    <motion.g
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <circle cx="120" cy="180" r="25" fill="#fdbcb4" />
      <circle cx="112" cy="175" r="2" fill="#333" />
      <circle cx="128" cy="175" r="2" fill="#333" />
      <path d="M110 185 Q120 192 130 185" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="100" y="205" width="40" height="50" rx="5" fill={primaryColor} />
    </motion.g>
    
    {/* Student 2 */}
    <motion.g
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <circle cx="200" cy="180" r="25" fill="#8b5a3c" />
      <circle cx="192" cy="175" r="2" fill="#333" />
      <circle cx="208" cy="175" r="2" fill="#333" />
      <path d="M190 185 Q200 192 210 185" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="180" y="205" width="40" height="50" rx="5" fill={secondaryColor} />
    </motion.g>
    
    {/* Student 3 */}
    <motion.g
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <circle cx="280" cy="180" r="25" fill="#fdbcb4" />
      <circle cx="272" cy="175" r="2" fill="#333" />
      <circle cx="288" cy="175" r="2" fill="#333" />
      <path d="M270 185 Q280 192 290 185" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="260" y="205" width="40" height="50" rx="5" fill={warmColor} />
    </motion.g>
    
    {/* Jumping animation for middle student */}
    <motion.g
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
    >
      <motion.circle
        cx="200"
        cy="155"
        r="5"
        fill={accentColor}
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
      />
    </motion.g>
  </motion.svg>
)

export const BrainGrowth = ({ 
  className = '', 
  primaryColor = '#22c55e',
  secondaryColor = '#3498db',
  accentColor = '#f39c12'
}: IllustrationProps) => (
  <motion.svg 
    className={className}
    viewBox="0 0 400 300" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Brain outline */}
    <motion.path
      d="M200 100 Q150 100 150 150 Q150 200 200 200 Q250 200 250 150 Q250 100 200 100"
      fill={`${primaryColor}30`}
      stroke={primaryColor}
      strokeWidth="3"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
    
    {/* Neural connections */}
    {[
      { x1: 180, y1: 130, x2: 220, y2: 130 },
      { x1: 170, y1: 150, x2: 230, y2: 150 },
      { x1: 180, y1: 170, x2: 220, y2: 170 },
    ].map((line, i) => (
      <motion.line
        key={i}
        x1={line.x1}
        y1={line.y1}
        x2={line.x2}
        y2={line.y2}
        stroke={secondaryColor}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
      />
    ))}
    
    {/* Sparkles */}
    {[
      { x: 160, y: 90, delay: 0 },
      { x: 240, y: 85, delay: 0.2 },
      { x: 260, y: 140, delay: 0.4 },
      { x: 140, y: 160, delay: 0.6 },
    ].map((sparkle, i) => (
      <motion.g key={i}>
        <motion.circle
          cx={sparkle.x}
          cy={sparkle.y}
          r="3"
          fill={accentColor}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 0] }}
          transition={{ 
            duration: 1.5, 
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
        <motion.path
          d={`M${sparkle.x - 8} ${sparkle.y} L${sparkle.x + 8} ${sparkle.y} M${sparkle.x} ${sparkle.y - 8} L${sparkle.x} ${sparkle.y + 8}`}
          stroke={accentColor}
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ 
            duration: 1.5, 
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
      </motion.g>
    ))}
  </motion.svg>
)

export const RocketLearning = ({ 
  className = '', 
  primaryColor = '#22c55e',
  secondaryColor = '#3498db',
  accentColor = '#f39c12',
  warmColor = '#e74c3c'
}: IllustrationProps) => (
  <motion.svg 
    className={className}
    viewBox="0 0 400 300" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Rocket body */}
    <motion.g
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <path
        d="M200 80 Q180 100 180 140 L180 180 Q180 200 200 200 Q220 200 220 180 L220 140 Q220 100 200 80"
        fill={primaryColor}
      />
      
      {/* Rocket tip */}
      <path
        d="M200 80 Q190 70 200 50 Q210 70 200 80"
        fill={warmColor}
      />
      
      {/* Window */}
      <circle cx="200" cy="120" r="15" fill={secondaryColor} />
      <circle cx="200" cy="120" r="10" fill="#fff" />
      
      {/* Wings */}
      <path d="M180 160 L160 180 L160 160 Z" fill={warmColor} />
      <path d="M220 160 L240 180 L240 160 Z" fill={warmColor} />
    </motion.g>
    
    {/* Fire */}
    <motion.g
      animate={{ 
        y: [0, 5, 0],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{ 
        duration: 0.5,
        repeat: Infinity
      }}
    >
      <path
        d="M190 200 Q200 220 210 200 Q200 240 190 200"
        fill={accentColor}
      />
      <path
        d="M195 200 Q200 215 205 200 Q200 225 195 200"
        fill={warmColor}
      />
    </motion.g>
    
    {/* Stars */}
    {[
      { x: 100, y: 50, size: 4 },
      { x: 300, y: 60, size: 5 },
      { x: 120, y: 120, size: 3 },
      { x: 280, y: 130, size: 4 },
      { x: 150, y: 200, size: 3 },
      { x: 250, y: 210, size: 4 },
    ].map((star, i) => (
      <motion.circle
        key={i}
        cx={star.x}
        cy={star.y}
        r={star.size}
        fill={accentColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ 
          duration: 2,
          delay: i * 0.3,
          repeat: Infinity
        }}
      />
    ))}
  </motion.svg>
)