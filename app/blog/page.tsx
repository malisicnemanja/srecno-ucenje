import { Metadata } from 'next'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import Image from 'next/image'
import { FloatingLetters, AnimatedTitle, PulseButton } from '@/components/animations'
import { getAllBlogPosts, getFeaturedBlogPosts, getAllBlogCategories, type BlogPost, type BlogCategory } from '@/sanity/queries/blog'
import { Icons } from '@/components/ui/Icons'
import { Button } from '@/components/ui/Button'
import BrushUnderline from '@/components/ui/BrushUnderline'
import AlternatingText from '@/components/ui/AlternatingText'
import StructuredData from '@/components/common/StructuredData'
import { getPageMetadata, baseUrl } from '@/lib/seo-config'

export const metadata: Metadata = getPageMetadata('/blog')

export default async function BlogPage() {
  // Fetch data using our new queries
  const [posts, featuredPosts, categories] = await Promise.all([
    getAllBlogPosts(),
    getFeaturedBlogPosts(),
    getAllBlogCategories()
  ])

  const featuredPost = featuredPosts?.[0] || null
  
  // Generate structured data for blog
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${baseUrl}/blog#blog`,
    "name": "Srećno učenje Blog",
    "description": "Stručni članci o brzom čitanju, memoriji, koncentraciji i obrazovnim tehnikama za decu",
    "url": `${baseUrl}/blog`,
    "inLanguage": "sr-RS",
    "publisher": {
      "@type": "Organization",
      "@id": `${baseUrl}#organization`,
      "name": "Srećno učenje"
    },
    "mainEntity": posts?.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `${baseUrl}/blog/${post.slug?.current}`,
      "datePublished": post.publishedDate,
      "author": {
        "@type": "Person",
        "name": post.author.name
      }
    })) || []
  }

  const brandColors = {
    sky: { solid: '#5DBFDB', bg: 'bg-[#5DBFDB]/10', text: 'text-[#5DBFDB]', badge: 'bg-[#5DBFDB] text-white' },
    sun: { solid: '#F4C950', bg: 'bg-[#F4C950]/10', text: 'text-[#F4C950]', badge: 'bg-[#F4C950] text-white' },
    grass: { solid: '#91C733', bg: 'bg-[#91C733]/10', text: 'text-[#91C733]', badge: 'bg-[#91C733] text-white' },
    heart: { solid: '#E53935', bg: 'bg-[#E53935]/10', text: 'text-[#E53935]', badge: 'bg-[#E53935] text-white' },
    night: { solid: '#1E293B', bg: 'bg-[#1E293B]/10', text: 'text-[#1E293B]', badge: 'bg-[#1E293B] text-white' },
    primary: { solid: '#5DBFDB', bg: 'bg-[#5DBFDB]/10', text: 'text-[#5DBFDB]', badge: 'bg-[#5DBFDB] text-white' }
  }

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={blogStructuredData} id="blog-structured-data" />
      
      <main className="relative">
      {/* Hero sekcija */}
      <section className="relative min-h-[70vh] bg-white overflow-hidden">
        <FloatingLetters 
          className="opacity-15"
          count={12}
          speed="slow"
          letters={['Б', 'Л', 'О', 'Г']}
          colors={['#5DBFDB', '#F4C950', '#91C733', '#E53935']}
        />
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="relative inline-block mb-8">
              <h1 className="text-5xl lg:text-7xl font-bold text-[#1E293B] mb-2">
                Naš <AlternatingText words={['Blog', 'Sadržaj', 'Vodič']} color="sun" className="font-bold" />
              </h1>
              <BrushUnderline color="sun" style="wavy" thickness="thick" className="-bottom-2" />
            </div>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Otkrijte najnovije <span className="relative inline-block">
                <span className="text-[#91C733] font-semibold">savete</span>
                <BrushUnderline color="grass" style="smooth" thickness="thin" />
              </span>, vesti i edukativne sadržaje o brzočitanju, metodologiji učenja i dečjem razvoju
            </p>
            
            {/* Newsletter subscription prompt */}
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Vaša email adresa za newsletter"
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5DBFDB] focus:border-transparent"
                />
                <Button
                  color="sky"
                  size="md"
                  className="whitespace-nowrap"
                  leftIcon={<Icons.Email size={18} />}
                >
                  Prijavite se
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Bez spam-a. Možete se odjaviti u bilo kom trenutku.
              </p>
            </div>
            
            {/* Enhanced filter pills */}
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                <SafeLink 
                  href="/blog"
                  className="px-6 py-3 rounded-full bg-[#1E293B] text-white font-medium hover:scale-105 transition-all duration-200 hover:shadow-lg"
                >
                  <Icons.Book size={16} className="inline mr-2" />
                  Svi članci
                </SafeLink>
                {categories.map((category) => {
                  const theme = brandColors[category.color as keyof typeof brandColors] || brandColors.primary
                  return (
                    <SafeLink
                      key={category._id}
                      href={`/blog/kategorija/${category.slug?.current || 'no-slug'}`}
                      className={`px-6 py-3 rounded-full ${theme.badge} font-medium hover:scale-105 transition-all duration-200 hover:shadow-lg flex items-center gap-2`}
                    >
                      {category.name}
                      {category.postCount && (
                        <span className="ml-1 text-sm opacity-90 bg-white/20 px-2 py-1 rounded-full">
                          {category.postCount}
                        </span>
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
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="relative inline-block">
                  <h2 className="text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4">
                    Istaknut članak
                  </h2>
                  <BrushUnderline color="heart" style="double" thickness="medium" />
                </div>
                <p className="text-lg text-gray-600 mt-6">
                  Najvažniji sadržaj koji ne smete propustiti
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Slika */}
                  <div className="relative h-64 lg:h-auto">
                    {featuredPost.featuredImage?.asset?.url ? (
                      <Image
                        src={featuredPost.featuredImage.asset.url}
                        alt={featuredPost.featuredImage.alt || featuredPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        placeholder="blur"
                        blurDataURL={featuredPost.featuredImage.asset.metadata?.lqip || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Icons.Pencil size={48} className="text-gray-400" animate={false} />
                      </div>
                    )}
                    
                    {/* Featured badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[#E53935] text-white shadow-lg">
                        <Icons.Star size={16} className="text-white" animate={true} />
                        <span>Istaknut članak</span>
                      </span>
                    </div>
                    
                    {/* Category badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium shadow-lg ${
                        brandColors[featuredPost.category.color as keyof typeof brandColors]?.badge || 'bg-[#5DBFDB] text-white'
                      }`}>
                        {featuredPost.category.name}
                      </span>
                    </div>
                  </div>
                  
                  {/* Sadržaj */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#1E293B] mb-6 leading-tight">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    {/* Meta informacije */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                      <div className="flex items-center gap-2">
                        {featuredPost.author.image && (
                          <Image
                            src={featuredPost.author.image.asset.url}
                            alt={featuredPost.author.name}
                            width={36}
                            height={36}
                            className="rounded-full ring-2 ring-[#5DBFDB]/20"
                            placeholder="blur"
                            blurDataURL={featuredPost.author.image.asset.metadata.lqip}
                          />
                        )}
                        <span className="font-medium">{featuredPost.author.name}</span>
                      </div>
                      
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Icons.Clock size={14} className="text-gray-400" animate={false} />
                        <span>{new Date(featuredPost.publishedDate).toLocaleDateString('sr-RS')}</span>
                      </div>
                      
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Icons.Book size={14} className="text-gray-400" animate={false} />
                        <span>{featuredPost.readingTime} min čitanja</span>
                      </div>
                    </div>
                    
                    <SafeLink href={`/blog/${featuredPost.slug?.current || 'no-slug'}`}>
                      <Button 
                        color="sky"
                        size="lg"
                        className="w-full sm:w-auto"
                        rightIcon={<Icons.ArrowRight size={20} animate={true} />}
                      >
                        Pročitajte više
                      </Button>
                    </SafeLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Svi članci */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="relative inline-block mb-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-[#1E293B] mb-4">
                  Svi članci
                </h2>
                <BrushUnderline color="grass" style="rough" thickness="thick" />
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Istražite naše najnovije članke i savete za uspešno učenje i razvoj
              </p>
            </div>
            
            {posts && posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts
                  .filter(post => !post.isFeatured) // Ne prikazuj istaknut članak ponovo
                  .map((post) => (
                    <SafeLink
                      key={post._id}
                      href={`/blog/${post.slug?.current || 'no-slug'}`}
                      className="group"
                    >
                      <article className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:transform group-hover:scale-105 border border-gray-100">
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
                              <Icons.Pencil size={48} className="text-gray-400" animate={false} />
                            </div>
                          )}
                          
                          {/* Category overlay */}
                          <div className="absolute top-4 left-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-lg ${
                              brandColors[post.category.color as keyof typeof brandColors]?.badge || 'bg-[#5DBFDB] text-white'
                            }`}>
                              {post.category.name}
                            </span>
                          </div>
                        </div>
                        
                        {/* Sadržaj */}
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-[#1E293B] mb-3 line-clamp-2 group-hover:text-[#5DBFDB] transition-colors duration-200">
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          {/* Meta */}
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{post.author.name}</span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Icons.Clock size={12} className="text-gray-400" animate={false} />
                                <span>{new Date(post.publishedDate).toLocaleDateString('sr-RS')}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icons.Book size={12} className="text-gray-400" animate={false} />
                              <span>{post.readingTime} min</span>
                            </div>
                          </div>
                          
                          {/* Read more link */}
                          <div className="flex items-center text-[#5DBFDB] font-semibold text-sm group-hover:text-[#91C733] transition-colors duration-200">
                            <span>Pročitajte više</span>
                            <Icons.ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" animate={false} />
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
              <div className="text-center py-20">
                <div className="flex justify-center mb-6">
                  <Icons.Pencil size={80} className="text-gray-400" animate={true} />
                </div>
                <h3 className="text-2xl font-semibold text-[#1E293B] mb-4">
                  Nema objavljenih članaka
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Prvi članci će biti objavljeni uskoro. Prijavite se na newsletter da budete obavešteni!
                </p>
                <Button
                  color="sun"
                  size="lg"
                  leftIcon={<Icons.Email size={20} />}
                >
                  Prijavite se na newsletter
                </Button>
              </div>
            )}
            
            {/* Load more functionality */}
            {posts && posts.length > 9 && (
              <div className="text-center mt-12">
                <Button
                  color="sky"
                  size="lg"
                  className="min-w-[200px]"
                  leftIcon={<Icons.ChevronDown size={20} />}
                >
                  Učitajte više članaka
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Social sharing and newsletter section */}
      <section className="py-20 bg-[#5DBFDB] relative overflow-hidden">
        <FloatingLetters 
          className="opacity-10"
          count={15}
          speed="medium"
          colors={['#ffffff']}
          letters={['Д', 'Е', 'Л', 'И']}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="relative inline-block mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Podelite sa prijateljima
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
            </div>
            
            <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
              Pomozite drugima da otkriju korisne savete - podelite naš blog sa svojom mrežom
            </p>
            
            {/* Social sharing buttons */}
            <div className="flex justify-center gap-4 mb-12">
              <Button
                color="night"
                size="md"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                leftIcon={<Icons.Chat size={20} />}
              >
                Facebook
              </Button>
              <Button
                color="night"
                size="md"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                leftIcon={<Icons.Chat size={20} />}
              >
                Twitter
              </Button>
              <Button
                color="night"
                size="md"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                leftIcon={<Icons.Email size={20} />}
              >
                Email
              </Button>
            </div>
            
            {/* Newsletter final CTA */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Ostanite u toku!
              </h3>
              <p className="text-white/90 mb-6">
                Budite prvi koji će saznati o novim člancima
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Vaša email adresa"
                  className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white border-0"
                />
                <Button 
                  color="sun"
                  size="lg"
                  fullWidth
                  leftIcon={<Icons.Email size={20} />}
                >
                  Prijavite se besplatno
                </Button>
              </div>
              <p className="text-sm text-white/75 mt-3">
                Bez spam-a. Odjavite se kada god želite.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}