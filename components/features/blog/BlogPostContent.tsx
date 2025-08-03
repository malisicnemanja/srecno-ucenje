'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/sanity.client'

interface Author {
  name: string
  title?: string
}

interface Category {
  _id: string
  title: string
  slug: { current: string }
}

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  featuredImage?: any
  author?: Author
  category?: Category
  content?: string
  publishedAt: string
  readTime?: number
}

interface BlogPostContentProps {
  post: BlogPost
  relatedPosts?: BlogPost[]
}

export default function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString('sr-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <main className="min-h-screen">
      {/* Hero Image */}
      {post.featuredImage && (
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <Image
            src={urlFor(post.featuredImage).width(1200).height(500).url()}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      )}

      {/* Article Header */}
      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`py-12 md:py-20 ${!post.featuredImage ? 'bg-gradient-to-b from-purple-50 to-white' : '-mt-32 relative z-10'}`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="mb-6">
                {post.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                    {post.category.title}
                  </span>
                )}
                {post.readTime && (
                  <span className="ml-4 text-gray-600 text-sm">
                    {post.readTime} min čitanja
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
              
              <div className="flex items-center text-gray-600 border-t pt-6">
                {post.author && (
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-semibold">
                        {post.author.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{post.author.name}</div>
                      {post.author.title && (
                        <div className="text-sm text-gray-500">{post.author.title}</div>
                      )}
                    </div>
                  </div>
                )}
                <div className="ml-auto text-sm">
                  {publishedDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.article>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="prose prose-lg prose-purple max-w-none bg-white rounded-xl shadow-lg p-8 md:p-12"
            >
              {post.content && (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              )}
            </motion.div>

            {/* Share Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 pt-8 border-t bg-white rounded-xl shadow-lg p-8"
            >
              <h3 className="text-xl font-semibold mb-6 text-center">Podelite ovaj članak</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                  Facebook
                </button>
                <button 
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                  className="flex items-center bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition-colors transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  Twitter
                </button>
                <button 
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`, '_blank')}
                  className="flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 1.67.408 3.245 1.129 4.634L0 20l5.516-1.097A9.957 9.957 0 0010 20c5.523 0 10-4.477 10-10z" />
                  </svg>
                  WhatsApp
                </button>
                <button 
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="flex items-center bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Kopiraj link
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts && relatedPosts.length > 0 && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="py-16 bg-gradient-to-b from-gray-50 to-white"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Povezani članci
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedPosts.slice(0, 3).map((relatedPost: any, index: number) => (
                <motion.article 
                  key={relatedPost._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {relatedPost.featuredImage && (
                    <div className="relative h-48">
                      <Image
                        src={urlFor(relatedPost.featuredImage).width(400).height(200).url()}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {relatedPost.category && (
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full mb-3">
                        {relatedPost.category.title}
                      </span>
                    )}
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                    <a
                      href={`/blog/${relatedPost.slug.current}`}
                      className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors"
                    >
                      Pročitajte više
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Newsletter CTA */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="py-16 bg-gradient-to-br from-purple-600 to-purple-700 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prijavite se na naš Newsletter
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Budite u toku sa najnovijim savetima i tehnikama za učenje
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Vaša email adresa"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105"
                >
                  Prijavite se
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.section>
    </main>
  )
}