import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpeningAnimation, FloatingLetters, AnimatedTitle } from '@/components/animations'
import { UsersIcon } from '@/components/icons'
import { AuthorButton, CTAButtons, HeroButtons } from '@/components/features/books/BooksInteractive'
import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.client'
import { BookOpen, Star, Palette, Leaf, Book, Sparkles, StarIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Čarobno selo - Luka godišnjih doba | Knjige Željane Radojičić Lukić',
  description: 'Obrazovni serijal od četiri knjige koje prate godišnja doba. Spoj bajke i nauke za decu uzrasta 5-12 godina.',
  keywords: ['dečje knjige', 'obrazovne knjige', 'godišnja doba', 'čarobno selo', 'Željana Radojičić Lukić', 'vile', 'bajka i nauka'],
  openGraph: {
    title: 'Čarobno selo - Luka godišnjih doba',
    description: 'Obrazovni serijal knjiga za decu koji spaja bajku sa naukom',
    type: 'website',
  }
}

const booksLandingQuery = `*[_type == "booksLanding"][0]{
  heroTitle,
  heroSubtitle,
  heroDescription,
  seriesTitle,
  seriesDescription,
  seriesValues,
  authorSection,
  ctaSection
}`

const booksQuery = `*[_type == "book"] | order(order asc){
  title,
  subtitle,
  slug,
  colorTheme,
  year,
  heroText,
  coverImage {
    ...,
    asset-> {
      url,
      metadata {
        lqip
      }
    }
  },
  order
}`

