<template>
  <ParentingTrendMarker
    marker-id="formula-supplementation"
    kicker="Infant-feeding marker · U.S. birth cohorts"
    title="Early formula supplementation"
    callout="22.6%"
    deck="Among breastfed infants born in 2023, about one in five received formula before age two days."
    chart-title="Percentage of breastfed U.S. infants supplemented with formula before two days, birth cohorts 2016 to 2023"
    chart-description="The percentage increased from 16.9 percent for the 2016 birth cohort to 22.6 percent for the 2023 cohort."
    :points="points"
    unit="percent"
    :decimals="1"
    :y-min="10"
    :y-max="25"
    :y-ticks="[10, 15, 20, 25]"
    x-axis-label="Infant birth cohort"
    color="#c15b6c"
  >
    <template #note>
      This is not the percentage of all babies who ever receive formula. CDC’s precise measure is the share of infants who were breastfed and also supplemented with formula before two days of age; the denominator is breastfed infants at that age. Estimates come from maternal recall in the National Immunization Survey–Child and exclude U.S. territories. The 2023 estimate is 22.6% ± 1.1 percentage points at the 95% confidence level. Source: <a href="https://www.cdc.gov/breastfeeding-data/survey/results.html" target="_blank" rel="noopener noreferrer">CDC National and State Breastfeeding Rates</a>.
    </template>
  </ParentingTrendMarker>
</template>

<script>
import ParentingTrendMarker from '~/components/blog/shortcodes/ParentingTrendMarker.vue'
import { earlyFormulaSupplementation } from '~/data/parentingTrends'

export default {
  name: 'InfantFormulaSupplementationMarker',
  components: { ParentingTrendMarker },
  data () { return { points: earlyFormulaSupplementation } }
}
</script>
