<template>
  <ParentingTrendMarker
    marker-id="median-first-birth-age"
    kicker="Timing marker · U.S. first births"
    title="The median first-time mother is about five years older"
    callout="22 → 27"
    deck="Published national snapshots place the estimated median age at first birth at 22 in 1960, 24 in 1990, and 27 in 2023."
    chart-title="Estimated median age of U.S. mothers at first birth in 1960, 1990, and 2023"
    chart-description="The estimated median increased from age 22 in 1960 to age 24 in 1990 and age 27 in 2023."
    :points="points"
    unit="years old"
    :decimals="0"
    :y-min="20"
    :y-max="28"
    :y-ticks="[20, 22, 24, 26, 28]"
    x-axis-label="Published natality snapshot"
    color="#3d8a70"
  >
    <template #note>
      This chart uses the median requested—not the more commonly published mean. The National Center for Family & Marriage Research estimated the median from first-birth distributions binned into five-year maternal-age groups, using interpolation. Comparable published median snapshots are available for 1960, 1990, and 2023, so the chart shows a 63-year span rather than inventing annual values for an exact 50-year window. It describes mothers’ age at first live birth, not the age of both parents. Source: <a href="https://www.bgsu.edu/ncfmr/resources/data/family-profiles/FP-25-28.html" target="_blank" rel="noopener noreferrer">NCFMR analysis of CDC WONDER and Vital Statistics</a>.
    </template>
  </ParentingTrendMarker>
</template>

<script>
import ParentingTrendMarker from '~/components/blog/shortcodes/ParentingTrendMarker.vue'
import { medianAgeAtFirstBirth } from '~/data/parentingTrends'

export default {
  name: 'MedianAgeFirstBirthMarker',
  components: { ParentingTrendMarker },
  data () { return { points: medianAgeAtFirstBirth } }
}
</script>
