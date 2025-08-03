import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
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
  name: 'default',
  title: 'Srećno učenje',
  basePath: '/studio',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: deskStructure,
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
})