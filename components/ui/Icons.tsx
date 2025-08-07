'use client';

import { motion } from 'framer-motion';
import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  animate?: boolean;
}

const IconWrapper = ({ 
  children, 
  animate = true, 
  size = 24, 
  className = '',
  ...props 
}: IconProps & { children: React.ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`icon ${className}`}
    {...props}
  >
    {children}
  </svg>
);

// OBRAZOVANJE IKONE
export const BookIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      animate={props.animate ? {
        y: [0, -2, 0],
        rotate: [0, 1, 0, -1, 0]
      } : {}}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <motion.path 
        d="M8 6h8M8 10h6M8 14h4"
        initial={{ pathLength: 0 }}
        animate={props.animate ? { pathLength: 1 } : {}}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </motion.g>
  </IconWrapper>
);

export const PencilIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      animate={props.animate ? {
        x: [0, 1, -1, 0],
        rotate: [0, 2, -2, 0]
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <motion.path 
        d="m15 5 4 4"
        animate={props.animate ? {
          pathLength: [0, 1, 0],
          opacity: [0.5, 1, 0.5]
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.g>
  </IconWrapper>
);

export const GraduationIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      animate={props.animate ? {
        y: [0, -3, 0],
        rotate: [0, 2, -2, 0]
      } : {}}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
      <motion.circle 
        cx="22" 
        cy="10" 
        r="1"
        animate={props.animate ? {
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7]
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.g>
  </IconWrapper>
);

export const SchoolIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      animate={props.animate ? {
        scale: [1, 1.02, 1]
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path d="M2 20h20v2H2z" />
      <path d="M4 18V8l8-4 8 4v10" />
      <motion.path 
        d="M9 12h6v2H9z"
        animate={props.animate ? {
          opacity: [0.7, 1, 0.7]
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <path d="M9 16h6v2H9z" />
      <path d="M11 6h2v2h-2z" />
    </motion.g>
  </IconWrapper>
);

export const BackpackIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      animate={props.animate ? {
        rotate: [0, 1, -1, 0],
        x: [0, 0.5, -0.5, 0]
      } : {}}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <motion.path 
        d="M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5"
        animate={props.animate ? {
          pathLength: [0, 1],
          opacity: [0.5, 1]
        } : {}}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
    </motion.g>
  </IconWrapper>
);

// NAVIGACIJA IKONE
export const ArrowRightIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      whileHover={props.animate ? { x: 2 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.path 
        d="M5 12h14"
        animate={props.animate ? {
          pathLength: [0, 1, 0]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <path d="m12 5 7 7-7 7" />
    </motion.g>
  </IconWrapper>
);

export const ChevronDownIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      whileHover={props.animate ? { rotate: 180 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <path d="m6 9 6 6 6-6" />
    </motion.g>
  </IconWrapper>
);

export const MenuIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g>
      <motion.path 
        d="M3 12h18"
        animate={props.animate ? {
          pathLength: [0, 1],
          opacity: [0.5, 1, 0.5]
        } : {}}
        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
      />
      <motion.path 
        d="M3 6h18"
        animate={props.animate ? {
          pathLength: [0, 1],
          opacity: [0.5, 1, 0.5]
        } : {}}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />
      <motion.path 
        d="M3 18h18"
        animate={props.animate ? {
          pathLength: [0, 1],
          opacity: [0.5, 1, 0.5]
        } : {}}
        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
      />
    </motion.g>
  </IconWrapper>
);

export const CloseIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      whileHover={props.animate ? { rotate: 90 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <path d="m18 6-12 12" />
      <path d="m6 6 12 12" />
    </motion.g>
  </IconWrapper>
);

// FRANŠIZA IKONE
export const LocationIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      animate={props.animate ? {
        y: [0, -2, 0]
      } : {}}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <motion.circle 
        cx="12" 
        cy="10" 
        r="3"
        animate={props.animate ? {
          scale: [1, 1.1, 1]
        } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.g>
  </IconWrapper>
);

export const GraphIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g>
      <path d="M3 3v18h18" />
      <motion.path 
        d="m19 9-5 5-4-4-3 3"
        initial={{ pathLength: 0 }}
        animate={props.animate ? { pathLength: 1 } : {}}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.circle 
        cx="7" 
        cy="13" 
        r="1"
        animate={props.animate ? {
          scale: [1, 1.5, 1],
          opacity: [0.7, 1, 0.7]
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
      />
      <motion.circle 
        cx="10" 
        cy="10" 
        r="1"
        animate={props.animate ? {
          scale: [1, 1.5, 1],
          opacity: [0.7, 1, 0.7]
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
    </motion.g>
  </IconWrapper>
);

export const PeopleIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      animate={props.animate ? {
        scale: [1, 1.02, 1]
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <motion.circle 
        cx="9" 
        cy="7" 
        r="4"
        animate={props.animate ? {
          scale: [1, 1.05, 1]
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </motion.g>
  </IconWrapper>
);

export const TrophyIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      animate={props.animate ? {
        rotate: [0, 2, -2, 0],
        scale: [1, 1.02, 1]
      } : {}}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55.47.98.97 1.21C14.23 18.75 16 20.24 16 22" />
      <path d="M14 14.66V17c0 .55-.47.98-.97 1.21C9.77 18.75 8 20.24 8 22" />
      <motion.path 
        d="M18 2H6v7a6 6 0 0 0 12 0V2Z"
        animate={props.animate ? {
          opacity: [0.8, 1, 0.8]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.g>
  </IconWrapper>
);

export const HandshakeIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      animate={props.animate ? {
        scale: [1, 1.05, 1]
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <motion.path 
        d="m21 3 1 11h-2"
        animate={props.animate ? {
          pathLength: [0, 1, 0]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </motion.g>
  </IconWrapper>
);

export const RocketIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      animate={props.animate ? {
        y: [0, -3, 0],
        rotate: [0, 1, -1, 0]
      } : {}}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      <motion.circle 
        cx="17" 
        cy="7" 
        r="1"
        animate={props.animate ? {
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7]
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.g>
  </IconWrapper>
);

// KOMUNIKACIJA IKONE
export const PhoneIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      animate={props.animate ? {
        rotate: [0, 5, -5, 0]
      } : {}}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      <motion.circle 
        cx="12" 
        cy="12" 
        r="8"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        animate={props.animate ? {
          scale: [1, 1.2, 1],
          opacity: [0, 0.3, 0]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.g>
  </IconWrapper>
);

export const EmailIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <motion.path 
        d="m22 7-10 5L2 7"
        initial={{ pathLength: 0 }}
        animate={props.animate ? { 
          pathLength: [0, 1, 0],
          opacity: [0.5, 1, 0.5]
        } : {}}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </motion.g>
  </IconWrapper>
);

export const ChatIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      animate={props.animate ? {
        scale: [1, 1.05, 1]
      } : {}}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <motion.circle 
        cx="8" 
        cy="11" 
        r="1"
        animate={props.animate ? {
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7]
        } : {}}
        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
      />
      <motion.circle 
        cx="12" 
        cy="11" 
        r="1"
        animate={props.animate ? {
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7]
        } : {}}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
      />
      <motion.circle 
        cx="16" 
        cy="11" 
        r="1"
        animate={props.animate ? {
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7]
        } : {}}
        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
      />
    </motion.g>
  </IconWrapper>
);

export const VideoIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g>
      <path d="M23 7l-7 5 7 5V7z" />
      <rect width="15" height="9" x="1" y="8" rx="2" ry="2" />
      <motion.circle 
        cx="9" 
        cy="12" 
        r="2"
        fill="currentColor"
        animate={props.animate ? {
          opacity: [0.3, 1, 0.3]
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.g>
  </IconWrapper>
);

// UI ELEMENTI IKONE
export const CheckIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.path 
      d="M20 6 9 17l-5-5"
      initial={{ pathLength: 0 }}
      animate={props.animate ? { pathLength: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  </IconWrapper>
);

export const StarIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      animate={props.animate ? {
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1]
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      <motion.circle 
        cx="12" 
        cy="12" 
        r="8"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        animate={props.animate ? {
          scale: [1, 1.3, 1],
          opacity: [0, 0.2, 0]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.g>
  </IconWrapper>
);

export const HeartIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.path 
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      animate={props.animate ? {
        scale: [1, 1.1, 1]
      } : {}}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </IconWrapper>
);

export const InfoIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      animate={props.animate ? {
        scale: [1, 1.05, 1]
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <motion.path 
        d="M12 8h.01"
        animate={props.animate ? {
          scale: [1, 1.3, 1]
        } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.g>
  </IconWrapper>
);

export const WarningIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      animate={props.animate ? {
        scale: [1, 1.02, 1]
      } : {}}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <motion.path 
        d="M12 17h.01"
        animate={props.animate ? {
          opacity: [0.5, 1, 0.5]
        } : {}}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </motion.g>
  </IconWrapper>
);

export const ClockIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      animate={props.animate ? {
        rotate: 360
      } : {}}
      transition={{
        duration: 60,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <circle cx="12" cy="12" r="10" />
      <motion.path 
        d="M12 6v6l4 2"
        animate={props.animate ? {
          pathLength: [0.5, 1, 0.5]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.g>
  </IconWrapper>
);

export const BrainIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      animate={props.animate ? {
        scale: [1, 1.02, 1]
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v15A2.5 2.5 0 0 0 9.5 22h5a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 14.5 2z" />
      <motion.path 
        d="M9 6h6M9 10h6M9 14h3"
        animate={props.animate ? {
          pathLength: [0, 1, 0]
        } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.circle 
        cx="15" 
        cy="18" 
        r="1"
        animate={props.animate ? {
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7]
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.g>
  </IconWrapper>
);

export const TargetIcon = (props: IconProps) => (
  <IconWrapper {...props}>
    <motion.g
      animate={props.animate ? {
        rotate: [0, 5, -5, 0]
      } : {}}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <motion.circle 
        cx="12" 
        cy="12" 
        r="2"
        animate={props.animate ? {
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.g>
  </IconWrapper>
);

// Eksport svih ikona kao jedan objekat za lakše korišćenje
export const Icons = {
  // Obrazovanje
  Book: BookIcon,
  Pencil: PencilIcon,
  Graduation: GraduationIcon,
  School: SchoolIcon,
  Backpack: BackpackIcon,
  Brain: BrainIcon,
  Target: TargetIcon,
  
  // Navigacija
  ArrowRight: ArrowRightIcon,
  ChevronDown: ChevronDownIcon,
  Menu: MenuIcon,
  Close: CloseIcon,
  
  // Franšiza
  Location: LocationIcon,
  Graph: GraphIcon,
  People: PeopleIcon,
  Trophy: TrophyIcon,
  Handshake: HandshakeIcon,
  Rocket: RocketIcon,
  
  // Komunikacija
  Phone: PhoneIcon,
  Email: EmailIcon,
  Chat: ChatIcon,
  Video: VideoIcon,
  
  // UI elementi
  Check: CheckIcon,
  Star: StarIcon,
  Heart: HeartIcon,
  Info: InfoIcon,
  Warning: WarningIcon,
  Clock: ClockIcon,
};

export default Icons;