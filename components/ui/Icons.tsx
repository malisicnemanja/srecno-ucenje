import { SVGProps } from 'react';
import dynamic from 'next/dynamic';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  animate?: boolean;
}

// Create a dynamic motion wrapper to avoid SSR issues
const MotionWrapper = dynamic(
  () => import('framer-motion').then(mod => {
    const motion = mod.motion;
    const Component = ({ children, animate: shouldAnimate = true, ...props }: any) => 
      shouldAnimate ? motion.div(props, children) : <div>{children}</div>
    Component.displayName = 'MotionWrapper';
    return Component;
  }),
  { 
    ssr: false,
    loading: () => <div />
  }
);

// Create motion components conditionally
const createMotionComponent = (Component: string) => {
  if (typeof window === 'undefined') {
    return Component as any;
  }
  return dynamic(
    () => import('framer-motion').then(mod => (mod.motion as any)[Component]),
    { ssr: false, loading: () => Component as any }
  );
};

// Safe motion components that fallback to regular HTML elements
const MotionSVG = typeof window !== 'undefined' ? createMotionComponent('svg') : 'svg' as any;
const MotionG = typeof window !== 'undefined' ? createMotionComponent('g') : 'g' as any;
const MotionPath = typeof window !== 'undefined' ? createMotionComponent('path') : 'path' as any;
const MotionCircle = typeof window !== 'undefined' ? createMotionComponent('circle') : 'circle' as any;

