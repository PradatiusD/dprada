<template>
  <section class="country-debt-chart">
    <div class="country-debt-chart-header">
      <p class="country-debt-chart-kicker">
        Dynamic chart
      </p>
      <h2 class="country-debt-chart-title">
        Debt-to-GDP leaders and their default history
      </h2>
      <p class="country-debt-chart-copy">
        Bars show general government gross debt as a share of GDP in 2026. Each row also shows how many sovereign default episodes the country has had since 1960, inferred from the Bank of Canada and Bank of England sovereign default database.
      </p>
    </div>

    <div class="country-debt-chart-callout">
      <span class="country-debt-chart-callout-label">United States rank</span>
      <strong>#{{ unitedStatesRank }}</strong>
      <span>in the IMF April 2026 ranking</span>
    </div>

    <div class="country-debt-chart-list">
      <article
        v-for="point in points"
        :key="point.code"
        class="country-debt-chart-row"
        :class="{ 'country-debt-chart-row-us': point.isUnitedStates }"
      >
        <div class="country-debt-chart-row-meta">
          <p class="country-debt-chart-row-rank">
            #{{ point.rank }}
          </p>
          <div class="country-debt-chart-row-country">
            <h3>{{ point.country }}</h3>
            <p>{{ point.code }} · {{ point.defaultEpisodesSince1960 }} defaults since 1960</p>
          </div>
        </div>

        <div class="country-debt-chart-bar-shell">
          <div
            class="country-debt-chart-bar"
            :style="{ width: `${barWidth(point.debtToGdp)}%` }"
          />
          <span class="country-debt-chart-bar-value">
            {{ point.debtToGdp.toFixed(1) }}%
          </span>
        </div>
      </article>
    </div>

    <p class="country-debt-chart-note">
      Debt-to-GDP values are from the IMF World Economic Outlook, April 2026, indicator <code>GGXWDG_NGDP</code> for 2026. Default counts are an inference from the 2025 BoC–BoE sovereign default database, counting each transition from no sovereign debt in default to positive sovereign debt in default during 1960–2024 as one default episode.
    </p>
  </section>
</template>

<script>
import {
  debtToGdpDefaultsAsOf2026,
  unitedStatesDebtToGdpRank2026
} from '~/data/debtToGdpDefaults'

export default {
  name: 'DebtToGdpDefaultsBarChart',
  data () {
    return {
      points: debtToGdpDefaultsAsOf2026,
      unitedStatesRank: unitedStatesDebtToGdpRank2026
    }
  },
  computed: {
    maxDebtToGdp () {
      return Math.max(...this.points.map(point => point.debtToGdp))
    }
  },
  methods: {
    barWidth (value) {
      return (value / this.maxDebtToGdp) * 100
    }
  }
}
</script>
