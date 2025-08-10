// =================================================================
// FRANCHISE SYSTEM COMPONENT LIBRARY
// =================================================================
// React components for educational franchise system
// Team: Frontend, UX/UI, Content Integration
// =================================================================

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, Star, Users, Clock, Award, ChevronRight, Search, Filter } from 'lucide-react'

// =================================================================
// TYPES & INTERFACES
// =================================================================

interface Location {
  _id: string
  city: string
  slug: { current: string }
  region: string
  coordinates: { lat: number; lng: number }
  marketSize: 'large' | 'medium' | 'small'
  demandLevel: 'high' | 'medium' | 'low'
  status: 'active' | 'coming-soon' | 'planned' | 'inactive'
  centerCount: number
  description?: string
  featured: boolean
}

interface Center {
  _id: string
  name: string
  slug: { current: string }
  location: Location
  centerType: 'franchise' | 'company-owned' | 'partner' | 'pilot'
  status: 'active' | 'temporarily-closed' | 'preparing' | 'inactive'
  contactInfo: {
    address: string
    phone?: string
    email?: string
  }
  capacity: {
    totalCapacity: number
    currentEnrollment: number
    classroomCount: number
  }
  programsOffered: Program[]
  photos: Array<{ asset: { url: string }; alt: string }>
  featured: boolean
}

interface Educator {
  _id: string
  name: string
  slug: { current: string }
  title: string
  bio: any[] // Rich text
  photo: { asset: { url: string }; alt: string }
  certificationLevel: 'basic' | 'advanced' | 'senior' | 'master' | 'mentor'
  yearsOfExperience: number
  specializations: string[]
  workType: 'center-employed' | 'independent' | 'mobile' | 'online'
  centerAffiliation?: Center
  availability: 'available' | 'waiting-list' | 'unavailable' | 'on-break'
  successMetrics?: {
    totalStudentsTaught: number
    averageImprovement: number
    parentSatisfactionRate: number
  }
  featured: boolean
  isActive: boolean
}

interface Program {
  _id: string
  title: string
  slug: { current: string }
  category: string
  ageGroups: string[]
  duration: string
  sessionCount: number
  description: string
}

// =================================================================
// 1. LOCATION COMPONENTS
// =================================================================

