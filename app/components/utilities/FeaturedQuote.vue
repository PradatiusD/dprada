<template>
  <section class="quote-container">
    <div class="container mx-auto p-4">
      <p
        class="font-custom-thin text-2xl md:text-5xl p-4 leading-snug"
        :style="primaryTextStyle"
      >
        &ldquo;<ClientOnly>
          <VueTyper
            :text="formattedQuote"
            :repeat="0"
            :style="primaryTextStyle"
          />
          <template #fallback>
            <span class="typed" style="white-space: pre-wrap">{{ formattedQuote }}</span>
          </template>
        </ClientOnly>&rdquo;
      </p>
      <p
        class="font-display text-4xl p-4 mb-10 quote-author"
        :style="secondaryTextStyle"
      >
        <ClientOnly>
          <VueTyper
            :text="'~' + author"
            :repeat="0"
            :pre-type-delay="authorAppearDelay"
            :style="secondaryTextStyle"
            @completed="onComplete"
          />
          <template #fallback>
            <span class="typed">~{{ author }}</span>
          </template>
        </ClientOnly>
      </p>
      <div
        v-if="!disableScrollDown && showScrollDownAnimation"
        class="text-center scroll-down-animation"
        :style="primaryTextStyle"
      >
        <div class="scroll-down-interior-container">
          <span class="block font-display mt-2">Scroll down</span>
          <font-awesome-icon icon="arrow-down" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueTyper from '~/components/VueTyper.vue'

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
    authorAppearDelay: Number,
    mobileMaxChars: Number,
    disableScrollDown: Boolean
  },
  data () {
    return {
      showScrollDownAnimation: false,
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
    }
  },
  mounted () {
    this.maxChars = window.innerWidth < 768
      ? (this.mobileMaxChars || 18)
      : 30
  },
  methods: {
    onComplete () {
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
}

.quote-container .container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.scroll-down-animation {
  position: relative;
  animation: scrollDownButton 2s infinite ease-in-out;
  width: 175px;
  height: 175px;
  border: 2px solid rgba(211, 211, 211, 0.1);
  border-radius: 100%;
  margin: 0 auto;
}

.scroll-down-interior-container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}

.scroll-down-interior-container .fa-arrow-down {
  font-size: 1.2em;
  margin-top: 9px;
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
