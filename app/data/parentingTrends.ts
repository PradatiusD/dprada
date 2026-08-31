export interface ParentingTrendPoint {
  year: number
  value: number
  basis?: string
}

// Primary child care activity among U.S. parents ages 18–64 with an own child
// younger than 18 living in the household. Historical observations are not interpolated.
export const fatherChildcareHours: ParentingTrendPoint[] = [
  { year: 1965, value: 2.5 },
  { year: 1975, value: 2.6 },
  { year: 1985, value: 2.6 },
  { year: 1995, value: 4.2 },
  { year: 2000, value: 6.8 },
  { year: 2011, value: 7.3 }
]

// Percentage of breastfed U.S. infants supplemented with formula before age 2 days.
// Values are CDC NIS-Child estimates by birth cohort, not percentages of all infants.
export const earlyFormulaSupplementation: ParentingTrendPoint[] = [
  { year: 2016, value: 16.9 },
  { year: 2017, value: 19.2 },
  { year: 2018, value: 19.4 },
  { year: 2019, value: 19.2 },
  { year: 2020, value: 20.8 },
  { year: 2021, value: 20.5 },
  { year: 2022, value: 22.9 },
  { year: 2023, value: 22.6 }
]

// U.S. Department of Labor/BLS CPS series. The duplicate 2021 values expose
// the change from March CPS/ASEC snapshots to monthly CPS annual averages.
export const mothersLaborForceParticipation: ParentingTrendPoint[] = [
  { year: 1975, value: 47.4, basis: 'March CPS/ASEC' },
  { year: 1976, value: 48.8, basis: 'March CPS/ASEC' },
  { year: 1977, value: 50.8, basis: 'March CPS/ASEC' },
  { year: 1978, value: 53.0, basis: 'March CPS/ASEC' },
  { year: 1979, value: 54.5, basis: 'March CPS/ASEC' },
  { year: 1980, value: 56.6, basis: 'March CPS/ASEC' },
  { year: 1981, value: 58.1, basis: 'March CPS/ASEC' },
  { year: 1982, value: 58.5, basis: 'March CPS/ASEC' },
  { year: 1983, value: 58.9, basis: 'March CPS/ASEC' },
  { year: 1984, value: 60.5, basis: 'March CPS/ASEC' },
  { year: 1985, value: 62.1, basis: 'March CPS/ASEC' },
  { year: 1986, value: 62.8, basis: 'March CPS/ASEC' },
  { year: 1987, value: 64.7, basis: 'March CPS/ASEC' },
  { year: 1988, value: 65.1, basis: 'March CPS/ASEC' },
  { year: 1989, value: 65.7, basis: 'March CPS/ASEC' },
  { year: 1990, value: 66.7, basis: 'March CPS/ASEC' },
  { year: 1991, value: 66.6, basis: 'March CPS/ASEC' },
  { year: 1992, value: 67.2, basis: 'March CPS/ASEC' },
  { year: 1993, value: 66.9, basis: 'March CPS/ASEC' },
  { year: 1994, value: 68.4, basis: 'March CPS/ASEC' },
  { year: 1995, value: 69.7, basis: 'March CPS/ASEC' },
  { year: 1996, value: 70.2, basis: 'March CPS/ASEC' },
  { year: 1997, value: 72.1, basis: 'March CPS/ASEC' },
  { year: 1998, value: 72.3, basis: 'March CPS/ASEC' },
  { year: 1999, value: 72.1, basis: 'March CPS/ASEC' },
  { year: 2000, value: 72.9, basis: 'March CPS/ASEC' },
  { year: 2001, value: 72.7, basis: 'March CPS/ASEC' },
  { year: 2002, value: 72.2, basis: 'March CPS/ASEC' },
  { year: 2003, value: 71.7, basis: 'March CPS/ASEC' },
  { year: 2004, value: 70.7, basis: 'March CPS/ASEC' },
  { year: 2005, value: 70.5, basis: 'March CPS/ASEC' },
  { year: 2006, value: 70.6, basis: 'March CPS/ASEC' },
  { year: 2007, value: 71.3, basis: 'March CPS/ASEC' },
  { year: 2008, value: 71.2, basis: 'March CPS/ASEC' },
  { year: 2009, value: 71.6, basis: 'March CPS/ASEC' },
  { year: 2010, value: 71.3, basis: 'March CPS/ASEC' },
  { year: 2011, value: 70.9, basis: 'March CPS/ASEC' },
  { year: 2012, value: 70.9, basis: 'March CPS/ASEC' },
  { year: 2013, value: 70.3, basis: 'March CPS/ASEC' },
  { year: 2014, value: 70.8, basis: 'March CPS/ASEC' },
  { year: 2015, value: 69.9, basis: 'March CPS/ASEC' },
  { year: 2016, value: 70.8, basis: 'March CPS/ASEC' },
  { year: 2017, value: 71.3, basis: 'March CPS/ASEC' },
  { year: 2018, value: 71.4, basis: 'March CPS/ASEC' },
  { year: 2019, value: 72.4, basis: 'March CPS/ASEC' },
  { year: 2020, value: 72.5, basis: 'March CPS/ASEC' },
  { year: 2021, value: 71.7, basis: 'March CPS/ASEC' },
  { year: 2021, value: 71.2, basis: 'monthly CPS annual average' },
  { year: 2022, value: 72.9, basis: 'monthly CPS annual average' },
  { year: 2023, value: 74.0, basis: 'monthly CPS annual average' },
  { year: 2024, value: 74.0, basis: 'monthly CPS annual average' },
  { year: 2025, value: 73.9, basis: 'monthly CPS annual average' }
]

