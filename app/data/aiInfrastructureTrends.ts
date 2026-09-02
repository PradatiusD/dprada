export interface ElectricityPricePoint {
  year: number
  dollarsPerKwh: number
}

export interface Top500ComputePoint {
  year: number
  totalGflops: number
}

// Annual average of BLS monthly U.S. city-average electricity prices.
export const electricityPriceSeries: ElectricityPricePoint[] = [
  { year: 1995, dollarsPerKwh: 0.0936 },
  { year: 1996, dollarsPerKwh: 0.0942 },
  { year: 1997, dollarsPerKwh: 0.0943 },
  { year: 1998, dollarsPerKwh: 0.0868 },
  { year: 1999, dollarsPerKwh: 0.0863 },
  { year: 2000, dollarsPerKwh: 0.0872 },
  { year: 2001, dollarsPerKwh: 0.0923 },
  { year: 2002, dollarsPerKwh: 0.0911 },
  { year: 2003, dollarsPerKwh: 0.0928 },
  { year: 2004, dollarsPerKwh: 0.0943 },
  { year: 2005, dollarsPerKwh: 0.1000 },
  { year: 2006, dollarsPerKwh: 0.1123 },
  { year: 2007, dollarsPerKwh: 0.1167 },
  { year: 2008, dollarsPerKwh: 0.1233 },
  { year: 2009, dollarsPerKwh: 0.1272 },
  { year: 2010, dollarsPerKwh: 0.1277 },
  { year: 2011, dollarsPerKwh: 0.1298 },
  { year: 2012, dollarsPerKwh: 0.1296 },
  { year: 2013, dollarsPerKwh: 0.1322 },
  { year: 2014, dollarsPerKwh: 0.1371 },
  { year: 2015, dollarsPerKwh: 0.1381 },
  { year: 2016, dollarsPerKwh: 0.1352 },
  { year: 2017, dollarsPerKwh: 0.1378 },
  { year: 2018, dollarsPerKwh: 0.1363 },
  { year: 2019, dollarsPerKwh: 0.1363 },
  { year: 2020, dollarsPerKwh: 0.1353 },
  { year: 2021, dollarsPerKwh: 0.1408 },
  { year: 2022, dollarsPerKwh: 0.1585 },
  { year: 2023, dollarsPerKwh: 0.1682 },
  { year: 2024, dollarsPerKwh: 0.1757 }
]

// November TOP500 list totals, reported by TOP500 in gigaflops per second.
export const top500ComputeSeries: Top500ComputePoint[] = [
  { year: 1995, totalGflops: 4784.34 },
  { year: 1996, totalGflops: 7981.24 },
  { year: 1997, totalGflops: 16898.12 },
  { year: 1998, totalGflops: 29367.60 },
  { year: 1999, totalGflops: 50938.56 },
  { year: 2000, totalGflops: 88082.45 },
  { year: 2001, totalGflops: 134977.51 },
  { year: 2002, totalGflops: 291814.16 },
  { year: 2003, totalGflops: 526740.41 },
  { year: 2004, totalGflops: 1128834.52 },
  { year: 2005, totalGflops: 2299341.68 },
  { year: 2006, totalGflops: 3527867.61 },
  { year: 2007, totalGflops: 6977593.51 },
  { year: 2008, totalGflops: 17373520.05 },
  { year: 2009, totalGflops: 28006450.09 },
  { year: 2010, totalGflops: 43786881.73 },
  { year: 2011, totalGflops: 74069633.68 },
  { year: 2012, totalGflops: 162139386.75 },
  { year: 2013, totalGflops: 254971492.87 },
  { year: 2014, totalGflops: 313022095.99 },
  { year: 2015, totalGflops: 422609596.60 },
  { year: 2016, totalGflops: 676771901.49 },
  { year: 2017, totalGflops: 849580689.67 },
  { year: 2018, totalGflops: 1414955581.78 },
  { year: 2019, totalGflops: 1646887142.78 },
  { year: 2020, totalGflops: 2428761851.77 },
  { year: 2021, totalGflops: 3036861783.77 },
  { year: 2022, totalGflops: 4864384415.77 },
  { year: 2023, totalGflops: 7012215925.77 },
  { year: 2024, totalGflops: 11723130435.77 },
  { year: 2025, totalGflops: 14993513261.77 }
]
