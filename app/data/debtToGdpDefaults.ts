export interface RecentSovereignDefaultPoint {
  country: string
  code: string
  year: number
  debtToGdp: number
  note: string
  isReference?: boolean
}

// General government gross debt in the default year, as a percentage of GDP.
// Debt values use IMF World Economic Outlook indicator GGXWDG_NGDP.
export const recentSovereignDefaults: RecentSovereignDefaultPoint[] = [
  {
    country: 'Lebanon',
    code: 'LBN',
    year: 2020,
    debtToGdp: 150.583,
    note: 'Eurobond payment default'
  },
  {
    country: 'Suriname',
    code: 'SUR',
    year: 2020,
    debtToGdp: 146.436,
    note: 'External bond defaults'
  },
  {
    country: 'Zambia',
    code: 'ZMB',
    year: 2020,
    debtToGdp: 140.001,
    note: 'External bond default'
  },
  {
    country: 'United States',
    code: 'USA',
    year: 2025,
    debtToGdp: 126.552,
    note: '2025 reference · not in default',
    isReference: true
  },
  {
    country: 'Sri Lanka',
    code: 'LKA',
    year: 2022,
    debtToGdp: 115.536,
    note: 'External sovereign debt default'
  },
  {
    country: 'Argentina',
    code: 'ARG',
    year: 2020,
    debtToGdp: 103.816,
    note: 'Foreign-currency debt default'
  },
  {
    country: 'Ghana',
    code: 'GHA',
    year: 2022,
    debtToGdp: 93.256,
    note: 'Domestic and external restructuring'
  },
  {
    country: 'Ecuador',
    code: 'ECU',
    year: 2020,
    debtToGdp: 63.079,
    note: 'External bond default'
  },
  {
    country: 'Ethiopia',
    code: 'ETH',
    year: 2023,
    debtToGdp: 37.972,
    note: 'Missed Eurobond coupon'
  }
]
