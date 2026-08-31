export interface AiProfitPoint {
  year: number
  netIncome: number
}

export interface AiProfitCompany {
  name: string
  color: string
  cik: string
  points: AiProfitPoint[]
}

export const aiProfitCompanies: AiProfitCompany[] = [
  {
    name: 'Alphabet',
    color: '#28786d',
    cik: '0001652044',
    points: [
      { year: 2016, netIncome: 19.478 },
      { year: 2017, netIncome: 12.662 },
      { year: 2018, netIncome: 30.736 },
      { year: 2019, netIncome: 34.343 },
      { year: 2020, netIncome: 40.269 },
      { year: 2021, netIncome: 76.033 },
      { year: 2022, netIncome: 59.972 },
      { year: 2023, netIncome: 73.795 },
      { year: 2024, netIncome: 100.118 },
      { year: 2025, netIncome: 132.170 }
    ]
  },
  {
    name: 'Microsoft',
    color: '#3566a8',
    cik: '0000789019',
    points: [
      { year: 2016, netIncome: 16.798 },
      { year: 2017, netIncome: 21.204 },
      { year: 2018, netIncome: 16.571 },
      { year: 2019, netIncome: 39.240 },
      { year: 2020, netIncome: 44.281 },
      { year: 2021, netIncome: 61.271 },
      { year: 2022, netIncome: 72.738 },
      { year: 2023, netIncome: 72.361 },
      { year: 2024, netIncome: 88.136 },
      { year: 2025, netIncome: 101.832 }
    ]
  },
  {
    name: 'Amazon',
    color: '#bd6429',
    cik: '0001018724',
    points: [
      { year: 2016, netIncome: 2.371 },
      { year: 2017, netIncome: 3.033 },
      { year: 2018, netIncome: 10.073 },
      { year: 2019, netIncome: 11.588 },
      { year: 2020, netIncome: 21.331 },
      { year: 2021, netIncome: 33.364 },
      { year: 2022, netIncome: -2.722 },
      { year: 2023, netIncome: 30.425 },
      { year: 2024, netIncome: 59.248 },
      { year: 2025, netIncome: 77.670 }
    ]
  },
  {
    name: 'Meta',
    color: '#7a579f',
    cik: '0001326801',
    points: [
      { year: 2016, netIncome: 10.217 },
      { year: 2017, netIncome: 15.934 },
      { year: 2018, netIncome: 22.112 },
      { year: 2019, netIncome: 18.485 },
      { year: 2020, netIncome: 29.146 },
      { year: 2021, netIncome: 39.370 },
      { year: 2022, netIncome: 23.200 },
      { year: 2023, netIncome: 39.098 },
      { year: 2024, netIncome: 62.360 },
      { year: 2025, netIncome: 60.458 }
    ]
  },
  {
    name: 'Nvidia',
    color: '#5d8b35',
    cik: '0001045810',
    points: [
      { year: 2016, netIncome: 0.614 },
      { year: 2017, netIncome: 1.666 },
      { year: 2018, netIncome: 3.047 },
      { year: 2019, netIncome: 4.141 },
      { year: 2020, netIncome: 2.796 },
      { year: 2021, netIncome: 4.332 },
      { year: 2022, netIncome: 9.752 },
      { year: 2023, netIncome: 4.368 },
      { year: 2024, netIncome: 29.760 },
      { year: 2025, netIncome: 72.880 }
    ]
  },
  {
    name: 'Oracle',
    color: '#a6413b',
    cik: '0001341439',
    points: [
      { year: 2016, netIncome: 8.901 },
      { year: 2017, netIncome: 9.335 },
      { year: 2018, netIncome: 3.825 },
      { year: 2019, netIncome: 11.083 },
      { year: 2020, netIncome: 10.135 },
      { year: 2021, netIncome: 13.746 },
      { year: 2022, netIncome: 6.717 },
      { year: 2023, netIncome: 8.503 },
      { year: 2024, netIncome: 10.467 },
      { year: 2025, netIncome: 12.443 }
    ]
  }
]
