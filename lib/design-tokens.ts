export const colors = {
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  secondary: {
    50: '#ebf8ff',
    100: '#d1eefc',
    200: '#a7d8f0',
    300: '#7cc1e4',
    400: '#55a3d1',
    500: '#3498db',
    600: '#2e86c1',
    700: '#28739e',
    800: '#1f5f8b',
    900: '#1a4971',
  },
  accent: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f39c12',
    600: '#e67e22',
    700: '#c65d1c',
    800: '#9c4e1a',
    900: '#7c3f16',
  },
  warm: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#e74c3c',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
}

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
}

export const transitions = {
  fast: '150ms ease-in-out',
  base: '200ms ease-in-out',
  slow: '300ms ease-in-out',
  slower: '500ms ease-in-out',
}

export const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  slideUp: {
    from: { transform: 'translateY(20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  slideDown: {
    from: { transform: 'translateY(-20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  scaleIn: {
    from: { transform: 'scale(0.9)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
  },
  bounceIn: {
    from: { transform: 'scale(0.3)', opacity: 0 },
    to: {
      transform: 'scale(1.05)',
      opacity: 1,
      animationTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
}

export const gradients = {
  primary: `linear-gradient(135deg, ${colors.primary[400]} 0%, ${colors.primary[600]} 100%)`,
  secondary: `linear-gradient(135deg, ${colors.secondary[400]} 0%, ${colors.secondary[600]} 100%)`,
  accent: `linear-gradient(135deg, ${colors.accent[400]} 0%, ${colors.accent[600]} 100%)`,
  warm: `linear-gradient(135deg, ${colors.warm[400]} 0%, ${colors.warm[600]} 100%)`,
  rainbow: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.secondary[500]} 33%, ${colors.accent[500]} 66%, ${colors.warm[500]} 100%)`,
  soft: {
    primary: `linear-gradient(135deg, ${colors.primary[100]} 0%, ${colors.primary[200]} 100%)`,
    secondary: `linear-gradient(135deg, ${colors.secondary[100]} 0%, ${colors.secondary[200]} 100%)`,
    accent: `linear-gradient(135deg, ${colors.accent[100]} 0%, ${colors.accent[200]} 100%)`,
    warm: `linear-gradient(135deg, ${colors.warm[100]} 0%, ${colors.warm[200]} 100%)`,
  },
}

export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
}