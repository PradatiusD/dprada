import { gitPushesGlobalSeries } from './gitPushesGlobal'

export interface CountryPushPoint {
  quarter: string
  pushes: number
  sharePercent: number
}

export interface CountrySeries {
  name: string
  color: string
  points: CountryPushPoint[]
}

// Raw push counts per quarter, ordered Q1 2020 → Q1 2026
// Columns match gitPushesGlobalSeries order exactly
const RAW: Record<string, number[]> = {
  'United States': [
    21377653, 23736592, 22384454, 21752294,
    22731866, 21827012, 19828529, 21495838,
    23987664, 24092826, 22823129, 24373958,
    25930264, 25765719, 23796738, 25996849,
    27262532, 26651541, 25260831, 27999678,
    30612863, 33947845, 34494395, 40768192,
    57234005,
  ],
  India: [
    4422587, 7346825, 7832236, 7291401,
    7080138, 9840045, 9768364, 8891597,
    10426681, 10434962, 12181573, 13084268,
    12807610, 13916703, 16316471, 15213634,
    17496495, 17789226, 21005866, 19462641,
    24151972, 27978269, 33859292, 31922623,
    44658960,
  ],
  Brazil: [
    2530973, 3634133, 3746932, 3564724,
    4013438, 4832491, 4946212, 4787766,
    5216937, 6264236, 6514861, 6244922,
    6292476, 7339612, 6904053, 7135602,
    6400694, 7982148, 7856046, 7936768,
    7556006, 10975777, 10684667, 11583055,
    13510410,
  ],
  Germany: [
    3622573, 4211265, 3666680, 4097759,
    4509036, 4473869, 3906973, 4411751,
    4924329, 4857243, 4775836, 5152515,
    5715361, 5508947, 5403146, 5818564,
    6305606, 6153419, 5963323, 6295034,
    7092570, 7527185, 7889660, 8772950,
    11508698,
  ],
  'United Kingdom': [
    3980488, 4513691, 3872270, 4073732,
    4616177, 4258700, 3872936, 4244797,
    4830374, 4654359, 4538662, 4963732,
    5698758, 5255760, 5075412, 5399597,
    5887656, 5632768, 5393740, 5819479,
    6470741, 6746978, 7014613, 7734568,
    10466194,
  ],
  Japan: [
    2494749, 2956652, 2936818, 2914353,
    3051805, 3134871, 3077743, 2975459,
    3137898, 3321876, 3313772, 3331537,
    3531471, 3778386, 3879923, 3918914,
    3800668, 4022562, 4033225, 4396261,
    4542594, 5647276, 6197149, 7198600,
    10424896,
  ],
  France: [
    2938432, 3364046, 2422580, 3316719,
    3529009, 3582179, 2758044, 3554191,
    4087268, 3999987, 3381734, 4196186,
    4804603, 4597916, 3816691, 4884748,
    5267704, 4991176, 4173546, 5443474,
    6103285, 6285866, 5660223, 7552272,
    9731787,
  ],
  'South Korea': [
    2080113, 2568632, 2845292, 2976522,
    3492171, 3978131, 4210908, 4285652,
    4771878, 5149128, 5389573, 5645204,
    5669606, 6102494, 6044640, 6145189,
    6279972, 6578322, 6664992, 6608779,
    6073307, 7191636, 7328510, 7204133,
    9438093,
  ],
}

const COLORS: Record<string, string> = {
  'United States': '#2952cc',
  India: '#e07b39',
  Brazil: '#22a07a',
  Germany: '#888',
  'United Kingdom': '#8b3aed',
  Japan: '#c0392b',
  France: '#0a7eb0',
  'South Korea': '#c47a1a',
}

export const gitPushesCountrySeries: CountrySeries[] = Object.entries(RAW).map(([name, pushes]) => {
  const color = COLORS[name]
  if (!color) {
    throw new Error(`Missing chart color for ${name}`)
  }

  return {
    name,
    color,
    points: pushes.map((pushCount, i) => {
      const globalPoint = gitPushesGlobalSeries[i]
      if (!globalPoint) {
        throw new Error(`Missing global push data for ${name} at index ${i}`)
      }

      return {
        quarter: globalPoint.quarter,
        pushes: pushCount,
        sharePercent: (pushCount / globalPoint.pushes) * 100,
      }
    }),
  }
})
