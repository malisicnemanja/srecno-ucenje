// Calculator specific types

export interface CalculatorSettings {
  franchiseModels: FranchiseModel[]
  cities: City[]
  spaceRequirements: SpaceRequirements
  renovationCosts: RenovationCosts
  operationalCosts: OperationalCosts
  revenueSettings: RevenueSettings
}

export interface FranchiseModel {
  name: string
  basePrice: number
  description?: string
  features?: string[]
}

export interface City {
  name: string
  priceMultiplier: number
  demandLevel: 'low' | 'medium' | 'high'
  marketSize?: number
  competition?: 'low' | 'medium' | 'high'
}

export interface SpaceRequirements {
  minSquareMeters: number
  optimalSquareMeters: number
  maxSquareMeters: number
}

export interface RenovationCosts {
  basic: number
  standard: number
  premium: number
}

export interface OperationalCosts {
  monthlyMarketing: number
  monthlyUtilities: number
  monthlyOther: number
  staffSalaryPerPerson: number
}

export interface RevenueSettings {
  averageChildrenPerGroup: number
  groupsPerDay: number
  pricePerChild: number
  workingDaysPerMonth: number
}

export interface CalculatorInputs {
  model: string
  city: string
  squareMeters: number
  renovationLevel: 'basic' | 'standard' | 'premium'
}

export interface CalculatorResults {
  totalInvestment: number
  monthlyRevenue: number
  monthlyExpenses: number
  breakEvenMonths: number
  threeYearProjection: number
  breakdown: {
    franchiseFee: number
    renovationCost: number
    equipmentCost: number
    monthlyOperational: number
  }
}

export interface ROIInputs {
  childrenCount: number
  pricePerChild: number
  workingHours: number
  occupancyRate: number
  city: string
}

export interface ROIResults {
  monthlyRevenue: number
  yearlyRevenue: number
  revenuePerHour: number
  revenuePerChild: number
  profitMargin: number
  recommendedPrice: number
}

// Union type for all calculator inputs
export type AnyCalculatorInputs = CalculatorInputs | ROIInputs

// Union type for all calculator results  
export type AnyCalculatorResults = CalculatorResults | ROIResults