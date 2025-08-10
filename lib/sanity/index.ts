// Re-export all sanity client functionality
export { client, urlFor, sanityFetch, projectId, dataset, apiVersion } from '../sanity.client'

// Re-export all queries
export * from './queries/locationQueries'
export * from './queries/franchiseQueries'
export * from './queries/navigation'