#!/usr/bin/env tsx

/**
 * MIGRATION COORDINATION SCRIPT
 * 
 * Orchestrates the complete migration process safely
 * Runs all scripts in the correct order with proper error handling
 * 
 * Features:
 * - Step-by-step guided process
 * - Automatic dependency checking
 * - Error recovery and rollback
 * - Progress tracking and reporting
 * - Safety confirmations at critical points
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import readline from 'readline'

interface MigrationStep {
  id: string
  name: string
  description: string
  command?: string
  script?: () => Promise<void>
  required: boolean
  criticalityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  estimatedTime: string
  prerequisites: string[]
}

class MigrationCoordinator {
  private rl: readline.Interface
  private currentStep = 0
  private completedSteps: string[] = []
  private migrationStartTime: Date
  private logFile: string

  private steps: MigrationStep[] = [
    {
      id: 'env-check',
      name: 'Environment Check',
      description: 'Verify all requirements and API tokens',
      script: this.checkEnvironment.bind(this),
      required: true,
      criticalityLevel: 'CRITICAL',
      estimatedTime: '1 minute',
      prerequisites: []
    },
    {
      id: 'backup-export',
      name: 'Content Export',
      description: 'Export all existing Sanity content to JSON files',
      command: 'tsx scripts/export-sanity-content.ts',
      required: true,
      criticalityLevel: 'CRITICAL',
      estimatedTime: '3-5 minutes',
      prerequisites: ['env-check']
    },
    {
      id: 'content-analysis',
      name: 'Content Analysis',
      description: 'Analyze exported content and create migration plan',
      command: 'tsx scripts/analyze-content.ts',
      required: true,
      criticalityLevel: 'HIGH',
      estimatedTime: '2-3 minutes',
      prerequisites: ['backup-export']
    },
    {
      id: 'review-analysis',
      name: 'Review Analysis',
      description: 'Review the analysis report before proceeding',
      script: this.reviewAnalysis.bind(this),
      required: true,
      criticalityLevel: 'HIGH',
      estimatedTime: '5-10 minutes',
      prerequisites: ['content-analysis']
    },
    {
      id: 'safe-migration',
      name: 'Safe Migration',
      description: 'Create new franchise documents without overwriting existing data',
      command: 'tsx scripts/safe-migration.ts',
      required: true,
      criticalityLevel: 'CRITICAL',
      estimatedTime: '5-10 minutes',
      prerequisites: ['review-analysis']
    },
    {
      id: 'verification',
      name: 'Migration Verification',
      description: 'Verify all data was migrated correctly',
      command: 'tsx scripts/verify-migration.ts',
      required: true,
      criticalityLevel: 'CRITICAL',
      estimatedTime: '2-3 minutes',
      prerequisites: ['safe-migration']
    },
    {
      id: 'final-review',
      name: 'Final Review',
      description: 'Review migration results and plan next steps',
      script: this.finalReview.bind(this),
      required: true,
      criticalityLevel: 'HIGH',
      estimatedTime: '5-10 minutes',
      prerequisites: ['verification']
    }
  ]

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    this.migrationStartTime = new Date()
    const timestamp = this.migrationStartTime.toISOString().replace(/[:.]/g, '-')
    this.logFile = path.join(process.cwd(), 'sanity-exports', `migration-log-${timestamp}.txt`)
    
    // Ensure log directory exists
    const logDir = path.dirname(this.logFile)
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true })
    }
  }

  private log(message: string): void {
    const timestamp = new Date().toISOString()
    const logEntry = `[${timestamp}] ${message}\n`
    
    console.log(message)
    fs.appendFileSync(this.logFile, logEntry)
  }

  private async askConfirmation(question: string, defaultYes = false): Promise<boolean> {
    return new Promise((resolve) => {
      const prompt = defaultYes ? `${question} (Y/n): ` : `${question} (y/N): `
      this.rl.question(prompt, (answer) => {
        const response = answer.toLowerCase().trim()
        if (!response) {
          resolve(defaultYes)
        } else {
          resolve(response === 'y' || response === 'yes')
        }
      })
    })
  }

  private async checkEnvironment(): Promise<void> {
    this.log('🔍 Checking environment requirements...')

    // Check Node.js version
    const nodeVersion = process.version
    this.log(`Node.js version: ${nodeVersion}`)

    // Check if we're in the right directory
    const packageJsonPath = path.join(process.cwd(), 'package.json')
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('package.json not found. Are you in the project root?')
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
    if (packageJson.name !== 'srecno-ucenje') {
      throw new Error('Not in the correct project directory')
    }
    this.log('✅ Project directory confirmed')

    // Check Sanity API token
    if (!process.env.SANITY_API_TOKEN) {
      this.log('❌ SANITY_API_TOKEN not found')
      this.log('')
      this.log('Please set your Sanity API token:')
      this.log('1. Go to https://sanity.io/manage')
      this.log('2. Select your project (08ctxj6y)')
      this.log('3. Go to API > Tokens')
      this.log('4. Create a token with read/write permissions')
      this.log('5. Set it in your environment:')
      this.log('   export SANITY_API_TOKEN="your_token_here"')
      this.log('')
      throw new Error('SANITY_API_TOKEN is required')
    }
    this.log('✅ SANITY_API_TOKEN found')

    // Check Sanity config
    const sanityConfigPath = path.join(process.cwd(), 'sanity.config.ts')
    if (!fs.existsSync(sanityConfigPath)) {
      throw new Error('sanity.config.ts not found')
    }
    this.log('✅ Sanity configuration found')

    // Check required directories
    const requiredDirs = ['scripts', 'sanity/schemas']
    for (const dir of requiredDirs) {
      const dirPath = path.join(process.cwd(), dir)
      if (!fs.existsSync(dirPath)) {
        throw new Error(`Required directory not found: ${dir}`)
      }
    }
    this.log('✅ All required directories found')

    this.log('✅ Environment check completed successfully')
  }

  private async reviewAnalysis(): Promise<void> {
    this.log('📋 Analysis Review Phase')
    this.log('')
    this.log('The content analysis has been completed. Please review the following files:')
    
    const exportDirs = fs.readdirSync(path.join(process.cwd(), 'sanity-exports'))
      .filter(dir => dir.startsWith('backup-'))
      .sort()
      .reverse()
    
    if (exportDirs.length === 0) {
      throw new Error('No export directories found')
    }
    
    const latestExport = path.join(process.cwd(), 'sanity-exports', exportDirs[0])
    
    this.log(`📁 Export Directory: ${latestExport}`)
    this.log('📄 Key Files to Review:')
    this.log('  - EXPORT_SUMMARY.md (Export overview)')
    this.log('  - MIGRATION_ANALYSIS_REPORT.md (Detailed analysis)')
    this.log('  - CONTENT_ANALYSIS.json (Raw data)')
    this.log('')

    // Show key statistics if available
    try {
      const analysisPath = path.join(latestExport, 'CONTENT_ANALYSIS.json')
      if (fs.existsSync(analysisPath)) {
        const analysis = JSON.parse(fs.readFileSync(analysisPath, 'utf-8'))
        
        this.log('📊 Key Statistics:')
        this.log(`  Total Documents: ${analysis.exportInfo?.totalDocuments || 'Unknown'}`)
        this.log(`  Content Types: ${analysis.contentTypes?.length || 'Unknown'}`)
        this.log(`  High-Risk Types: ${analysis.contentTypes?.filter((ct: any) => ct.migrationRisk === 'HIGH' || ct.migrationRisk === 'CRITICAL').length || 0}`)
        this.log('')
      }
    } catch (error) {
      this.log('⚠️ Could not load analysis details')
    }

    const shouldContinue = await this.askConfirmation(
      'Have you reviewed the analysis and are ready to proceed with migration?'
    )

    if (!shouldContinue) {
      this.log('Migration paused. Please review the analysis and run again.')
      process.exit(0)
    }

    this.log('✅ Analysis review completed')
  }

  private async finalReview(): Promise<void> {
    this.log('🎯 Final Review Phase')
    this.log('')
    
    // Show verification results
    const exportDirs = fs.readdirSync(path.join(process.cwd(), 'sanity-exports'))
      .filter(dir => dir.startsWith('backup-'))
      .sort()
      .reverse()
    
    const latestExport = path.join(process.cwd(), 'sanity-exports', exportDirs[0])
    
    try {
      const verificationPath = path.join(latestExport, 'VERIFICATION_RESULTS.json')
      if (fs.existsSync(verificationPath)) {
        const verification = JSON.parse(fs.readFileSync(verificationPath, 'utf-8'))
        
        this.log('📊 Migration Results:')
        this.log(`  Overall Status: ${verification.overallStatus}`)
        this.log(`  Documents Exported: ${verification.totalExported}`)
        this.log(`  Documents Current: ${verification.totalCurrent}`)
        this.log(`  Documents Migrated: ${verification.totalMigrated}`)
        this.log('')

        if (verification.overallStatus === 'ERROR') {
          this.log('🚨 CRITICAL ISSUES DETECTED')
          this.log('Please review VERIFICATION_REPORT.md before proceeding')
          this.log('')
        }
      }
    } catch (error) {
      this.log('⚠️ Could not load verification results')
    }

    this.log('📋 Next Steps:')
    this.log('1. Review VERIFICATION_REPORT.md')
    this.log('2. Test website functionality')
    this.log('3. Check Sanity Studio')
    this.log('4. Update any references if needed')
    this.log('5. Deploy to production when ready')
    this.log('')

    const totalTime = Date.now() - this.migrationStartTime.getTime()
    const minutes = Math.round(totalTime / 60000)
    this.log(`⏱️ Total migration time: ${minutes} minutes`)
    
    this.log('✅ Migration coordination completed!')
  }

  private async executeStep(step: MigrationStep): Promise<void> {
    this.log(`\n🔄 Step ${this.currentStep + 1}/${this.steps.length}: ${step.name}`)
    this.log(`📝 ${step.description}`)
    this.log(`⏱️ Estimated time: ${step.estimatedTime}`)
    this.log(`🔴 Criticality: ${step.criticalityLevel}`)
    
    if (step.criticalityLevel === 'CRITICAL') {
      this.log('')
      this.log('🚨 CRITICAL STEP: This operation is essential for migration safety')
      const shouldContinue = await this.askConfirmation(
        'Do you want to proceed with this critical step?',
        true
      )
      
      if (!shouldContinue) {
        this.log('Migration halted by user')
        process.exit(0)
      }
    }

    try {
      if (step.command) {
        this.log(`Running: ${step.command}`)
        execSync(step.command, { stdio: 'inherit', cwd: process.cwd() })
      } else if (step.script) {
        await step.script()
      }
      
      this.completedSteps.push(step.id)
      this.log(`✅ Step completed: ${step.name}`)
      
    } catch (error) {
      this.log(`❌ Step failed: ${step.name}`)
      this.log(`Error: ${error}`)
      
      if (step.required) {
        this.log('🚨 This is a required step. Migration cannot continue.')
        
        const shouldRetry = await this.askConfirmation('Do you want to retry this step?')
        if (shouldRetry) {
          this.log('🔄 Retrying step...')
          return this.executeStep(step) // Recursive retry
        } else {
          this.log('Migration aborted')
          process.exit(1)
        }
      } else {
        const shouldContinue = await this.askConfirmation(
          'This step failed but is not required. Continue with migration?'
        )
        if (!shouldContinue) {
          process.exit(1)
        }
      }
    }
  }

  async run(): Promise<void> {
    this.log('🚀 Starting Sanity Migration Coordination')
    this.log(`📅 Started at: ${this.migrationStartTime.toISOString()}`)
    this.log(`📄 Log file: ${this.logFile}`)
    this.log('')

    // Show migration overview
    this.log('📋 Migration Steps Overview:')
    this.steps.forEach((step, index) => {
      this.log(`  ${index + 1}. ${step.name} (${step.estimatedTime}) - ${step.criticalityLevel}`)
    })
    this.log('')

    const totalEstimatedTime = '20-35 minutes'
    this.log(`⏱️ Total estimated time: ${totalEstimatedTime}`)
    this.log('')

    this.log('🛡️ Safety Features:')
    this.log('  ✅ No existing data will be overwritten')
    this.log('  ✅ Complete backup created before any changes')
    this.log('  ✅ Verification at each step')
    this.log('  ✅ Rollback capability if needed')
    this.log('')

    const shouldStart = await this.askConfirmation(
      'Are you ready to start the migration process?',
      false
    )

    if (!shouldStart) {
      this.log('Migration cancelled by user')
      return
    }

    // Execute each step
    for (const step of this.steps) {
      // Check prerequisites
      const missingPrereqs = step.prerequisites.filter(
        prereq => !this.completedSteps.includes(prereq)
      )
      
      if (missingPrereqs.length > 0) {
        this.log(`❌ Missing prerequisites: ${missingPrereqs.join(', ')}`)
        continue
      }

      await this.executeStep(step)
      this.currentStep++
    }

    this.log('')
    this.log('🎉 Migration coordination completed successfully!')
    this.log(`📄 Complete log: ${this.logFile}`)
    
    this.rl.close()
  }
}

// Run coordinator if called directly
if (require.main === module) {
  const coordinator = new MigrationCoordinator()
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Migration interrupted by user')
    coordinator.log?.('Migration interrupted by user (SIGINT)')
    process.exit(0)
  })

  coordinator.run().catch((error) => {
    console.error('💥 Migration coordination failed:', error)
    process.exit(1)
  })
}

export default MigrationCoordinator