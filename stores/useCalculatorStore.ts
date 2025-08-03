import { create } from 'zustand'
import { AnyCalculatorInputs, AnyCalculatorResults } from '@/types/calculator'

interface CalculatorState {
  // Investment calculator state
  investmentInputs: Partial<AnyCalculatorInputs>
  investmentResults: AnyCalculatorResults | null
  investmentStep: number
  
  // ROI calculator state  
  roiInputs: Partial<AnyCalculatorInputs>
  roiResults: AnyCalculatorResults | null
  roiStep: number
  
  // Common state
  isCalculating: boolean
  showResults: boolean
  showLeadForm: boolean
  leadFormData: {
    name: string
    email: string
    phone: string
  }
  
  // Actions
  updateInvestmentInputs: (inputs: Partial<AnyCalculatorInputs>) => void
  setInvestmentResults: (results: AnyCalculatorResults | null) => void
  setInvestmentStep: (step: number) => void
  
  updateROIInputs: (inputs: Partial<AnyCalculatorInputs>) => void
  setROIResults: (results: AnyCalculatorResults | null) => void
  setROIStep: (step: number) => void
  
  setCalculating: (calculating: boolean) => void
  setShowResults: (show: boolean) => void
  setShowLeadForm: (show: boolean) => void
  updateLeadFormData: (data: Partial<CalculatorState['leadFormData']>) => void
  
  resetInvestmentCalculator: () => void
  resetROICalculator: () => void
  resetAllCalculators: () => void
}

const initialLeadFormData = {
  name: '',
  email: '',
  phone: ''
}

export const useCalculatorStore = create<CalculatorState>((set) => ({
  // Initial state
  investmentInputs: {},
  investmentResults: null,
  investmentStep: 0,
  
  roiInputs: {},
  roiResults: null,
  roiStep: 0,
  
  isCalculating: false,
  showResults: false,
  showLeadForm: false,
  leadFormData: initialLeadFormData,
  
  // Investment calculator actions
  updateInvestmentInputs: (inputs) => set((state) => ({
    investmentInputs: { ...state.investmentInputs, ...inputs }
  })),
  
  setInvestmentResults: (results) => set({ 
    investmentResults: results,
    showResults: results !== null
  }),
  
  setInvestmentStep: (step) => set({ investmentStep: step }),
  
  // ROI calculator actions
  updateROIInputs: (inputs) => set((state) => ({
    roiInputs: { ...state.roiInputs, ...inputs }
  })),
  
  setROIResults: (results) => set({ 
    roiResults: results,
    showResults: results !== null
  }),
  
  setROIStep: (step) => set({ roiStep: step }),
  
  // Common actions
  setCalculating: (isCalculating) => set({ isCalculating }),
  setShowResults: (showResults) => set({ showResults }),
  setShowLeadForm: (showLeadForm) => set({ showLeadForm }),
  
  updateLeadFormData: (data) => set((state) => ({
    leadFormData: { ...state.leadFormData, ...data }
  })),
  
  // Reset actions
  resetInvestmentCalculator: () => set({
    investmentInputs: {},
    investmentResults: null,
    investmentStep: 0,
    showResults: false,
    showLeadForm: false,
    leadFormData: initialLeadFormData
  }),
  
  resetROICalculator: () => set({
    roiInputs: {},
    roiResults: null,
    roiStep: 0,
    showResults: false,
    showLeadForm: false,
    leadFormData: initialLeadFormData
  }),
  
  resetAllCalculators: () => set({
    investmentInputs: {},
    investmentResults: null,
    investmentStep: 0,
    
    roiInputs: {},
    roiResults: null,
    roiStep: 0,
    
    isCalculating: false,
    showResults: false,
    showLeadForm: false,
    leadFormData: initialLeadFormData
  })
}))

// Selector hooks
export const useInvestmentCalculator = () => useCalculatorStore((state) => ({
  inputs: state.investmentInputs,
  results: state.investmentResults,
  step: state.investmentStep,
  updateInputs: state.updateInvestmentInputs,
  setResults: state.setInvestmentResults,
  setStep: state.setInvestmentStep,
  reset: state.resetInvestmentCalculator
}))

export const useROICalculator = () => useCalculatorStore((state) => ({
  inputs: state.roiInputs,
  results: state.roiResults,
  step: state.roiStep,
  updateInputs: state.updateROIInputs,
  setResults: state.setROIResults,
  setStep: state.setROIStep,
  reset: state.resetROICalculator
}))

export const useCalculatorUI = () => useCalculatorStore((state) => ({
  isCalculating: state.isCalculating,
  showResults: state.showResults,
  showLeadForm: state.showLeadForm,
  leadFormData: state.leadFormData,
  setCalculating: state.setCalculating,
  setShowResults: state.setShowResults,
  setShowLeadForm: state.setShowLeadForm,
  updateLeadFormData: state.updateLeadFormData
}))