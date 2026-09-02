<template>
  <section class="git-global-chart" aria-labelledby="git-global-title">
    <header>
      <p class="git-global-kicker">Global software activity · Q1 2020 – Q1 2026</p>
      <h2 id="git-global-title" class="git-global-title">
        Git pushes per quarter
      </h2>
      <p class="git-global-copy">
        Total git push events recorded on GitHub per calendar quarter. The acceleration starting in late 2024 tracks the widespread adoption of AI coding assistants that commit and push on behalf of developers.  Note that Q2 and Q3 are estimates, based off public blog posts about commits.
      </p>
    </header>

    <div class="blog-chart-scroll">
      <svg
        class="git-global-svg"
      viewBox="0 0 1000 500"
      role="img"
      aria-labelledby="git-global-svg-title git-global-svg-desc"
    >
      <title id="git-global-svg-title">
        GitHub git push events per quarter, Q1 2020 to Q1 2026
      </title>
      <desc id="git-global-svg-desc">
        A line chart showing global git push volume rising from 81 million in Q1 2020 to 320 million in Q1 2026, with a sharp inflection beginning in Q2 2025.
      </desc>

      <!-- grid lines -->
      <g class="git-global-grid">
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
      <g class="git-global-y-labels">
        <text
          v-for="tick in yTicks"
          :key="`yl-${tick}`"
          :x="chart.left - 12"
          :y="yFor(tick) + 5"
          text-anchor="end"
        >{{ formatM(tick) }}</text>
        <text class="git-global-unit" :x="chart.left" :y="chart.top - 16" text-anchor="start">millions</text>
      </g>

      <!-- x-axis labels — show every 4th quarter + last -->
      <g class="git-global-x-labels">
        <g
          v-for="(point, i) in points"
          v-show="i % 4 === 0 || i === points.length - 1"
          :key="`xl-${point.quarter}`"
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
          >{{ shortQuarter(point.quarter) }}</text>
        </g>
      </g>

      <!-- area fill -->
      <path class="git-global-area" :d="areaPath" />

      <!-- line -->
      <path class="git-global-line" :d="linePath" />

      <!-- interactive points -->
      <g
        v-for="(point, i) in points"
        :key="`pt-${point.quarter}`"
        class="git-global-point-group"
        tabindex="0"
        role="button"
        :aria-label="`${point.quarter}: ${formatFull(point.pushes)} git pushes`"
        @mouseenter="activeIndex = i"
        @mouseleave="activeIndex = null"
        @focus="activeIndex = i"
        @blur="activeIndex = null"
        @click="activeIndex = activeIndex === i ? null : i"
        @keydown.enter.prevent="activeIndex = i"
        @keydown.space.prevent="activeIndex = i"
      >
        <circle class="git-global-hit" :cx="xFor(i)" :cy="yFor(point.pushes)" r="14" />
        <circle
          class="git-global-dot"
          :class="{ 'git-global-dot-active': activeIndex === i }"
          :cx="xFor(i)"
          :cy="yFor(point.pushes)"
          r="4"
        />
      </g>

      <!-- tooltip -->
      <g
        v-if="activeIndex !== null"
        class="git-global-tooltip"
        :transform="tooltipTransform"
        aria-hidden="true"
      >
        <rect x="-78" y="-52" width="156" height="52" rx="9" />
        <text class="git-global-tt-label" x="0" y="-31" text-anchor="middle">
          {{ points[activeIndex].quarter }}
        </text>
        <text class="git-global-tt-value" x="0" y="-11" text-anchor="middle">
          {{ formatFull(points[activeIndex].pushes) }}
        </text>
      </g>
      </svg>
    </div>

    <p class="git-global-note">
      Source: <a href="https://octoverse.github.com" target="_blank" rel="noopener noreferrer">GitHub Octoverse</a>, git push event counts by quarter. Counts include all public repositories and private repositories where GitHub tracks aggregate activity.
    </p>
  </section>
</template>

<script>
import { gitPushesGlobalSeries } from '~/data/gitPushesGlobal'

