<template>
  <section class="git-dist-chart" aria-labelledby="git-dist-title">
    <header>
      <p class="git-dist-kicker">Country share · Q1 2020 – Q1 2026</p>
      <h2 id="git-dist-title" class="git-dist-title">
        Share of global git pushes by country
      </h2>
      <p class="git-dist-copy">
        Proportional share of worldwide GitHub push events for the eight largest contributing nations. India's share surges from 5% in Q1 2020 to 14% by Q1 2026 — now rivaling the United States — while China's contribution has halved.
      </p>
    </header>

    <div class="git-dist-legend" aria-label="Countries shown in the chart">
      <span
        v-for="series in countrySeries"
        :key="`legend-${series.name}`"
        class="git-dist-legend-item"
      >
        <span class="git-dist-swatch" :style="{ backgroundColor: series.color }" />
        {{ series.name }}
      </span>
    </div>

    <BlogChartScroller>
      <svg
        class="git-dist-svg"
      viewBox="0 0 1000 500"
      role="img"
      aria-labelledby="git-dist-svg-title git-dist-svg-desc"
    >
      <title id="git-dist-svg-title">
        Share of global git pushes by country, Q1 2020 to Q1 2026
      </title>
      <desc id="git-dist-svg-desc">
        A multi-series line chart of percentage share. The United States leads throughout but India converges sharply upward from 2024 onward, approaching the US share by Q1 2026.
      </desc>

      <!-- grid lines -->
      <g class="git-dist-grid">
        <line
          v-for="tick in yTicks"
          :key="`grid-${tick}`"
          :x1="chart.left"
          :x2="chart.right"
          :y1="yFor(tick)"
          :y2="yFor(tick)"
        />
      </g>

      <!-- y-axis labels -->
      <g class="git-dist-y-labels">
        <text
          v-for="tick in yTicks"
          :key="`yl-${tick}`"
          :x="chart.left - 12"
          :y="yFor(tick) + 5"
          text-anchor="end"
        >{{ tick }}%</text>
      </g>

      <!-- x-axis labels every 4 quarters + last -->
      <g class="git-dist-x-labels">
        <g
          v-for="(q, i) in quarters"
          v-show="i % 4 === 0 || i === quarters.length - 1"
          :key="`xl-${q}`"
        >
          <line
            :x1="xFor(i)"
            :x2="xFor(i)"
            :y1="chart.bottom"
            :y2="chart.bottom + 8"
          />
          <text
            :x="xFor(i)"
            :y="chart.bottom + 28"
            text-anchor="middle"
          >{{ shortQuarter(q) }}</text>
        </g>
      </g>

      <!-- one line per country -->
      <g
        v-for="series in countrySeries"
        :key="`series-${series.name}`"
      >
        <path
          class="git-dist-line"
          :d="pathFor(series)"
          :style="{ stroke: series.color }"
        />
        <!-- interactive hit targets -->
        <g
          v-for="(point, i) in series.points"
          :key="`${series.name}-${point.quarter}`"
          class="git-dist-point-group"
          tabindex="0"
          role="button"
          :aria-label="`${series.name}, ${point.quarter}: ${point.sharePercent.toFixed(1)}% of global pushes`"
          @mouseenter="setActive(series, i)"
          @mouseleave="clearActive"
          @focus="setActive(series, i)"
          @blur="clearActive"
          @click="setActive(series, i)"
          @keydown.enter.prevent="setActive(series, i)"
          @keydown.space.prevent="setActive(series, i)"
        >
          <circle
            class="git-dist-hit"
            :cx="xFor(i)"
            :cy="yFor(point.sharePercent)"
            r="14"
          />
          <circle
            class="git-dist-dot"
            :class="{ 'git-dist-dot-active': isActive(series, i) }"
            :cx="xFor(i)"
            :cy="yFor(point.sharePercent)"
            :style="{ fill: series.color }"
            r="4"
          />
        </g>
      </g>

      <!-- tooltip -->
      <g
        v-if="activePoint"
        class="git-dist-tooltip"
        :transform="tooltipTransform"
        aria-hidden="true"
      >
        <rect x="-86" y="-56" width="172" height="56" rx="9" />
        <text class="git-dist-tt-label" x="0" y="-34" text-anchor="middle">
          {{ activePoint.series.name }} · {{ activePoint.point.quarter }}
        </text>
        <text class="git-dist-tt-share" x="0" y="-13" text-anchor="middle">
          {{ activePoint.point.sharePercent.toFixed(1) }}% of global pushes
        </text>
      </g>
      </svg>
    </BlogChartScroller>

    <p class="git-dist-note">
      Share is each country's quarterly push count divided by worldwide quarterly push count from the same dataset. Countries shown are the eight with largest aggregate volumes over the full period. Source: <a href="https://octoverse.github.com" target="_blank" rel="noopener noreferrer">GitHub Octoverse</a>.
    </p>
  </section>
</template>

<script>
import { gitPushesCountrySeries } from '~/data/gitPushesDistribution'

