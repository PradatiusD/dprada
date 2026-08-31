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
import BirthsPerWomanMarker from '~/components/blog/shortcodes/BirthsPerWomanMarker.vue'
import CirculatingCurrencyChart from '~/components/blog/shortcodes/CirculatingCurrencyChart.vue'
import DebtToGdpDefaultsBarChart from '~/components/blog/shortcodes/DebtToGdpDefaultsBarChart.vue'
import FatherChildcareTimeMarker from '~/components/blog/shortcodes/FatherChildcareTimeMarker.vue'
import GiniCpiChart from '~/components/blog/shortcodes/GiniCpiChart.vue'
import InfantFormulaSupplementationMarker from '~/components/blog/shortcodes/InfantFormulaSupplementationMarker.vue'
import MedianAgeFirstBirthMarker from '~/components/blog/shortcodes/MedianAgeFirstBirthMarker.vue'
import MothersLaborForceMarker from '~/components/blog/shortcodes/MothersLaborForceMarker.vue'
import NationalDebtGoldChart from '~/components/blog/shortcodes/NationalDebtGoldChart.vue'
import NorwayIqCohortMarker from '~/components/blog/shortcodes/NorwayIqCohortMarker.vue'
import SoftwareDeveloperOpeningsChart from '~/components/blog/shortcodes/SoftwareDeveloperOpeningsChart.vue'
import SoftwareDeveloperWorkforceChart from '~/components/blog/shortcodes/SoftwareDeveloperWorkforceChart.vue'
import TimeWithFriendsMarker from '~/components/blog/shortcodes/TimeWithFriendsMarker.vue'

const SHORTCODE_COMPONENTS = {
  AiCapabilityCostMarker,
  AiCompanyCashFlowChart,
  AiCompanyProfitsChart,
  AiElectricityEfficiencyMarker,
  BirthsPerWomanMarker,
  CirculatingCurrencyChart,
  FatherChildcareTimeMarker,
  GiniCpiChart,
  InfantFormulaSupplementationMarker,
  MedianAgeFirstBirthMarker,
  MothersLaborForceMarker,
  NationalDebtGoldChart,
  NorwayIqCohortMarker,
  DebtToGdpDefaultsBarChart,
  SoftwareDeveloperOpeningsChart,
  SoftwareDeveloperWorkforceChart,
  TimeWithFriendsMarker
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
