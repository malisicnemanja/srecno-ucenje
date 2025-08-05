'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'
import { BrushStrokeText } from '@/components/animations/BrushUnderline'
import { RotatingText } from '@/components/animations/RotatingText'
import { 
  AnimatedHeroText, 
  FloatingElement, 
  OptimizedCTAButton, 
  OptimizedPulseButton,
  StaggeredList 
} from '@/components/animations'

interface EnhancedHeroData {
  layout?: 'textLeft' | 'textRight' | 'centered' | 'fullWidth' | 'split'
  title?: string
  highlightText?: string
  titleVariants?: string[]
  subtitle?: string
  brushStrokeWords?: string[]
  animationSettings?: {
    enableBrushStrokes?: boolean
    enableTextRotation?: boolean
    brushStrokeColor?: string
    rotationSpeed?: number
    brushStrokeDelay?: number
  }
  animatedNumber?: {
    target?: number
    suffix?: string
    duration?: number
  }
  badge?: string
  svgBadge?: {
    show?: boolean
    text?: string
    color?: 'green' | 'blue' | 'yellow' | 'red'
    position?: 'above' | 'topRight' | 'topLeft'
  }
  primaryCta?: {
    text?: string
    link?: string
    href?: string
  }
  ctaPrimary?: {
    text?: string
    href?: string
  }
  secondaryCta?: {
    text?: string
    link?: string
    href?: string
  }
  ctaSecondary?: {
    text?: string
    href?: string
  }
  features?: Array<{
    icon?: string
    text?: string
  }>
  backgroundType?: 'none' | 'pattern' | 'image' | 'video' | 'gradient'
  backgroundPattern?: 'dots' | 'lines' | 'circles' | 'waves'
  backgroundImage?: any
  heroImage?: any
  trustBadges?: any[]
}

interface FlexibleHeroSectionProps {
  data: EnhancedHeroData
  className?: string
}

