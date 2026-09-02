<template>
  <section class="debt-chart">
    <div class="debt-chart-header">
      <p class="debt-chart-kicker">
        Dynamic chart
      </p>
      <h2 class="debt-chart-title">
        National debt vs. the dollar's gold value
      </h2>
      <p class="debt-chart-copy">
        The blue line is gross federal debt in trillions of dollars. The amber line shows how many milligrams of gold one U.S. dollar could buy in each year.
      </p>
    </div>

    <div class="debt-chart-legend">
      <span class="debt-chart-legend-item">
        <span class="debt-chart-legend-swatch debt-chart-legend-swatch-debt" />
        Gross federal debt
      </span>
      <span class="debt-chart-legend-item">
        <span class="debt-chart-legend-swatch debt-chart-legend-swatch-gold" />
        $1 in gold (mg)
      </span>
    </div>

    <div class="blog-chart-scroll">
      <svg
        class="debt-chart-svg"
      viewBox="0 0 1000 560"
      role="img"
      aria-labelledby="national-debt-chart-title national-debt-chart-desc"
    >
      <title id="national-debt-chart-title">
        National debt and gold value of the dollar, 1926 to 2025
      </title>
      <desc id="national-debt-chart-desc">
        A dual-axis line chart showing gross federal debt rising sharply over time while the amount of gold purchasable with one dollar declines.
      </desc>

      <g class="debt-chart-grid">
        <line
          v-for="tick in debtTicks"
          :key="`debt-grid-${tick.value}`"
          :x1="chart.left"
          :x2="chart.right"
          :y1="yForDebt(tick.value)"
          :y2="yForDebt(tick.value)"
        />
      </g>

      <g class="debt-chart-axis">
        <line :x1="chart.left" :x2="chart.left" :y1="chart.top" :y2="chart.bottom" />
        <line :x1="chart.right" :x2="chart.right" :y1="chart.top" :y2="chart.bottom" />
        <line :x1="chart.left" :x2="chart.right" :y1="chart.bottom" :y2="chart.bottom" />
      </g>

      <g class="debt-chart-x-labels">
        <g
          v-for="point in xTicks"
          :key="`x-${point.year}`"
        >
          <line
            :x1="xForYear(point.year)"
            :x2="xForYear(point.year)"
            :y1="chart.bottom"
            :y2="chart.bottom + 8"
          />
          <text
            :x="xForYear(point.year)"
            :y="chart.bottom + 26"
            text-anchor="middle"
          >
            {{ point.year }}
          </text>
        </g>
      </g>

      <g class="debt-chart-left-labels">
        <text
          v-for="tick in debtTicks"
          :key="`debt-tick-${tick.value}`"
          :x="chart.left - 12"
          :y="yForDebt(tick.value) + 5"
          text-anchor="end"
        >
          {{ tick.label }}
        </text>
      </g>

      <g class="debt-chart-right-labels">
        <text
          v-for="tick in goldTicks"
          :key="`gold-tick-${tick.value}`"
          :x="chart.right + 12"
          :y="yForGold(tick.value) + 5"
          text-anchor="start"
        >
          {{ tick.label }}
        </text>
      </g>

      <path
        class="debt-chart-line debt-chart-line-debt"
        :d="debtPath"
      />
      <path
        class="debt-chart-line debt-chart-line-gold"
        :d="goldPath"
      />

      <circle
        :cx="xForYear(latestPoint.year)"
        :cy="yForDebt(latestPoint.debtTrillions)"
        class="debt-chart-endcap debt-chart-endcap-debt"
        r="5"
      />
      <circle
        :cx="xForYear(latestPoint.year)"
        :cy="yForGold(latestPoint.dollarGoldMilligrams)"
        class="debt-chart-endcap debt-chart-endcap-gold"
        r="5"
      />
      </svg>
    </div>

    <div class="debt-chart-summary">
      <p>
        <strong>2025 debt:</strong> {{ latestPoint.debtTrillions.toFixed(1) }} trillion USD
      </p>
      <p>
        <strong>2025 dollar value in gold:</strong> {{ latestPoint.dollarGoldMilligrams.toFixed(1) }} mg per $1
      </p>
    </div>

    <p class="debt-chart-note">
      Debt values come from the U.S. Treasury historical debt outstanding dataset for fiscal years 1926–2025. Gold values use the statutory $20.67 and $35 anchors before 1970, then Federal Reserve monthly gold prices averaged by calendar year from 1970–2025. The 2025 gold average reflects January through June 2025 because that is where the Federal Reserve table currently ends.
    </p>
  </section>
</template>

<script>
import { nationalDebtGoldSeries } from '~/data/nationalDebtGold'

function createTicks (maxValue, count, formatter) {
  const ticks = []
  for (let i = 0; i <= count; i++) {
    const value = (maxValue / count) * i
    ticks.push({
      value,
      label: formatter(value)
    })
  }
  return ticks
}

export default {
  name: 'NationalDebtGoldChart',
  data () {
    return {
      points: nationalDebtGoldSeries,
      chart: {
        left: 84,
        right: 900,
        top: 36,
        bottom: 450
      }
    }
  },
  computed: {
    latestPoint () {
      return this.points[this.points.length - 1]
    },
    debtMax () {
      return 40
    },
    goldMax () {
      return 1600
    },
    debtTicks () {
      return createTicks(this.debtMax, 4, value => `${value.toFixed(0)}T`)
    },
    goldTicks () {
      return createTicks(this.goldMax, 4, value => `${value.toFixed(0)}mg`)
    },
    xTicks () {
      return this.points.filter((_, index) => index % 10 === 0 || index === this.points.length - 1)
    },
    debtPath () {
      return this.points
        .map((point, index) => `${index === 0 ? 'M' : 'L'} ${this.xForYear(point.year)} ${this.yForDebt(point.debtTrillions)}`)
        .join(' ')
    },
    goldPath () {
      return this.points
        .map((point, index) => `${index === 0 ? 'M' : 'L'} ${this.xForYear(point.year)} ${this.yForGold(point.dollarGoldMilligrams)}`)
        .join(' ')
    }
  },
  methods: {
    xForYear (year) {
      const index = this.points.findIndex(point => point.year === year)
      const width = this.chart.right - this.chart.left
      return this.chart.left + ((width * index) / (this.points.length - 1))
    },
    yForDebt (value) {
      const height = this.chart.bottom - this.chart.top
      return this.chart.bottom - ((value / this.debtMax) * height)
    },
    yForGold (value) {
      const height = this.chart.bottom - this.chart.top
      return this.chart.bottom - ((value / this.goldMax) * height)
    }
  }
}
</script>
