<template>
  <section class="covid-scores-chart" aria-labelledby="covid-scores-title">
    <header>
      <p class="covid-scores-kicker">Nationally representative U.S. sample · age 9</p>
      <h2 id="covid-scores-title">NAEP scores in 2020 and 2022</h2>
      <p class="covid-scores-deck">Mean long-term-trend reading and mathematics scores before and after two years of pandemic disruption.</p>
    </header>

    <div class="covid-scores-legend" aria-hidden="true">
      <span><i class="covid-scores-reading-key" />Reading</span>
      <span><i class="covid-scores-math-key" />Mathematics</span>
    </div>

    <BlogChartScroller class="covid-scores-plot-wrap" label="Scrollable chart comparing age-nine NAEP scores in 2020 and 2022.">
      <svg class="covid-scores-plot" viewBox="0 0 760 390" role="img" aria-labelledby="covid-scores-svg-title covid-scores-svg-desc">
        <title id="covid-scores-svg-title">Average NAEP scores for U.S. 9-year-olds in 2020 and 2022</title>
        <desc id="covid-scores-svg-desc">Reading declines from 220 to 215 points, while mathematics declines from 241 to 234 points.</desc>

        <g class="covid-scores-grid">
          <line v-for="tick in yTicks" :key="tick" x1="72" x2="710" :y1="yScale(tick)" :y2="yScale(tick)" />
        </g>
        <g class="covid-scores-y-axis">
          <text v-for="tick in yTicks" :key="tick" x="58" :y="yScale(tick) + 4" text-anchor="end">{{ tick }}</text>
          <text class="covid-scores-axis-label" x="72" y="25">NAEP scale score (0–500)</text>
        </g>

        <g v-for="series in seriesList" :key="series.key">
          <path :class="`covid-scores-line covid-scores-line-${series.key}`" :d="seriesPath(series.key)" />
          <g v-for="point in plottedPoints" :key="`${series.key}-${point.year}`">
            <circle :class="`covid-scores-point covid-scores-point-${series.key}`" :cx="point.x" :cy="point[`${series.key}Y`]" r="6" />
            <circle
              class="covid-scores-target"
              :cx="point.x"
              :cy="point[`${series.key}Y`]"
              r="17"
              tabindex="0"
              role="button"
              :aria-label="`${point.year} ${series.label}: ${point[series.key]} points`"
              @mouseenter="activeDatum = { year: point.year, key: series.key }"
              @mouseleave="activeDatum = null"
              @focus="activeDatum = { year: point.year, key: series.key }"
              @blur="activeDatum = null"
              @click="toggleDatum(point.year, series.key)"
              @keydown.enter.prevent="activeDatum = { year: point.year, key: series.key }"
              @keydown.space.prevent="activeDatum = { year: point.year, key: series.key }"
            />
          </g>
        </g>

        <g class="covid-scores-change-labels" aria-hidden="true">
          <text x="390" :y="yScale(217.5) - 10">−5 reading points</text>
          <text x="390" :y="yScale(237.5) - 10">−7 math points</text>
        </g>

        <g v-if="activePoint" class="covid-scores-tooltip" :transform="tooltipTransform" aria-hidden="true">
          <rect width="155" height="57" rx="9" />
          <text x="12" y="21">{{ activePoint.year }} · {{ activeSeries.label }}</text>
          <text class="covid-scores-tooltip-value" x="12" y="43">{{ activePoint[activeSeries.key] }} points</text>
        </g>

        <g class="covid-scores-x-axis">
          <text v-for="point in plottedPoints" :key="point.year" :x="point.x" y="362" text-anchor="middle">{{ point.year }}</text>
        </g>
      </svg>
    </BlogChartScroller>

    <div class="covid-scores-summary" aria-label="Score changes from 2020 to 2022">
      <div><span>Reading</span><strong>220 → 215</strong><b>−5 points</b></div>
      <div><span>Mathematics</span><strong>241 → 234</strong><b>−7 points</b></div>
    </div>

    <p class="covid-scores-note">
      Tests were administered from January through March in both years; the 2020 assessment concluded as COVID-19 began disrupting U.S. schools. About 7,400 9-year-olds from 410 schools participated in each subject in 2022. Both declines were statistically significant. NAEP describes population-level change but is not designed to prove that one factor caused the difference. Source: <a href="https://www.nationsreportcard.gov/highlights/ltt/2022/" target="_blank" rel="noopener noreferrer">National Center for Education Statistics, 2022 NAEP Long-Term Trend results</a>.
    </p>
  </section>
</template>

<script>
import { ageNineNaepScores } from '~/data/ageNineNaepScores'

