#!/usr/bin/env tsx

/**
 * SANITY CONTENT ANALYSIS SCRIPT
 * 
 * Analyzes exported content to understand data relationships and structure
 * Provides detailed insights for safe migration planning
 * 
 * Features:
 * - Content relationship mapping
 * - Data integrity validation
 * - Migration complexity analysis
 * - Risk assessment for each content type
 * - Detailed migration recommendations
 */

import fs from 'fs'
import path from 'path'

interface ContentAnalysis {
  documentType: string
  count: number
  sampleDocument?: any
  fields: string[]
  references: Array<{ field: string; targetType: string; count: number }>
  backReferences: Array<{ sourceType: string; count: number }>
  assets: Array<{ field: string; count: number }>
  complexity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  migrationRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  recommendations: string[]
}

interface FullAnalysis {
  exportInfo: {
    timestamp: string
    totalDocuments: number
    totalTypes: number
  }
  contentTypes: ContentAnalysis[]
  relationships: {
    stronglyConnected: string[]
    orphaned: string[]
    circularReferences: string[]
  }
  assets: {
    totalAssets: number
    unreferencedAssets: number
    assetTypes: Record<string, number>
  }
  migrationPlan: {
    phases: Array<{
      phase: number
      name: string
      types: string[]
      risk: string
      dependencies: string[]
    }>
  }
  recommendations: {
    immediate: string[]
    beforeMigration: string[]
    duringMigration: string[]
    afterMigration: string[]
  }
}

class ContentAnalyzer {
  private exportDir: string
  private analysis: FullAnalysis
  
  constructor(exportDir?: string) {
    // Find the most recent export directory if not specified
    const exportsDir = path.join(process.cwd(), 'sanity-exports')
    
    if (exportDir) {
      this.exportDir = exportDir
    } else {
      // Find most recent backup
      const backupDirs = fs.readdirSync(exportsDir)
        .filter(dir => dir.startsWith('backup-'))
        .sort()
        .reverse()
      
      if (backupDirs.length === 0) {
        throw new Error('No export directories found. Run export script first.')
      }
      
      this.exportDir = path.join(exportsDir, backupDirs[0])
    }
    
    console.log(`🔍 Analyzing content from: ${this.exportDir}`)
    
    this.analysis = {
      exportInfo: {
        timestamp: '',
        totalDocuments: 0,
        totalTypes: 0
      },
      contentTypes: [],
      relationships: {
        stronglyConnected: [],
        orphaned: [],
        circularReferences: []
      },
      assets: {
        totalAssets: 0,
        unreferencedAssets: 0,
        assetTypes: {}
      },
      migrationPlan: {
        phases: []
      },
      recommendations: {
        immediate: [],
        beforeMigration: [],
        duringMigration: [],
        afterMigration: []
      }
    }
  }

  private loadExportData(): Record<string, any> {
    const files = fs.readdirSync(this.exportDir)
      .filter(file => file.endsWith('.json') && !file.includes('MANIFEST'))
    
    const data: Record<string, any> = {}
    
    for (const file of files) {
      const filePath = path.join(this.exportDir, file)
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      const type = file.replace('.json', '')
      data[type] = content
    }
    
    return data
  }

  private analyzeDocumentType(type: string, data: any): ContentAnalysis {
    const documents = data.documents || []
    const count = documents.length
    
    if (count === 0) {
      return {
        documentType: type,
        count: 0,
        fields: [],
        references: [],
        backReferences: [],
        assets: [],
        complexity: 'LOW',
        migrationRisk: 'LOW',
        recommendations: ['No data to migrate for this type']
      }
    }
    
    const sampleDoc = documents[0]
    const fields = this.extractFields(sampleDoc)
    const references = this.analyzeReferences(documents)
    const backReferences = this.analyzeBackReferences(documents)
    const assets = this.analyzeAssets(documents)
    
    // Determine complexity and risk
    const complexity = this.calculateComplexity(fields, references, assets, count)
    const migrationRisk = this.calculateMigrationRisk(type, complexity, references, count)
    const recommendations = this.generateRecommendations(type, complexity, migrationRisk, references, count)
    
    return {
      documentType: type,
      count,
      sampleDocument: this.sanitizeSample(sampleDoc),
      fields,
      references,
      backReferences,
      assets,
      complexity,
      migrationRisk,
      recommendations
    }
  }

