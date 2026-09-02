<template>
  <section class="software-openings-chart" aria-labelledby="software-openings-title">
    <header>
      <p class="software-openings-kicker">
        Hiring marker · annual average, 2025–2035
      </p>
      <h2 id="software-openings-title">
        Projected annual software developer openings
      </h2>
      <p class="software-openings-copy">
        BLS projects this many annual opportunities for software developers, quality assurance analysts, and testers, on average over the decade.
      </p>
    </header>

    <div
      class="software-openings-visual"
      role="img"
      :aria-label="`The BLS projects ${formatNumber(projection.averageAnnualOpenings)} openings each year, equal to about ${openingsShare.toFixed(1)} percent of the ${projection.baselineYear} workforce.`"
    >
      <div class="software-openings-number">
        <strong>{{ formatNumber(projection.averageAnnualOpenings) }}</strong>
        <span>projected openings per year</span>
      </div>

      <div class="software-openings-scale">
        <div class="software-openings-workforce">
          <span class="software-openings-segment" :style="{ width: `${openingsShare}%` }" />
        </div>
        <div class="software-openings-scale-labels">
          <span>{{ openingsShare.toFixed(1) }}% annual openings</span>
          <span>{{ formatCompact(projection.baselineEmployment) }}-job workforce</span>
        </div>
      </div>
    </div>

    <div class="software-openings-context">
      <div>
        <span>Ten-year net growth</span>
        <strong>{{ formatNumber(projection.projectedChange) }}</strong>
      </div>
      <div>
        <span>Average annual openings</span>
        <strong>{{ formatNumber(projection.averageAnnualOpenings) }}</strong>
      </div>
    </div>

    <p class="software-openings-note">
      “Openings” are projected hiring opportunities, not observed hires. They include newly created positions and positions expected to open when workers change occupations or leave the labor force. BLS JOLTS does not publish actual hires by occupation, so presenting JOLTS hires as software-developer hires would be misleading. Sources:
      <a href="https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm" target="_blank" rel="noopener noreferrer">BLS Occupational Outlook Handbook</a>
      and
      <a href="https://www.bls.gov/jlt/jltdata.htm" target="_blank" rel="noopener noreferrer">BLS JOLTS data methodology</a>.
    </p>
  </section>
</template>

<script>
import { softwareWorkforceProjection } from '~/data/softwareWorkforce'

export default {
  name: 'SoftwareDeveloperOpeningsChart',
  data () {
    return {
      projection: softwareWorkforceProjection
    }
  },
  computed: {
    openingsShare () {
      return (this.projection.averageAnnualOpenings / this.projection.baselineEmployment) * 100
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
.software-openings-chart {
  padding: clamp(1rem, 2.5vw, 1.75rem);
  border: 1px solid rgba(38, 27, 23, 0.12);
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at top right, rgba(189, 100, 41, 0.2), transparent 31%),
    linear-gradient(180deg, rgba(255, 250, 241, 0.98), rgba(245, 237, 225, 0.98));
}

.software-openings-kicker,
.software-openings-chart h2,
.software-openings-number,
.software-openings-context {
  font-family: "Trend W01 Sns One", "sans-serif";
}

.software-openings-kicker {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(38, 27, 23, 0.52);
}

.software-openings-chart h2 {
  margin-top: 0.75rem;
  font-size: clamp(1.8rem, 4.5vw, 3.2rem);
  line-height: 1;
}

.software-openings-copy,
.software-openings-scale-labels,
.software-openings-note {
  font-family: "Sofia W01 Regular1446825", "sans-serif";
}

.software-openings-copy {
  max-width: 45rem;
  margin-top: 0.9rem;
  line-height: 1.7;
  color: rgba(38, 27, 23, 0.76);
}

.software-openings-visual {
  display: grid;
  grid-template-columns: minmax(12rem, 0.8fr) minmax(15rem, 1.2fr);
  gap: clamp(1.25rem, 4vw, 2.5rem);
  align-items: center;
  margin-top: 1.6rem;
  padding: clamp(1rem, 3vw, 1.5rem);
  border-radius: 1rem;
  background: rgba(255, 250, 241, 0.72);
}

.software-openings-number {
  display: grid;
  gap: 0.25rem;
}

.software-openings-number strong {
  font-size: clamp(2.25rem, 7vw, 4.5rem);
  line-height: 0.95;
  color: #bd6429;
}

.software-openings-number span {
  color: rgba(38, 27, 23, 0.62);
}

.software-openings-workforce {
  height: 2.2rem;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(38, 27, 23, 0.12);
}

.software-openings-segment {
  display: block;
  min-width: 0.7rem;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #bd6429, #f0a35f);
}

.software-openings-scale-labels {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.55rem;
  font-size: 0.75rem;
  color: rgba(38, 27, 23, 0.58);
}

.software-openings-context {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.software-openings-context div {
  display: grid;
  gap: 0.35rem;
  padding: 0.9rem 1rem;
  border: 1px solid rgba(38, 27, 23, 0.1);
  border-radius: 0.85rem;
}

.software-openings-context span {
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(38, 27, 23, 0.5);
}

.software-openings-context strong {
  font-size: 1.35rem;
}

.software-openings-note {
  margin-top: 1.1rem;
  font-size: 0.88rem;
  line-height: 1.7;
  color: rgba(38, 27, 23, 0.64);
}

.software-openings-note a {
  color: #a65320;
  text-decoration: underline;
}

@media screen and (max-width: 640px) {
  .software-openings-visual,
  .software-openings-context {
    grid-template-columns: minmax(0, 1fr);
  }

  .software-openings-visual > *,
  .software-openings-scale {
    min-width: 0;
  }

  .software-openings-scale-labels {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
