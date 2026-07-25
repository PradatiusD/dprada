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
    states: Array
  },
  emits: ['onCompleteLoad'],
  data () {
    return {
      icon: 'fan',
      icons: ['fan', 'snowflake', 'grin-hearts', 'cog', 'atom'],
      iterator: 0,
      barWidth: 0,
      activeMessage: 'Loading',
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
    this.changeActiveMessage()
  },
  methods: {
    changeActiveMessage () {
      setTimeout(() => {
        this.iterator++
        const maxDots = 4
        if (this.iterator % maxDots === 0) {
          this.barWidth = 100
          this.activeMessage = this.states[this.iterator / maxDots]
          this.icon = this.icons[(this.iterator / maxDots) % this.icons.length]
        } else {
          this.barWidth = (this.iterator % maxDots / maxDots) * 100
          this.activeMessage = this.activeMessage + '.'
        }

        if ((this.iterator / maxDots) + 1 / maxDots < this.states.length) {
          this.changeActiveMessage()
        } else {
          this.$emit('onCompleteLoad')
        }
      }, 1000)
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
  transition: all;
  transition-duration: 0.8s;
  transition-timing-function: linear;
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
