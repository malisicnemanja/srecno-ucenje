import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { BasePDFTemplate } from './BasePDFTemplate'
import { pdfStyles, colors } from '../styles/pdfStyles'

interface QuizData {
  title: string
  score: number
  totalQuestions: number
  answers: Array<{
    question: string
    answer: string
    isCorrect?: boolean
  }>
  recommendations?: string[]
}

export const QuizPDFTemplate: React.FC<{ data: QuizData }> = ({ data }) => {
  const percentage = Math.round((data.score / data.totalQuestions) * 100)
  
  return (
    <BasePDFTemplate 
      title="Rezultati Kviza"
      subtitle={data.title}
    >
      {/* Rezultat */}
      <View style={pdfStyles.section}>
        <View style={{
          ...pdfStyles.highlightBox,
          backgroundColor: percentage >= 70 ? colors.primary + '20' : colors.warm + '20',
          borderColor: percentage >= 70 ? colors.primary : colors.warm,
        }}>
          <Text style={{ 
            fontSize: 24, 
            fontWeight: 'bold', 
            textAlign: 'center',
            color: percentage >= 70 ? colors.primaryDark : colors.warm,
            marginBottom: 10
          }}>
            Vaš rezultat: {data.score}/{data.totalQuestions} ({percentage}%)
          </Text>
        </View>
      </View>
      
      {/* Odgovori */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Vaši odgovori</Text>
        {data.answers.map((item, index) => (
          <View key={index} style={{ marginBottom: 15 }}>
            <Text style={{ ...pdfStyles.text, fontWeight: 'bold' }}>
              {index + 1}. {item.question}
            </Text>
            <Text style={{ 
              ...pdfStyles.text, 
              color: item.isCorrect ? colors.primary : colors.gray[700],
              marginLeft: 10 
            }}>
              Odgovor: {item.answer} {item.isCorrect ? '✓' : ''}
            </Text>
          </View>
        ))}
      </View>
      
      {/* Preporuke */}
      {data.recommendations && data.recommendations.length > 0 && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Preporuke za dalji rad</Text>
          {data.recommendations.map((rec, index) => (
            <Text key={index} style={pdfStyles.text}>
              • {rec}
            </Text>
          ))}
        </View>
      )}
    </BasePDFTemplate>
  )
}