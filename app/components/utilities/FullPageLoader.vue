<template>
  <div class="loader-page z-50">
    <div class="svg-animation-wallpaper flex flex-row flex-wrap w-full text-center">
      <div
        v-for="rowIndex in backgroundAnimation.columns"
        :key="rowIndex"
        class="flex flex-col"
        :style="{ width: (1 / backgroundAnimation.columns * 100) + '%' }"
      >
        <div
          v-for="columnIndex in backgroundAnimation.rows"
          :key="columnIndex"
          :class="(rowIndex + columnIndex) % 2 === 0 ? 'text-5xl' : 'text-2xl'"
        >
          <font-awesome-icon :icon="icon" />
        </div>
      </div>
    </div>
    <div class="loader-page-pattern">
      <div class="loader-container text-white leading-tight font-light text-4xl sm:text-6xl w-8/12 text-center">
        <font-awesome-icon
          :icon="icon"
          class="fa-spin featured-loader"
        />
        <br>
        {{ activeMessage }}
      </div>
    </div>
    <div
      class="progress-indicator"
      :style="{ width: barWidth + '%' }"
    />
  </div>
</template>

<script>
export default {
  name: 'FullPageLoader',
  props: {
    /** Single loading joke / message to show for the whole screen. */
    joke: {
      type: String,
      default: 'Loading'
    },
    /** Total time the loader stays up before completing (ms). */
    duration: {
      type: Number,
      default: 2500
    }
  },
  emits: ['onCompleteLoad'],
  data () {
    return {
      icon: 'fan',
      icons: ['fan', 'snowflake', 'grin-hearts', 'cog', 'atom'],
      barWidth: 0,
      activeMessage: '',
      dotsTimer: null,
      progressTimer: null,
      completeTimer: null,
      // Defaults used during SSR / static generate; updated on mount.
      backgroundAnimation: {
        columns: 12,
        rows: 8
      }
    }
  },
  mounted () {
    this.backgroundAnimation = {
      columns: parseInt(window.innerWidth / 100, 10) || 12,
      rows: parseInt(window.innerHeight / 100, 10) || 8
    }
    this.icon = this.icons[Math.floor(Math.random() * this.icons.length)]
    this.activeMessage = this.joke
    this.startLoader()
  },
  beforeUnmount () {
    clearInterval(this.dotsTimer)
    clearInterval(this.progressTimer)
    clearTimeout(this.completeTimer)
  },
  methods: {
    startLoader () {
      let dots = 0
      this.dotsTimer = setInterval(() => {
        dots = (dots + 1) % 4
        this.activeMessage = this.joke + '.'.repeat(dots)
      }, 400)

      const tickMs = 50
      const steps = Math.max(1, Math.floor(this.duration / tickMs))
      let step = 0
      this.progressTimer = setInterval(() => {
        step += 1
        this.barWidth = Math.min(100, (step / steps) * 100)
        if (step >= steps) {
          clearInterval(this.progressTimer)
        }
      }, tickMs)

      this.completeTimer = setTimeout(() => {
        clearInterval(this.dotsTimer)
        clearInterval(this.progressTimer)
        this.barWidth = 100
        this.$emit('onCompleteLoad')
      }, this.duration)
    }
  }
}
</script>

<style scoped>
.featured-loader {
  font-size: 1.5em;
}

.loader-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.svg-animation-wallpaper {
  position: absolute;
  top: 0;
  left: 0;
  color: rgba(255, 255, 255, 0.10);
  height: 100%;
  width: 100%;
}

.svg-animation-wallpaper > div {
  justify-content: space-evenly;
  align-items: center;
}

.progress-indicator {
  height: 10px;
  background-color: rgba(255, 255, 255, 0.19);
  width: 30%;
  position: fixed;
  bottom: 0;
  transition: width 0.05s linear;
}

.loader-page-pattern {
  background-size: 800px 800px;
  height: 100%;
  animation: colorchange 15s;
}

.loader-page {
  animation: colorchange 15s;
  -webkit-animation: colorchange 15s;
  width: 100%;
  height: 100%;
  position: fixed;
  font-family: 'Sofia W01 Light1446819', 'sans-serif';
}

@keyframes colorchange {
  0%   { background-color: rgba(255, 0, 0, 0.20); }
  25%  { background-color: rgba(255, 255, 0, 0.20); }
  50%  { background-color: rgba(0, 0, 255, 0.20); }
  75%  { background-color: rgba(0, 128, 0, 0.21); }
  100% { background-color: rgba(255, 0, 0, 0.2); }
}

@-webkit-keyframes colorchange {
  0%   { background-color: rgba(255, 0, 0, 0.20); }
  25%  { background-color: rgba(255, 255, 0, 0.20); }
  50%  { background-color: rgba(0, 0, 255, 0.20); }
  75%  { background-color: rgba(0, 128, 0, 0.21); }
  100% { background-color: rgba(255, 0, 0, 0.2); }
}
</style>
