'use client'

import React, { useState, useMemo } from 'react'
import './success-stories.css'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Star, TrendingUp, Users, Award, BookOpen, Brain, Focus, Trophy, Clock, MapPin, Quote, Filter, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import AchievementBadge from '@/components/ui/AchievementBadge'
import { 
  WordByWordReveal, 
  NumberCounter, 
  BrushUnderline, 
  ScrollReveal, 
  OptimizedAnimatedCounter,
  FadeInOnScroll
} from '@/components/animations'
import { StaggeredList } from '@/components/animations/ScrollTrigger'

interface Result {
  metric: string
  label: string
}

interface Video {
  url: string
  thumbnail?: {
    asset?: {
      _id: string
      url: string
    }
  }
  description: string
}

interface SuccessStory {
  _id: string
  studentName: string
  age: string
  program?: { 
    _id: string
    title: string 
  }
  testimonial: string
  results: Result[]
  beforeSkills: string[]
  afterSkills: string[]
  video?: Video
  featured: boolean
  publishedAt: string
  location: string
}

interface Stats {
  totalStudents: number
  averageImprovement: number
  programsOffered: number
  satisfactionRate: number
}

interface SuccessStoriesClientProps {
  successStories: SuccessStory[]
  stats: Stats
}

type AgeGroup = 'svi' | 'predškolski' | 'školski' | 'tinejdžeri'
type Program = 'svi' | 'brzo čitanje' | 'memorija' | 'koncentracija'
type Achievement = 'svi' | 'takmičenja' | 'poboljšanja' | 'sertifikati'

