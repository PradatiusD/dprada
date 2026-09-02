<template>
  <section class="iq-cohort-marker" aria-labelledby="iq-cohort-title">
    <header class="iq-cohort-heading">
      <div>
        <p class="iq-cohort-kicker">
          Cognitive marker · 25 birth cohorts
        </p>
        <h2 id="iq-cohort-title">
          Norwegian conscript test scores by birth cohort
        </h2>
      </div>
      <strong class="iq-cohort-callout">−2.4</strong>
    </header>

    <p class="iq-cohort-deck">
      Mean IQ-equivalent scores for Norwegian men born from 1967 through 1991. The peak cohort scored about 2.4 points above the 1991 cohort.
    </p>

    <BlogChartScroller class="iq-cohort-plot-wrap">
      <svg
        class="iq-cohort-plot"
        viewBox="0 0 760 330"
        role="img"
        aria-labelledby="iq-cohort-chart-title iq-cohort-chart-description"
      >
        <title id="iq-cohort-chart-title">Mean IQ-equivalent score by Norwegian male birth cohort, 1967 to 1991</title>
        <desc id="iq-cohort-chart-description">Scores increase from about 100.7 in 1967 to a peak of 102.2 in 1975, then decline to about 99.9 in 1991.</desc>

        <g class="iq-grid">
          <line v-for="tick in yTicks" :key="tick" x1="62" x2="730" :y1="yScale(tick)" :y2="yScale(tick)" />
        </g>
        <g class="iq-y-axis">
          <text v-for="tick in yTicks" :key="tick" x="50" :y="yScale(tick) + 4" text-anchor="end">{{ tick }}</text>
        </g>
        <line class="iq-baseline" x1="62" x2="730" :y1="yScale(100)" :y2="yScale(100)" />
        <path class="iq-area" :d="areaPath" />
        <path class="iq-line" :d="linePath" />

        <g v-for="point in plottedPoints" :key="point.year">
          <circle class="iq-point-visible" :class="{ 'iq-point-peak': point.year === 1975 }" :cx="point.x" :cy="point.y" r="4" />
          <circle
            class="iq-point-target"
            :cx="point.x"
            :cy="point.y"
            r="12"
            tabindex="0"
            role="button"
            :aria-label="`${point.year} birth cohort: approximate mean IQ-equivalent score ${point.meanIq.toFixed(1)}`"
            @mouseenter="activeYear = point.year"
            @mouseleave="activeYear = null"
            @focus="activeYear = point.year"
            @blur="activeYear = null"
            @click="activeYear = activeYear === point.year ? null : point.year"
          />
        </g>

        <g v-if="activePoint" class="iq-tooltip" :transform="tooltipTransform">
          <rect width="142" height="55" rx="9" />
          <text x="12" y="21">{{ activePoint.year }} cohort</text>
          <text class="iq-tooltip-value" x="12" y="42">≈ {{ activePoint.meanIq.toFixed(1) }} mean IQ</text>
        </g>

        <g class="iq-x-axis">
          <text v-for="tick in xTicks" :key="tick" :x="xScale(tick)" y="302" text-anchor="middle">{{ tick }}</text>
        </g>
        <text class="iq-axis-label" x="396" y="326" text-anchor="middle">Birth year</text>
      </svg>
    </BlogChartScroller>

    <div class="iq-cohort-stats" aria-label="Selected cohort scores">
      <div><span>1967</span><strong>100.7</strong></div>
      <div class="iq-cohort-stat-peak"><span>1975 peak</span><strong>102.2</strong></div>
      <div><span>1991</span><strong>99.9</strong></div>
    </div>

    <p class="iq-cohort-note">
      This is not a global or current U.S. IQ series. It covers 25 consecutive Norwegian male birth cohorts, generally tested around age 18–19. Values are approximate cohort means digitized from Figure 1A; the peer-reviewed study analyzed 736,808 valid conscription scores and found that both the rise and reversal could be recovered within families. The authors attribute the pattern to environmental rather than genetic-composition changes, but do not identify one specific environmental cause. Source: <a href="https://www.pnas.org/doi/10.1073/pnas.1718793115" target="_blank" rel="noopener noreferrer">Bratsberg &amp; Rogeberg, <em>PNAS</em> (2018)</a>.
    </p>
  </section>
</template>

<script>
import { norwayIqCohorts } from '~/data/norwayIqCohorts'

