'use client'

import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/sanity.client'

interface Author {
  name: string
  title?: string
}

interface Category {
  title: string
  slug: { current: string }
}

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  featuredImage?: any
  author?: Author
  category?: Category
  publishedAt: string | Date
  readTime?: number
}

interface BlogPostCardProps {
  post: BlogPost
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const publishDate = new Date(post.publishedAt).toLocaleDateString('sr-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        {post.featuredImage ? (
          <Image
            src={urlFor(post.featuredImage).width(400).height(200).url()}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-full bg-gray-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}
        {post.category && (
          <div className="absolute top-4 left-4">
            <span className="bg-brand-grass text-white px-3 py-1 rounded-full text-sm font-medium">
              {post.category.title}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-brand-grass transition-colors duration-200">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-2">
            {post.author && (
              <>
                <div className="w-8 h-8 bg-brand-grass rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <span className="font-medium">{post.author.name}</span>
                <span>•</span>
              </>
            )}
            <span>{publishDate}</span>
          </div>
          {post.readTime && (
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{post.readTime} min</span>
            </div>
          )}
        </div>
        
        <SafeLink
          href={`/blog/${post.slug?.current || 'no-slug'}`}
          className="inline-flex items-center text-brand-grass font-semibold hover:underline transition-all duration-200"
        >
          Pročitajte više
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </SafeLink>
      </div>
    </motion.article>
  )
}