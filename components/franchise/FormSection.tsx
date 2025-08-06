'use client'

import FormField from './FormField'
import styles from './FormSection.module.css'

interface FormSectionProps {
  section: any
  formData: Record<string, any>
  errors: Record<string, string>
  touchedFields: Set<string>
  onFieldChange: (fieldId: string, value: any) => void
  onFieldBlur: (fieldId: string) => void
}

export default function FormSection({
  section,
  formData,
  errors,
  touchedFields,
  onFieldChange,
  onFieldBlur
}: FormSectionProps) {
  // Sort fields by order
  const sortedFields = [...(section.fields || [])].sort((a, b) => a.order - b.order)

  // Get icon for section
  const getSectionIcon = (iconName: string) => {
    const icons: Record<string, string> = {
      user: '👤',
      target: '🎯',
      education: '🎓',
      business: '💼',
      location: '📍',
      finance: '💰',
      time: '⏰',
      document: '📄'
    }
    return icons[iconName] || '📋'
  }

  return (
    <div className={styles.section}>
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <span className={styles.sectionIcon}>{getSectionIcon(section.icon)}</span>
        <div className={styles.sectionTitles}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          {section.subtitle && (
            <p className={styles.sectionSubtitle}>{section.subtitle}</p>
          )}
        </div>
      </div>

      {/* Section Description */}
      {section.description && (
        <p className={styles.sectionDescription}>{section.description}</p>
      )}

      {/* Section Help Text */}
      {section.helpText && (
        <div className={styles.sectionHelp}>
          <span className={styles.helpIcon}>ℹ</span>
          {section.helpText}
        </div>
      )}

      {/* Fields Grid */}
      <div className={styles.fieldsGrid}>
        {sortedFields.map((field) => (
          <div 
            key={field._id}
            className={`${styles.fieldWrapper} ${
              field.width === 'full' ? styles.fullWidth : 
              field.width === 'half' ? styles.halfWidth : 
              styles.autoWidth
            }`}
          >
            <FormField
              field={field}
              value={formData[field.fieldId] || ''}
              error={touchedFields.has(field.fieldId) ? errors[field.fieldId] : undefined}
              onChange={(value) => onFieldChange(field.fieldId, value)}
              onBlur={() => onFieldBlur(field.fieldId)}
            />
          </div>
        ))}
      </div>

      {/* Required Fields Note */}
      {section.isRequired && (
        <div className={styles.requiredNote}>
          <span className={styles.asterisk}>*</span>
          Sva polja označena zvezdicom su obavezna
        </div>
      )}
    </div>
  )
}