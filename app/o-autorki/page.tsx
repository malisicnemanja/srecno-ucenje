import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { FloatingLetters, AnimatedTitle } from '@/components/animations'
import { HeroButtons, BooksButton, CTAButtons } from '@/components/features/author/AuthorInteractive'
import { getAboutAuthorData, type AboutAuthorData } from '@/sanity/queries/aboutAuthor'
import { 
  StarIcon, 
  LocationIcon, 
  TrophyIcon, 
  BookIcon,
  BirthIcon,
  TeachingIcon,
  VillageIcon,
  GovernmentIcon,
  BooksIcon,
  AwardIcon,
  TravelIcon,
  GlobeIcon,
  MedalIcon,
  PartnershipIcon,
  FestivalIcon,
  SparklesIcon
} from '@/components/icons/SimpleIcons'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutAuthorData()
  
  if (!data) {
    return {
      title: 'O autorki | Srećno učenje',
      description: 'Upoznajte Željanu Radojičić Lukić, učiteljicu i spisateljicu koja je stvorila Čarobno selo.',
    }
  }

  return {
    title: data.seo?.metaTitle || `${data.heroTitle} | Srećno učenje`,
    description: data.seo?.metaDescription || data.heroSubtitle,
    keywords: data.seo?.keywords,
    openGraph: {
      title: data.heroTitle,
      description: data.heroSubtitle || '',
      images: data.seo?.ogImage?.asset?.url ? [data.seo.ogImage.asset.url] : data.heroImage?.asset?.url ? [data.heroImage.asset.url] : [],
    },
  }
}

