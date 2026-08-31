<template>
  <section class="software-workforce-chart" aria-labelledby="software-workforce-title">
    <header>
      <p class="software-workforce-kicker">
        U.S. labor marker · BLS 2025–2035
      </p>
      <h2 id="software-workforce-title">
        Software Job Development Projections
      </h2>
      <p class="software-workforce-copy">
        National employment for software developers, quality assurance analysts, and testers.
      </p>
    </header>

    <div
      class="software-workforce-bars"
      role="img"
      :aria-label="`The BLS reports ${formatNumber(projection.baselineEmployment)} jobs in ${projection.baselineYear} and projects ${formatNumber(projection.projectedEmployment)} jobs in ${projection.projectionYear}, an increase of ${formatNumber(projection.projectedChange)} jobs.`"
    >
      <div class="software-workforce-row">
        <div class="software-workforce-row-label">
          <span>{{ projection.baselineYear }}</span>
          <strong>{{ formatCompact(projection.baselineEmployment) }}</strong>
        </div>
        <div class="software-workforce-track">
          <span
            class="software-workforce-bar software-workforce-bar-current"
            :style="{ width: `${baselineWidth}%` }"
          />
        </div>
        <span class="software-workforce-exact">{{ formatNumber(projection.baselineEmployment) }} jobs</span>
      </div>

      <div class="software-workforce-row">
        <div class="software-workforce-row-label">
          <span>{{ projection.projectionYear }}</span>
          <strong>{{ formatCompact(projection.projectedEmployment) }}</strong>
        </div>
        <div class="software-workforce-track">
          <span class="software-workforce-bar software-workforce-bar-projected" />
        </div>
        <span class="software-workforce-exact">{{ formatNumber(projection.projectedEmployment) }} projected jobs</span>
      </div>
    </div>

    <div class="software-workforce-change">
      <strong>+{{ formatNumber(projection.projectedChange) }}</strong>
      <span>net jobs over ten years</span>
      <b>+{{ projection.projectedGrowthPercent }}%</b>
    </div>

    <p class="software-workforce-note">
      This BLS occupational group includes software developers plus software quality assurance analysts and testers. The {{ projection.projectionYear }} figure is a projection, not a forecast of AI-specific employment. Source:
      <a href="https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm" target="_blank" rel="noopener noreferrer">U.S. Bureau of Labor Statistics, Occupational Outlook Handbook</a>.
    </p>
  </section>
</template>

<script>
import { softwareWorkforceProjection } from '~/data/softwareWorkforce'

export default {
  name: 'SoftwareDeveloperWorkforceChart',
  data () {
    return {
      projection: softwareWorkforceProjection
    }
  },
  computed: {
    baselineWidth () {
      return (this.projection.baselineEmployment / this.projection.projectedEmployment) * 100
    }
  },
  methods: {
    formatNumber (value) {
      return new Intl.NumberFormat('en-US').format(value)
    },
    formatCompact (value) {
      return `${(value / 1000000).toFixed(2)}M`
    }
  }
}
</script>

<style scoped>
.software-workforce-chart {
  padding: clamp(1rem, 2.5vw, 1.75rem);
  border: 1px solid rgba(38, 27, 23, 0.12);
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at top right, rgba(53, 102, 168, 0.18), transparent 31%),
    linear-gradient(180deg, rgba(255, 250, 241, 0.98), rgba(239, 241, 235, 0.98));
}

.software-workforce-kicker,
.software-workforce-chart h2,
.software-workforce-row-label,
.software-workforce-change {
  font-family: "Trend W01 Sns One", "sans-serif";
}

.software-workforce-kicker {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(38, 27, 23, 0.52);
}

.software-workforce-chart h2 {
  max-width: 23ch;
  margin-top: 0.75rem;
  font-size: clamp(1.65rem, 4vw, 2.75rem);
  line-height: 1.04;
}

.software-workforce-copy,
.software-workforce-exact,
.software-workforce-note {
  font-family: "Sofia W01 Regular1446825", "sans-serif";
}

.software-workforce-copy {
  max-width: 44rem;
  margin-top: 0.9rem;
  line-height: 1.7;
  color: rgba(38, 27, 23, 0.76);
}

.software-workforce-bars {
  display: grid;
  gap: 1.35rem;
  margin-top: 1.6rem;
}

.software-workforce-row {
  display: grid;
  grid-template-columns: 7.5rem minmax(0, 1fr);
  gap: 0.4rem 1rem;
  align-items: center;
}

.software-workforce-row-label {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.65rem;
}

.software-workforce-row-label span {
  color: rgba(38, 27, 23, 0.58);
}

.software-workforce-row-label strong {
  font-size: 1.05rem;
}

.software-workforce-track {
  height: 2.7rem;
  overflow: hidden;
  border-radius: 0.75rem;
  background: rgba(38, 27, 23, 0.08);
}

.software-workforce-bar {
  display: block;
  height: 100%;
  border-radius: inherit;
}

.software-workforce-bar-current {
  background: linear-gradient(90deg, #3566a8, #5590cc);
}

.software-workforce-bar-projected {
  width: 100%;
  background: linear-gradient(90deg, #28786d, #55a38f);
}

.software-workforce-exact {
  grid-column: 2;
  font-size: 0.78rem;
  color: rgba(38, 27, 23, 0.58);
}

.software-workforce-change {
  display: flex;
  align-items: baseline;
  gap: 0.65rem;
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 0.85rem;
  background: rgba(40, 120, 109, 0.1);
}

.software-workforce-change strong {
  font-size: clamp(1.35rem, 3vw, 2rem);
  color: #28786d;
}

.software-workforce-change span {
  color: rgba(38, 27, 23, 0.68);
}

.software-workforce-change b {
  margin-left: auto;
  color: #28786d;
}

.software-workforce-note {
  margin-top: 1.1rem;
  font-size: 0.88rem;
  line-height: 1.7;
  color: rgba(38, 27, 23, 0.64);
}

.software-workforce-note a {
  color: #28786d;
  text-decoration: underline;
}

@media screen and (max-width: 560px) {
  .software-workforce-row {
    grid-template-columns: 1fr;
  }

  .software-workforce-row-label {
    justify-content: flex-start;
  }

  .software-workforce-exact {
    grid-column: 1;
  }

  .software-workforce-change {
    flex-wrap: wrap;
  }
}
</style>
