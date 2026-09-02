<template>
  <section class="ai-infrastructure-marker" aria-labelledby="electricity-price-title">
    <header class="ai-infrastructure-heading">
      <div>
        <p>Electricity cost · United States</p>
        <h2 id="electricity-price-title">U.S. city-average electricity price</h2>
      </div>
      <strong>{{ formatPrice(latestPoint.dollarsPerKwh) }}</strong>
    </header>

    <p class="ai-infrastructure-deck">Annual average nominal price per kilowatt-hour, 1995–2024.</p>

    <div class="blog-chart-scroll">
      <svg viewBox="0 0 760 340" role="img" aria-labelledby="electricity-price-chart-title electricity-price-chart-desc">
      <title id="electricity-price-chart-title">U.S. city-average electricity price per kilowatt-hour, 1995 to 2024</title>
      <desc id="electricity-price-chart-desc">A line chart of annual average electricity prices, from 9.36 cents per kilowatt-hour in 1995 to 17.57 cents in 2024.</desc>
      <g class="grid">
        <line v-for="tick in yTicks" :key="tick" x1="70" x2="728" :y1="yScale(tick)" :y2="yScale(tick)" />
      </g>
      <g class="axis-labels">
        <text v-for="tick in yTicks" :key="tick" x="58" :y="yScale(tick) + 4" text-anchor="end">{{ Math.round(tick * 100) }}¢</text>
        <text v-for="year in xTicks" :key="year" :x="xScale(year)" y="306" text-anchor="middle">{{ year }}</text>
      </g>
      <path class="area" :d="areaPath" />
      <path class="line" :d="linePath" />
      <circle :cx="xScale(latestPoint.year)" :cy="yScale(latestPoint.dollarsPerKwh)" r="5" />
      </svg>
    </div>

    <div class="ai-infrastructure-stats">
      <p><span>1995</span><strong>{{ formatPrice(firstPoint.dollarsPerKwh) }}</strong></p>
      <p><span>2024</span><strong>{{ formatPrice(latestPoint.dollarsPerKwh) }}</strong></p>
    </div>

    <p class="ai-infrastructure-note">This BLS consumer price is a national benchmark, not the contracted industrial rate paid by a particular data center. Values are nominal annual averages calculated from the monthly series. Source: <a href="https://fred.stlouisfed.org/series/APU000072610" target="_blank" rel="noopener noreferrer">U.S. Bureau of Labor Statistics via FRED</a>.</p>
  </section>
</template>

<script>
import { electricityPriceSeries } from '~/data/aiInfrastructureTrends'

export default {
  name: 'ElectricityPriceMarker',
  data () { return { points: electricityPriceSeries, yMin: 0.08, yMax: 0.20, yTicks: [0.08, 0.11, 0.14, 0.17, 0.20], xTicks: [1995, 2000, 2005, 2010, 2015, 2020, 2024] } },
  computed: {
    firstPoint () { return this.points[0] },
    latestPoint () { return this.points[this.points.length - 1] },
    plottedPoints () { return this.points.map(point => ({ ...point, x: this.xScale(point.year), y: this.yScale(point.dollarsPerKwh) })) },
    linePath () { return this.plottedPoints.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ') },
    areaPath () { return `${this.linePath} L 728 280 L 70 280 Z` }
  },
  methods: {
    xScale (year) { return 70 + ((year - this.firstPoint.year) / (this.latestPoint.year - this.firstPoint.year)) * 658 },
    yScale (value) { return 280 - ((value - this.yMin) / (this.yMax - this.yMin)) * 230 },
    formatPrice (value) { return `${(value * 100).toFixed(2)}¢/kWh` }
  }
}
</script>

<style scoped>
.ai-infrastructure-marker { --chart-color: #b45c2c; padding: clamp(1rem, 3vw, 1.6rem); border: 1px solid rgba(38, 27, 23, 0.12); border-radius: 1.1rem; background: radial-gradient(circle at top right, rgba(180, 92, 44, 0.14), transparent 38%), rgba(255, 250, 241, 0.84); }
.ai-infrastructure-heading { display: flex; justify-content: space-between; align-items: end; gap: 1rem; }
.ai-infrastructure-heading p, .ai-infrastructure-heading h2, .ai-infrastructure-heading strong, .ai-infrastructure-stats { font-family: "Trend W01 Sns One", "sans-serif"; }
.ai-infrastructure-heading p { font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(38, 27, 23, 0.52); }
.ai-infrastructure-heading h2 { margin-top: 0.4rem; font-size: clamp(1.25rem, 3vw, 1.9rem); line-height: 1.08; }
.ai-infrastructure-heading strong { flex: none; font-size: clamp(1.35rem, 4vw, 2.4rem); color: var(--chart-color); }
.ai-infrastructure-deck { margin-top: 0.7rem; color: rgba(38, 27, 23, 0.72); }
svg { display: block; width: 100%; height: auto; margin-top: 1rem; overflow: visible; }
.grid line { stroke: rgba(38, 27, 23, 0.1); }
.axis-labels text { font-family: "Sofia W01 Regular1446825", "sans-serif"; font-size: 12px; fill: rgba(38, 27, 23, 0.62); }
.area { fill: rgba(180, 92, 44, 0.11); }
.line { fill: none; stroke: var(--chart-color); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
circle { fill: #fffaf1; stroke: var(--chart-color); stroke-width: 3; }
.ai-infrastructure-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.7rem; }
.ai-infrastructure-stats p { display: grid; gap: 0.2rem; padding: 0.8rem; border-radius: 0.7rem; background: rgba(38, 27, 23, 0.045); }
.ai-infrastructure-stats span { font-size: 0.7rem; color: rgba(38, 27, 23, 0.58); }
.ai-infrastructure-stats strong { color: var(--chart-color); }
.ai-infrastructure-note { margin-top: 1rem; font-size: 0.78rem; line-height: 1.55; color: rgba(38, 27, 23, 0.62); }
.ai-infrastructure-note a { color: #7b3aed; text-decoration: underline; }
@media (max-width: 620px) {
  .ai-infrastructure-heading {
    align-items: start;
    flex-direction: column;
  }

  .ai-infrastructure-stats {
    grid-template-columns: 1fr;
  }
}
</style>
