<template>
  <section class="inequality-chart">
    <header>
      <p class="inequality-chart-kicker">
        Prices and income inequality
      </p>
      <h2 class="inequality-chart-title">
        Income inequality and consumer prices
      </h2>
      <p class="inequality-chart-copy">
        Consumer prices rose more than fourteenfold from 1947 to 2024, while the household Gini ratio moved from 0.376 to 0.456. The two lines use separate scales.
      </p>
    </header>

    <div class="inequality-chart-legend" aria-hidden="true">
      <span class="inequality-chart-legend-item">
        <span class="inequality-chart-swatch inequality-chart-swatch-gini" />
        Gini ratio (left)
      </span>
      <span class="inequality-chart-legend-item">
        <span class="inequality-chart-swatch inequality-chart-swatch-cpi" />
        CPI-U (right)
      </span>
    </div>

    <BlogChartScroller>
      <svg
        class="inequality-chart-svg"
      viewBox="0 0 1000 560"
      role="img"
      aria-labelledby="inequality-chart-title inequality-chart-description"
    >
      <title id="inequality-chart-title">
        U.S. household income inequality and consumer prices, 1947 to 2024
      </title>
      <desc id="inequality-chart-description">
        A dual-axis line chart. The household money-income Gini ratio rises from 0.376 in 1947 to 0.456 in 2024, while the annual average Consumer Price Index rises from 22.3 to 313.7.
      </desc>

      <g class="inequality-chart-grid">
        <line
          v-for="tick in giniTicks"
          :key="`grid-${tick}`"
          :x1="chart.left"
          :x2="chart.right"
          :y1="yForGini(tick)"
          :y2="yForGini(tick)"
        />
      </g>

      <g class="inequality-chart-axis">
        <line :x1="chart.left" :x2="chart.left" :y1="chart.top" :y2="chart.bottom" />
        <line :x1="chart.right" :x2="chart.right" :y1="chart.top" :y2="chart.bottom" />
        <line :x1="chart.left" :x2="chart.right" :y1="chart.bottom" :y2="chart.bottom" />
      </g>

      <g class="inequality-chart-left-labels">
        <text
          v-for="tick in giniTicks"
          :key="`gini-${tick}`"
          :x="chart.left - 12"
          :y="yForGini(tick) + 5"
          text-anchor="end"
        >
          {{ tick.toFixed(2) }}
        </text>
      </g>

      <g class="inequality-chart-right-labels">
        <text
          v-for="tick in cpiTicks"
          :key="`cpi-${tick}`"
          :x="chart.right + 12"
          :y="yForCpi(tick) + 5"
          text-anchor="start"
        >
          {{ tick }}
        </text>
      </g>

      <g class="inequality-chart-x-labels">
        <g
          v-for="year in xTicks"
          :key="year"
        >
          <line
            :x1="xForYear(year)"
            :x2="xForYear(year)"
            :y1="chart.bottom"
            :y2="chart.bottom + 8"
          />
          <text
            :x="xForYear(year)"
            :y="chart.bottom + 28"
            text-anchor="middle"
          >
            {{ year }}
          </text>
        </g>
      </g>

      <path class="inequality-chart-line inequality-chart-line-gini" :d="giniPath" />
      <path class="inequality-chart-line inequality-chart-line-cpi" :d="cpiPath" />

      <circle
        :cx="xForYear(latestPoint.year)"
        :cy="yForGini(latestPoint.gini)"
        class="inequality-chart-endpoint inequality-chart-endpoint-gini"
        r="5"
      />
      <circle
        :cx="xForYear(latestPoint.year)"
        :cy="yForCpi(latestPoint.cpi)"
        class="inequality-chart-endpoint inequality-chart-endpoint-cpi"
        r="5"
      />
      </svg>
    </BlogChartScroller>

    <div class="inequality-chart-summary">
      <p>
        <strong>Gini:</strong> {{ firstPoint.gini.toFixed(3) }} → {{ latestPoint.gini.toFixed(3) }}
      </p>
      <p>
        <strong>CPI-U:</strong> {{ firstPoint.cpi.toFixed(1) }} → {{ latestPoint.cpi.toFixed(1) }}
      </p>
    </div>

    <p class="inequality-chart-note">
      Gini is the U.S. Census Bureau measure for household money income before taxes; 0 represents perfect equality and 1 perfect inequality. CPI-U values are annual averages of the seasonally adjusted monthly index (1982–1984 = 100). Census methodology changes, including a major 1993 redesign, affect comparisons across the full period. Sources: <a href="https://fred.stlouisfed.org/series/GINIALLRF" target="_blank" rel="noopener noreferrer">U.S. Census Bureau via FRED</a> and <a href="https://fred.stlouisfed.org/series/CPIAUCSL" target="_blank" rel="noopener noreferrer">U.S. Bureau of Labor Statistics via FRED</a>.
    </p>
  </section>
</template>

<script>
import { giniCpiSeries } from '~/data/giniCpi'

