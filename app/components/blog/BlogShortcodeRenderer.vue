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
import CirculatingCurrencyChart from '~/components/blog/shortcodes/CirculatingCurrencyChart.vue'
import DebtToGdpDefaultsBarChart from '~/components/blog/shortcodes/DebtToGdpDefaultsBarChart.vue'
import NationalDebtGoldChart from '~/components/blog/shortcodes/NationalDebtGoldChart.vue'

const SHORTCODE_COMPONENTS = {
  CirculatingCurrencyChart,
  NationalDebtGoldChart,
  DebtToGdpDefaultsBarChart
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
