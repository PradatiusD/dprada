<template>
  <ParentingTrendMarker
    marker-id="global-population-projection"
    kicker="Population projection · World"
    title="Global population projection"
    callout="2100"
    deck="United Nations medium-scenario population estimates from 2024 through 2100."
    chart-title="United Nations medium-scenario global population projection, 2024 to 2100"
    chart-description="Nine benchmark observations show projected global population from 8.162 billion in 2024 through 10.180 billion in 2100."
    :points="points"
    unit="billion people"
    :decimals="2"
    :y-min="8"
    :y-max="10.5"
    :y-ticks="[8, 8.5, 9, 9.5, 10, 10.5]"
    x-axis-label="Projection year"
    color="#28786d"
  >
    <template #note>
      Values are the UN’s medium demographic scenario, not a prediction with certainty. They are total population on July 1 and were released in 2024. Source: <a href="https://ourworldindata.org/grapher/population-with-un-projections" target="_blank" rel="noopener noreferrer">UN World Population Prospects 2024, processed by Our World in Data</a>.
    </template>
  </ParentingTrendMarker>
</template>

<script>
import ParentingTrendMarker from '~/components/blog/shortcodes/ParentingTrendMarker.vue'
import { globalPopulationProjection } from '~/data/populationProjections'

export default {
  name: 'GlobalPopulationProjectionMarker',
  components: { ParentingTrendMarker },
  data () { return { points: globalPopulationProjection } }
}
</script>
