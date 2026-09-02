<template>
  <section class="ai-profit-chart">
    <header>
      <p class="ai-profit-chart-kicker">
        Economics Trends · 2016–2025
      </p>
      <h2 class="ai-profit-chart-title">
        Annual Net Income
      </h2>
      <p class="ai-profit-chart-copy">
        Annual company-wide net income, fiscal years 2016–2025. Figures are nominal U.S. dollars.
      </p>
    </header>

    <div class="ai-profit-chart-legend" aria-label="Companies shown in the chart">
      <span
        v-for="company in companies"
        :key="company.name"
        class="ai-profit-chart-legend-item"
      >
        <span
          class="ai-profit-chart-swatch"
          :style="{ backgroundColor: company.color }"
        />
        {{ company.name }}
      </span>
    </div>

    <div class="blog-chart-scroll">
      <svg
        class="ai-profit-chart-svg"
      viewBox="0 0 1000 560"
      role="img"
      aria-labelledby="ai-profit-chart-title ai-profit-chart-description"
    >
      <title id="ai-profit-chart-title">
        Net income of six major AI and hyperscale computing companies, 2016 to 2025
      </title>
      <desc id="ai-profit-chart-description">
        A line chart of annual net income. Alphabet leads in 2025 at 132.2 billion dollars, followed by Microsoft at 101.8 billion, Amazon at 77.7 billion, Nvidia at 72.9 billion, Meta at 60.5 billion, and Oracle at 12.4 billion.
      </desc>

      <g class="ai-profit-chart-grid">
        <line
          v-for="tick in yTicks"
          :key="`grid-${tick}`"
          :class="{ 'ai-profit-chart-zero': tick === 0 }"
          :x1="chart.left"
          :x2="chart.right"
          :y1="yForValue(tick)"
          :y2="yForValue(tick)"
        />
      </g>

      <g class="ai-profit-chart-y-labels">
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
          class="ai-profit-chart-unit"
          :x="chart.left"
          :y="chart.top - 14"
          text-anchor="start"
        >
          $ billions
        </text>
      </g>

      <g class="ai-profit-chart-x-labels">
        <g
          v-for="year in years"
          :key="year"
        >
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
          class="ai-profit-chart-line"
          :d="pathForCompany(company)"
          :style="{ stroke: company.color }"
        />
        <g
          v-for="point in company.points"
          :key="`${company.name}-${point.year}`"
          class="ai-profit-chart-point-target"
          tabindex="0"
          role="img"
          :aria-label="`${company.name}, fiscal year ${point.year}: ${formatBillions(point.netIncome)} net income`"
          @mouseenter="showTooltip(company, point)"
          @mouseleave="hideTooltip"
          @focus="showTooltip(company, point)"
          @blur="hideTooltip"
          @click="showTooltip(company, point)"
          @keydown.enter.prevent="showTooltip(company, point)"
          @keydown.space.prevent="showTooltip(company, point)"
        >
          <circle
            class="ai-profit-chart-hit-area"
            :cx="xForYear(point.year)"
            :cy="yForValue(point.netIncome)"
            r="14"
          />
          <circle
            class="ai-profit-chart-point"
            :class="{ 'ai-profit-chart-point-active': isActivePoint(company, point) }"
            :cx="xForYear(point.year)"
            :cy="yForValue(point.netIncome)"
            :style="{ fill: company.color }"
            r="4"
          />
          <title>{{ company.name }}, FY{{ point.year }}: {{ formatBillions(point.netIncome) }}</title>
        </g>
      </g>

      <g
        v-if="activePoint"
        class="ai-profit-chart-tooltip"
        :transform="tooltipTransform"
        aria-hidden="true"
      >
        <rect x="-86" y="-54" width="172" height="54" rx="9" />
        <text class="ai-profit-chart-tooltip-label" x="0" y="-33" text-anchor="middle">
          {{ activePoint.company.name }} · FY{{ activePoint.point.year }}
        </text>
        <text class="ai-profit-chart-tooltip-value" x="0" y="-12" text-anchor="middle">
          {{ formatBillions(activePoint.point.netIncome) }} net income
        </text>
      </g>
      </svg>
    </div>

    <div class="ai-profit-chart-latest" aria-label="2025 net income by company">
      <div
        v-for="company in companiesByLatestProfit"
        :key="`latest-${company.name}`"
        class="ai-profit-chart-latest-item"
      >
        <span class="ai-profit-chart-latest-company">
          <span
            class="ai-profit-chart-dot"
            :style="{ backgroundColor: company.color }"
          />
          {{ company.name }}
        </span>
        <strong>{{ formatBillions(latestPoint(company).netIncome) }}</strong>
      </div>
    </div>

    <p class="ai-profit-chart-note">
      “Profit” means consolidated net income, not profit attributed specifically to AI. Fiscal years differ by company, so labels follow each filer’s fiscal-year designation. Source: SEC EDGAR Company Facts, <code>us-gaap:NetIncomeLoss</code>, from the 10-K filings of
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
import { aiProfitCompanies } from '~/data/aiProfits'

