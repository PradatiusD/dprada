<template>
  <section class="interest-revenue-chart">
    <header>
      <p class="interest-revenue-chart-kicker">
        Federal budget
      </p>
      <h2 class="interest-revenue-chart-title">
        Federal net interest burden and the federal funds rate
      </h2>
      <p class="interest-revenue-chart-copy">
        The line uses the left axis to show net interest as a share of federal receipts. The bars use the right axis to show the effective federal funds rate over the same 50 fiscal years.
      </p>
    </header>

    <div class="interest-revenue-chart-legend" aria-hidden="true">
      <span><i class="interest-revenue-chart-line-swatch" />Net interest / revenue</span>
      <span><i class="interest-revenue-chart-bar-swatch" />Federal funds rate</span>
    </div>

    <BlogChartScroller>
      <svg
        class="interest-revenue-chart-svg"
        viewBox="0 0 1000 520"
        role="img"
        aria-labelledby="interest-revenue-chart-title interest-revenue-chart-description"
        @mouseleave="showLatestPoint"
      >
        <title id="interest-revenue-chart-title">
          Federal net interest burden and effective federal funds rate, 1976 to 2025
        </title>
        <desc id="interest-revenue-chart-description">
          A combined chart with a line showing net interest outlays as a share of federal receipts and bars showing the average effective federal funds rate for each fiscal year from 1976 through 2025.
        </desc>

        <defs>
          <linearGradient id="interest-revenue-chart-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#9f552b" stop-opacity="0.28" />
            <stop offset="100%" stop-color="#9f552b" stop-opacity="0.02" />
          </linearGradient>
        </defs>

        <g class="interest-revenue-chart-grid">
          <g
            v-for="tick in yTicks"
            :key="tick"
          >
            <line
              :x1="chart.left"
              :x2="chart.right"
              :y1="yForPercent(tick)"
              :y2="yForPercent(tick)"
            />
            <text
              :x="chart.left - 14"
              :y="yForPercent(tick) + 5"
              text-anchor="end"
            >
              {{ tick }}%
            </text>
          </g>
        </g>

        <g class="interest-revenue-chart-rate-labels">
          <text
            v-for="tick in rateTicks"
            :key="`rate-axis-${tick}`"
            :x="chart.right + 14"
            :y="yForRate(tick) + 5"
            text-anchor="start"
          >
            {{ tick }}%
          </text>
        </g>

        <rect
          v-for="(point, index) in ratePoints"
          :key="`bar-${point.fiscalYear}`"
          :class="['federal-funds-chart-bar', { 'federal-funds-chart-bar-active': index === activeIndex }]"
          :x="xForYear(point.fiscalYear) - (rateBarWidth / 2)"
          :y="yForRate(point.averagePercent)"
          :width="rateBarWidth"
          :height="chart.bottom - yForRate(point.averagePercent)"
        />

        <path
          class="interest-revenue-chart-area"
          :d="areaPath"
        />
        <path
          class="interest-revenue-chart-line"
          :d="linePath"
        />

        <g class="interest-revenue-chart-years">
          <text
            v-for="year in xTicks"
            :key="year"
            :x="xForYear(year)"
            :y="chart.bottom + 34"
            text-anchor="middle"
          >
            {{ year }}
          </text>
        </g>

        <line
          class="interest-revenue-chart-guide"
          :x1="xForYear(activePoint.year)"
          :x2="xForYear(activePoint.year)"
          :y1="chart.top"
          :y2="chart.bottom"
        />
        <circle
          class="interest-revenue-chart-active-point"
          :cx="xForYear(activePoint.year)"
          :cy="yForPercent(percentOfRevenue(activePoint))"
          r="6"
        />

        <g
          class="interest-revenue-chart-tooltip"
          :transform="`translate(${tooltipX}, ${tooltipY})`"
          aria-hidden="true"
        >
          <rect width="210" height="90" rx="10" />
          <text x="14" y="24">
            {{ activePoint.year }} fiscal year
          </text>
          <text class="interest-revenue-chart-tooltip-value" x="14" y="49">
            {{ formatPercent(activePoint) }} of revenue
          </text>
          <text class="interest-revenue-chart-tooltip-rate" x="14" y="73">
            {{ formatRate(activeRatePoint) }} federal funds rate
          </text>
        </g>

        <rect
          v-for="(point, index) in points"
          :key="point.year"
          class="interest-revenue-chart-hit-target"
          :x="xForYear(point.year) - (rateHitWidth / 2)"
          :y="chart.top"
          :width="rateHitWidth"
          :height="chart.bottom - chart.top"
          tabindex="0"
          :aria-label="`${point.year}: ${formatPercent(point)} of federal revenue went to net interest; ${formatRate(ratePoints[index])} average effective federal funds rate`"
          @mouseenter="activeIndex = index"
          @focus="activeIndex = index"
          @click="activeIndex = index"
          @blur="showLatestPoint"
        />
      </svg>
    </BlogChartScroller>

    <div class="interest-revenue-chart-summary" aria-live="polite">
      <p>
        <strong>{{ activePoint.year }}:</strong> {{ formatPercent(activePoint) }}
      </p>
      <p>
        <strong>Net interest:</strong> {{ formatBillions(activePoint.netInterestMillions) }}
      </p>
      <p>
        <strong>Federal receipts:</strong> {{ formatBillions(activePoint.receiptsMillions) }}
      </p>
      <p>
        <strong>Federal funds rate:</strong> {{ formatRate(activeRatePoint) }}
      </p>
    </div>

    <p class="interest-revenue-chart-note">
      Percentage equals net interest outlays divided by total federal receipts for each U.S. fiscal year. Dollar values are nominal; all 50 observations are actuals, not estimates. “Net interest” is the federal budget function after interest income and other offsetting amounts. Source: White House Office of Management and Budget, Historical Tables <a href="https://www.whitehouse.gov/wp-content/uploads/2026/04/hist01z1_fy2027.xlsx" target="_blank" rel="noopener noreferrer">1.1</a> and <a href="https://www.whitehouse.gov/wp-content/uploads/2026/04/hist03z1_fy2027.xlsx" target="_blank" rel="noopener noreferrer">3.1</a> (FY 2027 Budget release).
    </p>
    <p class="interest-revenue-chart-note">
      The federal funds rate is the arithmetic mean of the 12 monthly <a href="https://fred.stlouisfed.org/series/FEDFUNDS" target="_blank" rel="noopener noreferrer">FEDFUNDS observations</a> from October through September in each fiscal year. The monthly series is an average of daily figures and is not seasonally adjusted. The right-axis federal funds rate is an overnight interbank rate—not the average rate paid on federal debt. Debt-service costs respond to market rates with lags as debt matures and is refinanced, so visual association does not by itself establish causation. Source: Board of Governors of the Federal Reserve System via FRED.
    </p>
  </section>