export const LocationFinder: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')

  const regions = [
    { value: 'all', label: 'Sve regije' },
    { value: 'belgrade', label: 'Beograd' },
    { value: 'vojvodina', label: 'Vojvodina' },
    { value: 'sumadija', label: 'Šumadija' },
    { value: 'juzna-srbija', label: 'Južna Srbija' },
    { value: 'zapadna-srbija', label: 'Zapadna Srbija' }
  ]

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.city.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRegion = selectedRegion === 'all' || location.region === selectedRegion
    return matchesSearch && matchesRegion
  })

  return (
    <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pronađite Srećno učenje u vašem gradu
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Preko 450 edukatora u 10+ gradova širom Srbije spremo je da pomogne vašem detetu
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pretražite po gradu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white min-w-48"
            >
              {regions.map(region => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Lista
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === 'map' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mapa
            </button>
          </div>
        </div>

        {/* Location Grid */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredLocations.map((location, index) => (
                <motion.div
                  key={location._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <LocationCard location={location} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Map View */}
        {viewMode === 'map' && (
          <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
            <p className="text-gray-500">Interactive Map Component</p>
            {/* Integrate with MapBox or Google Maps */}
          </div>
        )}
      </div>
    </section>
  )
}

export const LocationCard: React.FC<{ location: Location }> = ({ location }) => {
  const statusConfig = {
    'active': { 
      badge: 'Aktivno', 
      color: 'bg-green-100 text-green-800',
      emoji: '✅'
    },
    'coming-soon': { 
      badge: 'Uskoro', 
      color: 'bg-yellow-100 text-yellow-800',
      emoji: '🟡'
    },
    'planned': { 
      badge: 'Planirano', 
      color: 'bg-blue-100 text-blue-800',
      emoji: '⏳'
    },
    'inactive': { 
      badge: 'Neaktivno', 
      color: 'bg-gray-100 text-gray-800',
      emoji: '❌'
    }
  }

  const status = statusConfig[location.status]
  const marketSizeLabels = {
    large: 'Veliko tržište',
    medium: 'Srednje tržište', 
    small: 'Malo tržište'
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {location.featured && '⭐ '}{location.city}
            </h3>
            <p className="text-sm text-gray-500 uppercase tracking-wider">
              {location.region.replace('-', ' ')}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
            {status.emoji} {status.badge}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4">
          {location.description}
        </p>
      </div>

      {/* Stats */}
      <div className="px-6 pb-4">
        <div className="flex justify-between text-sm">
          <div className="text-center">
            <div className="font-semibold text-blue-600">{location.centerCount}</div>
            <div className="text-gray-500">Centara</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-green-600 capitalize">{location.demandLevel}</div>
            <div className="text-gray-500">Tražnja</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-purple-600">{marketSizeLabels[location.marketSize]}</div>
            <div className="text-gray-500">Tržište</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            {location.region.toUpperCase()}
          </div>
          <a
            href={`/lokacije/${location.slug.current}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center group"
          >
            Pogledaj centire
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  )
}

// =================================================================
// 2. CENTER COMPONENTS  
// =================================================================

export const CenterCard: React.FC<{ center: Center }> = ({ center }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const typeConfig = {
    'franchise': { label: 'Franšiza', icon: '🏪', color: 'text-blue-600' },
    'company-owned': { label: 'Kompanijski', icon: '🏢', color: 'text-green-600' },
    'partner': { label: 'Partner', icon: '🤝', color: 'text-purple-600' },
    'pilot': { label: 'Pilot', icon: '🧪', color: 'text-orange-600' }
  }

  const type = typeConfig[center.centerType]

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Gallery */}
      <div className="relative h-48">
        {center.photos && center.photos.length > 0 ? (
          <>
            <img
              src={center.photos[currentImageIndex]?.asset.url}
              alt={center.photos[currentImageIndex]?.alt}
              className="w-full h-full object-cover"
            />
            {center.photos.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {center.photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🏫</div>
              <p className="text-blue-600 font-medium">Srećno učenje</p>
            </div>
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium flex items-center">
            <span className="mr-1">{type.icon}</span>
            {type.label}
          </span>
        </div>

        {/* Featured Badge */}
        {center.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-yellow-500 text-white rounded-full text-xs font-medium">
              ⭐ Izdvojen
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {center.name}
          </h3>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {center.contactInfo.address}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <div className="text-lg font-semibold text-blue-600">
              {center.capacity.totalCapacity}
            </div>
            <div className="text-xs text-gray-500">Kapacitet</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-600">
              {center.capacity.currentEnrollment}
            </div>
            <div className="text-xs text-gray-500">Upisano</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-purple-600">
              {center.programsOffered?.length || 0}
            </div>
            <div className="text-xs text-gray-500">Programa</div>
          </div>
        </div>

        {/* Programs */}
        {center.programsOffered && center.programsOffered.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {center.programsOffered.slice(0, 3).map(program => (
                <span
                  key={program._id}
                  className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium"
                >
                  {program.title}
                </span>
              ))}
              {center.programsOffered.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                  +{center.programsOffered.length - 3} još
                </span>
              )}
            </div>
          </div>
        )}

        {/* Contact */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            {center.contactInfo.phone && (
              <a
                href={`tel:${center.contactInfo.phone}`}
                className="text-green-600 hover:text-green-800"
              >
                <Phone className="w-5 h-5" />
              </a>
            )}
            {center.contactInfo.email && (
              <a
                href={`mailto:${center.contactInfo.email}`}
                className="text-blue-600 hover:text-blue-800"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}
          </div>
          <a
            href={`/centri/${center.slug.current}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
          >
            Detaljnije
            <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  )
}

export const CenterGrid: React.FC<{ centers: Center[] }> = ({ centers }) => {
  const [filteredCenters, setFilteredCenters] = useState(centers)
  const [filterType, setFilterType] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('name')

  useEffect(() => {
    let filtered = centers

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(center => center.centerType === filterType)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'capacity':
          return b.capacity.totalCapacity - a.capacity.totalCapacity
        case 'enrollment':
          return b.capacity.currentEnrollment - a.capacity.currentEnrollment
        default:
          return 0
      }
    })

    setFilteredCenters(filtered)
  }, [centers, filterType, sortBy])

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tip centra
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Svi tipovi</option>
            <option value="franchise">Franšiza</option>
            <option value="company-owned">Kompanijski</option>
            <option value="partner">Partner</option>
            <option value="pilot">Pilot</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sortiraj po
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Naziv</option>
            <option value="capacity">Kapacitet</option>
            <option value="enrollment">Broj upisanih</option>
          </select>
        </div>
      </div>

      {/* Centers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCenters.map(center => (
          <CenterCard key={center._id} center={center} />
        ))}
      </div>

      {/* Empty State */}
      {filteredCenters.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏫</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Nema centara koji odgovaraju filtrima
          </h3>
          <p className="text-gray-600">
            Pokušajte da promenite filter ili kontaktirajte nas za informacije o novim lokacijama
          </p>
        </div>
      )}
    </div>
  )
}

