import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { BasePDFTemplate } from './BasePDFTemplate'
import { pdfStyles, colors } from '../styles/pdfStyles'
import { PDFBarChart } from '../components/PDFChart'

interface CalculatorData {
  type: 'roi' | 'investment'
  inputs: {
    numberOfChildren?: number
    pricePerChild?: number
    monthlyCosts?: number
    monthlyRevenue?: number
    initialInvestment?: number
    [key: string]: any
  }
  results: {
    totalRevenue?: number
    totalProfit?: number
    roi?: number
    breakEvenMonths?: number
    [key: string]: any
  }
}

export const CalculatorPDFTemplate: React.FC<{ data: CalculatorData }> = ({ data }) => {
  const title = data.type === 'roi' 
    ? 'ROI Kalkulator - Rezultati Analize' 
    : 'Kalkulator Investicije - Projekcija'
    
  return (
    <BasePDFTemplate 
      title={title}
      subtitle="Personalizovana analiza za vašu školu"
    >
      {/* Ulazni podaci */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Vaši Podaci</Text>
        <View style={pdfStyles.highlightBox}>
          {data.type === 'roi' ? (
            <>
              <Text style={pdfStyles.text}>
                • Broj dece: {data.inputs.numberOfChildren || 0}
              </Text>
              <Text style={pdfStyles.text}>
                • Cena po detetu: {data.inputs.pricePerChild || 0} RSD
              </Text>
              <Text style={pdfStyles.text}>
                • Mesečni troškovi: {data.inputs.monthlyCosts || 0} RSD
              </Text>
            </>
          ) : (
            <>
              <Text style={pdfStyles.text}>
                • Početna investicija: {data.inputs.initialInvestment || 0} RSD
              </Text>
              <Text style={pdfStyles.text}>
                • Mesečni prihod: {data.inputs.monthlyRevenue || 0} RSD
              </Text>
              <Text style={pdfStyles.text}>
                • Mesečni troškovi: {data.inputs.monthlyCosts || 0} RSD
              </Text>
            </>
          )}
        </View>
      </View>
      
      {/* Rezultati */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Rezultati Analize</Text>
        <View style={{...pdfStyles.highlightBox, backgroundColor: colors.primaryLight + '20'}}>
          <Text style={{...pdfStyles.text, fontSize: 16, fontWeight: 'bold', color: colors.primaryDark}}>
            {data.type === 'roi' 
              ? `ROI: ${data.results.roi || 0}%`
              : `Povratak za ${data.results.breakEvenMonths || 0} meseci`
            }
          </Text>
          <Text style={pdfStyles.text}>
            • Ukupan prihod: {data.results.totalRevenue || 0} RSD
          </Text>
          <Text style={pdfStyles.text}>
            • Ukupan profit: {data.results.totalProfit || 0} RSD
          </Text>
        </View>
      </View>
      
      {/* Grafikon */}
      {data.type === 'roi' && (
        <PDFBarChart 
          data={{
            title: 'Projekcija profita po mesecima',
            labels: ['Mesec 1', 'Mesec 3', 'Mesec 6', 'Mesec 12'],
            values: [
              (data.inputs.numberOfChildren || 0) * (data.inputs.pricePerChild || 0) * 0.3,
              (data.inputs.numberOfChildren || 0) * (data.inputs.pricePerChild || 0) * 0.7,
              (data.inputs.numberOfChildren || 0) * (data.inputs.pricePerChild || 0) * 0.9,
              (data.inputs.numberOfChildren || 0) * (data.inputs.pricePerChild || 0) * 1
            ]
          }}
        />
      )}
      
      {/* Preporuke */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Preporuke</Text>
        <Text style={pdfStyles.text}>
          Na osnovu vaše analize, preporučujemo da razmotrte sledeće korake:
        </Text>
        <Text style={pdfStyles.text}>
          • Fokusirajte se na marketing kako biste privukli planirani broj dece
        </Text>
        <Text style={pdfStyles.text}>
          • Optimizujte troškove bez ugrožavanja kvaliteta
        </Text>
        <Text style={pdfStyles.text}>
          • Razmislite o dodatnim programima za povećanje prihoda
        </Text>
      </View>
    </BasePDFTemplate>
  )
}