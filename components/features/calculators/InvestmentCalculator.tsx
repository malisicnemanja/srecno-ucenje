'use client'

import { useState, useEffect, useRef } from 'react'
import { useSanityQuery } from '@/hooks/useSanity'
import CustomSelect from '@/components/ui/CustomSelect'
import { saveSanityDocument } from '@/lib/sanity-write'
import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { trackCalculatorUse, trackLeadCapture, trackPDFDownload, trackCalculatorCompletion } from '@/lib/analytics'
import { generateCalculatorPDF, generateFilename } from '@/lib/pdf-generator'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

const settingsQuery = `*[_type == "calculatorSettings"][0]{
  franchiseModels,
  cities,
  spaceRequirements,
  renovationCosts,
  operationalCosts,
  revenueSettings
}`

interface CalculatorInputs {
  model: string
  city: string
  squareMeters: number
  renovationLevel: 'basic' | 'standard' | 'premium'
}

interface CalculatorResults {
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

export default function InvestmentCalculator() {
  const { data: settings, isLoading } = useSanityQuery(settingsQuery)
  const startTimeRef = useRef<number>(Date.now())
  const [inputs, setInputs] = useState<CalculatorInputs>({
    model: '',
    city: '',
    squareMeters: 100,
    renovationLevel: 'standard',
  })
  const [results, setResults] = useState<CalculatorResults | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadInfo, setLeadInfo] = useState({
    email: '',
    phone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculate results when inputs change
  useEffect(() => {
    if (settings && inputs.model && inputs.city) {
      calculateResults()
    }
  }, [inputs, settings])

  const calculateResults = () => {
    if (!settings) return

    const selectedModel = settings.franchiseModels?.find((m: any) => m.name === inputs.model)
    const selectedCity = settings.cities?.find((c: any) => c.name === inputs.city)
    const renovationCost = settings.renovationCosts?.[inputs.renovationLevel] || 0

    if (!selectedModel || !selectedCity) return

    // Calculate costs
    const franchiseFee = selectedModel.basePrice * (selectedCity.priceMultiplier || 1)
    const totalRenovation = renovationCost * inputs.squareMeters
    const equipmentCost = inputs.squareMeters * 150 // Estimated equipment cost per m²

    // Calculate monthly operational costs
    const monthlyOperational = 
      (settings.operationalCosts?.monthlyMarketing || 0) +
      (settings.operationalCosts?.monthlyUtilities || 0) +
      (settings.operationalCosts?.monthlyOther || 0) +
      (settings.operationalCosts?.staffSalaryPerPerson || 0) * 2 // Assume 2 staff

    // Calculate revenue
    const avgChildrenPerGroup = settings.revenueSettings?.averageChildrenPerGroup || 10
    const groupsPerDay = settings.revenueSettings?.groupsPerDay || 4
    const pricePerChild = settings.revenueSettings?.pricePerChild || 50
    const workingDaysPerMonth = settings.revenueSettings?.workingDaysPerMonth || 22

    const monthlyRevenue = avgChildrenPerGroup * groupsPerDay * pricePerChild * workingDaysPerMonth

    // Calculate investment metrics
    const totalInvestment = franchiseFee + totalRenovation + equipmentCost
    const monthlyProfit = monthlyRevenue - monthlyOperational
    const breakEvenMonths = Math.ceil(totalInvestment / monthlyProfit)
    const threeYearProjection = (monthlyProfit * 36) - totalInvestment

    setResults({
      totalInvestment,
      monthlyRevenue,
      monthlyExpenses: monthlyOperational,
      breakEvenMonths,
      threeYearProjection,
      breakdown: {
        franchiseFee,
        renovationCost: totalRenovation,
        equipmentCost,
        monthlyOperational,
      },
    })
    setShowResults(true)
    
    // Track calculator usage
    trackCalculatorUse('investment', inputs)
  }

  const handleExportPDF = () => {
    setShowLeadForm(true)
    trackPDFDownload('investment')
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Save lead to Sanity through secure API
      await saveSanityDocument('calculatorResult', {
        type: 'investment',
        email: leadInfo.email,
        phone: leadInfo.phone,
        inputs: {
          model: inputs.model,
          city: inputs.city,
          squareMeters: inputs.squareMeters,
          renovation: inputs.renovationLevel,
        },
        results: {
          totalInvestment: results?.totalInvestment,
          monthlyRevenue: results?.monthlyRevenue,
          breakEvenMonths: results?.breakEvenMonths,
          threeYearProjection: results?.threeYearProjection,
          breakdown: JSON.stringify(results?.breakdown),
        },
        leadScore: calculateLeadScore(),
      })

      // Track lead capture and completion
      const leadScore = calculateLeadScore()
      trackLeadCapture('investment', leadScore)
      
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000)
      trackCalculatorCompletion('investment', timeSpent)

      // Generate and download PDF
      try {
        if (results) {
          await generateCalculatorPDF('investment', {
            inputs,
            results
          }, {
            autoDownload: true,
            filename: generateFilename('srecno-ucenje-investicija-analiza')
          })
          alert('PDF analiza je uspešno generisana i preuzeta!')
        }
      } catch (pdfError) {
        console.error('Error generating PDF:', pdfError)
        alert('Došlo je do greške pri generisanju PDF-a. Molimo pokušajte ponovo.')
      }
      
      setShowLeadForm(false)
    } catch (error) {
      console.error('Error saving lead:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateLeadScore = () => {
    let score = 50 // Base score
    if (inputs.squareMeters >= 150) score += 10
    if (inputs.renovationLevel === 'premium') score += 10
    if (results && results.threeYearProjection > 100000) score += 20
    if (inputs.city && settings?.cities?.find((c: any) => c.name === inputs.city && c.demandLevel === 'high')) score += 10
    return Math.min(score, 100)
  }

  // Chart data
  const monthlyProfitData = {
    labels: Array.from({ length: 36 }, (_, i) => `Mesec ${i + 1}`),
    datasets: [
      {
        label: 'Kumulativna dobit',
        data: Array.from({ length: 36 }, (_, i) => {
          if (!results) return 0
          const monthlyProfit = results.monthlyRevenue - results.monthlyExpenses
          return (monthlyProfit * (i + 1)) - results.totalInvestment
        }),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.1,
      },
    ],
  }

  const costBreakdownData = {
    labels: ['Franšizna naknada', 'Renoviranje', 'Oprema'],
    datasets: [
      {
        label: 'Troškovi (EUR)',
        data: results ? [
          results.breakdown.franchiseFee,
          results.breakdown.renovationCost,
          results.breakdown.equipmentCost,
        ] : [],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  }

  if (isLoading) {
    return <div className="text-center py-8">Učitavanje kalkulatora...</div>
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Kalkulator Investicije u Franšizu
        </h2>
        
        {/* Input Form */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <CustomSelect
              label="Franšizni Model"
              value={inputs.model}
              onChange={(value) => setInputs({ ...inputs, model: value })}
              placeholder="Izaberite model"
              options={settings?.franchiseModels?.map((model: any) => ({
                value: model.name,
                label: model.name,
                price: model.basePrice,
                description: `Uključuje osnovnu opremu i početnu obuku`
              })) || []}
            />
          </div>

          <div>
            <CustomSelect
              label="Grad"
              value={inputs.city}
              onChange={(value) => setInputs({ ...inputs, city: value })}
              placeholder="Izaberite grad"
              options={settings?.cities?.map((city: any) => ({
                value: city.name,
                label: city.name,
                description: city.demandLevel === 'high' 
                  ? 'Visoka potražnja - Brži povraćaj investicije' 
                  : city.demandLevel === 'medium' 
                    ? 'Srednja potražnja - Stabilno tržište' 
                    : 'Niska potražnja - Manji troškovi pokretanja'
              })) || []}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Površina prostora (m²)
            </label>
            <input
              type="number"
              value={inputs.squareMeters}
              onChange={(e) => setInputs({ ...inputs, squareMeters: parseInt(e.target.value) || 0 })}
              min={settings?.spaceRequirements?.minSquareMeters || 50}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Preporučeno: {settings?.spaceRequirements?.optimalSquareMeters || 150}m²
            </p>
          </div>

          <div>
            <CustomSelect
              label="Nivo renoviranja"
              value={inputs.renovationLevel}
              onChange={(value) => setInputs({ ...inputs, renovationLevel: value as any })}
              placeholder="Izaberite nivo"
              options={[
                {
                  value: 'basic',
                  label: 'Osnovno',
                  price: settings?.renovationCosts?.basic,
                  description: 'Jednostavno uređenje, osnovna oprema'
                },
                {
                  value: 'standard',
                  label: 'Standardno',
                  price: settings?.renovationCosts?.standard,
                  description: 'Kvalitetno uređenje, standardna oprema'
                },
                {
                  value: 'premium',
                  label: 'Premium',
                  price: settings?.renovationCosts?.premium,
                  description: 'Luksuzno uređenje, vrhunska oprema'
                }
              ]}
            />
          </div>
        </div>

        {/* Results Section */}
        {showResults && results && (
          <div className="space-y-8">
            <div className="border-t pt-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Rezultati Analize</h3>
              
              {/* Key Metrics */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <p className="text-sm text-blue-600 font-semibold mb-1">Ukupna Investicija</p>
                  <p className="text-2xl font-bold text-blue-900">
                    €{results.totalInvestment.toLocaleString()}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <p className="text-sm text-green-600 font-semibold mb-1">Mesečni Prihod</p>
                  <p className="text-2xl font-bold text-green-900">
                    €{results.monthlyRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-6">
                  <p className="text-sm text-orange-600 font-semibold mb-1">ROI Period</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {results.breakEvenMonths} meseci
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <p className="text-sm text-purple-600 font-semibold mb-1">3-godišnja Projekcija</p>
                  <p className="text-2xl font-bold text-purple-900">
                    €{results.threeYearProjection.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Struktura Troškova</h4>
                  <Bar data={costBreakdownData} options={{ responsive: true }} />
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Projekcija Profita</h4>
                  <Line data={monthlyProfitData} options={{ responsive: true }} />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handleExportPDF}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Preuzmi Detaljnu Analizu (PDF)
                </button>
                <button
                  onClick={() => window.location.href = '/kontakt'}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Zakaži Konsultacije
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lead Capture Modal */}
        {showLeadForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Preuzmite Detaljnu Analizu</h3>
              <p className="text-gray-600 mb-6">
                Ostavite svoje podatke za preuzimanje detaljne analize.
              </p>
              <form onSubmit={handleLeadSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email adresa
                  </label>
                  <input
                    type="email"
                    required
                    value={leadInfo.email}
                    onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefon (opciono)
                  </label>
                  <input
                    type="tel"
                    value={leadInfo.phone}
                    onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    {isSubmitting ? 'Generisanje...' : 'Preuzmi PDF'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLeadForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Otkaži
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}