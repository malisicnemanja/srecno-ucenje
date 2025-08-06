'use client'

import { useState } from 'react'
import styles from './FormField.module.css'

interface FormFieldProps {
  field: any
  value: any
  error?: string
  onChange: (value: any) => void
  onBlur: () => void
}

export default function FormField({ field, value, error, onChange, onBlur }: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => {
    setIsFocused(false)
    onBlur()
  }

  const renderInput = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'url':
      case 'number':
        return (
          <input
            type={field.type}
            id={field.fieldId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={field.placeholder}
            className={`${styles.input} ${error ? styles.inputError : ''} ${isFocused ? styles.inputFocused : ''}`}
            min={field.validation?.min}
            max={field.validation?.max}
            minLength={field.validation?.minLength}
            maxLength={field.validation?.maxLength}
            pattern={field.validation?.pattern}
            required={field.isRequired}
          />
        )

      case 'textarea':
        return (
          <textarea
            id={field.fieldId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={field.placeholder}
            className={`${styles.textarea} ${error ? styles.inputError : ''} ${isFocused ? styles.inputFocused : ''}`}
            rows={field.rows || 4}
            minLength={field.validation?.minLength}
            maxLength={field.validation?.maxLength}
            required={field.isRequired}
          />
        )

      case 'select':
        return (
          <select
            id={field.fieldId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`${styles.select} ${error ? styles.inputError : ''} ${isFocused ? styles.inputFocused : ''}`}
            required={field.isRequired}
          >
            <option value="">Izaberite opciju...</option>
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'radio':
        return (
          <div className={styles.radioGroup}>
            {field.options?.map((option: any) => (
              <label key={option.value} className={styles.radioLabel}>
                <input
                  type="radio"
                  name={field.fieldId}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(e.target.value)}
                  className={styles.radioInput}
                  required={field.isRequired}
                />
                <span className={styles.radioCustom}></span>
                <span className={styles.radioText}>{option.label}</span>
              </label>
            ))}
          </div>
        )

      case 'checkbox':
        return (
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
              className={styles.checkboxInput}
              required={field.isRequired}
            />
            <span className={styles.checkboxCustom}></span>
            <span className={styles.checkboxText}>{field.placeholder || field.label}</span>
          </label>
        )

      case 'date':
        return (
          <input
            type="date"
            id={field.fieldId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`${styles.input} ${error ? styles.inputError : ''} ${isFocused ? styles.inputFocused : ''}`}
            min={field.validation?.minDate}
            max={field.validation?.maxDate}
            required={field.isRequired}
          />
        )

      default:
        return null
    }
  }

  // Character count for textareas
  const showCharCount = field.type === 'textarea' && field.validation?.maxLength
  const charCount = showCharCount ? value.length : 0
  const maxChars = field.validation?.maxLength || 0

  return (
    <div className={styles.fieldContainer}>
      {/* Label */}
      {field.type !== 'checkbox' && (
        <label htmlFor={field.fieldId} className={styles.label}>
          {field.label}
          {field.isRequired && <span className={styles.required}>*</span>}
        </label>
      )}

      {/* Help Text (above input) */}
      {field.helpText && field.type !== 'checkbox' && (
        <p className={styles.helpText}>{field.helpText}</p>
      )}

      {/* Input Field */}
      <div className={styles.inputWrapper}>
        {renderInput()}
        
        {/* Character Count */}
        {showCharCount && (
          <div className={`${styles.charCount} ${charCount > maxChars * 0.9 ? styles.charCountWarning : ''}`}>
            {charCount} / {maxChars}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>⚠</span>
          {error}
        </div>
      )}
    </div>
  )
}