  private extractFields(doc: any): string[] {
    const fields = new Set<string>()
    
    const traverse = (obj: any, prefix = '') => {
      if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        for (const [key, value] of Object.entries(obj)) {
          const fieldName = prefix ? `${prefix}.${key}` : key
          fields.add(fieldName)
          
          if (typeof value === 'object' && value !== null) {
            traverse(value, fieldName)
          }
        }
      } else if (Array.isArray(obj) && obj.length > 0) {
        traverse(obj[0], prefix)
      }
    }
    
    traverse(doc)
    return Array.from(fields).sort()
  }

  private analyzeReferences(documents: any[]): Array<{ field: string; targetType: string; count: number }> {
    const references: Record<string, Record<string, number>> = {}
    
    documents.forEach(doc => {
      const traverse = (obj: any, prefix = '') => {
        if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
          if (obj._ref || obj._type) {
            const fieldName = prefix || 'reference'
            const targetType = obj._type || 'unknown'
            
            if (!references[fieldName]) {
              references[fieldName] = {}
            }
            references[fieldName][targetType] = (references[fieldName][targetType] || 0) + 1
          }
          
          for (const [key, value] of Object.entries(obj)) {
            const fieldName = prefix ? `${prefix}.${key}` : key
            if (typeof value === 'object' && value !== null) {
              traverse(value, fieldName)
            }
          }
        } else if (Array.isArray(obj)) {
          obj.forEach(item => traverse(item, prefix))
        }
      }
      
      traverse(doc)
    })
    
    const result: Array<{ field: string; targetType: string; count: number }> = []
    for (const [field, targets] of Object.entries(references)) {
      for (const [targetType, count] of Object.entries(targets)) {
        result.push({ field, targetType, count })
      }
    }
    
    return result
  }

  private analyzeBackReferences(documents: any[]): Array<{ sourceType: string; count: number }> {
    // This would need cross-document analysis, simplified for now
    return documents[0]?.backReferences?.reduce((acc: any[], ref: any) => {
      const existing = acc.find(item => item.sourceType === ref._type)
      if (existing) {
        existing.count++
      } else {
        acc.push({ sourceType: ref._type, count: 1 })
      }
      return acc
    }, []) || []
  }

  private analyzeAssets(documents: any[]): Array<{ field: string; count: number }> {
    const assets: Record<string, number> = {}
    
    documents.forEach(doc => {
      const traverse = (obj: any, prefix = '') => {
        if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
          if (obj.asset && obj.asset._ref) {
            const fieldName = prefix || 'asset'
            assets[fieldName] = (assets[fieldName] || 0) + 1
          }
          
          for (const [key, value] of Object.entries(obj)) {
            const fieldName = prefix ? `${prefix}.${key}` : key
            if (typeof value === 'object' && value !== null) {
              traverse(value, fieldName)
            }
          }
        } else if (Array.isArray(obj)) {
          obj.forEach(item => traverse(item, prefix))
        }
      }
      
      traverse(doc)
    })
    
    return Object.entries(assets).map(([field, count]) => ({ field, count }))
  }

  private calculateComplexity(
    fields: string[], 
    references: any[], 
    assets: any[], 
    count: number
  ): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    let score = 0
    
    // Field complexity
    score += Math.min(fields.length / 10, 3)
    
    // Reference complexity
    score += references.length * 0.5
    
    // Asset complexity
    score += assets.length * 0.3
    
    // Volume complexity
    if (count > 1000) score += 3
    else if (count > 100) score += 2
    else if (count > 10) score += 1
    
    if (score >= 8) return 'CRITICAL'
    if (score >= 6) return 'HIGH'
    if (score >= 3) return 'MEDIUM'
    return 'LOW'
  }

  private calculateMigrationRisk(
    type: string,
    complexity: string,
    references: any[],
    count: number
  ): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    // Critical business types
    const criticalTypes = [
      'franchiseApplicationSubmission',
      'siteSettings',
      'homePage',
      'franchisePackage'
    ]
    
    // High-value content types
    const highValueTypes = [
      'blogPost',
      'testimonial',
      'successStory',
      'faq',
      'book'
    ]
    
    if (criticalTypes.includes(type)) return 'CRITICAL'
    if (highValueTypes.includes(type) && count > 50) return 'HIGH'
    if (complexity === 'CRITICAL' || complexity === 'HIGH') return 'HIGH'
    if (references.length > 5) return 'MEDIUM'
    
    return 'LOW'
  }

  private generateRecommendations(
    type: string,
    complexity: string,
    risk: string,
    references: any[],
    count: number
  ): string[] {
    const recommendations = []
    
    if (risk === 'CRITICAL') {
      recommendations.push('🚨 CRITICAL: Test migration extensively before production')
      recommendations.push('🚨 CRITICAL: Create additional backups before migration')
      recommendations.push('🚨 CRITICAL: Have rollback plan ready')
    }
    
    if (complexity === 'HIGH' || complexity === 'CRITICAL') {
      recommendations.push('⚠️ Complex structure - migrate in small batches')
      recommendations.push('⚠️ Validate all nested objects after migration')
    }
    
    if (references.length > 3) {
      recommendations.push('🔗 Many references - ensure all referenced documents exist first')
      recommendations.push('🔗 Consider migrating referenced types before this one')
    }
    
    if (count > 100) {
      recommendations.push('📊 Large dataset - use batch processing')
      recommendations.push('📊 Monitor API rate limits during migration')
    }
    
    if (count === 0) {
      recommendations.push('✅ No data to migrate - safe to skip')
    } else if (count < 10 && references.length === 0) {
      recommendations.push('✅ Simple migration - low risk')
    }
    
    return recommendations
  }

  private sanitizeSample(doc: any): any {
    // Remove sensitive data and limit size
    const sanitized = { ...doc }
    delete sanitized.references
    delete sanitized.backReferences
    
    // Limit array lengths for readability
    for (const [key, value] of Object.entries(sanitized)) {
      if (Array.isArray(value) && value.length > 3) {
        sanitized[key] = value.slice(0, 3).concat(['... truncated'])
      }
    }
    
    return sanitized
  }

  private createMigrationPlan(contentTypes: ContentAnalysis[]): void {
    // Phase 1: Core infrastructure (no dependencies)
    const phase1 = contentTypes
      .filter(ct => ct.references.length === 0 && ['siteSettings', 'navigation'].includes(ct.documentType))
      .map(ct => ct.documentType)

    // Phase 2: Foundation content (minimal dependencies)
    const phase2 = contentTypes
      .filter(ct => ct.references.length <= 1 && !phase1.includes(ct.documentType) && 
        ['blogCategory', 'faqCategory', 'author', 'program'].includes(ct.documentType))
      .map(ct => ct.documentType)

    // Phase 3: Main content (moderate dependencies)
    const phase3 = contentTypes
      .filter(ct => ct.references.length <= 3 && !phase1.includes(ct.documentType) && 
        !phase2.includes(ct.documentType) && 
        ['blogPost', 'faq', 'testimonial', 'book', 'successStory'].includes(ct.documentType))
      .map(ct => ct.documentType)

    // Phase 4: Complex content (many dependencies)
    const phase4 = contentTypes
      .filter(ct => !phase1.includes(ct.documentType) && !phase2.includes(ct.documentType) && 
        !phase3.includes(ct.documentType) && ct.count > 0)
      .map(ct => ct.documentType)

    this.analysis.migrationPlan.phases = [
      {
        phase: 1,
        name: 'Core Infrastructure',
        types: phase1,
        risk: 'CRITICAL',
        dependencies: []
      },
      {
        phase: 2,
        name: 'Foundation Content',
        types: phase2,
        risk: 'MEDIUM',
        dependencies: phase1
      },
      {
        phase: 3,
        name: 'Main Content',
        types: phase3,
        risk: 'MEDIUM',
        dependencies: [...phase1, ...phase2]
      },
      {
        phase: 4,
        name: 'Complex Content',
        types: phase4,
        risk: 'HIGH',
        dependencies: [...phase1, ...phase2, ...phase3]
      }
    ]
  }

  private generateGlobalRecommendations(contentTypes: ContentAnalysis[]): void {
    const highRiskTypes = contentTypes.filter(ct => ct.migrationRisk === 'HIGH' || ct.migrationRisk === 'CRITICAL')
    const totalDocuments = contentTypes.reduce((sum, ct) => sum + ct.count, 0)
    
    // Immediate actions
    this.analysis.recommendations.immediate = [
      '🚨 Ensure all stakeholders are aware of the migration',
      '📋 Schedule a maintenance window for the migration',
      '🔐 Verify all API tokens and permissions are working',
      '🧪 Set up a development/staging environment for testing'
    ]
    
    if (highRiskTypes.length > 0) {
      this.analysis.recommendations.immediate.push(
        `⚠️ ${highRiskTypes.length} high-risk content types identified - review carefully`
      )
    }

    // Before migration
    this.analysis.recommendations.beforeMigration = [
      '✅ Run the export script one more time right before migration',
      '🔒 Put the website in maintenance mode',
      '📧 Notify users about the maintenance',
      '🧪 Test the migration scripts on development environment',
      '📊 Document current content counts for verification'
    ]

    if (totalDocuments > 500) {
      this.analysis.recommendations.beforeMigration.push(
        '⏱️ Large dataset detected - plan for extended migration time'
      )
    }

    // During migration
    this.analysis.recommendations.duringMigration = [
      '📊 Monitor progress and log all operations',
      '🚫 Do not modify content during migration',
      '🔍 Validate each phase before proceeding to the next',
      '⏸️ Be prepared to pause if issues arise',
      '📱 Keep communication channels open with stakeholders'
    ]

    // After migration
    this.analysis.recommendations.afterMigration = [
      '🔍 Verify all document counts match the export',
      '🧪 Test all website functionality',
      '🔗 Verify all internal links are working',
      '🖼️ Check that all images and assets are loading',
      '📧 Notify stakeholders of successful completion',
      '🗂️ Archive the export files safely',
      '📊 Document any issues encountered for future reference'
    ]
  }

  async run(): Promise<void> {
    console.log('🔍 Starting content analysis...')
    
    try {
      const exportData = this.loadExportData()
      
      // Load export manifest if available
      const manifestPath = path.join(this.exportDir, 'EXPORT_MANIFEST.json')
      if (fs.existsSync(manifestPath)) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
        this.analysis.exportInfo = {
          timestamp: manifest.exportTimestamp,
          totalDocuments: manifest.stats.totalDocuments,
          totalTypes: manifest.stats.successfulExports
        }
      }

      // Analyze each content type
      console.log('📄 Analyzing document types...')
      for (const [type, data] of Object.entries(exportData)) {
        if (type === 'schema-info' || type === 'assets') continue
        
        console.log(`  🔍 Analyzing ${type}...`)
        const analysis = this.analyzeDocumentType(type, data)
        this.analysis.contentTypes.push(analysis)
      }

      // Analyze assets if available
      if (exportData.assets) {
        console.log('🖼️ Analyzing assets...')
        this.analysis.assets.totalAssets = exportData.assets._count || 0
        // Additional asset analysis would go here
      }

      // Create migration plan
      console.log('📋 Creating migration plan...')
      this.createMigrationPlan(this.analysis.contentTypes)

      // Generate recommendations
      console.log('💡 Generating recommendations...')
      this.generateGlobalRecommendations(this.analysis.contentTypes)

      // Save analysis
      await this.saveAnalysis()

      // Print summary
      this.printSummary()

    } catch (error) {
      console.error('💥 Analysis failed:', error)
      process.exit(1)
    }
  }

  private async saveAnalysis(): Promise<void> {
    const analysisPath = path.join(this.exportDir, 'CONTENT_ANALYSIS.json')
    fs.writeFileSync(analysisPath, JSON.stringify(this.analysis, null, 2))

    // Create detailed report
    const reportPath = path.join(this.exportDir, 'MIGRATION_ANALYSIS_REPORT.md')
    const report = this.generateMarkdownReport()
    fs.writeFileSync(reportPath, report)

    console.log(`📄 Analysis saved to: ${analysisPath}`)
    console.log(`📋 Detailed report: ${reportPath}`)
  }

  private generateMarkdownReport(): string {
    const { contentTypes, migrationPlan, recommendations, exportInfo } = this.analysis

    return `# Content Migration Analysis Report

**Generated:** ${new Date().toISOString()}
**Source Export:** ${exportInfo.timestamp}
**Total Documents:** ${exportInfo.totalDocuments}
**Content Types:** ${exportInfo.totalTypes}

## 🚨 Executive Summary

${this.getExecutiveSummary()}

## 📊 Content Breakdown

| Document Type | Count | Complexity | Risk | Key Concerns |
|---------------|--------|------------|------|-------------|
${contentTypes
  .sort((a, b) => b.count - a.count)
  .map(ct => `| ${ct.documentType} | ${ct.count} | ${ct.complexity} | ${ct.migrationRisk} | ${ct.recommendations.slice(0, 2).join(', ') || 'None'} |`)
  .join('\n')}

## 🗺️ Migration Plan

${migrationPlan.phases.map(phase => `
### Phase ${phase.phase}: ${phase.name}
**Risk Level:** ${phase.risk}
**Types:** ${phase.types.join(', ') || 'None'}
**Dependencies:** ${phase.dependencies.join(', ') || 'None'}
`).join('\n')}

## 💡 Recommendations

### 🚨 Immediate Actions
${recommendations.immediate.map(rec => `- ${rec}`).join('\n')}

### 📋 Before Migration
${recommendations.beforeMigration.map(rec => `- ${rec}`).join('\n')}

### ⚙️ During Migration
${recommendations.duringMigration.map(rec => `- ${rec}`).join('\n')}

### ✅ After Migration
${recommendations.afterMigration.map(rec => `- ${rec}`).join('\n')}

## 📄 Detailed Content Analysis

${contentTypes.map(ct => `
### ${ct.documentType}
**Count:** ${ct.count} documents
**Complexity:** ${ct.complexity}
**Migration Risk:** ${ct.migrationRisk}

**Fields:** ${ct.fields.length} total fields
**References:** ${ct.references.length} reference types
**Assets:** ${ct.assets.length} asset fields

**Recommendations:**
${ct.recommendations.map(rec => `- ${rec}`).join('\n')}

**Sample Document Structure:**
\`\`\`json
${JSON.stringify(ct.sampleDocument || {}, null, 2).slice(0, 500)}...
\`\`\`
`).join('\n')}

