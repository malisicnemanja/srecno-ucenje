import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { FloatingLetters, PulseButton } from '@/components/animations'
import { getBlogPostBySlug, getRelatedBlogPosts, getAllBlogPosts, type BlogPost } from '@/sanity/queries/blog'

interface Props {
  params: { slug: string }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post: BlogPost) => ({
    slug: post.slug.current,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Članak nije pronađen',
    }
  }

  return {
    title: post.seo?.metaTitle || `${post.title} | Blog`,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage?.asset?.url ? [post.featuredImage.asset.url] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts
  const relatedPosts = await getRelatedBlogPosts(post._id, post.category._id, post.tags)

  const themeColors = {
    primary: { gradient: 'from-primary-500 to-primary-600', bg: 'bg-primary-50', text: 'text-primary-600' },
    secondary: { gradient: 'from-secondary-500 to-secondary-600', bg: 'bg-secondary-50', text: 'text-secondary-600' },
    accent: { gradient: 'from-accent-500 to-accent-600', bg: 'bg-accent-50', text: 'text-accent-600' },
    warm: { gradient: 'from-warm-500 to-warm-600', bg: 'bg-warm-50', text: 'text-warm-600' },
    red: { gradient: 'from-red-500 to-red-600', bg: 'bg-red-50', text: 'text-red-600' },
    purple: { gradient: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', text: 'text-purple-600' }
  }

  const theme = themeColors[post.category.color] || themeColors.primary

  return (
    <main className="relative">
      {/* Hero sekcija */}
      <section className={`relative min-h-[70vh] bg-gradient-to-br ${theme.gradient} overflow-hidden`}>
        <FloatingLetters 
          className="opacity-20"
          count={15}
          speed="slow"
          colors={['#ffffff']}
        />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-white">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/80 text-sm mb-8">
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <span>•</span>
              <Link 
                href={`/blog/kategorija/${post.category.slug.current}`}
                className="hover:text-white transition-colors"
              >
                {post.category.name}
              </Link>
              <span>•</span>
              <span className="text-white/60">{post.title}</span>
            </nav>
            
            {/* Category badge */}
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium">
                {post.category.name}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              {post.title}
            </h1>
            
            {/* Excerpt */}
            <p className="text-xl lg:text-2xl leading-relaxed mb-8 opacity-90">
              {post.excerpt}
            </p>
            
            {/* Meta informacije */}
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-3">
                {post.author.image && (
                  <Image
                    src={post.author.image.asset.url}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-white/20"
                    placeholder="blur"
                    blurDataURL={post.author.image.asset.metadata.lqip}
                  />
                )}
                <div>
                  <p className="font-medium text-white">{post.author.name}</p>
                  <p className="text-sm text-white/70">Autor</p>
                </div>
              </div>
              
              <div className="h-12 w-px bg-white/20" />
              
              <div>
                <p className="font-medium text-white">
                  {new Date(post.publishedDate).toLocaleDateString('sr-RS', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-sm text-white/70">{post.readingTime} min čitanja</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured image */}
      {post.featuredImage && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={post.featuredImage.asset.url}
                  alt={post.featuredImage.alt || post.title}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={post.featuredImage.asset.metadata.lqip}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sadržaj članka */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {post.content && (
                <PortableText 
                  value={post.content}
                  components={{
                    block: {
                      h1: ({children}) => <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-12">{children}</h1>,
                      h2: ({children}) => <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-10">{children}</h2>,
                      h3: ({children}) => <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">{children}</h3>,
                      normal: ({children}) => <p className="text-gray-700 leading-relaxed mb-6">{children}</p>,
                    },
                    marks: {
                      strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                      em: ({children}) => <em className="italic">{children}</em>,
                    }
                  }}
                />
              )}
            </div>
            
            {/* Tagovi */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tagovi:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${theme.bg} ${theme.text}`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Author bio */}
      {post.author.bio && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start gap-6">
                  {post.author.image && (
                    <Image
                      src={post.author.image.asset.url}
                      alt={post.author.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                      placeholder="blur"
                      blurDataURL={post.author.image.asset.metadata.lqip}
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      O autoru: {post.author.name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {post.author.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Povezani članci */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Povezani članci
                </h2>
                <p className="text-lg text-gray-600">
                  Istražite više članaka iz slične kategorije
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => {
                  const relatedTheme = themeColors[relatedPost.category.color] || themeColors.primary
                  
                  return (
                    <Link
                      key={relatedPost._id}
                      href={`/blog/${relatedPost.slug.current}`}
                      className="group"
                    >
                      <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:transform group-hover:scale-105">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={relatedPost.featuredImage.asset.url}
                            alt={relatedPost.featuredImage.alt || relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            placeholder="blur"
                            blurDataURL={relatedPost.featuredImage.asset.metadata.lqip}
                          />
                          
                          <div className="absolute top-4 left-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${relatedTheme.bg} ${relatedTheme.text}`}>
                              {relatedPost.category.name}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {relatedPost.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                            {relatedPost.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{relatedPost.author.name}</span>
                            <span>{relatedPost.readingTime} min</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA sekcija */}
      <section className={`py-20 bg-gradient-to-r ${theme.gradient} relative overflow-hidden`}>
        <FloatingLetters 
          className="opacity-10"
          count={20}
          speed="medium"
          colors={['#ffffff']}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Istražite više članaka
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Otkrijte još saveta i priča iz sveta srećnog učenja
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PulseButton 
                variant="accent"
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100"
                onClick={() => window.location.href = '/blog'}
              >
                Svi članci
              </PulseButton>
              
              <PulseButton 
                variant="secondary"
                size="lg"
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900"
                onClick={() => window.location.href = `/blog/kategorija/${post.category.slug.current}`}
              >
                Više iz kategorije
              </PulseButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}