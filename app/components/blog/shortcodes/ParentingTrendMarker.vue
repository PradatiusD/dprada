<template>
  <section class="parenting-trend-marker" :style="{ '--marker-color': color }" :aria-labelledby="`${markerId}-heading`">
    <header class="parenting-trend-heading">
      <div>
        <p class="parenting-trend-kicker">{{ kicker }}</p>
        <h2 :id="`${markerId}-heading`">{{ title }}</h2>
      </div>
      <strong>{{ callout }}</strong>
    </header>

    <p class="parenting-trend-deck">{{ deck }}</p>

    <div class="parenting-trend-plot-wrap">
      <svg
        class="parenting-trend-plot"
        viewBox="0 0 760 330"
        role="img"
        :aria-labelledby="`${markerId}-chart-title ${markerId}-chart-description`"
      >
        <title :id="`${markerId}-chart-title`">{{ chartTitle }}</title>
        <desc :id="`${markerId}-chart-description`">{{ chartDescription }}</desc>

        <g class="parenting-grid">
          <line v-for="tick in yTicks" :key="tick" x1="66" x2="730" :y1="yScale(tick)" :y2="yScale(tick)" />
        </g>
        <g class="parenting-y-axis">
          <text v-for="tick in yTicks" :key="tick" x="55" :y="yScale(tick) + 4" text-anchor="end">{{ formatTick(tick) }}</text>
        </g>

        <path class="parenting-area" :d="areaPath" />
        <path class="parenting-line" :d="linePath" />

        <g v-for="(point, index) in plottedPoints" :key="point.year">
          <circle class="parenting-point-visible" :cx="point.x" :cy="point.y" r="4.5" />
          <circle
            class="parenting-point-target"
            :cx="point.x"
            :cy="point.y"
            r="14"
            tabindex="0"
            role="button"
            :aria-label="`${point.year}: ${formatValue(point.value)} ${unit}${point.basis ? `; ${point.basis}` : ''}`"
            @mouseenter="activeIndex = index"
            @mouseleave="activeIndex = null"
            @focus="activeIndex = index"
            @blur="activeIndex = null"
            @click="activeIndex = activeIndex === index ? null : index"
            @keydown.enter.prevent="activeIndex = index"
            @keydown.space.prevent="activeIndex = index"
          />
        </g>

        <g v-if="activePoint" class="parenting-tooltip" :transform="tooltipTransform">
          <rect width="210" :height="activePoint.basis ? 78 : 62" rx="9" />
          <text x="12" y="21">{{ activePoint.year }}</text>
          <text class="parenting-tooltip-value" x="12" y="46">{{ formatValue(activePoint.value) }} {{ unit }}</text>
          <text v-if="activePoint.basis" class="parenting-tooltip-basis" x="12" y="66">{{ activePoint.basis }}</text>
        </g>

        <g class="parenting-x-axis">
          <text v-for="point in xAxisPoints" :key="point.year" :x="point.x" y="302" text-anchor="middle">{{ point.year }}</text>
        </g>
        <text class="parenting-axis-label" x="398" y="326" text-anchor="middle">{{ xAxisLabel }}</text>
      </svg>
    </div>

    <div class="parenting-trend-stats">
      <div>
        <span>{{ firstPoint.year }}</span>
        <strong>{{ formatValue(firstPoint.value) }}</strong>
        <small>{{ unit }}</small>
      </div>
      <div>
        <span>{{ latestPoint.year }}</span>
        <strong>{{ formatValue(latestPoint.value) }}</strong>
        <small>{{ unit }}</small>
      </div>
    </div>

    <p class="parenting-trend-note"><slot name="note" /></p>
  </section>
</template>

