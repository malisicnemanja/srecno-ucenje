#!/usr/bin/env node

/**
 * Fix Missing _key Values in Sanity Documents
 * 
 * This script finds array items missing _key values and adds them
 */

import { createClient } from '@sanity/client'
import { v4 as uuidv4 } from 'uuid'

// Initialize Sanity client with write access
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '08ctxj6y',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN, // Required for writes
})

interface DocumentToFix {
  _id: string
  _type: string
  document: any
}

class SanityKeyFixer {
  private documentsFixed = 0
  private keysAdded = 0

  async fixAllMissingKeys(): Promise<void> {
    console.log('🔧 Starting to fix missing _key values in Sanity documents...\n')
    
    await this.fixDocumentType('homePage')
    await this.fixDocumentType('navigation')  
    await this.fixDocumentType('siteSettings')
    
    console.log(`\n✅ Fixed ${this.documentsFixed} documents with ${this.keysAdded} keys added`)
  }

  private async fixDocumentType(docType: string): Promise<void> {
    console.log(`Processing ${docType} documents...`)
    
    try {
      const documents = await client.fetch(`*[_type == "${docType}"]`)
      
      for (const doc of documents) {
        const fixedDoc = this.addMissingKeys(doc)
        
        if (this.hasChanges(doc, fixedDoc)) {
          console.log(`  Fixing document: ${doc._id}`)
          
          // Use replace to update the document
          await client
            .patch(doc._id)
            .set(fixedDoc)
            .commit()
          
          this.documentsFixed++
        }
      }
    } catch (error) {
      console.error(`Error fixing ${docType}:`, error)
    }
  }

  private addMissingKeys(obj: any, depth = 0): any {
    if (!obj || typeof obj !== 'object') {
      return obj
    }

    if (Array.isArray(obj)) {
      return obj.map(item => {
        if (item && typeof item === 'object' && !item._key && !item._id) {
          // Only add _key to complex objects, not simple values
          if (this.needsKey(item)) {
            this.keysAdded++
            return {
              _key: uuidv4().substring(0, 8), // Short UUID
              ...this.addMissingKeys(item, depth + 1)
            }
          }
        }
        return this.addMissingKeys(item, depth + 1)
      })
    } else {
      const result: any = {}
      for (const [key, value] of Object.entries(obj)) {
        if (key.startsWith('_')) {
          result[key] = value // Keep system fields as-is
        } else {
          result[key] = this.addMissingKeys(value, depth + 1)
        }
      }
      return result
    }
  }

  private needsKey(obj: any): boolean {
    if (!obj || typeof obj !== 'object') return false
    
    // Skip if it already has _id or _key
    if (obj._id || obj._key) return false
    
    // Get non-system keys
    const keys = Object.keys(obj).filter(k => !k.startsWith('_'))
    
    // Skip empty objects
    if (keys.length === 0) return false
    
    // Skip very simple objects (just text/value pairs)
    if (keys.length === 1 && ['text', 'value', 'label'].includes(keys[0])) {
      const value = obj[keys[0]]
      if (typeof value === 'string' || typeof value === 'number') {
        return false
      }
    }
    
    // Add _key to all other objects in arrays
    return true
  }

  private hasChanges(original: any, fixed: any): boolean {
    return JSON.stringify(original) !== JSON.stringify(fixed)
  }
}

// Main execution
async function main() {
  try {
    const fixer = new SanityKeyFixer()
    await fixer.fixAllMissingKeys()
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export default main