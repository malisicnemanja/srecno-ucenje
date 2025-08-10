import type { Config } from 'tailwindcss'
import { colors, brandColors, spacing, borderRadius, typography } from './lib/design-tokens'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Ultra-wide screen support
      screens: {
        'ultrawide': '1600px',
        '2k': '1920px',
        '4k': '2560px',
      },
      // Brand color system for Srećno učenje
      colors: {
        // Direct brand colors (converted from CMYK)
        sky: brandColors.sky,
        sun: brandColors.sun, 
        grass: brandColors.grass,
        heart: brandColors.heart,
        night: brandColors.night,
        
        // Brand-prefixed colors for components
        'brand-sky': brandColors.sky,
        'brand-sun': brandColors.sun,
        'brand-grass': brandColors.grass,
        'brand-heart': brandColors.heart,
        'brand-night': brandColors.night,
        
        // Scale colors for design system
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        warm: colors.warm,
        gray: colors.gray,
        nightColors: colors.night,
        
        // Legacy support
        green: colors.primary,
        blue: colors.secondary,
        yellow: colors.accent,
        red: colors.warm,
      },
      
      // Mobile-first spacing system
      spacing,
      
      // Educational platform border radius
      borderRadius,
      
      // Typography scales
      fontSize: {
        // Mobile sizes (320px+)
        'display-mobile': [typography.mobile.display.size, typography.mobile.display.lineHeight],
        'h1-mobile': [typography.mobile.h1.size, typography.mobile.h1.lineHeight],
        'h2-mobile': [typography.mobile.h2.size, typography.mobile.h2.lineHeight],
        'h3-mobile': [typography.mobile.h3.size, typography.mobile.h3.lineHeight],
        'body-mobile': [typography.mobile.body.size, typography.mobile.body.lineHeight],
        'small-mobile': [typography.mobile.small.size, typography.mobile.small.lineHeight],
        'tiny-mobile': [typography.mobile.tiny.size, typography.mobile.tiny.lineHeight],
        
        // Tablet sizes (768px+) 
        'display-tablet': [typography.tablet.display.size, typography.tablet.display.lineHeight],
        'h1-tablet': [typography.tablet.h1.size, typography.tablet.h1.lineHeight],
        'h2-tablet': [typography.tablet.h2.size, typography.tablet.h2.lineHeight],
        'h3-tablet': [typography.tablet.h3.size, typography.tablet.h3.lineHeight],
        'body-tablet': [typography.tablet.body.size, typography.tablet.body.lineHeight],
        'small-tablet': [typography.tablet.small.size, typography.tablet.small.lineHeight],
        'tiny-tablet': [typography.tablet.tiny.size, typography.tablet.tiny.lineHeight],
        
        // Desktop sizes (1024px+)
        'display-desktop': [typography.desktop.display.size, typography.desktop.display.lineHeight],
        'h1-desktop': [typography.desktop.h1.size, typography.desktop.h1.lineHeight],
        'h2-desktop': [typography.desktop.h2.size, typography.desktop.h2.lineHeight],
        'h3-desktop': [typography.desktop.h3.size, typography.desktop.h3.lineHeight],
        'body-desktop': [typography.desktop.body.size, typography.desktop.body.lineHeight],
        'small-desktop': [typography.desktop.small.size, typography.desktop.small.lineHeight],
        'tiny-desktop': [typography.desktop.tiny.size, typography.desktop.tiny.lineHeight],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'brush-stroke': 'brushStroke 1.5s ease-out forwards',
        'gentle-float': 'gentleFloat 6s ease-in-out infinite',
        'float-bounce': 'floatBounce 4s ease-in-out infinite',
        'letter-float': 'letterFloat 8s ease-in-out infinite',
        'typewriter': 'typewriter 2s steps(40, end)',
        'button-invert': 'buttonInvert 0.3s ease-in-out',
        'celebration': 'celebration 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
        'text-reveal': 'textReveal 0.8s ease-out forwards',
        'text-reveal-delay': 'textReveal 0.8s ease-out 0.3s forwards',
        'subtle-pulse': 'subtlePulse 2s ease-in-out infinite',
        'card-lift': 'cardLift 0.3s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(-1deg)' },
          '66%': { transform: 'translateY(-5px) rotate(1deg)' },
        },
        brushStroke: {
          '0%': { strokeDashoffset: '1000', opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { strokeDashoffset: '0', opacity: '1' },
        },
        textReveal: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        subtlePulse: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
          '50%': { transform: 'scale(1.02)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' },
        },
        cardLift: {
          from: { transform: 'translateY(0)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
          to: { transform: 'translateY(-4px)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' },
        },
        gentleFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-8px) rotate(-0.5deg)' },
          '50%': { transform: 'translateY(-4px) rotate(0deg)' },
          '75%': { transform: 'translateY(-12px) rotate(0.5deg)' },
        },
        floatBounce: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-15px) scale(1.05)' },
        },
        letterFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-6px) rotate(-1deg)' },
          '66%': { transform: 'translateY(-3px) rotate(1deg)' },
        },
        typewriter: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        buttonInvert: {
          '0%': { backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { backgroundColor: 'var(--text-color)', color: 'var(--bg-color)', transform: 'scale(1)' },
        },
        celebration: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(1.1) rotate(3deg)' },
          '50%': { transform: 'scale(1.2) rotate(-3deg)' },
          '75%': { transform: 'scale(1.1) rotate(2deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        skeleton: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.3)',
        'glow-blue': '0 0 20px rgba(52, 152, 219, 0.3)',
        'glow-yellow': '0 0 20px rgba(243, 156, 18, 0.3)',
        'glow-red': '0 0 20px rgba(231, 76, 60, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
