import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { BookOpeningAnimation, FloatingLetters, AnimatedTitle, PulseButton } from '@/components/animations'
import { getBookBySlug, getAllBooks, type Book } from '@/sanity/queries/books'
import { PortableText } from '@portabletext/react'
import BookCTAButtons from './BookCTAButtons'

const portableTextComponents = {
  block: {
    normal: ({children}: any) => <p className="mb-4">{children}</p>,
  },
  marks: {
    strong: ({children}: any) => <strong className="font-bold">{children}</strong>,
    em: ({children}: any) => <em className="italic">{children}</em>,
    link: ({value, children}: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className="text-blue-600 hover:text-blue-800 underline">
          {children}
        </a>
      )
    }
  },
  list: {
    bullet: ({children}: any) => <ul className="list-disc list-inside mb-4">{children}</ul>,
    number: ({children}: any) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
  },
  listItem: {
    bullet: ({children}: any) => <li className="mb-1">{children}</li>,
    number: ({children}: any) => <li className="mb-1">{children}</li>,
  },
}

interface Props {
  params: { slug: string }
}

// Generate static params for all books
export async function generateStaticParams() {
  const books = await getAllBooks()
  return books.map((book: Book) => ({
    slug: book.slug.current,
  }))
}

// Generate metadata for each book
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await getBookBySlug(params.slug)
  
  if (!book) {
    return {
      title: 'Knjiga nije pronađena',
    }
  }

  return {
    title: book.seo?.metaTitle || `${book.title} - ${book.subtitle}`,
    description: book.seo?.metaDescription || book.heroText,
    keywords: book.seo?.keywords,
    openGraph: {
      title: book.title,
      description: book.heroText,
      images: book.seo?.ogImage?.asset?.url ? [book.seo.ogImage.asset.url] : [],
    },
  }
}

