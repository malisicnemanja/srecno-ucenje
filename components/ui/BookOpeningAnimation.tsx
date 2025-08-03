'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface BookOpeningAnimationProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  autoplay?: boolean
  theme?: 'yellow' | 'blue' | 'green' | 'red'
}

export default function BookOpeningAnimation({ 
  className = '',
  size = 'md',
  autoplay = true,
  theme = 'yellow'
}: BookOpeningAnimationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sizes = {
    sm: { width: 80, height: 60 },
    md: { width: 120, height: 90 },
    lg: { width: 160, height: 120 }
  }

  const themeColors = {
    yellow: {
      cover: '#F59E0B',
      spine: '#D97706',
      pages: '#FEF3C7',
      accent: '#FDE68A'
    },
    blue: {
      cover: '#3B82F6',
      spine: '#1D4ED8',
      pages: '#DBEAFE',
      accent: '#93C5FD'
    },
    green: {
      cover: '#10B981',
      spine: '#047857',
      pages: '#D1FAE5',
      accent: '#6EE7B7'
    },
    red: {
      cover: '#EF4444',
      spine: '#DC2626',
      pages: '#FEE2E2',
      accent: '#FCA5A5'
    }
  }

  const currentTheme = themeColors[theme]
  const currentSize = sizes[size]

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        setIsOpen(prev => !prev)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [autoplay])

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.svg
        width={currentSize.width}
        height={currentSize.height}
        viewBox="0 0 120 90"
        className="drop-shadow-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Knjiga - zadnja korica */}
        <motion.rect
          x="10"
          y="20"
          width="50"
          height="50"
          rx="3"
          fill={currentTheme.cover}
          stroke={currentTheme.spine}
          strokeWidth="1"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isOpen ? -15 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ transformOrigin: "60px 45px" }}
        />

        {/* Stranice - leva strana */}
        <motion.g
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isOpen ? -25 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
          style={{ transformOrigin: "60px 45px" }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.rect
              key={`left-page-${i}`}
              x={12 + i * 0.5}
              y={22 + i * 0.5}
              width="46"
              height="46"
              rx="2"
              fill={currentTheme.pages}
              stroke={currentTheme.accent}
              strokeWidth="0.5"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: isOpen ? 1 : 0.7 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            />
          ))}
        </motion.g>

        {/* Stranice - desna strana */}
        <motion.g
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isOpen ? 25 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          style={{ transformOrigin: "60px 45px" }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.rect
              key={`right-page-${i}`}
              x={60 - i * 0.5}
              y={22 + i * 0.5}
              width="46"
              height="46"
              rx="2"
              fill={currentTheme.pages}
              stroke={currentTheme.accent}
              strokeWidth="0.5"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: isOpen ? 1 : 0.7 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            />
          ))}
        </motion.g>

        {/* Knjiga - prednja korica */}
        <motion.rect
          x="60"
          y="20"
          width="50"
          height="50"
          rx="3"
          fill={currentTheme.cover}
          stroke={currentTheme.spine}
          strokeWidth="1"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isOpen ? 15 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ transformOrigin: "60px 45px" }}
        />

        {/* Kičma knjige */}
        <motion.rect
          x="58"
          y="20"
          width="4"
          height="50"
          fill={currentTheme.spine}
          initial={{ scaleX: 1 }}
          animate={{ scaleX: isOpen ? 0.3 : 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Naslov na prednjoj korici */}
        <motion.text
          x="85"
          y="40"
          fontSize="6"
          fill="white"
          textAnchor="middle"
          fontWeight="bold"
          initial={{ opacity: 1 }}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          ABC
        </motion.text>

        {/* Magični sjaj kada se otvara */}
        {isOpen && (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.circle
                key={`sparkle-${i}`}
                cx={40 + Math.random() * 40}
                cy={30 + Math.random() * 30}
                r="1"
                fill="#FDE047"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -10, -20]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            ))}
          </motion.g>
        )}

        {/* Senka */}
        <motion.ellipse
          cx="60"
          cy="75"
          rx="25"
          ry="3"
          fill="rgba(0,0,0,0.1)"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: isOpen ? 1.3 : 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  )
}