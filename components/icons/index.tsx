'use client'

import { motion } from 'framer-motion'

interface IconProps {
  size?: number
  className?: string
  animate?: boolean
}

// Export all common icons from SVGIcons and create additional ones
export {
  BookSVG as BookIcon,
  BrainSVG as BrainIcon,
  HeartSVG as HeartIcon,
  RocketSVG as RocketIcon,
  StarSVG as StarIcon,
  CheckSVG as CheckIcon,
  UserSVG as UserIcon,
  UsersSVG as UsersIcon,
  MailSVG as MailIcon,
  PhoneSVG as PhoneIcon,
  CalendarSVG as CalendarIcon,
  LocationSVG as LocationIcon,
  AwardSVG as AwardIcon,
  LightbulbSVG as LightbulbIcon,
  SparklesSVG as SparklesIcon,
  ClockSVG as ClockIcon,
  MenuSVG as MenuIcon,
  CloseSVG as CloseIcon,
  PaletteSVG as PaletteIcon,
  MapPinSVG as MapPinIcon,
  GlobeSVG as GlobeIcon,
} from '@/components/ui/SVGIcons'

// Export ProgramIcon
export { default as ProgramIcon } from './ProgramIcon'

// Additional common icons
export const ChevronDownIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    animate={animate ? { rotate: 180 } : {}}
    transition={{ duration: 0.3 }}
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
)

export const SmileIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.1 } : {}}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </motion.svg>
)

export const SearchIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.1 } : {}}
  >
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </motion.svg>
)

export const TrendingUpIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.05 } : {}}
  >
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" stroke="currentColor" strokeWidth="2" fill="none" />
    <polyline points="17,6 23,6 23,12" stroke="currentColor" strokeWidth="2" />
  </motion.svg>
)

export const TargetIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
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
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" />
  </motion.svg>
)

export const PencilIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.1 } : {}}
  >
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </motion.svg>
)

export const ABCIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.1 } : {}}
  >
    <text x="12" y="16" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor">ABC</text>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
  </motion.svg>
)

export const BirthIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.05 } : {}}
  >
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
    <path d="M12 1v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </motion.svg>
)

export const TeachingIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.05 } : {}}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 12v5a4 4 0 004 4 4 4 0 004-4v-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </motion.svg>
)

export const VillageIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.05 } : {}}
  >
    <path d="M3 21h18M5 21V7l8-4v18M19 21V10l-6-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </motion.svg>
)

export const GovernmentIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.05 } : {}}
  >
    <path d="M3 21h18M4 18h16M6 18v-4M18 18v-4M6 10h12M12 3l8 5H4l8-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 14v4M12 14v4M16 14v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </motion.svg>
)

export const BooksIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.05 } : {}}
  >
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 7h4M2 11h4M2 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </motion.svg>
)

export const TravelIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.05 } : {}}
  >
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="3.27,6.96 12,12.01 20.73,6.96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </motion.svg>
)

export const MedalIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
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
    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
  </motion.svg>
)

export const PartnershipIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.05 } : {}}
  >
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12h6l2 2-2 2H9l-2-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </motion.svg>
)

export const FestivalIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    animate={animate ? { y: [0, -2, 0] } : {}}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2" />
    <path d="M8 21l4-7 4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </motion.svg>
)

export const TrophyIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    animate={animate ? { y: [0, -3, 0] } : {}}
    transition={{ duration: 3, repeat: Infinity }}
  >
    <path d="M6 9H4.5a2.5 2.5 0 010-5H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 9h1.5a2.5 2.5 0 000-5H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 22h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 14.66V17a2 2 0 002 2h0a2 2 0 002-2v-2.34l1.83-1.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 2H6v7a6 6 0 006 6 6 6 0 006-6V2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </motion.svg>
)

export const PlaneIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.1 } : {}}
  >
    <path d="M17.8 19.2L16 11l3.5-3.5c.8-.8.8-2 0-2.8-.8-.8-2-.8-2.8 0L13 8.2l-8.2-1.8c-.5-.1-1 .1-1.4.5L2 8.3l5.7 1.9L2.4 16c-.4.4-.6.9-.5 1.4l1.4 1.4c.5.1 1-.1 1.4-.5l5.8-5.3 1.9 5.7 1.4-1.4c.4-.4.6-.9.5-1.4z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
  </motion.svg>
)

export const DifficultyEasyIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.1 } : {}}
  >
    <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" fill="#10B981" fillOpacity="0.2" />
    <path d="M8 12l2 2 4-4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </motion.svg>
)

export const DifficultyMediumIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.1 } : {}}
  >
    <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2" fill="#F59E0B" fillOpacity="0.2" />
    <path d="M12 8v4M12 16h.01" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </motion.svg>
)

export const DifficultyHardIcon = ({ size = 24, className = '', animate = true }: IconProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.1 } : {}}
  >
    <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2" fill="#EF4444" fillOpacity="0.2" />
    <path d="M15 9l-6 6M9 9l6 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </motion.svg>
)