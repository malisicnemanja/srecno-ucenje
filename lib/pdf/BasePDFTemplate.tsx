import React from 'react'
import { Document, Page, View, Text, StyleSheet, Font, Image } from '@react-pdf/renderer'
import { PDFTheme } from './theme'

// Register custom fonts if needed
Font.register({
  family: 'Inter',
  fonts: [
    { src: '/fonts/Inter-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/Inter-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/Inter-Bold.ttf', fontWeight: 700 },
  ],
})

interface BasePDFTemplateProps {
  theme: PDFTheme
  title: string
  subtitle?: string
  children: React.ReactNode
  logo?: string
  footer?: React.ReactNode
}

export const BasePDFTemplate: React.FC<BasePDFTemplateProps> = ({
  theme,
  title,
  subtitle,
  children,
  logo,
  footer,
}) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Inter',
      fontSize: theme.fontSize.base,
      paddingTop: theme.spacing['2xl'],
      paddingBottom: theme.spacing['2xl'],
      paddingHorizontal: theme.spacing['2xl'],
      backgroundColor: theme.colors.background.primary,
      color: theme.colors.text.primary,
    },
    header: {
      marginBottom: theme.spacing.xl,
      borderBottom: `1px solid ${theme.colors.border}`,
      paddingBottom: theme.spacing.md,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      width: 80,
      height: 30,
    },
    titleContainer: {
      flex: 1,
      marginLeft: theme.spacing.md,
    },
    title: {
      fontSize: theme.fontSize['2xl'],
      fontWeight: 700,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.xs,
    },
    subtitle: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.text.secondary,
    },
    content: {
      flex: 1,
    },
    footer: {
      marginTop: theme.spacing.xl,
      paddingTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colors.border}`,
      fontSize: theme.fontSize.xs,
      color: theme.colors.text.secondary,
    },
    footerText: {
      textAlign: 'center',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: theme.fontSize.xs,
      bottom: theme.spacing.lg,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: theme.colors.text.secondary,
    },
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {logo && <Image style={styles.logo} src={logo} />}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
              {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>{children}</View>

        {/* Footer */}
        {footer && <View style={styles.footer}>{footer}</View>}

        {/* Page Number */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  )
}

// Export common PDF components styled with theme
export const PDFComponents = {
  Section: ({ theme, title, children }: any) => {
    const styles = StyleSheet.create({
      container: {
        marginBottom: theme.spacing.lg,
      },
      title: {
        fontSize: theme.fontSize.lg,
        fontWeight: 600,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.sm,
      },
    })

    return (
      <View style={styles.container}>
        {title && <Text style={styles.title}>{title}</Text>}
        {children}
      </View>
    )
  },

  InfoRow: ({ theme, label, value }: any) => {
    const styles = StyleSheet.create({
      row: {
        flexDirection: 'row',
        marginBottom: theme.spacing.sm,
      },
      label: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.text.secondary,
        width: '30%',
      },
      value: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.text.primary,
        flex: 1,
      },
    })

    return (
      <View style={styles.row}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    )
  },

  Card: ({ theme, title, children, variant = 'default' }: any) => {
    const styles = StyleSheet.create({
      card: {
        backgroundColor:
          variant === 'accent'
            ? theme.colors.background.accent
            : theme.colors.background.secondary,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
      },
      title: {
        fontSize: theme.fontSize.base,
        fontWeight: 600,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.sm,
      },
    })

    return (
      <View style={styles.card}>
        {title && <Text style={styles.title}>{title}</Text>}
        {children}
      </View>
    )
  },

  Badge: ({ theme, text, variant = 'default' }: any) => {
    const getColors = () => {
      switch (variant) {
        case 'success':
          return {
            bg: theme.colors.success,
            text: theme.colors.text.inverse,
          }
        case 'warning':
          return {
            bg: theme.colors.warning,
            text: theme.colors.text.inverse,
          }
        case 'error':
          return {
            bg: theme.colors.error,
            text: theme.colors.text.inverse,
          }
        default:
          return {
            bg: theme.colors.background.accent,
            text: theme.colors.text.primary,
          }
      }
    }

    const colors = getColors()
    const styles = StyleSheet.create({
      badge: {
        backgroundColor: colors.bg,
        color: colors.text,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.full,
        fontSize: theme.fontSize.xs,
        display: 'inline-block',
      },
    })

    return <Text style={styles.badge}>{text}</Text>
  },
}