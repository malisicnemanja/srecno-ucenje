import React from 'react'
import { Document, Page, Text, View, Image } from '@react-pdf/renderer'
import { pdfStyles } from '../styles/pdfStyles'
import { PDFLogo } from '../components/PDFLogo'

interface BasePDFProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export const BasePDFTemplate: React.FC<BasePDFProps> = ({ 
  children, 
  title, 
  subtitle 
}) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      {/* Header */}
      <View style={pdfStyles.header}>
        <PDFLogo />
        <Text style={pdfStyles.title}>{title}</Text>
        {subtitle && <Text style={pdfStyles.subtitle}>{subtitle}</Text>}
      </View>
      
      {/* Content */}
      {children}
      
      {/* Footer */}
      <View style={pdfStyles.footer}>
        <Text>
          Srećno učenje - {new Date().toLocaleDateString('sr-RS')} - www.srecno-ucenje.rs
        </Text>
      </View>
    </Page>
  </Document>
)