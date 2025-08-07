import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { colorInput } from '@sanity/color-input'
// import { visionTool } from '@sanity/vision' // Removed to reduce bundle size
import { schemaTypes } from './sanity/schemas'
import { deskStructure } from './sanity/deskStructure'

// Suppress framer-motion warnings in production
if (typeof window === 'undefined') {
  const originalWarn = console.warn
  console.warn = (...args) => {
    if (args[0]?.includes?.('framer-motion')) return
    originalWarn(...args)
  }
}

const projectId = '08ctxj6y'
const dataset = 'production'

export default defineConfig({
  name: 'srecno-ucenje-admin',
  title: '🏢 Srećno učenje - Upravljanje franšizom',
  subtitle: 'Profesionalni admin panel za upravljanje franšizama',
  basePath: '/studio',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: deskStructure,
      name: 'admin-dashboard',
      title: 'Admin Dashboard',
    }),
    colorInput({
      enableAlpha: true,
    }),
    // Vision tool removed to reduce bundle size - can be added back in development if needed
  ],

  schema: {
    types: schemaTypes,
  },

  api: {
    projectId,
    dataset,
  },

  // Theme configuration removed to prevent potential React rendering issues

  // Studio configuration removed to prevent React errors

  // Document actions customization simplified to prevent React errors
  // Removed complex filtering to avoid potential issues with action objects
})