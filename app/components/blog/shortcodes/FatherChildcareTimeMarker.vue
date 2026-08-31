<template>
  <ParentingTrendMarker
    marker-id="father-childcare"
    kicker="Fatherhood marker · selected U.S. time diaries"
    title="Weekly Hours Spent in Primary Child-Care"
    callout="2.5 → 7.3"
    deck="Average weekly hours rose across the published observations from 1965 to 2011."
    chart-title="Average weekly primary child-care hours among U.S. fathers, selected years from 1965 to 2011"
    chart-description="Six published time-diary observations show fathers’ primary child-care time increasing from 2.5 hours in 1965 to 7.3 hours in 2011."
    :points="points"
    unit="hours/week"
    :decimals="1"
    :y-min="0"
    :y-max="8"
    :y-ticks="[0, 2, 4, 6, 8]"
    x-axis-label="Time-diary observation year"
    color="#2f6f95"
  >
    <template #note>
      This measures time when child care was the father’s primary activity—daily care, teaching, and playing—not every hour a father was physically with a child. The population is U.S. fathers ages 18–64 with an own child under 18 living in the household. The six observations are weighted means that include zero-time diaries; historical survey periods spanning two years are displayed by their conventional chart year. Values through 2000 come from Bianchi’s harmonized national time-diary table; 2011 comes from Pew’s American Time Use Survey analysis. No years are interpolated. Sources: <a href="https://www.workplaceflexibility.org/wp-content/uploads/2022/04/bianchi_-_family_change_and_time_allocation_in_american_families.pdf" target="_blank" rel="noopener noreferrer">Bianchi, “Family Change and Time Allocation in American Families”</a> and <a href="https://www.pewresearch.org/social-trends/2013/03/14/chapter-5-americans-time-at-paid-work-housework-child-care-1965-to-2011/" target="_blank" rel="noopener noreferrer">Pew Research Center</a>.
    </template>
  </ParentingTrendMarker>
</template>

<script>
import ParentingTrendMarker from '~/components/blog/shortcodes/ParentingTrendMarker.vue'
import { fatherChildcareHours } from '~/data/parentingTrends'

export default {
  name: 'FatherChildcareTimeMarker',
  components: { ParentingTrendMarker },
  data () { return { points: fatherChildcareHours } }
}
</script>
