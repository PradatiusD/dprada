<template>
  <section class="ai-electricity-marker" aria-labelledby="ai-electricity-marker-title">
    <div class="ai-electricity-marker-heading">
      <div>
        <p class="ai-electricity-marker-kicker">
          Electricity marker · annual trend
        </p>
        <h2 id="ai-electricity-marker-title">
          AI computation per watt
        </h2>
      </div>
      <strong class="ai-electricity-marker-callout">+40%/yr</strong>
    </div>

    <div class="ai-electricity-bars" aria-label="Indexed electricity required for the same amount of AI computation">
      <div class="ai-electricity-bar-row">
        <span>Year 0</span>
        <div class="ai-electricity-bar-track">
          <span class="ai-electricity-bar" style="width: 100%" />
        </div>
        <strong>100</strong>
      </div>
      <div class="ai-electricity-bar-row">
        <span>Year 1</span>
        <div class="ai-electricity-bar-track">
          <span class="ai-electricity-bar" style="width: 71.4%" />
        </div>
        <strong>71</strong>
      </div>
      <div class="ai-electricity-bar-row">
        <span>Year 2</span>
        <div class="ai-electricity-bar-track">
          <span class="ai-electricity-bar" style="width: 51%" />
        </div>
        <strong>51</strong>
      </div>
    </div>

    <p class="ai-electricity-caption">
      Electricity needed for the same amount of computation, indexed to 100. At 40% annual efficiency growth, identical compute would use about 49% less electricity after two years.
    </p>

    <p class="ai-electricity-note">
      This is a derived efficiency index, not measured total industry consumption. Larger models and more queries can outweigh per-computation gains, so aggregate AI electricity demand may still rise. Source: <a href="https://hai.stanford.edu/assets/files/hai_ai_index_report_2025.pdf" target="_blank" rel="noopener noreferrer">Stanford AI Index Report 2025</a>.
    </p>
  </section>
</template>

<script>
export default {
  name: 'AiElectricityEfficiencyMarker'
}
</script>

<style scoped>
.ai-electricity-marker {
  padding: clamp(1rem, 2.5vw, 1.5rem);
  border: 1px solid rgba(38, 27, 23, 0.12);
  border-radius: 1.1rem;
  background:
    radial-gradient(circle at top right, rgba(189, 100, 41, 0.12), transparent 35%),
    rgba(255, 250, 241, 0.8);
}

.ai-electricity-marker-kicker,
.ai-electricity-marker h2,
.ai-electricity-marker-callout,
.ai-electricity-bar-row,
.ai-electricity-caption {
  font-family: "Trend W01 Sns One", "sans-serif";
}

.ai-electricity-marker-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.ai-electricity-marker-kicker {
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(38, 27, 23, 0.52);
}

.ai-electricity-marker h2 {
  margin-top: 0.4rem;
  font-size: clamp(1.25rem, 3vw, 1.9rem);
  line-height: 1.05;
}

.ai-electricity-marker-callout {
  color: #28786d;
  font-size: clamp(1.5rem, 4vw, 2.6rem);
  line-height: 1;
  white-space: nowrap;
}

.ai-electricity-bars {
  display: grid;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.ai-electricity-bar-row {
  display: grid;
  grid-template-columns: 3.75rem minmax(0, 1fr) 2.25rem;
  align-items: center;
  gap: 0.75rem;
  color: rgba(38, 27, 23, 0.68);
  font-size: 0.74rem;
}

.ai-electricity-bar-row strong {
  color: #261b17;
  text-align: right;
}

.ai-electricity-bar-track {
  height: 0.8rem;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(38, 27, 23, 0.08);
}

.ai-electricity-bar {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #bd6429, #d2a33c);
}

.ai-electricity-caption {
  margin-top: 1rem;
  font-size: 0.84rem;
  line-height: 1.6;
  color: rgba(38, 27, 23, 0.72);
}

.ai-electricity-note {
  margin-top: 0.9rem;
  font-family: "Sofia W01 Regular1446825", "sans-serif";
  font-size: 0.8rem;
  line-height: 1.65;
  color: rgba(38, 27, 23, 0.6);
}

.ai-electricity-note a {
  color: #28786d;
  text-decoration: underline;
}

@media screen and (max-width: 430px) {
  .ai-electricity-marker-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .ai-electricity-bar-row {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.5rem;
  }

  .ai-electricity-bar-track {
    grid-column: 1 / -1;
  }
}
</style>
