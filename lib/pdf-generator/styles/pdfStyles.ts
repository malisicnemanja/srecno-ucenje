import { StyleSheet } from '@react-pdf/renderer'

// Importuj boje iz našeg design sistema
const colors = {
  primary: '#10B981',
  primaryLight: '#34D399',
  primaryDark: '#059669',
  secondary: '#3B82F6',
  secondaryLight: '#60A5FA',
  secondaryDark: '#2563EB',
  accent: '#F59E0B',
  accentLight: '#FCD34D',
  accentDark: '#D97706',
  warm: '#EF4444',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  }
}

export const pdfStyles = StyleSheet.create({
  // Osnova stranice
  page: {
    fontFamily: 'Helvetica', // PDF ne podržava Inter, koristimo Helvetica
    fontSize: 12,
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 40,
    backgroundColor: '#FFFFFF',
  },
  
  // Header stilovi
  header: {
    marginBottom: 20,
    borderBottom: `2 solid ${colors.primary}`,
    paddingBottom: 10,
  },
  
  logo: {
    width: 120,
    marginBottom: 10,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: 5,
  },
  
  subtitle: {
    fontSize: 14,
    color: colors.gray[600],
  },
  
  // Content stilovi
  section: {
    margin: 10,
    padding: 10,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryDark,
    marginBottom: 10,
  },
  
  text: {
    fontSize: 12,
    color: colors.gray[700],
    lineHeight: 1.5,
  },
  
  // Highlight box (za rezultate)
  highlightBox: {
    backgroundColor: colors.gray[50],
    border: `1 solid ${colors.primary}`,
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
  },
  
  // Footer
  footer: {
    position: 'absolute',
    fontSize: 10,
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: colors.gray[500],
  },
  
  // Tabela stilovi
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.gray[300],
    marginVertical: 10,
  },
  
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  
  tableHeader: {
    backgroundColor: colors.primary,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  
  tableCell: {
    margin: 'auto',
    padding: 8,
    fontSize: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
})

export { colors }