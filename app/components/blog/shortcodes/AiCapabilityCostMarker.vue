<template>
  <section class="ai-cost-marker" aria-labelledby="ai-cost-marker-title">
    <div class="ai-cost-marker-heading">
      <div>
        <p class="ai-cost-marker-kicker">
          Cost marker · 2022–2024
        </p>
        <h2 id="ai-cost-marker-title">
          More capable, dramatically cheaper
        </h2>
      </div>
      <strong class="ai-cost-marker-callout">280×+</strong>
    </div>

    <div class="ai-cost-timeline" aria-label="AI capability and inference cost milestones from 2022 through 2024">
      <div class="ai-cost-track" aria-hidden="true" />
      <div class="ai-cost-milestone ai-cost-milestone-start">
        <span class="ai-cost-year">Nov. 2022</span>
        <span class="ai-cost-pin" aria-hidden="true" />
        <strong>$20.00</strong>
        <span>per million tokens at GPT-3.5-level intelligence</span>
      </div>
      <div class="ai-cost-milestone ai-cost-milestone-middle">
        <span class="ai-cost-year">2023 → 2024</span>
        <span class="ai-cost-pin" aria-hidden="true" />
        <strong>4.4% → 71.7%</strong>
        <span>of SWE-bench coding problems solved</span>
      </div>
      <div class="ai-cost-milestone ai-cost-milestone-end">
        <span class="ai-cost-year">Oct. 2024</span>
        <span class="ai-cost-pin" aria-hidden="true" />
        <strong>$0.07</strong>
        <span>per million tokens at the same intelligence level</span>
      </div>
    </div>

    <p class="ai-cost-summary">
      <strong>Capability:</strong> +67.3 percentage points on SWE-bench in one year.
    </p>

    <p class="ai-cost-note">
      The cost comparison holds intelligence constant at a 64.8 MMLU score, making it a measure of capability per dollar rather than a comparison of model names. Source: <a href="https://hai.stanford.edu/assets/files/hai_ai_index_report_2025.pdf" target="_blank" rel="noopener noreferrer">Stanford AI Index Report 2025</a>.
    </p>
  </section>
</template>

<script>
export default {
  name: 'AiCapabilityCostMarker'
}
</script>

<style scoped>
.ai-cost-marker {
  padding: clamp(1rem, 2.5vw, 1.5rem);
  border: 1px solid rgba(38, 27, 23, 0.12);
  border-radius: 1.1rem;
  background: rgba(255, 250, 241, 0.8);
}

.ai-cost-marker-kicker,
.ai-cost-marker h2,
.ai-cost-marker-callout,
.ai-cost-milestone,
.ai-cost-summary strong {
  font-family: "Trend W01 Sns One", "sans-serif";
}

.ai-cost-marker-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.ai-cost-marker-kicker {
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(38, 27, 23, 0.52);
}

.ai-cost-marker h2 {
  margin-top: 0.4rem;
  font-size: clamp(1.25rem, 3vw, 1.9rem);
  line-height: 1.05;
}

.ai-cost-marker-callout {
  color: #28786d;
  font-size: clamp(1.5rem, 4vw, 2.6rem);
  line-height: 1;
  white-space: nowrap;
}

.ai-cost-timeline {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.ai-cost-track {
  position: absolute;
  top: 1.75rem;
  right: 0.5rem;
  left: 0.5rem;
  height: 0.3rem;
  border-radius: 999px;
  background: linear-gradient(90deg, #bd6429, #d2a33c 45%, #28786d);
}

.ai-cost-milestone {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.32rem;
  color: rgba(38, 27, 23, 0.7);
  font-size: 0.72rem;
  line-height: 1.4;
}

.ai-cost-milestone-middle {
  align-items: center;
  text-align: center;
}

.ai-cost-milestone-end {
  align-items: flex-end;
  text-align: right;
}

.ai-cost-year {
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.ai-cost-pin {
  width: 0.9rem;
  height: 0.9rem;
  margin: 0.18rem 0 0.45rem;
  border: 3px solid #fffaf1;
  border-radius: 50%;
  background: #28786d;
  box-shadow: 0 0 0 1px rgba(38, 27, 23, 0.16);
}

.ai-cost-milestone-start .ai-cost-pin {
  background: #bd6429;
}

.ai-cost-milestone-middle .ai-cost-pin {
  background: #d2a33c;
}

.ai-cost-milestone strong {
  color: #261b17;
  font-size: clamp(1rem, 2vw, 1.3rem);
}

.ai-cost-summary {
  margin-top: 1.25rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: rgba(40, 120, 109, 0.08);
  font-family: "Sofia W01 Regular1446825", "sans-serif";
  font-size: 0.84rem;
  line-height: 1.55;
}

.ai-cost-note {
  margin-top: 0.9rem;
  font-family: "Sofia W01 Regular1446825", "sans-serif";
  font-size: 0.8rem;
  line-height: 1.65;
  color: rgba(38, 27, 23, 0.6);
}

.ai-cost-note a {
  color: #28786d;
  text-decoration: underline;
}

@media screen and (max-width: 430px) {
  .ai-cost-marker-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .ai-cost-timeline {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding-left: 1.5rem;
  }

  .ai-cost-track {
    top: 0.5rem;
    bottom: 0.5rem;
    left: 0.38rem;
    width: 0.3rem;
    height: auto;
    background: linear-gradient(180deg, #bd6429, #d2a33c 45%, #28786d);
  }

  .ai-cost-milestone,
  .ai-cost-milestone-middle,
  .ai-cost-milestone-end {
    align-items: flex-start;
    text-align: left;
  }

  .ai-cost-pin {
    position: absolute;
    top: 0.2rem;
    left: -1.5rem;
    margin: 0;
  }
}
</style>
