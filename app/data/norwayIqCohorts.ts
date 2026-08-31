export interface NorwayIqCohortPoint {
  year: number
  meanIq: number
}

// Approximate cohort means digitized from Figure 1A in Bratsberg and Rogeberg
// (2018). The chart deliberately covers 25 consecutive birth cohorts.
export const norwayIqCohorts: NorwayIqCohortPoint[] = [
  { year: 1967, meanIq: 100.68 },
  { year: 1968, meanIq: 100.85 },
  { year: 1969, meanIq: 100.93 },
  { year: 1970, meanIq: 101.03 },
  { year: 1971, meanIq: 101.47 },
  { year: 1972, meanIq: 101.76 },
  { year: 1973, meanIq: 102.01 },
  { year: 1974, meanIq: 102.07 },
  { year: 1975, meanIq: 102.24 },
  { year: 1976, meanIq: 102.07 },
  { year: 1977, meanIq: 101.91 },
  { year: 1978, meanIq: 101.87 },
  { year: 1979, meanIq: 101.49 },
  { year: 1980, meanIq: 101.24 },
  { year: 1981, meanIq: 101.01 },
  { year: 1982, meanIq: 101.24 },
  { year: 1983, meanIq: 101.04 },
  { year: 1984, meanIq: 100.91 },
  { year: 1985, meanIq: 101.16 },
  { year: 1986, meanIq: 100.51 },
  { year: 1987, meanIq: 100.04 },
  { year: 1988, meanIq: 99.82 },
  { year: 1989, meanIq: 99.48 },
  { year: 1990, meanIq: 99.58 },
  { year: 1991, meanIq: 99.85 }
]