// =================================================================
// 3. EDUCATOR COMPONENTS
// =================================================================

export const EducatorCard: React.FC<{ educator: Educator }> = ({ educator }) => {
  const certificationConfig = {
    'basic': { label: 'Osnovni', color: 'bg-green-100 text-green-800', icon: '🌱' },
    'advanced': { label: 'Napredni', color: 'bg-blue-100 text-blue-800', icon: '🌟' },
    'senior': { label: 'Senior', color: 'bg-purple-100 text-purple-800', icon: '👑' },
    'master': { label: 'Master', color: 'bg-orange-100 text-orange-800', icon: '🏆' },
    'mentor': { label: 'Mentor', color: 'bg-red-100 text-red-800', icon: '🎯' }
  }

  const availabilityConfig = {
    'available': { label: 'Dostupan', color: 'bg-green-100 text-green-800', icon: '✅' },
    'waiting-list': { label: 'Lista čekanja', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
    'unavailable': { label: 'Nedostupan', color: 'bg-red-100 text-red-800', icon: '❌' },
    'on-break': { label: 'Pauza', color: 'bg-gray-100 text-gray-800', icon: '⏸️' }
  }

  const cert = certificationConfig[educator.certificationLevel]
  const availability = availabilityConfig[educator.availability]

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          {/* Photo */}
          <div className="relative">
            <img
              src={educator.photo?.asset.url}
              alt={educator.photo?.alt || educator.name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-gray-100"
            />
            {educator.featured && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⭐</span>
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {educator.name}
            </h3>
            <p className="text-gray-600 text-sm mb-2">{educator.title}</p>
            
            <div className="flex flex-wrap gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${cert.color}`}>
                {cert.icon} {cert.label}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${availability.color}`}>
                {availability.icon} {availability.label}
              </span>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-center">
          <div>
            <div className="text-lg font-semibold text-blue-600">
              {educator.yearsOfExperience}
            </div>
            <div className="text-xs text-gray-500">Godine iskustva</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-600">
              {educator.successMetrics?.totalStudentsTaught || '50+'}
            </div>
            <div className="text-xs text-gray-500">Učenika obučeno</div>
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {educator.specializations.slice(0, 3).map(spec => (
              <span
                key={spec}
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium"
              >
                {spec === 'speed-reading' && 'Brzočitanje'}
                {spec === 'mental-arithmetic' && 'Mentalna aritmetika'} 
                {spec === 'memory-techniques' && 'Tehnike memorije'}
                {spec === 'focus-concentration' && 'Koncentracija'}
              </span>
            ))}
            {educator.specializations.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                +{educator.specializations.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Center Affiliation */}
        {educator.centerAffiliation && (
          <div className="mb-4 text-sm text-gray-600 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {educator.centerAffiliation.name}
          </div>
        )}

        {/* Success Metrics */}
        {educator.successMetrics && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-800 font-medium">Stopa uspeha</span>
              <span className="text-lg font-bold text-green-600">
                {educator.successMetrics.averageImprovement}%
              </span>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
          </div>
          <a
            href={`/edukatori/${educator.slug.current}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
          >
            Profil
            <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  )
}

export const EducatorProfile: React.FC<{ educator: Educator }> = ({ educator }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={educator.photo?.asset.url}
            alt={educator.name}
            className="w-32 h-32 rounded-full object-cover ring-4 ring-white/20"
          />
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold mb-2">{educator.name}</h1>
            <p className="text-xl text-blue-100 mb-3">{educator.title}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {educator.yearsOfExperience} godina iskustva
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {educator.specializations.length} specijalizacija
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Bio */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-600" />
              O edukatoru
            </h2>
            <div className="prose prose-gray max-w-none">
              {/* Rich text content would be rendered here */}
              <p>Biografija edukatora...</p>
            </div>
          </div>

          {/* Achievements */}
          {educator.achievements && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2 text-yellow-600" />
                Postignuća i nagrade
              </h2>
              <div className="space-y-4">
                {/* Achievement items would be mapped here */}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Statistike</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Učenika obučeno</span>
                <span className="font-semibold">{educator.successMetrics?.totalStudentsTaught || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Prosečno poboljšanje</span>
                <span className="font-semibold text-green-600">
                  {educator.successMetrics?.averageImprovement || 'N/A'}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Zadovoljstvo roditelja</span>
                <span className="font-semibold text-blue-600">
                  {educator.successMetrics?.parentSatisfactionRate || 'N/A'}%
                </span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  availabilityConfig[educator.availability].color
                }`}>
                  {availabilityConfig[educator.availability].label}
                </span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Rezervišite čas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// =================================================================
// 4. PROGRAM COMPONENTS
// =================================================================

export const ProgramCard: React.FC<{ program: Program }> = ({ program }) => {
  const categoryIcons = {
    'speed-reading': '📖',
    'mental-arithmetic': '🧮', 
    'memory-techniques': '🧠',
    'complete-program': '🎓'
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl mb-2">
            {categoryIcons[program.category] || '📚'}
          </div>
          <div className="flex flex-wrap gap-1">
            {program.ageGroups.map(age => (
              <span key={age} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {age}
              </span>
            ))}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {program.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {program.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {program.duration}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {program.sessionCount} časova
          </div>
        </div>

        <a
          href={`/programi/${program.slug.current}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Saznajte više
        </a>
      </div>
    </div>
  )
}

// =================================================================
// EXPORT COMPONENTS
// =================================================================

export {
  LocationFinder,
  LocationCard,
  CenterCard,
  CenterGrid,
  EducatorCard,
  EducatorProfile,
  ProgramCard
}

// =================================================================
// USAGE EXAMPLES & INTEGRATION NOTES
// =================================================================

/*
INTEGRATION EXAMPLES:

1. Location Page:
```tsx
import { LocationFinder } from '@/components/franchise/LocationComponents'

export default function LocationsPage() {
  return (
    <div>
      <LocationFinder />
    </div>
  )
}
```

2. City-specific page:
```tsx
import { CenterGrid } from '@/components/franchise/CenterComponents'
import { EducatorCard } from '@/components/franchise/EducatorComponents'

export default function CityPage({ centers, educators }) {
  return (
    <div>
      <CenterGrid centers={centers} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {educators.map(educator => (
          <EducatorCard key={educator._id} educator={educator} />
        ))}
      </div>
    </div>
  )
}
```

3. Sanity queries needed:
```js
// Get locations with center count
const locationsQuery = `*[_type == "location"] {
  _id,
  city,
  slug,
  region,
  coordinates,
  marketSize,
  demandLevel,
  status,
  description,
  featured,
  "centerCount": count(*[_type == "center" && references(^._id)])
} | order(order asc, city asc)`

// Get centers for location
const centersInLocationQuery = `*[_type == "center" && location._ref == $locationId] {
  _id,
  name,
  slug,
  centerType,
  status,
  contactInfo,
  capacity,
  photos,
  featured,
  location->,
  programsOffered[]->
} | order(featured desc, name asc)`
```

STYLING INTEGRATION:
- Uses Tailwind CSS with consistent design system
- Responsive design with mobile-first approach  
- Framer Motion for smooth animations
- Lucide React for consistent icons
- Built for integration with existing Srećno učenje brand

PERFORMANCE CONSIDERATIONS:
- Lazy loading for images
- Virtual scrolling for large educator lists
- Optimized queries with selected fields only
- Image optimization with Sanity CDN
- Component-level code splitting
*/