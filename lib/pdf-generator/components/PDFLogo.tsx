import React from 'react'
import { Image, View, Text } from '@react-pdf/renderer'
import { pdfStyles } from '../styles/pdfStyles'

export const PDFLogo: React.FC = () => {
  // Using SVG logo - Note: @react-pdf/renderer has limited SVG support
  // If SVG doesn't work well, we'll fall back to text logo
  const logoPath = 'public/logo.svg'
  
  try {
    return (
      <Image 
        src={logoPath}
        alt="Srećno učenje logo"
        style={{
          width: 120,
          height: 40,
          marginBottom: 10
        }}
      />
    )
  } catch (error) {
    // Text logo as fallback
    return (
      <View style={{ marginBottom: 10 }}>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold',
          color: '#10B981' // Primary green
        }}>
          Srećno učenje
        </Text>
        <Text style={{ 
          fontSize: 10, 
          color: '#6B7280' 
        }}>
          Obrazovni centar za decu
        </Text>
      </View>
    )
  }
}