<template>
  <section class="friends-time-marker" aria-labelledby="friends-time-title">
    <header class="friends-time-heading">
      <div>
        <p class="friends-time-kicker">
          Social connection marker · U.S. annual average
        </p>
        <h2 id="friends-time-title">
          Hours Spent w/ Friends Per Year
        </h2>
      </div>
      <strong class="friends-time-callout">−51%</strong>
    </header>

    <p class="friends-time-deck">
      Annualized hours spent physically with friends fell from about 376 hours in 2010 to 184 hours in 2024.
    </p>

    <BlogChartScroller class="friends-time-plot-wrap">
      <svg
        class="friends-time-plot"
        viewBox="0 0 760 330"
        role="img"
        aria-labelledby="friends-chart-title friends-chart-description"
      >
        <title id="friends-chart-title">Annualized hours Americans spent with friends, 2010 to 2024</title>
        <desc id="friends-chart-description">Time declined from 376 hours per year in 2010 to 184 hours in 2024, reaching its lowest point during the disrupted 2020 survey year.</desc>
        <g class="friends-grid">
          <line v-for="tick in yTicks" :key="tick" x1="62" x2="730" :y1="yScale(tick)" :y2="yScale(tick)" />
        </g>
        <g class="friends-y-axis">
          <text v-for="tick in yTicks" :key="tick" x="50" :y="yScale(tick) + 4" text-anchor="end">{{ tick }}</text>
        </g>
        <path class="friends-area" :d="areaPath" />
        <path class="friends-line" :d="linePath" />
        <line class="friends-pandemic-line" :x1="xScale(2020)" :x2="xScale(2020)" y1="42" y2="272" />
        <text class="friends-pandemic-label" :x="xScale(2020)" y="32" text-anchor="middle">collection disrupted</text>

        <g v-for="point in plottedPoints" :key="point.year">
          <circle class="friends-point-visible" :cx="point.x" :cy="point.y" r="4" />
          <circle
            class="friends-point-target"
            :cx="point.x"
            :cy="point.y"
            r="13"
            tabindex="0"
            role="button"
            :aria-label="`${point.year}: ${point.annualizedHours.toFixed(1)} annualized hours with friends, ${Math.round(point.hoursPerDay * 60)} minutes per average day`"
            @mouseenter="activeYear = point.year"
            @mouseleave="activeYear = null"
            @focus="activeYear = point.year"
            @blur="activeYear = null"
            @click="activeYear = activeYear === point.year ? null : point.year"
          />
        </g>

        <g v-if="activePoint" class="friends-tooltip" :transform="tooltipTransform">
          <rect width="170" height="70" rx="9" />
          <text x="12" y="21">{{ activePoint.year }}</text>
          <text class="friends-tooltip-value" x="12" y="43">{{ activePoint.annualizedHours.toFixed(1) }} hours/year</text>
          <text class="friends-tooltip-daily" x="12" y="61">{{ Math.round(activePoint.hoursPerDay * 60) }} min/day</text>
        </g>

        <g class="friends-x-axis">
          <text v-for="tick in xTicks" :key="tick" :x="xScale(tick)" y="302" text-anchor="middle">{{ tick }}</text>
        </g>
        <text class="friends-axis-label" x="396" y="326" text-anchor="middle">Survey year</text>
      </svg>
    </BlogChartScroller>

    <div class="friends-time-stats">
      <div><span>2010</span><strong>376 hr</strong><small>≈ 62 min/day</small></div>
      <div><span>2019</span><strong>236 hr</strong><small>before COVID-19</small></div>
      <div><span>2024</span><strong>184 hr</strong><small>≈ 30 min/day</small></div>
    </div>

    <p class="friends-time-note">
      “With friends” means friends were physically present; phone and video calls do not count unless a friend was also in the room. Roommates or lodgers are grouped with friends, and time with multiple people can count in multiple relationship categories. Annualized hours equal the reported daily average multiplied by 365. The best comparable published series begins in 2010, so this chart shows 15 years within the requested 25-year horizon rather than inventing earlier values. Data collection paused from mid-March to mid-May 2020, making that year noncomparable. Sources: <a href="https://ourworldindata.org/grapher/who-americans-spend-their-time-with" target="_blank" rel="noopener noreferrer">Our World in Data</a>, derived from the <a href="https://www.bls.gov/tus/" target="_blank" rel="noopener noreferrer">BLS American Time Use Survey</a>.
    </p>
  </section>
</template>

<script>
import { timeWithFriends } from '~/data/timeWithFriends'

