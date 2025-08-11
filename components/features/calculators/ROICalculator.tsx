'use client'

import { useState, useEffect, useRef } from 'react'
import { useSanityQuery } from '@/hooks/useSanity'
import CustomSelect from '@/components/ui/CustomSelect'
import { saveSanityDocument } from '@/lib/sanity-write'
import { Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { trackCalculatorUse, trackLeadCapture, trackCalculatorCompletion, trackPDFDownload } from '@/lib/analytics'
import { generateCalculatorPDF, generateFilename } from '@/lib/pdf-generator'

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const settingsQuery = `*[_type == "calculatorSettings"][0]{
  cities,
  revenueSettings,
  operationalCosts
}`

interface ROIInputs {
  childrenCount: number
  pricePerChild: number
  workingHours: number
  occupancyRate: number
  city: string
}

interface ROIResults {
  monthlyRevenue: number
  yearlyRevenue: number
  revenuePerHour: number
  revenuePerChild: number
  profitMargin: number
  competitorComparison: {
    ourPrice: number
    avgCompetitorPrice: number
    difference: number
  }
}

export default function ROICalculator() {
  const { data: settings, isLoading } = useSanityQuery(settingsQuery)
  const [inputs, setInputs] = useState<ROIInputs>({
    childrenCount: 100,
    pricePerChild: 50,
    workingHours: 8,
    occupancyRate: 70,
    city: '',
  })
  const [results, setResults] = useState<ROIResults | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadInfo, setLeadInfo] = useState({
    email: '',
    phone: '',
  })

  useEffect(() => {
    if (inputs.childrenCount && inputs.pricePerChild) {
      calculateROI()
    }
  }, [inputs, settings, calculateROI])

  const calculateROI = () => {
    const workingDaysPerMonth = settings?.revenueSettings?.workingDaysPerMonth || 22
    const actualOccupancy = inputs.childrenCount * (inputs.occupancyRate / 100)
    
    // Calculate revenue
    const dailyRevenue = actualOccupancy * inputs.pricePerChild
    const monthlyRevenue = dailyRevenue * workingDaysPerMonth
    const yearlyRevenue = monthlyRevenue * 12
    const revenuePerHour = dailyRevenue / inputs.workingHours
    const revenuePerChild = yearlyRevenue / (actualOccupancy * workingDaysPerMonth * 12)

    // Calculate expenses (simplified)
    const monthlyExpenses = 
      (settings?.operationalCosts?.monthlyMarketing || 500) +
      (settings?.operationalCosts?.monthlyUtilities || 300) +
      (settings?.operationalCosts?.monthlyOther || 200) +
      (settings?.operationalCosts?.staffSalaryPerPerson || 1000) * 3

    const profitMargin = ((monthlyRevenue - monthlyExpenses) / monthlyRevenue) * 100

    // Competitor comparison (simulated)
    const avgCompetitorPrice = inputs.pricePerChild * 0.85

    setResults({
      monthlyRevenue,
      yearlyRevenue,
      revenuePerHour,
      revenuePerChild,
      profitMargin,
      competitorComparison: {
        ourPrice: inputs.pricePerChild,
        avgCompetitorPrice,
        difference: ((inputs.pricePerChild - avgCompetitorPrice) / avgCompetitorPrice) * 100,
      },
    })
    setShowResults(true)
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await saveSanityDocument('calculatorResult', {
        type: 'roi',
        email: leadInfo.email,
        phone: leadInfo.phone,
        inputs: {
          childrenCount: inputs.childrenCount,
          pricePerChild: inputs.pricePerChild,
          workingHours: inputs.workingHours,
          city: inputs.city,
        },
        results: {
          monthlyRevenue: results?.monthlyRevenue,
          breakEvenMonths: 0,
          threeYearProjection: results?.yearlyRevenue ? results.yearlyRevenue * 3 : 0,
        },
        leadScore: calculateLeadScore(),
      })

      // Track lead capture
      trackLeadCapture('roi', calculateLeadScore())

      // Generate and download PDF
      try {
        if (results) {
          await generateCalculatorPDF('roi', {
            inputs,
            results
          }, {
            autoDownload: true,
            filename: generateFilename('srecno-ucenje-roi-analiza')
          })
          trackPDFDownload('roi')
          alert('ROI analiza je uspešno generisana i preuzeta!')
        }
      } catch (pdfError) {
        console.error('Error generating PDF:', pdfError)
        alert('Došlo je do greške pri generisanju PDF-a. Molimo pokušajte ponovo.')
      }
      
      setShowLeadForm(false)
    } catch (error) {
      console.error('Error saving lead:', error)
      alert('Greška pri slanju. Molimo pokušajte ponovo.')
    }
  }

  const calculateLeadScore = () => {
    let score = 40
    if (inputs.childrenCount >= 150) score += 20
    if (inputs.pricePerChild >= 60) score += 10
    if (inputs.occupancyRate >= 80) score += 15
    if (results && results.profitMargin >= 50) score += 15
    return Math.min(score, 100)
  }

  // Chart data
  const profitMarginData = {
    labels: ['Prihod', 'Troškovi'],
    datasets: [
      {
        data: results ? [results.profitMargin, 100 - results.profitMargin] : [0, 0],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  }

  const competitorData = {
    labels: ['Naša cena', 'Prosečna cena konkurencije'],
    datasets: [
      {
        label: 'Cena po detetu (EUR)',
        data: results ? [
          results.competitorComparison.ourPrice,
          results.competitorComparison.avgCompetitorPrice,
        ] : [],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(156, 163, 175, 0.8)',
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
          ROI Kalkulator - Analiza Profitabilnosti
        </h2>
        
        {/* Input Form */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Broj dece u centru
            </label>
            <input
              type="number"
              value={inputs.childrenCount}
              onChange={(e) => setInputs({ ...inputs, childrenCount: parseInt(e.target.value) || 0 })}
              min={10}
              max={500}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Ukupan kapacitet vašeg centra
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cena po detetu (EUR/mesec)
            </label>
            <input
              type="number"
              value={inputs.pricePerChild}
              onChange={(e) => setInputs({ ...inputs, pricePerChild: parseInt(e.target.value) || 0 })}
              min={20}
              max={200}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Radno vreme (sati dnevno)
            </label>
            <input
              type="number"
              value={inputs.workingHours}
              onChange={(e) => setInputs({ ...inputs, workingHours: parseInt(e.target.value) || 0 })}
              min={4}
              max={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Stopa popunjenosti (%)
            </label>
            <div className="relative">
              <input
                type="range"
                value={inputs.occupancyRate}
                onChange={(e) => setInputs({ ...inputs, occupancyRate: parseInt(e.target.value) })}
                min={30}
                max={100}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>30%</span>
                <span className="font-semibold text-green-600">{inputs.occupancyRate}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <CustomSelect
              label="Grad"
              value={inputs.city}
              onChange={(value) => setInputs({ ...inputs, city: value })}
              placeholder="Izaberite grad za analizu"
              options={settings?.cities?.map((city: any) => ({
                value: city.name,
                label: city.name,
                description: `Potražnja: ${city.demandLevel === 'high' ? 'Visoka' : city.demandLevel === 'medium' ? 'Srednja' : 'Niska'} | Multiplikator: ${city.priceMultiplier || 1}x`
              })) || []}
            />
          </div>
        </div>

        {/* Results Section */}
        {showResults && results && (
          <div className="space-y-8">
            <div className="border-t pt-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Analiza Profitabilnosti</h3>
              
              {/* Key Metrics */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-green-50 rounded-lg p-6">
                  <p className="text-sm text-green-600 font-semibold mb-1">Mesečni Prihod</p>
                  <p className="text-2xl font-bold text-green-900">
                    €{results.monthlyRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-6">
                  <p className="text-sm text-blue-600 font-semibold mb-1">Godišnji Prihod</p>
                  <p className="text-2xl font-bold text-blue-900">
                    €{results.yearlyRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <p className="text-sm text-purple-600 font-semibold mb-1">Prihod po Satu</p>
                  <p className="text-2xl font-bold text-purple-900">
                    €{Math.round(results.revenuePerHour)}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-6">
                  <p className="text-sm text-orange-600 font-semibold mb-1">Profit Margina</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {results.profitMargin.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Odnos Prihoda i Troškova</h4>
                  <div className="max-w-xs mx-auto">
                    <Doughnut data={profitMarginData} options={{ responsive: true }} />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Poređenje sa Konkurencijom</h4>
                  <Bar data={competitorData} options={{ responsive: true }} />
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    Vaša cena je {results.competitorComparison.difference.toFixed(1)}% viša od proseka
                  </p>
                </div>
              </div>

              {/* Additional Insights */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                <h4 className="text-lg font-semibold mb-3 text-yellow-900">Ključni Uvidi</h4>
                <ul className="space-y-2 text-yellow-800">
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    Sa trenutnom popunjenošću od {inputs.occupancyRate}%, imate prostora za rast od {100 - inputs.occupancyRate}%
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    Povećanje popunjenosti za 10% donelo bi dodatnih €{Math.round(results.monthlyRevenue * 0.1).toLocaleString()} mesečno
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    Vaša profit margina od {results.profitMargin.toFixed(1)}% je {results.profitMargin > 40 ? 'iznad' : 'ispod'} industrijskog proseka
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => setShowLeadForm(true)}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Preuzmi Detaljnu ROI Analizu (PDF)
                </button>
                <button
                  onClick={() => window.location.href = '/fransize'}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Saznaj Više o Franšizi
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lead Capture Modal */}
        {showLeadForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Preuzmite ROI Analizu</h3>
              <p className="text-gray-600 mb-6">
                Ostavite svoje podatke za preuzimanje detaljne analize profitabilnosti.
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
                    Telefon
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
                    Preuzmi PDF
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