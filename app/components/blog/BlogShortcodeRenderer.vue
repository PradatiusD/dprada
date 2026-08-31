<template>
  <section class="blog-shortcode-block">
    <component
      :is="resolvedComponent"
      v-if="resolvedComponent"
    />
    <div
      v-else
      class="blog-shortcode-missing"
    >
      Unknown shortcode: `[{{ shortcode }}]`
    </div>
  </section>
</template>

<script>
import AiCapabilityCostMarker from '~/components/blog/shortcodes/AiCapabilityCostMarker.vue'
import AiCompanyCashFlowChart from '~/components/blog/shortcodes/AiCompanyCashFlowChart.vue'
import AiCompanyProfitsChart from '~/components/blog/shortcodes/AiCompanyProfitsChart.vue'
import AiElectricityEfficiencyMarker from '~/components/blog/shortcodes/AiElectricityEfficiencyMarker.vue'
import CirculatingCurrencyChart from '~/components/blog/shortcodes/CirculatingCurrencyChart.vue'
import DebtToGdpDefaultsBarChart from '~/components/blog/shortcodes/DebtToGdpDefaultsBarChart.vue'
import GiniCpiChart from '~/components/blog/shortcodes/GiniCpiChart.vue'
import NationalDebtGoldChart from '~/components/blog/shortcodes/NationalDebtGoldChart.vue'
import SoftwareDeveloperOpeningsChart from '~/components/blog/shortcodes/SoftwareDeveloperOpeningsChart.vue'
import SoftwareDeveloperWorkforceChart from '~/components/blog/shortcodes/SoftwareDeveloperWorkforceChart.vue'

const SHORTCODE_COMPONENTS = {
  AiCapabilityCostMarker,
  AiCompanyCashFlowChart,
  AiCompanyProfitsChart,
  AiElectricityEfficiencyMarker,
  CirculatingCurrencyChart,
  GiniCpiChart,
  NationalDebtGoldChart,
  DebtToGdpDefaultsBarChart,
  SoftwareDeveloperOpeningsChart,
  SoftwareDeveloperWorkforceChart
}

export default {
  name: 'BlogShortcodeRenderer',
  props: {
    shortcode: {
      type: String,
      required: true
    }
  },
  computed: {
    resolvedComponent () {
      return SHORTCODE_COMPONENTS[this.shortcode] || null
    }
  }
}
</script>
