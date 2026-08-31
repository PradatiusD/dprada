<template>
  <ParentingTrendMarker
    marker-id="births-per-woman"
    kicker="Family-size marker · United States"
    title="Fertility Rates For Past 50 Years"
    callout="1.60"
    deck="The total fertility rate fell from 1.77 births per woman in 1975 to a final 1.60 in 2024, after briefly returning above two births in the 2000s."
    chart-title="Annual United States total fertility rate from 1975 to 2024"
    chart-description="Fifty annual observations show the rate at 1.774 births per woman in 1975, peaking within this period at 2.12 in 2007, and declining to 1.5995 in 2024."
    :points="points"
    unit="births/woman"
    :decimals="2"
    :y-min="1.4"
    :y-max="2.2"
    :y-ticks="[1.4, 1.6, 1.8, 2.0, 2.2]"
    x-axis-label="Selected benchmark year"
    color="#b66a2d"
  >
    <template #note>
      “Births per parent” is conventionally measured as the total fertility rate: the number of births a hypothetical woman would have if that year’s age-specific birth rates persisted throughout her reproductive life. It is a period estimate, not the completed family size of an actual cohort, and it is expressed per woman because birth records and population denominators are organized by maternal age. The chart contains all 50 annual observations. Values through 2023 use World Bank indicator <code>SP.DYN.TFRT.IN</code>, sourced from the United Nations World Population Prospects. The 2024 point uses CDC/NCHS’s newer final result of 1.5995; the World Bank series still carries the earlier provisional 1.6265. Sources: <a href="https://data.worldbank.org/indicator/SP.DYN.TFRT.IN?locations=US" target="_blank" rel="noopener noreferrer">World Bank</a>, the <a href="https://api.worldbank.org/v2/country/USA/indicator/SP.DYN.TFRT.IN?date=1975:2024&amp;format=json&amp;per_page=1000" target="_blank" rel="noopener noreferrer">downloadable API series</a>, and <a href="https://www.cdc.gov/nchs/data/nvsr/nvsr75/nvsr75-02.pdf" target="_blank" rel="noopener noreferrer">CDC/NCHS final 2024 natality data</a>.
    </template>
  </ParentingTrendMarker>
</template>

<script>
import ParentingTrendMarker from '~/components/blog/shortcodes/ParentingTrendMarker.vue'
import { totalFertilityRate } from '~/data/parentingTrends'

export default {
  name: 'BirthsPerWomanMarker',
  components: { ParentingTrendMarker },
  data () { return { points: totalFertilityRate } }
}
</script>
