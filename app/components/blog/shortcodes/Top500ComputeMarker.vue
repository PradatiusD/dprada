<template>
  <section class="compute-marker" aria-labelledby="top500-compute-title">
    <header class="compute-heading">
      <div>
        <p>Available compute · 30-year trend</p>
        <h2 id="top500-compute-title">Total performance of the TOP500 systems</h2>
      </div>
      <strong>{{ formatCompute(latestPoint.totalGflops) }}</strong>
    </header>

    <p class="compute-deck">Combined benchmark performance of the 500 systems on each November TOP500 list, 1995–2025. The vertical axis is logarithmic.</p>

    <div class="blog-chart-scroll">
      <svg viewBox="0 0 760 350" role="img" aria-labelledby="top500-compute-chart-title top500-compute-chart-desc">
      <title id="top500-compute-chart-title">Combined performance of the systems in the November TOP500 lists, 1995 to 2025</title>
      <desc id="top500-compute-chart-desc">A logarithmic line chart showing combined TOP500 performance from 4.8 teraflops per second in 1995 to 15.0 exaflops per second in 2025.</desc>
      <g class="compute-grid">
        <line v-for="tick in yTicks" :key="tick.value" x1="78" x2="728" :y1="yScale(tick.value)" :y2="yScale(tick.value)" />
      </g>
      <g class="compute-axis-labels">
        <text v-for="tick in yTicks" :key="tick.value" x="65" :y="yScale(tick.value) + 4" text-anchor="end">{{ tick.label }}</text>
        <text v-for="year in xTicks" :key="year" :x="xScale(year)" y="310" text-anchor="middle">{{ year }}</text>
      </g>
      <path class="compute-line" :d="linePath" />
      <circle :cx="xScale(latestPoint.year)" :cy="yScale(latestPoint.totalGflops)" r="5" />
      </svg>
    </div>

    <div class="compute-stats">
      <p><span>1995 list total</span><strong>{{ formatCompute(firstPoint.totalGflops) }}</strong></p>
      <p><span>2025 list total</span><strong>{{ formatCompute(latestPoint.totalGflops) }}</strong></p>
    </div>

    <p class="compute-note">TOP500 measures LINPACK benchmark performance, not all compute installed worldwide and not AI-specific accelerator capacity. “Sum” is the combined Rmax of every system on a list. Source: <a href="https://www.top500.org/statistics/perfdevel/" target="_blank" rel="noopener noreferrer">TOP500 Performance Development</a>.</p>
  </section>
</template>

<script>
import { top500ComputeSeries } from '~/data/aiInfrastructureTrends'

export default {
  name: 'Top500ComputeMarker',
  data () { return { points: top500ComputeSeries, yMin: 1000, yMax: 20000000000, yTicks: [{ value: 1000, label: '1 TF' }, { value: 1000000, label: '1 PF' }, { value: 1000000000, label: '1 EF' }, { value: 10000000000, label: '10 EF' }], xTicks: [1995, 2000, 2005, 2010, 2015, 2020, 2025] } },
  computed: {
    firstPoint () { return this.points[0] },
    latestPoint () { return this.points[this.points.length - 1] },
    linePath () { return this.points.map((point, index) => `${index ? 'L' : 'M'} ${this.xScale(point.year)} ${this.yScale(point.totalGflops)}`).join(' ') }
  },
  methods: {
    xScale (year) { return 78 + ((year - this.firstPoint.year) / (this.latestPoint.year - this.firstPoint.year)) * 650 },
    yScale (value) { return 282 - ((Math.log10(value) - Math.log10(this.yMin)) / (Math.log10(this.yMax) - Math.log10(this.yMin))) * 232 },
    formatCompute (gflops) {
      if (gflops >= 1000000000) return `${(gflops / 1000000000).toFixed(1)} EFLOP/s`
      if (gflops >= 1000000) return `${(gflops / 1000000).toFixed(1)} PFLOP/s`
      return `${(gflops / 1000).toFixed(1)} TFLOP/s`
    }
  }
}
</script>

<style scoped>
.compute-marker { --chart-color: #316f87; padding: clamp(1rem, 3vw, 1.6rem); border: 1px solid rgba(38, 27, 23, 0.12); border-radius: 1.1rem; background: radial-gradient(circle at top right, rgba(49, 111, 135, 0.14), transparent 38%), rgba(255, 250, 241, 0.84); }
.compute-heading { display: flex; justify-content: space-between; align-items: end; gap: 1rem; }
.compute-heading p, .compute-heading h2, .compute-heading strong, .compute-stats { font-family: "Trend W01 Sns One", "sans-serif"; }
.compute-heading p { font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(38, 27, 23, 0.52); }
.compute-heading h2 { max-width: 18ch; margin-top: 0.4rem; font-size: clamp(1.25rem, 3vw, 1.9rem); line-height: 1.08; }
.compute-heading strong { flex: none; font-size: clamp(1.25rem, 4vw, 2.2rem); color: var(--chart-color); }
.compute-deck { max-width: 44rem; margin-top: 0.7rem; color: rgba(38, 27, 23, 0.72); }
svg { display: block; width: 100%; height: auto; margin-top: 1rem; overflow: visible; }
.compute-grid line { stroke: rgba(38, 27, 23, 0.1); }
.compute-axis-labels text { font-family: "Sofia W01 Regular1446825", "sans-serif"; font-size: 12px; fill: rgba(38, 27, 23, 0.62); }
.compute-line { fill: none; stroke: var(--chart-color); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
circle { fill: #fffaf1; stroke: var(--chart-color); stroke-width: 3; }
.compute-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.7rem; }
.compute-stats p { display: grid; gap: 0.2rem; padding: 0.8rem; border-radius: 0.7rem; background: rgba(38, 27, 23, 0.045); }
.compute-stats span { font-size: 0.7rem; color: rgba(38, 27, 23, 0.58); }
.compute-stats strong { color: var(--chart-color); }
.compute-note { margin-top: 1rem; font-size: 0.78rem; line-height: 1.55; color: rgba(38, 27, 23, 0.62); }
.compute-note a { color: #7b3aed; text-decoration: underline; }
@media (max-width: 620px) {
  .compute-heading {
    align-items: start;
    flex-direction: column;
  }

  .compute-stats {
    grid-template-columns: 1fr;
  }
}
</style>
