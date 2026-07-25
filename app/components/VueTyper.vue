<template>
  <span class="vue-typer">
    <span class="typed" style="white-space: pre-wrap">{{ displayed }}</span><span
      v-if="!completed"
      class="custom caret"
    >|</span>
  </span>
</template>

<script>
/**
 * Lightweight Vue 3 typewriter replacement for the old vue-typer package.
 * Keeps the same prop surface used by FeaturedQuote.
 */
export default {
  name: 'VueTyper',
  props: {
    text: {
      type: String,
      required: true
    },
    repeat: {
      type: Number,
      default: 0
    },
    preTypeDelay: {
      type: Number,
      default: 70
    },
    typeDelay: {
      type: Number,
      default: 45
    }
  },
  emits: ['completed'],
  data () {
    return {
      displayed: '',
      completed: false,
      index: 0,
      timer: null
    }
  },
  mounted () {
    this.timer = setTimeout(() => {
      this.typeNext()
    }, this.preTypeDelay)
  },
  beforeUnmount () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  methods: {
    typeNext () {
      if (this.index >= this.text.length) {
        this.completed = true
        this.$emit('completed')
        return
      }
      this.displayed += this.text.charAt(this.index)
      this.index += 1
      this.timer = setTimeout(() => {
        this.typeNext()
      }, this.typeDelay)
    }
  }
}
</script>

<style scoped>
.custom.caret {
  display: inline-block;
  margin-left: 1px;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
