import { z } from 'zod'

// Email validation
export const emailSchema = z.string().email('Neispravna email adresa')

// Phone validation (Serbian format)
export const phoneSchema = z.string().regex(
  /^(\+381|0)6[0-9]{7,8}$/,
  'Neispravni format telefona'
).optional()

// Booking form validation
export const bookingSchema = z.object({
  name: z.string().min(2, 'Ime mora imati najmanje 2 karaktera'),
  email: emailSchema,
  phone: phoneSchema,
  consultationType: z.string().min(1, 'Izaberite tip konsultacija'),
  date: z.date({
    required_error: 'Izaberite datum',
  }),
  time: z.string().min(1, 'Izaberite vreme'),
  message: z.string().optional(),
})

// Lead form validation
export const leadFormSchema = z.object({
  name: z.string().optional(),
  email: emailSchema,
  phone: phoneSchema,
})

// Calculator validation
export const calculatorInputSchema = z.object({
  model: z.string().min(1, 'Izaberite model'),
  city: z.string().min(1, 'Izaberite grad'),
  squareMeters: z.number().min(50).max(500),
  renovationLevel: z.enum(['basic', 'standard', 'premium']),
})

// ROI Calculator validation
export const roiInputSchema = z.object({
  childrenCount: z.number().min(1).max(50),
  pricePerChild: z.number().min(10).max(200),
  workingHours: z.number().min(1).max(12),
  occupancyRate: z.number().min(10).max(100),
  city: z.string().min(1, 'Izaberite grad'),
})