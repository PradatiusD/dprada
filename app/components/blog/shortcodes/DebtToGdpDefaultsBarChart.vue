<template>
  <section class="country-debt-chart" aria-labelledby="recent-defaults-title">
    <div class="country-debt-chart-header">
      <p class="country-debt-chart-kicker">
        Sovereign default marker · events since 2020
      </p>
      <h2 id="recent-defaults-title" class="country-debt-chart-title">
        Recent defaults occurred at very different debt levels
      </h2>
      <p class="country-debt-chart-copy">
        General government gross debt as a share of GDP in each country’s default year, with the United States’ 2025 estimate highlighted for context. The U.S. has not defaulted; a high ratio raises risk, but it is not a universal default threshold.
      </p>
    </div>

    <div class="country-debt-chart-callout">
      <span class="country-debt-chart-callout-label">Range at default</span>
      <strong>38%–151%</strong>
      <span>of GDP</span>
    </div>

    <div class="country-debt-chart-list" role="list" aria-label="Recent sovereign defaults and United States debt-to-GDP reference">
      <article
        v-for="point in points"
        :key="point.code"
        :class="['country-debt-chart-row', { 'country-debt-chart-row-us': point.isReference }]"
        role="listitem"
        :aria-label="point.isReference
          ? `United States reference for ${point.year}; government gross debt was an estimated ${point.debtToGdp.toFixed(1)} percent of GDP; the United States is not in default`
          : `${point.country} defaulted in ${point.year}; government gross debt was ${point.debtToGdp.toFixed(1)} percent of GDP`"
      >
        <div class="country-debt-chart-row-meta">
          <p class="country-debt-chart-row-rank">
            {{ point.year }}
          </p>
          <div class="country-debt-chart-row-country">
            <h3>{{ point.country }}</h3>
            <p>{{ point.note }}</p>
          </div>
        </div>

        <div class="country-debt-chart-bar-shell" aria-hidden="true">
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
      “Default” here includes sovereign foreign- or local-currency default events identified in the World Bank’s <a href="https://openknowledge.worldbank.org/server/api/core/bitstreams/83f7aadd-dc5a-406b-98d4-9624e93993e5/content" target="_blank" rel="noopener noreferrer">International Debt Report 2023</a>; Ethiopia’s December 2023 missed Eurobond coupon is documented by <a href="https://www.reuters.com/world/africa/ethiopia-becomes-africas-latest-sovereign-default-2023-12-26/" target="_blank" rel="noopener noreferrer">Reuters</a> and the <a href="https://www.bankofcanada.ca/2025/10/staff-analytical-note-2025-24" target="_blank" rel="noopener noreferrer">BoC–BoE Sovereign Default Database</a>. Ratios are IMF World Economic Outlook general government gross debt (<code>GGXWDG_NGDP</code>) for the event year, distributed through the <a href="https://data360.worldbank.org/en/dataset/IMF_WEO" target="_blank" rel="noopener noreferrer">World Bank Data360 portal</a>. The U.S. reference is the IMF’s 2025 estimate; it is a comparison, not a default observation. Sri Lanka’s 2022 and Ethiopia’s 2023 values are also marked as estimates in the source vintage. Debt-to-GDP alone cannot capture foreign-currency exposure, refinancing schedules, interest costs, reserves, revenue capacity, or creditor access.
    </p>
  </section>
</template>

<script>
import { recentSovereignDefaults } from '~/data/debtToGdpDefaults'

export default {
  name: 'DebtToGdpDefaultsBarChart',
  data () {
    return {
      points: recentSovereignDefaults
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
