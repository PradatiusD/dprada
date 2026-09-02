<template>
  <ParentingTrendMarker
    marker-id="us-population-projection"
    kicker="Population projection · United States"
    title="United States population projection"
    callout="2100"
    deck="U.S. Census Bureau main-series population estimates from 2024 through 2100."
    chart-title="U.S. Census Bureau main-series population projection, 2024 to 2100"
    chart-description="Nine benchmark observations show projected U.S. resident population from 336.482 million in 2024 through 365.558 million in 2100."
    :points="points"
    unit="million people"
    :decimals="1"
    :y-min="330"
    :y-max="375"
    :y-ticks="[330, 340, 350, 360, 370]"
    x-axis-label="Projection year"
    color="#7b3aed"
  >
    <template #note>
      Values are from the Census Bureau’s main series and refer to the resident population on July 1. The 2023 projection release uses 2022 as its base and extends through 2100. Source: <a href="https://www.census.gov/programs-surveys/popproj.html" target="_blank" rel="noopener noreferrer">U.S. Census Bureau, 2023 National Population Projections</a> and <a href="https://www2.census.gov/programs-surveys/popproj/tables/2023/2023-summary-tables/np2023-t1.xlsx" target="_blank" rel="noopener noreferrer">Main Series Table 1</a>.
    </template>
  </ParentingTrendMarker>
</template>

<script>
import ParentingTrendMarker from '~/components/blog/shortcodes/ParentingTrendMarker.vue'
import { unitedStatesPopulationProjection } from '~/data/populationProjections'

export default {
  name: 'UsPopulationProjectionMarker',
  components: { ParentingTrendMarker },
  data () { return { points: unitedStatesPopulationProjection } }
}
</script>
