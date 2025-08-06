import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { PDFLogo } from '../components/PDFLogo'
import { pdfStyles } from '../styles/pdfStyles'

const styles = StyleSheet.create({
  ...pdfStyles,
  applicationSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E4C59',
    marginBottom: 10,
    borderBottom: '2px solid #5DBFDB',
    paddingBottom: 5,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
    width: '35%',
    marginRight: 10,
  },
  fieldValue: {
    fontSize: 10,
    color: '#3E4C59',
    width: '65%',
    lineHeight: 1.4,
  },
  longFieldValue: {
    fontSize: 10,
    color: '#3E4C59',
    marginTop: 5,
    lineHeight: 1.4,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
  },
  headerSection: {
    backgroundColor: '#5DBFDB',
    color: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.9,
  },
  summaryBox: {
    backgroundColor: '#e6f7ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    border: '1px solid #5DBFDB',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3E4C59',
    marginBottom: 8,
  },
  nextStepsSection: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
  },
  nextStepItem: {
    fontSize: 10,
    color: '#3E4C59',
    marginBottom: 6,
    paddingLeft: 15,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    color: '#666',
  },
})

interface FranchisePDFProps {
  formData: Record<string, any>
  sections: any[]
  applicationDate: string
}

export default function FranchisePDFTemplate({ formData, sections, applicationDate }: FranchisePDFProps) {
  // Format field values for display
  const formatFieldValue = (fieldId: string, value: any, field?: any) => {
    if (!value && value !== 0) return 'Nije uneseno'
    
    // Handle select/radio options
    if (field && field.options && field.type === 'select') {
      const option = field.options.find((opt: any) => opt.value === value)
      return option?.label || String(value)
    }
    
    return String(value)
  }

  // Get field by ID from sections
  const getFieldById = (fieldId: string) => {
    for (const section of sections) {
      const field = section.fields?.find((f: any) => f.fieldId === fieldId)
      if (field) return field
    }
    return null
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Prijava za franšizu Srećno učenje</Text>
          <Text style={styles.headerSubtitle}>
            Datum prijave: {new Date(applicationDate).toLocaleDateString('sr-RS')}
          </Text>
        </View>

        {/* Logo */}
        <View style={{ marginBottom: 20, alignItems: 'center' }}>
          <PDFLogo />
        </View>

        {/* Summary */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Pregled prijave</Text>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Podnosilac:</Text>
            <Text style={styles.fieldValue}>{formData.ime_prezime || 'Nije uneseno'}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Email:</Text>
            <Text style={styles.fieldValue}>{formData.email || 'Nije uneseno'}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Telefon:</Text>
            <Text style={styles.fieldValue}>{formData.telefon || 'Nije uneseno'}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Lokacija:</Text>
            <Text style={styles.fieldValue}>{formData.lokacija || 'Nije uneseno'}</Text>
          </View>
        </View>

        {/* Application Sections */}
        {sections.map((section, sectionIndex) => (
          <View key={section.sectionId} style={styles.applicationSection}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            {section.fields?.map((field: any) => {
              const value = formData[field.fieldId]
              const formattedValue = formatFieldValue(field.fieldId, value, field)
              const isLongField = field.type === 'textarea'
              
              return (
                <View key={field.fieldId} style={{ marginBottom: isLongField ? 12 : 6 }}>
                  {isLongField ? (
                    <>
                      <Text style={styles.fieldLabel}>{field.label}:</Text>
                      <Text style={styles.longFieldValue}>{formattedValue}</Text>
                    </>
                  ) : (
                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>{field.label}:</Text>
                      <Text style={styles.fieldValue}>{formattedValue}</Text>
                    </View>
                  )}
                </View>
              )
            })}
          </View>
        ))}

        {/* Next Steps */}
        <View style={styles.nextStepsSection}>
          <Text style={styles.summaryTitle}>Sledeći koraci</Text>
          <Text style={styles.nextStepItem}>1. Proverićemo vašu prijavu i dokumentaciju</Text>
          <Text style={styles.nextStepItem}>2. Zakazaćemo uvodni razgovor preko video poziva</Text>
          <Text style={styles.nextStepItem}>3. Poslati ćemo vam detaljne informacije o franšizi</Text>
          <Text style={styles.nextStepItem}>4. Organizovati ćemo upoznavanje sa lokalnim franšizama</Text>
          
          <View style={{ marginTop: 15, paddingTop: 10, borderTop: '1px solid #ddd' }}>
            <Text style={[styles.nextStepItem, { fontWeight: 'bold' }]}>
              Kontakt informacije:
            </Text>
            <Text style={styles.nextStepItem}>📞 +381 11 234 5678</Text>
            <Text style={styles.nextStepItem}>✉️ fransiza@srecno-ucenje.rs</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Srećno učenje • www.srecno-ucenje.rs • Generirano automatski {new Date().toLocaleString('sr-RS')}
        </Text>
      </Page>
    </Document>
  )
}