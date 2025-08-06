import { Metadata } from 'next'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import Image from 'next/image'
import { FloatingLetters, AnimatedTitle, PulseButton } from '@/components/animations'
import { getAllBlogPosts, getFeaturedBlogPosts, getAllBlogCategories, type BlogPost, type BlogCategory } from '@/sanity/queries/blog'
import { StarIcon, PencilIcon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Blog | Srećno učenje',
  description: 'Saveti, vesti i edukativni sadržaji o brzočitanju, metodologiji učenja i dečjem razvoju.',
  keywords: ['blog', 'saveti', 'edukacija', 'brzočitanje', 'metodologija', 'dečji razvoj'],
}

export default async function BlogPage() {
  // Fetch data using our new queries
  const [posts, featuredPosts, categories] = await Promise.all([
    getAllBlogPosts(),
    getFeaturedBlogPosts(),
    getAllBlogCategories()
  ])

  const featuredPost = featuredPosts?.[0] || null

  const themeColors = {
    primary: { gradient: 'from-primary-500 to-primary-600', bg: 'bg-primary-50', text: 'text-primary-600' },
    secondary: { gradient: 'from-secondary-500 to-secondary-600', bg: 'bg-secondary-50', text: 'text-secondary-600' },
    accent: { gradient: 'from-accent-500 to-accent-600', bg: 'bg-accent-50', text: 'text-accent-600' },
    warm: { gradient: 'from-warm-500 to-warm-600', bg: 'bg-warm-50', text: 'text-warm-600' },
    red: { gradient: 'from-red-500 to-red-600', bg: 'bg-red-50', text: 'text-red-600' },
    purple: { gradient: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', text: 'text-purple-600' }
  }

  return (
    <main className="relative">
      {/* Hero sekcija */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 overflow-hidden">
        <FloatingLetters 
          className="opacity-20"
          count={15}
          speed="slow"
          letters={['Б', 'Л', 'О', 'Г']}
        />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedTitle 
              text="Blog"
              className="text-4xl lg:text-6xl font-bold mb-6"
            />
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              Saveti, vesti i edukativni sadržaji o brzočitanju, metodologiji učenja i dečjem razvoju
            </p>
            
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => {
                  const theme = themeColors[category.color] || themeColors.primary
                  return (
                    <SafeLink                       key={category._id}
                      href={`/blog/kategorija/${category.slug?.current || 'no-slug'}`}
                      className={`px-4 py-2 rounded-full ${theme.bg} ${theme.text} font-medium hover:scale-105 transition-transform`}
                    >
                      {category.name}
                      {category.postCount && (
                        <span className="ml-2 text-sm opacity-75">({category.postCount})</span>
                      )}
                    </SafeLink>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Istaknut članak */}
      {featuredPost && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Istaknut članak
                </h2>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Slika */}
                  <div className="relative h-64 lg:h-auto">
                    {featuredPost.featuredImage?.asset?.url ? (
                      <Image
                        src={featuredPost.featuredImage.asset.url}
                        alt={featuredPost.featuredImage.alt || featuredPost.title}
                        fill
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL={featuredPost.featuredImage.asset.metadata?.lqip || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <PencilIcon size={48} className="text-gray-400" />
                      </div>
                    )}
                    
                    {/* Featured badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-accent-500 text-white">
                        <StarIcon size={16} className="text-white" />
                        <span>Istaknut članak</span>
                      </span>
                    </div>
                    
                    {/* Category badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        themeColors[featuredPost.category.color]?.bg || 'bg-gray-100'
                      } ${themeColors[featuredPost.category.color]?.text || 'text-gray-700'}`}>
                        {featuredPost.category.name}
                      </span>
                    </div>
                  </div>
                  
                  {/* Sadržaj */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    {/* Meta informacije */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        {featuredPost.author.image && (
                          <Image
                            src={featuredPost.author.image.asset.url}
                            alt={featuredPost.author.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                            placeholder="blur"
                            blurDataURL={featuredPost.author.image.asset.metadata.lqip}
                          />
                        )}
                        <span>{featuredPost.author.name}</span>
                      </div>
                      
                      <span>•</span>
                      <span>{new Date(featuredPost.publishedDate).toLocaleDateString('sr-RS')}</span>
                      
                      <span>•</span>
                      <span>{featuredPost.readingTime} min čitanja</span>
                    </div>
                    
                    <SafeLink href={`/blog/${featuredPost.slug?.current || 'no-slug'}`}>
                      <PulseButton 
                        variant="primary"
                        size="lg"
                      >
                        Pročitajte više
                      </PulseButton>
                    </SafeLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Svi članci */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Svi članci
              </h2>
              <p className="text-lg text-gray-600">
                Istražite naše najnovije članke i savete
              </p>
            </div>
            
            {posts && posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts
                  .filter(post => !post.isFeatured) // Ne prikazuj istaknut članak ponovo
                  .map((post) => (
                    <SafeLink                       key={post._id}
                      href={`/blog/${post.slug?.current || 'no-slug'}`}
                      className="group"
                    >
                      <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:transform group-hover:scale-105">
                        {/* Slika članka */}
                        <div className="relative h-48 overflow-hidden">
                          {post.featuredImage?.asset?.url ? (
                            <Image
                              src={post.featuredImage.asset.url}
                              alt={post.featuredImage.alt || post.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              placeholder="blur"
                              blurDataURL={post.featuredImage.asset.metadata?.lqip || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <PencilIcon size={48} className="text-gray-400" />
                            </div>
                          )}
                          
                          {/* Category overlay */}
                          <div className="absolute top-4 left-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              themeColors[post.category.color]?.bg || 'bg-gray-100'
                            } ${themeColors[post.category.color]?.text || 'text-gray-700'}`}>
                              {post.category.name}
                            </span>
                          </div>
                        </div>
                        
                        {/* Sadržaj */}
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          {/* Meta */}
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                              <span>{post.author.name}</span>
                              <span>•</span>
                              <span>{new Date(post.publishedDate).toLocaleDateString('sr-RS')}</span>
                            </div>
                            <span>{post.readingTime} min</span>
                          </div>
                          
                          {/* Tagovi */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {post.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                >
                                  #{tag}
                                </span>
                              ))}
                              {post.tags.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{post.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </article>
                    </SafeLink>
                  ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="flex justify-center mb-4">
                  <PencilIcon size={64} className="text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Nema objavljenih članaka
                </h3>
                <p className="text-gray-500">
                  Prvi članci će biti objavljeni uskoro. Pratite nas!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter sekcija */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 relative overflow-hidden">
        <FloatingLetters 
          className="opacity-10"
          count={20}
          speed="medium"
          colors={['#ffffff']}
          letters={['Н', 'Е', 'В', 'С']}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Pratite najnovije članke
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Prijavite se na naš newsletter i budite u toku sa najnovijim savetima i inovacijama
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Vaša email adresa"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <PulseButton 
                variant="accent"
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-100"
              >
                Prijavite se
              </PulseButton>
            </div>
            
            <p className="text-sm opacity-75 mt-4">
              Bez spam-a. Možete se odjaviti u bilo kom trenutku.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}