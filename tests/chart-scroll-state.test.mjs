import test from 'node:test'
import assert from 'node:assert/strict'

import { getChartScrollState } from '../app/utils/chartScrollState.js'

test('reports a fitted chart as non-scrollable', () => {
  assert.deepEqual(
    getChartScrollState({ clientWidth: 360, scrollWidth: 360, scrollLeft: 0 }),
    {
      hasOverflow: false,
      canScrollBackward: false,
      canScrollForward: false,
      progress: 0,
      viewportRatio: 1,
    },
  )
})

test('reports scroll position and viewport ratio for an overflowing chart', () => {
  assert.deepEqual(
    getChartScrollState({ clientWidth: 360, scrollWidth: 576, scrollLeft: 108 }),
    {
      hasOverflow: true,
      canScrollBackward: true,
      canScrollForward: true,
      progress: 0.5,
      viewportRatio: 0.625,
    },
  )
})

test('tolerates subpixel positions at the end of the chart', () => {
  const state = getChartScrollState({
    clientWidth: 360,
    scrollWidth: 576,
    scrollLeft: 215.5,
  })

  assert.equal(state.canScrollForward, false)
  assert.equal(state.progress, 1)
})
