import { useQuery } from '@tanstack/react-query'
import { client } from '@/lib/sanity.client'

export function useSanityQuery<T = any>(
  query: string,
  params?: Record<string, any>,
  options?: {
    enabled?: boolean
    staleTime?: number
  }
) {
  return useQuery<T>({
    queryKey: ['sanity', query, params],
    queryFn: () => client.fetch<T>(query, params || {}),
    staleTime: options?.staleTime || 60 * 1000, // 1 minute default
    enabled: options?.enabled !== false,
  })
}