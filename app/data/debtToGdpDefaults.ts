export interface DebtToGdpDefaultPoint {
  rank: number
  country: string
  code: string
  debtToGdp: number
  defaultEpisodesSince1960: number
  isUnitedStates?: boolean
}

export const debtToGdpDefaultsAsOf2026: DebtToGdpDefaultPoint[] = [
  { rank: 1, country: 'Japan', code: 'JPN', debtToGdp: 204.351, defaultEpisodesSince1960: 0 },
  { rank: 2, country: 'Singapore', code: 'SGP', debtToGdp: 171.936, defaultEpisodesSince1960: 0 },
  { rank: 3, country: 'Sudan', code: 'SDN', debtToGdp: 169.078, defaultEpisodesSince1960: 1 },
  { rank: 4, country: 'Bahrain', code: 'BHR', debtToGdp: 152.36, defaultEpisodesSince1960: 0 },
  { rank: 5, country: 'Italy', code: 'ITA', debtToGdp: 138.384, defaultEpisodesSince1960: 0 },
  { rank: 6, country: 'Greece', code: 'GRC', debtToGdp: 136.927, defaultEpisodesSince1960: 4 },
  { rank: 7, country: 'Senegal', code: 'SEN', debtToGdp: 132.287, defaultEpisodesSince1960: 6 },
  { rank: 8, country: 'Maldives', code: 'MDV', debtToGdp: 129.368, defaultEpisodesSince1960: 3 },
  { rank: 9, country: 'United States', code: 'USA', debtToGdp: 125.781, defaultEpisodesSince1960: 0, isUnitedStates: true },
  { rank: 10, country: 'Ukraine', code: 'UKR', debtToGdp: 122.563, defaultEpisodesSince1960: 3 }
]

export const unitedStatesDebtToGdpRank2026 = 9
