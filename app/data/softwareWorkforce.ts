export interface SoftwareWorkforceProjection {
  baselineYear: number
  baselineEmployment: number
  projectionYear: number
  projectedEmployment: number
  projectedChange: number
  projectedGrowthPercent: number
  averageAnnualOpenings: number
}

export const softwareWorkforceProjection: SoftwareWorkforceProjection = {
  baselineYear: 2025,
  baselineEmployment: 1905400,
  projectionYear: 2035,
  projectedEmployment: 2090800,
  projectedChange: 185400,
  projectedGrowthPercent: 10,
  averageAnnualOpenings: 106100
}
