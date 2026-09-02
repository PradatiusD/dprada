<template>
  <section class="screen-time-chart" aria-labelledby="screen-time-title">
    <header>
      <p class="screen-time-kicker">U.S. adults · 2008–2018</p>
      <h2 id="screen-time-title">Daily mobile digital-media time</h2>
      <p class="screen-time-deck">Average hours per day spent with digital media on smartphones and tablets.</p>
    </header>

    <BlogChartScroller class="screen-time-plot-wrap" label="Scrollable chart of daily mobile digital-media time by year.">
      <svg class="screen-time-plot" viewBox="0 0 780 390" role="img" aria-labelledby="screen-time-svg-title screen-time-svg-desc">
        <title id="screen-time-svg-title">Daily mobile digital-media time among U.S. adults, 2008 to 2018</title>
        <desc id="screen-time-svg-desc">Average daily time rises from 0.3 hours in 2008 to 3.6 hours in 2018. Mobile includes smartphones and tablets.</desc>

        <g class="screen-time-grid">
          <line v-for="tick in yTicks" :key="tick" :x1="chart.left" :x2="chart.right" :y1="yScale(tick)" :y2="yScale(tick)" />
        </g>
        <g class="screen-time-y-axis">
          <text v-for="tick in yTicks" :key="tick" :x="chart.left - 12" :y="yScale(tick) + 4" text-anchor="end">{{ tick }}h</text>
        </g>
        <path class="screen-time-area" :d="areaPath" />
        <path class="screen-time-line" :d="linePath" />

        <g v-for="point in plottedPoints" :key="point.year">
          <circle class="screen-time-point" :class="{ 'screen-time-point-active': activeYear === point.year }" :cx="point.x" :cy="point.y" r="4.5" />
          <circle
            class="screen-time-target"
            :cx="point.x"
            :cy="point.y"
            r="14"
            tabindex="0"
            role="button"
            :aria-label="`${point.year}: ${formatDuration(point.hoursPerDay)} per day`"
            @mouseenter="activeYear = point.year"
            @mouseleave="activeYear = null"
            @focus="activeYear = point.year"
            @blur="activeYear = null"
            @click="activeYear = activeYear === point.year ? null : point.year"
            @keydown.enter.prevent="activeYear = point.year"
            @keydown.space.prevent="activeYear = point.year"
          />
        </g>

        <g v-if="activePoint" class="screen-time-tooltip" :transform="tooltipTransform" aria-hidden="true">
          <rect width="150" height="56" rx="9" />
          <text x="12" y="21">{{ activePoint.year }}</text>
          <text class="screen-time-tooltip-value" x="12" y="43">{{ formatDuration(activePoint.hoursPerDay) }}/day</text>
        </g>

        <g class="screen-time-x-axis">
          <text v-for="year in xTicks" :key="year" :x="xScale(year)" :y="chart.bottom + 28" text-anchor="middle">{{ year }}</text>
        </g>
      </svg>
    </BlogChartScroller>

    <div class="screen-time-summary" aria-label="Change from 2008 to 2018">
      <div><span>2008</span><strong>18 min/day</strong></div>
      <div class="screen-time-summary-change"><span>2018</span><strong>3 hr 36 min/day</strong></div>
      <p>12× the 2008 average</p>
    </div>

    <p class="screen-time-note">
      Mobile includes smartphones and tablets, so this is a comparable mobile-device series rather than phone-only screen-time telemetry. Figures cover U.S. adults 18+, include use at home and work, and count simultaneous media use separately. The source series ends in 2018. Source: <a href="https://ourworldindata.org/grapher/daily-hours-spent-with-digital-media-per-adult-user" target="_blank" rel="noopener noreferrer">BOND Internet Trends (2019), processed by Our World in Data</a>.
    </p>
  </section>
</template>

<script>
import { mobileScreenTime } from '~/data/mobileScreenTime'

