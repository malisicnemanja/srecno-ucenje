'use client'

import { useState } from 'react'
import { Building2, Lightbulb } from 'lucide-react'

export default function SpaceOptimizer() {
  const [roomDimensions, setRoomDimensions] = useState({
    length: '',
    width: '',
    height: ''
  })
  const [requirements, setRequirements] = useState({
    studentsCount: '',
    hasProjector: false,
    hasWhiteboard: true,
    needsStorage: true
  })

  const handleCalculate = () => {
    // Placeholder calculation logic
    alert('Funkcionalnost se trenutno razvija!')
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Optimizator Prostora - 3D Planiranje
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Dimenzije prostorije</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dužina (m)
                </label>
                <input
                  type="number"
                  value={roomDimensions.length}
                  onChange={(e) => setRoomDimensions({...roomDimensions, length: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="5.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Širina (m)
                </label>
                <input
                  type="number"
                  value={roomDimensions.width}
                  onChange={(e) => setRoomDimensions({...roomDimensions, width: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="4.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visina (m)
                </label>
                <input
                  type="number"
                  value={roomDimensions.height}
                  onChange={(e) => setRoomDimensions({...roomDimensions, height: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="2.8"
                />
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4 mt-6">Zahtevi</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Broj učenika
                </label>
                <input
                  type="number"
                  value={requirements.studentsCount}
                  onChange={(e) => setRequirements({...requirements, studentsCount: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="12"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={requirements.hasProjector}
                    onChange={(e) => setRequirements({...requirements, hasProjector: e.target.checked})}
                    className="mr-2"
                  />
                  Projektor
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={requirements.hasWhiteboard}
                    onChange={(e) => setRequirements({...requirements, hasWhiteboard: e.target.checked})}
                    className="mr-2"
                  />
                  Bela tabla
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={requirements.needsStorage}
                    onChange={(e) => setRequirements({...requirements, needsStorage: e.target.checked})}
                    className="mr-2"
                  />
                  Prostor za čuvanje
                </label>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Generiši 3D Plan
            </button>
          </div>

          {/* Preview Area */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Pregled prostora</h3>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <Building2 size={64} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">
                3D vizualizacija će biti prikazana ovde nakon unosa dimenzija
              </p>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center"><Lightbulb size={20} className="mr-2" /> Preporuke:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Minimalno 1.5m² po učeniku</li>
                <li>• Optimalna visina table: 90-120cm</li>
                <li>• Razmak između redova: minimum 80cm</li>
                <li>• Prirodno osvetljenje sa leve strane</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}