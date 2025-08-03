'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Book3DPreviewProps {
  title: string
  coverColor: string
  emoji: string
  pages?: string[]
  className?: string
  author?: string
  pageImages?: string[]
}

export default function Book3DPreview({ 
  title, 
  coverColor, 
  emoji,
  pages = [],
  className = '',
  author = '',
  pageImages = []
}: Book3DPreviewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  const handleFlip = () => {
    if (isFlipping) return
    
    if (!isOpen) {
      setIsOpen(true)
      setIsFlipping(true)
      setTimeout(() => setIsFlipping(false), 600)
    } else if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1)
      setIsFlipping(true)
      setTimeout(() => setIsFlipping(false), 600)
    }
  }

  const handlePrevious = () => {
    if (isFlipping || currentPage === 0) return
    
    setCurrentPage(currentPage - 1)
    setIsFlipping(true)
    setTimeout(() => setIsFlipping(false), 600)
  }

  const handleClose = () => {
    if (isFlipping) return
    
    setIsOpen(false)
    setCurrentPage(0)
    setIsFlipping(true)
    setTimeout(() => setIsFlipping(false), 600)
  }

  return (
    <div className={`relative perspective-1000 ${className}`}>
      <motion.div
        className="relative w-64 h-80 preserve-3d"
        animate={{
          rotateY: isOpen ? -30 : 0,
        }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        {/* Book Cover */}
        <motion.div
          className={`absolute inset-0 ${coverColor} rounded-r-lg shadow-xl backface-hidden cursor-pointer`}
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateY(0deg)',
          }}
          onClick={handleFlip}
        >
          {/* Front cover */}
          <div className="relative w-full h-full p-6 flex flex-col items-center justify-center text-white">
            {/* Book spine */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-black/20" />
            
            {/* Cover decorations */}
            <motion.div
              className="absolute top-4 right-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-12 h-12 border-2 border-white/30 rounded-full" />
            </motion.div>

            <motion.div
              className="absolute bottom-4 left-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-8 h-8 bg-white/20 rounded-full" />
            </motion.div>

            <motion.div
              className="text-6xl mb-4"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {emoji}
            </motion.div>
            
            <h3 className="text-lg font-bold text-center leading-tight px-4 mb-2">
              {title}
            </h3>
            
            {author && (
              <p className="text-sm opacity-80">{author}</p>
            )}
            
            <div className="absolute bottom-8 text-xs opacity-70">
              Klikni da otvoriš
            </div>
          </div>
        </motion.div>

        {/* Pages */}
        {isOpen && pages.map((page, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-white rounded-lg shadow-lg backface-hidden"
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'left center',
              zIndex: pages.length - index,
            }}
            initial={{ rotateY: 0 }}
            animate={{
              rotateY: index <= currentPage ? -180 : 0,
              x: index <= currentPage ? -10 : 0,
            }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.05,
              type: "spring",
              stiffness: 100
            }}
          >
            {/* Page content */}
            <div className="relative h-full p-8">
              {/* Page header */}
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-4">
                Stranica {index + 1} od {pages.length}
              </div>
              
              {/* Main content */}
              <div className="h-full flex flex-col justify-between">
                {pageImages && pageImages[index] ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-4xl">{pageImages[index]}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1">
                    <p className="text-gray-700 text-sm leading-relaxed">{page}</p>
                  </div>
                )}
                
                {/* Page footer */}
                <div className="flex justify-between items-center mt-4">
                  {index > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePrevious()
                      }}
                      className="text-xs text-primary-600 hover:text-primary-700 transition-colors"
                      disabled={isFlipping}
                    >
                      ← Prethodna
                    </button>
                  )}
                  <div className="flex-1" />
                  {index < pages.length - 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleFlip()
                      }}
                      className="text-xs text-primary-600 hover:text-primary-700 transition-colors"
                      disabled={isFlipping}
                    >
                      Sledeća →
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Page decoration */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-gray-50 to-transparent" />
          </motion.div>
        ))}

        {/* Back cover */}
        {isOpen && (
          <motion.div
            className={`absolute inset-0 ${coverColor} rounded-l-lg shadow-xl backface-hidden cursor-pointer`}
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateY(180deg)',
              zIndex: -1,
            }}
            onClick={handleClose}
          >
            <div className="relative w-full h-full p-8 flex flex-col items-center justify-center text-white">
              {/* Back spine */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-black/20" />
              
              {/* Logo/Icon */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-4xl mb-4 block">{emoji}</span>
              </motion.div>
              
              <p className="text-sm text-center mb-4 opacity-80">
                Hvala što čitate!
              </p>
              
              <motion.button
                className="px-4 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Zatvori knjigu
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* 3D shadow effect */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-black/20 rounded-full blur-xl"
        animate={{
          scaleX: isOpen ? 1.2 : 1,
          opacity: isOpen ? 0.3 : 0.2
        }}
      />
      
      {/* Page indicator */}
      {isOpen && pages.length > 0 && (
        <motion.div
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {pages.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentPage 
                  ? 'bg-primary-600' 
                  : index < currentPage 
                    ? 'bg-primary-300' 
                    : 'bg-gray-300'
              }`}
              animate={{
                scale: index === currentPage ? 1.2 : 1
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}