export default function SuccessStoriesClient({ successStories = [], stats }: SuccessStoriesClientProps) {
  const [selectedFilters, setSelectedFilters] = useState({
    ageGroup: 'svi' as AgeGroup,
    program: 'svi' as Program,
    achievement: 'svi' as Achievement
  })
  const [showFilters, setShowFilters] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [expandedStory, setExpandedStory] = useState<string | null>(null)

  // Mock data if empty (for development)
  const mockStories: SuccessStory[] = [
    {
      _id: '1',
      studentName: 'Marija Petrović',
      age: '12 godina',
      program: { _id: '1', title: 'Brzo čitanje' },
      testimonial: 'Pre kursa sam čitala 120 reči u minutu, a sada čitam preko 400! Dodatno, mnogo bolje razumem ono što čitam. Ovo je potpuno promenilo moj odnos prema učenju.',
      results: [
        { metric: '320%', label: 'Poboljšanje brzine čitanja' },
        { metric: '95%', label: 'Razumevanje teksta' },
        { metric: '1. mesto', label: 'Školsko takmičenje' }
      ],
      beforeSkills: ['Sporo čitanje', 'Slaba koncentracija', 'Zaboravljanje sadržaja'],
      afterSkills: ['Brzo čitanje', 'Odlična koncentracija', 'Savršeno pamćenje', 'Analitičko mišljenje'],
      featured: true,
      publishedAt: '2024-01-15',
      location: 'Beograd'
    },
    {
      _id: '2', 
      studentName: 'Stefan Nikolić',
      age: '8 godina',
      program: { _id: '2', title: 'Memorija i koncentracija' },
      testimonial: 'Moj sin je bio vrlo rastresit, a sada može da se koncentriše na zadatke po sat vremena. Rezultati u školi su se drastično poboljšali!',
      results: [
        { metric: '300%', label: 'Poboljšanje pamćenja' },
        { metric: '5.00', label: 'Prosek u školi' },
        { metric: '45 min', label: 'Fokus na zadatak' }
      ],
      beforeSkills: ['Kratka pažnja', 'Zaboravljanje', 'Loši oceni'],
      afterSkills: ['Dugotrajna koncentracija', 'Odlično pamćenje', 'Odlični rezultati'],
      featured: false,
      publishedAt: '2024-01-10',
      location: 'Novi Sad'
    }
  ]

  const displayStories = successStories.length > 0 ? successStories : mockStories
  const displayStats = stats || { totalStudents: 1200, averageImprovement: 85, programsOffered: 3, satisfactionRate: 98 }

  const filteredStories = useMemo(() => {
    return displayStories.filter(story => {
      const ageNumber = parseInt(story.age)
      
      // Age group filter
      let ageMatch = true
      if (selectedFilters.ageGroup !== 'svi') {
        switch (selectedFilters.ageGroup) {
          case 'predškolski':
            ageMatch = ageNumber < 7
            break
          case 'školski':
            ageMatch = ageNumber >= 7 && ageNumber <= 14
            break
          case 'tinejdžeri':
            ageMatch = ageNumber >= 15
            break
        }
      }

      // Program filter
      let programMatch = true
      if (selectedFilters.program !== 'svi' && story.program) {
        programMatch = story.program.title.toLowerCase().includes(selectedFilters.program.toLowerCase())
      }

      // Achievement filter - simplified for demo
      let achievementMatch = true
      if (selectedFilters.achievement !== 'svi') {
        const hasCompetition = story.results.some(r => r.label.toLowerCase().includes('takmič'))
        const hasImprovement = story.results.some(r => r.metric.includes('%'))
        const hasCertificate = story.results.some(r => r.label.toLowerCase().includes('sertif'))
        
        switch (selectedFilters.achievement) {
          case 'takmičenja':
            achievementMatch = hasCompetition
            break
          case 'poboljšanja':
            achievementMatch = hasImprovement
            break
          case 'sertifikati':
            achievementMatch = hasCertificate
            break
        }
      }

      return ageMatch && programMatch && achievementMatch
    })
  }, [displayStories, selectedFilters])

  const getAgeGroup = (age: string) => {
    const ageNumber = parseInt(age)
    if (ageNumber < 7) return 'predškolski'
    if (ageNumber <= 14) return 'školski'
    return 'tinejdžeri'
  }

  const getBadgeType = (results: Result[]) => {
    if (results.some(r => r.label.toLowerCase().includes('takmič'))) return 'champion'
    if (results.some(r => r.metric.includes('%'))) return 'fast-learner'
    return 'course-complete'
  }

  const clearFilters = () => {
    setSelectedFilters({
      ageGroup: 'svi',
      program: 'svi', 
      achievement: 'svi'
    })
  }

  const hasActiveFilters = selectedFilters.ageGroup !== 'svi' || selectedFilters.program !== 'svi' || selectedFilters.achievement !== 'svi'

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#5DBFDB]">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <ScrollReveal>
              <div className="mb-6">
                <span className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium">
                  Transformacije koje inspirišu
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <WordByWordReveal text="Priče koje menjaju" delay={100} />
                <br />
                <BrushUnderline color="#F4C950" thickness={8} delay={1000}>
                  <span className="relative">živote</span>
                </BrushUnderline>
              </h1>

              <p className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed">
                Otkrijte neverovatne transformacije naših učenika - od prvog dana do vrhunskih rezultata
              </p>
            </ScrollReveal>

            {/* Stats */}
            <FadeInOnScroll delay={500}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
                <div className="text-center">
                  <div className="stats-counter text-3xl font-bold">
                    <OptimizedAnimatedCounter end={displayStats.totalStudents} duration={2000} />+
                  </div>
                  <div className="text-sm opacity-90">Uspešnih učenika</div>
                </div>
                <div className="text-center">
                  <div className="stats-counter text-3xl font-bold">
                    <OptimizedAnimatedCounter end={displayStats.averageImprovement} duration={2000} />%
                  </div>
                  <div className="text-sm opacity-90">Prosečno poboljšanje</div>
                </div>
                <div className="text-center">
                  <div className="stats-counter text-3xl font-bold">
                    <OptimizedAnimatedCounter end={displayStats.programsOffered} duration={2000} />
                  </div>
                  <div className="text-sm opacity-90">Programa</div>
                </div>
                <div className="text-center">
                  <div className="stats-counter text-3xl font-bold">
                    <OptimizedAnimatedCounter end={displayStats.satisfactionRate} duration={2000} />%
                  </div>
                  <div className="text-sm opacity-90">Zadovoljstvo</div>
                </div>
              </div>
            </FadeInOnScroll>

            <Button 
              color="sun" 
              size="lg"
              onClick={() => {
                const storiesSection = document.getElementById('success-stories')
                storiesSection?.scrollIntoView({ behavior: 'smooth' })
              }}
              rightIcon={<TrendingUp className="w-5 h-5" />}
            >
              Istražite transformacije
            </Button>
          </div>
        </div>

        {/* Background Elements */}
        <div className="floating-shape absolute top-20 left-10 w-20 h-20 bg-[#F4C950] rounded-full opacity-20" />
        <div className="floating-shape absolute top-40 right-20 w-16 h-16 bg-[#91C733] rounded-full opacity-20" />
        <div className="floating-shape absolute bottom-20 left-20 w-12 h-12 bg-[#E53935] rounded-full opacity-20" />
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant={showFilters ? 'filled' : 'outline'}
                color="sky"
                onClick={() => setShowFilters(!showFilters)}
                leftIcon={<Filter className="w-4 h-4" />}
              >
                Filteri
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
              
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  color="heart"
                  size="sm"
                  onClick={clearFilters}
                  leftIcon={<X className="w-4 h-4" />}
                >
                  Očisti filtere
                </Button>
              )}
            </div>

            <div className="text-sm text-gray-600">
              Prikazano {filteredStories.length} od {displayStories.length} priča
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-6 p-6 bg-white rounded-xl border overflow-hidden"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Age Groups */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Uzrasne grupe
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'svi', label: 'Svi uzrasti', icon: Users },
                        { value: 'predškolski', label: 'Predškolski (3-6)', icon: BookOpen },
                        { value: 'školski', label: 'Školski (7-14)', icon: Brain },
                        { value: 'tinejdžeri', label: 'Tinejdžeri (15+)', icon: Focus }
                      ].map(({ value, label, icon: Icon }) => (
                        <button
                          key={value}
                          onClick={() => setSelectedFilters(prev => ({ ...prev, ageGroup: value as AgeGroup }))}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                            selectedFilters.ageGroup === value
                              ? 'border-[#5DBFDB] bg-[#5DBFDB]/5 text-[#5DBFDB]'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Programs */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Programi
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'svi', label: 'Svi programi', icon: BookOpen },
                        { value: 'brzo čitanje', label: 'Brzo čitanje', icon: BookOpen },
                        { value: 'memorija', label: 'Memorija', icon: Brain },
                        { value: 'koncentracija', label: 'Koncentracija', icon: Focus }
                      ].map(({ value, label, icon: Icon }) => (
                        <button
                          key={value}
                          onClick={() => setSelectedFilters(prev => ({ ...prev, program: value as Program }))}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                            selectedFilters.program === value
                              ? 'border-[#91C733] bg-[#91C733]/5 text-[#91C733]'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Dostignuća
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'svi', label: 'Sva dostignuća', icon: Star },
                        { value: 'takmičenja', label: 'Takmičenja', icon: Trophy },
                        { value: 'poboljšanja', label: 'Poboljšanja', icon: TrendingUp },
                        { value: 'sertifikati', label: 'Sertifikati', icon: Award }
                      ].map(({ value, label, icon: Icon }) => (
                        <button
                          key={value}
                          onClick={() => setSelectedFilters(prev => ({ ...prev, achievement: value as Achievement }))}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                            selectedFilters.achievement === value
                              ? 'border-[#F4C950] bg-[#F4C950]/5 text-[#F4C950]'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section id="success-stories" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <StaggeredList className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story, index) => (
              <motion.article
                key={story._id}
                className="story-card bg-white rounded-2xl shadow-lg overflow-hidden group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Story Header */}
                <div className="p-6 border-b">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-[#5DBFDB] rounded-full flex items-center justify-center text-white font-bold">
                          {story.studentName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{story.studentName}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{story.age}</span>
                            {story.location && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {story.location}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {story.program && (
                        <span className="inline-block bg-[#91C733]/10 text-[#91C733] px-3 py-1 rounded-full text-xs font-medium">
                          {story.program.title}
                        </span>
                      )}
                    </div>

                    <div className="achievement-badge-glow">
                      <AchievementBadge
                        type={getBadgeType(story.results)}
                        level="gold"
                        size="sm"
                        unlocked={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Video Thumbnail */}
                {story.video?.thumbnail?.asset?.url && (
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={story.video.thumbnail.asset.url}
                      alt={story.video.description || `${story.studentName} video testimonal`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <button
                        onClick={() => setSelectedVideo(story.video!)}
                        className="video-play-button w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center"
                      >
                        <Play className="w-6 h-6 text-gray-900 ml-1" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Story Content */}
                <div className="p-6">
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#5DBFDB]/20" />
                    <p className="testimonial-quote text-gray-700 italic relative pl-4">
                      "{story.testimonial}"
                    </p>
                  </div>

                  {/* Results */}
                  {story.results && story.results.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Rezultati:</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {story.results.slice(0, 3).map((result, i) => (
                          <div key={i} className="bg-gradient-to-r from-[#5DBFDB]/5 to-[#91C733]/5 rounded-lg p-3 border border-gray-100">
                            <div className="result-metric text-lg">{result.metric}</div>
                            <div className="text-sm text-gray-600">{result.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Before/After Skills */}
                  {(story.beforeSkills?.length > 0 || story.afterSkills?.length > 0) && (
                    <div className="mb-6">
                      <Button
                        variant="outline"
                        color="sky"
                        size="sm"
                        fullWidth
                        onClick={() => setExpandedStory(expandedStory === story._id ? null : story._id)}
                      >
                        {expandedStory === story._id ? 'Sakrij detalje' : 'Prikaži transformaciju'}
                      </Button>
                      
                      <AnimatePresence>
                        {expandedStory === story._id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-4 grid md:grid-cols-2 gap-4 overflow-hidden"
                          >
                            {story.beforeSkills?.length > 0 && (
                              <div className="bg-gray-50 rounded-lg p-4">
                                <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                  Pre kursa
                                </h5>
                                <ul className="space-y-1">
                                  {story.beforeSkills.map((skill, i) => (
                                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                      <X className="w-3 h-3 text-red-400 flex-shrink-0" />
                                      {skill}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {story.afterSkills?.length > 0 && (
                              <div className="bg-[#91C733]/5 rounded-lg p-4">
                                <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                  <div className="w-2 h-2 bg-[#91C733] rounded-full" />
                                  Posle kursa
                                </h5>
                                <ul className="space-y-1">
                                  {story.afterSkills.map((skill, i) => (
                                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                      <Star className="w-3 h-3 text-[#91C733] flex-shrink-0" />
                                      {skill}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Story Date */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(story.publishedAt).toLocaleDateString('sr-RS', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </span>
                    
                    {story.featured && (
                      <span className="bg-[#F4C950]/10 text-[#F4C950] px-2 py-1 rounded text-xs font-medium">
                        Izdvojeno
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </StaggeredList>

          {filteredStories.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nema rezultata za izabrane filtere
              </h3>
              <p className="text-gray-600 mb-4">
                Pokušajte sa drugačijim filterima ili posetite našu stranicu
              </p>
              <Button
                color="sky"
                onClick={clearFilters}
              >
                Očisti filtere
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-[#1E293B]">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Vaša priča uspeha počinje 
                <BrushUnderline color="#F4C950" thickness={6} delay={500}>
                  <span className="relative text-[#F4C950]"> ovde</span>
                </BrushUnderline>
              </h2>
              
              <p className="text-xl text-white/90 mb-8">
                Pridružite se hiljadama učenika koji su transformisali svoj način učenja. 
                Vaša transformacija je samo jedan korak udaljeno.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  color="sun"
                  size="lg"
                  leftIcon={<BookOpen className="w-5 h-5" />}
                  onClick={() => window.location.href = '/zakazivanje'}
                >
                  Zakazite prvi čas
                </Button>
                
                <Button
                  variant="outline"
                  color="sky"
                  size="lg"
                  leftIcon={<Users className="w-5 h-5" />}
                  onClick={() => window.location.href = '/programi'}
                >
                  Istražite programe
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-4xl bg-white rounded-xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="aspect-video">
                <iframe
                  src={selectedVideo.url}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
              
              {selectedVideo.description && (
                <div className="p-6">
                  <p className="text-gray-700">{selectedVideo.description}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}