export default {
  name: 'ScreenTimeOverTimeChart',
  data () {
    return {
      activeYear: null,
      points: mobileScreenTime,
      chart: { left: 62, right: 748, top: 32, bottom: 338 },
      xTicks: [2008, 2010, 2012, 2014, 2016, 2018],
      yTicks: [0, 1, 2, 3, 4]
    }
  },
  computed: {
    plottedPoints () {
      return this.points.map(point => ({ ...point, x: this.xScale(point.year), y: this.yScale(point.hoursPerDay) }))
    },
    linePath () {
      return this.plottedPoints.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ')
    },
    areaPath () {
      const first = this.plottedPoints[0]
      const last = this.plottedPoints[this.plottedPoints.length - 1]
      return `${this.linePath} L ${last.x} ${this.chart.bottom} L ${first.x} ${this.chart.bottom} Z`
    },
    activePoint () {
      return this.plottedPoints.find(point => point.year === this.activeYear) || null
    },
    tooltipTransform () {
      if (!this.activePoint) return ''
      const x = Math.min(598, Math.max(10, this.activePoint.x - 75))
      const y = this.activePoint.y < 98 ? this.activePoint.y + 18 : this.activePoint.y - 72
      return `translate(${x} ${y})`
    }
  },
  methods: {
    xScale (year) {
      return this.chart.left + ((year - 2008) / 10) * (this.chart.right - this.chart.left)
    },
    yScale (hours) {
      return this.chart.bottom - (hours / 4) * (this.chart.bottom - this.chart.top)
    },
    formatDuration (hours) {
      const minutes = Math.round(hours * 60)
      const wholeHours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      return wholeHours ? `${wholeHours} hr ${remainingMinutes} min` : `${remainingMinutes} min`
    }
  }
}
</script>

<style scoped>
.screen-time-chart { padding: clamp(1rem, 3vw, 1.6rem); border: 1px solid rgba(38, 27, 23, 0.12); border-radius: 1.1rem; background: radial-gradient(circle at top right, rgba(224, 104, 54, 0.14), transparent 38%), rgba(255, 250, 241, 0.84); }
.screen-time-kicker, .screen-time-chart h2, .screen-time-summary { font-family: "Trend W01 Sns One", "sans-serif"; }
.screen-time-kicker { font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(38, 27, 23, 0.52); }
.screen-time-chart h2 { margin-top: 0.4rem; font-size: clamp(1.35rem, 3.5vw, 2.1rem); line-height: 1.08; }
.screen-time-deck { margin-top: 0.7rem; color: rgba(38, 27, 23, 0.72); }
.screen-time-plot-wrap { margin-top: 1rem; }
.screen-time-plot { display: block; width: 100%; min-width: 590px; }
.screen-time-grid line { stroke: rgba(38, 27, 23, 0.1); stroke-dasharray: 4 6; }
.screen-time-area { fill: rgba(224, 104, 54, 0.12); }
.screen-time-line { fill: none; stroke: #d85b2a; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
.screen-time-point { fill: #fffaf1; stroke: #d85b2a; stroke-width: 3; }
.screen-time-point-active { fill: #d85b2a; r: 7; }
.screen-time-target { fill: transparent; cursor: pointer; }
.screen-time-target:focus { outline: none; stroke: rgba(216, 91, 42, 0.4); stroke-width: 3; }
.screen-time-y-axis text, .screen-time-x-axis text { font-family: "Sofia W01 Regular1446825", "sans-serif"; font-size: 12px; fill: rgba(38, 27, 23, 0.62); }
.screen-time-tooltip { pointer-events: none; }
.screen-time-tooltip rect { fill: #261b17; }
.screen-time-tooltip text { font-family: "Trend W01 Sns One", "sans-serif"; font-size: 12px; fill: #fffaf1; }
.screen-time-tooltip-value { fill: #ffc5ac !important; }
.screen-time-summary { display: grid; grid-template-columns: 1fr 1fr auto; gap: 0.7rem; align-items: stretch; margin-top: 0.8rem; }
.screen-time-summary div, .screen-time-summary p { display: grid; gap: 0.2rem; padding: 0.8rem; border-radius: 0.7rem; background: rgba(38, 27, 23, 0.045); }
.screen-time-summary span { font-size: 0.7rem; color: rgba(38, 27, 23, 0.58); text-transform: uppercase; }
.screen-time-summary strong { font-size: clamp(1rem, 2.5vw, 1.35rem); }
.screen-time-summary-change { color: #d85b2a; }
.screen-time-summary p { place-items: center; color: #d85b2a; text-align: center; }
.screen-time-note { margin-top: 1rem; font-size: 0.78rem; line-height: 1.55; color: rgba(38, 27, 23, 0.62); }
.screen-time-note a { color: #b8471e; text-decoration: underline; }
@media (max-width: 620px) { .screen-time-summary { grid-template-columns: 1fr; } }
</style>
