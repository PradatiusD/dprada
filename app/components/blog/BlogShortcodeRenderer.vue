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
import GitPushesGlobalChart from '~/components/blog/shortcodes/GitPushesGlobalChart.vue'
import GitPushesDistributionChart from '~/components/blog/shortcodes/GitPushesDistributionChart.vue'
import AiCompanyCashFlowChart from '~/components/blog/shortcodes/AiCompanyCashFlowChart.vue'
import AiCompanyProfitsChart from '~/components/blog/shortcodes/AiCompanyProfitsChart.vue'
import AiElectricityEfficiencyMarker from '~/components/blog/shortcodes/AiElectricityEfficiencyMarker.vue'
import BirthsPerWomanMarker from '~/components/blog/shortcodes/BirthsPerWomanMarker.vue'
import CirculatingCurrencyChart from '~/components/blog/shortcodes/CirculatingCurrencyChart.vue'
import CovidYoungChildrenScoresChart from '~/components/blog/shortcodes/CovidYoungChildrenScoresChart.vue'
import DebtToGdpDefaultsBarChart from '~/components/blog/shortcodes/DebtToGdpDefaultsBarChart.vue'
import ElectricityPriceMarker from '~/components/blog/shortcodes/ElectricityPriceMarker.vue'
import FatherChildcareTimeMarker from '~/components/blog/shortcodes/FatherChildcareTimeMarker.vue'
import FederalInterestRevenueChart from '~/components/blog/shortcodes/FederalInterestRevenueChart.vue'
import FederalReserveAssetsChart from '~/components/blog/shortcodes/FederalReserveAssetsChart.vue'
import GiniCpiChart from '~/components/blog/shortcodes/GiniCpiChart.vue'
import GlobalPopulationProjectionMarker from '~/components/blog/shortcodes/GlobalPopulationProjectionMarker.vue'
import InfantFormulaSupplementationMarker from '~/components/blog/shortcodes/InfantFormulaSupplementationMarker.vue'
import MedianAgeFirstBirthMarker from '~/components/blog/shortcodes/MedianAgeFirstBirthMarker.vue'
import MothersLaborForceMarker from '~/components/blog/shortcodes/MothersLaborForceMarker.vue'
import NationalDebtGoldChart from '~/components/blog/shortcodes/NationalDebtGoldChart.vue'
import NorwayIqCohortMarker from '~/components/blog/shortcodes/NorwayIqCohortMarker.vue'
import ScreenTimeOverTimeChart from '~/components/blog/shortcodes/ScreenTimeOverTimeChart.vue'
import SoftwareDeveloperOpeningsChart from '~/components/blog/shortcodes/SoftwareDeveloperOpeningsChart.vue'
import SoftwareDeveloperWorkforceChart from '~/components/blog/shortcodes/SoftwareDeveloperWorkforceChart.vue'
import TimeWithFriendsMarker from '~/components/blog/shortcodes/TimeWithFriendsMarker.vue'
import Top500ComputeMarker from '~/components/blog/shortcodes/Top500ComputeMarker.vue'
import UsPopulationProjectionMarker from '~/components/blog/shortcodes/UsPopulationProjectionMarker.vue'

const SHORTCODE_COMPONENTS = {
  AiCapabilityCostMarker,
  GitPushesGlobalChart,
  GitPushesDistributionChart,
  AiCompanyCashFlowChart,
  AiCompanyProfitsChart,
  AiElectricityEfficiencyMarker,
  BirthsPerWomanMarker,
  CirculatingCurrencyChart,
  CovidYoungChildrenScoresChart,
  ElectricityPriceMarker,
  FatherChildcareTimeMarker,
  FederalInterestRevenueChart,
  FederalReserveAssetsChart,
  GiniCpiChart,
  GlobalPopulationProjectionMarker,
  InfantFormulaSupplementationMarker,
  MedianAgeFirstBirthMarker,
  MothersLaborForceMarker,
  NationalDebtGoldChart,
  NorwayIqCohortMarker,
  ScreenTimeOverTimeChart,
  DebtToGdpDefaultsBarChart,
  SoftwareDeveloperOpeningsChart,
  SoftwareDeveloperWorkforceChart,
  TimeWithFriendsMarker,
  Top500ComputeMarker,
  UsPopulationProjectionMarker
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