export default async function BooksLandingPage() {
  // Fetch CMS data
  const landingData = await client.fetch(booksLandingQuery)
  const booksFromCMS = await client.fetch(booksQuery)
  
  if (!landingData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Podaci nisu dostupni</h1>
          <p className="text-gray-600">Molimo vas pokušajte ponovo kasnije.</p>
        </div>
      </div>
    )
  }
  
  // Temporary fallback for missing data
  const fallbackData = {
    heroTitle: "Čarobno selo - Luka godišnjih doba",
    heroSubtitle: "Obrazovni serijal knjiga Željane Radojičić Lukić",
    heroDescription: "Četiri knjige koje prate godišnja doba i vode decu kroz čarobnu luku gde žive vile koje čuvaju prirodu, tradiciju i znanje. Svaka knjiga nosi svoju boju, svoju vilu i svoju lekciju o životu.",
    seriesTitle: "O serijalu knjiga",
    seriesDescription: [
      {
        _type: 'block',
        children: [
          {
            text: 'Serijal "Čarobno selo - Luka godišnjih doba" nastao je sa ciljem da deci predstavi godišnja doba kroz magične priče o vilama koje žive u čarobnoj luci. Svaka knjiga prati jedno godišnje doba i njegovu vilu, koja deci prenosi znanje o prirodi, tradiciji i životnim vrednostima.'
          }
        ]
      }
    ],
    seriesValues: [
      {
        title: "Edukativnost",
        description: "Spoj bajke i nauke kroz zanimljive priče",
        icon: "knowledge"
      },
      {
        title: "Vrline",
        description: "Razvijanje pozitivnih karakternih osobina",
        icon: "virtues"
      },
      {
        title: "Kreativnost",
        description: "Podsticanje mašte i kreativnog razmišljanja",
        icon: "creativity"
      },
      {
        title: "Priroda",
        description: "Povezivanje sa prirodom kroz godišnja doba",
        icon: "nature"
      }
    ],
    authorSection: {
      title: "O autorki",
      description: [
        {
          _type: 'block',
          children: [
            {
              text: 'Željana Radojičić Lukić je doktor pedagogije, profesorka i istraživačica sa preko 20 godina iskustva u obrazovanju. Kroz serijal "Luka godišnjih doba" spaja tradicionalne vrednosti sa modernim pristupom učenju.'
            }
          ]
        }
      ],
      linkToAbout: "/o-autorki",
      ctaText: "Saznajte više o autorki"
    },
    ctaSection: {
      title: "Nabavite komplet knjiga",
      description: "Otkrijte čarobni svet knjiga i povedu svoju decu na nezaboravno putovanje kroz godišnja doba.",
      primaryButton: {
        text: "Poručite sada",
        url: "/kontakt"
      },
      secondaryButton: {
        text: "Kontaktirajte nas",
        url: "/kontakt"
      }
    }
  }

  // Use books from CMS or empty array
  const books = booksFromCMS || []

  // Remove old static data
  /*
  const books_old = [
    {
      title: "Jesenja gozba",
      subtitle: "sa vilom Bosiljčicom",
      slug: { current: "jesenja-gozba" },
      colorTheme: "yellow",
      year: 2021,
      heroText: "Otkrijte čarobni svet jeseni sa vilom Bosiljčicom",
      coverImage: {
        asset: {
          url: "/images/jesenja-gozba-cover.webp",
          metadata: {
            lqip: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          }
        },
        alt: "Jesenja gozba - korica knjige"
      },
      order: 1
    },
    {
      title: "Zimski mir",
      subtitle: "sa vilom Božicom",
      slug: { current: "zimski-mir" },
      colorTheme: "blue",
      year: 2022,
      heroText: "Uronite u zimsku čaroliju sa vilom Božicom",
      coverImage: {
        asset: {
          url: "/images/zimski-mir-cover.webp",
          metadata: {
            lqip: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          }
        },
        alt: "Zimski mir - korica knjige"
      },
      order: 2
    },
    {
      title: "Prolećna žurba",
      subtitle: "sa vilom Đurđicom",
      slug: { current: "prolecna-zurba" },
      colorTheme: "green",
      year: 2022,
      heroText: "Probudite se uz prolećnu magiju vile Đurđice",
      coverImage: {
        asset: {
          url: "/images/prolecna-zurba-cover.webp",
          metadata: {
            lqip: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          }
        },
        alt: "Prolećna žurba - korica knjige"
      },
      order: 3
    },
    {
      title: "Letnja vreva",
      subtitle: "sa vilom Sunčicom",
      slug: { current: "letnja-vreva" },
      colorTheme: "red",
      year: 2023,
      heroText: "Zakoračite u letnju avanturu sa vilom Sunčicom",
      coverImage: {
        asset: {
          url: "/images/letnja-vreva-cover.webp",
          metadata: {
            lqip: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          }
        },
        alt: "Letnja vreva - korica knjige"
      },
      order: 4
    }
  ]
  */

  const themeColors = {
    yellow: 'bg-accent-200',
    blue: 'bg-secondary-200',
    green: 'bg-primary-200',
    red: 'bg-warm-200'
  }

  return (
    <main className="relative">
      {/* Hero sekcija */}
      <section className="relative min-h-screen bg-primary-50 overflow-hidden">
        {/* Floating letters u pozadini */}
        <FloatingLetters 
          className="opacity-20"
          count={25}
          speed="slow"
          colors={['#8B5CF6', '#3B82F6', '#10B981']}
        />
        
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-32 left-40 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
            {/* Levi deo - tekst */}
            <div className="space-y-8 lg:pr-8">
              <div className="space-y-6">
                <AnimatedTitle 
                  text={landingData?.heroTitle || fallbackData.heroTitle}
                  className="text-4xl lg:text-6xl font-bold leading-tight text-primary-700"
                />
                <h2 className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed">
                  {landingData?.heroSubtitle || fallbackData.heroSubtitle}
                </h2>
              </div>
              
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                {landingData?.heroDescription || fallbackData.heroDescription}
              </p>
              
              <HeroButtons />
            </div>
            
            {/* Desni deo - moderna kompozicija knjiga */}
            <div className="flex justify-center items-center relative">
              <div className="relative w-full max-w-lg h-96 lg:h-[500px]">
                {/* Glavna knjiga - Jesenja gozba - centralna pozicija */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-64 lg:w-56 lg:h-72 group cursor-pointer">
                  <div className="relative w-full h-full transform transition-all duration-700 hover:scale-105 hover:rotate-2 hover:z-30">
                    <div className="absolute inset-0 bg-accent-200/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                    <Image
                      src="/images/jesenja-gozba-cover.webp"
                      alt="Jesenja gozba - korica knjige"
                      fill
                      className="object-cover rounded-xl shadow-2xl transition-shadow duration-500 group-hover:shadow-3xl"
                      sizes="(max-width: 1024px) 192px, 224px"
                      priority
                    />
                  </div>
                </div>
                
                {/* Zimski mir - levo gore */}
                <div className="absolute top-0 left-0 w-36 h-48 lg:w-40 lg:h-52 group cursor-pointer">
                  <div className="relative w-full h-full transform rotate-12 transition-all duration-700 hover:scale-110 hover:rotate-6 hover:z-20">
                    <div className="absolute inset-0 bg-secondary-200/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-500"></div>
                    <Image
                      src="/images/zimski-mir-cover.webp"
                      alt="Zimski mir - korica knjige"
                      fill
                      className="object-cover rounded-lg shadow-xl transition-shadow duration-500 group-hover:shadow-2xl"
                      sizes="(max-width: 1024px) 144px, 160px"
                    />
                  </div>
                </div>
                
                {/* Prolećna žurba - desno gore */}
                <div className="absolute top-8 right-0 w-36 h-48 lg:w-40 lg:h-52 group cursor-pointer">
                  <div className="relative w-full h-full transform -rotate-12 transition-all duration-700 hover:scale-110 hover:-rotate-6 hover:z-20">
                    <div className="absolute inset-0 bg-primary-200/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-500"></div>
                    <Image
                      src="/images/prolecna-zurba-cover.webp"
                      alt="Prolećna žurba - korica knjige"
                      fill
                      className="object-cover rounded-lg shadow-xl transition-shadow duration-500 group-hover:shadow-2xl"
                      sizes="(max-width: 1024px) 144px, 160px"
                    />
                  </div>
                </div>
                
                {/* Letnja vreva - desno dole */}
                <div className="absolute bottom-0 right-8 w-32 h-44 lg:w-36 lg:h-48 group cursor-pointer">
                  <div className="relative w-full h-full transform rotate-6 transition-all duration-700 hover:scale-110 hover:rotate-3 hover:z-20">
                    <div className="absolute inset-0 bg-warm-200/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-500"></div>
                    <Image
                      src="/images/letnja-vreva-cover.webp"
                      alt="Letnja vreva - korica knjige"
                      fill
                      className="object-cover rounded-lg shadow-xl transition-shadow duration-500 group-hover:shadow-2xl"
                      sizes="(max-width: 1024px) 128px, 144px"
                    />
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0s'}}></div>
                <div className="absolute top-32 right-16 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-24 left-12 w-5 h-5 bg-green-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-16 right-24 w-2 h-2 bg-pink-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '3s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel knjiga */}
      <section id="books-carousel" className="py-24 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold text-secondary-700 mb-6">
              Istražite sve knjige
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Svaka knjiga predstavlja jedno godišnje doba sa svojom vilom i jedinstvenim pričama
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {books && books.length > 0 ? books.map((book) => (
              <Link 
                key={book.slug.current}
                href={`/knjige/${book.slug.current}`}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:transform group-hover:scale-105">
                  {/* Book cover */}
                  <div className="relative h-64 overflow-hidden">
                    {book.coverImage ? (
                      <Image
                        src={urlFor(book.coverImage).url()}
                        alt={book.coverImage?.alt || book.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        {...(book.coverImage?.asset?.metadata?.lqip && {
                          placeholder: "blur",
                          blurDataURL: book.coverImage.asset.metadata.lqip
                        })}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                        <Book className="w-20 h-20 text-primary-400" />
                      </div>
                    )}
                    
                    {/* Year badge */}
                    <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                      {book.year}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {book.subtitle}
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {book.heroText}
                    </p>
                  </div>
                </div>
              </Link>
            )) : (
              <p className="text-center text-gray-500 col-span-4">Knjige će uskoro biti dostupne.</p>
            )}
          </div>
        </div>
      </section>

      {/* O serijalu */}
      <section id="about-series" className="py-24 bg-primary-100">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Leva strana - tekst */}
              <div className="space-y-8">
                <h2 className="text-3xl lg:text-5xl font-bold text-primary-700">
                  {landingData.seriesTitle}
                </h2>
                <div className="prose prose-xl text-gray-700 leading-relaxed">
                  <p>
                    Serijal "Čarobno selo - Luka godišnjih doba" nastao je sa ciljem da deci predstavi godišnja doba kroz magične priče o vilama koje žive u čarobnoj luci. Svaka knjiga prati jedno godišnje doba i njegovu vilu, koja deci prenosi znanje o prirodi, tradiciji i životnim vrednostima.
                  </p>
                </div>
                
                {/* Vrednosti serijala */}
                <div className="grid grid-cols-2 gap-6">
                  {landingData?.seriesValues?.map((value, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        index === 0 ? 'bg-accent-400' :
                        index === 1 ? 'bg-secondary-400' :
                        index === 2 ? 'bg-primary-400' :
                        'bg-warm-400'
                      }`}>
                        {index === 0 ? <BookOpen size={24} className="text-white" /> : 
                         index === 1 ? <Star size={24} className="text-white" /> : 
                         index === 2 ? <Palette size={24} className="text-white" /> : 
                         <Leaf size={24} className="text-white" />}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Desna strana - fotografija deteta */}
              <div className="relative">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="aspect-square relative overflow-hidden rounded-3xl shadow-2xl">
                    <div className="absolute inset-0 bg-primary-200/20 z-10"></div>
                    <Image
                      src="/images/jesenja-gozba/decak-luka.webp"
                      alt="Dete čita knjigu iz serijala Čarobno selo"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  
                  {/* Floating books around the photo */}
                  <div className="absolute -top-6 -left-6 w-16 h-20 transform rotate-12 opacity-90">
                    <Image
                      src="/images/jesenja-gozba-cover.webp"
                      alt="Jesenja gozba"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                      sizes="64px"
                    />
                  </div>
                  <div className="absolute -top-4 -right-8 w-14 h-18 transform -rotate-12 opacity-80">
                    <Image
                      src="/images/zimski-mir-cover.webp"
                      alt="Zimski mir"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                      sizes="56px"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-12 h-16 transform rotate-6 opacity-90">
                    <Image
                      src="/images/prolecna-zurba-cover.webp"
                      alt="Prolećna žurba"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                      sizes="48px"
                    />
                  </div>
                  
                  {/* Animated sparkles */}
                  <div className="absolute top-20 left-4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse opacity-70"></div>
                  <div className="absolute top-32 right-8 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60" style={{animationDelay: '1s'}}></div>
                  <div className="absolute bottom-24 left-8 w-4 h-4 bg-green-400 rounded-full animate-pulse opacity-80" style={{animationDelay: '2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O autorki */}
      <section className="py-24 bg-secondary-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-5xl font-bold text-secondary-700">
                {landingData.authorSection.title}
              </h2>
              <div className="prose prose-xl text-gray-700 leading-relaxed">
                <p>
                  Željana Radojičić Lukić je doktor pedagogije, profesorka i istraživačica sa preko 20 godina iskustva u obrazovanju. Kroz serijal "Luka godišnjih doba" spaja tradicionalne vrednosti sa modernim pristupom učenju.
                </p>
              </div>
              
              <AuthorButton linkToAbout={landingData.authorSection.linkToAbout} />
            </div>
            
            <div className="relative">
              {/* Autorka fotografija */}
              <div className="relative w-full max-w-md mx-auto">
                <div className="aspect-square relative overflow-hidden rounded-3xl shadow-2xl">
                  <div className="absolute inset-0 bg-secondary-200/20 z-10"></div>
                  <Image
                    src="/images/autorka/zeljana-fotografija.webp"
                    alt="Željana Radojičić Lukić - autorka knjiga"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary-200 rounded-full opacity-60 blur-xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary-300 rounded-full opacity-60 blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/3 -left-6 w-12 h-12 bg-secondary-200 rounded-full opacity-40 blur-lg animate-pulse" style={{animationDelay: '2s'}}></div>
                
                {/* Floating icons */}
                <div className="absolute top-8 right-8 animate-bounce opacity-60" style={{animationDelay: '0s'}}><Book size={28} className="text-secondary-600" /></div>
                <div className="absolute bottom-12 left-6 animate-bounce opacity-50" style={{animationDelay: '1s'}}><Sparkles size={24} className="text-secondary-500" /></div>
                <div className="absolute top-16 left-4 animate-bounce opacity-40" style={{animationDelay: '2s'}}><StarIcon size={20} className="text-secondary-600" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA sekcija */}
      <section className="py-24 bg-primary-600 relative overflow-hidden">
        <FloatingLetters 
          className="opacity-10"
          count={25}
          speed="medium"
          colors={['#ffffff']}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              {landingData.ctaSection.title}
            </h2>
            <p className="text-xl lg:text-2xl text-white/95 mb-10 leading-relaxed">
              {landingData.ctaSection.description}
            </p>
            
            <CTAButtons 
              primaryButton={landingData.ctaSection.primaryButton}
              secondaryButton={landingData.ctaSection.secondaryButton}
            />
          </div>
        </div>
      </section>
    </main>
  )
}