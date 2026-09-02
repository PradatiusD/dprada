<template>
  <section class="fed-assets-chart">
    <header>
      <p class="fed-assets-chart-kicker">
        Federal Reserve balance sheet
      </p>
      <h2 class="fed-assets-chart-title">
        Federal Reserve total assets, 1976–2025
      </h2>
      <p class="fed-assets-chart-copy">
        Year-end assets held by the Federal Reserve, in nominal dollars, across the past 50 calendar years.
      </p>
    </header>

    <BlogChartScroller label="Scrollable chart of Federal Reserve total assets by year from 1976 through 2025.">
      <svg
        class="fed-assets-chart-svg"
        viewBox="0 0 1000 520"
        role="img"
        aria-labelledby="fed-assets-chart-title fed-assets-chart-description"
        @mouseleave="showLatestPoint"
      >
        <title id="fed-assets-chart-title">
          Federal Reserve total assets, 1976 to 2025
        </title>
        <desc id="fed-assets-chart-description">
          A line chart of 50 year-end observations showing Federal Reserve total assets rising from 134.7 billion dollars in 1976 to 6.6 trillion dollars in 2025, with sharp increases in 2008 and 2020.
        </desc>

        <defs>
          <linearGradient id="fed-assets-chart-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#2952cc" stop-opacity="0.28" />
            <stop offset="100%" stop-color="#2952cc" stop-opacity="0.02" />
          </linearGradient>
        </defs>

        <g class="fed-assets-chart-grid">
          <g
            v-for="tick in yTicks"
            :key="tick"
          >
            <line
              :x1="chart.left"
              :x2="chart.right"
              :y1="yForValue(tick)"
              :y2="yForValue(tick)"
            />
            <text
              :x="chart.left - 14"
              :y="yForValue(tick) + 5"
              text-anchor="end"
            >
              {{ formatAxisValue(tick) }}
            </text>
          </g>
        </g>

        <path class="fed-assets-chart-area" :d="areaPath" />
        <path class="fed-assets-chart-line" :d="linePath" />

        <g class="fed-assets-chart-years">
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
          class="fed-assets-chart-guide"
          :x1="xForYear(activePoint.year)"
          :x2="xForYear(activePoint.year)"
          :y1="chart.top"
          :y2="chart.bottom"
        />
        <circle
          class="fed-assets-chart-active-point"
          :cx="xForYear(activePoint.year)"
          :cy="yForValue(activePoint.totalAssetsMillions)"
          r="6"
        />

        <g
          class="fed-assets-chart-tooltip"
          :transform="`translate(${tooltipX}, ${tooltipY})`"
          aria-hidden="true"
        >
          <rect width="190" height="62" rx="10" />
          <text x="14" y="24">
            {{ activePoint.year }} year-end
          </text>
          <text class="fed-assets-chart-tooltip-value" x="14" y="48">
            {{ formatValue(activePoint.totalAssetsMillions) }}
          </text>
        </g>

        <rect
          v-for="(point, index) in points"
          :key="point.year"
          class="fed-assets-chart-hit-target"
          :x="xForYear(point.year) - (hitWidth / 2)"
          :y="chart.top"
          :width="hitWidth"
          :height="chart.bottom - chart.top"
          tabindex="0"
          :aria-label="`${point.year}: ${formatValue(point.totalAssetsMillions)} in Federal Reserve total assets`"
          @mouseenter="activeIndex = index"
          @focus="activeIndex = index"
          @click="activeIndex = index"
          @blur="showLatestPoint"
        />
      </svg>
    </BlogChartScroller>

    <div class="fed-assets-chart-summary" aria-live="polite">
      <p>
        <strong>{{ activePoint.year }}:</strong> {{ formatValue(activePoint.totalAssetsMillions) }}
      </p>
      <p>
        <strong>1976:</strong> {{ formatValue(firstPoint.totalAssetsMillions) }}
      </p>
    </div>

    <p class="fed-assets-chart-note">
      Values are the final weekly observation in each calendar year, in nominal dollars and not seasonally adjusted. The 1976–2001 observations use the historical <a href="https://fred.stlouisfed.org/series/TOTRA" target="_blank" rel="noopener noreferrer">Total Resources and Assets</a> series compiled from the Federal Reserve’s H.4.1 release; 2002–2025 use the directly overlapping <a href="https://fred.stlouisfed.org/series/WALCL" target="_blank" rel="noopener noreferrer">H.4.1 total-assets series</a>. The two series report identical values throughout their 2002–2017 overlap. Sources: Board of Governors of the Federal Reserve System and Center for Financial Stability, via FRED.
    </p>
  </section>
</template>

<script>
import { federalReserveAssetsSeries } from '~/data/federalReserveAssets'

