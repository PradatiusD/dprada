<template>
  <section
    ref="quoteSection"
    class="quote-container"
    :style="patternStyle"
  >
    <div class="wrapper">
      <div>
        <p
          class="font-custom-thin text-2xl md:text-5xl p-4 leading-snug"
          :style="primaryTextStyle"
        >
          &ldquo;<ClientOnly>
            <VueTyper
              v-if="isInView"
              :text="formattedQuote"
              :repeat="0"
              :pre-type-delay="quotePreTypeDelay"
              :type-delay="quoteTypeDelay"
              :style="primaryTextStyle"
              @completed="onQuoteComplete"
            />
            <template #fallback>
              <span
                class="typed"
                style="white-space: pre-wrap"
              >{{ formattedQuote }}</span>
            </template>
          </ClientOnly>&rdquo;
        </p>
        <p
          class="font-display text-4xl p-4 mb-10 quote-author"
          :style="secondaryTextStyle"
        >
          <ClientOnly>
            <VueTyper
              v-if="isInView && quoteHasCompleted"
              :text="'~' + author"
              :repeat="0"
              :pre-type-delay="resolvedAuthorAppearDelay"
              :style="secondaryTextStyle"
              @completed="onAuthorComplete"
            />
            <template #fallback>
              <span class="typed">~{{ author }}</span>
            </template>
          </ClientOnly>
        </p>
      </div>
      <div
        v-if="!disableScrollDown && showScrollDownAnimation"
        class="scroll-down-animation"
        :style="primaryTextStyle"
      >
        <div class="scroll-down-interior-container">
          <span class="font-display">Scroll down</span>
          <font-awesome-icon
            icon="arrow-down"
            class="scroll-down-icon"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as heroPatterns from 'hero-patterns'
import VueTyper from '~/components/VueTyper.vue'

/**
 * Quiet patterns that read as grayscale texture over solid color blocks.
 * (Avoids loud motifs like skulls / lips / food.)
 */
const SUBTLE_PATTERNS = [
  'topography',
  'graphPaper',
  'plus',
  'polkaDots',
  'pixelDots',
  'circuitBoard',
  'diagonalLines',
  'hexagons',
  'wiggle',
  'squares',
  'bubbles',
  'hideout',
  'overlappingCircles',
  'ticTacToe',
  'connections',
  'flippedDiamonds',
  'morphingDiamonds',
  'formalInvitation',
  'texture',
  'yyy',
  'bankNote',
  'boxes',
  'charlieBrown',
  'fallingTriangles',
  'fourPointStars',
  'intersectingCircles',
  'leaf',
  'overcast',
  'rails',
  'signal',
  'steelBeams',
  'temple',
  'tinyCheckers',
  'zigZag'
]

