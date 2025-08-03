'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TimePickerProps {
  value: string
  onChange: (time: string) => void
  availableSlots?: string[]
  bookedSlots?: string[]
  selectedDate?: string
}

const defaultTimeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00'
]

export default function TimePicker({
  value,
  onChange,
  availableSlots = defaultTimeSlots,
  bookedSlots = [],
  selectedDate
}: TimePickerProps) {
  const [selectedTime, setSelectedTime] = useState(value)
  const [hoveredTime, setHoveredTime] = useState<string | null>(null)

  useEffect(() => {
    setSelectedTime(value)
  }, [value])

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    onChange(time)
  }

  const isSlotBooked = (time: string) => {
    return bookedSlots.includes(time)
  }

  const getSlotStatus = (time: string) => {
    if (isSlotBooked(time)) return 'booked'
    if (time === selectedTime) return 'selected'
    return 'available'
  }

  const formatTime = (time: string) => {
    return time.replace(':', 'h ')
  }

  // Group times by period
  const groupTimesByPeriod = () => {
    const morning: string[] = []
    const afternoon: string[] = []
    
    availableSlots.forEach(slot => {
      const hour = parseInt(slot.split(':')[0])
      if (hour < 12) {
        morning.push(slot)
      } else {
        afternoon.push(slot)
      }
    })
    
    return { morning, afternoon }
  }

  const { morning, afternoon } = groupTimesByPeriod()

  const TimeSlot = ({ time, index }: { time: string; index: number }) => {
    const status = getSlotStatus(time)
    const isBooked = status === 'booked'
    const isSelected = status === 'selected'
    
    return (
      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={!isBooked ? { scale: 1.05 } : {}}
        whileTap={!isBooked ? { scale: 0.95 } : {}}
        onClick={() => !isBooked && handleTimeSelect(time)}
        onMouseEnter={() => setHoveredTime(time)}
        onMouseLeave={() => setHoveredTime(null)}
        disabled={isBooked}
        className={`
          relative px-4 py-3 rounded-lg font-medium text-sm
          transition-all duration-200
          ${isBooked 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : isSelected
              ? 'bg-primary-500 text-white shadow-lg'
              : 'bg-white border-2 border-gray-200 hover:border-primary-400 hover:bg-primary-50 cursor-pointer'
          }
        `}
      >
        <span className="relative z-10">{formatTime(time)}</span>
        
        {/* Hover effect */}
        {hoveredTime === time && !isBooked && !isSelected && (
          <motion.div
            className="absolute inset-0 bg-primary-100 rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          />
        )}
        
        {/* Booked indicator */}
        {isBooked && (
          <div className="absolute top-1 right-1">
            <div className="w-2 h-2 bg-red-400 rounded-full" />
          </div>
        )}
      </motion.button>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Izaberite vreme konsultacija
      </h3>

      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-3 bg-gray-50 rounded-lg"
        >
          <p className="text-sm text-gray-600">
            Prikazuju se dostupni termini za:{' '}
            <span className="font-medium text-gray-900">
              {new Date(selectedDate).toLocaleDateString('sr-RS', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}
            </span>
          </p>
        </motion.div>
      )}

      {/* Morning slots */}
      {morning.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Prepodne
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {morning.map((time, index) => (
              <TimeSlot key={time} time={time} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Afternoon slots */}
      {afternoon.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            Popodne
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {afternoon.map((time, index) => (
              <TimeSlot key={time} time={time} index={morning.length + index} />
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary-500 rounded" />
            <span className="text-gray-600">Izabrano</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border-2 border-gray-200 rounded" />
            <span className="text-gray-600">Slobodno</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 rounded relative">
              <div className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-400 rounded-full" />
            </div>
            <span className="text-gray-600">Zauzeto</span>
          </div>
        </div>
      </div>

      {/* Selected time display */}
      {selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-3 bg-primary-50 rounded-lg"
        >
          <p className="text-sm text-primary-700">
            <span className="font-medium">Izabrano vreme:</span> {formatTime(selectedTime)}
          </p>
        </motion.div>
      )}
    </div>
  )
}