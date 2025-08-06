import { pdf } from '@react-pdf/renderer'
import FranchisePDFTemplate from './pdf-generator/templates/FranchisePDFTemplate'

/**
 * Generate PDF for franchise application
 */
export async function generateFranchisePDF(
  formData: Record<string, any>,
  sections: any[]
): Promise<Blob> {
  try {
    const applicationDate = new Date().toISOString()
    
    const MyDocument = FranchisePDFTemplate({
      formData,
      sections,
      applicationDate,
    })

    const pdfBlob = await pdf(MyDocument).toBlob()
    return pdfBlob
  } catch (error) {
    console.error('Error generating franchise PDF:', error)
    throw new Error('Failed to generate PDF')
  }
}

// Re-export all the existing PDF generators
export * from './pdf-generator/index'

export default generateFranchisePDF