</template>

<script>
import { federalFundsRateSeries } from '~/data/federalFundsRates'
import { federalInterestRevenueSeries } from '~/data/federalInterestRevenue'

export default {
  name: 'FederalInterestRevenueChart',
  data () {
    return {
      points: federalInterestRevenueSeries,
      ratePoints: federalFundsRateSeries,
      activeIndex: federalInterestRevenueSeries.length - 1,
      chart: {
        left: 88,
        right: 900,
        top: 40,
        bottom: 420
      },
      maxPercent: 20,
      maxRate: 20
    }
  },
  computed: {
    activePoint () {
      return this.points[this.activeIndex]
    },
    activeRatePoint () {
      return this.ratePoints[this.activeIndex]
    },
    firstPoint () {
      return this.points[0]
    },
    latestPoint () {
      return this.points[this.points.length - 1]
    },
    yTicks () {
      return [0, 5, 10, 15, 20]
    },
    rateTicks () {
      return [0, 4, 8, 12, 16, 20]
    },
    xTicks () {
      return [1976, 1985, 1995, 2005, 2015, 2025]
    },
    linePath () {
      return this.points
        .map((point, index) => `${index === 0 ? 'M' : 'L'} ${this.xForYear(point.year)} ${this.yForPercent(this.percentOfRevenue(point))}`)
        .join(' ')
    },
    areaPath () {
      return `${this.linePath} L ${this.chart.right} ${this.chart.bottom} L ${this.chart.left} ${this.chart.bottom} Z`
    },
    tooltipX () {
      const centered = this.xForYear(this.activePoint.year) - 105
      return Math.max(this.chart.left, Math.min(centered, this.chart.right - 210))
    },
    tooltipY () {
      const pointY = this.yForPercent(this.percentOfRevenue(this.activePoint))
      return pointY < 145 ? pointY + 18 : pointY - 106
    },
    rateBarWidth () {
      return this.rateHitWidth * 0.68
    },
    rateHitWidth () {
      return (this.chart.right - this.chart.left) / (this.ratePoints.length - 1)
    }
  },
  methods: {
    percentOfRevenue (point) {
      return (point.netInterestMillions / point.receiptsMillions) * 100
    },
    xForYear (year) {
      const yearRange = this.latestPoint.year - this.firstPoint.year
      const width = this.chart.right - this.chart.left
      return this.chart.left + (((year - this.firstPoint.year) / yearRange) * width)
    },
    yForPercent (value) {
      const height = this.chart.bottom - this.chart.top
      return this.chart.bottom - ((value / this.maxPercent) * height)
    },
    yForRate (value) {
      const height = this.chart.bottom - this.chart.top
      return this.chart.bottom - ((value / this.maxRate) * height)
    },
    formatPercent (point) {
      return `${this.percentOfRevenue(point).toFixed(1)}%`
    },
    formatBillions (millions) {
      return `$${(millions / 1000).toLocaleString('en-US', { maximumFractionDigits: 1 })} billion`
    },
    formatRate (point) {
      return `${point.averagePercent.toFixed(1)}%`
    },
    showLatestPoint () {
      this.activeIndex = this.points.length - 1
    }
  }
}
</script>