export default {
  name: 'GitPushesGlobalChart',
  data () {
    return {
      points: gitPushesGlobalSeries,
      chart: { left: 76, right: 960, top: 44, bottom: 418 },
      activeIndex: null,
      yMin: 0,
      yMax: 500000000,
    }
  },
  computed: {
    yTicks () {
      return [0, 50000000, 100000000, 150000000, 200000000, 250000000, 300000000, 350000000, 400000000, 450000000, 500000000]
    },
    linePath () {
      return this.points
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${this.xFor(i)} ${this.yFor(p.pushes)}`)
        .join(' ')
    },
    areaPath () {
      const last = this.points.length - 1
      return `${this.linePath} L ${this.xFor(last)} ${this.chart.bottom} L ${this.xFor(0)} ${this.chart.bottom} Z`
    },
    tooltipTransform () {
      if (this.activeIndex === null) return ''
      const x = Math.min(920, Math.max(82, this.xFor(this.activeIndex)))
      const y = this.yFor(this.points[this.activeIndex].pushes)
      return `translate(${x} ${y < 80 ? y + 66 : y - 14})`
    },
  },
  methods: {
    xFor (i) {
      const w = this.chart.right - this.chart.left
      return this.chart.left + (i / (this.points.length - 1)) * w
    },
    yFor (value) {
      const h = this.chart.bottom - this.chart.top
      return this.chart.bottom - ((value - this.yMin) / (this.yMax - this.yMin)) * h
    },
    formatM (value) {
      return value === 0 ? '0' : `${(value / 1_000_000).toFixed(0)}M`
    },
    formatFull (value) {
      return `${(value / 1_000_000).toFixed(1)}M`
    },
    shortQuarter (q) {
      // "Q1 2020" → "Q1'20"
      const [qpart, year] = q.split(' ')
      return `${qpart}'${year.slice(2)}`
    },
  },
}
</script>

<style scoped>
.git-global-chart {
  padding: clamp(1rem, 2.5vw, 1.75rem);
  border: 1px solid rgba(38, 27, 23, 0.12);
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at top right, rgba(41, 82, 204, 0.14), transparent 30%),
    linear-gradient(180deg, rgba(255, 250, 241, 0.98), rgba(243, 237, 227, 0.98));
}

.git-global-kicker,
.git-global-title {
  font-family: "Trend W01 Sns One", "sans-serif";
}

.git-global-kicker {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(38, 27, 23, 0.52);
}

.git-global-title {
  margin-top: 0.75rem;
  font-size: clamp(1.6rem, 4vw, 2.7rem);
  line-height: 1.02;
  max-width: 16ch;
}

.git-global-copy,
.git-global-note {
  font-family: "Sofia W01 Regular1446825", "sans-serif";
}

.git-global-copy {
  margin-top: 0.9rem;
  max-width: 44rem;
  line-height: 1.75;
  color: rgba(38, 27, 23, 0.78);
}

.git-global-svg {
  display: block;
  width: 100%;
  height: auto;
  margin-top: 1.35rem;
  overflow: visible;
}

.git-global-grid line {
  stroke: rgba(38, 27, 23, 0.1);
  stroke-dasharray: 4 6;
}

.git-global-y-labels text,
.git-global-x-labels text {
  font-family: "Sofia W01 Bold1446843", "sans-serif";
  font-size: 0.78rem;
  letter-spacing: 0.02em;
  fill: rgba(38, 27, 23, 0.68);
}

.git-global-unit {
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  fill: rgba(38, 27, 23, 0.45) !important;
}

.git-global-x-labels line {
  stroke: rgba(38, 27, 23, 0.2);
  stroke-width: 1.2;
}

.git-global-area {
  fill: rgba(41, 82, 204, 0.09);
}

.git-global-line {
  fill: none;
  stroke: #2952cc;
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.git-global-hit {
  fill: transparent;
  cursor: pointer;
}

.git-global-dot {
  fill: #2952cc;
  stroke: #fffaf1;
  stroke-width: 2;
  transition: r 120ms ease;
}

.git-global-dot-active {
  r: 7;
  stroke-width: 3;
}

.git-global-tooltip {
  pointer-events: none;
}

.git-global-tooltip rect {
  fill: rgba(38, 27, 23, 0.96);
  stroke: rgba(255, 250, 241, 0.4);
  stroke-width: 1.5;
}

.git-global-tt-label {
  font-family: "Sofia W01 Bold1446843", "sans-serif";
  font-size: 12px;
  fill: #fffaf1;
}

.git-global-tt-value {
  font-family: "Sofia W01 Regular1446825", "sans-serif";
  font-size: 11px;
  fill: rgba(255, 250, 241, 0.85);
}

.git-global-note {
  margin-top: 1.15rem;
  font-size: 0.88rem;
  line-height: 1.7;
  color: rgba(38, 27, 23, 0.64);
}

.git-global-note a {
  color: #2952cc;
  text-decoration: underline;
}
</style>
