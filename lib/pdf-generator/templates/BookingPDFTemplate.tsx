import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { BasePDFTemplate } from './BasePDFTemplate'
import { pdfStyles, colors } from '../styles/pdfStyles'

interface BookingData {
  name: string
  email: string
  phone?: string
  date: string
  time: string
  type: string
  message?: string
  childName?: string
  childAge?: number
}

export const BookingPDFTemplate: React.FC<{ data: BookingData }> = ({ data }) => {
  return (
    <BasePDFTemplate 
      title="Potvrda Zakazane Konsultacije"
      subtitle="Srećno učenje - Obrazovni centar"
    >
      {/* Informacije o terminu */}
      <View style={{
        ...pdfStyles.highlightBox,
        backgroundColor: colors.secondary + '20',
        borderColor: colors.secondary,
        marginBottom: 20
      }}>
        <Text style={{ 
          fontSize: 18, 
          fontWeight: 'bold',
          color: colors.secondaryDark,
          marginBottom: 10,
          textAlign: 'center'
        }}>
          {data.date} u {data.time}
        </Text>
        <Text style={{ 
          fontSize: 14,
          textAlign: 'center',
          color: colors.gray[700]
        }}>
          Tip konsultacije: {data.type}
        </Text>
      </View>
      
      {/* Lični podaci */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Vaši podaci</Text>
        <View style={pdfStyles.highlightBox}>
          <Text style={pdfStyles.text}>Ime i prezime: {data.name}</Text>
          <Text style={pdfStyles.text}>Email: {data.email}</Text>
          {data.phone && <Text style={pdfStyles.text}>Telefon: {data.phone}</Text>}
          {data.childName && (
            <>
              <Text style={pdfStyles.text}>Ime deteta: {data.childName}</Text>
              <Text style={pdfStyles.text}>Uzrast deteta: {data.childAge} godina</Text>
            </>
          )}
        </View>
      </View>
      
      {/* Napomena */}
      {data.message && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Vaša napomena</Text>
          <Text style={pdfStyles.text}>{data.message}</Text>
        </View>
      )}
      
      {/* Instrukcije */}
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.sectionTitle}>Važne informacije</Text>
        <Text style={pdfStyles.text}>
          • Molimo vas da dođete 10 minuta ranije
        </Text>
        <Text style={pdfStyles.text}>
          • Povedite relevantnu dokumentaciju o detetu
        </Text>
        <Text style={pdfStyles.text}>
          • Konsultacija traje oko 45 minuta
        </Text>
        <Text style={pdfStyles.text}>
          • Za otkazivanje javite se najmanje 24h ranije
        </Text>
      </View>
      
      {/* Kontakt */}
      <View style={{
        ...pdfStyles.highlightBox,
        backgroundColor: colors.gray[50],
        marginTop: 20
      }}>
        <Text style={{ ...pdfStyles.text, fontWeight: 'bold' }}>
          Kontakt informacije:
        </Text>
        <Text style={pdfStyles.text}>📍 Adresa: Vaša adresa bb, Pančevo</Text>
        <Text style={pdfStyles.text}>📞 Telefon: +381 XX XXX XXXX</Text>
        <Text style={pdfStyles.text}>✉️ Email: info@srecno-ucenje.rs</Text>
      </View>
    </BasePDFTemplate>
  )
}