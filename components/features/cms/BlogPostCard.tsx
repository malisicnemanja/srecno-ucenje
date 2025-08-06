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
      className="c-blog-card"
    >
      <div className="c-blog-card__image">
        {post.featuredImage ? (
          <Image
            src={urlFor(post.featuredImage).width(400).height(200).url()}
            alt={post.title}
            fill
            className="c-blog-card__img"
          />
        ) : (
          <div className="c-blog-card__placeholder">
            <svg className="c-blog-card__placeholder-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}
        <div className="c-blog-card__category">
          {post.category && (
            <span className="c-blog-card__category-tag">
              {post.category.title}
            </span>
          )}
        </div>
      </div>
      
      <div className="c-blog-card__content">
        <h3 className="c-blog-card__title">
          {post.title}
        </h3>
        
        <p className="c-blog-card__excerpt">
          {post.excerpt}
        </p>
        
        <div className="c-blog-card__meta">
          <div className="c-blog-card__author">
            {post.author && (
              <>
                <div className="c-blog-card__avatar">
                  <span className="c-blog-card__avatar-text">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <span>{post.author.name}</span>
                <span className="c-blog-card__separator">•</span>
              </>
            )}
            <span>{publishDate}</span>
          </div>
          {post.readTime && (
            <div className="c-blog-card__read-time">
              <svg className="c-blog-card__time-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{post.readTime} min</span>
            </div>
          )}
        </div>
        
        <SafeLink           href={`/blog/${post.slug?.current || 'no-slug'}`}
          className="c-blog-card__link"
        >
          Pročitajte više
          <svg className="c-blog-card__arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </SafeLink>
      </div>
    </motion.article>
  )
}