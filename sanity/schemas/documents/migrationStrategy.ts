import { defineField, defineType } from 'sanity'
import { DocumentsIcon } from '@sanity/icons'

export default defineType({
  name: 'migrationStrategy',
  title: 'Migration Strategy',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Migration Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'phase',
      title: 'Migration Phase',
      type: 'string',
      options: {
        list: [
          { title: 'Phase 1: Schema Creation', value: 'phase-1' },
          { title: 'Phase 2: Data Migration', value: 'phase-2' },
          { title: 'Phase 3: Frontend Integration', value: 'phase-3' },
          { title: 'Phase 4: Legacy Cleanup', value: 'phase-4' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'steps',
      title: 'Migration Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', title: 'Step', type: 'string', validation: Rule => Rule.required() },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'sql', title: 'SQL Query', type: 'text' },
            { name: 'completed', title: 'Completed', type: 'boolean', initialValue: false },
            { name: 'notes', title: 'Notes', type: 'text' }
          ]
        }
      ]
    }),
    defineField({
      name: 'dataMapping',
      title: 'Data Mapping',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'oldSchema', title: 'Old Schema', type: 'string', validation: Rule => Rule.required() },
            { name: 'newSchema', title: 'New Schema', type: 'string', validation: Rule => Rule.required() },
            { name: 'fieldMappings', title: 'Field Mappings', type: 'array', of: [
              {
                type: 'object',
                fields: [
                  { name: 'oldField', title: 'Old Field', type: 'string' },
                  { name: 'newField', title: 'New Field', type: 'string' },
                  { name: 'transformation', title: 'Transformation Logic', type: 'text' }
                ]
              }
            ]},
            { name: 'migrated', title: 'Migration Completed', type: 'boolean', initialValue: false }
          ]
        }
      ]
    })
  ]
})

// MIGRATION STRATEGY DOCUMENTATION
/* 
PHASE 1: SCHEMA CREATION (COMPLETED)
=====================================

✅ Created new comprehensive schemas:
- franchiseModelsPage: Dynamic hero, statistics, package cards, CTAs
- franchisePackage: Single source of truth for all package information
- howToJoinPage: Process steps, FAQ, motivational CTAs
- franchiseApplicationPage: Multi-step form with validation and sidebar content
- financialCalculatorPage: Dynamic calculator with result templates
- school: Enhanced school/location data with franchisee profiles
- schoolsPage: Map interface, filters, testimonials
- enhancedFranchiseField: Advanced form field configuration

PHASE 2: DATA MIGRATION
======================

DEPRECATED SCHEMAS TO REMOVE:
- quiz.ts (functionality moved to franchise application)
- quizResult.ts (replaced by application submissions)
- Duplicate content in "Cenovnik" sections

SCHEMAS TO MIGRATE:
- location.ts → school.ts
  - Rename "Lokacije" to "Školice" everywhere
  - Enhance with franchisee profiles
  - Add success stories and detailed content
  - Migrate coordinate data and contact info

- franchiseSteps.ts → Integrate into howToJoinPage
- franchiseApplication.ts → franchiseApplicationPage.ts
- franchiseSection.ts → Remove (replaced by dynamic sections)
- franchiseField.ts → enhancedFranchiseField.ts
- franchiseMotivational.ts → Integrate into sidebar content

PHASE 3: FRONTEND INTEGRATION
============================

NEW PAGES TO CREATE:
1. /franchise-models - Dynamic package presentation
2. /kako-se-pridruziti - Enhanced process explanation
3. /aplikacija - Multi-step application form
4. /kalkulator - Financial ROI calculator
5. /skolice - Map and list of schools (rename from /lokacije)

API QUERY PATTERNS:
- Franchise packages with relationships
- Dynamic form field generation
- Calculator parameter loading
- School data with coordinates
- Conditional content based on user progress

PHASE 4: LEGACY CLEANUP
======================

FILES TO DELETE:
- Remove "Provera znanja" page and components
- Clean up duplicate "Cenovnik" content
- Remove old franchise form components
- Archive legacy schema files

SEO REDIRECTS:
- /lokacije → /skolice
- /provera-znanja → /kako-se-pridruziti
- Old franchise URLs → New structure

TESTING CHECKLIST:
- All forms validate correctly
- Calculator produces accurate results
- Map functionality works
- SEO metadata is preserved
- Mobile responsiveness maintained
- Performance optimization verified
*/