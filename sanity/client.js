const { createClient } = require('next-sanity')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'srecno-ucenje-demo'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Za seed scriptove treba fresh data
  token: process.env.SANITY_API_TOKEN, // Za write operacije
})

module.exports = { client }