---
*Generated by Sanity Content Analyzer*
*Export Directory: ${this.exportDir}*`
  }

  private getExecutiveSummary(): string {
    const { contentTypes } = this.analysis
    const totalDocs = contentTypes.reduce((sum, ct) => sum + ct.count, 0)
    const criticalTypes = contentTypes.filter(ct => ct.migrationRisk === 'CRITICAL').length
    const highRiskTypes = contentTypes.filter(ct => ct.migrationRisk === 'HIGH').length
    const complexTypes = contentTypes.filter(ct => ct.complexity === 'HIGH' || ct.complexity === 'CRITICAL').length

    let summary = `This analysis covers **${totalDocs} documents** across **${contentTypes.length} content types**.`

    if (criticalTypes > 0) {
      summary += `\n\n🚨 **CRITICAL:** ${criticalTypes} content types require extreme caution during migration.`
    }

    if (highRiskTypes > 0) {
      summary += `\n\n⚠️ **HIGH RISK:** ${highRiskTypes} content types need careful handling and testing.`
    }

    if (complexTypes > 0) {
      summary += `\n\n🔧 **COMPLEX:** ${complexTypes} content types have complex structures requiring batch processing.`
    }

    summary += `\n\n**Migration Approach:** Use the phased approach outlined below to ensure data integrity and minimize risk.`

    return summary
  }

  private printSummary(): void {
    const { contentTypes, migrationPlan } = this.analysis
    const totalDocs = contentTypes.reduce((sum, ct) => sum + ct.count, 0)

    console.log('\n🎉 Analysis Complete!')
    console.log(`📊 Total Documents: ${totalDocs}`)
    console.log(`📄 Content Types: ${contentTypes.length}`)
    console.log(`🗺️ Migration Phases: ${migrationPlan.phases.length}`)

    console.log('\n🔍 Key Findings:')
    const topTypes = contentTypes
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    topTypes.forEach(ct => {
      console.log(`  📋 ${ct.documentType}: ${ct.count} docs (${ct.migrationRisk} risk)`)
    })

    console.log('\n📋 Next Steps:')
    console.log('1. Review the detailed report: MIGRATION_ANALYSIS_REPORT.md')
    console.log('2. Create migration scripts: npm run create-migration-plan')
    console.log('3. Test on development environment first')
    console.log('4. Execute migration with monitoring')
  }
}

// Run analysis if called directly
if (require.main === module) {
  const analyzer = new ContentAnalyzer()
  analyzer.run().catch(console.error)
}

export default ContentAnalyzer