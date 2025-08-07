import { Metadata } from 'next'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { FloatingLetters, PulseButton } from '@/components/animations'
import { BrushUnderline, BrushStrokeText } from '@/components/animations/BrushUnderline'
import { Button } from '@/components/ui/Button'
import { 
  Icons,
  BookIcon,
  ClockIcon,
  HeartIcon,
  EmailIcon,
  ChatIcon,
  ArrowRightIcon,
  StarIcon
} from '@/components/ui/Icons'
import { getBlogPostBySlug, getRelatedBlogPosts, getAllBlogPosts, type BlogPost } from '@/sanity/queries/blog'
import StructuredData from '@/components/common/StructuredData'
import { generateBlogPostMetadata, generateBlogPostStructuredData, baseUrl } from '@/lib/seo-config'

interface Props {
  params: { slug: string }
}


// Social Share Component
function SocialShare({ title, url }: { title: string; url: string }) {
  const shareData = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-700 font-medium">Podelite:</span>
      <div className="flex items-center gap-2">
        <a
          href={shareData.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-transparent text-[#5DBFDB] border-2 border-[#5DBFDB] rounded-lg hover:bg-[#5DBFDB] hover:text-white transition-all duration-300"
        >
          <ChatIcon size={16} />
          Facebook
        </a>
        <a
          href={shareData.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-transparent text-[#5DBFDB] border-2 border-[#5DBFDB] rounded-lg hover:bg-[#5DBFDB] hover:text-white transition-all duration-300"
        >
          <ChatIcon size={16} />
          Twitter
        </a>
        <a
          href={shareData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-transparent text-[#91C733] border-2 border-[#91C733] rounded-lg hover:bg-[#91C733] hover:text-white transition-all duration-300"
        >
          <ChatIcon size={16} />
          LinkedIn
        </a>
        <a
          href={shareData.email}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-transparent text-[#E53935] border-2 border-[#E53935] rounded-lg hover:bg-[#E53935] hover:text-white transition-all duration-300"
        >
          <EmailIcon size={16} />
          Email
        </a>
      </div>
    </div>
  )
}

// Newsletter Signup Component - Server-side rendered version
function NewsletterSignup() {
  return (
    <div className="bg-[#F4C950] rounded-2xl p-8 text-center">
      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <EmailIcon size={32} className="text-white" />
      </div>
      
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          <BrushStrokeText 
            wordsToHighlight={['newsletter']}
            brushColor="#1E293B"
            brushVariant="underline"
          >
            Prijavite se za naš newsletter
          </BrushStrokeText>
        </h3>
        <p className="text-lg text-white/90">
          Budite prvi koji će saznati za nove članke i savete za srećno učenje!
        </p>
      </div>
      
      <form action="/api/newsletter" method="POST" className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            name="email"
            placeholder="Unesite vašu email adresu"
            required
            className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-3 text-base font-medium bg-[#1E293B] text-white border-2 border-[#1E293B] rounded-lg hover:bg-transparent hover:text-[#1E293B] transition-all duration-300 whitespace-nowrap"
          >
            Prijavite se
          </button>
        </div>
      </form>
    </div>
  )
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post: BlogPost) => ({
    slug: post.slug.current,
  }))
}

// Generate metadata for each blog post with comprehensive SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Članak nije pronađen - Srećno učenje',
      description: 'Traženi članak nije pronađen. Vratite se na blog i istražite druge korisne članke o brzom čitanju i memoriji.',
      robots: {
        index: false,
        follow: false
      }
    }
  }

  return generateBlogPostMetadata(params.slug, post)
}


// Reading progress bar component removed for build compatibility

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts
  const relatedPosts = await getRelatedBlogPosts(post._id, post.category._id, post.tags)
  
  // Generate structured data
  const structuredData = generateBlogPostStructuredData(params.slug, post)
  
  // Generate breadcrumb structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Početna",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.category?.name || "Članci",
        "item": `${baseUrl}/blog/kategorija/${post.category?.slug?.current || 'opste'}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": post.title,
        "item": `${baseUrl}/blog/${params.slug}`
      }
    ]
  }

  const brandColors = {
    primary: { bg: '#5DBFDB', light: '#E0F7FA', text: '#0D7377' },
    secondary: { bg: '#F4C950', light: '#FFF8E1', text: '#F57C00' },
    accent: { bg: '#91C733', light: '#F1F8E9', text: '#4A5A2C' },
    warm: { bg: '#E53935', light: '#FFEBEE', text: '#B71C1C' },
    night: { bg: '#1E293B', light: '#F8FAFC', text: '#334155' }
  }

  const theme = brandColors.primary // Use sky color as default
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={structuredData} id="blog-post-structured-data" />
      <StructuredData data={breadcrumbStructuredData} id="blog-breadcrumb-structured-data" />
      
      <main className="relative">
      {/* Reading progress bar removed for build compatibility */}
      
      {/* Hero sekcija */}
      <section className="relative min-h-[70vh] bg-[#5DBFDB] overflow-hidden">
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
              <SafeLink href="/blog" className="hover:text-white transition-colors">
                Blog
              </SafeLink>
              <span>•</span>
              {post.category?.slug?.current && (
                <>
                  <SafeLink 
                    href={`/blog/kategorija/${post.category.slug?.current || 'no-slug'}`}
                    className="hover:text-white transition-colors"
                  >
                    {post.category.title || post.category.name}
                  </SafeLink>
                  <span>•</span>
                </>
              )}
              <span className="text-white/60">{post.title}</span>
            </nav>
            
            {/* Category badge */}
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium">
                <BookIcon size={16} className="mr-2" />
                {post.category.name}
              </span>
            </div>
            
            {/* Title with brush underline */}
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 relative">
              <BrushStrokeText 
                wordsToHighlight={[post.title.split(' ').slice(-2).join(' ')]} // Highlight last 2 words
                brushColor="#F4C950"
                brushVariant="underline"
                brushStyle="rough"
                className="relative z-10"
              >
                {post.title}
              </BrushStrokeText>
            </h1>
            
            {/* Excerpt */}
            <p className="text-xl lg:text-2xl leading-relaxed mb-8 opacity-90">
              {post.excerpt}
            </p>
            
            {/* Meta informacije */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
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
                  <p className="text-sm text-white/70 flex items-center gap-1">
                    <Icons.Pencil size={12} />
                    Autor
                  </p>
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
                <p className="text-sm text-white/70 flex items-center gap-1">
                  <ClockIcon size={12} />
                  {post.readingTime} min čitanja
                </p>
              </div>
              
              <div className="h-12 w-px bg-white/20" />
              
              <div className="flex items-center gap-2">
                <HeartIcon size={16} className="text-[#F4C950]" />
                <span className="text-sm text-white/70">Korisno za učenje</span>
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

      {/* Social sharing */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SocialShare title={post.title} url={currentUrl} />
          </div>
        </div>
      </section>

      {/* Sadržaj članka */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-slate max-w-none">
              {post.content && (
                <PortableText 
                  value={post.content}
                  components={{
                    block: {
                      h1: ({children}) => {
                        const text = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : String(children || '')
                        const words = text.split(' ').filter(Boolean)
                        const lastWord = words.length > 0 ? words[words.length - 1] : ''
                        return (
                          <h1 className="text-3xl font-bold text-[#1E293B] mb-6 mt-12 relative">
                            <BrushStrokeText 
                              wordsToHighlight={lastWord ? [lastWord] : []}
                              brushColor="#91C733"
                              brushVariant="underline"
                            >
                              {text}
                            </BrushStrokeText>
                          </h1>
                        )
                      },
                      h2: ({children}) => {
                        const text = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : String(children || '')
                        const words = text.split(' ').filter(Boolean)
                        const lastWord = words.length > 0 ? words[words.length - 1] : ''
                        return (
                          <h2 className="text-2xl font-bold text-[#1E293B] mb-4 mt-10 relative">
                            <BrushStrokeText 
                              wordsToHighlight={lastWord ? [lastWord] : []}
                              brushColor="#F4C950"
                              brushVariant="underline"
                            >
                              {text}
                            </BrushStrokeText>
                          </h2>
                        )
                      },
                      h3: ({children}) => {
                        const text = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : String(children || '')
                        const words = text.split(' ').filter(Boolean)
                        const lastWord = words.length > 0 ? words[words.length - 1] : ''
                        return (
                          <h3 className="text-xl font-bold text-[#1E293B] mb-4 mt-8 relative">
                            <BrushStrokeText 
                              wordsToHighlight={lastWord ? [lastWord] : []}
                              brushColor="#5DBFDB"
                              brushVariant="underline"
                            >
                              {text}
                            </BrushStrokeText>
                          </h3>
                        )
                      },
                      normal: ({children}) => (
                        <p className="text-gray-700 leading-relaxed mb-6 text-lg">{children}</p>
                      ),
                    },
                    marks: {
                      strong: ({children}) => <strong className="font-semibold text-[#1E293B]">{children}</strong>,
                      em: ({children}) => <em className="italic text-[#5DBFDB]">{children}</em>,
                    }
                  }}
                />
              )}
            </div>
            
            {/* Tagovi */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-[#1E293B] mb-4 flex items-center gap-2">
                  <StarIcon size={20} className="text-[#F4C950]" />
                  Tagovi:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-[#E0F7FA] text-[#0D7377] hover:bg-[#5DBFDB] hover:text-white transition-colors duration-200 cursor-pointer"
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

      {/* Enhanced Author bio */}
      {post.author.bio && (
        <section className="py-16 bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    {post.author.image && (
                      <div className="relative">
                        <Image
                          src={post.author.image.asset.url}
                          alt={post.author.name}
                          width={100}
                          height={100}
                          className="rounded-full border-4 border-[#5DBFDB]/20"
                          placeholder="blur"
                          blurDataURL={post.author.image.asset.metadata.lqip}
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#91C733] rounded-full flex items-center justify-center">
                          <Icons.Check size={16} className="text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-[#1E293B] mb-2 relative">
                        <BrushStrokeText 
                          wordsToHighlight={['autoru']}
                          brushColor="#F4C950"
                          brushVariant="underline"
                        >
                          O autoru: {post.author.name}
                        </BrushStrokeText>
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <Icons.Pencil size={14} />
                        <span>Stručni saradnik</span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full" />
                        <Icons.Trophy size={14} className="text-[#F4C950]" />
                        <span>5+ godina iskustva</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                      {post.author.bio}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="/kontakt"
                        className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-transparent text-[#5DBFDB] border-2 border-[#5DBFDB] rounded-lg hover:bg-[#5DBFDB] hover:text-white transition-all duration-300"
                      >
                        <EmailIcon size={16} />
                        Kontaktirajte autora
                      </a>
                      <a
                        href="/blog"
                        className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-transparent text-[#91C733] border-2 border-[#91C733] rounded-lg hover:bg-[#91C733] hover:text-white transition-all duration-300"
                      >
                        <BookIcon size={16} />
                        Više članaka
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter signup */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* Enhanced Povezani članci */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-[#1E293B] mb-4 relative">
                  <BrushStrokeText 
                    wordsToHighlight={['članci']}
                    brushColor="#E53935"
                    brushVariant="underline"
                    brushStyle="rough"
                  >
                    Povezani članci
                  </BrushStrokeText>
                </h2>
                <p className="text-lg text-gray-600 flex items-center justify-center gap-2">
                  <BookIcon size={20} className="text-[#5DBFDB]" />
                  Istražite više članaka iz slične kategorije
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <SafeLink
                    key={relatedPost._id}
                    href={`/blog/${relatedPost.slug?.current || 'no-slug'}`}
                    className="group"
                  >
                    <article className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:transform group-hover:scale-105 border border-gray-100">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={relatedPost.featuredImage.asset.url}
                          alt={relatedPost.featuredImage.alt || relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          placeholder="blur"
                          blurDataURL={relatedPost.featuredImage.asset.metadata.lqip}
                        />
                        
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-[#1E293B] backdrop-blur-sm">
                            <BookIcon size={12} className="mr-1" />
                            {relatedPost.category.name}
                          </span>
                        </div>
                        
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 bg-[#5DBFDB] rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-[#1E293B] mb-3 line-clamp-2 group-hover:text-[#5DBFDB] transition-colors duration-300">
                          {relatedPost.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                          {relatedPost.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-2">
                            <Icons.Pencil size={12} />
                            <span>{relatedPost.author.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ClockIcon size={12} />
                            <span>{relatedPost.readingTime} min</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <Button
                            variant="outline"
                            color="sky"
                            size="sm"
                            fullWidth
                            rightIcon={<ArrowRightIcon size={14} />}
                            className="group-hover:bg-[#5DBFDB] group-hover:text-white group-hover:border-[#5DBFDB]"
                          >
                            Pročitajte više
                          </Button>
                        </div>
                      </div>
                    </article>
                  </SafeLink>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced CTA sekcija */}
      <section className="py-20 bg-[#1E293B] relative overflow-hidden">
        <FloatingLetters 
          className="opacity-10"
          count={20}
          speed="medium"
          colors={['#5DBFDB', '#F4C950', '#91C733']}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="mb-8">
              <div className="w-16 h-16 bg-[#5DBFDB]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookIcon size={32} className="text-[#5DBFDB]" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 relative">
                <BrushStrokeText 
                  wordsToHighlight={['članaka']}
                  brushColor="#F4C950"
                  brushVariant="underline"
                  brushStyle="rough"
                >
                  Istražite više članaka
                </BrushStrokeText>
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Otkrijte još saveta i priča iz sveta srećnog učenja
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SafeLink href="/blog">
                <Button 
                  variant="filled"
                  color="sky"
                  size="lg"
                  leftIcon={<BookIcon size={20} />}
                  className="min-w-[180px]"
                >
                  Svi članci
                </Button>
              </SafeLink>
              
              {post.category?.slug?.current && (
                <SafeLink href={`/blog/kategorija/${post.category.slug?.current || 'no-slug'}`}>
                  <Button 
                    variant="outline"
                    color="sun"
                    size="lg"
                    leftIcon={<StarIcon size={20} />}
                    className="min-w-[180px] border-[#F4C950] text-[#F4C950] hover:bg-[#F4C950] hover:text-white"
                  >
                    Više iz kategorije
                  </Button>
                </SafeLink>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}