export default {
  name: 'AiCompanyProfitsChart',
  data () {
    return {
      companies: aiProfitCompanies,
      chart: {
        left: 84,
        right: 940,
        top: 46,
        bottom: 470
      },
      activePoint: null,
      yMin: -10,
      yMax: 140
    }
  },
  computed: {
    years () {
      return this.companies[0].points.map(point => point.year)
    },
    yTicks () {
      return [0, 25, 50, 75, 100, 125]
    },
    companiesByLatestProfit () {
      return [...this.companies]
        .sort((left, right) => this.latestPoint(right).netIncome - this.latestPoint(left).netIncome)
    },
    tooltipTransform () {
      if (!this.activePoint) {
        return ''
      }
      const pointX = this.xForYear(this.activePoint.point.year)
      const pointY = this.yForValue(this.activePoint.point.netIncome)
      const x = Math.min(900, Math.max(110, pointX))
      const y = pointY < 100 ? pointY + 72 : pointY - 18
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
        .map((point, index) => `${index === 0 ? 'M' : 'L'} ${this.xForYear(point.year)} ${this.yForValue(point.netIncome)}`)
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
      return value === 0 ? '$0' : `$${value}`
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
.ai-profit-chart {
  padding: clamp(1rem, 2.5vw, 1.75rem);
  border: 1px solid rgba(38, 27, 23, 0.12);
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at top right, rgba(53, 102, 168, 0.16), transparent 30%),
    linear-gradient(180deg, rgba(255, 250, 241, 0.98), rgba(243, 237, 227, 0.98));
}

.ai-profit-chart-kicker,
.ai-profit-chart-title,
.ai-profit-chart-legend-item,
.ai-profit-chart-latest {
  font-family: "Trend W01 Sns One", "sans-serif";
}

.ai-profit-chart-kicker {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(38, 27, 23, 0.52);
}

.ai-profit-chart-title {
  max-width: 16ch;
  margin-top: 0.75rem;
  font-size: clamp(1.65rem, 4vw, 2.75rem);
  line-height: 1.02;
}

.ai-profit-chart-copy,
.ai-profit-chart-note {
  font-family: "Sofia W01 Regular1446825", "sans-serif";
}

.ai-profit-chart-copy {
  max-width: 46rem;
  margin-top: 0.9rem;
  line-height: 1.75;
  color: rgba(38, 27, 23, 0.78);
}

.ai-profit-chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 1.15rem;
  margin-top: 1.25rem;
}

.ai-profit-chart-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: rgba(38, 27, 23, 0.72);
}

.ai-profit-chart-swatch {
  display: inline-block;
  width: 1.5rem;
  height: 0.24rem;
  border-radius: 999px;
}

.ai-profit-chart-svg {
  width: 100%;
  height: auto;
  margin-top: 1.35rem;
  overflow: visible;
}

.ai-profit-chart-grid line {
  stroke: rgba(38, 27, 23, 0.1);
  stroke-dasharray: 4 6;
}

.ai-profit-chart-grid .ai-profit-chart-zero {
  stroke: rgba(38, 27, 23, 0.32);
  stroke-dasharray: none;
  stroke-width: 1.5;
}

.ai-profit-chart-x-labels line {
  stroke: rgba(38, 27, 23, 0.2);
  stroke-width: 1.2;
}

.ai-profit-chart-y-labels text,
.ai-profit-chart-x-labels text {
  font-family: "Sofia W01 Bold1446843", "sans-serif";
  font-size: 0.78rem;
  letter-spacing: 0.02em;
  fill: rgba(38, 27, 23, 0.68);
}

.ai-profit-chart-y-labels .ai-profit-chart-unit {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ai-profit-chart-line {
  fill: none;
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ai-profit-chart-point {
  stroke: #fffaf1;
  stroke-width: 2;
  transition: r 120ms ease, stroke-width 120ms ease;
}

.ai-profit-chart-hit-area {
  fill: transparent;
  cursor: pointer;
}

.ai-profit-chart-point-target:focus {
  outline: none;
}

.ai-profit-chart-point-target:focus .ai-profit-chart-point,
.ai-profit-chart-point-target:hover .ai-profit-chart-point,
.ai-profit-chart-point-active {
  r: 7;
  stroke-width: 3;
}

.ai-profit-chart-tooltip {
  pointer-events: none;
}

.ai-profit-chart-tooltip rect {
  fill: rgba(38, 27, 23, 0.96);
  stroke: rgba(255, 250, 241, 0.55);
  stroke-width: 1.5;
}

.ai-profit-chart-tooltip text {
  fill: #fffaf1;
}

.ai-profit-chart-tooltip-label {
  font-family: "Sofia W01 Bold1446843", "sans-serif";
  font-size: 12px;
}

.ai-profit-chart-tooltip-value {
  font-family: "Sofia W01 Regular1446825", "sans-serif";
  font-size: 11px;
}

.ai-profit-chart-latest {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
  margin-top: 0.6rem;
}

.ai-profit-chart-latest-item {
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

.ai-profit-chart-latest-company {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-width: 0;
}

.ai-profit-chart-dot {
  flex: 0 0 auto;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
}

.ai-profit-chart-latest-item strong {
  white-space: nowrap;
}

.ai-profit-chart-note {
  margin-top: 1.15rem;
  font-size: 0.88rem;
  line-height: 1.7;
  color: rgba(38, 27, 23, 0.64);
}

.ai-profit-chart-note code {
  font-size: 0.82em;
}

.ai-profit-chart-note a {
  color: #28786d;
  text-decoration: underline;
}

@media screen and (max-width: 700px) {
  .ai-profit-chart-latest {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ai-profit-chart-line {
    stroke-width: 4.5;
  }

  .ai-profit-chart-point {
    r: 5;
  }

}

@media screen and (max-width: 430px) {
  .ai-profit-chart-latest {
    grid-template-columns: 1fr;
  }

}
</style>
