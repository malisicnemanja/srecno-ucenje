import { describe, it, expect } from 'vitest'
import { 
  formatCurrency, 
  formatNumber, 
  formatPercentage, 
  formatDate,
  formatFileSize,
  formatPhoneNumber,
  slugify 
} from '@/utils/formatting'

describe('Formatting utilities', () => {
  describe('formatCurrency', () => {
    it('formats currency correctly', () => {
      expect(formatCurrency(1000)).toBe('1.000 €')
      expect(formatCurrency(1234.56)).toBe('1.235 €')
    })

    it('handles different currencies', () => {
      expect(formatCurrency(1000, 'USD')).toBe('1.000 US$')
    })
  })

  describe('formatNumber', () => {
    it('formats numbers with thousand separators', () => {
      expect(formatNumber(1000)).toBe('1.000')
      expect(formatNumber(1234567)).toBe('1.234.567')
    })
  })

  describe('formatPercentage', () => {
    it('formats percentages correctly', () => {
      expect(formatPercentage(25.7)).toBe('26%')
      expect(formatPercentage(100)).toBe('100%')
    })
  })

  describe('formatDate', () => {
    it('formats dates correctly', () => {
      const date = new Date('2024-03-15')
      const formatted = formatDate(date)
      expect(formatted).toBe('15.03.2024.')
    })

    it('handles string dates', () => {
      const formatted = formatDate('2024-03-15')
      expect(formatted).toBe('15.03.2024.')
    })
  })

  describe('formatFileSize', () => {
    it('formats file sizes correctly', () => {
      expect(formatFileSize(0)).toBe('0 B')
      expect(formatFileSize(1024)).toBe('1 KB')
      expect(formatFileSize(1048576)).toBe('1 MB')
      expect(formatFileSize(1073741824)).toBe('1 GB')
    })

    it('handles decimal values', () => {
      expect(formatFileSize(1536)).toBe('1.5 KB')
    })
  })

  describe('formatPhoneNumber', () => {
    it('formats Serbian phone numbers', () => {
      expect(formatPhoneNumber('381651234567')).toBe('+381 65 123 4567')
      expect(formatPhoneNumber('0651234567')).toBe('065 123 4567')
    })

    it('returns original for invalid formats', () => {
      expect(formatPhoneNumber('invalid')).toBe('invalid')
    })
  })

  describe('slugify', () => {
    it('creates URL-friendly slugs', () => {
      expect(slugify('Srećno učenje')).toBe('srecno-ucenje')
      expect(slugify('Test sa Č Ć Š Ž Đ')).toBe('test-sa-c-c-s-z-d')
    })

    it('removes special characters', () => {
      expect(slugify('Test! @#$ %^&* ()[]')).toBe('test')
    })

    it('handles multiple spaces', () => {
      expect(slugify('Multiple   spaces')).toBe('multiple-spaces')
    })
  })
})