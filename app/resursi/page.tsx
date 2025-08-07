'use client'

import { useState, useEffect } from 'react'
import { useSanityQuery } from '@/hooks/useSanity'
import { saveSanityDocument, patchSanityDocument } from '@/lib/sanity-write'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.client'
import { trackEvent } from '@/lib/analytics'
import { downloadFile, formatFileSize, getFileTypeIcon } from '@/lib/downloadManager'
import { Star, Sparkles } from 'lucide-react'
import DownloadProgressModal from '@/components/ui/DownloadProgressModal'
import Dropdown from '@/components/ui/Dropdown'

const resourcesQuery = `*[_type == "resource"] | order(featured desc, publishedAt desc) {
  _id,
  title,
  slug,
  category,
  description,
  resourceType,
  fileSize,
  pages,
  requiresLead,
  tags,
  featured,
  downloadCount,
  "fileUrl": file.asset->url,
  thumbnail
}`

interface Resource {
  _id: string
  title: string
  slug: { current: string }
  category: string
  description: string
  resourceType: string
  fileSize: number
  pages?: number
  requiresLead: boolean
  tags: string[]
  featured: boolean
  downloadCount: number
  fileUrl: string
  thumbnail?: any
}

const categoryLabels: Record<string, string> = {
  franchise_guide: 'Franšiza vodič',
  methodology: 'Metodologija',
  business_plans: 'Biznis planovi',
  marketing: 'Marketing',
  training: 'Obuka',
  legal: 'Pravni dokumenti',
  case_studies: 'Studije slučaja',
}

