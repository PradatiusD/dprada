<template>
  <ParentingTrendMarker
    marker-id="mothers-labor-force"
    kicker="Motherhood marker · 50 years of U.S. labor data"
    title="Mother's Labor Force Participation Rates"
    callout="47% → 74%"
    deck="The share of mothers with children under 18 who were working or looking for work rose by roughly 27 percentage points from 1975 to 2025."
    chart-title="Annual labor-force participation of U.S. mothers with own children under 18 from 1975 to 2025"
    chart-description="Annual observations show participation rising from 47.4 percent in 1975 to 73.9 percent in 2025. Two 2021 values expose the change from March snapshots to monthly annual averages."
    :points="points"
    unit="percent"
    :decimals="1"
    :y-min="40"
    :y-max="80"
    :y-ticks="[40, 50, 60, 70, 80]"
    x-axis-label="Observation year"
    color="#7b3aed"
  >
    <template #note>
      Labor-force participation means working or actively looking for work; it is not the same as the employment rate. “Mothers” here means women with biological, step-, or adopted children under 18 living in their household. Every official annual observation is plotted. The 1975–2021 segment consists of March CPS/ASEC snapshots; the second 2021 point and 2022–2025 segment are monthly CPS annual averages. The duplicate 2021 values—71.7% and 71.2%—make that reference-period break visible. A separate CPS redesign also limits comparisons across 1993–1994. The 2025 estimate is an 11-month average because October data were not collected during the federal shutdown. Sources: <a href="https://www.dol.gov/agencies/wb/data/mothers-families/Laborforceparticipationrates-women-ageyoungestchild" target="_blank" rel="noopener noreferrer">U.S. Department of Labor Women’s Bureau</a>, its <a href="https://public.tableau.com/views/Womenslaborforceparticipationratesbyageofyoungestchild/Dashboard1.csv?:showVizHome=no" target="_blank" rel="noopener noreferrer">downloadable chart data</a>, and <a href="https://www.bls.gov/news.release/famee.t05.htm" target="_blank" rel="noopener noreferrer">U.S. Bureau of Labor Statistics</a>.
    </template>
  </ParentingTrendMarker>
</template>

<script>
import ParentingTrendMarker from '~/components/blog/shortcodes/ParentingTrendMarker.vue'
import { mothersLaborForceParticipation } from '~/data/parentingTrends'

export default {
  name: 'MothersLaborForceMarker',
  components: { ParentingTrendMarker },
  data () { return { points: mothersLaborForceParticipation } }
}
</script>
