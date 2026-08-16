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
import NationalDebtGoldChart from '~/components/blog/shortcodes/NationalDebtGoldChart.vue'

const SHORTCODE_COMPONENTS = {
  NationalDebtGoldChart
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