function hashString (value) {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = ((hash << 5) - hash) + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function pickPatternName (seed) {
  return SUBTLE_PATTERNS[hashString(seed) % SUBTLE_PATTERNS.length]
}

/** Prefer white or black ink so patterns stay monochrome on colorful backgrounds. */
function resolvePatternInk (color) {
  if (!color) {
    return '#ffffff'
  }
  const normalized = color.trim().toLowerCase()
  if (
    normalized === 'black' ||
    normalized === '#000' ||
    normalized === '#000000' ||
    normalized === 'rgb(0,0,0)' ||
    normalized === 'rgb(0, 0, 0)'
  ) {
    return '#000000'
  }
  // Light text colors (white, near-white, named colors used on this site)
  return '#ffffff'
}

const DEFAULT_QUOTE_PRE_TYPE_DELAY = 70
const DEFAULT_QUOTE_TYPE_DELAY = 45
const DEFAULT_AUTHOR_PAUSE_AFTER_QUOTE = 250

export default {
  name: 'FeaturedQuote',
  components: {
    VueTyper
  },
  props: {
    quote: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    font: String,
    /**
     * Preserves existing "start roughly this long after the section begins"
     * semantics while ensuring the author never starts before the quote ends.
     */
    authorAppearDelay: Number,
    mobileMaxChars: Number,
    disableScrollDown: Boolean,
    /** Force a hero-patterns export name; omit for deterministic random pick. */
    pattern: {
      type: String,
      default: null
    },
    /** 0–1 opacity of the monochrome SVG fill. */
    patternOpacity: {
      type: Number,
      default: 0.09
    },
    disablePattern: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showScrollDownAnimation: false,
      quoteHasCompleted: false,
      // Typewriter only mounts after this section enters the viewport.
      isInView: false,
      visibilityObserver: null,
      // Safe default for SSR / static generate; refined on the client.
      maxChars: 30
    }
  },
  computed: {
    primaryTextStyle () {
      if (this.font) {
        return {
          color: this.color,
          'font-family': this.font
        }
      }
      return this.secondaryTextStyle
    },
    secondaryTextStyle () {
      return {
        color: this.color
      }
    },
    formattedQuote () {
      const splitByWords = this.quote.split(' ')
      const linesByNewArray = ['']
      for (let i = 0; i < splitByWords.length; i++) {
        const lastIndex = linesByNewArray.length - 1
        const stringToAdd = i + 1 === splitByWords.length
          ? splitByWords[i]
          : splitByWords[i] + ' '
        if (linesByNewArray[lastIndex].length < this.maxChars) {
          linesByNewArray[lastIndex] += stringToAdd
        } else {
          linesByNewArray.push(stringToAdd)
        }
      }
      return linesByNewArray.join('\n')
    },
    quotePreTypeDelay () {
      return DEFAULT_QUOTE_PRE_TYPE_DELAY
    },
    quoteTypeDelay () {
      return DEFAULT_QUOTE_TYPE_DELAY
    },
    estimatedQuoteTypingDuration () {
      return this.quotePreTypeDelay + (this.formattedQuote.length * this.quoteTypeDelay)
    },
    resolvedAuthorAppearDelay () {
      if (typeof this.authorAppearDelay !== 'number') {
        return DEFAULT_AUTHOR_PAUSE_AFTER_QUOTE
      }
      return Math.max(0, this.authorAppearDelay - this.estimatedQuoteTypingDuration)
    },
    selectedPatternName () {
      if (this.disablePattern) {
        return null
      }
      if (this.pattern && typeof heroPatterns[this.pattern] === 'function') {
        return this.pattern
      }
      // Stable across SSR + hydrate so static HTML matches the client.
      return pickPatternName(`${this.quote}::${this.author}`)
    },
    patternStyle () {
      const name = this.selectedPatternName
      if (!name || typeof heroPatterns[name] !== 'function') {
        return {}
      }
      const ink = resolvePatternInk(this.color)
      return {
        backgroundImage: heroPatterns[name](ink, this.patternOpacity)
      }
    }
  },
  mounted () {
    this.maxChars = window.innerWidth < 768
      ? (this.mobileMaxChars || 18)
      : 30
    this.watchVisibility()
  },
  beforeUnmount () {
    this.teardownVisibilityObserver()
  },
  methods: {
    watchVisibility () {
      const el = this.$refs.quoteSection
      if (!el || typeof IntersectionObserver === 'undefined') {
        // No observer support: start typing immediately.
        this.isInView = true
        this.quoteHasCompleted = false
        this.showScrollDownAnimation = false
        return
      }

      this.visibilityObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry && entry.isIntersecting) {
            this.isInView = true
            this.quoteHasCompleted = false
            this.showScrollDownAnimation = false
            this.teardownVisibilityObserver()
          }
        },
        {
          // Start once a meaningful portion of the quote section is visible.
          threshold: 0.25,
          rootMargin: '0px 0px -5% 0px'
        }
      )
      this.visibilityObserver.observe(el)
    },
    teardownVisibilityObserver () {
      if (this.visibilityObserver) {
        this.visibilityObserver.disconnect()
        this.visibilityObserver = null
      }
    },
    onQuoteComplete () {
      this.quoteHasCompleted = true
    },
    onAuthorComplete () {
      this.showScrollDownAnimation = true
    }
  }
}
</script>

<style>
.typed {
  color: inherit !important;
}

.custom.caret {
  background-color: white !important;
}

.quote-container {
  height: 100vh;
  position: relative;
  /* Parent Tailwind bg-* sets the solid color; pattern sits on top as image. */
  background-repeat: repeat;
  background-size: auto;
}

.quote-container .wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}

.scroll-down-animation {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: scrollDownButton 2s infinite ease-in-out;
  width: 175px;
  height: 175px;
  border: 2px solid rgba(211, 211, 211, 0.1);
  border-radius: 100%;
  margin: 0 auto;
}

.scroll-down-interior-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  line-height: 1.2;
}

.scroll-down-interior-container .scroll-down-icon {
  font-size: 1.2em;
  margin-top: 9px;
  display: block;
}

@keyframes scrollDownButton {
  0% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, 25px, 0);
    border-color: rgba(211, 211, 211, 0.50);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