const IconWrapper = ({ 
  children, 
  animate = true, 
  size = 24, 
  className = '',
  ...props 
}: IconProps & { children: React.ReactNode }) => {
  // Server-safe icon wrapper - no animation on server side
  if (typeof window === 'undefined' || !animate) {
    return (
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
  }

  // Client-side with animation
  return (
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
};

// OBRAZOVANJE IKONE
export const BookIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          <path d="M8 6h8M8 10h6M8 14h4" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionPath = createMotionComponent('path');

  return (
    <IconWrapper {...props}>
      <MotionG
        animate={{
          y: [0, -2, 0],
          rotate: [0, 1, 0, -1, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        <MotionPath 
          d="M8 6h8M8 10h6M8 14h4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </MotionG>
    </IconWrapper>
  );
};

export const PencilIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionPath = createMotionComponent('path');

  return (
    <IconWrapper {...props}>
      <MotionG
        animate={{
          x: [0, 1, -1, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <MotionPath 
          d="m15 5 4 4"
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </MotionG>
    </IconWrapper>
  );
};

export const GraduationIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
          <circle cx="22" cy="10" r="1" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionCircle = createMotionComponent('circle');

  return (
    <IconWrapper {...props}>
      <MotionG
        animate={{
          y: [0, -3, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
        <MotionCircle 
          cx="22" 
          cy="10" 
          r="1"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </MotionG>
    </IconWrapper>
  );
};

export const SchoolIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="M2 20h20v2H2z" />
          <path d="M4 18V8l8-4 8 4v10" />
          <path d="M9 12h6v2H9z" />
          <path d="M9 16h6v2H9z" />
          <path d="M11 6h2v2h-2z" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionPath = createMotionComponent('path');

  return (
    <IconWrapper {...props}>
      <MotionG
        animate={{
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M2 20h20v2H2z" />
        <path d="M4 18V8l8-4 8 4v10" />
        <MotionPath 
          d="M9 12h6v2H9z"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <path d="M9 16h6v2H9z" />
        <path d="M11 6h2v2h-2z" />
      </MotionG>
    </IconWrapper>
  );
};

export const BackpackIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
          <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          <path d="M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionPath = createMotionComponent('path');

  return (
    <IconWrapper {...props}>
      <MotionG
        animate={{
          rotate: [0, 1, -1, 0],
          x: [0, 0.5, -0.5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
        <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        <MotionPath 
          d="M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5"
          animate={{
            pathLength: [0, 1],
            opacity: [0.5, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      </MotionG>
    </IconWrapper>
  );
};

// NAVIGACIJA IKONE
export const ArrowRightIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionPath = createMotionComponent('path');

  return (
    <IconWrapper {...props}>
      <MotionG
        whileHover={{ x: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <MotionPath 
          d="M5 12h14"
          animate={{
            pathLength: [0, 1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <path d="m12 5 7 7-7 7" />
      </MotionG>
    </IconWrapper>
  );
};

export const ChevronDownIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="m6 9 6 6 6-6" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');

  return (
    <IconWrapper {...props}>
      <MotionG
        whileHover={{ rotate: 180 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <path d="m6 9 6 6 6-6" />
      </MotionG>
    </IconWrapper>
  );
};

export const MenuIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="M3 12h18" />
          <path d="M3 6h18" />
          <path d="M3 18h18" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionPath = createMotionComponent('path');

  return (
    <IconWrapper {...props}>
      <MotionG>
        <MotionPath 
          d="M3 12h18"
          animate={{
            pathLength: [0, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        />
        <MotionPath 
          d="M3 6h18"
          animate={{
            pathLength: [0, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        />
        <MotionPath 
          d="M3 18h18"
          animate={{
            pathLength: [0, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        />
      </MotionG>
    </IconWrapper>
  );
};

export const CloseIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="m18 6-12 12" />
          <path d="m6 6 12 12" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');

  return (
    <IconWrapper {...props}>
      <MotionG
        whileHover={{ rotate: 90 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <path d="m18 6-12 12" />
        <path d="m6 6 12 12" />
      </MotionG>
    </IconWrapper>
  );
};

// FRANŠIZA IKONE
export const LocationIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionCircle = createMotionComponent('circle');

  return (
    <IconWrapper {...props}>
      <MotionG
        animate={{
          y: [0, -2, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <MotionCircle 
          cx="12" 
          cy="10" 
          r="3"
          animate={{
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </MotionG>
    </IconWrapper>
  );
};

export const GraphIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
          <circle cx="7" cy="13" r="1" />
          <circle cx="10" cy="10" r="1" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionPath = createMotionComponent('path');
  const MotionCircle = createMotionComponent('circle');

  return (
    <IconWrapper {...props}>
      <MotionG>
        <path d="M3 3v18h18" />
        <MotionPath 
          d="m19 9-5 5-4-4-3 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <MotionCircle 
          cx="7" 
          cy="13" 
          r="1"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        />
        <MotionCircle 
          cx="10" 
          cy="10" 
          r="1"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />
      </MotionG>
    </IconWrapper>
  );
};

export const PeopleIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionCircle = createMotionComponent('circle');

  return (
    <IconWrapper {...props}>
      <MotionG
        animate={{
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <MotionCircle 
          cx="9" 
          cy="7" 
          r="4"
          animate={{
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </MotionG>
    </IconWrapper>
  );
};

export const TrophyIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55.47.98.97 1.21C14.23 18.75 16 20.24 16 22" />
          <path d="M14 14.66V17c0 .55-.47.98-.97 1.21C9.77 18.75 8 20.24 8 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionPath = createMotionComponent('path');

  return (
    <IconWrapper {...props}>
      <MotionG
        animate={{
          rotate: [0, 2, -2, 0],
          scale: [1, 1.02, 1]
        }}
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
        <MotionPath 
          d="M18 2H6v7a6 6 0 0 0 12 0V2Z"
          animate={{
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </MotionG>
    </IconWrapper>
  );
};

export const HandshakeIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="m11 17 2 2a1 1 0 1 0 3-3" />
          <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
          <path d="m21 3 1 11h-2" />
          <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
          <path d="M3 4h8" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionPath = createMotionComponent('path');

  return (
    <IconWrapper {...props}>
      <MotionG
        animate={{
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="m11 17 2 2a1 1 0 1 0 3-3" />
        <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
        <MotionPath 
          d="m21 3 1 11h-2"
          animate={{
            pathLength: [0, 1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
        <path d="M3 4h8" />
      </MotionG>
    </IconWrapper>
  );
};

export const RocketIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          <circle cx="17" cy="7" r="1" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionCircle = createMotionComponent('circle');

  return (
    <IconWrapper {...props}>
      <MotionG
        animate={{
          y: [0, -3, 0],
          rotate: [0, 1, -1, 0]
        }}
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
        <MotionCircle 
          cx="17" 
          cy="7" 
          r="1"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </MotionG>
    </IconWrapper>
  );
};

// KOMUNIKACIJA IKONE
export const PhoneIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionCircle = createMotionComponent('circle');

  return (
    <IconWrapper {...props}>
      <MotionG
        animate={{
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        <MotionCircle 
          cx="12" 
          cy="12" 
          r="8"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 0.3, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </MotionG>
    </IconWrapper>
  );
};

export const EmailIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-10 5L2 7" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version  
  const MotionG = createMotionComponent('g');
  const MotionPath = createMotionComponent('path');

  return (
    <IconWrapper {...props}>
      <MotionG>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <MotionPath 
          d="m22 7-10 5L2 7"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </MotionG>
    </IconWrapper>
  );
};

export const ChatIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="8" cy="11" r="1" />
          <circle cx="12" cy="11" r="1" />
          <circle cx="16" cy="11" r="1" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionCircle = createMotionComponent('circle');

  return (
    <IconWrapper {...props}>
      <MotionG
        animate={{
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <MotionCircle 
          cx="8" 
          cy="11" 
          r="1"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
        />
        <MotionCircle 
          cx="12" 
          cy="11" 
          r="1"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
        />
        <MotionCircle 
          cx="16" 
          cy="11" 
          r="1"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
        />
      </MotionG>
    </IconWrapper>
  );
};

export const VideoIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="M23 7l-7 5 7 5V7z" />
          <rect width="15" height="9" x="1" y="8" rx="2" ry="2" />
          <circle cx="9" cy="12" r="2" fill="currentColor" opacity="0.6" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionCircle = createMotionComponent('circle');

  return (
    <IconWrapper {...props}>
      <MotionG>
        <path d="M23 7l-7 5 7 5V7z" />
        <rect width="15" height="9" x="1" y="8" rx="2" ry="2" />
        <MotionCircle 
          cx="9" 
          cy="12" 
          r="2"
          fill="currentColor"
          animate={{
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </MotionG>
    </IconWrapper>
  );
};

// UI ELEMENTI IKONE
export const CheckIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <path d="M20 6 9 17l-5-5" />
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionPath = createMotionComponent('path');

  return (
    <IconWrapper {...props}>
      <MotionPath 
        d="M20 6 9 17l-5-5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </IconWrapper>
  );
};

export const StarIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionCircle = createMotionComponent('circle');

  return (
    <IconWrapper {...props}>
      <MotionG
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        <MotionCircle 
          cx="12" 
          cy="12" 
          r="8"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0, 0.2, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </MotionG>
    </IconWrapper>
  );
};

export const HeartIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionPath = createMotionComponent('path');

  return (
    <IconWrapper {...props}>
      <MotionPath 
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        animate={{
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </IconWrapper>
  );
};

export const InfoIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionPath = createMotionComponent('path');

  return (
    <IconWrapper {...props}>
      <MotionG
        animate={{
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <MotionPath 
          d="M12 8h.01"
          animate={{
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </MotionG>
    </IconWrapper>
  );
};

export const WarningIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionPath = createMotionComponent('path');

  return (
    <IconWrapper {...props}>
      <MotionG
        animate={{
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <path d="M12 9v4" />
        <MotionPath 
          d="M12 17h.01"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </MotionG>
    </IconWrapper>
  );
};

export const ClockIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionPath = createMotionComponent('path');

  return (
    <IconWrapper {...props}>
      <MotionG
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <circle cx="12" cy="12" r="10" />
        <MotionPath 
          d="M12 6v6l4 2"
          animate={{
            pathLength: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </MotionG>
    </IconWrapper>
  );
};

export const BrainIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v15A2.5 2.5 0 0 0 9.5 22h5a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 14.5 2z" />
          <path d="M9 6h6M9 10h6M9 14h3" />
          <circle cx="15" cy="18" r="1" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionPath = createMotionComponent('path');
  const MotionCircle = createMotionComponent('circle');

  return (
    <IconWrapper {...props}>
      <MotionG
        animate={{
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v15A2.5 2.5 0 0 0 9.5 22h5a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 14.5 2z" />
        <MotionPath 
          d="M9 6h6M9 10h6M9 14h3"
          animate={{
            pathLength: [0, 1, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <MotionCircle 
          cx="15" 
          cy="18" 
          r="1"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </MotionG>
    </IconWrapper>
  );
};

export const TargetIcon = (props: IconProps) => {
  const { animate = true } = props;
  
  // Server-side or non-animated version
  if (typeof window === 'undefined' || !animate) {
    return (
      <IconWrapper {...props} animate={false}>
        <g>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </g>
      </IconWrapper>
    );
  }

  // Client-side animated version
  const MotionG = createMotionComponent('g');
  const MotionCircle = createMotionComponent('circle');

  return (
    <IconWrapper {...props}>
      <MotionG
        animate={{
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <MotionCircle 
          cx="12" 
          cy="12" 
          r="2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </MotionG>
    </IconWrapper>
  );
};

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