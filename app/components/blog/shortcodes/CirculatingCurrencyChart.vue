<template>
  <section class="currency-chart">
    <header>
      <p class="currency-chart-kicker">
        Currency in circulation
      </p>
      <h2 class="currency-chart-title">
        Value of U.S. currency in circulation
      </h2>
      <p class="currency-chart-copy">
        The total value of U.S. currency in circulation has climbed from $458 billion in 1997 to more than $2.3 trillion in 2024.
      </p>
    </header>

    <div class="blog-chart-scroll">
      <svg
        class="currency-chart-svg"
      viewBox="0 0 1000 520"
      role="img"
      aria-labelledby="currency-chart-title currency-chart-description"
    >
      <title id="currency-chart-title">
        Value of U.S. currency in circulation, 1997 to 2024
      </title>
      <desc id="currency-chart-description">
        A line chart showing the total value of U.S. currency in circulation rising from 458 billion dollars in 1997 to 2.323 trillion dollars in 2024.
      </desc>

      <defs>
        <linearGradient id="currency-chart-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#2952cc" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#2952cc" stop-opacity="0.02" />
        </linearGradient>
      </defs>

      <g class="currency-chart-grid">
        <g
          v-for="tick in yTicks"
          :key="tick.value"
        >
          <line
            :x1="chart.left"
            :x2="chart.right"
            :y1="yForValue(tick.value)"
            :y2="yForValue(tick.value)"
          />
          <text
            :x="chart.left - 14"
            :y="yForValue(tick.value) + 5"
            text-anchor="end"
          >
            {{ tick.label }}
          </text>
        </g>
      </g>

      <path
        class="currency-chart-area"
        :d="areaPath"
      />
      <path
        class="currency-chart-line"
        :d="linePath"
      />

      <g class="currency-chart-years">
        <text
          v-for="point in xTicks"
          :key="point.year"
          :x="xForYear(point.year)"
          :y="chart.bottom + 34"
          text-anchor="middle"
        >
          {{ point.year }}
        </text>
      </g>

      <circle
        :cx="xForYear(latestPoint.year)"
        :cy="yForValue(latestPoint.totalBillions)"
        class="currency-chart-endpoint"
        r="6"
      />
      </svg>
    </div>

    <div class="currency-chart-summary">
      <p>
        <strong>1997:</strong> ${{ firstPoint.totalBillions.toFixed(1) }} billion
      </p>
      <p>
        <strong>2024:</strong> ${{ latestPoint.totalBillions.toLocaleString('en-US', { minimumFractionDigits: 1 }) }} billion
      </p>
    </div>

    <p class="currency-chart-note">
      Values are totals as of December 31 of each year and include Federal Reserve notes, U.S. notes, and currency no longer issued. Source: <a href="https://www.uscurrency.gov/life-cycle/data/circulation" target="_blank" rel="noopener noreferrer">U.S. Currency Education Program</a>.
    </p>
  </section>
</template>

<script>
import { circulatingCurrencySeries } from '~/data/circulatingCurrency'

export default {
  name: 'CirculatingCurrencyChart',
  data () {
    return {
      points: circulatingCurrencySeries,
      chart: {
        left: 92,
        right: 950,
        top: 30,
        bottom: 430
      },
      maxValue: 2500
    }
  },
  computed: {
    firstPoint () {
      return this.points[0]
    },
    latestPoint () {
      return this.points[this.points.length - 1]
    },
    yTicks () {
      return [0, 500, 1000, 1500, 2000, 2500].map(value => ({
        value,
        label: value === 0 ? '$0' : `$${value / 1000}T`
      }))
    },
    xTicks () {
      return this.points.filter(point => [1997, 2004, 2011, 2018, 2024].includes(point.year))
    },
    linePath () {
      return this.points
        .map((point, index) => `${index === 0 ? 'M' : 'L'} ${this.xForYear(point.year)} ${this.yForValue(point.totalBillions)}`)
        .join(' ')
    },
    areaPath () {
      return `${this.linePath} L ${this.chart.right} ${this.chart.bottom} L ${this.chart.left} ${this.chart.bottom} Z`
    }
  },
  methods: {
    xForYear (year) {
      const firstYear = this.firstPoint.year
      const yearRange = this.latestPoint.year - firstYear
      const width = this.chart.right - this.chart.left
      return this.chart.left + (((year - firstYear) / yearRange) * width)
    },
    yForValue (value) {
      const height = this.chart.bottom - this.chart.top
      return this.chart.bottom - ((value / this.maxValue) * height)
    }
  }
}
</script>

<style scoped>
.currency-chart {
  padding: clamp(1rem, 2.5vw, 1.75rem);
  border: 1px solid rgba(38, 27, 23, 0.12);
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at top right, rgba(114, 159, 255, 0.22), transparent 28%),
    linear-gradient(180deg, rgba(255, 250, 241, 0.97), rgba(243, 237, 227, 0.97));
}

.currency-chart-kicker,
.currency-chart-title,
.currency-chart-summary strong {
  font-family: "Trend W01 Sns One", "sans-serif";
}

.currency-chart-kicker {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(38, 27, 23, 0.52);
}

.currency-chart-title {
  max-width: 14ch;
  margin-top: 0.75rem;
  font-size: clamp(1.6rem, 4vw, 2.7rem);
  line-height: 1.02;
}

.currency-chart-copy,
.currency-chart-summary,
.currency-chart-note {
  font-family: "Sofia W01 Regular1446825", "sans-serif";
}

.currency-chart-copy {
  max-width: 42rem;
  margin-top: 0.9rem;
  line-height: 1.75;
  color: rgba(38, 27, 23, 0.78);
}

.currency-chart-svg {
  width: 100%;
  height: auto;
  margin-top: 1.5rem;
  overflow: visible;
}

.currency-chart-grid line {
  stroke: rgba(38, 27, 23, 0.1);
  stroke-dasharray: 4 6;
}

.currency-chart-grid text,
.currency-chart-years text {
  font-family: "Sofia W01 Bold1446843", "sans-serif";
  font-size: 0.8rem;
  letter-spacing: 0.03em;
  fill: rgba(38, 27, 23, 0.68);
}

.currency-chart-area {
  fill: url(#currency-chart-fill);
}

.currency-chart-line {
  fill: none;
  stroke: #2952cc;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.currency-chart-endpoint {
  fill: #2952cc;
  stroke: #fffaf1;
  stroke-width: 3;
}

.currency-chart-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.5rem;
  margin-top: 0.75rem;
  font-size: 0.98rem;
  line-height: 1.7;
}

.currency-chart-note {
  margin-top: 1rem;
  font-size: 0.92rem;
  line-height: 1.7;
  color: rgba(38, 27, 23, 0.64);
}

.currency-chart-note a {
  color: #2952cc;
  text-decoration: underline;
}
</style>
