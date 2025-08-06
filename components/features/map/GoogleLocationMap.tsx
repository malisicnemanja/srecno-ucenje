'use client'

import { useState, useCallback, useMemo, useRef } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPinIcon, PhoneIcon, MailIcon } from '@/components/icons'
import { useGoogleMapsApiKey } from '@/hooks/useConfig'

interface Location {
  id: string
  name: string
  address: string
  city: string
  lat: number
  lng: number
  type: 'active' | 'coming_soon' | 'partner'
  phone?: string
  email?: string
  image?: string
  programs?: string[]
}

// Serbian location data
const locationsData: Location[] = [
  {
    id: '1',
    name: 'Srećno učenje Novi Beograd',
    address: 'Bulevar Mihajla Pupina 10',
    city: 'Beograd',
    lat: 44.8167,
    lng: 20.4197,
    type: 'active',
    phone: '+381 11 123 4567',
    email: 'nbg@srecno-ucenje.rs',
    programs: ['Brzo čitanje', 'Mentalna aritmetika', 'Kreativne radionice'],
  },
  {
    id: '2',
    name: 'Srećno učenje Vračar',
    address: 'Njegoševa 45',
    city: 'Beograd',
    lat: 44.7990,
    lng: 20.4694,
    type: 'active',
    phone: '+381 11 234 5678',
    email: 'vracar@srecno-ucenje.rs',
    programs: ['Brzo čitanje', 'Mentalna aritmetika'],
  },
  {
    id: '3',
    name: 'Srećno učenje Novi Sad',
    address: 'Zmaj Jovina 25',
    city: 'Novi Sad',
    lat: 45.2551,
    lng: 19.8451,
    type: 'active',
    phone: '+381 21 345 6789',
    email: 'ns@srecno-ucenje.rs',
    programs: ['Brzo čitanje', 'Mentalna aritmetika', 'Kreativne radionice', 'Letnji kamp'],
  },
  {
    id: '4',
    name: 'Srećno učenje Niš',
    address: 'Obrenovićeva 12',
    city: 'Niš',
    lat: 43.3209,
    lng: 21.8958,
    type: 'coming_soon',
    programs: ['Brzo čitanje', 'Mentalna aritmetika'],
  },
  {
    id: '5',
    name: 'Srećno učenje Kragujevac',
    address: 'Kralja Petra I 15',
    city: 'Kragujevac',
    lat: 44.0142,
    lng: 20.9392,
    type: 'partner',
    phone: '+381 34 456 7890',
    programs: ['Brzo čitanje'],
  },
  {
    id: '6',
    name: 'Srećno učenje Subotica',
    address: 'Korzo 5',
    city: 'Subotica',
    lat: 46.1011,
    lng: 19.6658,
    type: 'coming_soon',
    programs: ['Brzo čitanje', 'Mentalna aritmetika'],
  },
  {
    id: '7',
    name: 'Srećno učenje Zemun',
    address: 'Glavna 32',
    city: 'Beograd - Zemun',
    lat: 44.8430,
    lng: 20.4116,
    type: 'active',
    phone: '+381 11 567 8901',
    email: 'zemun@srecno-ucenje.rs',
    programs: ['Mentalna aritmetika', 'Kreativne radionice'],
  },
]

const mapContainerStyle = {
  width: '100%',
  height: '600px',
}

const center = {
  lat: 44.7866, // Serbia center
  lng: 20.4489,
}

const options = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: true,
  mapTypeControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
}

interface GoogleLocationMapProps {
  viewMode?: 'map' | 'list'
  fallbackApiKey?: string
}

