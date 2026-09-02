export interface PopulationProjectionPoint {
  year: number
  value: number
}

// UN World Population Prospects 2024 medium scenario, in billions.
export const globalPopulationProjection: PopulationProjectionPoint[] = [
  { year: 2024, value: 8.162 },
  { year: 2030, value: 8.569 },
  { year: 2040, value: 9.177 },
  { year: 2050, value: 9.664 },
  { year: 2060, value: 9.989 },
  { year: 2070, value: 10.189 },
  { year: 2080, value: 10.283 },
  { year: 2090, value: 10.272 },
  { year: 2100, value: 10.180 }
]

// U.S. Census Bureau 2023 National Population Projections main series, in millions.
export const unitedStatesPopulationProjection: PopulationProjectionPoint[] = [
  { year: 2024, value: 336.482 },
  { year: 2030, value: 345.074 },
  { year: 2040, value: 355.309 },
  { year: 2050, value: 360.639 },
  { year: 2060, value: 364.287 },
  { year: 2070, value: 367.913 },
  { year: 2080, value: 369.363 },
  { year: 2090, value: 368.120 },
  { year: 2100, value: 365.558 }
]