// SVG Badge Component
const SVGBadge = ({ badge }: { badge: EnhancedHeroData['svgBadge'] }) => {
  if (!badge?.show || !badge?.text) return null

  const colors = {
    green: 'bg-green-100 text-green-800 border-green-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    red: 'bg-red-100 text-red-800 border-red-200'
  }

  const positionClasses = {
    above: 'mx-auto mb-4',
    topRight: 'absolute top-4 right-4',
    topLeft: 'absolute top-4 left-4'
  }

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colors[badge.color || 'green']} ${positionClasses[badge.position || 'above']}`}>
      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      {badge.text}
    </div>
  )
}

// Enhanced Title Component with Brush Strokes and Rotation
const EnhancedTitle = ({ data }: { data: EnhancedHeroData }) => {
  const { 
    title = '', 
    titleVariants = [], 
    brushStrokeWords = [], 
    animationSettings = {} 
  } = data

  const {
    enableBrushStrokes = true,
    enableTextRotation = true,
    brushStrokeColor = '#FDD835',
    rotationSpeed = 3000,
    brushStrokeDelay = 1000
  } = animationSettings

  // If we have title variants and rotation is enabled, find where to insert them
  if (enableTextRotation && titleVariants.length > 0) {
    const titleParts = title.split(' ')
    
    // Find a good place to insert rotating text (look for common words like "your", "the", etc.)
    const insertWords = ['your', 'the', 'our', 'this', 'that', 'every', 'each']
    let insertIndex = titleParts.findIndex(word => 
      insertWords.some(insertWord => word.toLowerCase().includes(insertWord.toLowerCase()))
    )
    
    if (insertIndex === -1) {
      insertIndex = Math.floor(titleParts.length / 2) // Fallback to middle
    }

    const beforeRotating = titleParts.slice(0, insertIndex + 1).join(' ')
    const afterRotating = titleParts.slice(insertIndex + 1).join(' ')

    return (
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
        {enableBrushStrokes && brushStrokeWords.length > 0 ? (
          <BrushStrokeText
            wordsToHighlight={brushStrokeWords}
            brushColor={brushStrokeColor}
            animationDelay={brushStrokeDelay}
          >\n            {beforeRotating} <RotatingText \n              words={titleVariants} \n              interval={rotationSpeed}\n              className=\"text-primary-600\"\n            /> {afterRotating}\n          </BrushStrokeText>\n        ) : (\n          <>\n            {beforeRotating} <RotatingText \n              words={titleVariants} \n              interval={rotationSpeed}\n              className=\"text-primary-600\"\n            /> {afterRotating}\n          </>\n        )}\n      </h1>\n    )\n  }\n\n  // Regular title with optional brush strokes\n  return (\n    <h1 className=\"text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight\">\n      {enableBrushStrokes && brushStrokeWords.length > 0 ? (\n        <BrushStrokeText\n          wordsToHighlight={brushStrokeWords}\n          brushColor={brushStrokeColor}\n          animationDelay={brushStrokeDelay}\n        >\n          {title}\n        </BrushStrokeText>\n      ) : (\n        title\n      )}\n    </h1>\n  )\n}\n\n// Main Flexible Hero Section Component\nexport default function FlexibleHeroSection({ data, className = '' }: FlexibleHeroSectionProps) {\n  const { \n    layout = 'centered',\n    subtitle,\n    badge,\n    svgBadge,\n    features,\n    backgroundType = 'pattern',\n    backgroundPattern = 'dots',\n    backgroundImage,\n    heroImage,\n    primaryCta,\n    ctaPrimary,\n    secondaryCta,\n    ctaSecondary\n  } = data\n\n  // Normalize CTA data\n  const normalizedPrimaryCta = primaryCta || ctaPrimary\n  const normalizedSecondaryCta = secondaryCta || ctaSecondary\n\n  // Background rendering\n  const renderBackground = () => {\n    switch (backgroundType) {\n      case 'image':\n        return backgroundImage ? (\n          <div className=\"absolute inset-0\">\n            <Image\n              src={urlForImage(backgroundImage)?.url() || ''}\n              alt=\"Hero background\"\n              fill\n              className=\"object-cover\"\n              priority\n            />\n            <div className=\"absolute inset-0 bg-black/20\" />\n          </div>\n        ) : null\n      \n      case 'pattern':\n        return (\n          <div className=\"absolute inset-0 opacity-5\">\n            <div \n              className=\"absolute inset-0\" \n              style={{\n                backgroundImage: getPatternSvg(backgroundPattern || 'dots'),\n                backgroundSize: getPatternSize(backgroundPattern || 'dots')\n              }} \n            />\n          </div>\n        )\n      \n      case 'gradient':\n        return (\n          <div className=\"absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50\" />\n        )\n      \n      default:\n        return null\n    }\n  }\n\n  // Layout-specific content rendering\n  const renderContent = () => {\n    const contentSection = (\n      <div className=\"flex-1 space-y-6\">\n        {/* Badge */}\n        {badge && (\n          <div className=\"text-primary-600 font-medium text-lg\">\n            {badge}\n          </div>\n        )}\n        \n        {/* SVG Badge */}\n        <SVGBadge badge={svgBadge} />\n        \n        {/* Title */}\n        <EnhancedTitle data={data} />\n        \n        {/* Subtitle */}\n        {subtitle && (\n          <p className=\"text-xl text-gray-600 max-w-2xl leading-relaxed\">\n            {subtitle}\n          </p>\n        )}\n        \n        {/* CTAs */}\n        {(normalizedPrimaryCta || normalizedSecondaryCta) && (\n          <div className=\"flex flex-col sm:flex-row gap-4 pt-4\">\n            <StaggeredList\n              staggerDelay={200}\n              animation=\"scaleIn\"\n              startDelay={1200}\n              className=\"flex flex-col sm:flex-row gap-4\"\n            >\n              {normalizedPrimaryCta?.text && (\n                <Link href={normalizedPrimaryCta.link || normalizedPrimaryCta.href || '#'}>\n                  <OptimizedCTAButton className=\"min-w-[200px]\">\n                    {normalizedPrimaryCta.text}\n                  </OptimizedCTAButton>\n                </Link>\n              )}\n              \n              {normalizedSecondaryCta?.text && (\n                <Link href={normalizedSecondaryCta.link || normalizedSecondaryCta.href || '#'}>\n                  <OptimizedPulseButton\n                    variant=\"secondary\"\n                    className=\"min-w-[200px] bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50\"\n                  >\n                    {normalizedSecondaryCta.text}\n                  </OptimizedPulseButton>\n                </Link>\n              )}\n            </StaggeredList>\n          </div>\n        )}\n        \n        {/* Features */}\n        {features && features.length > 0 && (\n          <div className=\"pt-8\">\n            <div className=\"flex flex-wrap gap-6 text-sm text-gray-600\">\n              {features.map((feature, index) => (\n                <div key={index} className=\"flex items-center gap-2\">\n                  <div className=\"w-2 h-2 bg-green-400 rounded-full animate-pulse\" style={{ animationDelay: `${index * 200}ms` }} />\n                  <span>{feature.text}</span>\n                </div>\n              ))}\n            </div>\n          </div>\n        )}\n      </div>\n    )\n\n    const imageSection = heroImage ? (\n      <div className=\"flex-1\">\n        <div className=\"relative aspect-square max-w-lg mx-auto\">\n          <Image\n            src={urlForImage(heroImage)?.url() || ''}\n            alt=\"Hero image\"\n            fill\n            className=\"object-cover rounded-2xl shadow-xl\"\n            priority\n          />\n        </div>\n      </div>\n    ) : null\n\n    switch (layout) {\n      case 'textLeft':\n        return (\n          <div className=\"grid lg:grid-cols-2 gap-12 items-center\">\n            {contentSection}\n            {imageSection}\n          </div>\n        )\n      \n      case 'textRight':\n        return (\n          <div className=\"grid lg:grid-cols-2 gap-12 items-center\">\n            {imageSection}\n            {contentSection}\n          </div>\n        )\n      \n      case 'centered':\n        return (\n          <div className=\"text-center max-w-4xl mx-auto\">\n            {contentSection}\n          </div>\n        )\n      \n      case 'fullWidth':\n        return (\n          <div className=\"text-center\">\n            {contentSection}\n          </div>\n        )\n      \n      case 'split':\n        return (\n          <div className=\"grid lg:grid-cols-2 gap-0 min-h-screen\">\n            <div className=\"flex items-center justify-center p-12 bg-primary-50\">\n              {contentSection}\n            </div>\n            <div className=\"flex items-center justify-center p-12\">\n              {imageSection}\n            </div>\n          </div>\n        )\n      \n      default:\n        return contentSection\n    }\n  }\n\n  const containerClass = layout === 'split' \n    ? 'relative min-h-screen' \n    : 'relative min-h-screen flex items-center py-20'\n\n  return (\n    <section className={`${containerClass} overflow-hidden ${className}`}>\n      {/* Background */}\n      {renderBackground()}\n      \n      {/* Floating decorative elements for non-split layouts */}\n      {layout !== 'split' && (\n        <div className=\"absolute inset-0 pointer-events-none\">\n          <div className=\"container mx-auto px-4 h-full relative\">\n            <FloatingElement \n              animation=\"gentle\" \n              delay={500}\n              className=\"absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2\"\n            >\n              <div className=\"w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl shadow-lg\">\n                📚\n              </div>\n            </FloatingElement>\n            \n            <FloatingElement \n              animation=\"gentle\" \n              delay={1000}\n              className=\"absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2\"\n            >\n              <div className=\"w-16 h-16 bg-green-400 rounded-full flex items-center justify-center text-2xl shadow-lg\">\n                🎓\n              </div>\n            </FloatingElement>\n            \n            <FloatingElement \n              animation=\"gentle\" \n              delay={1500}\n              className=\"absolute bottom-1/4 left-1/6 transform -translate-x-1/2 translate-y-1/2\"\n            >\n              <div className=\"w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-2xl shadow-lg\">\n                ✨\n              </div>\n            </FloatingElement>\n          </div>\n        </div>\n      )}\n      \n      {/* Content */}\n      <div className={layout === 'split' ? '' : 'container mx-auto px-4 relative z-10'}>\n        {renderContent()}\n      </div>\n    </section>\n  )\n}\n\n// Helper functions for patterns\nfunction getPatternSvg(pattern: string): string {\n  const patterns = {\n    dots: `url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")`,\n    lines: `url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%234F46E5' stroke-width='1' stroke-opacity='0.1'%3E%3Cpath d='M0 30h60M30 0v60'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")`,\n    circles: `url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%234F46E5' stroke-width='1' stroke-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='15'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")`,\n    waves: `url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%234F46E5' stroke-width='1' stroke-opacity='0.1'%3E%3Cpath d='M0 30Q15 15 30 30T60 30'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")`\n  }\n  return patterns[pattern as keyof typeof patterns] || patterns.dots\n}\n\nfunction getPatternSize(pattern: string): string {\n  const sizes = {\n    dots: '60px 60px',\n    lines: '60px 60px',\n    circles: '60px 60px',\n    waves: '60px 60px'\n  }\n  return sizes[pattern as keyof typeof sizes] || '60px 60px'\n}