export default async function AboutAuthorPage() {
  // Get data from CMS
  const cmsData = await getAboutAuthorData()
  
  // Fallback data if CMS is not available
  const fallbackData = {
    heroTitle: "Željana Radojičić Lukić",
    heroSubtitle: "Autorka, pedagog i istraživačica koja spaja tradiciju sa inovacijom",
    heroImage: {
      asset: {
        url: "/images/autorka/zeljana-fotografija.webp",
        metadata: {
          lqip: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        }
      },
      alt: "Željana Radojičić Lukić"
    },
    heroBackground: null,
    featuredQuote: {
      text: "Svako dete je posebno i jedinstveno. Moja misija je da im pokažem da učenje može biti radosno putovanje kroz čarobni svet znanja.",
      context: "Željana Radojičić Lukić o svojoj pedagogiji",
      image: null
    },
    sections: [
      {
        title: "Pedagoška filozofija",
        content: [
          {
            _type: 'block',
            children: [
              {
                text: 'Željana Radojičić Lukić veruje da je obrazovanje mnogo više od prenošenja informacija. Njena pedagoška filozofija zasniva se na holističkom pristupu razvoju deteta, gde se spajaju tradicionalne vrednosti sa modernim pristupima učenju. Kroz svoje knjige i rad, ona podstiče decu da razvijaju kritičko mišljenje, kreativnost i emotionalnu inteligenciju.'
              }
            ]
          }
        ],
        image: {
          asset: {
            url: "/images/autorka/zeljana-fotografija.webp",
            metadata: {
              lqip: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            }
          },
          alt: "Željana na predavanju"
        },
        imagePosition: 'right',
        backgroundColor: '#f8fafc',
        decorativeElement: 'floating-books'
      },
      {
        title: "Čarobno selo nastaje",
        content: [
          {
            _type: 'block',
            children: [
              {
                text: 'Ideja za "Čarobno selo - Luka godišnjih doba" nastala je iz Željaninog dugogodišnjeg rada sa decom. Primetila je da deca najbolje uče kroz priče koje spajaju bajkovite elemente sa realnim znanjem. Tako su nastale vile godišnjih doba - Bosiljčica, Božica, Đurđica i Sunčica, koje deci prenose znanje o prirodi, tradiciji i životnim vrednostima.'
              }
            ]
          }
        ],
        image: {
          asset: {
            url: "/images/autorka/zeljana-ilustracija.webp", 
            metadata: {
              lqip: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            }
          },
          alt: "Željana za pisanjem"
        },
        imagePosition: 'left',
        backgroundColor: '#f0f9ff',
        decorativeElement: 'magic-sparkles'
      }
    ],
    timeline: [
      {
        year: "1975",
        title: "Rođenje u Beogradu",
        description: "Rođena u pedagoškoj porodici, gde je rano zavolela knjige i učenje.",
        icon: "birth",
        featured: false
      },
      {
        year: "1999",
        title: "Diplomiranje na Pedagoškom fakultetu",
        description: "Završila studije pedagogije sa posebnim interesom za razvoj deteta.",
        icon: "teaching",
        featured: false
      },
      {
        year: "2005",
        title: "Magistarske studije",
        description: "Magistrirala na temu 'Kreativnost u obrazovanju dece predškolskog uzrasta'.",
        icon: "books",
        featured: false
      },
      {
        year: "2010",
        title: "Doktorat pedagogije",
        description: "Odbranila doktorsku disertaciju o holističkom pristupu obrazovanju.",
        icon: "award",
        featured: true
      },
      {
        year: "2018",
        title: "Osnivanje Čarobnog sela",
        description: "Pokretanje edukativnog projekta 'Čarobno selo - Luka godišnjih doba'.",
        icon: "village",
        featured: true
      },
      {
        year: "2021",
        title: "Prva knjiga - Jesenja gozba",
        description: "Objavljena prva knjiga serijala sa vilom Bosiljčicom.",
        icon: "books",
        featured: true
      },
      {
        year: "2024",
        title: "Međunarodna priznanja",
        description: "Dobila priznanja za doprinos obrazovanju i dečjoj literaturi.",
        icon: "award",
        featured: true
      }
    ],
    achievements: [
      {
        title: "20+ godina iskustva",
        description: "Dugogodišnji rad u obrazovanju i pedagoškim istraživanjima",
        icon: "medal",
        color: "#3B82F6",
        year: "2004-2024"
      },
      {
        title: "Doktor pedagogije",
        description: "Najviši akademski stepen u oblasti pedagogije",
        icon: "star",
        color: "#8B5FBF",
        year: "2010"
      },
      {
        title: "4 objavljene knjige",
        description: "Kompletna serija 'Čarobno selo - Luka godišnjih doba'",
        icon: "book",
        color: "#059669",
        year: "2021-2023"
      },
      {
        title: "Međunarodna saradnja",
        description: "Saradnja sa obrazovnim institucijama u regionu",
        icon: "globe",
        color: "#DC2626",
        year: "2020-2024"
      },
      {
        title: "Pedagoška inovacija",
        description: "Razvoj jedinstvene metodologije spajanja bajke i nauke",
        icon: "partnership",
        color: "#EA580C",
        year: "2018"
      },
      {
        title: "Priznanja",
        description: "Nagrade za doprinos dečjoj literaturi i obrazovanju",
        icon: "festival",
        color: "#7C3AED",
        year: "2024"
      }
    ],
    featuredBooks: [
      {
        _id: "1",
        title: "Jesenja gozba",
        excerpt: "Otkrijte čarobni svet jeseni sa vilom Bosiljčicom koja deci prenosi znanje o prirodi.",
        slug: { current: "jesenja-gozba" },
        seasonalTheme: "autumn",
        publicationYear: 2021,
        coverImage: {
          asset: {
            url: "/images/jesenja-gozba-cover.webp",
            metadata: {
              lqip: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            }
          },
          alt: "Jesenja gozba - korica knjige"
        }
      },
      {
        _id: "2", 
        title: "Zimski mir",
        excerpt: "Uronite u zimsku čaroliju sa vilom Božicom i naučite o zimskim čudima prirode.",
        slug: { current: "zimski-mir" },
        seasonalTheme: "winter",
        publicationYear: 2022,
        coverImage: {
          asset: {
            url: "/images/zimski-mir-cover.webp",
            metadata: {
              lqip: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            }
          },
          alt: "Zimski mir - korica knjige"
        }
      },
      {
        _id: "3",
        title: "Prolećna žurba", 
        excerpt: "Probudite se uz prolećnu magiju vile Đurđice i otkrijte lepote proleća.",
        slug: { current: "prolecna-zurba" },
        seasonalTheme: "spring",
        publicationYear: 2022,
        coverImage: {
          asset: {
            url: "/images/prolecna-zurba-cover.webp",
            metadata: {
              lqip: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            }
          },
          alt: "Prolećna žurba - korica knjige"
        }
      },
      {
        _id: "4",
        title: "Letnja vreva",
        excerpt: "Zakoračite u letnju avanturu sa vilom Sunčicom i istražite letnje radosti.",
        slug: { current: "letnja-vreva" },
        seasonalTheme: "summer", 
        publicationYear: 2023,
        coverImage: {
          asset: {
            url: "/images/letnja-vreva-cover.webp",
            metadata: {
              lqip: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            }
          },
          alt: "Letnja vreva - korica knjige"
        }
      }
    ]
  }
  
  // Use CMS data if available, otherwise use fallback
  const data = cmsData || fallbackData

  const timelineIcons = {
    birth: BirthIcon,
    teaching: TeachingIcon,
    village: VillageIcon,
    government: GovernmentIcon,
    books: BooksIcon,
    award: AwardIcon,
    travel: TravelIcon
  }

  const achievementIcons = {
    globe: GlobeIcon,
    medal: MedalIcon,
    partnership: PartnershipIcon,
    festival: FestivalIcon,
    book: BookIcon,
    star: TrophyIcon
  }

  const decorativeElements = {
    'floating-books': { icon: BookIcon, secondary: SparklesIcon },
    'growth-plant': { icon: null },
    'magic-sparkles': { icon: SparklesIcon },
    'open-book': { icon: BookIcon },
    'award-stars': { icon: TrophyIcon, secondary: StarIcon },
    'none': { icon: null }
  }

  return (
    <main className="relative">
      {/* Hero sekcija */}
      <section className="relative min-h-screen bg-primary-50 overflow-hidden">
        {/* Background image */}
        {data.heroBackground && (
          <div className="absolute inset-0">
            <Image
              src={data.heroBackground.asset.url}
              alt={data.heroBackground.alt || ''}
              fill
              className="object-cover opacity-20"
              placeholder="blur"
              blurDataURL={data.heroBackground.asset.metadata.lqip}
            />
          </div>
        )}
        
        <FloatingLetters 
          className="opacity-10"
          count={20}
          speed="slow"
          colors={['#8B5FBF', '#6B8DD6', '#8F6B47']}
          letters={['Ж', 'Е', 'Љ', 'А', 'Н', 'А']}
        />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
              {/* Leva strana - sadržaj */}
              <div className="space-y-8 lg:pr-8">
                <AnimatedTitle 
                  text={data.heroTitle}
                  className="text-4xl lg:text-6xl font-bold text-gray-900"
                />
                
                {data.heroSubtitle && (
                  <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                    {data.heroSubtitle}
                  </p>
                )}
                
                <HeroButtons />
              </div>
              
              {/* Desna strana - slika */}
              {data.heroImage && (
                <div className="relative flex justify-center lg:justify-end">
                  <div className="relative w-80 h-96 lg:w-96 lg:h-[500px] group">
                    {/* Glavna slika */}
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-primary-100/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                      <Image
                        src="/images/autorka/zeljana-fotografija.webp"
                        alt={data.heroImage.alt || data.heroTitle}
                        fill
                        className="rounded-2xl shadow-2xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        placeholder="blur"
                        blurDataURL={data.heroImage.asset.metadata.lqip}
                        sizes="(max-width: 1024px) 320px, 384px"
                        priority
                      />
                    </div>
                    
                    {/* Dekorativni elementi - pozicionirani van glavne slike */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent-200 rounded-full opacity-40 blur-lg animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary-200 rounded-full opacity-40 blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/3 -right-6 w-8 h-8 bg-secondary-200 rounded-full opacity-30 blur-md animate-pulse" style={{ animationDelay: '2s' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Istaknuti citat */}
      {data.featuredQuote && (
        <section className="py-20 bg-primary-600 relative overflow-hidden">
          {data.featuredQuote.image && (
            <div className="absolute inset-0">
              <Image
                src={data.featuredQuote.image.asset.url}
                alt={data.featuredQuote.image.alt || ''}
                fill
                className="object-cover opacity-20"
                placeholder="blur"
                blurDataURL={data.featuredQuote.image.asset.metadata.lqip}
              />
            </div>
          )}
          
          <FloatingLetters 
            className="opacity-10"
            count={15}
            speed="medium"
            colors={['#ffffff']}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <blockquote className="text-2xl lg:text-3xl font-light leading-relaxed mb-6">
                "{data.featuredQuote.text}"
              </blockquote>
              {data.featuredQuote.context && (
                <cite className="text-lg opacity-80">
                  {data.featuredQuote.context}
                </cite>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Sekcije sadržaja */}
      {data.sections && data.sections.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto space-y-24">
              {data.sections.map((section, index) => (
                <div 
                  key={index} 
                  className="rounded-3xl overflow-hidden shadow-lg border border-gray-100"
                  style={{ backgroundColor: section.backgroundColor || '#ffffff' }}
                >
                  <div className={`grid lg:grid-cols-2 gap-0 items-stretch ${
                    section.imagePosition === 'left' ? 'lg:grid-flow-col-dense' : ''
                  }`}>
                    {/* Sadržaj */}
                    <div className={`p-8 lg:p-16 flex flex-col justify-center ${
                      section.imagePosition === 'left' ? 'lg:col-start-2' : ''
                    }`}>
                      <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                          {section.title}
                        </h2>
                        {section.decorativeElement && section.decorativeElement !== 'none' && decorativeElements[section.decorativeElement].icon && (
                          <div className="flex items-center gap-1">
                            {React.createElement(decorativeElements[section.decorativeElement].icon, { size: 24, color: '#6B7280' })}
                            {decorativeElements[section.decorativeElement].secondary && 
                              React.createElement(decorativeElements[section.decorativeElement].secondary, { size: 20, color: '#6B7280' })}
                          </div>
                        )}
                      </div>
                      
                      <div className="prose prose-lg max-w-none">
                        <PortableText 
                          value={section.content}
                          components={{
                            block: {
                              normal: ({children}) => <p className="text-gray-700 leading-relaxed mb-6">{children}</p>,
                            },
                            marks: {
                              strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                              em: ({children}) => <em className="italic">{children}</em>,
                            }
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Slika */}
                    {section.image && (
                      <div className={`relative min-h-[300px] lg:min-h-[400px] overflow-hidden ${
                        section.imagePosition === 'left' ? 'lg:col-start-1' : ''
                      }`}>
                        <div className="absolute inset-0 bg-black/5 z-10"></div>
                        <Image
                          src={section.image.asset.url}
                          alt={section.image.alt || section.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                          placeholder="blur"
                          blurDataURL={section.image.asset.metadata.lqip}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Vremenska linija */}
      {data.timeline && data.timeline.length > 0 && (
        <section id="timeline" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Životni put
                </h2>
                <p className="text-lg text-gray-600">
                  Ključni trenuci koji su oblikovali Željanin rad i viziju
                </p>
              </div>
              
              <div className="relative">
                {/* Vertikalna linija */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-primary-300"></div>
                
                <div className="space-y-16">
                  {data.timeline.map((event, index) => (
                    <div key={index} className="relative flex items-start gap-8 group">
                      {/* Ikona */}
                      <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 ${
                        event.featured 
                          ? 'bg-primary-500 border-4 border-primary-200' 
                          : 'bg-white border-4 border-gray-200 group-hover:border-primary-200'
                      }`}>
                        {event.icon && timelineIcons[event.icon] ? 
                          React.createElement(timelineIcons[event.icon], { 
                            size: 24, 
                            color: event.featured ? 'white' : '#6B7280' 
                          }) : 
                          <LocationIcon size={24} color={event.featured ? 'white' : '#6B7280'} />
                        }
                      </div>
                      
                      {/* Sadržaj */}
                      <div className={`flex-1 rounded-xl p-6 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:transform group-hover:scale-[1.02] ${
                        event.featured 
                          ? 'bg-primary-50 border border-primary-200' 
                          : 'bg-white border border-gray-200 group-hover:border-primary-100'
                      }`}>
                        <div className="flex items-center gap-4 mb-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            event.featured 
                              ? 'bg-primary-500 text-white' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {event.year}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {event.title}
                        </h3>
                        {event.description && (
                          <p className="text-gray-600 leading-relaxed">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dostignuća */}
      {data.achievements && data.achievements.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Dostignuća i priznanja
                </h2>
                <p className="text-lg text-gray-600">
                  Rezultati rada i međunarodna priznanja
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.achievements.map((achievement, index) => (
                  <div key={index} className="group">
                    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group-hover:transform group-hover:scale-105">
                      <div className="text-center">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4"
                          style={{ backgroundColor: achievement.color }}
                        >
                          {achievement.icon && achievementIcons[achievement.icon] ? 
                            React.createElement(achievementIcons[achievement.icon], { 
                              size: 24, 
                              color: 'white' 
                            }) : 
                            <TrophyIcon size={24} color="white" />
                          }
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {achievement.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {achievement.description}
                        </p>
                        
                        {achievement.year && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                            {achievement.year}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Istaknute knjige */}
      {data.featuredBooks && data.featuredBooks.length > 0 && (
        <section id="books" className="py-24 bg-primary-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Autorka dela
                </h2>
                <p className="text-lg text-gray-600">
                  Knjige koje spajaju bajku sa naukom i razvijaju srećne učenike
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {data.featuredBooks.map((book, index) => (
                  <Link
                    key={book._id}
                    href={`/knjige/${book.slug?.current || 'no-slug'}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:transform group-hover:scale-105 border border-gray-100">
                      <div className="relative h-64 overflow-hidden bg-gray-100">
                        <div className="absolute inset-0 bg-black/10 z-10"></div>
                        <Image
                          src={book.coverImage.asset.url}
                          alt={book.coverImage.alt || book.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          placeholder="blur"
                          blurDataURL={book.coverImage.asset.metadata.lqip}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        
                        {/* Season badge */}
                        <div className="absolute top-3 right-3 z-20">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                            book.seasonalTheme === 'autumn' ? 'bg-orange-500/90 text-white' :
                            book.seasonalTheme === 'winter' ? 'bg-blue-500/90 text-white' :
                            book.seasonalTheme === 'spring' ? 'bg-green-500/90 text-white' :
                            'bg-yellow-500/90 text-white'
                          }`}>
                            {book.seasonalTheme === 'autumn' ? 'Jesen' :
                             book.seasonalTheme === 'winter' ? 'Zima' :
                             book.seasonalTheme === 'spring' ? 'Proleće' :
                             'Leto'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                          {book.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {book.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{book.publicationYear}</span>
                          <span className="capitalize">{book.seasonalTheme}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <BooksButton />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA sekcija */}
      <section className="py-20 bg-primary-600 relative overflow-hidden">
        <FloatingLetters 
          className="opacity-10"
          count={20}
          speed="medium"
          colors={['#ffffff']}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Zainteresovani za saradnju?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Kontaktirajte nas za edukativne programe, radionice ili izdavačku saradnju
            </p>
            
            <CTAButtons />
          </div>
        </div>
      </section>
    </main>
  )
}