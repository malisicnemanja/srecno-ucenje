'use client'

import Link from 'next/link'

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
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="h-48 bg-gray-200">
        {/* Placeholder za sliku */}
      </div>
      <div className="p-6">
        {post.category && (
          <span className="text-blue-600 text-sm font-medium">
            {post.category.title}
          </span>
        )}
        <h3 className="text-xl font-semibold mt-2 mb-3">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          {post.author && (
            <>
              <span>{post.author.name}</span>
              <span className="mx-2">•</span>
            </>
          )}
          <span>{publishDate}</span>
          {post.readTime && (
            <>
              <span className="mx-2">•</span>
              <span>{post.readTime} min čitanja</span>
            </>
          )}
        </div>
        <Link
          href={`/blog/${post.slug?.current || 'no-slug'}`}
          className="text-blue-600 font-medium hover:text-blue-700"
        >
          Pročitajte više →
        </Link>
      </div>
    </article>
  )
}