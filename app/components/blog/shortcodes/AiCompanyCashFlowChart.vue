<template>
  <section class="ai-cash-flow-chart">
    <header>
      <p class="ai-cash-flow-kicker">
        Free cash flow marker · 2016–2025
      </p>
      <h2 class="ai-cash-flow-title">
        Cash left after capital investment
      </h2>
      <p class="ai-cash-flow-copy">
        Standardized free cash flow: operating cash flow minus cash capital expenditures. Figures are nominal U.S. dollars and use each company’s fiscal year.
      </p>
    </header>

    <div class="ai-cash-flow-legend" aria-label="Companies shown in the chart">
      <span
        v-for="company in companies"
        :key="company.name"
        class="ai-cash-flow-legend-item"
      >
        <span
          class="ai-cash-flow-swatch"
          :style="{ backgroundColor: company.color }"
        />
        {{ company.name }}
      </span>
    </div>

    <div class="blog-chart-scroll">
      <svg
        class="ai-cash-flow-svg"
      viewBox="0 0 1000 560"
      role="img"
      aria-labelledby="ai-cash-flow-title ai-cash-flow-description"
    >
      <title id="ai-cash-flow-title">
        Free cash flow of six major AI and hyperscale computing companies, 2016 to 2025
      </title>
      <desc id="ai-cash-flow-description">
        A line chart of annual free cash flow. Alphabet leads in 2025 at 73.3 billion dollars, followed by Microsoft at 71.6 billion, Nvidia at 60.9 billion, Meta at 46.1 billion, Amazon at 7.7 billion, and Oracle at negative 0.4 billion.
      </desc>

      <g class="ai-cash-flow-grid">
        <line
          v-for="tick in yTicks"
          :key="`grid-${tick}`"
          :class="{ 'ai-cash-flow-zero': tick === 0 }"
          :x1="chart.left"
          :x2="chart.right"
          :y1="yForValue(tick)"
          :y2="yForValue(tick)"
        />
      </g>

      <g class="ai-cash-flow-y-labels">
        <text
          v-for="tick in yTicks"
          :key="`label-${tick}`"
          :x="chart.left - 14"
          :y="yForValue(tick) + 5"
          text-anchor="end"
        >
          {{ formatAxisValue(tick) }}
        </text>
        <text
          class="ai-cash-flow-unit"
          :x="chart.left"
          :y="chart.top - 14"
          text-anchor="start"
        >
          $ billions
        </text>
      </g>

      <g class="ai-cash-flow-x-labels">
        <g v-for="year in years" :key="year">
          <line
            :x1="xForYear(year)"
            :x2="xForYear(year)"
            :y1="chart.bottom"
            :y2="chart.bottom + 8"
          />
          <text
            :x="xForYear(year)"
            :y="chart.bottom + 30"
            text-anchor="middle"
          >
            {{ year }}
          </text>
        </g>
      </g>

      <g
        v-for="company in companies"
        :key="`series-${company.name}`"
      >
        <path
          class="ai-cash-flow-line"
          :d="pathForCompany(company)"
          :style="{ stroke: company.color }"
        />
        <g
          v-for="point in company.points"
          :key="`${company.name}-${point.year}`"
          class="ai-cash-flow-point-target"
          tabindex="0"
          role="img"
          :aria-label="`${company.name}, fiscal year ${point.year}: ${formatBillions(point.freeCashFlow)} free cash flow`"
          @mouseenter="showTooltip(company, point)"
          @mouseleave="hideTooltip"
          @focus="showTooltip(company, point)"
          @blur="hideTooltip"
          @click="showTooltip(company, point)"
          @keydown.enter.prevent="showTooltip(company, point)"
          @keydown.space.prevent="showTooltip(company, point)"
        >
          <circle
            class="ai-cash-flow-hit-area"
            :cx="xForYear(point.year)"
            :cy="yForValue(point.freeCashFlow)"
            r="14"
          />
          <circle
            class="ai-cash-flow-point"
            :class="{ 'ai-cash-flow-point-active': isActivePoint(company, point) }"
            :cx="xForYear(point.year)"
            :cy="yForValue(point.freeCashFlow)"
            :style="{ fill: company.color }"
            r="4"
          />
          <title>{{ company.name }}, FY{{ point.year }}: {{ formatBillions(point.freeCashFlow) }} free cash flow</title>
        </g>
      </g>

      <g
        v-if="activePoint"
        class="ai-cash-flow-tooltip"
        :transform="tooltipTransform"
        aria-hidden="true"
      >
        <rect x="-120" y="-72" width="240" height="72" rx="9" />
        <text class="ai-cash-flow-tooltip-label" x="0" y="-51" text-anchor="middle">
          {{ activePoint.company.name }} · FY{{ activePoint.point.year }}
        </text>
        <text class="ai-cash-flow-tooltip-value" x="0" y="-31" text-anchor="middle">
          {{ formatBillions(activePoint.point.freeCashFlow) }} free cash flow
        </text>
        <text class="ai-cash-flow-tooltip-detail" x="0" y="-12" text-anchor="middle">
          {{ formatBillions(activePoint.point.operatingCashFlow) }} operating cash − {{ formatBillions(activePoint.point.capitalExpenditures) }} capex
        </text>
      </g>
      </svg>
    </div>

    <div class="ai-cash-flow-latest" aria-label="2025 free cash flow by company">
      <div
        v-for="company in companiesByLatestCashFlow"
        :key="`latest-${company.name}`"
        class="ai-cash-flow-latest-item"
      >
        <span class="ai-cash-flow-latest-company">
          <span
            class="ai-cash-flow-dot"
            :style="{ backgroundColor: company.color }"
          />
          {{ company.name }}
        </span>
        <strong>{{ formatBillions(latestPoint(company).freeCashFlow) }}</strong>
      </div>
    </div>

    <p class="ai-cash-flow-note">
      Free cash flow is calculated consistently here as operating cash flow minus cash purchases of property, equipment, and productive assets. It is a derived non-GAAP measure and may differ from company-reported definitions, especially where equipment is acquired through leases. Source: SEC EDGAR Company Facts, using <code>us-gaap:NetCashProvidedByUsedInOperatingActivities</code> and the applicable capital-expenditure tags. Company filings:
      <a
        v-for="(company, index) in companies"
        :key="`source-${company.cik}`"
        :href="companyFactsUrl(company)"
        target="_blank"
        rel="noopener noreferrer"
      >{{ company.name }}{{ index === companies.length - 1 ? '' : index === companies.length - 2 ? ' and ' : ', ' }}</a>.
    </p>
  </section>