export default {
  name: 'FederalReserveAssetsChart',
  data () {
    return {
      points: federalReserveAssetsSeries,
      activeIndex: federalReserveAssetsSeries.length - 1,
      chart: {
        left: 92,
        right: 950,
        top: 36,
        bottom: 420
      },
      maxValue: 9000000
    }
  },
  computed: {
    activePoint () {
      return this.points[this.activeIndex]
    },
    firstPoint () {
      return this.points[0]
    },
    latestPoint () {
      return this.points[this.points.length - 1]
    },
    yTicks () {
      return [0, 2000000, 4000000, 6000000, 8000000]
    },
    xTicks () {
      return [1976, 1985, 1995, 2005, 2015, 2025]
    },
    linePath () {
      return this.points
        .map((point, index) => `${index === 0 ? 'M' : 'L'} ${this.xForYear(point.year)} ${this.yForValue(point.totalAssetsMillions)}`)
        .join(' ')
    },
    areaPath () {
      return `${this.linePath} L ${this.chart.right} ${this.chart.bottom} L ${this.chart.left} ${this.chart.bottom} Z`
    },
    hitWidth () {
      return (this.chart.right - this.chart.left) / (this.points.length - 1)
    },
    tooltipX () {
      const centered = this.xForYear(this.activePoint.year) - 95
      return Math.max(this.chart.left, Math.min(centered, this.chart.right - 190))
    },
    tooltipY () {
      const pointY = this.yForValue(this.activePoint.totalAssetsMillions)
      return pointY < 120 ? pointY + 18 : pointY - 78
    }
  },
  methods: {
    xForYear (year) {
      const width = this.chart.right - this.chart.left
      return this.chart.left + (((year - this.firstPoint.year) / (this.latestPoint.year - this.firstPoint.year)) * width)
    },
    yForValue (value) {
      const height = this.chart.bottom - this.chart.top
      return this.chart.bottom - ((value / this.maxValue) * height)
    },
    formatAxisValue (millions) {
      if (millions === 0) return '$0'
      return `$${millions / 1000000}T`
    },
    formatValue (millions) {
      if (millions >= 1000000) {
        return `$${(millions / 1000000).toFixed(2)} trillion`
      }
      return `$${(millions / 1000).toFixed(1)} billion`
    },
    showLatestPoint () {
      this.activeIndex = this.points.length - 1
    }
  }
}
</script>

<style scoped>
.fed-assets-chart {
  padding: clamp(1rem, 2.5vw, 1.75rem);
  border: 1px solid rgba(38, 27, 23, 0.12);
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at top right, rgba(114, 159, 255, 0.22), transparent 28%),
    linear-gradient(180deg, rgba(255, 250, 241, 0.97), rgba(243, 237, 227, 0.97));
}

.fed-assets-chart-kicker,
.fed-assets-chart-title,
.fed-assets-chart-summary strong {
  font-family: "Trend W01 Sns One", "sans-serif";
}

.fed-assets-chart-kicker {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(38, 27, 23, 0.52);
}

.fed-assets-chart-title {
  max-width: 20ch;
  margin-top: 0.75rem;
  font-size: clamp(1.6rem, 4vw, 2.7rem);
  line-height: 1.02;
}

.fed-assets-chart-copy,
.fed-assets-chart-summary,
.fed-assets-chart-note {
  font-family: "Sofia W01 Regular1446825", "sans-serif";
}

.fed-assets-chart-copy {
  max-width: 44rem;
  margin-top: 0.9rem;
  line-height: 1.75;
  color: rgba(38, 27, 23, 0.78);
}

.fed-assets-chart-svg {
  width: 100%;
  height: auto;
  margin-top: 1.5rem;
  overflow: visible;
}

.fed-assets-chart-grid line {
  stroke: rgba(38, 27, 23, 0.1);
  stroke-dasharray: 4 6;
}

.fed-assets-chart-grid text,
.fed-assets-chart-years text {
  font-family: "Sofia W01 Bold1446843", "sans-serif";
  font-size: 0.8rem;
  letter-spacing: 0.03em;
  fill: rgba(38, 27, 23, 0.68);
}

.fed-assets-chart-area {
  fill: url(#fed-assets-chart-fill);
}

.fed-assets-chart-line {
  fill: none;
  stroke: #2952cc;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.fed-assets-chart-guide {
  stroke: rgba(38, 27, 23, 0.2);
  stroke-dasharray: 4 5;
}

.fed-assets-chart-active-point {
  fill: #2952cc;
  stroke: #fffaf1;
  stroke-width: 3;
}

.fed-assets-chart-hit-target {
  cursor: crosshair;
  fill: transparent;
  outline: none;
}

.fed-assets-chart-hit-target:focus {
  stroke: #2952cc;
  stroke-width: 2;
}

.fed-assets-chart-tooltip {
  pointer-events: none;
}

.fed-assets-chart-tooltip rect {
  fill: rgba(38, 27, 23, 0.94);
}

.fed-assets-chart-tooltip text {
  font-family: "Sofia W01 Regular1446825", "sans-serif";
  font-size: 0.82rem;
  fill: #fffaf1;
}

.fed-assets-chart-tooltip .fed-assets-chart-tooltip-value {
  font-family: "Sofia W01 Bold1446843", "sans-serif";
  font-size: 0.94rem;
}

.fed-assets-chart-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.5rem;
  margin-top: 0.75rem;
  font-size: 0.98rem;
  line-height: 1.7;
}

.fed-assets-chart-note {
  margin-top: 1rem;
  font-size: 0.92rem;
  line-height: 1.7;
  color: rgba(38, 27, 23, 0.64);
}

.fed-assets-chart-note a {
  color: #2952cc;
  text-decoration: underline;
}
</style>