export default function GoogleLocationMap({ viewMode = 'map', fallbackApiKey }: GoogleLocationMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [filter, setFilter] = useState<Location['type'] | 'all'>('all')
  const [mapViewMode, setMapViewMode] = useState<'map' | 'list'>(viewMode)
  const mapRef = useRef<google.maps.Map | null>(null)

  // Get Google Maps API key securely from CMS/config
  const { apiKey: googleMapsApiKey, isLoading: isApiKeyLoading, isConfigured } = useGoogleMapsApiKey()
  
  // Use fallback if provided and no key is configured
  const finalApiKey = googleMapsApiKey || fallbackApiKey || ''

  // Filter locations
  const filteredLocations = useMemo(() => {
    if (filter === 'all') return locationsData
    return locationsData.filter(loc => loc.type === filter)
  }, [filter])

  const getMarkerIcon = useCallback((type: Location['type']) => {
    const colors = {
      active: '#10B981',
      coming_soon: '#F59E0B',
      partner: '#3B82F6',
    }

    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: colors[type],
      fillOpacity: 0.9,
      strokeColor: '#FFFFFF',
      strokeWeight: 2,
      scale: 12,
    }
  }, [])

  const handleLocationClick = useCallback((location: Location) => {
    setSelectedLocation(location)
    if (mapRef.current) {
      mapRef.current.panTo({ lat: location.lat, lng: location.lng })
      mapRef.current.setZoom(14)
    }
  }, [])

  const LocationCard = ({ location }: { location: Location }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-200"
      onClick={() => handleLocationClick(location)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{location.name}</h3>
          <p className="text-gray-600 flex items-center">
            <MapPinIcon size={16} className="mr-1" />
            {location.address}, {location.city}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          location.type === 'active' ? 'bg-primary-100 text-primary-700' :
          location.type === 'coming_soon' ? 'bg-accent-100 text-accent-700' :
          'bg-secondary-100 text-secondary-700'
        }`}>
          {location.type === 'active' ? 'Aktivno' :
           location.type === 'coming_soon' ? 'Uskoro' :
           'Partner'}
        </div>
      </div>

      {location.programs && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Programi:</p>
          <div className="flex flex-wrap gap-2">
            {location.programs.map((program, i) => (
              <span
                key={i}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
              >
                {program}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="border-t pt-4 space-y-2">
        {location.phone && (
          <a
            href={`tel:${location.phone || ''}${after}`}
            className="flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <PhoneIcon size={16} className="mr-2" />
            {location.phone}
          </a>
        )}
        {location.email && (
          <a
            href={`mailto:${location.email || ''}${after}`}
            className="flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <MailIcon size={16} className="mr-2" />
            {location.email}
          </a>
        )}
      </div>

      {location.type === 'active' && (
        <button className="w-full mt-4 bg-primary-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
          Kontaktiraj centar
        </button>
      )}
    </motion.div>
  )

  return (
    <div className="relative w-full">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setMapViewMode('map')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              mapViewMode === 'map'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Mapa
          </button>
          <button
            onClick={() => setMapViewMode('list')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              mapViewMode === 'list'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Lista
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as Location['type'] | 'all')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Sve lokacije ({locationsData.length})</option>
            <option value="active">Aktivni centri</option>
            <option value="coming_soon">Uskoro</option>
            <option value="partner">Partner centri</option>
          </select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {mapViewMode === 'map' ? (
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative rounded-xl overflow-hidden shadow-2xl"
          >
            {!finalApiKey || isApiKeyLoading ? (
              <div className="w-full h-[600px] bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPinIcon size={48} className="text-gray-400 mx-auto mb-4" />
                  {isApiKeyLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Učitavanje konfiguracije...</p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600 mb-2">Google Maps API ključ nije konfigurisan</p>
                      <p className="text-sm text-gray-500 mb-2">
                        <strong>Za administratore:</strong> Konfiguriši kroz CMS
                      </p>
                      <p className="text-xs text-gray-400">
                        Sanity Studio → Podešavanja Sajta → API Ključevi → Google Maps API Ključ
                      </p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <LoadScript googleMapsApiKey={finalApiKey}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={7}
                  options={options}
                  onLoad={(map) => { mapRef.current = map }}
                >
                  <MarkerClusterer
                    options={{
                      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                      gridSize: 60,
                      minimumClusterSize: 2,
                    }}
                  >
                    {(clusterer) => (
                      <>
                        {filteredLocations.map((location) => (
                          <Marker
                            key={location.id}
                            position={{ lat: location.lat, lng: location.lng }}
                            icon={getMarkerIcon(location.type)}
                            onClick={() => setSelectedLocation(location)}
                            clusterer={clusterer}
                          />
                        ))}
                      </>
                    )}
                  </MarkerClusterer>

                  {selectedLocation && (
                    <InfoWindow
                      position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                      onCloseClick={() => setSelectedLocation(null)}
                    >
                      <div className="p-3 max-w-xs">
                        <h3 className="font-bold text-lg mb-2">{selectedLocation.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{selectedLocation.address}</p>
                        
                        {selectedLocation.programs && (
                          <div className="mb-3">
                            <p className="text-xs font-semibold text-gray-700 mb-1">Programi:</p>
                            <div className="flex flex-wrap gap-1">
                              {selectedLocation.programs.map((program, i) => (
                                <span
                                  key={i}
                                  className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded"
                                >
                                  {program}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedLocation.phone && (
                          <div className="flex items-center text-sm mb-1">
                            <PhoneIcon size={16} className="mr-2 text-gray-500" />
                            {selectedLocation.phone}
                          </div>
                        )}

                        {selectedLocation.email && (
                          <div className="flex items-center text-sm mb-3">
                            <MailIcon size={16} className="mr-2 text-gray-500" />
                            {selectedLocation.email}
                          </div>
                        )}

                        {selectedLocation.type === 'active' ? (
                          <button className="w-full bg-primary-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
                            Kontaktiraj centar
                          </button>
                        ) : selectedLocation.type === 'coming_soon' ? (
                          <div className="text-center text-accent-600 font-semibold text-sm">
                            Otvara se uskoro!
                          </div>
                        ) : (
                          <button className="w-full bg-secondary-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-secondary-700 transition-colors">
                            Saznaj više
                          </button>
                        )}
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </LoadScript>
            )}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-lg p-3 text-xs">
              <p className="font-semibold mb-2">Legenda:</p>
              <div className="space-y-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
                  <span>Aktivni centar</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-accent-500 rounded-full mr-2"></div>
                  <span>Otvara se uskoro</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-secondary-500 rounded-full mr-2"></div>
                  <span>Partner centar</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredLocations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}