<script>
export default {
  name: 'ParentingTrendMarker',
  props: {
    markerId: { type: String, required: true },
    kicker: { type: String, required: true },
    title: { type: String, required: true },
    callout: { type: String, required: true },
    deck: { type: String, required: true },
    chartTitle: { type: String, required: true },
    chartDescription: { type: String, required: true },
    points: { type: Array, required: true },
    unit: { type: String, required: true },
    decimals: { type: Number, default: 1 },
    yMin: { type: Number, required: true },
    yMax: { type: Number, required: true },
    yTicks: { type: Array, required: true },
    xAxisLabel: { type: String, default: 'Observation year' },
    color: { type: String, default: '#7b3aed' }
  },
  data () {
    return { activeIndex: null }
  },
  computed: {
    firstPoint () { return this.points[0] },
    latestPoint () { return this.points[this.points.length - 1] },
    plottedPoints () {
      return this.points.map(point => ({ ...point, x: this.xScale(point.year), y: this.yScale(point.value) }))
    },
    xAxisPoints () {
      if (this.plottedPoints.length <= 10) return this.plottedPoints
      return this.plottedPoints.filter((point, index) => index % 10 === 0 || index === this.plottedPoints.length - 1)
    },
    linePath () {
      return this.plottedPoints.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ')
    },
    areaPath () {
      const first = this.plottedPoints[0]
      const last = this.plottedPoints[this.plottedPoints.length - 1]
      return `${this.linePath} L ${last.x} ${this.yScale(this.yMin)} L ${first.x} ${this.yScale(this.yMin)} Z`
    },
    activePoint () {
      return this.activeIndex === null ? null : this.plottedPoints[this.activeIndex]
    },
    tooltipTransform () {
      if (!this.activePoint) return ''
      const x = Math.min(536, Math.max(68, this.activePoint.x - 95))
      const y = Math.max(36, this.activePoint.y - 76)
      return `translate(${x} ${y})`
    }
  },
  methods: {
    xScale (year) {
      const firstYear = this.points[0].year
      const lastYear = this.points[this.points.length - 1].year
      return 66 + ((year - firstYear) / (lastYear - firstYear)) * 664
    },
    yScale (value) {
      return 272 - ((value - this.yMin) / (this.yMax - this.yMin)) * 224
    },
    formatValue (value) { return Number(value).toFixed(this.decimals) },
    formatTick (value) { return Number(value).toFixed(this.decimals > 1 ? 1 : 0) }
  }
}
</script>

<style scoped>
.parenting-trend-marker { padding: clamp(1rem, 3vw, 1.6rem); border: 1px solid rgba(38, 27, 23, 0.12); border-radius: 1.1rem; background: radial-gradient(circle at top right, color-mix(in srgb, var(--marker-color) 15%, transparent), transparent 38%), rgba(255, 250, 241, 0.84); }
.parenting-trend-heading { display: flex; justify-content: space-between; align-items: end; gap: 1rem; }
.parenting-trend-kicker, .parenting-trend-marker h2, .parenting-trend-heading > strong, .parenting-trend-stats { font-family: "Trend W01 Sns One", "sans-serif"; }
.parenting-trend-kicker { font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(38, 27, 23, 0.52); }
.parenting-trend-marker h2 { margin-top: 0.4rem; font-size: clamp(1.25rem, 3vw, 1.9rem); line-height: 1.08; }
.parenting-trend-heading > strong { flex: none; font-size: clamp(1.6rem, 5vw, 3rem); color: var(--marker-color); }
.parenting-trend-deck { margin-top: 0.7rem; color: rgba(38, 27, 23, 0.72); }
.parenting-trend-plot-wrap { margin-top: 1rem; overflow-x: auto; }
.parenting-trend-plot { display: block; width: 100%; min-width: 590px; }
.parenting-grid line { stroke: rgba(38, 27, 23, 0.1); }
.parenting-area { fill: color-mix(in srgb, var(--marker-color) 12%, transparent); }
.parenting-line { fill: none; stroke: var(--marker-color); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }
.parenting-point-visible { fill: #fffaf1; stroke: var(--marker-color); stroke-width: 3; }
.parenting-point-target { fill: transparent; cursor: pointer; }
.parenting-point-target:focus { outline: none; stroke: color-mix(in srgb, var(--marker-color) 48%, transparent); stroke-width: 3; }
.parenting-y-axis text, .parenting-x-axis text, .parenting-axis-label { font-family: "Sofia W01 Regular1446825", "sans-serif"; font-size: 12px; fill: rgba(38, 27, 23, 0.62); }
.parenting-tooltip { pointer-events: none; }
.parenting-tooltip rect { fill: #261b17; }
.parenting-tooltip text { font-family: "Trend W01 Sns One", "sans-serif"; font-size: 12px; fill: #fffaf1; }
.parenting-tooltip-value { fill: color-mix(in srgb, var(--marker-color) 45%, white) !important; }
.parenting-tooltip-basis { font-family: "Sofia W01 Regular1446825", "sans-serif" !important; font-size: 10px !important; fill: rgba(255, 250, 241, 0.72) !important; }
.parenting-trend-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.7rem; margin-top: 0.75rem; }
.parenting-trend-stats div { display: grid; gap: 0.2rem; padding: 0.8rem; border-radius: 0.7rem; background: rgba(38, 27, 23, 0.045); }
.parenting-trend-stats span { font-size: 0.7rem; color: rgba(38, 27, 23, 0.58); }
.parenting-trend-stats strong { font-size: clamp(1.05rem, 3vw, 1.45rem); color: var(--marker-color); }
.parenting-trend-stats small { font-family: "Sofia W01 Regular1446825", "sans-serif"; color: rgba(38, 27, 23, 0.58); }
.parenting-trend-note { margin-top: 1rem; font-size: 0.78rem; line-height: 1.55; color: rgba(38, 27, 23, 0.62); }
.parenting-trend-note :deep(a) { color: #7b3aed; text-decoration: underline; }
@media (max-width: 620px) { .parenting-trend-heading { align-items: start; flex-direction: column; } }
</style>