export default {
  name: 'GitPushesDistributionChart',
  data () {
    return {
      countrySeries: gitPushesCountrySeries,
      chart: { left: 72, right: 960, top: 44, bottom: 418 },
      activePoint: null,
      yMin: 0,
      yMax: 22,
    }
  },
  computed: {
    quarters () {
      return this.countrySeries[0].points.map(p => p.quarter)
    },
    yTicks () {
      return [0, 5, 10, 15, 20]
    },
    tooltipTransform () {
      if (!this.activePoint) return ''
      const i = this.quarters.indexOf(this.activePoint.point.quarter)
      const x = Math.min(920, Math.max(90, this.xFor(i)))
      const y = this.yFor(this.activePoint.point.sharePercent)
      return `translate(${x} ${y < 80 ? y + 68 : y - 16})`
    },
  },
  methods: {
    xFor (i) {
      const w = this.chart.right - this.chart.left
      return this.chart.left + (i / (this.quarters.length - 1)) * w
    },
    yFor (value) {
      const h = this.chart.bottom - this.chart.top
      return this.chart.bottom - ((value - this.yMin) / (this.yMax - this.yMin)) * h
    },
    pathFor (series) {
      return series.points
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${this.xFor(i)} ${this.yFor(p.sharePercent)}`)
        .join(' ')
    },
    shortQuarter (q) {
      const [qpart, year] = q.split(' ')
      return `${qpart}'${year.slice(2)}`
    },
    setActive (series, i) {
      this.activePoint = { series, point: series.points[i] }
    },
    clearActive () {
      this.activePoint = null
    },
    isActive (series, i) {
      return this.activePoint?.series.name === series.name &&
        this.activePoint?.point.quarter === series.points[i].quarter
    },
  },
}
</script>

<style scoped>
.git-dist-chart {
  padding: clamp(1rem, 2.5vw, 1.75rem);
  border: 1px solid rgba(38, 27, 23, 0.12);
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at top left, rgba(224, 123, 57, 0.12), transparent 30%),
    linear-gradient(180deg, rgba(255, 250, 241, 0.98), rgba(243, 237, 227, 0.98));
}

.git-dist-kicker,
.git-dist-title {
  font-family: "Trend W01 Sns One", "sans-serif";
}

.git-dist-kicker {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(38, 27, 23, 0.52);
}

.git-dist-title {
  margin-top: 0.75rem;
  font-size: clamp(1.6rem, 4vw, 2.7rem);
  line-height: 1.02;
  max-width: 18ch;
}

.git-dist-copy,
.git-dist-note {
  font-family: "Sofia W01 Regular1446825", "sans-serif";
}

.git-dist-copy {
  margin-top: 0.9rem;
  max-width: 46rem;
  line-height: 1.75;
  color: rgba(38, 27, 23, 0.78);
}

.git-dist-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 1.15rem;
  margin-top: 1.25rem;
  font-family: "Trend W01 Sns One", "sans-serif";
}

.git-dist-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: rgba(38, 27, 23, 0.72);
}

.git-dist-swatch {
  display: inline-block;
  width: 1.5rem;
  height: 0.24rem;
  border-radius: 999px;
}

.git-dist-svg {
  display: block;
  width: 100%;
  height: auto;
  margin-top: 1.35rem;
  overflow: visible;
}

.git-dist-grid line {
  stroke: rgba(38, 27, 23, 0.1);
  stroke-dasharray: 4 6;
}

.git-dist-y-labels text,
.git-dist-x-labels text {
  font-family: "Sofia W01 Bold1446843", "sans-serif";
  font-size: 0.78rem;
  letter-spacing: 0.02em;
  fill: rgba(38, 27, 23, 0.68);
}

.git-dist-x-labels line {
  stroke: rgba(38, 27, 23, 0.2);
  stroke-width: 1.2;
}

.git-dist-line {
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.git-dist-hit {
  fill: transparent;
  cursor: pointer;
}

.git-dist-dot {
  stroke: #fffaf1;
  stroke-width: 2;
  transition: r 120ms ease;
}

.git-dist-dot-active {
  r: 7;
  stroke-width: 3;
}

.git-dist-point-group:focus {
  outline: none;
}

.git-dist-tooltip {
  pointer-events: none;
}

.git-dist-tooltip rect {
  fill: rgba(38, 27, 23, 0.96);
  stroke: rgba(255, 250, 241, 0.4);
  stroke-width: 1.5;
}

.git-dist-tt-label {
  font-family: "Sofia W01 Bold1446843", "sans-serif";
  font-size: 12px;
  fill: #fffaf1;
}

.git-dist-tt-share {
  font-family: "Sofia W01 Regular1446825", "sans-serif";
  font-size: 11px;
  fill: rgba(255, 250, 241, 0.85);
}

.git-dist-note {
  margin-top: 1.15rem;
  font-size: 0.88rem;
  line-height: 1.7;
  color: rgba(38, 27, 23, 0.64);
}

.git-dist-note a {
  color: #2952cc;
  text-decoration: underline;
}

@media screen and (max-width: 700px) {
  .git-dist-line {
    stroke-width: 4;
  }
}
</style>