export default {
  name: 'TimeWithFriendsMarker',
  data () {
    return {
      activeYear: null,
      points: timeWithFriends,
      xTicks: [2010, 2014, 2018, 2020, 2024],
      yTicks: [100, 200, 300, 400]
    }
  },
  computed: {
    plottedPoints () {
      return this.points.map(point => ({ ...point, x: this.xScale(point.year), y: this.yScale(point.annualizedHours) }))
    },
    linePath () {
      return this.plottedPoints.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ')
    },
    areaPath () {
      const first = this.plottedPoints[0]
      const last = this.plottedPoints[this.plottedPoints.length - 1]
      return `${this.linePath} L ${last.x} ${this.yScale(100)} L ${first.x} ${this.yScale(100)} Z`
    },
    activePoint () {
      return this.plottedPoints.find(point => point.year === this.activeYear) || null
    },
    tooltipTransform () {
      if (!this.activePoint) return ''
      const x = Math.min(560, Math.max(68, this.activePoint.x - 85))
      const y = Math.max(45, this.activePoint.y - 84)
      return `translate(${x} ${y})`
    }
  },
  methods: {
    xScale (year) {
      return 62 + ((year - 2010) / 14) * 668
    },
    yScale (value) {
      return 272 - ((value - 100) / 300) * 230
    }
  }
}
</script>

<style scoped>
.friends-time-marker { padding: clamp(1rem, 3vw, 1.6rem); border: 1px solid rgba(38, 27, 23, 0.12); border-radius: 1.1rem; background: radial-gradient(circle at top right, rgba(189, 100, 41, 0.14), transparent 38%), rgba(255, 250, 241, 0.84); }
.friends-time-heading { display: flex; justify-content: space-between; align-items: end; gap: 1rem; }
.friends-time-kicker, .friends-time-marker h2, .friends-time-callout, .friends-time-stats { font-family: "Trend W01 Sns One", "sans-serif"; }
.friends-time-kicker { font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(38, 27, 23, 0.52); }
.friends-time-marker h2 { margin-top: 0.4rem; font-size: clamp(1.25rem, 3vw, 1.9rem); line-height: 1.08; }
.friends-time-callout { flex: none; font-size: clamp(1.7rem, 5vw, 3.2rem); color: #bd6429; }
.friends-time-deck { margin-top: 0.7rem; color: rgba(38, 27, 23, 0.72); }
.friends-time-plot-wrap { margin-top: 1rem; }
.friends-time-plot { display: block; width: 100%; min-width: 560px; }
.friends-grid line { stroke: rgba(38, 27, 23, 0.1); }
.friends-area { fill: rgba(189, 100, 41, 0.12); }
.friends-line { fill: none; stroke: #bd6429; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
.friends-point-visible { fill: #fffaf1; stroke: #bd6429; stroke-width: 3; }
.friends-point-target { fill: transparent; cursor: pointer; }
.friends-point-target:focus { outline: none; stroke: rgba(189, 100, 41, 0.45); stroke-width: 3; }
.friends-pandemic-line { stroke: rgba(38, 27, 23, 0.38); stroke-dasharray: 4 5; }
.friends-pandemic-label, .friends-y-axis text, .friends-x-axis text, .friends-axis-label { font-family: "Sofia W01 Regular1446825", "sans-serif"; font-size: 12px; fill: rgba(38, 27, 23, 0.62); }
.friends-pandemic-label { font-size: 10px; }
.friends-tooltip { pointer-events: none; }
.friends-tooltip rect { fill: #261b17; }
.friends-tooltip text { font-family: "Trend W01 Sns One", "sans-serif"; font-size: 12px; fill: #fffaf1; }
.friends-tooltip-value { fill: #f3b487 !important; }
.friends-tooltip-daily { font-family: "Sofia W01 Regular1446825", "sans-serif" !important; font-size: 11px !important; fill: rgba(255, 250, 241, 0.72) !important; }
.friends-time-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7rem; margin-top: 0.75rem; }
.friends-time-stats div { display: grid; gap: 0.2rem; padding: 0.8rem; border-radius: 0.7rem; background: rgba(38, 27, 23, 0.045); }
.friends-time-stats span { font-size: 0.7rem; color: rgba(38, 27, 23, 0.58); }
.friends-time-stats strong { font-size: clamp(1.05rem, 3vw, 1.45rem); color: #bd6429; }
.friends-time-stats small { font-family: "Sofia W01 Regular1446825", "sans-serif"; color: rgba(38, 27, 23, 0.58); }
.friends-time-note { margin-top: 1rem; font-size: 0.78rem; line-height: 1.55; color: rgba(38, 27, 23, 0.62); }
.friends-time-note a { color: #7b3aed; text-decoration: underline; }
@media (max-width: 620px) {
  .friends-time-heading {
    align-items: start;
    flex-direction: column;
  }

  .friends-time-stats {
    grid-template-columns: 1fr;
  }
}
</style>
