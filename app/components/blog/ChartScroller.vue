<template>
  <div
    class="blog-chart-frame"
    :class="{
      'blog-chart-frame-overflowing': scrollState.hasOverflow,
      'blog-chart-frame-can-scroll-back': scrollState.canScrollBackward,
      'blog-chart-frame-can-scroll-forward': scrollState.canScrollForward,
    }"
  >
    <p
      v-if="scrollState.hasOverflow"
      class="blog-chart-instruction"
      :class="{ 'blog-chart-instruction-explored': hasExplored }"
    >
      <span aria-hidden="true">Swipe to explore</span>
      <span class="blog-chart-instruction-arrow" aria-hidden="true">→</span>
      <span class="sr-only">Scroll horizontally to see the full chart.</span>
    </p>

    <div class="blog-chart-viewport">
      <div
        ref="scroller"
        class="blog-chart-scroll"
        :tabindex="scrollState.hasOverflow ? 0 : undefined"
        :role="scrollState.hasOverflow ? 'region' : undefined"
        :aria-label="scrollState.hasOverflow ? label : undefined"
        @scroll.passive="updateScrollState"
      >
        <slot />
      </div>
      <div ref="stickyAxis" class="blog-chart-sticky-axis" aria-hidden="true" />
      <div class="blog-chart-edge blog-chart-edge-left" aria-hidden="true">
        <span>←</span>
      </div>
      <div class="blog-chart-edge blog-chart-edge-right" aria-hidden="true">
        <span>→</span>
      </div>
    </div>

    <div v-if="scrollState.hasOverflow" class="blog-chart-progress" aria-hidden="true">
      <span :style="progressStyle" />
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { getChartScrollState } from '~/utils/chartScrollState'

const props = defineProps({
  label: {
    type: String,
    default: 'Scrollable chart. Use horizontal scrolling to see the full chart.',
  },
})

const scroller = ref(null)
const stickyAxis = ref(null)
const hasExplored = ref(false)
const scrollState = ref(getChartScrollState({ clientWidth: 0, scrollWidth: 0, scrollLeft: 0 }))
let resizeObserver

const progressStyle = computed(() => {
  const thumbWidth = scrollState.value.viewportRatio * 100
  const availableTrack = 100 - thumbWidth

  return {
    width: `${thumbWidth}%`,
    left: `${scrollState.value.progress * availableTrack}%`,
  }
})

function updateScrollState () {
  if (!scroller.value) return

  scrollState.value = getChartScrollState(scroller.value)
  if (scrollState.value.canScrollBackward) hasExplored.value = true
}

function syncStickyAxis () {
  const chart = scroller.value?.firstElementChild
  if (!stickyAxis.value || !(chart instanceof SVGElement)) return

  if (!window.matchMedia('(max-width: 767px)').matches) {
    stickyAxis.value.replaceChildren()
    return
  }

  const clone = chart.cloneNode(true)
  const sourceTexts = [...chart.querySelectorAll('text')]
  const cloneTexts = [...clone.querySelectorAll('text')]
  const viewBox = chart.viewBox.baseVal
  const chartScale = chart.getBoundingClientRect().width / viewBox.width
  const axisRightEdge = viewBox.x + (60 / chartScale)
  const xAxisTop = viewBox.y + (viewBox.height * 0.84)

  clone.querySelectorAll('path, line, circle, rect, polygon, polyline, image, use').forEach(element => element.remove())
  cloneTexts.forEach((text, index) => {
    try {
      const bounds = sourceTexts[index].getBBox()
      if (bounds.x > axisRightEdge || bounds.y > xAxisTop) text.remove()
    } catch {
      text.remove()
    }
  })
  clone.querySelectorAll('[class*="-x-label"], [class*="-x-axis"], [class$="-years"], [class*="-years "]').forEach(element => element.remove())
  clone.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'))
  clone.querySelectorAll('[tabindex]').forEach(element => element.removeAttribute('tabindex'))
  clone.querySelectorAll('[role]').forEach(element => element.removeAttribute('role'))
  clone.querySelectorAll('[aria-label]').forEach(element => element.removeAttribute('aria-label'))
  clone.querySelectorAll('title, desc').forEach(element => element.remove())
  clone.removeAttribute('role')
  clone.removeAttribute('aria-labelledby')
  clone.setAttribute('aria-hidden', 'true')
  clone.style.width = `${chart.getBoundingClientRect().width}px`
  clone.style.maxWidth = 'none'
  clone.style.height = 'auto'
  clone.style.overflow = 'visible'
  stickyAxis.value.replaceChildren(clone)
}

