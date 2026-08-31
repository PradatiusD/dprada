export interface AiCashFlowPoint {
  year: number
  operatingCashFlow: number
  capitalExpenditures: number
  freeCashFlow: number
}

export interface AiCashFlowCompany {
  name: string
  color: string
  cik: string
  points: AiCashFlowPoint[]
}

export const aiCashFlowCompanies: AiCashFlowCompany[] = [
  {
    name: 'Alphabet',
    color: '#28786d',
    cik: '0001652044',
    points: [
      { year: 2016, operatingCashFlow: 36.036, capitalExpenditures: 10.212, freeCashFlow: 25.824 },
      { year: 2017, operatingCashFlow: 37.091, capitalExpenditures: 13.184, freeCashFlow: 23.907 },
      { year: 2018, operatingCashFlow: 47.971, capitalExpenditures: 25.139, freeCashFlow: 22.832 },
      { year: 2019, operatingCashFlow: 54.520, capitalExpenditures: 23.548, freeCashFlow: 30.972 },
      { year: 2020, operatingCashFlow: 65.124, capitalExpenditures: 22.281, freeCashFlow: 42.843 },
      { year: 2021, operatingCashFlow: 91.652, capitalExpenditures: 24.640, freeCashFlow: 67.012 },
      { year: 2022, operatingCashFlow: 91.495, capitalExpenditures: 31.485, freeCashFlow: 60.010 },
      { year: 2023, operatingCashFlow: 101.746, capitalExpenditures: 32.251, freeCashFlow: 69.495 },
      { year: 2024, operatingCashFlow: 125.299, capitalExpenditures: 52.535, freeCashFlow: 72.764 },
      { year: 2025, operatingCashFlow: 164.713, capitalExpenditures: 91.447, freeCashFlow: 73.266 }
    ]
  },
  {
    name: 'Microsoft',
    color: '#3566a8',
    cik: '0000789019',
    points: [
      { year: 2016, operatingCashFlow: 33.325, capitalExpenditures: 8.343, freeCashFlow: 24.982 },
      { year: 2017, operatingCashFlow: 39.507, capitalExpenditures: 8.129, freeCashFlow: 31.378 },
      { year: 2018, operatingCashFlow: 43.884, capitalExpenditures: 11.632, freeCashFlow: 32.252 },
      { year: 2019, operatingCashFlow: 52.185, capitalExpenditures: 13.925, freeCashFlow: 38.260 },
      { year: 2020, operatingCashFlow: 60.675, capitalExpenditures: 15.441, freeCashFlow: 45.234 },
      { year: 2021, operatingCashFlow: 76.740, capitalExpenditures: 20.622, freeCashFlow: 56.118 },
      { year: 2022, operatingCashFlow: 89.035, capitalExpenditures: 23.886, freeCashFlow: 65.149 },
      { year: 2023, operatingCashFlow: 87.582, capitalExpenditures: 28.107, freeCashFlow: 59.475 },
      { year: 2024, operatingCashFlow: 118.548, capitalExpenditures: 44.477, freeCashFlow: 74.071 },
      { year: 2025, operatingCashFlow: 136.162, capitalExpenditures: 64.551, freeCashFlow: 71.611 }
    ]
  },
  {
    name: 'Amazon',
    color: '#bd6429',
    cik: '0001018724',
    points: [
      { year: 2016, operatingCashFlow: 16.443, capitalExpenditures: 6.737, freeCashFlow: 9.706 },
      { year: 2017, operatingCashFlow: 18.434, capitalExpenditures: 11.955, freeCashFlow: 6.479 },
      { year: 2018, operatingCashFlow: 30.723, capitalExpenditures: 13.427, freeCashFlow: 17.296 },
      { year: 2019, operatingCashFlow: 38.514, capitalExpenditures: 16.861, freeCashFlow: 21.653 },
      { year: 2020, operatingCashFlow: 66.064, capitalExpenditures: 40.140, freeCashFlow: 25.924 },
      { year: 2021, operatingCashFlow: 46.327, capitalExpenditures: 61.053, freeCashFlow: -14.726 },
      { year: 2022, operatingCashFlow: 46.752, capitalExpenditures: 63.645, freeCashFlow: -16.893 },
      { year: 2023, operatingCashFlow: 84.946, capitalExpenditures: 52.729, freeCashFlow: 32.217 },
      { year: 2024, operatingCashFlow: 115.877, capitalExpenditures: 82.999, freeCashFlow: 32.878 },
      { year: 2025, operatingCashFlow: 139.514, capitalExpenditures: 131.819, freeCashFlow: 7.695 }
    ]
  },
  {
    name: 'Meta',
    color: '#7a579f',
    cik: '0001326801',
    points: [
      { year: 2016, operatingCashFlow: 16.108, capitalExpenditures: 4.491, freeCashFlow: 11.617 },
      { year: 2017, operatingCashFlow: 24.216, capitalExpenditures: 6.733, freeCashFlow: 17.483 },
      { year: 2018, operatingCashFlow: 29.274, capitalExpenditures: 13.915, freeCashFlow: 15.359 },
      { year: 2019, operatingCashFlow: 36.314, capitalExpenditures: 15.102, freeCashFlow: 21.212 },
      { year: 2020, operatingCashFlow: 38.747, capitalExpenditures: 15.115, freeCashFlow: 23.632 },
      { year: 2021, operatingCashFlow: 57.683, capitalExpenditures: 18.567, freeCashFlow: 39.116 },
      { year: 2022, operatingCashFlow: 50.475, capitalExpenditures: 31.431, freeCashFlow: 19.044 },
      { year: 2023, operatingCashFlow: 71.113, capitalExpenditures: 27.266, freeCashFlow: 43.847 },
      { year: 2024, operatingCashFlow: 91.328, capitalExpenditures: 37.256, freeCashFlow: 54.072 },
      { year: 2025, operatingCashFlow: 115.800, capitalExpenditures: 69.691, freeCashFlow: 46.109 }
    ]
  },
  {
    name: 'Nvidia',
    color: '#5d8b35',
    cik: '0001045810',
    points: [
      { year: 2016, operatingCashFlow: 1.175, capitalExpenditures: 0.086, freeCashFlow: 1.089 },
      { year: 2017, operatingCashFlow: 1.672, capitalExpenditures: 0.169, freeCashFlow: 1.503 },
      { year: 2018, operatingCashFlow: 3.502, capitalExpenditures: 0.591, freeCashFlow: 2.911 },
      { year: 2019, operatingCashFlow: 3.743, capitalExpenditures: 0.600, freeCashFlow: 3.143 },
      { year: 2020, operatingCashFlow: 4.761, capitalExpenditures: 0.489, freeCashFlow: 4.272 },
      { year: 2021, operatingCashFlow: 5.822, capitalExpenditures: 1.128, freeCashFlow: 4.694 },
      { year: 2022, operatingCashFlow: 9.108, capitalExpenditures: 0.976, freeCashFlow: 8.132 },
      { year: 2023, operatingCashFlow: 5.641, capitalExpenditures: 1.833, freeCashFlow: 3.808 },
      { year: 2024, operatingCashFlow: 28.090, capitalExpenditures: 1.069, freeCashFlow: 27.021 },
      { year: 2025, operatingCashFlow: 64.089, capitalExpenditures: 3.236, freeCashFlow: 60.853 }
    ]
  },
  {
    name: 'Oracle',
    color: '#a6413b',
    cik: '0001341439',
    points: [
      { year: 2016, operatingCashFlow: 13.561, capitalExpenditures: 1.189, freeCashFlow: 12.372 },
      { year: 2017, operatingCashFlow: 14.126, capitalExpenditures: 2.021, freeCashFlow: 12.105 },
      { year: 2018, operatingCashFlow: 15.386, capitalExpenditures: 1.736, freeCashFlow: 13.650 },
      { year: 2019, operatingCashFlow: 14.551, capitalExpenditures: 1.660, freeCashFlow: 12.891 },
      { year: 2020, operatingCashFlow: 13.139, capitalExpenditures: 1.564, freeCashFlow: 11.575 },
      { year: 2021, operatingCashFlow: 15.887, capitalExpenditures: 2.135, freeCashFlow: 13.752 },
      { year: 2022, operatingCashFlow: 9.539, capitalExpenditures: 4.511, freeCashFlow: 5.028 },
      { year: 2023, operatingCashFlow: 17.165, capitalExpenditures: 8.695, freeCashFlow: 8.470 },
      { year: 2024, operatingCashFlow: 18.673, capitalExpenditures: 6.866, freeCashFlow: 11.807 },
      { year: 2025, operatingCashFlow: 20.821, capitalExpenditures: 21.215, freeCashFlow: -0.394 }
    ]
  }
]
