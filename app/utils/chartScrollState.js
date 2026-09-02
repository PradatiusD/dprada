const SCROLL_EDGE_TOLERANCE = 1

export function getChartScrollState ({ clientWidth, scrollWidth, scrollLeft }) {
  const maxScroll = Math.max(0, scrollWidth - clientWidth)
  const normalizedScrollLeft = Math.min(maxScroll, Math.max(0, scrollLeft))
  const hasOverflow = maxScroll > SCROLL_EDGE_TOLERANCE
  const canScrollForward = hasOverflow && normalizedScrollLeft < maxScroll - SCROLL_EDGE_TOLERANCE

  return {
    hasOverflow,
    canScrollBackward: hasOverflow && normalizedScrollLeft > SCROLL_EDGE_TOLERANCE,
    canScrollForward,
    progress: hasOverflow ? (canScrollForward ? normalizedScrollLeft / maxScroll : 1) : 0,
    viewportRatio: scrollWidth > 0 ? Math.min(1, clientWidth / scrollWidth) : 1,
  }
}