export default {
  name: 'GiniCpiChart',
  data () {
    return {
      points: giniCpiSeries,
      chart: {
        left: 84,
        right: 900,
        top: 36,
        bottom: 450
      },
      giniMin: 0.34,
      giniMax: 0.46,
      cpiMin: 0,
      cpiMax: 320
    }
  },
  computed: {
    firstPoint () {
      return this.points[0]
    },
    latestPoint () {
      return this.points[this.points.length - 1]
    },
    giniTicks () {
      return [0.34, 0.37, 0.40, 0.43, 0.46]
    },
    cpiTicks () {
      return [0, 80, 160, 240, 320]
    },
    xTicks () {
      return [1947, 1960, 1975, 1990, 2005, 2024]
    },
    giniPath () {
      return this.points
        .map((point, index) => `${index === 0 ? 'M' : 'L'} ${this.xForYear(point.year)} ${this.yForGini(point.gini)}`)
        .join(' ')
    },
    cpiPath () {
      return this.points
        .map((point, index) => `${index === 0 ? 'M' : 'L'} ${this.xForYear(point.year)} ${this.yForCpi(point.cpi)}`)
        .join(' ')
    }
  },
  methods: {
    xForYear (year) {
      const yearRange = this.latestPoint.year - this.firstPoint.year
      const width = this.chart.right - this.chart.left
      return this.chart.left + (((year - this.firstPoint.year) / yearRange) * width)
    },
    yForGini (value) {
      return this.yForValue(value, this.giniMin, this.giniMax)
    },
    yForCpi (value) {
      return this.yForValue(value, this.cpiMin, this.cpiMax)
    },
    yForValue (value, min, max) {
      const height = this.chart.bottom - this.chart.top
      return this.chart.bottom - (((value - min) / (max - min)) * height)
    }
  }
}
</script>

<style scoped>
.inequality-chart {
  padding: clamp(1rem, 2.5vw, 1.75rem);
  border: 1px solid rgba(38, 27, 23, 0.12);
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at top right, rgba(40, 167, 132, 0.20), transparent 28%),
    linear-gradient(180deg, rgba(255, 250, 241, 0.97), rgba(243, 237, 227, 0.97));
}

.inequality-chart-kicker,
.inequality-chart-title,
.inequality-chart-legend-item,
.inequality-chart-summary strong {
  font-family: "Trend W01 Sns One", "sans-serif";
}

.inequality-chart-kicker {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(38, 27, 23, 0.52);
}

.inequality-chart-title {
  max-width: 15ch;
  margin-top: 0.75rem;
  font-size: clamp(1.6rem, 4vw, 2.7rem);
  line-height: 1.02;
}

.inequality-chart-copy,
.inequality-chart-summary,
.inequality-chart-note {
  font-family: "Sofia W01 Regular1446825", "sans-serif";
}

.inequality-chart-copy {
  max-width: 44rem;
  margin-top: 0.9rem;
  line-height: 1.75;
  color: rgba(38, 27, 23, 0.78);
}

.inequality-chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  margin-top: 1.25rem;
}

.inequality-chart-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.82rem;
  color: rgba(38, 27, 23, 0.72);
}

.inequality-chart-swatch {
  display: inline-block;
  width: 1.8rem;
  height: 0.26rem;
  border-radius: 999px;
}

.inequality-chart-swatch-gini {
  background: #087f67;
}

.inequality-chart-swatch-cpi {
  background: #b14e2b;
}

.inequality-chart-svg {
  width: 100%;
  height: auto;
  margin-top: 1.5rem;
  overflow: visible;
}

.inequality-chart-grid line {
  stroke: rgba(38, 27, 23, 0.1);
  stroke-dasharray: 4 6;
}

.inequality-chart-axis line,
.inequality-chart-x-labels line {
  stroke: rgba(38, 27, 23, 0.18);
  stroke-width: 1.2;
}

.inequality-chart-left-labels text,
.inequality-chart-right-labels text,
.inequality-chart-x-labels text {
  font-family: "Sofia W01 Bold1446843", "sans-serif";
  font-size: 0.8rem;
  letter-spacing: 0.03em;
  fill: rgba(38, 27, 23, 0.68);
}

.inequality-chart-line {
  fill: none;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.inequality-chart-line-gini {
  stroke: #087f67;
}

.inequality-chart-line-cpi {
  stroke: #b14e2b;
}

.inequality-chart-endpoint-gini {
  fill: #087f67;
}

.inequality-chart-endpoint-cpi {
  fill: #b14e2b;
}

.inequality-chart-endpoint {
  stroke: #fffaf1;
  stroke-width: 3;
}

.inequality-chart-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.5rem;
  margin-top: 0.9rem;
  font-size: 0.98rem;
  line-height: 1.7;
}

.inequality-chart-note {
  margin-top: 1rem;
  font-size: 0.92rem;
  line-height: 1.7;
  color: rgba(38, 27, 23, 0.64);
}

.inequality-chart-note a {
  color: #087f67;
  text-decoration: underline;
}
</style>
