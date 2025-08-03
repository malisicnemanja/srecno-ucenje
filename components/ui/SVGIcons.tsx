'use client'

import { motion } from 'framer-motion'

interface IconProps {
  size?: number
  className?: string
  animate?: boolean
}

// Book Icon - za učenje i čitanje
export const BookSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.1 } : {}}
  >
    <motion.path
      d="M4 19.5A2.5 2.5 0 016.5 17H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
    <motion.path
      d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
    />
  </motion.svg>
)

// Brain Icon - za mentalnu aritmetiku
export const BrainSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.1 } : {}}
  >
    <motion.path
      d="M9.5 2a4.5 4.5 0 00-4.5 4.5c0 .885.255 1.71.695 2.404A5.002 5.002 0 007 18a5 5 0 005 5 5 5 0 005-5 5.002 5.002 0 001.305-9.096c.44-.694.695-1.519.695-2.404A4.5 4.5 0 0014.5 2a4.48 4.48 0 00-2.5.752A4.48 4.48 0 009.5 2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={animate ? { 
        strokeDasharray: ["0 150", "150 0"],
        rotate: [0, 5, -5, 0]
      } : {}}
      transition={{ 
        strokeDasharray: { duration: 2, repeat: Infinity },
        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }}
    />
  </motion.svg>
)

// Heart Icon - za emocionalno učenje
export const HeartSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    animate={animate ? { scale: [1, 1.1, 1] } : {}}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <path
      d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.2"
    />
  </motion.svg>
)

// Rocket Icon - za napredak i uspeh
export const RocketSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    animate={animate ? { y: [0, -5, 0] } : {}}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <path
      d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <motion.circle
      cx="11"
      cy="13"
      r="2"
      fill="currentColor"
      animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
  </motion.svg>
)

// Star Icon - za dostignuća
export const StarSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    animate={animate ? { rotate: 360 } : {}}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.2"
    />
  </motion.svg>
)

// Check Icon - za uspeh
export const CheckSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <motion.path
      d="M20 6L9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  </motion.svg>
)

// User Icon - za profile
export const UserSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.1 } : {}}
  >
    <path
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="7"
      r="4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
)

// Users Icon - za grupu
export const UsersSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.05 } : {}}
  >
    <path
      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
    <path
      d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
)

// Mail Icon - za kontakt
export const MailSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.1 } : {}}
  >
    <path
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <motion.path
      d="M22 6l-10 7L2 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={animate ? { y: [0, 2, 0] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.svg>
)

// Phone Icon - za kontakt
export const PhoneSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    animate={animate ? { rotate: [0, 10, -10, 0] } : {}}
    transition={{ duration: 3, repeat: Infinity }}
  >
    <path
      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
)

// Calendar Icon - za zakazivanje
export const CalendarSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.05 } : {}}
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      ry="2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
    <motion.circle
      cx="12"
      cy="16"
      r="2"
      fill="currentColor"
      animate={animate ? { scale: [1, 1.3, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.svg>
)

// Location Icon - za lokacije
export const LocationSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    animate={animate ? { y: [0, -3, 0] } : {}}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <path
      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="10"
      r="3"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.2"
    />
  </motion.svg>
)

// Award Icon - za dostignuća
export const AwardSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    animate={animate ? { rotate: [0, 5, -5, 0] } : {}}
    transition={{ duration: 4, repeat: Infinity }}
  >
    <circle cx="12" cy="8" r="7" stroke="currentColor" strokeWidth="2" />
    <path
      d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
)

// Lightbulb Icon - za ideje
export const LightbulbSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    animate={animate ? { opacity: [0.5, 1, 0.5] } : {}}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <path
      d="M9 18h6M10 22h4M15 2a6 6 0 00-6 6c0 2.5 1.5 4.5 3 5.5V16a1 1 0 001 1h2a1 1 0 001-1v-2.5c1.5-1 3-3 3-5.5a6 6 0 00-6-6z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
)

// Sparkles Icon - za magiju učenja
export const SparklesSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <motion.path
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={animate ? { opacity: [0, 1, 0] } : {}}
      transition={{ duration: 2, repeat: Infinity, staggerChildren: 0.1 }}
    />
    <motion.circle
      cx="12"
      cy="12"
      r="4"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.2"
      animate={animate ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.svg>
)

// Clock Icon - za vreme
export const ClockSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <motion.path
      d="M12 6v6l4 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={animate ? { rotate: 360 } : {}}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: "12px 12px" }}
    />
  </motion.svg>
)

// Menu Icon - za navigaciju
export const MenuSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <motion.line
      x1="3"
      y1="6"
      x2="21"
      y2="6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ x2: 3 }}
      animate={{ x2: 21 }}
      transition={{ duration: 0.3 }}
    />
    <motion.line
      x1="3"
      y1="12"
      x2="21"
      y2="12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ x2: 3 }}
      animate={{ x2: 21 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    />
    <motion.line
      x1="3"
      y1="18"
      x2="21"
      y2="18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ x2: 3 }}
      animate={{ x2: 21 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    />
  </motion.svg>
)

// Close Icon - za zatvaranje
export const CloseSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { rotate: 90 } : {}}
  >
    <line
      x1="18"
      y1="6"
      x2="6"
      y2="18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="6"
      y1="6"
      x2="18"
      y2="18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </motion.svg>
)

// Palette Icon - za kreativnost i umetnot
export const PaletteSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    animate={animate ? { rotate: [0, 10, -10, 0] } : {}}
    transition={{ duration: 4, repeat: Infinity }}
  >
    <path
      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.4-.3-.4-.5-.9-.5-1.4 0-1.1.9-2 2-2h2.4c3.3 0 5.6-2.7 5.6-6C22 6.9 17.8 2 12 2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <motion.circle 
      cx="6.5" 
      cy="10.5" 
      r="1.5" 
      fill="currentColor"
      animate={animate ? { scale: [1, 1.3, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
    />
    <motion.circle 
      cx="8.5" 
      cy="7.5" 
      r="1.5" 
      fill="currentColor"
      animate={animate ? { scale: [1, 1.3, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
    />
    <motion.circle 
      cx="12.5" 
      cy="6.5" 
      r="1.5" 
      fill="currentColor"
      animate={animate ? { scale: [1, 1.3, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
    />
    <motion.circle 
      cx="16.5" 
      cy="10.5" 
      r="1.5" 
      fill="currentColor"
      animate={animate ? { scale: [1, 1.3, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
    />
  </motion.svg>
)

// MapPin Icon - za lokacije
export const MapPinSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    animate={animate ? { y: [0, -3, 0] } : {}}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <path
      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="10"
      r="3"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.2"
    />
  </motion.svg>
)

// Globe Icon - za internacionalno
export const GlobeSVG = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    animate={animate ? { rotate: 360 } : {}}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path
      d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </motion.svg>
)