export default {
  name: 'CovidYoungChildrenScoresChart',
  data () {
    return {
      activeDatum: null,
      points: ageNineNaepScores,
      seriesList: [
        { key: 'reading', label: 'Reading' },
        { key: 'mathematics', label: 'Mathematics' }
      ],
      yTicks: [210, 220, 230, 240, 250]
    }
  },
  computed: {
    plottedPoints () {
      return this.points.map(point => ({
        ...point,
        x: this.xScale(point.year),
        readingY: this.yScale(point.reading),
        mathematicsY: this.yScale(point.mathematics)
      }))
    },
    activePoint () {
      return this.plottedPoints.find(point => point.year === this.activeDatum?.year) || null
    },
    activeSeries () {
      return this.seriesList.find(series => series.key === this.activeDatum?.key) || this.seriesList[0]
    },
    tooltipTransform () {
      if (!this.activePoint) return ''
      const x = this.activePoint.x > 500 ? this.activePoint.x - 175 : this.activePoint.x + 20
      const y = Math.max(12, this.activePoint[`${this.activeSeries.key}Y`] - 30)
      return `translate(${x} ${y})`
    }
  },
  methods: {
    xScale (year) {
      return year === 2020 ? 170 : 610
    },
    yScale (score) {
      return 330 - ((score - 210) / 40) * 285
    },
    seriesPath (key) {
      return this.plottedPoints.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point[`${key}Y`]}`).join(' ')
    },
    toggleDatum (year, key) {
      const isActive = this.activeDatum?.year === year && this.activeDatum?.key === key
      this.activeDatum = isActive ? null : { year, key }
    }
  }
}
</script>

<style scoped>
.covid-scores-chart { padding: clamp(1rem, 3vw, 1.6rem); border: 1px solid rgba(38, 27, 23, 0.12); border-radius: 1.1rem; background: radial-gradient(circle at top right, rgba(31, 132, 122, 0.14), transparent 38%), rgba(255, 250, 241, 0.84); }
.covid-scores-kicker, .covid-scores-chart h2, .covid-scores-legend, .covid-scores-summary { font-family: "Trend W01 Sns One", "sans-serif"; }
.covid-scores-kicker { font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(38, 27, 23, 0.52); }
.covid-scores-chart h2 { margin-top: 0.4rem; font-size: clamp(1.35rem, 3.5vw, 2.1rem); line-height: 1.08; }
.covid-scores-deck { margin-top: 0.7rem; max-width: 56rem; color: rgba(38, 27, 23, 0.72); }
.covid-scores-legend { display: flex; gap: 1.2rem; margin-top: 1rem; font-size: 0.76rem; }
.covid-scores-legend span { display: flex; gap: 0.4rem; align-items: center; }
.covid-scores-legend i { display: inline-block; width: 1.5rem; height: 0.24rem; border-radius: 999px; }
.covid-scores-reading-key { background: #2966b3; }
.covid-scores-math-key { background: #d15f32; }
.covid-scores-plot-wrap { margin-top: 0.5rem; }
.covid-scores-plot { display: block; width: 100%; min-width: 560px; }
.covid-scores-grid line { stroke: rgba(38, 27, 23, 0.1); stroke-dasharray: 4 6; }
.covid-scores-y-axis text, .covid-scores-x-axis text { font-family: "Sofia W01 Regular1446825", "sans-serif"; font-size: 12px; fill: rgba(38, 27, 23, 0.62); }
.covid-scores-axis-label { font-size: 11px !important; text-transform: uppercase; letter-spacing: 0.08em; }
.covid-scores-line { fill: none; stroke-width: 5; stroke-linecap: round; }
.covid-scores-line-reading { stroke: #2966b3; }
.covid-scores-line-mathematics { stroke: #d15f32; }
.covid-scores-point { fill: #fffaf1; stroke-width: 4; }
.covid-scores-point-reading { stroke: #2966b3; }
.covid-scores-point-mathematics { stroke: #d15f32; }
.covid-scores-target { fill: transparent; cursor: pointer; }
.covid-scores-target:focus { outline: none; stroke: rgba(38, 27, 23, 0.35); stroke-width: 3; }
.covid-scores-change-labels text { font-family: "Trend W01 Sns One", "sans-serif"; font-size: 12px; fill: rgba(38, 27, 23, 0.72); text-anchor: middle; }
.covid-scores-tooltip { pointer-events: none; }
.covid-scores-tooltip rect { fill: #261b17; }
.covid-scores-tooltip text { font-family: "Trend W01 Sns One", "sans-serif"; font-size: 11px; fill: #fffaf1; }
.covid-scores-tooltip-value { fill: #bfeae4 !important; }
.covid-scores-summary { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.7rem; margin-top: 0.8rem; }
.covid-scores-summary div { display: grid; grid-template-columns: 1fr auto; gap: 0.25rem 0.7rem; padding: 0.9rem; border-radius: 0.7rem; background: rgba(38, 27, 23, 0.045); }
.covid-scores-summary span { grid-column: 1 / -1; font-size: 0.7rem; color: rgba(38, 27, 23, 0.58); text-transform: uppercase; }
.covid-scores-summary strong { font-size: clamp(1.05rem, 3vw, 1.45rem); }
.covid-scores-summary b { align-self: center; color: #b34a22; font-size: 0.82rem; }
.covid-scores-note { margin-top: 1rem; font-size: 0.78rem; line-height: 1.55; color: rgba(38, 27, 23, 0.62); }
.covid-scores-note a { color: #19756c; text-decoration: underline; }
@media (max-width: 620px) { .covid-scores-summary { grid-template-columns: 1fr; } }
</style>