// Animated Resource Library SVG
const ResourceLibrary = () => (
  <motion.svg 
    width="140" 
    height="140" 
    viewBox="0 0 140 140" 
    className="text-primary-400 opacity-20"
    animate={{ 
      y: [0, -15, 0],
      rotate: [0, 2, -2, 0]
    }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Bookshelf */}
    <motion.rect 
      x="20" 
      y="100" 
      width="100" 
      height="8" 
      fill="currentColor"
      animate={{ scaleX: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <motion.rect 
      x="20" 
      y="70" 
      width="100" 
      height="8" 
      fill="currentColor"
      animate={{ scaleX: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
    />
    <motion.rect 
      x="20" 
      y="40" 
      width="100" 
      height="8" 
      fill="currentColor"
      animate={{ scaleX: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
    />
    
    {/* Books */}
    <motion.rect x="25" y="80" width="8" height="20" fill="currentColor" animate={{ y: [80, 78, 80] }} transition={{ duration: 3, repeat: Infinity }} />
    <motion.rect x="35" y="75" width="8" height="25" fill="currentColor" animate={{ y: [75, 73, 75] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
    <motion.rect x="45" y="82" width="8" height="18" fill="currentColor" animate={{ y: [82, 80, 82] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
    <motion.rect x="55" y="78" width="8" height="22" fill="currentColor" animate={{ y: [78, 76, 78] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }} />
  </motion.svg>
)

// Animated Digital Cloud SVG
const DigitalCloud = () => (
  <motion.svg 
    width="120" 
    height="120" 
    viewBox="0 0 120 120" 
    className="text-secondary-400 opacity-25"
    animate={{ 
      scale: [1, 1.1, 1],
      x: [0, 10, 0]
    }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Cloud shape */}
    <motion.path 
      d="M30 60 C20 60, 20 45, 35 45 C35 35, 50 35, 50 45 C60 40, 75 45, 75 55 C85 55, 85 70, 75 70 L35 70 C25 70, 20 65, 30 60 Z" 
      fill="currentColor"
      animate={{ 
        opacity: [0.8, 1, 0.8],
        scale: [1, 1.05, 1]
      }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    
    {/* Data streams */}
    <motion.path 
      d="M40 80 L40 90 M50 80 L50 95 M60 80 L60 90" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none"
      animate={{ 
        pathLength: [0, 1, 0],
        opacity: [0, 1, 0]
      }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
    />
  </motion.svg>
)

// Animated Learning Bulb SVG
const LearningBulb = () => (
  <motion.svg 
    width="110" 
    height="110" 
    viewBox="0 0 110 110" 
    className="text-accent-400 opacity-20"
    animate={{ 
      rotate: [0, 5, -5, 0],
      y: [0, -10, 0]
    }}
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Bulb */}
    <motion.circle 
      cx="55" 
      cy="45" 
      r="20" 
      fill="currentColor"
      animate={{ 
        scale: [1, 1.15, 1],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.rect 
      x="50" 
      y="65" 
      width="10" 
      height="15" 
      fill="currentColor"
      animate={{ scaleY: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* Light rays */}
    <motion.path 
      d="M35 30 L30 25 M75 30 L80 25 M35 60 L30 65 M75 60 L80 65 M25 45 L20 45 M85 45 L90 45" 
      stroke="currentColor" 
      strokeWidth="3" 
      fill="none"
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0.8, 1.2, 0.8]
      }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
    />
  </motion.svg>
)

// Animated Document Flow SVG
const DocumentFlow = () => (
  <motion.svg 
    width="130" 
    height="130" 
    viewBox="0 0 130 130" 
    className="text-warm-400 opacity-25"
    animate={{ 
      x: [0, -15, 0],
      rotate: [0, 1, -1, 0]
    }}
    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Documents */}
    <motion.rect 
      x="20" 
      y="30" 
      width="25" 
      height="30" 
      rx="3" 
      fill="currentColor"
      animate={{ 
        y: [30, 25, 30],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.rect 
      x="50" 
      y="25" 
      width="25" 
      height="30" 
      rx="3" 
      fill="currentColor"
      animate={{ 
        y: [25, 20, 25],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
    />
    <motion.rect 
      x="80" 
      y="35" 
      width="25" 
      height="30" 
      rx="3" 
      fill="currentColor"
      animate={{ 
        y: [35, 30, 35],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
    />
    
    {/* Flow arrows */}
    <motion.path 
      d="M47 40 L52 40 M77 40 L82 40" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none"
      animate={{ 
        pathLength: [0, 1, 0],
        opacity: [0, 1, 0]
      }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
    />
  </motion.svg>
)

// Feature SVG Components
const BooksSVG = () => (
  <motion.svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    className="text-primary-500"
    animate={{ 
      rotate: [0, 3, -3, 0],
      scale: [1, 1.1, 1]
    }}
    transition={{ 
      duration: 4, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    <motion.path 
      d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none"
      animate={{ pathLength: [0, 1] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
    <motion.path 
      d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" 
      fill="currentColor" 
      opacity="0.7"
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.circle 
      cx="16" 
      cy="8" 
      r="1" 
      fill="white"
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
    />
  </motion.svg>
)

const ClipboardSVG = () => (
  <motion.svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    className="text-secondary-500"
    animate={{ 
      y: [0, -3, 0],
      rotate: [0, 2, -2, 0]
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    <motion.path 
      d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none"
    />
    <motion.rect 
      x="8" 
      y="2" 
      width="8" 
      height="4" 
      rx="1" 
      ry="1" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="currentColor" 
      opacity="0.3"
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path 
      d="M8 12h8 M8 16h6" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none"
      animate={{ pathLength: [0, 1, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
    />
  </motion.svg>
)

const BullseyeSVG = () => (
  <motion.svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    className="text-accent-500"
    animate={{ 
      rotate: [0, 360],
      scale: [1, 1.1, 1]
    }}
    transition={{ 
      duration: 8, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    <motion.circle 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none"
      animate={{ strokeDasharray: ["0 63", "31 31", "63 0"] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <motion.circle 
      cx="12" 
      cy="12" 
      r="6" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.circle 
      cx="12" 
      cy="12" 
      r="2" 
      fill="currentColor"
      animate={{ scale: [1, 1.5, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </motion.svg>
)

const ScaleSVG = () => (
  <motion.svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    className="text-warm-500"
    animate={{ 
      rotate: [0, 5, -5, 0],
      y: [0, -2, 0]
    }}
    transition={{ 
      duration: 6, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    <motion.path 
      d="M16 11V3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8M12 11L8 7c-1-1-3-1-4 0v0c-1 1-1 3 0 4l4 4" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none"
      animate={{ pathLength: [0, 1] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
    <motion.path 
      d="M12 11h8c1 0 1 1 1 1v0c0 1-1 1-1 1h-8" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.circle 
      cx="12" 
      cy="16" 
      r="6" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
  </motion.svg>
)

const SearchSVG = () => (
  <motion.svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    className="text-primary-600"
    animate={{ 
      rotate: [0, 15, -15, 0],
      scale: [1, 1.2, 1]
    }}
    transition={{ 
      duration: 3, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    <motion.circle 
      cx="7" 
      cy="7" 
      r="5" 
      stroke="currentColor" 
      strokeWidth="2" 
      fill="none"
      animate={{ strokeDasharray: ["0 31", "15 15", "31 0"] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path 
      d="m12 12 2 2" 
      stroke="currentColor" 
      strokeWidth="2"
      animate={{ pathLength: [0, 1] }}
      transition={{ duration: 1, repeat: Infinity, delay: 1 }}
    />
  </motion.svg>
)

const FolderSVG = () => (
  <motion.svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    className="text-secondary-600"
    animate={{ 
      y: [0, -2, 0],
      scale: [1, 1.1, 1]
    }}
    transition={{ 
      duration: 4, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    <motion.path 
      d="M14.5 3h-6l-1-1h-5A1.5 1.5 0 0 0 1 3.5v9A1.5 1.5 0 0 0 2.5 14h12a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3z" 
      fill="currentColor"
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.rect 
      x="3" 
      y="6" 
      width="10" 
      height="1" 
      fill="white" 
      opacity="0.8"
      animate={{ scaleX: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
  </motion.svg>
)

// Category Icon SVG Components
const RocketSVG = () => (
  <motion.svg width="16" height="16" viewBox="0 0 16 16" className="text-primary-500"
    animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
    <path d="M8 1L4 7h2v6l2-2 2 2V7h2L8 1z" fill="currentColor" />
  </motion.svg>
)

const BrainSVG = () => (
  <motion.svg width="16" height="16" viewBox="0 0 16 16" className="text-secondary-500"
    animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}>
    <path d="M4 4c0-2 2-4 4-4s4 2 4 4c0 1-1 2-1 3s1 2 1 3c0 2-2 4-4 4s-4-2-4-4c0-1 1-2 1-3s-1-2-1-3z" fill="currentColor" />
  </motion.svg>
)

const ChartSVG = () => (
  <motion.svg width="16" height="16" viewBox="0 0 16 16" className="text-primary-500"
    animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
    <rect x="2" y="10" width="2" height="4" fill="currentColor" />
    <rect x="6" y="6" width="2" height="8" fill="currentColor" />
    <rect x="10" y="2" width="2" height="12" fill="currentColor" />
  </motion.svg>
)

const MegaphoneSVG = () => (
  <motion.svg width="16" height="16" viewBox="0 0 16 16" className="text-warm-500"
    animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
    <path d="M1 8l3-2v4l-3-2zm4-2h8l2 2-2 2H5V6z" fill="currentColor" />
  </motion.svg>
)

const GraduationSVG = () => (
  <motion.svg width="16" height="16" viewBox="0 0 16 16" className="text-accent-500"
    animate={{ y: [0, -1, 0] }} transition={{ duration: 3, repeat: Infinity }}>
    <path d="M8 2L2 5l6 3 6-3-6-3zm0 6L5 6.5v3L8 12l3-2.5v-3L8 8z" fill="currentColor" />
  </motion.svg>
)

const ScaleLegalSVG = () => (
  <motion.svg width="16" height="16" viewBox="0 0 16 16" className="text-gray-600"
    animate={{ rotate: [0, 3, -3, 0] }} transition={{ duration: 4, repeat: Infinity }}>
    <path d="M8 1L6 3H2l2 2v8h8V5l2-2h-4L8 1zm0 2l1 1h2l-1 1v6H6V5L5 4h2L8 3z" fill="currentColor" />
  </motion.svg>
)

const TrendingSVG = () => (
  <motion.svg width="16" height="16" viewBox="0 0 16 16" className="text-primary-500"
    animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
    <path d="M2 12l3-3 2 2 7-7v3h2V2h-5v2h3l-5 5-2-2-3 3 1 2z" fill="currentColor" />
  </motion.svg>
)

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'franchise_guide': return <RocketSVG />
    case 'methodology': return <BrainSVG />
    case 'business_plans': return <ChartSVG />
    case 'marketing': return <MegaphoneSVG />
    case 'training': return <GraduationSVG />
    case 'legal': return <ScaleLegalSVG />
    case 'case_studies': return <TrendingSVG />
    default: return null
  }
}

// Using the enhanced icon system
const getResourceIcon = (resourceType: string) => getFileTypeIcon(resourceType)

export default function ResourceCenterPage() {
  const { data: resources, isLoading } = useSanityQuery(resourcesQuery)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [leadInfo, setLeadInfo] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState({
    isOpen: false,
    fileName: '',
    progress: 0,
    error: ''
  })

  // Filter resources
  const filteredResources = resources?.filter((resource: Resource) => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  const handleDownload = (resource: Resource) => {
    if (resource.requiresLead) {
      setSelectedResource(resource)
      setShowLeadForm(true)
    } else {
      downloadResource(resource)
    }
  }

  const downloadResource = async (resource: Resource) => {
    // Track download
    trackEvent({
      category: 'Resource',
      action: 'download',
      label: resource.title,
    })

    // Update download count
    try {
      await patchSanityDocument(resource._id, {
        inc: { downloadCount: 1 }
      })
    } catch (error) {
      console.error('Error updating download count:', error)
    }

    // Start download with progress
    if (resource.fileUrl) {
      setDownloadProgress({
        isOpen: true,
        fileName: resource.title,
        progress: 0,
        error: ''
      })

      await downloadFile(resource.fileUrl, {
        filename: `${resource.title}.${resource.resourceType}`,
        onProgress: (progress) => {
          setDownloadProgress(prev => ({
            ...prev,
            progress: progress.percentage
          }))
        },
        onError: (error) => {
          setDownloadProgress(prev => ({
            ...prev,
            error: error.message
          }))
        },
        onComplete: () => {
          setDownloadProgress(prev => ({
            ...prev,
            progress: 100
          }))
        }
      })
    }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Save lead
      await saveSanityDocument('newsletterSubscriber', {
        name: leadInfo.name,
        email: leadInfo.email,
        phone: leadInfo.phone,
        source: `resource_${selectedResource?.slug.current}`,
        subscribedAt: new Date().toISOString(),
      })

      // Track conversion
      trackEvent({
        category: 'Resource',
        action: 'lead_capture',
        label: selectedResource?.title,
      })

      // Download resource
      if (selectedResource) {
        downloadResource(selectedResource)
      }

      // Reset form
      setShowLeadForm(false)
      setLeadInfo({ name: '', email: '', phone: '' })
      alert('Hvala! Resurs je spreman za preuzimanje.')
    } catch (error) {
      console.error('Error saving lead:', error)
      alert('Greška pri slanju. Molimo pokušajte ponovo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary-50 min-h-[85vh] flex items-center">
        {/* Floating animated elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Resource Library - top left */}
          <motion.div
            className="absolute top-16 left-16"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ResourceLibrary />
          </motion.div>

          {/* Digital Cloud - top right */}
          <motion.div
            className="absolute top-24 right-20"
            animate={{
              y: [0, -25, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <DigitalCloud />
          </motion.div>

          {/* Learning Bulb - bottom left */}
          <motion.div
            className="absolute bottom-20 left-1/4"
            animate={{
              rotate: [0, 8, -8, 0],
              y: [0, -15, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <LearningBulb />
          </motion.div>

          {/* Document Flow - bottom right */}
          <motion.div
            className="absolute bottom-32 right-1/3"
            animate={{
              x: [0, -20, 0],
              scale: [1, 1.08, 1]
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <DocumentFlow />
          </motion.div>

          {/* Additional floating particles */}
          <motion.div
            className="absolute top-1/3 right-1/4 w-5 h-5 bg-primary-300 rounded-full opacity-40"
            animate={{
              y: [0, -50, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-accent-300 rounded-full opacity-50"
            animate={{
              x: [0, 20, 0],
              y: [0, -30, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-2/3 left-2/3 w-4 h-4 bg-secondary-300 rounded-full opacity-35"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
              opacity: [0.35, 0.7, 0.35]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-6"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Ekskluzivni sadržaji za partnere
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                <span className="text-secondary-600">Centar</span>{' '}
                <span className="text-accent-600">Resursa</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Sve što vam je potrebno za uspešno vođenje Srećno učenje centra na jednom mestu
              </p>

              {/* Feature highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-6 mb-8"
              >
                {[
                  { icon: BooksSVG, text: "Obučni materijali", color: "primary" },
                  { icon: ClipboardSVG, text: "Biznis planovi", color: "secondary" },
                  { icon: BullseyeSVG, text: "Marketing alati", color: "accent" },
                  { icon: ScaleSVG, text: "Pravni dokumenti", color: "warm" }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
                    className={`flex items-center bg-white px-4 py-2 rounded-full shadow-md border-l-4 border-${feature.color}-500`}
                  >
                    <div className="mr-3">
                      <feature.icon />
                    </div>
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap justify-center gap-8 mb-8"
              >
                {[
                  { number: "150+", label: "Resursa" },
                  { number: "25", label: "Kategorija" },
                  { number: "50+", label: "Centara koristi" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1, type: "spring" }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary text-lg px-8 py-4"
                  onClick={() => document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Istražite resurse
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section id="resources" className="py-8 -mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Enhanced Search */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Pretražite resurse
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Unesite ključne reči..."
                    className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  />
                  <motion.div
                    className="absolute right-4 top-4"
                    animate={searchTerm ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Category Filter */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                  </svg>
                  Kategorija
                </label>
                <Dropdown
                  options={[
                    { 
                      value: 'all', 
                      label: 'Sve kategorije',
                      icon: (
                        <motion.svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 16 16" 
                          className="text-accent-500"
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <path d="M8 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" fill="currentColor" />
                        </motion.svg>
                      )
                    },
                    ...Object.entries(categoryLabels).map(([value, label]) => ({
                      value,
                      label,
                      icon: getCategoryIcon(value)
                    }))
                  ]}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  placeholder="Izaberite kategoriju"
                  size="lg"
                  variant="outlined"
                />
              </motion.div>
            </div>

            {/* Active filters display */}
            {(searchTerm || selectedCategory !== 'all') && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 pt-6 border-t border-gray-100"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-600 font-medium">Aktivni filteri:</span>
                  
                  {searchTerm && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    >
                      <SearchSVG /> <span className="ml-2">"{searchTerm}"</span>
                      <button
                        onClick={() => setSearchTerm('')}
                        className="ml-2 text-primary-500 hover:text-primary-700"
                      >
                        ×
                      </button>
                    </motion.span>
                  )}
                  
                  {selectedCategory !== 'all' && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium"
                    >
                      <FolderSVG /> <span className="ml-2">{categoryLabels[selectedCategory]}</span>
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className="ml-2 text-secondary-500 hover:text-secondary-700"
                      >
                        ×
                      </button>
                    </motion.span>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600">Učitavanje resursa...</p>
            </div>
          ) : (
            <>
              {/* Featured Resources */}
              {filteredResources?.some((r: Resource) => r.featured) && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Istaknuti resursi</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources
                      ?.filter((r: Resource) => r.featured)
                      .map((resource: Resource) => (
                        <ResourceCard
                          key={resource._id}
                          resource={resource}
                          onDownload={handleDownload}
                          featured
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* All Resources */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  {selectedCategory === 'all' ? 'Svi resursi' : categoryLabels[selectedCategory]}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources
                    ?.filter((r: Resource) => !r.featured)
                    .map((resource: Resource) => (
                      <ResourceCard
                        key={resource._id}
                        resource={resource}
                        onDownload={handleDownload}
                      />
                    ))}
                </div>
              </div>

              {filteredResources?.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">Nema resursa koji odgovaraju vašoj pretrazi.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lead Capture Modal */}
      <AnimatePresence>
        {showLeadForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLeadForm(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Preuzmite resurs
                </h3>
                <p className="text-gray-600 mb-6">
                  Ostavite svoje podatke da biste preuzeli:
                  <span className="font-semibold block mt-2">{selectedResource?.title}</span>
                </p>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ime i prezime
                    </label>
                    <input
                      type="text"
                      required
                      value={leadInfo.name}
                      onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email adresa
                    </label>
                    <input
                      type="email"
                      required
                      value={leadInfo.email}
                      onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Telefon (opciono)
                    </label>
                    <input
                      type="tel"
                      value={leadInfo.phone}
                      onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Slanje...
                      </span>
                    ) : (
                      'Preuzmi resurs'
                    )}
                  </motion.button>
                </form>

                <button
                  onClick={() => setShowLeadForm(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Download Progress Modal */}
      <DownloadProgressModal
        isOpen={downloadProgress.isOpen}
        onClose={() => setDownloadProgress(prev => ({ ...prev, isOpen: false }))}
        fileName={downloadProgress.fileName}
        progress={downloadProgress.progress}
        error={downloadProgress.error}
      />
    </main>
  )
}

// Resource Card Component
function ResourceCard({ 
  resource, 
  onDownload, 
  featured = false 
}: { 
  resource: Resource
  onDownload: (resource: Resource) => void
  featured?: boolean 
}) {
  // Get card color based on category
  const getCategoryColor = (category: string) => {
    const colors = {
      franchise_guide: 'primary',
      methodology: 'secondary', 
      business_plans: 'accent',
      marketing: 'warm',
      training: 'primary',
      legal: 'secondary',
      case_studies: 'accent'
    }
    return colors[category as keyof typeof colors] || 'primary'
  }

  const cardColor = getCategoryColor(resource.category)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 border-l-4 border-${cardColor}-500 ${
        featured ? `ring-2 ring-${cardColor}-400 shadow-2xl shadow-${cardColor}-500/20` : 'hover:shadow-2xl'
      }`}
    >
      {featured && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-${cardColor}-500 text-white text-xs font-bold py-2 px-4 text-center relative`}
        >
          <span className="flex items-center justify-center">
            <Star size={16} className="mr-1" fill="currentColor" /> ISTAKNUTO
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="ml-2"
            >
              <Sparkles size={16} />
            </motion.span>
          </span>
        </motion.div>
      )}
      
      <div className="p-6">
        {/* Header with icon and category */}
        <div className="flex items-start justify-between mb-4">
          <motion.div 
            className="text-4xl"
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {getResourceIcon(resource.resourceType)}
          </motion.div>
          <span className={`text-xs bg-${cardColor}-100 text-${cardColor}-700 px-3 py-1 rounded-full font-semibold border border-${cardColor}-200`}>
            {categoryLabels[resource.category]}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2 hover:text-gray-700 transition-colors">
          {resource.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {resource.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {resource.tags?.slice(0, 3).map((tag, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`text-xs bg-${cardColor}-50 text-${cardColor}-600 px-2 py-1 rounded-full border border-${cardColor}-200 font-medium`}
            >
              #{tag}
            </motion.span>
          ))}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-5 bg-gray-50 rounded-lg p-3">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span>{formatFileSize(resource.fileSize * 1024 * 1024)}</span>
          </div>
          {resource.pages && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{resource.pages} str.</span>
            </div>
          )}
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            <span>{resource.downloadCount || 0}</span>
          </div>
        </div>

        {/* Enhanced Download Button */}
        <motion.button
          onClick={() => onDownload(resource)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full bg-${cardColor}-500 hover:bg-${cardColor}-600 text-white py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
        >
          {resource.requiresLead ? (
            <>
              <motion.svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </motion.svg>
              Preuzmi (registracija)
            </>
          ) : (
            <>
              <motion.svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ y: [0, 2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </motion.svg>
              Preuzmi besplatno
            </>
          )}
        </motion.button>
      </div>

      {/* Hover glow effect */}
      <div className={`absolute inset-0 bg-${cardColor}-50 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl`} />
    </motion.div>
  )
}