</template>

<script>
import { aiCashFlowCompanies } from '~/data/aiCashFlows'

export default {
  name: 'AiCompanyCashFlowChart',
  data () {
    return {
      companies: aiCashFlowCompanies,
      chart: {
        left: 84,
        right: 940,
        top: 46,
        bottom: 470
      },
      activePoint: null,
      yMin: -25,
      yMax: 85
    }
  },
  computed: {
    years () {
      return this.companies[0].points.map(point => point.year)
    },
    yTicks () {
      return [-20, 0, 20, 40, 60, 80]
    },
    companiesByLatestCashFlow () {
      return [...this.companies]
        .sort((left, right) => this.latestPoint(right).freeCashFlow - this.latestPoint(left).freeCashFlow)
    },
    tooltipTransform () {
      if (!this.activePoint) {
        return ''
      }
      const pointX = this.xForYear(this.activePoint.point.year)
      const pointY = this.yForValue(this.activePoint.point.freeCashFlow)
      const x = Math.min(855, Math.max(145, pointX))
      const y = pointY < 115 ? pointY + 90 : pointY - 18
      return `translate(${x} ${y})`
    }
  },
  methods: {
    xForYear (year) {
      const firstYear = this.years[0]
      const lastYear = this.years[this.years.length - 1]
      const width = this.chart.right - this.chart.left
      return this.chart.left + (((year - firstYear) / (lastYear - firstYear)) * width)
    },
    yForValue (value) {
      const height = this.chart.bottom - this.chart.top
      return this.chart.bottom - (((value - this.yMin) / (this.yMax - this.yMin)) * height)
    },
    pathForCompany (company) {
      return company.points
        .map((point, index) => `${index === 0 ? 'M' : 'L'} ${this.xForYear(point.year)} ${this.yForValue(point.freeCashFlow)}`)
        .join(' ')
    },
    latestPoint (company) {
      return company.points[company.points.length - 1]
    },
    showTooltip (company, point) {
      this.activePoint = { company, point }
    },
    hideTooltip () {
      this.activePoint = null
    },
    isActivePoint (company, point) {
      return this.activePoint?.company.name === company.name && this.activePoint?.point.year === point.year
    },
    formatAxisValue (value) {
      return value === 0 ? '$0' : `${value < 0 ? '−' : ''}$${Math.abs(value)}`
    },
    formatBillions (value) {
      return `${value < 0 ? '−' : ''}$${Math.abs(value).toFixed(1)}B`
    },
    companyFactsUrl (company) {
      return `https://data.sec.gov/api/xbrl/companyfacts/CIK${company.cik}.json`
    }
  }
}
</script>

<style scoped>
.ai-cash-flow-chart {
  padding: clamp(1rem, 2.5vw, 1.75rem);
  border: 1px solid rgba(38, 27, 23, 0.12);
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at top right, rgba(93, 139, 53, 0.17), transparent 30%),
    linear-gradient(180deg, rgba(255, 250, 241, 0.98), rgba(241, 239, 226, 0.98));
}

