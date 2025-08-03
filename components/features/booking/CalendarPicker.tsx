'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CalendarPickerProps {
  value: string
  onChange: (date: string) => void
  minDate?: Date
  maxDate?: Date
  excludeWeekends?: boolean
}

export default function CalendarPicker({
  value,
  onChange,
  minDate = new Date(),
  maxDate,
  excludeWeekends = true
}: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  )

  const monthNames = [
    'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
    'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
  ]

  const dayNames = ['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub']

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value))
    }
  }, [value])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: (Date | null)[] = []
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const isDateDisabled = (date: Date) => {
    if (!date) return true
    
    // Check if before minDate
    if (minDate && date < minDate) return true
    
    // Check if after maxDate
    if (maxDate && date > maxDate) return true
    
    // Check if weekend and excludeWeekends is true
    if (excludeWeekends) {
      const dayOfWeek = date.getDay()
      if (dayOfWeek === 0 || dayOfWeek === 6) return true
    }
    
    return false
  }

  const handleDateClick = (date: Date) => {
    if (!date || isDateDisabled(date)) return
    
    setSelectedDate(date)
    onChange(date.toISOString().split('T')[0])
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  const isToday = (date: Date) => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date) => {
    if (!date || !selectedDate) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button
          type="button"
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        <AnimatePresence mode="wait">
          {getDaysInMonth(currentMonth).map((date, index) => {
            const disabled = date ? isDateDisabled(date) : true
            const today = date ? isToday(date) : false
            const selected = date ? isSelected(date) : false

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, delay: index * 0.01 }}
              >
                {date ? (
                  <button
                    type="button"
                    onClick={() => handleDateClick(date)}
                    disabled={disabled}
                    className={`
                      aspect-square rounded-lg font-medium text-sm
                      transition-all duration-200 transform
                      ${disabled 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : 'hover:bg-primary-50 hover:text-primary-600 hover:scale-105 cursor-pointer'
                      }
                      ${today && !selected 
                        ? 'bg-gray-100 text-gray-900 font-semibold' 
                        : ''
                      }
                      ${selected 
                        ? 'bg-primary-500 text-white shadow-lg scale-105' 
                        : ''
                      }
                    `}
                  >
                    {date.getDate()}
                  </button>
                ) : (
                  <div className="aspect-square" />
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Selected date display */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-3 bg-primary-50 rounded-lg"
        >
          <p className="text-sm text-primary-700">
            <span className="font-medium">Izabrani datum:</span>{' '}
            {selectedDate.toLocaleDateString('sr-RS', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </motion.div>
      )}
    </div>
  )
}