function refreshChartLayout () {
  updateScrollState()
  syncStickyAxis()
}

onMounted(async () => {
  await nextTick()
  refreshChartLayout()

  resizeObserver = new ResizeObserver(refreshChartLayout)
  resizeObserver.observe(scroller.value)
  if (scroller.value.firstElementChild) resizeObserver.observe(scroller.value.firstElementChild)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})
</script>

<style scoped>
.blog-chart-frame {
  min-width: 0;
}

.blog-chart-instruction {
  display: none;
}

.blog-chart-viewport {
  position: relative;
  min-width: 0;
}

.blog-chart-sticky-axis {
  display: none;
}

.blog-chart-edge {
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  display: none;
  width: 2.5rem;
  align-items: center;
  pointer-events: none;
  opacity: 0;
  transition: opacity 180ms ease;
}

.blog-chart-edge span {
  display: grid;
  width: 1.65rem;
  height: 1.65rem;
  place-items: center;
  border: 1px solid rgba(38, 27, 23, 0.14);
  border-radius: 999px;
  background: rgba(255, 250, 241, 0.9);
  box-shadow: 0 0.2rem 0.75rem rgba(38, 27, 23, 0.14);
  color: rgba(38, 27, 23, 0.72);
  font-family: "Sofia W01 Bold1446843", "sans-serif";
  font-size: 0.8rem;
}

.blog-chart-edge-left {
  left: 0;
  justify-content: flex-start;
  background: linear-gradient(90deg, rgba(255, 250, 241, 0.92), transparent);
}

.blog-chart-edge-right {
  right: 0;
  justify-content: flex-end;
  background: linear-gradient(270deg, rgba(255, 250, 241, 0.92), transparent);
}

.blog-chart-progress {
  display: none;
}

@media screen and (max-width: 767px) {
  .blog-chart-scroll {
    scrollbar-width: none;
  }

  .blog-chart-scroll::-webkit-scrollbar {
    display: none;
  }

  .blog-chart-instruction {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.35rem;
    min-height: 1.4rem;
    margin: 0.65rem 0 0.15rem;
    font-family: "Sofia W01 Bold1446843", "sans-serif";
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    color: rgba(38, 27, 23, 0.64);
    transition: opacity 180ms ease;
  }

  .blog-chart-instruction-explored {
    opacity: 0;
  }

  .blog-chart-instruction-arrow {
    font-size: 1rem;
  }

  .blog-chart-edge {
    display: flex;
  }

  .blog-chart-sticky-axis {
    position: absolute;
    z-index: 3;
    top: 0;
    bottom: 0;
    left: 0;
    display: block;
    width: 4.75rem;
    overflow: visible;
    pointer-events: none;
    opacity: 0;
    background: linear-gradient(90deg, rgba(255, 250, 241, 0.98) 90%, rgba(255, 250, 241, 0));
    transition: opacity 120ms ease;
  }

  .blog-chart-frame-can-scroll-back .blog-chart-sticky-axis {
    opacity: 1;
  }

  .blog-chart-frame-can-scroll-back .blog-chart-edge-left,
  .blog-chart-frame-can-scroll-forward .blog-chart-edge-right {
    opacity: 1;
  }

  .blog-chart-progress {
    display: block;
    height: 0.22rem;
    margin: 0.35rem 0.25rem 0;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(38, 27, 23, 0.1);
  }

  .blog-chart-progress span {
    position: relative;
    display: block;
    height: 100%;
    border-radius: inherit;
    background: rgba(38, 27, 23, 0.48);
    transition: left 80ms linear;
  }
}

@media (prefers-reduced-motion: reduce) {
  .blog-chart-edge,
  .blog-chart-sticky-axis,
  .blog-chart-instruction,
  .blog-chart-progress span {
    transition: none;
  }
}
</style>