// World Bank indicator SP.DYN.TFRT.IN through 2023, followed by the CDC/NCHS
// final 2024 total fertility rate. The source break is disclosed in the marker.
export const totalFertilityRate: ParentingTrendPoint[] = [
  { year: 1975, value: 1.774 },
  { year: 1976, value: 1.738 },
  { year: 1977, value: 1.79 },
  { year: 1978, value: 1.76 },
  { year: 1979, value: 1.808 },
  { year: 1980, value: 1.8395 },
  { year: 1981, value: 1.812 },
  { year: 1982, value: 1.8275 },
  { year: 1983, value: 1.799 },
  { year: 1984, value: 1.8065 },
  { year: 1985, value: 1.844 },
  { year: 1986, value: 1.8375 },
  { year: 1987, value: 1.872 },
  { year: 1988, value: 1.934 },
  { year: 1989, value: 2.014 },
  { year: 1990, value: 2.081 },
  { year: 1991, value: 2.0625 },
  { year: 1992, value: 2.046 },
  { year: 1993, value: 2.0195 },
  { year: 1994, value: 2.0015 },
  { year: 1995, value: 1.978 },
  { year: 1996, value: 1.976 },
  { year: 1997, value: 1.971 },
  { year: 1998, value: 1.999 },
  { year: 1999, value: 2.0075 },
  { year: 2000, value: 2.056 },
  { year: 2001, value: 2.0305 },
  { year: 2002, value: 2.0205 },
  { year: 2003, value: 2.0475 },
  { year: 2004, value: 2.0515 },
  { year: 2005, value: 2.057 },
  { year: 2006, value: 2.108 },
  { year: 2007, value: 2.12 },
  { year: 2008, value: 2.072 },
  { year: 2009, value: 2.002 },
  { year: 2010, value: 1.931 },
  { year: 2011, value: 1.8945 },
  { year: 2012, value: 1.8805 },
  { year: 2013, value: 1.8575 },
  { year: 2014, value: 1.8625 },
  { year: 2015, value: 1.8435 },
  { year: 2016, value: 1.8205 },
  { year: 2017, value: 1.7655 },
  { year: 2018, value: 1.7295 },
  { year: 2019, value: 1.706 },
  { year: 2020, value: 1.6415 },
  { year: 2021, value: 1.664 },
  { year: 2022, value: 1.6565 },
  { year: 2023, value: 1.6165 },
  { year: 2024, value: 1.5995 }
]

// Published NCFMR estimates interpolated from five-year age bins.
export const medianAgeAtFirstBirth: ParentingTrendPoint[] = [
  { year: 1960, value: 22 },
  { year: 1990, value: 24 },
  { year: 2023, value: 27 }
]