.ai-cash-flow-kicker,
.ai-cash-flow-title,
.ai-cash-flow-legend-item,
.ai-cash-flow-latest {
  font-family: "Trend W01 Sns One", "sans-serif";
}

.ai-cash-flow-kicker {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(38, 27, 23, 0.52);
}

.ai-cash-flow-title {
  max-width: 18ch;
  margin-top: 0.75rem;
  font-size: clamp(1.65rem, 4vw, 2.75rem);
  line-height: 1.02;
}

.ai-cash-flow-copy,
.ai-cash-flow-note {
  font-family: "Sofia W01 Regular1446825", "sans-serif";
}

.ai-cash-flow-copy {
  max-width: 46rem;
  margin-top: 0.9rem;
  line-height: 1.75;
  color: rgba(38, 27, 23, 0.78);
}

.ai-cash-flow-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 1.15rem;
  margin-top: 1.25rem;
}

.ai-cash-flow-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: rgba(38, 27, 23, 0.72);
}

.ai-cash-flow-swatch {
  display: inline-block;
  width: 1.5rem;
  height: 0.24rem;
  border-radius: 999px;
}

.ai-cash-flow-svg {
  width: 100%;
  height: auto;
  margin-top: 1.35rem;
  overflow: visible;
}

.ai-cash-flow-grid line {
  stroke: rgba(38, 27, 23, 0.1);
  stroke-dasharray: 4 6;
}

.ai-cash-flow-grid .ai-cash-flow-zero {
  stroke: rgba(38, 27, 23, 0.32);
  stroke-dasharray: none;
  stroke-width: 1.5;
}

.ai-cash-flow-x-labels line {
  stroke: rgba(38, 27, 23, 0.2);
  stroke-width: 1.2;
}

.ai-cash-flow-y-labels text,
.ai-cash-flow-x-labels text {
  font-family: "Sofia W01 Bold1446843", "sans-serif";
  font-size: 0.78rem;
  letter-spacing: 0.02em;
  fill: rgba(38, 27, 23, 0.68);
}

.ai-cash-flow-y-labels .ai-cash-flow-unit {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ai-cash-flow-line {
  fill: none;
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ai-cash-flow-point {
  stroke: #fffaf1;
  stroke-width: 2;
  transition: r 120ms ease, stroke-width 120ms ease;
}

.ai-cash-flow-hit-area {
  fill: transparent;
  cursor: pointer;
}

.ai-cash-flow-point-target:focus {
  outline: none;
}

.ai-cash-flow-point-target:focus .ai-cash-flow-point,
.ai-cash-flow-point-target:hover .ai-cash-flow-point,
.ai-cash-flow-point-active {
  r: 7;
  stroke-width: 3;
}

.ai-cash-flow-tooltip {
  pointer-events: none;
}

.ai-cash-flow-tooltip rect {
  fill: rgba(38, 27, 23, 0.96);
  stroke: rgba(255, 250, 241, 0.55);
  stroke-width: 1.5;
}

.ai-cash-flow-tooltip text {
  fill: #fffaf1;
}

.ai-cash-flow-tooltip-label {
  font-family: "Sofia W01 Bold1446843", "sans-serif";
  font-size: 12px;
}

.ai-cash-flow-tooltip-value {
  font-family: "Sofia W01 Regular1446825", "sans-serif";
  font-size: 11px;
}

.ai-cash-flow-tooltip-detail {
  font-family: "Sofia W01 Regular1446825", "sans-serif";
  font-size: 9px;
  opacity: 0.8;
}

.ai-cash-flow-latest {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
  margin-top: 0.6rem;
}

.ai-cash-flow-latest-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 0.85rem;
  border: 1px solid rgba(38, 27, 23, 0.1);
  border-radius: 0.8rem;
  background: rgba(255, 250, 241, 0.72);
  font-size: 0.76rem;
}

.ai-cash-flow-latest-company {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-width: 0;
}

.ai-cash-flow-dot {
  flex: 0 0 auto;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
}

.ai-cash-flow-latest-item strong {
  white-space: nowrap;
}

.ai-cash-flow-note {
  margin-top: 1.15rem;
  font-size: 0.88rem;
  line-height: 1.7;
  color: rgba(38, 27, 23, 0.64);
}

.ai-cash-flow-note code {
  font-size: 0.82em;
}

.ai-cash-flow-note a {
  color: #28786d;
  text-decoration: underline;
}

@media screen and (max-width: 700px) {
  .ai-cash-flow-latest {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ai-cash-flow-line {
    stroke-width: 4.5;
  }
}

@media screen and (max-width: 430px) {
  .ai-cash-flow-latest {
    grid-template-columns: 1fr;
  }
}
</style>