export default {
  name: 'NorwayIqCohortMarker',
  data () {
    return {
      activeYear: null,
      points: norwayIqCohorts,
      xTicks: [1967, 1975, 1983, 1991],
      yTicks: [99, 100, 101, 102, 103]
    }
  },
  computed: {
    plottedPoints () {
      return this.points.map(point => ({ ...point, x: this.xScale(point.year), y: this.yScale(point.meanIq) }))
    },
    linePath () {
      return this.plottedPoints.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ')
    },
    areaPath () {
      const first = this.plottedPoints[0]
      const last = this.plottedPoints[this.plottedPoints.length - 1]
      return `${this.linePath} L ${last.x} ${this.yScale(99)} L ${first.x} ${this.yScale(99)} Z`
    },
    activePoint () {
      return this.plottedPoints.find(point => point.year === this.activeYear) || null
    },
    tooltipTransform () {
      if (!this.activePoint) return ''
      const x = Math.min(588, Math.max(68, this.activePoint.x - 71))
      const y = Math.max(12, this.activePoint.y - 70)
      return `translate(${x} ${y})`
    }
  },
  methods: {
    xScale (year) {
      return 62 + ((year - 1967) / 24) * 668
    },
    yScale (value) {
      return 272 - ((value - 99) / 4) * 230
    }
  }
}
</script>

<style scoped>
.iq-cohort-marker {
  padding: clamp(1rem, 3vw, 1.6rem);
  border: 1px solid rgba(38, 27, 23, 0.12);
  border-radius: 1.1rem;
  background: radial-gradient(circle at top right, rgba(123, 58, 237, 0.14), transparent 38%), rgba(255, 250, 241, 0.84);
}
.iq-cohort-heading { display: flex; justify-content: space-between; align-items: end; gap: 1rem; }
.iq-cohort-kicker, .iq-cohort-marker h2, .iq-cohort-callout, .iq-cohort-stats { font-family: "Trend W01 Sns One", "sans-serif"; }
.iq-cohort-kicker { font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(38, 27, 23, 0.52); }
.iq-cohort-marker h2 { margin-top: 0.4rem; font-size: clamp(1.25rem, 3vw, 1.9rem); line-height: 1.08; }
.iq-cohort-callout { flex: none; font-size: clamp(1.7rem, 5vw, 3.2rem); color: #7b3aed; }
.iq-cohort-deck { margin-top: 0.7rem; max-width: 58rem; color: rgba(38, 27, 23, 0.72); }
.iq-cohort-plot-wrap { margin-top: 1rem; }
.iq-cohort-plot { display: block; width: 100%; min-width: 560px; }
.iq-grid line { stroke: rgba(38, 27, 23, 0.1); }
.iq-baseline { stroke: rgba(38, 27, 23, 0.3); stroke-dasharray: 5 5; }
.iq-area { fill: rgba(123, 58, 237, 0.12); }
.iq-line { fill: none; stroke: #7b3aed; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
.iq-point-visible { fill: #fffaf1; stroke: #7b3aed; stroke-width: 3; }
.iq-point-peak { fill: #7b3aed; }
.iq-point-target { fill: transparent; cursor: pointer; }
.iq-point-target:focus { outline: none; stroke: rgba(123, 58, 237, 0.45); stroke-width: 3; }
.iq-y-axis text, .iq-x-axis text, .iq-axis-label { font-family: "Sofia W01 Regular1446825", "sans-serif"; font-size: 12px; fill: rgba(38, 27, 23, 0.62); }
.iq-tooltip { pointer-events: none; }
.iq-tooltip rect { fill: #261b17; }
.iq-tooltip text { font-family: "Trend W01 Sns One", "sans-serif"; font-size: 12px; fill: #fffaf1; }
.iq-tooltip-value { fill: #d9c8ff !important; }
.iq-cohort-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7rem; margin-top: 0.75rem; }
.iq-cohort-stats div { display: grid; gap: 0.2rem; padding: 0.8rem; border-radius: 0.7rem; background: rgba(38, 27, 23, 0.045); }
.iq-cohort-stats span { font-size: 0.7rem; color: rgba(38, 27, 23, 0.58); text-transform: uppercase; }
.iq-cohort-stats strong { font-size: clamp(1.1rem, 3vw, 1.55rem); }
.iq-cohort-stat-peak { color: #7b3aed; }
.iq-cohort-note { margin-top: 1rem; font-size: 0.78rem; line-height: 1.55; color: rgba(38, 27, 23, 0.62); }
.iq-cohort-note a { color: #7b3aed; text-decoration: underline; }
@media (max-width: 620px) {
  .iq-cohort-heading {
    align-items: start;
    flex-direction: column;
  }

  .iq-cohort-stats { grid-template-columns: 1fr; }
}
</style>