export default async function BookPage({ params }: Props) {
  const book = await getBookBySlug(params.slug)

  if (!book) {
    notFound()
  }

  const themeColors = {
    yellow: {
      gradient: 'from-yellow-400 to-orange-500',
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
      button: 'btn-yellow'
    },
    blue: {
      gradient: 'from-blue-400 to-blue-600',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      button: 'btn-blue'
    },
    green: {
      gradient: 'from-green-400 to-emerald-500',
      bg: 'bg-green-50',
      text: 'text-green-600',
      button: 'btn-green'
    },
    red: {
      gradient: 'from-red-400 to-pink-500',
      bg: 'bg-red-50',
      text: 'text-red-600',
      button: 'btn-red'
    }
  }

  const theme = themeColors[book?.colorTheme || 'yellow'] || themeColors.yellow

  return (
    <main className="relative">
      {/* Hero sekcija */}
      <section className={`relative min-h-screen bg-gradient-to-br ${theme.gradient} overflow-hidden`}>
        <FloatingLetters 
          className="opacity-20"
          count={15}
          speed="slow"
          colors={['#ffffff']}
        />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Levi deo - tekst */}
            <div className="space-y-8 text-white">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Link href="/knjige" className="hover:text-white transition-colors">
                    Knjige
                  </Link>
                  <span>•</span>
                  <span>{book.year}</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  {book.title}
                </h1>
                
                {book.subtitle && (
                  <h2 className="text-xl lg:text-2xl font-medium opacity-90">
                    {book.subtitle}
                  </h2>
                )}
              </div>
              
              <p className="text-lg lg:text-xl leading-relaxed max-w-lg opacity-90">
                {book.heroText}
              </p>
              
              <BookCTAButtons hasPurchaseLinks={!!(book.purchaseLinks && book.purchaseLinks.length > 0)} />
            </div>
            
            {/* Desni deo - ilustracija */}
            <div className="flex justify-center items-center">
              <div className="relative">
                <BookOpeningAnimation 
                  size="lg"
                  theme={book.colorTheme}
                  className="transform scale-150"
                />
                
                {/* Book cover image if available */}
                {book.coverImage && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={book.coverImage.asset.url}
                      alt={book.coverImage.alt || book.title}
                      width={300}
                      height={400}
                      className="rounded-lg shadow-2xl"
                      {...(book.coverImage.asset?.metadata?.lqip && {
                        placeholder: "blur",
                        blurDataURL: book.coverImage.asset.metadata.lqip
                      })}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O knjizi */}
      <section id="about-book" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                O knjizi
              </h2>
            </div>
            
            <div className="prose prose-lg mx-auto text-gray-700">
              {book.aboutBook && (
                <PortableText value={book.aboutBook} components={portableTextComponents} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Vila i likovi */}
      <section className={`py-20 ${theme.bg}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Upoznajte likove
              </h2>
            </div>
            
            {/* Vila */}
            {book.fairy && (
              <div className="mb-16">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className={`bg-gradient-to-r ${theme.gradient} p-8 text-white`}>
                    <div className="flex items-center gap-6">
                      {book.fairy.illustration && (
                        <Image
                          src={book.fairy.illustration.asset.url}
                          alt={book.fairy.illustration.alt || book.fairy.name}
                          width={120}
                          height={120}
                          className="rounded-full"
                          {...(book.fairy.illustration.asset?.metadata?.lqip && {
                            placeholder: "blur",
                            blurDataURL: book.fairy.illustration.asset.metadata.lqip
                          })}
                        />
                      )}
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{book.fairy.name}</h3>
                        {book.fairy.birthDate && (
                          <p className="opacity-90">Rođena: {book.fairy.birthDate}</p>
                        )}
                        {book.fairy.secretPlace && (
                          <p className="opacity-90">Tajna radionica: {book.fairy.secretPlace}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <p className="text-gray-700 mb-6">{book.fairy.description}</p>
                    
                    {book.fairy.virtues && book.fairy.virtues.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Vrline koje prenosi:</h4>
                        <div className="flex flex-wrap gap-2">
                          {book.fairy.virtues.map((virtue, index) => (
                            <span
                              key={index}
                              className={`px-3 py-1 ${theme.bg} ${theme.text} rounded-full text-sm font-medium`}
                            >
                              {virtue}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Deca likovi */}
            {book.childCharacters && book.childCharacters.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Deca iz priča
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {book.childCharacters.map((child, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md p-6">
                      <div className="flex items-start gap-4">
                        {child.illustration && (
                          <Image
                            src={child.illustration.asset.url}
                            alt={child.illustration.alt || child.name}
                            width={80}
                            height={80}
                            className="rounded-full"
                            {...(child.illustration.asset?.metadata?.lqip && {
                              placeholder: "blur",
                              blurDataURL: child.illustration.asset.metadata.lqip
                            })}
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">
                            {child.name}
                          </h4>
                          <p className="text-gray-700 mb-4">{child.description}</p>
                          
                          {child.characteristics && child.characteristics.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {child.characteristics.map((characteristic, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                                >
                                  {characteristic}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Galerija slika */}
      {book.galleryImages && book.galleryImages.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Galerija
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {book.galleryImages.map((image, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-xl">
                    <Image
                      src={image.asset.url}
                      alt={image.alt || `Galerija slika ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      {...(image.asset?.metadata?.lqip && {
                        placeholder: "blur",
                        blurDataURL: image.asset.metadata.lqip
                      })}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recenzije */}
      {book.reviews && book.reviews.length > 0 && (
        <section className={`py-20 ${theme.bg}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Šta kažu čitaoci
                </h2>
              </div>
              
              <div className="space-y-8">
                {book.reviews.map((review, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 font-bold">
                          {review.author.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{review.author}</h4>
                          {review.title && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span className="text-sm text-gray-600">{review.title}</span>
                            </>
                          )}
                        </div>
                        
                        {review.rating && (
                          <div className="flex gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-lg ${
                                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-gray-700 leading-relaxed">{review.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Kupovina */}
      {book.purchaseLinks && book.purchaseLinks.length > 0 && (
        <section id="purchase" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                Kupite knjigu
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {book.purchaseLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {link.storeName}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {link.type === 'online' ? 'Online prodavnica' : 'Fizička prodavnica'}
                      </p>
                      {link.price && (
                        <p className={`text-xl font-bold ${theme.text} mb-4`}>
                          {link.price} RSD
                        </p>
                      )}
                      <div className={`inline-flex items-center text-sm ${theme.text} font-medium`}>
                        Kupi sada
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </a>
                ))}
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
          <div className="text-center max-w-3xl mx-auto text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Istražite ostale knjige
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Otkrijte ceo serijal "Čarobno selo - Luka godišnjih doba"
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/knjige">
                <PulseButton 
                  variant="accent"
                  size="lg"
                  intensity="medium"
                  className="bg-white text-gray-900 hover:bg-gray-100"
                >
                  Sve knjige
                </PulseButton>
              </Link>
              
              <Link href="/kontakt">
                <PulseButton 
                  variant="secondary"
                  size="lg"
                  intensity="subtle"
                  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900"
                >
                  Kontaktirajte nas
                </PulseButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}