<style scoped>
.interest-revenue-chart {
  padding: clamp(1rem, 2.5vw, 1.75rem);
  border: 1px solid rgba(38, 27, 23, 0.12);
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at top right, rgba(196, 117, 70, 0.2), transparent 30%),
    linear-gradient(180deg, rgba(255, 250, 241, 0.97), rgba(243, 237, 227, 0.97));
}

.interest-revenue-chart-kicker,
.interest-revenue-chart-title,
.interest-revenue-chart-summary strong {
  font-family: "Trend W01 Sns One", "sans-serif";
}

.interest-revenue-chart-kicker {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(38, 27, 23, 0.52);
}

.interest-revenue-chart-title {
  max-width: 22ch;
  margin-top: 0.75rem;
  font-size: clamp(1.6rem, 4vw, 2.7rem);
  line-height: 1.02;
}

.interest-revenue-chart-copy,
.interest-revenue-chart-legend,
.interest-revenue-chart-summary,
.interest-revenue-chart-note {
  font-family: "Sofia W01 Regular1446825", "sans-serif";
}

.interest-revenue-chart-copy {
  max-width: 44rem;
  margin-top: 0.9rem;
  line-height: 1.75;
  color: rgba(38, 27, 23, 0.78);
}

.interest-revenue-chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.4rem;
  margin-top: 1.25rem;
  color: rgba(38, 27, 23, 0.72);
}

.interest-revenue-chart-legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.interest-revenue-chart-legend i {
  display: inline-block;
  width: 1.5rem;
}

.interest-revenue-chart-line-swatch {
  height: 0;
  border-top: 4px solid #9f552b;
}

.interest-revenue-chart-bar-swatch {
  height: 0.8rem;
  background: rgba(41, 82, 204, 0.58);
}

.interest-revenue-chart-svg {
  width: 100%;
  height: auto;
  margin-top: 1.5rem;
  overflow: visible;
}

.interest-revenue-chart-grid line {
  stroke: rgba(38, 27, 23, 0.1);
  stroke-dasharray: 4 6;
}

.interest-revenue-chart-grid text,
.interest-revenue-chart-rate-labels text,
.interest-revenue-chart-years text {
  font-family: "Sofia W01 Bold1446843", "sans-serif";
  font-size: 0.8rem;
  letter-spacing: 0.03em;
  fill: rgba(38, 27, 23, 0.68);
}

.interest-revenue-chart-area {
  fill: url(#interest-revenue-chart-fill);
}

.interest-revenue-chart-line {
  fill: none;
  stroke: #9f552b;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.interest-revenue-chart-guide {
  stroke: rgba(38, 27, 23, 0.2);
  stroke-dasharray: 4 5;
}

.interest-revenue-chart-active-point {
  fill: #9f552b;
  stroke: #fffaf1;
  stroke-width: 3;
}

.federal-funds-chart-bar {
  fill: rgba(41, 82, 204, 0.58);
}

.federal-funds-chart-bar-active {
  fill: #2952cc;
}

.interest-revenue-chart-hit-target {
  cursor: crosshair;
  fill: transparent;
  outline: none;
}

.interest-revenue-chart-hit-target:focus {
  fill: transparent;
  stroke: #9f552b;
  stroke-width: 2;
}

.interest-revenue-chart-tooltip {
  pointer-events: none;
}

.interest-revenue-chart-tooltip rect {
  fill: rgba(38, 27, 23, 0.94);
}

.interest-revenue-chart-tooltip text {
  font-family: "Sofia W01 Regular1446825", "sans-serif";
  font-size: 0.82rem;
  fill: #fffaf1;
}

.interest-revenue-chart-tooltip .interest-revenue-chart-tooltip-value {
  font-family: "Sofia W01 Bold1446843", "sans-serif";
  font-size: 0.94rem;
}

.interest-revenue-chart-tooltip .interest-revenue-chart-tooltip-rate {
  fill: #b9c9ff;
}

.interest-revenue-chart-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.5rem;
  margin-top: 0.75rem;
  font-size: 0.98rem;
  line-height: 1.7;
}

.interest-revenue-chart-note {
  margin-top: 1rem;
  font-size: 0.92rem;
  line-height: 1.7;
  color: rgba(38, 27, 23, 0.64);
}

.interest-revenue-chart-note a {
  color: #9f552b;
  text-decoration: underline;
}
</style>
