import { apiRequest } from '../api-client'
import type { AnalyticsSummary, PlayerStats } from './types'

export const analyticsApi = {
  summary: () => apiRequest<AnalyticsSummary>('/api/v1/analytics/summary'),
  playerStats: () => apiRequest<PlayerStats>('/api/v1/playerstats'),
  collectPlayerStats: () =>
    apiRequest<{ success: boolean }>('/api/v1/playerstats/collect', { method: 'POST' }),
}
