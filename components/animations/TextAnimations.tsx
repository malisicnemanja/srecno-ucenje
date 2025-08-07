'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export function WordByWordReveal({ children, className = '' }: { children: ReactNode, className?: string }) {
  return <motion.div className={className}>{children}</motion.div>
}

export function LetterByLetterReveal({ children, className = '' }: { children: ReactNode, className?: string }) {
  return <motion.div className={className}>{children}</motion.div>
}

export function HighlightAnimation({ children, className = '' }: { children: ReactNode, className?: string }) {
  return <motion.div className={className}>{children}</motion.div>
}

export function NumberCounter({ value, className = '' }: { value: number, className?: string }) {
  return <span className={className}>{value}</span>
}

export function SplitTextReveal({ children, className = '' }: { children: ReactNode, className?: string }) {
  return <motion.div className={className}>{children}</motion.div>
}

export function GradientText({ children, className = '' }: { children: ReactNode, className?: string }) {
  return <motion.div className={className}>{children}</motion.div>
}

export function RotatingText({ children, className = '' }: { children: ReactNode, className?: string }) {
  return <motion.div className={className}>{children}</motion.div>
}

export function TypewriterText({ children, className = '' }: { children: ReactNode, className?: string }) {
  return <motion.div className={className}>{children}</motion.div>
}